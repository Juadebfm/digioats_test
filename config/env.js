const dotenv = require("dotenv");

// Load variables from .env when running locally.
dotenv.config();

const REQUIRED_ENV_MAP = {
  MONGO_URI: ["MONGO_URI", "MONGODB_URI"],
  JWT_SECRET: ["JWT_SECRET"],
  REFRESH_TOKEN_SECRET: ["REFRESH_TOKEN_SECRET"],
};

const resolvedEnv = {};

for (const [key, aliases] of Object.entries(REQUIRED_ENV_MAP)) {
  const candidates = Array.from(new Set([key, ...aliases]));
  const value = candidates.map((name) => process.env[name]).find(Boolean);

  if (!value) {
    const label = candidates.join("/");
    throw new Error(
      `Missing required environment variable: ${label}. ` +
        "Set it in your deployment platform (e.g. Vercel) or .env file."
    );
  }

  resolvedEnv[key] = value;
}

module.exports = resolvedEnv;
