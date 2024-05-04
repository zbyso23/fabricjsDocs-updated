import fs from 'fs';
const log = console.log;


const DECORATOR_START = `<!-- DECORATOR START -->`;
const DECORATOR_END = `<!-- DECORATOR END -->`;

const isDecorator = (content) => {
  return (content.indexOf(DECORATOR_START) !== -1 && content.indexOf(DECORATOR_END) !== -1);
}

const removeDecorator = (content) => {
  const [head, rest] = content.split(DECORATOR_START);
  const [ , body] = rest.split(DECORATOR_END);
  return `${head}${body}`;
}

const addDecorator = (content, addon) => {
  if (isDecorator(content)) {
    content = removeDecorator(content);
  }
  const [head, body] = content.split('</head>');
  return `${head}${DECORATOR_START}${addon}${DECORATOR_END}</head>${body}`;
}


fs.readdirSync('.').filter(item => item.match(/html$/)).forEach((item, index) => {
  if (item !== 'afabric.Canvas.html') return;
  const content = fs.readFileSync(`./${item}`, { encoding: 'utf8' });
  const contentWithAddon = addDecorator(content, '<script>console.log("addon");</script>');
  fs.writeFileSync(`./a${item}`, contentWithAddon);
});