/**
 * Catalogue vidéo YouTube Niani Kids.
 * WordPress est la source de vérité : les vidéos publiques et validées sont chargées à distance.
 */
export type VideoLanguage = 'FR' | 'WO' | 'FR + WO';
export type VideoAgeBand = '0–2 ans' | '3–4 ans' | '5–6 ans' | 'Famille';
export type VideoCategory = 'Comptines' | 'Berceuses' | 'Histoires' | 'Apprendre' | 'Sénégal' | 'Coulisses';
export type VideoRecord = {
  id: string;
  youtubeVideoId: string;
  title: string;
  description: string;
  category: VideoCategory;
  language: VideoLanguage;
  ageBand: VideoAgeBand;
  duration?: string;
  publishedAt?: string;
  thumbnailUrl?: string;
  featured?: boolean;
  reviewed: boolean;
  public: boolean;
  embeddable: boolean;
};

const VIDEO_API_URL = 'https://nianikids.com/wp-json/niani-video/v1/videos';
const categories: VideoCategory[] = ['Comptines','Berceuses','Histoires','Apprendre','Sénégal','Coulisses'];
const languages: VideoLanguage[] = ['FR','WO','FR + WO'];
const ageBands: VideoAgeBand[] = ['0–2 ans','3–4 ans','5–6 ans','Famille'];
export const videoCatalog: VideoRecord[] = [];

export function isValidYouTubeVideoId(value: string): boolean {
  return /^[A-Za-z0-9_-]{11}$/.test(value);
}

export function getYouTubeWatchUrl(videoId: string): string | null {
  return isValidYouTubeVideoId(videoId) ? 'https://www.youtube.com/watch?v=' + videoId : null;
}

export function getYouTubeThumbnail(video: VideoRecord): string | null {
  if (video.thumbnailUrl && /^https:\/\/(i\.ytimg\.com|nianikids\.com)\//.test(video.thumbnailUrl)) return video.thumbnailUrl;
  return isValidYouTubeVideoId(video.youtubeVideoId) ? 'https://i.ytimg.com/vi/' + video.youtubeVideoId + '/hqdefault.jpg' : null;
}

export function getPublishedVideos(): VideoRecord[] {
  return videoCatalog.filter(video => video.public && video.reviewed && video.embeddable && isValidYouTubeVideoId(video.youtubeVideoId));
}

export async function fetchPublishedVideos(): Promise<VideoRecord[]> {
  const response = await fetch(VIDEO_API_URL, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error('Impossible de charger le catalogue vidéo Niani Kids.');
  const payload = await response.json();
  const rows = Array.isArray(payload?.videos) ? payload.videos : [];
  return rows.filter((item: any) =>
    item && isValidYouTubeVideoId(String(item.youtubeVideoId || '')) &&
    item.public === true && item.reviewed === true && item.embeddable === true &&
    categories.includes(item.category) && languages.includes(item.language) && ageBands.includes(item.ageBand)
  ).map((item: any) => ({
    id: String(item.id),
    youtubeVideoId: String(item.youtubeVideoId),
    title: String(item.title || 'Vidéo Niani Kids'),
    description: String(item.description || ''),
    category: item.category as VideoCategory,
    language: item.language as VideoLanguage,
    ageBand: item.ageBand as VideoAgeBand,
    duration: item.duration ? String(item.duration) : undefined,
    publishedAt: item.publishedAt ? String(item.publishedAt) : undefined,
    thumbnailUrl: item.thumbnailUrl ? String(item.thumbnailUrl) : undefined,
    reviewed: true,
    public: true,
    embeddable: true,
  }));
}
