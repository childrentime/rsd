

let FlatList = null;

if (__PLATFORM__ === "h5") {
  FlatList = require('./index.web').default;
} else {
  FlatList = require('./index.native').default;
}

export default FlatList;