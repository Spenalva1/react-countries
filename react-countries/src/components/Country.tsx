import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Country as CountryInterface } from '../country.interface';
import { Theme, useTheme } from '../theme-context';

type CountryProps = {
  country: CountryInterface;
};

const CountryStyles = styled.div`
  box-shadow: var(--bs);
  display: flex;
  flex-direction: column;
  max-width: 27.5rem;
  background: ${({ theme }: { theme: Theme }) => theme.elements};
  transition: background var(--themeTransition);
  border-radius: 7px;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 16.5rem;
    object-fit: cover;
  }
  .details {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    padding-bottom: 3rem;
    color: ${({ theme }: { theme: Theme }) => theme.text};
    transition: color var(--themeTransition);

    h3 {
      font-weight: 900;
      margin-bottom: 1rem;
    }

    span {
      line-height: 2.1rem;
    }

    strong {
      font-weight: 600;
    }
  }
`;

const Country: FunctionComponent<CountryProps> = ({ country }) => {
  const history = useHistory();
  const { theme } = useTheme();
  const handleClick = () => {
    history.push(`/country/${country.alpha3Code}`);
  };
  return (
    <CountryStyles theme={theme} onClick={handleClick}>
      <img src={country.flag} alt={country.name} />
      <div className="details">
        <h3>{country.name}</h3>
        <span>
          <strong>Population: </strong>
          {Number(country.population).toLocaleString()}
        </span>
        <span>
          <strong>Region: </strong>
          {country.region}
        </span>
        <span>
          <strong>Capital: </strong>
          {country.capital}
        </span>
      </div>
    </CountryStyles>
  );
};

export default Country;
