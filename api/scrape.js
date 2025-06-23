import cheerio from 'cheerio';
import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing ?url=' });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const links = [];
    $('#al-main a').each((i, el) => {
      links.push({
        text: $(el).text().trim(),
        href: $(el).attr('href')
      });
    });

    res.status(200).json({ count: links.length, links });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
