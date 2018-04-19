const program = require("commander")
module.exports = function() {
  // Argument parser
  // npm run build -- --post-type testimonial
  // npm start -- -p testimonial
  program
    .version("0.0.1")
    .option("-p --post-type <post-type>", "Post Type Name")
    .parse(process.argv)
  return program
}