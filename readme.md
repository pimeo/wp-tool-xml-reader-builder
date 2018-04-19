## WP XML READER

Last update: 03/27/2018
Version: 0.0.1

## Copyright and license
Code and documentation released under the MIT license.

```javascript
let query_options = {
  // row_index: 0,
  conditions: [
    // attribute condition #1 : search by attribute key id and atribute key value
    {
      name: "status",
      value: "draft",
      attributes: ["post_name"]
    },
    // {
    //   value: "Haley",
      // attributes: [
    //     "title",
    //     "post_name",
    //     "category/nicename",
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
      // attributes: [
        // "title",
        // "post_id",
        // "post_name",
        // "category/collection-type",
        // "status",
        // "post_name"
      // ]
    // }
  ],
  // attribute : attribute mappings item or items if no conditions applied
  attributes: [
    // "title",
    // "post_id",
    // "post_name",
    // "category/collection_type/nicename",
    // "status",
    // "title",
    //   "post_name",
    //   "status",
    //   "post_id",
    // "meta_key/_yoast_wpseo_metadesc",
    // "meta_key/grid_images_per_design",
    // "meta_key/grid_images_per_design|unserialize",
    // "meta_key/all_tagged_images_meta|unserialize",
    // "meta_key/all_tagged_images_meta",
    // "meta_key/_yoast_wpseo_metadesc",
    // "category/metal/nicename",
  ]
}
```