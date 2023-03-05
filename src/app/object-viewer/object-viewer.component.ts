import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { interval } from 'rxjs';

@Component({
  selector: 'app-object-viewer',
  templateUrl: './object-viewer.component.html',
  styleUrls: ['./object-viewer.component.css']
})
export class ObjectViewerComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') private canvasRef!: ElementRef;

  @ViewChild('container') private containerRef!: ElementRef;

  //* Stage Properties

  @Input() public fieldOfView: number = 1;

  @Input('nearClipping') public nearClippingPane: number = 1;

  @Input('farClipping') public farClippingPane: number = 1000;

  //? Scene properties
  private camera!: THREE.PerspectiveCamera;

  private controls!: OrbitControls;

  private ambientLight!: THREE.AmbientLight;

  private light1!: THREE.PointLight;

  private light2!: THREE.PointLight;

  private light3!: THREE.PointLight;

  private light4!: THREE.PointLight;

  private model: any;

  private directionalLight!: THREE.DirectionalLight;

  //? Helper Properties (Private Properties);

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loaderGLTF = new GLTFLoader();

  private renderer!: THREE.WebGLRenderer;
  private labelRenderer!: CSS2DRenderer;

  private scene!: THREE.Scene;

  // Annotations related
  //private vectorAnnotation1 = new THREE.Vector3(250, 250, 250);
  private annotation!: HTMLElement;
  /**
   *Animate the model
   *
   * @private
   * @memberof ModelComponent
   */
  private animateModel() {
    if (this.model) {
      this.model.rotation.z += 0.005;
    }
  }

  /**
   *create controls
   *
   * @private
   * @memberof ModelComponent
   */
  private createControls = () => {
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(this.containerRef.nativeElement.offsetWidth, this.containerRef.nativeElement.offsetHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    this.containerRef.nativeElement.appendChild(this.labelRenderer.domElement);
    this.controls = new OrbitControls(this.camera, this.labelRenderer.domElement);
    this.controls.autoRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan = false;
    this.controls.update();
  };

  /**
   * Create the scene
   *
   * @private
   * @memberof CubeComponent
   */
  private createScene() {
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xd4d4d8)
    this.loaderGLTF.load('assets/washing-machine/scene.gltf', (gltf: GLTF) => {
      this.model = gltf.scene.children[0];
      //gltf.scene.scale.set(0.5,0.5,0.5);
      console.log(this.model);
      this.model.scale.set(0.08,0.08,0.08);
      var box = new THREE.Box3().setFromObject(this.model);
      box.getCenter(this.model.position); // this re-sets the mesh position
      this.model.position.multiplyScalar(-1);
      //this.model.scale.set([1,1,1]);
      this.scene.add(this.model);

      const earthDiv = document.querySelector( '.label' ) as HTMLElement;
				//earthDiv.className = 'label';
				//earthDiv.textContent = 'Earth';
				earthDiv.style.marginTop = '-1em';
        earthDiv.addEventListener("pointerdown", () => { console.log("Clicked") });
				const earthLabel = new CSS2DObject( earthDiv );
        // red, green, blue
				earthLabel.position.set( 0.5, 0.5, 0.5 );
        //earthLabel.position.multiplyScalar(-1);
				this.scene.add( earthLabel );
				//earthLabel.layers.set( 0 );
    });
    //*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    )
    this.camera.position.x = 115;
    this.camera.position.y = 115;
    this.camera.position.z = 115;
    //this.camera.zoom = 10;
    this.ambientLight = new THREE.AmbientLight(0xffffe6, 0.4);
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(0xffffe6, 0.3);
    this.directionalLight.position.set(0, 1, 0);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
    this.light1 = new THREE.PointLight(0xffffe6, 0.3);
    this.light1.position.set(0, 200, 400);
    this.scene.add(this.light1);
    this.light2 = new THREE.PointLight(0xffffe6, 0.3);
    this.light2.position.set(500, 100, 0);
    this.scene.add(this.light2);
    this.light3 = new THREE.PointLight(0xffffe6, 0.3);
    this.light3.position.set(0, 100, -500);
    this.scene.add(this.light3);
    this.light4 = new THREE.PointLight(0xffffe6, 0.3);
    this.light4.position.set(-500, 300, 500);
    this.scene.add(this.light4);

    var axesHelper = new THREE.AxesHelper( 5 );
    this.scene.add( axesHelper );
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
 * Start the rendering loop
 *
 * @private
 * @memberof CubeComponent
 */
  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: ObjectViewerComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.renderer.render(component.scene, component.camera);
      component.labelRenderer.render(component.scene, component.camera);
    }());
  }

  showAlert() {
    alert("Testing");
  }

  constructor() { }

  testText = 100;

  ngOnInit(): void {
    const source = interval(1000).subscribe(() => {
      this.testText += 10;
    });
  }

  ngAfterViewInit() {
    this.annotation = document.querySelector(".annotation") as HTMLElement;
    this.createScene();
    this.createControls();
    this.startRenderingLoop();
  }
}

