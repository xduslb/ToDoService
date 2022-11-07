import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { ToDoItem } from '../../model/ToDoItem';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-todo-item',
  templateUrl: './update-todo-item.component.html',
  styleUrls: ['./update-todo-item.component.scss']
})
export class UpdateTodoItemComponent implements OnInit {

  todoItem: ToDoItem = new ToDoItem(0, '', '', false);

  constructor(public todoService: TodoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { 
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.todoItem = this.todoService.findById(Number(id));
  }

  update(): void {
    this.todoService.update(this.todoItem);
    this.router.navigate(['todos'])
  }
}
