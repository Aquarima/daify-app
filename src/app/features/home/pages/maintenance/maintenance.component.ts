import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

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
    this.endDate = new Date('08/27/2022 22:00'); // Example
    this.passed = this.getTimeBeforeEnd() < 0;
  }

  ngAfterViewInit(): void {
    this.updateCountdown(); // To avoid delay in rendering
    this.startCountdown();
  }

  @HostListener('contextmenu')
  preventContextMenu() {
    return false;
  }

  startCountdown() {
    setInterval(() => this.updateCountdown(), 1000);
  }

  updateCountdown() {
    if (!this.endDate) return;
    let time = this.getTimeBeforeEnd();
    if (time < 0) {
      this.passed = true;
      return;
    }
    this.counterHours.nativeElement.textContent = Math.floor(time / (1000*60*60));
    this.counterMinutes.nativeElement.textContent = Math.floor(((time % (1000*60*60)) / 60000));
    this.counterSeconds.nativeElement.textContent = Math.floor((((time % (1000*60*60))% 60000) / 1000));
  }

  private getTimeBeforeEnd(): number {
    const now = new Date();
    const end = (this.endDate) ? this.endDate : now;
    return end.getTime() - now.getTime();
  }
}
