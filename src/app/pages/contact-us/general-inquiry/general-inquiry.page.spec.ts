import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneralInquiryPage } from './general-inquiry.page';

describe('GeneralInquiryPage', () => {
  let component: GeneralInquiryPage;
  let fixture: ComponentFixture<GeneralInquiryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralInquiryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralInquiryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
