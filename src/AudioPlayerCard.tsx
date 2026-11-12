import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

type Props = {
  title: string;
  source: string;
  coverUrl?: string;
  language: 'FR' | 'WO' | 'FR + WO';
  uiLanguage?: 'fr' | 'wo';
  reviewMode?: boolean;
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
};

/** Published playback requires approval; reviewMode is reserved for the parent-gated QA panel. */
export default function AudioPlayerCard({ title, source, coverUrl, language, uiLanguage = 'fr', reviewMode = false }: Props) {
  const player = useAudioPlayer(source, { updateInterval: 500 });
  const status = useAudioPlayerStatus(player);
  const [loadTimedOut, setLoadTimedOut] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  useEffect(() => {
    setLoadTimedOut(false);
    if (status.isLoaded) return;
    const timeout = setTimeout(() => setLoadTimedOut(true), 15000);
    return () => clearTimeout(timeout);
  }, [source, status.isLoaded, retryCount]);
  const duration = Math.max(0, status.duration || 0);
  const current = Math.min(duration, Math.max(0, status.currentTime || 0));
  const progress = duration > 0 ? (current / duration) * 100 : 0;
  const copy = uiLanguage === 'wo'
    ? { recorded: 'WOY BU ÑU ENREGISTRE', progress: 'Yoonu woy bi', back: 'Delluwaat ci 10 sekond', forward: 'Dem kanam ci 10 sekond', pause: 'Taxawal tuuti woy bi', listen: 'Déglu woy bi', loading: 'Mi ngi yeb', error: 'Woy wi mënees koo yeb. Seetal internet bi te jéemaat.', retry: 'Jéemaat', pauseButton: 'Ⅱ Taxawal' }
    : { recorded: 'CHANSON ENREGISTRÉE', progress: 'Progression de la chanson', back: 'Reculer de dix secondes', forward: 'Avancer de dix secondes', pause: 'Mettre la chanson en pause', listen: 'Écouter la chanson', loading: 'Chargement…', error: 'La chanson ne peut pas être chargée. Vérifiez la connexion Internet puis réessayez.', retry: 'Réessayer', pauseButton: 'Ⅱ Pause' };

  return (
    <View style={styles.card} accessibilityLabel={`${reviewMode ? 'Préécoute de contrôle non publiée' : copy.recorded} : ${title}`}>
      {coverUrl ? <Image source={{ uri: coverUrl }} style={styles.cover} resizeMode="cover" accessibilityLabel={`Pochette de ${title}`} /> : null}
      <View style={styles.heading}>
        <Text style={styles.kicker}>{reviewMode ? 'PRÉÉCOUTE DE CONTRÔLE · NON PUBLIÉE' : copy.recorded} · {language}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View
        accessibilityRole="progressbar"
        accessibilityLabel={copy.progress}
        accessibilityValue={{ min: 0, max: Math.round(duration), now: Math.round(current) }}
        style={styles.track}
      >
        <View style={[styles.fill, { width: `${progress}%` }]} />
      </View>
      <View style={styles.times}>
        <Text style={styles.time}>{formatTime(current)}</Text>
        <Text style={styles.time}>{formatTime(duration)}</Text>
      </View>
      <View style={styles.controls}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={copy.back}
          disabled={!status.isLoaded}
          onPress={() => { void player.seekTo(Math.max(0, current - 10)); }}
          style={[styles.skip, !status.isLoaded && styles.disabled]}
        >
          <Text style={styles.skipText}>−10 s</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={status.playing ? copy.pause : copy.listen}
          accessibilityState={{ disabled: !status.isLoaded }}
          disabled={!status.isLoaded}
          onPress={() => { if (status.playing) { player.pause(); } else if (status.didJustFinish) { void player.seekTo(0).then(() => player.play()); } else { player.play(); } }}
          style={[styles.play, !status.isLoaded && styles.disabled]}
        >
          <Text style={styles.playText}>{status.playing ? copy.pauseButton : status.isLoaded ? `▶ ${copy.listen}` : copy.loading}</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={copy.forward}
          disabled={!status.isLoaded}
          onPress={() => { void player.seekTo(Math.min(duration, current + 10)); }}
          style={[styles.skip, !status.isLoaded && styles.disabled]}
        >
          <Text style={styles.skipText}>+10 s</Text>
        </Pressable>
      </View>
      {loadTimedOut && !status.isLoaded ? (
        <View style={styles.errorBox}>
          <Text accessibilityRole="alert" style={styles.errorNote}>{copy.error}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={copy.retry}
            onPress={() => { setLoadTimedOut(false); player.replace(source); setRetryCount((count) => count + 1); }}
            style={styles.retryButton}
          >
            <Text style={styles.retryText}>↻ {copy.retry}</Text>
          </Pressable>
        </View>
      ) : null}
      {reviewMode ? <Text style={styles.reviewNote}>Écoute réservée au contrôle éditorial. Cette piste reste en attente de validation et n’est pas publiée dans la bibliothèque enfant.</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFEFC', borderRadius: 26, padding: 17, marginVertical: 10, borderWidth: 1, borderColor: '#F0E9DE', elevation: 3, shadowColor: '#536C5D', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07, shadowRadius: 10 },
  cover: { width: '100%', aspectRatio: 16 / 9, borderRadius: 20, marginBottom: 16, backgroundColor: '#FFF1D0' },
  heading: { marginBottom: 14 },
  kicker: { color: '#25845F', fontSize: 10, fontWeight: '900', letterSpacing: 0.9 },
  title: { color: '#173B32', fontSize: 19, fontWeight: '900', marginTop: 6 },
  track: { height: 10, borderRadius: 10, overflow: 'hidden', backgroundColor: '#E8EFE6' },
  fill: { height: '100%', backgroundColor: '#25845F', borderRadius: 10 },
  times: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  time: { color: '#806B5D', fontSize: 12, fontVariant: ['tabular-nums'] },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 14 },
  skip: { minHeight: 48, minWidth: 58, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF1C9', borderRadius: 16, paddingHorizontal: 9 },
  skipText: { color: '#173B32', fontWeight: '900' },
  play: { flex: 1, minHeight: 64, minWidth: 148, alignItems: 'center', justifyContent: 'center', backgroundColor: '#176B50', borderRadius: 20, paddingHorizontal: 12, elevation: 3 },
  playText: { color: '#FFFFFF', fontWeight: '900', fontSize: 15, letterSpacing: 0.2 },
  reviewNote: { color: '#687B72', fontSize: 12, lineHeight: 18, marginTop: 12 },
  errorBox: { marginTop: 12, gap: 8 },
  errorNote: { color: '#A12D22', backgroundColor: '#FFF0ED', borderRadius: 12, padding: 10, fontSize: 12, lineHeight: 17 },
  retryButton: { alignSelf: 'flex-start', minHeight: 44, justifyContent: 'center', backgroundColor: '#FFF0C7', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10 },
  retryText: { color: '#81500B', fontWeight: '900', fontSize: 14 },
  disabled: { opacity: 0.55 },
});