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


}
