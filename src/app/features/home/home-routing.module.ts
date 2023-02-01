import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent, MaintenanceComponent} from './pages';
import {ResourceNotFoundComponent} from "./pages/resource-not-found/resource-not-found.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'app', component: HomeComponent},
    /*loadChildren: () => import('./home.module').then(m => m.HomeModule), canLoad: [MaintenanceGuard] }*/
    {path: 'app/404', component: ResourceNotFoundComponent},
    {path: 'app/info', component: MaintenanceComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
