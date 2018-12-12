import { Component } from '@angular/core';
import { PeopleService } from '../services/people.service';
import { Observable } from 'rxjs';
import { Person } from '../domain-model/person';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import swal from 'node_modules/sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  providers: [PeopleService]
})

export class PeopleComponent  {
  public people: Observable<Person[]>;
  public editFirstName: string;
  public editSurname: string;
  public editDescription: string;
  public editDisplay: string;
  public editView: string;
  public editCreated: number;

  constructor(private _peopleServices: PeopleService, private modalService: NgbModal) {  }

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

  // Modal
  edit(content) {
    let person = this._peopleServices.getPersonBy('9AQJTLWumTfo2OOApJDc');
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(success => 
      swal('Saved!',
      'You\'ve updated this person.',
      'success')
    );
  }
}
