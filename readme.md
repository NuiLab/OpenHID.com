# OpenHID Web Stack

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