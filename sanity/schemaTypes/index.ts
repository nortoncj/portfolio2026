import { type SchemaTypeDefinition } from "sanity";
import blockContent from "@/components/sections/blog/components/blockContent"
import post from "./post";
import category from "./category";
import tag from "./tag";
import colors from "./colors";
import product from "./product";
import projects from "./projects";




export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, post, category, tag, projects],
};
