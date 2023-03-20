import styled from 'styled-components';

export const Content = styled.section`
    flex: 1;
    
    .container {
        display: flex;
        flex-direction: column;
        padding: 20px 0;

        .top-between {
            display: flex;
            align-items: center;
            flex: 1;
            justify-content: space-between;

            a {
                display: flex;
                align-items: center;

                svg {
                    margin-right: 10px;
                }
            }
        }

        .user-perfil {
            flex: 1;
            display: flex;
            margin: 20px 0;

            .user-photo {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-right: 20px;

                .image-preview {
                    display: flex;
                    width: 250px;
                    height: 250px;
                    border: 1px solid #ccc;
                    border-radius: 10px;

                    span.hover-image {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        opacity: 0;
                        transition: all linear 200ms;
                        border-radius: 10px;
                        cursor: pointer;

                        svg {
                            margin-right: 10px;
                        }
                        label {
                            margin: 0;
                            cursor: pointer;
                        }

                        &:hover {
                            background-color: rgb(145 145 145 / 50%);
                            opacity: 1;
                        }
                    }
                }

            }

            .user-details {
                display: flex;
                flex-direction: column;
                flex: 1;
                box-shadow: 0 0 5px var(--shadow);
                border-radius: 10px;
                padding: 20px;


                div.user-name {
                    margin-bottom: 20px;
                    width: 100%;

                    .MuiFormControl-root.css-r47a1p-MuiFormControl-root {
                        margin: 0;
                        width: 100%;
                    }
                    #standard-adornment-password {
                         font-size: 32px;
                    }
                }

                div.user-phone {
                    margin-bottom: 20px;
                    width: 100%;

                    .MuiFormControl-root.css-r47a1p-MuiFormControl-root {
                        margin: 0;
                        width: 100%;
                    }
                }

                .MuiFormControl-root {
                    margin-bottom: 20px;
                }

                .redefine-password {
                    display: flex;
                    margin-bottom: 20px;

                    .MuiFormControl-root {
                        margin: 0;
                        margin-right: 20px;
                    }
                }

                .disable {
                    background-color: #ededed;
                    color: #4d4d4d;
                }
            }
        }

        @media (max-width: 760px) {
            padding: 0 10px;

            .user-perfil {
                flex-direction: column;
            }
        }

    }
`;