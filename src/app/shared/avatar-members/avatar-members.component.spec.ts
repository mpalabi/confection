import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarMembersComponent } from './avatar-members.component';

describe('AvatarMembersComponent', () => {
  let component: AvatarMembersComponent;
  let fixture: ComponentFixture<AvatarMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
