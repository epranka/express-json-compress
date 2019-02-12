"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
var zlib_1 = __importDefault(require("zlib"));
module.exports = function (req, res, next) {
    res.compressJson = function (body) {
        var bf = new Buffer(body, "utf-8");
        zlib_1.default.gzip(bf, function (_, result) {
            res.setHeader("Content-Type", "application/json");
            res.setHeader("x-decompressed-content-length", bf.length);
            res.setHeader("Content-Length", result.length);
            res.setHeader("Content-Encoding", "gzip");
            res.end(result);
        });
    };
    next();
};
