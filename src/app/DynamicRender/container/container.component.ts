import {
  Component,
  AfterViewInit,
  OnDestroy,
  Type,
  ViewChild,
  ComponentFactoryResolver,
  ChangeDetectorRef,
  ComponentRef
} from "@angular/core";
import { InsertionDirective } from "../insertion.directive";
import { Subject } from "rxjs";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html"
})
export class ContainerComponent implements AfterViewInit, OnDestroy {
  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  destroyComp() {
    this._onClose.next(this.childComponentType);
  }

  // loadChildComponent is initialized from dyn-rend.service when calling open method
  childComponentType: Type<any>;
  containerCompRef: ComponentRef<ContainerComponent>;

  //To get a reference to that insertion-directive
  @ViewChild(InsertionDirective, { static: false })
  insertionView: InsertionDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    debugger;
    this.loadChildComponent(this.childComponentType);
    // detect changes after inserting child dynamic component
    this.cd.detectChanges();
  }

  loadChildComponent(componentType: Type<any>) {
    let insertedComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      componentType
    );

    let insertedViewRef = this.insertionView.insertedViewRef;
    insertedViewRef.clear();

    // insert the dynamic compnenet inside the container comp using ng-template tag
    this.containerCompRef = insertedViewRef.createComponent(
      insertedComponentFactory
    );
  }

  ngOnDestroy() {
    debugger;
    if (this.containerCompRef) {
      this.containerCompRef.destroy();
    }
  }
}
