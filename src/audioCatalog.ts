/**
 * Audio candidates from the Niani Kids WordPress library.
 * The source URLs are for traceability only; the player remains disabled until approval.
 */
import type { ContentItem } from './content';
export type AudioReviewStatus = 'needs-identification' | 'needs-editorial-review' | 'approved';
export type AudioTrackRecord = { contentId: ContentItem['id']; attachmentId?: number; sourceUrl?: string; assetPath?: string; reviewStatus: AudioReviewStatus; languageReviewed: boolean; rightsConfirmed: boolean; notes: string };
export const audioCatalog: AudioTrackRecord[] = [
  {
    "contentId": "song-bonjour",
    "attachmentId": 147,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-bonjour-maquette-01.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 147) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-bonjour-v2",
    "attachmentId": 148,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-bonjour-maquette-02.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 148) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-welcome",
    "attachmentId": 149,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-bienvenue.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 149) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-start",
    "attachmentId": 150,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-cest-parti.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 150) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-colors",
    "attachmentId": 151,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-les-couleurs-dansent.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 151) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-sleep",
    "attachmentId": 152,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-dors-petit-coeur.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 152) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-animals",
    "attachmentId": 153,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-animaux-du-senegal.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 153) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-count-10",
    "attachmentId": 154,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-comptons-jusqua-10.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 154) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-move-stop",
    "attachmentId": 155,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-bouge-et-stop.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 155) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-baobab-tale",
    "attachmentId": 156,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-conte-musical-baobab.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 156) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-nuyoo",
    "attachmentId": 157,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-nuyoo-nuyoo.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 157) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-shapes",
    "attachmentId": 158,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-les-formes.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 158) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-weekdays",
    "attachmentId": 159,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-jours-semaine.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 159) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-fruits",
    "attachmentId": 160,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-fruits-senegal.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 160) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-hands",
    "attachmentId": 161,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-je-lave-mes-mains.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 161) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-emotions",
    "attachmentId": 162,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-ris-pleure.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 162) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-teeth",
    "attachmentId": 164,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-je-brosse-mes-dents-version-b.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 164) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-family",
    "attachmentId": 163,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-ma-famille-mes-amis.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 163) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-tidy",
    "attachmentId": 165,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-je-range-mes-jouets.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 165) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-thanks",
    "attachmentId": 166,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-sil-te-plait-merci.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 166) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-dress",
    "attachmentId": 167,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-je-mhabille-tout-seul.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 167) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-how-are-you",
    "attachmentId": 168,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-bonjour-comment-ca-va.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 168) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-body-parts",
    "attachmentId": 169,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-tete-epaules-mains-pieds.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 169) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-meal",
    "attachmentId": 170,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-a-table-bon-appetit.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 170) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  },
  {
    "contentId": "song-vegetables",
    "attachmentId": 171,
    "sourceUrl": "https://nianikids.com/wp-content/uploads/2026/10/niani-les-legumes-font-la-fete.mp3",
    "reviewStatus": "needs-editorial-review",
    "languageReviewed": false,
    "rightsConfirmed": false,
    "notes": "MP3 du site (média 171) ; écoute intégrale, correspondance des paroles, contrôle linguistique et droits à valider avant activation."
  }
];
export function getAudioTrack(contentId: ContentItem['id']): AudioTrackRecord | undefined { return audioCatalog.find((track) => track.contentId === contentId); }
export function isAudioReady(track: AudioTrackRecord | undefined): track is AudioTrackRecord & { assetPath: string } { return Boolean(track?.assetPath && track.reviewStatus === 'approved' && track.languageReviewed && track.rightsConfirmed); }
