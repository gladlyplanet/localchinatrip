import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const SITE_HOST = "www.localchinatrip.com";
const SITE_ORIGIN = `https://${SITE_HOST}`;
const INDEXNOW_KEY = "332098164fbaba1b6da9db61c7b87fe0767558fd24238a3478b79002665e415c";
const KEY_LOCATION = `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`;
const MAX_URLS_PER_REQUEST = 10_000;
const BLOCKED_PATH_PREFIXES = [
  "/api",
  "/_next",
  "/thank-you",
  "/test",
  "/tests",
  "/testing",
  "/preview",
  "/staging",
];

function usage() {
  return [
    "Usage:",
    "  npm run indexnow -- <url1> <url2> ...",
    "  npm run indexnow -- --dry-run <url1> <url2> ...",
  ].join("\n");
}

function isBlockedPath(pathname) {
  const normalizedPath = pathname.toLowerCase();
  return BLOCKED_PATH_PREFIXES.some(
    (prefix) => normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`),
  );
}

function normalizePublicUrl(input) {
  let url;

  try {
    url = new URL(input);
  } catch {
    throw new Error(`Invalid URL: ${input}`);
  }

  if (url.origin !== SITE_ORIGIN) {
    throw new Error(`Only ${SITE_ORIGIN}/ URLs are allowed: ${input}`);
  }

  if (url.username || url.password || url.search || url.hash) {
    throw new Error(`Credentials, query strings, and fragments are not allowed: ${input}`);
  }

  if (isBlockedPath(url.pathname)) {
    throw new Error(`This non-public or internal path cannot be submitted: ${input}`);
  }

  if (url.pathname !== "/") {
    url.pathname = url.pathname.replace(/\/+$/, "");
  }

  return url.href;
}

async function verifyKeyFile() {
  const keyFile = fileURLToPath(new URL(`../public/${INDEXNOW_KEY}.txt`, import.meta.url));
  const keyFileContent = (await readFile(keyFile, "utf8")).trim();

  if (!/^[A-Za-z0-9-]{8,128}$/.test(INDEXNOW_KEY)) {
    throw new Error("The configured IndexNow key does not match the allowed key format.");
  }

  if (keyFileContent !== INDEXNOW_KEY) {
    throw new Error(`IndexNow key file content does not match the configured key: ${keyFile}`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const unknownOptions = args.filter((arg) => arg.startsWith("--") && arg !== "--dry-run");

  if (unknownOptions.length > 0) {
    throw new Error(`Unknown option: ${unknownOptions.join(", ")}\n${usage()}`);
  }

  const dryRun = args.includes("--dry-run");
  const requestedUrls = args.filter((arg) => arg !== "--dry-run");

  if (requestedUrls.length === 0) {
    throw new Error(`At least one production URL is required.\n${usage()}`);
  }

  await verifyKeyFile();

  const urlList = [...new Set(requestedUrls.map(normalizePublicUrl))];

  if (urlList.length > MAX_URLS_PER_REQUEST) {
    throw new Error(`IndexNow accepts at most ${MAX_URLS_PER_REQUEST} URLs per request.`);
  }

  const payload = {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  if (dryRun) {
    console.log(`[IndexNow] Dry run only; no request sent. ${urlList.length} unique URL(s) validated.`);
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  let response;
  try {
    response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "LocalChinaTrip-IndexNow/1.0",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(20_000),
    });
  } catch (error) {
    throw new Error(`IndexNow request failed before receiving a response: ${error.message}`);
  }

  console.log(`[IndexNow] HTTP ${response.status} ${response.statusText}`);

  if (!response.ok) {
    const responseBody = (await response.text()).trim();
    if (responseBody) console.error(`[IndexNow] Response: ${responseBody}`);
    process.exitCode = 1;
    return;
  }

  console.log(`[IndexNow] Submitted ${urlList.length} unique URL(s).`);
}

main().catch((error) => {
  console.error(`[IndexNow] ${error.message}`);
  process.exitCode = 1;
});
