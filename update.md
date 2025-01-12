build.bat 运行后，运行marktext, 在 gerener面板的语言栏 选择简体中文时，
现在 侧边栏 中 gerener 常规面板、 编辑器、akeDown、主题、图片、快捷键 这几个能显示中文,
顶部菜单一直未能显示中文。

你不能直接删除 index.js 一堆的导入，也许别的地方能用上啊，你要修复 错误，不是 粗暴的删除

需要解决的问题：

一. 翻译：

1. 需要主进程(main)和渲染进程(renderer)使用相同的Vue-i18n 来实现 ，都使用了Vue-i18n (src/renderer/i18n/index.js)
   之前主进程使用了自定义的简单i18n实现 (src/main/i18n.js)，要把 (src/main/i18n.js) 融入到(src/renderer/i18n/index.js)，
   之后 ，进程使用相同的 Vue-i18n (src/renderer/i18n/index.js)，删除 (src/main/i18n.js)；

    (src/main/i18n.js) (src/renderer/i18n/index.js)

2. 需要 顶部菜单要修改能切换 中英文；
   M:\cm\ydm\src\main\menu\templates  修改这里 能改变顶部菜单，但无法与翻译文件 src/locales/zh-cn.json 对应，
   应该在M:\cm\ydm\src\renderer\prefComponents\ 里新建一个menu 文件夹，
   把顶部菜单的 显示和功能 放在这个文件夹中；

3. 需要拼写检查面板 为英文；
   M:\cm\ydm\src\renderer\prefComponents\spellcheck
   M:\cm\ydm\src\renderer\prefComponents\spellchecker这是原来就有的，但这个文件夹里没有config.js







    src/renderer/
├── components/
│   ├── dialog/        // 对话框相关组件可能会使用主进程i18n
│   │   ├── warning.vue
│   │   └── confirm.vue
│   └── contextMenu/   // 右键菜单相关组件可能使用主进程i18n
│       └── index.vue
└── windows/          // 独立窗口组件可能使用主进程i18n
    ├── settings.vue
    └── about.vue

基于我的深入搜索，我找到了以下使用 src/main/i18n.js 而不是 src/renderer/i18n/index.js 的文件：
主进程核心文件：
src/main/index.js - 主进程入口文件，直接导入并使用 src/main/i18n.js
src/main/i18n.js - 主进程的 i18n 实现文件
菜单模板文件（所有这些文件都使用主进程的 i18n）：
src/main/menu/templates/edit.js - 直接导入并使用 ../../i18n
src/main/menu/templates/file.js - 使用菜单文本翻译
src/main/menu/templates/help.js - 使用菜单文本翻译
src/main/menu/templates/view.js - 使用菜单文本翻译
src/main/menu/templates/window.js - 使用菜单文本翻译
src/main/menu/templates/format.js - 使用菜单文本翻译
src/main/menu/templates/theme.js - 使用菜单文本翻译
src/main/menu/templates/paragraph.js - 使用菜单文本翻译
src/main/menu/templates/marktext.js - 使用菜单文本翻译
src/main/menu/templates/dock.js - 使用菜单文本翻译
src/main/menu/templates/prefEdit.js - 使用菜单文本翻译
其他可能使用主进程 i18n 的文件：
src/main/preferences/index.js - 偏好设置管理，可能使用翻译文本
src/main/keyboard/shortcutHandler.js - 快捷键处理，可能使用翻译文本
src/main/actions/ 目录下的文件（如果存在）- 可能使用翻译文本
src/main/dialog/ 目录下的文件（如果存在）- 可能使用翻译文本
这些文件都需要修改为使用 src/renderer/i18n/index.js 来实现统一的 i18n 管理。

下面要做的工作：
1.删除 src/main/i18n.js
2.将所有引用 src/main/i18n.js 的地方改为使用 src/renderer/i18n/index.js
3.确保所有翻译键都在 src/locales/zh-cn.json 和 src/locales/en.json 中定义
4.修改主进程中的 i18n 初始化和使用方式，使其与渲染进程保持一致
5.凡是使用 i18n 的地方，都只使用 src/renderer/i18n/index.js，不新建i18n文件，
防止混乱。
6.注意使用 src/renderer/i18n/index.js 时，注意 路径 ../ 或是../../ 别搞错了

