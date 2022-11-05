import React from 'react';
import { Outlet, Route, Routes } from "react-router-dom";
import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Banner from './components/Banner';
import Row from './components/Row';
import requests from './api/request'

function App() {
  return (
    <div className="app">
      <Nav/>
      <Banner/>
      <Row
        title="NETFLIX ORIGINALS"
        id="NO"
        fetchURL={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" id="TN" fetchURL={requests.fetchTrending}/>
      <Row title="Top Rated" id="TR" fetchURL={requests.fetchTopRated}/>
      <Row title="Action Movies" id="AM" fetchURL={requests.fetchActionMovies}/>
      <Row title="Comedy Movies" id="CM" fetchURL={requests.fetchComedyMovies}/>
      <Footer/>
    </div>
  );
}

export default App;
