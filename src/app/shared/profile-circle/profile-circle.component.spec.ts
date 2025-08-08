import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCircleComponent } from './profile-circle.component';

describe('ProfileCircleComponent', () => {
  let component: ProfileCircleComponent;
  let fixture: ComponentFixture<ProfileCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCircleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
