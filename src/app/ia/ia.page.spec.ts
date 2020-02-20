import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IaPage } from './ia.page';

describe('IaPage', () => {
  let component: IaPage;
  let fixture: ComponentFixture<IaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
