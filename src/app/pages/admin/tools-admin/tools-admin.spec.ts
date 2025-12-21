import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsAdmin } from './tools-admin';

describe('ToolsAdmin', () => {
  let component: ToolsAdmin;
  let fixture: ComponentFixture<ToolsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolsAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
