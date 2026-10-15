export type Category='Comptines'|'Berceuses'|'J’apprends'|'Histoires';
export type ContentItem={id:string;title:string;subtitle:string;category:Category;emoji:string;duration:string;language:'FR'|'WO'|'FR + WO';featured?:boolean;lyrics?:string};
export const contents:ContentItem[]=[
{id:'song-bonjour',title:'Bonjour les amis',subtitle:'Une chanson pour se retrouver',category:'Comptines',emoji:'👋🏿',duration:'2 min',language:'FR',featured:true,lyrics:'Bonjour Samba, bonjour Awa,\nBonjour Bobo, comment ça va ?\nOn tape des mains, on tourne en rond,\nNiani Kids, chantons en chœur !\n\nBonjour le soleil, bonjour le jour,\nBonjour les amis, bonjour l’amour.\nUn petit sourire, un grand coucou,\nLa joie de chanter est avec nous !'},
{id:'song-baobab',title:'Dors, petit baobab',subtitle:'Une berceuse toute douce',category:'Berceuses',emoji:'🌙',duration:'3 min',language:'FR',featured:true,lyrics:'Dors, petit baobab, ferme tes yeux,\nLa lune allume un chemin dans les cieux.\nLe vent murmure tout doucement,\nLes étoiles veillent sur tes rêves d’enfant.\n\nDors, dors, petit cœur,\nLa nuit est douce, remplie de fleurs.\nDors, dors, jusqu’au matin,\nDemain nous chanterons dans le jardin.'},
{id:'song-colors',title:'Les couleurs dansent',subtitle:'Rouge, jaune, vert et bleu',category:'J’apprends',emoji:'🌈',duration:'3 min',language:'FR',featured:true,lyrics:'Rouge comme une belle tomate,\nJaune comme le soleil qui éclate.\nVert comme les feuilles du baobab,\nBleu comme le ciel au-dessus de nos têtes !\n\nUne couleur, deux couleurs,\nDansons ensemble dans la bonne humeur !'},
{id:'song-count',title:'Un, deux, trois, on y va !',subtitle:'Compter avec Samba et Awa',category:'J’apprends',emoji:'🔢',duration:'3 min',language:'FR + WO',lyrics:'Un petit pas, deux petits pas,\nTrois grands sourires, viens avec moi !\nQuatre mains qui font clap-clap-clap,\nCinq amis sous le baobab !'},
{id:'song-jamm',title:'Jàmm rekk !',subtitle:'Un bonjour en wolof',category:'Comptines',emoji:'💚',duration:'2 min',language:'WO',lyrics:'Jàmm rekk, jàmm rekk,\nNaka nga def, xarit yi ?\nNuyoo ak mbégte,\nWoy ak fecc, ñun ñépp !\n\nNote : paroles wolof de travail à faire valider par un locuteur natif avant diffusion.'},
{id:'song-move',title:'Bouge, bouge, petit cœur',subtitle:'Une chanson pour danser',category:'Comptines',emoji:'💃🏿',duration:'2 min',language:'FR',lyrics:'Bouge les mains, bouge les pieds,\nTourne doucement, viens danser !\nTape des mains, saute tout bas,\nFais un sourire à Awa !'},
{id:'lullaby-stars',title:'Les étoiles disent bonne nuit',subtitle:'Un moment calme avant le dodo',category:'Berceuses',emoji:'⭐',duration:'4 min',language:'FR',lyrics:'Une étoile, deux étoiles, le ciel est tout doux,\nLa lune nous sourit et veille sur nous.\nFerme les yeux, respire doucement,\nLes rêves arrivent comme un petit vent.'},
{id:'learn-shapes',title:'Formes rigolotes',subtitle:'Rond, carré, triangle',category:'J’apprends',emoji:'🔺',duration:'3 min',language:'FR',lyrics:'Le rond roule, le carré est posé,\nLe triangle pointe vers le ciel étoilé.\nCherche une forme autour de toi,\nDis son nom et danse avec moi !'},
{id:'story-secret',title:'Le secret du Baobab',subtitle:'Une histoire de partage et d’amitié',category:'Histoires',emoji:'🌳',duration:'5 min',language:'FR',featured:true},
{id:'story-mango',title:'La mangue de Bobo',subtitle:'Apprendre à partager',category:'Histoires',emoji:'🥭',duration:'4 min',language:'FR'},
{id:'story-river',title:'La rivière propre',subtitle:'Protéger la nature tous ensemble',category:'Histoires',emoji:'💧',duration:'5 min',language:'FR'},
{id:'learn-animals',title:'Les animaux du Sénégal',subtitle:'Découvrir les animaux et leurs sons',category:'J’apprends',emoji:'🦁',duration:'4 min',language:'FR'},
{id:'learn-body',title:'Mon corps bouge',subtitle:'Tête, épaules, mains et pieds',category:'J’apprends',emoji:'👐🏿',duration:'3 min',language:'FR'},
{id:'story-griot',title:'La petite kora magique',subtitle:'Un conte de musique et de courage',category:'Histoires',emoji:'🎶',duration:'5 min',language:'FR'}
];
export const songs=contents.filter(x=>x.lyrics);
export const stories=contents.filter(x=>x.category==='Histoires');
export const activities=[
{title:'Les couleurs magiques',age:'2–4 ans',goal:'Reconnaître les couleurs',type:'jeu'},
{title:'Comptons les mangues',age:'3–6 ans',goal:'Dénombrer de 1 à 5',type:'jeu'},
{title:'Le baobab des gentillesses',age:'3–6 ans',goal:'Exprimer la gentillesse',type:'atelier'},
{title:'Mon petit orchestre',age:'1–6 ans',goal:'Écouter et reproduire un rythme',type:'atelier'},
{title:'Le tri des déchets',age:'3–6 ans',goal:'Découvrir les gestes écologiques',type:'jeu'},
{title:'Mon conte en images',age:'3–6 ans',goal:'Développer l’imagination orale',type:'atelier'}
];