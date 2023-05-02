import styled from 'styled-components';

export const Content =  styled.section`
    flex: 1; 
    display: flex;
    flex-direction: column;  
    align-items: flex-start;
    justify-content: flex-start;
    overflow: auto;

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


