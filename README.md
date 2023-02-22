<div align="center">
  <img src="https://ciro.club/statics/images/icons/1677073378_cn9z8zOsGVkHhuXm-EcXY.svg" style="width: 320px" alt="banner" />
  <h1 align="left">termts</h1>
</div>

> termts is a collection that contains tiny and useful terminal script tools

node version need >= **14**

[English](README.md) | [简体中文](README-ZH.md)

# install

```shell
# npm
npm install -g
# yarn
yarn install termts -g
# pnpm
pnpm add termts -g
```

# uses

**`tool banner <bannerUrl> [path] [title] [align] [size]`**  
Append a banner to the top of the markdown file.

- **path** the path of `README.md` file. if there is no path parameter, the README.md file will be searched for in the current execution directory.
- **title** will render title if passed
- **align** supports `center`, `left` and `right`
- **size** the width of banner image. default is 320px

```shell
tool banner https://picsum.photos/987/496 --path=./yourpath/README.md --title="banner" --align=left --size=100%
```

example:  
origin README.md

```markdown
# Demo
```

after:

```markdown
<div align="left">
    <img src="https://picsum.photos/987/496" style="width: 100%" alt="banner" />
    <h1>banner</h1>
  </div>
  
# Demo
```

preview:  
![preview](./assets/banner-1.jpg)

**`tool version`**  
update version field of package interactively in the current directory

![demo](./assets/tool-version.png)

**`tool commit [lang=zh|en]`**  
shortcut of `git commit -m`. support Chinese(--lang=zh) and English(--lang=en). Default is zh

![demo](./assets/commit-1.png) use --lang param to set language, default is Chinese

![demo](./assets/commit-2.png)

**`tool tree [dir] [deep] [ignore]`**  
output the tree structure of the specified directory

- **dir** the target directory. default is current working directory
- **deep** the depth of the catalogue. default is 1
- **ignore** ignored **first level** list. default is `node_modules` and `.git`

```shell
tool tree --dir=./termts --deep=2 --ignore lib
```

above will output the tree structure of termts project without lib directory

![demo](./assets/tree.jpg)
