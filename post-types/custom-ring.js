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

    builder
      .remove_acf_meta_key("custom_top_banner")
      .remove_acf_meta_key("custom_detail_images")
      .remove_acf_meta_key("custom_inspiration_image")
      .remove_acf_meta_key("inspiration_text")
      .remove_acf_meta_key("custom_detail_images_0_custom_detail_image")
      .remove_acf_meta_key("custom_detail_images_1_custom_detail_image")
      .remove_acf_meta_key("inspiration_image_layout")
      .remove_acf_meta_key("custom_inspiration_image_left")
      .remove_acf_meta_key("custom_inspiration_image_right")
      .remove_acf_meta_key("inquiry_form_image")
      .remove_acf_meta_key("design_price")

      .add_acf_meta_key("product_details_group", null, "field_5ab0f379b941d")
      .add_acf_meta_key("product_featured_group", null, "field_5ab0f28ab9419")
      .add_acf_meta_key("page_namespace", "product-high-jewelries", "field_5a9d78c9abd62")
      .add_acf_meta_key("product_featured_group_category", "Custom Ring Design", "field_5ab0f302b941b")

      .add_acf_meta_key("product_details_group_description", null, "field_5ab0f3d0b941f")
      .copy_value_to_key({ type: "attribute", key: "content:encoded" }, { type: "meta_key", key: "product_details_group_description" })
      .update_attribute("content:encoded", "", null)

      .update_acf_meta_key_key("video_link", "product_featured_group_product_video_url")
      .update_acf_meta_key("product_featured_group_product_video_url", null, "field_5ab0f4d2a9e73")

      .replace_attribute("link", "oldjeandousset.local", "jeandousset.local")
      .replace_attribute("guid", "oldjeandousset.local", "jeandousset.local")

    return builder
  }
}
