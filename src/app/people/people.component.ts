import { Component } from '@angular/core';
import { PeopleService } from '../services/people.service';
import { Observable } from 'rxjs';
import { Person } from '../domain-model/person';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  providers: [PeopleService]
})

export class PeopleComponent  {
 public people: Observable<Person[]>;

  constructor(private _peopleServices: PeopleService) {  }

  ngOnInit() {
    this.people = this._peopleServices.getAllPeople();
  }

  filterEvent($event){
    this.people = this._peopleServices.getAllPeopleOrderedBy($event);
  }

  delete(person: Person){
    debugger;
    this._peopleServices.deletePerson(person.personId);
  }
}
