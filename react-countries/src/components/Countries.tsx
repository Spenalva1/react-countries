import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Country } from "../country.interface";

const Countries = () => {

  const [countries, setCountries] = useState<Country[]>([])

  const fetchCountries = async () => {
    const data = await axios.get('https://restcountries.eu/rest/v2/all');
    console.log(data);

    setCountries([...data?.data])
  }

  useEffect(() => {
    fetchCountries()
  }, [])
  return (
      <div>
        {countries.length && countries.map(c => (
          <Link key={c.alpha3Code} to={`/${c.name}`}>
            {c.name}
          </Link>
        ))}
      </div>
  )
}

export default Countries;