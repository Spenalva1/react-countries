import { FunctionComponent } from "react";
import styled from "styled-components";
import { Country as CountryInterface } from "../country.interface";

type CountryProps = {
  country: CountryInterface
}

const CountryStyles = styled.div`
  display: flex;
  flex-direction:column;
  max-width: 25rem;
  background: var(--white);
  border-radius: 7px;
  overflow: hidden;
  img {
    width: 100%;
    height: 16.5rem;    
  }
  .details {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
  }
`

const Country: FunctionComponent<CountryProps> = ({country}) => {
  return (
    <CountryStyles>
      <img src={country.flag} alt={country.name}/>
      <div className="details">
        <h3>{country.name}</h3>
        <span><strong>Population: </strong>{country.population}</span>
        <span><strong>Region: </strong>{country.region}</span>
        <span><strong>Capital: </strong>{country.capital}</span>
      </div>
    </CountryStyles>
  )
}

export default Country;