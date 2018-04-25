module.exports = {
  // [COMMON] input path
  input_path: "./datas/oldjeandousset/oldjeandousset.jewelries.2018-04-23.xml",

  // [COMMON] ouput file
  output_filename: "jewelries",

  // [READER] query options
  reader_query_options: {
    write_response_logs: true, // write logs in filename
    output_filename: "jewelries", // output logs filename
    // conditions: [
      // {
        // name: "category/nicename",
        // value: "earrings",
        // operator: "equalsTo",
        attributes: [
          "post_id",
          "post_name",
          "meta_key/left_image",
          "meta_key/bottom_image",
          "meta_key/right_image",
          "meta_key/right_image",
          "meta_key/grid_image_for_related",
          "meta_key/social_media_override",
          "meta_key/grid_images_0_image",
          "meta_key/grid_images_1_image",
          "meta_key/grid_images_2_image",
          "meta_key/grid_images_3_image",
          "meta_key/grid_images_4_image",
          "meta_key/grid_images_5_image",
          "meta_key/grid_images_6_image",
          "meta_key/_thumbnail_id"
        ]
      // }
    // ]
  },

  // [BUILDER] query options
  // required and must be attributes to parse all contents
  builder_query_options: {
    attributes: [
      "post_id",
      "post_name",
      "meta_key/left_image",
      "meta_key/bottom_image",
      "meta_key/right_image",
      "meta_key/right_image",
      "meta_key/grid_image_for_related",
      "meta_key/social_media_override",
      "meta_key/grid_images_0_image",
      "meta_key/grid_images_1_image",
      "meta_key/grid_images_2_image",
      "meta_key/grid_images_3_image",
      "meta_key/grid_images_4_image",
      "meta_key/grid_images_5_image",
      "meta_key/grid_images_6_image",
      "meta_key/_thumbnail_id"
    ]
  },

  // [BUILDER] before build action
  before_build(builder) {
    return builder
  }
}
