module.exports = {
  attributes_exceptions: [
    "title",
    "link",
    "pubDate",
    "dc:creator",
    "guid",
    "description",
    "content:encoded",
    "excerpt:encoded",
    "category"
  ],

  filters: [
    { snippet: 'unserialize', method: 'unserialize_php' }
  ],

  string_value_from_array_if_possible( arr, filter = null ) {
    let value = Array.isArray(arr) && arr.length == 1 && typeof arr[0] === "string"
      ? arr[0]
      : arr

    if( filter ) {
      let action = this.filters.filter( f => f.snippet == filter )[0] || null
      if( action ) {
        value = this[action['method']]( value )
      }
    }
    return value
  },

  unserialize_php( str ) {
    const php = require('./unserialize-php-js.js')
    return php( str )
  },

  get_type_for_key(key) {
    // default: attribute
    let type = "attribute"
    // meta_key type
    type = key.match(/^(?:wp:)?meta_key/gi) !== null ? "meta_key" : type
    // category type
    type = key.match(/^(?:wp:)?category/gi) !== null ? "category" : type
    return type
  },

  get_attribute_type_for_key(key) {
    return this.get_type_for_key(key)
  },

  get_condition_type_for_key(key) {
    return this.get_type_for_key(key)
  },

  // get wp:meta_key value of wp:postmeta array or object
  get_meta_key_value_from_key(item, key) {
    if (!key || !item) return null

    // use only attribute that we need for this method.
    // can be channel item object or array or meta
    if (item.hasOwnProperty("wp:postmeta")) {
      item = item["wp:postmeta"]
    }

    // detect filter
    let filter = null
    if( key.indexOf('|') > -1 ) {
      filter = key.split('|')[1]
      // remove filter from key
      key = key.split('|').shift()
    }

    // detect if key has a namespace
    // and just retrieve the last item
    key = key.indexOf("/") > -1 ? key.split("/").pop() : key

    let result = null
    if (Array.isArray(item)) {
      // array of items
      item.forEach(postmeta => {
        if (postmeta["wp:meta_key"].indexOf(key) > -1) {
          result = this.string_value_from_array_if_possible( postmeta["wp:meta_value"], filter )
        }
      })
    } else {
      // item object
      if (item["wp:meta_key"].indexOf(key) > -1) {
        result = this.string_value_from_array_if_possible( item["wp:meta_value"], filter )
      }
    }
    return result
  },

  // get value of wp:<atttribute>
  get_attribute_value_from_key(item, key) {
    if (!key || !item) return null
    let result = null

    if (
      this.attributes_exceptions.indexOf(key) == -1 &&
      key.match(/^wp:/gi) === null
    ) {
      key = `wp:${key}`
    }

    if (Array.isArray(item)) {
      item.forEach(attribute => {
        if (attribute[key].indexOf(key) > -1) {
          result = attribute[key]
        }
      })
    } else {
      if (item.hasOwnProperty(key)) {
        result = this.string_value_from_array_if_possible(item[key])
      }
    }
    return result
  },


  // ## all categories filter
  // category
  // category/title
  // category/nicename
  // category/domain

  // ## specific category filter
  // category/<category_domain>
  // category/<category_domain>/title
  // category/<category_domain>/nicename
  // category/<category_domain>/domain
  get_category_value_from_key(item, key) {
    if (!key || !item) return null
    let result = []
    
    if( item.hasOwnProperty( 'category' ) ) {
      item = item['category']
    }

    // detect if key has an hierarchical entry
    if( key.indexOf( "/" ) > -1 ) {
      key = key.split("/")
      key.shift()
    }
    
    if (Array.isArray(item)) {
      item.forEach(category => {
        if( Array.isArray( key ) ) {
          // use only know object keys available in category object
          if (category["$"].hasOwnProperty(key[0])) {
            result.push(this.string_value_from_array_if_possible(category["$"][key[0]]))
          } else {
            // compare domain with custom key given and return category key id
            if( category['$']['domain'] == key[0] ) {
              if( category['$'].hasOwnProperty( key[1] ) ) {
                result.push(this.string_value_from_array_if_possible(category["$"][key[1]]))
              } else {
                result.push(this.string_value_from_array_if_possible(category["_"]))      
              }
            }
          }
        } else {
          // get category title 
          result.push(this.string_value_from_array_if_possible(category["_"])) 
        }
      })
    }
    return result
  },

  get_result_from_meta_key_condition(item, condition) {
    let value

    // detect if key has deep
    if( condition.name.indexOf('/') > -1 ) {
      let key = condition.name.split('/').pop()
      // condition: get meta_key by key id and key value
      value = this.get_meta_key_value_from_key(item, key) == condition.value ? item : null
    } else {
      // condition: get meta_key by key id
      value = this.get_meta_key_value_from_key(item, condition.value) !== null ? item : null
    }
    return value
  },

  get_result_from_category_condition(item, condition) {
    // define operator
    condition.operator = condition.operator ? condition.operator : "equalsTo"
    // retrieve value of condition
    let value = this.get_category_value_from_key(item, condition.name)
    
    if( condition.operator == "notEqualsTo" ) {
      return value.indexOf(condition.value) == -1 ? item : null  
    }

    // default operator "equalsTo" condition
    return value.indexOf(condition.value) > -1 ? item : null
  },

  get_result_from_attribute_condition(item, condition) {
    // define operator
    condition.operator = condition.operator ? condition.operator : "equalsTo"
    // retrieve value of condition
    let value = this.get_attribute_value_from_key(item, condition.name)
  
    if( condition.operator == "notEqualsTo" ) {
      return condition.value != value ? item : null
    }
    // default operator "equalsTo" condition
    return condition.value == value ? item : null
  },
}
