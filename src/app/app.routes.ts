import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserNewComponent } from './components/user-new/user-new.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user', component: UserNewComponent },
    { path: 'user/:id', component: UserEditComponent },
    { path: '**', component: HomeComponent },
];

export const app_routing = RouterModule.forRoot(APP_ROUTES);