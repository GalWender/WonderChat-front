import { Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Channels} from "./pages/channels";
import { ChannelContent } from "./cmps/channel-content";

type Route = {
    path: string;
    component: () => JSX.Element;
    exact:boolean;
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
        exact: true,
    },
    {
        path: '/channels/:channelId',
        component: ChannelContent,
        exact: true,
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