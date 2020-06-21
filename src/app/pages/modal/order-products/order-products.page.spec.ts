import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderProductsPage } from './order-products.page';

describe('OrderProductsPage', () => {
  let component: OrderProductsPage;
  let fixture: ComponentFixture<OrderProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderProductsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
