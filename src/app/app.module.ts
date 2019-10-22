import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { DynamciRenderModule } from "./DynamicRender/dyn-rend.module";
import { CustomModalComponent } from "./custom-modal/custom-modal.component";

@NgModule({
  declarations: [AppComponent, CustomModalComponent],
  imports: [BrowserModule, DynamciRenderModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CustomModalComponent]
})
export class AppModule {}
