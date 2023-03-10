import styled from 'styled-components';
import mapBanner from '../../../assets/media/MapBanner.png';

export const Content = styled.section`
    display: flex;
    width: 100%;
    height: 400px;
    background: url('${mapBanner}');
    background-position: center;
    background-size: cover;
    padding: 50px;
    box-sizing: border-box;


    .container {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    @media (max-width: 480px) and (orientation: portrait) {
        padding: 5px;

        .container {
            justify-content: center;
        }
        
    }
`;

export const Numbers = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 50%;
    background-color: #FFF;
    height: 100%;
    border-radius: 5px;
    box-shadow: 0 0 5px var(--shadow);
    padding: 20px;
    box-sizing: border-box;

    a.tel-title {
        text-decoration: none;
        font-size: 24px;
        color: #4d4d4d;
        margin-bottom: 10px;
    }

    span.contact-board {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--shadow);
        margin-top: 10px;

        .telephone {
            display: flex;
            align-items: center;
            margin-right: 10px;

            svg {
                font-size: 24px;
                color: rgb(0 122 255 / 70%);
                margin-right: 10px;
            }
            a {
                margin: 0;
            }
        }
        .local {
            display: flex;
            align-items: center;

            svg {
                padding: 5px;
                margin-right: 10px;
            }
            p {
                margin: 0;
            }
        }

    }

    @media (max-width: 480px) and (orientation: portrait) {
        max-width: 100%;
    }
`;