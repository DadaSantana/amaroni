import styled from 'styled-components';

export const Content = styled.section`
    flex: 1;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
`;

export const TagAction = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
    max-height: 60px;

    .tag-group {
        display: flex;

        span.tag-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            max-width: 200px;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            margin-right: 20px;
            
            svg {
                margin-right: 10px;
            }
            
            label {
                margin: 0;
                cursor: pointer;
            }
    
            &:hover {
                cursor: pointer;
                color: #0080ff;
            }
        }
    }

    .alert {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        margin: 0;
    }
    
`;

export const ViewContent = styled.div`
    flex: 1;
    margin-top: 20px;
    background-color: #fafafa;
    border: 5px solid #ededed;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    padding: 20px;

    .label-action {
        align-self: center;
    }

`;

