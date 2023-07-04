import { postgres } from "../deps.js";

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  sql = postgres({});
}

export { sql };
// https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css