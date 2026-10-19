import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

type Props = {
  title: string;
  source: string;
  language: 'FR' | 'WO' | 'FR + WO';
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
};

/** Render only for a master that passed the editorial and rights gate. */
export default function AudioPlayerCard({ title, source, language }: Props) {
  const player = useAudioPlayer(source, { updateInterval: 500 });
  const status = useAudioPlayerStatus(player);
  const duration = Math.max(0, status.duration || 0);
  const current = Math.min(duration, Math.max(0, status.currentTime || 0));
  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <View style={styles.card} accessibilityLabel={`Lecteur audio : ${title}`}>
      <View style={styles.heading}>
        <Text style={styles.kicker}>CHANSON ENREGISTRÉE · {language}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View
        accessibilityRole="progressbar"
        accessibilityLabel="Progression de la chanson"
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
          accessibilityLabel="Reculer de dix secondes"
          onPress={() => { void player.seekTo(Math.max(0, current - 10)); }}
          style={styles.skip}
        >
          <Text style={styles.skipText}>−10 s</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={status.playing ? 'Mettre la chanson en pause' : 'Écouter la chanson'}
          accessibilityState={{ disabled: !status.isLoaded }}
          disabled={!status.isLoaded}
          onPress={() => { if (status.playing) { player.pause(); } else { if (status.didJustFinish) void player.seekTo(0); player.play(); } }}
          style={[styles.play, !status.isLoaded && styles.disabled]}
        >
          <Text style={styles.playText}>{status.playing ? 'Ⅱ Pause' : status.isLoaded ? '▶ Écouter' : 'Chargement…'}</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Avancer de dix secondes"
          onPress={() => { void player.seekTo(Math.min(duration, current + 10)); }}
          style={styles.skip}
        >
          <Text style={styles.skipText}>+10 s</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, marginVertical: 10, borderWidth: 1, borderColor: '#F1E5D1' },
  heading: { marginBottom: 14 },
  kicker: { color: '#806B5D', fontSize: 10, fontWeight: '900', letterSpacing: 0.8 },
  title: { color: '#432B20', fontSize: 17, fontWeight: '900', marginTop: 5 },
  track: { height: 8, borderRadius: 8, overflow: 'hidden', backgroundColor: '#F3E8D6' },
  fill: { height: '100%', backgroundColor: '#27B84A', borderRadius: 8 },
  times: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  time: { color: '#806B5D', fontSize: 12, fontVariant: ['tabular-nums'] },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 14 },
  skip: { minHeight: 44, minWidth: 54, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF7D6', borderRadius: 14, paddingHorizontal: 8 },
  skipText: { color: '#432B20', fontWeight: '800' },
  play: { minHeight: 48, minWidth: 132, alignItems: 'center', justifyContent: 'center', backgroundColor: '#27B84A', borderRadius: 16, paddingHorizontal: 16 },
  playText: { color: '#FFFFFF', fontWeight: '900' },
  disabled: { opacity: 0.55 },
});
