
<template>
    <div>
       <div class="tabBar">
           <div class="flex-1 flex-row justify-center align-center pd20" @click="jumpToday">
               <text :class="[delegateIndex==0?'f-red':'']">当日委托</text>
           </div>
           <div class="flex-1 flex-row justify-center align-center pd20" @click="jumpDeal">
               <text :class="[delegateIndex==1?'f-red':'']">当日成交</text>
           </div>
       </div>
        <div class="container">
            <sub-view></sub-view>
        </div>
    </div>
</template>
<script>
    import Light from 'light'
    export default {
        data(){
            return {
                delegateIndex: ''
            }
        },
        methods:{
            jumpToday(){
                Light.navigate('#/trade_detail/delegate/today',{},{
                    replace: true
                });
            },
            jumpDeal(){
                Light.navigate('#/trade_detail/delegate/deal',{},{
                    replace: true
                });
            }
        },
        created(){
            console.log('delegateListen......')
            Light.on('delegateChange', (index) => {
                this.delegateIndex = index;
            })
        },
        mounted(){
            Light.trigger('tabChange', 3)
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
    .tabBar{
        position: fixed;
        left: 0;
        right: 0;
        height: 80px;
        flex-direction: row;
        align-items: center;
        background-color: #ffffff;
        border-bottom-width: 1px;
        border-bottom-color: #dddddd;
    }
    .container{
        margin-top: 80px;
    }
</style>
