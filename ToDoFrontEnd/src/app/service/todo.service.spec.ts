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
    httpClientSpy =  jasmine.createSpyObj('HttpClient', ['post', 'get', 'put']);
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

  it('should create todoItem via mockHttp post', () => {
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
});
