import { Route } from "@angular/router";
import { OverviewComponent } from "../pages/dashboard/overview/overview.component";
import { ProjectComponent } from "../pages/dashboard/project/project.component";
import { NewProjectComponent } from "../pages/dashboard/new-project/new-project.component";

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
    },
    {
        path: 'new-project',
        component: NewProjectComponent,
        data: { breadcrumb: 'New Project' }
    }
]