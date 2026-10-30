/**
 * Niani Kids audio review registry.
 * All 25 candidate MP3s are available for listening in the review build, but remain
 * editorially unapproved. The three separate masters stay registered independently.
 */
import type { ContentItem } from './content';
export type AudioReviewStatus = 'needs-identification' | 'needs-editorial-review' | 'approved';
export type AudioTrackRecord = {
  contentId: string;
  assetPath?: string;
  sourceFileName?: string;
  durationSeconds?: number;
  wordpressAttachmentId?: number;
  audioKind: 'catalog-candidate' | 'separate-master';
  reviewStatus: AudioReviewStatus;
  languageReviewed: boolean;
  rightsConfirmed: boolean;
  notes: string;
};
const candidateTracks: AudioTrackRecord[] = [
  {
    "contentId": "song-bonjour-maquette-01",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-bonjour-maquette-01.mp3",
    "sourceFileName": "niani-bonjour-maquette-01.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 147,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-bonjour-maquette-02",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-bonjour-maquette-02.mp3",
    "sourceFileName": "niani-bonjour-maquette-02.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 148,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-welcome",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-bienvenue.mp3",
    "sourceFileName": "niani-bienvenue.mp3",
    "durationSeconds": 81,
    "wordpressAttachmentId": 149,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-niani-cest-parti",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-cest-parti.mp3",
    "sourceFileName": "niani-cest-parti.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 150,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-colors",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-les-couleurs-dansent.mp3",
    "sourceFileName": "niani-les-couleurs-dansent.mp3",
    "durationSeconds": 79,
    "wordpressAttachmentId": 151,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-lullaby-heart",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-dors-petit-coeur.mp3",
    "sourceFileName": "niani-dors-petit-coeur.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 152,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-animals-senegal",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-animaux-du-senegal.mp3",
    "sourceFileName": "niani-animaux-du-senegal.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 153,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-count-10",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-comptons-jusqua-10.mp3",
    "sourceFileName": "niani-comptons-jusqua-10.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 154,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-bouge-stop",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-bouge-et-stop.mp3",
    "sourceFileName": "niani-bouge-et-stop.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 155,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-conte-baobab",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-conte-musical-baobab.mp3",
    "sourceFileName": "niani-conte-musical-baobab.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 156,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-nuyoo",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-nuyoo-nuyoo.mp3",
    "sourceFileName": "niani-nuyoo-nuyoo.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 157,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-shapes",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-les-formes.mp3",
    "sourceFileName": "niani-les-formes.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 158,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-days-week",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-jours-semaine.mp3",
    "sourceFileName": "niani-jours-semaine.mp3",
    "durationSeconds": 73,
    "wordpressAttachmentId": 159,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-fruits-senegal",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-fruits-senegal.mp3",
    "sourceFileName": "niani-fruits-senegal.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 160,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-wash-hands",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-je-lave-mes-mains.mp3",
    "sourceFileName": "niani-je-lave-mes-mains.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 161,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-emotions",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-ris-pleure.mp3",
    "sourceFileName": "niani-ris-pleure.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 162,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-family-friends",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-ma-famille-mes-amis.mp3",
    "sourceFileName": "niani-ma-famille-mes-amis.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 163,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-teeth-brushing",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-je-brosse-mes-dents-version-b.mp3",
    "sourceFileName": "niani-je-brosse-mes-dents-version-b.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 164,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-tidy-toys",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-je-range-mes-jouets.mp3",
    "sourceFileName": "niani-je-range-mes-jouets.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 165,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-please-thanks",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-sil-te-plait-merci.mp3",
    "sourceFileName": "niani-sil-te-plait-merci.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 166,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-dress-self",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-je-mhabille-tout-seul.mp3",
    "sourceFileName": "niani-je-mhabille-tout-seul.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 167,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-bonjour-comment",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-bonjour-comment-ca-va.mp3",
    "sourceFileName": "niani-bonjour-comment-ca-va.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 168,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-body-parts",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-tete-epaules-mains-pieds.mp3",
    "sourceFileName": "niani-tete-epaules-mains-pieds.mp3",
    "durationSeconds": 88,
    "wordpressAttachmentId": 169,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-mealtime",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-a-table-bon-appetit.mp3",
    "sourceFileName": "niani-a-table-bon-appetit.mp3",
    "durationSeconds": 81,
    "wordpressAttachmentId": 170,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  },
  {
    "contentId": "song-vegetables",
    "assetPath": "https://nianikids.com/wp-content/uploads/2026/10/niani-les-legumes-font-la-fete.mp3",
    "sourceFileName": "niani-les-legumes-font-la-fete.mp3",
    "durationSeconds": 75,
    "wordpressAttachmentId": 171,
    "audioKind": "catalog-candidate",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "Candidat du catalogue officiel; à écouter et comparer aux paroles avant approbation."
  }
];
const separateMasters: AudioTrackRecord[] = [
  { contentId: 'master-reference-bonjour', sourceFileName: '01 Bonjour Bonjour les amis.m4a', durationSeconds: 144.8, audioKind: 'separate-master', reviewStatus: 'needs-editorial-review', languageReviewed: false, rightsConfirmed: false, notes: 'Master séparé reçu; similarité d’enveloppe 0,977 avec `Bonjour Bonjour Niani kids.mp3` (144,84 s), décalage estimé ~0,02 s. Garder ce M4A comme référence et confirmer à l’écoute. Fichier à intégrer matériellement.' },
  { contentId: 'master-reference-welcome', sourceFileName: '02 — Bienvenue chez Niani Kids.m4a', durationSeconds: 60, audioKind: 'separate-master', reviewStatus: 'needs-identification', languageReviewed: false, rightsConfirmed: false, notes: 'Master séparé reçu; durée différente du candidat du catalogue (81 secondes) et similarité d’enveloppe faible (0,143). Garder distinct jusqu’à écoute comparative.' },
  { contentId: 'master-reference-theme', sourceFileName: '03 - NIANI! NIANI! — ÑU NGI FII!.m4a', durationSeconds: 60, audioKind: 'separate-master', reviewStatus: 'needs-identification', languageReviewed: false, rightsConfirmed: false, notes: 'Master séparé reçu; similarité d’enveloppe faible (0,210) avec le MP3 homonyme du ZIP. Garder séparément jusqu’à écoute comparative et validation wolof.' },
];
export const audioCatalog: AudioTrackRecord[] = [...candidateTracks, ...separateMasters];
export function getAudioTrack(contentId: ContentItem['id']): AudioTrackRecord | undefined { return audioCatalog.find(track => track.contentId === contentId); }
export function isAudioReady(track: AudioTrackRecord | undefined): track is AudioTrackRecord & { assetPath: string } {
  return Boolean(track?.assetPath && track.reviewStatus === 'approved' && track.languageReviewed && track.rightsConfirmed);
}
