import styled from 'styled-components';
import image from '../../../assets/media/BannerComuneDiAmaroni.jpg';

export const Content = styled.div`
	background: url('${image}');
	overflow:hidden;
	width: 100%;
	height: 70vh;
	background-color: black;
	background-size: cover;
	background-position: right bottom;
	background-repeat: no-repeat;
	display: flex;
	justify-content: center; /* adicionado para centralizar os itens horizontalmente */
	align-items: flex-end;
    box-shadow: 0 5px 10px var(--shadow); 

    .container {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        padding-bottom: 20px;
    
        img{
            max-height: 200px;
            padding:0
        }
      
        h1{
            color:white
        }
    }



    @media (max-width: 760px) {      
            background-size: cover;
            background-position: center;
            height: 80vh;

    }

	.container {
		margin-top: 30px;
	}

`;