import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { interval } from 'rxjs';
import { InteractionService } from './services/interaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  public selectedInfo = 0;

  constructor(private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.interactionService.selectedInfo$.subscribe(value => {
      this.selectedInfo = value;
    })
  }
}
