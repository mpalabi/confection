import { Route } from "@angular/router";
import { OverviewComponent } from "../pages/dashboard/overview/overview.component";
import { ProjectComponent } from "../pages/dashboard/project/project.component";

export const dashboardRoutes : Route[] = [
    {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
    },
    {
        path: 'overview',
        component: OverviewComponent,
        data: { breadcrumb: 'Overview' }
    },
    {
        path: 'project',
        component: ProjectComponent,
        data: { breadcrumb: 'Project' }
    }
]