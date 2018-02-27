exports.getBaseURL = function(vm) {
  var bundleUrl = vm.$getConfig().bundleUrl;
  var nativeBase = bundleUrl;
  var isAndroidAssets = bundleUrl.indexOf('your_current_IP') >= 0 || bundleUrl.indexOf('file://assets/') >= 0;
  var isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('.app') > 0;
  if (isAndroidAssets) {
    if (bundleUrl.indexOf('file://assets/') >= 0) {
      nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
    } else {
      nativeBase = 'file://assets/';
    }

  } else if (isiOSAssets) {
    // file:///var/mobile/Containers/Bundle/Application/{id}/WeexDemo.app/
    // file:///Users/{user}/Library/Developer/CoreSimulator/Devices/{id}/data/Containers/Bundle/Application/{id}/WeexDemo.app/
    nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
  } else {
    // var host = 'localhost:12580';
    // var matches = /\/\/([^\/]+?)\//.exec(vm.$getConfig().bundleUrl);
    // if (matches && matches.length >= 2) {
    //   host = matches[1];
    // }
    // if (vm.dir) {
    //   nativeBase = 'http://' + host + '/' + vm.dir + '/';
    // } else {
    //   nativeBase = 'http://' + host + '/';
    // }
    if (bundleUrl.indexOf('?') >= 0) {
      nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('?'));
    }
    if (nativeBase.indexOf('#') >= 0) {
      nativeBase = nativeBase.substring(0, nativeBase.lastIndexOf('#'));
    }
    nativeBase = nativeBase.substring(0, nativeBase.lastIndexOf('/') + 1);
  }
  var h5Base = './vue.html?page=./' + vm.dir + '/build/';
  // in Native
  var base = nativeBase;
  if (typeof window === 'object') {
    // in Browser or WebView
    base = h5Base;
  }
  return base
}