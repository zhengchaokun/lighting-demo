<template>
    <div class="wrapper">
        <lc-cell label="hhh" title="more"></lc-cell>
        <lc-radio :list="list"></lc-radio>
        <lc-checkbox label="uuu"></lc-checkbox>


        <lc-button text="click" @LcButtonClicked="openBottomPopup"></lc-button>
        <lc-popup popup-color="rgb(92, 184, 92)"
                   :show="isBottomShow"
                   @wxcPopupOverlayClicked="popupOverlayBottomClick"
                   pos="left"
                   width="500">
            <div class="demo-content">
                <image src="https://img.alicdn.com/tfs/TB1ojYvOXXXXXaOXFXXXXXXXXXX-180-41.png" class="demo-image"></image>
                <text>Different from a "web app", "HTML5 app", or "hybrid app", you can use Weex to build a real mobile app. The code that you write is relatively simple, because you can build native applications just using HTML, CSS, Javascript.</text>
            </div>
        </lc-popup>
    </div>
</template>

<script>
    import {LcPopup, LcButton, LcCell, LcRadio, LcCheckbox, LcForm, LcInput, LcProgress, LcTabPage, LcTextarea } from 'lighting-ui/index.js' ; 
    
    export default {
        components: { LcButton, LcPopup, LcCell, LcRadio, LcCheckbox, LcForm, LcInput, LcProgress, LcTabPage, LcTextarea },
        data: () => ({
            isBottomShow: false,
            height: 400,
            list: [
                { title: '选项1', value: 1 },
                { title: '选项2', value: 2, checked: true },
                { title: '选项3', value: 3 },
                { title: '选项4', value: 4 }
            ]
        }),
        methods: {
            openBottomPopup () {
                this.isBottomShow = true;
            },
            popupOverlayBottomClick () {
                this.isBottomShow = false;
            }
        }
    };
</script>