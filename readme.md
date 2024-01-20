# API DI Connector

[![npm version](https://badge.fury.io/js/api-di-connector.svg)](https://badge.fury.io/js/api-di-connector)

## Description

The `api-di-connector` package provides the ability to generate connectors for working with your Swagger API. It supports Swagger version v3 and utilizes a restClient based on the Axios library.

## Installation

```bash
npm i -D api-di-connector
```

## Additional packages for production

```bash
npm i axios axios-retry
```

## Example

```javascript
npx api-di-connector
```

# User Console Operations

```bash
√ Add Swagger Link: example.com/v3/api-docs
√ Project Language: js/ts
```

# Details

This repository contains a service implementation with the following directory structure:

```bash
service
|-- ApiService
| |-- api
| | |-- ApiModule1Class1
| |-- ApiDiContainer
| |-- RestClient
| |-- interfaces (optional for TypeScript)
| |-- SwaggerSchemas
```

## ApiService

The ApiService directory encompasses the core functionality of the service.

## ApiDiContainer

The ApiDiContainer is a dependency injection container that consolidates all classes defined in the api directory. It serves as a centralized mechanism for managing dependencies within the service.

## RestClient

The RestClient module defines the basic methods for interacting with the axios library, providing a foundation for making HTTP requests. It encapsulates common functionalities required for communication with external APIs.

## TypeScript Interfaces (optional)

If TypeScript is chosen as the language, the interfaces directory contains TypeScript interfaces that represent the schemas defined in the Swagger documentation

## Features

- Generation of connectors for PATCH, POST, DELETE, GET requests based on Swagger specification v3.
- Addition of query parameters, path parameters, and body for POST requests to the respective controllers.
- Generation of annotations for controllers.
- Use of Bearer authorization in request headers.

## Usage

```javascript
// Example usage of generated connectors
import ApiDiContainer from '@service/apiService/apiDiContainer';
ApiDiContainer.ProxyApiUser.getUsers().then((res) => {
  this.setState({ listOfUser: res.data });
});
```

## Notes

- Ensure that your Swagger API adheres to the Swagger v3 specification.
- Before usage, make sure you have the Axios package installed.

## License

This project is licensed under the ISC License.
