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

是的，让 顶部菜单栏 使用之前翻译 面板 的方法，

要始终明白： 翻译正确是因为 目录下有config.js,并且 有index.vue 文件,比如：\src\renderer\prefComponents\general

而顶部菜单 目录 下，并没有这些文件，用之前侧面板 翻译正确的方法应用到顶部菜单当中去



侧面板和常规面板的实现（渲染进程）：

使用 Vue 组件（.vue 文件）

使用 Vue-i18n 的 $t 方法进行翻译

翻译文本是在模板中动态渲染的：{{ $t('preferences.title') }}

当语言改变时，Vue 会自动重新渲染组件，更新翻译

顶部菜单的实现（主进程）：

使用 Electron 的 Menu API

使用自定义的 i18n.t() 方法进行翻译

翻译文本是在菜单创建时静态设置的：label: i18n.t('menu.file.title')

菜单创建后不会自动更新，需要手动重建

这就是为什么侧面板和常规面板能够实时更新翻译，而顶部菜单不能。因为：

侧面板使用了 Vue 的响应式系统，当语言改变时会自动重新渲染

顶部菜单是静态的 Electron Menu 对象，需要手动重建才能更新翻译



那么，把顶部 菜单 也使用 侧面板 和常规面板 的实现 （渲染进程）方法，使用 Vue 组件（.vue 文件）
使用 Vue-i18n 的 $t 方法进行翻译
翻译文本是在模板中动态渲染的：{{ $t('preferences.title') }}
当语言改变时，Vue 会自动重新渲染组件，更新翻译....

其它不要改动 ，如 主进程 什么的 ，不改。 只是改顶部菜单



当主题改变时,都通过 SET_SINGLE_PREFERENCE action 来更新 store:

当 store 中的 theme 值改变时,会触发 watch 监听器

addThemeStyle 函数会根据主题值动态修改 CSS 变量

当语言设置改变时,会:

通过 changeLanguage() 更新 Vue-i18n 的语言设置

发送 mt::change-language 事件通知主进程更新菜单

我们在两个地方处理语言变化:

watch 中监听 language 的变化

SET_SINGLE_PREFERENCE action 中处理语言设置的更新

现在 只有顶部菜单，在切换语言时 不会发生变化：

我注意到，在侧面板中点击切换 主题，和顶部菜单切换主题 ，
主题 都会发生变化，

所以分析主题 切换实现的方法，应用到顶部菜单中来。

主题切换成功的关键点是：
使用统一的 broadcast-preferences-changed 事件而不是单独的语言事件
通过 Vuex 的 SET_SINGLE_PREFERENCE action 统一处理所有偏好设置的变化
在主进程中统一处理所有偏好设置的变化
保持与主题切换相同的事件流程和更新机制


使用动态语言切换，重做 主菜单、
记得每次 改一个文件都 添加 到f.bat 文件中 进行格式化，
