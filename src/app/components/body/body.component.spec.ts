import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyComponent } from './body.component';
import { Component } from '@angular/core';

@Component({
  template: `<app-body>Test</app-body>`,
})
class TestHostComponent {}

describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BodyComponent, TestHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display ng-content', () => {
    const testFixture = TestBed.createComponent(TestHostComponent);
    const column = testFixture.nativeElement;

    expect(column.textContent).toEqual('Test');
  });
});
