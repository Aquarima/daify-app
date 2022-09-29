import { Component, HostListener, OnInit } from '@angular/core';
import { Challenge } from './core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private profileService: ProfileService) { }

  ngOnInit(): void { 
    this.authService.state.subscribe(state => {
      if (state != 1) {
        this.setOnline(false);
        return;
      }
      this.setOnline(true);
    })
  }

  ngOnInit(): void { }

  /*@HostListener('contextmenu')
  preventContextMenu() {
    return false;
  }*/
}
