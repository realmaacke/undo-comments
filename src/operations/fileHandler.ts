"use strict";
import fs from "fs";

export class FileHandler {
    path: string|null = null;
    encoding: BufferEncoding|null = null;

    constructor(path: string, encoding: BufferEncoding) {
        this.path = path;
        this.encoding = encoding;
    }

    private assertInitialized(): asserts this is {
        path: string,
        encoding: BufferEncoding
    } {
        if (!this.path) throw new Error("Path is not set");
        if (!this.encoding) throw new Error("Encoding is not set");
    }

    retriveFile() {
        this.assertInitialized();
        return fs.readFileSync(this.path, this.encoding);
    }

    retriveFileInLines() {
        this.assertInitialized();
        return fs.readFileSync(this.path, this.encoding).split("\n");
    }
}