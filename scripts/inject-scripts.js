import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

async function injectScript() {
  try {
    // Path to the built index.html file
    const indexPath = join(process.cwd(), 'build', 'client', 'index.html');
    const assetsPath = join(process.cwd(), 'build', 'client', 'assets');

    // Read the index.html file
    const data = await readFile(indexPath, 'utf8');

    // Check if script tag already exists
    if (data.includes('entry.client-')) {
      console.log('Script tag already exists in index.html');
      return;
    }

    // Find the entry.client file in the assets directory
    const files = await readdir(assetsPath);
    const entryClientFile = files.find(file => file.startsWith('entry.client-') && file.endsWith('.js'));
    
    if (!entryClientFile) {
      console.error('Could not find entry.client file in assets directory');
      process.exit(1);
    }

    // Find the closing body tag and insert the script tag before it
    const scriptTag = `    <script type="module" src="/assets/${entryClientFile}"></script>\n  </body>`;
    const modifiedData = data.replace('  </body>', scriptTag);

    // Write the modified content back to the file
    await writeFile(indexPath, modifiedData, 'utf8');
    console.log(`Script tag successfully injected into index.html: ${entryClientFile}`);
  } catch (err) {
    console.error('Error processing index.html:', err);
    process.exit(1);
  }
}

injectScript();