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
    azanSobh: null,
    azanZohr: null,
    azanMaghreb: null,
    nimehShab: null,
    toluAftab: null,
    ghorubAftab: null,
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
    },
    async getAzan(query: any) {
      const sendData = {
        city: this.city.toString(),
        month: query.value.month.toString(),
        day: query.value.day.toString(),
      }
      const { data, status, error } = await useFetch<any>('/api/azan', { method: 'post', query: sendData })

      if (data.value && status.value === "success") {
        this.azanSobh = data?.value["result"]["azan_sobh"]
        this.azanZohr = data?.value["result"]["azan_zohr"]
        this.azanMaghreb = data?.value["result"]["azan_maghreb"]
        this.nimehShab = data?.value["result"]["nimeshab	"]
        this.toluAftab = data?.value["result"]["tolu_aftab"]
        this.ghorubAftab = data?.value["result"]["ghorub_aftab"]
      } else {
        this.error = true
      }
    }
  }
})
