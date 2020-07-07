<?php

function university_files()
{
	wp_enqueue_style('font-google', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
	wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

	if (strstr($_SERVER['SERVER_NAME'], 'localhost')) {
		wp_enqueue_script('main-js', 'http://localhost:3000/bundled.js', NULL, '1.0.0', true);
	} else {
		wp_enqueue_script('vendors-js', get_theme_file_uri('/bundled-assets/vendors~scripts.8c97d901916ad616a264.js'), NULL, '1.0.0', true);
		wp_enqueue_script('main-js', get_theme_file_uri('/bundled-assets/scripts.291f4fbd3120f33dcc5a.js'), NULL, '1.0.0', true);
		wp_enqueue_style('main-style', get_theme_file_uri('/bundled-assets/styles.291f4fbd3120f33dcc5a.css'));
	}
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
	register_post_type('event', array(
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
		'supports' => array('title', 'editor'),
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
}

add_action('init', 'university_post_types');

function university_adjust_queries($query)
{
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
