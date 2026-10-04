/*
 * 同游实体画册 — original integration and page artwork.
 * The physical sheet deformation is provided by Quick FlipBook (Bandinopla,
 * BSD-2-Clause), the same engine used by create-photo-flipbook-ui / 3D Book 2.
 * Drag completion thresholds follow that project's MIT-licensed drag helpers.
 * No remote requests, personal photo uploads, or changes to album storage.
 */
'use strict';
const reducedMotion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
let bookIndex=0;
const physicalAlbum={key:'',photoData:[],preview:null,reader:null,dialog:null,photoIndex:0};
const bookPositions=new Map();
try{const saved=JSON.parse(localStorage.getItem('tongyou-book-positions')||'[]');if(Array.isArray(saved))for(const entry of saved.slice(-1000))if(Array.isArray(entry)&&typeof entry[0]==='string'&&typeof entry[1]==='string')bookPositions.set(entry[0],entry[1])}catch{}
function rememberBookPosition(photo){
 const id=selected.photos[photo]?.id;if(!id)return;
 bookPositions.delete(selected.id);bookPositions.set(selected.id,id);
 if(bookPositions.size>1000)bookPositions.delete(bookPositions.keys().next().value);
 try{localStorage.setItem('tongyou-book-positions',JSON.stringify([...bookPositions]))}catch{}
}
function syncSceneActivity(){
 const reading=!!physicalAlbum.dialog?.open,inactive=document.hidden||reading||!!window.__cinematicActive;
 if(typeof globe!=='undefined'&&globe)globe[inactive?'pauseAnimation':'resumeAnimation']();
 physicalAlbum.preview?.setPaused(inactive);physicalAlbum.reader?.setPaused(document.hidden);
}
document.addEventListener('visibilitychange',syncSceneActivity);
function renderPhotoIndex(){
 const host=$('#physicalBookIndex');host.replaceChildren();
 selected.photos.forEach((photo,index)=>{
  const button=albumButton('book-index-photo',`跳到第 ${index+1} 张照片`,'');
  const image=albumEl('img');image.src=photo.data;image.alt='';image.loading='lazy';image.decoding='async';image.draggable=false;
  button.append(image,albumEl('span','',String(index+1).padStart(2,'0')));
  button.onclick=()=>physicalAlbum.reader?.jump(index);host.append(button);
 });
}

function albumEl(tag,className,text){const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node}
function albumButton(className,label,text){const b=albumEl('button',className,text);b.type='button';b.setAttribute('aria-label',label);return b}
function albumSpreadCount(){return Math.max(1,Math.ceil((selected.photos.length+1)/2))}
function updateBookState(){
 const count=albumSpreadCount();
 $('#albumCounter').textContent=`${String(bookIndex+1).padStart(2,'0')} / ${String(count).padStart(2,'0')}`;
 $('#albumPrev').disabled=bookIndex===0||!!physicalAlbum.preview?.turning;
 $('#albumNext').disabled=bookIndex>=count-1||!!physicalAlbum.preview?.turning;
 if(physicalAlbum.dialog?.open)physicalAlbum.reader?.updateControls();
}
function turnBook(delta){
 const active=physicalAlbum.dialog?.open?physicalAlbum.reader:physicalAlbum.preview;
 active?.step(delta);
}
function renderBook(){
 const photos=selected.photos,host=$('#gallery');
 $('#albumBook').hidden=!photos.length;
 const key=selected.id+':'+photos.map(p=>p.id).join(',')+':'+selected.name+':'+selected.date+':'+selected.note;
 if(physicalAlbum.key===key&&physicalAlbum.photoData.length===photos.length&&photos.every((p,i)=>physicalAlbum.photoData[i]===p.data)){updateBookState();return}
 physicalAlbum.key=key;physicalAlbum.photoData=photos.map(p=>p.data);
 physicalAlbum.photoIndex=Math.max(0,photos.findIndex(p=>p.id===bookPositions.get(selected.id)));bookIndex=Math.floor((physicalAlbum.photoIndex+1)/2);
 physicalAlbum.preview?.dispose();physicalAlbum.preview=null;
 if(physicalAlbum.dialog?.open){physicalAlbum.reader?.dispose();physicalAlbum.reader=null;physicalAlbum.dialog.close()}
 host.replaceChildren();host.dataset.albumKey=key;host.classList.add('physical-gallery');
 if(!photos.length){updateBookState();return}
 host.setAttribute('aria-label','立体旅行画册。拖动翻页，点击照片放大，也可打开大画册。');
 const heading=$('#albumBook .album-heading');
 if(heading){heading.children[0].textContent='我们的立体纪念册';heading.children[1].textContent='纸页翻动 · 点击放大'}
 const stage=albumEl('div','book-preview-stage');stage.setAttribute('aria-label','实体画册预览');
 const launch=albumButton('open-physical-book','打开3D画册','打开 3D 画册');
 const launchArrow=albumEl('span','','↗');launch.append(launchArrow);launch.onclick=openPhysicalAlbum;
 host.append(stage,launch);
 physicalAlbum.preview=new PhysicalPhotoBook(stage,{preview:true,spread:bookIndex,photo:physicalAlbum.photoIndex,onChange:(spread,photo)=>{bookIndex=spread;physicalAlbum.photoIndex=photo;rememberBookPosition(photo);updateBookState()}});
 $('#albumPrev').setAttribute('aria-label','画册上一页');$('#albumNext').setAttribute('aria-label','画册下一页');
 $('#albumPrev').onclick=()=>turnBook(-1);$('#albumNext').onclick=()=>turnBook(1);
 updateBookState();
}

