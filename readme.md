## Wordpress xml to json export tool
- Created at: 03/20/2018
- Updated at: 01/12/2019
- Version: 0.1.0
- Description: Can parse a wordpress xml import file and format it response into a json file. Can filter by attributes and execute queries with advanced conditions. Can generate a compatible custom wordpress xml import file from with advanced and flexibles settings.

## Copyright and license
Code and documentation released under the MIT license.

## Installation

```sh
git clone https://github.com/pimeo/wp-tool-xml-reader-builder
```

```sh
npm i
```

## Notes
- The script supports ACF fields format.
- Please go to the `docs/*.md` to read additional information and tips to learn how to use this project.


## Important
- The project has not been deeply tested during its creation. It has been used to migrate a massive import xml wp files to json representations with successfully. But it might be occurred errors if you have very specific use cases that I didn't have encountered.
- This project does not need to be maintained. Feel free to create a pull request if you detect any bugs.

## Reader

A reader lets you to parse the content of a xml file and render it directly into the terminal. 

You can create some custom queries and render only attributes you want to display at screen.

### How to:

- Create a new post type configuration file into `post-types` directory. Please refer to current files located to `post-types` to create your own configuration file.
- Create a custom npm command into package.json `"reader:<post-type-slug>": "npm run start -- --post-type <post-type-slug>"` if you have to used it often else call directly via `npm run start -- --post-type <post-type-slug>` to read a post type import xml file.

### Basic usage: create a script to extract attached medias according to post items json file
```js
// file located at ./post-types/media.json
// in this file, you can also run `npm run start -- --post-type media` to get information or `npm run build -- --post-type media` to render information with custom changes and preformatted values.

// posts come from a custom reader/builder script file using the same configuration
const posts = require("<PATH/TO/POST_TYPE_EXPORTED>.json")

// get all posts id having a non null _thumbnail_id
const posts_ids = posts
  .filter((post) => {return post["meta_key/_thumbnail_id"] != null})
  .map((post) => {return post["meta_key/_thumbnail_id"]})


module.exports = {
  // [COMMON] input path
  input_path: "<PATH/TO/WP_XML_EXPORT_MEDIAS_FILE>.xml",

  // [COMMON] ouput file
  output_filename: "medias",

  // [READER] query options
  reader_query_options: {
    write_response_logs: true, // write logs in filename
    output_filename: "medias", // output logs filename
    conditions: [
      {
        name: "post_id",
        value: posts_ids,
        attributes: [
          "post_id", 
          "meta_key/_wp_attached_file", 
          "attachment_url"
        ]
      }
    ]
  },

  // [BUILDER] query options
  // required and must be attributes to parse all contents
  builder_query_options: {
    write_response_logs: true, // write logs in filename
    output_filename: "medias", // output logs filename
    conditions: [
      {
        name: "post_id",
        value: posts_ids,
        attributes: [
          "post_id", 
          "meta_key/_wp_attached_file", 
          "attachment_url"
        ]
      }
    ]
  },

  // [BUILDER] before build action
  before_build(builder) {
    const old_url = "my-old-domain.com"
    const new_url = "my-new-domain.com"

    builder
      .replace_attribute("link", old_url, new_url)
      .replace_attribute("guid", old_url, new_url)
      .replace_attribute("wp:attachment_url", old_url, new_url )

      // .replace_attribute("wp:attachment_url", /(\d{4})\/(\d{2})/g, "2018/03")
      // .replace_meta_key("_wp_attached_file", /(\d{4})\/(\d{2})/g, "2018/03")
      // .replace_meta_key("_wp_attachment_metadata", /(\d{4})\/(\d{2})/, "2018/03")

      .replace_meta_key( "_wp_attachment_metadata", old_url, new_url )

    // builder
    return builder
  }
}
```

