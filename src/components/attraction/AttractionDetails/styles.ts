import styled from 'styled-components';

export const Content = styled.section`
    display: flex;
    flex: 1;

    .flex-justify-between {
        display: flex;
        width: 100%;
    }

    .container {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 50px 0;

        
        section.main-presentation {
            display: flex;
            justify-content: space-between;
            max-height: 70vh;
            width: 100%;
            flex: 1;

            .main-details {
                display: flex;
                flex-direction: column;
                margin-right: 20px;

                .flex-between {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    margin-bottom: 20px;
    
                    span.type-att {
                        padding: 3px 10px;
                        border-radius: 5px;
                        background-color: rgb(187 187 187 / 15%);
                        font-weight: bold;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
    
                span.icon-data {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    margin-bottom: 10px;
                    border-bottom: 1px solid rgb(187 187 187 / 15%);
                    padding-bottom: 10px;
        
                    a {
                        text-decoration: none;
                        color: #4d4d4d;
        
                        svg {
                            color: #4d4d4d;
            
                            &:hover {
                                color: #1976d2;
                                cursor: pointer;
                            }
                        }
                    }
        
                    label {
                        padding: 0 10px;
                        border-radius: 0 5px 5px 0;
                        margin: 0;
                    }
                }
    
                .description-box {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    border-bottom: 1px solid rgb(187 187 187 / 15%);
                    overflow: auto;
                    scrollbar-width: auto;
                    scrollbar-color: #ededed #ffffff;

                    &::-webkit-scrollbar {
                        width: 10px;
                    }

                    &::-webkit-scrollbar-track {
                        background: #ffffff;
                    }

                    &::-webkit-scrollbar-thumb {
                        background-color: #ededed;
                        border-radius: 5px;
                        border: 3px solid #ffffff;
                    }

                    .d-b-header {
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;

                        svg {
                            margin-right: 10px;
                        }

                        label {
                            margin: 0;
                        }
                    }
                    
                    p {
                        height: 100%;
                        margin: 0;
                        padding: 5px;
                        
                    }
                }
            }
            
            img {
                margin-left: 20px;
                min-width: 50%;
                max-width: 50%;
                background-color: #ededed;
                border-radius: 5px;
                object-fit: cover;
                object-position: center;
            }
 
        }

        section.gallery-attraction {
            display: flex;
            flex-direction: column;
            margin-top: 20px;
            width: 100%;

            h2 {
                margin: 0;
            }

            .swiper {
                margin: 0;
                width: 100%;
                padding: 20px 0;
    
                .swiper-wrapper {
                    max-width: 100%;
    
                    .slide-item {
                        display: flex;
                        border-radius: 5px;
                        min-height: 150px;
                        min-width: 150px;
                        max-height: 150px;
                        max-width: 150px;
                        box-shadow: 0 0 5px var(--shadow);
                        margin: 5px;

                        .hover-indicator {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background-color: rgb(0 0 0 / 35%);
                            border-radius: 5px;
                            cursor: pointer;
                            opacity: 0;
                            transition: all linear 200ms;

                            svg {
                                color: var(--whiteFont);
                            }

                            &:hover {
                                opacity: 1;
                            }
                        }
                    }
                }
            }
        }
    }

    a {
        align-self: center;
        margin: 20px;
    }
`;

export const FloatPhoto = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(0 0 0 / 35%);
    z-index: 999;
    padding: 50px;
   
    img {
        border-radius: 5px;
        max-width: 100%;
        max-height: 100%;
    }

    span {
        padding: 5px 30px;
        color: var(--whiteFont);
        background-color: rgb(0 0 0 / 80%);
        margin-top: 10px;
        border-radius: 5px;
        cursor: pointer;
        user-select: none;

        svg {
            margin-right: 10px;
        }
    }
`;