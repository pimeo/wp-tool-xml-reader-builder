/**
 * https://stackoverflow.com/questions/36564293/extract-urls-from-a-string-using-php
 */

module.exports = {
  // [COMMON] input path
  input_path: "./datas/oldjeandousset/oldjeandousset.posts.2018-04-24.xml",

  // [COMMON] ouput file
  output_filename: "posts",

  // [READER] query options
  reader_query_options: {
    write_response_logs: true, // write logs in filename
    output_filename: "posts", // output logs filename
    attributes: [
      "post_id",
      "post_name",
    ]
  },

  // [BUILDER] query options
  // required and must be attributes to parse all contents
  builder_query_options: {
    attributes: [
      "post_id",
    ]
  },

  // [BUILDER] before build action
  before_build(builder) {
    return builder
  }
}
