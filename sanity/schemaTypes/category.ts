import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: () => "🏷️",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      options: {
        list: [
          { title: "Blue", value: "blue" },
          { title: "Green", value: "green" },
          { title: "Purple", value: "purple" },
          { title: "Orange", value: "orange" },
          { title: "Red", value: "red" },
          { title: "Indigo", value: "indigo" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});
