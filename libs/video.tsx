export function getYouTubeEmbedUrl(url: string): string {
  // Already an embed URL
  if (url.includes('embed')) return url;
  
  // Standard YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID
  if (url.includes('watch?v=')) {
    const videoId = url.split('watch?v=')[1].split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Short URL: https://youtu.be/VIDEO_ID
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  return url;
}