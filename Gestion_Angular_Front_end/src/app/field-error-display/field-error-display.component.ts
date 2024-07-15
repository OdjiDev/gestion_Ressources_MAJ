import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.css']
})
export class  FieldErrorDisplayComponent implements OnInit {
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  @Input() errorMsg: string='';
  @Input() displayError: boolean= false;
}


