module.exports = {
  // [COMMON] input path
  input_path:
    "./datas/oldjeandousset/oldjeandousset.custom-rings.2018-04-24.xml",

  // [COMMON] ouput file
  output_filename: "custom-rings",

  // [READER] query options
  reader_query_options: {
    write_response_logs: true, // write logs in filename
    output_filename: "custom-rings", // output logs filename
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
    return builder
  }
}
