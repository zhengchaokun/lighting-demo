
<template>
    <div>
       <lc-input type="text" value="value1" v-if="!isPwd"></lc-input>
       <lc-input type="password" value="value2" v-if="isPwd"></lc-input>
       <div @click="show()">显示密码</div>
    </div>
</template>
<script>
    import LcInput  from 'lighting-ui/packages/lc-input';
    export default {
        components:{LcInput},
        data(){
            return {
                value1: '',
                value2: '',
                isPwd: true
            }
        },
        methods:{
            show(){
                let tmp;
                if(this.isPwd){
                    tmp = this.value2;
                    console.log(tmp)
                    // this.isPwd = !this.isPwd;
                    // this.value1 = tmp;  
                }else{
                    tmp = this.value1;
                    console.log(tmp)
                    this.isPwd = !this.isPwd;
                    this.value2 = tmp;
                }
            }
        }
    }
</script>
<style lang="less">

</style>
