import styled from 'styled-components';

export const Content = styled.section`
    flex: 1;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    max-width: 100vw;
`;

export const ViewContent = styled.div`
    flex: 1;
    margin-top: 20px;
    background-color: #fafafa;
    border: 5px solid #ededed;
    border-radius: 5px;
    display: flex;
    padding: 20px;

    form {
        height: fit-content;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;        

        .title-input {
            width: 300px;
            margin: 0;
            margin-bottom: 10px;
        }

        .message-input {
            width: 100%;
            margin: 0;
            margin-bottom: 10px;
            min-height: 100px;
            max-height: 100px;
            resize: none;

            .MuiInputBase-root {
                flex: 1;

                textarea {
                    height: 100%;
                }
            }
        }
    }
`;