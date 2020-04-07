import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DesignerSchemePage } from './designer-scheme.page';

describe('DesignerSchemePage', () => {
  let component: DesignerSchemePage;
  let fixture: ComponentFixture<DesignerSchemePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignerSchemePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DesignerSchemePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
