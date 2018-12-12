import { Injectable } from '@angular/core';
import { Person } from '../domain-model/person';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
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

  public people: Observable<any[]>

  constructor(public db: AngularFirestore) { 
    this.myAppInfoDb = db;

    let collectionOfPeople = db.collection('MyAppInfo');

    this.people = collectionOfPeople.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Person;
          const id = a.payload.doc.id;
          this.personId = id;
          return { id, data };
        })
      })
    );
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

  getPersonBy(personId: string): any{
    let person = this.myAppInfoDb
                          .collection<Person>('MyAppInfo', ref => ref
                          .where("personId", "==", personId));
    

    return person;
  }



  addPerson(person: Person): void{
    let personBlob = JSON.parse(JSON.stringify(person));

    this.myAppInfoDb.collection<Person>('MyAppInfo')
                    .add(personBlob)
                    .then( _  => swal(_.id + personBlob.name, 'Data has been added'));
  }

  createNewPerson(person: Person): void{    
    let personBlob = JSON.parse(JSON.stringify(person));

    this.myAppInfoDb.collection('MyAppInfo')
                    .add(personBlob)
                    .then( _  => swal('Saved!', personBlob.name + ' has been added', 'success'));
  }

  updatePerson(id: string, person: Person): void{
    this.myAppInfoDb.doc<Person>('MyAppInfo').update(person);
  }

  deletePerson(personId): void{ 

    console.log(this.people);
    debugger;
    console.log(personId);
  }
}
