import { Component } from '@angular/core';

@Component({
  selector: 'app-leftside',
  standalone: true,
  imports: [],
  templateUrl: './leftside.html',
  styleUrl: './leftside.scss',
})
export class Leftside {
  constructor() {}

  changeTheme() {
    console.log('I click the sun image');
  }
}
