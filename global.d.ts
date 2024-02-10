import { Database as DB } from "./types/supabase/database.types";

declare global {
  type Database = DB;
}
