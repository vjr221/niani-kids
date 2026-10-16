export type Language = 'fr' | 'wo';

export const translations = {
  fr: {
    home: 'Accueil', explore: 'Explorer', favorites: 'Favoris', parents: 'Parents',
    greeting: 'Nanga def, les amis !', tagline: 'Chanter • rêver • grandir',
    featured: 'À découvrir', categories: 'Nos univers', empty: 'Tes favoris apparaîtront ici.',
    parentTitle: 'Un espace pour les parents',
    parentBody: 'Niani Kids accompagne les tout-petits avec des chansons, des histoires et des découvertes adaptées à leur âge.',
    youtube: 'Voir notre chaîne YouTube', tiktok: 'Nous retrouver sur TikTok',
    search: 'Rechercher une chanson ou une histoire', library: 'Ma bibliothèque',
    all: 'Tout', lullabies: 'Berceuses', rhymes: 'Comptines', learn: 'J’apprends', stories: 'Histoires',
    play: 'Jouer', workshop: 'Atelier', noResults: 'Aucun contenu trouvé', resetFilters: 'Réinitialiser les filtres',
    soon: 'Bientôt disponible', parentsOnly: 'Espace Parents', discover: 'Découvrir', listen: 'Écouter le texte', stop: 'Arrêter',
    close: 'Fermer', opening: 'Ouvrir', parentSpaceTitle: 'Retrouver Niani Kids', parentSafetyTitle: 'Un espace adapté aux enfants', parentSafetyBody: 'Les liens externes ouvrent des plateformes tierces. Un adulte doit accompagner l’enfant. Cette version ne propose ni publicité intégrée, ni messagerie, ni achat.', officialYoutube: 'Voir la chaîne officielle sur YouTube', sharedWithAdult: 'À partager avec un parent ou un éducateur.', singTogether: 'Chantons ensemble', storyLabel: 'L’histoire', questionLabel: 'Petite question', contentComing: 'Bientôt dans la bibliothèque', contentComingBody: 'Le texte complet ou la vidéo officielle de ce contenu reste à produire. Cette fiche sera complétée lors de la production.', playText: 'Lecture en cours…',
  },
  wo: {
    home: 'Kër', explore: 'Seet', favorites: 'Sama yi', parents: 'Waalid',
    greeting: 'Nanga def, xarit yi!', tagline: 'Woy • nelaw • màgg',
    featured: 'Li nga war a seet', categories: 'Sunu àddina', empty: 'Sama yi nga tànn dinañu fee feeñ.',
    parentTitle: 'Bérab bu waalid yi',
    parentBody: 'Niani Kids dafay dimbali xale yi ci woy, nettali ak jàngat.',
    youtube: 'Seet sunu chaîne YouTube', tiktok: 'Gis nu ci TikTok',
    search: 'Wut woy walla nettali', library: 'Sama téere', all: 'Lépp',
    lullabies: 'Woy yu nelaw', rhymes: 'Woy xale', learn: 'Jàng', stories: 'Nettali',
    play: 'Fo', workshop: 'Jëfandikoo', noResults: 'Amul li nga seet', resetFilters: 'Delloo natt yi',
    soon: 'Dina ñëw', parentsOnly: 'Bérab bu waalid yi', discover: 'Seet', listen: 'Déglu téere bi', stop: 'Taxawal',
    close: 'Tëj', opening: 'Ubbi', parentSpaceTitle: 'Gis Niani Kids', parentSafetyTitle: 'Bérab bu baax ci xale yi', parentSafetyBody: 'Link yu biti dañuy ubbi yeneen platform. Mag war na ànd ak xale bi. Ci version bii amul publicité, bataaxal yu nit ñi di yëgle, walla jaay.', officialYoutube: 'Xool sunu chaîne YouTube', sharedWithAdult: 'Seetal ak sa waalid walla jàngalekat.', singTogether: 'Woyal nu bokk', storyLabel: 'Nettali bi', questionLabel: 'Laaj bu ndaw', contentComing: 'Dina ñëw ci téere bi', contentComingBody: 'Mbind mi walla wideyo bu dëgg-dëgg dafay soxla ñu def ko. Dinañu mottali kayit bii bu production bi paree.', playText: 'Mbind mi ngi dox…',
  },
} as const;