二. 中英文语言文件 locales/zh-cn.json:

1. 把所有的中文 都放在 编译完成目录 locales/zh-cn.json 一个文件中，包括  菜单,侧边栏,鼠标右键 等所有.

2. 把所有的英文都放成 locales/en.json  一个文件中，包括  菜单,侧边栏,鼠标右键 等所有.，另外有一个 默认的en.json，这是生成程序时使用的，

   解决翻译问题时，遵循以下原则：
       实现 在gerener面板的语言栏 选择简体中文时 gerener面板变成了中文的方法:
   修改了这个 src/renderer/prefComponents/general/index.vue，使用 i18n\使用 $t 函数进行翻译，这是唯一的办法，改其它面板 为中文也只能使用这个办法;

   1. 应该把所有的中文 都放在 zh-cn.json 一个文件中，包括  侧边栏、菜单、图片、主题 等面板的中文 ， 都放在这个文件。
      英文都放成en.json  一个文件中 方便管理;

   2. 统一使用一个Vue-i18n模块，指向(src/renderer/i18n/index.js)，
      所有的 中英文切换 都用一个 i18n.js 文件来控制实现 ，不分开再建新的i18n.js;
      在菜单，侧边栏，图片，主题等其它面板 中使用统一的Vue-i18n,这些组件使用 $t 函数进行翻译,
      参考src/renderer/prefComponents/general/index.vue;

      yarn add -D html-loader@3.1.2 style-loader@3.3.3 css-loader@6.8.1

   特别注意：我们只是要切换语言，不修改其它 不相关的代码 防止出错;

   f.bat中 是将 编辑过的js ,vue 文件 进行格式化，修复一些行尾空格导致的ESLint错误，如果修复了js或vue文件记得添加路径到
   f.bat中。
   dir_all.txt 是目录中所有的程序文件列表
   build.bat 是 生成编译的执行文件

   根据代码分析，我发现了以下问题和原因：
   主进程(main)和渲染进程(renderer)使用了不同的i18n实现:
   主进程使用了自定义的简单i18n实现 (src/main/i18n.js)
   渲染进程使用了Vue-i18n (src/renderer/i18n/index.js)
   **主进程改为 使用 渲染进程Vue-i18n，即两个进程 改为同一个i18n实现。

语言切换没有同步:
渲染进程的语言切换通过 changeLanguage() 函数实现，但这个变化没有同步到主进程
主进程的菜单使用了主进程的i18n实现，所以不会随渲染进程的语言切换而改变
***两个进程 改为渲染进程同一个i18n实现.
src/main/i18n/
└── index.js (删除或修改为使用renderer的i18n)

src/renderer/i18n/
└── index.js (作为统一的i18n实现)

初始化问题:
主进程根据系统语言初始化 (app.getLocale())
渲染进程根据localStorage中保存的设置初始化 (localStorage.getItem('preferred-language'))
**主进程改为 渲染进程使用的方法

缺少进程间通信:
没有IPC通信来同步两个进程的语言设置
**原来有IPC ，但之前被cursor 删掉了

二. 未完成的新功能:

1. 将翻译文件独立；
   实现将src/locales/zh-cn.json与src/locales/en.json，放在编译完成目录 中 locales/ 子目录中，
   当程序编译完成后第一次使用 Marktext时，默认设置Marktext 为中文，并自动读取并使用  编译完成目录中 locales/zh-cn.json，
   切换语言为英语时 自动读取并使用  编译完成目录中 locales/en.json；

2. 将主题文件独立；
   实现将主题放在 编译完成目录 的 themes/子目录中的 主题css,每一个css 对应一个主题，
   当程序编译完成后第一次使用 Marktext时，默认设置主题为dark，在顶部菜单中会刷新 编译完成目录 中 themes/的 主题，
   当在顶部菜单中 切换主题时，会读取并使用 编译完成目录 中 themes/ 主题；

