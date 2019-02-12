# express-json-compress

Module gzip's json data and sends decompressed content length by headers

```
npm install --save express-json-compressor
```

or

```
yarn install express-json-compressor
```

### Import module

```js
const jsonCompress = require("express-json-compress");
```

or

```js
import * as jsonCompress from "express-json-compress";
```

### Why ?

This compressor creates response header _x-decompressed-content-length_, which helps to calculate ajax download progress in client side. Check example below.

**Important**

Disable or filter out other compressors for json data.

## Example

### Server side

```js
const express = require("express");
const app = express();
const jsonCompress = require("express-json-compress");

app.use(jsonCompress); // add json compress middleware

app.get("/api", function(req, res) {
    var jsonObject = { foo: "bar" };
    var jsonString = JSON.stringify(jsonObject);
    // send compressed json data with header
    res.compressJson(jsonString);
});

app.listen(3000, function() {
    console.log("Example app listening on port 3000!");
});
```

### Client side

```js
var req = new XMLHttpRequest();
req.onprogress = updateProgress;
req.open("GET", "/api", true);

req.onprogress = function(event) {
    var contentLength;
    if (e.lengthComputable) {
        contentLength = e.total;
    } else {
        contentLength = e.target.getResponseHeader(
            "x-decompressed-content-length"
        );
    }
    if (!contentLength) return;
    var progress = (e.loaded / contentLength) * 100.0;
    //use progress in percentage
    //...
};

req.onreadystatechange = function(event) {
    //....
};

req.send();
```

### Author

Edvinas pranka

[@epranka](https://twitter.com/epranka)

https://www.kodmina.lt

# License

The MIT License (MIT)

Copyright (c) 2019 Edvinas Pranka

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
