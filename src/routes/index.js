import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import { HeaderOnly } from '~/components/Layouts';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/@:nickname', component: Profile, layout: null },
    { path: '/upload', component: Upload, layout: HeaderOnly },
];
const privateRoute = [];
export { publicRoutes, privateRoute };
