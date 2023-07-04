# Project 1: Shared shopping list

This project is a web application that is used as a shared shopping list.

Address link : <https://shopping-lists-nantes.fly.dev/>

## Architecture and description

The application follows a three-tier architecture consisting of a client, server, and database. It also utilizes a layered architecture with four layers: views, controllers, services, and the database.

        C:.
        │   docker-compose.yml
        │   README.md
        │
        ├───e2e-playwright
        │   │   Dockerfile
        │   │   package.json
        │   │   playwright.config.js
        │   │
        │   └───tests
        │           hello-world.spec.js
        │
        ├───flyway
        │   └───sql
        │           V1___initial_schema.sql
        │
        └───shopping-lists
            │   app.js
            │   deps.js
            │   Dockerfile
            │
            ├───controllers
            │       listController.js
            │       shoppingListItemController.js
            │       statisticsController.js
            │
            ├───database
            │       database.js
            │
            ├───services
            │       listService.js
            │       shoppingListItemService.js
            │
            ├───utils
            │       requestUtils.js
            │
            └───views
                │   home.eta
                │   list.eta
                │   lists.eta
                │
                └───layouts
                        layout.eta

### The client-side

<p>The client-side views are stored in the views folder and include the following files:</p>

<p>'home.eta': main page with the application statistics.<br>
'lists.eta': page managing all the shopping lists.<br>
'list.eta': the list page managing list items.</p>

<p>The pages uses the same layout in "layouts/layout.eta". The layout is using the CDN bootstrap.</p>

### The server-side

There is a controller for each page:

listController.js<br>
shoppingListItemController.js<br>
statisticsController.js

The controllers are requesting services for lists or items from the shopping lists while the services are querying to the database:

listService.js<br>
shoppingListItemService.js

### The database

The application uses a postgresql database version 14.1. The initial schemas are located in the flyway/sql folder.

### The tests

There is currently 8 tests for the application and use playwright.<br>
  ✓  1  Page is showing with correct titles (417ms)<br>
  ✓  2 Can create a list (404ms)<br>
  ✓  3 Show a newly created list (446ms)<br>
  ✓  4 Can create an item in a list (551ms)<br>
  ✓  5 Can collect an item (632ms)<br>
  ✓  6 Can delete an empty list (564ms)<br>
  ✓  7 Can delete a list with items (764ms)<br>
  ✓  8 Home page is showing statistics when shopping lists have been created (403ms)<br>

## Deployed location

Deployed on fly.io. Using the free plan. The application is deployed from a docker container and a postgresql has been created and connected to that application.

## Guidelines to run the application locally

1) Unzip the code.

2) Go in the `/Project1-shopping-list` directory.

3) Run:<br>
`docker-compose up`

To run the playwright tests and remove the data in the database if success run this command:<br>
`docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf`
