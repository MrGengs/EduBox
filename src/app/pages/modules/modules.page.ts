import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonProgressBar,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonChip,
  IonGrid,
  IonRow,
  IonCol,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonBadge,
  IonButtons,
  IonBackButton,
  IonFab,
  IonFabButton,
  NavController, 
  ToastController 
} from '@ionic/angular/standalone';

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  color: string;
}

export interface ModuleItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  exercises: number;
  rating: number;
  status: 'completed' | 'in-progress' | 'locked' | 'available';
  tags: string[];
  category: string;
}

@Component({
  selector: 'app-modules',
  templateUrl: './modules.page.html',
  styleUrls: ['./modules.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonProgressBar,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonChip,
    IonGrid,
    IonRow,
    IonCol,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonBadge,
    IonButtons,
    IonBackButton,
    IonFab,
    IonFabButton
  ]
})
export class ModulesPage implements OnInit {
  currentFilter = 'all';
  searchQuery = '';
  
  learningPaths: LearningPath[] = [
    {
      id: 'arduino-basics',
      title: 'Arduino Basics',
      description: 'Pelajari dasar-dasar pemrograman Arduino',
      icon: 'hardware-chip',
      progress: 75,
      color: 'primary'
    },
    {
      id: 'led-matrix',
      title: 'LED Matrix',
      description: 'Simulasi dan kontrol LED matrix',
      icon: 'grid',
      progress: 45,
      color: 'secondary'
    },
    {
      id: 'ai-fundamentals',
      title: 'AI Fundamentals',
      description: 'Konsep dasar Artificial Intelligence',
      icon: 'sparkles',
      progress: 20,
      color: 'tertiary'
    },
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'HTML, CSS, JavaScript modern',
      icon: 'globe',
      progress: 60,
      color: 'success'
    }
  ];

  modules: ModuleItem[] = [
    {
      id: 'arduino-intro',
      title: 'Pengenalan Arduino',
      description: 'Pelajari dasar-dasar Arduino, dari instalasi IDE hingga program pertama Anda.',
      icon: 'hardware-chip',
      duration: '45 menit',
      exercises: 12,
      rating: 4.8,
      status: 'completed',
      tags: ['Beginner', 'Hardware', 'C++'],
      category: 'arduino'
    },
    // Add more modules here...
  ];

  stats = {
    completed: 24,
    inProgress: 8,
    xp: 156
  };

  categories = [
    { id: 'all', name: 'Semua', icon: 'star' },
    { id: 'arduino', name: 'Arduino', icon: 'hardware-chip' },
    { id: 'ai', name: 'AI/ML', icon: 'sparkles' },
    { id: 'web', name: 'Web', icon: 'globe' },
    { id: 'python', name: 'Python', icon: 'logo-python' },
    { id: 'javascript', name: 'JavaScript', icon: 'logo-javascript' }
  ];

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.showRandomAchievement();
  }

  filterByCategory(categoryId: string) {
    this.currentFilter = categoryId;
    // Filter logic will be handled in the template
  }

  async openModule(moduleId: string) {
    const module = this.modules.find(m => m.id === moduleId);
    if (module) {
      const toast = await this.toastCtrl.create({
        message: `Membuka modul: ${module.title}`,
        duration: 2000,
        position: 'top',
        color: 'primary',
        buttons: [
          {
            icon: 'close',
            role: 'cancel'
          }
        ]
      });
      await toast.present();
      // Navigate to module detail page
      // this.navCtrl.navigateForward(`/module-detail/${moduleId}`);
    }
  }

  async openPath(pathId: string) {
    const path = this.learningPaths.find(p => p.id === pathId);
    if (path) {
      const toast = await this.toastCtrl.create({
        message: `Membuka jalur pembelajaran: ${path.title}`,
        duration: 2000,
        position: 'top',
        color: 'primary'
      });
      await toast.present();
      // Navigate to path detail page
      // this.navCtrl.navigateForward(`/learning-path/${pathId}`);
    }
  }

  async showRandomAchievement() {
    const achievements = [
      '🏆 Achievement Unlocked: "Quick Learner"!',
      '🌟 Achievement Unlocked: "Code Master"!',
      '🚀 Achievement Unlocked: "Problem Solver"!',
      '💡 Achievement Unlocked: "Creative Thinker"!',
      '🎯 Achievement Unlocked: "Goal Achiever"!'
    ];
    
    const toast = await this.toastCtrl.create({
      message: achievements[Math.floor(Math.random() * achievements.length)],
      duration: 3000,
      position: 'top',
      color: 'success',
      buttons: [
        {
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    
    setTimeout(() => {
      toast.present();
    }, 2000);
  }

  getModuleStatusColor(status: string): string {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'primary';
      case 'locked':
        return 'medium';
      default:
        return 'tertiary';
    }
  }

  getModuleStatusText(status: string): string {
    switch (status) {
      case 'completed':
        return 'Selesai';
      case 'in-progress':
        return 'Berlangsung';
      case 'locked':
        return 'Terkunci';
      default:
        return 'Tersedia';
    }
  }

  get filteredModules() {
    return this.modules.filter(module => {
      const matchesSearch = !this.searchQuery || 
        module.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        module.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase()));
      
      const matchesCategory = this.currentFilter === 'all' || 
        module.category === this.currentFilter;
      
      return matchesSearch && matchesCategory;
    });
  }

  navigateTo(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }

  goBack() {
    this.navCtrl.back();
  }
}
