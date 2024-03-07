import type { APIRoute } from "astro";
import * as jose from "jose";
export const POST: APIRoute = async ({ request }) => {
  const payload = request.json();

  try {
    const token = await new jose.SignJWT({ payload })
      .setIssuedAt()
      .setProtectedHeader({ alg: "HS256" })
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode("secret"));

    return new Response(
      JSON.stringify({
        token,
      })
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        error: e,
      })
    );
  }
};
