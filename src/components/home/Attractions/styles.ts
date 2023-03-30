import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Content = styled(motion.section)`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px 0;
    padding-bottom: 30px;
    background: rgb(255,255,255);
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(221,221,221,0.5355392156862745) 25%);   

    .title-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;

        h1 {
            font-size: 50px;
            color: #323232;
            text-shadow: 3px 3px 5px #646464;
        }
        div.title-bar {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;

            span.circle {
                height: 10px;
                width: 10px;
                border-radius: 50%;
                background-color: #009aff;
                margin: 0 10px;
            }
        }
    }

    p.description {
        width: 100%;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 20px;
        font-size: 12px;
    } 

    .filter-per-type {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;

        span.type {
            display: flex;
            align-items: center;
            background-color: rgb(187 187 187 / 15%);
            padding: 5px 10px;
            border-radius: 20px;
            margin: 0 10px;
            cursor: pointer;
            transition: all linear 200ms;
            font-size: 14px;

            svg {
                margin-right: 5px;
            }

            label {
                margin: 0;
                cursor: pointer;
            }

            &:hover {
                box-shadow: 0 0 5px var(--shadow);
            }

        }

        .active {
            box-shadow: 0 0 5px var(--shadow);
        }

        .all {
            &:hover, &.active {
                svg {
                    color: purple;
                }
            }
        }

        .food {
            &:hover, &.active {
                svg {
                    color: orange;
                }
            }
        }

        .square {
            &:hover, &.active {
                svg {
                    color: green;
                }
            }
        }

        .church {
            &:hover, &.active {
                svg {
                    color: #259aad;
                }
            }
        }

        .marketplace {
            &:hover, &.active {
                svg {
                    color: #6464e1;
                }
            }
        }

        .health {
            &:hover, &.active {
                svg {
                    color: #ff5858;
                }
            }
        }

        .workshop {
            &:hover, &.active {
                svg {
                    color: #ab8351;
                }
            }
        }

        .public {
            &:hover, &.active {
                svg {
                    color: #5db6e1;
                }
            }
        }


        @media (max-width: 480px) and (orientation: portrait) {
            justify-content: center;
            max-width: 100vw;

            span.type {
                svg {
                    margin: 0;
                }
                label {
                    display: none;
                }
            }

        }

    }

    .swiper {
        min-height: 405px;

        .slide-item {
            display: flex;
            justify-content: center;
        }
    }

    .circular-progress {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 405px;
    }
`;

export const AttractionItem = styled(motion.div)`
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: 0 0 3px var(--shadow);
    min-width: 250px;
    max-width: 250px;
    heigth: fit-content;
    margin: 10px 35px;
    background-color: #f9f9f9;

    div.att-background {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        max-width: 250px;
        height: 300px;
        object-fit: cover;
        border-radius: 5px;

        span.att-type {
            margin: 10px;
            display: flex;
            align-items: center;
            background-color: rgb(17 17 17 / 60%);
            border-radius: 5px;
            padding: 2px 10px;
    
            svg {
                font-size: 14px;
                color: #f9f9f9;
                margin-right: 5px;
            }
            
            label.type-name {
                font-size: 12px;
                color: #f9f9f9;
                margin: 0;
            }
        }

        .att-details {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            background-color: rgb(0,0,0,30%);
            padding: 10px;
            border-radius: 0 0 5px 5px;

            label.att-name {
                font-size: 18px;
                font-weight: bold;
                width: 100%;
                color: var(--whiteFont);
            }
        }

    }

    div.att-bottom {
        height: 200px;
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: flex-start;
        padding: 10px;

    
        label.att-name {
            font-size: 18px;
            font-weight: bold;
            width: 100%;
        }
    
        span.view-more {
            width: 100%;
            flex: 1
            padding: 2px;
            text-align: center;
            border-radius: 5px;
            border: 1px solid #46c7ff;
            transition: all linear 100ms;
            font-size: 14px;
            cursor: pointer;
            align-self: flex-end;
            font-weight: bold;
            border-style: dashed;
            margin-top: 30px;

            a {
                color: #4f4f4f;
            }
    
            &:hover {
                background-color: #007db3;

                a {
                    color: #f9f9f9;
                }
                
            }
        }
    }    
`;