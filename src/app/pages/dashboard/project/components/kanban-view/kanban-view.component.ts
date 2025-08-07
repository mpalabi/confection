import { Component, signal, computed } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarMembersComponent } from "../../../../../shared/avatar-members/avatar-members.component";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Med' | 'High';
  category: string;
  assignees: any[];
  attachments: number;
  comments: number;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

export interface TeamMember {
  initials: string;
  name: string;
  avatar?: string;
}


@Component({
  selector: 'app-kanban-view',
  imports: [CommonModule, NgClass, FormsModule, DragDropModule, AvatarMembersComponent],
  templateUrl: './kanban-view.component.html',
  styleUrl: './kanban-view.component.scss'
})
export class KanbanViewComponent {

  columns = signal<Column[]>([]);

  teamMembers = signal<any[]>([
    { initials: 'BS', name: 'Brooklyn Simmons' },
    { initials: 'JD', name: 'John Doe' },
    { initials: 'SM', name: 'Sarah Miller' },
    { initials: 'MJ', name: 'Mike Johnson' },
    { initials: 'AL', name: 'Alice Johnson' },
    { initials: 'BW', name: 'Bob Wilson' },
    { initials: 'BW', name: 'Bob Wilson' },
    { initials: 'BW', name: 'Bob Wilson' },
    { initials: 'BW', name: 'Bob Wilson' },
    { initials: 'BW', name: 'Bob Wilson' }
  ]);

  projectTitle = signal('SaaS Website Project');
  showAddColumnModal = signal(false);
  showAddTaskModal = signal(false);
  showEditTaskModal = signal(false);
  showTaskDetails = signal(false);
  selectedTask = signal<Task | null>(null);
  isLoading = signal(false);

  // Computed values
  additionalMembersCount = computed(() => Math.max(0, this.teamMembers().length - 4));

  // Form data
  newColumn = { title: '', color: '#667eea' };
  newTask: Partial<Task> = {
    title: '',
    description: '',
    category: 'Web Design',
    priority: 'Med',
    assignees: [],
    attachments: 0,
    comments: 0
  };
  selectedColumnId = '';
  editingTaskId = '';

  columnColors = signal([
    '#667eea', '#f093fb', '#4facfe', '#43e97b',
    '#fa709a', '#ff9a9e', '#a8edea', '#ffecd2',
    '#96fbc4', '#f9f047', '#ff6b6b', '#4ecdc4'
  ]);

  ngOnInit() {
    this.initializeDummyData();
  }

