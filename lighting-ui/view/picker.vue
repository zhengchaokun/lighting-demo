
<template>
  <div class="wxc-demo">
    <title title="lc-popup"></title>
    <category title="使用案例"></category>

    <lc-popup width="750"
                show="true"
                pos="bottom"
                height="470"
                ref="LcPopup"
                @LcPopupOverlayClicked="popupOverlayRightClick">

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
</style>

<script>
  import LcPopup from 'lighting-ui/packages/lc-popup';
  import LcPicker from 'lighting-ui/packages/lc-picker';
  import Title from 'lighting-ui/packages/_mods/title.vue';
  import Category from 'lighting-ui/packages/_mods/category.vue';
  import Date from 'date.js';

  export default {
    components: { Title, Category, LcPopup, LcPicker },
    data: () => ({
      pickerData: {
        columns: 3,
        data: Date.data
      }
    }),
    created () {
      setTitle('Picker');
    }
  };
</script>
