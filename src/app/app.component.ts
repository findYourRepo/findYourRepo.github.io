import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'find-your-repo';
  isSearching = false;

  search = (value: string) => {
    console.log('Val: ', value);
  };
}
