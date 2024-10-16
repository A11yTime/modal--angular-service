
// modal.component.ts
import { Component, ElementRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FocusTrapService } from '../../services/focus-trap.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter()
  @ViewChild('modalContent', { static: true }) modalContent!: ElementRef;

  constructor(private focusTrapService: FocusTrapService) {}

  ngAfterViewInit(): void {
    // Only trap focus when the modal is open
    if (this.modalContent) {
      this.focusTrapService.trapFocus(this.modalContent);
    }
  }

  openModal(): void {
    // Logic to open modal
    this.focusTrapService.trapFocus(this.modalContent);
  }

  closeModal(): void {
    // Logic to close modal
    this.focusTrapService.releaseFocus();
    this.close.emit()
  }
}







