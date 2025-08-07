import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/auth/login/login.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        loadChildren: () => import('./routes/dashboard.routes').then((m) => m.dashboardRoutes)
    },
    {
        path: '',
        component: LoginComponent,
    }
];
