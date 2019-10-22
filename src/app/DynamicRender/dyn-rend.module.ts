import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InsertionDirective } from "./insertion.directive";
import { ContainerComponent } from "./container/container.component";

@NgModule({
  declarations: [ContainerComponent, InsertionDirective],
  imports: [CommonModule],
  entryComponents: [ContainerComponent]
})
export class DynamciRenderModule {}
