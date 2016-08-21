/**
 * Created by Vlad on 8/21/2016.
 */
import { Routes, RouterModule }   from '@angular/router';
//import { loginRoutes, authProviders }  from './login.routing';
//import { CanDeactivateGuard } from './can-deactivate-guard.service';
import {DevicesManager} from "./device/devices-manager";
//import {PublishMain} from "./device/publish-main";
import {PlayListLibrary} from "./play-list/playlist-library";
import {PlayListEditor} from "./playlist-editor/playlist-editor";
import {LayoutsAssembled} from "./layouts/layouts-assembled";
import {LayoutEditor} from "./layout-editor/layout-editor";
import {LayoutsTemplate} from "./layouts/layouts-template";
import {ContentManager} from "./assets/content-manager";
const crisisCenterRoutes: Routes = [
    {  path: '', redirectTo: '/heroes', pathMatch: 'full' },
    { path: 'crisis-center', loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule' }
];

const appRoutes: Routes = [
    { path: '', component:DevicesManager}
    ,{ path: 'devices-manager/:id', component:DevicesManager}
  //  ,{ path: 'publisher', component:PublishMain}
   ,{ path: 'playlist-library', component:PlayListLibrary }
    ,{ path: 'playlist-editor/:id', component: PlayListEditor}
    ,{path:'layouts-assembled',component:LayoutsAssembled}
   ,{path:'layout-editor/:type/:id',component:LayoutEditor}
   ,{path:'layout-template/:id',component:LayoutsTemplate}
   // ,{path:'publish-layout',component:PublishMain}
  ,{path: 'content-manager/:type/:id', component: ContentManager}
    ,{ path: '**', component: DevicesManager }

    // ...crisisCenterRoutes
];

export const appRoutingProviders: any[] = [
   // authProviders,
   // CanDeactivateGuard
];

export const routing = RouterModule.forRoot(appRoutes);