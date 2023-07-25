import { Router } from "express";
import mongoose, { AnyObject, Types } from "mongoose";
import DataOffering from "./models/DataOffering/DataOffering.model";
import ServiceOffering from "./models/ServiceOffering/ServiceOffering.model";
import Ecosystem from "./models/Ecosystem/Ecosystem.model";
const r: Router = Router();

/**
 * Finds matching ecosystems based on provided
 * data or service(s)
 */
r.get("/v1/matching/ecosystems", async (req, res, next) => {
  try {
    const servicesIds = req.query.servicesIds
      ? Array.isArray(req.query.servicesIds)
        ? req.query.servicesIds
            .map((id) => id.toString())
            .filter((id) => mongoose.Types.ObjectId.isValid(id))
        : [req.query.servicesIds]
            .map((id) => id.toString())
            .filter((id) => mongoose.Types.ObjectId.isValid(id))
      : [];
    const dataIds = req.query.dataIds
      ? Array.isArray(req.query.dataIds)
        ? req.query.dataIds
            .map((id) => id.toString())
            .filter((id) => mongoose.Types.ObjectId.isValid(id))
        : [req.query.dataIds]
            .map((id) => id.toString())
            .filter((id) => mongoose.Types.ObjectId.isValid(id))
      : [];

    const query: any = {};

    const services: any = servicesIds.length
      ? await ServiceOffering.find({ _id: { $in: servicesIds as [] } })
      : [];
    const data: any = dataIds.length
      ? await DataOffering.find({ _id: { $in: dataIds as [] } })
      : [];

    if (services && services.length > 0) {
      const servicesThemes = services.map(
        (s: { theme: string; keyword: string[] }) => s.theme
      );
      const servicesKeywords = services.flatMap(
        (s: { theme: string; keyword: string[] }) => s.keyword
      );
      query["$or"] = [
        { "needs.services.theme": { $in: servicesThemes } },
        { "needs.services.keyword": { $in: servicesKeywords } },
      ];
    }

    if (data && data.length > 0) {
      const dataThemes = data.map(
        (d: { theme: string; keyword: string[] }) => d.theme
      );
      const dataKeywords = data.flatMap(
        (d: { theme: string; keyword: string[] }) => d.keyword
      );
      if (query["$or"]) {
        query["$or"].push(
          { "needs.data.theme": { $in: dataThemes } },
          { "needs.data.keyword": { $in: dataKeywords } }
        );
      } else {
        query["$or"] = [
          { "needs.data.theme": { $in: dataThemes } },
          { "needs.data.keyword": { $in: dataKeywords } },
        ];
      }
    }

    const ecosystems = await Ecosystem.find(query);

    res.json(ecosystems);
  } catch (e) {
    next(e);
  }
});

/**
 * Uses mongodb text index to find closest corresponding
 * data and services based on the needs of the ecosystem
 */
r.get("/v1/matching/data-services/:ecosystemId", async (req, res, next) => {
  try {
    const { ecosystemId } = req.params;

    const e: AnyObject = await Ecosystem.findOne({
      _id: new Types.ObjectId(ecosystemId.toString()),
    });
    if (!e) return res.status(404).json({ error: "ecosystem not found" });

    const dataThemesAndKeywords = e.needs.data.reduce(
      (
        accumulated: string[],
        current: { theme: string; keyword: string[] }
      ) => {
        return accumulated.concat([current.theme, ...current.keyword]);
      },
      []
    );

    const serviceThemesAndKeywords = e.needs.services.reduce(
      (
        accumulated: string[],
        current: { theme: string; keyword: string[] }
      ) => {
        return accumulated.concat([current.theme, ...current.keyword]);
      },
      []
    );

    const matchingData = await DataOffering.find({
      $text: {
        $search: dataThemesAndKeywords.join(" "),
      },
    }).sort({ score: { $meta: "textScore" } });

    const matchingServices = await ServiceOffering.find({
      $text: {
        $search: serviceThemesAndKeywords.join(" "),
      },
    }).sort({ score: { $meta: "textScore" } });

    return res.json({ data: matchingData, services: matchingServices });
  } catch (e) {
    next(e);
  }
});

export default r;
