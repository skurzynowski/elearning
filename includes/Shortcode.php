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
 * @subpackage Shortcode
 */
class Shortcode {
	const CERTIFICATE_RESULT_KEY = 'certificate';
	const TEST_COUNTER_KEY = 'test_counter';

	/**
	 * Instance of this class.
	 *
	 * @since    1.0.0
	 *
	 * @var      object
	 */
	protected static $instance = null;

	/**
	 * Initialize the plugin by setting localization and loading public scripts
	 * and styles.
	 *
	 * @since     1.0.0
	 */
	private function __construct() {
		$plugin            = Plugin::get_instance();
		$this->plugin_slug = $plugin->get_plugin_slug();
		$this->version     = $plugin->get_plugin_version();

		add_shortcode( 'wp-reactivate', array( $this, 'shortcode' ) );
	}

	/**
	 * Return an instance of this class.
	 *
	 * @since     1.0.0
	 *
	 * @return    object    A single instance of this class.
	 */
	public static function get_instance() {

		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self;
			self::$instance->do_hooks();
		}

		return self::$instance;
	}

	/**
	 * Handle WP actions and filters.
	 *
	 * @since    1.0.0
	 */
	private function do_hooks() {
		add_action( 'wp_enqueue_scripts', array( $this, 'register_frontend_scripts' ) );
	}

	/**
	 * Register frontend-specific javascript
	 *
	 * @since     1.0.0
	 */
	public function register_frontend_scripts() {
		wp_register_script( $this->plugin_slug . '-shortcode-script',
			plugins_url( 'assets/js/shortcode.js', dirname( __FILE__ ) ), array( 'jquery' ), $this->version );
		wp_register_style( $this->plugin_slug . '-shortcode-style',
			plugins_url( 'assets/css/shortcode.css', dirname( __FILE__ ) ), $this->version );
	}

	public function cmp( $a, $b ) {
		return strcmp( $a->term_id, $b->term_id );
	}

	public function shortcode( $atts ) {
		wp_enqueue_script( $this->plugin_slug . '-shortcode-script' );
		wp_enqueue_style( $this->plugin_slug . '-shortcode-style' );

		$object_name = 'wpr_object_' . uniqid();


		wp_enqueue_media();
		wp_enqueue_script( 'wp-api' );

		$page_url = get_post()->guid;
		if ( function_exists( 'get_field' ) ) {
			$preQuestions  = get_field( 'pre_test_limit_questions', 'options' );
			$postQuestions = get_field( 'pre_test_limit_questions', 'options' );
			$sum           = $postQuestions + $postQuestions;
			$pretest_time  = get_field( 'test_wstepny', 'options' );
			$post_test     = get_field( 'test_koncowy', 'options' );
		}
		$user = wp_get_current_user();

		$certificate = get_user_meta( $user->ID, self::CERTIFICATE_RESULT_KEY, true );
		$test_counter = get_user_meta( $user->ID, self::TEST_COUNTER_KEY, true );


		$object = shortcode_atts( array(
			'title'          => 'Hello world',
			'api_nonce'      => wp_create_nonce( 'wp_rest' ),
			'api_url'        => rest_url( $this->plugin_slug . '/v1/' ),
			'sumOfQuestions' => $sum ?? 0,
			'examResult'     => $certificate,
			'testCounter'    => $test_counter,
			'testsTime'      => array(
				'pretestTime'  => $pretest_time,
				'posttestTime' => $post_test,
			)

		), $atts, 'wp-reactivate' );

		wp_localize_script( $this->plugin_slug . '-shortcode-script', $object_name, $object );

		$shortcode = '<div class="wp-reactivate-shortcode" data-object-id="' . $object_name . '"></div>';

		return $shortcode;
	}
}
