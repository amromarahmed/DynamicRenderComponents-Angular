import {
  Injectable,
  ComponentRef,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  Type
} from "@angular/core";
import { ContainerComponent } from "./container/container.component";
import { DynCompData } from "./dyn-comp-data";
import { DynamicRenderInjector } from "./dyn-rend-injector";
import { InsertedCompRef } from "./inserted-comp-ref";

@Injectable({
  providedIn: "root"
})
export class DynRendService {
  // reference to the container Component
  ContainerCompRef: ComponentRef<ContainerComponent>;
  ContainerCompRefs: ComponentRef<ContainerComponent>[] = [];
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public open(componentType: Type<any>, data: DynCompData) {
    const InsertedCompRef = this.appendComponentToBody(data);
    this.ContainerCompRef.instance.childComponentType = componentType;
    this.ContainerCompRefs.push(this.ContainerCompRef);

    return InsertedCompRef;
  }

  private appendComponentToBody(data: DynCompData) {
    // create a map with the config
    const map = new WeakMap();
    map.set(DynCompData, data);

    // add the inserted Component Ref to dependency injection
    const insertedCompRef = new InsertedCompRef();
    map.set(InsertedCompRef, insertedCompRef);

    //create componentFactory to resolve Containercomponent
    const containerCompFactory = this.componentFactoryResolver.resolveComponentFactory(
      ContainerComponent
    );

    // use our new injector
    const containerRefFactory = containerCompFactory.create(
      new DynamicRenderInjector(this.injector, map)
    );

    // assign the ContainerCompRef to our ContainerCompRef Property so we can destroy it later
    this.ContainerCompRef = containerRefFactory;

    // listent to if the inserted component is closed or wanted to be desroyed
    const sub = insertedCompRef.afterClosed.subscribe(childComponentType => {
      this.removeComponentFromBody(childComponentType);
      sub.unsubscribe();
    });

    //attach the new component to the angular component tree
    this.appRef.attachView(containerRefFactory.hostView);

    //get the root DOM-element of our Component
    const domElem = (containerRefFactory.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // attach the container to the HTML-body
    document.body.appendChild(domElem);

    this.ContainerCompRef.instance.onClose.subscribe(childComponentType => {
      this.removeComponentFromBody(childComponentType);
    });

    return InsertedCompRef;
  }

  //need a way to remove the component once the dialog is closed.
  private removeComponentFromBody(childComponentType) {
    this.ContainerCompRefs.forEach((elem, index) => {
      if (elem.instance.childComponentType == childComponentType) {
        this.appRef.detachView(elem.hostView);

        // call ngOnDestroy in the Container Component
        elem.destroy();

        // remove the destroyed containerRef
        this.ContainerCompRefs.splice(index);
      }
    });
  }
}
