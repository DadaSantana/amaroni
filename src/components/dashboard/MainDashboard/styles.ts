import styled from 'styled-components';

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: fit-content;
`;

export const Navbar = styled.aside`
    display: flex;
    width: 100vw;
    box-shadow: 0 0 5px var(--shadow);

    .group-menu {
        display: flex;
        justify-content: center;

        ul {
            display: flex;
            justify-content: center;
            list-style: none;
            padding: 0;
            margin: 0;

            li.menu-item {
                padding: 5px 20px;
                font-size: 20px;
                font-weight: bold;
                transition: all linear 200ms;
                cursor: pointer;

                a {
                    text-decoration: none;
                    color: #4f4f4f;
                    transition: all linear 200ms;

                    svg {
                        margin-right: 20px;
                    }

                    &:hover {
                        color: #0080ff;
                    }

                    @media (max-width: 428px) and (orientation: portrait) {
                        font-size: 12px;

                        svg {
                            display: none;
                        }
                    }
                }



                &:hover {
                    color: #0080ff;
                }

                &.active {
                    a {
                        color: #0080ff;
                    }
                    background-color: #f5f5f5;
                }
            }
        }
    }
`;

export const Main = styled.main`
    display: flex;
    flex: 1;

    .container {
        display: flex;
        box-sizing: border-box;
        padding: 0;
    }
`;