/**
 * YouTube video catalogue.
 * Add only videos after they are public, reviewed and confirmed embeddable.
 * The mobile app opens YouTube only through the Parents area / adult gate.
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

export const videoCatalog: VideoRecord[] = [];

export function isValidYouTubeVideoId(value: string): boolean {
  return /^[A-Za-z0-9_-]{11}$/.test(value);
}

export function getYouTubeWatchUrl(videoId: string): string | null {
  return isValidYouTubeVideoId(videoId)
    ? 'https://www.youtube.com/watch?v=' + videoId
    : null;
}

export function getYouTubeThumbnail(video: VideoRecord): string | null {
  if (video.thumbnailUrl && /^https:\/\/(i\.ytimg\.com|nianikids\.com)\//.test(video.thumbnailUrl)) {
    return video.thumbnailUrl;
  }
  return isValidYouTubeVideoId(video.youtubeVideoId)
    ? 'https://i.ytimg.com/vi/' + video.youtubeVideoId + '/hqdefault.jpg'
    : null;
}

export function getPublishedVideos(): VideoRecord[] {
  return videoCatalog.filter((video) =>
    video.public && video.reviewed && video.embeddable && isValidYouTubeVideoId(video.youtubeVideoId)
  );
}
