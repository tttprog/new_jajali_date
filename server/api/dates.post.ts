export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  const data = await $fetch(config.public.dateApiUrl, {
    query: query,
    method: "GET"
  })
  return data
})
