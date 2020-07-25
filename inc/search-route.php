<?php

add_action('rest_api_init', 'universityRegisterSearch');

function universityRegisterSearch()
{
    register_rest_route('university/v1', 'search', array(
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'universitySearchResults'
    ));
}

function universitySearchResults($data)
{
    $mainQuery = new WP_Query(array(
        'post_type' => array('post', 'page', 'professor', 'program', 'campus', 'event'),
        's' => sanitize_text_field($data['term'])
    ));

    $results = array(
        'generalInfo' => array(),
        'professors' => array(),
        'programs'   => array(),
        'events'     => array(),
        'campuses'   => array()
    );

    while ($mainQuery->have_posts()) {
        $mainQuery->the_post();

        switch (get_post_type()) {
            case 'post':
            case 'page':
                array_push($results['generalInfo'], array(
                    'title' => get_the_title(),
                    'permalink' => get_the_permalink(),
                    'postType' => get_post_type(),
                    'authorName' => get_the_author()
                ));
                break;
            case 'professor':
                array_push($results['professors'], array(
                    'title' => get_the_title(),
                    'permalink' => get_the_permalink(),
                    'image' => get_the_post_thumbnail_url(0, 'professorLandscape')
                ));
                break;
            case 'program':
                array_push($results['programs'], array(
                    'title' => get_the_title(),
                    'permalink' => get_the_permalink()
                ));
                break;
            case 'event':
                $eventDate = new DateTime(get_field('event_date'));
                $description = null;
                if (has_excerpt()) {
                    $description = get_the_excerpt();
                } else {
                    $description = wp_trim_words(get_the_content(), 18);
                }

                array_push($results['events'], array(
                    'title' => get_the_title(),
                    'permalink' => get_the_permalink(),
                    'month' => $eventDate->format('M'),
                    'day' => $eventDate->format('d'),
                    'description' => $description
                ));
                break;
            case 'campus':
                array_push($results['campuses'], array(
                    'title' => get_the_title(),
                    'permalink' => get_the_permalink()
                ));
                break;
            default:
                break;
        }
    }

    wp_reset_postdata();

    $programRelationshipQuery = new WP_Query(array(
        'post_type' => 'professor',
        'meta_query' => array(
            array(
                'key' => 'related_programs',
                'compare' => 'LIKE',
                'value' => '"48"'
            )
        )
    ));

    while ($programRelationshipQuery->have_posts()) {
        $programRelationshipQuery->the_post();

        switch (get_post_type()) {
            case 'professor':
                array_push($results['professors'], array(
                    'title' => get_the_title(),
                    'permalink' => get_the_permalink(),
                    'image' => get_the_post_thumbnail_url(0, 'professorLandscape')
                ));
                break;
            default:
                break;
        }
    }

    $results['professors'] = array_values(array_unique($results['professors'], SORT_REGULAR));

    wp_reset_postdata();

    return $results;
}
