<template>
    <div>
        <input class="input" type="text" placeholder="请输入链接ID" @change="change" v-model="psID"/>
        <textarea class="text" name="" id="" cols="30" rows="10" @change="change" placeholder="同步信息的数据"
                  v-model="text"></textarea>
        <button class="btn" @click="confirm()">确认</button>
        <button class="btn"  @click="send()">发送</button>
    </div>
</template>
<script>
    const websocket = weex.requireModule('webSocket');
    const clipboard = weex.requireModule('clipboard');
    const storage = weex.requireModule('storage');

    export default {
        data() {
            return {
                psID:'',
                text:''
            }
        },
        methods:{
            confirm(){
                const that = this;
                storage.setItem("psID",this.psID);
                websocket.WebSocket(`wss://pself.net/api/clipboard?id=${this.psID}`, '');
                websocket.onopen = function(e) {
                    console.log(123)
                };
                websocket.onmessage = function(e) {
                    that.text = JSON.parse(e.data).data;
                    clipboard.setString(that.text);
                };
                websocket.onerror = function(e) {
                };
                websocket.onclose = function(e) {
                }
            },
            change(){},
            send(){
                websocket.send(JSON.stringify({
                    type:"clipboard",
                    data:this.text
                }))
            }
        },
        mounted(){
            const that = this;
            storage.getItem("psID",function (e) {
                that.psID = e.data || '';
            });
        }
    }
</script>
<style scoped>
    .input{
        width: 750px;
        height:100px;
    }
    .text{
        width: 750px;
        height:400px;
    }

    .btn{
        width: 750px;
        height:100px;
        margin-top: 30px;
    }
</style>
