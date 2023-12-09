import { Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Channels } from "./pages/channels";
import { ChannelContent } from "./cmps/channel-content";
import { BackgroundSvgs } from "./cmps/background-svgs";

type Route = {
    path: string;
    component: () => JSX.Element;
    children?: Route[];
    // exact: boolean;
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
        children: [
            {
                path: '/channels/:channelId',
                component: ChannelContent,
            },
        ],
    },
    // {
    //     path: '/channels/:channelId',
    //     component: ChannelContent,
    //     // exact: false,
    //     // children: [
    //     //     {
    //     //         path: '/:channelId/*',
    //     //         component: ChannelContent,
    //     //         // children: []
    //     //         // exact: false,
    //     //     },
    //     // ],
    // },

]
//i think route.children && goes false and doesn't render the route
const renderRoutes = () => routes.map((route) => {
    console.log('route', route);
    return (
        <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
        >
            {route.children && route.children.map((child) =>
                <Route key={child.path} path={child.path} element={<child.component />} />
            )}
        </Route>
    )
})

export default renderRoutes;