  initializeDummyData() {
    const dummyColumns: any[] = [
      {
        id: 'in-progress',
        title: 'In Progress',
        color: '#667eea',
        tasks: [
          {
            id: '1',
            title: 'Crafting the key features',
            description: 'Create the most important features and benefits of the SaaS products. Focus on user experience and core functionality that drives value.',
            priority: 'High',
            category: 'Web Design',
            assignees: [{ initials: 'BS', name: 'Brooklyn Simmons' },
            { initials: 'JD', name: 'John Doe' },
            { initials: 'SM', name: 'Sarah Miller' },
            { initials: 'MJ', name: 'Mike Johnson' },
            { initials: 'AL', name: 'Alice Johnson' },],
            attachments: 2,
            comments: 3
          },
          {
            id: '2',
            title: 'Integrate analytics',
            description: 'Set up analytics tools to track user behavior and conversion rates. Analyze the data to make data-driven improvements.',
            priority: 'Med',
            category: 'Development',
            assignees: [
              { initials: 'BS', name: 'Brooklyn Simmons' },
              { initials: 'JD', name: 'John Doe' },
              { initials: 'SM', name: 'Sarah Miller' },
              { initials: 'MJ', name: 'Mike Johnson' },
              { initials: 'AL', name: 'Alice Johnson' },
            ],
            attachments: 0,
            comments: 1
          }
        ]
      },
      {
        id: 'in-review',
        title: 'In Review',
        color: '#f093fb',
        tasks: [
          {
            id: '3',
            title: 'Crafting the compelling headline',
            description: 'Create a strong and attention-grabbing headline that communicates the value of the SaaS product or service.',
            priority: 'Med',
            category: 'Content',
            assignees: [{ initials: 'BS', name: 'Brooklyn Simmons' },
            { initials: 'JD', name: 'John Doe' },
            { initials: 'SM', name: 'Sarah Miller' },
            { initials: 'MJ', name: 'Mike Johnson' },
            { initials: 'AL', name: 'Alice Johnson' },],
            attachments: 2,
            comments: 3
          },
          {
            id: '4',
            title: 'Testimonials and social proof',
            description: 'Include customer testimonials, case studies, or user reviews to build trust and credibility.',
            priority: 'Med',
            category: 'Marketing',
            assignees: [{ initials: 'BS', name: 'Brooklyn Simmons' },
            { initials: 'JD', name: 'John Doe' },
            { initials: 'SM', name: 'Sarah Miller' },
            { initials: 'MJ', name: 'Mike Johnson' },
            { initials: 'AL', name: 'Alice Johnson' },],
            attachments: 1,
            comments: 2
          }
        ]
      },
      {
        id: 'done',
        title: 'Done',
        color: '#43e97b',
        tasks: [
          {
            id: '5',
            title: 'Brainstorming',
            description: 'Clarify the landing page\'s objective - lead generation, product promotion, or a specific campaign.',
            priority: 'Low',
            category: 'Strategy',
            assignees: [{ initials: 'BS', name: 'Brooklyn Simmons' },
            { initials: 'JD', name: 'John Doe' },
            { initials: 'SM', name: 'Sarah Miller' },
            { initials: 'MJ', name: 'Mike Johnson' },
            { initials: 'AL', name: 'Alice Johnson' },],
            attachments: 2,
            comments: 3
          },
          {
            id: '6',
            title: 'Wireframing',
            description: 'Create sections with concise, persuasive copy and relevant icons or graphics for enhanced understanding and visual appeal.',
            priority: 'Low',
            category: 'Design',
            assignees: [{ initials: 'BS', name: 'Brooklyn Simmons' },
            { initials: 'JD', name: 'John Doe' },
            { initials: 'SM', name: 'Sarah Miller' },
            { initials: 'MJ', name: 'Mike Johnson' },
            { initials: 'AL', name: 'Alice Johnson' },],
            attachments: 3,
            comments: 1
          }
        ]
      }
    ];

    this.columns.set(dummyColumns);
  }

  onTaskDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    // Update the signal to trigger change detection
    this.columns.set([...this.columns()]);
  }

  toggleAddColumnModal() {
    this.showAddColumnModal.update(show => !show);
    if (!this.showAddColumnModal()) {
      this.resetNewColumn();
    }
  }

  toggleAddTaskModal() {
    this.showAddTaskModal.update(show => !show);
    if (!this.showAddTaskModal()) {
      this.resetNewTask();
    }
  }

  openAddTaskModal(columnId?: string) {
    if (columnId) {
      this.selectedColumnId = columnId;
    }
    this.showAddTaskModal.set(true);
  }

  closeTaskModals() {
    this.showAddTaskModal.set(false);
    this.showEditTaskModal.set(false);
    this.resetNewTask();
  }

  closeTaskDetails() {
    this.showTaskDetails.set(false);
    this.selectedTask.set(null);
  }

  async addColumn() {
    if (this.newColumn.title.trim()) {
      this.isLoading.set(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const newCol: Column = {
        id: this.generateId(),
        title: this.newColumn.title,
        color: this.newColumn.color,
        tasks: []
      };

      this.columns.update(cols => [...cols, newCol]);
      this.resetNewColumn();
      this.showAddColumnModal.set(false);
      this.isLoading.set(false);
    }
  }

  async addTask() {
    if (this.newTask.title?.trim() && this.selectedColumnId) {
      this.isLoading.set(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const task: Task = {
        id: this.generateId(),
        title: this.newTask.title!,
        description: this.newTask.description || '',
        priority: this.newTask.priority as 'Low' | 'Med' | 'High',
        category: this.newTask.category || 'Web Design',
        assignees: this.newTask.assignees || [],
        attachments: this.newTask.attachments || 0,
        comments: this.newTask.comments || 0
      };

      this.columns.update(cols =>
        cols.map(col =>
          col.id === this.selectedColumnId
            ? { ...col, tasks: [...col.tasks, task] }
            : col
        )
      );

      this.resetNewTask();
      this.showAddTaskModal.set(false);
      this.isLoading.set(false);
    }
  }

  editColumn(column: Column) {
    const newTitle = prompt('Enter new column title:', column.title);
    if (newTitle && newTitle.trim() && newTitle !== column.title) {
      this.columns.update(cols =>
        cols.map(col =>
          col.id === column.id
            ? { ...col, title: newTitle.trim() }
            : col
        )
      );
    }
  }

  deleteColumn(columnId: string) {
    const column = this.columns().find(col => col.id === columnId);
    if (column && confirm(`Are you sure you want to delete "${column.title}"? This will also delete all tasks in this column.`)) {
      this.columns.update(cols => cols.filter(col => col.id !== columnId));
    }
  }

  selectTask(task: Task) {
    this.selectedTask.set(task);
    this.showTaskDetails.set(true);
  }

  editTask(task: Task) {
    this.editingTaskId = task.id;
    this.newTask = { ...task };

    // Find the column containing this task
    const column = this.columns().find(col =>
      col.tasks.some(t => t.id === task.id)
    );
    if (column) {
      this.selectedColumnId = column.id;
    }

    this.showEditTaskModal.set(true);
    this.showTaskDetails.set(false);
  }

  async updateTask() {
    if (this.newTask.title?.trim() && this.selectedColumnId && this.editingTaskId) {
      this.isLoading.set(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const updatedTask: Task = {
        id: this.editingTaskId,
        title: this.newTask.title!,
        description: this.newTask.description || '',
        priority: this.newTask.priority as 'Low' | 'Med' | 'High',
        category: this.newTask.category || 'Web Design',
        assignees: this.newTask.assignees || [],
        attachments: this.newTask.attachments || 0,
        comments: this.newTask.comments || 0
      };

      // Remove task from current column and add to selected column
      this.columns.update(cols => {
        // First, remove the task from all columns
        const colsWithoutTask = cols.map(col => ({
          ...col,
          tasks: col.tasks.filter(task => task.id !== this.editingTaskId)
        }));

        // Then add the updated task to the selected column
        return colsWithoutTask.map(col =>
          col.id === this.selectedColumnId
            ? { ...col, tasks: [...col.tasks, updatedTask] }
            : col
        );
      });

      this.resetNewTask();
      this.showEditTaskModal.set(false);
      this.isLoading.set(false);
    }
  }

  deleteTask(taskId: string) {
    const task = this.findTaskById(taskId);
    if (task && confirm(`Are you sure you want to delete "${task.title}"?`)) {
      this.columns.update((cols: any) =>
        cols.map((col: any) => ({
          ...col,
          tasks: col.tasks.filter((task: any) => task.id !== taskId)
        }))
      );

      if (this.selectedTask()?.id === taskId) {
        this.closeTaskDetails();
      }
    }
  }

  toggleAssignee(memberName: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const assignees = this.newTask.assignees || [];

    if (checked && !assignees.includes(memberName)) {
      this.newTask.assignees = [...assignees, memberName];
    } else if (!checked && assignees.includes(memberName)) {
      this.newTask.assignees = assignees.filter((name: any) => name !== memberName);
    }
  }

  getStatusClass(columnId: string): string {
    const statusMap: { [key: string]: string } = {
      'in-progress': 'in-progress',
      'in-review': 'in-review',
      'done': 'done'
    };
    return statusMap[columnId] || 'in-progress';
  }

  getInitials(name: string): string {
    return name.split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  trackByColumn(index: number, column: Column): string {
    return column.id;
  }

  trackByTask(index: number, task: Task): string {
    return task.id;
  }

  private findTaskById(taskId: string): Task | undefined {
    for (const column of this.columns()) {
      const task = column.tasks.find(t => t.id === taskId);
      if (task) return task;
    }
    return undefined;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private resetNewColumn() {
    this.newColumn = {
      title: '',
      color: '#667eea'
    };
  }

  private resetNewTask() {
    this.newTask = {
      title: '',
      description: '',
      category: 'Web Design',
      priority: 'Med',
      assignees: [],
      attachments: 0,
      comments: 0
    };
    this.selectedColumnId = '';
    this.editingTaskId = '';
  }

}
