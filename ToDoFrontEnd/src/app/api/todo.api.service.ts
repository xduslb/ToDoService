import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {


  private BASE_URL: string = 'https://localhost:5001/ToDos'
  constructor(private http: HttpClient) { }

  create(todoItem: ToDoItem): Observable<ToDoItem> {
    return this.http.post<ToDoItem>(this.BASE_URL, todoItem)
  }

  getAll(): Observable<ToDoItem[]> {
    return this.http.get<ToDoItem[]>(this.BASE_URL)
  }

  update(updateTodoItem: ToDoItem): Observable<ToDoItem> {
    return this.http.put<ToDoItem>(this.BASE_URL, updateTodoItem)
  }

  findById(id: number): Observable<ToDoItem> {
    return this.http.get<ToDoItem>(this.BASE_URL +'/'+ String(id))
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.BASE_URL + `?id=${id}`)
  }
}
