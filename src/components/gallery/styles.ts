import styled from 'styled-components';

export const Content = styled.section`
   display: flex;
   padding: 20px 0;
   flex: 1;
   min-height: calc(100vh - 125px);
   max-height: calc(100vh - 125px);
   background-color: rgb(0 0 0 / 80%);

   .swiper-gallery {
      flex: 1;
      display: flex;
      max-height: 100%;

      .swiper-wrapper {
         flex: 1;
         display: flex;
         max-height: inherit;

         .slide-item {
            width: 100%;
            max-height: inherit;
         }
      }
   }
   .select-image-gallery {
      display: flex;
      box-sizing: border-box;
      justify-content: center;
      padding: 0 20px;
      max-height: 100%;
      max-width: 250px;

      img {
         max-height: 130px;
         width: 200px;
         border-radius: 5px;
         cursor: pointer;
      }

      img.active {
         box-shadow: 0 0 5px var(--success);
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
            height: 15vh;
            width: 15vh;
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
               height: 13vh;
               width: 13vh;
            }
         }
      }
   }
`;

