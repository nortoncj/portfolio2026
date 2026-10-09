/**
 * One-shot migration: src/data/project.ts (+ imported images) -> Sanity `project` docs.
 *
 * Run from the folder that has sanity.cli.ts:
 *   npx sanity exec scripts/migrate-projects.ts --with-user-token -- --dry-run
 *   npx sanity exec scripts/migrate-projects.ts --with-user-token
 *   npx sanity exec scripts/migrate-projects.ts --with-user-token -- --overwrite
 *
 * Default is createIfNotExists (reruns won't touch docs you've edited in Studio).
 * --overwrite uses createOrReplace and WILL clobber Studio edits.
 *
 * Needs esbuild (ships with Sanity/Next, so it's usually already there).
 * If you get "Cannot find module 'esbuild'":  npm i -D esbuild
 */
import { getCliClient } from "sanity/cli";
import { build } from "esbuild";
import { randomUUID } from "node:crypto";
import { createRequire } from "node:module";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const client = getCliClient({ apiVersion: "2025-01-01" });
const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const OVERWRITE = args.includes("--overwrite");

// ---- POINT THESE AT YOUR STUFF ---------------------------------------------
// Folder that contains public/ and src/. If Studio is embedded in the Next app, "." is right.
const SITE_ROOT = path.resolve(process.cwd(), ".");
const DATA_FILE = path.join(SITE_ROOT, "data/projects.ts");
// What "@images/..." points to in your tsconfig paths.
const IMAGES_DIR = path.join(SITE_ROOT, "public/assets/img");
// ----------------------------------------------------------------------------

// Export name in project.ts -> Sanity category. Anything not listed (like the
// placeholder `project` array) is ignored.
const BUCKETS = {
  Marketing: "growth",
  Software: "software",
  Engineering: "engineering",
  Devops: "devops",
} as const;

const CATEGORY_TITLES: Record<string, string> = {
  growth: "growth",
  software: "Software",
  devops: "DevOps",
  engineering: "Engineering",
};

type SourceProject = {
  id?: string;
  title?: string;
  image?: string;
  category?: string;
  description?: string;
  longDesc?: string;
  skills?: string[];
  tags?: string[];
  featured?: boolean;
  status?: string;
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  timeline?: { duration?: string; startDate?: string; endDate?: string };
  details?: {
    overview?: string;
    challenges?: string;
    solutions?: string;
    results?: string;
    features?: string[];
  };
};

