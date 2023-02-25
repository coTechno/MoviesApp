import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetails.css';
import CircularProgress from '@mui/material/CircularProgress';

const MovieDetails = () => {
  const { imdbID } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = 'b3e42f02';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
        setMovieDetails(response.data);
        console.log(response.data);
        setErrorMessage('');
      } catch (error) {
        setMovieDetails({});
        setErrorMessage('Error fetching movie details');
      }
    };
    fetchMovieDetails();
  }, [imdbID]);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500);
  }, [])
  const renderMovieDetails = () => {

    if (!movieDetails.Title) {
      return <div className='loader'><CircularProgress  color="inherit" /></div>;
    }

    return (<>
      {isLoading ? <div className='loader'><CircularProgress  color="inherit" /></div> : <div className="movie-details-container">
        <div className="movie-poster">
          <img src={movieDetails.Poster} alt={movieDetails.Title} />
        </div>
        <div className="movie-details">
          <h1>{movieDetails.Title}</h1>
          <hr />
          <p className='plot'>{movieDetails.Plot}</p>
          <div className="movie-info">
            <div className="info-section">
              <h2>Directed by:</h2>
              <p>{movieDetails.Director}</p>
            </div>
            <div className="info-section">
              <h2>Starring:</h2>
              <p>{movieDetails.Actors}</p>
            </div>
            <div className="info-section">
              <h2>Genre:</h2>
              <p>{movieDetails.Genre}</p>
            </div>
            <div className="info-section">
              <h2>Year:</h2>
              <p>{movieDetails.Year}</p>
            </div>
            <div className="info-section">
              <h2>Runtime:</h2>
              <p>{movieDetails.Runtime}</p>
            </div>
            <div className="info-section">
              <h2>IMDB Rating:</h2>
              <p>{movieDetails.imdbRating}/10</p>
            </div>
          </div>
        </div>
      </div>}</>
    );
  };

  return (
    <div className="movie-details-page">
      {/* {isLoading? <div className='loader'><CircularProgress /></div>:null} */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {renderMovieDetails()}
    </div>
  );
};

export default MovieDetails;
