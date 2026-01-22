# 日历应用（最小可运行版本）

此仓库包含一个最小的单页日历应用，用于满足作业/项目的核心要求。主要功能包括：

- 日历视图：月视图 / 周视图 / 日视图
- 事件的新增、编辑、查看与删除（事件保存在浏览器 localStorage）
- 基本提醒（使用浏览器 Notification API，当页面开启且授权时生效）
- 将事件导出为 RFC5545 风格的 iCalendar (.ics) 文件，并能从 .ics 文本或 URL 导入事件
- 网络订阅（输入 .ics 地址并将事件导入到本地存储）

快速运行

1. 安装依赖：

```bash
npm install
```

2. 启动开发服务器：

```bash
npm run dev
```

打开浏览器访问 vite 提供的地址（通常为 http://localhost:5173 ）

关键文件说明

- `src/App.jsx` — 应用主入口与业务逻辑（视图切换、事件管理、导入导出、订阅、提醒调度）
- `src/components/Calendar.jsx` — 月/周/日 视图组件
- `src/components/EventModal.jsx` — 新建 / 编辑事件模态对话框
- `src/utils/ics.js` — 简易的 .ics 导出/导入与按 URL 订阅导入
- `src/utils/storage.js` — localStorage 封装（事件持久化）
- `src/utils/placeholder-lunar.js` — 农历占位函数（非精确）

功能与实现说明（对照作业要求）

基础要求：

1. 日历视图（已实现） — 月视图 / 周视图 / 日视图（支持在相应视图新增或编辑事件）。
2. 事件操作（已实现） — 新增、编辑、查看、删除，事件以 ISO 字符串存储在 localStorage 中。
3. 提醒功能（已实现，范围说明） — 使用浏览器 Notification API 安排提醒，仅在页面打开且用户授权时有效；若未授权则回退到 alert。

扩展要求（实现情况）：

1. 事件导入导出（已实现，基础） — 支持将事件导出为 .ics 并从 .ics 文本导入。解析器为轻量实现，支持常见字段（DTSTART/DTEND/SUMMARY/DESCRIPTION/UID）。
2. 网络订阅（已实现） — 提供订阅输入可填写 .ics URL 并将事件导入到本地。
3. 农历相关（部分） — 项目包含占位农历标签函数，但未实现精确的农历转换（如需可集成成熟库）。

已知限制

- .ics 解析与导出是简化实现：未完整支持 RRULE（重复事件）、复杂时区 VTIMEZONE 定义、EXDATE 等高级特性。
- 浏览器通知仅在前端页面运行并授权时有效；若需系统级别或后台提醒，需要原生或后端推送支持。
- 农历为占位实现（非精确），如需精确农历/节气支持请告知，我可以集成对应算法或库。

提交建议（作业材料）

- 产品报告（PPT/Word/PDF 任意格式），建议包含：
   1) 产品功能介绍（说明实现了哪些功能）；
   2) 程序概要设计（页面流程、数据结构）；
   3) 软件架构图与关键模块说明；
   4) 技术亮点与实现原理（可选）。
- 源代码：已提交到 GitHub 仓库，请将仓库地址粘贴到提交页面；也可在本地打包后上传。仓库地址：
   https://github.com/XueZeqi/Calendar-application-with-expansion-requirements
- 演示录屏：优先 mkv / mp4 / avi / rm / rmvb 格式（建议展示：视图切换、事件增删改、导入/导出、提醒效果）

后续可选增强（若需我可继续实现）

- 集成精确农历库并在日历上显示农历与节气；
- 支持 RRULE 与例外规则（EXDATE）以实现重复事件完整解析；
- 将存储后端化（简单 Node/Express + SQLite）以实现跨设备同步；
- 使用 Service Worker + Push API 实现页面关闭时的离线/后台推送（需服务端支持）。

联系方式与运行帮助

如果需要我可以：

- 把仓库打包成 zip 并提供；
- 帮助你生成提交用的 PPT/报告模板；
- 将项目部署到 GitHub Pages 或演示服务器以便录屏。

运行命令回顾：

```bash
cd /Users/xueyujun/Calendar-application-with-expansion-requirements
npm install
npm run dev
```

如果你需要我把 README 再细化（比如替换为中文的作业报告模板，或添加演示截图），告诉我具体要求即可，我会继续修改。
