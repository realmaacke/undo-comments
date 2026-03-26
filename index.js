"use strict";
import fs from "fs";

function grabFile(path, encoding) {
    return fs.readFileSync(path, encoding);
}

function removeSingleLines(line) {
    let parsedLine = line;
    if (line.includes('//')) {
        parsedLine = line.split("//")[0];
    }
    return parsedLine;
}

function removeMultiLines(lines, isMultiline = false, index = 0, result = []) {
    if (index >= lines.length) {
        return result;
    }

    let line = lines[index];
    let parsed = "";
    let i = 0;

    while (i < line.length) {
        if (!isMultiline && line.slice(i, i + 2) === "/*") {
            isMultiline = true;
            i += 2;
            continue;
        }

        if (isMultiline && line.slice(i, i + 2) === "*/") {
            isMultiline = false;
            i += 2;
            continue;
        }

        if (!isMultiline) {
            parsed += line[i];
        }

        i++;
    }

    result.push(parsed);

    return removeMultiLines(lines, isMultiline, index + 1, result);
}

/**
 * Removes comments from a JSON file and parses it.
 *
 * @param {string} path - Path to JSON file
 * @param {BufferEncoding} encoding - File encoding
 * @returns {unknown}
 */
export function undoComment(path, encoding) {
    let jsonFile = grabFile(path, encoding);
    const fileInLines = jsonFile.split("\n");

    const withoutMultiline = removeMultiLines(fileInLines);

    for (let i = 0; i < withoutMultiline.length; i++) {
        withoutMultiline[i] = removeSingleLines(withoutMultiline[i]);
    }

    return JSON.parse(withoutMultiline.join("\n"));
}