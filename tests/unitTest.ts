"use strict";

export class UnitTest{
    assertEqual(actual: unknown, expected: unknown, message: string = "Assertion failed"): void {
        if (actual === expected) return;

        const parsedActual = JSON.stringify(actual);
        const parsedExpected = JSON.stringify(expected);

        if (parsedActual !== parsedExpected) {
            throw new Error(`\nExpected: ${expected}\n Received: ${actual}\n Message: ${message}`);
        }
    }

    assert(condition: boolean, message: string = "Assertion failed"): void {
        if (!condition) throw new Error(message);
    }

    executeTests(): number {
        const methods: string[] = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
            .filter(name => name.startsWith("test_"));
    
        let failedTests: number = 0;

        for (const individualMethod of methods) {
            try {
                const fn = this[individualMethod as keyof this];

                if (typeof fn !== "function") {
                    throw new Error(`${individualMethod} is not a function`);
                }

                fn.call(this);

                console.log(`PASS ${this.constructor.name}.${individualMethod}`);
            } catch (error) {
                failedTests += 1;
                console.error(`Fail ${this.constructor.name}.${individualMethod}`);
                console.error(error);
            }
        }
        return failedTests;
    }
}