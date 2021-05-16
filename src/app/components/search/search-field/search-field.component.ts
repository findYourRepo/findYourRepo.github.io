import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css'],
})
export class SearchFieldComponent implements OnInit {
  @Input()
  isLoading: boolean;

  @Output()
  search = new EventEmitter<string>();
  private searchDebouncer: Subject<string> = new Subject<string>();

  phrase = '';

  constructor() {
    this.searchDebouncer
      .pipe(debounceTime(300))
      .subscribe((value) => this.search.emit(value));
  }

  ngOnInit(): void {}

  onSearchChange = (event: string) => {
    this.searchDebouncer.next(event);
  };
}
