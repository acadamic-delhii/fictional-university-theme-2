<?php

require get_theme_file_path('/inc/like-route.php');
require get_theme_file_path('/inc/search-route.php');

function unversity_custom_rest() {
	register_rest_field('post', 'authorName', array(
		'get_callback' => function() {return get_the_author();}
	));
	
	register_rest_field('note', 'userNoteCount', array(
		'get_callback' => function() {return count_user_posts(get_current_user_id(), 'note');}
	));
}

add_action('rest_api_init', 'unversity_custom_rest');

function page_banner($args = NULL)
{
	if (!$args['title']) {
		$args['title'] = get_the_title();
	}

	if (!$args['subtitle']) {
		$args['subtitle'] = get_field('page_banner_subtitle');
	}

	if (!$args['photo']) {
		if (get_field('page_banner_background_image')) {
			$args['photo'] = get_field('page_banner_background_image')['sizes']['pageBanner'];
		} else {
			$args['photo'] = get_theme_file_uri('/images/ocean.jpg');
		}
	}
?>
	<div class="page-banner">
		<div class="page-banner__bg-image" style="background-image: url(<?php echo $args['photo']; ?>);"></div>
		<div class="page-banner__content container container--narrow">
			<h1 class="page-banner__title"><?php echo $args['title'] ?></h1>
			<div class="page-banner__intro">
				<p><?php echo $args['subtitle'] ?></p>
			</div>
		</div>
	</div>
<?php
}

