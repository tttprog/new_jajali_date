export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  const data = await $fetch(config.public.ReligiousTimesApiUrl, {
    query: query,
    method: "GET"
  })
  return data
})
