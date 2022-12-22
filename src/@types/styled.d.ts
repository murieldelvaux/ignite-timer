import 'styled-components';
import { defaultTheme } from '../styles/themes/default';

type ThemeType = typeof defaultTheme;

/* 
    declare module -> ele tá "falando": "olha, eu to criando uma tipagem para o módulo styled components do npm"
    toda vez que eu importar o módulo do styled components em algum arquivo, a tipagem que ele vai puxar, a definição de tipos do typescript que ele vai puxar é oque eu defini
    dentro do declare module
*/

declare module 'styled-components'{
    /* aqui dentro eu não vou criar nada, só sobrescrever */
    export interface DefaultTheme extends ThemeType{}
}