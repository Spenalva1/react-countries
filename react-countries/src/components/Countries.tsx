import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Country } from "../country.interface";
import CountryComponent from "./Country";

const Countries = () => {

  const [countries, setCountries] = useState<Country[]>([])

  const fetchCountries = async () => {
    const data = await axios.get('https://restcountries.eu/rest/v2/all');
    console.log(data);

    setCountries([...data?.data.slice(0, 3)])
  }

  useEffect(() => {
    fetchCountries()
  }, [])
  return (
      <CountriesStyles>
        {countries.length && countries.map(c => (
          <CountryComponent key={c.alpha3Code} country={c}/>
        ))}
      </CountriesStyles>
  )
}

const CountriesStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 25rem);
  gap: 2rem
`;

export default Countries;