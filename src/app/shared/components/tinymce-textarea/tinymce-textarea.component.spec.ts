import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinymceTextareaComponent } from './tinymce-textarea.component';

describe('TinymceTextareaComponent', () => {
  let component: TinymceTextareaComponent;
  let fixture: ComponentFixture<TinymceTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinymceTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinymceTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
