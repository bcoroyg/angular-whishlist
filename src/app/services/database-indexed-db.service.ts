
import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Translation } from '../app.module';
import { DestinoViaje } from '../models/destino-viaje.model';
@Injectable({
  providedIn: 'root'
})
export class DatabaseIndexedDBService extends Dexie {
  destinos?: Table<DestinoViaje, number>;
  translations?: Dexie.Table<Translation, number>;
  constructor () {
      super('DatabaseIndexedDBService');
      this.version(1).stores({
        destinos: '_id, title, subtitle, imgUrl'
      });
      this.version(2).stores({
        destinos: '_id, title, subtitle, imgUrl',
        translations: '++id, lang, key, value'
      });
  }
}

export const db = new DatabaseIndexedDBService();
