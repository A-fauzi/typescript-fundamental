import { IAction, IKulkas } from './ikulkas';
import {Observable} from "rxjs";

class Action implements IAction {
  isi: string[] = [];
  condition: boolean = true;

  lihat(): Observable<string[]> {
    return new Observable<string[]>((observer) => {
      setTimeout(() => {
        if (!this.condition) {
          observer.error(['Kulkas belum dibuka']);
        } else {
          observer.next(this.isi);
        }
      }, 1000);
    });
  }

  ambil(item: string): Observable<string> {
    return new Observable<string>((observer) => {
      setTimeout(() => {
        if (!this.condition) {
          observer.error('Kulkas belum dibuka');
        } else if (!this.isi.includes(item)) {
          observer.next(`Item ${item} tidak ada`);
        } else {
          observer.next(`Item ${item} diambil`);
          const i = this.isi.indexOf(item);
          this.isi.splice(i, 1);
        }
      }, 1000);
    });
  }

  simpan(item: string): Observable<string> {
    return new Observable<string>((observer) => {
      setTimeout(() => {
        if (!this.condition) {
          observer.error('Kulkas belum dibuka');
        } else {
          observer.next(`Item ${item} sudah disimpan`);
          this.isi.push(item);
        }
      }, 1000);
    });
  }
}



export class Kulkas implements IKulkas {
  action: Action = new Action();
  buka(): Observable<IAction> {
    return new Observable((observer) => {
      this.action.condition = true;
      console.log('Kulkas terbuka');
      observer.next(this.action);
    });
  }
  tutup(): Observable<string> {
    return new Observable<string>((observer) => {
      this.action.condition = false;
      console.log('Kulkas tertutup')
      observer.next();
    });
  }
}