function university_files()
{
	wp_enqueue_script('googleMap', '//maps.google.com/maps/api/js?key=AIzaSyBvA8c9UX2Bd74HcbWKG_VqeiQ8m2gVYig', NULL, '1.0.0', true);
	wp_enqueue_style('font-google', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
	wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

	if (strstr($_SERVER['SERVER_NAME'], 'localhost')) {
		wp_enqueue_script('main-js', 'http://localhost:3000/bundled.js', NULL, '1.0.0', true);
	} else {
		wp_enqueue_script('vendors-js', get_theme_file_uri('/bundled-assets/vendors~scripts.8c97d901916ad616a264.js'), NULL, '1.0.0', true);
		wp_enqueue_script('main-js', get_theme_file_uri('/bundled-assets/scripts.cc76e2418b0460ea9505.js'), NULL, '1.0.0', true);
		wp_enqueue_style('main-style', get_theme_file_uri('/bundled-assets/styles.cc76e2418b0460ea9505.css'));
	}

	wp_localize_script('main-js', 'universityData', array(
		'root_url' => get_site_url(),
		'nonce' => wp_create_nonce('wp_rest')
	));
}

add_action('wp_enqueue_scripts', 'university_files');

function university_features()
{
	//register_nav_menu('headerMenuLocation', 'Header Menu Location');
	add_theme_support('title-tag');
	add_theme_support('post-thumbnails');
	add_image_size('professorLandscape', 400, 260, true);
	add_image_size('professorPortrait', 480, 650, true);
	add_image_size('pageBanner', 1500, 350, true);
}

add_action('after_setup_theme', 'university_features');

function university_post_types()
{
	register_post_type('campus', array(
		'capability_type' => 'campus',
		'map_meta_cap' => true,
		'show_in_rest' => true,
		'supports' => array('title', 'editor', 'excerpt'),
		'rewrite' => array('slug' => 'campuses'),
		'has_archive' => true,
		'public' => true,
		'labels' => array(
			'name' => 'Campuses',
			'add_new_item' => 'Add New Campus',
			'edit_item' => 'Edit Campus',
			'all_items' => 'All Campuses',
			'singular_name' => 'Campus'
		),
		'menu_icon' => 'dashicons-location-alt'
	));

	register_post_type('event', array(
		'capability_type' => 'event',
		'map_meta_cap' => true,
		'show_in_rest' => true,
		'supports' => array('title', 'editor', 'excerpt'),
		'rewrite' => array('slug' => 'events'),
		'has_archive' => true,
		'public' => true,
		'labels' => array(
			'name' => 'Events',
			'add_new_item' => 'Add New Event',
			'edit_item' => 'Edit Event',
			'all_items' => 'All Events',
			'singular_name' => 'Event'
		),
		'menu_icon' => 'dashicons-calendar'
	));

	register_post_type('program', array(
		'show_in_rest' => true,
		'supports' => array('title'),
		'rewrite' => array('slug' => 'programs'),
		'has_archive' => true,
		'public' => true,
		'labels' => array(
			'name' => 'Programs',
			'add_new_item' => 'Add New Program',
			'edit_item' => 'Edit Program',
			'all_items' => 'All Programs',
			'singular_name' => 'Program'
		),
		'menu_icon' => 'dashicons-awards'
	));

	register_post_type('professor', array(
		'show_in_rest' => true,
		'supports' => array('title', 'editor', 'thumbnail'),
		'public' => true,
		'labels' => array(
			'name' => 'Professors',
			'add_new_item' => 'Add New Professor',
			'edit_item' => 'Edit Professor',
			'all_items' => 'All Professors',
			'singular_name' => 'Professor'
		),
		'menu_icon' => 'dashicons-welcome-learn-more'
	));

	register_post_type('note', array(
		'capability_type' => 'note',
		'map_meta_cap' => true,
		'show_in_rest' => true,
		'supports' => array('title', 'editor'),
		'public' => false,
		'show_ui' => true,
		'labels' => array(
			'name' => 'Notes',
			'add_new_item' => 'Add New Note',
			'edit_item' => 'Edit Note',
			'all_items' => 'All Notes',
			'singular_name' => 'Note'
		),
		'menu_icon' => 'dashicons-welcome-write-blog'
	));

	register_post_type('like', array(
		'supports' => array('title'),
		'public' => false,
		'show_ui' => true,
		'labels' => array(
			'name' => 'Likes',
			'add_new_item' => 'Add New Like',
			'edit_item' => 'Edit Like',
			'all_items' => 'All Likes',
			'singular_name' => 'Like'
		),
		'menu_icon' => 'dashicons-heart'
	));
}

add_action('init', 'university_post_types');

function university_adjust_queries($query)
{
	if (!is_admin() and is_post_type_archive('campus') and $query->is_main_query()) {
		$query->set('post_per_page', -1);
	}

	if (!is_admin() and is_post_type_archive('program') and $query->is_main_query()) {
		$query->set('orderby', 'title');
		$query->set('order', 'ASC');
		$query->set('post_per_page', -1);
	}

	if (!is_admin() and is_post_type_archive('event') and $query->is_main_query()) {
		$today = date('Ymd');

		$query->set('meta_key', 'event_date');
		$query->set('orderby', 'meta_value_num');
		$query->set('order', 'ASC');
		$query->set('meta_query', array(
			array(
				'key' => 'event_date',
				'compare' => '>=',
				'value' => $today,
				'type' => 'numeric'
			)
		));
	}
}

add_action('pre_get_posts', 'university_adjust_queries');

function universityMapKey($api)
{
	$api['key'] = 'AIzaSyBvA8c9UX2Bd74HcbWKG_VqeiQ8m2gVYig';
	return $api;
}
add_filter('acf/fields/google_map/api', 'universityMapKey');

function redirectSubscribersToHome()
{
	$currentUser = wp_get_current_user();

	if (count($currentUser->roles) == 1 and $currentUser->roles[0] == 'subscriber') {
		wp_redirect(site_url('/'));
		exit;
	}
}

add_action('admin_init', 'redirectSubscribersToHome');

function HideAdminBarForSubscribers()
{
	$currentUser = wp_get_current_user();

	if (count($currentUser->roles) == 1 and $currentUser->roles[0] == 'subscriber') {
		show_admin_bar(false);
	}
}

add_action('wp_loaded', 'HideAdminBarForSubscribers');

function ourHeaderURL()
{
	return esc_url(site_url('/'));
}

add_filter('login_headerurl', 'ourHeaderURL');

function ourLoginCSS()
{
	if (strstr($_SERVER['SERVER_NAME'], 'localhost')) {
		wp_enqueue_script('main-js', 'http://localhost:3000/bundled.js', NULL, '1.0.0', true);
	} else {
		wp_enqueue_script('vendors-js', get_theme_file_uri('/bundled-assets/vendors~scripts.8c97d901916ad616a264.js'), NULL, '1.0.0', true);
		wp_enqueue_script('main-js', get_theme_file_uri('/bundled-assets/scripts.cc76e2418b0460ea9505.js'), NULL, '1.0.0', true);
		wp_enqueue_style('main-style', get_theme_file_uri('/bundled-assets/styles.cc76e2418b0460ea9505.css'));
	}
}

add_action('login_enqueue_scripts', 'ourLoginCSS');

function ourLoginTitle()
{
	return get_bloginfo('name');
}

add_filter('login_headertitle', 'ourLoginTitle');

// Force note posts to be private 
add_filter('wp_insert_post_data', 'makeNotePirvate', 10, 2);
function makeNotePirvate($data, $postarr)
{
	if ($data['post_type'] == 'note') {
		if (count_user_posts(get_current_user_id(), 'note') > 4 and !$postarr['ID']) {
			die("{\"error\":\"You have reached your note limit.\"}");
			//die("You have reached your note limit");
		}

		$data['post_content'] = sanitize_textarea_field($data['post_content']);
		$data['post_title'] = sanitize_text_field($data['post_title']);
	}

	if ($data['post_type'] == 'note' and $data['post_status'] != 'trash') {
		$data['post_status'] = 'private';
	}
	return $data;
}
