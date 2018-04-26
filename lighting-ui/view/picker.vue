
<template>
  <div class="wxc-demo">
    <title title="lc-popup"></title>
    <category title="使用案例"></category>

    <div class="button-list">
      <lc-button text="打开三级选择" class="btn-margin"
                    type="normal"
                    @LcButtonClicked="openPicker"></lc-button>
      <lc-button text="打开二级选择" class="btn-margin"
                    type="normal"
                    @LcButtonClicked="openPicker"></lc-button>
    </div>

    <lc-popup width="750"
                :show="show"
                pos="bottom"
                height="470"
                ref="LcPopup"
                @LcPopupOverlayClicked="closePicker">

      <lc-picker ref="picker" :pickerData="pickerData" class="date-picker"></lc-picker>

    </lc-popup>

  </div>
</template>

<style scoped>
  .wxc-demo {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
  }
  .date-picker {
    width: 750px;
    height: 470px;
  }
  .button-list {
    padding-left: 24px;
  }
  .btn-margin {
    margin-top: 40px;
  }

</style>

<script>
  import LcPopup from 'lighting-ui/packages/lc-popup';
  import LcPicker from 'lighting-ui/packages/lc-picker';
  import Title from 'lighting-ui/packages/_mods/title.vue';
  import Category from 'lighting-ui/packages/_mods/category.vue';
  import LcButton from 'lighting-ui/packages/lc-button';
  import Date from 'date.js';

  export default {
    components: { Title, Category, LcPopup, LcPicker,LcButton },
    data: () => ({
      show:false,
      pickerData: {
        columns: 3,
        data: Date.data
      }
    }),
    methods:{
      openPicker () {
        this.show = true;
      },
      closePicker (){
        this.show = false;
      }
    }
  };
</script>
