import styled from 'styled-components';

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid #ccc;
    margin: 0;
    border-radius: 5px;
    min-height: 300px;
    max-height: 300px;
    overflow: auto;
    flex: 1;
    padding: 10px;

    .upper-add-link {
        width: 100%;
        display: flex;
        flex-direction: column;

        .add-link {
            width: 100%;
            margin-bottom: 5px;
            flex: 1;
        }

        .icon-add-link {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 30px;
            font-size: 24px;
            box-sizing: border-box;
            background-color: var(--mainColor);
            cursor: pointer;

            label {
                margin: 0;
                font-size: 14px;
                color: var(--whiteFont);
                margin-right: 10px;
                cursor: pointer;
            }

            svg {                            
                color: #fff;
            }
        }

    }

    .bottom-add-link {
        display: flex;
        flex-direction: column;
        max-height: 200px;
        overflow: auto;

        .link-item {
            display: flex;
            margin: 5px 0;
            padding: 5px 0;
            width: 100%;
            border-bottom: 1px dashed var(--shadow);
            
            a {
                flex: 1;
            }
            
            svg {
                cursor: pointer;
                margin-left: 10px;
            }
        }
    }

    @media (max-width: 428px) and (orientation: portrait) {
        width: 100%;
    }
`;
