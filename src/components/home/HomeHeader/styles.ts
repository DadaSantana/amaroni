import styled from "styled-components";

export const Content = styled.header`
    display: flex;
    flex-direction: column;

`;

export const Login = styled.div`
    display: flex;
    background-color: var(--secondColor);
    color: var(--whiteFont);
    padding: 5px 0;

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .select-lang {
            display: flex;
            align-items: center;
            justify-content: center;

            span {
                margin-right: 20px;

                img {
                    max-height: 30px;
                }

                &:hover {
                    cursor: pointer;
                }
            }

        }

        span.btn-login {
            width: fit-content;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            svg {
                margin-right: 5px;
            }

            a {
                text-decoration: none;
                color: var(--whiteFont);
                margin: 0;
                display: flex;
                align-items: center;
            }
        }
    }
`;

export const Main = styled.div`
    background-color: var(--mainColor);

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;

        a.Logo {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: var(--whiteFont);

            img {
                margin-right: 20px;
                height: 60px;
            }
            span {
                display: flex;
                flex-direction: column;
                text-transform: uppercase;

                label {
                    font-size: 12px;
                }

                h3 {
                    font-size: 20px;
                    font-weight: bold;
                }
            }
        }
        .search {
            display: flex;
            align-items: center;
            color: var(--whiteFont);

            svg {
                margin-right: 20px;
                cursor: pointer;
            }

            .search-input {
                label, input, fieldset {
                    color: var(--whiteFont);
                    border-color: var(--whiteFont);
                }
            }

            @media (max-width: 760px) and (orientation: portrait) {
                display: none;
            }
        }

        @media (max-width: 760px) and (orientation: portrait) {
            padding: 10px 20px;
            box-sizing: border-box;
        }
    }
`;

export const Navbar = styled.nav`
    flex: 1;
    background-color: var(--mainColor);
    display: flex;
    justify-content: space-between;
    padding: 0 20px;

    ul {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            margin-right: 20px;
            color: var(--whiteFont);
            transition: all linear 200ms;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;

            a {
                text-decoration: none;
                color: var(--whiteFont);
            }

            #dropdown {
                margin: 0!important;

                button {
                    padding: 0;
                    background-color: transparent;
                    box-shadow: none;
                    font-size: 14px;
                    text-transform: capitalize;
                    font-weight: bold;
                }

                .dropdown-toggle:after {
                    margin-left: 10px;
                }

                .drop-menu {
                    border-radius: 0;
                    
                    a {
                        color: #4d4d4d;
                    }
                }
            }
        }
    }
    .social {
        display: flex; 
        align-items: center;
        color: var(--whiteFont);

        svg {
            margin-left: 16px;
            cursor: pointer;
            transition: all linear 200ms;
            color: var(--whiteFont);

            &:hover {
                
            }
        }

        .news-after {
            display: flex;

            .badge {
                padding: 5px;
                margin-top: -10px;
            }
        }
        
    }
    
    @media (max-width: 760px) and (orientation: portrait) {
        display: none;
    }

`; 

export const Aside = styled.nav`
    display: none;

    svg {
        color: var(--whiteFont);
    }

    .float-nav {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        background-color: var(--mainColor);
        z-index: 999;
        transition: all linear 100ms;
        transform: translateX(100vw);

        span {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            padding: 20px;

            svg {
                font-size: 30px;
                color: #f9f9f9;
                margin-right: 10px;
            }
            label {
                margin: 0;
                cursor: pointer;
                color: #f9f9f9
            }
        }

        ul {
            margin: 0;
            display: flex;
            flex-direction: column;
            padding: 0;

            li {
                padding: 10px 0;
                list-style: none;
                font-size: 30px;
                border-bottom: 2px solid transparent;
                font-size: 16px;
                background-color: transparent;
                padding: 20px;
                transition: all linear 200ms;

                svg {
                    margin-right: 10px;
                }

                a {
                    color: #f9f9f9;
                }

                &:hover {
                    background-color: #00f8ff54;
                    border-bottom: 2px solid #f9f9f9;
                }
            }
        }
    }
    
    @media (max-width: 760px) and (orientation: portrait) {
        display: flex;
        
    }

`;

export const Perfil = styled.div`
    display: flex;
    background-color: var(--secondColor);
    color: var(--whiteFont);
    padding: 10px 0;

    .container {
        display: flex;
        justify-content: space-between;

        .select-lang {
            display: flex;
            align-items: center;
            justify-content: center;

            span {
                margin-right: 20px;

                img {
                    max-height: 30px;
                }

                &:hover {
                    cursor: pointer;
                }
            }

        }

        span {
            width: fit-content;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-weight: bold;

            svg {
                margin-right: 10px;
            }
        }
    }
`;