
<template>
    <div style="width:750px;height: 1334px;">
        <wxc-button class="button" text="添加弹框" @wxcButtonClicked="showWin($event)"></wxc-button>
    </div>
   
</template>
<script>
    import WxcButton from 'weex-ui/packages/wxc-button';

    export default {
        components: {
            WxcButton
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
                text.setAttr('value','这是一个弹框，5秒后自动关闭');
                text.style = this.textStyle;
                body.appendChild(div);
                div.appendChild(div_inner);
                div_inner.appendChild(text);
                div.addEvent('click', function(e) {
                    e.stopPropagation();
                })
                setTimeout(() => {
                    body.removeChild(div);
                }, 5000); 
            }
        }
    }
</script>
<style lang="less">
    .button {
        margin-left: 20px;
        margin-top: 300px;
    }
 
</style>
