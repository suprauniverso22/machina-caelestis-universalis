const dataURL=(blob:Blob)=>new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=reject;reader.readAsDataURL(blob);});
export async function captureWheel(svg:SVGSVGElement):Promise<string>{
 const clone=svg.cloneNode(true) as SVGSVGElement;
 clone.setAttribute('xmlns','http://www.w3.org/2000/svg');clone.setAttribute('width','2200');clone.setAttribute('height','2200');
 clone.style.cssText='background:#f5ecd2';
 const original=svg.querySelectorAll('*'),copied=clone.querySelectorAll('*');
 original.forEach((el,i)=>{const style=getComputedStyle(el);for(const key of ['font-family','font-size','text-anchor','dominant-baseline','fill','stroke','stroke-width','opacity']){let value=style.getPropertyValue(key);value=value.replace(/url\(["']?[^#)]+#([^"')]+)["']?\)/g,'url(#$1)');(copied[i] as SVGElement).style.setProperty(key,value);}});
 await Promise.all(Array.from(clone.querySelectorAll('image')).map(async image=>{const url=image.getAttribute('href');if(!url)return;const response=await fetch(url);if(!response.ok)throw Error('No se pudo incorporar una imagen a la captura.');image.setAttribute('href',await dataURL(await response.blob()));}));
 const fonts:string[]=[];for(const sheet of Array.from(document.styleSheets)){try{for(const rule of Array.from(sheet.cssRules)){if(rule instanceof CSSFontFaceRule){let css=rule.cssText;const url=css.match(/url\(["']?([^"')]+)["']?\)/)?.[1];if(url){const response=await fetch(new URL(url,sheet.href||location.href));if(response.ok)css=css.replace(url,await dataURL(await response.blob()));}fonts.push(css);}}}catch{/* Cross-origin styles do not occur in the local wheel. */}}
 const style=document.createElementNS('http://www.w3.org/2000/svg','style');style.textContent=fonts.join('\n');clone.prepend(style);
 const url=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)],{type:'image/svg+xml;charset=utf-8'}));
 try{const image=new Image();await new Promise<void>((resolve,reject)=>{image.onload=()=>resolve();image.onerror=()=>reject(Error('No se pudo renderizar la captura.'));image.src=url;});const canvas=document.createElement('canvas');canvas.width=2200;canvas.height=2200;const context=canvas.getContext('2d');if(!context)throw Error('Captura no disponible.');context.fillStyle='#f5ecd2';context.fillRect(0,0,2200,2200);context.drawImage(image,0,0,2200,2200);return canvas.toDataURL('image/png');}finally{URL.revokeObjectURL(url);}
}
