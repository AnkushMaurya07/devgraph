import { Session } from "neo4j-driver";

import { driver } from "./neo4j.js";

export function createSession(): Session {
  return driver.session();
}