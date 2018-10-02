#!/usr/bin/env node

// external libs
const path = require("path")
const when = require("when")

// internal libs
const helpers = require("./../utils/helpers-copy-medias")

// datas
const medias = require("./../datas/output/medias.json")
const items = require("./../datas/output/posts.json")

// settings
const options = {
  source_dir: path.join(
    "/Applications/MAMP/htdocs/old-jean-dousset/wp-content/uploads"
  ),
  output_dir: path.join("datas", "uploads", "posts-medias"),
  count_items: 0
}

// hydrate helpers
helpers.set_medias(medias)

// promise details callback
function copy_item_medias(origin, item) {
  return when.promise((resolve, reject) => {
    when
      .all([
        // copy from http://oldjeandousset.local/debug?post={$item->ID}
        helpers.copy_media_from_attached_post_item( item, options )
      ])
      .then(() => {
        options.count_items++
        resolve()
      })
      .catch(reject)
  })
}

// promise maion process
when
  .reduce(items, copy_item_medias, [])
  .then(() => {
    console.log("done", options.count_items)
  })
  .catch(err => {
    console.log("ERROR", err)
  })
