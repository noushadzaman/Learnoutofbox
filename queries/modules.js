import { Module } from "@/model/module.model";

export async function create(moduleData) {
  try {
    const singleModule = await Module.create(moduleData);
    return JSON.parse(JSON.stringify(singleModule));
  } catch (e) {
    throw new Error(e);
  }
}
