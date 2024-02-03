import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TodoService } from './services/todo.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  providers:[HttpClientModule,HttpClient,BrowserModule,TodoService],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sginal_practice';
}
