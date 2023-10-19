# React Portfolio

React portfolio that hosts a markdown renderer. Allowing me to create and style markdown files in [Obsidan.md](https://Obsidan.md) for writeups instead of making pages for every project.

Uses [Tailwind](https://tailwindcss.com/), and [Create-React-App](https://create-react-app.dev/).

## How to add markdown files

1. Put your markdown file in the ```../public``` folder
2. Import from file and add to lookupMap

```javascript
import Example from '../public/markdown/example.md';
let lookupMap = {
  'example': Example,
};
```

3. If wanted add to main portfolio home page and link it.
```javascript
import projectImage from '../public/image.png';
const projectInfo = [
  {
    title: 'Name of the software (length doesnt matter)',
    description: 'Just a simple desc, this will but cut off depending on what device youre using. just leaving... at the end.',
    image: projectImage,
    languages: ['C++', 'Node.js', 'SQL', 'React', 'Anything'],
    link: '../#writeups#example',
  },
];
```

## Testing, Building, Depolying

```npm run start``` will start the server locally for debugging and development.

```npm run build``` runs the build scripts.

```npm run deploy``` depolys it to github pages.

## NOTE

Make sure to change to the homepage, and name in the ```package.json```.
