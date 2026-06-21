import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const distDir = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "dist");
const failures = [];
const read = (rel) => (existsSync(join(distDir, rel)) ? readFileSync(join(distDir, rel), "utf8") : null);

const privacy = read("privacy.html");
if (privacy === null) {
  failures.push("dist/privacy.html missing");
} else if (!privacy.includes("개인정보처리방침")) {
  failures.push("privacy.html missing 개인정보처리방침 content");
}

const branchesHtml = read("branches.html");
if (branchesHtml === null) {
  failures.push("dist/branches.html missing");
} else {
  const order = ["송파점", "수원점", "인천점", "평택점", "부산점", "창원점"];
  const positions = order.map((name) => branchesHtml.indexOf(name));
  for (let i = 1; i < positions.length; i += 1) {
    if (positions[i - 1] === -1 || positions[i] === -1 || positions[i - 1] > positions[i]) {
      failures.push(`branch order wrong: ${order[i - 1]} must precede ${order[i]}`);
    }
  }
}

const home = read("index.html");
const licenses = [
  "3230000-045-2023-0002",
  "3740000-045-2021-0070",
  "3560000-045-2025-0006",
  "3910000-045-2022-0032",
  "3290000-045-2025-0002",
  "5670000-045-2025-0003",
];
if (home === null) {
  failures.push("dist/index.html missing");
} else {
  for (const license of licenses) {
    if (!home.includes(license)) {
      failures.push(`footer missing 동물판매업 등록번호 ${license}`);
    }
  }
}

if (failures.length > 0) {
  console.error("COMPLIANCE CHECK FAILED:");
  for (const failure of failures) {
    console.error(`  - ${failure}`);
  }
  process.exit(1);
}
console.log("COMPLIANCE CHECK PASSED");
