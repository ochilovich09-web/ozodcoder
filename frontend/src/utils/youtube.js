// Turli xil YouTube havolalarini (watch, youtu.be) iframe uchun
// ishlaydigan "embed" formatiga o'giradi.
export function toEmbedUrl(url) {
  if (!url) return url

  let parsed
  try {
    parsed = new URL(url)
  } catch {
    return url
  }

  if (parsed.hostname === 'youtu.be') {
    const videoId = parsed.pathname.slice(1)
    return `https://www.youtube.com/embed/${videoId}`
  }

  if (parsed.hostname.includes('youtube.com') && parsed.pathname === '/watch') {
    const videoId = parsed.searchParams.get('v')
    if (videoId) return `https://www.youtube.com/embed/${videoId}`
  }

  return url
}
