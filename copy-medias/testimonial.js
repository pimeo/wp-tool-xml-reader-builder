#!/usr/bin/env node

// external libs
const fs = require("fs")
const fsExt = require("fs-extra")
const path = require("path")
const when = require("when")

const medias = require("./../datas/output/medias.json")
const testimonials = require("./../datas/output/testimonials.json")

let source_dir = path.join(
  "/Applications/MAMP/htdocs/old-jean-dousset/wp-content/uploads"
)
let output_dir = path.join("datas", "uploads", "testimonials-medias")
let count_testimonails = 0
let testimonials_ids = []

function copy_media(origin, media) {
  return when.promise((resolve, reject) => {
    let file_dir = media["meta_key/_wp_attached_file"]
    let media_post_parent_id = media["post_parent"]

    let original_path = path.join(source_dir, file_dir)
    // let dest_path = path.join(process.cwd(), output_dir)


    if (!fs.existsSync(original_path)) {
      console.log("doesnt exists", original_path)
      return resolve()
    } else {

      // link testimonials with medias uploads
      let found = testimonials.filter( t => {
        return t.post_id == media_post_parent_id
      })[0] || null

      if( found ) {
        console.log('FOUND for', found["post_name"])
        
        // if( testimonials_ids.indexOf( parseInt(found["post_id"]) ) == -1 ) {
        //   testimonials_ids.push( parseInt( found["post_id"] ) )
        //   count_testimonails++
        // } else {
        //   console.log('DOUBLON for ', found["post_name"])
        // }
        
        let output_filename = path.parse( file_dir ).base

        // ensure that dir exists
        let dest_path = path.join(process.cwd(), output_dir, found["post_name"], output_filename)
        // console.log(dest_path)
        let dest_dir = path.parse( dest_path ).dir
        fsExt.ensureDirSync(dest_dir)
        
        fsExt.copy(original_path, dest_path, err => {
          if (err) {
            return reject(err)
          }
          console.log("- COPIED ", file_dir)
          resolve()
        })

      } else {
        resolve()
      }

      // resolve()
      // // ensure that dir exists
      // let dest_dir = path.parse( dest_path ).dir
      // fsExt.ensureDirSync(dest_dir)
      // console.log( "- COPY ", file_dir  )
      // // copy file
      // fsExt.copy(original_path, dest_path, err => {
      //   if (err) {
      //     return reject(err)
      //   }
      //   console.log("- COPIED ", file_dir)
      //   resolve()
      // })
    }
  })
}

// promises
when.reduce(medias, copy_media, []).then(() => {
  console.log("done", count_testimonails)
}).catch( err => {
  console.log('ERROR', err)
})
