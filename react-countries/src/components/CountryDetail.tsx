/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, RouteChildrenProps } from 'react-router-dom';
import styled from 'styled-components';
import { Country } from '../country.interface';

type BorderType = { name: string; code: string };

const CountryDetail = ({ match }: RouteChildrenProps<{ code: string }>) => {
  const [country, setCountry] = useState<Country>();
  const [borders, setBorders] = useState<BorderType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getBorderNames = async () => {
    const loadedBorders: BorderType[] = [];
    country?.borders.forEach(async (code, i) => {
      const resp = await axios.get(
        `https://restcountries.eu/rest/v2/alpha/${code}?fields=name;alpha3Code`
      );
      loadedBorders.push({ name: resp.data.name, code: resp.data.alpha3Code });
      if (i >= country.borders.length - 1) {
        setBorders(loadedBorders);
      }
    });
  };

  const getCountry = async (code: string | undefined) => {
    if (!code) {
      return null;
    }
    setLoading(true);
    const resp = await axios.get(
      `https://restcountries.eu/rest/v2/alpha/${code}?fields=name;flag;region;capital;population;nativeName;subregion;topLevelDomain;currencies;languages;borders`
    );

    if (resp.status !== 200) {
      setLoading(false);
      return;
    }
    setCountry(resp.data);
    setLoading(false);
  };

  useEffect(() => {
    getCountry(match?.params.code);
  }, [match]);

  useEffect(() => {
    getBorderNames();
  }, [country]);

  return (
    <div>
      <div className="back-button-wapper">
        <Link to="/">
          <button type="button">
            <i className="fas fa-arrow-left" />
            Back
          </button>
        </Link>
      </div>
      {!country && loading && <p>loading</p>}
      {country && (
        <CountryDetailStyles>
          <div className="flag-wrapper">
            <img src={country.flag} alt={country.name} />
          </div>
          <div className="details">
            <h2>{country.name}</h2>
            <div className="columns">
              <div className="column">
                <span>
                  <strong>Native Name: </strong>
                  {country.nativeName}
                </span>
                <span>
                  <strong>Population: </strong>
                  {country.population}
                </span>
                <span>
                  <strong>Region: </strong>
                  {country.region}
                </span>
                <span>
                  <strong>Sub Region: </strong>
                  {country.subregion}
                </span>
                <span>
                  <strong>Capital: </strong>
                  {country.capital}
                </span>
              </div>
              <div className="column">
                <span>
                  <strong>Top Level Domain: </strong>
                  {country.topLevelDomain}
                </span>
                <span>
                  <strong>Currencies: </strong>
                  {country.currencies.map((curr) => curr.name).join(', ')}
                </span>
                <span>
                  <strong>Languages: </strong>
                  {country.languages.map((lang) => lang.name).join(', ')}
                </span>
              </div>
            </div>
            {(borders.length && (
              <div className="borders">
                <span>
                  <strong>Border Countries:</strong>
                </span>
                {borders.map((border) => (
                  <BorderButtonStyles key={border.code}>
                    <Link to={`/country/${border.code}`}>{border.name}</Link>
                  </BorderButtonStyles>
                ))}
              </div>
            )) || <p>no borders</p>}
          </div>
        </CountryDetailStyles>
      )}
    </div>
  );
};

const CountryDetailStyles = styled.div`
  width: 100%;

  img {
    width: 50px;
  }
`;

const BorderButtonStyles = styled.div`
  background: red;
`;

export default CountryDetail;
