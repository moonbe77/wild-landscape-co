import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Garden Design", value: "garden-design" },
          { title: "Landscaping", value: "landscaping" },
          { title: "Hardscaping", value: "hardscaping" },
          { title: "Maintenance", value: "maintenance" },
        ],
      },
    }),
    defineField({
      name: "location",
      title: "Location",
      description: "e.g. Buderim, Sunshine Coast",
      type: "string",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", title: "Alt text", type: "string", validation: (Rule) => Rule.required() },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "beforeImage",
      title: "Before image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
    defineField({
      name: "afterImage",
      title: "After image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "completedAt",
      title: "Completed",
      type: "date",
    }),
    defineField({
      name: "featured",
      title: "Featured on home page",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "coverImage" },
  },
});
