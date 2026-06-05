const { app } = require('@azure/functions')

const CWA_API_URL = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001'

app.http('weather', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request) => {
    const authKey = process.env.CWA_AUTH_KEY || ''
    if (!authKey.trim()) {
      return {
        status: 500,
        jsonBody: {
          error: 'Missing CWA_AUTH_KEY',
        },
      }
    }

    const url = new URL(CWA_API_URL)
    const locationName = new URL(request.url).searchParams.get('locationName') || '臺北市'
    url.searchParams.set('Authorization', authKey.trim())
    url.searchParams.set('locationName', locationName)
    url.searchParams.set('format', 'JSON')

    const response = await fetch(url)
    const body = await response.text()

    return {
      status: response.status,
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
      body,
    }
  },
})
