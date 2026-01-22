# Calendar 应用（精简说明）

简短说明：本仓库为一个最小可运行的前端日历应用（React + Vite），实现月/周/日视图、事件增删改查、浏览器提醒、以及基础的 .ics 导入/导出与订阅功能。

快速运行：

```bash
cd calendar-application-with-expansion-requirements
npm install
npm run dev
```
## Calendar 应用 — 精简说明（中文）

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
	npm run mobile:open:android # 构建、复制并打开 Android Studio
	```

iOS / Android 签名要点（简要）

- iOS (Xcode):
	- 确保 `Bundle Identifier` 与 Apple Developer Portal 中的一致（示例 `com.xueyujun.calendar`）。
	- 在 Xcode 的 Signing & Capabilities 中选择 Team 并配置 Provisioning Profile（可使用自动管理）。
	- 若用到相机/相册/日历/位置/通知，务必在 Info.plist 添加对应用途说明（NSCameraUsageDescription 等）。
	- Archive -> Export 来生成 App Store / Ad Hoc 包。

- Android (Android Studio / Gradle):
	- 使用 `keytool` 生成 keystore（示例：`release-key.jks`），并在 `android/app/build.gradle` 中配置 signingConfigs（请通过 `~/.gradle/gradle.properties` 或 CI 变量保存密码）。
	- 在 AndroidManifest 中声明必要权限（Camera、Calendar、Storage 等）。
	- 通过 Android Studio 的 Build > Generate Signed Bundle / APK 导出 AAB/APK，推荐上传 AAB 到 Play Console。

核心文件（保留/迁移建议）

为保证仓库只包含运行与打包所需内容，建议保留：

- `index.html`
- `package.json`（含脚本与依赖）
- `src/`（应用源码）
- `public/`（或静态资源目录，如存在）
- `capacitor.config.json`
- `README.md`（本文件）

可以安全移除或移动到 `archive/`（可通过脚本还原）的非必要项：`node_modules/`、`dist/`、`ios/`、`android/`（原生工程可由 Capacitor 重新生成）等。

仓库中提供了一个安全清理脚本 `scripts/prune_to_app.sh`：

```bash
# 列出将被移动的文件（干运行）
bash scripts/prune_to_app.sh

# 确认后实际移动
bash scripts/prune_to_app.sh --run
```

实现范围与限制

- .ics 的导入/导出实现偏简洁，未覆盖全部 RFC5545 复杂规则（如复杂重复规则）。
- 中国农历转换仅包含占位实现；如需准确农历支持，可集成专门库。

如何贡献 / 调试

- 本地调试请用 `npm run dev`，修改 `src/` 后 Vite 会热重载。
- 如需添加原生插件（通知、文件、相机等），优先使用 Capacitor 社区插件并在原生工程同步。

联系与后续

如果你需要我：
- 帮你把 iOS/Android 原生工程生成并协助排查签名错误（你执行命令，我分析输出）；
- 或把特定原生功能（例如本地通知、文件导入/导出）接入并提供 web 回退实现。

---
本 README 已整合仓库中原有的移动与提交说明，保留最小且实用的操作步骤。需要我进一步精简或把某些配置（如 `.gitignore`）也保留下来，请告诉我要保留的文件清单。
- `src/utils/storage.js`：localStorage 持久化
