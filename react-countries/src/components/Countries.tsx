/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Country } from '../country.interface';
import CountryComponent from './Country';

type filters = {
  search: string;
  region: string;
};

const Countries = () => {
  const [filter, setFilters] = useState<filters>({
    search: '',
    region: 'americas',
  });
  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesToDisplay, setCountriesToDisplay] = useState<Country[]>([]);

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filter,
      [target.name]: target.value,
    });
  };

  const fetchCountries = async () => {
    const data = await axios.get(
      'https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;flag;region;capital;population'
    );
    // setCountries([...data?.data.slice(0, 5)])
    setCountries([...data?.data]);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    setCountriesToDisplay(countries);
  }, [countries]);

  useEffect(() => {
    const filterCountries = countries.filter((c) => {
      const searchCheck = c.name
        .toLowerCase()
        .includes(filter.search.toLowerCase());
      const regionChech = filter.region === '' || filter.region === c.region;
      return searchCheck && regionChech;
    });
    setCountriesToDisplay(filterCountries);
  }, [filter]);

  return (
    <CountriesStyles>
      <div className="filters">
        <input
          type="search"
          name="search"
          placeholder="Search for a country"
          value={filter.search}
          onChange={handleChange}
        />
        <select
          name="region"
          id="region"
          value={filter.region}
          onChange={handleChange}
        >
          <option value="" disabled>
            Filter by Region
          </option>
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Polar">Polar</option>
        </select>
      </div>
      <div className="countries--list">
        {countriesToDisplay.length > 0 &&
          countriesToDisplay.map((c) => (
            <CountryComponent key={c.alpha3Code} country={c} />
          ))}
      </div>
    </CountriesStyles>
  );
};

const CountriesStyles = styled.div`
  .filters {
    margin-bottom: 4rem;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
  }

  .countries--list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 27.5rem);
    justify-content: space-around;
    gap: 3rem;
    row-gap: 5rem;
  }
`;

export default Countries;
