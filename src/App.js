import React, { useState, useEffect } from "react";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

import "./styles.css";

export default function App() {
  const [state, setState] = useState({
    monsters: []
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filteredMonsters = state.monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredMonsters);
  }, [state, searchTerm]);

  async function fetchData() {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(users => setState({ monsters: users }));
  }

  useEffect(() => {
    fetchData();
  }, [state]);

  return (
    <div className="App">
      <h1>Monsters Rolodex</h1>
      <SearchBox placeholder="search monsters" handleChange={handleChange} />
      <CardList monsters={searchResults} />
    </div>
  );
}
