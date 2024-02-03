import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPost, TodoService } from 'src/app/services/todo.service';
import { take} from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  todoService = inject(TodoService)

  get todos(){
    return this.todoService.todos
  }
  
  delete(todoId: number | undefined) {
    console.log(todoId)
    if(!todoId)return ;
      this.todoService.deletePost(todoId).pipe(take(1)).subscribe()
  
  }
  constructor(){
    this.todoService.getPosts().pipe(take(1)).subscribe()
  }
  fb = inject(FormBuilder)
    todoForm = this.fb.group({
    id: [-1],
    title: [''],
    author: ['']
  })

  // todoForm: FormGroup = new FormGroup({
  //   id: new FormControl(-1),
  //   title: new FormControl(''),
  //   author: new FormControl('')
  // })

  edit(todo: IPost){
    this.todoForm.patchValue(todo)

  }
  addOrUpdateTodo(){
    if(this.todoForm.invalid) return;
    const todo = this.todoForm.value as IPost
    this.todoForm.value.id === -1 ?  this._createTodo(todo) : this._updateTodo(todo)   
  }

  private _createTodo(todo: IPost){
   this.todoService.createPosts(todo).pipe(take(1)).subscribe(()=>{
    this.todoForm.reset({id: -1})
   })
  }

  private _updateTodo(todo: IPost){
    this.todoService.updatePosts(todo).pipe(take(1)).subscribe(()=>{
      this.todoForm.reset({id: -1})
     })   
    }
}
