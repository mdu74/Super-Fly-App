import { Component } from '@angular/core';
import { PeopleService } from '../services/people.service';
import {Person} from '../domain-model/person';
import swal from 'node_modules/sweetalert2/dist/sweetalert2.all.min.js';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})

export class AddPersonComponent {
  public isCollapsed = true;
  person: Person = new Person();

  public name: string = '';
  public surname: string = '';
  public description: string = '';
  public display: boolean = true;
  public created: number =  Date.now();
  public views: number = 0;

  constructor(private _peopleServices: PeopleService) {  }

  addPerson(){
    debugger;
    let person = new Person();
    person.name = this.name;
    person.surname = this.surname;
    this._peopleServices.createNewPerson(person)
    /*
    I'll have to sort this out because I don't know how to user the FireStore service to add stuff
    */
  }
}
