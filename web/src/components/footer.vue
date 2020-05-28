<template>
 
    
<footer class="footer">
    <div class='item-wrap'>
           <div class="footer-item">
                    <p>关注我们</p>
                    <div class="call-content">
                        <div>                            
                            <img src='//static.songdonghong.com/img/qdzd.jpg'>
                            <p>官方订阅号</p>
                        </div>
                        <div>                            
                                <img src='//static.songdonghong.com/img/xcx.jpg'>
                                <p>我的微信</p>
                        </div>
                   
                   
                    </div>
            </div> 
            <div class="seperator-s"></div> 
            <div class="footer-item">
                    <p>友情链接</p>   
                    <div class="link">                        
                        <a target='_blank' href="//cn.vuejs.org/">vue中文网</a>
                        <a target='_blank' href="//flutterchina.club/">flutter中文网</a>
                        <a target='_blank' href="//react.docschina.org/">react中文网</a>
                        <a target='_blank' href="//nodejs.cn/">nodejs中文网</a>
                        <a target='_blank' href="//www.expressjs.com.cn/">expressjs中文网</a>
                        <a target='_blank' href="//www.webpackjs.com/">webpack中文网</a>                        
                    </div>                 
                           
            </div>  
        </div>
        <div class="seperator"></div>
        <p style="font-size:18px;color: #B4B4B0;text-align: center;"> © 2019 宋冬红 版权所有</p> 
        <a target="_blank" href="http://beian.miit.gov.cn/state/outPortal/loginPortal.action" style="width:100%;display:block;font-size:18px;color: #B4B4B0;text-align: center;">京ICP备19035663号</a>               
        </footer>
</template>

<script>
export default {
  name: 'header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .footer{
  margin-top: 0.8rem;
  padding: 0.8rem;
  background-color: #333;
  color:white;  
  font-size: 20px;  
}
.item-wrap{
    display: flex;    
}
.footer-item{
    width: 49%;
    padding: 0 40px;
    box-sizing: border-box;
}
.seperator{
  height: 1px;
  margin: 19px 0;
  background-color: #5b5251;
}
.seperator-s{
    width: 1px;
    background-color: #5b5251;
    padding: 36px 0px;
    box-sizing: border-box;
    background-clip: content-box;
}

a{
  color: white;
  cursor: pointer;  
}
a,a:hover,a:visited,a:active{
    text-decoration : none;
}
.link {
    margin-top: 20px;    
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;   
}
.link a{
    border: 1px solid hsla(0,0%,100%,.2);
    border-radius: 3px;    
    font-size: 14px;
    color: #999;
    padding: 10px;
    margin-right: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    width: 130px;
    text-align: center;
}
.call-content{    
    display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */  
    margin-top: 20px;
}
.call-content>div{
    width:16%;
    margin-right: 60px;
    margin-left: 60px;
}
.call-content img{
    width: 100%;
}
.call-content p{
    width: 100%;
    text-align: center;
    font-size: 14px;
    margin-top: 10px;
}

</style>
