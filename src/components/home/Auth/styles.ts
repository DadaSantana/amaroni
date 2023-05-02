import styled from "styled-components";

export const Content = styled.div`
    position: fixed;    
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,0.8);
    z-index: 999;
    visibility: hidden;
    opacity: 0;
    transition: all linear 200ms;

    .login-content {
        width: 380px;
        background-color: #f9f9f9;
        box-shadow: 0 0 5px var(--shadow);
        

        .btn-action {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            
            svg {
                background-color: #dadada;
                padding: 5px;
                border-radius: 50%;
                margin: 10px;
                color: red;
                font-size: 20px;
                cursor: pointer;
            }
        }

        .slide-item {
            padding: 10px 30px;  

            h2 {
                text-align: center;
            }
    
            .MuiFormControl-root {
                margin: 0;
                margin-bottom: 10px;
                width: 100%;
            }

            .box-session {
                display: flex; 
                justify-content: center;
                margin: 10px 0;
            }

            .input-login.error {
                transition: all linear 200ms;

                fieldset {
                    border-color: var(--error);
                }
            }
            
            .alert-error {
                width: 100%;
                text-align: center;
                padding: 5px 0;
                font-size: 14px;
                color: var(--error);
                visibility: hidden;
            }
    
            .btn-submit {
                width: 100%;
                margin: 0;
                margin-bottom: 10px;
            }

            .loading-auth {
                display: block;
                width: 100%;
                text-align: center;
                font-size: 14px;
            }
    
            a,span.register {
                text-align: center;
                display: flex;
                width: 100%;
                justify-content: center;
                margin-top: 20px;
                transition: all linear 200ms;
                color: #1976d2;
    
                &:hover {
                    cursor: pointer;
                    font-weight: bold;
                }

                span {
                    width: 100%;
                    text-align: center;
                }
            }
        }
        
        
    }
`;

