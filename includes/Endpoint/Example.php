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

		register_rest_route( $namespace, $endpoint . '(?P<term_slug>.+)', array(
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_questions' ),
				'permission_callback' => array( $this, 'example_permissions_check' ),
			),
		) );
		register_rest_route( $namespace, 'check/result', array(
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'check_answers' ),
				'permission_callback' => array( $this, 'example_permissions_check' ),
			),
		) );
		register_rest_route( $namespace, 'modules', array(
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_modules' ),
				'permission_callback' => array( $this, 'example_permissions_check' ),
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

		register_rest_route( $namespace, '/course/', array(
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_courses' ),
				'permission_callback' => array( $this, 'example_permissions_check' ),
				'args'                => array(),
			),
		) );
		register_rest_route( $namespace, '/certificate/', array(
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_certificate' ),
				'permission_callback' => array( $this, 'example_permissions_check' ),
				'args'                => array(),
			),
		) );
		register_rest_route( $namespace, '/course/', array(
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'add_course' ),
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

	public function get_certificate( $request ) {

		$result = get_field('certyficate', 'option');
		$current_user = wp_get_current_user();

		$result = str_replace( '{username}', $current_user->user_firstname, $result);
		$result = str_replace( '{surname}', $current_user->user_lastname, $result);
		$result = str_replace( '{email}', $current_user->user_email, $result);

		return new \WP_REST_Response( array(
			'success' => true,
			'certificate'  => $result,

		), 200 );
	}

	public function check_answers( $request ) {
		$quiz_results = json_decode( $request['selectedAnswers'] );

		$tmp = array();

		foreach ( $quiz_results as $result ) {
			$tmp[] = strpos( get_field( 'prawidlowa_odpowiedz', $result->questionId ),
					substr( $result->answer, - 1 ) ) !== false;
		}

		$correct_answers = array_filter( $tmp, function ( $data ) {
			return $data === true;
		} );

		$percents = floor( count( $correct_answers ) / count( $tmp ) * 100 );

		$result = array(
			'percents' => $percents,
			'correct'  => count( $correct_answers ),
			'wrong'    => count( $tmp ) - count( $correct_answers ),
		);


		return new \WP_REST_Response( array(
			'success' => true,
			'result'  => $result,

		), 200 );
	}

	public function get_courses( $request ) {
		$tests = get_terms( array(
			'taxonomy'   => 'exam',
			'hide_empty' => false,
		) );

		$tests = array_map( function ( $data ) {
			$data->title = $data->name;
			$data->ID    = $data->term_id;

			$result = new \WP_Query( array(
				'post_type'   => 'question',
				'post_status' => array( 'draft', 'publish' ),
				'tax_query'   => array(
					array(
						'taxonomy' => 'exam',
						'field'    => 'id',
						'terms'    => array( $data->term_id )
					)
				),
			) );

			$data->questions_count = $result->post_count;

			if ( 0 == $result->post_count ) {
				$result = new \WP_Query( array(
					'post_type'   => 'post',
					'post_status' => array( 'draft', 'publish' ),
					'tax_query'   => array(
						array(
							'taxonomy' => 'exam',
							'field'    => 'id',
							'terms'    => array( $data->term_id )
						)
					),
				) );

				//how many posts with knowladge of this tasonomy
				$data->e_posts_count = $result->post_count;
			}

			return $data;
		}, $tests );

		return new \WP_REST_Response( array(
			'success' => true,
			'tests'   => $tests,

		), 200 );
	}

	public function add_course( $request ) {

		$data = json_decode( $request['course'] );
		wp_insert_term( $data->title, 'exam', array( 'description' => $data->description ) );

		$tests = get_terms( array(
			'taxonomy'   => 'exam',
			'hide_empty' => false,
		) );

		$tests = array_map( function ( $data ) {
			$data->title = $data->name;
			$data->ID    = $data->term_id;

			$count = new \WP_Query( array(
				'post_type'   => 'question',
				'post_status' => array( 'draft', 'publish' ),
				'tax_query'   => array(
					array(
						'taxonomy' => 'exam',
						'field'    => 'id',
						'terms'    => array( $data->term_id )
					)
				),
			) );

			$data->count = $count->post_count;

			return $data;
		}, $tests );

		return new \WP_REST_Response( array(
			'success' => true,
			'tests'   => $tests,

		), 200 );
	}

	public function get_modules( $request ) {

		$posts = new \WP_Query( array(
			'post_type'   => 'elearning',
			'post_status' => array( 'publish' ),
		) );

		$posts = $posts->get_posts();
		$posts = array_map( function ( $data ) {
			$data->fields = get_fields( $data->ID );

			return $data;
		}, $posts );


		return new \WP_REST_Response( array(
			'success' => true,
			'modules' => $posts
		), 200 );
	}

	/**
	 * Get Example
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 *
	 * @return WP_Error|WP_REST_Request
	 */
	public function get_questions( $request ) {
		$slug_id = $request['term_slug'];


		$posts = new \WP_Query( array(
			'post_type'   => 'question',
			'post_status' => array( 'draft', 'publish' ),
			'tax_query'   => array(
				array(
					'taxonomy' => 'exam',
					'field'    => 'id',
					'terms'    => array( $slug_id )
				)
			),
		) );
		$posts = $posts->get_posts();
		shuffle( $posts );
		$posts = array_slice( $posts, 1, 3 );
		$posts = array_map( function ( $data ) {
			$post_id        = $data->ID;
			$custom         = get_post_custom( $post_id );
			$data->answer   = array();
			$data->answer[] = array( 'key' => 'answer_0', 'value' => get_field( 'odpowiedz_1', $post_id ) );
			$data->answer[] = array( 'key' => 'answer_1', 'value' => get_field( 'odpowiedz_2', $post_id ) );
			$data->answer[] = array( 'key' => 'answer_2', 'value' => get_field( 'odpowiedz_3', $post_id ) );
			$data->answer[] = array( 'key' => 'answer_3', 'value' => get_field( 'odpowiedz_4', $post_id ) );
			$data->answer[] = array( 'key' => 'answer_4', 'value' => get_field( 'odpowiedz_5', $post_id ) );
			$data->answer[] = array( 'key' => 'answer_5', 'value' => get_field( 'odpowiedz_6', $post_id ) );
			shuffle( $data->answer );
			$data->imageSrc = get_the_post_thumbnail_url( $post_id, 'full' );

			return $data;
		}, $posts );


		return new \WP_REST_Response( array(
			'success'  => true,
			'question' => $posts
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
			'tax_input'  => array( 'exam' => $data->courseSlug ),
			'post_type'  => 'question',
			'post_title' => $data->question
		) );

		update_post_meta( $post_id, 'answer_0', $data->answer[0] );
		update_post_meta( $post_id, 'answer_1', $data->answer[1] );
		update_post_meta( $post_id, 'answer_2', $data->answer[2] );
		update_post_meta( $post_id, 'answer_3', $data->answer[3] );
		update_post_meta( $post_id, 'answer_4', $data->answer[4] );
		update_post_meta( $post_id, 'answer_5', $data->answer[5] );
		update_post_meta( $post_id, 'correctAnswer', $data->correctAnswer );

		set_post_thumbnail( $post_id, $data->attachmentId );


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
