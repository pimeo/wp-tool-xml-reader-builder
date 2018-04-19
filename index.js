#!/usr/bin/env node

// external libs
const WPXMLReader = require("./wp-xml-reader")
const ARGV = require("./argv")()

// internal libs
const chalk = require("chalk")
const path = require("path")

// 1. Reader from configuration file
let configuration = null
if (ARGV.postType) {
  try {
    configuration = require(`./post-types/${ARGV.postType}`)
  } catch (err) {
    console.log(chalk.red(`Post Type "${ARGV.postType}" configuration file doesn't exists in post-type directory`), "\n")
  }
}

if( !configuration ) {
  console.log(chalk.red(`Argument post-type is missing in cli command`), "\n")
  process.exit(0);
}

let reader = new WPXMLReader(configuration.input_path)

// 2. Queries
reader.query(configuration.reader_query_options).then(response => {
  console.log(chalk.grey(`*********`))
  console.log(chalk.grey("Query Options:"))
  console.log(chalk.grey(`*********`), "\n")
  console.log(chalk.grey(JSON.stringify(configuration.reader_query_options, null, 2)), "\n")
  
  console.log(chalk.green(`*********`))
  console.log(chalk.green(`Response: (${response.length} items)`))
  console.log(chalk.green(`*********`), "\n")
  console.log(response, "\n")
  console.log(JSON.stringify(response, null, 2), "\n")
})
