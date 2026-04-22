const prerender = false;
const brevoApiKey = "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";
const brevoListId = Number.parseInt(
  "15",
  10
);
const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json" }
});
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v ?? ""));
const GET = async () => json({ error: "Method not allowed." }, 405);
const POST = async ({ request }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Requête invalide." }, 400);
  }
  const email = String(body?.email ?? "").trim().toLowerCase().slice(0, 320);
  if (!isValidEmail(email)) {
    return json({ error: "Adresse email invalide." }, 400);
  }
  try {
    const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email,
        listIds: [brevoListId],
        updateEnabled: true
      })
    });
    const responseText = await brevoRes.text();
    console.log("[awene-notify] brevo_response", brevoRes.status, responseText);
    if (!brevoRes.ok) {
      console.error("[awene-notify] brevo_error", brevoRes.status, responseText);
      return json({ error: "Une erreur est survenue. Merci de réessayer." }, 500);
    }
    return json({ ok: true, message: "Inscription enregistrée." });
  } catch (err) {
    console.error("[awene-notify] request_failed", err instanceof Error ? err.message : "unknown");
    return json({ error: "Une erreur réseau est survenue. Merci de réessayer." }, 500);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
