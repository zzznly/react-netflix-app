import React, {useEffect, useState} from 'react';
import axios from '../api/axios';
import './Row.css';
import MovieModal from './MovieModal'

export default function Row({ title, id, fetchURL, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});

    useEffect(() => {
        fetchMovieData();
    }, [fetchURL]);

    const fetchMovieData = async () => {
        const request = await axios.get(fetchURL);
        // console.log(request.data.results);
        setMovies(request.data.results);

        return request;
    }

    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    }

  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
            <span 
                className="arrow"
                onClick={() => { document.getElementById(id).scrollLeft -= window.innerWidth - 80; } }
            >
            {"<"}
            </span>
        </div>
        <div className="row__posters" id={id}>
            {movies.map((movie) => (
                <img
                    key={movie.id}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`https://image.tmdb.org/t/p/original/${ isLargeRow ? movie.poster_path : movie.backdrop_path }`}
                    loading="lazy"
                    alt={movie.name}
                    onClick={()=>{ handleClick(movie) }}
                />
            ))}
        </div>
        <div className="slider__arrow-right">
            <span
                className="arrow"
                onClick={() => {document.getElementById(id).scrollRight += window.innerWidth + 80} }
            >
            {">"}
            </span>
        </div>
      </div>
      {
        // {...movieSelected} 요렇게 props 한 이유? => 객체의 모든 속성데이터를 하나씩 props로 보내준거임!
        modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen}/>
      }
    </section>
  )
}
