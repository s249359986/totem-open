<template>
  <div class="content-wrapper">
    <div class="setting-wrapper">
      <div @click="handleUpload">上传</div>
      <label class="mr10">图片质量</label>
      <el-radio-group v-model="uploadParams.quality">
        <el-radio-button
          v-for="item in qualityNames"
          :key="item.name"
          :label="item.quality"
        >{{item.name}}</el-radio-button>
      </el-radio-group>
      <div
        style="font-size:12px;margin-top:10px;"
      >说明：图片上传后会被压缩指定次数，次数越多图片质量越底 | 图片上传后会被压缩，选项从从左向右压缩率递减，图片质量递增</div>
    </div>
    <div class="uploader-wrapper">
      <el-upload
        ref="uploadId"
        accept="image/*"
        class="uploader"
        drag
        :auto-upload="false"
        :action="action"
        multiple
        :http-request="uploadFile"
        :limit="6"
        :show-file-list="false"
        :file-list="fileList"
        :on-change="handleFileListChange"
        :on-progress="handleProgress"
        :on-error="handleUploadError"
        :on-success="handleUploadSuccess"
        :data="uploadParams"
        with-credentials
      >
        <div class="drag-box">
          <img class="icon-upload" src="../../assets/upload.svg" />
          <div class="upload-info">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </div>
      </el-upload>
    </div>
    <div class="file-list-wrapper">
      <el-table v-show="fileList.length > 0" :data="fileList" style="width: 100%">
        <el-table-column prop="name" label="文件名" width="180"></el-table-column>
        <el-table-column prop="size" label="压缩前大小" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.size / 1000 }} kb</span>
          </template>
        </el-table-column>
        <el-table-column label="压缩后大小" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.response ? (scope.row.response.data.output.size/1000 + ' kb') : '...'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="进度">
          <template slot-scope="scope">
            <el-progress status="success" :percentage="Number(scope.row.percentage.toFixed(1))"></el-progress>
          </template>
        </el-table-column>
        <el-table-column label="压缩比" width="100">
          <template slot-scope="scope">
            <span
              v-if="scope.row.response"
            >{{(scope.row.response.data.output.size / scope.row.response.data.input.size * 100).toFixed(1)}} %</span>
            <span v-else>...</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.response"
              :plain="true"
              type="success"
              size="mini"
              @click.native="download(scope.row.response.data.output.url)"
            >下载文件</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import { apiDomain, env } from '../../config'
console.log('apiDomain', apiDomain[env])
let moreFileList = [];
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      fileList: [],
      qualityNames: [
        { quality: "low", name: "低" },
        { quality: "medium", name: "中" },
        { quality: "high", name: "较高" },
        { quality: "veryhight", name: "很高" }
      ],
      uploadParams: {
        quality: "low",
        count: 1
      },
      //action:'http://totem.songdonghong.com/api/open/upload'
      action: apiDomain[env] + "/api/open/uploadMore"
    };
  },
  methods: {
    handleUpload() {
      let param = new FormData();

      for (let i = 0; i < this.fileList.length; i++) {
        param.append('files', this.fileList[i]['raw'])
      }
      let curTime = new Date().getTime()
      let appkey = ''
      let appSecret = ''
      let privateKey = ""
      param.append("time", curTime);
      param.append("appKey", appkey);      
      param.append("privateKey", privateKey);      
      let config = {
        //添加请求头
        headers: { "Content-Type": "multipart/form-data" }
      };
      axios
        .post(this.action, param, config)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });


      // this.$refs.uploadId.submit()
    },
    uploadFile(file) {
      console.log("uploadFile", file);
      // let formData = new FormData()
    },
    handleChange(val) {
      console.log("handleChange", val);
      this.uploadParams["count"] = val;
    },
    download(url) {
      window.open(url);
    },
    handleFileListChange(file, fileList) {
      this.fileList = fileList;
    },
    handleProgress(event, file, fileList) {
      this.fileList = fileList;
    },
    handleUploadError(err, file, fileList) {
      console.error(err);
      this.$message({
        type: "error",
        message: "错误，请稍候再试"
      });
    },
    handleUploadSuccess(resp, file, fileList) {
      this.$message({
        type: "error",
        message: resp.msg || "错误，请稍候再试"
      });
    }
  }
};
</script>

<style lang="scss">
.content-wrapper {
  padding: 100px 0;
}
.setting-wrapper {
  text-align: left;
  width: 428px;
  margin: 0 auto;
  .el-radio-button__inner {
    color: #000;
  }
  .el-radio-button:first-child .el-radio-button__inner {
    border-radius: 0;
  }
  .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0;
  }
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: #12171e;
    border-color: #12171e;
    box-shadow: -1px 0 0 0 #12171e;
  }
  .el-radio-button__inner:hover {
    color: #000;
  }
}
.uploader-wrapper {
  .uploader {
    width: 360px;
    display: block;
    cursor: pointer;
    text-align: center;
    margin: 30px auto;
    em {
      color: #20a0ff;
      font-style: normal;
    }
    .el-upload-list {
      text-align: left;
    }
    .el-upload-dragger {
      border-width: 2px;
      border-color: #000;
    }
    .el-upload-dragger:hover {
      border-color: #12171d;
    }
    .drag-box {
      background-color: #fff;
      color: #000;
      border-radius: 6px;
      box-sizing: border-box;
      width: 360px;
      height: 180px;
      text-align: center;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .icon-upload {
      margin-bottom: 20px;
    }
    .el-upload__input {
      display: none;
    }
  }
}
</style>
