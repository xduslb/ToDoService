import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { TodoApiService } from '../api/todo.api.service';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';
import { TodoService } from './todo.service';

describe('TodoService', () => {

  let service: TodoService;
  let todoStoreService: TodoStoreService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy =  jasmine.createSpyObj('HttpClient', ['post', 'get', 'put', 'delete']);
    todoStoreService = new TodoStoreService();
    TestBed.configureTestingModule({
      providers:[
        TodoApiService,
        {provide: HttpClient, useValue: httpClientSpy}
      ]

    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create todoItem via mockHttp post', () => {
    // given
    const todoItem = new ToDoItem(1, 'title', 'description', true);
    httpClientSpy.post.and.returnValue(of({})
    )
    // when 
    service.create(todoItem);
    // then
    expect(httpClientSpy.post).toHaveBeenCalledWith('https://localhost:5001/ToDos', todoItem);
  });

  it('should response error when create failed', () => {
    // given
    const todoItem = new ToDoItem(1, 'title', 'description', true);
    httpClientSpy.post.and.returnValue(throwError(() => ({ errorMessage: 'create failed.' })));
    // when
    service.create(todoItem).subscribe({
      next: _ => { },
      // then
      error: error => expect(error.errorMessage).toEqual('create failed.')
    });
  });

  it('should create todoItem via mockHttp get', () => {
    // given
    httpClientSpy.get.and.returnValue(of({})
    )
    // when 
    service.findById(0);
    // then
    expect(httpClientSpy.get).toHaveBeenCalledWith('https://localhost:5001/ToDos/0');
  });

  it('should response error when get by id failed', () => {
    // given
    httpClientSpy.get.and.returnValue(throwError(() => ({ errorMessage: 'get failed.' })));
    // when
    service.findById(0).subscribe({
      next: _ => { },
      // then
      error: error => expect(error.errorMessage).toEqual('get failed.')
    });
  });

  it('should update todoItem via mockHttp put', () => {
    // given
    const todoItem = new ToDoItem(1, 'title', 'description', true);
    httpClientSpy.get.and.returnValue(of({})
    )
    // when 
    service.update(todoItem);
    // then
    expect(httpClientSpy.put).toHaveBeenCalledWith('https://localhost:5001/ToDos', todoItem);
  });

  it('should update error when get by id failed', () => {
    // given
    const todoItem = new ToDoItem(1, 'title', 'description', true);
    httpClientSpy.put.and.returnValue(throwError(() => ({ errorMessage: 'update failed.' })));
    // when
    service.update(todoItem).subscribe({
      next: _ => { },
      // then
      error: error => expect(error.errorMessage).toEqual('update failed.')
    });
  });

  it('should delete todoItem via mockHttp delete', () => {
    // given
    // when 
    service.delete(0);
    // then
    expect(httpClientSpy.delete).toHaveBeenCalledWith('https://localhost:5001/ToDos?id=0');
  });

  it('should delete error when delete failed', () => {
    // given
    const todoItem = new ToDoItem(1, 'title', 'description', true);
    httpClientSpy.delete.and.returnValue(throwError(() => ({ errorMessage: 'delete failed.' })));
    // when
    service.delete(0).subscribe({
      next: _ => { },
      // then
      error: error => expect(error.errorMessage).toEqual('delete failed.')
    });
  });
});
