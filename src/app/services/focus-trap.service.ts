// focus-trap.service.ts
import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FocusTrapService {
  private firstFocusableElement: HTMLElement | null = null;
  private lastFocusableElement: HTMLElement | null = null;
  private previouslyFocusedElement: HTMLElement | null = null;

  public trapFocus(modalElement: ElementRef): void {
    this.previouslyFocusedElement = document.activeElement as HTMLElement;

    const focusableElements = this.getFocusableElements(modalElement);
    if (focusableElements.length === 0) return;

    this.firstFocusableElement = focusableElements[0];
    this.lastFocusableElement = focusableElements[focusableElements.length - 1];

    this.firstFocusableElement.focus();

    modalElement.nativeElement.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  public releaseFocus(): void {
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
    }
  }

  private getFocusableElements(modalElement: ElementRef): HTMLElement[] {
    const focusableSelectors = [
      'a[href]', 'area[href]', 'input:not([disabled])',
      'select:not([disabled])', 'textarea:not([disabled])',
      'button:not([disabled])', '[tabindex]:not([tabindex="-1"])'
    ];
    
    return Array.from(modalElement.nativeElement.querySelectorAll(focusableSelectors.join(', '))) as HTMLElement[];
  }

  private onKeyDown(event: KeyboardEvent): void {
    const isTabPressed = event.key === 'Tab';

    if (!isTabPressed) return;

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === this.firstFocusableElement) {
        event.preventDefault();
        this.lastFocusableElement?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === this.lastFocusableElement) {
        event.preventDefault();
        this.firstFocusableElement?.focus();
      }
    }
  }
}
