/**
 * https://stackoverflow.com/questions/36564293/extract-urls-from-a-string-using-php
 */

module.exports = {
  // [COMMON] input path
  input_path: "./datas/posts/jeandousset.wordpress.2019-05-13.xml",

  // [COMMON] ouput file
  output_filename: "posts",

  // [READER] query options
  reader_query_options: {
    write_response_logs: true, // write logs in filename
    output_filename: "posts", // output logs filename
    attributes: [
      "post_id",
      "post_name",
      // "meta_key/video_link"
      "meta_key/_thumbnail_id"
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

    builder
    
    .add_acf_meta_key("article_contents_group", "", "field_5ae6f221ece4c")
    
    .add_acf_meta_key("article_contents_group_featured_image", "", "field_5ae6f2232b359")
    .copy_value_to_key({ type: "meta_key", key: "_thumbnail_id" }, { type: "meta_key", key: "article_contents_group_featured_image" })

    .add_acf_meta_key("article_contents_group_suptitle", "Stories", "field_5b1542e7fbaf5")
    
    .add_acf_meta_key("article_contents_group_content", "", "field_5ae6f2232b406")
    // .copy_value_to_key({ type: "attribute", key: "content:encoded" }, { type: "meta_key", key: "article_contents_group_content" })
    
    
    .add_acf_meta_key("page_namespace", "blog/single", "field_5a9d78c9abd62")

    // acf meta key
    .remove_acf_meta_key("test")
    .remove_acf_meta_key("video_link")

    // meta key
    .remove_meta_key("_wp_old_slug")
    .update_meta_key("_edit_last", 1)
    
    // replace attribute
    .replace_attribute("link", "jeandousset.com", "jeandousset.local")
    .replace_attribute("guid", "jeandousset.com", "jeandousset.local")
    // .replace_attribute("content:encoded", "jeandousset.com", "jeandousset.local")
    
    // update attribute
    .update_attribute("content:encoded", "")

    .add_category("story-template-news", "Basic Story", "story-template-news", "basic-story")

    return builder
  }
}
