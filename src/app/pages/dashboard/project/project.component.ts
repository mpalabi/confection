import { Component } from '@angular/core';
import { KanbanViewComponent } from "./components/kanban-view/kanban-view.component";

@Component({
  selector: 'app-project',
  imports: [KanbanViewComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

}