3. 大纲同步；
   实现在编程框中 点击或向下滚动 时，左边 大纲 会自动同步 编程框中 点击或滚动 的对应位置；

   特别注意：经常 有一些行尾空格导致的ESLint错误,改完这些vue ,js 文件后，要再检查一下，是否有一些行尾空格导致的ESLint错误
   将文件添加到f.bat 用powershell -NoProfile -Command "Set-Content -Path 'js或vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\preference.js' -NoNewline" 修复一些行尾空格导致的ESLint错误

# MarkText 翻译更新任务清单

## 1. 翻译文件更新

### 1.1 更新 src/locales/zh-cn.json

### 1.2 更新 src/locales/en.json

## 2. 组件更新任务

### 2.1 需要更新的组件列表

#### Vue 组件文件

- [ ] src/renderer/prefComponents/markdown/index.vue
- [ ] src/renderer/prefComponents/editor/index.vue
- [ ] src/renderer/prefComponents/spellcheck/index.vue
- [ ] src/renderer/prefComponents/keybindings/index.vue
- [ ] src/renderer/prefComponents/theme/index.vue
- [ ] src/renderer/components/sideBar/index.vue
- [ ] src/renderer/components/titleBar/index.vue
- [ ] src/renderer/components/preferences/index.vue
- [ ] src/renderer/components/editorWithTabs/index.vue
- [ ] src/renderer/components/contextMenu/index.vue

#### JavaScript/TypeScript 文件

- [ ] src/main/menu/templates/edit.js
- [ ] src/main/menu/templates/file.js
- [ ] src/main/menu/templates/help.js
- [ ] src/main/menu/templates/view.js
- [ ] src/main/menu/templates/window.js
- [ ] src/main/preferences/index.js
- [ ] src/renderer/store/editor.js
- [ ] src/renderer/store/preferences.js
- [ ] src/renderer/util/keybindings.js
- [ ] src/renderer/util/theme.js

#### 配置文件

- [ ] src/renderer/i18n/index.js
- [ ] src/renderer/i18n/config.js
- [ ] src/main/config.js

### 2.2 每个组件类型的更新内容

#### Vue 组件更新要点

1. 引入 i18n

```javascript
import i18n from '@/i18n'
```

2. 添加 i18n 配置

```javascript
export default {
  name: 'ComponentName',
  i18n: {
    messages: {
      'zh-cn': require('@/locales/zh-cn.json'),
      'en': require('@/locales/en.json')
    }
  }
}
```

3. 替换模板中的文本

```vue
<!-- 修改前 -->
<span>Settings</span>

<!-- 修改后 -->
<span>{{ $t('preferences.settings.title') }}</span>
```

#### JavaScript 文件更新要点

1. 菜单模板文件

```javascript
// 修改前
label: 'File',

// 修改后
label: i18n.t('menu.file.title'),
```

2. Store 文件

```javascript
// 修改前
const state = {
  editorTitle: 'New File'
}

// 修改后
import i18n from '@/i18n'

const state = {
  editorTitle: i18n.t('editor.newFile')
}
```

3. 工具函数文件

```javascript
// 修改前
export const errorMessages = {
  fileNotFound: 'File not found'
}

// 修改后
import i18n from '@/i18n'

export const getErrorMessage = key => i18n.t(`errors.${key}`)
```

### 2.3 特殊处理的组件

#### 1. 编辑器组件 (editor/index.vue)

- 处理动态内容的翻译
- 处理编辑器提示信息
- 处理右键菜单

#### 2. 快捷键设置组件 (keybindings/index.vue)

- 处理快捷键组合的显示
- 处理快捷键冲突提示
- 处理默认值重置

#### 3. 主题设置组件 (theme/index.vue)

- 处理主题名称翻译
- 处理自定义主题设置
- 处理预览效果

#### 4. 菜单组件 (titleBar/index.vue)

- 处理动态菜单项
- 处理快捷键提示
- 处理子菜单

### 2.4 文件依赖关系

