export type Category = 'Comptines' | 'Berceuses' | 'J’apprends' | 'Histoires';
export type ContentItem = { id:string; title:string; subtitle:string; category:Category; emoji:string; duration:string; language:'FR'|'WO'|'FR + WO' };
export const contents: ContentItem[] = [
{id:'comptine-1',title:'Bonjour les amis',subtitle:'Chantons tous ensemble !',category:'Comptines',emoji:'🎵',duration:'2 min',language:'FR'},
{id:'berceuse-1',title:'Dors, petit baobab',subtitle:'Une douce mélodie du soir',category:'Berceuses',emoji:'🌙',duration:'3 min',language:'FR'},
{id:'learn-1',title:'Les couleurs',subtitle:'Rouge, jaune, vert et bleu',category:'J’apprends',emoji:'🌈',duration:'4 min',language:'FR'},
{id:'learn-2',title:'Comptons ensemble',subtitle:'De 1 à 5 avec Samba et Awa',category:'J’apprends',emoji:'🔢',duration:'3 min',language:'FR + WO'},
{id:'story-1',title:'Le secret du Baobab',subtitle:'Une histoire de partage',category:'Histoires',emoji:'🌳',duration:'5 min',language:'FR'},
{id:'comptine-2',title:'Jàmm rekk !',subtitle:'Un bonjour en wolof',category:'Comptines',emoji:'💚',duration:'2 min',language:'WO'}
];