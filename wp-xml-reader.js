// external libs
const fs = require("fs")
const path = require("path")
const xml2js = require("xml2js").parseString
const when = require("when")

// internal libs
const helpers = require("./helpers")

class WPXMLReader {
  constructor(file) {
    this.file = file
    // original parsed contents
    this.original_contents = null
    // final contents
    this.contents = this.get_file()
    // final parsed contents (keep original structure)
    this.mutable_contents = null
  }

  query(options = {}) {
    return when.promise((resolve, reject) => {
      this.parse_xml()
        .then(data => {
          let result = this.extract(data, options)
          resolve(result)
        })
        .catch(reject)
    })
  }

  get_file() {
    let file_path = path.join(process.cwd(), this.file)
    return fs.readFileSync(file_path, { encoding: "utf-8" })
  }

  parse_xml() {
    return when.promise((resolve, reject) => {
      xml2js(this.contents, { trim: true }, (err, result) => {
        return err ? reject(err) : resolve(result)
      })
    })
  }

  extract_item(item, options) {
    // conditions
    if (options.conditions.length) {
      let result = this.extract_item_conditions(item, options)
      this.push_to_mutable_contents_if_possible(result, item)
      return result
    }
    // attributes
    if (options.attributes.length) {
      let result = this.extract_item_attributes(item, options)
      this.push_to_mutable_contents_if_possible(result, item)
      return result
    }

    // default item value
    return {}
  }

  push_to_mutable_contents_if_possible(response, original_item) {
    if (Object.keys(response).length > 0) {
      // keep only one original reference
      this.mutable_contents.rss.channel[0].item.push(original_item)
    }
  }

  extract_item_conditions(item, options) {
    let result = {}
    options.conditions.forEach(condition => {
      const type = helpers.get_condition_type_for_key(condition.name)
      let value = helpers[`get_result_from_${type}_condition`](item, condition)
      if (value !== null) {
        // attributes filters
        if (condition.attributes && condition.attributes.length) {
          result = this.extract_item_attributes(value, condition)
        } else {
          result = value
        }
      }
    })
    return result
  }

  extract_item_attributes(item, options) {
    let result = {}
    options.attributes.forEach(attribute => {
      const attribute_type = helpers.get_attribute_type_for_key(attribute)
      result[attribute] = helpers[`get_${attribute_type}_value_from_key`](
        item,
        attribute
      )
    })
    return result
  }

  extract(data, options) {
    // default options
    options = Object.assign(
      {},
      { row_index: null, attributes: [], conditions: [] },
      options
    )

    // immutable snapshot of original parsed contents
    this.original_contents = JSON.parse(JSON.stringify(data))

    // mutable snapshot of original parsed contents
    this.mutable_contents = JSON.parse(JSON.stringify(data))
    // cleanup all items to keep only root elements
    this.mutable_contents.rss.channel[0].item = []

    // take care of first channel only
    const channel = data.rss.channel[0]
    let response = []

    // item row index position
    if (options.row_index !== null) {
      // response with row_index
      response = this.extract_item(channel.item[options.row_index], options)
      return [response]
    }

    // extract all items
    channel.item.forEach(item => {
      response.push(this.extract_item(item, options))
    })

    // response
    response = response.filter(r => {
      return Object.keys(r).length > 0
    })

    // write response
    if (options.write_response_logs === true) {
      this.write(response, options.response_logs_filename)
    }

    return response
  }

  write(response, filename = "response") {
    let output_path_file = path.join(
      "datas",
      "output",
      [filename, "json"].join(".")
    )
    fs.writeFile(output_path_file, JSON.stringify(response, null, 2), err => {
      if (err) throw err
      console.log("The file has been saved!")
    })
  }
}

module.exports = WPXMLReader
