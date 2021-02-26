import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditRestPage } from './edit-rest.page';

describe('EditRestPage', () => {
  let component: EditRestPage;
  let fixture: ComponentFixture<EditRestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditRestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
