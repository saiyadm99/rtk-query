// app/page.jsx
import { codeToHtml } from "shiki";
import {
  Clipboard,
} from "lucide-react";

const snippets = {
  curl: `curl --request GET \\
--url https://v3.football.api-sports.io/fixtures/live \\
--header 'x-apisports-key: YOUR_API_KEY'`,

  javascript: `fetch("https://v3.football.api-sports.io/fixtures/live", {
  headers: {
    "x-apisports-key": "YOUR_API_KEY"
  }
})`,

  python: `import requests

url = "https://v3.football.api-sports.io/fixtures/live"

headers = {
  "x-apisports-key": "YOUR_API_KEY"
}

response = requests.get(
  url,
  headers=headers
)`,

  php: `<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://v3.football.api-sports.io/fixtures/live",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => [
    "x-apisports-key: YOUR_API_KEY"
  ]
]);

$response = curl_exec($curl);

?>`,
};

async function highlight(code, lang) {
  return await codeToHtml(code, {
    lang,
    theme: "github-dark",
  });
}

export default async function Page() {
  const html = await highlight(
    snippets.curl,
    "bash"
  );

  return (
    <main className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-10">
      
      <div className="w-full max-w-4xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0b1120]">
        
        {/* Tabs */}
        <div className="flex items-center gap-8 px-8 pt-6 border-b border-white/5">
          
          <button className="relative pb-4 text-white font-semibold">
            cURL

            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#f5b942]" />
          </button>

          <button className="pb-4 text-gray-400 font-semibold">
            JavaScript
          </button>

          <button className="pb-4 text-gray-400 font-semibold">
            Python
          </button>

          <button className="pb-4 text-gray-400 font-semibold">
            PHP
          </button>
        </div>

        {/* Code Area */}
        <div className="relative px-6 py-6">
          
          {/* Copy Button */}
          <button className="absolute top-6 right-6 z-10 text-gray-400 hover:text-white transition">
            <Clipboard size={18} />
          </button>

          {/* Shiki Output */}
          <div
            className="
              [&_pre]:!bg-transparent
              [&_pre]:!m-0
              [&_pre]:overflow-x-auto
              [&_pre]:text-[15px]
              [&_pre]:leading-8
              [&_code]:font-mono
            "
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
        </div>
      </div>
    </main>
  );
}