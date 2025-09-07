import { Component } from '@angular/core';

interface UtilityCard {
  title: string;
  description: string;
  route: string;
  backgroundImage?: string;
  icon?: string;
}

@Component({
  selector: 'app-more-utilities-dropdown',
  templateUrl: './more-utilities-dropdown.component.html',
  styleUrls: ['./more-utilities-dropdown.component.css']
})
export class MoreUtilitiesDropdownComponent {

  utilityCards: UtilityCard[] = [
    {
      title: 'Guestbook',
      description: 'Let me know you were here',
      route: '/guestbook',
      backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Appreciation',
      description: 'If you have worked with me, leave your thoughts.',
      route: '/appreciation',
      backgroundImage: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Links',
      description: 'All my links are here',
      route: '/links',
      icon: '🔗'
    },
    {
      title: 'Uses',
      description: 'A peek into my digital...',
      route: '/uses',
      icon: '💻'
    },
    {
      title: 'Attribution',
      description: 'Journey to create this site',
      route: '/attribution',
      icon: '📄'
    }
  ];

}
