import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStationsModalDialogComponent } from './add-stations-dialog.component';

describe('ModalDialogComponent', () => {
  let component: AddStationsModalDialogComponent;
  let fixture: ComponentFixture<AddStationsModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStationsModalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStationsModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
