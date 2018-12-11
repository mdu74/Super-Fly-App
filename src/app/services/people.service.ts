import { Injectable } from '@angular/core';
import { Person } from '../domain-model/person';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import swal from 'node_modules/sweetalert2/dist/sweetalert2.js';
import { map } from "rxjs/operators";
import { AbstractFormGroupDirective } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class PeopleService {
  public myAppInfoDb: AngularFirestore;
  public peopleCollection: AngularFirestoreCollection<Person>;
  public peopleDoc:  AngularFirestoreDocument<Person>;
  public personId: string;

  constructor(public db: AngularFirestore) { 
    this.myAppInfoDb = db;
  }

  getAllPeople(): Observable<Person[]>{
    let people = this.myAppInfoDb
                      .collection<Person>('MyAppInfo')
                      .valueChanges();

    return people;
  }

  getAllPeopleOrderedBy(input: string): Observable<Person[]>{
    let people = this.myAppInfoDb
                      .collection<Person>('MyAppInfo', ref => ref.orderBy(input))
                      .valueChanges();
                      
    return people;
  }

  getPeopleBy(name: string): Observable<Person[]>{
    let people = this.myAppInfoDb
                      .collection<Person>('MyAppInfo', ref => ref
                      .where("name", "==", name))
                      .valueChanges();
                      
    return people;
  }

  getPersonBy(name: string, surname: string): AngularFirestoreCollection<Person>{
    let person = this.myAppInfoDb
                      .collection<Person>('MyAppInfo', ref => ref
                      .where("name", "==", name)
                      .where("surname", "==", surname));

    return person;
  }

  addPerson(person: Person): void{
    let personData = JSON.parse(JSON.stringify(person));
    this.myAppInfoDb.collection<Person>('MyAppInfo')
                    .add(personData)
                    .then( _  => swal(_.id, 'Data has been added'));
  }

  createNewPerson(person: Person): void{
    let personData = JSON.parse(JSON.stringify(person));
    
    this.myAppInfoDb.collection('MyAppInfo').add({'name': person.name , 'surname': person.surname});
  }

  updatePerson(id: string, person: Person): void{
    this.myAppInfoDb.doc<Person>(`MyAppInfo}`).update(person);
  }

  delete(personId: string): void{
    // this.myAppInfoDb.collection<Person>('MyAppInfo').doc('Q18l3EbyoQ6Q6DGTYB2A').delete();
    
    this.myAppInfoDb.collection<Person>('MyAppInfo').doc(personId).delete();
  }  
}
