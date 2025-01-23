# Marktext 启动流程分析

## 1. 文件结构

### 1.1 渲染进程相关文件
```
M:\cm\ydm\src\renderer\
- bootstrap.js        // 初始化配置
- main.js            // 渲染进程入口
- menu/
  - config.js        // 菜单结构和翻译键
  - menuBuilder.js   // 菜单构建和翻译逻辑 
  - index.js         // 菜单初始化和事件处理
  - dynamicMenu.js   // 主进程菜单处理
```

### 1.2 主进程相关文件
```
M:\cm\ydm\src\main\
- index.ts           // TypeScript入口
- index.js           // JavaScript入口
- menu/              // 原始菜单模板目录
```

### 1.3 语言文件
```
M:\cm\ydm\src\locales\
- zh-cn.json         // 中文翻译
- en.json            // 英文翻译
```

## 2. 启动流程

### 2.1 渲染进程启动
1. main.js 作为入口文件首先加载
2. bootstrap.js 进行应用初始化配置
3. menu/index.js 负责:
   - 初始化菜单
   - 监听语言切换事件
   - 处理菜单更新

### 2.2 主进程启动
1. index.ts/index.js 作为入口启动
2. 加载原始菜单模板
3. 通过 IPC 与渲染进程建立通信
4. 处理菜单状态更新

### 2.3 菜单生成流程
1. config.js 定义菜单结构和配置
2. menuBuilder.js 根据当前语言构建菜单
3. dynamicMenu.js 处理主进程中的菜单更新
4. 通过 IPC 在主进程和渲染进程间同步菜单状态

## 3. 关键流程

1. 应用启动时菜单初始化:
   - 读取默认语言配置
   - 加载对应语言文件
   - 生成初始菜单



2. 语言切换时菜单更新:
   - 监听语言切换事件
   - 重新加载语言文件
   - 重建菜单结构
   - 通过 IPC 同步到主进程

3. 菜单状态同步:
   - 主进程和渲染进程通过 IPC 通信
   - 保持菜单状态的一致性
   - 处理菜单点击事件

## 4. 注意事项

1. 菜单模板文件位置:
   - 原始模板在 main/menu/templates/ 目录
   - 新的动态菜单在 renderer/menu/ 目录

2. 语言文件管理:
   - 只使用 zh-cn.json 和 en.json
   - 不新建其他语言文件

3. 翻译键值对照:
   - 需要确保 menu/ 目录下的键与语言文件中的键一致
   - 完善缺失的翻译项 

## 5. 配置读取流程

### 5.1 配置文件位置
```
M:\cm\ydm\src\
- preferences/
  - index.js         // 配置管理核心
  - schema.js        // 配置项定义
- config/
  - defaults.js      // 默认配置
  - settings.js      // 设置项定义
```

### 5.2 配置加载顺序
1. 应用启动时:
   - 首先加载 defaults.js 中的默认配置
   - 读取用户配置文件 preferences.json
   - 合并默认配置和用户配置

2. 配置项包括:
   - 界面设置 (侧边栏、标题栏显示)
   - 语言设置 (默认 zh-cn)
   - 编辑器设置
   - 主题设置
   - 自动保存设置

   生成顶部菜单

### 5.3 配置读取机制
1. 渲染进程:
```javascript
// renderer/bootstrap.js
import { ipcRenderer } from 'electron'
import preferences from '../preferences'

// 初始化配置
const userPreference = await ipcRenderer.invoke('get-preference')
preferences.init(userPreference)
```

2. 主进程:
```javascript
// main/index.js
import { ipcMain } from 'electron'
import preferences from '../preferences'

// 处理配置请求
ipcMain.handle('get-preference', () => {
  return preferences.getAll()
})
```

### 5.4 配置更新流程
1. 用户修改配置:
   - 通过设置界面修改
   - 触发配置保存事件

2. 保存流程:
   - 更新内存中的配置
   - 写入 preferences.json
   - 通知相关组件更新

3. 实时同步:
   - 主进程和渲染进程通过 IPC 同步配置
   - 确保配置的一致性

### 5.5 关键配置项
1. 界面配置:
```javascript
{
  "sideBar": {
    "show": true,
    "width": 280
  },
  "titleBar": {
    "show": true,
    "type": "native"
  }
}
```

2. 语言配置:
```javascript
{
  "language": "zh-cn",
  "autoGuessLanguage": true
}
```

## 6. 配置注意事项

1. 配置文件位置:
   - Windows: %APPDATA%/marktext/preferences.json
   - macOS: ~/Library/Application Support/marktext/preferences.json
   - Linux: ~/.config/marktext/preferences.json

2. 配置备份:
   - 建议备份 preferences.json
   - 可通过导出功能保存配置

3. 配置迁移:
   - 版本更新时会自动迁移配置
   - 保持配置文件格式正确 
