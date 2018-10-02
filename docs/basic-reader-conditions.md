# Basic reader with conditions

## Options

- `input_path`: [string] path of post type import xml file.
- `output_filename`: [string] default basename of output file (xml|json) 
- `reader_query_options`: [object] query object configuration
  - `write_response_logs`: [boolean] if set to true, write json response result into `./datas/output/${output_filename}.json` file.
  - `output_filename` [string] custom basename of reader output file (json)
  - `conditions`:
    - `name`: [string] xml key tag
    - `value`: [mixed] custom comparaison value
    - `operator`: [string] *notEqualsTo* or *EqualsTo*
    - `attributes`: [array] array of xml key tag we want only to get
- `builder_query_options`: [object] query object configuration


## Example: 

Get all medias where are not linked to a post from a wp xml post type import file.

```js
module.exports = {
  // [COMMON] input path
  input_path: "./<my_data_tmp_directory>/<my_wp_import_medias_file>.xml",

  // [COMMON] output file
  output_filename: "medias",

  // [READER] query options
  reader_query_options: {
    write_response_logs: true, // write logs in filename
    output_filename: "medias", // output logs filename
    conditions: [
      {
        name: "post_parent",
        value: 0,
        operator: "notEqualsTo",
        attributes: ["post_id", "meta_key/_wp_attached_file", "attachment_url", "post_parent"]
      }
    ]
  },

  // [BUILDER] query options
  // required and must be attributes to parse all contents
  builder_query_options: {}
}
```