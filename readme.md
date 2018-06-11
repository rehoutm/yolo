
# YOLO API

[![Build Status](https://travis-ci.org/rehoutm/yolo.svg?branch=master)](https://travis-ci.org/rehoutm/yolo)

## Overview

This is a Node.js application, using Node.js 8.11.2 and NPM 6.1.0.

Project uses two DB stores.
 - Firebase for user data
 - MongoDB for user accounts.

## Usage, purpose

Application provides a REST API exposing backend functions for cross-platform AddressBook applications. API is designed following REST standards.

API is [well documented](https://yoyolo.docs.apiary.io/#) using API Blueprint standard.

## Installation

### Prerequisites
Download and install Node.js and NPM. Depending on the system, it may be also required to install build utils for argon2 library. See [project documentation](https://github.com/ranisalt/node-argon2#before-installing).

### Project setup

Clone the project and install packages
```bash
$ git clone git@github.com:rehoutm/yolo.git
$ cd yolo
$ npm install
```
Copy the sample .env file

```bash
$ cp .env.example .env
```
Edit the `.env` and set proper values.
Read [Google Instructions](https://firebase.google.com/docs/admin/setup) on how to get the service account config file. Base64 encode the file, e.g.: 
```bash
$ base64 firebase-service-account.json
```
Use the output for `FB_ACC` in `.env` file.

Finally compile TypeScript and run app.

```bash
$ npm run build
$ npm run start
```
Optionally, it is possible to run TSLint and unit tests.
```bash
$ npm run lint
$ npm run test
```

## CI Setup

When required, the project is ready for a CI/CD solution utilizing TravisCI and Heroku.

Setup accounts for both Heroku and TravisCI, install TravisCI CLI tools.

Follow the [instructions](https://docs.travis-ci.com/user/deployment/heroku/) to integrate both service, easiest way is to run the setup tool `travis setup heroku`.

Last thing to do is to set up ENV variables in Heroku. This is easily done via [Heroku dashboard](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard). The variables needed are defined by the local `.env` file.

# Bottom line, development notes

## How it went, glitches, problems

- First pick for user accounts storage was [NeDB](https://github.com/louischatriot/nedb), in the end it didn't really work with Heroku. Changed to MongoDB.
- Unit tests - tried various frameworks for mocking, in the end [sinon](https://github.com/sinonjs/sinon) was most straightforward.
- Unit tests - I did not try to do some crazy code coverage with the tests, rather tried to exercise different scenarios of unit testing.
- Coming from .NET world, where DI/IoC is a thing, I am still not convinced whether the module way is any better.
- All the options of how to write stuff (in Java/C#, nearly everything is basically a class, an object, grouped in namespaces and defined by interfaces) seems a bit overwhelming.
	- Some things works better than other, in the I found testability may be the biggest factor in how to export/init stuff.
	- Maybe, if testability is the real subject, DI may come to play even for Node.js apps.
- TypeScript makes some things better (basically, stuff is more likely to work, if it compiles - which is a nice thing, coming from the MSBuild world of C#).
- But TypeScript also makes some things worse, by increasing the complexity/options of exporting/importing modules.
	- Whether to export a class, or a function, instance... And then there is namespace... and module... declare, export...
	- I would be happy to discuss this kind of complexity with some Node.js pro, as it really does not seem, that there is a best practice, or a bad practice, as anything basically works, which is as well a good thing, as it is a bad thing.
	- Oh and then I found out about `export default` being considered a bad practice, but on the other hand, being fine when used for some stuff...
- NPM
	- For a simple project, using just a few basic libraries the number of packages (most of the being dependencies) is HUGE.
	- Also there is like a hundred different packages for the same functionality. Seems that everyone is like "oh, I can do that better", instead of trying to improve some high quality packages.
	- And they even state it on github... so many readme.md's starting with "why is it better than XYZ"
	- That is a shame, as it really does not support the principles of OSS.
