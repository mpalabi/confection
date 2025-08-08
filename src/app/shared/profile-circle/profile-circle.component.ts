import { CommonModule, NgStyle } from '@angular/common';
import {
  Component,
  Input,
  HostListener,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-profile-circle',
  imports: [NgStyle, CommonModule],
  templateUrl: './profile-circle.component.html',
  styleUrl: './profile-circle.component.scss'
})
export class ProfileCircleComponent {

   @Input() name: string = '';
  @Input() imageUrl?: string;
  @Input() size: number = 40; // in px
  @Input() hoverDelaySeconds: number = 1;
  @Input() cardId: string = '';

  showCard = false;
  hoverTimeout: any;

  get initials(): string {
    return this.name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  get textColor(): string {
    return this.getColorFromName(this.name, true);
  }

  get bgColor(): string {
    return this.getColorFromName(this.name, false);
  }

  get fontSize(): string {
    return `${this.size / 2.5}px`;
  }

  get cardPosition(): Record<string, string> {
    return {
      top: `${this.size + 4}px`
    };
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.hoverTimeout = setTimeout(() => {
      this.showCard = true;
    }, this.hoverDelaySeconds * 1000);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    clearTimeout(this.hoverTimeout);
    this.showCard = false;
  }

  private getColorFromName(name: string, isText: boolean): string {
    const hash = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360;
    const saturation = isText ? 90 : 70;
    const lightness = isText ? 25 : 85;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

}
