import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import AudioPlayerCard from './AudioPlayerCard';
import { audioCatalog } from './audioCatalog';
import { officialSongs } from './officialSongCatalog';
import type { Language } from './i18n';

type Props = { lang: Language };

const candidates = audioCatalog.flatMap((track) => {
  const song = officialSongs.find((item) => item.id === track.contentId);
  if (!song || !track.sourceUrl) return [];
  return [{ track, song, source: track.sourceUrl }];
});

export default function AudioReviewPanel({ lang }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const isFrench = lang === 'fr';
  const selected = candidates.find((item) => item.track.contentId === selectedId);

  const requestAccess = () => {
    const a = 2 + Math.floor(Math.random() * 6);
    const b = 1 + Math.floor(Math.random() * 5);
    const answer = a + b;
    const choices = [answer, answer + 1, Math.max(0, answer - 1)].sort(() => Math.random() - 0.5);
    Alert.alert(
      'Espace Parents · Contrôle adulte',
      `Pour ouvrir la préécoute réservée aux parents, combien font ${a} + ${b} ?`,
      choices.map((value) => ({
        text: String(value),
        onPress: () => {
          if (value !== answer) {
            Alert.alert('Accès non ouvert', 'Demande à un adulte de réessayer.');
            return;
          }
          Alert.alert(
            'Préécoute audio',
            'Les pistes sont des candidates en attente. Leur écoute ne vaut pas validation des paroles, du wolof ou des droits.',
            [
              { text: 'Annuler', style: 'cancel' },
              { text: 'Ouvrir', onPress: () => setUnlocked(true) },
            ],
          );
        },
      })),
      { cancelable: true },
    );
  };

  return (
    <View style={styles.panel}>
      <Text style={styles.heading}>🎧 {isFrench ? 'Préécoute des chansons' : 'Déglu woy yi'}</Text>
      <Text style={styles.description}>
        {isFrench
          ? 'Espace de contrôle réservé aux parents : écoute les fichiers MP3 hébergés sur le site. Une connexion Internet est nécessaire.'
          : 'Espace de contrôle parent. Connexion Internet requise pour écouter les fichiers.'}
      </Text>
      {!unlocked ? (
        <Pressable accessibilityRole="button" onPress={requestAccess} style={styles.unlock}>
          <Text style={styles.unlockText}>{isFrench ? 'Ouvrir la préécoute (contrôle adulte)' : 'Ubbi préécoute (contrôle mag)'}</Text>
        </Pressable>
      ) : (
        <>
          <View style={styles.warning}>
            <Text style={styles.warningText}>
              {isFrench
                ? 'NON PUBLIÉ — Les 25 pistes restent à écouter, comparer aux paroles, faire relire en wolof si nécessaire et vérifier côté droits.'
                : 'DUÑU KO SIWAL — Woy yi dañuy xaar déglu, seet ak kàddu yi ak sañ-sañ yi.'}
            </Text>
          </View>
          {selected ? (
            <View>
              <AudioPlayerCard
                key={selected.track.contentId}
                title={selected.song.title}
                source={selected.source}
                language={selected.song.language}
                uiLanguage={lang}
                reviewMode
              />
              <Pressable accessibilityRole="button" onPress={() => setSelectedId(null)} style={styles.closePlayer}>
                <Text style={styles.closePlayerText}>{isFrench ? 'Fermer le lecteur' : 'Tëj lecteur bi'}</Text>
              </Pressable>
            </View>
          ) : null}
          <Text style={styles.subheading}>{isFrench ? 'Catalogue à contrôler' : 'Catalogue bu ñuy seet'}</Text>
          {candidates.map(({ track, song }) => (
            <Pressable
              key={track.contentId}
              accessibilityRole="button"
              accessibilityLabel={`${isFrench ? 'Préécouter' : 'Déglu'} ${song.title}`}
              accessibilityState={{ selected: selectedId === track.contentId }}
              onPress={() => setSelectedId(track.contentId)}
              style={[styles.trackRow, selectedId === track.contentId && styles.trackRowSelected]}
            >
              <View style={styles.trackCopy}>
                <Text style={styles.trackTitle}>{song.title}</Text>
                <Text style={styles.trackStatus}>
                  {track.reviewStatus === 'approved'
                    ? (isFrench ? 'Validée' : 'Nangu')
                    : track.reviewStatus === 'needs-identification'
                      ? (isFrench ? 'À identifier' : 'Ci xalaat')
                      : (isFrench ? 'À écouter et valider' : 'Déglu te seet')}
                  {' · '}{song.language}
                </Text>
              </View>
              <Text style={styles.listen}>{selectedId === track.contentId ? '●' : '▶'}</Text>
            </Pressable>
          ))}
          <Pressable
            accessibilityRole="button"
            onPress={() => { setSelectedId(null); setUnlocked(false); }}
            style={styles.lock}
          >
            <Text style={styles.lockText}>{isFrench ? 'Verrouiller la préécoute' : 'Tëj préécoute bi'}</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, marginVertical: 12, borderWidth: 1, borderColor: '#E7D9C5' },
  heading: { color: '#432B20', fontSize: 18, fontWeight: '900' },
  description: { color: '#806B5D', fontSize: 13, lineHeight: 19, marginTop: 6, marginBottom: 12 },
  unlock: { minHeight: 48, borderRadius: 14, backgroundColor: '#432B20', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14 },
  unlockText: { color: '#FFFFFF', fontWeight: '900', textAlign: 'center' },
  warning: { borderRadius: 12, padding: 12, backgroundColor: '#FFF7D6', marginTop: 4, marginBottom: 12 },
  warningText: { color: '#6D4B20', fontSize: 12, fontWeight: '800', lineHeight: 17 },
  subheading: { color: '#432B20', fontSize: 15, fontWeight: '900', marginTop: 8, marginBottom: 8 },
  trackRow: { minHeight: 58, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#F1E5D1', paddingVertical: 9, paddingHorizontal: 8 },
  trackRowSelected: { backgroundColor: '#F0FAF1', borderRadius: 12 },
  trackCopy: { flex: 1, paddingRight: 12 },
  trackTitle: { color: '#432B20', fontSize: 14, fontWeight: '800' },
  trackStatus: { color: '#806B5D', fontSize: 11, marginTop: 3 },
  listen: { color: '#168B3B', fontSize: 18, fontWeight: '900', paddingHorizontal: 8 },
  closePlayer: { alignSelf: 'flex-end', paddingVertical: 6, paddingHorizontal: 10 },
  closePlayerText: { color: '#806B5D', fontSize: 12, fontWeight: '800' },
  lock: { marginTop: 14, minHeight: 44, borderRadius: 12, borderWidth: 1, borderColor: '#E7D9C5', alignItems: 'center', justifyContent: 'center' },
  lockText: { color: '#432B20', fontWeight: '800' },
});
