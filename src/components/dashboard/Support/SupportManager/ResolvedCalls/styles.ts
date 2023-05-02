import styled from 'styled-components';

export const Content = styled.div`
    flex: 1; 
    width: 100%;
    display: flex;
    flex-direction: column;  
    align-items: flex-start;
    justify-content: flex-start;

    tr.Registered.Call {
        background-color: rgb(0 178 255 / 6%);
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