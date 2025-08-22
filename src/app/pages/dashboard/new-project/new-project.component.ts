import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  projectForm: FormGroup;
  users: any[] = [];
  selectedMembers: any[] = [];
  isSubmitting = false;
  currentStep = 1;
  totalSteps = 3;

  readonly priorityOptions = [
    { value: 'low', label: 'Low Priority', color: '#10b981', icon: 'arrow-down' },
    { value: 'medium', label: 'Medium Priority', color: '#f59e0b', icon: 'minus' },
    { value: 'high', label: 'High Priority', color: '#ef4444', icon: 'arrow-up' }
  ];

  readonly statusOptions = [
    { value: 'active', label: 'Active', color: '#3b82f6' },
    { value: 'paused', label: 'Paused', color: '#6b7280' },
    { value: 'completed', label: 'Completed', color: '#10b981' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.projectForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      description: [''],
      priority: ['medium', Validators.required],
      status: ['active', Validators.required],
      websiteUrl: ['', Validators.pattern(/^https?:\/\/.+/)],
      startDate: [''],
      endDate: [''],
      tags: ['']
    });
  }

  private loadUsers(): void {
    // Dummy data for users
    this.users = [
      {
        id: 1,
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        avatar: null
      },
      {
        id: 2,
        fullName: 'Jane Smith',
        email: 'jane.smith@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      {
        id: 3,
        fullName: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        avatar: null
      },
      {
        id: 4,
        fullName: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      {
        id: 5,
        fullName: 'David Brown',
        email: 'david.brown@example.com',
        avatar: null
      },
      {
        id: 6,
        fullName: 'Emily Davis',
        email: 'emily.davis@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      }
    ];
  }

  onMemberToggle(user: any): void {
    const index = this.selectedMembers.findIndex(m => m.id === user.id);
    if (index === -1) {
      this.selectedMembers.push(user);
    } else {
      this.selectedMembers.splice(index, 1);
    }
  }

  isMemberSelected(user: any): boolean {
    return this.selectedMembers.some(m => m.id === user.id);
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  async onSubmit(): Promise<void> {
    if (this.projectForm.invalid || this.isSubmitting) {
      return;
    }

    try {
      this.isSubmitting = true;

      const formData = {
        ...this.projectForm.value,
        memberIds: this.selectedMembers.map(m => m.id)
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Dummy response
      const response = {
        data: {
          id: Math.floor(Math.random() * 1000) + 1
        }
      };
      
      console.log('Project created:', formData);
      
      // Navigate to the created project
      this.router.navigate(['/dashboard/project'], { 
        queryParams: { id: response.data.id } 
      });
    } catch (error) {
      console.error('Error creating project:', error);
      // Handle error (show toast, etc.)
    } finally {
      this.isSubmitting = false;
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }

  getStepTitle(): string {
    switch (this.currentStep) {
      case 1: return 'Basic Information';
      case 2: return 'Project Settings';
      case 3: return 'Team Members';
      default: return '';
    }
  }

  getStepDescription(): string {
    switch (this.currentStep) {
      case 1: return 'Tell us about your project';
      case 2: return 'Configure project settings';
      case 3: return 'Add team members';
      default: return '';
    }
  }

  isStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.projectForm.get('name')?.valid || false;
      case 2:
        return (this.projectForm.get('priority')?.valid && this.projectForm.get('status')?.valid) || false;
      case 3:
        return true; // Members are optional
      default:
        return false;
    }
  }

  // Helper methods for template
  getInitials(fullName: string): string {
    return fullName.split(' ').map(n => n[0]).join('');
  }

  getPriorityOption(value: string) {
    return this.priorityOptions.find(p => p.value === value);
  }

  getStatusOption(value: string) {
    return this.statusOptions.find(s => s.value === value);
  }
}