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
 * Official reference masters received 2026-10-26 and rechecked technically 2026-10-29.
 * Source files are present in the working project Library, but are not bundled in this repository yet.
 * No assetPath is set: editorial review, language/rights checks and compatible asset packaging remain pending.
 */
export const audioCatalog: AudioTrackRecord[] = [
  {
    contentId: 'song-bonjour',
    reviewStatus: 'needs-editorial-review',
    languageReviewed: false,
    rightsConfirmed: false,
    notes: 'WordPress draft post ID 113; reference master available: 01 Bonjour Bonjour les amis.m4a (144.8 s, Opus/stereo/48 kHz); signal-envelope comparison strongly matches ZIP export `Bonjour Bonjour Niani kids.mp3` (similarity 0.977, ~0.02 s offset); keep M4A as reference, then listen and verify lyrics before linking asset.',
  },
  {
    contentId: 'song-welcome',
    reviewStatus: 'needs-identification',
    languageReviewed: false,
    rightsConfirmed: false,
    notes: 'Reference master available: 02 — Bienvenue chez Niani Kids.m4a (60 s, Opus/stereo/48 kHz); dedicated content record added, but audio-to-lyrics correspondence and rights still need review.',
  },
  {
    contentId: 'song-theme',
    reviewStatus: 'needs-identification',
    languageReviewed: false,
    rightsConfirmed: false,
    notes: 'Reference master available: 03 - NIANI! NIANI! — ÑU NGI FII!.m4a (60 s, Opus/stereo/48 kHz); dedicated content record added, but Wolof lyrics require review and rights confirmation.',
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
