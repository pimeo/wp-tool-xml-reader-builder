# Basic builder

## Options

- `input_path`: [string] path of post type import xml file.
- `output_filename`: [string] default basename of output file (xml|json) 
- `reader_query_options`: [object] query object configuration
- `builder_query_options`: [object] query object configuration
  - `attributes`: [array] array of xml key tag we want only to get


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
  }
}
```