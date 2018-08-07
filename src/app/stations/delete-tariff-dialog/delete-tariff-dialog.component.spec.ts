import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteTariffModalDialogComponent } from './delete-tariff-dialog.component';

describe('ModalDialogComponent', () => {
  let component: DeleteTariffModalDialogComponent;
  let fixture: ComponentFixture<DeleteTariffModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTariffModalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTariffModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
