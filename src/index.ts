"use strict";
import { FileHandler } from "./operations/fileHandler.js";
import { ContentManipulation } from "./operations/contentManipulation.js";

/**
 * Removes comments from a JSON file and parses it.
 *
 * @param {string} path - Path to JSON file
 * @param {BufferEncoding} encoding - File encoding
 * @returns {unknown}
 */
export function undoComment(path: string, encoding: BufferEncoding): unknown {
    const fileHandler: FileHandler = new FileHandler(path, encoding);
    const splitContent: string[] = fileHandler.retriveFileInLines();
    const contentManipulation: ContentManipulation = new ContentManipulation(splitContent);

    let sanitizedData: unknown = contentManipulation.handleContent();
    return sanitizedData;
}
