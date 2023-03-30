import styled from 'styled-components';

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 400px;
    max-height: 400px;
    background-color: #f1f1f1;
    border-radius: 5px;
    box-shadow: 0 0 5px var(--shadow);

    #slide-news {
        height: inherit;
        width: inherit;
        border-radius: 5px;

        .news-item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px;
            cursor: pointer;

            h4 {
                text-align: center;
                color: var(--whiteFont);
                font-weight: bold;
                background-color: rgb(0 131 255 / 50%);
                padding: 5px;
                border-radius: 5px;
            }

            span {
                width: 100%;

                a {
                    font-size: 24px;
                    color: var(--whiteFont);
                    font-weight: bold;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
`;