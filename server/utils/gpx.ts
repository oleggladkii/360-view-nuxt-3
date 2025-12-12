export const parseGpx = async (gpxUrl: string) => {
  if (!gpxUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: 'URL is required',
    })
  }

  try {
    const gpxText = await $fetch<string>(gpxUrl, { responseType: 'text' })

    const points = []
    let startTime = 0
    
    // Match all trkpt or wpt blocks (non-greedy)
    const pointBlocks = gpxText.match(/<(trkpt|wpt)[\s\S]*?<\/\1>/g) || []

    for (const block of pointBlocks) {
      // Extract lat and lon (attributes can be in any order)
      const latMatch = block.match(/lat="([\d.-]+)"/)
      const lonMatch = block.match(/lon="([\d.-]+)"/)
      const timeMatch = block.match(/<time>(.*?)<\/time>/)

      if (latMatch && lonMatch && timeMatch) {
         const lat = parseFloat(latMatch[1])
         const lng = parseFloat(lonMatch[1])
         const timeStr = timeMatch[1]
         
         const timeDate = new Date(timeStr).getTime()
         
         if (points.length === 0) {
           startTime = timeDate
         }
 
         points.push({
           lat,
           lng,
           time: (timeDate - startTime) / 1000
         })
      }
    }

    return points

  } catch (error: any) {
    console.error('Error parsing GPX:', error)
    console.error('GPX URL:', gpxUrl)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch or parse GPX file: ${error.message || error}`,
    })
  }
}