### Basic usage: Export a basic json file of 
```js
// file located at ./post-types/my-post-type.json
// in this file, you can also run `npm run start -- --post-type my-post-type` to get information or `npm run build -- --post-type my-post-type` to render information with custom changes and preformatted values.


module.exports = {
  // [COMMON] input path
  input_path: "<PATH/TO/WP_XML_EXPORT_MY_POST_TYPE_FILE>.xml",

  // [COMMON] ouput file
  output_filename: "<MY_POST_TYPE_FILENAME>",

  // [READER] query options
  reader_query_options: {
    write_response_logs: true, // write logs in filename
    output_filename: "<MY_POST_TYPE_FILENAME>", // output logs filename
    attributes: [
      "post_id",
      "post_name",
      "meta_key/video_ad_category", // custom meta field `video_ad_category` in my custom post type
    ]
  },

  // [BUILDER] query options
  // required and must be attributes to parse all contents
  builder_query_options: {
    write_response_logs: true,
    attributes: [
      "post_id",
      "meta_key/video_ad_category",
    ]
  },

  // [BUILDER] before build action
  before_build(builder) {
    return builder
  }
}
```

### Advanced usage: build a json file with many changes 
```js
// file located at ./post-types/my-complex-post-type.json
// in this file, you can also run `npm run start -- --post-type my-complex-post-type` to get information or `npm run build -- --post-type my-complex-post-type` to render information with custom changes and preformatted values.

module.exports = {
  // [COMMON] input path
  input_path: "<PATH/TO/WP_XML_EXPORT_MY_COMPLEX_POST_TYPE_FILE>.xml",

  // [COMMON] ouput file
  output_filename: "<MY_COMPLEX_POST_TYPE_FILENAME>",

  // [READER] query options
  reader_query_options: {
    write_response_logs: true, // write logs in filename
    output_filename: "<MY_COMPLEX_POST_TYPE_FILENAME>", // output logs filename
    attributes: [
      "post_id",
      "post_name"
    ]
  },

  // [BUILDER] query options
  // required and must be attributes to parse all contents
  builder_query_options: {
    attributes: [
      "post_id",
      "post_name",
      "meta_key/custom_top_banner",
      "meta_key/custom_inspiration_image",
      "meta_key/custom_detail_images_0_custom_detail_image",
      "meta_key/custom_detail_images_1_custom_detail_image",
      "meta_key/custom_inspiration_image_left",
      "meta_key/custom_inspiration_image_right",
      "meta_key/inquiry_form_image",
    ]
  },

  // [BUILDER] before build action
  before_build(builder) {
    const old_url = "my-old-domain.com"
    const new_url = "my-new-domain.com"

    builder
      .remove_acf_meta_key("custom_top_banner")
      .remove_acf_meta_key("custom_detail_images")
      .remove_acf_meta_key("custom_inspiration_image")
      .remove_acf_meta_key("inspiration_text")
      .remove_acf_meta_key("custom_detail_images_0_custom_detail_image")
      .remove_acf_meta_key("custom_detail_images_1_custom_detail_image")
      .remove_acf_meta_key("inspiration_image_layout")
      .remove_acf_meta_key("custom_inspiration_image_left")
      .remove_acf_meta_key("custom_inspiration_image_right")
      .remove_acf_meta_key("inquiry_form_image")
      .remove_acf_meta_key("design_price")

      .add_acf_meta_key("product_details_group", null, "field_5ab0f379b941d")
      .add_acf_meta_key("product_featured_group", null, "field_5ab0f28ab9419")
      .add_acf_meta_key("page_namespace", "product-high-jewelries", "field_5a9d78c9abd62")
      .add_acf_meta_key("product_featured_group_category", "Custom Ring Design", "field_5ab0f302b941b")

      .add_acf_meta_key("product_details_group_description", null, "field_5ab0f3d0b941f")
      .copy_value_to_key({ type: "attribute", key: "content:encoded" }, { type: "meta_key", key: "product_details_group_description" })
      .update_attribute("content:encoded", "", null)

      .update_acf_meta_key_key("video_link", "product_featured_group_product_video_url")
      .update_acf_meta_key("product_featured_group_product_video_url", null, "field_5ab0f4d2a9e73")

      .replace_attribute("link", old_url, new_url)
      .replace_attribute("guid", old_url, new_url)

    return builder
  }
}
```

#### Example of commands to run

```sh
# Read posts
npm run start -- --post-type post

# Read medias
npm run start -- --post-type media
```

