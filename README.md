## Job Listing Application

- A mobile-friendly web application enabling companies to create, manage, and publish job listings.
- Implements draft functionality for listings, enabling editing, expiration, republishing, and deletion.
- Includes features such as company name, location, salary, experience level, and job type.
- project is integrated into a CI/CD pipeline for automated Docker image creation and publishing using Jenkins.

This program uses:

- React
- Spring Boot
- Postgres
- Axios
- Material UI
- Jenkins
- Docker & Docker Compose

---

### Prerequisites

- In order to run this application with you need to install [Docker](https://docs.docker.com/engine/install/).

- If running locally for development you need to install [Node](https://nodejs.org/en/download), [Postgres](https://www.postgresql.org/download/), [JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html), and [Maven](https://maven.apache.org/download.cgi?.).

---

### Run With Docker

- Before running with Docker ensure that the application.properties file is using the correct Docker url.
- You can view database _testing_ credentials in the Docker compose file to view pgadmin4.
- Once Docker is setup you must pull the images from Docker Hub.

```
$ docker pull clh7090/job-listings-react-frontend:latest
$ docker pull clh7090/job-listings-springboot:latest
```

- You can begin the program in the root directory with:

```
$ docker compose up
```

- The default url is currently http://localhost:3000 for accessing the application.
- Interact with the postgres database at http://localhost:5050.
- Postgres is running on port http://localhost:5432 .
- Spring Boot is running on port http://localhost:8080.

---

### Run locally

- Before running locally ensure that the application.properties file is using the correct Docker url.
- You can view database _testing_ credentials in the application.properties file to connect to pgadmin4.

1. Start up the postgres server.
2. Create a database called "jobs".
3. Begin the springboot server on http://localhost:8080.
4. Start the react server on http://localhost:3000 after installing dependencies using by navigating to the react-frontend folder and using:

```
$ npm i
```

- The default url is currently http://localhost:3000 for accessing the application.
- Postgres is running on port http://localhost:5432 .
- Spring Boot is running on port http://localhost:8080.
