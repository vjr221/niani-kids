/**
 * Audio publication gate for Niani Kids.
 *
 * Reference masters are registered here before their assets are added, so they
 * remain unplayable until editorial, language and rights checks are complete.
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

/**
 * Official reference masters received 2026-10-26.
 * No assetPath is set yet: source files are not in the repository and must be
 * validated/transcoded for target players before playback is enabled.
 */
export const audioCatalog: AudioTrackRecord[] = [
  {
    contentId: 'song-bonjour',
    reviewStatus: 'needs-editorial-review',
    languageReviewed: false,
    rightsConfirmed: false,
    notes: 'Reference: 01 Bonjour Bonjour les amis.m4a; confirm lyrics match before linking asset.',
  },
  {
    contentId: 'song-welcome',
    reviewStatus: 'needs-identification',
    languageReviewed: false,
    rightsConfirmed: false,
    notes: 'Reference: 02 — Bienvenue chez Niani Kids.m4a; content record still needs to be added and validated.',
  },
  {
    contentId: 'song-theme',
    reviewStatus: 'needs-identification',
    languageReviewed: false,
    rightsConfirmed: false,
    notes: 'Reference: 03 - NIANI! NIANI! — ÑU NGI FII!.m4a; content record and Wolof lyrics need validation.',
  },
];

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
