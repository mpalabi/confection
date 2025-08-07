import { Component, Input } from '@angular/core';
import { AvatarMembersComponent } from "../avatar-members/avatar-members.component";
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-project-card',
  imports: [AvatarMembersComponent, CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {

  @Input() project! : any;

  totalCount(members : any[]) : number {
    return members.length
  }

  getFontColor(progress : number) : string{
    if(progress <= 20){
      return "red";
    } else if(progress <= 50){
      return "orange"
    }
    else {
      return "green";
    }
  }

}
