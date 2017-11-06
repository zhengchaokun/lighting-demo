# jsnative运行demo

在正式开发之前需要分别使用以下两个指令检查当前操作系统安装的版本是否支持`jsnative`项目的开发。如果指令执行后输出的版本号大于以下所示的版本号，那么就可以继续下面的步骤了，否则可以使用`npm install -dg lighting`来升级**lighting**版本，使用`light plugin -a type-vue`来升级**type-vue**插件版本，使用`light plugin -a native`来升级**native**插件版本。

```bash
 ~> light -v


     _  _         _      _    _
    | |(_)       | |    | |  (_)
    | | _   __ _ | |__  | |_  _  _ __    __ _
    | || | / _` || '_ \ | __|| || '_ \  / _` |
    | || || (_| || | | || |_ | || | | || (_| |
    |_||_| \__, ||_| |_| \__||_||_| |_| \__, |
            __/ |                        __/ |
           |___/                        |___/      CLI 1.4.7-201701031


 ~> light plugin --list
lighting-plugin-type-vue:1.0.30
lighting-plugin-native:1.0.14
```

接下来，就可以开发`jsnative`代码了，可以从我们开源在github上的一份demo起步，体会一下无差别开发app的流畅享受，一份完全相同的代码全面覆盖h5/iOS/Android三端平台！demo的链接下载地址是：[https://github.com/HS-Light/light-demo-native](https://github.com/HS-Light/light-demo-native)