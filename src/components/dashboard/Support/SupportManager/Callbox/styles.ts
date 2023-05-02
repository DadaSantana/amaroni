import styled from 'styled-components';

export const Content = styled.div`
    flex: 1; 
    width: 100%;
    display: flex;
    flex-direction: column;  
    align-items: flex-start;
    justify-content: flex-start;
    overflow: auto;

    tr {
        .status {
            display: block;
            padding: 1px;
            height: 12px;
            width: 12px;
            border: 1px solid var(--shadow);
            border-radius: 50%;
            box-shadow: 0 0 3px var(--shadow);
            
            .circle {
                display: block;
                height: 100%;
                width: 100%;
                border-radius: 50%;
            }
        }
    }

    tr {
        .status.Registered.Call {           
            .circle {
                background-color: green;
            }
        }
    }
    tr {
        .status.Analyzing {           
            .circle {
                background-color: #4c4cff;
            }
        }
    }
    tr {
        .status.Waiting.for.reply {           
            .circle {
                background-color: orange;
            }
        }
    }
`;

export const Btn = styled.span`
    display: flex;
    justify-content: flex-end;

    svg {
        padding: 5px;
        background-color: #ebebeb;
        border-radius: 5px;
        font-size: 24px;
    }

    svg.edit {
        margin-right: 5px;

        &:hover {
            cursor: pointer;            
            color: #0080ff;
        }
    }

    svg.remove {

        &:hover {
            cursor: pointer;            
            color: red;
        }
    }
`;