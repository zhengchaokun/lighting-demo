<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="lc-radio"></title>
      <category title="Radio可选"></category>
      <lc-radio :list="list"
                 @LcRadioListChecked="LcRadioListChecked"></lc-radio>
      <text class="radio-text">checkedItem: {{checkedInfo}}</text>
      <category title="Radio不可选"></category>
      <lc-radio :list="list2"></lc-radio>
    </scroller>
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

  .scroller {
    flex: 1;
  }

  .radio-text {
    font-size: 30px;
    color: #333;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 24px;
  }
</style>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import LcRadio from 'lighting-ui/packages/lc-radio';

  export default {
    components: { Title, Category, LcRadio },
    data: () => ({
      list: [
        { title: '选项1', value: 1 },
        { title: '选项2', value: 2, checked: true },
        { title: '选项3', value: 3 },
        { title: '选项4', value: 4 }
      ],
      list2: [
        { title: '未选不可修改', value: 5, disabled: true },
        { title: '已选不可修改', value: 6, disabled: true, checked: true }
      ],
      checkedInfo: { title: '选项2', value: 2, oldIndex: -1, index: 1 }
    }),
    methods: {
      LcRadioListChecked (e) {
        this.checkedInfo = e;
      }
    }
  }
</script>
