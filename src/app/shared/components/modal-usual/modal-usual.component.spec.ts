import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUsualComponent } from './modal-usual.component';

describe('ModalUsualComponent', () => {
  let component: ModalUsualComponent;
  let fixture: ComponentFixture<ModalUsualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUsualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUsualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
