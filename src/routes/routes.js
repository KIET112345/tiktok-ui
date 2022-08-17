import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import { HeaderOnly } from '~/layouts';
import routesConfig from '~/config';

// Public routes
const publicRoutes = [
    { path: routesConfig.routes.home, component: Home },
    { path: routesConfig.routes.following, component: Following },
    { path: routesConfig.routes.profile, component: Profile },
    { path: routesConfig.routes.upload, component: Upload, layout: HeaderOnly },
];
const privateRoute = [];
export { publicRoutes, privateRoute };
