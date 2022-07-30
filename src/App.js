import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import './App.css';
import SearchIcon from './search.svg';
const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=d33ac0c9';
const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState('');
    const [spinner, setSpinner] = useState(false);
    const searchMovies = async (title) => {
        setSpinner(true);
        const response = await axios.get(`${API_URL}&s=${title}`);
        const data = response.data.Search;
        setMovies(data);
    };
    // const ds = 'hello react';
    useEffect(() => {
        searchMovies();
    }, [searchTerm]);
    //d33ac0c9
    return (
        <div className="app">
            <h1>Movie Land</h1>
            <div className="search">
                <input placeholder="search for movie"
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
            </div>
            {
                movies?.length > 0
                    ?
                    (
                        <div className='container'>
                            {movies.map((movie) => (
                                <Card movie={movie} />
                            ))}
                        </div>
                    ) :
                    (
                        <div className='empty'>
                            <h2>no movie found</h2>
                        </div>
                    )
            }
        </div>
    );
}

export default App;