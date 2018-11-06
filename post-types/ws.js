module.exports = {
  // [COMMON] input path
  input_path: "./sources/ws/xml-1-2.xml",

  // [COMMON] ouput file
  output_filename: "ws",

  // [READER] query options
  reader_query_options: {
    write_response_logs: true, // write logs in filename
    output_filename: "ws", // output logs filename
    attributes: [
      "title",
      "category",
      "itunes:duration",
      "itunes:author",
      "guid",
      "description",
      "enclosure"
    ],
    attributes_exceptions: [
      "itunes:duration",
      "itunes:author"
    ],
  }
}
