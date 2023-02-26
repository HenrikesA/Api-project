import { useState, useEffect } from "react";
import axios from "axios";

interface Props {
  countries: Country[];
  showCounts: number;
  handleLoadMore: () => void;
}

export type Country = {
  name: { common: string }
  capital: string[]
  population: number
  region: string
  flags: { svg: string }
  wikiLink: string
};

function CountryData({ countries }: Props) {
  const [countriess, setCountries] = useState<Country[]>([]);
  const [visibleCountries, setVisibleCountries] = useState<Country[]>([]);
  const [showCount, setShowCount] = useState(8);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const countriesWithLinks = response.data.map((country: any) => ({ ...country, wikiLink: `https://en.wikipedia.org/wiki/${country.name.common}`}))
      setVisibleCountries(countriesWithLinks.slice(0, showCount))
      setCountries(countriesWithLinks)
    })
  }, [showCount]);

  useEffect(() => {
    setVisibleCountries(countries.slice(0, showCount))
  }, [countries, showCount, visibleCountries]);

  const loadMore = () => setShowCount(showCount + 10);

  return (
    <div className="p-6 font-extrabold text-center">
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th>Flag</th>
                    <th>Name</th>
                    <th>Capital</th>
                    <th>Region</th>
                    <th>Population</th>
                    <th>More Info...</th>
                </tr>
            </thead>

            <tbody>
                {visibleCountries.map((country) => (
                 <tr key={country.name.common}>
                <td className="grid py-5 place-items-center">
                    <img
                    src={country.flags.svg}
                    alt={`Flag of ${country.name.common}`}
                    className="w-24"
                    />
                </td>

                <td className="border">{country.name.common}</td>
                <td className="border">{country.capital}</td>
                <td className="border">{country.region}</td>
                <td className="border">{country.population}</td>

                <td className="border w-24">
                    <a href={country.wikiLink} target="_blank">
                    ➡️
                    </a>
                </td>
                </tr>
            ))}
            </tbody>
        </table>

      {visibleCountries.length < countriess.length && (
        <button 
          className="font-bold py-2 px-4 mt-4 bg-red-600 hover:bg-red-700 rounded"
          onClick={loadMore}> Load More
        </button>)
      }
    </div>
  );
}

export default CountryData;
