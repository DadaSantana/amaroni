import styled from 'styled-components';

export const ChatContent = styled.section`
    display: flex;
    width: 100%;
    margin-top: 10px;

    form.MuiBox-root {
        flex: 1;
        display: flex;
        box-shadow: 0 0 3px var(--shadow);
        border-radius: 5px;

        .MuiFormControl-root {
            margin: 0;
            flex: 1;
            border-radius: 5px;
        }
    }

    button.MuiButtonBase-root {
        height: 50px;
        width: 50px;
        margin-left: 10px;
    }
`;