import { serverSupabaseClient } from "#supabase/server";

const isUUID = (str: string) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
};

export default defineEventHandler(async (event) => {
  const param = getRouterParam(event, "id");
  if (!param) {
    throw createError({ statusCode: 400, statusMessage: "Tour ID is required" });
  }

  const client = await serverSupabaseClient(event);
  const query = (client as any).from("tours").select("*");

  if (isUUID(param)) {
    query.eq("id", param);
  } else {
    query.eq("url_slug", param);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await query.single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  if (!data) {
    throw createError({ statusCode: 404, statusMessage: "Tour not found" });
  }

  return data;
});

