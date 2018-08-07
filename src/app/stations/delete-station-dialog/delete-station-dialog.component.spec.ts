import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteStationModalDialogComponent } from './delete-station-dialog.component';

describe('ModalDialogComponent', () => {
  let component: DeleteStationModalDialogComponent;
  let fixture: ComponentFixture<DeleteStationModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteStationModalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteStationModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
