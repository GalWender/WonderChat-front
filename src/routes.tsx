import { Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Channels} from "./pages/channels";

type Route = {
    path: string;
    component: () => JSX.Element;
}

const routes: Route[] = [
    {
        path: '',
        component: Home,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/channels',
        component: Channels,
    }
]

const renderRoutes = () => routes.map((route) => {
    return (
        <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
        />
    )
})

export default renderRoutes;