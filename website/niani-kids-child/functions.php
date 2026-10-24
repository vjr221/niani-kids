<?php
/**
 * Niani Kids child theme — built from the official website-3d-draft.
 * Parent theme: Twenty Twenty-Five.
 * Keep Novamira and its connection untouched.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

add_action( 'wp_enqueue_scripts', function () {
    // The front-page prototype contains its own carefully scoped design system.
    if ( is_front_page() ) {
        wp_dequeue_style( 'twentytwentyfive-style' );
        wp_dequeue_style( 'wp-block-library' );
        wp_dequeue_style( 'classic-theme-styles' );
    }
}, 100 );

add_action( 'after_setup_theme', function () {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
} );
