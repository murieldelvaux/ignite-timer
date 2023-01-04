import styled from "styled-components";

export const HomeContainer = styled.main`
    height:100%;
    flex:1;

    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;

    form{
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:3.5rem;
    }

`;


export const BaseCountDownButton = styled.button`
    width:100%;
    border:0;
    padding: 1rem;
    border: 8px;

    display:flex;
    justify-content:center;
    align-items:center;

    gap: 0.5rem;
    font-weight: bold;

    cursor: pointer;
    color: ${props => props.theme['gray-100']};

    &:disabled{
        opacity:0.7;
        cursor: not-allowed;
    }

`;

export const StartCountDownButton = styled(BaseCountDownButton)`
    background: ${props => props.theme['green-500']};
    
    &:not(:disabled):hover{/* só vai fazer o hover se o botão não estiver desabilitado */
        background: ${props => props.theme['green-700']};
    }
`;

export const StopCountDownButton = styled(BaseCountDownButton)`
    background: ${props => props.theme['red-500']};
    
    &:not(:disabled):hover{/* só vai fazer o hover se o botão não estiver desabilitado */
        background: ${props => props.theme['red-700']};
    }
`;