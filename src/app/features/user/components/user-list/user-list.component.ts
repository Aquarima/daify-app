import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/core/models/user';

@Component({
  selector: 'dfy-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() profiles: Profile[] = [];

  constructor() { }

  ngOnInit(): void { }
}
