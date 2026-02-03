import { defineField, defineType } from "sanity";

export default defineType({
  name: "codeSnippet",
  title: "Code Snippet",
  type: "object",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      initialValue: "javascript",
      options: {
        list: [
          { title: "Plain text", value: "text" },
          { title: "Bash", value: "bash" },
          { title: "CSS", value: "css" },
          { title: "HTML", value: "markup" },
          { title: "JavaScript", value: "javascript" },
          { title: "JSON", value: "json" },
          { title: "JSX", value: "jsx" },
          { title: "TS", value: "typescript" },
          { title: "TSX", value: "tsx" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "filename",
      title: "Filename (optional)",
      type: "string",
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "text",
      rows: 10,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      language: "language",
      filename: "filename",
      code: "code",
    },
    prepare({ language, filename, code }) {
      const firstLine = (code as string | undefined)?.split("\n")[0]?.slice(0, 60);
      return {
        title: filename || `Code (${language || "text"})`,
        subtitle: firstLine ? `${firstLine}${firstLine.length >= 60 ? "…" : ""}` : undefined,
      };
    },
  },
});


