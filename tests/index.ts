"use strict"
import fs from "fs";

/**
* Dynamic Test loader.
* Rules to load:
*   - Must have tests as suffix
*   - Test class must be exported
*   - Test class must extend UnitTest
*/

const currentDir = import.meta.dirname;
const testPath = currentDir + "/src";
const files = fs.readdirSync(testPath);
let failedSuites = 0;

for (const file of files) {
    if (!file.startsWith("test")) {
        continue;
    }

    const mod = await import(`./src/${file}`);

    for (const moduleFunctions of Object.values(mod)) {
        if (typeof moduleFunctions === "function") {
            
            const instance = new (moduleFunctions as any)();

            if (typeof instance.executeTests === "function") {
                failedSuites += instance.executeTests();
            }
        }

    }
}

if (failedSuites > 0) {
    process.exit(1);
}

console.log("All tests have passed");

process.exit(0);