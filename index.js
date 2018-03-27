// external libs
const WPXMLReader = require("./wp-xml-reader")

// internal libs
const chalk = require("chalk")

// 1. Reader
let file = "../jeandousset.wordpress.2018-03-22.xml"
let reader = new WPXMLReader(file)

// 2. Queries
let query_options = {
  // row_index: 0,
  conditions: [
    // attribute condition #1 : search by attribute key id and atribute key value
    // {
    //   name: "title",
    //   value: "Haley",
    //   attributes: [
    //     "title",
    //     "post_name",
    //     "category",
    //     "category/collection_type"
    //   ]
    // }
    // category condition #1 : search by meta key id and meta key value
    // {
    //   name: "category/title",
    //   value: "4 Carats",
    //   attributes: ["title", "category"]
    // },
    // category condition #2 : search by meta key id and meta key value
    // {
    //   name: "category/domain",
    //   value: "metal",
    //   attributes: ["title", "category/nicename"]
    // },
    // category condition #3 : search by meta key id and meta key value
    // {
    //   name: "category/nicename",
    //   value: "platinum-white-gold",
    //   attributes: ["title", "category/metal/nicename"]
    // }
    // meta_key condition #1 : search by meta key id and meta key value
    // {
    //   name: "meta_key/_yoast_wpseo_focuskw",
    //   value: "Chelsea Band",
    //   attributes: [
    //     "title",
    //     "meta_key/_yoast_wpseo_focuskw",
    //     "meta_key/_yoast_wpseo_linkdex"
    //   ]
    // }
    // meta_key condition #1 : search by attribute key id and atribute key value
    // {
    //   name: "meta_key",
    //   value: "grid_images_per_design",
    //   attributes: [
    //     // "category/carat",
    //     // "title",
    //     // "post_name"
    //   ]
    // }
  ],
  // attribute : attribute mappings item or items if no conditions applied
  attributes: [
    "title"
    //   "post_name",
    //   "status",
    //   "post_id",
    // "meta_key/_yoast_wpseo_metadesc",
    // "category/metal/nicename",
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
  console.log(JSON.stringify(response, null, 2), "\n")
})
