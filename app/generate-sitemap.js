const fs = require("fs");
const { create } = require("xmlbuilder2");

const baseUrl = "https://www.chrisnortonjr.com";

const routes = [
  "/",
  "/projects/devops",
  "/projects/software",
  "/projects/automation",
  "/projects/engineering",
  "/insights",
  "/insights/seo-optimizer",
  "/insights/lightweight-emails",
  "/insights/aws-devops",
  "/insights/my-first-iot-project",
  "/insights/windows-linux",
];

const urlset = create({ version: "1.0" }).ele("urlset", {
  xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
});

routes.forEach((route) => {
  const url = urlset.ele("url");

  url.ele("lastmod").txt(new Date().toISOString());
});

const xml = urlset.end({ prettyPrint: true });

fstat.writeFileSync("../sitemap.xml", xml);

console.log("Sitemap generated Successfully ✅");
