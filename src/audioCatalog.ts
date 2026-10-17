/**
 * Audio publication gate for Niani Kids.
 *
 * Do not map uploaded files named `content.mp3` to a song by filename/order.
 * Each master must first be auditioned, transcribed, matched to a title/language,
 * checked for rights and approved by the editorial owner. Until then the app must
 * treat the track as having no playable master.
 */
import type { ContentItem } from './content';

export type AudioReviewStatus = 'needs-identification' | 'needs-editorial-review' | 'approved';
export type AudioTrackRecord = {
  contentId: ContentItem['id'];
  assetPath?: string;
  reviewStatus: AudioReviewStatus;
  languageReviewed: boolean;
  rightsConfirmed: boolean;
  notes: string;
};

/** Explicitly unlinked until each uploaded ElevenLabs master is identified. */
export const audioCatalog: AudioTrackRecord[] = [];

export function getAudioTrack(contentId: ContentItem['id']): AudioTrackRecord | undefined {
  return audioCatalog.find((track) => track.contentId === contentId);
}

/** A track is playable only after the asset and editorial/legal checks are complete. */
export function isAudioReady(track: AudioTrackRecord | undefined): track is AudioTrackRecord & { assetPath: string } {
  return Boolean(
    track?.assetPath &&
    track.reviewStatus === 'approved' &&
    track.languageReviewed &&
    track.rightsConfirmed,
  );
}
