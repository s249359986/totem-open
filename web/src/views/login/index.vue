<template>
  <div class="content-wrapper t-center">
    <el-button class="full-btn" type="danger" @click="handleLogin">登录</el-button>
  </div>
</template>
<script>
export default {
  name: 'login',
  methods: {
    handleLogin () {      
    }
  }
}
</script>
<style lang="scss">
.t-center {
  text-align: center;
}
.full-btn {
  margin-top: 100px;
  width: 300px;
}
</style>
