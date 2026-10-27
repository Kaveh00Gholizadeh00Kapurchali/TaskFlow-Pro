import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinishTaskModal } from './finish-task-modal';

describe('FinishTaskModal', () => {
  let component: FinishTaskModal;
  let fixture: ComponentFixture<FinishTaskModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishTaskModal],
    }).compileComponents();

    fixture = TestBed.createComponent(FinishTaskModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
