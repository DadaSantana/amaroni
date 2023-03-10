import styled from 'styled-components';

export const Content = styled.section`
    display: flex;
    flex-direction: column;
    flex: 1;

    .event-banner {
        height: 200px;
        display: flex;
        padding: 20px 20px;
        box-sizing: border-box;
        align-items: flex-end;
        background-position: center;
        background-size: cover;
        box-shadow: 0 0 10px var(--shadow);
    }

    .container {
        display: flex;
        padding: 20px 0;
        box-sizing: border-box;

        .left-side {
            flex: 1;
            display: flex;
            flex-direction: column;

            h1 {
                font-size: 34px;
                text-transform: uppercase;
                font-weight: bold;
                margin: 0;
                margin-bottom: 20px;
            }
    
            p {
                font-size: 20px;
                margin-bottom: 30px;
            }
    
            .content-details {
                display: flex;
                flex-direction: column;

                .date-hour-event {
                    display: flex;
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                    box-shadow: 0px 8px 10px -10px var(--shadow);

                    .d-h-datails {
                        display: flex;
                        flex-direction: column;

                        .event-title {
                            font-size: 14px;
                            margin: 0;
                            margin-bottom: -20px;
                        }
                        .event-date {
                            font-size: 60px;
                            font-weight: bold;
                            font-family: arial;
                        }
                        .event-hour {
                            display: flex;
                            align-items: center;
                            margin-top: -20px;

                            svg {
                                margin-right: 10px;
                            }
                            label {
                                margin: 0;
                                font-size: 20px;
                                font-family: arial;
                            }
                        }
                    }
                }

                .d-h-datails.finish {
                    border-left: 1px solid #ccc;
                    margin-left: 20px;
                    padding: 0 0 0 20px;
                }
    
                .additional-information {
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    width: fit-content;

                    div.info-item {
                        display: flex;
                        margin-bottom: 15px;
                        border: 1px solid #ccc;
                        border-radius: 5px;

                        .board-icon-type {
                            display: flex;
                            align-items: center;
                            padding: 10px;
                            background-color: #ededed;
                            border-radius: 5px 0 0 5px;

                            svg {
                                margin-right: 10px;
                            }

                            p {
                                margin: 0;
                                font-size: 16px;
                            }
                        }
            
                        label {
                            padding: 10px;
                            margin: 0;
                            font-size: 16px;
                            flex: 1;
                        }
                    }
                }
                
            } 
        }

        .right-side {
            display: flex;
            flex-direction: column;
            margin-left: 20px;

            .links-content {
                display: flex;
                flex-direction: column;
                width: 200px;
                border: 1px solid #ccc;
                border-radius: 5px;
                padding: 20px;
                margin-bottom: 20px;

                .links-title {
                    display: flex;
                    align-items: center;
                    border-bottom: 1px dashed #ccc;
                    padding-bottom: 10px;

                    svg {
                        margin-right: 10px;
                    }

                    h3 {
                        margin: 0;
                    }
                }

                .links-items {
                    display: flex;
                    flex-direction: column;

                    a {
                        flex: 1;
                        margin: 10px 0;
                        text-align: left;
                        width: 100%;
                    }

                    p {
                        margin-top: 20px;
                        text-align: center;
                    }
                }
            }
        }
        
    }

    a {
        margin: 20px;
        align-self: center;
    }
`;