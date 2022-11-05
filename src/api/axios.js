import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "2db9744068903d581bd4c1b09bb1a289",
        language: "ko-KR"        
    }
});

export default instance;