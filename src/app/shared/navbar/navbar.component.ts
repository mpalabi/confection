import { Component, ViewChild } from '@angular/core';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { ProfileCircleComponent } from "../profile-circle/profile-circle.component";
import { HoverAttachDirective } from '../../utils/dynamic-hover.directive';

@Component({
  selector: 'app-navbar',
  imports: [BreadcrumbsComponent, ProfileCircleComponent, HoverAttachDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

   userName = 'Pandit Alabi';
  userRole = 'Product Designer';
  userStatus = 'Active';
  hasNotifications = true;

  constructor() { }

  ngOnInit(): void {
  }

  onLogoClick(): void {
    // Handle logo click - navigate to dashboard
    console.log('Navigate to dashboard');
  }

  onNotificationClick(): void {
    // Handle notification click
    console.log('Show notifications');
  }

  onProfileClick(): void {
    // Handle profile click
    console.log('Show profile menu');
  }

  getUserInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

}

