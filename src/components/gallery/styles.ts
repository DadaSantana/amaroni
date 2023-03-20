import styled from 'styled-components';

export const Content = styled.section`
   display: flex;
   padding: 20px 0;
   flex: 1;
   min-height: calc(100vh - 125px);
   max-height: calc(100vh - 125px);
   background-color: rgb(0 0 0 / 80%);

   .swiper {
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
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      padding: 0 20px;
      max-height: 100%;
      max-width: 250px;

      img {
         width: 200px;
         height: fit-content;
         border-radius: 5px;
         cursor: pointer;
      }
      img.active {
         box-shadow: 0 0 5px var(--success);
      }
   }
`;

