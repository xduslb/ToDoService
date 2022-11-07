import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoApiService } from '../api/todo.api.service';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _selectedTodoItem: ToDoItem = {} as ToDoItem;
  private _updatingTodoItem: ToDoItem = {} as ToDoItem;
  private allTodoItems: ToDoItem[] = [];
  public errorMessage?: string;
  constructor(private todoStore: TodoStoreService, private todoApi: TodoApiService) {
  }

  public  getAllTodoItems(): Observable<ToDoItem[]> {
    return this.todoApi.getAll();
  }

  public create(todoItem: ToDoItem): void {
    this.todoApi.create(todoItem).subscribe({
      next: Response => '',
      error: error => this.errorMessage = error.errorMessage
    })

  }

  public update(updateTodoItem: ToDoItem): void {
    this.todoStore.update(updateTodoItem);
  }

  public delete(id: number): void {
    this.todoStore.delete(id);
  }

  public selectTodoItem(id: number): void {
    this._selectedTodoItem = this.todoStore.findById(id);
  }

  public selectTodoItemForUpdate(id: number): void {
    this._updatingTodoItem = Object.assign({}, this.todoStore.findById(id));
  }

  public currentTodoItem(): ToDoItem {
    return this._selectedTodoItem;
  }

  public currentUpdatingTodoItem(): ToDoItem {
    return this._updatingTodoItem;
  }

  public findById(id: number): ToDoItem {
    return this.todoStore.findById(id);
  }
}
