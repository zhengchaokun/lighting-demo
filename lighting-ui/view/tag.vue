<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="lc-tag"></title>
      <category title="默认使用"></category>
      <div class="tag-list">
        <lc-tag v-for="(item,index) in demoData"
                :key="index"
                v-bind="item"></lc-tag>
      </div>
      <category title="文字标签配置"></category>
      <div class="sub-demo">
        <lc-cell
                :auto-accessible="false"
                label="是否为实心">
        <switch :checked="type==='solid'" slot="value"
                @change="type= type==='solid' ?'hollow' : 'solid'"></switch>
        </lc-cell>
        <lc-cell :has-top-border="false"
                :auto-accessible="false"
                label="标签颜色">
        <input class="input" slot="value"
                placeholder="请输入标签色值"
                :value="tagColor"
                @input="tagColor=$event.value"/>
        </lc-cell>
        <lc-cell :has-top-border="false"
                :auto-accessible="false"
                label="文字颜色">
        <input class="input" slot="value"
                placeholder="请输入文字色值"
                :value="fontColor"
                @input="fontColor=$event.value"/>
        </lc-cell>
        <lc-cell :has-top-border="false"
                :auto-accessible="false"
                label="标签内容">
        <input class="input" slot="value"
                placeholder="请输入tag文字内容"
                :value="value"
                @input="value=$event.value"/>
        </lc-cell>
        <div class="demo">
        <lc-tag :type="type" 
                :tag-color="tagColor"
                :font-color="fontColor"
                :value="value"></lc-tag>
        </div>
     </div>
     <!-- <category title="特殊标签配置"></category>
      <special-advance></special-advance>
      <category title="图片标签配置"></category>
      <image-advance></image-advance> -->
    </scroller>
  </div>
</template>

<style scoped>
  .tag-list {
    flex-direction: row;
    justify-content: space-between;
    padding-top: 40px;
    padding-right: 24px;
    padding-left: 24px;
    padding-bottom: 60px;
  }
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
  .input {
    width: 300px;
    text-align: right;
  }

  .demo {
    align-items: center;
    justify-content: center;
    height: 100px;
    margin-bottom: 20px;
  }


</style>

<script>
  import Data from './tools/tag-data'
  import Title from '../_mods/title.vue';
  import LcTag from 'lighting-ui/packages/lc-tag';
  import LcCell from 'lighting-ui/packages/lc-cell';
  import Category from '../_mods/category.vue';
//   import Advance from './advance.vue';
//   import ImageAdvance from './image-advance.vue';
//   import SpecialAdvance from './special-advance.vue';

  export default {
    components: { Title, Category, LcTag, LcCell },
    data: () => ({
      demoData:Data,
      type: 'solid',
      tagColor: '#399DE2',
      fontColor: '#ffffff',
      value: '实心标签'
    })
  }
</script>
