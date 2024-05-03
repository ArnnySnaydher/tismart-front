import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalModificarComponent } from './hospital-modificar.component';

describe('HospitalModificarComponent', () => {
  let component: HospitalModificarComponent;
  let fixture: ComponentFixture<HospitalModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalModificarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HospitalModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
