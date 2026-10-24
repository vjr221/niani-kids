<?php
/**
 * Niani Kids home experience.
 * This file is staged for review before it replaces the live front page.
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
$nk_img = static function ( $id, $size, $class, $alt, $loading = 'lazy' ) {
    $attributes = array(
        'class'    => $class,
        'alt'      => $alt,
        'loading'  => $loading,
        'decoding' => 'async',
    );
    if ( 14 === (int) $id && 'eager' === $loading ) {
        $attributes['fetchpriority'] = 'high';
    }
    return wp_get_attachment_image( (int) $id, $size, false, $attributes );
};
$nk_youtube = 'https://www.youtube.com/@nianikids';
$nk_tiktok  = 'https://www.tiktok.com/@niani.kids';
$nk_email   = 'nianikids1@gmail.com';
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class( 'nk-home-body' ); ?>>
<?php wp_body_open(); ?>
<a class="nk-skip-link" href="#nk-main">Aller au contenu</a>
<div class="nk-page" id="nk-home">
  <div class="nk-topline"><span>Un monde de chansons, de jeux et de découvertes pour les 0–6 ans</span><span class="nk-topline-sun" aria-hidden="true">✦</span></div>
  <header class="nk-header">
    <div class="nk-wrap nk-nav-wrap">
      <a class="nk-brand" href="#nk-home" aria-label="Niani Kids, accueil">
        <?php echo $nk_img( 10, 'thumbnail', 'nk-brand-logo', 'Logo Niani Kids', 'eager' ); ?>
        <span>Niani Kids</span>
      </a>
      <button class="nk-menu-toggle" type="button" id="nk-menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nk-nav">☰</button>
      <nav class="nk-nav" id="nk-nav" aria-label="Navigation principale">
        <a href="#nk-aventures">Nos aventures</a>
        <a href="#nk-amis">Les personnages</a>
        <a href="#nk-mission">Jouer & apprendre</a>
        <a href="#nk-parents">Pour les parents</a>
        <a class="nk-button nk-button-small" href="<?php echo esc_url( $nk_youtube ); ?>" target="_blank" rel="noopener noreferrer">Voir YouTube <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>

  <main id="nk-main">
    <section class="nk-hero" aria-labelledby="nk-hero-title">
      <div class="nk-hero-glow nk-hero-glow-one" aria-hidden="true"></div>
      <div class="nk-hero-glow nk-hero-glow-two" aria-hidden="true"></div>
      <div class="nk-wrap nk-hero-grid">
        <div class="nk-hero-copy nk-reveal">
          <p class="nk-eyebrow"><span aria-hidden="true">☀</span> Bienvenue dans notre univers</p>
          <h1 id="nk-hero-title">Chanter, jouer. <em>Grandir ensemble.</em></h1>
          <p class="nk-hero-lede">Des chansons, des jeux, des contes et des découvertes inspirés du Sénégal, pour apprendre et grandir en famille.</p>
          <div class="nk-hero-actions">
            <a class="nk-button" href="#nk-aventures">Choisir une aventure <span aria-hidden="true">→</span></a>
            <a class="nk-button nk-button-outline" href="<?php echo esc_url( $nk_youtube ); ?>" target="_blank" rel="noopener noreferrer"><span class="nk-play-icon" aria-hidden="true">▶</span> Découvrir YouTube</a>
          </div>
          <p class="nk-hero-note"><span aria-hidden="true">♡</span> Pour les enfants de 0 à 6 ans, avec les adultes qui les accompagnent.</p>
        </div>
        <div class="nk-hero-art" id="nk-hero-art">
          <div class="nk-hero-orbit nk-orbit-back" aria-hidden="true"></div>
          <div class="nk-hero-orbit nk-orbit-front" aria-hidden="true"></div>
          <div class="nk-hero-scene">
            <?php echo $nk_img( 14, 'large', 'nk-hero-image', 'Samba, Awa et Bobo découvrent la nature avec le Baobab, leur ami géant.', 'eager' ); ?>
          </div>
          <div class="nk-hero-spark nk-spark-one" aria-hidden="true">✦</div>
          <div class="nk-hero-spark nk-spark-two" aria-hidden="true">✳</div>
          <div class="nk-float-note nk-note-song"><span class="nk-note-icon nk-note-yellow" aria-hidden="true">♫</span><span><strong>On chante</strong><small>En rythme et en sourires</small></span></div>
          <div class="nk-float-note nk-note-story"><span class="nk-note-icon nk-note-sky" aria-hidden="true">✧</span><span><strong>On imagine</strong><small>Des histoires à partager</small></span></div>
        </div>
      </div>
      <div class="nk-hero-bottom" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
    </section>

    <section class="nk-intro-strip" aria-label="Ce que les enfants découvrent">
      <div class="nk-wrap nk-intro-items">
        <span><b aria-hidden="true">♫</b> Chanter</span>
        <span><b aria-hidden="true">✿</b> Jouer</span>
        <span><b aria-hidden="true">✦</b> Apprendre</span>
        <span><b aria-hidden="true">☘</b> Découvrir</span>
        <span><b aria-hidden="true">♡</b> Grandir</span>
      </div>
    </section>

    <section class="nk-section nk-adventures" id="nk-aventures" aria-labelledby="nk-adventures-title">
      <div class="nk-wrap">
        <div class="nk-section-heading nk-reveal">
          <div><p class="nk-kicker">À chacun son aventure</p><h2 id="nk-adventures-title">Le jeu ouvre mille chemins.</h2></div>
          <p>Choisis une porte, suis ta curiosité et retrouve des idées à vivre ensemble, à la maison ou en classe.</p>
        </div>
        <div class="nk-adventure-grid">
          <article class="nk-adventure-card nk-adventure-song nk-reveal">
            <div class="nk-adventure-copy"><span class="nk-card-symbol" aria-hidden="true">♫</span><h3>Chanter à tue-tête</h3><p>Des rythmes, des mots et des refrains pour bouger et s'amuser.</p><a class="nk-text-link" href="<?php echo esc_url( $nk_youtube ); ?>" target="_blank" rel="noopener noreferrer">Écouter sur YouTube <span aria-hidden="true">↗</span></a></div>
            <div class="nk-adventure-image"><?php echo $nk_img( 16, 'medium_large', 'nk-card-image nk-card-image-sing', 'Bobo chante au micro sur une scène colorée.' ); ?></div>
          </article>
          <article class="nk-adventure-card nk-adventure-story nk-reveal">
            <div class="nk-adventure-image"><?php echo $nk_img( 13, 'medium_large', 'nk-card-image', 'Le Baobab raconte une histoire à Samba, Awa et Bobo.' ); ?></div>
            <div class="nk-adventure-copy"><span class="nk-card-symbol" aria-hidden="true">✧</span><h3>Écouter des histoires</h3><p>Des contes pour imaginer, parler de ses émotions et rêver ensemble.</p><a class="nk-text-link" href="<?php echo esc_url( $nk_youtube ); ?>" target="_blank" rel="noopener noreferrer">Explorer les vidéos <span aria-hidden="true">↗</span></a></div>
          </article>
          <article class="nk-adventure-card nk-adventure-nature nk-reveal">
            <div class="nk-adventure-copy"><span class="nk-card-symbol" aria-hidden="true">☘</span><h3>Grandir avec la nature</h3><p>Observer, planter, compter et prendre soin du monde qui nous entoure.</p><a class="nk-text-link" href="#nk-mission">Essayer une mission <span aria-hidden="true">→</span></a></div>
            <div class="nk-adventure-image"><?php echo $nk_img( 12, 'medium_large', 'nk-card-image', 'Les enfants apprennent à planter avec le Baobab.' ); ?></div>
          </article>
          <article class="nk-adventure-card nk-adventure-play nk-reveal">
            <div class="nk-adventure-copy"><span class="nk-card-symbol" aria-hidden="true">⚽</span><h3>Bouger & jouer</h3><p>On saute, on mime, on lance un ballon et on apprend à son rythme.</p><a class="nk-text-link" href="#nk-mission">Lancer une mission <span aria-hidden="true">→</span></a></div>
            <div class="nk-adventure-image"><?php echo $nk_img( 17, 'medium_large', 'nk-card-image', 'Bobo joue au ballon dans une cour colorée.' ); ?></div>
          </article>
        </div>
      </div>
    </section>

    <section class="nk-mission-section" id="nk-mission" aria-labelledby="nk-mission-title">
      <div class="nk-wrap nk-mission-grid">
        <div class="nk-mission-art nk-reveal">
          <?php echo $nk_img( 12, 'large', 'nk-mission-image', 'Samba, Awa et Bobo plantent une graine avec le Baobab.' ); ?>
          <span class="nk-mission-sticker nk-sticker-top">Petites mains, grandes idées</span>
          <span class="nk-mission-sticker nk-sticker-bottom" aria-hidden="true">✿</span>
        </div>
        <div class="nk-mission-copy nk-reveal">
          <p class="nk-kicker">La mission du jour</p>
          <h2 id="nk-mission-title">Prêt·e pour une petite découverte ?</h2>
          <p class="nk-mission-intro">Une activité toute simple, à faire avec un adulte. Pas besoin d'écran ni de matériel spécial.</p>
          <div class="nk-mission-prompt" aria-live="polite" aria-atomic="true">
            <span class="nk-mission-number" id="nk-mission-number">01</span>
            <p id="nk-mission-text">Avec un adulte, trouve trois objets jaunes autour de toi. Montre-les, nomme-les et compte-les ensemble.</p>
          </div>
          <button class="nk-button nk-button-dark" type="button" id="nk-new-mission">Une autre mission <span aria-hidden="true">↻</span></button>
          <p class="nk-mission-footnote">Chaque enfant avance à son rythme. L'important, c'est de partager le moment.</p>
        </div>
      </div>
    </section>

    <section class="nk-section nk-friends" id="nk-amis" aria-labelledby="nk-friends-title">
      <div class="nk-wrap">
        <div class="nk-section-heading nk-reveal">
          <div><p class="nk-kicker">Sunu xarit yi · Nos amis</p><h2 id="nk-friends-title">Quatre compagnons pour grandir.</h2></div>
          <p>Chacun a sa couleur et sa façon de découvrir. Ensemble, ils invitent les enfants à observer, poser des questions et essayer.</p>
        </div>
        <div class="nk-friend-stage">
          <article class="nk-friend-card nk-friend-samba nk-reveal">
            <div class="nk-friend-portrait"><img class="nk-friend-image" src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/Samba_vues_corps_entier.png' ); ?>" alt="Samba, garçon aux cheveux courts bouclés et sweat bleu." loading="lazy" decoding="async"></div>
            <div class="nk-friend-copy"><h3>Samba <span aria-hidden="true">●</span></h3><p>Curieux et enthousiaste, il aime compter, explorer et poser des questions.</p></div>
          </article>
          <article class="nk-friend-card nk-friend-awa nk-reveal">
            <div class="nk-friend-portrait"><?php echo $nk_img( 18, 'medium_large', 'nk-friend-image', 'Awa, fille aux longues tresses et aux perles colorées.' ); ?></div>
            <div class="nk-friend-copy"><h3>Awa <span aria-hidden="true">●</span></h3><p>Créative et attentive, elle aime les histoires, les mots et les découvertes.</p></div>
          </article>
          <article class="nk-friend-card nk-friend-bobo nk-reveal">
            <div class="nk-friend-portrait"><?php echo $nk_img( 15, 'medium_large', 'nk-friend-image', 'Bobo, garçon avec une casquette rouge portée à l’envers et un tee-shirt jaune.' ); ?></div>
            <div class="nk-friend-copy"><h3>Bobo <span aria-hidden="true">●</span></h3><p>Joyeux et plein d'énergie, il transforme chaque essai en jeu.</p></div>
          </article>
          <article class="nk-friend-card nk-friend-baobab nk-reveal">
            <div class="nk-friend-portrait"><?php echo $nk_img( 13, 'medium_large', 'nk-friend-image', 'Le Baobab, arbre-guide souriant, lit un conte aux enfants.' ); ?></div>
            <div class="nk-friend-copy"><h3>Le Baobab <span aria-hidden="true">●</span></h3><p>Sage guide des histoires, de la nature et des grandes questions.</p></div>
          </article>
        </div>
      </div>
    </section>

    <section class="nk-learning" aria-labelledby="nk-learning-title">
      <div class="nk-wrap">
        <div class="nk-learning-heading nk-reveal"><p class="nk-kicker">Apprendre en s'amusant</p><h2 id="nk-learning-title">Des découvertes qui font grandir.</h2><p>Le jeu est un point de départ pour parler, bouger, réfléchir et créer avec un adulte.</p></div>
        <div class="nk-learning-paths">
          <article class="nk-learning-item nk-reveal"><span aria-hidden="true">123</span><div><h3>Compter & observer</h3><p>Les nombres, les formes, les couleurs et les petites choses du quotidien.</p></div></article>
          <article class="nk-learning-item nk-reveal"><span aria-hidden="true">♫</span><div><h3>Écouter & s'exprimer</h3><p>Les sons, les mots, les chansons et les émotions à mettre en mots.</p></div></article>
          <article class="nk-learning-item nk-reveal"><span aria-hidden="true">✿</span><div><h3>Créer & bouger</h3><p>Inventer un rythme, dessiner, mimer, danser et jouer ensemble.</p></div></article>
          <article class="nk-learning-item nk-reveal"><span aria-hidden="true">☘</span><div><h3>Découvrir & respecter</h3><p>La nature, les animaux, les langues et les cultures avec curiosité.</p></div></article>
        </div>
      </div>
    </section>

    <section class="nk-culture" aria-labelledby="nk-culture-title">
      <div class="nk-wrap nk-culture-grid">
        <div class="nk-culture-image nk-reveal"><?php echo $nk_img( 11, 'large', 'nk-banner-image', 'Bannière illustrée Niani Kids avec Samba, Awa, Bobo et le Baobab.' ); ?></div>
        <div class="nk-culture-copy nk-reveal"><p class="nk-kicker">Du Sénégal à tous les petits curieux</p><h2 id="nk-culture-title">Nos langues et nos histoires ont leur place.</h2><p>Niani Kids s'inspire des paysages, des sons, des langues et des traditions du Sénégal. Nous voulons faire grandir un univers où le français et le wolof se rencontrent avec joie et respect.</p><a class="nk-text-link" href="<?php echo esc_url( $nk_youtube ); ?>" target="_blank" rel="noopener noreferrer">Découvrir l'univers Niani Kids <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>

    <section class="nk-parents" id="nk-parents" aria-labelledby="nk-parents-title">
      <div class="nk-wrap nk-parents-grid">
        <div class="nk-parents-copy nk-reveal"><p class="nk-kicker">Le coin des parents</p><h2 id="nk-parents-title">Les plus belles découvertes se partagent.</h2><p>Niani Kids accompagne les familles et les adultes qui entourent les enfants. Les chansons et les histoires peuvent ouvrir la porte à un jeu, une conversation ou une activité loin de l'écran.</p>
          <ul class="nk-parent-list"><li>Des idées simples à prolonger à la maison ou en classe</li><li>Un univers adapté aux jeunes enfants, à découvrir ensemble</li><li>Une attention portée aux langues et aux références culturelles</li><li>Des invitations à créer, bouger, observer et raconter</li></ul>
          <a class="nk-button nk-button-dark" href="mailto:<?php echo esc_attr( $nk_email ); ?>">Écrire à l'équipe <span aria-hidden="true">↗</span></a>
        </div>
        <div class="nk-parents-art nk-reveal"><?php echo $nk_img( 12, 'large', 'nk-parents-image', 'Les enfants apprennent à prendre soin d’une plante avec le Baobab.' ); ?><div class="nk-parents-note"><span aria-hidden="true">♡</span><span><strong>Grandir ensemble</strong><small>À leur rythme, avec vous.</small></span></div></div>
      </div>
    </section>

    <section class="nk-social" aria-labelledby="nk-social-title">
      <div class="nk-wrap">
        <div class="nk-social-heading nk-reveal"><p class="nk-kicker">L'aventure continue en ligne</p><h2 id="nk-social-title">Retrouvons-nous sur nos réseaux.</h2><p>Parents, familles et éducateurs, suivez Niani Kids pour découvrir les prochaines chansons, histoires et idées à partager.</p></div>
        <div class="nk-social-grid">
          <a class="nk-social-card nk-youtube nk-reveal" href="<?php echo esc_url( $nk_youtube ); ?>" target="_blank" rel="noopener noreferrer" aria-label="Ouvrir la chaîne YouTube officielle de Niani Kids dans un nouvel onglet">
            <span class="nk-social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"/></svg></span>
            <span class="nk-social-copy"><strong>YouTube</strong><small>Chansons, histoires et aventures</small><b>Voir la chaîne <span aria-hidden="true">↗</span></b></span>
          </a>
          <a class="nk-social-card nk-tiktok nk-reveal" href="<?php echo esc_url( $nk_tiktok ); ?>" target="_blank" rel="noopener noreferrer" aria-label="Ouvrir le compte TikTok officiel de Niani Kids dans un nouvel onglet">
            <span class="nk-social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M19.6 5.7a5.8 5.8 0 0 1-3.5-3.4A6.7 6.7 0 0 1 15.8 0h-4.1v15.1a2.8 2.8 0 1 1-2.8-2.8c.4 0 .8.1 1.1.2V8.3a7.5 7.5 0 1 0 5.8 7.3V7.9a9.8 9.8 0 0 0 5.7 1.8V5.6c-.7.1-1.3.1-1.9.1Z"/></svg></span>
            <span class="nk-social-copy"><strong>TikTok</strong><small>Petits moments et nouveautés</small><b>Suivre le compte <span aria-hidden="true">↗</span></b></span>
          </a>
        </div>
        <p class="nk-social-reminder">Une vidéo plaît à votre famille ? Pensez à aimer, vous abonner et partager le compte avec d'autres parents.</p>
      </div>
    </section>
  </main>

  <footer class="nk-footer" id="nk-contact">
    <div class="nk-wrap">
      <div class="nk-footer-main">
        <div class="nk-footer-brand">
          <a class="nk-brand nk-brand-footer" href="#nk-home"><?php echo $nk_img( 10, 'thumbnail', 'nk-brand-logo', 'Logo Niani Kids' ); ?><span>Niani Kids</span></a>
          <p>Un univers d'éveil et de divertissement inspiré du Sénégal, pour les petits curieux et les familles.</p>
        </div>
        <div class="nk-footer-links"><strong>Explorer</strong><a href="#nk-aventures">Nos aventures</a><a href="#nk-amis">Nos personnages</a><a href="#nk-mission">Mission du jour</a><a href="#nk-parents">Coin des parents</a></div>
        <div class="nk-footer-links"><strong>Suivre Niani Kids</strong><a href="<?php echo esc_url( $nk_youtube ); ?>" target="_blank" rel="noopener noreferrer">YouTube ↗</a><a href="<?php echo esc_url( $nk_tiktok ); ?>" target="_blank" rel="noopener noreferrer">TikTok ↗</a><a href="mailto:<?php echo esc_attr( $nk_email ); ?>">Nous écrire</a><?php $nk_privacy_page = get_page_by_path( 'privacy-policy' ); if ( $nk_privacy_page && 'publish' === get_post_status( $nk_privacy_page ) ) : ?><a href="<?php echo esc_url( get_permalink( $nk_privacy_page ) ); ?>">Confidentialité</a><?php endif; ?></div>
      </div>
      <div class="nk-footer-bottom"><span>© <?php echo esc_html( wp_date( 'Y' ) ); ?> Niani Kids. Tous droits réservés.</span><a href="#nk-home">Retour en haut ↑</a></div>
    </div>
  </footer>
</div>
<?php wp_footer(); ?>
</body>
</html>
