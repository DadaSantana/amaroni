import styled from 'styled-components';

export const Content = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    height: 50vh;
    margin-top: 20px;
    max-width: 100%;


    h2 {
        align-self: flex-start;
    }

   .select-image-gallery {
        margin-top: 20px;
        display: flex;
        box-sizing: border-box;
        justify-content: center;
        max-height: 100%;
        width: 100%;

        .slide-preview {
            display: flex;
            max-width: 150px;
            min-height: 150px;
            border-radius: 5px;
            cursor: pointer;
            border: 1px solid var(--shadow);
            box-shadow: 0 0 5px var(--shadow);
            background-color: #f1f1f1;

            span {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgb(0,0,0,60%);
                border-radius: 5px;
                opacity: 0;
                transition: all linear 100ms;

                svg {
                    color: #f9f9f9;
                }

                &:hover {
                    opacity: 1;
                }
            }
        }

   }

   @media (max-width: 760px) {
      flex-direction: column;

      .swiper-gallery {
         margin: 0;
         height: 60vh;

         .swiper-wrapper {
            height: 60vh;
         }
      }

      .select-image-gallery {
         margin: 10px 10px;
         max-width: 100%;
         max-height: 200px;
         padding: 0;
   
         img {
            height: 20vh;
            width: 20vh;
         }
      }
   }

   @media (max-width: 430px) {
      flex-direction: column;

      .swiper-gallery {
         margin: 0;
         height: 60vh;

         .swiper-wrapper {
            height: 60vh;
         }

         .select-image-gallery {
            margin: 10px 10px;
            max-width: 100%;
            max-height: 200px;
            padding: 0;
      
            img {
               height: 15vh;
               width: 15vh;
            }
         }
      }
   }
`;

export const Float = styled.div`
   position: fixed;
   top: 0;
   bottom: 0;
   right: 0;
   left: 0;
   background-color: rgb(0,0,0,80%);
   display: flex;
   z-index: 999;

   .container {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 20px;

        .close-float {
            display: flex;
            justify-content: flex-end;

            svg {
               color: #f9f9f9;
               cursor: pointer;
            }
        }
        .swiper-gallery {
            flex: 1;
            display: flex;
            height: 40vh;
            width: 100%;
            max-width: 100%;
            
        
            .swiper-wrapper {
               flex: 1;
               display: flex;
               max-height: 100px;
               width: 100%;
               margin: 0;
        
               .slide-item {
                  height: 500px;
               }
            }
        }
        .select-image-gallery {
            margin: 10px 10px;
            max-width: 100%;
            max-height: 200px;
            padding: 0;
    
            .swiper-slide {
                background-color: #f1f1f1;
                height: 20vh;
                width: 20vh;
                border-radius: 5px;
                cursor: pointer;

                img {
                    height: 100%;
                    width: 100%;
                    border-radius: 5px;
                }
            }

        }

   }
   

    @media (max-width: 760px) {
        flex-direction: column;

        .swiper-gallery {
            margin: 0;
            height: 60vh;

            .swiper-wrapper {
                height: 60vh;
            }
        }

        .select-image-gallery {
            margin: 10px 10px;
            max-width: 100%;
            max-height: 200px;
            padding: 0;

            .swiper-slide {
                min-width: 20vh;

                img {
                    height: 100%;
                    width: 100%;
                }
            }
        }
    }

    @media (max-width: 430px) {
    flex-direction: column;

    .swiper-gallery {
        margin: 0;
        height: 60vh;

        .swiper-wrapper {
            height: 60vh;
        }

        .select-image-gallery {
            margin: 10px 10px;
            max-width: 100%;
            max-height: 200px;
            padding: 0;

            img {
                height: 15vh;
                width: 15vh;
            }
        }
    }
`;

