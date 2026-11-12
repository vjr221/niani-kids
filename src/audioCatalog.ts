/**
 * Audio catalogue for the published Niani Kids songs.
 * Approved tracks are playable; tracks awaiting language/rights review remain gated.
 * MP3 files stream from their corresponding public WordPress media records.
 */
import type { ContentItem } from './content';
export type AudioReviewStatus = 'needs-identification' | 'needs-editorial-review' | 'approved';
export type AudioAlternateRecord = { title: string; sourceUrl: string; reviewStatus: AudioReviewStatus; languageReviewed: boolean; rightsConfirmed: boolean };
export type AudioTrackRecord = { contentId: ContentItem['id']; attachmentId?: number; sourceUrl?: string; assetPath?: string; coverUrl?: string; reviewStatus: AudioReviewStatus; languageReviewed: boolean; rightsConfirmed: boolean; notes: string; alternateSources?: AudioAlternateRecord[] };
const approved = (contentId: ContentItem['id'], attachmentId: number, url: string, coverFile: string): AudioTrackRecord => ({
  contentId, attachmentId, sourceUrl: url, assetPath: url, coverUrl: `https://nianikids.com/wp-content/uploads/2026/11/${coverFile}`,
  reviewStatus: 'approved', languageReviewed: true, rightsConfirmed: true,
  notes: 'Paroles et publication mobile validées par le responsable du projet Niani Kids.'
});
export const audioCatalog: AudioTrackRecord[] = [
  approved('song-niani-kids',229,'https://nianikids.com/wp-content/uploads/2026/10/Niani-kids.mp3','30_Bonjour_bonjour_original.jpg'),
  approved('song-bonjour-v2',148,'https://nianikids.com/wp-content/uploads/2026/10/niani-bonjour-maquette-02.mp3','29_Bonjour_bonjour_version_2.jpg'),
  approved('song-welcome',149,'https://nianikids.com/wp-content/uploads/2026/10/niani-bienvenue.mp3','28_Bienvenue_chez_Niani_Kids.jpg'),
  approved('song-start',150,'https://nianikids.com/wp-content/uploads/2026/10/niani-cest-parti.mp3','27_Niani_Kids_c_est_parti.jpg'),
  approved('song-colors',151,'https://nianikids.com/wp-content/uploads/2026/10/niani-les-couleurs-dansent.mp3','26_Les_couleurs_dansent.jpg'),
  approved('song-sleep',152,'https://nianikids.com/wp-content/uploads/2026/10/niani-dors-petit-coeur.mp3','25_Dors_petit_coeur.jpg'),
  approved('song-animals',153,'https://nianikids.com/wp-content/uploads/2026/10/niani-animaux-du-senegal.mp3','24_Les_animaux_du_Senegal.jpg'),
  approved('song-count-10',154,'https://nianikids.com/wp-content/uploads/2026/10/niani-comptons-jusqua-10.mp3','23_Comptons_jusqu_a_10.jpg'),
  approved('song-move-stop',155,'https://nianikids.com/wp-content/uploads/2026/10/niani-bouge-et-stop.mp3','22_Bouge_et_stop.jpg'),
  approved('song-baobab-tale',156,'https://nianikids.com/wp-content/uploads/2026/10/niani-conte-musical-baobab.mp3','21_Conte_musical_du_Baobab.jpg'),
  approved('song-nuyoo',157,'https://nianikids.com/wp-content/uploads/2026/10/niani-nuyoo-nuyoo.mp3','20_Nuyoo_nuyoo.jpg'),
  approved('song-shapes',158,'https://nianikids.com/wp-content/uploads/2026/10/niani-les-formes.mp3','19_Les_formes.jpg'),
  approved('song-weekdays',159,'https://nianikids.com/wp-content/uploads/2026/10/niani-jours-semaine.mp3','18_Les_jours_de_la_semaine.jpg'),
  approved('song-fruits',160,'https://nianikids.com/wp-content/uploads/2026/10/niani-fruits-senegal.mp3','17_Les_fruits_du_Senegal.jpg'),
  approved('song-hands',161,'https://nianikids.com/wp-content/uploads/2026/10/niani-je-lave-mes-mains.mp3','16_Je_lave_mes_mains.jpg'),
  approved('song-emotions',162,'https://nianikids.com/wp-content/uploads/2026/10/niani-ris-pleure.mp3','15_Quand_je_ris_quand_je_pleure.jpg'),
  approved('song-family',163,'https://nianikids.com/wp-content/uploads/2026/10/niani-ma-famille-mes-amis.mp3','13_Ma_famille_mes_amis.jpg'),
  approved('song-teeth',164,'https://nianikids.com/wp-content/uploads/2026/10/niani-je-brosse-mes-dents-version-b.mp3','14_Je_brosse_mes_petites_dents.jpg'),
  approved('song-tidy',165,'https://nianikids.com/wp-content/uploads/2026/10/niani-je-range-mes-jouets.mp3','12_Je_range_mes_jouets.jpg'),
  approved('song-thanks',166,'https://nianikids.com/wp-content/uploads/2026/10/niani-sil-te-plait-merci.mp3','11_S_il_te_plait_merci.jpg'),
  approved('song-dress',167,'https://nianikids.com/wp-content/uploads/2026/10/niani-je-mhabille-tout-seul.mp3','10_Je_m_habille_tout_seul.jpg'),
  approved('song-how-are-you',168,'https://nianikids.com/wp-content/uploads/2026/10/niani-bonjour-comment-ca-va.mp3','09_Bonjour_comment_ca_va.jpg'),
  approved('song-body-parts',169,'https://nianikids.com/wp-content/uploads/2026/10/niani-tete-epaules-mains-pieds.mp3','08_Tete_epaules_mains_pieds.jpg'),
  approved('song-meal',170,'https://nianikids.com/wp-content/uploads/2026/10/niani-a-table-bon-appetit.mp3','07_A_table_bon_appetit.jpg'),
  approved('song-vegetables',171,'https://nianikids.com/wp-content/uploads/2026/10/niani-les-legumes-font-la-fete.mp3','06_Les_legumes_font_la_fete.jpg'),
  {
    contentId: 'song-theme', attachmentId: 250,
    coverUrl: 'https://nianikids.com/wp-content/uploads/2026/11/05_Nu_ngi_fii.jpg',
    sourceUrl: 'https://nianikids.com/wp-content/uploads/2026/11/NIANI-NIANI-—-NU-NGI-FII.mp3',
    assetPath: 'https://nianikids.com/wp-content/uploads/2026/11/NIANI-NIANI-—-NU-NGI-FII.mp3',
    reviewStatus: 'approved', languageReviewed: true, rightsConfirmed: true,
    notes: 'Droits de diffusion, paroles et prononciation wolof validés par le responsable du projet Niani Kids.'
  },
  {
    contentId: 'song-nanu-fecc', attachmentId: 286,
    coverUrl: 'https://nianikids.com/wp-content/uploads/2026/11/04_Nianu_fecc.jpg',
    sourceUrl: 'https://nianikids.com/wp-content/uploads/2026/11/Niani-Kids-–-Nanu-fecc-Dansons-.mp3',
    assetPath: 'https://nianikids.com/wp-content/uploads/2026/11/Niani-Kids-–-Nanu-fecc-Dansons-.mp3',
    reviewStatus: 'needs-editorial-review', languageReviewed: false, rightsConfirmed: true,
    notes: 'Master mis en attente de vérification : les paroles intégrées au fichier audio mentionnent encore Hey! Hey! dans l’introduction, contrairement à la version validée. Ne pas diffuser dans l’application avant contrôle du master.'
  },
  approved('song-yaaye-sama-yaay',770,'https://nianikids.com/wp-content/uploads/2026/11/Yaaye-Sama-Yaay.mp3','Yaaye_Sama_Yaay_Miniature_YouTube_16-9.jpg'),
  approved('song-nene-touti',767,'https://nianikids.com/wp-content/uploads/2026/11/Nene-Touti.mp3','01_Nene_Touti.jpg'),
  approved('song-dors-mon-petit-bebe',761,'https://nianikids.com/wp-content/uploads/2026/11/Dors-mon-petit-bebe.mp3','02_Dors_mon_petit_bebe.jpg'),
  approved('song-nelawal-sama-nene',763,'https://nianikids.com/wp-content/uploads/2026/11/Nelawal-Sama-Nene.mp3','03_Nelawal_Sama_Nene.jpg'),
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
