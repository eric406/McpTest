<script setup>
import { computed, onMounted, ref } from 'vue'

const apiUrl = '/api/weather'

const loading = ref(false)
const errorMessage = ref('')
const locationName = ref('臺北市')
const issueTime = ref('')
const forecastItems = ref([])

const hasData = computed(() => forecastItems.value.length > 0)

function toItems(location) {
  const elements = location?.weatherElement ?? []
  const wx = elements.find((item) => item.elementName === 'Wx')
  const pop = elements.find((item) => item.elementName === 'PoP')
  const minT = elements.find((item) => item.elementName === 'MinT')
  const maxT = elements.find((item) => item.elementName === 'MaxT')
  const ci = elements.find((item) => item.elementName === 'CI')

  return (wx?.time ?? []).map((entry, index) => ({
    label: ['今日白天', '今夜至明晨', '明日白天'][index] || `第 ${index + 1} 期`,
    period: `${entry.startTime?.slice(5, 16).replace('T', ' ')} - ${entry.endTime?.slice(5, 16).replace('T', ' ')}`,
    weather: entry.parameter?.parameterName || '資料缺漏',
    rain: pop?.time?.[index]?.parameter?.parameterName || 'N/A',
    low: minT?.time?.[index]?.parameter?.parameterName || 'N/A',
    high: maxT?.time?.[index]?.parameter?.parameterName || 'N/A',
    comfort: ci?.time?.[index]?.parameter?.parameterName || 'N/A',
  }))
}

async function loadWeather() {
  loading.value = true
  errorMessage.value = ''

  try {
    const url = new URL(apiUrl, window.location.origin)
    url.searchParams.set('locationName', locationName.value)

    const response = await fetch(url.toString())
    if (!response.ok) {
      throw new Error(`API 請求失敗，HTTP ${response.status}`)
    }

    const data = await response.json()
    const location = data?.records?.location?.find((item) => item.locationName === locationName.value) || data?.records?.location?.[0]

    if (!location) {
      throw new Error('找不到台北市的預報資料。')
    }

    issueTime.value = data?.records?.datasetDescription || '中央氣象署今明 36 小時天氣預報'
    forecastItems.value = toItems(location)
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : '發生未知錯誤'
    forecastItems.value = []
  } finally {
    loading.value = false
  }
}

onMounted(loadWeather)
</script>

<template>
  <main class="shell">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">中央氣象署開放資料</p>
        <h1>今日台北天氣</h1>
        <p class="lead">查詢台北今日的氣溫與降雨機率</p>
      </div>

      <div class="hero-card">
        <div class="hero-row">
          <span>查詢縣市</span>
          <strong>{{ locationName }}</strong>
        </div>
        <div class="hero-row">
          <span>資料來源</span>
          <strong>F-C0032-001</strong>
        </div>
        <button class="action" type="button" :disabled="loading" @click="loadWeather">
          {{ loading ? '更新中...' : '重新整理' }}
        </button>
      </div>
    </section>

    <section class="panel">
      <div v-if="errorMessage" class="state state-error">
        {{ errorMessage }}
      </div>

      <div v-else-if="loading" class="state">
        讀取中央氣象署資料中...
      </div>

      <div v-else-if="hasData">
        <div class="meta">
          <span>資料說明：{{ issueTime }}</span>
          <span>查詢位置：{{ locationName }}</span>
        </div>

        <div class="cards">
          <article v-for="item in forecastItems" :key="item.label" class="card">
            <div class="card-head">
              <h2>{{ item.label }}</h2>
              <span class="period">{{ item.period }}</span>
            </div>
            <p class="weather">{{ item.weather }}</p>
            <div class="stats">
              <div>
                <span>高溫</span>
                <strong>{{ item.high }}°C</strong>
              </div>
              <div>
                <span>低溫</span>
                <strong>{{ item.low }}°C</strong>
              </div>
              <div>
                <span>降雨機率</span>
                <strong>{{ item.rain }}%</strong>
              </div>
            </div>
            <p class="comfort">舒適度：{{ item.comfort }}</p>
          </article>
        </div>
      </div>

      <div v-else class="state">
        暫時沒有可顯示的天氣資料。
      </div>
    </section>
  </main>
</template>

<style scoped>
.shell {
  max-width: 1080px;
  margin: 0 auto;
  padding: 40px 20px 56px;
}

.hero {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 20px;
  align-items: stretch;
}

.hero-copy,
.hero-card,
.panel {
  border: 1px solid rgba(16, 35, 63, 0.08);
  box-shadow: 0 18px 50px rgba(16, 35, 63, 0.08);
  backdrop-filter: blur(18px);
}

.hero-copy {
  padding: 32px;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.88), rgba(229, 243, 255, 0.72));
}

.eyebrow {
  margin: 0 0 12px;
  font-size: 0.9rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #2d5f9d;
}

h1 {
  margin: 0;
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 1.05;
}

.lead {
  margin: 16px 0 0;
  max-width: 32rem;
  font-size: 1.05rem;
  line-height: 1.8;
  color: #4b627f;
}

.hero-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: space-between;
  padding: 24px;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(16, 35, 63, 0.94), rgba(31, 58, 95, 0.92));
  color: #f5f9ff;
}

.hero-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.hero-row span {
  color: rgba(245, 249, 255, 0.72);
}

.action {
  margin-top: 8px;
  border: 0;
  border-radius: 14px;
  padding: 14px 18px;
  background: #7dd3fc;
  color: #0c1728;
  font-weight: 700;
  cursor: pointer;
}

.action:disabled {
  opacity: 0.7;
  cursor: wait;
}

.panel {
  margin-top: 22px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.82);
  padding: 22px;
}

.state {
  padding: 32px;
  border-radius: 20px;
  background: rgba(16, 35, 63, 0.04);
  color: #45607f;
  text-align: center;
}

.state-error {
  background: rgba(239, 68, 68, 0.08);
  color: #b42318;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
  margin-bottom: 18px;
  color: #5f6f86;
  font-size: 0.95rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.card {
  padding: 20px;
  border-radius: 22px;
  background: linear-gradient(180deg, #ffffff, #f2f8ff);
  border: 1px solid rgba(16, 35, 63, 0.08);
}

.card-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.card h2 {
  margin: 0;
  font-size: 1.08rem;
}

.period {
  color: #70829b;
  font-size: 0.85rem;
  text-align: right;
}

.weather {
  margin: 12px 0 16px;
  min-height: 3rem;
  color: #28405d;
  line-height: 1.7;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.stats div {
  padding: 12px;
  border-radius: 16px;
  background: rgba(125, 211, 252, 0.16);
}

.stats span,
.comfort {
  display: block;
  color: #62758f;
  font-size: 0.88rem;
}

.stats strong {
  display: block;
  margin-top: 4px;
  font-size: 1.2rem;
}

.comfort {
  margin: 14px 0 0;
}

@media (max-width: 900px) {
  .hero,
  .cards {
    grid-template-columns: 1fr;
  }
}
</style>
