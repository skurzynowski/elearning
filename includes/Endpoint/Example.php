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

namespace Pangolin\WPR\Endpoint;

use Pangolin\WPR;

/**
 * @subpackage REST_Controller
 */
class Example {
	/**
	 * Instance of this class.
	 *
	 * @since    0.8.1
	 *
	 * @var      object
	 */
	protected static $instance = null;

	/**
	 * Initialize the plugin by setting localization and loading public scripts
	 * and styles.
	 *
	 * @since     0.8.1
	 */
	private function __construct() {
		$plugin            = WPR\Plugin::get_instance();
		$this->plugin_slug = $plugin->get_plugin_slug();
	}

	/**
	 * Return an instance of this class.
	 *
	 * @since     0.8.1
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
	 * Set up WordPress hooks and filters
	 *
	 * @return void
	 */
	public function do_hooks() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {
		$version   = '1';
		$namespace = $this->plugin_slug . '/v' . $version;
		$endpoint  = '/question/';

		register_rest_route( $namespace, $endpoint, array(
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_questions' ),
				'permission_callback' => array( $this, 'example_permissions_check' ),
				'args'                => array(),
			),
		) );

		register_rest_route( $namespace, $endpoint, array(
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'add_question' ),
				'permission_callback' => array( $this, 'example_permissions_check' ),
				'args'                => array(),
			),
		) );

		register_rest_route( $namespace, $endpoint, array(
			array(
				'methods'             => \WP_REST_Server::EDITABLE,
				'callback'            => array( $this, 'update_example' ),
				'permission_callback' => array( $this, 'example_permissions_check' ),
				'args'                => array(),
			),
		) );

		register_rest_route( $namespace, $endpoint, array(
			array(
				'methods'             => \WP_REST_Server::DELETABLE,
				'callback'            => array( $this, 'delete_example' ),
				'permission_callback' => array( $this, 'example_permissions_check' ),
				'args'                => array(),
			),
		) );

	}

	/**
	 * Get Example
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 *
	 * @return WP_Error|WP_REST_Request
	 */
	public function get_questions( $request ) {
		$example_option = get_option( 'wpr_example_setting' );

		// Don't return false if there is no option
		if ( ! $example_option ) {
			return new \WP_REST_Response( array(
				'success' => true,
				'value'   => ''
			), 200 );
		}

		return new \WP_REST_Response( array(
			'success' => true,
			'value'   => $example_option
		), 200 );
	}

	/**
	 * Create OR Update Question
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 *
	 * @return WP_Error|WP_REST_Request
	 */
	public function add_question( $request ) {
		$data    = json_decode( $request['question'] );
		$post_id = wp_insert_post( array(
			'tax_input'     => array('exam' => $data->courseSlug ),
			'post_type'     => 'question',
			'post_title'    => $data->question
		) );
		update_post_meta( $post_id, 'answer_0', $data->answer[0] );
		update_post_meta( $post_id, 'answer_1', $data->answer[1] );
		update_post_meta( $post_id, 'answer_2', $data->answer[2] );
		update_post_meta( $post_id, 'answer_3', $data->answer[3] );
		update_post_meta( $post_id, 'answer_4', $data->answer[4] );
		update_post_meta( $post_id, 'answer_5', $data->answer[5] );
		update_post_meta( $post_id, 'correctAnswer', $data->correctAnswer );
		update_post_meta( $post_id, 'imageSrc', $data->imageSrc );


		return new \WP_REST_Response( array(
			'success' => true,
			'postId'  => $post_id
		), 200 );
	}

	/**
	 * Delete Example
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 *
	 * @return WP_Error|WP_REST_Request
	 */
	public function delete_example( $request ) {
		$deleted = delete_option( 'wpr_example_setting' );

		return new \WP_REST_Response( array(
			'success' => $deleted,
			'value'   => ''
		), 200 );
	}

	/**
	 * Check if a given request has access to update a setting
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 *
	 * @return WP_Error|bool
	 */
	public function example_permissions_check( $request ) {
		return current_user_can( 'manage_options' );
	}
}
