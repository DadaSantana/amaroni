import styled from "styled-components";

export const Content = styled.header`
    display: flex;
    flex-direction: column;
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
        
        .btn-perfil {
            display: flex;
            color: var(--whiteFont);
            cursor: pointer;
            background-color: transparent;
            box-shadow: none;
            align-items: center;
            padding-left: 60px;    

            svg, span {
                margin-right: 10px;
            }
        }

        .btn-primary:not(:disabled):not(.disabled).active:focus, .btn-primary:not(:disabled):not(.disabled):active:focus, .show>.btn-primary.dropdown-toggle:focus {
            box-shadow: none;
        }

        .btn-primary:not(:disabled):not(.disabled).active, .btn-primary:not(:disabled):not(.disabled):active, .show>.btn-primary.dropdown-toggle {
            color: #fff;
            background-color: transparent;
            border-color: transparent;
        }

        .dropdown-menu {
            width: fit-content;

            border-radius: 5px;
            padding: 5px;

            .dropdown-item { 
                display: flex;
                align-items: center;
                cursor: pointer;

                svg {
                    margin-right: 10px;
                }

                label {
                    margin: 0;
                    cursor: pointer;
                }                
            }

            .language-item {
                display: flex;
                justify-content: center;

                .select-lang {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
        
                    span {
                        margin: 0 5px;

                        img {
                            max-height: 30px;
                        }
        
                        &:hover {
                            cursor: pointer;
                        }
                    }            
                }
            }
        }
    }

    @media (max-width: 760px) {
        padding: 0 10px;

        .container {
            .btn-perfil {
                padding: 0;
            }
        }
    }
`;