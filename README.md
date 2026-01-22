# Calendar 应用

一个基于 React + Vite 的最小日历前端应用。实现要点：月/周/日视图、事件增删改查、浏览器通知提醒、.ics 导入/导出与订阅（将日程保存到本地 storage）。

快速开始（开发）

```bash
cd /path/to/this/project
npm install
npm run dev
# 在浏览器打开 http://localhost:5173 （Vite 默认端口）
```

构建与预览

```bash
npm run build
npm run preview
```

移动应用（Capacitor）快速指南

项目已包含最小的 `capacitor.config.json` 与 `package.json` 脚本：

- 初始化（仅首次）:
	```bash
	npm run cap:init
	```
- 添加平台并打开原生 IDE:
	```bash
	npx cap add ios
	npx cap add android
	npm run mobile:open:ios    # 构建、复制并打开 Xcode
	```

iOS签名要点

- iOS (Xcode):
	- 确保 `Bundle Identifier` 与 Apple Developer Portal 中的一致（示例 `com.xueyujun.calendar`）。
	- 在 Xcode 的 Signing & Capabilities 中选择 Team 并配置 Provisioning Profile（可使用自动管理）。
	- 若用到相机/相册/日历/位置/通知，务必在 Info.plist 添加对应用途说明（NSCameraUsageDescription 等）。
	- Archive -> Export 来生成 App Store / Ad Hoc 包。
