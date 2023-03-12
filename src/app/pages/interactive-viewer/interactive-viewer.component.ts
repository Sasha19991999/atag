import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-interactive-viewer',
  templateUrl: './interactive-viewer.component.html',
  styleUrls: ['./interactive-viewer.component.css']
})
export class InteractiveViewerComponent implements OnInit{
  public readonly servicesCode = 100;

  public selectedInfo = 0;

  constructor(private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.interactionService.selectedInfo$.subscribe(value => {
      this.selectedInfo = value;
    })
  }

  showServices() {
    this.interactionService.setInfo(this.servicesCode);
  }
}
