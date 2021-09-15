import dotenv from "dotenv";

dotenv.config();

const HOSTNAME = (process.env.HOSTNAME || "localhost") as string;
const PORT = (process.env.PORT || 4000) as number;

const SERVER = {
  hostname: HOSTNAME,
  port: PORT,
};

const config = {
  server: SERVER,
};

export default config;
