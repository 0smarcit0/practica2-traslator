import type { APIRoute } from "astro";
import fs from "fs"

//api donde se toma el request, se toman los atributos del body y se escriben en los archivos
export const POST: APIRoute= async ({ request }) => {
  let a = await request.json();
  fs.writeFileSync("public/glifos.txt",a.input);
  fs.writeFileSync("public/salidaglifos.txt",a.output);
  return new Response(
    JSON.stringify({
      message: "This was a POST!",
    }),
  );
};

