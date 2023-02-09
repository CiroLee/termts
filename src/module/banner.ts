/**
 * description: append a banner to the top of the markdown file
 * author: CiroLee<https://github.com/CiroLee>
 */
import fs from 'fs';
import chalk from 'chalk';
const cwd = process.cwd;
interface BannerWriterProps {
  url: string;
  filepath?: string;
  title?: string;
  align?: string;
  size?: string;
}
const template = ({ url, title, align = 'center', size = '320px' }: Omit<BannerWriterProps, 'filepath'>): string => {
  if (title) {
    return `<div align="${align}">
    <img src="${url}" style="width: ${size}" alt="banner" />
    <h1>${title}</h1>
  </div>
  `;
  }
  return `<div align="${align}">
  <img src="${url}" style="width: ${size}" alt="banner" />
</div>
`;
};
export const bannerWriter = ({ url, filepath, title, align, size }: BannerWriterProps): void => {
  if (!url) {
    console.log(chalk.red('[method:banner] url is required'));
    process.exit(1);
  }
  const _filepath = filepath ? filepath : `${cwd()}/README.md`;
  try {
    const md = fs.readFileSync(_filepath, 'utf-8');
    const output = template({ url, align, size, title }) + '\n' + md;
    fs.writeFileSync(_filepath, output);
    console.log(chalk.green('Done 🎉'));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
