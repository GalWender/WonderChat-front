import { Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Channels } from "./pages/channels";
import { ChannelContent } from "./cmps/channel-content";
import { ChatContent } from "./cmps/chat-content";

type Route = {
    path: string;
    component: () => JSX.Element;
    children?: Route[];
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
                children: [
                    {
                        path: '/channels/:channelId/:chatId',
                        component: ChatContent,
                    },
                ]
            },
        ],
    },
]

const renderRoutes = (routes: Route[]) => routes.map((route) => (
    <Route
        key={route.path}
        path={route.path}
        element={<route.component />}
    >
        {route.children && renderRoutes(route.children)}
    </Route>
))

export default renderRoutes(routes)