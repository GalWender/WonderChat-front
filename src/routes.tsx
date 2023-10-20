import { Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Register } from "./pages/register";
import { Login } from "./pages/login";

const routes = [
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