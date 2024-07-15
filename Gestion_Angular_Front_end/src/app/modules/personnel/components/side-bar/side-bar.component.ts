
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  sidebar!: ElementRef;
  closeBtn!: ElementRef;
  searchBtn!: ElementRef;
  isOpen = false; // Flag to track sidebar state

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.sidebar = this.elementRef.nativeElement.querySelector('.sidebar');
    this.closeBtn = this.elementRef.nativeElement.querySelector('#btn');
    this.searchBtn = this.elementRef.nativeElement.querySelector('.bx-search');

    this.setupEventListeners();
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen; // Toggle state on click
    this.menuBtnChange(); // Optional function for icon change
  }

  setupEventListeners() {
    this.closeBtn.nativeElement.addEventListener("click", () => {
      this.toggleSidebar();
    });

    this.searchBtn.nativeElement.addEventListener("click", () => {
      this.toggleSidebar();
    });
  }

  menuBtnChange() {
    const closeBtn = this.closeBtn.nativeElement;
    if (this.isOpen) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  }
}





