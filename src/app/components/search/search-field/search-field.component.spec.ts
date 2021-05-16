import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { SearchFieldComponent } from './search-field.component';
import { FormsModule } from '@angular/forms';

describe('SearchFieldComponent', () => {
  let component: SearchFieldComponent;
  let fixture: ComponentFixture<SearchFieldComponent>;
  let control: HTMLDivElement;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFieldComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFieldComponent);
    component = fixture.componentInstance;
    control = fixture.nativeElement.querySelector('.control');
    input = fixture.nativeElement.querySelector('.input');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide/show spinner depend on isLoading attribute', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(control.className.indexOf('is-loading') > 0).toBeFalsy();
    component.isLoading = true;
    fixture.detectChanges();
    expect(control.className.indexOf('is-loading') > 0).toBeTruthy();
  });

  it('should react on inserting characters into input field', fakeAsync(() => {
    spyOn(component, 'onSearchChange');
    const mockedInputValue = 'mocked input value';

    input.value = mockedInputValue;
    input.dispatchEvent(new Event('input'));

    tick();

    expect(component.phrase).toEqual(mockedInputValue);
    expect(component.onSearchChange).toHaveBeenCalledWith(mockedInputValue);
  }));

  it('should emit search event debounced 300ms after calling onSearchChange method (simple delay)', fakeAsync(() => {
    spyOn(component.search, 'emit');
    const mockedInputValue = 'mocked input';

    component.onSearchChange(mockedInputValue);

    // simple delay test
    tick();
    expect(component.search.emit).not.toHaveBeenCalled();

    tick(300);
    expect(component.search.emit).toHaveBeenCalledWith(mockedInputValue);
  }));

  it('should emit search event debounced 300ms after calling onSearchChange method (double insert)', fakeAsync(() => {
    spyOn(component.search, 'emit');
    const mockedInput = 'mocked input';
    const mockedInputValue = 'mocked input';

    component.onSearchChange(mockedInputValue);

    // double insert test
    component.onSearchChange(mockedInput);
    tick(150);
    expect(component.search.emit).not.toHaveBeenCalled();

    component.onSearchChange(mockedInputValue);
    tick(200);
    expect(component.search.emit).not.toHaveBeenCalled();

    tick(100);
    expect(component.search.emit).toHaveBeenCalledWith(mockedInputValue);
  }));
});