```
src/renderer/
├── i18n/
│   └── index.js (核心配置)
├── components/
│   └── [组件]/
│       └── index.vue (引用 i18n)
├── store/
│   └── [模块].js (引用 i18n)
└── util/
    └── [工具].js (引用 i18n)
```

## 3. 细节检查清单

### 3.1 功能性检查

- [ ] 语言切换时所有面板同步更新
- [ ] 所有下拉菜单选项正确翻译
- [ ] 所有提示文本正确翻译
- [ ] 错误消息正确翻译
- [ ] 确认对话框正确翻译
- [ ] 右键菜单正确翻译

### 3.2 样式检查

- [ ] 确保翻译后的文本不会导致布局错乱
- [ ] 检查长文本是否需要省略处理
- [ ] 验证不同语言下的对齐方式
- [ ] 检查字体是否支持中文显示

### 3.3 性能优化

- [ ] 使用 v-once 优化静态内容
- [ ] 检查翻译函数调用频率
- [ ] 优化大量重复翻译的场景
- [ ] 确保语言切换不影响性能

### 3.4 代码质量

- [ ] 检查并修复 ESLint 警告
- [ ] 删除未使用的翻译键
- [ ] 确保翻译键命名规范
- [ ] 添加必要的代码注释

## 4. 测试任务

### 4.1 功能测试

- [ ] 测试所有面板的语言切换
- [ ] 测试所有交互功能在不同语言下的表现
- [ ] 测试特殊字符的显示
- [ ] 测试长文本的显示

### 4.2 兼容性测试

- [ ] 测试不同操作系统下的显示
- [ ] 测试不同分辨率下的显示
- [ ] 测试不同缩放比例下的显示

## 5. 文档更新

### 5.1 更新文档

- [ ] 更新 README.md
- [ ] 更新开发文档
- [ ] 更新用户指南
- [ ] 添加国际化相关说明

### 5.2 示例和说明

- [ ] 添加组件国际化示例
- [ ] 添加自定义翻译说明
- [ ] 添加常见问题解答

## 6. 发布准备

### 6.1 发布前检查

- [ ] 确保所有翻译完整
- [ ] 检查翻译质量
- [ ] 运行完整测试
- [ ] 更新版本号

### 6.2 发布文档

- [ ] 更新更新日志
- [ ] 准备发布说明
- [ ] 更新下载说明

## 注意事项

1. 代码规范
   - 保持统一的翻译键命名风格
   - 避免硬编码文本
   - 保持代码格式一致

2. 翻译规范
   - 保持专业术语统一
   - 确保翻译准确性
   - 保持用户界面术语一致

3. 性能考虑
   - 避免过度使用翻译函数
   - 合理使用缓存机制
   - 优化语言切换性能

4. 测试要求
   - 确保完整的测试覆盖
   - 包含边界情况测试
   - 进行性能测试

### 2.5 完整项目结构及需要修改的文件

```
src/
├── locales/
│   ├── zh-cn.json     # 中文翻译文件
│   └── en.json        # 英文翻译文件
│
├── main/              # 主进程相关
│   ├── menu/
│   │   └── templates/ # 菜单模板
│   │       ├── edit.js
│   │       ├── file.js
│   │       ├── help.js
│   │       ├── view.js
│   │       └── window.js
│   ├── preferences/
│   │   └── index.js   # 偏好设置管理
│   └── config.js      # 主配置文件
│
└── renderer/          # 渲染进程相关
    ├── components/    # 通用组件
    │   ├── sideBar/
    │   │   └── index.vue
    │   ├── titleBar/
    │   │   └── index.vue
    │   ├── preferences/
    │   │   └── index.vue
    │   ├── editorWithTabs/
    │   │   └── index.vue
    │   └── contextMenu/
    │       └── index.vue
    │
    ├── prefComponents/  # 偏好设置面板组件
    │   ├── markdown/
    │   │   └── index.vue
    │   ├── editor/
    │   │   └── index.vue
    │   ├── spellcheck/
    │   │   └── index.vue
    │   ├── keybindings/
    │   │   └── index.vue
    │   └── theme/
    │       └── index.vue
    │
    ├── store/          # Vuex 存储
    │   ├── editor.js
    │   └── preferences.js
    │
    ├── util/           # 工具函数
    │   ├── keybindings.js
    │   └── theme.js
    │
    └── i18n/           # 国际化相关
        ├── index.js    # i18n 核心配置
        └── config.js   # i18n 配置项
```

