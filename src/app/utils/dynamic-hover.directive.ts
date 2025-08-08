import {
  Directive,
  Input,
  ViewContainerRef,
  ComponentRef,
  TemplateRef,
  ComponentFactoryResolver,
  Injector,
  ElementRef,
  ApplicationRef,
  EmbeddedViewRef,
  OnDestroy,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[hoverAttach]',
  standalone: true
})
export class HoverAttachDirective implements OnDestroy {
  @Input('hoverAttach') hoverContent!: TemplateRef<any> | any; // Can be component or template
  @Input() hoverPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() hoverDelay: number = 300; // ms

  private hoverTimeout: any;
  private componentRef?: ComponentRef<any>;
  private viewRef?: EmbeddedViewRef<any>;

  constructor(
    private vcr: ViewContainerRef,
    private el: ElementRef,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.hoverTimeout = setTimeout(() => this.show(), this.hoverDelay);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    clearTimeout(this.hoverTimeout);
    this.hide();
  }

  show() {
    const hostElem = this.el.nativeElement;
    const rect = hostElem.getBoundingClientRect();

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.zIndex = '9999';
    container.style.transition = '0.3s all ease-in-out';

    document.body.appendChild(container);

    if (this.hoverContent instanceof TemplateRef) {
      this.viewRef = this.vcr.createEmbeddedView(this.hoverContent);
      this.appRef.attachView(this.viewRef);
      container.appendChild(this.viewRef.rootNodes[0]);
    } else {
      const componentFactory = this.vcr.createComponent(this.hoverContent, {
        injector: this.injector
      });
      this.componentRef = componentFactory;
      this.appRef.attachView(componentFactory.hostView);
      const domElem = (componentFactory.hostView as EmbeddedViewRef<any>).rootNodes[0];
      container.appendChild(domElem);
    }

    // Positioning
    requestAnimationFrame(() => {
      const contentEl = container.firstChild as HTMLElement;
      const contentRect = contentEl.getBoundingClientRect();

      const top = {
        top: rect.top - contentRect.height - 8 + window.scrollY,
        left: rect.left + rect.width / 2 - contentRect.width / 2 + window.scrollX
      };

      const bottom = {
        top: rect.bottom + 8 + window.scrollY,
        left: rect.left + rect.width / 2 - contentRect.width / 2 + window.scrollX
      };

      const left = {
        top: rect.top + rect.height / 2 - contentRect.height / 2 + window.scrollY,
        left: rect.left - contentRect.width - 8 + window.scrollX
      };

      const right = {
        top: rect.top + rect.height / 2 - contentRect.height / 2 + window.scrollY,
        left: rect.right + 8 + window.scrollX
      };

      const pos = { top, bottom, left, right }[this.hoverPosition];
      Object.assign(container.style, {
        top: `${pos.top}px`,
        left: `${pos.left}px`
      });

      container.setAttribute('data-hover-attach-container', '');
    });
  }

  hide() {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = undefined;
    }

    if (this.viewRef) {
      this.appRef.detachView(this.viewRef);
      this.viewRef.destroy();
      this.viewRef = undefined;
    }

    const el = document.querySelector('[data-hover-attach-container]');
    if (el) {
      el.remove();
    }
  }

  ngOnDestroy() {
    this.hide();
  }
}
