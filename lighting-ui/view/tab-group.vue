
<template>
  <div class="demo">
    <scroller class="scroller">
      <title title="lc-fold-list"></title>
      <category title="默认按钮组"></category>
      <lc-tab-group :groups="groups" @clickTab="clickGroup"></lc-tab-group>
      <category title="自定义按钮组"></category>
      <lc-tab-group :groups="groups" :tabStyles="tabStyles"></lc-tab-group>

    </scroller>
  </div>
</template>

<script>
    import Title from 'lighting-ui/packages/_mods/title.vue';
    import Category from 'lighting-ui/packages/_mods/category.vue';
    import LcTabGroup from 'lighting-ui/packages/lc-tab-group';

    export default {
        components: { Title, Category, LcTabGroup },
        data(){
            return {
                groups:[
                            { text: "业务公告" },
                            { text: "定期公告" },
                            { text: "法律文件" },
                            { text: "新闻资讯" } 
                        ],
                tabStyles:{
                    width: 580,
                    height: 80,
                    fontSize:28,
                    titleColor:'#999', //默认文字颜色
                    activeColor:'red',//默认背景色 选中颜色
                    borderColor:'yellow',//边框颜色 选中背景色
                }        
            }
        },
        methods:{
            clickGroup(index){
                console.log(index)
            }
        }
    }
</script>
<style scoped>

</style>
