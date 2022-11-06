import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "../../api/axios";

export default function DetailPage() {
    const { movieId } = useParams();
    console.log('movieId', movieId);
    const [movies, setMovies] = useState({});

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`/movie/${movieId}`);
            setMovies(request.data);
        }
        fetchData();
    }, [movieId])

    if (!movies) return null;
    else return (
        <section>
            <img
                className="modal__poster-img"
                src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`}
                alt="modal__poster-img"
            />
        </section>
    );
}
