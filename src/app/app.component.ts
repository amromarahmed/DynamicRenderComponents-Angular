import { Component } from "@angular/core";
import { DynRendService } from "./DynamicRendering/dyn-rend.service";
import { CustomModalComponent } from "./custom-modal/custom-modal.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "angular-dynamic-components";
  constructor(public dynmaicRenderService: DynRendService) {
    this.dynmaicRenderService.open(CustomModalComponent, {
      data: {
        message: "I am a dynamic component inside of a dialog!",
        title: "Custom Modal"
      }
    });
  }
}
