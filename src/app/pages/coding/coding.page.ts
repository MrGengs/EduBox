import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton,
  IonList,
  IonItem,
  IonLabel,
  IonTextarea,
  IonCard,
  IonCardContent,
  IonModal,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-coding',
  templateUrl: './coding.page.html',
  styleUrls: ['./coding.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule, 
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonSegment,
    IonSegmentButton,
    IonList,
    IonItem,
    IonLabel,
    IonTextarea,
    IonCard,
    IonCardContent,
    IonModal,
    IonButtons,
    IonBackButton
  ]
})
export class CodingPage implements OnInit {
  code: string = '';
  output: string = 'Output will appear here...';
  isRunning: boolean = false;
  
  constructor() {}

  ngOnInit() {
    console.log('CodingPage initialized');
  }
  
  runCode() {
    this.isRunning = true;
    this.output = 'Running code...';
    
    // Simulate code execution
    setTimeout(() => {
      this.output = 'Code executed successfully!\n';
      this.output += 'LED Cube animation started.';
      this.isRunning = false;
    }, 1500);
  }
  
  clearCode() {
    this.code = '';
    this.output = 'Cleared. Ready for new code.';
  }
  
  loadTemplate(template: string) {
    const templates: { [key: string]: string } = {
      'basic': '// Basic LED cube animation\nfor (let i = 0; i < 64; i++) {\n  cube.setPixel(i, Math.random() * 0xFFFFFF);\n  cube.show();\n  delay(100);\n}',
      'pattern': '// Pattern generator\nconst colors = [0xFF0000, 0x00FF00, 0x0000FF];\nfor (let i = 0; i < 64; i++) {\n  const color = colors[i % colors.length];\n  cube.setPixel(i, color);\n}\ncube.show();',
      'interactive': '// Interactive control\nfunction handleInput(x, y, z) {\n  const index = x + y * 4 + z * 16;\n  const color = cube.getPixel(index) === 0 ? 0xFFFFFF : 0;\n  cube.setPixel(index, color);\n  cube.show();\n}'
    };
    
    this.code = templates[template] || '// Template not found';
    this.output = `Loaded ${template} template. Click "Run Code" to execute.`;
  }
}
