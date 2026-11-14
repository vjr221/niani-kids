import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Linking, Modal, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseFavorites, toggleFavoriteIds, saveFavorites } from './src/favoritesStorage';
import * as Speech from 'expo-speech';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { contents as starterContents, ContentItem } from './src/content';
import { officialSongs } from './src/officialSongCatalog';
import { Language, translations } from './src/i18n';
import AudioPlayerCard from './src/AudioPlayerCard';
import { audioCatalog, getAudioTrack, isAudioReady } from './src/audioCatalog';
import { learningThemes, workshopLibrary, eightWeekPath, activityGuides } from './src/program';
import { siteResources } from './src/siteResources';
import { fetchPublishedVideos, getYouTubeThumbnail, getYouTubeWatchUrl, VideoRecord } from './src/videoCatalog';

const Tab = createBottomTabNavigator();
// Published WordPress songs are the source of truth for the mobile music library.
// Keep the locally authored story collection alongside them.
const contents: ContentItem[] = [...officialSongs, ...starterContents.filter(item => item.category === 'Histoires')];
const favoriteContentMap = new Map(starterContents.map(item => [item.id, item]));
officialSongs.forEach(item => favoriteContentMap.set(item.id, item));
const allKnownContents = [...favoriteContentMap.values()];
const validFavoriteIds = new Set(allKnownContents.map(item => item.id));
const YOUTUBE = 'https://youtube.com/@nianikids';
const TIKTOK = 'https://www.tiktok.com/@niani.kids';
const FACEBOOK = 'https://www.facebook.com/nianikids/';
const INSTAGRAM = 'https://www.instagram.com/nianikids';
const WEBSITE = 'https://nianikids.com/';
const CONTACT_PAGE = 'https://nianikids.com/contact/';
const PRIVACY_PAGE = 'https://nianikids.com/politique-de-confidentialite/';
const SENTIC_WEBSITE = 'https://senticsn.com/';
const SENTIC_EMAIL = 'senticsn@gmail.com';
const SENTIC_PHONE = '+221775105636';
const NIANI_EMAIL = 'nianikids1@gmail.com';
const C = { ink:'#173B32', cream:'#FFF9EF', yellow:'#FFD45E', orange:'#176B50', green:'#25845F', blue:'#BCEBFA', red:'#FF8A70', muted:'#687B72', lilac:'#EAE4FF', pink:'#FFE6DF' };
const normalizeText = (value:string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().trim();
const openExternal = (url:string) => {
  // Parental gate: two explicit adult actions plus a randomized arithmetic check.
  // This is a child-safety friction layer, not identity verification.
  const a = 2 + Math.floor(Math.random() * 6);
  const b = 1 + Math.floor(Math.random() * 5);
  const answer = a + b;
  const wrong1 = answer + 1;
  const wrong2 = Math.max(0, answer - 1);
  const choices = [answer, wrong1, wrong2].sort(() => Math.random() - 0.5);
  Alert.alert(
    'Espace Parents · Contrôle adulte',
    `Réservé aux parents. Pour continuer, combien font ${a} + ${b} ?`,
    choices.map((value) => ({
      text: String(value),
      onPress: () => {
        if (value !== answer) {
          Alert.alert('Accès non ouvert', 'Demande à un adulte de réessayer.');
          return;
        }
        Alert.alert(
          'Confirmation parentale',
          'Tu vas quitter Niani Kids et ouvrir une plateforme externe. Un adulte doit continuer.',
          [
            { text: 'Rester ici', style: 'cancel' },
            { text: 'Continuer', onPress: () => Linking.openURL(url).catch(() => Alert.alert('Lien indisponible', 'Réessaie dans un instant.')) },
          ],
        );
      },
    })),
    { cancelable: true },
  );
};

function Header({lang,setLang}:{lang:Language;setLang:(l:Language)=>void}) {
  const t=translations[lang];
  return <View style={s.header}>
    <Image source={require('./assets/brand/logo-transparent.png')} style={s.headerLogo} resizeMode="contain" accessibilityLabel="Logo Niani Kids" />
    <View style={s.headerBrandCopy}>
      <Text style={s.brand}>Niani Kids</Text>
      <Text style={s.brandEyebrow}>LES PETITES MÉLODIES D’AFRIQUE</Text>
      <Text style={s.tagline}>{t.tagline}</Text>
    </View>
    <Pressable accessibilityRole="button" accessibilityLabel={lang==='fr'?'Passer au wolof':'Changer en français'} style={s.langButton} onPress={()=>setLang(lang==='fr'?'wo':'fr')}>
      <Text style={s.langText}>🇸🇳 {lang.toUpperCase()} ▾</Text>
    </Pressable>
  </View>;
}
function Pill({children,active,onPress}:{children:React.ReactNode;active?:boolean;onPress:()=>void}) {
  return <Pressable accessibilityRole="button" accessibilityState={{selected:!!active}} onPress={onPress} style={[s.pill,active&&s.pillActive]}><Text style={[s.pillText,active&&{color:'#fff'}]}>{children}</Text></Pressable>;
}
function Section({title,action,onAction}:{title:string;action?:string;onAction?:()=>void}) {
  return <View style={s.sectionRow}><Text style={s.sectionTitle}>{title}</Text>{action&&<Pressable onPress={onAction}><Text style={s.sectionAction}>{action} →</Text></Pressable>}</View>;
}
function ContentCard({item,favorite,onFavorite,onOpen,lang}:{item:ContentItem;favorite:boolean;onFavorite:()=>void;onOpen:()=>void;lang:Language}) {
  const t=translations[lang];
  const category=item.category==='Berceuses'?t.lullabies:item.category==='J’apprends'?t.learn:item.category==='Histoires'?t.stories:t.rhymes;
  const bg = item.category==='Berceuses'?'#E9E9FF':item.category==='J’apprends'?'#DDF8E6':item.category==='Histoires'?'#FFF0D7':'#DDF4FF';
  const [imageFailed, setImageFailed] = useState(false);
  return <View style={s.contentCard}>
    <Pressable accessibilityRole="button" accessibilityLabel={`${t.discover} ${item.title}, ${category}${item.duration && !/^à confirmer$/i.test(item.duration.trim()) ? `, ${item.duration}` : ''}`} onPress={onOpen} style={[s.art,{backgroundColor:bg,overflow:'hidden'}]}>{(getAudioTrack(item.id)?.coverUrl ?? item.imageUrl) && !imageFailed ? <Image source={{uri:getAudioTrack(item.id)?.coverUrl ?? item.imageUrl!}} resizeMode="cover" style={[StyleSheet.absoluteFillObject,{borderRadius:15}]} onError={()=>setImageFailed(true)} accessible={false} /> : <Text style={{fontSize:42}}>{item.emoji}</Text>}{item.duration && !/^à confirmer$/i.test(item.duration.trim()) ? <Text style={s.duration}>{item.duration}</Text> : null}</Pressable>
    <View style={s.cardInfo}><Text style={s.cardCategory}>{category.toUpperCase()} · {item.language}</Text><Text style={s.cardTitle}>{item.title}</Text><Text style={s.cardSubtitle}>{item.subtitle}</Text>
      <View style={s.cardActions}><Pressable accessibilityRole="button" accessibilityLabel={`${t.discover} ${item.title}`} onPress={onOpen} style={s.playButton}><Text style={s.playText}>📖 {t.discover}</Text></Pressable><Pressable accessibilityRole="button" accessibilityLabel={favorite?`${t.removeFavorite} ${item.title}`:`${t.addFavorite} ${item.title}`} accessibilityState={{selected:favorite}} hitSlop={8} onPress={onFavorite}><Text style={{fontSize:22}}>{favorite?'❤️':'🤍'}</Text></Pressable></View>
    </View>
  </View>;
}
function Hero({lang,onVideos,onPlay}:{lang:Language;onVideos:()=>void;onPlay:()=>void}) {
  return <ImageBackground source={require('./assets/brand/website-banner.png')} resizeMode="cover" imageStyle={s.heroBackground} style={s.hero}>
    <View style={s.heroCopyBlock}>
      <Text style={s.heroEyebrow}>{translations[lang].heroEyebrow}</Text>
      <Text style={s.heroTitle}>{translations[lang].greeting}</Text>
      <Text style={s.heroCopy}>{translations[lang].heroCopy}</Text>
      <View style={s.heroActions}>
        <Pressable accessibilityRole="button" style={s.heroButton} onPress={onVideos}><Text style={s.heroButtonText}>▶ {translations[lang].videos}</Text></Pressable>
        <Pressable accessibilityRole="button" style={s.heroButtonSecondary} onPress={onPlay}><Text style={s.heroButtonSecondaryText}>🎮 {translations[lang].playNow}</Text></Pressable>
      </View>
    </View>
    <View style={s.heroFriends}>
      <Image source={require('./assets/Samba_vues_corps_entier.png')} style={s.heroCharacter} resizeMode="contain" accessibilityLabel="Samba" />
      <Image source={require('./assets/Awa_vues_corps_entier.png')} style={s.heroCharacter} resizeMode="contain" accessibilityLabel="Awa" />
      <Image source={require('./assets/Bobo_vues_corps_entier.png')} style={s.heroCharacter} resizeMode="contain" accessibilityLabel="Bobo" />
    </View>
  </ImageBackground>;
}
function HomeScreen({lang,setLang,favorites,toggleFavorite,onOpen,lastContent,stars}:{lang:Language;setLang:(l:Language)=>void;favorites:string[];toggleFavorite:(id:string)=>void;onOpen:(item:ContentItem)=>void;lastContent:ContentItem|null;stars:number}) {
  const navigation = useNavigation<any>();
  const [query,setQuery]=useState('');
  const featured=contents.filter(x=>x.featured).slice(0,3);
  const filtered=useMemo(()=>contents.filter(x=>normalizeText([x.title,x.subtitle,x.category,x.language].join(' ')).includes(normalizeText(query))),[query]);
  return <SafeAreaView style={s.safe} edges={['top']}><Header lang={lang} setLang={setLang}/><ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
    <Hero lang={lang} onVideos={()=>navigation.navigate('Vidéos')} onPlay={()=>navigation.navigate('Jouer')}/>
    {lastContent?<View style={{gap:9}}><Section title={lang==='fr'?'REPRENDRE':'DEKKI CI KANAM'}/><Pressable accessibilityRole="button" accessibilityLabel={(lang==='fr'?'Reprendre ':'Dellu ci ')+lastContent.title} onPress={()=>onOpen(lastContent)} style={[s.contentCard,{alignItems:'center',borderColor:'#E8D9B6',backgroundColor:'#FFFCF4'}]}><View style={[s.art,{width:64,minHeight:64,backgroundColor:'#FFF0C7'}]}>{(getAudioTrack(lastContent.id)?.coverUrl??lastContent.imageUrl)?<Image source={{uri:getAudioTrack(lastContent.id)?.coverUrl??lastContent.imageUrl!}} style={{width:'100%',height:'100%',borderRadius:15}} resizeMode="cover"/>:<Text style={{fontSize:30}}>{lastContent.emoji}</Text>}</View><View style={s.cardInfo}><Text style={s.cardCategory}>{lang==='fr'?'DERNIÈRE CONSULTATION':'BI MUJJ GI'}</Text><Text style={s.cardTitle} numberOfLines={1}>{lastContent.title}</Text><Text style={s.cardSubtitle}>{lang==='fr'?'Retrouver ce contenu':'Dellu ci lii'}</Text></View><Text style={{fontSize:24,color:C.orange}}>▶</Text></Pressable></View>:null}
    <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',rowGap:12,marginTop:16}}>
      <Pressable accessibilityRole="button" accessibilityLabel={lang==='fr'?'Samba : chanter':'Samba : woy'} onPress={()=>navigation.navigate('Bibliothèque')} style={{width:'48.3%',minHeight:142,borderRadius:23,backgroundColor:'#2F6FCF',padding:12,alignItems:'center',justifyContent:'center',gap:3,elevation:2}}>
        <Image source={require('./assets/Samba_vues_corps_entier.png')} style={{width:76,height:76}} resizeMode="contain" accessibilityLabel="Samba"/>
        <Text style={{fontSize:17,fontWeight:'900',color:'#FFFFFF'}}>Samba</Text><Text style={{fontSize:12,fontWeight:'700',color:'#FFFFFF'}}>{translations[lang].quickSing}</Text>
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel={lang==='fr'?'Awa : créer':'Awa : sos'} onPress={()=>navigation.navigate('Atelier')} style={{width:'48.3%',minHeight:142,borderRadius:23,backgroundColor:'#D94F79',padding:12,alignItems:'center',justifyContent:'center',gap:3,elevation:2}}>
        <Image source={require('./assets/Awa_vues_corps_entier.png')} style={{width:76,height:76}} resizeMode="contain" accessibilityLabel="Awa"/>
        <Text style={{fontSize:17,fontWeight:'900',color:'#FFFFFF'}}>Awa</Text><Text style={{fontSize:12,fontWeight:'700',color:'#FFFFFF'}}>{translations[lang].quickCreate}</Text>
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel={lang==='fr'?'Bobo : jouer':'Bobo : fo'} onPress={()=>navigation.navigate('Jouer')} style={{width:'48.3%',minHeight:142,borderRadius:23,backgroundColor:'#D9382F',padding:12,alignItems:'center',justifyContent:'center',gap:3,elevation:2}}>
        <Image source={require('./assets/Bobo_vues_corps_entier.png')} style={{width:76,height:76}} resizeMode="contain" accessibilityLabel="Bobo"/>
        <Text style={{fontSize:17,fontWeight:'900',color:'#FFFFFF'}}>Bobo</Text><Text style={{fontSize:12,fontWeight:'700',color:'#FFFFFF'}}>{translations[lang].quickLearn}</Text>
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel={lang==='fr'?'Baobab : découvrir des histoires':'Baobab : nettali'} onPress={()=>navigation.navigate('Explorer')} style={{width:'48.3%',minHeight:142,borderRadius:23,backgroundColor:'#2F8A5B',padding:12,alignItems:'center',justifyContent:'center',gap:3,elevation:2}}>
        <View style={{width:76,height:76,borderRadius:38,backgroundColor:'rgba(255,255,255,0.92)',alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:48}}>🌳</Text></View>
        <Text style={{fontSize:17,fontWeight:'900',color:'#FFFFFF'}}>Baobab</Text><Text style={{fontSize:12,fontWeight:'700',color:'#FFFFFF'}}>{translations[lang].quickDiscover}</Text>
      </Pressable>
    </View>
    <View accessibilityRole="summary" style={{marginTop:14,backgroundColor:'#FFFDF6',borderWidth:1,borderColor:'#F0E2BD',borderRadius:19,paddingVertical:11,paddingHorizontal:15,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <Text style={{fontSize:15,fontWeight:'900',color:C.ink}}>{lang==='fr'?'Mes étoiles':'Sama biddéew'}</Text>
      <Text accessibilityLabel={lang==='fr'?stars+' étoiles':'Biddéew '+stars} style={{fontSize:19,color:'#D99A00',fontWeight:'900'}}>⭐ {stars}</Text>
    </View>
    <TextInput accessibilityLabel={translations[lang].search} accessibilityRole="search" returnKeyType="search" value={query} onChangeText={setQuery} placeholder={'🔎 '+translations[lang].search+'…'} placeholderTextColor="#947F70" style={s.search}/>
    <Section title={query?translations[lang].searchResults:translations[lang].featured} action={query?translations[lang].clear:translations[lang].seeAll} onAction={()=>{if(query){setQuery('');}else{navigation.navigate('Bibliothèque');}}}/>
    {(query?filtered:featured).map(item=><ContentCard key={item.id} item={item} lang={lang} favorite={favorites.includes(item.id)} onFavorite={()=>toggleFavorite(item.id)} onOpen={()=>onOpen(item)}/>)}
    <Section title={translations[lang].friends} />
    <View style={s.friendsRow}>{[{image:require('./assets/Samba_portrait_et_nom.png'),n:'Samba',c:'#DDF4FF',d:translations[lang].curious},{image:require('./assets/Awa_portrait_et_nom.png'),n:'Awa',c:'#FBE5DF',d:translations[lang].creative},{image:require('./assets/Bobo_portrait_et_nom.png'),n:'Bobo',c:'#FFF0C7',d:translations[lang].funny}].map(x=><View key={x.n} style={[s.friend,{backgroundColor:x.c}]}><Image source={x.image} style={s.friendImage} resizeMode="contain" accessibilityLabel={x.n} /><Text style={s.friendName}>{x.n}</Text><Text style={s.friendRole}>{x.d}</Text></View>)}</View>
    <Pressable accessibilityRole="button" accessibilityLabel={translations[lang].wise + ' — ' + translations[lang].baobabSecret} onPress={()=>{const guideStory=contents.find(x=>x.id==='story-secret');if(guideStory)onOpen(guideStory)}} style={[s.storyBanner,{backgroundColor:'#E8F5D5',marginTop:12,borderWidth:1,borderColor:'#D2E8B8'}]}>
      <View style={{width:58,height:58,borderRadius:18,backgroundColor:'#D4EBC0',alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:38}}>🌳</Text></View>
      <View style={{flex:1,gap:3}}><Text style={s.cardCategory}>{translations[lang].wise.toUpperCase()}</Text><Text style={s.cardTitle}>{translations[lang].baobabSecret}</Text><Text style={s.cardSubtitle}>{translations[lang].sharingFriendship}</Text></View>
      <Text style={{fontSize:24,color:'#547B38'}}>›</Text>
    </Pressable>
    <Section title={translations[lang].littleStories} action={translations[lang].discover} onAction={()=>{const story=contents.find(item=>item.id==="story-secret");if(story)onOpen(story);}}/>
    <Pressable accessibilityRole="button" accessibilityLabel={`${translations[lang].discover} : ${translations[lang].baobabSecret}`} onPress={()=>{const story=contents.find(item=>item.id==="story-secret");if(story)onOpen(story);}} style={s.storyBanner}><Text style={{fontSize:36}}>📚</Text><View style={{flex:1}}><Text style={s.cardTitle}>{translations[lang].baobabSecret}</Text><Text style={s.cardSubtitle}>{translations[lang].sharingFriendship}</Text></View><Text style={{fontSize:23}}>✨</Text></Pressable>
    <View style={s.mission}><Text style={{fontSize:30}}>💚</Text><Text style={s.missionTitle}>{translations[lang].growSmile}</Text><Text style={s.missionText}>{translations[lang].missionText}</Text></View>
    <Text style={s.footer}>Niani Kids • Chanter, rêver, grandir ❤️</Text>
  </ScrollView></SafeAreaView>;
}

function VideosScreen({lang,setLang}:{lang:Language;setLang:(l:Language)=>void}) {
  const navigation = useNavigation<any>();
  const [videos,setVideos] = useState<VideoRecord[]>([]);
  const [loading,setLoading] = useState(true);
  const [loadError,setLoadError] = useState(false);
  const [refreshKey,setRefreshKey] = useState(0);
  const t = translations[lang];

  useEffect(() => {
    let active = true;
    const loadVideos = async () => {
      setLoading(true);
      try {
        const latest = await fetchPublishedVideos();
        if (active) {
          setVideos(latest);
          setLoadError(false);
        }
      } catch {
        if (active) setLoadError(true);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadVideos();
    const unsubscribe = navigation.addListener('focus', loadVideos);
    return () => {
      active = false;
      unsubscribe();
    };
  }, [navigation,refreshKey]);

  return <SafeAreaView style={s.safe} edges={['top']}><Header lang={lang} setLang={setLang}/><ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
    <View style={[s.parentCard,{backgroundColor:'#E4F5E7'}]}>
      <Text style={s.cardCategory}>{t.videosChannelEyebrow}</Text>
      <Text style={s.pageTitle}>🎬 {t.videosTitle}</Text>
      <Text style={s.cardSubtitle}>{t.videosIntro}</Text>
    </View>
    {loading && videos.length===0 ? <View style={s.empty}><Text style={{fontSize:38}}>🌳</Text><Text style={s.cardTitle}>{lang==='fr'?'Chargement des vidéos…':'Wideo yi ñu ngi yeb'}</Text></View> : null}
    {!loading && videos.length===0 ? <View style={s.quizCard}>
      <Text style={{fontSize:48,textAlign:'center'}}>🌳</Text>
      <Text style={s.quizTitle}>{t.videosEmptyTitle}</Text>
      <Text style={s.cardSubtitle}>{loadError ? (lang==='fr'?'La connexion au catalogue est momentanément indisponible. Réessaie dans un instant.':'Jokkoo ak katalog bi amul léegi. Jéemaat ci kanam.') : t.videosEmptyBody}</Text>
      <Text style={s.parentHint}>{t.videosParentHint}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={lang==='fr'?'Actualiser les vidéos':'Yeesal wideo yi'} style={s.nextButton} onPress={()=>setRefreshKey(value=>value+1)}><Text style={s.nextText}>{lang==='fr'?'Actualiser':'Yeesal'} ↻</Text></Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel={t.videosOpenChannel} style={[s.nextButton,{backgroundColor:'#FFFFFF',marginTop:8}]} onPress={()=>openExternal(YOUTUBE)}><Text style={[s.nextText,{color:C.ink}]}>{t.videosOpenChannel} ↗</Text></Pressable>
    </View>:null}
    {videos.map(video=>{
      const watchUrl=getYouTubeWatchUrl(video.youtubeVideoId);
      const thumbnail=getYouTubeThumbnail(video);
      if(!watchUrl)return null;
      return <Pressable key={video.id} accessibilityRole="button" accessibilityLabel={t.videosWatch+' : '+video.title} style={s.workshop} onPress={()=>openExternal(watchUrl)}>
        {thumbnail?<Image source={{uri:thumbnail}} style={{width:'100%',aspectRatio:16/9,borderRadius:16,backgroundColor:'#E8E5D8'}} resizeMode="cover"/>:<View style={{height:180,alignItems:'center',justifyContent:'center',backgroundColor:'#E8F5D5',borderRadius:16}}><Text style={{fontSize:48}}>▶️</Text></View>}
        <Text style={s.cardTitle}>{video.title}</Text>
        <Text style={s.cardSubtitle}>{video.category} · {video.language} · {video.ageBand}{video.duration?' · '+video.duration:''}</Text>
        <Text style={s.cardSubtitle}>{video.description}</Text>
        <Text style={s.sectionAction}>{t.videosWatch} ↗</Text>
      </Pressable>;
    })}
    <View style={s.safety}><Text style={s.cardTitle}>{t.videosSafetyTitle}</Text><Text style={s.cardSubtitle}>{t.videosSafetyBody}</Text></View>
  </ScrollView></SafeAreaView>;
}
function GamesScreen({lang,setLang,stars,setStars}:{lang:Language;setLang:(l:Language)=>void;stars:number;setStars:(n:number)=>void}) {
  const navigation = useNavigation<any>();
  const [game,setGame]=useState<'menu'|'colors'|'count'|'nature'>('menu');
  const [ageBand,setAgeBand]=useState<'all'|'0–2'|'3–4'|'5–6'>('all');
  const [round,setRound]=useState(0); const [feedback,setFeedback]=useState(''); const [answerCorrect,setAnswerCorrect]=useState(false);
  const correctAwardedRef=useRef(false);
  const questions=[
    {q:translations[lang].qSun,emoji:'☀️',options:[['🔵',translations[lang].blue],['🟡',translations[lang].yellow],['🟢',translations[lang].green]],correct:translations[lang].yellow},
    {q:translations[lang].qLeaf,emoji:'🍃',options:[['🟢',translations[lang].green],['🔴',translations[lang].red],['🔵',translations[lang].blue]],correct:translations[lang].green},
    {q:translations[lang].qTomato,emoji:'🍅',options:[['🟡',translations[lang].yellow],['🔴',translations[lang].red],['🟣',translations[lang].violet]],correct:translations[lang].red}
  ];
  const counts=[{q:translations[lang].qMango,emoji:'🥭 🥭',n:2,opts:[1,2,3]},{q:translations[lang].qStars,emoji:'⭐ ⭐ ⭐',n:3,opts:[2,3,4]},{q:translations[lang].qFlowers,emoji:'🌼 🌼 🌼 🌼',n:4,opts:[3,4,5]}];
  const win=(ok:boolean)=>{if(feedback||correctAwardedRef.current)return;if(ok){correctAwardedRef.current=true;setAnswerCorrect(true);setFeedback(translations[lang].correctFeedback);setStars(stars+1)}else{setAnswerCorrect(false);setFeedback(translations[lang].retryFeedback);}};
  const reset=()=>{correctAwardedRef.current=false;setRound(0);setFeedback('');setAnswerCorrect(false);setGame('menu')};
  return <SafeAreaView style={s.safe} edges={['top']}><Header lang={lang} setLang={setLang}/><ScrollView contentContainerStyle={s.scroll}>
    <View style={s.pageIntro}><Text style={{fontSize:34}}>🎮</Text><View style={{flex:1}}><Text style={s.pageTitle}>{translations[lang].gamesTitle}</Text><Text style={s.cardSubtitle}>{translations[lang].gamesIntro}</Text></View><View style={s.starPill}><Text style={{fontWeight:'900'}}>⭐ {stars}</Text></View></View>
    {game==='menu'?<><View style={s.gameHero}><Text style={{fontSize:48}}>🦜</Text><Text style={s.heroTitle}>{translations[lang].readyPlay}</Text><Text style={s.heroCopy}>{translations[lang].gamesBody}</Text></View>
      <View style={{flexDirection:'row',gap:9}}><Pressable accessibilityRole="button" onPress={()=>navigation.navigate('Atelier')} style={[s.quickCard,{backgroundColor:'#FBE5DF',minWidth:0,minHeight:94}]}><Text style={s.quickEmoji}>🎨</Text><Text style={s.quickTitle}>{translations[lang].workshop}</Text><Text style={s.quickSub}>{lang==='fr'?'Créer avec un adulte':'Jëf ak mag'}</Text></Pressable><Pressable accessibilityRole="button" onPress={()=>navigation.navigate('Explorer')} style={[s.quickCard,{backgroundColor:'#E1F3FF',minWidth:0,minHeight:94}]}><Text style={s.quickEmoji}>🧭</Text><Text style={s.quickTitle}>{lang==='fr'?'Explorer':'Seet'}</Text><Text style={s.quickSub}>{lang==='fr'?'Découvrir à son rythme':'Xam ci sa yoon'}</Text></Pressable></View>
      <View style={{backgroundColor:'#FFFDF7',borderRadius:18,padding:12,borderWidth:1,borderColor:'#EFE4D3',marginBottom:10}}>
        <Text style={{fontSize:13,fontWeight:'900',color:C.ink,marginBottom:9}}>{'Âge conseillé'}</Text>
        <View style={{flexDirection:'row',gap:7}}>
          {([{id:'all',label:'Tous'},{id:'0–2',label:'0–2'},{id:'3–4',label:'3–4'},{id:'5–6',label:'5–6'}] as const).map(item=><Pressable key={item.id} accessibilityRole="radio" accessibilityState={{selected:ageBand===item.id}} onPress={()=>setAgeBand(item.id)} style={{flex:1,minHeight:43,borderRadius:13,alignItems:'center',justifyContent:'center',backgroundColor:ageBand===item.id?'#176B50':'#F1EEE7',borderWidth:1,borderColor:ageBand===item.id?'#176B50':'#E6DED1'}}><Text style={{fontSize:12,fontWeight:'900',color:ageBand===item.id?'#FFFFFF':C.ink}}>{item.label}</Text></Pressable>)}
        </View>
        <Text style={{fontSize:11,lineHeight:16,color:C.muted,marginTop:8}}>{'Pour les tout-petits, jouer avec un adulte. Activités courtes, sans chronomètre ni pénalité.'}</Text>
      </View>
      {[
        {id:'colors',e:'🌈',t:translations[lang].colorsGame,d:translations[lang].colorsDesc,bg:'#FBE5DF',ages:['0–2','3–4','5–6']},
        {id:'count',e:'🔢',t:translations[lang].countGame,d:translations[lang].countDesc,bg:'#DDF4FF',ages:['3–4','5–6']},
        {id:'nature',e:'🌿',t:translations[lang].natureGame,d:translations[lang].natureDesc,bg:'#DDF8E6',ages:['3–4','5–6']}
      ].filter(item=>ageBand==='all'||item.ages.includes(ageBand)).map(item=><Pressable key={item.id} accessibilityRole="button" accessibilityLabel={item.t} onPress={()=>{correctAwardedRef.current=false;setGame(item.id as any);setRound(0);setFeedback('');setAnswerCorrect(false)}} style={[s.gameCard,{backgroundColor:item.bg,minHeight:96}]}>
        <Text style={{fontSize:39}}>{item.e}</Text><View style={{flex:1}}><Text style={s.cardTitle}>{item.t}</Text><Text style={s.cardSubtitle}>{item.d}</Text><Text style={{fontSize:10,fontWeight:'900',color:C.orange,marginTop:4}}>{'Âge conseillé' } : {item.ages.join(' · ')}</Text></View><Text style={{fontSize:24}}>›</Text></Pressable>)}
    </>:<View style={s.quizCard}><Pressable accessibilityRole="button" accessibilityLabel={translations[lang].allGames} onPress={reset} style={s.backLink}><Text style={s.sectionAction}>← {translations[lang].allGames}</Text></Pressable>
      <View style={{height:7,backgroundColor:'#EAE5DA',borderRadius:8,overflow:'hidden',marginBottom:12}}><View style={{height:7,width:`${((round%3)+1)/3*100}%`,backgroundColor:'#25845F',borderRadius:8}}/></View><Text style={{fontSize:11,fontWeight:'800',color:C.muted,textAlign:'center',marginBottom:7}}>{lang==='fr'?`Question ${(round%3)+1} sur 3`:`Laaj ${(round%3)+1} ci 3`}</Text>{game==='colors'?<><Text style={s.quizTitle}>{translations[lang].colorsQuizTitle}</Text><Text style={s.quizPrompt}>{questions[round%questions.length].q}</Text><Text style={{fontSize:68,textAlign:'center',marginVertical:12}}>{questions[round%questions.length].emoji}</Text><View style={s.options}>{questions[round%questions.length].options.map(([emoji,label])=><Pressable key={label} accessibilityRole="button" accessibilityLabel={`Couleur ${label}`} style={[s.option,{minHeight:76}]} onPress={()=>win(label===questions[round%questions.length].correct)}><Text style={{fontSize:34}}>{emoji}</Text><Text style={s.optionText}>{label}</Text></Pressable>)}</View></>:null}
      {game==='count'?<><Text style={s.quizTitle}>{translations[lang].countQuizTitle}</Text><Text style={s.quizPrompt}>{counts[round%counts.length].q}</Text><Text style={{fontSize:42,textAlign:'center',marginVertical:16}}>{counts[round%counts.length].emoji}</Text><View style={s.options}>{counts[round%counts.length].opts.map(n=><Pressable key={n} accessibilityRole="button" accessibilityLabel={`Répondre ${n}`} style={[s.numberOption,{minWidth:76,minHeight:76}]} onPress={()=>win(n===counts[round%counts.length].n)}><Text style={s.numberText}>{n}</Text></Pressable>)}</View></>:null}
      {game==='nature'?<><Text style={s.quizTitle}>{translations[lang].natureQuizTitle}</Text><Text style={s.quizPrompt}>{[translations[lang].qWaste,translations[lang].qPlant,translations[lang].qWater][round%3]}</Text><Text style={{fontSize:62,textAlign:'center',marginVertical:12}}>{['🗑️','🌱','💧'][round%3]}</Text>{[[translations[lang].wasteBin,translations[lang].wasteGround,translations[lang].wasteRiver],[translations[lang].waterPlant,translations[lang].tearLeaves,translations[lang].forgetPlant],[translations[lang].closeTap,translations[lang].leaveRunning,translations[lang].playWater]][round%3].map((x,i)=><Pressable key={x} accessibilityRole="button" accessibilityLabel={x} style={s.answerRow} onPress={()=>win(i===0)}><Text style={s.optionText}>{x}</Text></Pressable>)}</>:null}
      {!!feedback&&<View style={s.feedback}><Text style={s.feedbackText}>{feedback}</Text>{answerCorrect?<Pressable onPress={()=>{correctAwardedRef.current=false;setRound(round+1);setFeedback('');setAnswerCorrect(false)}} style={s.nextButton}><Text style={s.nextText}>{translations[lang].continue} →</Text></Pressable>:<Pressable onPress={()=>setFeedback('')} style={s.nextButton}><Text style={s.nextText}>{translations[lang].tryAgain} ↻</Text></Pressable>}</View>}
    </View>}
    <Text style={s.parentHint}>👨‍👩‍👧 {translations[lang].gameSafety}</Text>
  </ScrollView></SafeAreaView>;
}
function WorkshopsScreen({lang,setLang}:{lang:Language;setLang:(l:Language)=>void}) {
  const [done,setDone]=useState<string[]>([]);
  const workshopIds=['colors','drum','baobab','story','movement'];
  useEffect(()=>{AsyncStorage.getItem('niani-workshops-done').then(v=>{if(!v)return;const parsed:unknown=JSON.parse(v);if(Array.isArray(parsed))setDone([...new Set(parsed.filter((id):id is string=>typeof id==='string'&&workshopIds.includes(id)))])}).catch(()=>{});},[]);
  const toggleDone=(id:string)=>setDone(old=>{const next=old.includes(id)?old.filter(x=>x!==id):[...old,id];AsyncStorage.setItem('niani-workshops-done',JSON.stringify(next)).catch(()=>{});return next});
  const workshops=[
    {id:'colors',emoji:'🎨',title:translations[lang].workshopColorsTitle,age:translations[lang].workshopColorsAge,desc:translations[lang].workshopColorsDesc,materials:translations[lang].workshopColorsMaterials,steps:[translations[lang].workshopColorsStep1,translations[lang].workshopColorsStep2,translations[lang].workshopColorsStep3]},
    {id:'drum',emoji:'🥁',title:translations[lang].workshopDrumTitle,age:translations[lang].workshopDrumAge,desc:translations[lang].workshopDrumDesc,materials:translations[lang].workshopDrumMaterials,steps:[translations[lang].workshopDrumStep1,translations[lang].workshopDrumStep2,translations[lang].workshopDrumStep3]},
    {id:'baobab',emoji:'🌳',title:translations[lang].workshopBaobabTitle,age:translations[lang].workshopBaobabAge,desc:translations[lang].workshopBaobabDesc,materials:translations[lang].workshopBaobabMaterials,steps:[translations[lang].workshopBaobabStep1,translations[lang].workshopBaobabStep2,translations[lang].workshopBaobabStep3]},
    {id:'story',emoji:'📚',title:translations[lang].workshopStoryTitle,age:translations[lang].workshopStoryAge,desc:translations[lang].workshopStoryDesc,materials:translations[lang].workshopStoryMaterials,steps:[translations[lang].workshopStoryStep1,translations[lang].workshopStoryStep2,translations[lang].workshopStoryStep3]},
    {id:'movement',emoji:'💃🏿',title:translations[lang].workshopMovementTitle,age:translations[lang].workshopMovementAge,desc:translations[lang].workshopMovementDesc,materials:translations[lang].workshopMovementMaterials,steps:[translations[lang].workshopMovementStep1,translations[lang].workshopMovementStep2,translations[lang].workshopMovementStep3]}
  ];
  return <SafeAreaView style={s.safe} edges={['top']}><Header lang={lang} setLang={setLang}/><ScrollView contentContainerStyle={s.scroll}>
    <View style={[s.parentCard,{backgroundColor:'#FBE8E3'}]}>
      <View style={{flexDirection:'row',alignItems:'center',gap:12}}>
        <Text style={{fontSize:40}}>🎨</Text>
        <View style={{flex:1}}><Text style={s.cardCategory}>{'CRÉER EN FAMILLE'}</Text><Text style={s.pageTitle}>{translations[lang].workshopTitle}</Text></View>
      </View>
      <Text style={s.cardSubtitle}>{translations[lang].workshopIntro}</Text>
      <View style={{marginTop:12,backgroundColor:'#FFFFFF',borderRadius:16,padding:12}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Text style={{fontSize:12,fontWeight:'900',color:C.ink}}>{'Activités réalisées'}</Text>
          <Text style={{fontSize:13,fontWeight:'900',color:'#176B50'}}>{done.length}/{workshops.length}</Text>
        </View>
        <View style={{height:8,backgroundColor:'#EEE7DE',borderRadius:8,overflow:'hidden',marginTop:8}}>
          <View style={{height:8,width:`${done.length/workshops.length*100}%`,backgroundColor:'#25845F',borderRadius:8}}/>
        </View>
        <Text style={{fontSize:11,color:C.muted,marginTop:7}}>{'À réaliser avec un adulte, à son rythme.'}</Text>
      </View>
    </View>
    <View style={s.parentHint}>{translations[lang].workshopSafety}</View>
    {workshops.map(w=><View key={w.id} style={[s.workshop,done.includes(w.id)&&{borderColor:'#8DC7A0',borderWidth:2}]}><View style={s.workshopHead}><Text style={{fontSize:38}}>{w.emoji}</Text><View style={{flex:1}}><Text style={s.cardTitle}>{w.title}</Text><Text style={s.workshopAge}>{w.age}</Text></View><Pressable accessibilityRole="checkbox" accessibilityLabel={`Atelier terminé : ${w.title}`} accessibilityState={{checked:done.includes(w.id)}} hitSlop={8} onPress={()=>toggleDone(w.id)} style={{minWidth:48,minHeight:48,borderRadius:15,backgroundColor:done.includes(w.id)?'#E3F2E6':'#FFF4D8',alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:23}}>{done.includes(w.id)?'✓':'○'}</Text></Pressable></View><Text style={s.cardSubtitle}>{w.desc}</Text><Text style={s.materials}>🧺 {translations[lang].workshopMaterials} : {w.materials}</Text><Text style={s.stepsTitle}>{translations[lang].workshopSteps}</Text>{w.steps.map((x,i)=><Text key={x} style={s.stepText}>{i+1}. {x}</Text>)}</View>)}
    <Text style={s.footer}>{translations[lang].workshopFooter}</Text>
  </ScrollView></SafeAreaView>;
}

function ExploreScreen({lang,setLang}:{lang:Language;setLang:(l:Language)=>void}) {
  const [age,setAge]=useState<'Tous'|'0–2 ans'|'3–4 ans'|'5–6 ans'>('Tous');
  const [selected,setSelected]=useState<string|null>(null);
  const [showPath,setShowPath]=useState(false);
  const [completedGuides,setCompletedGuides]=useState<string[]>([]);
  useEffect(()=>{AsyncStorage.getItem('niani-explore-guides-done').then(value=>{if(!value)return;const parsed:unknown=JSON.parse(value);if(Array.isArray(parsed))setCompletedGuides([...new Set(parsed.filter((id):id is string=>typeof id==='string'))]);}).catch(()=>{});},[]);
  const toggleGuideDone=(id:string)=>setCompletedGuides(current=>{const next=current.includes(id)?current.filter(value=>value!==id):[...current,id];AsyncStorage.setItem('niani-explore-guides-done',JSON.stringify(next)).catch(()=>{});return next;});
  const copy=lang==='fr'
    ? {eyebrow:'APPRENDRE EN JOUANT',title:'J’explore avec Niani',intro:'Des idées simples pour éveiller la curiosité, parler, bouger et découvrir le Sénégal.',ages:'Âge de l’enfant',all:'Tous',topics:'Mes univers de découverte',skills:'Ce que l’enfant développe',ideas:'À essayer ensemble',path:'Parcours éducatif sur 8 semaines',pathIntro:'Une progression souple à adapter au rythme de chaque enfant.',week:'Semaine',goal:'Objectif',adult:'Les activités se font avec un adulte. Pour les tout-petits, privilégier les échanges, les gestes, les sons et les objets sûrs plutôt que l’écran.',open:'Voir les idées',close:'Réduire',materials:'Ateliers à retrouver',duration:'Durée indicative',noPressure:'Pas de score ni de minuterie : on explore à son rythme.',progress:'Mes activités réalisées',done:'réalisée',markDone:'Marquer comme réalisée',undoDone:'Retirer de mes activités'}
    : {eyebrow:'JÀNG AK FO',title:'Seet ak Niani',intro:'Jëf yu yomb ngir xam-xam, wax, yëngal yaram te xam Senegaal.',ages:'Atu xale bi',all:'Yépp',topics:'Sunu àddina yu jàng',skills:'Li xale bi di jàng',ideas:'Jéemleen bokk',path:'Yoonu jàng ci ayu-bis 8',pathIntro:'Tànn yoonu jàng bi ci anam wu méngoo ak xale bi.',week:'Ayu-bis',goal:'Jubluwaay',adult:'Defleen jëf yi ak mag. Ci xale yu ndaw, gënal waxtaan, yëngal, baat ak jumtukaay yu wóor.',open:'Gis jëf yi',close:'Wàññi',materials:'Atelier yi',duration:'Diir bu ñu xalaat',noPressure:'Amul score walla waxtu bu gaaw: seet ci sa yoon.',progress:'Jëf yi ma def',done:'def nañu ko',markDone:'Màndargaal ni ñu def ko',undoDone:'Dindi ci jëf yi'};
  const visibleThemes=learningThemes.filter(theme=>age==='Tous'||theme.age.includes(age));
  const activeTheme=learningThemes.find(theme=>theme.id===selected);
  return <SafeAreaView style={s.safe} edges={['top']}><Header lang={lang} setLang={setLang}/><ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
    <View style={[s.parentCard,{backgroundColor:'#E4F5E7'}]}><Text style={s.cardCategory}>{copy.eyebrow}</Text><Text style={s.pageTitle}>{copy.title}</Text><Text style={s.cardSubtitle}>{copy.intro}</Text><View style={s.friendsRow}><Image source={require('./assets/Samba_activites.png')} style={{width:72,height:82,flex:1}} resizeMode="contain" accessibilityLabel="Samba en activité"/><Image source={require('./assets/Awa_activites.png')} style={{width:72,height:82,flex:1}} resizeMode="contain" accessibilityLabel="Awa en activité"/><Image source={require('./assets/Bobo_activites.png')} style={{width:72,height:82,flex:1}} resizeMode="contain" accessibilityLabel="Bobo en activité"/></View></View>
    <View style={{backgroundColor:'#FFF0C7',borderRadius:20,padding:15,marginBottom:10,borderWidth:1,borderColor:'#F0DDA7'}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:8}}>
        <View style={{flex:1}}><Text style={s.cardCategory}>{copy.progress.toUpperCase()}</Text><Text style={{fontSize:22,fontWeight:'900',color:C.ink,marginTop:3}}>{completedGuides.length} <Text style={{fontSize:13,fontWeight:'700',color:C.muted}}>{lang==='fr'?'activité(s)':'jëf'}</Text></Text></View>
        <Text style={{fontSize:34}}>🌱</Text>
      </View>
      <View style={{height:8,backgroundColor:'#E8DFC8',borderRadius:8,overflow:'hidden',marginTop:10}}><View style={{height:8,width:`${Math.min(100,(completedGuides.length/Math.max(1,activityGuides.length))*100)}%`,backgroundColor:'#25845F',borderRadius:8}}/></View>
    </View>
    <Section title={copy.ages}/><View style={s.pillRow}>{(['Tous','0–2 ans','3–4 ans','5–6 ans'] as const).map(value=><Pill key={value} active={age===value} onPress={()=>setAge(value)}>{value==='Tous'?copy.all:value}</Pill>)}</View>
    <Section title={copy.topics}/><Text style={s.cardSubtitle}>{copy.noPressure}</Text>
    {visibleThemes.map(theme=><Pressable key={theme.id} accessibilityRole="button" accessibilityState={{expanded:selected===theme.id}} onPress={()=>setSelected(selected===theme.id?null:theme.id)} style={[s.gameCard,{backgroundColor:selected===theme.id?'#FFF0C7':'#FFFFFF',borderWidth:1,borderColor:'#E7E9DE'}]}><Text style={{fontSize:34}}>{theme.icon}</Text><View style={{flex:1,gap:4}}><Text style={s.cardTitle}>{theme.title}</Text><Text style={s.cardSubtitle}>{theme.skills.slice(0,2).join(' · ')}</Text><Text style={s.sectionAction}>{selected===theme.id?copy.close:copy.open}</Text></View><Text style={{fontSize:20,color:C.orange}}>{selected===theme.id?'−':'+'}</Text></Pressable>)}
    {activeTheme?<View style={s.quizCard}><Text style={s.quizTitle}>{activeTheme.icon} {activeTheme.title}</Text><Text style={s.stepsTitle}>{copy.skills}</Text>{activeTheme.skills.map(skill=><Text key={skill} style={s.stepText}>• {skill}</Text>)}<Text style={s.stepsTitle}>{copy.ideas}</Text>{activeTheme.activities.map(activity=><View key={activity} style={s.answerRow}><Text style={s.optionText}>🌱 {activity}</Text></View>)}{activityGuides.filter(guide=>guide.themeId===activeTheme.id).map(guide=>{const guideId=`${guide.themeId}:${guide.title}`;const isDone=completedGuides.includes(guideId);return <View key={guideId} style={s.workshop}><View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:8}}><Text style={[s.cardTitle,{flex:1}]}>🌱 {guide.title}</Text><Text style={{fontSize:12,fontWeight:'900',color:isDone?'#176B50':C.muted}}>{isDone?'✓ '+copy.done:''}</Text></View><Text style={s.cardSubtitle}>⏱ {guide.duration}</Text><Text style={s.stepsTitle}>Matériel</Text><Text style={s.stepText}>{guide.materials}</Text><Text style={s.stepsTitle}>On essaie ensemble</Text>{guide.steps.map((step,index)=><Text key={step} style={s.stepText}>{index+1}. {step}</Text>)}<Text style={s.stepsTitle}>Petite question</Text><Text style={s.stepText}>💬 {guide.prompt}</Text><Text style={s.stepsTitle}>Adapter à l’âge</Text><Text style={s.stepText}>{guide.adaptation}</Text><Text style={s.readerNotice}>Sécurité et bienveillance : {guide.safety}</Text><Pressable accessibilityRole="checkbox" accessibilityState={{checked:isDone}} onPress={()=>toggleGuideDone(guideId)} style={{minHeight:46,borderRadius:15,backgroundColor:isDone?'#E3F2E6':'#FFF0C7',justifyContent:'center',alignItems:'center',paddingHorizontal:12}}><Text style={{fontWeight:'900',color:'#174F3D'}}>{isDone?'✓ '+copy.undoDone:copy.markDone}</Text></Pressable></View>})}{workshopLibrary.filter(w=>activeTheme.activities.some(activity=>activity.toLocaleLowerCase().includes(w.title.toLocaleLowerCase().split(' ')[0])||w.title.toLocaleLowerCase().includes(activity.toLocaleLowerCase().split(' ')[0]))).slice(0,2).map(workshop=><View key={workshop.id} style={s.workshop}><Text style={s.cardTitle}>{workshop.icon} {workshop.title}</Text><Text style={s.cardSubtitle}>{workshop.age} · {workshop.duration}</Text><Text style={s.stepText}>{workshop.goal}</Text><Text style={s.materials}>Matériel : {workshop.materials.join(', ')}</Text>{workshop.steps.map((step,index)=><Text key={step} style={s.stepText}>{index+1}. {step}</Text>)}<Text style={s.readerNotice}>Sécurité : {workshop.safety}</Text></View>)}</View>:null}
    <Pressable accessibilityRole="button" accessibilityState={{expanded:showPath}} onPress={()=>setShowPath(!showPath)} style={[s.gameCard,{backgroundColor:'#E1F3FF'}]}><Text style={{fontSize:34}}>🗓️</Text><View style={{flex:1}}><Text style={s.cardTitle}>{copy.path}</Text><Text style={s.cardSubtitle}>{copy.pathIntro}</Text></View><Text style={s.sectionAction}>{showPath?copy.close:copy.open}</Text></Pressable>
    {showPath?eightWeekPath.map(item=><View key={item.week} style={s.workshop}><Text style={s.cardCategory}>{copy.week} {item.week}</Text><Text style={s.cardTitle}>{item.theme}</Text><Text style={s.cardSubtitle}>🎵 {item.song}</Text><Text style={s.stepText}>🎨 {item.activity}</Text><Text style={s.materials}>{copy.goal} : {item.goal}</Text></View>):null}
    <View style={s.parentHint}><Text style={s.cardSubtitle}>👨‍👩‍👧 {copy.adult}</Text></View>
  </ScrollView></SafeAreaView>;
}

function ListenScreen({lang,setLang,favorites,toggleFavorite,onOpen}:{lang:Language;setLang:(l:Language)=>void;favorites:string[];toggleFavorite:(id:string)=>void;onOpen:(item:ContentItem)=>void}) {
  const listeningItems = contents.filter(item => item.category === 'Histoires' || item.category === 'Berceuses');
  const [filter,setFilter] = useState<'Tout'|'Histoires'|'Berceuses'>('Tout');
  const visible = listeningItems.filter(item => filter === 'Tout' || item.category === filter);
  const copy = lang === 'fr'
    ? {title:'Écouter',intro:'Des histoires et des mélodies douces pour imaginer, découvrir et se détendre.',guide:'Les histoires du Baobab',guideText:'Écoutons, imaginons et grandissons ensemble.',all:'Tout',stories:'Histoires',lullabies:'Berceuses',empty:'De nouvelles histoires arrivent bientôt.'}
    : {title:'Déglu',intro:'Nettali ak woy yu dal ngir xalaat, xam-xam ak noppalu.',guide:'Nettali yu Baobab',guideText:'Déglu, xalaat te màgg ci benn.',all:'Yépp',stories:'Nettali',lullabies:'Woy yu nelaw',empty:'Nettali yu bees dinañu ñëw.'};
  return <SafeAreaView style={s.safe} edges={['top']}><Header lang={lang} setLang={setLang}/><ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
    <View style={[s.parentCard,{backgroundColor:'#E7F3E9',overflow:'hidden'}]}><Text style={s.cardCategory}>{lang==='fr'?'L’UNIVERS DES HISTOIRES':'ÀDDINA NETTALI'}</Text><Text style={s.pageTitle}>🌳 {copy.title}</Text><Text style={s.cardSubtitle}>{copy.intro}</Text><View style={{flexDirection:'row',alignItems:'center',gap:12,marginTop:8}}><Text style={{fontSize:42}}>🌳</Text><View style={{flex:1}}><Text style={s.cardTitle}>{copy.guide}</Text><Text style={s.cardSubtitle}>{copy.guideText}</Text></View></View></View>
    <View style={s.pillRow}>{([{value:'Tout',label:copy.all},{value:'Histoires',label:copy.stories},{value:'Berceuses',label:copy.lullabies}] as const).map(item=><Pill key={item.value} active={filter===item.value} onPress={()=>setFilter(item.value)}>{item.label}</Pill>)}</View>
    <Section title={lang==='fr'?'À écouter':'Li nga mën a déglu'}/>{visible.map(item=><ContentCard key={item.id} item={item} lang={lang} favorite={favorites.includes(item.id)} onFavorite={()=>toggleFavorite(item.id)} onOpen={()=>onOpen(item)}/>)}
    {!visible.length?<View style={s.empty}><Text style={{fontSize:42}}>🌙</Text><Text style={s.cardTitle}>{copy.empty}</Text></View>:null}<Text style={s.footer}>Niani Kids ❤️</Text>
  </ScrollView></SafeAreaView>;
}

function LibraryScreen({lang,setLang,favorites,toggleFavorite,onOpen}:{lang:Language;setLang:(l:Language)=>void;favorites:string[];toggleFavorite:(id:string)=>void;onOpen:(item:ContentItem)=>void}) {
  const [filter,setFilter]=useState('Tout'); const [query,setQuery]=useState(''); const [languageFilter,setLanguageFilter]=useState('Toutes'); const [onlyFavorites,setOnlyFavorites]=useState(false);
  const categories=[{value:'Tout',label:translations[lang].allCategories},{value:'Comptines',label:translations[lang].rhymes},{value:'Berceuses',label:translations[lang].lullabies},{value:'J’apprends',label:translations[lang].learn},{value:'Histoires',label:translations[lang].stories}];
  const list=useMemo(()=>contents.filter(x=>(filter==='Tout'||x.category===filter)&&(languageFilter==='Toutes'||x.language===languageFilter||x.language==='FR + WO')&&(!onlyFavorites||favorites.includes(x.id))&&normalizeText([x.title,x.subtitle,x.category,x.language].join(' ')).includes(normalizeText(query))),[filter,languageFilter,onlyFavorites,favorites,query]);
  const audioReadyItems=contents.filter(item=>Boolean(item.lyrics)&&isAudioReady(getAudioTrack(item.id)));
  const spotlight=audioReadyItems.find(item=>item.featured)??audioReadyItems[0];

  return <SafeAreaView style={s.safe} edges={['top']}><Header lang={lang} setLang={setLang}/><ScrollView contentContainerStyle={s.scroll}><View style={{backgroundColor:'#FFF0C7',borderRadius:24,padding:17,marginBottom:14,borderWidth:1,borderColor:'#F0DDA7'}}>
      <Text style={{fontSize:11,fontWeight:'900',letterSpacing:1,color:'#8A641B'}}>{lang==='fr'?'LA MUSIQUE DES PETITS':'WOY YI CI XALE YI'}</Text>
      <Text style={[s.pageTitle,{marginTop:5}]}>🎵 {translations[lang].libraryTitle}</Text>
      <Text style={s.cardSubtitle}>{translations[lang].libraryIntro}</Text>
      <View style={{flexDirection:'row',alignItems:'center',gap:7,marginTop:10}}>
        <View style={{backgroundColor:'#FFFFFF',paddingHorizontal:11,paddingVertical:7,borderRadius:30}}><Text style={{fontSize:12,fontWeight:'900',color:'#176B50'}}>🎧 {audioReadyItems.length} {lang==='fr'?'chansons disponibles':'woy yu am'}</Text></View>
        <View style={{backgroundColor:'#FFFFFF',paddingHorizontal:11,paddingVertical:7,borderRadius:30}}><Text style={{fontSize:12,fontWeight:'900',color:'#176B50'}}>🇸🇳 FR · WO</Text></View>
      </View>
    </View>
    {spotlight?<Pressable accessibilityRole="button" accessibilityLabel={(lang==='fr'?'Écouter ':'Déglu ')+spotlight.title} onPress={()=>onOpen(spotlight)} style={{backgroundColor:'#174F3D',borderRadius:22,padding:12,marginBottom:15,flexDirection:'row',alignItems:'center',gap:13,elevation:3}}>
      {getAudioTrack(spotlight.id)?.coverUrl?<Image source={{uri:getAudioTrack(spotlight.id)?.coverUrl}} style={{width:94,height:94,borderRadius:16,backgroundColor:'#F8E9C8'}} resizeMode="cover"/>:<View style={{width:94,height:94,borderRadius:16,backgroundColor:'#F8E9C8',alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:40}}>{spotlight.emoji}</Text></View>}
      <View style={{flex:1,gap:4}}>
        <Text style={{fontSize:10,fontWeight:'900',letterSpacing:1,color:'#F8D98A'}}>{lang==='fr'?'À ÉCOUTER':'DÉGLU'}</Text>
        <Text style={{fontSize:17,fontWeight:'900',color:'#FFFFFF'}} numberOfLines={2}>{spotlight.title}</Text>
        <Text style={{fontSize:12,color:'#E3F0E9'}} numberOfLines={2}>{spotlight.subtitle}</Text>
        <Text style={{fontSize:13,fontWeight:'900',color:'#F8D98A'}}>▶ {lang==='fr'?'Écouter maintenant':'Déglu léegi'}</Text>
      </View>
    </Pressable>:null}<TextInput accessibilityLabel={translations[lang].search} accessibilityRole="search" value={query} onChangeText={setQuery} placeholder={'🔎 '+translations[lang].search+'…'} placeholderTextColor="#947F70" style={s.search} returnKeyType="search" clearButtonMode="while-editing"/><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingVertical:3}}>{categories.map(x=><Pill key={x.value} active={filter===x.value} onPress={()=>setFilter(x.value)}>{x.label}</Pill>)}</ScrollView><View style={{flexDirection:'row',gap:8,flexWrap:'wrap'}}><Pill active={languageFilter==='Toutes'} onPress={()=>setLanguageFilter('Toutes')}>{translations[lang].allLanguages}</Pill><Pill active={languageFilter==='FR'} onPress={()=>setLanguageFilter('FR')} >{translations[lang].french}</Pill><Pill active={languageFilter==='WO'} onPress={()=>setLanguageFilter('WO')} >{translations[lang].wolof}</Pill><Pill active={onlyFavorites} onPress={()=>setOnlyFavorites(v=>!v)} >❤️ {translations[lang].favoritesFilter}</Pill></View><Text style={s.cardSubtitle}>{list.length} {translations[lang].contentCount}</Text>{list.map(item=><ContentCard key={item.id} item={item} lang={lang} favorite={favorites.includes(item.id)} onFavorite={()=>toggleFavorite(item.id)} onOpen={()=>onOpen(item)}/>)}{!list.length&&<View style={s.empty}><Text style={{fontSize:42}}>🔎</Text><Text style={s.cardTitle}>{translations[lang].noContent}</Text><Text style={s.cardSubtitle}>{translations[lang].tryOtherSearch}</Text><Pressable onPress={()=>{setQuery('');setFilter('Tout');setLanguageFilter('Toutes');setOnlyFavorites(false)}} style={s.playButton}><Text style={s.playText}>{translations[lang].resetFilters}</Text></Pressable></View>}</ScrollView></SafeAreaView>;
}
function FavoritesScreen({lang,setLang,favorites,toggleFavorite,onOpen}:{lang:Language;setLang:(l:Language)=>void;favorites:string[];toggleFavorite:(id:string)=>void;onOpen:(item:ContentItem)=>void}) {
  return <SafeAreaView style={s.safe} edges={['top']}><Header lang={lang} setLang={setLang}/><ScrollView contentContainerStyle={s.scroll}><Text style={s.pageTitle}>❤️ {translations[lang].favorites}</Text>{allKnownContents.filter(x=>favorites.includes(x.id)).map(item=><ContentCard key={item.id} item={item} lang={lang} favorite onFavorite={()=>toggleFavorite(item.id)} onOpen={()=>onOpen(item)}/>)}{!favorites.length&&<View style={s.empty}><Text style={{fontSize:45}}>⭐</Text><Text style={s.cardTitle}>{translations[lang].treasuresHere}</Text><Text style={s.cardSubtitle}>{translations[lang].favoriteHint}</Text></View>}</ScrollView></SafeAreaView>;
}
function MoreScreen({lang,setLang}:{lang:Language;setLang:(l:Language)=>void}) {
  const navigation=useNavigation<any>();
  const french=lang==='fr';
  const items=[
    {route:'Explorer',icon:'🧭',title:french?'Explorer':'Seet',description:french?'Découvrir le Sénégal, la nature et les langues':'Xam Senegaal, àll ak làkk yi',background:'#E4F2FF'},
    {route:'Atelier',icon:'🎨',title:french?'Atelier créatif':'Atelier',description:french?'Dessiner, bricoler et créer en famille':'Tëgg, jëf ak sos ci njaboot gi',background:'#FBE8E3'},
    {route:'Parents',icon:'👨‍👩‍👧',title:french?'Espace Parents':'Njàngale yi',description:french?'Ressources, sécurité et informations familiales':'Jumtukaay, kaaraange ak xibaar',background:'#E6F2E6'},
    {route:'Favoris',icon:'❤️',title:french?'Mes favoris':'Li ma bëgg',description:french?'Retrouver les chansons et histoires préférées':'Dellusi ci woy ak nettali yi nga bëgg',background:'#FFF0D4'},
    {route:'Écouter',icon:'🌙',title:french?'Histoires et berceuses':'Nettali ak woy yu nelaw',description:french?'Un espace calme pour écouter':'Bérab bu dal ngir déglu',background:'#EEE9FF'}
  ];
  return <SafeAreaView style={s.safe} edges={['top']}><Header lang={lang} setLang={setLang}/><ScrollView contentContainerStyle={s.scroll}>
    <View style={[s.parentCard,{backgroundColor:'#E5F2E7'}]}><Text style={s.cardCategory}>{french?'TOUTES LES RUBRIQUES':'YÉPP CI BÉRAB'}</Text><Text style={s.pageTitle}>{french?'Plus à découvrir':'Yeneen lu bees'}</Text><Text style={s.cardSubtitle}>{french?'Retrouve ici les espaces pour apprendre, créer et partager avec ta famille.':'Fii nga fekk bérab yi ngir jàng, sos ak bokk ak sa njaboot.'}</Text></View>
    {items.map(item=><Pressable key={item.route} accessibilityRole="button" onPress={()=>navigation.navigate(item.route)} style={[s.gameCard,{backgroundColor:item.background,minHeight:88}]}>
      <View style={{width:48,height:48,borderRadius:16,backgroundColor:'#FFFFFF',alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:27}}>{item.icon}</Text></View>
      <View style={{flex:1,gap:3}}><Text style={s.cardTitle}>{item.title}</Text><Text style={s.cardSubtitle}>{item.description}</Text></View><Text style={{fontSize:23,color:C.orange}}>›</Text>
    </Pressable>)}
    <Text style={s.footer}>Niani Kids · Chanter · Rêver · Apprendre · Grandir</Text>
  </ScrollView></SafeAreaView>;
}
function ParentsScreen({lang,setLang}:{lang:Language;setLang:(l:Language)=>void}) {
  const navigation=useNavigation<any>();
  const openInfo = (url:string) => Linking.openURL(url).catch(() => Alert.alert(lang==='fr'?'Lien indisponible':'Link bi amul',lang==='fr'?'Réessaie dans un instant.':'Jéemaat ci kanam.'));
  const label = lang==='fr';
  return <SafeAreaView style={s.safe} edges={['top']}><Header lang={lang} setLang={setLang}/><ScrollView contentContainerStyle={s.scroll}>
    <Text style={s.pageTitle}>👨‍👩‍👧 {translations[lang].parentTitle}</Text>
    <View style={s.parentCard}><Text style={{fontSize:42}}>💚</Text><Text style={s.heroTitle}>{translations[lang].parentTogether}</Text><Text style={s.cardSubtitle}>{translations[lang].parentBody}</Text></View>
    <Section title={translations[lang].parentSpaceTitle}/>
    <Pressable accessibilityRole="button" onPress={()=>navigation.navigate('Bibliothèque')} style={[s.externalLink,{backgroundColor:'#E5F2E7'}]}>
      <Text style={{fontSize:27}}>🎵</Text><View style={{flex:1}}><Text style={s.cardTitle}>{label?'Catalogue des chansons':'Woy yi'}</Text><Text style={s.cardSubtitle}>{label?`${audioCatalog.filter(track=>isAudioReady(track)).length} chansons validées, disponibles dans l’onglet Chansons.`:'Woy yu ñu nangu te féex ci Chansons.'}</Text></View><Text style={s.sectionAction}>{label?'Ouvrir':'Ubbi'} ›</Text>
    </Pressable>
    <Pressable accessibilityRole="link" style={s.externalLink} onPress={()=>openExternal(YOUTUBE)}><Text style={{fontSize:26}}>▶️</Text><View style={{flex:1}}><Text style={s.cardTitle}>{translations[lang].youtube}</Text><Text style={s.cardSubtitle}>{translations[lang].youtubeSubtitle}</Text></View><Text style={s.sectionAction}>{translations[lang].opening} ↗</Text></Pressable>
    <Pressable accessibilityRole="link" style={s.externalLink} onPress={()=>openExternal(TIKTOK)}><Text style={{fontSize:26}}>🎬</Text><View style={{flex:1}}><Text style={s.cardTitle}>{translations[lang].tiktok}</Text><Text style={s.cardSubtitle}>{translations[lang].tiktokSubtitle}</Text></View><Text style={s.sectionAction}>{translations[lang].openExternal} ↗</Text></Pressable>
    <Pressable accessibilityRole="link" style={s.externalLink} onPress={()=>openExternal(FACEBOOK)}><Text style={{fontSize:26}}>📘</Text><View style={{flex:1}}><Text style={s.cardTitle}>{translations[lang].facebook}</Text><Text style={s.cardSubtitle}>{translations[lang].facebookSubtitle}</Text></View><Text style={s.sectionAction}>{translations[lang].openExternal} ↗</Text></Pressable>
    <Pressable accessibilityRole="link" style={s.externalLink} onPress={()=>openExternal(INSTAGRAM)}><Text style={{fontSize:26}}>📸</Text><View style={{flex:1}}><Text style={s.cardTitle}>{translations[lang].instagram}</Text><Text style={s.cardSubtitle}>{translations[lang].instagramSubtitle}</Text></View><Text style={s.sectionAction}>{translations[lang].openExternal} ↗</Text></Pressable>
    <Section title={label?'Ressources et nouveautés':'Jumtukaay ak yeesal'} />
    <Text style={s.cardSubtitle}>{label?'Retrouvez les nouvelles fiches, idées de jeux et ressources gratuites publiées sur le site Niani Kids.':'Gis fiches yu bees, xalaat yu po ak jumtukaay yu amul njëg ci dalub Niani Kids.'}</Text>
    {siteResources.map(resource=><Pressable key={resource.id} accessibilityRole="link" accessibilityLabel={label?resource.titleFr:resource.titleWo} style={s.externalLink} onPress={()=>openExternal(resource.url)}><Text style={{fontSize:25}}>{resource.icon}</Text><View style={{flex:1}}><Text style={s.cardTitle}>{label?resource.titleFr:resource.titleWo}</Text><Text style={s.cardSubtitle}>{label?resource.descriptionFr:resource.descriptionWo}</Text></View><Text style={s.sectionAction}>↗</Text></Pressable>)}
    <View style={s.safety}><Text style={s.cardTitle}>{label?'Informations légales et confidentialité':'Xibaar yu yoon ak sutura'}</Text>
      <Text style={s.cardSubtitle}>{label?'Niani Kids est édité et hébergé par Sentic, situé à Yoff, Dakar, Sénégal. Responsable de publication : Sentic.':'Sentic moo yor ak di héberge Niani Kids. Dakar, Senegaal.'}</Text>
      <Text style={s.cardSubtitle}>{label?'Contact Niani Kids : '+NIANI_EMAIL:'Jokkoo Niani Kids : '+NIANI_EMAIL}</Text>
      <Text style={s.cardSubtitle}>{label?'Sentic : '+SENTIC_EMAIL+' · +221 77 510 56 36':'Sentic : '+SENTIC_EMAIL+' · +221 77 510 56 36'}</Text>
      <Pressable accessibilityRole="link" onPress={()=>openInfo(SENTIC_WEBSITE)}><Text style={s.sectionAction}>Sentic · senticsn.com ↗</Text></Pressable>
      <Pressable accessibilityRole="link" onPress={()=>openInfo(WEBSITE)}><Text style={s.sectionAction}>{label?'Site Niani Kids':'Site Niani Kids'} ↗</Text></Pressable>
      <Pressable accessibilityRole="link" onPress={()=>openInfo(PRIVACY_PAGE)}><Text style={s.sectionAction}>{label?'Politique de confidentialité ↗':'Politigu sutura ↗'}</Text></Pressable>
      <Pressable accessibilityRole="link" onPress={()=>openInfo(CONTACT_PAGE)}><Text style={s.sectionAction}>{label?'Contacter Niani Kids ↗':'Jokkoo ak Niani Kids ↗'}</Text></Pressable>
      <Text style={s.cardSubtitle}>{label?'Consultez la politique de confidentialité pour connaître les informations relatives aux données et à leur utilisation.':'Jàngal politigu sutura bi ngir xam ni ñuy jëfandikoo say xibaar.'}</Text>
    </View>
    <View style={s.safety}><Text style={s.cardTitle}>{translations[lang].parentSafetyTitle}</Text><Text style={s.cardSubtitle}>{translations[lang].parentSafetyBody} {label?'Les plateformes externes appliquent leurs propres règles. Un adulte doit accompagner l’enfant.':'Platform yu biti am nañu seen yoon. Mag war na ànd ak xale bi.'}</Text></View>
  </ScrollView></SafeAreaView>;
}
function AppContent() {
  const insets = useSafeAreaInsets();
  const [lang,setLangState]=useState<Language>('fr'); const [favorites,setFavorites]=useState<string[]>([]); const [favoritesHydrated,setFavoritesHydrated]=useState(false); const [favoritesRevision,setFavoritesRevision]=useState(0); const favoritesWriteQueue=useRef<Promise<void>>(Promise.resolve()); const [stars,setStarsState]=useState(0); const [lastContentId,setLastContentId]=useState<string|null>(null); const lastContent=lastContentId?allKnownContents.find(item=>item.id===lastContentId)??null:null; const [selectedItem,setSelectedItem]=useState<ContentItem|null>(null); const [isSpeaking,setIsSpeaking]=useState(false);
  const setLang=(next:Language)=>{setLangState(next);AsyncStorage.setItem('niani-language',next).catch(()=>{});};
  useEffect(()=>{if(!selectedItem){Speech.stop();setIsSpeaking(false);} return ()=>{Speech.stop();};},[selectedItem]);
  useEffect(()=>{AsyncStorage.multiGet(['niani-favorites','niani-stars','niani-language','niani-last-content']).then(values=>{
    const favoritesValue=values[0][1];
    const starsValue=values[1][1];
    const languageValue=values[2][1];
    const lastContentValue=values[3][1];
    if(lastContentValue&&validFavoriteIds.has(lastContentValue))setLastContentId(lastContentValue);

    // Sanitize stored IDs; malformed favorites must not block language or reward restoration.
    setFavorites(parseFavorites(favoritesValue,validFavoriteIds));
    if(starsValue!==null){
      const parsedStars=Number(starsValue);
      if(Number.isFinite(parsedStars)&&parsedStars>=0)setStarsState(Math.floor(parsedStars));
    }
    if(languageValue==='fr'||languageValue==='wo')setLangState(languageValue);
  }).catch(()=>{}).finally(()=>setFavoritesHydrated(true));},[]);
  useEffect(()=>{
    if(!favoritesHydrated||favoritesRevision===0)return;
    const snapshot=[...favorites];
    // Serialize writes so rapid taps cannot let an older AsyncStorage write win last.
    favoritesWriteQueue.current=favoritesWriteQueue.current.catch(()=>undefined).then(()=>saveFavorites(AsyncStorage,snapshot)).catch(()=>undefined);
  },[favorites,favoritesHydrated,favoritesRevision]);
  const toggleFavorite=(id:string)=>{
    if(!favoritesHydrated||!validFavoriteIds.has(id))return;
    setFavorites(old=>toggleFavoriteIds(old,id,validFavoriteIds));
    setFavoritesRevision(old=>old+1);
  };
  const setStars=(n:number)=>{setStarsState(n);AsyncStorage.setItem('niani-stars',String(n)).catch(()=>{})};
  const onOpen=(item:ContentItem)=>{setLastContentId(item.id);AsyncStorage.setItem('niani-last-content',item.id).catch(()=>{});setSelectedItem(item);};
  return <NavigationContainer><StatusBar barStyle="dark-content" backgroundColor={C.cream}/><Tab.Navigator screenOptions={{headerShown:false,tabBarActiveTintColor:C.orange,tabBarInactiveTintColor:'#7C8982',tabBarStyle:{width:'100%',alignSelf:'stretch',height:64+insets.bottom,minHeight:64+insets.bottom,paddingTop:4,paddingBottom:Math.max(insets.bottom,6),paddingHorizontal:3,backgroundColor:'#FFFEFB',borderTopColor:'#EFE6D8',borderTopWidth:1,elevation:10,shadowColor:'#486657',shadowOffset:{width:0,height:-3},shadowOpacity:0.07,shadowRadius:9},tabBarItemStyle:{flex:1,flexBasis:0,minWidth:0,paddingHorizontal:0,alignItems:'center',justifyContent:'center'},tabBarLabelStyle:{fontWeight:'900',fontSize:9,lineHeight:12,letterSpacing:0,marginTop:0,marginBottom:0,includeFontPadding:false},tabBarHideOnKeyboard:true,tabBarIconStyle:{marginTop:0,width:38,height:30,alignItems:'center',justifyContent:'center'}}}>
    <Tab.Screen name="Accueil" options={{tabBarLabel:translations[lang].home,tabBarAccessibilityLabel:translations[lang].home,tabBarIcon:({focused})=><View style={[s.tabIcon,focused&&{backgroundColor:'#E2F2E8'}]}><Text style={s.tabEmoji}>🏡</Text></View>}}>{()=> <HomeScreen lang={lang} setLang={setLang} favorites={favorites} toggleFavorite={toggleFavorite} onOpen={onOpen} lastContent={lastContent} stars={stars}/>}</Tab.Screen>
    <Tab.Screen name="Vidéos" options={{tabBarLabel:lang==='fr'?'Vidéos':'Wideo',tabBarAccessibilityLabel:'Vidéos Niani Kids',tabBarIcon:({focused})=><View style={[s.tabIcon,focused&&{backgroundColor:'#E2F2E8'}]}><Text style={s.tabEmoji}>🎬</Text></View>}}>{()=> <VideosScreen lang={lang} setLang={setLang}/>}</Tab.Screen>
    <Tab.Screen name="Bibliothèque" options={{tabBarLabel:lang==='fr'?'Chansons':'Woy yi',tabBarAccessibilityLabel:translations[lang].library,tabBarIcon:({focused})=><View style={[s.tabIcon,focused&&{backgroundColor:'#E2F2E8'}]}><Text style={s.tabEmoji}>🎵</Text></View>}}>{()=> <LibraryScreen lang={lang} setLang={setLang} favorites={favorites} toggleFavorite={toggleFavorite} onOpen={onOpen}/>}</Tab.Screen>
    <Tab.Screen name="Jouer" options={{tabBarLabel:translations[lang].play,tabBarAccessibilityLabel:translations[lang].play,tabBarIcon:({focused})=><View style={[s.tabIcon,focused&&{backgroundColor:'#E2F2E8'}]}><Text style={s.tabEmoji}>🎮</Text></View>}}>{()=> <GamesScreen lang={lang} setLang={setLang} stars={stars} setStars={setStars}/>}</Tab.Screen>
    <Tab.Screen name="Plus" options={{tabBarLabel:lang==='fr'?'Plus':'Yeneen',tabBarAccessibilityLabel:lang==='fr'?'Autres rubriques':'Yeneen yu am',tabBarIcon:({focused})=><View style={[s.tabIcon,focused&&{backgroundColor:'#E2F2E8'}]}><Text style={s.tabEmoji}>✨</Text></View>}}>{()=> <MoreScreen lang={lang} setLang={setLang}/>}</Tab.Screen>
    <Tab.Screen name="Explorer" options={{tabBarButton:()=>null,tabBarItemStyle:{display:'none'}}}>{()=> <ExploreScreen lang={lang} setLang={setLang}/>}</Tab.Screen>
    <Tab.Screen name="Atelier" options={{tabBarButton:()=>null,tabBarItemStyle:{display:'none'}}}>{()=> <WorkshopsScreen lang={lang} setLang={setLang}/>}</Tab.Screen>
    <Tab.Screen name="Parents" options={{tabBarButton:()=>null,tabBarItemStyle:{display:'none'}}}>{()=> <ParentsScreen lang={lang} setLang={setLang}/>}</Tab.Screen>
    <Tab.Screen name="Écouter" options={{tabBarButton:()=>null,tabBarItemStyle:{display:'none'}}}>{()=> <ListenScreen lang={lang} setLang={setLang} favorites={favorites} toggleFavorite={toggleFavorite} onOpen={onOpen}/>}</Tab.Screen>
    <Tab.Screen name="Favoris" options={{tabBarButton:()=>null,tabBarItemStyle:{display:'none'}}}>{()=> <FavoritesScreen lang={lang} setLang={setLang} favorites={favorites} toggleFavorite={toggleFavorite} onOpen={onOpen}/>}</Tab.Screen></Tab.Navigator>
    <Modal visible={!!selectedItem} animationType="slide" onRequestClose={()=>setSelectedItem(null)}>
      <SafeAreaView style={s.readerSafe} edges={['top','bottom']}>
        <View style={s.readerHeader}>
          <Pressable accessibilityRole="button" accessibilityLabel={translations[lang].close} onPress={()=>setSelectedItem(null)} style={s.readerClose}><Text style={s.readerCloseText}>✕ {translations[lang].close}</Text></Pressable>
          <Text style={s.readerBrand}>Niani Kids 🌳</Text>
        </View>
        {selectedItem&&<ScrollView contentContainerStyle={s.readerScroll}>
          <View style={[s.readerArt,{backgroundColor:selectedItem.category==='Berceuses'?'#E9E9FF':selectedItem.category==='Histoires'?'#FFF0D7':'#DDF4FF'}]}>
            {(!isAudioReady(getAudioTrack(selectedItem.id)) && (getAudioTrack(selectedItem.id)?.coverUrl ?? selectedItem.imageUrl)) ? <Image source={{uri:getAudioTrack(selectedItem.id)?.coverUrl ?? selectedItem.imageUrl}} resizeMode="cover" style={{width:'100%',height:190,borderRadius:18}} accessible accessibilityLabel={`Pochette de ${selectedItem.title}`} /> : <Text style={{fontSize:58}}>{selectedItem.emoji}</Text>}
            <Text style={s.readerMeta}>{[selectedItem.category, selectedItem.duration && !/^à confirmer$/i.test(selectedItem.duration.trim()) ? selectedItem.duration : null, selectedItem.language].filter(Boolean).join(' · ')}</Text>
          </View>
          <Text style={s.readerTitle}>{selectedItem.title}</Text>
          <Text style={s.readerSubtitle}>{selectedItem.subtitle}</Text>
          {selectedItem.lyrics&&isAudioReady(getAudioTrack(selectedItem.id)) ? <>
            <AudioPlayerCard key={selectedItem.id} title={selectedItem.title} source={getAudioTrack(selectedItem.id)?.assetPath ?? ''} coverUrl={getAudioTrack(selectedItem.id)?.coverUrl} language={selectedItem.language} uiLanguage={lang} />
            {getAudioTrack(selectedItem.id)?.alternateSources?.filter(v=>v.reviewStatus==='approved'&&v.languageReviewed&&v.rightsConfirmed).map((version,index)=><View key={version.title} style={{marginTop:12}}><Text style={{fontSize:14,fontWeight:'800',color:C.ink,marginBottom:6}}>{version.title}</Text><AudioPlayerCard key={version.title} title={version.title} source={version.sourceUrl} coverUrl={getAudioTrack(selectedItem.id)?.coverUrl} language={selectedItem.language} uiLanguage={lang}/></View>)}
          </> : null}
          {selectedItem.lyrics&&!isAudioReady(getAudioTrack(selectedItem.id)) ? <View style={s.readerNotice}><Text style={s.readerNotice}>{lang==='fr'?'🎵 Enregistrement musical en préparation. Tu peux écouter le texte avec la synthèse vocale ci-dessous.':'🎵 Woy bu dëgg-dëgg mi ngi ci waajal. Mën nga déglu mbind mi ak baat bu ordinatëër ci suuf.'}</Text></View> : null}
          {(selectedItem.lyrics||selectedItem.storyText)&&<View style={s.readerAudioRow}>
            <Pressable accessibilityRole="button" accessibilityLabel={isSpeaking?translations[lang].playText:translations[lang].listen} accessibilityState={{selected:isSpeaking}} style={[s.readerListenButton,{flexGrow:1,flexBasis:220}]} onPress={()=>{if(isSpeaking){Speech.stop();setIsSpeaking(false);return;} const spokenText=[selectedItem.lyrics,selectedItem.storyText].filter(Boolean).join('\n\n').replace(/^.*Note : paroles wolof de travail.*$/m,'').trim();Speech.stop();setIsSpeaking(true);Speech.speak(spokenText,{language:selectedItem.language==='WO'?'wo-SN':'fr-FR',rate:0.82,pitch:1.05,onDone:()=>setIsSpeaking(false),onStopped:()=>setIsSpeaking(false),onError:()=>setIsSpeaking(false)});}}>
              <Text style={s.readerListenText}>{isSpeaking?'Ⅱ '+translations[lang].stop:'▶ '+translations[lang].listen}</Text>
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel={translations[lang].stop} style={s.readerStopButton} onPress={()=>{Speech.stop();setIsSpeaking(false);}}>
              <Text style={s.readerStopText}>■ {translations[lang].stop}</Text>
            </Pressable>
          </View>}
          {selectedItem.lyrics?<View style={s.readerTextCard}>
            <Text style={s.readerSection}>{translations[lang].singTogether} 🎵</Text>
            <Text style={s.readerBody}>{selectedItem.lyrics.replace(/^.*Note : paroles wolof de travail.*$/m,'').trim()}</Text>
            {selectedItem.language==='WO'&&<Text style={s.readerNotice}>{translations[lang].wolofReviewNotice}</Text>}
          </View>:null}
          {selectedItem.storyText?<View style={s.readerTextCard}>
            <Text style={s.readerSection}>{translations[lang].storyLabel} 📖</Text>
            <Text style={s.readerBody}>{selectedItem.storyText}</Text>
            {selectedItem.learningGoal?<Text style={s.readerNotice}>🌱 {lang==='fr'?'Ce que l’on découvre :':'Li nga xam :'} {selectedItem.learningGoal}</Text>:null}
            <Text style={s.readerQuestion}>💬 {translations[lang].questionLabel} : {selectedItem.storyQuestion??(selectedItem.id==='story-mango'?translations[lang].storyMangoQuestion:selectedItem.id==='story-river'?translations[lang].storyRiverQuestion:selectedItem.id==='story-griot'?translations[lang].storyGriotQuestion:translations[lang].storyFriendsQuestion)}</Text>
            {selectedItem.readingTip?<Text style={s.readerNotice}>👨‍👩‍👧 {lang==='fr'?'Pour accompagner la lecture :':'Naka mag mi di dimbali :'} {selectedItem.readingTip}</Text>:null}
            {selectedItem.afterStoryActivity?<View style={{backgroundColor:'#E4F0DD',borderRadius:14,padding:12,gap:6}}><Text style={s.readerSection}>🎨 {lang==='fr'?'À faire après l’histoire':'Jëf bu topp nettali bi'}</Text><Text style={s.readerBody}>{selectedItem.afterStoryActivity}</Text></View>:null}
            {selectedItem.keyWords?.length?<Text style={s.readerNotice}>🧠 {lang==='fr'?'Mots à découvrir :':'Baat yi ñuy jàng :'} {selectedItem.keyWords.join(' · ')}</Text>:null}
          </View>:null}
          {!selectedItem.lyrics&&!selectedItem.storyText?<View style={s.readerTextCard}>
            <Text style={s.readerSection}>{translations[lang].contentComing} ✨</Text>
            <Text style={s.readerBody}>{translations[lang].contentComingBody}</Text>
          </View>:null}
          <Text style={s.readerFooter}>{translations[lang].sharedWithAdult} ❤️</Text>
        </ScrollView>}
      </SafeAreaView>
    </Modal></NavigationContainer>;
}

export default function App() {
  return <SafeAreaProvider><AppContent /></SafeAreaProvider>;
}

const s=StyleSheet.create({
tabIcon:{width:36,height:30,borderRadius:12,alignItems:'center',justifyContent:'center'},tabEmoji:{fontSize:20,lineHeight:24,textAlign:'center',includeFontPadding:false},safe:{flex:1,backgroundColor:C.cream},readerSafe:{flex:1,backgroundColor:C.cream},readerHeader:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:18,paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E7E9DE'},readerClose:{backgroundColor:'#fff',paddingHorizontal:14,paddingVertical:12,borderRadius:14,minHeight:44,justifyContent:'center'},readerCloseText:{fontWeight:'900',fontSize:14,color:C.ink},readerBrand:{fontSize:17,fontWeight:'900',color:C.orange},readerScroll:{padding:18,paddingBottom:64,gap:17},readerArt:{minHeight:150,borderRadius:24,alignItems:'center',justifyContent:'center',gap:10},readerMeta:{fontSize:12,fontWeight:'900',color:C.ink},readerTitle:{fontSize:29,fontWeight:'900',color:C.ink,marginTop:5},readerAudioRow:{flexDirection:'row',gap:10,flexWrap:'wrap',alignItems:'stretch'},readerListenButton:{backgroundColor:'#176B50',paddingHorizontal:22,paddingVertical:18,minHeight:64,borderRadius:22,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#125640',shadowColor:'#125640',shadowOffset:{width:0,height:4},shadowOpacity:0.18,shadowRadius:7,elevation:4},readerListenText:{color:'#fff',fontWeight:'900',fontSize:18,letterSpacing:0.2,textAlign:'center'},readerStopButton:{backgroundColor:'#fff',borderWidth:1,borderColor:'#D8DCCF',paddingHorizontal:16,paddingVertical:14,minHeight:54,borderRadius:16,alignItems:'center',justifyContent:'center'},readerStopText:{color:C.ink,fontWeight:'900',fontSize:15},readerSubtitle:{fontSize:16,color:C.muted,lineHeight:22},readerTextCard:{backgroundColor:'#FFFEFC',borderRadius:24,padding:19,gap:13,borderWidth:1,borderColor:'#F0E9DE'},readerSection:{fontSize:19,fontWeight:'900',color:C.ink},readerBody:{fontSize:19,lineHeight:31,color:'#435B50'},readerNotice:{fontSize:13,lineHeight:19,color:'#5C6255',backgroundColor:'#FFF0D9',padding:10,borderRadius:10},readerQuestion:{fontSize:15,lineHeight:22,fontWeight:'800',color:'#1D5747',backgroundColor:'#DDF8E6',padding:12,borderRadius:12},readerExternal:{backgroundColor:C.orange,padding:14,borderRadius:16,alignItems:'center'},readerExternalText:{color:'#fff',fontWeight:'900',fontSize:15},readerFooter:{textAlign:'center',fontSize:13,color:C.muted},scroll:{padding:18,paddingBottom:72,gap:19},header:{flexDirection:'row',alignItems:'center',gap:10,paddingHorizontal:18,paddingTop:8,paddingBottom:9,backgroundColor:'#FFFEFB',borderBottomWidth:1,borderBottomColor:'#F0E8DA'},headerLogo:{width:52,height:52},headerBrandCopy:{flex:1,gap:1},brand:{fontSize:20,fontWeight:'900',color:C.ink,letterSpacing:-.6},brandEyebrow:{fontSize:8,fontWeight:'900',letterSpacing:1.15,color:C.green},tagline:{fontSize:11,fontWeight:'700',color:C.muted,lineHeight:15},langButton:{backgroundColor:'#FFF1C9',borderWidth:1,borderColor:'#F1D98E',borderRadius:16,paddingHorizontal:12,paddingVertical:9,minHeight:42,justifyContent:'center'},langText:{fontWeight:'900',color:C.ink,fontSize:12},
hero:{backgroundColor:'#FFE5A5',borderRadius:30,padding:15,minHeight:300,flexDirection:'column',alignItems:'stretch',justifyContent:'space-between',gap:10,overflow:'hidden',borderWidth:1,borderColor:'#F3D58C',shadowColor:'#8A6233',shadowOffset:{width:0,height:7},shadowOpacity:0.12,shadowRadius:15,elevation:4},heroBackground:{borderRadius:30,opacity:0.3},heroCopyBlock:{backgroundColor:'rgba(255,250,235,0.88)',padding:15,borderRadius:22},heroEyebrow:{color:'#6A531A',fontSize:10,fontWeight:'900',marginBottom:6,letterSpacing:.6},heroTitle:{color:C.ink,fontSize:27,fontWeight:'900',lineHeight:32,letterSpacing:-.7},heroCopy:{color:'#405D50',fontSize:13,lineHeight:19,marginTop:7,marginBottom:4},heroActions:{flexDirection:'row',gap:7,flexWrap:'wrap'},heroButton:{backgroundColor:C.orange,borderRadius:14,paddingHorizontal:11,paddingVertical:10,marginTop:7,minHeight:40,justifyContent:'center'},heroButtonText:{color:'#fff',fontWeight:'900',fontSize:12},heroButtonSecondary:{backgroundColor:'#fff',borderRadius:14,paddingHorizontal:11,paddingVertical:10,marginTop:7,minHeight:40,justifyContent:'center'},heroButtonSecondaryText:{color:C.ink,fontWeight:'900',fontSize:12},heroFriends:{width:'100%',flexDirection:'row',alignItems:'flex-end',justifyContent:'space-evenly',gap:4,height:112},heroCharacter:{width:92,height:112},
quickGrid:{flexDirection:'row',flexWrap:'wrap',gap:10},quickCard:{flexGrow:1,flexBasis:'46%',minWidth:'46%',borderRadius:22,padding:15,minHeight:116,justifyContent:'center',borderWidth:1,borderColor:'#FFFFFF',shadowColor:'#486657',shadowOffset:{width:0,height:4},shadowOpacity:0.09,shadowRadius:10,elevation:3},quickEmoji:{fontSize:25,marginBottom:5},quickTitle:{fontSize:14,fontWeight:'900',color:C.ink},quickSub:{fontSize:11,color:C.muted,marginTop:3},search:{backgroundColor:'#FFFEFC',borderWidth:1,borderColor:'#E9E1D5',borderRadius:18,paddingHorizontal:16,paddingVertical:15,fontSize:16,color:C.ink,shadowColor:'#536C5D',shadowOffset:{width:0,height:2},shadowOpacity:0.04,shadowRadius:6,elevation:1},
sectionRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:4,minHeight:32},sectionTitle:{fontSize:20,fontWeight:'900',color:C.ink,letterSpacing:-.35},sectionAction:{fontSize:13,fontWeight:'900',color:C.orange},contentCard:{backgroundColor:'#FFFEFC',borderRadius:26,padding:12,flexDirection:'row',gap:13,borderWidth:1,borderColor:'#EFE7DB',shadowColor:'#536C5D',shadowOffset:{width:0,height:5},shadowOpacity:0.065,shadowRadius:12,elevation:3},art:{width:112,minHeight:126,borderRadius:20,alignItems:'center',justifyContent:'center',overflow:'hidden'},duration:{position:'absolute',bottom:6,right:5,fontSize:11,fontWeight:'900',color:C.ink,backgroundColor:'#FFFFFFE8',paddingHorizontal:5,paddingVertical:3,borderRadius:8},cardInfo:{flex:1,justifyContent:'center',gap:4},cardCategory:{color:C.green,fontSize:11,fontWeight:'900',letterSpacing:.4},cardTitle:{color:C.ink,fontSize:16,fontWeight:'900'},cardSubtitle:{color:C.muted,fontSize:13,lineHeight:18},cardActions:{flexDirection:'row',alignItems:'center',gap:12,marginTop:4},playButton:{backgroundColor:'#E8F5E8',paddingHorizontal:15,paddingVertical:11,borderRadius:15,minHeight:44,justifyContent:'center'},playText:{color:'#5D4A1A',fontWeight:'900',fontSize:12},
friendsRow:{flexDirection:'row',gap:7},friend:{flex:1,borderRadius:16,paddingVertical:8,paddingHorizontal:3,alignItems:'center',gap:3,overflow:'hidden'},friendImage:{width:'100%',height:105},friendName:{fontWeight:'900',fontSize:13,color:C.ink},friendRole:{fontSize:10,color:C.muted},storyBanner:{backgroundColor:'#fff',borderRadius:18,padding:14,flexDirection:'row',alignItems:'center',gap:12},mission:{backgroundColor:'#E4F0DD',padding:20,borderRadius:22,alignItems:'center',gap:7},missionTitle:{fontWeight:'900',fontSize:19,color:C.ink},missionText:{textAlign:'center',color:'#435B50',fontSize:14,lineHeight:20},footer:{textAlign:'center',color:C.muted,fontSize:12,marginVertical:8},
pill:{backgroundColor:'#FFFEFC',paddingHorizontal:15,paddingVertical:12,borderRadius:18,marginRight:7,borderWidth:1,borderColor:'#EEE6DA'},pillActive:{backgroundColor:'#176B50',borderColor:'#176B50'},pillText:{fontSize:13,color:C.ink,fontWeight:'800'},pillRow:{flexDirection:'row',flexWrap:'wrap',gap:4},pageIntro:{flexDirection:'row',alignItems:'center',gap:11},pageTitle:{fontSize:26,color:C.ink,fontWeight:'900',letterSpacing:-.45},starPill:{backgroundColor:'#FFF0C7',borderRadius:15,padding:10},gameHero:{backgroundColor:'#FFE5A5',borderRadius:28,padding:22,alignItems:'center',gap:9,borderWidth:1,borderColor:'#F3D58C',shadowColor:'#8A6233',shadowOffset:{width:0,height:5},shadowOpacity:0.1,shadowRadius:12,elevation:3},gameCard:{backgroundColor:'#FFFEFC',borderRadius:23,padding:16,flexDirection:'row',alignItems:'center',gap:14,borderWidth:1,borderColor:'#F0E9DE',shadowColor:'#536C5D',shadowOffset:{width:0,height:3},shadowOpacity:0.06,shadowRadius:8,elevation:2},quizCard:{backgroundColor:'#FFFEFC',borderRadius:26,padding:19,gap:14,borderWidth:1,borderColor:'#F0E9DE',shadowColor:'#536C5D',shadowOffset:{width:0,height:4},shadowOpacity:0.07,shadowRadius:10,elevation:3},backLink:{alignSelf:'flex-start'},quizTitle:{fontSize:22,fontWeight:'900',color:C.ink},quizPrompt:{fontSize:18,fontWeight:'800',color:C.ink,textAlign:'center',marginTop:8},options:{flexDirection:'row',justifyContent:'center',gap:10,flexWrap:'wrap'},option:{backgroundColor:'#F5F0FF',borderRadius:16,padding:13,alignItems:'center',minWidth:80},optionText:{fontSize:14,fontWeight:'800',color:C.ink,textAlign:'center'},numberOption:{backgroundColor:'#DDF4FF',width:65,height:65,borderRadius:18,alignItems:'center',justifyContent:'center'},numberText:{fontSize:29,fontWeight:'900',color:C.ink},answerRow:{backgroundColor:'#E4F0DD',padding:13,borderRadius:14,marginTop:5},feedback:{backgroundColor:'#DDF8E6',borderRadius:16,padding:13,alignItems:'center',gap:9},feedbackText:{fontWeight:'900',color:'#1D5747',textAlign:'center'},nextButton:{backgroundColor:C.green,borderRadius:14,paddingHorizontal:15,paddingVertical:9},nextText:{color:'#fff',fontWeight:'900'},parentHint:{backgroundColor:'#FFF0D9',padding:13,borderRadius:15,color:'#5C6255',fontSize:13,lineHeight:19},workshop:{backgroundColor:'#FFFEFC',borderRadius:24,padding:17,gap:11,borderWidth:1,borderColor:'#F0E9DE',shadowColor:'#536C5D',shadowOffset:{width:0,height:3},shadowOpacity:0.06,shadowRadius:8,elevation:2},workshopHead:{flexDirection:'row',alignItems:'center',gap:11},workshopAge:{fontSize:12,color:C.green,fontWeight:'900',marginTop:3},materials:{fontSize:13,color:'#5C6255',fontWeight:'700'},stepsTitle:{fontSize:14,fontWeight:'900',color:C.ink,marginTop:3},stepText:{fontSize:14,color:C.muted,lineHeight:20},parentCard:{backgroundColor:'#E7F3E9',borderRadius:26,padding:21,gap:11,borderWidth:1,borderColor:'#D7E8D9'},externalLink:{backgroundColor:'#FFFEFC',borderRadius:20,padding:16,flexDirection:'row',alignItems:'center',gap:12,borderWidth:1,borderColor:'#F0E9DE',shadowColor:'#536C5D',shadowOffset:{width:0,height:2},shadowOpacity:0.05,shadowRadius:7,elevation:2},safety:{backgroundColor:'#FFF0D9',borderRadius:16,padding:15,gap:7},empty:{backgroundColor:'#FFFEFC',padding:27,borderRadius:25,alignItems:'center',gap:11,borderWidth:1,borderColor:'#F0E9DE'},friendName2:{fontWeight:'900'}
});