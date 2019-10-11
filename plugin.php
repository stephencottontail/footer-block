<?php
	/**
     * Plugin Name: Footer Block
     * Description: A special block that contains a link to my Twitter and categories and tags
     * Version: 1.0.0
     * Author: Stephen Dickinson <stephencottontail@me.com>
     * Author URI: https://stephencottontail.com/
	 */

	add_action( 'init', function() {
		wp_register_script( 'footer-block-script', plugins_url( 'dist/main/index.js', __FILE__  ), array( 'wp-api-fetch', 'wp-blocks', 'wp-components', 'wp-data', 'wp-element', 'wp-url' ), null, true );

		wp_register_style( 'footer-block-style', plugins_url( 'dist/main/style.css', __FILE__ ) );
		wp_register_style( 'footer-block-editor', plugins_url( 'dist/main/editor.css', __FILE__ ) );

		register_block_type( 'sc/footer-block', array(
			'editor_script' => 'footer-block-script',
			'editor_style'  => 'footer-block-editor',
			'style'         => 'footer-block-style'
		) );
	}, 10 );
