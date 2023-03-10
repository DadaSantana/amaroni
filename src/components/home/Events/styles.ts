import styled from 'styled-components';

export const Content = styled.section`
    display: flex;
    padding: 30px 0;

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 500px;

        .title-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 20px;

            h1 {
                font-size: 50px;
                color: #323232;
                text-shadow: 3px 3px 5px #646464;
            }
            div.title-bar {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;

                span.circle {
                    height: 10px;
                    width: 10px;
                    border-radius: 50%;
                    background-color: #009aff;
                    margin: 0 10px;
                }
            }
        }

        p.description {
            margin-top: 20px;
            font-size: 12px;
        }

        .slide-swiper {
            height: 300px;
            max-width: 100%;
            box-shadow: 0 0 5px var(--shadow);
            border-radius: 5px;

            .swiper-wrapper {
                height: inherit;

                .slide-item {
                    display: flex;
                    padding: 20px 20px;
                    box-sizing: border-box;
                    align-items: flex-end;
        
                    .event-details {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 5px 10px;
                        background-color: rgb(43 43 43 / 30%);
                        border-radius: 5px;
                        flex: 1;
        
                        a {
                            font-size: 24px;
                            text-transform: uppercase;
                            font-weight: bold;
                            color: var(--whiteFont);
                            text-shadow: 0 0 50px black;
        
                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }
        
                }
            }

            
        }
        
    }
        
`;
