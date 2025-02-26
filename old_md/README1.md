# MarkText 编译指南

## 目录
1. [基本要求](#基本要求)
2. [开发环境配置](#开发环境配置)
3. [已安装软件清单](#已安装软件清单)
4. [技术栈说明](#技术栈说明)
5. [编译步骤](#编译步骤)
6. [环境变量配置](#环境变量配置)
7. [依赖包管理](#依赖包管理)
8. [注意事项](#注意事项)

## 基本要求

### 系统要求
- Windows 10 或更高版本（32位和64位）
- Visual Studio 2019 Community（含C++开发组件）
- Windows 10 SDK

### 文档规范
- 使用中文编写文档
- 使用标准 Markdown 语法
- 使用统一的缩进和格式
- 不使用表情符号和特殊图标

## 开发环境配置

### 必需工具及版本要求
- Node.js: v16.20.2 (>=v16 且 <v17)
- Python: 3.92rc1 (>=v3.6)
- Git: 2.47.0.windows.2
- Yarn: 1.22.22 (>=1.22)
- Visual Studio 2019 Community
- CMake: 3.31.3

## 已安装软件清单

### Node.js
- 安装路径：G:\cm\tools\nodejs
- 版本：v16.20.2
- npm版本：8.19.4

### Python
- 安装路径：D:\Tools\Python39
- 版本：Python 3.92rc1

### Git
- 安装路径：D:\Tools\git
- 版本：2.47.0.windows.2

### Visual Studio 2019
- 安装路径：D:\Tools\Microsoft\Visual_Studio_2019
- MSVC工具链版本：14.29.30133
- Windows SDK版本：10.0.20348.0

### Yarn
- 安装路径：G:\cm\tools\yarn
- 版本：1.22.22

### CMake
- 安装路径：G:\cm\tools\CMake\bin
- 版本：3.31.3

## 技术栈说明

### 核心框架
- Electron
  - 版本：v15.4.0
  - 全局安装路径：G:\cm\tools\yarn\global\node_modules\electron
  - 主程序：G:\cm\tools\yarn\global\node_modules\electron\dist\electron.exe

- Vue.js
  - 版本：v2.6.14
  - 安装路径：G:\cm\tools\yarn\global\node_modules\vue
  - 运行时：G:\cm\tools\yarn\global\node_modules\vue\dist\vue.runtime.common.js

- Element UI
  - 版本：v2.15.7
  - 安装路径：G:\cm\tools\yarn\global\node_modules\element-ui
  - 主程序：G:\cm\tools\yarn\global\node_modules\element-ui\lib\index.js

- Webpack
  - 版本：v5.69.1
  - 安装路径：G:\cm\tools\yarn\global\node_modules\webpack
  - 主程序：G:\cm\tools\yarn\global\node_modules\webpack\bin\webpack.js

### 关键依赖版本
- keyboard-layout: 2.0.17
- @hfelix/electron-spellchecker: 2.0.0
- electron-builder: ^22.14.13

## 编译步骤

1. 克隆源代码：
```bash
git clone https://github.com/marktext/marktext.git
```

2. 安装依赖：
```bash
yarn install --ignore-engines --production=false --ignore-scripts
```

3. 打包应用：
```bash
yarn run pack
```

4. 构建免安装版：
```bash
yarn electron-builder --dir
```

## 环境变量配置

### PATH 环境变量
```batch
# Java开发环境
C:\Program Files\Eclipse Foundation\jdk-8.0.302.8-hotspot\bin

# 系统目录
C:\Windows\system32
C:\Windows
C:\Windows\System32\Wbem
C:\Windows\System32\WindowsPowerShell\v1.0\

# .NET开发环境
C:\Program Files\dotnet\
C:\Program Files (x86)\dotnet\
C:\Windows\Microsoft.NET\Framework64\v4.0.30319

# Git环境
D:\Tools\git\bin
D:\Tools\git
d:\tools\Git\cmd

# Delphi开发环境
D:\Tools\Delphi_xe12\bin
C:\Users\Public\Documents\Embarcadero\Studio\23.0\Bpl

# Python环境
D:\Tools\Python3

# Node.js和Yarn环境
G:\cm\tools\nodejs\
G:\cm\tools\yarn

# Visual Studio 2019环境
D:\Tools\Microsoft\Visual_Studio_2019\VC\Tools\MSVC\14.29.30133\bin\Hostx64\x64
D:\Tools\Microsoft\Visual_Studio_2019\Common7\IDE\VC\VCPackages
D:\Tools\Microsoft\Visual_Studio_2019\Common7\IDE\CommonExtensions\Microsoft\TestWindow
D:\Tools\Microsoft\Visual_Studio_2019\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer
D:\Tools\Microsoft\Visual_Studio_2019\Common7\IDE\CommonExtensions\Microsoft\FSharp\Tools
D:\Tools\Microsoft\Visual_Studio_2019\Common7\IDE
D:\Tools\Microsoft\Visual_Studio_2019\MSBuild\Current\Bin
D:\Tools\Microsoft\Visual_Studio_2019\MSBuild\Current\bin\Roslyn

# Windows SDK
C:\Program Files (x86)\Microsoft SDKs\Windows\v10.0A\bin\NETFX 4.8 Tools\x64
C:\Program Files (x86)\Windows Kits\10\bin\10.0.20348.0\x64
C:\Program Files (x86)\Windows Kits\10\bin\x64

# 其他工具
G:\cm\tools\CMake\bin
D:\Tools\7-Zip
D:\Tools\perl\perl\bin
C:\Program Files\Common Files\Autodesk Shared\
```

### 头文件路径
```batch
setx /M INCLUDE "D:\Tools\Microsoft\Visual_Studio_2019\VC\Tools\MSVC\14.29.30133\include;D:\Tools\Microsoft\Visual_Studio_2019\VC\Tools\MSVC\14.29.30133\include\msclr;C:\Program Files (x86)\Windows Kits\10\Include\10.0.20348.0\ucrt;C:\Program Files (x86)\Windows Kits\10\Include\10.0.20348.0\um;C:\Program Files (x86)\Windows Kits\10\Include\10.0.20348.0\shared"
```

## 依赖包管理

### 全局包列表
- node-gyp@9.4.0
- windows-build-tools@5.2.2
- electron-builder@22.14.13
- electron@15.4.0
- nan@2.17.0

### 项目依赖包
- @electron/remote: ^2.0.4
- @hfelix/electron-localshortcut: ^4.0.1
- element-ui: ^2.15.7
- vue: ^2.6.14
- vue-router: ^3.5.3
- vuex: ^3.6.2

## 注意事项

1. 必须使用yarn包管理器，不支持npm
2. 确保Visual Studio 2019安装了所有必需的C++开发组件
3. 运行build.bat开始编译
4. 编译后的MarkText.exe需要优化：
   - 建议创建Chromium目录
   - 将主要内容移至build/Chromium目录
   - 保持MarkText.exe仅包含最小启动功能

## 相关文档
- 用户文档：docs/README.md
- 开发者文档：docs/dev/README.md
- 构建说明：docs/dev/BUILD.md

## Yarn 配置和问题解决

### 配置镜像源
```bash
# 查看当前源
yarn config get registry

# 设置淘宝镜像源（推荐）
yarn config set registry https://registry.npmmirror.com/

# 设置官方源（如果淘宝源不可用）
yarn config set registry https://registry.npmjs.org/
```

### 常见问题解决

#### 网络连接问题
如果遇到 "There appears to be trouble with your network connection" 错误：

1. 检查网络连接
2. 尝试切换镜像源
3. 清除缓存后重试：
```bash
yarn cache clean
```

4. 使用以下命令安装（带重试）：
```bash
# 方式1：普通安装
yarn install --network-timeout 600000

# 方式2：使用固定版本安装（推荐）
yarn install --frozen-lockfile --network-timeout 600000

# 方式3：忽略可选依赖（如果还是失败）
yarn install --ignore-optional --network-timeout 600000
```

#### 其他常用命令
```bash
# 查看全局安装的包
yarn global list

# 运行构建
yarn run build

# 运行开发服务器
yarn run dev
```

### .yarnrc 配置示例
```
registry "https://registry.npmmirror.com/"
sass_binary_site "https://npmmirror.com/mirrors/node-sass/"
phantomjs_cdnurl "https://npmmirror.com/mirrors/phantomjs/"
electron_mirror "https://npmmirror.com/mirrors/electron/"
sqlite3_binary_host_mirror "https://npmmirror.com/mirrors/"
profiler_binary_host_mirror "https://npmmirror.com/mirrors/node-inspector/"
chromedriver_cdnurl "https://npmmirror.com/mirrors/chromedriver"
```



# Yarn 命令

清除缓存

yarn cache clean

yarn install

```
如果已下载了
执行：
yarn install --frozen-lockfile --offline

--frozen-lockfile：确保 yarn.lock 文件不被修改，避免重新解析依赖版本。
--offline：强制 Yarn 使用本地缓存，不尝试从网络下载依赖。
```

` or ` yarn install --frozen-lockfile

yarn run build



国内能用的 yarn https://registry.npmjs.org

淘宝的 https://registry.npmmirror.com/

# 

# *清除 npm 缓存*



npm cache clean --force

### **查看 npm 缓存目录**

npm config get cache

npm install -g node-gyp@9.4.0



# 问题出在 yarn.lock 里面 的连接上，把这些 超链接 全部转成 https://registry.npmmirror.com/,另外仔细配置各种 路径 也是关键



最后出错 是没有找到 node-gyp,在PATH 中设置路径为G:\cm\tools\yarn\global\node_modules\.bin

yarn global add node-gyp@8.4.0

它的路径 是G:\cm\tools\yarn\global\node_modules\.bin，它是 node-gyp.cmd

一直出错的原因是 在C:\Users\Administrator\.yarnrc 中设置错误 node-gyp 的路径



最后出错 在 package.json中删除下面四个

    "ced": "^2.0.0",
    /"fontmanager-redux": "^1.1.0",
    //"keytar": "^7.9.0",
       //"native-keymap": "^3.3.0",



electron-builder.yml 中 设置为 npmRebuild: false
因为 原生模块 编译不成功.

于是我手动来编译：我发现
我输入 cd node_modules/ced
执行 node-gyp rebuild，返回是gyp info ok

在 build.bat 中，由于 npmRebuild: false 跳过的这些 原生模块 ，所以把编译好的mode 用xcopy_bat copy 到 将要编译的 node_modules 目录中.


src/renderer/prefComponents/general/index.vue
disable="true"   // 这里设置为 true 表示禁用了选择语言


# 构建 项目是使用 build.bat





	"titleBarStyle": "native", 这样就会显示菜单


  我们创建了 i18n 的文件，但是没有在主程序中集成它。我们需要：
在主进程中添加语言切换的处理
确保 Vue 实例使用了 i18n
让我们修改相关文件：
首先在 src/main/index.ts 中添加语言切换的处理 
语言切换的逻辑是直接发送 IPC 消息，而不是使用我们的 i18n 系统
需要在语言切换的地方调用这个函数
我们需要在渲染进程的入口文件中集成 i18n

应该跳出这个思维，自己创建一个 中文的json，并让它 生效


# 使用 i18n 实现了 程序运行时 切换至 中文界面，修改了src/renderer/prefComponents/general/index.vue;


注意：经常 有一些行尾空格导致的ESLint错误,你改的这些vue ,js 文件，要再检查一下，是否有一些行尾空格导致的ESLint错误
使用 powershell修复 未尾空格 问题 
powershell -Command "(Get-Content 'config.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'config.js' -NoNewline"


---------------------------------------------------------------
很多错误，所以我不得不用 git 回滚代码回到这里。

build.bat 运行后，运行marktext, 在 gerener面板的语言栏 选择简体中文时，只有 gerener 这一个面板变成了中文 ，其它仍然为中文。
实现 在gerener面板的语言栏 选择简体中文时 gerener面板变成了中文的方法是 修改了这个 src/renderer/prefComponents/general/index.vue，使用 i18n，使用 $t 函数进行翻译；

现在的问题： 当 语言栏 选择简体中文后 其它比如侧边栏、菜单等仍英文。

解决下面的问题：
1、应该把所有的中文 都放在 zh-cn.json 一个文件中，包括  侧边栏，菜单 ，其它面板  都放在这个文件。 英文都放成en.json  一个文件中 方便管理;
2. i18n模块统一指向src/renderer/i18n，所有的 中英文切换 都用一个 i18n.js 文件来控制实现 ，不分开再建新的i18n.js;
3.需要在菜单，侧边栏等其它面板 中 引入  i18n,让这些组件也能正确使用 $t 函数进行翻译,参考src/renderer/prefComponents/general/index.vue;
4. 菜单栏不显示的问题（通过 titleBarStyle: "native" 设置）
原来的src/renderer/prefComponents/general/index.vue 中，有下面这条 titleBarStyle ，被你删除了，造成 没有这个选项了
<cur-select
          v-if="!isOsx"
          description="Title bar style"
          notes="Requires restart."
          :value="titleBarStyle"
          :options="titleBarStyleOptions"
          :onChange="value => onSelectChange('titleBarStyle', value)"
        ></cur-select>

特别注意：我们只是要切换语言，不修改其它 不相关的代码 防止出错，另外 你经常 有一些行尾空格导致的ESLint错误,你改完这些vue ,js 文件后，要再检查一下，是否有一些行尾空格导致的ESLint错误。

-------------------------------------------------------------------

很多错误，所以我不得不用 git 回滚代码回到这里。

build.bat 运行后，运行marktext, 在 gerener面板的语言栏 选择简体中文时，现在只有 gerener面板 以及 侧边栏 中 编辑器 和主题 以及图片 这几个能显示中文，其它仍然为英文。当点击 编辑器时，编辑器中的面板内容 也仍然是英文的，要解决这些问题。另外还有顶部的菜单栏，图片面板，主题面板，也仍然是英文。

解决这些问题时，遵循以下原则：
    实现 在gerener面板的语言栏 选择简体中文时 gerener面板变成了中文的方法:
     修改了这个 src/renderer/prefComponents/general/index.vue，使用 i18n\使用 $t 函数进行翻译，这是唯一的办法，改其它面板 为中文也只能使用这个办法;
1、应该把所有的中文 都放在 zh-cn.json 一个文件中，包括  侧边栏、菜单、图片、主题 等面板的中文 ， 都放在这个文件。
 英文都放成en.json  一个文件中 方便管理;
2. i18n模块统一指向src/renderer/i18n，所有的 中英文切换 都用一个 i18n.js 文件来控制实现 ，不分开再建新的i18n.js;
3.在菜单，侧边栏，图片，主题等其它面板 中 引入  i18n,让这些组件也能正确使用 $t 函数进行翻译,参考src/renderer/prefComponents/general/index.vue;
特别注意：我们只是要切换语言，不修改其它 不相关的代码 防止出错，另外 你经常 有一些行尾空格导致的ESLint错误,你改完这些vue ,js 文件后，要再检查一下，是否有一些行尾空格导致的ESLint错误。


要做的工作，放在update.md  
