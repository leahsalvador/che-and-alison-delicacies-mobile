import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ColorCapturePage } from './color-capture.page';

describe('ColorCapturePage', () => {
  let component: ColorCapturePage;
  let fixture: ComponentFixture<ColorCapturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorCapturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ColorCapturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
