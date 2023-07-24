import { Router } from "express";
import models from "./models";
const { DataOffering, Ecosystem, Participant, ServiceOffering } = models;
const r: Router = Router();

r.get("/matching/ecosystems", async (req, res, next) => {
  try {
    // const ecosytems = await Ecosystem.find();
    res.json({ message: "Not implemented" });
  } catch (e) {
    next(e);
  }
});

r.get("/matching/participants", async (req, res, next) => {
  try {
    res.json({ message: "Not implemented" });
  } catch (e) {
    next(e);
  }
});

r.get("/matching/data", async (req, res, next) => {
  try {
    res.json({ message: "Not implemented" });
  } catch (e) {
    next(e);
  }
});

r.get("/matching/services", async (req, res, next) => {
  try {
    res.json({ message: "Not implemented" });
  } catch (e) {
    next(e);
  }
});

export default r;
