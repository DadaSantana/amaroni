import styled from 'styled-components';

export const Content = styled.section`
    display: flex;
    margin: 20px 0;    

    .comment-box {
        display: flex;
        flex-direction: column;
        max-height: 400px;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: auto;
        scrollbar-color: #ededed #ffffff;
        padding-right: 20px;
        max-width: 400px;

        &::-webkit-scrollbar {
            width: 10px;
        }

        &::-webkit-scrollbar-track {
            background: #ffffff;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #ededed;
            border-radius: 5px;
            border: 3px solid #ffffff;
        }

        .circular-progress {
            flex: 1;                    
            display: flex;
            justify-content: center;
            align-items: center;
            width: 400px;
        }

        .comment-item {
            display: flex;
            flex-direction: column;
            padding: 20px 0;
            border-bottom: 1px solid #ccc;
            width: 100%;
            box-sizing: border-box;

            .perfil {
                display: flex;

                span.user-photo {
                    height: 60px;
                    width: 60px;
                    background-color: gray;
                    display: block;
                    margin-right: 20px;
                    border-radius: 5px;
                }

                .name-and-rating {
                    display: flex;
                    flex-direction: column;
                }
            }

            .user-comment {
                margin: 10px 0;
                text-align: justify;
            }
        }
    }

    .rating-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 20px;
    
        .perfil {
            display: flex;
            margin-bottom: 10px;

            span.user-photo {
                height: 60px;
                width: 60px;
                background-color: gray;
                display: block;
                margin-right: 20px;
                border-radius: 5px;
            }

            .name-and-rating {
                display: flex;
                flex-direction: column;
            }
        }

        textarea {
            flex: 1;
            padding: 10px;
            max-height: 150px;
            resize: none;
            margin-bottom: 10px;
            outline: none;
        }
    }

    @media (max-width: 760px) {
        flex-direction: column;   
        
        .comment-box {
            max-width: 100%;
            margin-bottom: 20px;
        }

        .rating-box {
            margin: 0;
        }
    }
`;