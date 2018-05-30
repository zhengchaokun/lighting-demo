
<template>
  <scroller>
    <div style="width:750px;height: 1500px;">
        <title title="lighting1.5-demo" style="margin-bottom:30px;"></title>
        <lc-cell label="vue中注入light变量"
          @LcCellClicked="jump('$light')"
          :has-arrow="true"
          :has-bottom-border="false"></lc-cell>

          <lc-cell label="ajax与fetch整合"
          @LcCellClicked="jump('ajax')" 
          :has-arrow="true"
          :has-top-border="false"
          :has-bottom-border="false"></lc-cell>

        <lc-cell label="light plugin --fix清除npm缓存"
          @LcCellClicked="jump('cache')"       
          :has-arrow="true"
          :has-top-border="false"
          :has-bottom-border="false"></lc-cell>

        <lc-cell label="light检查更新"
          @LcCellClicked="jump('checkUpdate')"           
          :has-arrow="true"
          :has-top-border="false"
          :has-bottom-border="false"></lc-cell>

        <lc-cell label="jsn支持指定视图调试"
          @LcCellClicked="jump('debug')"           
          :has-arrow="true"
          :has-top-border="false"
          :has-bottom-border="false"></lc-cell>
        
        <lc-cell label="jsn支持dom操作"
          @LcCellClicked="jump('dom')"           
          :has-arrow="true"
          :has-top-border="false"
          :has-bottom-border="false"></lc-cell>

        <lc-cell label="light install 安装插件和依赖"
          @LcCellClicked="jump('install')"          
          :has-arrow="true"
          :has-top-border="false"
          :has-bottom-border="false"></lc-cell>

        <lc-cell label="支持以本机ip打开调试窗口"
          @LcCellClicked="jump('ip')"           
          :has-arrow="true"
          :has-top-border="false"
          :has-bottom-border="false"></lc-cell>

        <lc-cell label="native打包生成的.gmu文件自动格式化"
          @LcCellClicked="jump('json')"           
          :has-arrow="true"
          :has-top-border="false"
          :has-bottom-border="false"></lc-cell>
        
        <lc-cell label="支持项目依赖出现在根目录"
          @LcCellClicked="jump('modules')"           
          :has-arrow="true"
          :has-top-border="false"
          :has-bottom-border="false"></lc-cell>

        <lc-cell label="jsn访问js网络资源"
          @LcCellClicked="jump('navigate')"           
          :has-arrow="true"
          :has-top-border="false"
          :has-bottom-border="false"></lc-cell>

        <lc-cell label="针对不同浏览器给css属性增加前缀"
          @LcCellClicked="jump('autoprefix')"          
          :has-arrow="true"
          :has-top-border="false"
          :has-bottom-border="false"></lc-cell>

        <lc-cell label="支持jsn工程的自定义build.js"
          @LcCellClicked="jump('build')"          
          :has-arrow="true"
          :has-top-border="false"
          :has-bottom-border="true"></lc-cell>
    </div>
  </scroller>
</template>
<script>
    import Title from 'lighting-ui/packages/_mods/title.vue';
    import LcCell from 'lighting-ui/packages/lc-cell';
    
    import App from "light";
    export default {
        components: {
            LcCell, Title
        },
        data(){
            return {}
        },
        methods: {
            jump(view) {
                App.navigate('#/story/' + view);
            }
            
        }
    }
</script>
<style scoped>
 
</style>
