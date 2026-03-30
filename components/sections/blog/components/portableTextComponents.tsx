import type { PortableTextComponents } from "@portabletext/react";
import { isValidElement, type ReactNode } from "react";

export type TocItem = {
  id: string;
  text: string;
  level: "h2" | "h3" | "h4";
};

type TableRow = {
  _key?: string;
  cells?: string[];
};

type LegacyTableValue = {
  rows?: TableRow[];
};


type ContentTableValue = {
  table?: LegacyTableValue;
  caption?: string;
  note?: string;
  hasHeaderRow?: boolean;
  variant?: "default" | "striped" | "compact" | "comparison";
};

function toPlainText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(toPlainText).join("");
  }

  if (isValidElement(node)) {
    const element = node as React.ReactElement<any>;
    return toPlainText(element.props.children);
  }


  return "";
}



function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractToc(body: any[] = []): TocItem[] {
  return body
    .filter(
      (block) =>
        block?._type === "block" && ["h2", "h3", "h4"].includes(block?.style),
    )
    .map((block) => {
      const text = Array.isArray(block?.children)
        ? block.children
            .map((child: any) => child?.text || "")
            .join("")
            .trim()
        : "";

      return {
        id: slugify(text),
        text,
        level: block.style as "h2" | "h3" | "h4",
      };
    })
    .filter((item) => item.text);
}

function renderTable({
  rows = [],
  hasHeaderRow = true,
  variant = "default",
  caption,
  note,
}: {
  rows?: TableRow[];
  hasHeaderRow?: boolean;
  variant?: "default" | "striped" | "compact" | "comparison";
  caption?: string;
  note?: string;
}) {
  if (!rows.length) return null;

  const [headerRow, ...bodyRows] = rows;
  const useHeader = hasHeaderRow && !!headerRow?.cells?.length;

  const tableClassName = [
    "bp-table",
    variant === "striped" ? "bp-table-striped" : "",
    variant === "compact" ? "bp-table-compact" : "",
    variant === "comparison" ? "bp-table-comparison" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className="bp-table-block">
      <div className="bp-table-shell">
        <table className={tableClassName}>
          {useHeader ? (
            <thead>
              <tr>
                {headerRow.cells?.map((cell, i) => (
                  <th key={`${headerRow._key || "head"}-${i}`}>{cell}</th>
                ))}
              </tr>
            </thead>
          ) : null}

          <tbody>
            {(useHeader ? bodyRows : rows).map((row, rowIndex) => (
              <tr key={row._key || rowIndex}>
                {(row.cells || []).map((cell, cellIndex) => (
                  <td key={`${row._key || rowIndex}-${cellIndex}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {caption ? (
        <figcaption className="bp-table-caption">{caption}</figcaption>
      ) : null}

      {note ? <p className="bp-table-note">{note}</p> : null}
    </figure>
  );
}

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,

    h2: ({ children }) => {
      const text = toPlainText(children);
      return <h2 id={slugify(text)}>{children}</h2>;
    },

    h3: ({ children }) => {
      const text = toPlainText(children);
      return <h3 id={slugify(text)}>{children}</h3>;
    },

    h4: ({ children }) => {
      const text = toPlainText(children);
      return <h4 id={slugify(text)}>{children}</h4>;
    },

    blockquote: ({ children }) => (
      <blockquote className="bp-blockquote">{children}</blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="bp-list bp-list-bullet">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="bp-list bp-list-number">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },

  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code>{children}</code>,
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const openInNewTab = Boolean(value?.openInNewTab || value?.blank);

      return (
        <a
          href={href}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },

  types: {
    image: ({ value }) => {
      const src = value?.asset?.url;
      if (!src) return null;

      return (
        <figure className="bp-figure">
          <img
            src={src}
            alt={value?.alt || value?.caption || "Post image"}
            loading="lazy"
          />
          {value?.caption ? <figcaption>{value.caption}</figcaption> : null}
        </figure>
      );
    },

    code: ({ value }) => {
      if (!value?.code) return null;

      return (
        <pre className="bp-pre">
          <code>{value.code}</code>
        </pre>
      );
    },

    table: ({ value }) =>
      renderTable({
        rows: value?.rows || [],
        hasHeaderRow: true,
        variant: "default",
      }),

    contentTable: ({ value }) =>
      renderTable({
        rows: value?.table?.rows || [],
        hasHeaderRow: value?.hasHeaderRow ?? true,
        variant: value?.variant || "default",
        caption: value?.caption,
        note: value?.note,
      }),
  },
};
