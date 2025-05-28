import type { APIRoute } from "astro";
//import fs from "fs"


export const POST: APIRoute= async ({ request }) => {
  let a = await request.json();
  //fs.writeFileSync("public/glifos.txt",a.input);
  //fs.writeFileSync("public/salidaglifos.txt",a.output);
  return new Response(
    JSON.stringify({
      message: "This was a POST!",
    }),
  );
};

