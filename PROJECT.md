# MCP Demo 專案說明

## 專案目標

建立一個可展示的 demo 專案，主題是「最近一週天氣查詢網站」，並練習以下流程：

- GitHub 版本控制與 PR 流程
- GitHub Actions CI/CD
- Azure 部署
- GitHub MCP 與 Azure MCP 的協作
- 以角色分工方式讓 agent 參與開發與維運

## 產品範圍

- 網站功能只保留最小可用範圍
- 顯示最近一週天氣資料
- 可手動重新整理資料
- 顯示 loading、error、empty state
- 以 demo 可展示、可部署、可追蹤為優先

## 技術方向

- 前端：`Vite + Vue`
- 版本控制：`Git`
- CI/CD：`GitHub Actions`
- 雲端部署：`Azure`
- 自動化與平台操作：`MCP`

## 角色分工

### 前端工程師

- 負責 `Vite + Vue` 頁面與元件實作
- 負責天氣資料呈現與互動
- 負責 loading、error、empty state
- 負責前端可讀性與維護性

### DevOps 工程師

- 負責 GitHub Actions workflow
- 負責 Azure 部署流程
- 負責 secrets、環境變數與發佈設定
- 負責 GitHub MCP 與 Azure MCP 的串接與使用規則

### 路由 skill

- 用來判斷工作應該交給前端或 DevOps
- 只做轉派，不承擔實作細節

## 預期工作流程

1. 建立前端頁面骨架
2. 串接天氣資料來源
3. 建立 GitHub Actions CI
4. 建立 Azure CD 流程
5. 串接 GitHub MCP 與 Azure MCP
6. 驗證部署結果與回報流程

## 完成標準

- 網站可以正常顯示最近一週天氣
- push 後 CI 會自動執行
- merge 後可自動部署到 Azure
- agent 能依角色分工處理前端與 DevOps 任務
- MCP 可用來查詢與操作 GitHub / Azure 的必要功能

