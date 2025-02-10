![image-20250121155350947](Picture/readme/image-20250121155350947.png)

# MarkText 

项目地址 ：https://github.com/marktext/marktext



# 前言

一直喜欢使用markdown,之前使用的typora,但是

1. Typora 收费

2. 后面的版本很卡

3. Typora 一次只能打开一个文件

4. 我想  自定一些内容

后面我遇到了marktext,本想着有智能AI的加持，就可以拥有属于自己的Markdown 软件
然而却是一个 “噩梦”般的开始，

首先，我之前并不明白什么是nodejs和vuejs，甚至到现在都是云里雾里的，
然后，对于我这样的小白，编译Marktext 竟然如此的麻烦
还有它使用的Javascript编程语言,之前甚至见都没怎么见过





# 编译方法：

安装软件：

- Python: 3.92rc1 (>=v3.6)
- Git: 2.47.0.windows.2
- Yarn: 1.22.22 (>=1.22)
- Visual Studio 2019 Community
- CMake: 3.31.3
- Node.js: v16.20.2 (>=v16 且 <v17)
- nvm



### Node.js

- 安装路径：G:\cm\tools\nodejs
- 版本：v16.20.2
- npm版本：8.19.4

### Python
- 安装路径：D:\Tools\Python39
- 版本：Python 3.92rc1
- 编译需要

### Git
- 安装路径：D:\Tools\git
- 版本：2.47.0.windows.2

### Visual Studio 2019
- 安装路径：D:\Tools\Microsoft\Visual_Studio_2019
- MSVC工具链版本：14.29.30133
- Windows SDK版本：10.0.20348.0
- build需要它的一些功能

### Yarn
- 安装路径：G:\cm\tools\yarn
- 版本：1.22.22
- 作用：编译的主要命令

### CMake
- 安装路径：G:\cm\tools\CMake\bin
- 版本：3.31.3

### nvm

- 安装路径：G:\cm\tools\nvm
- 版本：最新的
- 作用：切换node 版本，有的node_modules 安装的时候需要的node版本不同

path_bak.reg 是path环境变量备份文件，可以参考。

`按照path_bak.reg 中 仔细安装好软件 和配置好路径，就可以使用 build.bat 编译程序了`

注意：有几个原生模块，编译不了，我也不知道为什么，在烧死了无数脑细胞后，我决定
跳出编译原生模块，所以在electron-builder.yml 中添加了一行npmRebuild: false，不编译
它们，另外由于不编译它们，所以在完成编译之后，需要把 原来编译好的marktext app目录
下的 一些node_modules 拷到 build app目录（因为我不喜欢 用APP打包，所以在
electron-builder.yml 中使用了 asar: false ），也就是 把老的 node_modules 拷到，如
G:\cm\ydm\build\win-unpacked\resources\app\node_modules 即可

然后就可以运行了

# 我改的内容：

## 已完成的工作：

一、汉化工作：

1. 汉化了侧边栏
2. 动态生成顶部主菜单
3. 汉化了顶部主菜单（使用统一的汉化 在src\locales\zh-cn.json)
4. 实现了侧边栏更改语言，可以统一 使用侧边栏和顶部主菜单 中文化
5. 实现了保存语言功能

二、大纲工作：

1. 在编辑区任意区域中点击鼠标左键时，大纲高亮显示对应标题
2. 在编辑区中，停留鼠标超过0.7秒时，大纲高亮显示对应标题
3. 在编辑区任意区域中点击鼠标左键时，大纲能够 自动滚动对应标题到与鼠标 Y轴相同的位置
4. 在编辑区中，停留鼠标超过0.7秒时，大纲能够 自动滚动对应标题到与鼠标 Y轴相同的位置


## 在编辑区任意区域中点击鼠标左键时，大纲能够 自动滚动对应标题到与鼠标 Y轴相同的位置
从editor.vue代码中可以看到，编辑器组件已经监听了selectionChange事件，可以获取到光标位置的Y坐标。现在需要：

在editor.vue中添加点击事件监听，获取点击位置的Y坐标
通过bus将Y坐标传递给toc.vue组件
在toc.vue中实现根据Y坐标滚动到对应标题的功能
接下来需要查看toc.vue的代码，了解大纲组件的结构和滚动实现方式。

从toc.vue代码中可以看到，已经实现了handleEditorClick方法来处理编辑器点击事件，并且能够根据点击位置找到最近的标题元素。但是当前的实现是直接滚动到对应标题的位置，而不是根据鼠标Y轴位置来同步大纲滚动。

需要修改handleEditorClick方法，使其根据鼠标Y轴位置来同步大纲滚动。具体步骤如下：

获取点击位置的Y坐标
计算该位置在编辑器中的相对位置比例
根据比例计算大纲应该滚动到的位置
平滑滚动大纲到目标位置
---------------
文件已成功更新，新的handleEditorClick方法已经实现根据鼠标Y轴位置来同步大纲滚动。现在当用户在编辑器任意位置点击时，大纲会自动滚动到对应位置。
@g:\cm\ydm\src\renderer\components\sideBar\toc.vue




## 未完成的工作：

一、汉化工作：

1. 我希望是将zh-cn.json 放在用户UserDate\locales,在Marktext 启动后读取
2. 添加更多的语言 放在UserDate\locales





三、主题：

1. 我希望在用户UserDate\themes中，可以使用 css文件 ，将主题 集中到一个文件 ，
   当在主菜单 中点击的时候，能够刷新并读取UserDate\themes中的css主题，并应用


现在的问题，点击 偏好设置 会出现明显的卡顿




