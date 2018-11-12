<?php
/**
 * WP-Reactivate
 *
 *
 * @package   WP-Reactivate
 * @author    Pangolin
 * @license   GPL-3.0
 * @link      https://gopangolin.com
 * @copyright 2017 Pangolin (Pty) Ltd
 */

namespace Pangolin\WPR;

/**
 * @subpackage Admin
 */
class Config {

	/**
	 * Config constructor.
	 */
	public function __construct() {
		if ( ! function_exists( 'register_posttype' ) ) {
			add_action( 'init', array( $this, 'custom_taxonomy' ), 0 );
			add_action( 'init', array( $this, 'register_posttype' ), 0 );
		}
	}

	function register_posttype() {

		$labels = array(
			'name'                  => _x( 'question', 'Post Type General Name', 'elearning' ),
			'singular_name'         => _x( 'question', 'Post Type Singular Name', 'elearning' ),
			'menu_name'             => __( 'Pytania', 'elearning' ),
			'name_admin_bar'        => __( 'Pytania', 'elearning' ),
			'archives'              => __( 'Item Archives', 'elearning' ),
			'attributes'            => __( 'Item Attributes', 'elearning' ),
			'parent_item_colon'     => __( 'Parent Item:', 'elearning' ),
			'all_items'             => __( 'All Items', 'elearning' ),
			'add_new_item'          => __( 'Add New Item', 'elearning' ),
			'add_new'               => __( 'Add New', 'elearning' ),
			'new_item'              => __( 'New Item', 'elearning' ),
			'edit_item'             => __( 'Edit Item', 'elearning' ),
			'update_item'           => __( 'Update Item', 'elearning' ),
			'view_item'             => __( 'View Item', 'elearning' ),
			'view_items'            => __( 'View Items', 'elearning' ),
			'search_items'          => __( 'Search Item', 'elearning' ),
			'not_found'             => __( 'Not found', 'elearning' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'elearning' ),
			'featured_image'        => __( 'Featured Image', 'elearning' ),
			'set_featured_image'    => __( 'Set featured image', 'elearning' ),
			'remove_featured_image' => __( 'Remove featured image', 'elearning' ),
			'use_featured_image'    => __( 'Use as featured image', 'elearning' ),
			'insert_into_item'      => __( 'Insert into item', 'elearning' ),
			'uploaded_to_this_item' => __( 'Uploaded to this item', 'elearning' ),
			'items_list'            => __( 'Items list', 'elearning' ),
			'items_list_navigation' => __( 'Items list navigation', 'elearning' ),
			'filter_items_list'     => __( 'Filter items list', 'elearning' ),
		);
		$args   = array(
			'label'               => __( 'question', 'elearning' ),
			'description'         => __( 'question', 'elearning' ),
			'labels'              => $labels,
			'supports'            => array( 'title', 'thumbnail', 'custom-fields' ),
			'taxonomies'          => array( 'post_tag', 'exam' ),
			'hierarchical'        => false,
			'public'              => false,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'menu_position'       => 5,
			'menu_icon'           => 'dashicons-groups',
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'can_export'          => true,
			'has_archive'         => false,
			'exclude_from_search' => true,
			'publicly_queryable'  => false,
			'capability_type'     => 'page',
			'show_in_rest'        => true,
		);
		register_post_type( 'question', $args );

		$labels = array(
			'name'                  => _x( 'Moduł szkoleniowy', 'Post Type General Name', 'elearning' ),
			'singular_name'         => _x( 'Moduł szkoleniowy', 'Post Type Singular Name', 'elearning' ),
			'menu_name'             => __( 'Moduł szkoleniowy', 'elearning' ),
			'name_admin_bar'        => __( 'Moduł szkoleniowy', 'elearning' ),
			'archives'              => __( 'Item Archives', 'elearning' ),
			'attributes'            => __( 'Item Attributes', 'elearning' ),
			'parent_item_colon'     => __( 'Parent Item:', 'elearning' ),
			'all_items'             => __( 'Wszystkie moduły', 'elearning' ),
			'add_new_item'          => __( 'Dodaj nowy moduł', 'elearning' ),
			'add_new'               => __( 'Dodaj nowy', 'elearning' ),
			'new_item'              => __( 'Nowy moduł', 'elearning' ),
			'edit_item'             => __( 'Edytu moduł', 'elearning' ),
			'update_item'           => __( 'Uaktualnij moduł', 'elearning' ),
			'view_item'             => __( 'Zobacz moduł', 'elearning' ),
			'view_items'            => __( 'Zobacz moduły', 'elearning' ),
			'search_items'          => __( 'Search Item', 'elearning' ),
			'not_found'             => __( 'Nie znaleziono', 'elearning' ),
			'not_found_in_trash'    => __( 'Nie znaleziono w koszu', 'elearning' ),
			'featured_image'        => __( 'Obrazek modułu', 'elearning' ),
			'set_featured_image'    => __( 'Set featured image', 'elearning' ),
			'remove_featured_image' => __( 'Remove featured image', 'elearning' ),
			'use_featured_image'    => __( 'Use as featured image', 'elearning' ),
			'insert_into_item'      => __( 'Insert into item', 'elearning' ),
			'uploaded_to_this_item' => __( 'Uploaded to this item', 'elearning' ),
			'items_list'            => __( 'Items list', 'elearning' ),
			'items_list_navigation' => __( 'Items list navigation', 'elearning' ),
			'filter_items_list'     => __( 'Filter items list', 'elearning' ),
		);
		$args   = array(
			'label'               => __( 'Moduł', 'elearning' ),
			'description'         => __( 'Moduł szkoleniowy', 'elearning' ),
			'labels'              => $labels,
			'supports'            => array( 'title' ),
			'taxonomies'          => array(),
			'hierarchical'        => false,
			'public'              => false,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'menu_position'       => 5,
			'menu_icon'           => 'dashicons-groups',
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'can_export'          => true,
			'has_archive'         => false,
			'exclude_from_search' => true,
			'publicly_queryable'  => false,
			'capability_type'     => 'page',
			'show_in_rest'        => true,
		);
		register_post_type( 'elearning', $args );;
	}


