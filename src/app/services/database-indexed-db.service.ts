
import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { DestinoViaje } from '../models/destino-viaje.model';
@Injectable({
  providedIn: 'root'
})
export class DatabaseIndexedDBService extends Dexie {
  destinos?: Table<DestinoViaje, number>;
  constructor () {
      super('DatabaseIndexedDBService');
      this.version(1).stores({
        destinos: '_id, title, subtitle, imgUrl'
      });
  }
}

export const db = new DatabaseIndexedDBService();
