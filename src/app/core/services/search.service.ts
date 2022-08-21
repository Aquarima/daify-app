import { Injectable } from '@angular/core';
import { ChallengeService } from './challenge.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private challengeService: ChallengeService) { }

  fetchHistory(): string[] {
    let json = localStorage.getItem('history');
    return (json) ? JSON.parse(json) : [];
  }

  saveSearch(name: string): string[] {
    let searches = this.fetchHistory();
    if (searches.includes(name)) searches = this.deleteSearch(name);
    if (searches.length >= 4) searches.pop();
    searches.unshift(name);
    return this.updateHistory(searches);
  }

  deleteSearch(name: string, history?: string[]): string[] {
    const searches = (history) ? history : this.fetchHistory();
    searches.splice(searches.indexOf(name), 1);
    return this.updateHistory(searches);
  }

  private updateHistory(history: string[]): string[] {
    localStorage.setItem('history', JSON.stringify(history));
    return history;
  }
}
