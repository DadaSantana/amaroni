import styled from 'styled-components';

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 400px;
    max-height: 400px;
    background-color: #f1f1f1;
    border-radius: 5px;
    box-shadow: 0 0 5px var(--shadow);

    #slide-news {
        height: inherit;
        width: inherit;
        border-radius: 5px;
    }
`;