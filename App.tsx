import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Linking, Modal, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { contents, ContentItem } from './src/content';
import { Language, translations } from './src/i18n';
import AudioPlayerCard from './src/AudioPlayerCard';
import { getAudioTrack, isAudioReady } from './src/audioCatalog';
import { learningThemes, workshopLibrary, eightWeekPath, activityGuides } from './src/program';

const Tab = createBottomTabNavigator();
const YOUTUBE = 'https://youtube.com/@nianikids';
const TIKTOK = 'https://www.tiktok.com/@niani.kids';
const FACEBOOK = 'https://www.facebook.com/nianikids/';
const INSTAGRAM = 'https://www.instagram.com/nianikids';
const C = { ink:'#432B20', cream:'#FFF9E8', yellow:'#FFD52A', orange:'#FF8A16', green:'#27B84A', blue:'#168BE8', red:'#F04444', muted:'#806B5D', lilac:'#EEE9FF', pink:'#FFE5E8' };
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
    <Image source={require('./assets/a_clean_graphic_png_logo_on_a_transparent_backgrou.png')} style={s.headerLogo} resizeMode="contain" accessibilityLabel="Logo Niani Kids" />
    <View style={{flex:1}}><Text style={s.tagline}>{t.tagline}</Text></View>
    <Pressable accessibilityRole="button" accessibilityLabel={lang==='fr'?'Passer au wolof':'Changer en français'} style={s.langButton} onPress={()=>setLang(lang==='fr'?'wo':'fr')}><Text style={s.langText}>{lang.toUpperCase()} ▾</Text></Pressable>
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
  return <View style={s.contentCard}>
    <Pressable accessibilityRole="button" accessibilityLabel={`${t.discover} ${item.title}, ${category}, ${item.duration}`} onPress={onOpen} style={[s.art,{backgroundColor:bg}]}><Text style={{fontSize:42}}>{item.emoji}</Text><Text style={s.duration}>{item.duration}</Text></Pressable>
    <View style={s.cardInfo}><Text style={s.cardCategory}>{category.toUpperCase()} · {item.language}</Text><Text style={s.cardTitle}>{item.title}</Text><Text style={s.cardSubtitle}>{item.subtitle}</Text>
      <View style={s.cardActions}><Pressable accessibilityRole="button" accessibilityLabel={`${t.discover} ${item.title}`} onPress={onOpen} style={s.playButton}><Text style={s.playText}>📖 {t.discover}</Text></Pressable><Pressable accessibilityRole="button" accessibilityLabel={favorite?`${t.removeFavorite} ${item.title}`:`${t.addFavorite} ${item.title}`} accessibilityState={{selected:favorite}} hitSlop={8} onPress={onFavorite}><Text style={{fontSize:22}}>{favorite?'❤️':'🤍'}</Text></Pressable></View>
    </View>
  </View>;
}
function Hero({lang,onVideos,onPlay}:{lang:Language;onVideos:()=>void;onPlay:()=>void}) {
  return <View style={s.hero}><View style={{flex:1}}><Text style={s.heroEyebrow}>{translations[lang].heroEyebrow}</Text><Text style={s.heroTitle}>{translations[lang].greeting}</Text><Text style={s.heroCopy}>{translations[lang].heroCopy}</Text><View style={{flexDirection:'row',gap:8,flexWrap:'wrap'}}><Pressable style={s.heroButton} onPress={onVideos}><Text style={s.heroButtonText}>▶ {translations[lang].videos}</Text></Pressable><Pressable style={s.heroButtonSecondary} onPress={onPlay}><Text style={s.heroButtonSecondaryText}>🎮 {translations[lang].playNow}</Text></Pressable></View></View><View style={s.heroFriends}><Image source={require('./assets/Samba_vues_corps_entier.png')} style={s.heroCharacter} resizeMode="contain" accessibilityLabel="Samba" /><Image source={require('./assets/Awa_vues_corps_entier.png')} style={s.heroCharacter} resizeMode="contain" accessibilityLabel="Awa" /><Image source={require('./assets/Bobo_vues_corps_entier.png')} style={s.heroCharacter} resizeMode="contain" accessibilityLabel="Bobo" /></View></View>;
}
function HomeScreen({lang,setLang,favorites,toggleFavorite,onOpen}:{lang:Language;setLang:(l:Language)=>void;favorites:string[];toggleFavorite:(id:string)=>void;onOpen:(item:ContentItem)=>void}) {
  const navigation = useNavigation<any>();
  const [query,setQuery]=useState('');
  const featured=contents.filter(x=>x.featured).slice(0,3);
  const filtered=useMemo(()=>contents.filter(x=>normalizeText([x.title,x.subtitle,x.category,x.language].join(' ')).includes(normalizeText(query))),[query]);
  return <SafeAreaView style={s.safe} edges={['top']}><Header lang={lang} setLang={setLang}/><ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
    <Hero lang={lang} onVideos={()=>openExternal(YOUTUBE)} onPlay={()=>navigation.navigate('Jouer')}/>
    <View style={s.quickGrid}>
      <Pressable accessibilityRole="button" accessibilityLabel="Ouvrir les jeux éducatifs" onPress={()=>navigation.navigate('Jouer')} style={[s.quickCard,{backgroundColor:'#E5F6E9'}]}><Text style={s.quickEmoji}>🎮</Text><Text style={s.quickTitle}>{translations[lang].quickGames}</Text><Text style={s.quickSub}>{translations[lang].quickLearn}</Text></Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Ouvrir les ateliers créatifs" onPress={()=>navigation.navigate('Atelier')} style={[s.quickCard,{backgroundColor:'#FFE9ED'}]}><Text style={s.quickEmoji}>🎨</Text><Text style={s.quickTitle}>{translations[lang].quickWorkshop}</Text><Text style={s.quickSub}>{translations[lang].quickCreate}</Text></Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Ouvrir la bibliothèque de comptines" onPress={()=>navigation.navigate('Bibliothèque')} style={[s.quickCard,{backgroundColor:'#E1F3FF'}]}><Text style={s.quickEmoji}>🎵</Text><Text style={s.quickTitle}>{translations[lang].quickRhymes}</Text><Text style={s.quickSub}>{translations[lang].quickSing}</Text></Pressable>
    </View>
    <TextInput accessibilityLabel={translations[lang].search} accessibilityRole="search" returnKeyType="search" value={query} onChangeText={setQuery} placeholder={'🔎 '+translations[lang].search+'…'} placeholderTextColor="#947F70" style={s.search}/>
    <Section title={query?translations[lang].searchResults:translations[lang].featured} action={query?translations[lang].clear:translations[lang].seeAll} onAction={()=>setQuery('')}/>
    {(query?filtered:featured).map(item=><ContentCard key={item.id} item={item} lang={lang} favorite={favorites.includes(item.id)} onFavorite={()=>toggleFavorite(item.id)} onOpen={()=>onOpen(item)}/>)}
    <Section title={translations[lang].friends} />
    <View style={s.friendsRow}>{[{image:require('./assets/Samba_portrait_et_nom.png'),n:'Samba',c:'#DDF4FF',d:translations[lang].curious},{image:require('./assets/Awa_portrait_et_nom.png'),n:'Awa',c:'#FFE5E8',d:translations[lang].creative},{image:require('./assets/Bobo_portrait_et_nom.png'),n:'Bobo',c:'#FFF0C7',d:translations[lang].funny}].map(x=><View key={x.n} style={[s.friend,{backgroundColor:x.c}]}><Image source={x.image} style={s.friendImage} resizeMode="contain" accessibilityLabel={x.n} /><Text style={s.friendName}>{x.n}</Text><Text style={s.friendRole}>{x.d}</Text></View>)}</View>
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
function GamesScreen({lang,setLang,stars,setStars}:{lang:Language;setLang:(l:Language)=>void;stars:number;setStars:(n:number)=>void}) {
  const [game,setGame]=useState<'menu'|'colors'|'count'|'nature'>('menu');
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
      {[{id:'colors',e:'🌈',t:translations[lang].colorsGame,d:translations[lang].colorsDesc,bg:'#FFE5E8'},{id:'count',e:'🔢',t:translations[lang].countGame,d:translations[lang].countDesc,bg:'#DDF4FF'},{id:'nature',e:'🌿',t:translations[lang].natureGame,d:translations[lang].natureDesc,bg:'#DDF8E6'}].map(g=><Pressable key={g.id} onPress={()=>{correctAwardedRef.current=false;setGame(g.id as any);setRound(0);setFeedback('');setAnswerCorrect(false)}} style={[s.gameCard,{backgroundColor:g.bg}]}><Text style={{fontSize:39}}>{g.e}</Text><View style={{flex:1}}><Text style={s.cardTitle}>{g.t}</Text><Text style={s.cardSubtitle}>{g.d}</Text></View><Text style={{fontSize:24}}>›</Text></Pressable>)}
    </>:<View style={s.quizCard}><Pressable accessibilityRole="button" accessibilityLabel={translations[lang].allGames} onPress={reset} style={s.backLink}><Text style={s.sectionAction}>← {translations[lang].allGames}</Text></Pressable>
      {game==='colors'?<><Text style={s.quizTitle}>{translations[lang].colorsQuizTitle}</Text><Text style={s.quizPrompt}>{questions[round%questions.length].q}</Text><Text style={{fontSize:68,textAlign:'center',marginVertical:12}}>{questions[round%questions.length].emoji}</Text><View style={s.options}>{questions[round%questions.length].options.map(([emoji,label])=><Pressable key={label} accessibilityRole="button" accessibilityLabel={`Couleur ${label}`} style={s.option} onPress={()=>win(label===questions[round%questions.length].correct)}><Text style={{fontSize:34}}>{emoji}</Text><Text style={s.optionText}>{label}</Text></Pressable>)}</View></>:null}
      {game==='count'?<><Text style={s.quizTitle}>{translations[lang].countQuizTitle}</Text><Text style={s.quizPrompt}>{counts[round%counts.length].q}</Text><Text style={{fontSize:42,textAlign:'center',marginVertical:16}}>{counts[round%counts.length].emoji}</Text><View style={s.options}>{counts[round%counts.length].opts.map(n=><Pressable key={n} accessibilityRole="button" accessibilityLabel={`Répondre ${n}`} style={s.numberOption} onPress={()=>win(n===counts[round%counts.length].n)}><Text style={s.numberText}>{n}</Text></Pressable>)}</View></>:null}
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
    <View style={s.pageIntro}><Text style={{fontSize:35}}>🎨</Text><View style={{flex:1}}><Text style={s.pageTitle}>{translations[lang].workshopTitle}</Text><Text style={s.cardSubtitle}>{translations[lang].workshopIntro}</Text></View></View>
    <View style={s.parentHint}>{translations[lang].workshopSafety}</View>
    {workshops.map(w=><View key={w.id} style={s.workshop}><View style={s.workshopHead}><Text style={{fontSize:38}}>{w.emoji}</Text><View style={{flex:1}}><Text style={s.cardTitle}>{w.title}</Text><Text style={s.workshopAge}>{w.age}</Text></View><Pressable accessibilityRole="checkbox" accessibilityLabel={`Atelier terminé : ${w.title}`} accessibilityState={{checked:done.includes(w.id)}} hitSlop={8} onPress={()=>toggleDone(w.id)}><Text style={{fontSize:24}}>{done.includes(w.id)?'✅':'⭕'}</Text></Pressable></View><Text style={s.cardSubtitle}>{w.desc}</Text><Text style={s.materials}>🧺 {translations[lang].workshopMaterials} : {w.materials}</Text><Text style={s.stepsTitle}>{translations[lang].workshopSteps}</Text>{w.steps.map((x,i)=><Text key={x} style={s.stepText}>{i+1}. {x}</Text>)}</View>)}
    <Text style={s.footer}>{translations[lang].workshopFooter}</Text>
  </ScrollView></SafeAreaView>;
}

function ExploreScreen({lang,setLang}:{lang:Language;setLang:(l:Language)=>void}) {
  const [age,setAge]=useState<'Tous'|'0–2 ans'|'3–4 ans'|'5–6 ans'>('Tous');
  const [selected,setSelected]=useState<string|null>(null);
  const [showPath,setShowPath]=useState(false);
  const copy=lang==='fr'
    ? {eyebrow:'APPRENDRE EN JOUANT',title:'J’explore avec Niani',intro:'Des idées simples pour éveiller la curiosité, parler, bouger et découvrir le Sénégal.',ages:'Âge de l’enfant',all:'Tous',topics:'Mes univers de découverte',skills:'Ce que l’enfant développe',ideas:'À essayer ensemble',path:'Parcours éducatif sur 8 semaines',pathIntro:'Une progression souple à adapter au rythme de chaque enfant.',week:'Semaine',goal:'Objectif',adult:'Les activités se font avec un adulte. Pour les tout-petits, privilégier les échanges, les gestes, les sons et les objets sûrs plutôt que l’écran.',open:'Voir les idées',close:'Réduire',materials:'Ateliers à retrouver',duration:'Durée indicative',noPressure:'Pas de score ni de minuterie : on explore à son rythme.'}
    : {eyebrow:'JÀNG AK FO',title:'Seet ak Niani',intro:'Jëf yu yomb ngir xam-xam, wax, yëngal yaram te xam Senegaal.',ages:'Atu xale bi',all:'Yépp',topics:'Sunu àddina yu jàng',skills:'Li xale bi di jàng',ideas:'Jéemleen bokk',path:'Yoonu jàng ci ayu-bis 8',pathIntro:'Tànn yoonu jàng bi ci anam wu méngoo ak xale bi.',week:'Ayu-bis',goal:'Jubluwaay',adult:'Defleen jëf yi ak mag. Ci xale yu ndaw, gënal waxtaan, yëngal, baat ak jumtukaay yu wóor.',open:'Gis jëf yi',close:'Wàññi',materials:'Atelier yi',duration:'Diir bu ñu xalaat',noPressure:'Amul score walla waxtu bu gaaw: seet ci sa yoon.'};
  const visibleThemes=learningThemes.filter(theme=>age==='Tous'||theme.age.includes(age));
  const activeTheme=learningThemes.find(theme=>theme.id===selected);
  return <SafeAreaView style={s.safe} edges={['top']}><Header lang={lang} setLang={setLang}/><ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
    <View style={[s.parentCard,{backgroundColor:'#E4F5E7'}]}><Text style={s.cardCategory}>{copy.eyebrow}</Text><Text style={s.pageTitle}>{copy.title}</Text><Text style={s.cardSubtitle}>{copy.intro}</Text><View style={s.friendsRow}><Image source={require('./assets/Samba_activites.png')} style={{width:72,height:82,flex:1}} resizeMode="contain" accessibilityLabel="Samba en activité"/><Image source={require('./assets/Awa_activites.png')} style={{width:72,height:82,flex:1}} resizeMode="contain" accessibilityLabel="Awa en activité"/><Image source={require('./assets/Bobo_activites.png')} style={{width:72,height:82,flex:1}} resizeMode="contain" accessibilityLabel="Bobo en activité"/></View></View>
    <Section title={copy.ages}/><View style={s.pillRow}>{(['Tous','0–2 ans','3–4 ans','5–6 ans'] as const).map(value=><Pill key={value} active={age===value} onPress={()=>setAge(value)}>{value==='Tous'?copy.all:value}</Pill>)}</View>
    <Section title={copy.topics}/><Text style={s.cardSubtitle}>{copy.noPressure}</Text>
    {visibleThemes.map(theme=><Pressable key={theme.id} accessibilityRole="button" accessibilityState={{expanded:selected===theme.id}} onPress={()=>setSelected(selected===theme.id?null:theme.id)} style={[s.gameCard,{backgroundColor:selected===theme.id?'#FFF0C7':'#FFFFFF',borderWidth:1,borderColor:'#F1E5D1'}]}><Text style={{fontSize:34}}>{theme.icon}</Text><View style={{flex:1,gap:4}}><Text style={s.cardTitle}>{theme.title}</Text><Text style={s.cardSubtitle}>{theme.skills.slice(0,2).join(' · ')}</Text><Text style={s.sectionAction}>{selected===theme.id?copy.close:copy.open}</Text></View><Text style={{fontSize:20,color:C.orange}}>{selected===theme.id?'−':'+'}</Text></Pressable>)}
    {activeTheme?<View style={s.quizCard}><Text style={s.quizTitle}>{activeTheme.icon} {activeTheme.title}</Text><Text style={s.stepsTitle}>{copy.skills}</Text>{activeTheme.skills.map(skill=><Text key={skill} style={s.stepText}>• {skill}</Text>)}<Text style={s.stepsTitle}>{copy.ideas}</Text>{activeTheme.activities.map(activity=><View key={activity} style={s.answerRow}><Text style={s.optionText}>🌱 {activity}</Text></View>)}{activityGuides.filter(guide=>guide.themeId===activeTheme.id).map(guide=><View key={guide.themeId} style={s.workshop}><Text style={s.cardTitle}>🌱 {guide.title}</Text><Text style={s.cardSubtitle}>⏱ {guide.duration}</Text><Text style={s.stepsTitle}>Matériel</Text><Text style={s.stepText}>{guide.materials}</Text><Text style={s.stepsTitle}>On essaie ensemble</Text>{guide.steps.map((step,index)=><Text key={step} style={s.stepText}>{index+1}. {step}</Text>)}<Text style={s.stepsTitle}>Petite question</Text><Text style={s.stepText}>💬 {guide.prompt}</Text><Text style={s.stepsTitle}>Adapter à l’âge</Text><Text style={s.stepText}>{guide.adaptation}</Text><Text style={s.readerNotice}>Sécurité et bienveillance : {guide.safety}</Text></View>)}{workshopLibrary.filter(w=>activeTheme.activities.some(activity=>activity.toLocaleLowerCase().includes(w.title.toLocaleLowerCase().split(' ')[0])||w.title.toLocaleLowerCase().includes(activity.toLocaleLowerCase().split(' ')[0]))).slice(0,2).map(workshop=><View key={workshop.id} style={s.workshop}><Text style={s.cardTitle}>{workshop.icon} {workshop.title}</Text><Text style={s.cardSubtitle}>{workshop.age} · {workshop.duration}</Text><Text style={s.stepText}>{workshop.goal}</Text><Text style={s.materials}>Matériel : {workshop.materials.join(', ')}</Text>{workshop.steps.map((step,index)=><Text key={step} style={s.stepText}>{index+1}. {step}</Text>)}<Text style={s.readerNotice}>Sécurité : {workshop.safety}</Text></View>)}</View>:null}
    <Pressable accessibilityRole="button" accessibilityState={{expanded:showPath}} onPress={()=>setShowPath(!showPath)} style={[s.gameCard,{backgroundColor:'#E1F3FF'}]}><Text style={{fontSize:34}}>🗓️</Text><View style={{flex:1}}><Text style={s.cardTitle}>{copy.path}</Text><Text style={s.cardSubtitle}>{copy.pathIntro}</Text></View><Text style={s.sectionAction}>{showPath?copy.close:copy.open}</Text></Pressable>
    {showPath?eightWeekPath.map(item=><View key={item.week} style={s.workshop}><Text style={s.cardCategory}>{copy.week} {item.week}</Text><Text style={s.cardTitle}>{item.theme}</Text><Text style={s.cardSubtitle}>🎵 {item.song}</Text><Text style={s.stepText}>🎨 {item.activity}</Text><Text style={s.materials}>{copy.goal} : {item.goal}</Text></View>):null}
    <View style={s.parentHint}><Text style={s.cardSubtitle}>👨‍👩‍👧 {copy.adult}</Text></View>
  </ScrollView></SafeAreaView>;
}

function LibraryScreen({lang,setLang,favorites,toggleFavorite,onOpen}:{lang:Language;setLang:(l:Language)=>void;favorites:string[];toggleFavorite:(id:string)=>void;onOpen:(item:ContentItem)=>void}) {
  const [filter,setFilter]=useState('Tout'); const [query,setQuery]=useState(''); const [languageFilter,setLanguageFilter]=useState('Toutes'); const [onlyFavorites,setOnlyFavorites]=useState(false);
  const categories=[{value:'Tout',label:translations[lang].allCategories},{value:'Comptines',label:translations[lang].rhymes},{value:'Berceuses',label:translations[lang].lullabies},{value:'J’apprends',label:translations[lang].learn},{value:'Histoires',label:translations[lang].stories}];
  const list=useMemo(()=>contents.filter(x=>(filter==='Tout'||x.category===filter)&&(languageFilter==='Toutes'||x.language===languageFilter||x.language==='FR + WO')&&(!onlyFavorites||favorites.includes(x.id))&&normalizeText([x.title,x.subtitle,x.category,x.language].join(' ')).includes(normalizeText(query))),[filter,languageFilter,onlyFavorites,favorites,query]);
  return <SafeAreaView style={s.safe} edges={['top']}><Header lang={lang} setLang={setLang}/><ScrollView contentContainerStyle={s.scroll}><Text style={s.pageTitle}>🎵 {translations[lang].libraryTitle}</Text><Text style={s.cardSubtitle}>{translations[lang].libraryIntro}</Text><TextInput accessibilityLabel={translations[lang].search} accessibilityRole="search" value={query} onChangeText={setQuery} placeholder={'🔎 '+translations[lang].search+'…'} placeholderTextColor="#947F70" style={s.search} returnKeyType="search" clearButtonMode="while-editing"/><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingVertical:3}}>{categories.map(x=><Pill key={x.value} active={filter===x.value} onPress={()=>setFilter(x.value)}>{x.label}</Pill>)}</ScrollView><View style={{flexDirection:'row',gap:8,flexWrap:'wrap'}}><Pill active={languageFilter==='Toutes'} onPress={()=>setLanguageFilter('Toutes')}>{translations[lang].allLanguages}</Pill><Pill active={languageFilter==='FR'} onPress={()=>setLanguageFilter('FR')} >{translations[lang].french}</Pill><Pill active={languageFilter==='WO'} onPress={()=>setLanguageFilter('WO')} >{translations[lang].wolof}</Pill><Pill active={onlyFavorites} onPress={()=>setOnlyFavorites(v=>!v)} >❤️ {translations[lang].favoritesFilter}</Pill></View><Text style={s.cardSubtitle}>{list.length} {translations[lang].contentCount}</Text>{list.map(item=><ContentCard key={item.id} item={item} lang={lang} favorite={favorites.includes(item.id)} onFavorite={()=>toggleFavorite(item.id)} onOpen={()=>onOpen(item)}/>)}{!list.length&&<View style={s.empty}><Text style={{fontSize:42}}>🔎</Text><Text style={s.cardTitle}>{translations[lang].noContent}</Text><Text style={s.cardSubtitle}>{translations[lang].tryOtherSearch}</Text><Pressable onPress={()=>{setQuery('');setFilter('Tout');setLanguageFilter('Toutes');setOnlyFavorites(false)}} style={s.playButton}><Text style={s.playText}>{translations[lang].resetFilters}</Text></Pressable></View>}</ScrollView></SafeAreaView>;
}
function FavoritesScreen({lang,setLang,favorites,toggleFavorite,onOpen}:{lang:Language;setLang:(l:Language)=>void;favorites:string[];toggleFavorite:(id:string)=>void;onOpen:(item:ContentItem)=>void}) {
  return <SafeAreaView style={s.safe} edges={['top']}><Header lang={lang} setLang={setLang}/><ScrollView contentContainerStyle={s.scroll}><Text style={s.pageTitle}>❤️ {translations[lang].favorites}</Text>{contents.filter(x=>favorites.includes(x.id)).map(item=><ContentCard key={item.id} item={item} lang={lang} favorite onFavorite={()=>toggleFavorite(item.id)} onOpen={()=>onOpen(item)}/>)}{!favorites.length&&<View style={s.empty}><Text style={{fontSize:45}}>⭐</Text><Text style={s.cardTitle}>{translations[lang].treasuresHere}</Text><Text style={s.cardSubtitle}>{translations[lang].favoriteHint}</Text></View>}</ScrollView></SafeAreaView>;
}
function ParentsScreen({lang,setLang}:{lang:Language;setLang:(l:Language)=>void}) {
  return <SafeAreaView style={s.safe} edges={['top']}><Header lang={lang} setLang={setLang}/><ScrollView contentContainerStyle={s.scroll}><Text style={s.pageTitle}>👨‍👩‍👧 {translations[lang].parentTitle}</Text><View style={s.parentCard}><Text style={{fontSize:42}}>💚</Text><Text style={s.heroTitle}>{translations[lang].parentTogether}</Text><Text style={s.cardSubtitle}>{translations[lang].parentBody}</Text></View><Section title={translations[lang].parentSpaceTitle}/><Pressable style={s.externalLink} onPress={()=>openExternal(YOUTUBE)}><Text style={{fontSize:26}}>▶️</Text><View style={{flex:1}}><Text style={s.cardTitle}>{translations[lang].youtube}</Text><Text style={s.cardSubtitle}>{translations[lang].youtubeSubtitle}</Text></View><Text style={s.sectionAction}>{translations[lang].opening} ↗</Text></Pressable><Pressable style={s.externalLink} onPress={()=>openExternal(TIKTOK)}><Text style={{fontSize:26}}>🎬</Text><View style={{flex:1}}><Text style={s.cardTitle}>{translations[lang].tiktok}</Text><Text style={s.cardSubtitle}>{translations[lang].tiktokSubtitle}</Text></View><Text style={s.sectionAction}>{translations[lang].openExternal} ↗</Text></Pressable>
<Pressable accessibilityRole="button" style={s.externalLink} onPress={()=>openExternal(FACEBOOK)}><Text style={{fontSize:26}}>📘</Text><View style={{flex:1}}><Text style={s.cardTitle}>{translations[lang].facebook}</Text><Text style={s.cardSubtitle}>{translations[lang].facebookSubtitle}</Text></View><Text style={s.sectionAction}>{translations[lang].openExternal} ↗</Text></Pressable><Pressable accessibilityRole="button" style={s.externalLink} onPress={()=>openExternal(INSTAGRAM)}><Text style={{fontSize:26}}>📸</Text><View style={{flex:1}}><Text style={s.cardTitle}>{translations[lang].instagram}</Text><Text style={s.cardSubtitle}>{translations[lang].instagramSubtitle}</Text></View><Text style={s.sectionAction}>{translations[lang].openExternal} ↗</Text></Pressable><View style={s.safety}><Text style={s.cardTitle}>{translations[lang].parentSafetyTitle}</Text><Text style={s.cardSubtitle}>{translations[lang].parentSafetyBody} {lang==='fr'?'Les contenus de démonstration doivent être reliés aux vidéos officielles avant publication.':'Dafay soxla ñu boole ay contenu yu dëgg-dëgg ak wideyo yi bala génn.'}</Text></View><Text style={s.footer}>{translations[lang].prelaunchNote}</Text></ScrollView></SafeAreaView>;
}
export default function App() {
  const [lang,setLangState]=useState<Language>('fr'); const [favorites,setFavorites]=useState<string[]>([]); const [stars,setStarsState]=useState(0); const [selectedItem,setSelectedItem]=useState<ContentItem|null>(null); const [isSpeaking,setIsSpeaking]=useState(false);
  const setLang=(next:Language)=>{setLangState(next);AsyncStorage.setItem('niani-language',next).catch(()=>{});};
  useEffect(()=>{if(!selectedItem){Speech.stop();setIsSpeaking(false);} return ()=>{Speech.stop();};},[selectedItem]);
  useEffect(()=>{AsyncStorage.multiGet(['niani-favorites','niani-stars','niani-language']).then(values=>{
    const favoritesValue=values[0][1];
    const starsValue=values[1][1];
    const languageValue=values[2][1];

    // A corrupted favorites value must not prevent the language and reward state from loading.
    if(favoritesValue){
      try{
        const parsed:unknown=JSON.parse(favoritesValue);
        if(Array.isArray(parsed)){
          const validIds=new Set(contents.map(item=>item.id));
          setFavorites([...new Set(parsed.filter((id):id is string=>typeof id==='string'&&validIds.has(id)))]);
        }
      }catch{
        // Ignore invalid local data and keep the app usable.
      }
    }
    if(starsValue!==null){
      const parsedStars=Number(starsValue);
      if(Number.isFinite(parsedStars)&&parsedStars>=0)setStarsState(Math.floor(parsedStars));
    }
    if(languageValue==='fr'||languageValue==='wo')setLangState(languageValue);
  }).catch(()=>{});},[]);
  const toggleFavorite=(id:string)=>setFavorites(old=>{const next=old.includes(id)?old.filter(x=>x!==id):[...old,id];AsyncStorage.setItem('niani-favorites',JSON.stringify(next)).catch(()=>{});return next});
  const setStars=(n:number)=>{setStarsState(n);AsyncStorage.setItem('niani-stars',String(n)).catch(()=>{})};
  const onOpen=(item:ContentItem)=>setSelectedItem(item);
  return <NavigationContainer><StatusBar barStyle="dark-content" backgroundColor={C.cream}/><Tab.Navigator screenOptions={{headerShown:false,tabBarActiveTintColor:C.orange,tabBarInactiveTintColor:C.muted,tabBarStyle:{minHeight:64,paddingTop:6,paddingBottom:8,backgroundColor:'#fff',borderTopColor:'#F3E8D6'},tabBarLabelStyle:{fontWeight:'800',fontSize:10},tabBarHideOnKeyboard:true}}>
    <Tab.Screen name="Accueil" options={{tabBarLabel:translations[lang].home,tabBarAccessibilityLabel:translations[lang].home,tabBarIcon:({color})=><Text style={{fontSize:19}}>🏡</Text>}}>{()=> <HomeScreen lang={lang} setLang={setLang} favorites={favorites} toggleFavorite={toggleFavorite} onOpen={onOpen}/>}</Tab.Screen>
    <Tab.Screen name="Bibliothèque" options={{tabBarLabel:translations[lang].library,tabBarAccessibilityLabel:translations[lang].library,tabBarIcon:()=> <Text style={{fontSize:19}}>🎵</Text>}}>{()=> <LibraryScreen lang={lang} setLang={setLang} favorites={favorites} toggleFavorite={toggleFavorite} onOpen={onOpen}/>}</Tab.Screen>
    <Tab.Screen name="Jouer" options={{tabBarLabel:translations[lang].play,tabBarAccessibilityLabel:translations[lang].play,tabBarIcon:()=> <Text style={{fontSize:19}}>🎮</Text>}}>{()=> <GamesScreen lang={lang} setLang={setLang} stars={stars} setStars={setStars}/>}</Tab.Screen>
    <Tab.Screen name="Explorer" options={{tabBarLabel:lang==='fr'?'Explorer':'Seet',tabBarAccessibilityLabel:lang==='fr'?'Explorer les thèmes éducatifs':'Seet ci jàng',tabBarIcon:()=> <Text style={{fontSize:19}}>🧭</Text>}}>{()=> <ExploreScreen lang={lang} setLang={setLang}/>}</Tab.Screen>
    <Tab.Screen name="Atelier" options={{tabBarLabel:translations[lang].workshop,tabBarAccessibilityLabel:translations[lang].workshop,tabBarIcon:()=> <Text style={{fontSize:19}}>🎨</Text>}}>{()=> <WorkshopsScreen lang={lang} setLang={setLang}/>}</Tab.Screen>
    <Tab.Screen name="Parents" options={{tabBarLabel:translations[lang].parents,tabBarAccessibilityLabel:translations[lang].parents,tabBarIcon:()=> <Text style={{fontSize:19}}>👨‍👩‍👧</Text>}}>{()=> <ParentsScreen lang={lang} setLang={setLang}/>}</Tab.Screen>
  </Tab.Navigator>
    <Modal visible={!!selectedItem} animationType="slide" onRequestClose={()=>setSelectedItem(null)}>
      <SafeAreaView style={s.readerSafe} edges={['top','bottom']}>
        <View style={s.readerHeader}>
          <Pressable accessibilityRole="button" accessibilityLabel={translations[lang].close} onPress={()=>setSelectedItem(null)} style={s.readerClose}><Text style={s.readerCloseText}>✕ {translations[lang].close}</Text></Pressable>
          <Text style={s.readerBrand}>Niani Kids 🌳</Text>
        </View>
        {selectedItem&&<ScrollView contentContainerStyle={s.readerScroll}>
          <View style={[s.readerArt,{backgroundColor:selectedItem.category==='Berceuses'?'#E9E9FF':selectedItem.category==='Histoires'?'#FFF0D7':'#DDF4FF'}]}>
            <Text style={{fontSize:58}}>{selectedItem.emoji}</Text>
            <Text style={s.readerMeta}>{selectedItem.category} · {selectedItem.duration} · {selectedItem.language}</Text>
          </View>
          <Text style={s.readerTitle}>{selectedItem.title}</Text>
          <Text style={s.readerSubtitle}>{selectedItem.subtitle}</Text>
          {selectedItem.lyrics&&isAudioReady(getAudioTrack(selectedItem.id)) ? <AudioPlayerCard key={selectedItem.id} title={selectedItem.title} source={getAudioTrack(selectedItem.id)?.assetPath ?? ''} language={selectedItem.language} uiLanguage={lang} /> : null}
          {selectedItem.lyrics&&!isAudioReady(getAudioTrack(selectedItem.id)) ? <View style={s.readerNotice}><Text style={s.readerNotice}>{lang==='fr'?'🎵 Enregistrement musical en préparation. Tu peux écouter le texte avec la synthèse vocale ci-dessous.':'🎵 Woy bu dëgg-dëgg mi ngi ci waajal. Mën nga déglu mbind mi ak baat bu ordinatëër ci suuf.'}</Text></View> : null}
          {(selectedItem.lyrics||selectedItem.storyText)&&<View style={s.readerAudioRow}>
            <Pressable accessibilityRole="button" accessibilityLabel={isSpeaking?translations[lang].playText:translations[lang].listen} onPress={()=>{const spokenText=[selectedItem.lyrics,selectedItem.storyText].filter(Boolean).join('\n\n').replace(/^.*Note : paroles wolof de travail.*$/m,'').trim();Speech.stop();setIsSpeaking(true);Speech.speak(spokenText,{language:selectedItem.language==='WO'?'wo-SN':'fr-FR',rate:0.82,pitch:1.05,onDone:()=>setIsSpeaking(false),onStopped:()=>setIsSpeaking(false),onError:()=>setIsSpeaking(false)});}}>
              <Text style={s.readerListenText}>{isSpeaking?'🔊 '+translations[lang].playText:'🔊 '+translations[lang].listen}</Text>
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel={translations[lang].stop} onPress={()=>{Speech.stop();setIsSpeaking(false);}}>
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
            {selectedItem.afterStoryActivity?<View style={{backgroundColor:'#E5F6E8',borderRadius:14,padding:12,gap:6}}><Text style={s.readerSection}>🎨 {lang==='fr'?'À faire après l’histoire':'Jëf bu topp nettali bi'}</Text><Text style={s.readerBody}>{selectedItem.afterStoryActivity}</Text></View>:null}
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
const s=StyleSheet.create({
safe:{flex:1,backgroundColor:C.cream},readerSafe:{flex:1,backgroundColor:C.cream},readerHeader:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:18,paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#F1E5D1'},readerClose:{backgroundColor:'#fff',paddingHorizontal:14,paddingVertical:12,borderRadius:14,minHeight:44,justifyContent:'center'},readerCloseText:{fontWeight:'900',fontSize:14,color:C.ink},readerBrand:{fontSize:17,fontWeight:'900',color:C.orange},readerScroll:{padding:20,paddingBottom:56,gap:16},readerArt:{minHeight:150,borderRadius:24,alignItems:'center',justifyContent:'center',gap:10},readerMeta:{fontSize:12,fontWeight:'900',color:C.ink},readerTitle:{fontSize:29,fontWeight:'900',color:C.ink,marginTop:5},readerAudioRow:{flexDirection:'row',gap:9,flexWrap:'wrap'},readerListenButton:{backgroundColor:C.green,paddingHorizontal:15,paddingVertical:12,borderRadius:15,alignItems:'center'},readerListenText:{color:'#fff',fontWeight:'900',fontSize:15},readerStopButton:{backgroundColor:'#fff',borderWidth:1,borderColor:'#EADBC8',paddingHorizontal:14,paddingVertical:12,borderRadius:15,alignItems:'center'},readerStopText:{color:C.ink,fontWeight:'900',fontSize:15},readerSubtitle:{fontSize:16,color:C.muted,lineHeight:22},readerTextCard:{backgroundColor:'#fff',borderRadius:20,padding:18,gap:12,borderWidth:1,borderColor:'#F5EBDD'},readerSection:{fontSize:19,fontWeight:'900',color:C.ink},readerBody:{fontSize:19,lineHeight:31,color:'#594536'},readerNotice:{fontSize:13,lineHeight:19,color:'#775A3B',backgroundColor:'#FFF0D9',padding:10,borderRadius:10},readerQuestion:{fontSize:15,lineHeight:22,fontWeight:'800',color:'#226D3C',backgroundColor:'#DDF8E6',padding:12,borderRadius:12},readerExternal:{backgroundColor:C.orange,padding:14,borderRadius:16,alignItems:'center'},readerExternalText:{color:'#fff',fontWeight:'900',fontSize:15},readerFooter:{textAlign:'center',fontSize:13,color:C.muted},scroll:{padding:18,paddingBottom:56,gap:16},header:{flexDirection:'row',alignItems:'center',gap:10,paddingHorizontal:17,paddingTop:8,paddingBottom:12,backgroundColor:C.cream},brandMark:{width:43,height:43,borderRadius:22,backgroundColor:C.yellow,alignItems:'center',justifyContent:'center'},brand:{fontSize:24,fontWeight:'900',color:C.orange,letterSpacing:-1},headerLogo:{width:112,height:58},tagline:{fontSize:11,fontWeight:'700',color:C.muted},langButton:{backgroundColor:'#fff',borderWidth:1,borderColor:'#D9C58D',borderRadius:16,paddingHorizontal:12,paddingVertical:10,minHeight:44,justifyContent:'center'},langText:{fontWeight:'900',color:C.ink,fontSize:13},
hero:{backgroundColor:'#FFF0A8',borderRadius:25,padding:17,flexDirection:'row',alignItems:'center',gap:8,overflow:'hidden'},heroEyebrow:{color:'#86600A',fontSize:11,fontWeight:'900',marginBottom:8},heroTitle:{color:C.ink,fontSize:24,fontWeight:'900',lineHeight:29},heroCopy:{color:'#6C5440',fontSize:14,lineHeight:20,marginTop:7,marginBottom:5},heroButton:{backgroundColor:C.orange,borderRadius:16,paddingHorizontal:12,paddingVertical:9,marginTop:8},heroButtonText:{color:'#fff',fontWeight:'900',fontSize:13},heroButtonSecondary:{backgroundColor:'#fff',borderRadius:16,paddingHorizontal:12,paddingVertical:9,marginTop:8},heroButtonSecondaryText:{color:C.ink,fontWeight:'900',fontSize:13},heroFriends:{width:88,alignItems:'center',justifyContent:'center',gap:0},heroCharacter:{width:78,height:78,marginVertical:-8},
quickGrid:{flexDirection:'row',gap:8},quickCard:{flex:1,borderRadius:18,padding:11,minHeight:108,justifyContent:'center'},quickEmoji:{fontSize:25,marginBottom:5},quickTitle:{fontSize:14,fontWeight:'900',color:C.ink},quickSub:{fontSize:11,color:C.muted,marginTop:3},search:{backgroundColor:'#fff',borderWidth:1,borderColor:'#D7C8B5',borderRadius:15,paddingHorizontal:14,paddingVertical:14,fontSize:16,color:C.ink},
sectionRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:2},sectionTitle:{fontSize:20,fontWeight:'900',color:C.ink},sectionAction:{fontSize:13,fontWeight:'900',color:C.orange},contentCard:{backgroundColor:'#fff',borderRadius:20,padding:10,flexDirection:'row',gap:11,borderWidth:1,borderColor:'#F5EBDD'},art:{width:91,minHeight:113,borderRadius:15,alignItems:'center',justifyContent:'center'},duration:{position:'absolute',bottom:6,right:5,fontSize:11,fontWeight:'900',color:C.ink,backgroundColor:'#FFFFFFE8',paddingHorizontal:5,paddingVertical:3,borderRadius:8},cardInfo:{flex:1,justifyContent:'center',gap:4},cardCategory:{color:C.green,fontSize:11,fontWeight:'900',letterSpacing:.4},cardTitle:{color:C.ink,fontSize:16,fontWeight:'900'},cardSubtitle:{color:C.muted,fontSize:13,lineHeight:18},cardActions:{flexDirection:'row',alignItems:'center',gap:12,marginTop:4},playButton:{backgroundColor:'#FFF0C7',paddingHorizontal:12,paddingVertical:10,borderRadius:11},playText:{color:'#81500B',fontWeight:'900',fontSize:12},
friendsRow:{flexDirection:'row',gap:7},friend:{flex:1,borderRadius:16,paddingVertical:8,paddingHorizontal:3,alignItems:'center',gap:3,overflow:'hidden'},friendImage:{width:'100%',height:105},friendName:{fontWeight:'900',fontSize:13,color:C.ink},friendRole:{fontSize:10,color:C.muted},storyBanner:{backgroundColor:'#fff',borderRadius:18,padding:14,flexDirection:'row',alignItems:'center',gap:12},mission:{backgroundColor:'#DFF6E5',padding:20,borderRadius:22,alignItems:'center',gap:7},missionTitle:{fontWeight:'900',fontSize:19,color:C.ink},missionText:{textAlign:'center',color:'#496854',fontSize:14,lineHeight:20},footer:{textAlign:'center',color:C.muted,fontSize:12,marginVertical:8},
pill:{backgroundColor:'#fff',paddingHorizontal:14,paddingVertical:11,borderRadius:18,marginRight:7,borderWidth:1,borderColor:'#F1E5D1'},pillActive:{backgroundColor:C.ink,borderColor:C.ink},pillText:{fontSize:13,color:C.ink,fontWeight:'800'},pillRow:{flexDirection:'row',flexWrap:'wrap',gap:4},pageIntro:{flexDirection:'row',alignItems:'center',gap:11},pageTitle:{fontSize:25,color:C.ink,fontWeight:'900'},starPill:{backgroundColor:'#FFF0C7',borderRadius:15,padding:10},gameHero:{backgroundColor:'#FFF0A8',borderRadius:24,padding:20,alignItems:'center',gap:7},gameCard:{borderRadius:20,padding:15,flexDirection:'row',alignItems:'center',gap:13},quizCard:{backgroundColor:'#fff',borderRadius:22,padding:16,gap:12,borderWidth:1,borderColor:'#F5EBDD'},backLink:{alignSelf:'flex-start'},quizTitle:{fontSize:22,fontWeight:'900',color:C.ink},quizPrompt:{fontSize:18,fontWeight:'800',color:C.ink,textAlign:'center',marginTop:8},options:{flexDirection:'row',justifyContent:'center',gap:10,flexWrap:'wrap'},option:{backgroundColor:'#F5F0FF',borderRadius:16,padding:13,alignItems:'center',minWidth:80},optionText:{fontSize:14,fontWeight:'800',color:C.ink,textAlign:'center'},numberOption:{backgroundColor:'#DDF4FF',width:65,height:65,borderRadius:18,alignItems:'center',justifyContent:'center'},numberText:{fontSize:29,fontWeight:'900',color:C.ink},answerRow:{backgroundColor:'#E5F6E9',padding:13,borderRadius:14,marginTop:5},feedback:{backgroundColor:'#DDF8E6',borderRadius:16,padding:13,alignItems:'center',gap:9},feedbackText:{fontWeight:'900',color:'#226D3C',textAlign:'center'},nextButton:{backgroundColor:C.green,borderRadius:14,paddingHorizontal:15,paddingVertical:9},nextText:{color:'#fff',fontWeight:'900'},parentHint:{backgroundColor:'#FFF0D9',padding:13,borderRadius:15,color:'#775A3B',fontSize:13,lineHeight:19},workshop:{backgroundColor:'#fff',borderRadius:20,padding:15,gap:9,borderWidth:1,borderColor:'#F5EBDD'},workshopHead:{flexDirection:'row',alignItems:'center',gap:11},workshopAge:{fontSize:12,color:C.green,fontWeight:'900',marginTop:3},materials:{fontSize:13,color:'#765D49',fontWeight:'700'},stepsTitle:{fontSize:14,fontWeight:'900',color:C.ink,marginTop:3},stepText:{fontSize:14,color:C.muted,lineHeight:20},parentCard:{backgroundColor:'#E3F5FF',borderRadius:22,padding:20,gap:9},externalLink:{backgroundColor:'#fff',borderRadius:17,padding:14,flexDirection:'row',alignItems:'center',gap:11,borderWidth:1,borderColor:'#F3E8D6'},safety:{backgroundColor:'#FFF0D9',borderRadius:16,padding:15,gap:7},empty:{backgroundColor:'#fff',padding:25,borderRadius:22,alignItems:'center',gap:9},friendName2:{fontWeight:'900'}
});