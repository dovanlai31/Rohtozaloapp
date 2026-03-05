
import axios from 'axios';

const API_KEY = 'AIzaSyBA9R1Qca1eSugFbPTJGpK-xoMglmxNgAE';

const getYouTubeVideoInfo = async (videoId) => {
  try {

    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet,contentDetails,statistics,status`);
 ///   alert(JSON.stringify(response.data.items[0]))
    return response.data.items[0];
  } catch (error) {
    console.error('loix', error);
    return null;
  }
};

export default getYouTubeVideoInfo;
