import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../todo.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() index: number = 0;
  todo: string = 'TASK';
  updatedTodo = new FormControl<string>('');

  isEditMode: boolean = false;

  constructor(private todoService: TodoService) {}
  ngOnInit(): void {
    this.todoService.getTodo(this.index).subscribe({
      next: (t) => {
        console.log(this.index);
        console.log(t);
        return (this.todo = t);
      },
      error: (_) => {
        alert(`Error getting this item ${this.index}`);
        return `Error getting this item ${this.index}`;
      },
    });
  }

  deleteTodo() {
    this.todoService.deleteTodo(this.index);
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.updatedTodo.setValue(this.todo);
    }
  }

  editTodo(event: Event) {
    event.preventDefault();
    if (this.updatedTodo.value)
      this.todoService.editTodo(this.index, this.updatedTodo.value);
    this.toggleEditMode();
  }
}
