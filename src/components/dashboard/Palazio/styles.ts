import styled from 'styled-components';

export const Content = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;

    .container {
        display: flex;
        flex-direction: column;

        @media (max-width: 760px) {
            padding: 10px;
        }
    }
`;