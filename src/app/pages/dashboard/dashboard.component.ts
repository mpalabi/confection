import { Component } from '@angular/core';
import { ContentContainerComponent } from "../../shared/content-container/content-container.component";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { ProjectCardComponent } from '../../shared/project-card/project-card.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [ NavbarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

 

}
