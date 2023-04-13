import styled from 'styled-components'

export const Content = styled.section`
    margin-top: 20px;

    .container {
        padding: 0;

        h1 {
            font-size: 42px;
            margin-bottom: 60px;
            font-weight: bold;
        }

        p {
            font-size: 24px;
            margin-bottom: 30px;
        }

        .waiting {
            margin-top: 50px;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            p {
                margin-top: 20px;
            }
        }
    }

`;