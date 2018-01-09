<template>
    <div class="wrapper">
        <div class="btn btn-margin red"
            @click="openLeftPopup">
            <text class="btn-txt">点击弹出左侧面板</text>
        </div>
        <lc-popup width="500"
                 :show="isLeftShow"
                 @LcPopupOverlayClicked="popupOverlayLeftClick"
                 pos="left"></lc-popup>
    </div>
</template>

<script>
    import LcPopup from 'lighting-ui/packages/lc-popup';
    export default {
        components: { LcPopup },
        data: () => ({
            isLeftShow: false,
            height: 400
        }),
        methods: {
            openLeftPopup () {
                this.isLeftShow = true;
            },
            popupOverlayLeftClick () {
                this.isLeftShow = false;
            },
        }
    };
</script>
<style scoped>
  .wxc-demo {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
  }

  .scroller {
    flex: 1;
  }

  .btn {
    width: 600px;
    height: 80px;
    margin-top: 150px;
    margin-left: 75px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: rgb(92, 184, 92);
    border-color: rgb(76, 174, 76);
  }

  .red {
    background-color: #C3413D;
    border-color: #C3413D;
  }

  .btn-txt {
    font-size: 32px;
    color: #ffffff;
  }

  .btn-margin {
    margin-top: 40px;
  }

</style>