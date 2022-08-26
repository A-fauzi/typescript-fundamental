import {Observable} from "rxjs";

export interface IAction {
  isi: string[];
  lihat(): Observable<string[]>;
  ambil(item: string): Observable<string>;
  simpan(item: string): Observable<string>;
}

export interface IKulkas {
  buka(): Observable<IAction>;
  tutup(): Observable<string>;
}
