![Concept Screenshot](http://orig00.deviantart.net/85a7/f/2017/083/e/0/home_desktop_concept_by_alaingalvan-db3fp2u.png)

# OpenHID Web Stack

[![License][license-img]][license-url]
[![Unit Tests][travis-img]][travis-url]
[![Coverage Tests][codecov-img]][codecov-url]
[![Dependency Status][david-img]][david-url]
[![devDependency Status][david-dev-img]][david-dev-url]

The OpenHID stack that powers our website and services.

## Apps

- [openhid.com](https://openhid.com) - The official website of the research lab.
- [chat.openhid.com](https://chat.openhid.com) - Our lab's official rocketchat app.

## Architecture

- [Docker](https://hub.docker.com/explore/) - All of our applications are actually containers that communicate with each other via the TCP protocol, this makes them much easier to swap and maintain.
- [Nginx](https://www.nginx.com/resources/wiki/) - Our reverse proxy, configured to route all subapplications. 
- [Node](https://nodejs.org/en/) - The serverside JavaScript engine that powers the majority of our web applications. 
- [MongoDB](https://www.mongodb.com/) - Simple NoSQL database client.
- [RocketChat](https://rocket.chat/) - Our internal chat platform, slightly modified to backup important conversations, avoid duplicate uploads, etc.


[license-img]: http://img.shields.io/:license-mit-blue.svg?style=flat-square
[license-url]: https://opensource.org/licenses/MIT
[david-url]: https://david-dm.org/openhid/openhid.com?path=packages/frontend
[david-img]: https://david-dm.org/openhid/openhid.com.svg?path=packages/frontend&style=flat-square
[david-dev-url]: https://david-dm.org/openhid/openhid.com?path=packages/frontend#info=devDependencies
[david-dev-img]: https://david-dm.org/openhid/openhid.com/dev-status.svg?path=packages/frontend&style=flat-square
[travis-img]: https://img.shields.io/travis/openhid/openhid.com.svg?style=flat-square
[travis-url]:https://travis-ci.org/openhid/openhid.com
[codecov-img]:https://img.shields.io/codecov/c/github/openhid/openhid.com.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/openhid/openhid.com
