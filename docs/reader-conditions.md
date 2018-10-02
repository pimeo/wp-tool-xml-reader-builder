# Reader conditions

## Options

- `reader_query_options`: [object] query object configuration
  - `write_response_logs`: [boolean] if set to true, write json response result into `./datas/output/${output_filename}.json` file.
  - `output_filename` [string] custom basename of reader output file (json)
  - `row_index`: [Integer] can select a custom item index. Only one result will be display at the end of the process
  - `conditions`:
    - `name`: [string] xml key tag
    - `value`: [mixed] custom comparaison value
    - `operator`: [string] *notEqualsTo* or *EqualsTo*
    - `attributes`: [array] array of xml key tag we want only to get


## Example 1

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
    // row_index: 0 // get a specific entry
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

## Example 2

Look if the first entry of the wp xml post type import file is not linked to a post.

```js
module.exports = {
  // [COMMON] input path
  input_path: "./<my_data_tmp_directory>/<my_wp_import_medias_file>.xml",

  // [COMMON] output file
  output_filename: "<post_type_slug>",

  // [READER] query options
  reader_query_options: {
    row_index: 0 // get a specific entry
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

## Example 3

Look if the first entry of the wp xml post type import file is not linked to a post.

Get all post types items where status post is `draft`. Return only an array of `post_name`. 

```js
module.exports = {
  // [COMMON] input path
  input_path: "./<my_data_tmp_directory>/<my_wp_import_medias_file>.xml",

  // [COMMON] output file
  output_filename: "<post_type_slug>",

  // [READER] query options
  reader_query_options: {
    conditions: [
      {
        name: "status",
        value: "draft",
        attributes: ["post_name"]
      }
    ]
  },

  // [BUILDER] query options
  // required and must be attributes to parse all contents
  builder_query_options: {}
}
```

## Example 4

Return post(s) where post title is equal to "Haley".
If exists, Return title, post_name and the `nicename` category attribute and the `collection_type` category attribute.

```js
module.exports = {
  // [COMMON] input path
  input_path: "./<my_data_tmp_directory>/<my_wp_import_medias_file>.xml",

  // [COMMON] output file
  output_filename: "<post_type_slug>",

  // [READER] query options
  reader_query_options: {
    conditions: [
      {
        name: "title",
        value: "Haley",
        attributes: [
          "title",
          "post_name",
          "category/nicename",
          "category/collection_type"
        ]
      }
    ]
  },

  // [BUILDER] query options
  // required and must be attributes to parse all contents
  builder_query_options: {}
}
```

## Example 5

Search by meta key id and meta key value. (1/4)

```js
module.exports = {
  // [COMMON] input path
  input_path: "./<my_data_tmp_directory>/<my_wp_import_medias_file>.xml",

  // [COMMON] output file
  output_filename: "<post_type_slug>",

  // [READER] query options
  reader_query_options: {
    conditions: [
      {
        name: "category/title",
        value: "4 Carats",
        attributes: ["title", "category"]
      }
    ]
  },

  // [BUILDER] query options
  // required and must be attributes to parse all contents
  builder_query_options: {}
}
```

## Example 6

Search by meta key id and meta key value. (2/4)

```js
module.exports = {
  // [COMMON] input path
  input_path: "./<my_data_tmp_directory>/<my_wp_import_medias_file>.xml",

  // [COMMON] output file
  output_filename: "<post_type_slug>",

  // [READER] query options
  reader_query_options: {
    conditions: [
      {
        name: "category/domain",
        value: "metal",
        attributes: ["title", "category/nicename"]
      }
    ]
  },

  // [BUILDER] query options
  // required and must be attributes to parse all contents
  builder_query_options: {}
}
```

## Example 7

Search by meta key id and meta key value. (3/4)

```js
module.exports = {
  // [COMMON] input path
  input_path: "./<my_data_tmp_directory>/<my_wp_import_medias_file>.xml",

  // [COMMON] output file
  output_filename: "<post_type_slug>",

  // [READER] query options
  reader_query_options: {
    conditions: [
      {
        name: "category/nicename",
        value: "platinum-white-gold",
        attributes: ["title", "category/metal/nicename"]
      }
    ]
  },

  // [BUILDER] query options
  // required and must be attributes to parse all contents
  builder_query_options: {}
}
```

## Example 8

Search by meta key id and meta key value. (4/4)

```js
module.exports = {
  // [COMMON] input path
  input_path: "./<my_data_tmp_directory>/<my_wp_import_medias_file>.xml",

  // [COMMON] output file
  output_filename: "<post_type_slug>",

  // [READER] query options
  reader_query_options: {
    conditions: [
      {
        name: "meta_key/_yoast_wpseo_focuskw",
        value: "Chelsea Band",
        attributes: [
          "title",
          "meta_key/_yoast_wpseo_focuskw",
          "meta_key/_yoast_wpseo_linkdex"
        ]
      }
    ]
  },

  // [BUILDER] query options
  // required and must be attributes to parse all contents
  builder_query_options: {}
}
```