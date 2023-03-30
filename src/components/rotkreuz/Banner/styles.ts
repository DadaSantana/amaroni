import styled from 'styled-components';

export const Content = styled.div`
	overflow:hidden;
	width: 100%;
	height: 70vh;
	background-color: #e1e1e1;
	display: flex;
	justify-content: center; /* adicionado para centralizar os itens horizontalmente */
	align-items: flex-end; 
    box-shadow: 0 5px 10px var(--shadow);

    video {
        width: 100%;
        object-fit: cover;
        height: 70vh;
        z-index: 1;
    }

    .container {
        position: absolute;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        padding-bottom: 20px;
    
        img{
            max-height: 100px;
            padding:0
        }
      
        h1{
            color:white
        }
    }



    @media (max-width: 760px) {      
        background-size: cover;
        background-position: center;
        height: 50vh;

        .container {
            img{
                max-height: 100px;
            }
            h1 {
                font-size: 24px;
            }
        }
    }

	.container {
		margin-top: 30px;
	}

`;