import React, { useState } from "react";
import "./App.css";
import { SearchBar } from "./components/searchBar";
import SearchResult from "./components/searchResult";
import { Spinner } from "./components/spinner";
import { useBrregSearch } from "./hooks/useBrregSearch";

function App() {
  const [search, setSearch] = useState("");
  const { result, loading } = useBrregSearch({ query: search });

  return (
    <div className="App">
      <SearchBar value={search} onChange={setSearch} />

      <Spinner loading={loading}>
        <SearchResult data={result} />
      </Spinner>
    </div>
  );
}

export default App;
