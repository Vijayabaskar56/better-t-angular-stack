import { CommonModule } from "@angular/common";
import { Component, type OnInit, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { todoSchema } from "@src/app/models/validation.schemas";
import { ApisService } from "@src/app/services/apis.service";
import { TanStackField, injectForm, injectStore } from "@tanstack/angular-form";
import {
	QueryClient,
	injectMutation,
	injectQuery,
} from "@tanstack/angular-query-experimental";
import { lastValueFrom } from "rxjs";

interface Todo {
	_id: string | unknown;
	text: string;
	completed: boolean;
}
@Component({
	selector: "app-landing",
	template: `
      <div class="container mx-auto px-4 py-8 max-w-2xl">
        <div class="rounded-lg p-6">
          <h1 class="text-2xl font-bold mb-1 text-white">Todo List</h1>
          <p class=" text-sm mb-6">Manage your tasks efficiently</p>
          <div class="flex gap-2 mb-6">
		  <ng-container [tanstackField]="totpForm" name="todo" #todo="field">
			  <input
              type="text"
			  [name]="todo.api.name" [id]="todo.api.name"
			  [value]="todo.api.state.value"
			  (input)="todo.api.handleChange($any($event).target.value)"
              (keydown.enter)="totpForm.handleSubmit()"
              placeholder="Add a new task..."
              class="flex-1 px-4 py-2 rounded-lg  input"
			  >
			  <button
 				type="button"
				(click)="totpForm.handleSubmit()"
                [disabled]="!canSubmit()"
              class="btn btn-primary"
			  >
			  <span *ngIf="isSubmitting()" class="loading loading-spinner"></span>
                    {{ isSubmitting() ? 'Adding...' : 'Add' }}
            </button>
			@if (todo.api.state.meta.isDirty && todo.api.state.meta.errors) {
                    @for (error of todo.api.state.meta.errors; track $index) {
                    <span class="label-text-alt text-error">{{ error.message }}</span>
                    }
                    }
		</ng-container>
          </div>
		  @if(this.queryToDo.isLoading()) {
           <div class="flex justify-center">
              <span class="loading loading-spinner"></span>
           </div>
          }
          @if(this.queryToDo.isError()) {
           <div class="flex justify-center">
              <span class="text-red-500">{{
                queryToDo.error()?.message
               }}</span>
           </div>
           }
		  @if(queryToDo.isFetched()) {
			  <ul class="space-y-2 list">
				  <li *ngFor="let todo of queryToDo.data()" class="flex items-center gap-2 p-2  group">
					  <input
					  type="checkbox"
       [checked]="todo.completed"
					  class="w-5 h-5  rounded"
					  (click)="updateToDo.mutate({_id : todo._id, completed : $any($event).target.checked , text : todo.text})"
					  >
					  <span [class.line-through]="todo.completed" [class.text-gray-500]="todo.completed" class="flex-1">
						  {{ todo.text }}
						</span>
						<button
						type="button"
						[disabled]="!todo.completed"
						class="btn btn-ghost"
						>
						<svg (click)="deleteTodo.mutate(todo._id.toString())" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
						</svg>
					</button>
				</li>
			</ul>
		}
        </div>
      </div>
    `,
	standalone: true,
	imports: [CommonModule, TanStackField],
})
export class LandingComponent implements OnInit {
	queryToDo = injectQuery(() => ({
		queryKey: ["todo"],
		queryFn: () => this._trpc.proxy.todo.getAll.query(),
	}));
	mutateToDo = injectMutation(() => ({
		mutationFn: (todo: string) => {
			return this._trpc.proxy.todo.create.mutate({ text: todo });
		},
		onSuccess: () => {
			this.queryClient.invalidateQueries({ queryKey: ["todo"] });
		},
	}));
	updateToDo = injectMutation(() => ({
		mutationFn: (todo: Todo) => {
			return this._trpc.proxy.todo.toggle.mutate({
				id: String(todo._id),
				completed: todo.completed,
			});
		},
		onSuccess: () => {
			this.queryClient.invalidateQueries({ queryKey: ["todo"] });
		},
	}));
	deleteTodo = injectMutation(() => ({
		mutationFn: (id: string) => {
			return this._trpc.proxy.todo.delete.mutate({ id: id });
		},
		onSuccess: () => {
			this.queryClient.invalidateQueries({ queryKey: ["todo"] });
		},
	}));
	private _trpc = inject(ApisService);
	queryClient = inject(QueryClient);
	totpForm = injectForm({
		defaultValues: {
			todo: "",
		},
		validators: {
			onChange: todoSchema,
		},
		onSubmit: async ({ value }) => {
			this.mutateToDo.mutate(value.todo);
		},
	});
	canSubmit = injectStore(this.totpForm, (state) => state.canSubmit);
	isSubmitting = injectStore(this.totpForm, (state) => state.isSubmitting);

	ngOnInit(): void {
		this._trpc.proxy.privateData.query();
	}
	addTodo(event: Event) {
		event.preventDefault();
		const target = event.target as HTMLInputElement;
		const input = target.querySelector("input");
		if (input) {
			this.mutateToDo.mutate(input.value);
		}
	}
}
