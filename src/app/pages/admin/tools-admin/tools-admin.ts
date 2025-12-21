import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';

import { ToolsService, Tool, PricingType } from '../../../service/tool';

@Component({
  selector: 'app-tools-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tools-admin.html',
  styleUrl: './tools-admin.css',
})
export class ToolsAdmin {
  tools: Tool[] = [];
  loading = false;
  errorMsg = '';

  form: FormGroup;
  editingId: number | null = null;

  constructor(private fb: FormBuilder, private api: ToolsService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      pricing: ['', Validators.required],
      website: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/i)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      popular: [false],
      tagsText: [''], // tags comma separated
    });

    this.load();
  }

  load() {
    this.loading = true;
    this.errorMsg = '';
    this.api.getAll().subscribe({
      next: (data) => { this.tools = data || []; this.loading = false; },
      error: () => { this.errorMsg = 'Failed to load tools from API'; this.loading = false; }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;

    const payload: Omit<Tool, 'id'> = {
      name: v.name,
      category: v.category,
      pricing: v.pricing as PricingType,
      website: v.website,
      description: v.description,
      popular: !!v.popular,
      tags: (v.tagsText || '')
        .split(',')
        .map((x: string) => x.trim())
        .filter((x: string) => x.length > 0),
    };

    this.loading = true;
    this.errorMsg = '';

    if (this.editingId) {
      this.api.update(this.editingId, payload).subscribe({
        next: () => { this.reset(); this.load(); },
        error: () => { this.errorMsg = 'Update failed'; this.loading = false; }
      });
    } else {
      this.api.create(payload).subscribe({
        next: () => { this.reset(); this.load(); },
        error: () => { this.errorMsg = 'Create failed'; this.loading = false; }
      });
    }
  }

  edit(t: Tool) {
    this.editingId = t.id;
    this.form.patchValue({
      name: t.name,
      category: t.category,
      pricing: t.pricing,
      website: t.website,
      description: t.description,
      popular: t.popular,
      tagsText: (t.tags || []).join(', ')
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  removeTool(id: number) {
    if (!confirm('Delete this tool?')) return;

    this.loading = true;
    this.errorMsg = '';

    this.api.delete(id).subscribe({
      next: () => { this.load(); },
      error: () => { this.errorMsg = 'Delete failed'; this.loading = false; }
    });
  }

  reset() {
    this.form.reset({ popular: false, tagsText: '' });
    this.editingId = null;
    this.loading = false;
  }

  badgeClass(p: PricingType) {
    return {
      badge: true,
      free: p === 'Free',
      paid: p === 'Paid',
      freemium: p === 'Freemium',
    };
  }

  // getters
  get name() { return this.form.get('name'); }
  get category() { return this.form.get('category'); }
  get pricing() { return this.form.get('pricing'); }
  get website() { return this.form.get('website'); }
  get description() { return this.form.get('description'); }
}
