<template>
  <div class="page">
    <div class="alert-box" v-html="msg"></div>  
  </div>
</template>
<script>
export default {
  data(){
    return {};
  },
  props:['msg'],
  methods:{}
}
</script>
<style lang="less" scoped>

.alert-box{
  background-color:#000000;
  line-height: 30px;
  font-size: 28px;
  border-radius: 4px;
  padding: 30px;
  opacity: 0.8;
  position: fixed;
  bottom: 0;
  left: 0;
  right:0;
  text-align: center;
  z-index:9999;
  color: #fff;
}



</style>
