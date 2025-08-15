import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-modal-button',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './modal-button.component.html',
  styleUrl: './modal-button.component.scss'
})
export class ModalButtonComponent {

  @Input() label: string = 'Add';
  @Input() iconName: string = 'plus';
  @Input() fill: string = '#ddd';
  @Input() showIcon: boolean = true;
  @Input() showDropdown: boolean = true;
  @Input() dropdownItems: string[] = [];
  
  @Output() mainClick = new EventEmitter<void>();
  @Output() dropdownItemClick = new EventEmitter<string>();

  menuOpen = false;

  onMainClick() {
    this.mainClick.emit();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onSelect(item: string) {
    this.dropdownItemClick.emit(item);
    this.menuOpen = false; // close menu after selection
  }

}
