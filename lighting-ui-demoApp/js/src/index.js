import GCanvas from './env/canvas';
import GImage from './env/image';

import GWebGLRenderingContext from './context-webgl/RenderingContext';
import GContext2D from './context-2d/RenderingContext';

import GBridgeWeex from './bridge/bridge-weex';
import GBridgeReactNative from './bridge/bridge-reactnative';

export let Image = GImage;

export let WeexBridge = GBridgeWeex;
export let ReactNativeBridge = GBridgeReactNative;

export function enable(el, { bridge, debug, disableAutoSwap, disableComboCommands } = {}) {

    const GBridge = GImage.GBridge = GCanvas.GBridge = GWebGLRenderingContext.GBridge = GContext2D.GBridge = bridge;

    GBridge.callEnable(el.ref, [
        0,      // renderMode: 0--RENDERMODE_WHEN_DIRTY, 1--RENDERMODE_CONTINUOUSLY
        -1,     // hybridLayerType:  0--LAYER_TYPE_NONE 1--LAYER_TYPE_SOFTWARE 2--LAYER_TYPE_HARDWARE
        false,  // supportScroll
        false,  // newCanvasMode
        1,      // compatible
        'white',// clearColor
        false   // sameLevel: newCanvasMode = true && true => GCanvasView and Webview is same level
    ]);

    if (debug === true) {
        GBridge.callEnableDebug();
    }
    if (disableComboCommands) {
        GBridge.callEnableDisableCombo();
    }

    var canvas = new GCanvas(el.ref, { disableAutoSwap });
    canvas.width = el.style.width;
    canvas.height = el.style.height;

    return canvas;
};

export function getContext(el) {
    if(process.env.RUNTIME==="native"){
        return enable(el, {bridge: WeexBridge}).getContext('2d');
    }else{
        return el.getContext('2d')
    }
}