import { dataOfferings, ecosystems, serviceOfferings } from "./sampleData";
import { expect } from "chai";
import request from "supertest";
import { config } from "dotenv";
config();
import { startServer } from "../src/server";
import { IncomingMessage, Server, ServerResponse } from "http";
import mongoose, { Types } from "mongoose";
import DataOffering from "../src/models/DataOffering/DataOffering.model";
import Ecosystem from "../src/models/Ecosystem/Ecosystem.model";
import ServiceOffering from "../src/models/ServiceOffering/ServiceOffering.model";

let app: Express.Application;
let server: Server<typeof IncomingMessage, typeof ServerResponse>;
let connection;

const data1ID = new Types.ObjectId(1);
const data2ID = new Types.ObjectId(2);
const service1ID = new Types.ObjectId(3);
const service2ID = new Types.ObjectId(4);
const ecosystem1ID = new Types.ObjectId(5);
const ecosystem2ID = new Types.ObjectId(6);

describe("Setup", () => {
  it("Should start the test server and return the instances", async () => {
    const serverInstance = await startServer(3001, true);
    expect(serverInstance.connection).to.not.be.undefined;
    app = serverInstance.app;
    server = serverInstance.server;
    connection = serverInstance.connection;
  });
});

describe("Populating test data", () => {
  it("Should create test data", async () => {
    try {
      await DataOffering.deleteMany();
      await Ecosystem.deleteMany();
      await ServiceOffering.deleteMany();

      // Insert test data
      await DataOffering.insertMany([
        { ...dataOfferings[1], _id: data1ID },
        { ...dataOfferings[2], _id: data2ID },
      ]);

      await ServiceOffering.insertMany([
        { ...serviceOfferings[1], _id: service1ID },
        { ...serviceOfferings[2], _id: service2ID },
      ]);

      await Ecosystem.insertMany([
        { ...ecosystems[1], _id: ecosystem1ID },
        //   { ...ecosystems[2], _id: ecosystem2ID },
      ]);
      expect(true).to.be.true;
    } catch (error) {
      throw error;
    }
  });
});

describe("GET /v1/matching/ecosystems", () => {
  it("should return matching ecosystems based on provided dataIds and serviceIds", async () => {
    const response = await request(app)
      .get("/v1/matching/ecosystems")
      .query({
        dataIds: [data1ID, data2ID],
        servicesIds: [service1ID, service2ID],
      });

    expect(response.status).to.eq(200);
    expect(response.body).to.be.an("array");
    expect(response.body).to.have.lengthOf(1);
  });

  it("should return an empty array when no matching ecosystems found", async () => {
    const response = await request(app).get("/v1/matching/ecosystems").query({
      dataIds: [],
      servicesIds: [],
    });

    expect(response.status).to.eq(200);
    expect(response.body).to.be.an("array");
    expect(response.body).to.have.lengthOf(0);
  });
});

describe("GET /v1/matching/data-services", () => {
  it("should return matching data and services for a valid ecosystemId", async () => {
    const response = await request(app).get(
      "/v1/matching/data-services/" + ecosystem1ID
    );

    expect(response.status).to.eq(200);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("data");
    expect(response.body).to.have.property("services");
  });

  it("should return 404 when ecosystem not found for the given ecosystemId", async () => {
    const response = await request(app).get(
      "/v1/matching/data-services/" + ecosystem2ID
    );

    expect(response.status).to.eq(404);
    expect(response.body).to.have.property("error", "ecosystem not found");
  });
});

after(async () => {
  try {
    // Close the server after all tests are completed
    await new Promise<void>((resolve) => {
      server.close(() => {
        resolve();
      });
    });

    // Disconnect from the test database
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error closing the server or database connection:", error);
    process.exit(1);
  }
});
