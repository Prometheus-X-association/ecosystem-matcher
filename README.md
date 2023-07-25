# Prometheus-X Ecosystem Matcher

Welcome to Prometheus-X Ecosystem Matcher! This project provides an API enabling the matching of ecosystems to data and service offerings. It allows users to find ecosystems based on provided data or service IDs and uses MongoDB text indexing to discover the closest corresponding data and services for a given ecosystem.

The core of this project is built using Express.js as the web framework and Mongoose as the ODM (Object Data Modeling) library to interact with MongoDB.

## Features

- Find matching ecosystems based on provided data or service(s).
- Discover closest corresponding data and services for a given ecosystem.
- Perform text-based searches on themes and keywords to find matches.

## Prometheus-X Service Ecosystem

The Ecosystem Matcher is one of the components of a Prometheus-X Catalog. Even though it is independant and serves its own purpose, users of a catalog will need interaction with more than one service. Thus, if you want to run a full catalog, consider looking into deploying the [Catalog Registry](https://github.com/Prometheus-X-association/catalog-registry) and the [Catalog API](https://github.com/Prometheus-X-association/catalog-api).

In addition, the Prometheus-X Full specifications can be found on the [Prometheus-X docs repo/wiki](https://github.com/Prometheus-X-association/docs/wiki/Prometheus%E2%80%90X-Building-Blocks:-Enabling-Secure-Data-Ecosystems-and-Consent%E2%80%90driven-Data-Sharing)

## Installation

To set up the Prometheus-X Ecosystem Matcher, follow these steps:

1. Clone the repository from GitHub:

```bash
git clone https://github.com/your-username/prometheus-x-ecosystem-matcher.git
cd prometheus-x-ecosystem-matcher
```

2. Install the required dependencies:

```bash
npm install
```

3. Copy .env.sample to .env and setup your environment variables
```bash
cp .env.sample .env
# Setup your variables in .env
```

4. Start the server:

```bash
npm start
```

The server should now be running on the specified port (default: 3000).

## Usage

The Prometheus-X Ecosystem Matcher API provides two main endpoints:

1. `/v1/matching/ecosystems` (HTTP GET): Find matching ecosystems based on provided data or service IDs.

2. `/v1/matching/data-services/:ecosystemId` (HTTP GET): Use MongoDB text index to find the closest corresponding data and services for a given ecosystem.

Please refer to the API documentation or the provided Swagger specification for detailed information on how to use the endpoints and their query parameters.

## API Endpoints

1. **Find Matching Ecosystems**
   - Endpoint: `/v1/matching/ecosystems`
   - Method: GET
   - Query Parameters:
     - `servicesIds`: Array of service IDs to match.
     - `dataIds`: Array of data IDs to match.
   - Successful Response: JSON array containing matching ecosystems.

2. **Find Closest Corresponding Data and Services**
   - Endpoint: `/v1/matching/data-services/:ecosystemId`
   - Method: GET
   - Path Parameter:
     - `ecosystemId`: ID of the ecosystem to find matching data and services.
   - Successful Response: JSON object with `data` (matching data offerings) and `services` (matching service offerings).

   For a complete list of all available endpoints, along with their request and response schemas, refer to the [JSON Swagger Specification](./docs/swagger.json) provided or visit the [github-pages](https://prometheus-x-association.github.io/ecosystem-matcher/) of this repository which displays the swagger specification with the Swagger UI.