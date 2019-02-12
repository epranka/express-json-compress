import zlib from "zlib";

export = (req, res, next) => {
    res.compressJson = (body: string) => {
        var bf = new Buffer(body, "utf-8");
        zlib.gzip(bf, (_, result) => {
            res.setHeader("Content-Type", "application/json");
            res.setHeader("x-decompressed-content-length", bf.length);
            res.setHeader("Content-Length", result.length);
            res.setHeader("Content-Encoding", "gzip");
            res.end(result);
        });
    };
    next();
};
