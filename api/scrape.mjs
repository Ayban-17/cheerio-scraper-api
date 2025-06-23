import cheerio from 'cheerio';

export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  try {
    const html = `
      <div id="al-main">
        <a href="/example">Example Link</a>
      </div>
    `;

    const $ = cheerio.load(html);
    const links = [];

    $('#al-main a').each((_, el) => {
      links.push({
        text: $(el).text().trim(),
        href: $(el).attr('href')
      });
    });

    return new Response(JSON.stringify({ message: "✅ Success", links }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ message: "❌ Failed", error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
