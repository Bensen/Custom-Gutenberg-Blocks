<?php

/**
 * Exit if accessed directly.
 */
defined( 'ABSPATH' ) || exit;

/**
 * Enqueue Block Assets.
 */
function accordion_container_block()
{
	/**
	 * Check if Gutenberg is active.
	 */
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	wp_register_script(
		'accordion-container-block-script',
		plugins_url( 'block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
	);

    // wp_register_style(
    //     'accordion-container-block-backend',
    //     plugins_url( 'editor.css', __FILE__ ),
    //     array(),
    //     filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
    // );

    // wp_register_style(
    //     'accordion-container-block-frontend',
    //     plugins_url( 'style.css', __FILE__ ),
	// 	array(),
	// 	filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
    // );
	
	// Register Block
	register_block_type('blocks/accordion-container', array(
		'editor_script' => 'accordion-container-block-script',
		// 'editor_style' => 'accordion-container-block-backend',
		// 'style' => 'accordion-container-block-frontend',
	));
}
add_action('init', 'accordion_container_block');