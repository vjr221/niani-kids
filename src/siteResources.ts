/**
 * Curated links to newly published Niani Kids family and educator resources.
 * External pages are opened only through the existing parental gate in App.tsx.
 */
export type SiteResource = {
  id: string;
  titleFr: string;
  titleWo: string;
  descriptionFr: string;
  descriptionWo: string;
  url: string;
};
export const siteResources: SiteResource[] = [
  { id:'printable-kit', titleFr:'Kit pédagogique gratuit · 8 activités', titleWo:'Kit jàngale bu amul njëg · 8 jëf', descriptionFr:'Huit fiches à imprimer pour la maison, la classe ou les ateliers.', descriptionWo:'Fiches ngir kër, klas walla atelier.', url:'https://nianikids.com/kit-pedagogique/' },
  { id:'educators', titleFr:'Espace éducateurs', titleWo:'Wàllu jàngalekat yi', descriptionFr:'Parcours, séances et ressources pour écoles, crèches et associations.', descriptionWo:'Parcours ak jumtukaay yu école, crèche ak association.', url:'https://nianikids.com/espace-educateurs/' },
  { id:'sound-game', titleFr:'Écouter les sons autour de nous', titleWo:'Déglu baat yi nu wër', descriptionFr:'Un jeu d’écoute et de rythme à partager en famille.', descriptionWo:'Po ak déglu ak rythme ci biir kër gi.', url:'https://nianikids.com/ecouter-les-sons-autour-de-nous-jeu-attention/' },
  { id:'market-game', titleFr:'Le petit marché à la maison', titleWo:'Marché bu ndaw ci kër gi', descriptionFr:'Nommer, trier et compter avec les fruits et légumes.', descriptionWo:'Tudde, séddale ak lim ak meññeef yi.', url:'https://nianikids.com/petit-marche-maison-nommer-trier-compter/' },
  { id:'regions-game', titleFr:'Les 14 régions du Sénégal', titleWo:'14 région yi Senegaal', descriptionFr:'Un jeu simple pour découvrir les régions du pays.', descriptionWo:'Po bu yomb ngir xam région yi ci réew mi.', url:'https://nianikids.com/les-14-regions-du-senegal-en-un-jeu/' },
  { id:'baobab-craft', titleFr:'Fabriquer un baobab en papier', titleWo:'Def ab gouy ci kayit', descriptionFr:'Une activité créative avec le personnage Baobab.', descriptionWo:'Jëf bu cosaan ak xarit bi Baobab.', url:'https://nianikids.com/fabriquer-un-baobab-en-papier/' },
  { id:'sing-together', titleFr:'5 moments pour chanter avec son enfant', titleWo:'5 waxtu ngir woy ak sa doom', descriptionFr:'Des idées simples pour intégrer les chansons au quotidien.', descriptionWo:'Xalaat yu yomb ngir dugal woy yi ci bés bu nekk.', url:'https://nianikids.com/5-moments-quotidien-chanter-avec-enfant/' }
];
