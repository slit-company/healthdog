import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const distDir = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "dist");
const failures = [];

function check(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function read(relativePath) {
  const full = join(distDir, relativePath);
  return existsSync(full) ? readFileSync(full, "utf8") : null;
}

const home = read("index.html");
check(home !== null, "dist/index.html missing");
if (home !== null) {
  check(
    home.includes('<div id="root">') && !home.includes('<div id="root"></div>'),
    "home #root is empty (prerender did not inject app HTML)",
  );
  check(home.includes("application/ld+json"), "home missing JSON-LD");
  check(home.includes('property="og:title"'), "home missing og:title");
  check(home.includes('rel="canonical"'), "home missing canonical link");
}

const about = read("about.html");
check(about !== null, "dist/about.html missing (prerender flat files not generated)");
if (about !== null) {
  check(about.includes("헬스독 소개"), "about.html missing route-specific title");
}

const branch = read("branches/incheon-gimpo.html");
check(branch !== null, "dist/branches/incheon-gimpo.html missing");
if (branch !== null) {
  check(branch.includes("인천김포"), "branch page missing branch name in head meta");
  check(branch.includes('"@type":"PetStore"'), "branch page missing PetStore JSON-LD");
}

const sitemap = read("sitemap.xml");
check(
  sitemap?.includes("/branches/incheon-gimpo") ?? false,
  "sitemap.xml missing or does not list all routes",
);

const robots = read("robots.txt");
check(robots?.includes("Sitemap:") ?? false, "robots.txt missing or has no Sitemap line");

if (failures.length > 0) {
  console.error("SEO CHECK FAILED:");
  for (const failure of failures) {
    console.error(`  - ${failure}`);
  }
  process.exit(1);
}
console.log("SEO CHECK PASSED");
