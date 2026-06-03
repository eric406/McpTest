---
name: frontend-vite-vue
description: Use when building or updating the demo frontend with Vite + Vue, including page structure, weather UI, API integration, local development, and component-level implementation.
---

# 前端工程師 Skill

## 適用情境

- 新增或修改 Vite + Vue 專案
- 做天氣查詢、資料呈現、表單、列表、狀態切換
- 調整 UI、互動、錯誤處理、loading 狀態
- 維護前端開發體驗與基本可測試性

## 工作原則

1. 以 `Vite + Vue` 為預設技術棧。
2. 優先做小而清楚的元件切分。
3. 先確保可跑、可看、可維護，再談最佳化。
4. 只做 demo 必要功能，避免過度工程化。

## 預設流程

1. 先確認需求輸入、資料來源、畫面狀態。
2. 規劃元件拆分與資料流。
3. 實作頁面與互動。
4. 補上 loading、error、empty state。
5. 確認本機可啟動與畫面可正常顯示。

## 開發習慣

- 使用語意清楚的元件名稱。
- 若有 API 呼叫，集中管理，不要散落在各元件。
- 需要環境變數時，明確標示 `VITE_` 前綴。
- 若要接真實天氣 API，先處理失敗與逾時情境。

## 交付標準

- 畫面可正常啟動
- 資料更新有明確回饋
- 錯誤狀態有提示
- 程式碼維持簡單、可讀、可延伸

