import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SwiperOptions } from 'swiper/types';
import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonProgressBar,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonBadge,
  IonMenu,
  IonMenuToggle,
  IonSplitPane,
  IonRouterOutlet,
  NavController, 
  ToastController,
  ModalController
} from '@ionic/angular/standalone';

// Register Swiper web component
register();

export interface Slide {
  title: string;
  description: string;
  image?: string;
  icon?: string;
}

export interface Feature {
  title: string;
  subtitle: string;
  icon: string;
  route: string;
}

export interface NewsItem {
  title: string;
  content: string;
  time: string;
  icon: string;
}

export interface ForumPost {
  userInitials: string;
  userName: string;
  timeAgo: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonProgressBar,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonBadge,
    IonMenu,
    IonMenuToggle,
    IonSplitPane,
    IonRouterOutlet
  ]
})
export class LandingPage implements OnInit {
  isSidebarOpen = false;
  // Swiper configuration
  slideOpts: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 16,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    // Add type assertion to avoid type errors
    a11y: { enabled: true },
    keyboard: { enabled: true },
    mousewheel: { forceToAxis: true },
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1.2,
      },
      1024: {
        slidesPerView: 1.5,
      },
    },
  } as SwiperOptions;

  slides: Slide[] = [
    {
      title: '🎉 Promo Spesial!',
      description: 'Dapatkan akses premium selama 3 bulan dengan diskon 50% untuk semua fitur pembelajaran',
      icon: 'gift-outline'
    },
    {
      title: '🚀 Fitur Baru',
      description: 'LED Matrix Simulator dengan AI Assistant telah tersedia untuk pengalaman belajar yang lebih interaktif',
      icon: 'rocket-outline'
    },
    {
      title: '📚 Kursus Gratis',
      description: 'Pelajari dasar-dasar pemrograman dengan mentor berpengalaman dan materi yang mudah dipahami',
      icon: 'school-outline'
    }
  ];

  features: Feature[] = [
    {
      title: '3D LED Matrix',
      subtitle: 'Simulator Interaktif',
      icon: 'cube-outline',
      route: '/landing/space3d'
    },
    {
      title: 'Coding Workspace',
      subtitle: 'Editor Kode',
      icon: 'code-slash-outline',
      route: '/landing/coding'
    },
    {
      title: 'Manual Coding',
      subtitle: 'Code Editor',
      icon: 'code-slash-outline',
      route: '/coding'
    },
    {
      title: 'Modul Belajar',
      subtitle: 'Materi & Tutorial',
      icon: 'book-outline',
      route: '/modules'
    },
    {
      title: 'Leaderboard',
      subtitle: 'Ranking & Pencapaian',
      icon: 'trophy-outline',
      route: '/leaderboard'
    }
  ];

  news: NewsItem[] = [
    {
      title: 'Update Algoritma AI Assistant',
      content: 'AI Assistant kini dapat membantu debugging code dengan lebih akurat dan memberikan saran optimasi yang lebih baik.',
      time: '2j',
      icon: 'flame-outline'
    },
    {
      title: 'Kompetisi Coding Nasional',
      content: 'Daftarkan diri Anda dalam kompetisi coding nasional dengan hadiah total 100 juta rupiah dan berbagai benefit menarik.',
      time: '5j',
      icon: 'trophy-outline'
    }
  ];

  forumPosts: ForumPost[] = [
    {
      userInitials: 'AS',
      userName: 'Ahmad Susanto',
      timeAgo: '5 menit lalu',
      title: 'Cara Optimasi LED Matrix untuk Animasi Kompleks?',
      content: 'Saya sedang mengembangkan animasi dengan 64x64 LED matrix, ada tips untuk mengoptimalkan refresh rate dan performa?',
      likes: 12,
      comments: 5
    },
    {
      userInitials: 'RK',
      userName: 'Rina Kartika',
      timeAgo: '1 jam lalu',
      title: 'Berbagi Library JavaScript untuk Simulasi',
      content: 'Hi semua! Saya ingin share library JS yang saya buat untuk simulasi LED matrix dengan performa tinggi dan mudah digunakan.',
      likes: 8,
      comments: 3
    }
  ];

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  async showNotifications() {
    const toast = await this.toastCtrl.create({
      message: 'Tidak ada notifikasi baru',
      duration: 2000,
      position: 'top',
      cssClass: 'notification-toast'
    });
    await toast.present();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  async toggleAI() {
    const toast = await this.toastCtrl.create({
      message: 'AI Assistant: Halo! Ada yang bisa saya bantu?',
      duration: 3000,
      position: 'middle',
      buttons: [
        {
          text: 'Tutup',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }
}
