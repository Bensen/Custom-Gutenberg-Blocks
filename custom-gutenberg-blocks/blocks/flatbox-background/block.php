<?php

/**
 * Exit if accessed directly.
 */
defined( 'ABSPATH' ) || exit;

/**
 * Enqueue Block Assets.
 */
function flatbox_background_block()
{
	/**
	 * Check if Gutenberg is active.
	 */
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	wp_register_script(
		'flatbox-background-block-script',
		plugins_url( 'block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
	);

    // wp_register_style(
    //     'flatbox-background-block-backend',
    //     plugins_url( 'editor.css', __FILE__ ),
    //     array(),
    //     filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
    // );

    // wp_register_style(
    //     'flatbox-background-block-frontend',
    //     plugins_url( 'style.css', __FILE__ ),
	// 	array(),
	// 	filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
    // );
	
	// Register Block
	register_block_type('blocks/flatbox-background', array(
		'editor_script' => 'flatbox-background-block-script',
		// 'editor_style' => 'flatbox-background-block-backend',
		// 'style' => 'flatbox-background-block-frontend',
	));
}
add_action('init', 'flatbox_background_block');