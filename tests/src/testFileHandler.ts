"use strict";
import {FileHandler} from "../../src/operations/fileHandler.ts";

import { UnitTest } from "../unitTest.ts";

import fs from "fs";

export class TestFileHandler extends UnitTest {

    mockFilePath(returnValue: string) {
        const original = fs.readFileSync;

        (fs as any).readFileSync = () => returnValue;

        return () => {
            fs.readFileSync = original;
        };
    }

    test_fileHandler_instance() {
        const fileHandler = new FileHandler("/path/to/source", 'utf-8');

        this.assert(fileHandler instanceof FileHandler , "fileHandler instance failed");
    }
    
    test_fileHandler_retrieveFile() {
        const fileHandler = new FileHandler("/path/to/source", "utf-8");
        const mockData = "Mocked output";

        const restore = this.mockFilePath(mockData);

        try {
            this.assertEqual(fileHandler.retriveFile(), mockData, "Failed to retrieve file");
        } finally {
            restore();
        }
    }


    test_fileHandler_retriveFileInLines() {
        const fileHandler = new FileHandler("/path/to/source", "utf-8");
        const mockData = "hello\nworld\nthirdLine"
        const restore = this.mockFilePath(mockData);

        try {
            this.assertEqual(
                fileHandler.retriveFileInLines(),
                ['hello', 'world', 'thirdLine'],
                "Failed to retrive file in lines"
            );
        } finally {
            restore();
        }
    }
}