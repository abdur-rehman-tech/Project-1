import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

type PricingType = 'Free' | 'Paid' | 'Freemium';

type Tool = {
  id: number;
  name: string;
  category: string;
  pricing: PricingType;
  description: string;
  website: string;
  tags: string[];
  popular?: boolean;
};

@Component({
  selector: 'app-tools-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tools-list.html',
  styleUrl: './tools-list.css',
})
export class ToolsList {
  tools: Tool[] = [
    {
      id: 1,
      name: 'Docker',
      category: 'Containers',
      pricing: 'Freemium',
      description: 'Containerize apps, ship anywhere.',
      website: 'https://www.docker.com',
      tags: ['containers', 'devops'],
      popular: true,
    },
    {
      id: 2,
      name: 'Kubernetes',
      category: 'Orchestration',
      pricing: 'Free',
      description: 'Orchestrate containers at scale.',
      website: 'https://kubernetes.io',
      tags: ['k8s', 'orchestration'],
      popular: true,
    },
    {
      id: 3,
      name: 'Jenkins',
      category: 'CI/CD',
      pricing: 'Free',
      description: 'Automate builds, tests, deployments.',
      website: 'https://www.jenkins.io',
      tags: ['cicd', 'automation'],
    },
    {
      id: 4,
      name: 'GitHub Actions',
      category: 'CI/CD',
      pricing: 'Freemium',
      description: 'CI/CD workflows inside GitHub.',
      website: 'https://github.com/features/actions',
      tags: ['github', 'pipelines'],
    },
    {
      id: 5,
      name: 'Terraform',
      category: 'IaC',
      pricing: 'Freemium',
      description: 'Infrastructure as Code for cloud.',
      website: 'https://www.terraform.io',
      tags: ['iac', 'cloud'],
    },
  ];

  search = '';
  category = 'All';
  onlyPopular = false;

  get categories(): string[] {
    const set = new Set(this.tools.map(t => t.category));
    return ['All', ...Array.from(set)];
  }

  get filteredTools(): Tool[] {
    const q = this.search.trim().toLowerCase();

    return this.tools.filter(t => {
      const matchSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q));

      const matchCategory = this.category === 'All' || t.category === this.category;
      const matchPopular = !this.onlyPopular || !!t.popular;

      return matchSearch && matchCategory && matchPopular;
    });
  }

  badgeClass(p: PricingType) {
    return {
      badge: true,
      free: p === 'Free',
      paid: p === 'Paid',
      freemium: p === 'Freemium',
    };
  }

  clearFilters() {
    this.search = '';
    this.category = 'All';
    this.onlyPopular = false;
  }
}