// ---- load project.ts without Next.js ---------------------------------------
// Bundles the data file with esbuild, turning every "@images/..." import into
// { src: "/absolute/path/to/file.png" } so we know which file to upload.
async function loadDataModule(): Promise<Record<string, unknown>> {
  const result = await build({
    entryPoints: [DATA_FILE],
    bundle: true,
    write: false,
    format: "cjs",
    platform: "node",
    logLevel: "silent",
    plugins: [
      {
        name: "stub-images-and-types",
        setup(b) {
          b.onResolve({ filter: /^@images\// }, (a) => ({
            path: path.join(IMAGES_DIR, a.path.replace(/^@images\//, "")),
            namespace: "image-stub",
          }));
          b.onLoad({ filter: /.*/, namespace: "image-stub" }, (a) => ({
            contents: `export default { src: ${JSON.stringify(a.path)} };`,
            loader: "js",
          }));
          // `import { Project } from "@/types/Post"` is type-only; give it an empty stub.
          b.onResolve({ filter: /^@\/types\// }, () => ({
            path: "types",
            namespace: "empty",
          }));
          b.onLoad({ filter: /.*/, namespace: "empty" }, () => ({
            contents: "export const Project = undefined;",
            loader: "js",
          }));
        },
      },
    ],
  });

  const tmp = path.join(os.tmpdir(), `projects-${Date.now()}.cjs`);
  fs.writeFileSync(tmp, result.outputFiles[0].text);
  try {
    const req = createRequire(path.join(process.cwd(), "noop.js"));
    return req(tmp);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

// ---- helpers ----------------------------------------------------------------
const key = () => randomUUID().replace(/-/g, "").slice(0, 12);
const clean = (s?: string) => (s ?? "").trim();
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);

/** Only keep real URLs. Your "#" placeholders get dropped. */
const realUrl = (v?: string) =>
  v && /^https?:\/\//i.test(v.trim()) ? v.trim() : undefined;

/** Handles your formats: "09-01-24" (MM-DD-YY), "2026", plus anything Date can parse. */
function toDate(v?: string) {
  const s = clean(v);
  if (!s) return undefined;
  let m = s.match(/^(\d{2})-(\d{2})-(\d{2})$/);
  if (m) return `20${m[3]}-${m[1]}-${m[2]}`;
  m = s.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (m) return `${m[3]}-${m[1]}-${m[2]}`;
  if (/^\d{4}$/.test(s)) return `${s}-01-01`;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

function normalizeStatus(v?: string) {
  const s = (v ?? "").toLowerCase().replace(/[^a-z]/g, "");
  if (["inprogress", "wip", "building", "active"].includes(s))
    return "in-progress";
  if (["archived", "deprecated", "retired"].includes(s)) return "archived";
  return "live"; // "completed" lands here
}

/** skills + tags merged, deduped case-insensitively, first spelling wins. */
function mergeStack(...lists: (string[] | undefined)[]) {
  const seen = new Map<string, string>();
  for (const item of lists.flat()) {
    const v = clean(item);
    if (v && !seen.has(v.toLowerCase())) seen.set(v.toLowerCase(), v);
  }
  return [...seen.values()];
}

const span = (text: string) => ({
  _type: "span",
  _key: key(),
  text,
  marks: [],
});
const block = (text: string, style = "normal") => ({
  _type: "block",
  _key: key(),
  style,
  markDefs: [],
  children: [span(text)],
});
const bullet = (text: string) => ({
  ...block(text),
  listItem: "bullet",
  level: 1,
});
const paragraphs = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => block(p));

/** details{} -> a real write-up with headings and a feature list. */
function buildWriteup(p: SourceProject) {
  const d = p.details ?? {};
  const out: ReturnType<typeof block>[] = [];
  const sections: [string, string | undefined][] = [
    ["Overview", clean(d.overview) || clean(p.longDesc)],
    ["The Challenge", d.challenges],
    ["The Solution", d.solutions],
    ["Results", d.results],
  ];
  for (const [heading, text] of sections) {
    if (!clean(text)) continue;
    out.push(block(heading, "h2"), ...paragraphs(clean(text)));
  }
  const features = (d.features ?? []).map(clean).filter(Boolean);
  if (features.length)
    out.push(block("Key Features", "h2"), ...features.map(bullet));
  return out.length ? out : undefined;
}

// ---- Sanity side effects ----------------------------------------------------
const categoryIdCache = new Map<string, string>();

async function ensureCategory(k: string) {
  if (categoryIdCache.has(k)) return categoryIdCache.get(k)!;
  const title = CATEGORY_TITLES[k];
  const existing = await client.fetch<string | null>(
    `*[_type == "category" && (slug.current == $slug || lower(title) == lower($title))][0]._id`,
    { slug: k, title },
  );
  const id = existing ?? `category-${k}`; // no dots: dotted IDs are private in Sanity
  if (!existing) {
    console.log(`  + creating category "${title}"`);
    if (!DRY_RUN) {
      // Assumes your category schema has title + slug. Adjust if it doesn't.
      await client.createIfNotExists({
        _id: id,
        _type: "category",
        title,
        slug: { _type: "slug", current: k },
      });
    }
  }
  categoryIdCache.set(k, id);
  return id;
}

async function uploadImage(absPath: string | undefined, alt: string) {
  if (!absPath) return undefined;
  if (!fs.existsSync(absPath)) {
    console.warn(`  ⚠️  image not found: ${absPath}`);
    return undefined;
  }
  if (DRY_RUN) {
    return {
      _type: "image",
      asset: { _type: "reference", _ref: `dry-run:${path.basename(absPath)}` },
      alt,
    };
  }
  // Sanity dedupes by file hash, so a reused image (hardware_CICD.webp) is stored once.
  const asset = await client.assets.upload(
    "image",
    fs.createReadStream(absPath),
    {
      filename: path.basename(absPath),
    },
  );
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt,
  };
}

