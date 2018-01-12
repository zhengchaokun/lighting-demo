
<template>
  <div class="demo">
    <scroller class="scroller">
      <title title="lc-fold-list"></title>
      <category title="默认按钮组"></category>
      <lc-button-group :buttons="buttons"></lc-button-group>

    </scroller>
  </div>
</template>

<script>
    import Title from 'lighting-ui/packages/_mods/title.vue';
    import Category from 'lighting-ui/packages/_mods/category.vue';
    import LcButtonGroup from 'lighting-ui/packages/lc-button-group';

    export default {
        components: { Title, Category, LcButtonGroup },
        data(){
            return {
                buttons:[
                            {
                                text:'Apple',
                                clicked(){
                                console.log('测试按钮1')
                                }
                            },
                            {
                                text:'Banana',
                                clicked(){
                                console.log('测试按钮2')
                                }
                            },
                            {
                                text:'Cat',
                                clicked(){
                                console.log('测试按钮3')
                                }
                            },
                            {
                                text:'Dog',
                                clicked(){
                                console.log('测试按钮4')
                                }
                            }
                        ]
            }
        }
    }
</script>
<style lang="less">

</style>
