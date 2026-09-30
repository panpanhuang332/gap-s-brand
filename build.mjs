/** Build the standalone, offline-capable index.html. Node.js built-ins only. */
import {readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(fileURLToPath(import.meta.url));
let html=await readFile(path.join(root,'src/template.html'),'utf8');
for(const [marker,file] of [['STYLE','style.css'],['CONTENT','content.js'],['SCENE','scene.js'],['APP','app.js']]){
 const raw=await readFile(path.join(root,'src',file),'utf8');
 html=html.replace(`/*__${marker}__*/`,()=>raw.replaceAll('</script>','<\\/script>'));
}
await writeFile(path.join(root,'index.html'),html,'utf8');
console.log(`Built offline index.html (${Buffer.byteLength(html).toLocaleString()} bytes).`);
