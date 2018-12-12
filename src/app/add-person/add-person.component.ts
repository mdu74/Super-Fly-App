import { Component } from '@angular/core';
import { PeopleService } from '../services/people.service';
import {Person} from '../domain-model/person';
import swal from 'node_modules/sweetalert2/dist/sweetalert2.all.min.js';
import * as _ from 'lodash';

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
  public created: number;
  public views: number = 0;

  constructor(private _peopleServices: PeopleService) {  }

  addPerson(){
    let person = new Person();

    person.name = this.name;
    person.surname = this.surname;
    person.description = this.description;

    debugger;

    if( _.isUndefined(this.created) || _.isNull(this.created)){
      person.created = Date.now();
    }else{
      person.created = this.created;
    }

    this._peopleServices.createNewPerson(person)
  }
}
