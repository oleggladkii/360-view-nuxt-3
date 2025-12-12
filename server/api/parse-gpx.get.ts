import { defineEventHandler, getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const gpxUrl = query.url as string

  if (!gpxUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: 'URL is required',
    })
  }

  /* logic moved to server/utils/gpx.ts */
  // Nuxt 3 auto-imports utils from server/utils
  return parseGpx(gpxUrl) 
})