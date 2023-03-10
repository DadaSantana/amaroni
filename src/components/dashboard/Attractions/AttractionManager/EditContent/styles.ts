import styled from 'styled-components';

export const Content = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;

    form {
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: column;

        .input-top {
            flex: 1;
            display: flex;  

            .input-area {
                display: flex;
                flex-direction: column;
            }
    
            .input-area.left {
                .upload-image-attraction {
                    height: 200px;
                    width: 200px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #ccc;
                    padding: 20px;
                    
                    span.design-click {
                        flex: 1;
                        height: 100%;
                        border: 1px solid gray;
                        border-style: dashed;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: transparent;
                        transition: all linear 200ms;
                        cursor: pointer;
    
                        svg {
                            font-size: 50px;
                            transition: all linear 200ms;
                        }
    
                        label {
                            margin: 0;
                            font-size: 20px;
                            transition: all linear 200ms;
    
                            &:hover {
                                font-weight: bold;
                                cursor: pointer;
                            }
                        }
    
                        &:hover {
                            background-color: rgb(145 145 145 / 50%);

                            svg {
                                color: var(--whiteFont);
                            }
                        }
                    }
                }
            }
    
            .input-area.right {
                flex: 1;
                margin-left: 20px;
    
                .input-content {
                    flex: 1;
                    display: flex;
                    margin-bottom: 20px;
    
                    .MuiFormControl-root {
                        margin: 0;
                        background-color: #fff;

                        .MuiInputBase-root {
                            height: 100%;
                        }
                    }
                }
            }
        }

        .input-bottom {
            flex: 1;
            display: flex;
            flex-direction: column;

            .gallery {
                flex: 1;
                max-width: 100%;
                border: 3px solid #ededed;
                padding: 5px;
                border-radius: 5px;

                .swiper {
                    margin: 20px 0;
                    max-width: 100%;

                    .circular-progress {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 150px;
                    }
        
                    .swiper-wrapper {
                        max-width: 100%;
        
                        .slide-item {
                            display: flex;
                            align-items: flex-end;
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
                                transition: all linear 200ms;
    
                                svg {
                                    color: var(--whiteFont);
                                }

                                &:hover {
                                    svg {
                                        color: #ffa5a5;
                                    }
                                }
                            }
                        }
                    }
                }
        
            }

            .group-buttons {
                display: flex;
                justify-content: center;
                flex: 1;
                width: 100%;

                button {
                    flex: 1;
                    padding: 10px;
                    background-color: green;
                    color: var(--whiteFont);
                    border-radius: 5px;
                    font-weight: bold;
                    margin-top: 10px;
                }
            }
        }
    }

    @media (max-width: 480px) and (orientation: portrait) {

        form {  
            .input-top {
                flex-direction: column;
    
                .input-area {
                    display: flex;
                    flex-direction: column;
                }
        
                .input-area.left {
                    width: 100%;

                    .upload-image-attraction {
                        width: inherit;
                    }
                }

                .input-area.right {  
                    margin: 0;

                    .input-content {
                        flex-direction: column;
                        margin: 0;
                        width: 100%;
                        
                        .MuiFormControl-root {
                            margin: 10px 0;
                            width: 100%;
                        }
                    }
                }
            }
    
            .input-bottom {
                flex: 1;
                display: flex;
                flex-direction: column;
    
                .gallery {
                    input {
                        font-size: 12px;
                    }
                }
            }
        }
    }
`;