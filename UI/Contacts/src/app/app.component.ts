import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable'
import { Contact } from '../models/contact.model'
import { AsyncPipe } from '@angular/common'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  http = inject(HttpClient);
  contactsForm = new FormGroup({
    name: new FormControl<string>(''),
    email: new FormControl<string | null>(null),
    phone: new FormControl<string>(''),
    favorite: new FormControl<boolean>(false)
  })
  contacts$ = this.getContacts();

  onFormSubmit() {
    console.log(this.contactsForm.value)
  }

  private getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:5070/api/contacts');
  }
}
 