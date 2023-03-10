import styled from 'styled-components';

export const Content = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;

    form {
        flex: 1;
        display: flex;

        .input-top {
            display: flex;
            margin-right: 20px;

            .upload-image-event {
                height: 250px;
                width: 450px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #ccc;
                padding: 20px;
                
                span.design-click {
                    flex: 1;
                    height: 100%;
                    border: 1px solid gray;
                    border-style: dashed;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: transparent;
                    transition: all linear 200ms;

                    svg {
                        font-size: 30px;
                        margin-right: 20px;
                    }

                    label {
                        margin: 0;
                        font-size: 20px;
                        transition: all linear 200ms;

                        &:hover {
                            font-weight: bold;
                            cursor: pointer;
                        }
                    }

                    &:hover {
                        background-color: rgb(145 145 145 / 50%);
                    }
                }
            }
        }

        .input-bottom {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            width: 100%;

            .input-group {
                width: 100%;                
                display: flex;
                align-items: flex-start;
                height: fit-content;

                .title, .alt-input, .tag-input {
                    flex: 1;
                    margin: 0;
                    margin-bottom: 10px;
                    background-color: #fff;
                }
            }

            .group-buttons {
                display: flex;
                justify-content: center;

                input {
                    padding: 10px;
                    background-color: green;
                    color: var(--whiteFont);
                    border-radius: 5px;
                    font-weight: bold;
                    width: 100px;
                }
            }
        }
    }
`;