module.exports = {
  // [COMMON] input path
  input_path: "./datas/oldjeandousset/oldjeandousset.testimonials.2018-04-19.xml",
  
  // [COMMON] ouput file
  output_filename: "testimonials",

  // [READER] query options
  reader_query_options: {
    write_response_logs: true, // write logs in filename
    output_filename: "testimonials", // output logs filename
     attributes: [
      "post_id",
      "post_name",
      "meta_key/testimonial_info"
     ]
  },

  // [BUILDER] query options
  // required and must be attributes to parse all contents
  builder_query_options: {
    attributes: [
      "post_id"
    ]
  },

  // [BUILDER] before build action
  before_build(builder) {
    builder
      // acf meta key
      .update_acf_meta_key_key("testimonial_info", "testimonial_information_group_country")
      .update_acf_meta_key("testimonial_information_group_country", null, "field_5ad8857f73e43")
      .update_acf_meta_key_key("testimonial_image", "testimonial_information_group_image")
      .update_acf_meta_key("testimonial_information_group_image", null, "field_5ad8858773e44")
      .add_acf_meta_key("testimonial_information_group", "", "field_5ad8856c73e42")
      .remove_acf_meta_key("testimonial_carousel_image")
      // meta key
      .remove_meta_key("_wp_old_slug")
      .remove_meta_key("_thumbnail_id")
      .update_meta_key("_edit_last", 1)

      // replace attribute
      .replace_attribute("link", "oldjeandousset.local", "jeandousset.local")
      .replace_attribute("guid", "oldjeandousset.local", "jeandousset.local")
      .replace_attribute("content:encoded", "oldjeandousset.local", "jeandousset.local")
      .replace_attribute("_yoast_wpseo_metadesc", "oldjeandousset.local", "jeandousset.local")

    return builder
  }
}
