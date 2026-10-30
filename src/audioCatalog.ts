/**
 * Official 25-song catalogue approved by the Niani Kids project owner.
 * MP3 files stream from the corresponding public WordPress media records.
 * Three separately supplied M4A masters remain tracked independently.
 */
import type { ContentItem } from './content';
export type AudioReviewStatus = 'needs-identification' | 'needs-editorial-review' | 'approved';
export type AudioTrackRecord = { contentId: ContentItem['id']; attachmentId?: number; sourceUrl?: string; assetPath?: string; reviewStatus: AudioReviewStatus; languageReviewed: boolean; rightsConfirmed: boolean; notes: string };
const approved = (contentId: ContentItem['id'], attachmentId: number, url: string): AudioTrackRecord => ({
  contentId, attachmentId, sourceUrl: url, assetPath: url,
  reviewStatus: 'approved', languageReviewed: true, rightsConfirmed: true,
  notes: 'Paroles et publication mobile validées par le responsable du projet Niani Kids.'
});
export const audioCatalog: AudioTrackRecord[] = [
  approved('song-bonjour',147,'https://nianikids.com/wp-content/uploads/2026/10/niani-bonjour-maquette-01.mp3'),
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
  approved('song-vegetables',171,'https://nianikids.com/wp-content/uploads/2026/10/niani-les-legumes-font-la-fete.mp3')
];
export function getAudioTrack(contentId: ContentItem['id']): AudioTrackRecord | undefined { return audioCatalog.find((track) => track.contentId === contentId); }
export function isAudioReady(track: AudioTrackRecord | undefined): track is AudioTrackRecord & { assetPath: string } { return Boolean(track?.assetPath && track.reviewStatus === 'approved' && track.languageReviewed && track.rightsConfirmed); }
