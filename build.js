#!/usr/bin/env node

// internal libs
const WPXMLReader = require("./wp-xml-reader")
const WPXMLBuilder = require("./wp-xml-builder")
const ARGV = require("./argv")()

// external libs
const chalk = require("chalk")
const path = require("path")

// 1. Reader
let configuration = null
if (ARGV.postType) {
  try {
    configuration = require(`./post-types/${ARGV.postType}`)
  } catch (err) {
    console.log(chalk.red(`Post Type "${ARGV.postType}" configuration file doesn't exists in post-type directory`), "\n")
  }
}

if (!configuration) {
  console.log(chalk.red(`Argument post-type is missing in cli command`), "\n")
  process.exit(0)
}

let reader = new WPXMLReader(configuration.input_path)

// 2. Queries
reader.query(configuration.builder_query_options).then(response => {
  console.log(chalk.grey(`*********`))
  console.log(chalk.grey("Query Options:"))
  console.log(chalk.grey(`*********`), "\n")
  console.log(chalk.grey(JSON.stringify(configuration.builder_query_options, null, 2)), "\n")

  console.log(chalk.green(`*********`))
  console.log(chalk.green(`Response: (${response.length} items)`))
  console.log(chalk.green(`*********`), "\n")

  // 3 Builder
  let builder = new WPXMLBuilder()

  // set contents to builder
  builder.set_contents( reader.mutable_contents )
  // before build hook
  builder = configuration.before_build( builder )

  // build result orignal contents in a xml file following default import structure
  builder.build({ output_filename: configuration.output_filename })
  .then(response => {
    console.log("XML file saved")
  })
})
