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

function createLike() {
    return 'create';
}

function deleteLike() {
    return 'delete';
}