function ensureAlbumDialog(){
 if(physicalAlbum.dialog)return physicalAlbum.dialog;
 const dialog=albumEl('dialog','physical-book-dialog');dialog.id='physicalAlbumDialog';
 dialog.setAttribute('aria-labelledby','physicalAlbumTitle');
 const header=albumEl('div','physical-book-header'),info=albumEl('div');
 info.append(albumEl('span','physical-book-eyebrow','OUR TRAVEL JOURNAL'));
 const title=albumEl('h2');title.id='physicalAlbumTitle';info.append(title);
 const description=albumEl('p','physical-book-description');description.id='physicalAlbumDescription';info.append(description);
 const actions=albumEl('div','physical-book-actions');
 const catalog=albumButton('book-index-toggle','展开照片目录','照片目录');catalog.id='physicalBookIndexToggle';catalog.setAttribute('aria-expanded','false');catalog.setAttribute('aria-controls','physicalBookIndex');
 catalog.onclick=()=>{const index=$('#physicalBookIndex');index.hidden=!index.hidden;catalog.setAttribute('aria-expanded',String(!index.hidden));catalog.setAttribute('aria-label',index.hidden?'展开照片目录':'收起照片目录');if(!index.hidden){if(!index.childElementCount)renderPhotoIndex();physicalAlbum.reader?.updateControls()}};
 const close=albumButton('physical-book-close','关闭3D画册','×');close.onclick=()=>dialog.close();actions.append(catalog,close);header.append(info,actions);
 const stage=albumEl('div','physical-book-stage');stage.id='physicalBookStage';
 const footer=albumEl('div','physical-book-footer'),nav=albumEl('div','physical-book-navigation');
 const prev=albumButton('physical-book-nav','画册上一页','‹');prev.id='physicalBookPrev';prev.onclick=()=>physicalAlbum.reader?.step(-1);
 const counter=albumEl('span','physical-book-counter');counter.id='physicalBookCounter';counter.setAttribute('aria-live','polite');
 const next=albumButton('physical-book-nav','画册下一页','›');next.id='physicalBookNext';next.onclick=()=>physicalAlbum.reader?.step(1);
 nav.append(prev,counter,next);footer.append(nav,albumEl('p','physical-book-hint','拖动书页翻阅 · 滚轮 / 方向键翻页 · 点击照片放大'));
 const index=albumEl('div','book-photo-index');index.id='physicalBookIndex';index.hidden=true;index.setAttribute('role','navigation');index.setAttribute('aria-label','照片目录');
 dialog.append(header,stage,index,footer);document.body.append(dialog);physicalAlbum.dialog=dialog;
 dialog.addEventListener('close',()=>{physicalAlbum.reader?.dispose();physicalAlbum.reader=null;$('#physicalBookIndex').replaceChildren();syncSceneActivity();document.body.classList.remove('reading-physical-album');updateBookState()});
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
 document.addEventListener('keydown',event=>{
  if(!dialog.open||$('#lightbox').open||event.defaultPrevented)return;
  if(event.target.closest?.('#physicalBookIndex')&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){
   event.preventDefault();const items=[...$('#physicalBookIndex').children],current=items.indexOf(event.target.closest('button'));
   const next=event.key==='Home'?0:event.key==='End'?items.length-1:Math.max(0,Math.min(items.length-1,current+(event.key==='ArrowLeft'?-1:1)));items[next]?.focus();return;
  }
  if(event.key===' '&&event.target.closest?.('button,input,select,textarea,a'))return;
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'||event.key===' '){event.preventDefault();physicalAlbum.reader?.step(event.key==='ArrowLeft'?-1:1)}
  if(event.key==='Home'||event.key==='End'){event.preventDefault();physicalAlbum.reader?.jump(event.key==='Home'?0:physicalAlbum.reader.maxPhoto)}
 });
 return dialog;
}
function openPhysicalAlbum(){
 if(!selected.photos.length)return;
 const dialog=ensureAlbumDialog();
 $('#physicalAlbumTitle').textContent=selected.name+' · 同游纪念册';
 $('#physicalAlbumDescription').textContent=[selected.date?selected.date.replaceAll('-',' / '):'',`${selected.photos.length} 张属于我们的回忆`].filter(Boolean).join('  ·  ');
 if(physicalAlbum.preview?.turning)physicalAlbum.preview.jump(physicalAlbum.photoIndex);
 physicalAlbum.preview?.setPaused(true);physicalAlbum.reader?.dispose();
 const stage=$('#physicalBookStage');stage.replaceChildren();
 document.body.classList.add('reading-physical-album');dialog.showModal();
 const index=$('#physicalBookIndex');index.hidden=true;index.replaceChildren();$('#physicalBookIndexToggle').setAttribute('aria-expanded','false');$('#physicalBookIndexToggle').setAttribute('aria-label','展开照片目录');
 physicalAlbum.reader=new PhysicalPhotoBook(stage,{preview:false,spread:bookIndex,photo:physicalAlbum.photoIndex,onChange:(spread,photo)=>{bookIndex=spread;physicalAlbum.photoIndex=photo;rememberBookPosition(photo);if(physicalAlbum.preview){physicalAlbum.preview.photo=photo;physicalAlbum.preview.setSpread(spread)}updateBookState()}});
 syncSceneActivity();
}

