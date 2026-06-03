---
name: demo-role-router
description: Use when the work should be routed between demo frontend engineering and demo DevOps/MCP responsibilities, or when deciding which role-specific instructions to apply.
---

# Demo Role Router

這個 skill 只負責「路由」：

- 前端開發相關工作，讀 [frontend.md](references/frontend.md)
- DevOps、CI/CD、GitHub、Azure、MCP 相關工作，讀 [devops.md](references/devops.md)

## 路由規則

1. 如果焦點是 `Vite + Vue`、畫面、元件、資料呈現、互動體驗，走前端角色。
2. 如果焦點是 `GitHub Actions`、部署、Secrets、Azure、MCP、環境變數、發佈流程，走 DevOps 角色。
3. 如果同時涵蓋兩者，先拆成兩段工作，再分別套用對應角色。

## 執行方式

1. 先判斷任務屬於哪個角色。
2. 只載入對應的 reference。
3. 產出時明確標示是由哪個角色負責。

