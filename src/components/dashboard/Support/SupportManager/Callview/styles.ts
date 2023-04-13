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

        @media (max-width: 760px) {
            flex-direction: column;

            .call-details.date {
                margin-right: 0px;
            }
            .call-details.subject {
                flex: 1;
                margin-right: 0px;
            }
            .call-details.user {
                margin-right: 0px;
            }

            .call-details {
                margin-bottom: 10px;
            }
        }
    }

    .attach-file {
        display: flex;
        margin-bottom: 20px;

        svg {
            margin-right: 10px;
        }
    }

    .dialog-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 400px;
        max-height: 600px;
        overflow: auto;
        padding: 10px;
        box-shadow: 0 0 3px var(--shadow);
        border-radius: 5px;

        .response {
            width: fit-content;
            max-width: 75%;
            padding: 14px;
            box-sizing: border-box;
            border: 1px solid #c0c0c0;
            border-radius: 0 10px 10px 10px;
            resize: none;
            outline: none;
            margin-bottom: 10px;
            text-align: justify;    
            background-color: #f9f9f9;
        }
        .response.admin {
            width: fit-content
            min-width: 75%;
            align-self: flex-end;
            text-align: justify;
            background-color: #f3f3f3;
            border-radius: 10px 0 10px 10px;
        }
    }

    

`;