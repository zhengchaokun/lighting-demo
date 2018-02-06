
<template>
    <div>
        <input type="text" @change="change" v-if="type=='text'" v-model="text1"/>
        <input type="password" @change="change" v-if="type=='password'" v-model="text2"/>
        <button @click="toggle">切换</button>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                text1:'',
                text2:'',
                type:"password"
            }
        },
        methods:{
            toggle(){
                const that =this;
                if(this.type==='password'){
                    this.type= "text";
                    this.$nextTick(function () {
                        that.text1 = that.text2;
                    })
                }else{
                    this.type= "password";
                    this.$nextTick(function () {
                        that.text2 = that.text1;
                    })
                }
            },
            //必须有这个
            change(){}
        }
    }
</script>
<style scoped>

</style>
