import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit, OnDestroy {

  progressValue = 0; // Stores the progress value (0-100)
  progressInterval: number | undefined; // Use only number for interval reference


  constructor() { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
    this.startProgress(); // Start the progress increment loop when component is initialized
  }
startProgress(): void {
 const intervalRef = setInterval(() => {
    this.progressValue = Math.min(this.progressValue + 1, 100); // Increment by 1, clamp to 0-100
  }, 100);

}
}


