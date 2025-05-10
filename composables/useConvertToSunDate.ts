import { useDateFormat, useNow } from '@vueuse/core'

export const useConvertToSunDate = (date: string) => {
  const formattedDateToList = date.split('/').toString()
  const dateToDate = new Date(formattedDateToList)
  const formatted = new Intl.DateTimeFormat('fa-IR-u-nu-latn').format(dateToDate)
  const sunDateToList = formatted.split('/')
  const year = sunDateToList[0]
  const month = sunDateToList[1]
  const day = sunDateToList[2]
  const query = {
    year: year,
    month: month,
    day: day
  }
  return ref(query)
}
