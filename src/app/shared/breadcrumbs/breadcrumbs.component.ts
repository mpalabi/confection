import { ActivatedRoute, NavigationEnd, Router, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  imports: [CommonModule, RouterLink],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent implements OnInit {

breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Make sure breadcrumb gets built on both initial load and subsequent navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Delay a tick to let route resolve
        setTimeout(() => {
          this.breadcrumbs = this.buildBreadcrumbs(this.route.root);
        });
      });

    // Also build breadcrumbs immediately (for first render if no NavigationEnd happens yet)
    setTimeout(() => {
      this.breadcrumbs = this.buildBreadcrumbs(this.route.root);
    });
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children = route.children;

    for (const child of children) {
      const routeConfig = child.routeConfig;
      if (!routeConfig) continue;

      const routePath = routeConfig.path;
      if (!routePath) continue;

      // Resolve dynamic segments like :id
      const segments = routePath.split('/');
      const resolvedPath = segments
        .map(segment => segment.startsWith(':')
          ? child.snapshot.params[segment.slice(1)]
          : segment)
        .join('/');

      url += `/${resolvedPath}`;

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
