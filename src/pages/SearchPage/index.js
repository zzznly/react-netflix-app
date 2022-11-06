import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import axios from "../../api/axios";
import './SearchPage.css'
import {useDebounce} from "../../hooks/useDebounce";

export default function SearchPage() {
    // console.log('useLocation', useLocation());
    const [searchResults, setSearchResults] = useState([]);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    };
    let query = useQuery();
    const searchTerm = query.get("q");
    const debouncedSearchTerm = useDebounce(searchTerm, 500)

    // searchTerm이 바뀔때마다 새로 영화 데이터 가져오기
    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchSearchMovie(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    const fetchSearchMovie = async (searchTerm) => {
        console.log('searchTerm', searchTerm);
        try {
            const request = await axios.get(
                `search/multi?include_adult=false&query=${searchTerm}`
            );
            setSearchResults(request.data.results);
        } catch (error) {
            console.log("error", error)
        }
    }

    const renderSearchResults = () => {
        return searchResults.length > 0 ?
            (<section className="search-container">
                {
                    searchResults.map((movie) => {
                        if(movie.backdrop_path !== null && movie.media_type !== "person") {
                            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
                            return (
                                <div className="movie" key={movie.id}>
                                    <div className="movie__column-poster">
                                        <img src={movieImageUrl} alt="" className="movie__poster"/>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </section>) :
            (<section className="no-results">
                <p>Your search for "{debouncedSearchTerm}" did not have any matches.</p>
            </section>)
    };

    return renderSearchResults();
}