### Example of output
```jsonc
// export posts with only post_id, post_name, title and meta_key thumbnail
[
  {
    "post_id": "233",
    "post_name": "this-is-my-post-one",
    "title": "This is my post one",
    "meta_key/_thumbnail_id": "310"
  },
  {
    "post_id": "252",
    "post_name": "an-other-post-in-my-blog",
    "title": "An other post in my blog",
    "meta_key/_thumbnail_id": "308"
  }
]
```

## Create a builder

- A builder lets you to create a new xml file from a previous xml file. It is useful in the case of you want to add/update/delete/clone keys tags or/and attributes properties.
- A builder needs to use a reader to parse the content before generating a new configuration. 

- Create a new post type configuration file into `post-types` directory. Please refer to current files located to `post-types` to create your own configuration file.
- Create a custom npm command into package.json `"reader:<post-type-slug>": "npm run start -- --post-type <post-type-slug>"` if you have to used it often else call directly via `npm run start -- --post-type <post-type-slug>` to read a post type import xml file.

### Builder methods
- `add_meta_key_for_item(item, key, value)`
- `get_attribute_for_item(item, key)`
- `get_meta_key_for_item(item, key)`
- `update_meta_key_for_item(item, key, value)`
- `update_attribute_for_item(item, key, value)`
- `replace_meta_key_for_item(item, key, search, replaced_value)`
- `remove_meta_key_for_item(item, key)`
- `add_meta_key(key, value)`
- `update_meta_key(key, value)`
- `replace_meta_key(key, search, replaced_value)`
- `remove_meta_key(key)`
- `update_meta_key_key(old_key, new_key)`
- `add_acf_meta_key(key, value = null, field_id = null)`
- `update_acf_meta_key(key, value = null, field_id = null)`
- `remove_acf_meta_key(key)`
- `update_acf_meta_key_key(old_key, new_key)`
- `add_attribute(key, value)`
- `update_attribute(key, value)`
- `replace_attribute(key, search, replaced_value)`
- `copy_value_to_key(from, to)`
- `remove_attribute(key)`
- `add_category(key, value, domain, nicename)`

More information in `./wp-xml-builder.js` file.

### Example
```sh
# Build a json file from posts
npm run build -- --post-type post

# Build a json file from medias
npm run build -- --post-type media
```

## Note

- All configurations to setup a reader and/or a builder of a `post-type-slug` are located to `post-types/<post-type-slug>`.
- In the case of you want to extract only some datas to generate a new configuration file, it is recommended to setup the `reader` objet to speed up the process handler.


## Example of a post type configuration file

Examples at `docs` directory.


## Copy medias 

You can also create custom script to copy all medias from a custom post type directly into a `output` directory.


### 1. Create a debug php file at the project directory root

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


### 2. Create a js file at ./copy-medias directory. It will copy all medias according to posts and medias json file

```js
#!/usr/bin/env node

// external libs
const path = require("path")
const when = require("when")

// internal libs
const helpers = require("./../utils/helpers-copy-medias")

// get json datas
const medias = require("./../datas/output/medias.json")
const items = require("./../datas/output/posts.json")

// settings
const options = {
  source_dir: path.join(
    "<PATH/TO/WP-CONTENT/UPLOADS_DIR>"
  ),
  output_dir: path.join("datas", "uploads", "posts-medias"),
  count_items: 0
}

// hydrate helpers
helpers.set_medias(medias)

// promise details callback (recursive method)
function copy_item_medias(origin, item) {
  return when.promise((resolve, reject) => {
    when
      .all([
        // copy medias from information provided by <PROTOCOL>://<HOSTNAME>.<DOMAIN>/debug.php?post={$item->ID}
        helpers.copy_media_from_attached_post_item( item, options, '<PROTOCOL>://<HOSTNAME>.<DOMAIN>' )
      ])
      .then(() => {
        options.count_items++
        resolve()
      })
      .catch(reject)
  })
}

// promise maion process
when
  .reduce(items, copy_item_medias, [])
  .then(() => {
    console.log("done", options.count_items)
  })
  .catch(err => {
    console.log("ERROR", err)
  })
```

### 3. Run the script

```sh
node copy-medias/post.js
```

## Todolist
- [] Improve documentation
- [] Add unit tests
