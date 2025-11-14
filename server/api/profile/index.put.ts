import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const body = await readBody(event);

  if (!body || typeof body !== "object") {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request body",
    });
  }

  const payload = {
    p_full_name: body.full_name ?? null,
    p_phone: body.phone ?? null,
    p_website: body.website ?? null,
    p_facebook: body.facebook ?? null,
    p_instagram: body.instagram ?? null,
    p_linkedin: body.linkedin ?? null,
    p_avatar_url: body.avatar_url ?? null,
  };

  const client = await serverSupabaseClient(event);
  const { data, error } = await client.rpc("update_my_profile", payload);

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return { profile: data };
});

