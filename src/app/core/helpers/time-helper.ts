import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeHelper {

  getTimeSince(date: Date, full: boolean = false) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    const intervals = [
      {label: full ? "year" : "y", amount: 31536000},
      {label: full ? "month" : "m", amount: 2592000},
      {label: full ? "week" : "w", amount: 604800},
      {label: full ? "day" : "d", amount: 86400},
      {label: full ? "hour" : "h", amount: 3600},
      {label: full ? "minute" : "m", amount: 60},
      {label: full ? "second" : "s", amount: 1}
    ];

    for (let i = 0; i < intervals.length; i++) {
      const interval = Math.floor(seconds / intervals[i].amount);
      if (interval >= 1) {
        return interval === 1 && full ? "last " + intervals[i].label : interval + " " + intervals[i].label;
      }
    }
    return "just now";
  }
}
