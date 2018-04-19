// external libs
const WPXMLReader = require("./wp-xml-reader")
const WPXMLBuilder = require("./wp-xml-builder")

// internal libs
const chalk = require("chalk")

const path = require("path")

// 1. Reader
let file_path = path.join("datas", "oldjeandousset")
let filename = "oldjeandousset.testimonials.2018-04-19.xml"
let reader = new WPXMLReader(path.join(file_path, filename))

// 1.1 Builder
let builder = new WPXMLBuilder()

// 2. Queries
let query_options = {
  // write_response_logs: true,
  // response_logs_filename: "testimonials",
  // row_index: 0,
  conditions: [
    {
      name: "post_id",
      value: "393"
    }
  ]
  // attribute : attribute mappings item or items if no conditions applied
  // attributes: [
  //   "post_id",
  //   "post_name",
  //   "meta_key/testimonial_image",
  //   "meta_key/testimonial_carousel_image"
  // ]
}

reader.query(query_options).then(response => {
  console.log(chalk.grey(`*********`))
  console.log(chalk.grey("Query Options:"))
  console.log(chalk.grey(`*********`), "\n")
  console.log(chalk.grey(JSON.stringify(query_options, null, 2)), "\n")

  console.log(chalk.green(`*********`))
  console.log(chalk.green(`Response: (${response.length} items)`))
  console.log(chalk.green(`*********`), "\n")

  // make modifications
  builder.set_contents( reader.mutable_contents )
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

    // build result orignal contents in a xml file following default import structure
    builder.build({ output_filename: "testimonials" })
    .then(response => {
      console.log("XML file saved")
    })
})
