<?php
/**
 * Exit if accessed directly.
 */
defined( 'ABSPATH' ) || exit;

/**
 * Enqueue assets for frontend and backend.
 */
function CGB_block_assets() {
	wp_enqueue_style(
		'CGB-style-css',
		plugins_url( 'dist/blocks.style.css', dirname( __FILE__ ) ),
		array( 'wp-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'blocks.style.css' )
	);
} 
add_action( 'enqueue_block_assets', 'CGB_block_assets' );

/**
 * Enqueue assets for backend editor.
 */
function CGB_editor_assets() {
	wp_enqueue_style(
		'CGB-editor-css',
		plugins_url( 'dist/blocks.editor.css', dirname( __FILE__ ) ), 
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'blocks.editor.css' )
	);
}
add_action( 'enqueue_block_editor_assets', 'CGB_editor_assets' );

/**
 * Initialize the blocks.
 */
require_once dirname( __DIR__ ) . '/blocks/bootstrap-container/block.php';
require_once dirname( __DIR__ ) . '/blocks/bootstrap-card/block.php';
require_once dirname( __DIR__ ) . '/blocks/accordion-container/block.php';
require_once dirname( __DIR__ ) . '/blocks/accordion-card/block.php';
require_once dirname( __DIR__ ) . '/blocks/background-box/block.php';
require_once dirname( __DIR__ ) . '/blocks/background-box-2/block.php';
require_once dirname( __DIR__ ) . '/blocks/flatbox-background/block.php';
require_once dirname( __DIR__ ) . '/blocks/flatbox-features/block.php';

/**
 * Add custom block category.
 */
 add_filter( 'block_categories', function( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'flatbox',
				'title' => 'Flatbox',
			),
			array(
				'slug' => 'bootstrap',
				'title' => 'Bootstrap',
			),
		)
	);
}, 10, 2 );