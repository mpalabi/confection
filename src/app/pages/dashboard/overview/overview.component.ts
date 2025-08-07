import { Component } from '@angular/core';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";
import { ProjectCardComponent } from "../../../shared/project-card/project-card.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-overview',
  imports: [NavbarComponent, ProjectCardComponent, RouterLink],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

   projects : any[] = [
  {
    "id": 1,
    "name": "Trotle Mobile",
    "teamMembers": [
      { 
        "initials": "KA", 
        "fullName": "Kwame Asante",
        "email": "kwame.asante@company.com",
        "role": "Mobile Developer",
        "avatar": "https://picsum.photos/seed/kwame/100/100" 
      },
      { 
        "initials": "MJ", 
        "fullName": "Maria Johnson",
        "email": "maria.johnson@company.com",
        "role": "UI/UX Designer",
        "avatar": "https://uilogos.co/header-gradient.svg" 
      }
    ],
    "additionalMembers": 23,
    "progress": 10,
    "lastUpdate": "2mins ago",
    "icon": "https://placehold.co/64x64/d2e8ff/007AFF?text=TM",
    "color": "#c6e2ffff"
  },
  {
    "id": 2,
    "name": "Website Redesign",
    "teamMembers": [
      { 
        "initials": "SM", 
        "fullName": "Sarah Mitchell",
        "email": "sarah.mitchell@company.com",
        "role": "Frontend Developer",
        "avatar": "https://uilogos.co/header-gradient.svg" 
      },
      { 
        "initials": "DJ", 
        "fullName": "David Jackson",
        "email": "david.jackson@company.com",
        "role": "Creative Director",
        "avatar": "https://picsum.photos/seed/david/100/100" 
      },
      { 
        "initials": "AL", 
        "fullName": "Anna Lee",
        "email": "anna.lee@company.com",
        "role": "Project Manager",
        "avatar": "https://picsum.photos/seed/anna/100/100" 
      }
    ],
    "additionalMembers": 8,
    "progress": 67,
    "lastUpdate": "1hr ago",
    "icon": "https://placehold.co/64x64/FF6B35/white?text=WR",
    "color": "#FF6B35"
  },
  {
    "id": 3,
    "name": "API Integration",
    "teamMembers": [
      { 
        "initials": "RK", 
        "fullName": "Raj Kumar",
        "email": "raj.kumar@company.com",
        "role": "Backend Developer",
        "avatar": "https://picsum.photos/seed/raj/100/100" 
      },
      { 
        "initials": "TM", 
        "fullName": "Thomas Miller",
        "email": "thomas.miller@company.com",
        "role": "DevOps Engineer",
        "avatar": "https://picsum.photos/seed/thomas/100/100" 
      }
    ],
    "additionalMembers": 5,
    "progress": 34,
    "lastUpdate": "3hrs ago",
    "icon": "https://placehold.co/64x64/c6ffd3/28A745?text=AI",
    "color": "#c6ffd3ff"
  },
  {
    "id": 4,
    "name": "Marketing Campaign",
    "teamMembers": [
      { 
        "initials": "LB", 
        "fullName": "Lisa Brown",
        "email": "lisa.brown@company.com",
        "role": "Marketing Manager",
        "avatar": "https://picsum.photos/seed/lisa/100/100" 
      },
      { 
        "initials": "CW", 
        "fullName": "Chris Wilson",
        "email": "chris.wilson@company.com",
        "role": "Content Strategist",
        "avatar": "https://picsum.photos/seed/chris/100/100" 
      },
      { 
        "initials": "NK", 
        "fullName": "Nina Khan",
        "email": "nina.khan@company.com",
        "role": "Social Media Specialist",
        "avatar": "https://picsum.photos/seed/nina/100/100" 
      }
    ],
    "additionalMembers": 12,
    "progress": 89,
    "lastUpdate": "30mins ago",
    "icon": "https://placehold.co/64x64/E91E63/white?text=MC",
    "color": "#E91E63"
  },
  {
    "id": 5,
    "name": "Database Migration",
    "teamMembers": [
      { 
        "initials": "PH", 
        "fullName": "Paul Henderson",
        "email": "paul.henderson@company.com",
        "role": "Database Administrator",
        "avatar": "https://picsum.photos/seed/paul/100/100" 
      }
    ],
    "additionalMembers": 3,
    "progress": 15,
    "lastUpdate": "2days ago",
    "icon": "https://placehold.co/64x64/d2e8ff/007AFF?text=WR",
    "color": "#9C27B0"
  },
  {
    "id": 6,
    "name": "User Testing Phase",
    "teamMembers": [
      { 
        "initials": "GS", 
        "fullName": "Grace Smith",
        "email": "grace.smith@company.com",
        "role": "UX Researcher",
        "avatar": "https://picsum.photos/seed/grace/100/100" 
      },
      { 
        "initials": "EB", 
        "fullName": "Emily Brown",
        "email": "emily.brown@company.com",
        "role": "QA Tester",
        "avatar": "https://picsum.photos/seed/emily/100/100" 
      }
    ],
    "additionalMembers": 7,
    "progress": 78,
    "lastUpdate": "4hrs ago",
    "icon": "https://placehold.co/64x64/17A2B8/white?text=👥",
    "color": "#17A2B8"
  },
  {
    "id": 7,
    "name": "Security Audit",
    "teamMembers": [
      { 
        "initials": "JD", 
        "fullName": "James Davis",
        "email": "james.davis@company.com",
        "role": "Security Engineer",
        "avatar": "https://picsum.photos/seed/james/100/100" 
      },
      { 
        "initials": "MS", 
        "fullName": "Michelle Scott",
        "email": "michelle.scott@company.com",
        "role": "Cybersecurity Analyst",
        "avatar": "https://picsum.photos/seed/michelle/100/100" 
      },
      { 
        "initials": "VR", 
        "fullName": "Victor Rodriguez",
        "email": "victor.rodriguez@company.com",
        "role": "Penetration Tester",
        "avatar": "https://picsum.photos/seed/victor/100/100" 
      }
    ],
    "additionalMembers": 2,
    "progress": 45,
    "lastUpdate": "6hrs ago",
    "icon": "https://placehold.co/64x64/FFC107/white?text=🛡️",
    "color": "#FFC107"
  },
  {
    "id": 8,
    "name": "Mobile App Store",
    "teamMembers": [
      { 
        "initials": "QT", 
        "fullName": "Quinn Taylor",
        "email": "quinn.taylor@company.com",
        "role": "App Store Optimizer",
        "avatar": "https://picsum.photos/seed/quinn/100/100" 
      }
    ],
    "additionalMembers": 4,
    "progress": 92,
    "lastUpdate": "1day ago",
    "icon": "https://placehold.co/64x64/d2e8ff/007AFF?text=WR",
    "color": "#6F42C1"
  },
  {
    "id": 9,
    "name": "Analytics Dashboard",
    "teamMembers": [
      { 
        "initials": "HI", 
        "fullName": "Hassan Ibrahim",
        "email": "hassan.ibrahim@company.com",
        "role": "Data Analyst",
        "avatar": "https://picsum.photos/seed/hassan/100/100" 
      },
      { 
        "initials": "HI", 
        "fullName": "Hassan Ibrahim",
        "email": "hassan.ibrahim@company.com",
        "role": "Data Analyst",
        "avatar": "https://picsum.photos/seed/hassan/100/100" 
      },
      { 
        "initials": "HI", 
        "fullName": "Hassan Ibrahim",
        "email": "hassan.ibrahim@company.com",
        "role": "Data Analyst",
        "avatar": "https://picsum.photos/seed/hassan/100/100" 
      },
      { 
        "initials": "ZX", 
        "fullName": "Zoe Xavier",
        "email": "zoe.xavier@company.com",
        "role": "Data Scientist",
        "avatar": "https://picsum.photos/seed/zoe/100/100" 
      },
      { 
        "initials": "OL", 
        "fullName": "Oliver Lopez",
        "email": "oliver.lopez@company.com",
        "role": "Business Intelligence Developer",
        "avatar": "https://picsum.photos/seed/oliver/100/100" 
      }
    ],
    "additionalMembers": 15,
    "progress": 56,
    "lastUpdate": "5mins ago",
    "icon": "https://placehold.co/64x64/d2e8ff/007AFF?text=WR",
    "color": "#20C997"
  },
  {
    "id": 10,
    "name": "Customer Support Bot",
    "teamMembers": [
      { 
        "initials": "YU", 
        "fullName": "Yuki Tanaka",
        "email": "yuki.tanaka@company.com",
        "role": "AI Developer",
        "avatar": "https://picsum.photos/seed/yuki/100/100" 
      },
      { 
        "initials": "YU", 
        "fullName": "Yuki Tanaka",
        "email": "yuki.tanaka@company.com",
        "role": "AI Developer",
        "avatar": "https://picsum.photos/seed/yuki/100/100" 
      },
      { 
        "initials": "WE", 
        "fullName": "William Evans",
        "email": "william.evans@company.com",
        "role": "Conversation Designer",
        "avatar": "https://picsum.photos/seed/william/100/100" 
      },
      { 
        "initials": "YU", 
        "fullName": "Yuki Tanaka",
        "email": "yuki.tanaka@company.com",
        "role": "AI Developer",
        "avatar": "https://picsum.photos/seed/yuki/100/100" 
      },
    ],
    "additionalMembers": 6,
    "progress": 23,
    "lastUpdate": "8hrs ago",
    "icon": "https://placehold.co/64x64/d2e8ff/007AFF?text=WR",
    "color": "#FD7E14"
  }
]

}
