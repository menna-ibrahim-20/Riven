import { Component, HostBinding, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-web-cases-card10-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './web-cases-card10-settings.component.html',
  styleUrl: './web-cases-card10-settings.component.css'
})

export class WebCasesCard10SettingsComponent {

@HostBinding('style.display') display = 'contents';

  selectedLanguage = 'en';
  isOpen = false;

  languages = [
    { code: 'en', label: 'English'    },
    { code: 'ar', label: 'العربية'    },
    { code: 'fr', label: 'Français'   },
    { code: 'es', label: 'Español'    },
    { code: 'de', label: 'Deutsch'    },
    { code: 'it', label: 'Italiano'   },
    { code: 'pt', label: 'Português'  },
    { code: 'tr', label: 'Türkçe'     },
    { code: 'zh', label: '中文'        },
    { code: 'ja', label: '日本語'      },
    { code: 'ko', label: '한국어'      },
    { code: 'ru', label: 'Русский'    },
    { code: 'nl', label: 'Nederlands' },
    { code: 'pl', label: 'Polski'     },
    { code: 'sv', label: 'Svenska'    },
  ];

  constructor(private http: HttpClient) {}

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(code: string): void {
    this.selectedLanguage = code;
    this.isOpen = false;
  }

  getSelectedLabel(): string {
    const lang = this.languages.find(l => l.code === this.selectedLanguage);
    return lang ? lang.label : 'Select Language';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-select-wrap')) {
      this.isOpen = false;
    }
  }


  // onLanguageChange(): void {
  //   // TODO: this.http.put(`${environment.apiUrl}/settings/language`, { language: this.selectedLanguage }).subscribe();
  // }
}

