# MarkText 国际化（i18n）实现文件概览

## 1. 使用 src/main/i18n.js 的文件

### 主进程核心文件（使用简单i18n实现）
- src/main/index.js - 主进程入口文件
- src/main/i18n.js - 主进程国际化实现
- src/main/preferences/index.js - 偏好设置管理

### 菜单模板文件（使用主进程i18n）
- src/main/menu/templates/edit.js
- src/main/menu/templates/file.js
- src/main/menu/templates/help.js
- src/main/menu/templates/view.js
- src/main/menu/templates/window.js
- src/main/menu/templates/format.js
- src/main/menu/templates/theme.js
- src/main/menu/templates/paragraph.js
- src/main/menu/templates/marktext.js
- src/main/menu/templates/dock.js
- src/main/menu/templates/prefEdit.js

### 动作处理文件（使用主进程i18n）
- src/main/actions/file.js
- src/main/actions/window.js

### 对话框相关文件（使用主进程i18n）
- src/main/dialog/index.js
- src/main/dialog/warning.js

### 键盘相关文件（使用主进程i18n）
- src/main/keyboard/shortcutHandler.js
- src/main/keyboard/shortcuts.js

## 2. 使用 src/renderer/i18n/index.js 的文件（使用Vue-i18n）

### 渲染进程核心（使用Vue-i18n）
- src/renderer/main.js - 主入口文件，初始化Vue-i18n
- src/renderer/app.vue - 根组件
- src/renderer/store/index.js - Vuex存储

### 偏好设置组件（使用Vue-i18n的$t方法）
- src/renderer/prefComponents/general/index.vue - 使用$t和changeLanguage
- src/renderer/prefComponents/editor/index.vue - 使用$t
- src/renderer/prefComponents/markdown/index.vue - 使用$t
- src/renderer/prefComponents/theme/index.vue - 使用$t
- src/renderer/prefComponents/image/index.vue - 使用$t
- src/renderer/prefComponents/keybindings/index.vue - 使用$t
- src/renderer/prefComponents/spellcheck/index.vue - 使用$t和$i18n
- src/renderer/prefComponents/menu/index.vue - 使用$t和$i18n

### 主界面组件（使用Vue-i18n的$t方法）
- src/renderer/components/sideBar/index.vue - 使用$t
- src/renderer/components/titleBar/index.vue - 使用$t
- src/renderer/components/editorWithTabs/index.vue - 使用$t
- src/renderer/components/contextMenu/index.vue - 使用$t
- src/renderer/components/preferences/index.vue - 使用$t

### 工具和辅助类（使用Vue-i18n）
- src/renderer/util/message.js - 使用i18n实例
- src/renderer/util/dialog.js - 使用i18n实例
- src/renderer/util/keybindings.js - 使用i18n实例
- src/renderer/store/editor.js - 使用i18n实例
- src/renderer/store/preferences.js - 使用i18n实例

### 窗口组件（使用Vue-i18n的$t方法）
- src/renderer/windows/settings.vue - 使用$t
- src/renderer/windows/about.vue - 使用$t
- src/renderer/components/dialog/warning.vue - 使用$t
- src/renderer/components/dialog/confirm.vue - 使用$t

## 3. 使用统计
- 使用 src/main/i18n.js 的文件：约20个文件（主进程相关）
- 使用 src/renderer/i18n/index.js 的文件：约25个文件（渲染进程相关）

## 4. 特别说明

- Vue组件中使用$t方法的都是通过Vue-i18n（src/renderer/i18n/index.js）实现

- 主进程文件中使用i18n.t的通过src/main/i18n.js实现

- 某些文件可能同时包含两种实现方法的引用

- 渲染进程中的所有对话框和上下文菜单组件使用Vue-i18n

- 主进程中的菜单模板目前使用主进程的国际化实现

  

## 5. 国际化实现方式

### Vue-i18n实现（渲染进程）
- 使用Vue-i18n 8.28.2版本
- 支持组件内使用$t方法进行翻译
- 支持动态切换语言
- 集成了Element-UI的语言包

### 简单i18n实现（主进程）
- 使用简单的键值对存储翻译
- 通过t方法获取翻译
- 支持基本的语言切换
- 不支持Vue-i18n的高级特性




侧面板和常规面板的实现（渲染进程）：

使用 Vue 组件（.vue 文件）

使用 Vue-i18n 的 $t 方法进行翻译


所以分析主题 切换实现的方法，应用到顶部菜单中来。

主题切换成功的关键点是：
使用统一的 broadcast-preferences-changed 事件而不是单独的语言事件
通过 Vuex 的 SET_SINGLE_PREFERENCE action 统一处理所有偏好设置的变化
在主进程中统一处理所有偏好设置的变化
保持与主题切换相同的事件流程和更新机制


使用动态语言切换，重做 主菜单、

规则：记得每次 改一个文件都 添加 到f.bat 文件中 进行格式化，
不要在文件中使用任何 中文注释，(除了和我交流 以及在zh-cn.json文件)

back new error,in error.txtnm
现在的问题：
终于现在在 侧边栏的常规面板 中切换 语言的时候，顶部菜单会发生变化，但有几个问题：
1.没有保存，当关掉后，重开又是英文
2.不完整，有很多没有翻译
3.英文时，有多余的翻译，如menu.format.title,menu.theme.title 
4.在主菜单中，添加 一个语言切换，和 侧边栏的常规面板 的语言切换 功能一模一样
5.error.txt 有错误，是marktext程序使用时CMD 返回的

