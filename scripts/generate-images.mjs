import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import https from 'https';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const OUTPUT_DIR = './public/images/generated';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const imagePrompts = [
  {
    name: 'hero-background',
    prompt: `Aerial view of a futuristic gaming room at night, multiple glowing computer monitors arranged in a circle, neon cyan and hot pink lighting, cables and ethernet cords creating geometric patterns on the floor, synthwave retrowave art style, dark purple and black atmosphere, lens flare effects, cyberpunk LAN party setup, birds eye view, cinematic lighting, no people, no text, no watermarks`,
    size: '1792x1024',
  },
  {
    name: 'countdown-background',
    prompt: `Synthwave landscape with perspective grid floor extending to horizon, low poly mountains in distance, giant glowing hourglass floating in sky, neon cyan and magenta sunset, starfield above, glitch artifacts, VHS aesthetic, 80s retro futurism, no text, dark atmospheric, pixel art influence, no watermarks`,
    size: '1792x1024',
  },
  {
    name: 'location-house',
    prompt: `Synthwave illustration of a modern luxury house at night surrounded by tall pine trees, swimming pool glowing neon cyan, hot tub with magenta steam rising, gaming setup visible through large windows with colorful monitor glow, Texas woodland aesthetic, retrowave 80s art style, neon sign lighting effects, starry night sky with shooting star, no text, no watermarks`,
    size: '1792x1024',
  },
  {
    name: 'rsvp-background',
    prompt: `Abstract digital landscape, flowing data streams in neon cyan and magenta colors, particle effects like fireflies, subtle matrix-style elements in background, synthwave color palette, dark purple atmosphere, geometric triangles and hexagons floating, cyberpunk aesthetic, soft focus dreamy feeling, no text, no watermarks`,
    size: '1792x1024',
  },
  {
    name: 'footer-skyline',
    prompt: `Wide panoramic synthwave city skyline silhouette, retro futuristic skyscrapers, neon signs glowing cyan and pink, pixel art style buildings, perfect reflection on calm water below, 80s aesthetic, simple geometric shapes, dark gradient sky transitioning from purple to black, stars and distant galaxies above, minimalist retrowave, no text, no watermarks`,
    size: '1792x1024',
  },
  {
    name: 'squad-background',
    prompt: `Dark atmospheric gaming arena interior, rows of empty gaming stations with glowing monitors in cyan and pink, dramatic spotlights from above, smoke/haze effects, esports tournament venue aesthetic, synthwave retrowave style, dramatic lighting, no people, cinematic wide shot, no text, no watermarks`,
    size: '1792x1024',
  },
  {
    name: 'decorative-joystick',
    prompt: `Isometric pixel art arcade joystick on glowing pedestal, neon cyan base with hot pink ball top, synthwave style, pure black background, 16-bit retro gaming aesthetic, subtle neon glow and light rays, floating in space, clean minimal composition, no text, no watermarks`,
    size: '1024x1024',
  },
  {
    name: 'decorative-controller',
    prompt: `Floating video game controller with glowing neon buttons in cyan pink and green, synthwave retrowave art style, pure black background, dramatic lighting from below, 80s retro futurism aesthetic, gaming icon, clean minimal composition, no text, no watermarks`,
    size: '1024x1024',
  },
  {
    name: 'decorative-pizza',
    prompt: `Stylized pizza slice with neon glow outline in cyan, melting cheese with pink and yellow highlights, synthwave LAN party gaming food aesthetic, pure black background, retro 80s style, floating with subtle sparkle effects, clean minimal composition, no text, no watermarks`,
    size: '1024x1024',
  },
  {
    name: 'decorative-energy-drink',
    prompt: `Glowing energy drink can with neon cyan and hot pink colors, radioactive glow effect, synthwave aesthetic, gamer fuel concept, pure black background, retro futuristic product design, floating with energy particles around it, clean minimal composition, no text, no watermarks`,
    size: '1024x1024',
  },
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete partial file
      reject(err);
    });
  });
}

async function generateImage(imageConfig) {
  console.log(`\nGenerating: ${imageConfig.name}...`);

  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: imageConfig.prompt,
      n: 1,
      size: imageConfig.size,
      quality: 'hd',
      style: 'vivid',
    });

    const imageUrl = response.data[0].url;
    const revisedPrompt = response.data[0].revised_prompt;

    console.log(`  Revised prompt: ${revisedPrompt?.substring(0, 100)}...`);

    const filepath = path.join(OUTPUT_DIR, `${imageConfig.name}.png`);
    await downloadImage(imageUrl, filepath);

    console.log(`  Saved to: ${filepath}`);
    return { success: true, name: imageConfig.name, filepath };
  } catch (error) {
    console.error(`  Error generating ${imageConfig.name}:`, error.message);
    return { success: false, name: imageConfig.name, error: error.message };
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('The Woodlands LAN 2026 - Image Generation');
  console.log('='.repeat(60));
  console.log(`\nGenerating ${imagePrompts.length} images...\n`);

  const results = [];

  for (const imageConfig of imagePrompts) {
    const result = await generateImage(imageConfig);
    results.push(result);

    // Add a small delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n' + '='.repeat(60));
  console.log('Generation Complete!');
  console.log('='.repeat(60));

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`\nSuccessful: ${successful.length}/${results.length}`);
  if (failed.length > 0) {
    console.log('Failed:');
    failed.forEach(f => console.log(`  - ${f.name}: ${f.error}`));
  }

  console.log(`\nImages saved to: ${OUTPUT_DIR}`);
}

main().catch(console.error);
