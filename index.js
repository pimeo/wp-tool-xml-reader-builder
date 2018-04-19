// external libs
const WPXMLReader = require("./wp-xml-reader")

// internal libs
const chalk = require("chalk")

const path = require("path")

// 1. Reader
let file_path = path.join("datas", "oldjeandousset")
let filename = "oldjeandousset.testimonials.2018-04-19.xml"
let reader = new WPXMLReader( path.join( file_path, filename ) )

// 2. Queries
let query_options = {
  write_response_logs: true,
  response_logs_filename: "testimonials",
  // row_index: 0,
  conditions: [],
  // attribute : attribute mappings item or items if no conditions applied
  attributes: [
  "post_id",
  "post_name",
  "meta_key/testimonial_image",
  "meta_key/testimonial_carousel_image"
  ]
}

reader.query(query_options).then(response => {
  console.log(chalk.grey(`*********`))
  console.log(chalk.grey("Query Options:"))
  console.log(chalk.grey(`*********`), "\n")
  console.log(chalk.grey(JSON.stringify(query_options, null, 2)), "\n")
  
  console.log(chalk.green(`*********`))
  console.log(chalk.green(`Response: (${response.length} items)`))
  console.log(chalk.green(`*********`), "\n")
  // console.log(response, "\n")
  // console.log(JSON.stringify(response, null, 2), "\n")
})
