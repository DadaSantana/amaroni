import styled from 'styled-components';

export const Content = styled.div`
    flex: 1;    
    display: flex;
    flex-direction: column;
    width: 100%;

    .header-callview {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .call-details.date {
            margin-right: 10px;
        }
        .call-details.subject {
            flex: 1;
            margin-right: 10px;
        }
        .call-details.user {
            margin-right: 10px;
        }
    }

    .call-description {
        margin: 20px 0;
        width: 100%;
        height: fit-content;
        max-height: 600px;
        padding: 14px;
        box-sizing: border-box;
        border: 1px solid #c0c0c0;
        border-radius: 7px;
        resize: none;
        outline: none;
    }

    .attach-file {
        display: flex;

        svg {
            margin-right: 10px;
        }
    }
`;