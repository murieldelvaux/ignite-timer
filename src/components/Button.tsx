import styles from './Button.module.css'
import { ButtonContainer, ButtonVariant } from './Button.styles';

/* colocando na interface quais propriedades quero passar para o meu button */
interface ButtonProps{
    variant?: ButtonVariant;
}

export function Button({variant = "primary"}: ButtonProps){// caso a cor não seja passada, fica com a cor primary como padrão
    return(
        <ButtonContainer variant={variant} >Enviar</ButtonContainer>
    )
}