import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { SupabaseJwtPayload } from "~/interfaces/SupabaseJwtPayload";

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);

  const userId = (user as SupabaseJwtPayload).id ?? (user as SupabaseJwtPayload).sub;
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const body = await readBody<{
    name: string;
    description?: string;
    url_slug: string;
    preview_url?: string;
    tour_date?: string;
    time_of_day?: "day" | "night";
    gpx_path?: string;
  }>(event);

  const client = await serverSupabaseClient(event);

  const { data, error } = await client
    .from("tours")
    .insert({
      ...body,
      user_id: userId,
    })
    .select("*")
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data;
});

