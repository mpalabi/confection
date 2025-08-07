import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-members',
  imports: [CommonModule],
  templateUrl: './avatar-members.component.html',
  styleUrl: './avatar-members.component.scss'
})
export class AvatarMembersComponent {

  @Input() members: { name: string; initials?: string; img?: string }[] = [];
  @Input() totalCount: number = 0;
  @Input() maxVisible: number = 3;

  get visibleMembers() {
    return this.members.slice(0, this.maxVisible);
  }

  get remainingCount() {
    return this.totalCount - this.visibleMembers.length;
  }

}
