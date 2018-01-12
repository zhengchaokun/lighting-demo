
<template>
  <div class="wxc-demo">
    <scroller>
      <title title="lc-grid"></title>
      <category title="默认3列"></category>
      <lc-grid :list="all"></lc-grid>

      <category title="自定义列"></category>
      <lc-grid :cols="5" :list="text"></lc-grid>

      <category title="可有网格"></category>
      <lc-grid :cols="4" :list="img" :border="true"></lc-grid>

    </scroller>
  </div>
</template>

<script>
    import LcGrid from 'lighting-ui/packages/lc-grid';
    import Title from '../_mods/title.vue';
    import Category from '../_mods/category.vue';

    export default {
        components: { Title, Category, LcGrid },
        data(){
            return {
                all: [
                        {
                            label:"button",
                            icon: "https://i.loli.net/2017/12/19/5a387c4f536a1.png",
                            path: "/index/button",
                            clicked(){
                                console.log('/index/button')
                            }
                        },
                        {
                            label:"select",
                            icon: "https://i.loli.net/2017/12/19/5a387c4f536a1.png",
                            path: "/index/select",
                            clicked(){
                                console.log('/index/select')
                            }
                        },
                        {
                            label:"input",
                            icon: "https://i.loli.net/2017/12/19/5a387c4f536a1.png",
                            path: "/index/input",
                            clicked(){
                                console.log('/index/input')
                            }
                        },
                        {
                            label:"slide",
                            icon: "https://i.loli.net/2017/12/19/5a387c4f536a1.png",
                            path: "/index/slide",
                            clicked(){
                                console.log('/index/slide')
                            }
                        },
                        {
                            label: "image",
                            icon: "https://i.loli.net/2017/12/19/5a387c4f536a1.png",
                            path: "/index/image",
                            clicked(){
                                console.log('/index/image')
                            }
                        },
                        {
                            label: "radio",
                            icon: "https://i.loli.net/2017/12/19/5a387c4f536a1.png",
                            path: "/index/radio",
                            clicked(){
                                console.log('/index/radio')
                            }
                        }
                    ],
                text: [
                        {
                            label:"button",
                            path: "/index/button",
                            clicked(){
                                console.log('/index/button')
                            }
                        },
                        {
                            label:"select",
                            path: "/index/select",
                            clicked(){
                                console.log('/index/select')
                            }
                        },
                        {
                            label:"input",
                            path: "/index/input",
                            clicked(){
                                console.log('/index/input')
                            }
                        },
                        {
                            label:"slide",
                            path: "/index/slide",
                            clicked(){
                                console.log('/index/slide')
                            }
                        },
                        {
                            label: "image",
                            path: "/index/image",
                            clicked(){
                                console.log('/index/image')
                            }
                        },
                        {
                            label: "radio",
                            path: "/index/radio",
                            clicked(){
                                console.log('/index/radio')
                            }
                        }
                    ],
                img: [
                        {
                            icon: "https://i.loli.net/2017/12/19/5a387c4f536a1.png",
                            path: "/index/button",
                            clicked(){
                                console.log('/index/button')
                            }
                        },
                        {
                            icon: "https://i.loli.net/2017/12/19/5a387c4f536a1.png",
                            path: "/index/select",
                            clicked(){
                                console.log('/index/select')
                            }
                        },
                        {
                            icon: "https://i.loli.net/2017/12/19/5a387c4f536a1.png",
                            path: "/index/input",
                            clicked(){
                                console.log('/index/input')
                            }
                        },
                        {
                            icon: "https://i.loli.net/2017/12/19/5a387c4f536a1.png",
                            path: "/index/slide",
                            clicked(){
                                console.log('/index/slide')
                            }
                        },
                        {
                            icon: "https://i.loli.net/2017/12/19/5a387c4f536a1.png",
                            path: "/index/image",
                            clicked(){
                                console.log('/index/image')
                            }
                        },
                        {
                            icon: "https://i.loli.net/2017/12/19/5a387c4f536a1.png",
                            path: "/index/radio",
                            clicked(){
                                console.log('/index/radio')
                            }
                        }
                ]
            }
        }
    }
</script>
<style lang="less">

</style>
