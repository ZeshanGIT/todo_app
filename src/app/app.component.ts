import { Component } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FormControl } from '@angular/forms';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todo_app';
  newTodo = new FormControl<string>('');
  constructor(private todoService: TodoService) {}
  addTodo(event: Event) {
    event.preventDefault();
    console.log(`Adding task ${this.newTodo.toString()}`);
    if (this.newTodo.value) this.todoService.addTodo(this.newTodo.value);
    this.newTodo.setValue('');
  }
}
