# Project 1: Shared shopping list

This project is a web application that is used as a shared shopping list.

Address link : https://...

## Architecture and description

The application follows a three-tier architecture consisting of a client, server, and database. It also utilizes a layered architecture with four layers: views, controllers, services, and the database.

C:.
│   docker-compose.yml
│   project.env
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

The client-side views are stored in the views folder and include the following files:

home.eta: main page with the application statistics.
lists.eta: page managing all the shopping lists.
list.eta: the list page managing list items.

The pages uses the same layout in "layouts/layout.eta". The layout is using the CDN bootstrap.

### The server-side

There is a controller for each page:

listController.js
shoppingListItemController.js
statisticsController.js

The controllers are requesting services for lists or items from the shopping lists while the services are querying to the database:

listService.js
shoppingListItemService.js

### The database

The application uses a postgresql database version 14.1. The initial schemas are located in the flyway/sql folder.

### The tests

There is currently 8 tests for the application and use playwright.
  ✓  1  Page is showing with correct titles (417ms)
  ✓  2 Can create a list (404ms)
  ✓  3 Show a newly created list (446ms)
  ✓  4 Can create an item in a list (551ms)
  ✓  5 Can collect an item (632ms)
  ✓  6 Can delete an empty list (564ms)
  ✓  7 Can delete a list with items (764ms)
  ✓  8 Home page is showing statistics when shopping lists have been created (403ms)

## Deployed location


## Guidelines to run the application locally

1) Clone this repository.

2) Go in the Project1-shopping-list directory.

3) Run:
docker-compose up

To run the playwright tests and remove the data in the database if success run this command:
docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf