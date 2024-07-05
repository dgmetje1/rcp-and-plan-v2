# Recipe and plan

Web application to share gastronomic recipes with the community. You can plan you meal plan based on recipes in the platform, allowing you to know beforehand what things you have to buy.

## Monorepo structure

In this project you have all you need to setup the project and start it.

The BE microservices and APIs are contained in `packages/BE`.

The FE application is based in React and it is placed inside `packages/FE`

## Architecture

The project's architecture has a microservices approach with two defined Bounded Contexts using a Queue system to allow microservices to interact with each other.
