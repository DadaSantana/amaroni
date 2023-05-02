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
<<<<<<< HEAD
    flex-direction: column;
=======
>>>>>>> c415e8aca664a869c148a9d52dfce3b6b3bf6b24
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
<<<<<<< HEAD
`;

export const ListNotifications = styled.section`
    display: flex;
    flex-direction: column;
    align-item: center;
    justify-content: center;
    width: 100%;
    max-height: fit-content;
    margin-top: 20px;
    

    .circular {
        align-self: center;
    }

    .not-item {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background-color: #fff;
        margin: 5px 3px;
        box-shadow: 0 0 3px var(--shadow);

        .data {
            flex: 1;
            display: flex;
            flex-direction: column;

            p {
                margin: 0;
                font-size: 14px;
            }

            .data-title {
                font-weight: bold;
            }

            .data-icons {
                display: flex;
                align-items: center;
                padding: 0px 10px;
                border: 1px solid #ededed;
                box-shadow: 0 0 2px var(--shadow);
                border-radius: 5px;
                width: fit-content;
                margin-top: 10px;

                svg {
                    margin-right: 5px;
                    font-size: 16px;
                }
            }
        }

        svg.resend {
            cursor: pointer;
            padding: 10px;
            width: 40px;
            height: 40px;
            background-color: #ededed;
            border-radius: 50%;
            transition: all linear 200ms;

            &:hover {
                background-color: #5594ff;
                color: #fff;
            }
        }
    }
=======
>>>>>>> c415e8aca664a869c148a9d52dfce3b6b3bf6b24
`;