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

  get_contents() {
    return this.contents
  }

  get_items(channel_id = 0) {
    if (!this.contents.rss.channel[channel_id]) {
      return []
    }
    return this.contents.rss.channel[channel_id].item
  }

  /**
   * ITEM ONLY
   */

  add_meta_key_for_item(item, key, value) {
    item["wp:postmeta"].push({
      "wp:meta_key": [key],
      "wp:meta_value": [value]
    })
  }

  get_attribute_for_item(item, key) {
    return item[key][0] || null
  }

  get_meta_key_for_item(item, key) {
    let value = ''
    for (let index = 0; index < item["wp:postmeta"].length; index++) {
      const meta_key = item["wp:postmeta"][index];
      if (meta_key["wp:meta_key"].indexOf(key) !== -1) {
        value = meta_key["wp:meta_value"][0]
        break;
      }      
    }
    return value
  }

  update_meta_key_for_item(item, key, value) {
    item["wp:postmeta"].forEach(meta_key => {
      if (meta_key["wp:meta_key"].indexOf(key) !== -1) {
        meta_key["wp:meta_value"] = [value]
      }
    })
  }

  update_attribute_for_item(item, key, value) {
    if (item.hasOwnProperty(key)) {
      item[key] = [value]
    }
  }

  replace_meta_key_for_item(item, key, search, replaced_value) {
    item["wp:postmeta"].forEach(meta_key => {
      if (meta_key["wp:meta_key"].indexOf(key) !== -1) {
        let exp = new RegExp(search, "g")
        let value = meta_key["wp:meta_value"][0].replace(exp, replaced_value)
        meta_key["wp:meta_value"] = [value]
      }
    })
  }

  remove_meta_key_for_item(item, key) {
    item["wp:postmeta"].forEach((meta_key, meta_index) => {
      if (meta_key["wp:meta_key"].indexOf(key) !== -1) {
        item["wp:postmeta"].splice(meta_index, 1)
      }
    })
  }

  /**
   * BULK OF ITEMS
   */

  // meta key
  // { 'wp:meta_key': [ '_yoast_wpseo_linkdex' ], 'wp:meta_value': [ '85' ] }
  add_meta_key(key, value) {
    this.contents.rss.channel[0].item.forEach(item => {
      this.add_meta_key_for_item(item, key, value)
    })
    return this
  }

  update_meta_key(key, value) {
    this.contents.rss.channel[0].item.forEach(item => {
      this.update_meta_key_for_item(item, key, value)
    })
    return this
  }

  replace_meta_key(key, search, replaced_value) {
    this.contents.rss.channel[0].item.forEach(item => {
      this.replace_meta_key_for_item(item, key, search, replaced_value)
    })
    return this
  }

  remove_meta_key(key) {
    this.contents.rss.channel[0].item.forEach(item => {
      this.remove_meta_key_for_item(item, key)
    })
    return this
  }

  update_meta_key_key(old_key, new_key) {
    this.contents.rss.channel[0].item.forEach(item => {
      item["wp:postmeta"].forEach((meta_key, meta_index) => {
        if (meta_key["wp:meta_key"].indexOf(old_key) !== -1) {
          // 1. store value
          let value = meta_key["wp:meta_value"][0]
          // 2. create new entry
          this.add_meta_key_for_item(item, new_key, value)
          // 3. remove old key
          this.remove_meta_key_for_item(item, old_key)
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

  update_acf_meta_key_key(old_key, new_key) {
    // update value key
    this.update_meta_key_key(old_key, new_key)
    // update field id key
    this.update_meta_key_key(`_${old_key}`, `_${new_key}`)
    return this
  }

  // attribute
  // 'wp:status': [ 'publish' ],
  add_attribute(key, value) {
    this.contents.rss.channel[0].item.forEach(item => {
      item[key] = [value]
    })
    return this
  }

  update_attribute(key, value) {
    this.contents.rss.channel[0].item.forEach(item => {
      this.update_attribute_for_item(item, key, value)
    })
    return this
  }

  replace_attribute(key, search, replaced_value) {
    this.contents.rss.channel[0].item.forEach(item => {
      if (item.hasOwnProperty(key)) {
        let exp = new RegExp(search, "g")
        if (typeof item[key][0] === "object") {
          if (item[key][0].hasOwnProperty("_")) {
            item[key][0]["_"] = item[key][0]["_"].replace(exp, replaced_value)
          }
        } else {
          item[key] = [item[key][0].replace(exp, replaced_value)]
        }
      }
    })
    return this
  }

  copy_value_to_key(from, to) {
    // get from_type key value and set to to_type key value.
    // dynamic method to inject datas
    this.contents.rss.channel[0].item.forEach(item => {
      let value = this[`get_${from.type}_for_item`](item, from.key)
      this[`update_${to.type}_for_item`](item, to.key, value)
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

  // categories
  add_category(key, value, domain, nicename) {
    this.contents.rss.channel[0].item.forEach(item => {
      item.category = item.category || []
      let category = {
        _: value,
        '$': {
          domain: domain,
          nicename: nicename
        }
      }
      item.category.push(category)
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
