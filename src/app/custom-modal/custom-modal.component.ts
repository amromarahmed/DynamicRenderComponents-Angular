import { Component, OnInit } from "@angular/core";
import { DynCompData } from "../DynamicRendering/dyn-comp-data";
import { InsertedCompRef } from "../DynamicRendering/inserted-comp-ref";
declare var $: any;

@Component({
  selector: "custom-modal",
  templateUrl: "./custom-modal.component.html"
})
export class CustomModalComponent implements OnInit {
  constructor(
    public data: DynCompData,
    public insertedCompRef: InsertedCompRef
  ) {}

  ngOnInit() {
    $(".cutomeModal").modal({});

    $(".cutomeModal").on("hidden.bs.modal", () => {
      // notify the container comp to destroy it
      this.insertedCompRef.close(this.constructor);
    });
  }
}
