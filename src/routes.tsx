import { Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Channels } from "./pages/channels";
import { ChannelContent } from "./cmps/channel-content";

type Route = {
    path: string;
    component: () => JSX.Element;
    children?: Route[];
    exact: boolean;
}

const routes: Route[] = [
    {
        path: '',
        component: Home,
        exact: true,
    },
    {
        path: '/register',
        component: Register,
        exact: true,
    },
    {
        path: '/login',
        component: Login,
        exact: true,
    },
    {
        path: '/channels',
        component: Channels,
        exact: false,
        children: [
            {
                path: ':channelId',
                component: ChannelContent,
                exact: false,
            },
        ],
    },

]
//i think route.children && goes false and doesn't render the route
const renderRoutes = () => routes.map((route) => {
    return (
        <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
        >
            {route.children && route.children.map((child) =>
                <Route key={child.path} path={route.path + child.path} element={<child.component />} />
            )}
        </Route>
    )
})

export default renderRoutes;