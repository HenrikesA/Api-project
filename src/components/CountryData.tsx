import { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import axios from "axios";

interface Props {countries: Country[]};

export type Country = {
  name: { common: string }
  capital: string[]
  population: number
  region: string
  flags: { svg: string }
  wikiLink: string
};

function CountryData({ countries }: Props) {
  const [, setCountries] = useState<Country[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize] = useState(5);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all").then((response) => {
      const countriesWithLinks = response.data.map((country: any) => ({...country, wikiLink: `https://en.wikipedia.org/wiki/${country.name.common}`}))

      setPageCount(Math.ceil(countriesWithLinks.length / pageSize))
      setCountries(countriesWithLinks)
    })
  }, [pageSize]);

  const handlePageClick = ({ selected }: { selected: number }) => {setCurrentPage(selected)};
  const startIndex = currentPage * pageSize;
  const paginatedCountries = countries.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-6 font-extrabold text-center">
      <table className="table-auto w-full">
          <thead>
              <tr className="border-b">
                  <th>Flag</th>
                  <th>Name</th>
                  <th>Capital</th>
                  <th>Region</th>
                  <th>Population</th>
                  <th>More Info...</th>
              </tr>
          </thead>

          <tbody className="h-[80vh]">
              {paginatedCountries.map((country) => (
                <tr className="border-b"  key={country.name.common}>
                  <td>
                    <img
                    className="w-24"
                    src={country.flags.svg}
                    alt={`Flag of ${country.name.common}`}
                    />
                  </td>

                  <td>{country.name.common}</td>
                  <td>{country.capital}</td>
                  <td>{country.region}</td>
                  <td>{country.population}</td>

                  <td className="w-24">
                    <a href={country.wikiLink} target="_blank">
                    ▶️
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
      </table>

      <ReactPaginate
        containerClassName={"pagination flex flex-cols justify-end gap-2"}
        activeClassName={"active text-blue-500"}
        previousLabel={"previous"}
        nextLabel={"next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
      />
    </div>
  )
};

export default CountryData
