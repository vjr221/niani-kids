/**
 * Audio catalogue for the published Niani Kids songs.
 * Approved tracks are playable; tracks awaiting language/rights review remain gated.
 * MP3 files stream from their corresponding public WordPress media records.
 */
import type { ContentItem } from './content';
export type AudioReviewStatus = 'needs-identification' | 'needs-editorial-review' | 'approved';
export type AudioAlternateRecord = { title: string; sourceUrl: string; reviewStatus: AudioReviewStatus; languageReviewed: boolean; rightsConfirmed: boolean };
export type AudioTrackRecord = { contentId: ContentItem['id']; attachmentId?: number; sourceUrl?: string; assetPath?: string; reviewStatus: AudioReviewStatus; languageReviewed: boolean; rightsConfirmed: boolean; notes: string; alternateSources?: AudioAlternateRecord[] };
const approved = (contentId: ContentItem['id'], attachmentId: number, url: string): AudioTrackRecord => ({
  contentId, attachmentId, sourceUrl: url, assetPath: url,
  reviewStatus: 'approved', languageReviewed: true, rightsConfirmed: true,
  notes: 'Paroles et publication mobile validées par le responsable du projet Niani Kids.'
});
export const audioCatalog: AudioTrackRecord[] = [
  approved('song-bonjour-v2',148,'https://nianikids.com/wp-content/uploads/2026/10/niani-bonjour-maquette-02.mp3'),
  approved('song-welcome',149,'https://nianikids.com/wp-content/uploads/2026/10/niani-bienvenue.mp3'),
  approved('song-start',150,'https://nianikids.com/wp-content/uploads/2026/10/niani-cest-parti.mp3'),
  approved('song-colors',151,'https://nianikids.com/wp-content/uploads/2026/10/niani-les-couleurs-dansent.mp3'),
  approved('song-sleep',152,'https://nianikids.com/wp-content/uploads/2026/10/niani-dors-petit-coeur.mp3'),
  approved('song-animals',153,'https://nianikids.com/wp-content/uploads/2026/10/niani-animaux-du-senegal.mp3'),
  approved('song-count-10',154,'https://nianikids.com/wp-content/uploads/2026/10/niani-comptons-jusqua-10.mp3'),
  approved('song-move-stop',155,'https://nianikids.com/wp-content/uploads/2026/10/niani-bouge-et-stop.mp3'),
  approved('song-baobab-tale',156,'https://nianikids.com/wp-content/uploads/2026/10/niani-conte-musical-baobab.mp3'),
  approved('song-nuyoo',157,'https://nianikids.com/wp-content/uploads/2026/10/niani-nuyoo-nuyoo.mp3'),
  approved('song-shapes',158,'https://nianikids.com/wp-content/uploads/2026/10/niani-les-formes.mp3'),
  approved('song-weekdays',159,'https://nianikids.com/wp-content/uploads/2026/10/niani-jours-semaine.mp3'),
  approved('song-fruits',160,'https://nianikids.com/wp-content/uploads/2026/10/niani-fruits-senegal.mp3'),
  approved('song-hands',161,'https://nianikids.com/wp-content/uploads/2026/10/niani-je-lave-mes-mains.mp3'),
  approved('song-emotions',162,'https://nianikids.com/wp-content/uploads/2026/10/niani-ris-pleure.mp3'),
  approved('song-family',163,'https://nianikids.com/wp-content/uploads/2026/10/niani-ma-famille-mes-amis.mp3'),
  approved('song-teeth',164,'https://nianikids.com/wp-content/uploads/2026/10/niani-je-brosse-mes-dents-version-b.mp3'),
  approved('song-tidy',165,'https://nianikids.com/wp-content/uploads/2026/10/niani-je-range-mes-jouets.mp3'),
  approved('song-thanks',166,'https://nianikids.com/wp-content/uploads/2026/10/niani-sil-te-plait-merci.mp3'),
  approved('song-dress',167,'https://nianikids.com/wp-content/uploads/2026/10/niani-je-mhabille-tout-seul.mp3'),
  approved('song-how-are-you',168,'https://nianikids.com/wp-content/uploads/2026/10/niani-bonjour-comment-ca-va.mp3'),
  approved('song-body-parts',169,'https://nianikids.com/wp-content/uploads/2026/10/niani-tete-epaules-mains-pieds.mp3'),
  approved('song-meal',170,'https://nianikids.com/wp-content/uploads/2026/10/niani-a-table-bon-appetit.mp3'),
  approved('song-vegetables',171,'https://nianikids.com/wp-content/uploads/2026/10/niani-les-legumes-font-la-fete.mp3'),
  {
    contentId: 'song-theme', attachmentId: 250,
    sourceUrl: 'https://nianikids.com/wp-content/uploads/2026/11/NIANI-NIANI-—-NU-NGI-FII.mp3',
    assetPath: 'https://nianikids.com/wp-content/uploads/2026/11/NIANI-NIANI-—-NU-NGI-FII.mp3',
    reviewStatus: 'approved', languageReviewed: true, rightsConfirmed: true,
    notes: 'Droits de diffusion, paroles et prononciation wolof validés par le responsable du projet Niani Kids.'
  },
  {
    contentId: 'song-nanu-fecc', attachmentId: 286,
    sourceUrl: 'https://nianikids.com/wp-content/uploads/2026/11/Niani-Kids-–-Nanu-fecc-Dansons-.mp3',
    assetPath: 'https://nianikids.com/wp-content/uploads/2026/11/Niani-Kids-–-Nanu-fecc-Dansons-.mp3',
    reviewStatus: 'needs-editorial-review', languageReviewed: false, rightsConfirmed: true,
    notes: 'Master mis en attente de vérification : les paroles intégrées au fichier audio mentionnent encore Hey! Hey! dans l’introduction, contrairement à la version validée. Ne pas diffuser dans l’application avant contrôle du master.'
  },
  approved('song-yaaye-sama-yaay',770,'https://nianikids.com/wp-content/uploads/2026/11/Yaaye-Sama-Yaay.mp3'),
  approved('song-nene-touti',767,'https://nianikids.com/wp-content/uploads/2026/11/Nene-Touti.mp3'),
  approved('song-dors-mon-petit-bebe',761,'https://nianikids.com/wp-content/uploads/2026/11/Dors-mon-petit-bebe.mp3'),
  approved('song-nelawal-sama-nene',763,'https://nianikids.com/wp-content/uploads/2026/11/Nelawal-Sama-Nene.mp3'),
];
const yaayeTrack = audioCatalog.find((track) => track.contentId === 'song-yaaye-sama-yaay');
if (yaayeTrack) yaayeTrack.alternateSources = [{
  title: 'Yaaye (Sama Yaay) – voix masculine',
  sourceUrl: 'https://nianikids.com/wp-content/uploads/2026/11/Yaaye-Sama-Yaay-Version-Masculine.mp3',
  reviewStatus: 'approved',
  languageReviewed: true,
  rightsConfirmed: true,
}];
export function getAudioTrack(contentId: ContentItem['id']): AudioTrackRecord | undefined { return audioCatalog.find((track) => track.contentId === contentId); }
export function isAudioReady(track: AudioTrackRecord | undefined): track is AudioTrackRecord & { assetPath: string } { return Boolean(track?.assetPath && track.reviewStatus === 'approved' && track.languageReviewed && track.rightsConfirmed); }
