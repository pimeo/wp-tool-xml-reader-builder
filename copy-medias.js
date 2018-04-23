#!/usr/bin/env node

// external libs
const fs = require("fs")
const fsExt = require("fs-extra")
const path = require("path")
const when = require("when")

const medias = require("./datas/output/medias.json")
const testimonials = require("./datas/output/testimonials.json")

let source_dir = path.join(
  "/Applications/MAMP/htdocs/old-jean-dousset/wp-content/uploads"
)
let output_dir = path.join("datas", "uploads", "medias")

function copy_media(origin, media) {
  return when.promise((resolve, reject) => {
    let file_dir = media["meta_key/_wp_attached_file"]
    let original_path = path.join(source_dir, file_dir)
    let dest_path = path.join(process.cwd(), output_dir, file_dir)


    if (!fs.existsSync(original_path)) {
      console.log("doesnt exists", original_path)
      return resolve()
    } else {
      // ensure that dir exists
      let dest_dir = path.parse( dest_path ).dir
      fsExt.ensureDirSync(dest_dir)
      console.log( "- COPY ", file_dir  )
      // copy file
      fsExt.copy(original_path, dest_path, err => {
        if (err) {
          return reject(err)
        }
        console.log("- COPIED ", file_dir)
        resolve()
      })
    }
  })
}

// promises
when.reduce(medias, copy_media, []).then(() => {
  console.log("done")
}).catch( err => {
  console.log('ERROR', err)
})
