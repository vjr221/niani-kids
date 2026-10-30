/**
 * The three user-supplied M4A reference masters, kept separate from the 25 MP3 candidates.
 * Do not auto-assign them to tracks by filename; identity and approval remain pending.
 */
export const referenceAudioMasters = [
 { id:'master-bonjour-01', filename:'01 Bonjour Bonjour les amis.m4a', bytes:2454344, candidate:'Bonjour, bonjour ! — maquette 01 ou 02', status:'needs-identification', notes:'Master séparé ; comparer les deux maquettes avant association.' },
 { id:'master-welcome-02', filename:'02 — Bienvenue chez Niani Kids.m4a', bytes:1051815, candidate:'Bienvenue chez Niani Kids', status:'needs-identification', notes:'Master séparé ; ne pas confondre avec le MP3 déjà présent sur le site.' },
 { id:'master-theme-03', filename:'03 - NIANI! NIANI! — ÑU NGI FII!.m4a', bytes:1044770, candidate:'NIANI! NIANI! — ÑU NGI FII!', status:'needs-identification', notes:'Master thème séparé ; la fiche WordPress reste en brouillon jusqu’à validation des paroles wolof et des droits.' }
] as const;
