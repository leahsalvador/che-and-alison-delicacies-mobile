import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpecsWriterGuidePage } from './specs-writer-guide.page';

describe('SpecsWriterGuidePage', () => {
  let component: SpecsWriterGuidePage;
  let fixture: ComponentFixture<SpecsWriterGuidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecsWriterGuidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecsWriterGuidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