$('#gallery').addEventListener('keydown',event=>{
 if(event.defaultPrevented||physicalAlbum.dialog?.open)return;
 if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();turnBook(event.key==='ArrowLeft'?-1:1)}
});

class PhysicalPhotoBook{
 constructor(host,options){
  this.host=host;this.options=options;this.album={...selected,photos:[...selected.photos]};this.maxPhoto=this.album.photos.length-1;
  this.spread=options.spread||0;this.photo=options.photo||0;this.disposed=false;this.ready=false;this.paused=false;this.frame=null;this.turning=null;this.pointer=null;this.cache=new Map();this.owned=new Set();this.single=false;
  this.canvas=albumEl('canvas','physical-book-canvas');this.canvas.setAttribute('aria-label','实体相册。用左右按钮翻页，点击照片可查看大图。');this.canvas.tabIndex=0;
  host.append(this.canvas);
  this.accessible=albumEl('div','book-accessible-pages');host.append(this.accessible);
  try{this.setupScene();this.bindInput();this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(host);this.resize();this.initialize()}catch(error){console.error('Physical album',error);this.fallback()}
 }
 own(value){this.owned.add(value);return value}
 makeTexture(canvas){const t=this.own(new THREE.CanvasTexture(canvas));t.colorSpace=THREE.SRGBColorSpace;t.minFilter=THREE.LinearMipmapLinearFilter;t.magFilter=THREE.LinearFilter;t.generateMipmaps=true;t.anisotropy=Math.min(4,this.renderer.capabilities.getMaxAnisotropy());return t}
 setupScene(){
  this.renderer=new THREE.WebGLRenderer({canvas:this.canvas,antialias:true,alpha:true,powerPreference:'low-power'});
  this.renderer.setPixelRatio(Math.min(devicePixelRatio,this.options.preview?1.5:1.8));this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1;
  this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  this.scene=new THREE.Scene();this.camera=new THREE.OrthographicCamera(-4,4,3,-3,.1,30);this.camera.position.set(0,7,3.1);this.camera.up.set(0,0,-1);this.camera.lookAt(0,0,0);
  this.scene.add(new THREE.HemisphereLight('#fff6e5','#796f64',1.25));
  const key=new THREE.DirectionalLight('#fff5e5',2.5);key.position.set(-3.8,7.3,4.2);key.castShadow=true;key.shadow.mapSize.set(this.options.preview?512:1024,this.options.preview?512:1024);Object.assign(key.shadow.camera,{left:-4.5,right:4.5,top:4.5,bottom:-4.5,near:.1,far:18});key.shadow.bias=-.0003;key.shadow.normalBias=.012;key.shadow.radius=4;this.scene.add(key);
  const fill=new THREE.DirectionalLight('#eaf2ff',.38);fill.position.set(3,3,-4);this.scene.add(fill);
  this.rig=new THREE.Group();this.rig.rotation.y=-.018;this.scene.add(this.rig);
  this.pageWidth=2.55;this.pageHeight=3.4;
  this.blank=this.own(new THREE.MeshStandardMaterial({color:'#f3ead9',roughness:.94,metalness:0}));this.blank.shadowSide=THREE.DoubleSide;
  const cloth=document.createElement('canvas');cloth.width=cloth.height=256;const cx=cloth.getContext('2d');cx.fillStyle='#142334';cx.fillRect(0,0,256,256);for(let i=0;i<256;i+=2){cx.fillStyle=i%4?'#1b2b3a':'#122230';cx.fillRect(i,0,1,256);cx.fillStyle='#20303b';cx.fillRect(0,i,256,1)}
  const clothTexture=this.makeTexture(cloth);clothTexture.wrapS=clothTexture.wrapT=THREE.RepeatWrapping;clothTexture.repeat.set(3.5,4.5);
  const coverMat=this.own(new THREE.MeshStandardMaterial({color:'#d5e2ef',map:clothTexture,bumpMap:clothTexture,bumpScale:.025,roughness:.91,metalness:.03}));
  const gold=this.own(new THREE.MeshStandardMaterial({color:'#ad8751',roughness:.36,metalness:.65}));
  for(const side of [-1,1]){
   const cover=new THREE.Mesh(this.own(new THREE.BoxGeometry(this.pageWidth+.18,.12,this.pageHeight+.2)),coverMat);cover.position.set(side*(this.pageWidth/2+.035),-.23,0);cover.receiveShadow=cover.castShadow=true;this.rig.add(cover);
   const stackCanvas=document.createElement('canvas');stackCanvas.width=64;stackCanvas.height=128;const sc=stackCanvas.getContext('2d');sc.fillStyle='#ddd3bc';sc.fillRect(0,0,64,128);for(let j=0;j<128;j+=5){sc.fillStyle=j%10?'#f5eedd':'#c3b69b';sc.fillRect(0,j,64,1)}
   const edge=this.makeTexture(stackCanvas),edgeMat=this.own(new THREE.MeshStandardMaterial({color:'#eee5d1',map:edge,roughness:1}));
   const paper=new THREE.Mesh(this.own(new THREE.BoxGeometry(this.pageWidth-.015,.145,this.pageHeight-.025)),[edgeMat,edgeMat,this.blank,this.blank,edgeMat,edgeMat]);paper.position.set(side*this.pageWidth/2,-.105,0);paper.castShadow=paper.receiveShadow=true;this.rig.add(paper);
   for(const z of [-1,1]){const strip=new THREE.Mesh(this.own(new THREE.BoxGeometry(this.pageWidth+.08,.012,.018)),gold);strip.position.set(side*(this.pageWidth/2+.035),-.165,z*(this.pageHeight/2+.075));this.rig.add(strip)}
  }
  const spine=new THREE.Mesh(this.own(new THREE.CylinderGeometry(.13,.13,this.pageHeight+.2,24,1,false)),coverMat);spine.rotation.x=Math.PI/2;spine.position.y=-.215;this.rig.add(spine);
  const ribbon=new THREE.Mesh(this.own(new THREE.BoxGeometry(.065,.018,.72)),this.own(new THREE.MeshStandardMaterial({color:'#a76542',roughness:.8})));ribbon.position.set(.135,-.03,this.pageHeight/2+.16);ribbon.rotation.y=.035;this.rig.add(ribbon);
  const ground=new THREE.Mesh(this.own(new THREE.PlaneGeometry(20,20)),this.own(new THREE.ShadowMaterial({opacity:this.options.preview?.23:.2})));ground.rotation.x=-Math.PI/2;ground.position.y=-.305;ground.receiveShadow=true;this.scene.add(ground);
  this.book=new QuickFlipbook.FlipBook({flipDuration:.78,yBetweenPages:.0023,pageSubdivisions:this.options.preview?16:24});this.book.scale.set(this.pageWidth,1,this.pageHeight);this.rig.add(this.book);this.book.setPages(Array(8).fill(this.blank));this.sheets=[...this.book];this.raycaster=new THREE.Raycaster();this.pointerVector=new THREE.Vector2();
 }
 initialize(){setTimeout(()=>{if(this.disposed)return;this.ready=true;this.setSpread(this.spread);this.updateControls();this.requestRender()},0)}
 sourceFor(sideIndex){if(sideIndex<0)return 'intro';if(sideIndex>this.maxPhoto)return 'end';return sideIndex}
 setSpread(spread){
  this.spread=Math.max(0,Math.min(Math.ceil((this.album.photos.length+1)/2)-1,spread));
  if(!this.ready)return;
  const base=this.spread*2;
  // Four sheets keep the active turn away from the engine's closed-cover poses.
  // Only eight materials are kept active, even with thousands of album photos.
  const indices=[base-4,base-3,base-2,base-1,base,base+1,base+2,base+3];
  const keep=new Set();
  this.sheets.forEach((sheet,i)=>{for(let face=0;face<2;face++){const source=this.sourceFor(indices[i*2+face]);keep.add(source);const material=this.pageMaterial(source);sheet.setPageMaterial(material,face===0?1:0)}sheet.page.castShadow=true;sheet.page.receiveShadow=true});
  this.book.progress=2;this.refreshNormals();this.pruneCache(keep);this.syncAccessible();this.moveCamera();this.requestRender();
 }
 pageMaterial(source){
  if(this.cache.has(source))return this.cache.get(source);
  const width=this.options.preview?600:768,height=Math.round(width*this.pageHeight/this.pageWidth),canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
  const ctx=canvas.getContext('2d'),scale=width/1200;ctx.scale(scale,scale);const W=1200,H=height/scale;
  ctx.fillStyle='#f5efe2';ctx.fillRect(0,0,W,H);
  // Canvas-generated fibers preserve the same paper surface entirely offline.
  let seed=93;for(let i=0;i<11000;i++){seed=(seed*1664525+1013904223)>>>0;const x=seed%W;seed=(seed*1664525+1013904223)>>>0;const y=seed%Math.ceil(H);ctx.fillStyle=i%3?'rgba(111,95,65,.024)':'rgba(255,255,255,.1)';ctx.fillRect(x,y,1.2,1.2)}
  const texture=this.makeTexture(canvas),material=this.own(new THREE.MeshStandardMaterial({color:'#ffffff',map:texture,roughness:.9,metalness:0,toneMapped:true}));material.shadowSide=THREE.DoubleSide;material.userData.photoIndex=typeof source==='number'?source:null;this.cache.set(source,material);
  ctx.strokeStyle='rgba(148,121,73,.38)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(92,H-113);ctx.lineTo(W-92,H-113);ctx.stroke();
  ctx.fillStyle='#9b8969';ctx.font='18px Arial, sans-serif';ctx.textAlign='left';ctx.fillText('TWO OF US  /  TRAVEL JOURNAL',92,76);ctx.textAlign='right';ctx.fillText(typeof source==='number'?String(source+1).padStart(2,'0'):'✧',W-92,H-75);
  if(source==='intro'){
   ctx.textAlign='center';ctx.fillStyle='#a08150';ctx.font='26px Georgia, serif';ctx.fillText('OUR LITTLE PLANET',W/2,H*.31);
   ctx.fillStyle='#101d27';ctx.font='normal 82px "Songti SC", "SimSun", serif';ctx.fillText(this.album.name,W/2,H*.415,W-190);
   ctx.fillStyle='#3b4542';ctx.font='26px "Microsoft YaHei", sans-serif';ctx.fillText('和你，一起走过的风景',W/2,H*.485);
   ctx.strokeStyle='#b79a66';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(W/2-80,H*.53);ctx.lineTo(W/2+80,H*.53);ctx.stroke();
   if(this.album.date){ctx.fillStyle='#5a4d3d';ctx.font='28px Georgia, serif';ctx.fillText(this.album.date.replaceAll('-',' / '),W/2,H*.585)}
   ctx.font='normal 30px "Songti SC", "SimSun", serif';ctx.fillStyle='#38433b';
   const lines=this.album.note?this.wrapText(ctx,this.album.note,24).slice(0,5):['把相遇后的每一段旅程，','收藏成可以再翻开的回忆。'];
   lines.forEach((line,i)=>ctx.fillText(line,W/2,H*.68+i*48,W-220));
   ctx.fillStyle='#ad8751';ctx.font='43px Georgia, serif';ctx.fillText('♡',W/2,H*.9);
  }else if(source==='end'){
   ctx.textAlign='center';ctx.fillStyle='#a58a5a';ctx.font='26px Georgia, serif';ctx.fillText('TO BE CONTINUED',W/2,H*.36);
   ctx.fillStyle='#263945';ctx.font='normal 57px "Songti SC", "SimSun", serif';ctx.fillText('下一页，还是和你。',W/2,H*.465,W-180);
   ctx.fillStyle='#534c3f';ctx.font='26px "Microsoft YaHei", sans-serif';ctx.fillText('继续添加照片，让故事慢慢长大。',W/2,H*.565,W-180);
   ctx.fillStyle='#a28655';ctx.font='62px Georgia, serif';ctx.fillText('✧',W/2,H*.72);
  }else{
   const photo=this.album.photos[source],image=new Image();image.onload=()=>{
    if(this.disposed||!this.cache.has(source))return;
    const inner={x:91,y:145,w:1018,h:H-365},aspect=image.naturalWidth/image.naturalHeight;
    // Preserve the complete photograph; use generous, gallery-like paper mats.
    const fit=Math.min(inner.w/image.naturalWidth,inner.h/image.naturalHeight),pw=image.naturalWidth*fit,ph=image.naturalHeight*fit,x=inner.x+(inner.w-pw)/2,y=inner.y+(inner.h-ph)/2;
    ctx.save();ctx.shadowColor='rgba(54,39,23,.2)';ctx.shadowBlur=16;ctx.shadowOffsetY=7;ctx.fillStyle='#fffdf6';ctx.fillRect(x-18,y-18,pw+36,ph+36);ctx.restore();ctx.drawImage(image,x,y,pw,ph);
    ctx.textAlign='left';ctx.fillStyle='#332d24';ctx.font='37px "Songti SC", "SimSun", serif';ctx.fillText(this.album.name,92,H-155,W-290);
    ctx.textAlign='right';ctx.fillStyle='#5b4d3b';ctx.font='25px Georgia, serif';ctx.fillText(this.album.date?this.album.date.replaceAll('-','.'): 'OUR MEMORY',W-92,H-155);
    texture.needsUpdate=true;this.requestRender();
   };image.onerror=()=>{if(this.disposed)return;ctx.textAlign='center';ctx.fillStyle='#8e7b5b';ctx.font='28px "Microsoft YaHei", sans-serif';ctx.fillText('点击查看原照片',W/2,H/2);texture.needsUpdate=true;this.requestRender()};image.src=photo.data;
  }
  texture.needsUpdate=true;return material;
 }
 wrapText(ctx,text,limit){const result=[];for(const paragraph of text.split(/\r?\n/)){let line='';for(const ch of paragraph){if(line.length>=limit){result.push(line);line=''}line+=ch}if(line)result.push(line)}return result}
 pruneCache(keep){for(const [source,material]of this.cache){if(keep.has(source))continue;material.map?.dispose();this.owned.delete(material.map);material.dispose();this.owned.delete(material);this.cache.delete(source)}}
 refreshNormals(){this.sheets.forEach(sheet=>sheet.page.geometry.computeVertexNormals())}
 resize(){
  if(!this.renderer||this.disposed)return;
  const width=Math.max(1,this.host.clientWidth),height=Math.max(1,this.host.clientHeight);this.renderer.setSize(width,height,false);
  const single=!this.options.preview&&width<650;this.single=single;
  if(single){this.photo=Math.min(this.maxPhoto,Math.max(0,this.photo));this.spread=Math.floor((this.photo+1)/2);if(this.ready&&!this.turning)this.setSpread(this.spread)}
  const aspect=width/height,padding=this.options.preview?1.13:single?1.19:1.12;
  const totalWidth=single?this.pageWidth+.25:this.pageWidth*2+.28;
  const halfHeight=Math.max(this.pageHeight*.55,totalWidth*padding/(2*aspect));
  this.camera.left=-halfHeight*aspect;this.camera.right=halfHeight*aspect;this.camera.top=halfHeight;this.camera.bottom=-halfHeight;this.camera.updateProjectionMatrix();this.moveCamera();this.updateControls();this.requestRender();
 }
 cameraX(){return this.single?(this.photo%2?-this.pageWidth/2:this.pageWidth/2):0}
 moveCamera(x=this.cameraX()){this.camera.position.set(x,7,3.1);this.camera.lookAt(x,0,0)}
 visiblePhotoIndices(){const base=this.spread*2;return this.single?[this.photo]:[base-1,base].filter(i=>i>=0&&i<=this.maxPhoto)}
 syncAccessible(){
  this.accessible.replaceChildren();for(const index of this.visiblePhotoIndices()){const b=albumButton('book-photo-accessible',`查看${this.album.name}第 ${index+1} 张照片`,`${this.album.name} · 第 ${index+1} 张照片`);b.onclick=()=>openPhoto(index);this.accessible.append(b)}
 }
 updateControls(){
  if(this.options.preview){updateBookState();return}
  const total=Math.ceil((this.album.photos.length+1)/2),counter=$('#physicalBookCounter');if(!counter)return;
  counter.textContent=this.single?`${this.photo+1} / ${this.maxPhoto+1} 张`:`第 ${this.spread+1} / ${total} 组跨页`;
  $('#physicalBookPrev').disabled=!!this.turning||(this.single?this.photo<=0:this.spread<=0);
  $('#physicalBookNext').disabled=!!this.turning||(this.single?this.photo>=this.maxPhoto:this.spread>=total-1);
  const index=$('#physicalBookIndex');if(index&&!index.hidden){
   [...index.children].forEach((button,i)=>{if(i===this.photo)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current')});
   index.children[this.photo]?.scrollIntoView({block:'nearest',inline:'center',behavior:'instant'});
  }
  this.syncAccessible();
 }
 step(direction){
  if(!this.ready||this.turning||this.disposed)return;
  direction=direction<0?-1:1;
  const maxSpread=Math.ceil((this.album.photos.length+1)/2)-1;
  if(this.single){
   const nextPhoto=Math.min(this.maxPhoto,Math.max(0,this.photo+direction));if(nextPhoto===this.photo)return;
   const targetSpread=Math.floor((nextPhoto+1)/2),targetX=nextPhoto%2?-this.pageWidth/2:this.pageWidth/2;
   if(targetSpread===this.spread){this.animateTurn({direction:0,targetSpread,nextPhoto,from:2,to:2,fromX:this.cameraX(),toX:targetX,duration:reducedMotion()?0:340});return}
   this.animateTurn({direction,targetSpread,nextPhoto,from:2,to:2+direction,fromX:this.cameraX(),toX:targetX,duration:reducedMotion()?0:860});
  }else{
   const targetSpread=Math.min(maxSpread,Math.max(0,this.spread+direction));if(targetSpread===this.spread)return;
   this.animateTurn({direction,targetSpread,nextPhoto:Math.min(this.maxPhoto,Math.max(0,targetSpread*2-1)),from:2,to:2+direction,fromX:0,toX:0,duration:reducedMotion()?0:860});
  }
 }
 jump(photo){if(!this.ready)return;this.turning=null;this.photo=Math.max(0,Math.min(this.maxPhoto,photo));this.setSpread(Math.floor((this.photo+1)/2));this.options.onChange(this.spread,this.photo);this.updateControls()}
 animateTurn(config){
  this.turning={...config,start:performance.now()};this.updateControls();this.requestRender();
 }
 finishTurn(turn){
  this.turning=null;this.spread=turn.targetSpread;this.photo=turn.nextPhoto;this.setSpread(this.spread);this.options.onChange(this.spread,this.photo);this.updateControls();
 }
 requestRender(){if(this.frame!==null||this.disposed||this.paused)return;this.frame=requestAnimationFrame(time=>this.renderFrame(time))}
 renderFrame(time){
  this.frame=null;if(this.disposed||this.paused)return;
  if(this.turning){const turn=this.turning,t=turn.duration?Math.min(1,(time-turn.start)/turn.duration):1,ease=t*t*(3-2*t);this.book.progress=turn.from+(turn.to-turn.from)*ease;this.refreshNormals();this.moveCamera(turn.fromX+(turn.toX-turn.fromX)*ease);if(t===1)this.finishTurn(turn);else this.requestRender()}
  if(this.renderer)this.renderer.render(this.scene,this.camera);
 }
 hit(event){const bounds=this.canvas.getBoundingClientRect();this.pointerVector.set((event.clientX-bounds.left)/bounds.width*2-1,-(event.clientY-bounds.top)/bounds.height*2+1);this.raycaster.setFromCamera(this.pointerVector,this.camera);return this.raycaster.intersectObjects(this.sheets.map(s=>s.page),false)[0]}
 bindInput(){
  this.onDown=event=>{
   if(!event.isPrimary||event.button!==0||!this.ready||this.turning)return;
   const hit=this.hit(event);if(!hit)return;
   const material=hit.object.material[hit.face.materialIndex],index=material.userData.photoIndex;
   const direction=this.single?(this.photo%2?-1:1):(hit.point.x<0?-1:1);
   this.pointer={id:event.pointerId,x:event.clientX,y:event.clientY,time:performance.now(),index,direction,startSpread:this.spread,startPhoto:this.photo,fraction:0,dragging:false,startX:this.cameraX()};
  };
  this.onMove=event=>{
   const p=this.pointer;if(!p||p.id!==event.pointerId)return;
   const dx=event.clientX-p.x,dy=event.clientY-p.y;if(!p.dragging&&(Math.abs(dx)<7||Math.abs(dy)>Math.abs(dx)*1.2))return;
   const direction=p.dragging?p.direction:(dx<0?1:-1),maxSpread=Math.ceil((this.album.photos.length+1)/2)-1;
   if(this.single){const next=p.startPhoto+direction;if(next<0||next>this.maxPhoto)return;const spread=Math.floor((next+1)/2);p.nextPhoto=next;p.targetSpread=spread;p.pageDirection=spread-p.startSpread}
   else{if(p.startSpread+direction<0||p.startSpread+direction>maxSpread)return;p.targetSpread=p.startSpread+direction;p.nextPhoto=Math.min(this.maxPhoto,Math.max(0,p.targetSpread*2-1));p.pageDirection=direction}
   p.direction=direction;p.dragging=true;this.canvas.classList.add('is-dragging');if(!this.canvas.hasPointerCapture(event.pointerId))this.canvas.setPointerCapture(event.pointerId);
   const width=this.canvas.clientWidth*(this.single?.78:.46),travel=direction===1?-dx:dx;p.fraction=Math.max(0,Math.min(1,travel/Math.max(40,width)));
   this.book.progress=2+p.pageDirection*p.fraction;this.refreshNormals();const targetX=this.single?(p.nextPhoto%2?-this.pageWidth/2:this.pageWidth/2):0;this.moveCamera(p.startX+(targetX-p.startX)*p.fraction);this.requestRender();event.preventDefault();
  };
  this.onUp=event=>{
   const p=this.pointer;if(!p||p.id!==event.pointerId)return;this.pointer=null;this.canvas.classList.remove('is-dragging');if(this.canvas.hasPointerCapture(event.pointerId))this.canvas.releasePointerCapture(event.pointerId);
   if(p.dragging){const complete=p.fraction>=.32||(performance.now()-p.time<=280&&p.fraction>=.12);const targetSpread=complete?p.targetSpread:p.startSpread,nextPhoto=complete?p.nextPhoto:p.startPhoto,targetX=this.single?(nextPhoto%2?-this.pageWidth/2:this.pageWidth/2):0;
    this.animateTurn({direction:p.pageDirection,targetSpread,nextPhoto,from:2+p.pageDirection*p.fraction,to:complete?2+p.pageDirection:2,fromX:p.startX+((this.single?(p.nextPhoto%2?-this.pageWidth/2:this.pageWidth/2):0)-p.startX)*p.fraction,toX:targetX,duration:reducedMotion()?0:Math.max(180,650*(complete?1-p.fraction:p.fraction))});return}
   if(performance.now()-p.time>650)return;
   if(typeof p.index==='number'){openPhoto(p.index);return}
   if(this.options.preview)openPhysicalAlbum();else this.step(p.direction);
  };
  this.onCancel=event=>{if(this.pointer?.id!==event.pointerId)return;this.pointer=null;this.canvas.classList.remove('is-dragging');if(this.canvas.hasPointerCapture(event.pointerId))this.canvas.releasePointerCapture(event.pointerId);this.setSpread(this.spread)};
  this.onWheel=event=>{if(event.ctrlKey||event.metaKey)return;const delta=Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:event.deltaY;if(Math.abs(delta)<8||this.maxPhoto<1)return;const direction=delta>0?1:-1;const can=this.single?(direction>0?this.photo<this.maxPhoto:this.photo>0):(direction>0?this.spread<Math.ceil((this.album.photos.length+1)/2)-1:this.spread>0);if(!can&&!this.turning)return;event.preventDefault();const now=performance.now();if(!this.lastWheel||now-this.lastWheel>650){this.lastWheel=now;this.step(direction)}};
  this.onKey=event=>{if(!this.options.preview)return;if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();this.step(event.key==='ArrowLeft'?-1:1)}};
  this.canvas.addEventListener('pointerdown',this.onDown);this.canvas.addEventListener('pointermove',this.onMove);this.canvas.addEventListener('pointerup',this.onUp);this.canvas.addEventListener('pointercancel',this.onCancel);this.canvas.addEventListener('wheel',this.onWheel,{passive:false});this.canvas.addEventListener('keydown',this.onKey);
  this.onContextLost=event=>{event.preventDefault();if(!this.disposed)this.fallback()};this.canvas.addEventListener('webglcontextlost',this.onContextLost);
 }
 setPaused(value){this.paused=value;if(value&&this.frame!==null){cancelAnimationFrame(this.frame);this.frame=null}else if(!value)this.requestRender()}
 fallback(){
  const wrap=albumEl('div','physical-book-fallback');wrap.append(albumEl('p','','画册暂时无法显示立体效果，可以继续查看照片。'));
  for(let index=0;index<this.album.photos.length;index++){const b=albumButton('book-fallback-photo',`查看${this.album.name}第 ${index+1} 张照片`,'');const image=albumEl('img');image.src=this.album.photos[index].data;image.alt=this.album.name+'旅行照片';image.loading='lazy';b.append(image);b.onclick=()=>openPhoto(index);wrap.append(b)}
  this.host.replaceChildren(wrap);this.setPaused(true);
 }
 dispose(){
  if(this.disposed)return;this.disposed=true;if(this.frame!==null)cancelAnimationFrame(this.frame);this.resizeObserver?.disconnect();
  if(this.canvas){this.canvas.removeEventListener('webglcontextlost',this.onContextLost);this.canvas.removeEventListener('pointerdown',this.onDown);this.canvas.removeEventListener('pointermove',this.onMove);this.canvas.removeEventListener('pointerup',this.onUp);this.canvas.removeEventListener('pointercancel',this.onCancel);this.canvas.removeEventListener('wheel',this.onWheel);this.canvas.removeEventListener('keydown',this.onKey)}
  // The upstream dispose() does not release live sheets, so release them here.
  if(this.sheets)for(const sheet of this.sheets){sheet.page.geometry.dispose();sheet.modifiers.destroy()}
  for(const resource of this.owned)resource.dispose?.();this.owned.clear();this.cache.clear();this.renderer?.dispose();this.canvas?.remove();this.accessible?.remove();
 }
}
