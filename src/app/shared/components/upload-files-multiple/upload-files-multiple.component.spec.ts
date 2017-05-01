import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFilesMultipleComponent } from './upload-files-multiple.component';

describe('UploadFilesMultipleComponent', () => {
  let component: UploadFilesMultipleComponent;
  let fixture: ComponentFixture<UploadFilesMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFilesMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFilesMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
