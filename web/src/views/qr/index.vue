<template>
  <div class="content-wrapper">
    <div class="left">
      <el-input placeholder="请输入文本内容,点击生成二维码" type="textarea" v-model="textValue"></el-input>
      <div class="btn-gen" @click="handleGenQr">生成二维码</div>
    </div>
    <div class="right">
      <img v-show="imgUrl" :src="imgUrl" />
      <div v-show="!imgUrl" class="empty"></div>
      <div class="btn-gen" @click="handleDown">保存图片</div>
    </div>
  </div>
</template>

<script>
import { Encoder } from '@nuintun/qrcode';

export default {
  name: 'app',
  data() {
    return {
      textValue: "",
      imgUrl: ""
    }
  },
  methods: {
    handleGenQr() {
      const qrcode = new Encoder()
      qrcode.write(this.textValue);
      qrcode.make();
      console.log(qrcode.toDataURL())
      this.imgUrl = qrcode.toDataURL(10, 16)
    },
    handleDown() {
      if(!this.imgUrl) return
      let oA = document.createElement("a");
      oA.download = '';// 设置下载的文件名，默认是'下载'
      oA.href = this.imgUrl;
      document.body.appendChild(oA);
      oA.click();
      oA.remove()      
    }
  }
}
</script>
<style lang="scss">
.el-textarea__inner {
  height: 260px;
}
</style>

<style scoped lang="scss">
.content-wrapper {
  display: flex;
  margin: 0 180px;
  padding: 100px 0;
  min-height: 300px;
  .btn-gen {
    text-align: center;
    background-color: rgba(51, 51, 51, 1);
    color: white;
    width: 110px;
    height: 40px;
    line-height: 40px;
    border-radius: 8px;
    margin: 0 auto;
    margin-top: 20px;
  }
  .left {
    flex: 1;
    min-height: 200px;
    margin-right: 10px;
    .input-text {
      height: 260px;
    }
  }
  .right {
    width: 260px;
    height: 260px;
    margin-left: 10px;
    border: 1px solid #dcdfe6;
    img {
      display: inline-block;
      width: 100%;
    }
    .empty {
      width: 260px;
      height: 260px;
    }
  }
}
</style>
