import styled from 'styled-components';

export const Content = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 100%;

    form {
        flex: 1;
        display: flex;
        flex-direction: column;

        .input-top {
            flex: 1;
            display: flex;

            .upload-image-event {
                height: 250px;
                width: 100%;
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

                    svg {
                        font-size: 30px;
                        margin-right: 20px;
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
                    }
                }
            }
        }

        .input-bottom {
            flex: 1;
            display: flex;
            flex-direction: column;

            .input-group {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                flex: 1;
                height: fit-content;
                margin: 5px 0;


                .MuiFormControl-root {
                    margin: 0;
                    background-color: #fff;

                    @media (max-width: 480px) and (orientation: portrait) {
                        width: 100%;
                        margin: 10px 0;
                    }
                }

                .multiline {
                    width: 100%;    
                    background-color: #fff;               

                    .MuiInputBase-root {
                        height: 100px;
                    }
                }

                
                .title {
                    flex: 1;
                    margin-top: 10px;
                } 
                
                .address {
                    flex: 1;
                    margin-right: 20px;
                }

                .telephone {
                    margin: 0 20px;
                }

                .date-content {
                    display: flex;
                    align-items: center;
                    border: 1px solid #ccc;
                    height: fit-content;
                    margin-right: 20px;

                    label {
                        height: fit-content;
                        padding: 10px;
                        background-color: #ccc;
                        height: 30px;
                        margin: 0;
                    }

                    input {
                        height: 30px;
                        border: none;
                        outline: none;
                        padding: 10px;
                    }
                }

                .box-item {
                    display: flex;
                    flex-direction: column;
                    padding: 10px;
                    background-color: #fff;
                    border: 1px solid #ccc;
                    flex: 1;

                    .upper-add-file {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        flex: 1;

                        .add-link {
                            width: 100%;
                            margin-bottom: 5px;
                            flex: 1;
                        }

                        .icon-add-link {
                            flex: 1;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: 30px;
                            font-size: 24px;
                            box-sizing: border-box;
                            background-color: var(--mainColor);
                            cursor: pointer;

                            svg {                            
                                color: #fff;
                            }
                        }
                    }
                    .bottom-add-file {
                        display: flex;
                        flex-direction: column;
                        min-height: 200px;
                        padding: 10px 0;

                        .file-item {
                            display: flex;
                            margin: 5px 0;
                            padding: 5px 0;
                            width: 100%;
                            border-bottom: 1px dashed var(--shadow);

                            label {
                                flex: 1;
                                margin: 0;
                            }

                            svg {
                                cursor: pointer;
                                margin-left: 10px;
                            }
                        }
                    }
                }

                .box-item.left {
                    margin-right: 20px;
                    border-radius: 5px;
                }
            }

            .input-group.inline {
                display: flex;
                justify-content: flex-start;
            }

            .group-buttons {
                display: flex;
                justify-content: center;

                input {
                    padding: 10px;
                    background-color: green;
                    color: var(--whiteFont);
                    border-radius: 5px;
                    font-weight: bold;
                }
            }
        }
    }

    @media (max-width: 480px) and (orientation: portrait) {
        padding: 0 10px;

        .input-top {
            .upload-image-event {              
                span.design-click {
                    label {
                        display: none;
                    }
                }
            }
        }

        .input-bottom {
            .input-group {
                flex-direction: column;

                .MuiFormControl-root {
                    width: 100%;
                    margin: 10px 0;
                }

                .box-item {
                    margin: 10px 0;
                    max-width: 100%;
                }
            }

            .input-group.inline {
                flex-direction: column;

                .date-content {
                    display: flex;
                    flex: 1;
                    margin: 10px 0;

                    label {
                        height: fit-content;
                    }
                }
            }

        }        
    }
`;