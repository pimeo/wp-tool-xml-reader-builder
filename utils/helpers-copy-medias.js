// external libs
const fs = require("fs")
const fsExt = require("fs-extra")
const path = require("path")
const when = require("when")
const chalk = require("chalk")
const request = require("request")

module.exports = {
  medias: [],
  /**
   * Push medias object to the helpers (cache)
   * @param {Array} medias 
   */
  set_medias(medias) {
    this.medias = medias
  },

  /**
   * Detect media from meta key item
   * @param {Object} item Item
   * @param {String} meta_key_id id of meta key
   */
  detect_media_from_item(item, meta_key_id) {
    let item_media_id = item[`meta_key/${meta_key_id}`]
    if (item_media_id == "") return null
    return (
      this.medias.filter(m => {
        return parseInt(m.post_id) == parseInt(item_media_id)
      })[0] || null
    )
  },

  copy_file_from_item(
    item,
    meta_key_id,
    media_path,
    options,
    resolve,
    reject
  ) {
    media_path = path.join(options.source_dir, media_path)

    // ensure file exists
    if (!fs.existsSync(media_path)) {
      console.log(chalk.red(
        `File from item ${item["post_name"]} - ${media_path} not exists`
      ))
      return resolve()
    }

    // extract filename
    let output_filename = path.parse(media_path).base

    // destination path
    let dest_path = path.join(
      process.cwd(),
      options.output_dir,
      item["post_name"],
      meta_key_id,
      output_filename
    )

    // ensure directory exists
    fsExt.ensureDirSync(path.parse(dest_path).dir)

    // copy
    fsExt.copy(media_path, dest_path, err => {
      if (err) return reject(err)
      console.log(chalk.green(
        `File copied for item ${item["post_name"]} - ${media_path}`
      ))
      return resolve()
    })
  },

  copy_media_for_item(item, meta_key_id, options) {
    return when.promise((resolve, reject) => {
      let media = this.detect_media_from_item(item, meta_key_id)
      if (!media) return resolve()
      // copy file if possible
      return this.copy_file_from_item(
        item,
        meta_key_id,
        media["meta_key/_wp_attached_file"],
        options,
        resolve,
        reject
      )
    })
  },

  copy_media_from_attached_post_item(item, options, host) {
    return when.promise( (resolve, reject) => {
      let url = `${host}/debug.php?post_id=${item.post_id}`
      request( url, (error, response, body) => {
        
        // promise maion process
        when
          .reduce(JSON.parse( body ), (origin, media) => {
            // get fetched media key
            let key = Object.keys(media)[0]
            // concat fetched media with current item
            item[`meta_key/${key}`] = media[key]
            // copy file
            return this.copy_media_for_item(item, key, options)
          }, [])
          .then(resolve)
          .catch(reject)
      })
    })
  }
}