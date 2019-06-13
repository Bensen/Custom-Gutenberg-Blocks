<?php
/**
 * Plugin Name: Custom Gutenberg Blocks
 * Description: Eigene wiederverwendbare Gutenberg Blöcke.
 * Author: Ben
 * Version: 0.2
 * 
 * @package custom-gutenberg-blocks
 */


/**
 * Exit if accessed directly.
 */
defined( 'ABSPATH' ) || exit;

/**
 * Load the blocks functionality.
 */
require_once plugin_dir_path( __FILE__ ) . 'dist/init.php';