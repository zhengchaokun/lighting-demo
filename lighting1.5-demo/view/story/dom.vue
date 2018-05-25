
<template>
    <div style="width:750px;height: 1334px;">
        <div class="doc" style="margin-top: 40px;margin-bottom: 40px;">
            <text class="title" style="margin-bottom: 30px;">需求：验证jsn是否支持dom操作</text>
            <text class="desc" style="margin-bottom: 20px;">验收标准：（在手机上）点击按钮后在页面添加一个弹框，3秒后移除</text>
        </div>
        <div class="demo">
            <lc-button class="button" text="添加弹框" @wxcButtonClicked="showWin($event)"></lc-button>
        </div>
    </div>
   
</template>
<script>
    import LcButton from 'lighting-ui/packages/lc-button';
    import App from "light";
    export default {
        components: {
            LcButton
        },
        data(){
            return {
                textStyle: {
                    color: '#606060',
                    fontSize: '40px'
                },
                wrapStyle: {
                    position: 'fixed',
                    top: '0',
                    bottom: '0',
                    width: '750px',
                    backgroundColor: 'rgba(33, 33, 33, 0.6)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                },
                innerStyle: {
                    width: '600px',
                    display: 'flex',
                    height: '360px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: '#d2e9e3'
                }
            }
        },
        methods: {
            showWin(e) {
                var ce =  weex.document.createElement;
                var body = weex.document.body;
               
                var div = ce('div');
                div.style = this.wrapStyle;
                var div_inner = ce('div');
                div_inner.style = this.innerStyle;
                var text = ce('text');
                text.setAttr('value','这是一个弹框，3秒后自动关闭');
                text.style = this.textStyle;
                body.appendChild(div);
                div.appendChild(div_inner);
                div_inner.appendChild(text);
                div.addEvent('click', function(e) {
                    e.stopPropagation();
                })
                setTimeout(() => {
                    body.removeChild(div);
                }, 3000); 
            }
        },
        mounted () {
           
        }
    }
</script>
<style scoped>
    .button {
        margin-left: 20px;
        margin-top: 300px;
    }

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
 
</style>
