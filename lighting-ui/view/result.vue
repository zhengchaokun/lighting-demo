<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/26. -->

<template>
  <div class="wxc-demo">
    <lc-result  :icon="icon"
                :title="title"
                :desc="desc"
                padding-top="232"
                @onResultClick="resultClicked"
                ></lc-result>
  </div>
</template>

<style scoped>
  .wxc-demo {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #fff;
  }
</style>

<script>
  import Light from 'light'
  const modal = Light.requireModule('modal');

  import LcResult from 'lighting-ui/packages/lc-result';

  import TYPE from 'result.js'

  export default {
    components: { LcResult },
    data: () => ({
      icon: TYPE['error']['icon'],
      title: TYPE['error']['title'],
      desc: TYPE['error']['desc'],
    }),
    methods: {
      resultClicked (e) {
        modal.toast({
          'message': e.title,
          'duration': 2
        })
      }
    }
  };
</script>
