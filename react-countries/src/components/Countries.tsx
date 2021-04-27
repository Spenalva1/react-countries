/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { Country } from '../country.interface';
import CountryComponent from './Country';

type filters = {
  search: string;
  region: string;
};

const options = [
  { value: '', label: 'All Regions' },
  { value: 'Africa', label: 'Africa' },
  { value: 'Americas', label: 'Americas' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Oceania', label: 'Oceania' },
  { value: 'Polar', label: 'Polar' },
];

const Countries = () => {
  const [filter, setFilters] = useState<filters>({
    search: '',
    region: '',
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
        <div className="input-wrapper">
          <i className="fas fa-search" />
          <input
            type="search"
            name="search"
            placeholder="Search for a country..."
            value={filter.search}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <Select
          onChange={(e) => {
            setFilters({
              ...filter,
              region: `${e?.value}`,
            });
          }}
          options={options}
        />
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
    position: relative;
    margin-bottom: 4rem;
    display: grid;
    grid-template-columns: 1fr;
    justify-content: space-between;

    .input-wrapper {
      box-shadow: 0 0 20px -2px hsl(0deg 0% 71%);
      border-radius: 5px;
      background: var(--white);
      position: relative;
      padding: 1rem 1rem 1rem 4rem;
      margin-bottom: 4rem;

      i {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--darkGray);
      }

      input {
        width: 100%;
        border: none;
        color: var(--darkGray);

        &:focus {
          outline: none;
        }
      }
    }

    @media screen and (min-width: 40rem) {
      grid-template-columns: 5fr 2fr;

      .input-wrapper {
        margin-bottom: 0;
        justify-self: start;
        width: 60%;
      }

      select {
        align-self: stretch;
      }
    }
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
