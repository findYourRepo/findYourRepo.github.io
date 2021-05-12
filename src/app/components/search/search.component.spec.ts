import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let control: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    control = fixture.nativeElement.querySelector('.control');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide/show spinner depend on isLoading attribute', () => {
    expect(control.className.indexOf('is-loading') > 0).toBeFalsy();
    component.isLoading = true;
    fixture.detectChanges();
    expect(control.className.indexOf('is-loading') > 0).toBeTruthy();
  });
});
