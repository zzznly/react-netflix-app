import axios from '../api/axios';
import React, {useState, useEffect} from 'react';
import requests from '../api/request';
import "./Banner.css";
import styled from 'styled-components';

export default function Banner() {
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNowPlaying);
      console.log(request.data.results);

      const movieId = request.data.results[Math.floor(Math.random() * request.data.results.length)].id;
      
      // 특정 영화의 더 상세한 정보 가져오기 (비디오 정보도 포함)
      const { data: movieDetail } = await axios.get(`movie/${movieId}`, { params: {append_to_response: "vidoes"} });
      setMovie(movieDetail);

      console.log('movieDetail', movieDetail);
      console.log('movie', movie); 
    // => 콘솔 왜 두번씩 찍힘..?
    // => const {data: movieDetail}...??
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n-1) + "..." : str; //선택적 체인기법 - undefined, null 일 경우를 검사
    }

    const Container = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100vh;
    `;

    const HomeContainer = styled.div`
        width: 100%;
        height: 100%;
    `;

    const Iframe = styled.iframe`
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.65;
        border: none;

        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    `
    
    if(!isClicked) {
        return (
            <header 
                className="banner"
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                    backgroundPosition: "top center",
                    backgroundSize: "cover",
                }}
            >
                <div className="banner__contents">
                    <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                    <div className="banner__buttons">
                        <button className="banner__button play" onClick={() => setIsClicked(true)}>Play</button>
                        <button className="banner__button info">More Information</button>
                    </div>
                    <h1 className="banner__description">{ truncate(movie?.overview, 100) }</h1>
                </div>
                <div className="banner--fadeBottom" />
            </header>
        )
    }
    else {
        if(movie) {
            return (
                <Container>
                    <HomeContainer>
                        <Iframe
                            width="640"
                            height="360"
                            src={`https://www.youtube.com/embed/Prfx-u1B2uE?controls=0&autoplay=1&loop=1&mute=1&playlist=Prfx-u1B2uE`}
                            title="Youtube video player"
                            frameborder="0"
                            allow="autoplay; fullscreen"
                        ></Iframe>
                    </HomeContainer>
                </Container>
            )
        }
    }
}
