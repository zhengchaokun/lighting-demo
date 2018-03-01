
<template>
    <div>
        <!-- content -->
        <div class="content">
            <sub-view></sub-view>
        </div>
        <!-- tab栏 -->
        <div class="tabBar">
            <div :class="['tabItem', index==tabIndex?'bottom-border':'']" v-for="(item, index) in tabTitles" :key="index" @click="changeTab(item, index)">
                <text :class="['tabBar-text', index==tabIndex?'f-white':'f-dark3']" >{{item.title}}</text>
            </div>
        </div>
    </div>
</template>
<script>
    import Light from 'light'
    export default {
        data(){
            return {
                tabIndex: 0,
                tabTitles:[
                    {
                        title: '买入',
                        path: '#/trade_detail/buy'
                    },
                    {
                        title: '卖出',
                        path: '#/trade_detail/sell'
                    },
                    {
                        title: '撤单',
                        path: '#/trade_detail/cancel'
                    },
                    {
                        title: '委托',
                        path: '#/trade_detail/delegate'
                    },
                    {
                        title: '持仓',
                        path: '#/trade_detail/hold'
                    }
                ]
            }
        },
        methods:{
            changeTab(item, index){
                Light.navigate(item.path,{},{
                    replace: true
                });
            }
        },
        /* 监听类代码需要放在created中，mounted会从最底层子视图往上挂载执行监听不到  */
        created(){
            Light.on('tabChange', (index)=>{
                this.tabIndex = index;
            })
        },
    }
</script>
<style scoped src="../css/ui.css"></style>
<style scoped>
    .tabBar{
        position: fixed;
        left: 0;
        right: 0;
        height: 80px;
        flex-direction: row;
        align-items: center;
        background-color: #f35151;
    }
    .tabItem{
        height: 76px;
        flex: 1;
        justify-content: center;
        align-items: center;
        border-bottom-width: 2px;
        border-bottom-color: #f35151;
        margin-left: 20px;
        margin-right: 20px;
    }
    .bottom-border{
        border-bottom-width: 2px;
        border-bottom-color: #ffffff;
    }
    .content{
        margin-top: 80px;
    }
</style>