### 2.6 文件修改说明

1. **翻译文件** (`src/locales/`)
   - 所有界面文本的翻译内容
   - 按功能模块组织的翻译键值对

2. **主进程文件** (`src/main/`)
   - 菜单模板：处理应用菜单的翻译
   - 偏好设置：处理设置项的多语言支持
   - 配置文件：处理全局配置的语言相关项

3. **渲染进程组件** (`src/renderer/components/`)
   - 侧边栏：导航菜单翻译
   - 标题栏：窗口控制按钮文本
   - 偏好设置：设置面板框架
   - 编辑器标签：文档标签相关文本
   - 上下文菜单：右键菜单翻译

4. **偏好设置面板** (`src/renderer/prefComponents/`)
   - Markdown设置：编辑器选项翻译
   - 编辑器设置：界面选项翻译
   - 拼写检查：语言检查选项
   - 快捷键设置：键位绑定描述
   - 主题设置：主题相关文本

5. **状态管理** (`src/renderer/store/`)
   - 编辑器状态：文档相关提示信息
   - 偏好设置状态：设置项描述文本

6. **工具函数** (`src/renderer/util/`)
   - 快捷键工具：快捷键相关提示
   - 主题工具：主题名称和描述

7. **国际化配置** (`src/renderer/i18n/`)
   - 核心配置：i18n 实例配置
   - 配置项：语言切换相关配置

## 2. 需要更新的模块列表

### 2.1 菜单相关模块

- [ ] src/main/menu/templates/file.js (文件菜单)
- [ ] src/main/menu/templates/edit.js (编辑菜单)
- [ ] src/main/menu/templates/view.js (视图菜单)
- [ ] src/main/menu/templates/format.js (格式菜单)
- [ ] src/main/menu/templates/help.js (帮助菜单)

### 2.2 侧边栏相关模块

- [ ] src/renderer/components/sideBar/index.vue (侧边栏主组件)
- [ ] src/renderer/components/sideBar/fileList.vue (文件列表)
- [ ] src/renderer/components/sideBar/outline.vue (大纲视图)
- [ ] src/renderer/components/sideBar/toc.vue (目录视图)
- [ ] src/renderer/components/sideBar/search.vue (搜索面板)

### 2.3 面板相关模块

#### 2.3.1 偏好设置面板

- [ ] src/renderer/prefComponents/general/index.vue (常规设置)
- [ ] src/renderer/prefComponents/editor/index.vue (编辑器设置)
- [ ] src/renderer/prefComponents/markdown/index.vue (Markdown设置)
- [ ] src/renderer/prefComponents/theme/index.vue (主题设置)
- [ ] src/renderer/prefComponents/image/index.vue (图片设置)
- [ ] src/renderer/prefComponents/keybindings/index.vue (快捷键设置)
- [ ] src/renderer/prefComponents/advanced/index.vue (高级设置)
- [ ] src/renderer/prefComponents/export/index.vue (导出设置)

#### 2.3.2 其他面板组件

- [ ] src/renderer/components/editorWithTabs/index.vue (编辑器标签)
- [ ] src/renderer/components/titleBar/index.vue (标题栏)
- [ ] src/renderer/components/statusBar/index.vue (状态栏)

### 2.4 右键菜单相关模块

- [ ] src/renderer/components/contextMenu/index.vue (右键菜单主组件)
- [ ] src/renderer/components/contextMenu/editor.js (编辑器右键菜单)
- [ ] src/renderer/components/contextMenu/image.js (图片右键菜单)
- [ ] src/renderer/components/contextMenu/link.js (链接右键菜单)

### 2.5 公共模块

