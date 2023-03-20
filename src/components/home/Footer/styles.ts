import styled from 'styled-components';

export const Content = styled.footer`
    width: 100vw;
    box-sizing: border-box;

    .footer-top {
        flex: 1;
        background-color: var(--mainColor);

        .container {
            display: flex;
            padding: 20px 0;


            .footer-top-logo{
                display: flex;
                text-decoration: none;
                color: var(--whiteFont);
                margin-right: 50px;
    
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

            .footer-top-content {
                display: flex;
                padding-left: 50px;
                border-left: 1px dashed var(--secondColor);

                .box-item {
                    margin-right: 50px;

                    h5 {
                        color: #adadad;
                        font-weight: bold;
                        margin-bottom: 20px;
                        font-size: 16px;
                    }

                    ul {
                        margin: 0;
                        padding: 0;
                        
                        li {
                            display: flex;
                            align-items: center;
                            list-style: none;
                            margin: 10px 0;
                            transition: all linear 200ms;
                            
                            svg {
                                color: #f9f9f9;
                                font-size: 12px;
                                margin-right: 10px;
                            }

                            a {
                                color: #f9f9f9;
                                font-size: 12px;
                            }

                            &:hover {
                                
                            }
                        }
                    }
                }
            }
        }
    }

    .footer-bottom {
        background-color: var(--secondColor);

        .container {
            padding: 20px;
            color: #f9f9f9;
            text-align: center;
        }
    }

    @media (max-width: 760px) {
        .footer-top {
            .container {
                flex-direction: column;

                .footer-top-logo {
                    justify-content: center;
                    margin-bottom: 10px;
                }

                .footer-top-content {
                    padding: 10px;
                    flex-wrap: wrap;
                    gap: 20px;

                    .box-item {
                        margin: 0;
                    }
                }
            }
        }
    }
`;
