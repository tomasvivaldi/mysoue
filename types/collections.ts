import { Database } from "./supabase/database.types";

export type Profile = Database["public"]["Tables"]["users"]["Row"];
