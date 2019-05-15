// Integration Tests for the healthcheck endpoint
const fetch = require('node-fetch');

const base_url = "http://localhost:8888/";

function checkResponseContent(data) {
    var payload = data.myApplication[0];
    return payload.hasOwnProperty("version")
        && payload.hasOwnProperty("description")
        && payload.hasOwnProperty("revision");
}

// The Tests!
describe('Test the healthcheck endpoint', () => {
    test('404 is returned when no valid endpoint can be found', done => {
        function callback(response) {
            expect(response.status).toEqual(404);
            done();
        }
        fetch(base_url).then(callback);
    });
    test('200 is returned when the endpoint is found', done => {
        function callback(response) {
            expect(response.status).toEqual(200);
            done();
        }
        fetch(base_url + "healthcheck").then(callback);
    });
    test('check that valid healthcheck payload is returned', done => {
        function callback(response) {
            expect(checkResponseContent(response)).toBeTruthy();
            done();
        }
        fetch(base_url + "healthcheck").then(response => {
            response.json().then(callback);
        });
    });
});
