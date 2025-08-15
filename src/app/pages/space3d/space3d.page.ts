import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonSegment, 
  IonSegmentButton, 
  IonButton, 
  IonIcon, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  AnimationController,
  NavController
} from '@ionic/angular/standalone';
import { 
  cubeOutline, 
  codeSlashOutline, 
  playOutline, 
  pauseOutline, 
  stopOutline, 
  trashOutline, 
  downloadOutline, 
  shareSocialOutline,
  arrowBackOutline
} from 'ionicons/icons';
// Icons are automatically registered by Ionic

interface Led {
  element: HTMLElement;
  active: boolean;
  color: string;
}

interface Preset {
  id: string;
  name: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-space3d',
  templateUrl: './space3d.page.html',
  styleUrls: ['./space3d.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonSegment,
    IonSegmentButton,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class Space3dPage implements OnInit, AfterViewInit {
  @ViewChild('ledMatrix', { static: true }) ledMatrixRef!: ElementRef<HTMLDivElement>;
  @ViewChild(IonContent) content!: IonContent;

  currentColor: string = 'green';
  matrix: Led[] = [];
  is3D: boolean = false;
  animationInterval: any;
  
  presets: Preset[] = [
    { id: 'wave', name: 'Wave', description: 'Wave animation', icon: '🌊' },
    { id: 'spiral', name: 'Spiral', description: 'Spiral pattern', icon: '🌀' },
    { id: 'rain', name: 'Rain', description: 'Rain effect', icon: '🌧️' },
    { id: 'heart', name: 'Heart', description: 'Heart shape', icon: '❤️' },
  ];

  private animationCtrl = inject(AnimationController);
  private navCtrl = inject(NavController);

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    // Use setTimeout to ensure the view is fully initialized
    setTimeout(() => {
      this.initMatrix();
      this.createParticles();
    });
  }

  initMatrix() {
    if (!this.ledMatrixRef?.nativeElement) return;
    
    const matrixElement = this.ledMatrixRef.nativeElement;
    matrixElement.innerHTML = '';
    this.matrix = [];

    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < 256; i++) {
      const led = document.createElement('div');
      led.className = 'led';
      led.addEventListener('click', () => this.toggleLED(i));
      
      // Add staggered animation delay for initial load
      led.style.animationDelay = (i * 0.01) + 's';
      
      fragment.appendChild(led);
      this.matrix.push({
        element: led,
        active: false,
        color: this.currentColor
      });
    }
    
    matrixElement.appendChild(fragment);
  }

  toggleLED(index: number) {
    const led = this.matrix[index];
    if (led.active) {
      this.turnOffLED(led);
    } else {
      this.turnOnLED(led);
    }
  }

  turnOnLED(led: Led) {
    led.active = true;
    led.color = this.currentColor;
    led.element.className = `led ${this.currentColor}`;
    
    // Add pulse animation
    const animation = this.animationCtrl.create()
      .addElement(led.element)
      .duration(200)
      .fromTo('transform', 'scale(1)', 'scale(1.3)')
      .fromTo('opacity', '1', '0.8')
      .direction('alternate')
      .iterations(2);
    
    animation.play();
  }

  turnOffLED(led: Led) {
    led.active = false;
    led.element.className = 'led';
  }

  onColorChange(event: any) {
    this.currentColor = event.detail.value;
  }

  clearMatrix() {
    this.matrix.forEach((led, index) => {
      setTimeout(() => {
        this.turnOffLED(led);
      }, index * 2);
    });
  }

  fillMatrix() {
    this.matrix.forEach((led, index) => {
      setTimeout(() => {
        this.turnOnLED(led);
      }, index * 3);
    });
  }

  loadPreset(presetId: string) {
    this.clearMatrix();
    
    setTimeout(() => {
      switch(presetId) {
        case 'wave':
          this.createWavePattern();
          break;
        case 'spiral':
          this.createSpiralPattern();
          break;
        case 'rain':
          this.createRainPattern();
          break;
        case 'heart':
          this.createHeartPattern();
          break;
      }
    }, 100);
  }

  private createWavePattern() {
    for (let row = 0; row < 16; row++) {
      for (let col = 0; col < 16; col++) {
        const index = row * 16 + col;
        const wave = Math.sin(col * 0.4) * 6 + 8;
        if (Math.abs(row - wave) < 2) {
          setTimeout(() => {
            this.turnOnLED(this.matrix[index]);
          }, col * 30);
        }
      }
    }
  }

  private createSpiralPattern() {
    const center = 7.5;
    let delay = 0;
    for (let row = 0; row < 16; row++) {
      for (let col = 0; col < 16; col++) {
        const index = row * 16 + col;
        const distance = Math.sqrt(Math.pow(row - center, 2) + Math.pow(col - center, 2));
        const angle = Math.atan2(row - center, col - center);
        if (Math.sin(angle * 3 + distance * 0.5) > 0.3) {
          setTimeout(() => {
            this.turnOnLED(this.matrix[index]);
          }, delay);
          delay += 30;
        }
      }
    }
  }

  private createRainPattern() {
    for (let col = 0; col < 16; col++) {
      if (Math.random() > 0.6) {
        const height = Math.floor(Math.random() * 12) + 4;
        for (let row = 0; row < height; row++) {
          const index = row * 16 + col;
          setTimeout(() => {
            this.turnOnLED(this.matrix[index]);
          }, row * 100 + col * 50);
        }
      }
    }
  }

  private createHeartPattern() {
    const heartPattern = [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
      [0,0,1,1,1,1,1,0,1,1,1,1,1,0,0,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
      [0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
      [0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0],
      [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0],
      [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];

    let delay = 0;
    for (let row = 0; row < 16; row++) {
      for (let col = 0; col < 16; col++) {
        const index = row * 16 + col;
        if (heartPattern[row][col] === 1) {
          setTimeout(() => {
            this.turnOnLED(this.matrix[index]);
          }, delay);
          delay += 50;
        }
      }
    }
  }

  createParticles() {
    const container = document.createElement('div');
    container.className = 'particles';
    
    // Use the ion-content element
    const ionContent = document.querySelector('ion-content');
    if (!ionContent) return;
    
    ionContent.appendChild(container);
    
    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      fragment.appendChild(particle);
    }
    
    container.appendChild(fragment);
  }

  saveProject() {
    // Simple implementation - in a real app, this would save to a backend
    const project = {
      name: `LED Project ${new Date().toLocaleString()}`,
      date: new Date().toISOString(),
      matrix: this.matrix.map(led => ({
        active: led.active,
        color: led.color
      }))
    };
    
    // Show a simple alert for now
    alert(`Project saved: ${project.name}`);
    console.log('Project saved:', project);
  }

  shareProject() {
    // Simple implementation - in a real app, this would use the Web Share API
    if (navigator.share) {
      navigator.share({
        title: 'My LED Matrix Project',
        text: 'Check out this cool LED matrix I created!',
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      alert('Sharing is not supported in your browser');
    }
  }
}
