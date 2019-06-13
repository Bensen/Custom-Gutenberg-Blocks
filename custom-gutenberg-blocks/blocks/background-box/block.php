<?php

/**
 * Exit if accessed directly.
 */
defined( 'ABSPATH' ) || exit;

/**
 * Enqueue Block Assets.
 */
function background_box_block()
{
	/**
	 * Check if Gutenberg is active.
	 */
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	wp_register_script(
		'background-box-block-script',
		plugins_url( 'block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
	);

    // wp_register_style(
    //     'background-box-block-backend',
    //     plugins_url( 'editor.css', __FILE__ ),
    //     array(),
    //     filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
    // );

    // wp_register_style(
    //     'background-box-block-frontend',
    //     plugins_url( 'style.css', __FILE__ ),
	// 	array(),
	// 	filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
    // );
	
	// Register Block
	register_block_type('blocks/background-box', array(
		'editor_script' => 'background-box-block-script',
		// 'editor_style' => 'background-box-block-backend',
		// 'style' => 'background-box-block-frontend',
	));
}
add_action('init', 'background_box_block');