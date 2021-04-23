import styled from "styled-components";

const Header = () => (
    <HeaderStyles>
        <div>
            <h1>
                Where in the world?
            </h1>
            <span>
                <i className="far fa-moon"></i>
                <span>Dark Mode</span>
            </span>
        </div>
    </HeaderStyles>
);

const HeaderStyles = styled.header`
    background: var(--white);
    box-shadow: 0 0 20px -2px hsl(0deg 0% 71%);

    div {
        font-size: 1.1rem;
        max-width: var(--maxWidth);
        margin: 0 auto;
        padding: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            display: inline-block;
        }

        & > span {
            cursor: pointer;
            display: flex;
            align-items: center;
        }

        i {
            margin-right: 5px;
        }
    }
`;

export default Header;