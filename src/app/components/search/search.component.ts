import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, filter, throttleTime } from 'rxjs/operators';
import { NgModel } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Input()
  isLoading: boolean;

  @Output()
  onSearch = new EventEmitter<string>();
  onSearchThrottler: Subject<string> = new Subject<string>();

  phrase = '';

  constructor() {
    this.onSearchThrottler
      .pipe(
        filter((val) => val.length > 3),
        debounceTime(300)
      )
      .subscribe((value) => this.onSearch.emit(value));
  }

  ngOnInit(): void {}

  onSearchChange = (event: string) => {
    this.onSearchThrottler.next(event);
  };
}
