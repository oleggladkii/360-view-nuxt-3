import { serverSupabaseClient } from "#supabase/server";

const isUUID = (str: string) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
};

export default defineEventHandler(async (event) => {
  const param = getRouterParam(event, "id");
  if (!param) {
    throw createError({ statusCode: 400, statusMessage: "Tour ID or Slug is required" });
  }

  const client = await serverSupabaseClient(event);
  let tourId = param;

  // If not a UUID, try to resolve it as a slug
  if (!isUUID(param)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (client as any)
      .from("tours")
      .select("id")
      .eq("url_slug", param)
      .single();

    if (error || !data) {
      throw createError({ statusCode: 404, statusMessage: "Tour not found" });
    }
    tourId = data.id;
  }

  // Increment views first
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: rpcError } = await (client as any).rpc("increment_tour_views", {
    p_tour_id: tourId,
  });

  if (rpcError) {
    throw createError({ statusCode: 500, statusMessage: rpcError.message });
  }

  // Then fetch the tour with updated views
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: tour, error } = await (client as any)
    .from("tours")
    .select("*")
    .eq("id", tourId)
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  if (!tour) {
    throw createError({ statusCode: 404, statusMessage: "Tour not found" });
  }

  // Fetch author details
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: author } = await (client as any)
    .from("public_profiles")
    .select("full_name, avatar_url")
    .eq("id", tour.user_id)
    .single();

  return {
    ...tour,
    user: author,
  };
});

