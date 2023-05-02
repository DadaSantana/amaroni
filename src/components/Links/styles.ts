import styled from 'styled-components';

export const Content = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 20px 0;
    background-color: #d9d9d9;
    border-radius: 5px;

    .content-box {
        padding: 10px;
        background-color: #f9f9f9;
        border-radius: 5px;
        border: 1px dashed #ccc;

        ul {
            margin: 0;
            padding: 0;
            list-style: none;

            li {
                display: flex;
                align-items: center;
                background-color: #ededed;

                svg {
                    margin-right: 10px;
                }

                a {
                    margin: 0;
                    font-weight: bold;
                    
                    &:hover {
                        text-decoration: underline;
                    }
                }

                &:nth-child(even) {
                    background-color: #f2f2f2;
                }
            }
        }
    }
`;