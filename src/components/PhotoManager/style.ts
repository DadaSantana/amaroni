import styled from 'styled-components';

export const Content = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;

    .tags {
        display: flex;
<<<<<<< HEAD
        justify-content: space-between;
        padding: 10px;
        
        .mode-buttons {
            display: flex;

            span {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px;
                margin-right: 10px;
                background-color: #f1f1f1;
                border-radius: 5px;
    
                svg {
                    margin-right: 10px;
                }
    
                label {
                    margin: 0;
                    cursor: pointer;
                }
    
                &:hover {
                    cursor: pointer;
                    color: var(--info);
                }

                @media (max-width: 760px) {
                    svg {
                        margin-right: 0px;
                    }
                    label {
                        display: none;
                    }
                }
            }
        }
        
=======
        padding: 10px;
        

        span {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
            margin-right: 10px;
            background-color: #f1f1f1;
            border-radius: 5px;

            svg {
                margin-right: 10px;
            }

            label {
                margin: 0;
                cursor: pointer;
            }

            &:hover {
                cursor: pointer;
                color: var(--info);
            }
        }
>>>>>>> c415e8aca664a869c148a9d52dfce3b6b3bf6b24
    }

    main {
        flex: 1;
        max-width: 100%;


        .add-content, .manager-content {
            max-width: 100%;
            display: flex;
            flex-direction: column;
            padding: 10px;


            .preview {
                display: flex;
                justify-content: center;
                align-items: center;
                max-height: 220px;
                box-sizing: border-box;
                padding: 10px;
                max-width: 100%;

                .slide {
                    display: flex;
                    flex-direction: column;
                    width: 100%;

                    .swiper-gallery {
                        flex: 1;
                        width: 100%;
                        margin-bottom: 10px;
        
                        .slide-item {
                            height: 100px;
                            max-width: 100px;
                            border-radius: 5px;
    
                            .delete-item {
                                widnt: 100%;
                                height: 100%;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                background-color: rgb(0,0,0,80%);
                                border-radius: 5px;
                                opacity: 0;
                                transition: all linear 100ms;
    
                                svg {
                                    color: #f9f9f9;
                                }
                            }
    
                            &:hover {
                                cursor: pointer;
    
                                .delete-item {
                                    opacity: 1;
                                }
                            }
<<<<<<< HEAD

                            @media (max-width: 760px) {
                                min-width: 100px;
                            }
                        }

                        .new {
                            border: 2px solid lightgreen;
=======
>>>>>>> c415e8aca664a869c148a9d52dfce3b6b3bf6b24
                        }
                    }
                }
    
                
            }
        }

    }
`;