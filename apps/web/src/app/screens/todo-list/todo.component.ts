import { CommonModule } from "@angular/common";
import { Component, type OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { injectTrpcClient } from "../../utils/trpc-client";


interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
@Component({
  selector: "app-todo",
  template: `
	 <div class="min-h-screen bg-black">
      <nav class="border-b border-gray-800 px-4">
        <ul class="flex space-x-4">
          <li><a href="#" class="py-4 inline-block text-gray-400">Home</a></li>
          <li><a href="#" class="py-4 inline-block text-white">Todos</a></li>
          <li><a href="#" class="py-4 inline-block text-gray-400">Dashboard</a></li>
        </ul>
      </nav>

      <div class="container mx-auto px-4 py-8 max-w-2xl">
        <div class="bg-gray-900 rounded-lg p-6">
          <h1 class="text-2xl font-bold mb-1 text-white">Todo List</h1>
          <p class="text-gray-400 text-sm mb-6">Manage your tasks efficiently</p>

          <div class="flex gap-2 mb-6">
            <input
              type="text"
              [(ngModel)]="newTodo"
              (keyup.enter)="addTodo()"
              placeholder="Add a new task..."
              class="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
            >
            <button
              (click)="addTodo()"
              class="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 focus:outline-none"
            >
              Add
            </button>
          </div>

          <ul class="space-y-2">
            <li *ngFor="let todo of todos" class="flex items-center gap-2 p-2 rounded-lg bg-gray-800 group">
              <input
                type="checkbox"
                [(ngModel)]="todo.completed"
                class="w-5 h-5 bg-gray-700 border-gray-600 rounded"
              >
              <span [class.line-through]="todo.completed" [class.text-gray-500]="todo.completed" class="flex-1">
                {{ todo.text }}
              </span>
              <button
                (click)="deleteTodo(todo)"
                class="text-gray-500 hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>`,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class TodoComponent implements OnInit {
  todos = signal<Todo[]>([])
  newTodo = '';
  private _trpc = injectTrpcClient();

  ngOnInit(): void {
    this._trpc.todo.getAll.query().subscribe({
      complete: () => { },
      next: (data) => { },
      error: () => { }
    })
  }
  addTodo() {
    if (this.newTodo.trim()) {
      this._trpc.todo.create.mutate({ text: '' }).subscribe({
        complete: () => { },
        next: (data) => { },
        error: () => { }
      })
      this.todos.update(todos => [
        ...todos,
        {
          id: Date.now(),
          text: this.newTodo.trim(),
          completed: false
        }
      ]);
      this.newTodo = '';
    }
  }

  deleteTodo(todo: Todo) {
    this._trpc.todo.delete.mutate({ id: 12 }).subscribe({
      complete: () => { },
      next: (data) => { },
      error: () => { }
    })
  }

  updateTodo(todo: Todo) {
    this._trpc.todo.toggle.mutate({ id: 1, completed: false }).subscribe({
      complete: () => { },
      next: (data) => { },
      error: () => { }
    })
  }

}
