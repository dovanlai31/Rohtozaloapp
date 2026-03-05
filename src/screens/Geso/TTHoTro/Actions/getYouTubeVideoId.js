const getYouTubeVideoId = (url) => {
      if(url) {
        const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        
        if (match && match[1]) {
          return match[1];
        } else {
          const params = new URLSearchParams(new URL(url).search);
          return params.get('v') || params.get('si');;
        }
      } else {
        //return  alert('Link Video Không hợp lệ')
      }

  };
  
export default getYouTubeVideoId;