import { Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Lazy load components with named exports
const Home = lazy(() => 
  import('./pages/home').then(module => ({ default: module.Home }))
)
const Register = lazy(() => 
  import('./pages/register').then(module => ({ default: module.Register }))
)
const Login = lazy(() => 
  import('./pages/login').then(module => ({ default: module.Login }))
)
const Channels = lazy(() => 
  import('./pages/channels').then(module => ({ default: module.Channels }))
)
const ChannelContent = lazy(() => 
  import('./cmps/channel-content').then(module => ({ default: module.ChannelContent }))
)
const ChatContent = lazy(() => 
  import('./cmps/chat-content').then(module => ({ default: module.ChatContent }))
)

type Route = {
  path: string
  component: () => JSX.Element
  children?: Route[]
}

const routes: Route[] = [
  {
    path: '',
    component: Home as any,
  },
  {
    path: '/register',
    component: Register as any,
  },
  {
    path: '/login',
    component: Login as any,
  },
  {
    path: '/channels',
    component: Channels as any,
    children: [
      {
        path: '/channels/:channelId',
        component: ChannelContent as any,
        children: [
          {
            path: '/channels/:channelId/:chatId',
            component: ChatContent as any,
          },
        ],
      },
    ],
  },
]

const renderRoutes = (routes: Route[]) =>
  routes.map((route) => (
    <Route 
      key={route.path} 
      path={route.path} 
      element={
        <Suspense fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        }>
          <route.component />
        </Suspense>
      }
    >
      {route.children && renderRoutes(route.children)}
    </Route>
  ))

export default renderRoutes(routes)