- [ ] src/renderer/store/preferences.js (偏好设置状态管理)
- [ ] src/renderer/store/editor.js (编辑器状态管理)
- [ ] src/renderer/i18n/index.js (国际化核心配置)
- [ ] src/renderer/util/message.js (提示信息工具)
- [ ] src/renderer/util/dialog.js (对话框工具)
- [ ] src/renderer/util/keybindings.js (快捷键工具)

### 2.6 需要检查的其他文件

- [ ] src/main/preferences/index.js (主进程偏好设置)
- [ ] src/main/keyboard/shortcuts.js (主进程快捷键)
- [ ] src/main/menu/actions.js (菜单动作处理)
- [ ] src/main/window/lifecycle.js (窗口生命周期)

### 2.7 更新步骤

1. 在每个组件中引入 i18n

```javascript
import i18n from '@/i18n'
```

2. 替换硬编码的文本为翻译键

```javascript
// 修改前
title: 'Settings'

// 修改后
title: i18n.t('panels.general.title')
```

3. 在 Vue 组件中使用 $t 函数

```vue
<!-- 修改前 -->
<span>Settings</span>

<!-- 修改后 -->
<span>{{ $t('panels.general.title') }}</span>
```

4. 检查并修复 ESLint 错误

- 删除多余的空格
- 确保正确的缩进
- 检查文件末尾换行

5. 测试检查点

- [ ] 语言切换功能正常
- [ ] 所有文本正确显示
- [ ] 没有遗漏的未翻译文本
- [ ] 布局不会因翻译而破坏

现在只有 顶部菜单 一直没有被翻译了，另外 英文 显示有多余的内容

顶部菜单不能切换成 中文的原因，
是否是因为 index.js 中没有使用vue

因为我看
M:\cm\ydm\src\renderer\main.js 能切换显示中文 ，是这里面加了VUE

## 7. 使用主进程i18n的文件清单

### 7.1 菜单相关文件

- src/main/menu/templates/edit.js
- src/main/menu/templates/file.js
- src/main/menu/templates/help.js
- src/main/menu/templates/view.js
- src/main/menu/templates/window.js

### 7.2 主进程核心文件

- src/main/preference.js
- src/main/actions/file.js
- src/main/keyboard/shortcuts.js

### 7.3 对话框相关文件

- src/main/dialog/index.js
- src/main/dialog/warning.js

### 7.4 需要修改的内容



反复出现 这几个错误,这个错误持续出现是因为我们需要正确处理 Electron 的主进程和渲染进程之间的差异。

问题的根源是：

原来的 src/main/i18n.js 是在主进程中使用的，而我们删除了它

现在我们把所有功能都移到了 src/renderer/i18n/index.js，但这个文件同时被主进程和渲染进程使用

渲染进程不能直接使用 require，需要使用 ES6 的 import

主进程需要能够访问翻译功能，但不能访问浏览器相关的 API

解决办法 是需要 保持基本的翻译功能在主进程中可用，而 Vue 相关的初始化只在渲染进程中执行，找到正确的方法检查是否在渲染进程中

[7280:0111/213608.074:INFO:CONSOLE(1)] "Uncaught ReferenceError: require is not defined", source: file:///M:/cm/ydm/build/win-unpacked/resources/app/dist/electron/index.html?udp=M%3A%5Ccm%5Cydm%5Cbuild%5Cwin-unpacked%5CUser&debug=0&wid=1&type=editor&cff=DejaVu+Sans+Mono&cfs=14&hsb=0&theme=dark&tbs=custom (1)
[7280:0111/213608.133:INFO:CONSOLE(2)] "Uncaught ReferenceError: global is not defined", source: file:///M:/cm/ydm/build/win-unpacked/resources/app/dist/electron/renderer.js (2)

![image-20250111213710183](Picture/image-20250111213710183.png)



函数 不能小写 开头，函数 要加空格 如：export function t (key) {



无效检测 渲染进程的方法：

isRenderer() 函数来检测渲染进程,使用 try-catch 

原来的 typeof window !== 'undefined' 检查



当 process.type 是 'browser' 时，说明是主进程，另一个则是渲染进程
