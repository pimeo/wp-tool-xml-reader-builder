// external libs
const fs = require("fs")
const path = require("path")
const xml2js = require("xml2js")
const when = require("when")

class WPXMLBuilder {
  constructor() {
    this.contents = {}
  }

  set_contents(contents) {
    this.contents = contents
  }

  // meta key
  // { 'wp:meta_key': [ '_yoast_wpseo_linkdex' ], 'wp:meta_value': [ '85' ] }
  add_meta_key(key, value) {
    this.contents.rss.channel[0].item.forEach(item => {
      item["wp:postmeta"].push({
        "wp:meta_key": [key],
        "wp:meta_value": [value]
      })
    })
    return this
  }

  update_meta_key(key, value) {
    this.contents.rss.channel[0].item.forEach(item => {
      item["wp:postmeta"].forEach(meta_key => {
        if (meta_key["wp:meta_key"].indexOf(key) !== -1) {
          meta_key["wp:meta_value"] = [value]
        }
      })
    })
    return this
  }

  remove_meta_key(key) {
    this.contents.rss.channel[0].item.forEach(item => {
      item["wp:postmeta"].forEach((meta_key, meta_index) => {
        if (meta_key["wp:meta_key"].indexOf(key) !== -1) {
          item["wp:postmeta"].splice(meta_index, 1)
        }
      })
    })
    return this
  }

  update_meta_key_key(oldKey, newKey) {
    this.contents.rss.channel[0].item.forEach(item => {
      item["wp:postmeta"].forEach((meta_key, meta_index) => {
        if (meta_key["wp:meta_key"].indexOf(oldKey) !== -1) {
          // 1. store value
          let value = meta_key["wp:meta_value"][0]
          // 2. create new entry
          this.add_meta_key(newKey, value)
          // 3. remove old key
          this.remove_meta_key(oldKey)
        }
      })
    })
    return this
  }

  // acf meta key
  // { 'wp:meta_key': [ 'testimonial_info' ], 'wp:meta_value': [ 'Ohio' ] }
  // { 'wp:meta_key': [ '_testimonial_info' ], 'wp:meta_value': [ 'field_5195b6bcd95d7' ] }
  add_acf_meta_key(key, value = null, field_id = null) {
    // update value
    this.add_meta_key(key, value)
    // update field id
    this.add_meta_key(`_${key}`, field_id)
    return this
  }

  update_acf_meta_key(key, value = null, field_id = null) {
    // update value
    if (value !== null) {
      this.update_meta_key(key, value)
    }
    // update field id
    if (field_id !== null) {
      this.update_meta_key(`_${key}`, field_id)
    }
    return this
  }

  remove_acf_meta_key(key) {
    // remove value
    this.remove_meta_key(key)
    // remove field id
    this.remove_meta_key(`_${key}`)
    return this
  }

  update_acf_meta_key_key( oldKey, newKey ) {
    // update value key
    this.update_meta_key_key( oldKey, newKey )
    // update field id key
    this.update_meta_key_key(`_${oldKey}`, `_${newKey}`)
    return this
  }

  // attribute
  // 'wp:status': [ 'publish' ],
  add_attribute(key, value) {
    this.contents.rss.channel[0].item.forEach(item => {
      item[key] = value
    })
    return this
  }

  update_attribute(key, value) {
    this.contents.rss.channel[0].item.forEach(item => {
      if (item.hasOwnProperty(key)) {
        item[key] = value
      }
    })
    return this
  }

  remove_attribute(key) {
    this.contents.rss.channel[0].item.forEach((item, item_index) => {
      if (item.hasOwnProperty(key)) {
        delete item[key]
      }
    })
    return this
  }

  build(options) {
    return when.promise((resolve, reject) => {
      // js object to xml content
      let response = this.to_xml(this.contents)
      // write to xml file
      if (options.output_filename && options.output_filename !== "") {
        this.write(response, options.output_filename)
      }
      resolve(response)
    })
  }

  to_xml(contents, options) {
    let builder = new xml2js.Builder({ cdata: true })
    return builder.buildObject(contents)
  }

  write(response, filename = "response") {
    let output_path_file = path.join(
      "datas",
      "builder",
      [filename, "xml"].join(".")
    )
    fs.writeFile(output_path_file, response, err => {
      if (err) throw err
      console.log("The file has been saved!")
    })
  }
}

module.exports = WPXMLBuilder
