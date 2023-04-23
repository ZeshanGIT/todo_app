import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  getTodos(): Observable<string[]> {
    return this.todos.asObservable();
  }

  getTodo(index: number): Observable<string> {
    return this.todos.asObservable().pipe(
      map((todos: string[]) => {
        if (todos.length > index) {
          return todos[index];
        } else {
          throw new Error('Todo index exceeds the limit');
        }
      })
    );
  }

  addTodo(todo: string) {
    this.todos.next([...this.todos.getValue(), todo]);
  }

  deleteTodo(index: number) {
    this.todos.next(this.todos.getValue().filter((_, i) => i !== index));
  }

  editTodo(index: number, todo: string) {
    const udpatedTodos = this.todos
      .getValue()
      .map((t, i) => (i == index ? todo : t));
    this.todos.next(udpatedTodos);
  }
}
