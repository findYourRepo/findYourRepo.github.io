import { FocusedDirective } from './focused.directive';
import { Component, Input } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

@Component({
  template: `<div [appFocused]="isFocused"></div>`,
})
class TestComponent {
  @Input() isFocused: boolean;
}

describe('FocusedDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let element: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FocusedDirective, TestComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('div');
    fixture.detectChanges();
  });

  it('should call scrollIntoView on DOM element if passed `true`', fakeAsync(() => {
    spyOn(element, 'scrollIntoView');
    expect(element.scrollIntoView).not.toHaveBeenCalled();

    component.isFocused = true;
    fixture.detectChanges();

    expect(element.scrollIntoView).toHaveBeenCalled();
  }));
});
