import { useState } from "react";
import { Country } from "./CountryData";

function Header(props: { countries: Country[]; setFilteredCountries: Function }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const filteredCountries = props.countries

    .filter((country) => country.name.common.toLowerCase().includes(searchQuery.toLowerCase()))

    .sort((a, b) => {
      const aIndex = a.name.common.toLowerCase().indexOf(searchQuery.toLowerCase())
      const bIndex = b.name.common.toLowerCase().indexOf(searchQuery.toLowerCase())
      return aIndex - bIndex
    })

    props.setFilteredCountries(filteredCountries)
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => { if (event.key === "Enter") {handleSearch()} };

  return (
    <div className="sticky top-0 flex justify-between items-center p-4 bg-gray-800">
      <h1 className="text-lg font-bold">Country Data</h1>
      <div className="flex items-center">
        <input
          className="py-1 px-4 bg-gray-700 border-2 rounded-l-md border-gray-600 focus:outline-none focus:border-transparent"
          type="text"
          value={searchQuery}
          placeholder="Search..."
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyDown = {handleKeyDown}
        />
        <button
          className="py-[6px] px-4 bg-blue-600 rounded-r-md hover:bg-blue-700"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default Header
