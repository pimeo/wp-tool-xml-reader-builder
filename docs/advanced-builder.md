# Advanced builder

## Options

- `input_path`: [string] path of post type import xml file.
- `output_filename`: [string] default basename of output file (xml|json) 
- `reader_query_options`: [object] query object configuration
- `builder_query_options`: [object] query object configuration
  - `attributes`: [array] array of xml key tag we want only to get
- `before_build(builder)`: [function] can override the WPXMLBuilder class to update xml parsed contents before generating the new wp xml import file. Must returns the builder


## Before build action

You can override the WPXMLBuilder to add/edit/delete/clone keys or attributes before generating the new wp xml import file.

Multiple helper methods are available to simplify the edition of a parsed content. 

WP Meta Keys batch helpers methods
- `add_meta_key(key, value)`
- `update_meta_key(key, value)`
- `replace_meta_key(key, search, replaced_value)`
- `remove_meta_key(key)`
- `update_meta_key_key(old_key, new_key)`

ACF Meta Keys helpers methods
- `add_acf_meta_key(key, value = null, field_id = null)`
- `update_acf_meta_key(key, value = null, field_id = null)`
- `remove_acf_meta_key(key)`
- `update_acf_meta_key_key(old_key, new_key)`

WP Attributes helpers methods
- `add_attribute(key, value)`
- `update_attribute(key, value)`
- `replace_attribute(key, search, replaced_value)`
- `copy_value_to_key(from = {}, to = {})`
- `remove_attribute(key)`

## Example:

Generate a new xml import file into `./datas/builder/${output_filename}.xml` with filtered attributes from a wp xml post type import file.

```js
module.exports = {
  // [COMMON] input path
  input_path: "./<my_data_tmp_directory>/<my_wp_import_post_type_file>.xml",

  // [COMMON] output file (xml file)
  output_filename: "<post_type_slug>",

  // [READER] query options
  reader_query_options: {},

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

      .replace_attribute("link", "my-old-url.local", "my-new-url.local")
      .replace_attribute("guid", "my-old-url.local", "my-new-url.local")

    return builder
  }
}
```