module.exports = {
  // [COMMON] input path
  input_path: "./datas/oldjeandousset/oldjeandousset.diamonds.2018-04-24.xml",

  // [COMMON] ouput file
  output_filename: "diamonds",

  // [READER] query options
  reader_query_options: {
    write_response_logs: true, // write logs in filename
    output_filename: "diamonds", // output logs filename
    attributes: [
      "post_id",
      "post_name",
      "meta_key/video_still_image",
    ]
  },

  // [BUILDER] query options
  // required and must be attributes to parse all contents
  builder_query_options: {
    attributes: [
      "post_id",
      "meta_key/video_still_image",
    ]
  },

  // [BUILDER] before build action
  before_build(builder) {
    return builder
  }
}
