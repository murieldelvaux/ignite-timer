import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { History } from "./pages/History";
import { Home } from "./pages/Home";

export function Router(){
    return(
        <Routes>
            {/* <DefaultLayout /> ----> trás o layout padrão da aplicação, para evitar de criar em cada componente da rota a mesma coisa */}
            <Route path="/" element={<DefaultLayout />}>{/* As rotas vão se somando, se aqui fosse /admin, para acessar History eu precisaria: /admin/history */}
                <Route path="/" element={<Home />} />
                <Route path="/history" element={<History />} />
            </Route>
        </Routes>
    )
}