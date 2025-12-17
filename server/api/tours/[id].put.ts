import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { SupabaseJwtPayload } from "~/interfaces/SupabaseJwtPayload";
import { parseGpx } from "~~/server/utils/gpx";

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);

  const userId = (user as SupabaseJwtPayload).id ?? (user as SupabaseJwtPayload).sub;
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const client = await serverSupabaseClient(event);

  if (!body.gpx_text && body.gpx_path) {
    const points = await parseGpx(body.gpx_path);
    body.gpx_text = JSON.stringify(points);
  }

  // Fetch user role
  const { data: userData } = await client
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  const userRole = userData?.role;
  const isAdminOrSuperAdmin = userRole === 'admin' || userRole === 'superadmin';

  let query = client
    .from("tours")
    .update(body)
    .eq("id", id);

  // If not admin/superadmin, restrict to own tours
  if (!isAdminOrSuperAdmin) {
    query = query.eq("user_id", userId);
  }

  const { data, error } = await query
    .select("*")
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  if (!data) {
    throw createError({ statusCode: 404, statusMessage: "Tour not found" });
  }

  return data;
});

