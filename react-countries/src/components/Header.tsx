/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Theme, useTheme } from '../theme-context';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <HeaderStyles theme={theme}>
      <div>
        <Link to="/">
          <button type="button" className="title-wrapper">
            Where in the world?
          </button>
        </Link>
        <span onClick={() => toggleTheme()}>
          <i className="far fa-moon" />
          <span>Dark Mode</span>
        </span>
      </div>
    </HeaderStyles>
  );
};

const HeaderStyles = styled.header`
  background: ${({ theme }: { theme: Theme }) => theme.elements};
  color: ${({ theme }: { theme: Theme }) => theme.text};
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
      color: ${({ theme }: { theme: Theme }) => theme.text};
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
