import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => (
  <HeaderStyles>
    <div>
      <Link to="/">
        <button type="button" className="title-wrapper">
          Where in the world?
        </button>
      </Link>
      <span>
        <i className="far fa-moon" />
        <span>Dark Mode</span>
      </span>
    </div>
  </HeaderStyles>
);

const HeaderStyles = styled.header`
  background: var(--white);
  box-shadow: var(--bs);

  & > div {
    font-size: 1.2rem;
    max-width: var(--maxWidth);
    margin: 0 auto;
    padding: 1.5rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      padding: 0;
      background: none;
      border: none;
      font-size: 1.9rem;
      font-weight: 700;
    }

    & > span {
      cursor: pointer;
      display: flex;
      align-items: center;
      font-weight: 600;
    }

    i {
      margin-right: 5px;
    }
  }

  @media screen and (min-width: 40rem) {
    div {
      font-size: 1.6rem;

      button {
        font-size: 3rem;
      }
    }
  }
`;

export default Header;
