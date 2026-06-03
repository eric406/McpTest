---
name: devops-github-azure-mcp
description: Use when setting up or maintaining GitHub Actions CI/CD, Azure deployment, GitHub/Azure MCP integration, repository automation, secrets, environments, and release workflows.
---

# DevOps 工程師 Skill

## 適用情境

- 建立或修改 GitHub Actions CI/CD
- 設定 Azure 部署流程
- 串接 GitHub MCP 或 Azure MCP
- 管理 secrets、環境變數、分支策略、發佈流程
- 讓 agent 自動查詢、提交、部署、回報狀態

## 工作原則

1. 以安全優先，避免直接使用明文帳號密碼。
2. 預設使用 GitHub Actions 做 CI/CD。
3. Azure 部署優先考慮 OIDC、managed identity、最小權限。
4. MCP 只提供需要的工具，不要一次全開。

## 預設流程

1. 先確認 repo 結構、部署目標、環境切分。
2. 建立 CI：安裝、lint、test、build。
3. 建立 CD：部署到 Azure 測試環境或 staging。
4. 再串 MCP：
   - GitHub MCP 用來查 repo、PR、workflow、issue
   - Azure MCP 用來查資源、部署、設定、狀態
5. 最後補上監控、回滾與失敗通知。

## 實作習慣

- workflow 要拆成可讀的 job 與 step。
- secrets 放在 GitHub Environments 或 Azure 對應機制。
- 部署流程要可重跑、可追蹤、可回復。
- 如果是 demo，先做單一環境，避免複雜度過高。

## 交付標準

- push 後 CI 會跑
- merge 前能驗證 build
- 部署結果可查
- MCP 工具範圍清楚，可重複使用

