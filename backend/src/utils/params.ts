import { ParamsDictionary } from "express-serve-static-core";

export function getParam(
  value: string | string[] | undefined
): string {
  if (typeof value !== "string") {
    throw new Error("Invalid route parameter");
  }

  return value;
}