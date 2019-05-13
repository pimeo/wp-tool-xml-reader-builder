module.exports = {
  // [COMMON] input path
  input_path: "./datas/medias/jeandousset.wordpress.2019-05-13.xml",

  // [COMMON] ouput file
  output_filename: "medias",

  // [READER] query options
  reader_query_options: {
    write_response_logs: true, // write logs in filename
    output_filename: "medias", // output logs filename
    attributes: [
      "post_id",
      "meta_key/_wp_attached_file",
      "attachment_url",
      "post_parent"
    ]
    // conditions: [
    //   {
    //     name: "post_parent",
    //     value: 0,
    //     operator: "notEqualsTo",
    //     attributes: ["post_id", "meta_key/_wp_attached_file", "attachment_url", "post_parent"]
    //   }
    // ]
  },

  // [BUILDER] query options
  // required and must be attributes to parse all contents
  builder_query_options: {
    // attributes: ["post_id"]
    conditions: [
      {
        name: "post_parent",
        value: 0,
        operator: "notEqualsTo",
        attributes: ["post_id", "meta_key/_wp_attached_file", "attachment_url"]
      }
    ]
  },

  // [BUILDER] before build action
  before_build(builder) {
    builder
      .replace_attribute("link", "oldjeandousset.local", "jeandousset.local")
      .replace_attribute("guid", "oldjeandousset.local", "jeandousset.local")

      .replace_attribute(
        "wp:attachment_url",
        "oldjeandousset.local",
        "jeandousset.local"
      )
      // .replace_attribute("wp:attachment_url", /(\d{4})\/(\d{2})/g, "2018/03")

      // .replace_meta_key("_wp_attached_file", /(\d{4})\/(\d{2})/g, "2018/03")

      .replace_meta_key(
        "_wp_attachment_metadata",
        "oldjeandousset.local",
        "jeandousset.local"
      )
    // .replace_meta_key("_wp_attachment_metadata", /(\d{4})\/(\d{2})/, "2018/03")

    // builder
    return builder
  }
}
