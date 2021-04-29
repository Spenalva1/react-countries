/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, RouteChildrenProps } from 'react-router-dom';
import styled from 'styled-components';
import { Country } from '../country.interface';
import { Theme, useTheme } from '../theme-context';

type BorderType = { name: string; code: string };

const CountryDetail = ({ match }: RouteChildrenProps<{ code: string }>) => {
  const { theme } = useTheme();
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
          <BackButton theme={theme} type="button" className="back-button">
            <i className="fas fa-arrow-left" />
            Back
          </BackButton>
        </Link>
      </div>
      {!country && loading && <p>loading</p>}
      {country && (
        <CountryDetailStyles theme={theme}>
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
                  {Number(country.population).toLocaleString()}
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
                <div>
                  <span>
                    <strong>Border Countries:</strong>
                  </span>
                </div>
                {borders.map((border) => (
                  <BorderButtonStyles theme={theme} key={border.code}>
                    <Link to={`/country/${border.code}`}>
                      <span>{border.name}</span>
                    </Link>
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

const BackButton = styled.button`
  background: ${({ theme }: { theme: Theme }) => theme.elements};
  color: ${({ theme }: { theme: Theme }) => theme.text};
  transition: background var(--themeTransition), color var(--themeTransition);
  border: none;
  padding: 1rem 2rem;
  box-shadow: var(--bs);
  font-weight: 600;

  i {
    margin-right: 0.75rem;
  }
`;

const CountryDetailStyles = styled.div`
  font-size: 1.6rem;
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  color: ${({ theme }: { theme: Theme }) => theme.text};
  transition: color var(--themeTransition);

  img {
    width: 100%;
    margin: 5rem 0 2rem 0;
  }

  h2 {
    font-weight: 800;
  }

  .columns {
    display: grid;
    grid-template-columns: 1fr;

    .column {
      margin-bottom: 2.5rem;

      span {
        display: block;

        strong {
          font-weight: 800;
        }
      }
    }
  }

  .borders {
    div:first-child {
      width: 100%;
      margin: 0;
    }
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  @media screen and (min-width: 55rem) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;

    .flag-wrapper {
      padding-right: 2rem;
    }

    .columns {
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .borders {
      div:first-child {
        width: auto;
        margin-right: 1rem;
      }
    }
  }
`;

const BorderButtonStyles = styled.button`
  background: ${({ theme }: { theme: Theme }) => theme.elements};
  transition: background var(--themeTransition);
  border: none;
  padding: 1rem 2rem;
  box-shadow: var(--bs);
  font-weight: 600;

  a {
    text-decoration: none;
    color: ${({ theme }: { theme: Theme }) => theme.text};
    transition: color var(--themeTransition);
  }
`;

export default CountryDetail;
