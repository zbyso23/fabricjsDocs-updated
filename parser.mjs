import { match } from 'assert';
import fs from 'fs';
const log = console.log;

let limit = 50;
const allDataOut = {
    files: [],
    props: [],
};
fs.readdirSync('.').filter(item => item.match(/html$/)).forEach((item, index) => {
    const fileOut = `./data/${item.replace('html', 'json')}`;
    let dataOut = {
        file: item,
        props: [],
    };
    allDataOut.files.push(item);
    // log(`item:: `, item);
    let section = 'default';
    let prop = null;

    // if (item !== 'fabric.Canvas.html') return;
    // if (--limit < 0) return;
    const data = fs.readFileSync(`./${item}`, 'utf-8');
    // const rows = data.matchAll(/<h([345]{1,1})([^>]+)>([^<]+)<\/h[345]{1,1}>/g);
    const rows = data.matchAll(/<h([34]){1,1}([^>]+>)(.+)(<\/h[34]{1,1}>)|<div class="(description)">([^<]+)/g);
    let row;
    while (row = rows.next()) {
        if (!row.value) break;
        const { input, ...rowClean } = row.value;
        if (rowClean[1] === '3') {
            section = rowClean[3];
        } else  if (rowClean[1] === '4') {
            log(`:: SECTION: ${section}`);
            let name = rowClean[3].match(/<\/span>([^<]+)/);
            let hash = rowClean[3].match(/<a href="(#[^"]+)"/);
            if (name && hash) {
                name = name[1];
                hash = hash[1];
                if (prop) {
                    allDataOut.props.push({ section, name: prop.name, hash: prop.hash, desc: null, file: index });
                    dataOut.props.push({ section, name: prop.name, hash: prop.hash, desc: null });
                }
                prop = { name, hash };
                log(`:: ROW`, { name, hash });
            }
            // log(`:: ROW`, name);
            // log(`:: ROW`, rowClean[3]);
        } else if (rowClean[5] === 'description') {
            log(`::::::: DESC`);
            let desc = rowClean[6].replace(/\n/g, ' ').trim();
            if (prop) {
                allDataOut.props.push({ section, name: prop.name, hash: prop.hash, desc, file: index });
                dataOut.props.push({ section, name: prop.name, hash: prop.hash, desc });
            }
            prop = null;
        }
    }

    fs.writeFileSync(fileOut, JSON.stringify(dataOut, null, 2));
    // rows.forEach(row => {
    //     log(`:: ROW`, row);
    // });
    // log(`:: ROWS ::`, rows);
    return;
    rows.shift();
    rows.forEach(row => {
        row = row.split('</h4>')[0];
        const id = row.match(/<a href=\"([^"]+)\"/);
        if (!id) {
            if (--limit < 0) return;
            log(`:::::::`, row);
        }
        // log(id ?? 'Miss!');
    })
    
})
fs.writeFileSync('./data/all.json', JSON.stringify(allDataOut, null, 1));