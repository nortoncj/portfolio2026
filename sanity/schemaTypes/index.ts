import { type SchemaTypeDefinition } from "sanity";
import post from "./post";
import category from "./category";
import tag from "./tag";
import colors from "./colors";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, category, tag],
};
