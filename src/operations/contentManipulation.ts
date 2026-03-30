"use strict";

export class ContentManipulation {
    content: string[]|null = null;

    constructor(content: string[]|null = null) {
        this.content = content;
    }

    private assertInitialized(): asserts this is {
        content: string[]
    } {
        if (!this.content) throw new Error("Content is not parsed correctly, expected string[]");
    }

    handleContent(): unknown {
        let manipulatedContent: string[];
        
        this.assertInitialized();

        manipulatedContent = this.filterMultiLines(this.content);

        for (let i: number = 0; i < manipulatedContent.length; i++) {
            manipulatedContent[i] = this.filterSingleLines(manipulatedContent[i]);
        }
        this.content = manipulatedContent;

        return JSON.parse(this.content.join("\n"));
    }

    filterSingleLines(line: string): string {
        let parsedLine: string = line;
        if (line.includes('//')) {
            parsedLine = line.split('//')[0];
        }
        return parsedLine;
    }

    filterMultiLines(lines: string[], isMultiLine: boolean = false, index: number = 0, result: Array<any> = []): Array<any> {
        if (index >= lines.length) {
            return result;
        }

        let line: string = lines[index];
        let parsed: string = "";
        let i: number = 0;

        while (i < line.length) {
        if (!isMultiLine && line.slice(i, i + 2) === "/*") {
            isMultiLine = true;
            i += 2;
            continue;
        }

        if (isMultiLine && line.slice(i, i + 2) === "*/") {
            isMultiLine = false;
            i += 2;
            continue;
        }

        if (!isMultiLine) {
            parsed += line[i];
        }

        i++;
        }

        result.push(parsed);

        return this.filterMultiLines(lines, isMultiLine, index + 1, result);
    }
}