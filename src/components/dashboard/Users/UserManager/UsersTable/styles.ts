import styled from 'styled-components';

export const Content =  styled.section`
    flex: 1; 
    width: 100%;
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
        overflow: auto;
  

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

export const SelectInput = styled.span`

`;

export const Btn = styled.span`
    display: flex;
    justify-content: flex-end;

    svg {
        padding: 5px;
        background-color: #ebebeb;
        border-radius: 5px;
        font-size: 24px;

        @media (max-width: 480px) and (orientation: portrait) {
            font-size: 24px;
        }

        &:hover {
            cursor: pointer;
        }
    }

    svg.edit {
        margin-right: 5px;
        margin-left: 5px;

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

    svg.block {
        margin-right: 5px;
        
        &:hover {
            cursor: pointer;            
            color: red;
        }
    }

    svg.save {
        &:hover {
            cursor: pointer;            
            color: var(--success);
        }
    }

    svg.disable {
        color: gray;
    }
`;

export const Float = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    
    justify-content: center;
    align-items: center;
    background-color: rgb(0,0,0,80%);
    z-index: 999;

    .user-content {
        display: flex;
        flex-direction: column;
        padding: 20px;
        box-shadow: 0 0 5px var(--shadow);
        background-color: #ebebeb;
        width: 600px;
        height: 300px;
        border-radius: 5px;

        .progress {
            align-self: center;
        }

        .user-data {
            display: flex;
            img {
                width: 200px;
                height: 200px;
                object-fit: cover;
                object-position: center;
                border-radius: 5px;
            }
            .user-details {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                flex: 1;
                padding: 0 10px;

                h4, p {
                    padding: 5px;
                    border-radius: 5px;
                    background-color: #e1e1e1;
                    width: 100%;
                    text-align: left;
                }
            }
        }

        span {
            width: 100%;
            text-align: center;
            margin-top: 20px;

            &:hover {
                text-decoration: underline;
                font-weight: bold;
                cursor: pointer;
            }
        }

        
    }
`;