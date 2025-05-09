import { defineStore } from 'pinia'

export const useDateStore = defineStore('dateStore', {
  state: () => ({
    solarYear: null,
    solarMonth: null,
    solarDay: null,
    solarDayWeek: null,
    lunarYear: null,
    lunarMonth: null,
    lunarDay: null,
    year: null,
    month: null,
    day: null,
    events: null,
    azanMorning: null,
    azanZohr: null,
    azanMaghreb: null,
    city: 'تهران',
    error: false
  }),
  actions: {
    async getDate(query: object) {
      const { data, status, error } = await useFetch<any>('/api/dates', { method: 'post', query: query })
      if (data.value && status.value === "success") {
        const events: any = data?.value["result"]["event"]
        const solar: any = data?.value["result"]["solar"]
        const moon: any = data?.value["result"]["moon"]
        const gregorian: any = data?.value["result"]["gregorian"]
        this.solarYear = solar?.year
        this.solarMonth = solar?.month
        this.solarDay = solar?.day
        this.solarDayWeek = solar?.dayWeek
        this.lunarYear = moon?.year
        this.lunarMonth = moon?.month
        this.lunarDay = moon?.day
        this.year = gregorian?.year
        this.month = gregorian?.month
        this.day = gregorian?.day
        this.events = events.toString()
      } else {
        this.error = true
      }
    }
  }
})
