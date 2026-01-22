# Calendar 应用（精简说明）

简短说明：本仓库为一个最小可运行的前端日历应用（React + Vite），实现月/周/日视图、事件增删改查、浏览器提醒、以及基础的 .ics 导入/导出与订阅功能。

快速运行：

```bash
cd /Users/xueyujun/Calendar-application-with-expansion-requirements
npm install
npm run dev
```

核心文件：
- `src/App.jsx`：主逻辑（视图切换、事件管理、导入/导出、订阅、提醒）
- `src/components/Calendar.jsx`：月/周/日视图
- `src/components/EventModal.jsx`：事件编辑模态
- `src/utils/ics.js`：简单的 .ics 导入/导出
- `src/utils/storage.js`：localStorage 持久化
