module.exports = {
  // [COMMON] input path
  input_path: "./datas/oldjeandousset/oldjeandousset.jewelries.2018-04-23.xml",

  // [COMMON] ouput file
  output_filename: "jewelries",

  // [READER] query options
  reader_query_options: {
    write_response_logs: true, // write logs in filename
    output_filename: "jewelries", // output logs filename
    attributes: [
      "post_id",
      "post_name"
    ]
  },

  // [BUILDER] query options
  // required and must be attributes to parse all contents
  builder_query_options: {
    attributes: ["post_id"]
  },

  // [BUILDER] before build action
  before_build(builder) {
    return builder
  }
}
