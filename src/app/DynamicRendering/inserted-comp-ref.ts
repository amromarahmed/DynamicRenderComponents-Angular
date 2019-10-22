import { Observable, Subject } from "rxjs";
import { Input, OnInit } from "@angular/core";

export class InsertedCompRef {
  constructor() {}

  close(result?: any) {
    this._afterClosed.next(result);
  }

  private readonly _afterClosed = new Subject<any>();
  afterClosed: Observable<any> = this._afterClosed.asObservable();
}
