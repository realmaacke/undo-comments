"use strict";
import { ContentManipulation } from "../../src/operations/contentManipulation.ts";

import { UnitTest } from "../unitTest.ts";

export class TestContentManipulation extends UnitTest {
    test_contentManipulation_instance() {
        const contentManipulation = new ContentManipulation([]);

        this.assert(contentManipulation instanceof ContentManipulation
            , 'ContentManipulation instance is not of class ContentManipulation'
        )
    }

    test_contentManipulation_filterSingleLines() {
        const contentManipulation = new ContentManipulation([]);
        const res = contentManipulation.filterSingleLines("test//remove this");

        this.assertEqual(res, "test",
            "contentManipulation.filterSingleLines, did not filter single lines"
        );
    }

    test_contentManipulation_filterMultiLines_inline() {
        const input = ["Hello /* comment */ world"];
        const contentManipulation = new ContentManipulation([])

        const res = contentManipulation.filterMultiLines(input);

        this.assertEqual(res, ["Hello  world"], "Inline multiline failed");
    }

    test_contentManipulation_filterMultiLines() {
        const input = [
            "hello /* comment",
            "still comment",
            "end */ world"
        ];
        const contentManipulation = new ContentManipulation([]);
        const result = contentManipulation.filterMultiLines(input);

        this.assertEqual(
            result,
            ["hello ", "", " world"],
            "Multiline comment failed"
        )
    }

    test_contentManipulation_handleContent() {
        const contentManipulation = new ContentManipulation([
            '{',
            '  "name": "test", /* block comment */',
            '  "age": 42, // single line comment',
            '  "active": true',
            '}'
        ]);

        const res = contentManipulation.handleContent();

        this.assertEqual(res , {
            name: "test",
            age: 42,
            active: true
        });
    }
}
