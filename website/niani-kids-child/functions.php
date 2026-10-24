<?php
/**
 * Niani Kids child theme.
 * Home design: Niani Kids — Le jardin des découvertes.
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action( 'after_setup_theme', function () {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
} );

add_action( 'wp_enqueue_scripts', function () {
    if ( is_front_page() ) {
        $css_path = get_stylesheet_directory() . '/assets/niani-kids.css';
        $js_path  = get_stylesheet_directory() . '/assets/niani-kids.js';

        wp_enqueue_style(
            'niani-kids-home',
            get_stylesheet_directory_uri() . '/assets/niani-kids.css',
            array(),
            file_exists( $css_path ) ? (string) filemtime( $css_path ) : '1.0.0'
        );

        wp_enqueue_script(
            'niani-kids-home',
            get_stylesheet_directory_uri() . '/assets/niani-kids.js',
            array(),
            file_exists( $js_path ) ? (string) filemtime( $js_path ) : '1.0.0',
            true
        );

        // Keep the landing page's deliberately scoped visual system isolated from
        // the parent block theme while preserving WordPress head/footer hooks.
        wp_dequeue_style( 'twentytwentyfive-style' );
        wp_dequeue_style( 'wp-block-library' );
        wp_dequeue_style( 'classic-theme-styles' );
    }
} );
