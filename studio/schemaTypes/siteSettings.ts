import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Only one of these should ever exist — see structure.ts, which pins
  // it as a singleton in the Studio nav instead of a listable collection.
  fields: [
    defineField({ name: "title", title: "Site title", type: "string" }),
    defineField({ name: "description", title: "Site description", type: "text", rows: 3 }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: ["Instagram", "Facebook", "LinkedIn"],
              },
            },
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
    }),
  ],
});
