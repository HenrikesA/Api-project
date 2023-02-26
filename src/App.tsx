import { useState, useEffect } from "react";
import CountryData, { Country } from "./components/CountryData";
import Header from "./components/Header";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [showCount, setShowCount] = useState(9);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")

      .then((response) => {
        const countriesWithLinks = response.data.map((country: any) => ({ ...country, wikiLink: `https://en.wikipedia.org/wiki/${country.name.common}`}))
        
        const sortedCountries = countriesWithLinks.sort((a:any, b:any) => a.name.common.localeCompare(b.name.common));

        setCountries(sortedCountries)
        setFilteredCountries(sortedCountries)
      })

      .catch((error) => console.log(error))
  },[]);

  const handleLoadMore = () => setShowCount(showCount + 10);

  return (
    <>
      <Header countries={countries} setFilteredCountries={setFilteredCountries} />
      <CountryData countries={filteredCountries} showCounts={showCount} handleLoadMore={handleLoadMore} />
    </>
  )
}

export default App
