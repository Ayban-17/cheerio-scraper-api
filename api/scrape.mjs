import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const testHtml = `<div id="al-main">
      <a href="/test1">Test Link 1</a>
      <a href="/test2">Test Link 2</a>
    </div>`;

    const $ = cheerio.load(testHtml);

    const links = [];
    $('#al-main a').each((i, el) => {
      links.push({
        text: $(el).text().trim(),
        href: $(el).attr('href'),
      });
    });

    res.status(200).json({ message: "✅ Success", links });
  } catch (err) {
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
}
