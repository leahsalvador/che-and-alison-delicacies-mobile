import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GameTabPage } from './game-tab.page';

describe('GameTabPage', () => {
  let component: GameTabPage;
  let fixture: ComponentFixture<GameTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GameTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
