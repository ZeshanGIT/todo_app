import { Component } from '@angular/core';
import { TodoService } from '../todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos: string[] = [];

  constructor(private todoService: TodoService) {
    todoService.getTodos().subscribe({
      next: (todos) => {
        return (this.todos = todos);
      },
      error: (err) => alert('Error getting lists'),
    });
  }
}
