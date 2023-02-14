import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  fetchHistory(historyName: string): string[] {
    let json = localStorage.getItem(`${historyName}_history`);
    return (json) ? JSON.parse(json) : [];
  }

  saveSearch(historyName: string, search: string): string[] {
    let searches = this.fetchHistory(historyName);
    if (searches.includes(search)) searches = this.deleteSearch(historyName, search);
    if (searches.length >= 4) searches.pop();
    searches.unshift(search);
    return this.updateHistory('challenges', searches);
  }

  deleteSearch(historyName: string, search: string): string[] {
    const searches = this.fetchHistory(`${historyName}_history`);
    searches.splice(searches.indexOf(search), 1);
    return this.updateHistory('challenges', searches);
  }

  private updateHistory(historyName: string, history: string[]): string[] {
    localStorage.setItem(`${historyName}_history`, JSON.stringify(history));
    return history;
  }
}
