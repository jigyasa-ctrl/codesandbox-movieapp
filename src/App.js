import React, { useState, useEffect } from "react";
import "./styles.css";
import getMovies from "./data/getMovies";

export default function App() {
  const [storeData, setStoreData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [storeGenres, setStoreGenre] = useState([]);
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    if (storeData.length <= 0) {
      getMovies().then((data) => {
        setStoreData(data.movies);
        setStoreGenre(data.genres);
      });
    }
  }, [storeData]);

  //Use data/getMovies.js to load data
  //Show loader until the data is loaded

  const handleSearch = (value) => {
    if (searchValue) {
      let newStore = storeData.filter((data) => {
        return data.title.toLowerCase().includes(searchValue.toLowerCase());
      });
      setStoreData(newStore);
      setShowError(false);
    } else {
      getMovies().then((data) => setStoreData(data.movies));
      setShowError(false);
    }
  };

  const handleGenreChange = (value) => {
    let updatedStore;
    if (value) {
      updatedStore = storeData.filter((data) => data.genres.includes(value));
    } else {
      getMovies().then((data) => {
        setStoreData(data.movies);
        setStoreGenre(data.genres);
      });
    }
    // let updatedStore = storeData.filter((data) => data.genres.includes(value));
    if (updatedStore.length > 0) {
      setShowError(false);
      setStoreData(updatedStore);
    } else if (value !== "all") {
      setShowError(true);
    } else if (value == "all") {
      setShowError(false);
      handleSearch();
    }
  };

  const handleFilters = (type, value) => {
    if (type == "search") {
      handleSearch(value);
    }
    if (type == "genre") {
      handleFilters(value);
    }
  };
  //Show list of movies
  //Movie Name, List of Genres (Comma separated)

  //Implement search on name of movie
  //Implement filter based on genres

  /* Filter results
    // Results should show if both search and genre are matching
    // Optional: Highlight the matching part with the search key
  */

  return (
    <div className="App">
      <h1>Movie APP</h1>

      <input
        type="text"
        name="search"
        onKeyUp={(e) => setSearchValue(e.target.value)}
      />

      <button onClick={() => handleSearch()}>Submit</button>
      <br />
      <select
        style={{ width: "40%" }}
        onChange={(e) => handleGenreChange(e.target.value)}
      >
        <option value="all">All</option>
        {storeGenres &&
          storeGenres.map((data) => <option value={data}>{data}</option>)}
      </select>
      {showError && <span>No data available</span>}
      {storeData &&
        !showError &&
        storeData.map((data) => {
          return (
            <div style={{ margin: "30px", border: "2px solid black" }}>
              <img src={data.posterUrl} style={{ height: "300px" }} />
              <br></br>
              <span>Title: {data.title}</span>
              <br></br>
              <span>Genre: {data.genres.join(",")}</span>
              <br></br>
              <span>Year: {data.year}</span>
            </div>
          );
        })}
    </div>
  );
}
