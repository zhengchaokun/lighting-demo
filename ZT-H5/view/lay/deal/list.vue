
<template>
    <div>
        <cmd :com="comData"></cmd>
    </div>
</template>
<script>
    import cmd from "../../../ui/cmd.vue"

    const processMap ={
        "1":{
            checkProd(){
            },
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
            checkFilter:null,
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
        },"4":{
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
