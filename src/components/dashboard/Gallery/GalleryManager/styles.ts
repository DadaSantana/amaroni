import styled from 'styled-components';

export const Content =  styled.section`
    flex: 1; 
    display: flex;
    flex-direction: column;  
    align-items: flex-start;
    justify-content: flex-start;

    .search-content {
        width: 100%;
        max-height: 60px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
  

        .input-search {
            flex: 3;
            background-color: #fff;
            margin: 0 20px 0 0;
        }

        .select-input {
            flex: 1;
            background-color: #fff;
            margin: 0 20px 0 0;
        }

        .submit-search {
            height: 50px;
        }
    }

    .label-search {
        margin: 20px 0;
    }

    .table-content {
        flex: 1;

        .css-41abqd-MuiTableContainer-root {
            width: 100%;
            overflow-x: unset;
            max-height: 440px;
        }
    }

    .pagination {
        margin-top: 20px;
        align-self: center;
    }
`;

export const EditGrid = styled.section`
    display: grid;
    grid-template-columns: repeat(5, 200px);
    grid-gap: 20px;
    max-height: 100%;
    overflow: auto;

    .item-gallery {
        width: 200px;
        height: 150px;
        border-radius: 5px;

        .delete-item {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all linear 200ms;
            border-radius: 5px;
            background-color: rgb(0,0,0,0);
            opacity: 0;

            svg {
                font-size: 30px;
                color: var(--whiteFont);
            }

            &:hover {
                background-color: rgb(0,0,0,0.8);
                opacity: 1;
                cursor: pointer;
            }
            
        }
    }

    @media (max-width: 760px) {
        grid-template-columns: repeat(2, 180px);

        .item-gallery {
            width: 180px;
            height: 150px;
        }

    }
`;

