<?php
get_header();
page_banner(
    array(
        'title' => 'All Campuses',
        'subtitle' => 'We have several conviniently located campuses. '
    )
)
?>

<div class="container container--narrow page-section">
    <div class="acf-map">
        <?php
        while (have_posts()) {
            the_post();
            $mapLocation = get_field('map_location');
        ?>
            <div class="marker" data-lat="<?php echo $mapLocation['lat']; ?>" data-lng="<?php echo $mapLocation['lng']; ?>"></div>
        <?php
        }
        ?>
    </div>
</div>

<?php get_footer(); ?>