import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
// navigate(_t15: Menu) {
// throw new Error('Method not implemented.');
// }
public menuProperties: Array<Menu>=[
  {
//   {
//   id:'1',
//   titre:'Tableau de bord',
//   icon:'',
//   url:'',
//   sousMenu:[
//     {
//       id:'11',
//       titre:'Vue d  \'ensemble',
//       icon:'',
//       url:'',

//     },
//     {
//       id:'12',
//       titre:'statistiques',
//       icon:'',
//       url:'',

//     },
//   ]
// },

// {
//   id:'2',
//   titre:'Clients',
//   icon:'',
//   url:'',

//   sousMenu:[
//     {
//       id:'21',
//       titre:'Client',
//       icon:'',
//       url:'',

//     },
//     {
//       id:'22',
//       titre:'Commande client',
//       icon:'',
//       url:'',
//     }
// ]
// },
//     {
//     id:'3',
//     titre:'Clients',
//     icon:'',
//     url:'',

//     sousMenu:[
//       {
//         id:'31',
//         titre:'Client',
//         icon:'',
//         url:'',

//       },
//       {
//         id:'32',
//         titre:'Commande client',
//         icon:'',
//         url:'',
//       }
//  ]
//   },

//       {
//         id:'4',
//         titre:'Fournisseurs',
//         icon:'',
//         url:'',

//         sousMenu:[
//           {
//             id:'41',
//             titre:'Fournisseur',
//             icon:'',
//             url:'',

//           },
//           {
//             id:'42',
//             titre:'Commande Fournisseur',
//             icon:'',
//             url:'',
//           },
//         ]
//       },
//           {
//             id:'5',
//             titre:'parametrage',
//             icon:'',
//             url:'',

//             sousMenu:[
//               {
//                 id:'51',
//                 titre:'Categorie',
//                 icon:'',
//                 url:'',

//               },
//               {
//                 id: '52',
//                 titre: 'tilisateur',
//                 icon: '',
//                 url: '',

//               }

//           ]
//           },

// ]
// ;


//   constructor() { }

//   ngOnInit(): void {
//   }

// }




id: '1',
titre: 'Tableau de bord',
icon: 'fas fa-chart-line',
url: '',
sousMenu: [
  {
    id: '11',
    titre: 'Vue d\'ensemble',
    icon: 'fas fa-chart-pie',
    url: ''
  },
  {
    id: '12',
    titre: 'Statistiques',
    icon: 'fas fa-chart-bar',
    url: 'statistiques'
  }
]
},
{
  id: '2',
  titre: 'Articles',
  icon: 'fas fa-boxes',
  url: '',
  sousMenu: [
    {
      id: '21',
      titre: 'Articles',
      icon: 'fas fa-boxes',
      url: 'articles'
    },
    {
      id: '22',
      titre: 'Mouvements du stock',
      icon: 'fab fa-stack-overflow',
      url: 'mvtstk'
    }
  ]
},
{
  id: '3',
  titre: 'Clients',
  icon: 'fas fa-users',
  url: '',
  sousMenu: [
    {
      id: '31',
      titre: 'Clients',
      icon: 'fas fa-users',
      url: 'clients'
    },
    {
      id: '32',
      titre: 'Commandes clients',
      icon: 'fas fa-shopping-basket',
      url: 'commandesclient'
    }
  ]
},
{
  id: '4',
  titre: 'Fournisseurs',
  icon: 'fas fa-users',
  url: '',
  sousMenu: [
    {
      id: '41',
      titre: 'Fournisseurs',
      icon: 'fas fa-users',
      url: 'fournisseurs'
    },
    {
      id: '42',
      titre: 'Commandes fournisseurs',
      icon: 'fas fa-truck',
      url: 'commandesfournisseur'
    }
  ]
},
{
  id: '5',
  titre: 'Parametrages',
  icon: 'fas fa-cogs',
  url: '',
  sousMenu: [
    {
      id: '51',
      titre: 'Categories',
      icon: 'fas fa-tools',
      url: 'categories'
    },
    {
      id: '52',
      titre: 'Utilisateurs',
      icon: 'fas fa-users-cog',
      url: 'utilisateurs'
    }
  ]
}
];

private lastSelectedMenu: Menu | undefined;
constructor(
private router: Router
) { }

ngOnInit(): void {
}

navigate(menu: Menu): void {
if (this.lastSelectedMenu) {
 this.lastSelectedMenu.active = false;
}

menu.active = true;
this.lastSelectedMenu = menu;
this.router.navigate([menu.url]);




}
}
