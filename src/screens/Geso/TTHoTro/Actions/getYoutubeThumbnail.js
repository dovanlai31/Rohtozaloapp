export const getYoutubeThumbnail = (url) => {
  let videoId;
  if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1];
    let ampersandPosition = videoId.indexOf('?');
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
  } else {
    videoId = url.split('v=')[1];
    let ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
  }

  if (!videoId) {
    alert('Lỗi Thumbnail');
    return;
  }

  return `https://img.youtube.com/vi/${videoId}/0.jpg`;
};
