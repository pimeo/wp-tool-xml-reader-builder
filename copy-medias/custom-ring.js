#!/usr/bin/env node

// external libs
const path = require("path")
const when = require("when")

// internal libs
const helpers = require("./../utils/helpers-copy-medias")

// datas
const medias = require("./../datas/output/medias.json")
const items = require("./../datas/output/custom-rings.json")

// settings
const options = {
  source_dir: path.join(
    "/Applications/MAMP/htdocs/old-jean-dousset/wp-content/uploads"
  ),
  output_dir: path.join("datas", "uploads", "custom-rings-medias"),
  count_items: 0
}

// hydrate helpers
helpers.set_medias( medias )

// promise details callback
function copy_item_medias(origin, item) {
  return when.promise((resolve, reject) => {
    when
      .all([
        // copy from extracted post_types/<post_type>.json file

        // helpers.copy_media_for_item(item, "custom_top_banner", options),
        // helpers.copy_media_for_item(item, "left_image", options),
        // helpers.copy_media_for_item(item, "bottom_image", options),
        // helpers.copy_media_for_item(item, "right_image", options),
        // helpers.copy_media_for_item(item, "right_image", options),
        // helpers.copy_media_for_item(item, "grid_image_for_related", options),
        // helpers.copy_media_for_item(item, "social_media_override", options),
        // helpers.copy_media_for_item(item, "grid_images_0_image", options),
        // helpers.copy_media_for_item(item, "grid_images_1_image", options),
        // helpers.copy_media_for_item(item, "grid_images_2_image", options),
        // helpers.copy_media_for_item(item, "grid_images_3_image", options),
        // helpers.copy_media_for_item(item, "grid_images_4_image", options),
        // helpers.copy_media_for_item(item, "grid_images_5_image", options),
        // helpers.copy_media_for_item(item, "grid_images_6_image", options),
        // helpers.copy_media_for_item(item, "_thumbnail_id", options),

        // copy from http://oldjeandousset.local/debug?post={$item->ID}
        
        // helpers.copy_media_from_attached_post_item( item, options )
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
