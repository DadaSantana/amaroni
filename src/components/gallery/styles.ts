import styled from 'styled-components';

export const Content = styled.section`
   display: flex;
   flex-direction: column;
   padding: 20px 0;

   .container {
      .image-gallery {
         .image-gallery-content {
            .image-gallery-slide-wrapper {
               .image-gallery-swipe {
                  .image-gallery-slides {
                     .image-gallery-slide {
                        img.image-gallery-image {
                           height: 60vh;
                        }
                     }
                  }
               }
            }
         }
      }
   }
`;

