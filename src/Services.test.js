// Tests for the services module
const fs = require("fs");

const test_version = "test-version";
const test_revision = "test-revision";

const Services = require('./Services.js');

function del(filename) {
    try {
        fs.unlinkSync(filename);
    } catch (e) {
        // Don't care.
    }
}

function writeFile(filename, content) {
    fs.writeFileSync(filename, content);
}

function generatePackageJson(versionValue) {
    writeFile("package.json", JSON.stringify({"version": versionValue}));
}

// The Tests!
describe('Test the service object ', () => {
    test('unknown is returned when there is no no revision file present', () => {
        del('revision');
        expect(new Services().determineRevision()).toEqual("unknown");
    });
    test('unknown is returned when there is no version file present', () => {
        del('package.json');
        expect(new Services().determineVersion()).toEqual("unknown");
    });
    test('check that valid revision value is returned when revision file is present', () => {
        writeFile("revision", test_revision);
        expect(new Services().determineRevision()).toEqual(test_revision);
    });
    test('check that valid version value is returned when version file is present', () => {
        generatePackageJson(test_version);
        expect(new Services().determineVersion()).toEqual(test_version);
    });

});
