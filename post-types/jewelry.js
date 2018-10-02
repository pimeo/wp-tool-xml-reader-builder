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
    // write_response_logs: true, // write logs in filename
    // output_filename: "otot", // output logs filename
    attributes: [
      "post_id"
      // "post_name",
      // "meta_key/left_image",
      // "meta_key/bottom_image",
      // "meta_key/right_image",
      // "meta_key/right_image",
      // "meta_key/grid_image_for_related",
      // "meta_key/social_media_override",
      // "meta_key/grid_images_0_image",
      // "meta_key/grid_images_1_image",
      // "meta_key/grid_images_2_image",
      // "meta_key/grid_images_3_image",
      // "meta_key/grid_images_4_image",
      // "meta_key/grid_images_5_image",
      // "meta_key/grid_images_6_image",
      // "meta_key/_thumbnail_id"
    ]
  },

  // [BUILDER] before build action
  before_build(builder) {
    
    builder
      .remove_acf_meta_key("exclude_from_diamond_search")
      // .add_attribute("titi")
      .add_acf_meta_key("titi", "", "field_12345678")
      .update_acf_meta_key_key("collection_name", "collection")
      .update_acf_meta_key("collection", null, "field_5ab0f4d2a9e73")
      .add_acf_meta_key("color", "", "field_1234567")
      .replace_attribute("link", "http://oldjeandousset.local/", "https://toto.com/")
      .replace_meta_key("video_link", "https://player.vimeo.com/external/", "https://toto.com/")
      .copy_value_to_key({ type: "attribute", key: "content:encoded" }, { type: "meta_key", key: "titi" })
  
    return builder
  }
}
