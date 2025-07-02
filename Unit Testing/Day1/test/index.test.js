import { capitalizeText, createArray } from "../index.js"
import * as chai from "chai";
let { assert, expect } = chai;

describe("Check capatalize and throw", () => {
    it("Capetalaize", () => {
        expect(capitalizeText("JAMEELA")).to.equal("JAMEELA");
        // capitalizeText("Jameela").should.equal("JAMEELA");
        // assert.equal(capitalizeText("Jameela"), "JAMEELA");
    })

    it("check throw", () => {
        expect(() => capitalizeText()).to.throw(TypeError, "parameter should be string");
        (() => capitalizeText()).should.thraow(TypeError, "parameter should be string");
        assert.throws(() => capitalizeText(), "parameter should be string");
    })
})


// *******************

describe("createArray test", () => {
    it("return array", () => {
        expect(createArray(3)).to.be.an("array");
    });

    it("return array of length 3 and include 1", () => {
        const arr = createArray(3);
        assert.lengthOf(arr, 3);
        assert.include(arr, 1);
    });

    it("should include 2", () => {
        createArray(5).should.include(2);
    });

    it("delayed test by 5 seconds", (done) => {
        setTimeout(() => {
            expect(createArray(2)).to.deep.equal([0, 1]);
            done();
        }, 5000);
    });

    it("should throw error if input is negative");
});
