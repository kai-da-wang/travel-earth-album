from pathlib import Path
import json,base64,sys
root=Path('work'); assets=root/'assets'; out=Path('outputs');out.mkdir(exist_ok=True)
template=(root/'index.template.html').read_text(encoding='utf-8')
data={'china':json.loads((assets/'china.json').read_text(encoding='utf-8')),'world':json.loads((assets/'world.json').read_text(encoding='utf-8'))}
for feature in data['china']['features']:
 polygons=feature['geometry']['coordinates'] if feature['geometry']['type']=='MultiPolygon' else [feature['geometry']['coordinates']]
 for polygon in polygons:
  for index,ring in enumerate(polygon):
   area=sum(ring[i][0]*ring[i+1][1]-ring[i+1][0]*ring[i][1] for i in range(len(ring)-1))
   if (index==0 and area<0) or (index>0 and area>0): ring.reverse()
planet_names={'jupiter':'2k_jupiter.jpg','saturn':'2k_saturn.jpg','saturnRing':'2k_saturn_ring_alpha.png','mars':'2k_mars.jpg','moon':'2k_moon.jpg','neptune':'2k_neptune.jpg','sky':'2k_stars_milky_way.jpg','earthBump':'earth-topology.png'}
planet_data={key:'data:image/'+('png' if name.endswith('.png') else 'jpeg')+';base64,'+base64.b64encode((assets/'planets'/name).read_bytes()).decode() for key,name in planet_names.items()}
cosmos_css=(root/'solar-system.css').read_text(encoding='utf-8')
app=(root/'solar-system.js').read_text(encoding='utf-8')+'\n'+(root/'app.js').read_text(encoding='utf-8')+'\n'+(root/'flipbook.js').read_text(encoding='utf-8')+'\n'+(root/'cinematic.js').read_text(encoding='utf-8')+'\nstart();openCinematic();'
for key,value in {'CSS':(root/'style.css').read_text(encoding='utf-8')+'\n'+(root/'album.css').read_text(encoding='utf-8')+'\n'+cosmos_css+'\n'+(root/'flipbook.css').read_text(encoding='utf-8')+'\n'+(root/'cinematic.css').read_text(encoding='utf-8'),'APP':app,'FLIPBOOK':(assets/'quick-flipbook.bundle.js').read_text(encoding='utf-8'),'PLANETS':json.dumps(planet_data,separators=(',',':')),'THREE':'var THREE=(()=>{const exports={};'+(assets/'three.current.js').read_text(encoding='utf-8')+';return exports;})();','GLOBE':(assets/'globe.min.js').read_text(encoding='utf-8'),'MAP':json.dumps(data,ensure_ascii=False,separators=(',',':')),'EARTH':'data:image/jpeg;base64,'+base64.b64encode((assets/'earth-night.jpg').read_bytes()).decode()}.items():
 template=template.replace('/*__'+key+'__*/',value)
target=Path(sys.argv[1]) if len(sys.argv)>1 else out/'同游地球相册.html'
target.write_text(template,encoding='utf-8')
print('Built',len(template.encode('utf-8')),'bytes')
