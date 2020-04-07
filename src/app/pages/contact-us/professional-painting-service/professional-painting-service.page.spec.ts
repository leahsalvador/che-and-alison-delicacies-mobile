import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfessionalPaintingServicePage } from './professional-painting-service.page';

describe('ProfessionalPaintingServicePage', () => {
  let component: ProfessionalPaintingServicePage;
  let fixture: ComponentFixture<ProfessionalPaintingServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalPaintingServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalPaintingServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
