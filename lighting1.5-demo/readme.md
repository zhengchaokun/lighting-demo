## lighting 1.5 & 1.6 新版功能

***

### 1. light install

执行 ```light install``` 命令，自动安装项目所需插件( project.json 文件中的 plugins 属性)以及项目依赖( package.json 文件中的 dependencies 属性)。

### 2. light plugin --fix

执行 ```light plugin --fix``` 命令，可以重置 light 插件的安装环境，并且清空 npm 缓存。 

### 3. 支持在工程中直接使用light变量

旧版本中如需使用 light 变量，只能通过 ```import light from "light"``` 的方法，现在可以在视图的生命周期中这样引用 ```this.$light``` 以访问其变量或方法。

### 4. 支持项目依赖安装在根目录

老版本中项目依赖必须在 lib 目录下安装，现在可以在根目录下安装。

```bash

light/
├── app.js
├── app.less
├── index.html
├── lib
│   └── package.json
│   └── node_modules
├── node_modules
├── package.json
├── project.json
├── ui
│   └── ui.vue
└── view
    └── demo.vue

```



### 5. 支持 jsn 工程的自定义 build.js

用户可以在 jsn 工程中自定义 webpack 的配置文件，实现个性化需求。

### 6. ajax 方法支持在 jsn 环境下使用

jsn 环境下发出请求可以使用 ```$light.ajax``` 方法，用法与h5中一致。

用法详见 https://document.lightyy.com/light_frame_ref/content/ajax.html

### 7. jsn 环境下可以访问网络 js 资源

调用 navigate 方法访问网络上的 js 资源

```this.$light.navigate('https://jzzuag2o3.lightyy.com/quote.js')```;

### 8. jsn 工程中支持 dom 操作

注：在视图生命周期中使用 ```this.$page``` 来访问 weex 变量。

| 方法          | 描述    |  示例  |
| :---------    | :-----   | :---- |
| createElement | 创建元素          | ```var text = this.$page.document.createElement('text');```   |
| setAttr       | 设置元素属性      |  ```text.setAttr('value','这是一个弹框');```    |
| addEvent      | 绑定事件处理函数   | ```text.addEvent('click', function(e) {e.stopPropagation();})```|
| appendChild   | 添加子元素        |  ```this.$page.document.body.appendChild(text);```              |
| removeChild   | 移除子元素        |  ```this.$page.document.body.removeChild(text);```              |

### 9. 调试时优先以本地 ip 打开浏览器

连网时以用户本地ip打开浏览器，方便进行调试；断网时则打开 localhost 。

### 10. 调试模式下可以指定视图进行调试

在打开的调试窗口地址栏输入指定的视图id，调试二维码会指向该视图，不必每次都从首页开始调试。


### 11. 针对不同浏览器给 css 属性添加对应前缀

lighting 集成了 autoprefix 插件，给某些 css 属性针对不同浏览器自动添加对应的前缀。

### 12. .gmu 文件自动格式化

用 native 插件生成的App包中，.gmu文件为格式化的 json 形式。

### 13. 新增检查版本更新功能

用户在执行任何自动结束进程的 light 命令后，lighting会自动检测本机的版本是否最新版本，若不是则提醒用户升级。










