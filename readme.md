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
```

## Project Language

```bash
√ Project Language: js/ts
```

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
