import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeHelper {

  getTimeSince(from: Date, to: Date, full: boolean = false) {
    const seconds = Math.floor((from.getTime() - to.getTime()) / 1000);

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
        const label = interval === 1 && full ? "last " + intervals[i].label : intervals[i].label;
        const pluralLabel = interval > 1 ? label + "s" : label;
        return interval + " " + pluralLabel;
      }
    }

    return "just now";
  }
}
