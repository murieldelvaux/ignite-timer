
import { Header } from "../../components/Header";
import {Outlet} from 'react-router-dom'
import { LayoutContainer } from "./styles";

export function DefaultLayout(){
    return(
        <LayoutContainer>
            <Header/>
            <Outlet/> {/* esse componente trás os componentes filhos da rota que eu quero, ex: se eu quero os componentes da rota Home, ele irá redirecionar */}
        </LayoutContainer>
    )
}