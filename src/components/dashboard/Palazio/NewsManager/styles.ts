import styled from 'styled-components';

export const Content = styled.div`
    height: fit-content;
    display: flex;
    flex-direction: column;
    width: 100%;

    .news-section {
        display: flex;
        width: 100%;

        .upload-content {
            display: flex;
            flex-direction: column;
            padding-right: 20px;
            border-right: 1px solid var(--shadow);

            .upload-image-attraction {
                height: 400px;
                width: 400px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #ccc;
                padding: 20px;
                margin-bottom: 10px;
                
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
                    cursor: pointer;
        
                    svg {
                        font-size: 50px;
                        transition: all linear 200ms;
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
        
                        svg {
                            color: var(--whiteFont);
                        }
                    }
                }
            }

            button.disable {
                background-color: #ededed;
                color: #4d4d4d;
            }
        }

        .remove-news-content {
            flex: 1;
            display: flex;
            justify-content: center;
            padding-left: 20px;

            .progress {
                align-self: center;
            }

            .photo-grid {
                flex: 1;
                display: grid;
                grid-template-columns: repeat(3, 200px);
                grid-gap: 20px;
                max-height: 100%;
                overflow: auto;
    
                .item-gallery {
                    width: 200px;
                    height: 200px;
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
            }            
        }
    }

    
`;