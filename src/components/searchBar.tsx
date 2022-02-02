import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import SearchResult from "./searchResult";

export default function SearchBar() {
  const [companiesData, setCompaniesData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      if (search == "") {
        setCompaniesData([]);
        return;
      }
      if (search.length < 2) return;

      setIsLoading(true);

      // Hvis man myser litt på denne koden så ser man at en del av koden ca gjentas
      // Det er alltid en god ting å prøve å rydde litt i slik kode så den blir enklere å forholde seg til.
      axios
        .get(
          `https://data.brreg.no/enhetsregisteret/api/enheter?navn=${search}`
        )
        .then((response) => {
          console.log(response.data);
          const data = response.data._embedded.enheter;
          setCompaniesData(data);
          setIsLoading(false);
        })
        .catch((e) => {
          // - Bruk en try/catch og en `Cannot read properties of undefined` feil for å styre programflyten er litt for utydelig.
          //   - En bedre løsning kan være å sjekke searchOrgNr først, og så velge hvilket API man skal søke på på bakgrunn av det.
          const searchOrgNr = Number(search);
          if (!searchOrgNr) {
            setCompaniesData([]);
            setIsLoading(false);
            return;
          }

          if (searchOrgNr.toString().length < 9) {
            setCompaniesData([]);
            setIsLoading(false);
            return;
          }

          axios
            .get(
              `https://data.brreg.no/enhetsregisteret/api/enheter?organisasjonsnummer=${searchOrgNr}`
            )
            .then((response) => {
              const data = response.data._embedded.enheter;
              setCompaniesData(data);
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setCompaniesData([]);
              setIsLoading(false);
            });
        });
    })();
  }, [search]);

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
        {isLoading ? (
          <div className="justify-center items-center text-center">
            <FontAwesomeIcon
              icon={faSpinner}
              className="animate-spin text-center text-3xl my-5 text-blue-700"
            />
          </div>
        ) : (
          <SearchResult data={companiesData} />
        )}
      </div>
    </>
  );
}
