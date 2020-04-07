import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ColorCollectionsPage } from './color-collections.page';

describe('ColorCollectionsPage', () => {
  let component: ColorCollectionsPage;
  let fixture: ComponentFixture<ColorCollectionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorCollectionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ColorCollectionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
