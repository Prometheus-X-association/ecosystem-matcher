import mongoose from "mongoose";

export default {
  DataOffering: mongoose.connection.collection("dataofferings"),
  Ecosystem: mongoose.connection.collection("ecosystems"),
  Participant: mongoose.connection.collection("participants"),
  ServiceOffering: mongoose.connection.collection("serviceofferings"),
};
