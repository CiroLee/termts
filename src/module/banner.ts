/**
 * description: append a banner to the top of the markdown file
 * author: CiroLee<https://github.com/CiroLee>
 */
import fs from 'fs';
import chalk from "chalk";
const cwd = process.cwd();
const template = (url: string, title?: string): string => {
  if(title) {
    return `<div align="center">
    <img src=${url} style="width: 320px" alt="banner" />
    <h1>${title}</h1>
  </div>
  ` 
  }
  return `<div align="center">
  <img src=${url} style="width: 320px" alt="banner" />
</div>
`
}
export const bannerWriter = (url: string ,filepath?: string, title?: string): void => {
  if (!url) {
    console.log(chalk.red('[method:banner] url is required'));
    process.exit(1);
  }
  const _filepath = filepath ? filepath : `${cwd}/README.md`;
  try {
    const md = fs.readFileSync(_filepath, 'utf-8');
    const output = template(url, title) + '\n' + md; 
    fs.writeFileSync(_filepath, output);
    console.log(chalk.green('Done 🎉'));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  
  
}