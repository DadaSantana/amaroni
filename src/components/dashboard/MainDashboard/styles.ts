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
                background-color: #fff;

                a {
                    text-decoration: none;
                    color: #4f4f4f;
                    transition: all linear 200ms;

                    svg {
                        margin-right: 5px;
                    }

                    .open-calls {
                        font-family: arial;
                        padding: 5px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        font-size: 12px;
                        color: red;
                    }

                    label {
                        margin: 0;
                        cursor: pointer;
                        margin-left: 5px;
                    }

                    &:hover {
                        color: #0080ff;
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

                @media (max-width: 760px) {
                    padding: 5px 20px;

                    a {
                        font-size: 12px;                        
                    
                        svg {
                            margin: 0;
                        }

                        label {
                            display: none;
                        }
                    }
                }
            }

            li.menu-item.pages {
                .toggle-pages {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 4px 4px var(--shadow);
                    padding: 5px 20px;
                    margin-top: 5px;
                    border-radius: 0 0 5px 5px;
                    background-color: #fff;
                    transition: all linear 100ms;
                    z-index: -1;
                    transform: translateY(-30px);
                    opacity: 0;
                }

                &:hover {
                    .toggle-pages {
                        transform: translateY(0px);
                        opacity: 1;
                        z-index: 0;
                    }
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