"""Fetch unmodified, openly licensed cultural figures and preserve attribution."""
import json, pathlib, re, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor
ROOT=pathlib.Path(__file__).resolve().parents[1]
HEADERS={'User-Agent':'MachinaCaelestis/1.0 (educational observatory)'}
def api(params):
    url='https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode({'action':'query','format':'json',**params})
    return json.load(urllib.request.urlopen(urllib.request.Request(url,headers=HEADERS),timeout=30))
maya='Imix Ik Akbal Kan Chikchan Kimi Manik Lamat Muluk Ok Chuwen Eb Ben Ix Men Kib Kaban Etznab Kawak Ajaw'.split()
nahua='Cipactli Ehecatl2 Calli Cuetzpalin Coatl Miquiztli Mazatl Tochtli Atl3 Itzcuintli Ozomatli Malinalli Acatl Ocelotl Cuauhtli Cozcacuauhtli Ollin Tecpatl Quiahuitl Xochitl'.split()
months=['Maya months - 0 - Pop.svg','Maya months - 1 - Wo.svg','Maya months - 2 - Sip.svg',"Maya-months-03-sotz'.svg",'Maya months - 4 - Sek.svg','Maya-months-05-xul.svg',"Maya months - 6 - Yaxk'in.svg",'Maya months - 7 - Mol.svg',"Maya-months-08-ch'en.svg",'Maya-months-09-yax.svg','Maya-months-10-sak.svg','Maya-months-11-kej.svg','Maya-months-12-mak.svg',"Maya-months-13-k'ank'in.svg",'Maya-months-14-muwan.svg','Maya-months-15-pax.svg',"Maya-months-16-k'ayab'.svg", "Maya-months-17-kumk'u.svg", "Maya-months-18-wayeb'.svg"]
requests=[(f'maya-day-{i}',f'MAYA-g-log-cal-D{i+1:02d}-{name}.svg') for i,name in enumerate(maya)]
requests += [(f'nahua-day-{i}',name+('.svg' if name=='Ollin' else '.jpg')) for i,name in enumerate(nahua)]
requests += [(f'maya-month-{i}',name) for i,name in enumerate(months)]
requests += [('dendera','Denon1802bd3 0051.jpg')]
metadata={}
for start in range(0,len(requests),40):
    data=api({'titles':'|'.join('File:'+name for _,name in requests[start:start+40]),'prop':'imageinfo','iiprop':'url|extmetadata'})
    for page in data['query']['pages'].values():metadata[page['title'][5:]]=page['imageinfo'][0]
def fetch(item):
    id,name=item; info=metadata[name];m=info['extmetadata'];license=m.get('LicenseShortName',{}).get('value','')
    if not any(allowed in license for allowed in ['Public domain','CC BY-SA','CC0','CC BY ']):raise ValueError((name,license))
    path=ROOT/'public/art'/(id+pathlib.Path(name).suffix.lower());path.parent.mkdir(exist_ok=True)
    if not path.exists():
        data=urllib.request.urlopen(urllib.request.Request(info['url'],headers={'User-Agent':'Mozilla/5.0'}),timeout=30).read();path.write_bytes(data)
    clean=lambda key:re.sub('<[^>]+>','',m.get(key,{}).get('value',''))
    return {'id':id,'file':'art/'+path.name,'source':info['descriptionurl'],'license':license,'author':clean('Artist'),'description':clean('ImageDescription'),'credit':clean('Credit')}
with ThreadPoolExecutor(max_workers=4) as pool:records=list(pool.map(fetch,requests))
(ROOT/'src/data/cultural-art.json').write_text(json.dumps(records,ensure_ascii=False,indent=2))
(ROOT/'public/art/ATTRIBUTION.json').write_text(json.dumps(records,ensure_ascii=False,indent=2))
print('Downloaded',len(records),'documented assets')
