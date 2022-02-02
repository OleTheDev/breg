import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import SearchResult from "./searchResult";
import { useBrregSearch } from "../hooks/useBrregSearch";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const { result, loading } = useBrregSearch({ query: search });

  return (
    <>
      <div>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Søk etter firma..."
          className="my-5 max-w-sm rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 dark:bg-gray-800 text-gray-700 placeholder-gray-400 dark:text-white  shadow-sm text-base focus:outline-none focus:ring-2 focus focus:border-transparent z-10"
          autoComplete="off"
        />
      </div>
      <div className="m-10">
        {loading ? (
          <div className="justify-center items-center text-center">
            <FontAwesomeIcon
              icon={faSpinner}
              className="animate-spin text-center text-3xl my-5 text-blue-700"
            />
          </div>
        ) : (
          <SearchResult data={result} />
        )}
      </div>
    </>
  );
}
