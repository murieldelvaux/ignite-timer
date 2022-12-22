import styled, { css } from "styled-components";

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'neutral';

interface ButtonContainerProps{
    variant: ButtonVariant;
}

//criando variável para as cores
const buttonVariants ={
    primary: 'purple',
    secondary: 'palevioletred',
    danger: 'red',
    success: 'green',
    neutral: 'cornflowerblue'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;
    background-color:${props=> props.theme['green-500']}; // consigo pegar o primary do arquivo default da pasta theme que eu criei um tema
    color: ${props=> props.theme.white};
    border:0;
    margin: 8px;
    border-radius:4px;
    /* ${
        props =>{
            return css` //importando css de styled components para facilitar a visualização
                background-color: ${buttonVariants[props.variant]}
            ` 
        }
    } */
`