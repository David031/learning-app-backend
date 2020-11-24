"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Idiom",
    embedded: false
  },
  {
    name: "Dynasty",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Level",
    embedded: false
  },
  {
    name: "Record",
    embedded: false
  },
  {
    name: "RecordStatus",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
exports.prisma = new exports.Prisma();