	// Register Custom Taxonomy
	function custom_taxonomy() {
		if ( ! function_exists( 'custom_taxonomy' ) ) {
			$labels = array(
				'name'                       => _x( 'Testy', 'Taxonomy General Name', 'text_domain' ),
				'singular_name'              => _x( 'Test', 'Taxonomy Singular Name', 'text_domain' ),
				'menu_name'                  => __( 'Testy', 'text_domain' ),
				'all_items'                  => __( 'Wszystkie testy', 'text_domain' ),
				'parent_item'                => __( 'Parent Item', 'text_domain' ),
				'parent_item_colon'          => __( 'Parent Item:', 'text_domain' ),
				'new_item_name'              => __( 'New Item Test', 'text_domain' ),
				'add_new_item'               => __( 'Dodaj nowy test', 'text_domain' ),
				'edit_item'                  => __( 'Edytu test', 'text_domain' ),
				'update_item'                => __( 'Aktualizuj test', 'text_domain' ),
				'view_item'                  => __( 'Zobacz test', 'text_domain' ),
				'separate_items_with_commas' => __( 'Separate items with commas', 'text_domain' ),
				'add_or_remove_items'        => __( 'Add or remove items', 'text_domain' ),
				'choose_from_most_used'      => __( 'Choose from the most used', 'text_domain' ),
				'popular_items'              => __( 'Popular Items', 'text_domain' ),
				'search_items'               => __( 'Search Items', 'text_domain' ),
				'not_found'                  => __( 'Not Found', 'text_domain' ),
				'no_terms'                   => __( 'No items', 'text_domain' ),
				'items_list'                 => __( 'Items list', 'text_domain' ),
				'items_list_navigation'      => __( 'Items list navigation', 'text_domain' ),
			);
			$args   = array(
				'labels'            => $labels,
				'hierarchical'      => false,
				'public'            => true,
				'show_ui'           => true,
				'show_admin_column' => true,
				'show_in_nav_menus' => true,
				'show_tagcloud'     => true,
				'show_in_rest'      => true,
			);
			register_taxonomy( 'exam', array( 'question', 'post' ), $args );

			wp_insert_term( 'Test wstępny', 'exam', array( 'description' => "Test wstępny", 'slug' => 'pre-test' ) );
			wp_insert_term( 'Test końcowy', 'exam', array( 'description' => "Test końcowy", 'slug' => 'post-test' ) );
		}

		$this->register_settings();
	}

	public function register_settings() {

		if ( function_exists( "acf_add_options_page" ) ) {
			$args = array( 'page_title' => 'Opcje Elearning', );
			acf_add_options_page( $args );
		}


	}
}
