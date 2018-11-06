# Basic reader

## Options

- `input_path`: [string] path of post type import xml file.
- `output_filename`: [string] default basename of output file (xml|json) 
- `reader_query_options`: [object] query object configuration
  - `write_response_logs`: [boolean] if set to true, write json response result into `./datas/output/${output_filename}.json` file.
  - `output_filename` [string] custom basename of reader output file (json)
  - `attributes`: [array] array of xml key tag we want only to get
  - `attributes_exceptions`: [array] array of attribute keys we don't want to prefix with "wp:"
- `builder_query_options`: [object] query object configuration


## Example 1:

List and write only post_id and post_name of a post type xml import file.

```js
module.exports = {
  // [COMMON] input path
  input_path: "./<my_data_tmp_directory>/<my_wp_import_post_type_file>.xml",

  // [COMMON] output file (xml file)
  output_filename: "<post_type_slug>",

  // [READER] query options
  reader_query_options: {
    write_response_logs: true, // write logs in filename
    output_filename: "<post_type_slug>", // output logs filename
    attributes: [
      "post_id",
      "post_name",
    ]
  },

  // [BUILDER] query options
  // required and must be attributes to parse all contents
  builder_query_options: {}
}
```

## Example 1:

List and write attributes from a xml file other than wp xml file.

```js
module.exports = {
  // [COMMON] input path
  input_path: "./<my_data_tmp_directory>/<my_xml_import_file>.xml",

  // [COMMON] output file (xml file)
  output_filename: "<my_output_basename>",

  // [READER] query options
  reader_query_options: {
    write_response_logs: true, // write logs in filename
    output_filename: "<my_output_basename>", // output logs filename
    attributes: [
      "title",
      "guid",
      "itunes:author",
      "itunes:duration",
      "pubDate"
    ],
    attributes_exceptions: [
      "itunes:author",
      "itunes:duration",
      "pubDate"
    ]
  },

  // [BUILDER] query options
  // required and must be attributes to parse all contents
  builder_query_options: {}
}
```