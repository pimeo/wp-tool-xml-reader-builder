## WP XML READER AND BUILDER
Created: 03/20/2018
Last update: 10/02/2018
Version: 0.0.1
Description: Can parse a wordpress xml import file and format it into a json file. Can filter by attributes and execute queries with advanced conditions. Can generate a compatible custom wordpress xml import file from with advanced and flexibles settings.

## Copyright and license
Code and documentation released under the MIT license.


## Installation

```sh
git clone https://pimeo@bitbucket.org/pimeo/wp-tool-xml-reader.git
```

```sh
npm i
```


## Reader

A reader lets you to parse the content of a xml file and render it directly into the terminal. 

You can create some custom queries and render only attributes you want to display at screen.

### How to:

- Create a new post type configuration file into `post-types` directory. Please refer to current files located to `post-types` to create your own configuration file.
- Create a custom npm command into package.json `"reader:<post-type-slug>": "npm run start -- --post-type <post-type-slug>"` if you have to used it often else call directly via `npm run start -- --post-type <post-type-slug>` to read a post type import xml file.


## Create a builder

- A builder lets you to create a new xml file from a previous xml file. It is useful in the case of you want to add/update/delete/clone keys tags or/and attributes properties.
- A builder needs to use a reader to parse the content before generating a new configuration. 

- Create a new post type configuration file into `post-types` directory. Please refer to current files located to `post-types` to create your own configuration file.
- Create a custom npm command into package.json `"reader:<post-type-slug>": "npm run start -- --post-type <post-type-slug>"` if you have to used it often else call directly via `npm run start -- --post-type <post-type-slug>` to read a post type import xml file.


## Note

- All configurations to setup a reader and/or a builder of a `post-type-slug` are located to `post-types/<post-type-slug>`.
- In the case of you want to extract only some datas to generate a new configuration file, it is recommended to setup the `reader` objet to speed up the process handler.


## Example of a post type configuration file

Examples at `docs` directory.


## Copy medias 

You can also create custom script to copy all medias from a custom post type directly into a `output` directory.

@TODO create documentation

### Tip: How To extract images from Wordpress

```php
<?php
/**
 * Get all attachment from post id
 * Create this file into wordpress root directory as debug.php.
 * To use it : http://<url>/debug.php?post_id=<POST_ID>
 */

define('WP_USE_THEMES', false);

/** Loads the WordPress Environment and Template */
require( dirname( __FILE__ ) . '/wp-blog-header.php' );

/**
* DEBUG PAGE
*/ 

$post_id = -1;
if (isset($_GET['post_id']) && !empty($_GET['post_id'])) {
  $post_id = $_GET['post_id'];
}

$attachments = get_children(array(
  'post_parent' => $post_id,
  'post_status' => 'inherit',
  'post_type' => 'attachment',
  'post_mime_type' => 'image',
  'order' => 'ASC',
  'orderby' => 'menu_order ID'
));


$output = [];
$index = 0;
// parse attachments
foreach ($attachments as $att_id => $attachment) {
  // _wp_attached_file property
  array_push($output, [
    "image_missing_in_wp_$index" => $attachment->ID,
    // "image_missing_in_wp_$index" => get_post_meta($attachment->ID, '_wp_attached_file', true)
  ]);
  $index++;
}

echo json_encode( $output );
```
