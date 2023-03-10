import styled from 'styled-components';

export const Content = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;

    form {
        flex: 1;
        display: flex;
        flex-direction: column;

        .subject-input {
            width: 100%;
            margin: 0;
            margin-bottom: 15px;
        }

        .textarea-request {
            outline: none;
            padding: 5px;
            box-sizing: border-box;
            flex: 1;
            margin-bottom: 15px;
        }

    }
`;