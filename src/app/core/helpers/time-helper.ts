import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeHelper {

  calculateTimeRemaining(date: Date): TimeLeft {
    let totalSeconds = Math.floor((new Date(date).getTime() - Date.now()) / 1000);

    const times = [
      {key: 'years', label: 'y', seconds: 365 * 24 * 60 * 60},
      {key: 'months', label: 'mo', seconds: 30 * 24 * 60 * 60},
      {key: 'weeks', label: 'w', seconds: 7 * 24 * 60 * 60},
      {key: 'days', label: 'd', seconds: 24 * 60 * 60},
      {key: 'hours', label: 'h', seconds: 60 * 60},
      {key: 'minutes', label: 'm', seconds: 60},
      {key: 'seconds', label: 's', seconds: 1}
    ];

    const timeRemainingParts: TimeLeft = {
      'years': 0,
      'months': 0,
      'weeks': 0,
      'days': 0,
      'hours': 0,
      'minutes': 0,
      'seconds': 0
    };

    for (let i = 0; i < times.length && totalSeconds > 0; i++) {
      const time = times[i];
      const value = Math.floor(totalSeconds / time.seconds);
      if (value > 0) {
        timeRemainingParts[time.key as keyof typeof timeRemainingParts] = value;
        totalSeconds -= value * time.seconds;
      }
    }

    return timeRemainingParts;
  }

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

export interface TimeLeft {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
