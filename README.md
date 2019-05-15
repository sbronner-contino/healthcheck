# Healthcheck Endpoint Service

[![Build Status](https://travis-ci.org/sbronner-contino/healthcheck.svg?branch=master)](https://travis-ci.org/sbronner-contino/healthcheck)
[![Known Vulnerabilities](https://snyk.io/test/github/sbronner-contino/healthcheck/badge.svg?targetFile=package.json)](https://snyk.io/test/github/sbronner-contino/healthcheck?targetFile=package.json)

This is a service to demonstrate a restful endpoint that will tirelessly respond in the affirmative. The service will respond with a json payload containing:

* a description of the service
* the version of the service (defined by the version file)
* the git revision that the service is built from (defined by the revision file)

## Quick Start

To run the latest version, a [docker](https://www.docker.com/get-started) image is available on docker hub:

```bash
docker run -it --rm -p 8888:8888 csbronner/healthcheck
```

Access the healthcheck endpoint via [http://localhost:8888/healthcheck].

## Development Workflow

This project uses the [Git Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow).

Any changes to the application require an issue (to track the requirement), a branch for the change, and a subsequent pull request when the change has been completed and tested.

## Build

To build:

```bash
docker build . -t healthcheck_service
```

Building the docker image performs **linting** and **unit testing** of the code.

Only if the linting and tests passed is the docker image successfully build.

## Continous Integration

For CI, this project uses [https://travis-ci.org](https://travis-ci.org/sbronner-contino/healthcheck).

If the test and integration test jobs complete successfully, and the branch being built is master - the travis-ci deploy job will build, tag and push an image to [https://hub.docker.com](https://cloud.docker.com/repository/docker/csbronner/healthcheck/general).

Two images will be pushed on such a build:
* csbronner/healthcheck:**latest**
* csbronner/healthcheck:**$GIT_REV**

...where $GIT_REV is the first 7 characters of the git sha-1 hash from which the image was built.

## Run

To run:

```bash
docker run --rm -d -p 8888:8888 --name healthcheck healthcheck_service
```

This will expose the service on port 8888.

You should recieve a json payload on the /healthcheck.

## Security Considerations

### Http

The service serves the healthcheck endpoint over http - in a production setting, https is recommended. TLS termination should be provided upstream.

### Authentication and Authorization

This service does not currently require any authentication mechanism - ideally, the endpoint should only be available to authorized clients. An API gateway deployed in front of this service should be considered.

### Security Static Code & Dependency Analysis

Static code analysis tooling should be applied the the codebase, and dependencies should be vetted and continously verified. This codebase is scanned by [https://snyk.io](https://app.snyk.io/org/sbronner-contino/project/2434ff27-aeb0-403c-ad3f-7383b76034af) to detect any vulernabilities in the project dependencies.

### Private NPM Registry

To further reduce risk of compromised dependencies, the use of a self-managed NPM registry should be considered.
