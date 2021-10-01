<?php

add_action('rest_api_init', 'universityLikeRoute');
function universityLikeRoute() {
    register_rest_route('university/v1', 'manageLike', array(
        'methods' => 'POST', 
        'callback' => 'createLike'
    ));

    register_rest_route('university/v1', 'manageLike', array(
        'methods' => 'DELETE', 
        'callback' => 'deleteLike'
    ));
}

function createLike($data) {
    $professor = sanitize_text_field($data['professorId']);

    wp_insert_post(array(
        'post_type' => 'like', 
        'post_status' => 'publish', 
        'meta_input' => array(
            'liked_professor_id' => $professor
        )
    ));
}

function deleteLike() {
    return 'delete';
}