#!/usr/bin/env node

// internal libs
const WPXMLReader = require("./wp-xml-reader")
const WPXMLBuilder = require("./wp-xml-builder")

// external libs
const chalk = require("chalk")
const path = require("path")
const program = require("commander")

// Argument parser
// npm run build -- --post-type testimonial
program
  .version("0.0.1")
  .option("-p --post-type <post-type>", "Post Type Name")
  .parse(process.argv)


let configuration = null
if( program.postType ) {
  try {
    configuration = require( `./post-types/${program.postType}`)
  }catch( err ) {
    console.log(chalk.red(`Post Type "${program.postType}" configuration file doesn't exists in post-type directory`), "\n")
  }
}

// 1. Reader
let file_path = path.join("datas", "oldjeandousset")
let reader = new WPXMLReader(path.join(file_path, configuration.input_file))

// 1.1 Builder
let builder = new WPXMLBuilder()

// 2. Queries
reader.query(configuration.reader_query_options).then(response => {
  console.log(chalk.grey(`*********`))
  console.log(chalk.grey("Query Options:"))
  console.log(chalk.grey(`*********`), "\n")
  console.log(chalk.grey(JSON.stringify(configuration.reader_query_options, null, 2)), "\n")

  console.log(chalk.green(`*********`))
  console.log(chalk.green(`Response: (${response.length} items)`))
  console.log(chalk.green(`*********`), "\n")

  // set contents to builder
  builder.set_contents( reader.mutable_contents )
  // before build hook
  builder = configuration.before_build( builder )

  // build result orignal contents in a xml file following default import structure
  builder.build({ output_filename: configuration.xml_output_file })
  .then(response => {
    console.log("XML file saved")
  })
})
