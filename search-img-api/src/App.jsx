import { useState } from "react";
import Picture from "./components/Picture";
import "./App.css";
function App() {
  const [word, setWord] = useState("");
  
  const [photos, setPhoto] = useState([]);

  function searchImage(e) {
    e.preventDefault();
    if (!word) {
      alert("Enter Anythig!");
    } else {
      fetchImageFromAPI();
      console.log(import.meta.env);
    }
  }
  async function fetchImageFromAPI() {
    const url = `${import.meta.env.VITE_API_URL}?page=1&query=${word}&client_id=${import.meta.env.VITE_API_KEY}&per_page=15`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);
    const result = data.results;
    if (result.length == 0) {
      alert("Have no picture Try again");
      setWord("");
    } else {
      setPhoto(result);
      //begin show picture
    }
  }

  return (
    <>
      <h1>Search Image by API </h1>
      <form onSubmit={searchImage}>
        <input
          type="text"
          placeholder="Search image"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        ></input>
        <button type="submit">Search</button>
      </form>

      {/* display image */}
      <div className="search-result">
        {photos.map((data, index) => {
          return <Picture key={index} {...data} />;
        })}
      </div>
    </>
  );
}

export default App;
