<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <div class="wxc-title" :aria-hidden="true">
    <image class="logo" src="https://i.loli.net/2017/12/19/5a387c4f536a1.png"></image>
    <text class="text">{{title}}</text>
  </div>
</template>

<style scoped>
  .wxc-title {
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
  }

  .logo {
    width: 100px;
    height: 100px;
  }

  .text {
    font-size: 30px;
    font-weight: 600;
    color: #000;
  }

</style>

<script>
  export default {
    props: {
      title: String
    }
  }
</script>
