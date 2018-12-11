import { Component, Output, EventEmitter } from '@angular/core';
import { PeopleService } from '../services/people.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter-people',
  templateUrl: './filter-people.component.html',
  styleUrls: ['./filter-people.component.css'],
  providers: [PeopleService]
})

export class FilterPeopleComponent {
  public categories = [ "name", "surname", "views", "created"];
  @Output() filterEvent = new EventEmitter<string>();

  constructor() {}

  filterChangesBy(value: string){
    this.filterEvent.emit(value);
  }
}
