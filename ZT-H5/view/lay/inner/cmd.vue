
<template>
    <div>
        <cmd :com="comData"></cmd>
    </div>
</template>
<script>
    import cmd from "../../../ui/cmd.vue"

    const processMap ={
        "1":{
            checkProd:null,
            checkFilter:null,
            clickBtn:{
                title:"撤销",
                cls:"bgRed",
                handler(){
                }
            }
        },"2":{
            checkProd(){
            },
            checkFilter:[{
                title:"未执行",
                filter(item){},
            },{
                title:"执行中",
                filter(item){},
            },{
                title:"已完成",
                filter(item){},
            },{
                title:"已撤销",
                filter(item){},
            }],
            clickBtn:{
                title:"撤销",
                cls:"bgRed",
                handler(){
                }
            }
        },"3":{
            checkProd(){
            },
            checkFilter:null,
            clickBtn:{
                title:"平仓",
                cls:"bgBlue",
                handler(){
                }
            }
        }
    };
    export default {
        data(){
            return {
                comData:processMap[this.$route.query.type+'']
            }
        },
        components:{
            cmd
        },
        watch:{
            "$route.query.type":function () {
                this.comData = processMap[this.$route.query.type+''];
            }
        },
        mounted(){

        }
    }
</script>
<style lang="less">
</style>