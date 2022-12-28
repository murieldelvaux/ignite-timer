import { HeaderContainer } from './styles';

import logoIgnite from '../../assets/Logo.svg'
import {Timer, Scroll} from 'phosphor-react'
import { NavLink } from "react-router-dom";

export function Header(){
    return(
        <HeaderContainer>
            <img src={logoIgnite} alt="Logo do ignite que é composto por dois triangulos sobrepostos na cor verde" />
            <nav>
                <NavLink to="/">
                    <Timer size={24} />
                </NavLink>
                <NavLink to="/history" title="Histórico">
                    <Scroll size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}