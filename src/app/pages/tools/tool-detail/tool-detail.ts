import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tool-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tool-detail.html',
  styleUrl: './tool-detail.css',
})
export class ToolDetail {
  id = 0;

  constructor(private route: ActivatedRoute) {
    this.id = Number(this.route.snapshot.paramMap.get('id') || 0);
  }
}
