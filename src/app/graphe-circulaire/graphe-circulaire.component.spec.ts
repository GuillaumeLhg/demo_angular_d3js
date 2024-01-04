import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrapheCirculaireComponent } from './graphe-circulaire.component';

describe('GrapheCirculaireComponent', () => {
  let component: GrapheCirculaireComponent;
  let fixture: ComponentFixture<GrapheCirculaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrapheCirculaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrapheCirculaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
