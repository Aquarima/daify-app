import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeHelper {

  getTimeSince(from: Date, to: Date, options: { full: boolean, last: boolean } = {full: false, last: false}) {
    const seconds = Math.floor((from.getTime() - to.getTime()) / 1000);

    const intervals = [
      {label: options.full ? "year" : "y", amount: 31536000},
      {label: options.full ? "month" : "m", amount: 2592000},
      {label: options.full ? "week" : "w", amount: 604800},
      {label: options.full ? "day" : "d", amount: 86400},
      {label: options.full ? "hour" : "h", amount: 3600},
      {label: options.full ? "minute" : "m", amount: 60},
      {label: options.full ? "second" : "s", amount: 1}
    ];

    for (let i = 0; i < intervals.length; i++) {
      const interval = Math.floor(seconds / intervals[i].amount);
      if (interval >= 1) {
        const label = (interval === 1 && options.full && options.last) ? "last " + intervals[i].label : intervals[i].label;
        const pluralLabel = interval > 1 ? label + "s" : label;
        return interval + " " + pluralLabel;
      }
    }

    return "just now";
  }
}
