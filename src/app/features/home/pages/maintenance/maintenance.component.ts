import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit, AfterViewInit {

  @ViewChild("counter_hours") counterHours!: ElementRef;
  @ViewChild("counter_minutes") counterMinutes!: ElementRef;
  @ViewChild("counter_seconds") counterSeconds!: ElementRef;

  passed!: boolean;
  endDate: Date | undefined;

  ngOnInit(): void {
    this.endDate = new Date(Date.now() + 100000); // Example
    this.passed = this.timeBeforeEnd < 0;
  }

  ngAfterViewInit(): void {
    this.updateCountdown(); // To avoid delay in rendering
    this.startCountdown();
  }

  startCountdown() {
    setInterval(() => this.updateCountdown(), 1000);
  }

  private updateCountdown() {
    if (!this.endDate) return;
    let time = this.timeBeforeEnd;
    if (time < 0) {
      this.passed = true;
      return;
    }
    this.counterHours.nativeElement.textContent = Math.floor(time / (1000 * 60 * 60));
    this.counterMinutes.nativeElement.textContent = Math.floor(((time % (1000 * 60 * 60)) / 60000));
    this.counterSeconds.nativeElement.textContent = Math.floor((((time % (1000 * 60 * 60)) % 60000) / 1000));
  }

  private get timeBeforeEnd(): number {
    const now = new Date();
    const end = (this.endDate) ? this.endDate : now;
    return end.getTime() - now.getTime();
  }
}
