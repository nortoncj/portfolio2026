import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "sizeChart",
      title: "Size Chart",
      type: "table",
    }),
  ],
});
