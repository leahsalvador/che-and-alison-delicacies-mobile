import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapMarkerPage } from './map-marker.page';

describe('MapMarkerPage', () => {
  let component: MapMarkerPage;
  let fixture: ComponentFixture<MapMarkerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapMarkerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapMarkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
