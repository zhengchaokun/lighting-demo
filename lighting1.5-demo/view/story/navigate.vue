
<template>
    <div style="width:750px;height: 1334px;">
        <div class="doc" style="margin-top: 40px;margin-bottom: 40px;">
            <text class="title" style="margin-bottom: 30px;">需求：jsn访问js资源</text>
            <text class="desc" style="margin-top:20px;">验收标准：跳转成功，控制台打印出信息。</text>
        </div>
        <div class="demo">
            <lc-button class="button" type="normal" text="访问js资源" @LcButtonClicked="jump"></lc-button>
        </div>
        
    </div>
</template>
<script>
    import LcButton from "lighting-ui/packages/lc-button";
    export default {
        components: {
            LcButton
        },
        data(){
            return {}
        },
        methods: {
            jump() {
                this.$light.navigate('http://dotwe.org/raw/dist/519962541fcf6acd911986357ad9c2ed.js', {},{
                    callback: function(){
                        console.log('访问成功！')
                    }
                })
            }
        }
        
        
    }
</script>
<style scoped>
.doc {
    padding-left: 40px;
    padding-right: 40px;
}
.title {
    font-size: 36px;
    text-align: center;
}
.desc {
    font-size: 32px;
    text-align: left;
}
.demo {
    align-items: center;
}
</style>
