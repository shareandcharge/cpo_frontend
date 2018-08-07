import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStationModalDialogComponent } from './update-station-dialog.component';

describe('ModalDialogComponent', () => {
  let component: UpdateStationModalDialogComponent;
  let fixture: ComponentFixture<UpdateStationModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStationModalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStationModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
