<template>
  <div id="app">  
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from './components/header'
import Footer from './components/footer'
export default {
  name: 'app',
  components:{
    Header,
    Footer
  },
  data () {
    return {
      currentPath: ''
    }
  },
  created () {    
  },
  computed: {
    routes () {
      return this.$router.options.routes
    }
  },  
  methods: {
  }
}
</script>

<style lang="scss">
.header-wrapper {
  height: 60px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  background: #12171d;
  font-size: 16px;
  .header {
    width: 1200px;
    height: 100%;
    display: flex;
  }
  .h-logo-wrapper {
    height: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    color: #fff;
    width: 160px;
    .logo {
      font-size: 40px;
      padding-left: 50px;
      background-image: url('./assets/totem.png');
      background-repeat: no-repeat;
      background-size: contain;
    }
    img {
      height: 22px;
    }
    p {
      font-size: 12px;
      line-height: 1;
      text-align: center;
    }
  }
  .header-item {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 22px;
    color: #fff;
    cursor: pointer;
    &.cur {
      color: #12171d;
      background: #fff;
    }
    &:hover {
      color: #12171d;
      background: #fff;
    }
  }
}
</style>