// ---- main -------------------------------------------------------------------
async function main() {
  const mod = await loadDataModule();
  const tx = client.transaction();
  const seenSlugs = new Set<string>();
  const homework: string[] = [];
  let queued = 0;

  console.log(`${DRY_RUN ? "[DRY RUN] " : ""}Reading ${DATA_FILE}\n`);

  for (const [exportName, catKey] of Object.entries(BUCKETS)) {
    const list = mod[exportName] as SourceProject[] | undefined;
    if (!Array.isArray(list)) {
      console.warn(`⚠️  export "${exportName}" not found, skipping`);
      continue;
    }
    const categoryId = await ensureCategory(catKey);
    console.log(`${CATEGORY_TITLES[catKey]} (${list.length})`);

    for (const [i, p] of list.entries()) {
      const title = clean(p.title);
      if (!title) continue;

      let slug = slugify(title);
      if (seenSlugs.has(slug)) slug = `${slug}-${catKey}`;
      seenSlugs.add(slug);

      const summary = clean(p.description);
      const description = buildWriteup(p);
      const coverImage = await uploadImage(p.image, `${title} preview`);

      // Build the cleanup list while we're here
      if (summary.length < 50)
        homework.push(`${title}: summary is ${summary.length} chars (min 50)`);
      if (!p.details?.overview && !p.details?.challenges)
        homework.push(`${title}: no write-up beyond the blurb`);
      if (
        p.timeline?.startDate === "09-01-24" &&
        p.timeline?.endDate === "09-10-24"
      )
        homework.push(`${title}: placeholder dates (09-01-24 → 09-10-24)`);
      if (!coverImage) homework.push(`${title}: no cover image`);

      const doc = JSON.parse(
        JSON.stringify({
          _id: `project-${slug}`,
          _type: "project",
          title,
          slug: { _type: "slug", current: slug },
          category: { _type: "reference", _ref: categoryId },
          projectType: clean(p.category) || undefined,
          status: normalizeStatus(p.status),
          summary: summary || undefined,
          techStack: mergeStack(p.skills, p.tags),
          description,
          coverImage,
          videoUrl: realUrl(p.videoUrl),
          githubUrl: realUrl(p.githubUrl),
          liveUrl: realUrl(p.liveUrl),
          startedAt: toDate(p.timeline?.startDate),
          completedAt: toDate(p.timeline?.endDate),
          featured: Boolean(p.featured),
          sortOrder: i * 10,
        }),
      );

      if (OVERWRITE) tx.createOrReplace(doc);
      else tx.createIfNotExists(doc);
      queued++;
      console.log(`  ✓ ${title}  →  /${slug}`);
    }
  }

  if (homework.length) {
    console.log(`\n📝 Cleanup list (fix these in Studio after import):`);
    homework.forEach((h) => console.log(`   • ${h}`));
  }

  if (!queued) return console.log("\nNothing to write.");

  if (DRY_RUN) {
    console.log(`\n[DRY RUN] Would write ${queued} projects. Sample doc:\n`);
    console.log(JSON.stringify(tx.serialize()[0], null, 2));
    return;
  }

  await tx.commit({ visibility: "async" });
  console.log(
    `\nDone. ${queued} projects ${OVERWRITE ? "written (overwrite)" : "created (existing left alone)"}.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
