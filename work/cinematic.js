// A live Three.js opening: fracture, shockwaves, galactic approach, Earth arrival.
// It uses the same local Earth geometry and texture as the album's globe.
let cinematicIntro=null;
function openCinematic(){
 if(cinematicIntro&&!cinematicIntro.disposed)return;
 window.scrollTo({top:0,left:0,behavior:'instant'});
 cinematicIntro=new CosmicOpening();window.cinematicIntro=cinematicIntro;
}
class CosmicOpening{
 constructor(){
  this.owned=new Set();this.state='prelude';this.disposed=false;this.frame=null;this.createdAt=performance.now();this.travelStartedAt=0;this.motion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  this.dialog=document.createElement('dialog');this.dialog.className='cinema-dialog';this.dialog.setAttribute('aria-label','同游宇宙开场');
  this.dialog.innerHTML='<canvas aria-label="星球爆炸与宇宙航行的立体画面"></canvas><div class="cinema-vignette"></div><div class="cinema-letterbox top"></div><div class="cinema-letterbox bottom"></div><div class="cinema-brand">同游 <em class="cinema-signature">dsk</em><span>OUR LITTLE UNIVERSE</span></div><div class="cinema-welcome"><p class="cinema-kicker">EVERY JOURNEY BEGINS WITH YOU</p><h1>宇宙很大。<br>而我的坐标，<em>是你。</em></h1><p class="cinema-copy">穿过漫天星河，回到我们相遇的星球。</p><button class="cinema-start" disabled>正在准备星图…</button></div><div class="cinema-subtitle" aria-live="polite"><strong></strong><span></span></div><div class="cinema-progress"><i></i></div><div class="cinema-wipe"></div><button class="cinema-skip" aria-label="跳过开场">直接进入相册 ↗</button>';
  document.body.append(this.dialog);this.startButton=this.dialog.querySelector('.cinema-start');this.startButton.onclick=()=>this.begin();this.dialog.querySelector('.cinema-skip').onclick=()=>this.finish();
  this.dialog.addEventListener('cancel',e=>{e.preventDefault();this.finish()});this.dialog.addEventListener('close',()=>{if(!this.disposed)this.finish()});
  window.__cinematicActive=true;this.dialog.showModal();syncSceneActivity();
  try{this.setup();this.onResize=()=>this.resize();window.addEventListener('resize',this.onResize);this.resize();this.onVisibility=()=>{if(document.hidden){this.pausedAt=performance.now();cancelAnimationFrame(this.frame);this.frame=null}else if(this.pausedAt){const pause=performance.now()-this.pausedAt;this.createdAt+=pause;if(this.travelStartedAt)this.travelStartedAt+=pause;this.pausedAt=0;this.render(performance.now())}};document.addEventListener('visibilitychange',this.onVisibility);this.render(performance.now())}catch(error){console.warn('Opening unavailable',error);this.finish()}
 }
 own(resource){this.owned.add(resource);return resource}
 random(){this.seed=(1664525*this.seed+1013904223)>>>0;return this.seed/4294967296}
 setup(){
  this.seed=19480520;const random=()=>this.random();this.canvas=this.dialog.querySelector('canvas');
  this.renderer=new THREE.WebGLRenderer({canvas:this.canvas,antialias:true,alpha:true,powerPreference:'high-performance'});this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,innerWidth<760?1.35:1.6));this.renderer.setClearColor('#02050c',1);this.renderer.outputColorSpace=THREE.SRGBColorSpace;
  this.scene=new THREE.Scene();this.camera=new THREE.PerspectiveCamera(46,innerWidth/innerHeight,.05,2500);this.camera.position.set(0,0,14);
  this.scene.add(new THREE.AmbientLight('#9bb4cd',.65));const sun=new THREE.DirectionalLight('#fff0cf',2.7);sun.position.set(-5,8,12);this.scene.add(sun);
  const starCount=innerWidth<760?4200:10000,starPositions=new Float32Array(starCount*3),starColors=new Float32Array(starCount*3);
  for(let i=0;i<starCount;i++){const angle=random()*Math.PI*2,z=random()*2-1,r=450+random()*800,s=Math.sqrt(1-z*z);starPositions.set([Math.cos(angle)*s*r,z*r,Math.sin(angle)*s*r],i*3);const c=new THREE.Color(i%5?'#bdd2ed':'#ecd2a6');starColors.set([c.r,c.g,c.b],i*3)}
  const starGeometry=this.own(new THREE.BufferGeometry());starGeometry.setAttribute('position',new THREE.BufferAttribute(starPositions,3));starGeometry.setAttribute('color',new THREE.BufferAttribute(starColors,3));
  this.stars=new THREE.Points(starGeometry,this.own(new THREE.PointsMaterial({size:1.05,vertexColors:true,transparent:true,opacity:.8,depthWrite:false,sizeAttenuation:true})));this.scene.add(this.stars);
  this.makeBurst(random);this.makeGalaxy(random);
  this.earthPosition=new THREE.Vector3(38,-12,6);this.earthGroup=new THREE.Group();this.earthGroup.position.copy(this.earthPosition);this.earthGroup.visible=false;this.scene.add(this.earthGroup);
  this.canvas.addEventListener('webglcontextlost',this.contextLost=e=>{e.preventDefault();this.finish()});
 }
 makeBurst(random){
  this.burst=new THREE.Group();this.burst.position.y=2.1;this.scene.add(this.burst);
  const planetMaterial=this.own(new THREE.ShaderMaterial({uniforms:{time:{value:0},fade:{value:1}},vertexShader:'varying vec3 point;varying vec3 normalView;void main(){point=position;normalView=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'uniform float time;uniform float fade;varying vec3 point;varying vec3 normalView;void main(){vec3 p=point;float vein=abs(sin(p.x*8.+sin(p.y*7.))*sin(p.y*6.+sin(p.z*9.))*sin(p.z*7.+sin(p.x*6.)));float cracks=1.-smoothstep(.007,.05,vein);float lit=.12+.55*max(0.,dot(normalize(normalView),normalize(vec3(-.5,.6,1.))));vec3 color=vec3(.035,.054,.079)*lit+mix(vec3(1.,.18,.025),vec3(1.,.71,.25),cracks)*pow(cracks,3.)*(.25+time*.35);gl_FragColor=vec4(color,fade);}',transparent:true}));
  this.burstPlanet=new THREE.Mesh(this.own(new THREE.IcosahedronGeometry(1.75,5)),planetMaterial);this.burst.add(this.burstPlanet);
  this.shardData=[];const count=innerWidth<760?100:220;const rockMap=this.own(new THREE.TextureLoader().load(PLANET_TEXTURES.moon));rockMap.colorSpace=THREE.SRGBColorSpace;const shardMat=this.own(new THREE.MeshStandardMaterial({map:rockMap,color:'#697181',roughness:.99,emissive:'#4b2313',emissiveIntensity:.2,transparent:true}));
  this.shards=new THREE.InstancedMesh(this.own(new THREE.IcosahedronGeometry(.10,1)),shardMat,count);this.shards.instanceMatrix.setUsage(THREE.DynamicDrawUsage);this.shards.frustumCulled=false;this.burst.add(this.shards);this.dummy=new THREE.Object3D();
  for(let i=0;i<count;i++){const a=random()*Math.PI*2,z=random()*2-1,s=Math.sqrt(1-z*z);this.shardData.push({dir:new THREE.Vector3(Math.cos(a)*s,z,Math.sin(a)*s),speed:1.6+random()*4,spin:random()*5,scale:.4+random()})}
  const dustCount=innerWidth<760?3200:8000,dirs=new Float32Array(dustCount*3),speeds=new Float32Array(dustCount),colors=new Float32Array(dustCount*3);
  for(let i=0;i<dustCount;i++){const a=random()*Math.PI*2,z=random()*2-1,s=Math.sqrt(1-z*z);dirs.set([Math.cos(a)*s,z,Math.sin(a)*s],i*3);speeds[i]=.2+Math.pow(random(),.6)*6;const c=new THREE.Color(i%4===0?'#92cbff':i%3===0?'#ffb85e':'#f4e1bd');colors.set([c.r,c.g,c.b],i*3)}
  const g=this.own(new THREE.BufferGeometry());g.setAttribute('position',new THREE.BufferAttribute(dirs,3));g.setAttribute('speed',new THREE.BufferAttribute(speeds,1));g.setAttribute('tint',new THREE.BufferAttribute(colors,3));
  const m=this.own(new THREE.ShaderMaterial({uniforms:{expansion:{value:0},fade:{value:1},pixelRatio:{value:this.renderer.getPixelRatio()}},vertexShader:'attribute float speed;attribute vec3 tint;uniform float expansion;uniform float pixelRatio;varying vec3 color;void main(){color=tint;vec3 p=position*(1.7+expansion*speed);vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(26./max(1.,-mv.z),1.,3.4)*pixelRatio;}',fragmentShader:'uniform float fade;varying vec3 color;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(color,exp(-d*d*23.)*fade);}',transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
  this.burstDust=new THREE.Points(g,m);this.burstDust.frustumCulled=false;this.burst.add(this.burstDust);
  const rayCount=innerWidth<760?360:850,rayPositions=new Float32Array(rayCount*6),raySpeed=new Float32Array(rayCount*2),rayTail=new Float32Array(rayCount*2);
  for(let i=0;i<rayCount;i++){for(let j=0;j<2;j++){rayPositions.set(dirs.subarray(i*3,i*3+3),i*6+j*3);raySpeed[i*2+j]=speeds[i];rayTail[i*2+j]=j}}
  const rayGeometry=this.own(new THREE.BufferGeometry());rayGeometry.setAttribute('position',new THREE.BufferAttribute(rayPositions,3));rayGeometry.setAttribute('speed',new THREE.BufferAttribute(raySpeed,1));rayGeometry.setAttribute('tail',new THREE.BufferAttribute(rayTail,1));
  this.burstRays=new THREE.LineSegments(rayGeometry,this.own(new THREE.ShaderMaterial({uniforms:{expansion:m.uniforms.expansion,fade:{value:0}},vertexShader:'attribute float speed;attribute float tail;uniform float expansion;varying float light;void main(){light=1.-tail*.85;float radius=max(1.7,1.7+expansion*speed-tail*(.1+expansion*.16));gl_Position=projectionMatrix*modelViewMatrix*vec4(position*radius,1.);}',fragmentShader:'uniform float fade;varying float light;void main(){gl_FragColor=vec4(1.,.71,.4,fade*light);}',transparent:true,depthWrite:false,blending:THREE.AdditiveBlending})));this.burstRays.frustumCulled=false;this.burst.add(this.burstRays);
  this.shockwaves=[];for(let i=0;i<3;i++){const ring=new THREE.Mesh(this.own(new THREE.TorusGeometry(1,.009+i*.004,5,180)),this.own(new THREE.MeshBasicMaterial({color:i?'#95bce4':'#f6bf77',transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending})));ring.rotation.set(.45+i*.45,.25*i,.3);this.burst.add(ring);this.shockwaves.push(ring)}
  this.glow=new THREE.Mesh(this.own(new THREE.PlaneGeometry(12,12)),this.own(new THREE.ShaderMaterial({uniforms:{strength:{value:.7}},vertexShader:'varying vec2 coord;void main(){coord=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec2 coord;uniform float strength;void main(){float r=length(coord-.5);float glow=exp(-r*r*34.);gl_FragColor=vec4(1.,.55,.22,glow*strength);}',transparent:true,depthWrite:false,blending:THREE.AdditiveBlending})));this.glow.position.z=-1;this.burst.add(this.glow);
 }
 makeGalaxy(random){
  this.galaxy=new THREE.Group();this.galaxy.rotation.set(.27,0,-.25);this.galaxy.visible=false;this.scene.add(this.galaxy);
  const count=innerWidth<760?18000:42000,positions=new Float32Array(count*3),colors=new Float32Array(count*3),sizes=new Float32Array(count);
  for(let i=0;i<count;i++){
   const core=i<count*.22,r=core?Math.pow(random(),1.7)*22:8+Math.pow(random(),.64)*105;
   const angle=core||i%5===0?random()*Math.PI*2:Math.log(r/110+.08)*3.35+(i%2)*Math.PI+(random()-.5)*1.05;
   positions.set([Math.cos(angle)*r,Math.sin(angle)*r,(random()-.5)*(core?Math.max(.1,r*.9):3)*(1-r/150)],i*3);
   const c=new THREE.Color(core?'#e9d3b2':i%7===0?'#b299c7':'#829dbf');colors.set([c.r,c.g,c.b],i*3);sizes[i]=.4+random()*1.1;
  }
  const g=this.own(new THREE.BufferGeometry());g.setAttribute('position',new THREE.BufferAttribute(positions,3));g.setAttribute('tint',new THREE.BufferAttribute(colors,3));g.setAttribute('size',new THREE.BufferAttribute(sizes,1));
  const m=this.own(new THREE.ShaderMaterial({uniforms:{pixelRatio:{value:this.renderer.getPixelRatio()},opacity:{value:1}},vertexShader:'attribute vec3 tint;attribute float size;uniform float pixelRatio;varying vec3 color;void main(){color=tint;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(size*680./max(1.,-mv.z),1.,5.)*pixelRatio;}',fragmentShader:'uniform float opacity;varying vec3 color;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(color,exp(-d*d*22.)*.24*opacity);}',transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
  this.galaxyCloud=new THREE.Points(g,m);this.galaxyCloud.frustumCulled=false;this.galaxy.add(this.galaxyCloud);
  const glowMaterial=this.own(new THREE.ShaderMaterial({uniforms:{opacity:m.uniforms.opacity},vertexShader:'varying vec2 coord;void main(){coord=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:`
   varying vec2 coord;uniform float opacity;
   float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
   float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
   void main(){vec2 p=(coord-.5)*2.;float r=length(p);if(r>1.)discard;float angle=atan(p.y,p.x),phase=angle-3.35*log(r+.08);float arm=pow(.5+.5*cos(phase*2.),7.);float dust=noise(p*12.)*.6+noise(p*29.)*.3+noise(p*70.)*.1;float core=exp(-r*r*150.);float haze=(arm*.17+.026)*pow(1.-r,1.6)*(.35+dust);vec3 color=mix(vec3(.32,.46,.72),vec3(1.,.77,.45),core);gl_FragColor=vec4(color,(haze+core*.55)*opacity);}
  `,transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));
  const glowPlane=new THREE.Mesh(this.own(new THREE.PlaneGeometry(230,230)),glowMaterial);glowPlane.position.z=-1;this.galaxy.add(glowPlane);
  for(const [x,y,z,scale] of [[-205,100,-190,.55],[170,-90,-270,.42]]){const p=new THREE.Points(g,m);p.position.set(x,y,z);p.scale.setScalar(scale);p.rotation.set(.65,.3,-.5);this.galaxy.add(p)}
 }
 prepareEarth(){
  if(this.earth)return true;if(!window.__planetReady||!globe?.globeMaterial().map?.image)return false;
  globe.scene().updateMatrixWorld(true);globe.camera().updateMatrixWorld(true);let source;globe.scene().traverse(o=>{if(o.isMesh&&o.material===globe.globeMaterial())source=o});if(!source)return false;
  source.geometry.computeBoundingSphere();const geometry=this.own(source.geometry.clone());geometry.scale(2.4/source.geometry.boundingSphere.radius,2.4/source.geometry.boundingSphere.radius,2.4/source.geometry.boundingSphere.radius);
  const sourceMaterial=globe.globeMaterial(),material=this.own(new THREE.MeshPhongMaterial({color:sourceMaterial.color,emissive:sourceMaterial.emissive,emissiveIntensity:sourceMaterial.emissiveIntensity,shininess:8}));for(const key of ['map','bumpMap'])if(sourceMaterial[key]){material[key]=this.own(sourceMaterial[key].clone());material[key].needsUpdate=true}material.bumpScale=.013;
  this.earth=new THREE.Mesh(geometry,material);this.targetEarthRotation=globe.camera().quaternion.clone().invert().multiply(source.getWorldQuaternion(new THREE.Quaternion()));this.earth.quaternion.copy(this.targetEarthRotation);this.earthGroup.add(this.earth);
  const atmosphere=new THREE.Mesh(this.own(new THREE.SphereGeometry(2.53,64,48)),this.own(new THREE.ShaderMaterial({vertexShader:'varying vec3 n;varying vec3 eye;void main(){vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);eye=normalize(-p.xyz);gl_Position=projectionMatrix*p;}',fragmentShader:'varying vec3 n;varying vec3 eye;void main(){float rim=pow(1.-abs(dot(normalize(n),normalize(eye))),3.5);gl_FragColor=vec4(.19,.56,.93,rim*.36);}',transparent:true,depthWrite:false,blending:THREE.AdditiveBlending})));this.earthGroup.add(atmosphere);return true;
 }
 begin(){
  if(this.state!=='prelude')return;
  window.scrollTo({top:0,left:0,behavior:'instant'});
  if(globe){globe.controls().autoRotate=false;setRotateLabel(false);globe.pointOfView({lat:32,lng:108,altitude:2.2},0);globe.controls().update()}
  if(!this.prepareEarth()){this.finish();return}
  this.state='transition';this.travelStartedAt=performance.now();this.dialog.classList.add('travelling');this.startButton.disabled=true;this.dialog.querySelector('.cinema-skip').textContent='跳过旅程 ↗';
  if(this.frame===null)this.render(performance.now());
 }
 subtitle(title,caption){if(title===this.lastTitle)return;this.lastTitle=title;this.dialog.querySelector('.cinema-subtitle strong').textContent=title;this.dialog.querySelector('.cinema-subtitle span').textContent=caption}
 resize(){if(this.disposed)return;const w=innerWidth,h=innerHeight;this.renderer.setSize(w,h,false);this.camera.aspect=w/h;this.camera.updateProjectionMatrix()}
 finalPose(){
  const box=$('#globe').getBoundingClientRect(),mainCamera=globe.camera(),radius=100,d=mainCamera.position.length();
  const screenRadius=radius/Math.sqrt(d*d-radius*radius)*box.height/(2*Math.tan(THREE.MathUtils.degToRad(mainCamera.fov/2)));
  const k=innerHeight/(2*Math.tan(THREE.MathUtils.degToRad(this.camera.fov/2))),distance=2.4*Math.sqrt(1+(k/screenRadius)**2);
  const centerX=box.left+box.width/2,centerY=box.top+box.height/2;
  const offsetX=(centerX-innerWidth/2)*distance/k,offsetY=(innerHeight/2-centerY)*distance/k;
  const target=this.earthPosition.clone().add(new THREE.Vector3(-offsetX,-offsetY,0));return {target,camera:target.clone().add(new THREE.Vector3(0,0,distance))};
 }
 render(now){
  if(this.disposed)return;this.frame=requestAnimationFrame(t=>this.render(t));
  const prelude=this.motion?1.2:Math.min(8,(now-this.createdAt)/1000),explosion=Math.max(0,prelude-.8),expansion=1-Math.exp(-explosion*.54);
  if(this.state==='prelude'||this.state==='transition'){
   const fading=1-THREE.MathUtils.smoothstep(explosion,.05,1.6);this.burstPlanet.material.uniforms.time.value=explosion;this.burstPlanet.material.uniforms.fade.value=fading;this.burstPlanet.visible=fading>0;this.burstPlanet.rotation.y=prelude*.1;
   this.burstDust.material.uniforms.expansion.value=expansion*5.8;this.burstDust.material.uniforms.fade.value=.28+.7*Math.exp(-explosion*.22);this.burst.rotation.y=prelude*.009;
   this.shardData.forEach((s,i)=>{this.dummy.position.copy(s.dir).multiplyScalar(1.6+expansion*s.speed*3);this.dummy.rotation.set(s.spin+explosion*.1,s.spin+explosion*.06,s.spin);this.dummy.scale.setScalar(s.scale*(1-.45*expansion));this.dummy.updateMatrix();this.shards.setMatrixAt(i,this.dummy.matrix)});this.shards.instanceMatrix.needsUpdate=true;
   this.shards.material.opacity=1-THREE.MathUtils.smoothstep(explosion,3,7);
   this.burstRays.material.uniforms.fade.value=explosion>0?Math.exp(-explosion*.8)*.45:0;
   this.shockwaves.forEach((r,i)=>{const t=Math.max(0,explosion-i*.25);r.scale.setScalar(1.7+t*(3+i));r.material.opacity=t>0?Math.exp(-t*.8)*.6:0});this.glow.material.uniforms.strength.value=.08+.9*Math.exp(-explosion*.95);this.glow.scale.setScalar(.8+expansion*2.2);
   if(window.__planetReady&&this.startButton.disabled&&this.state==='prelude'){this.startButton.disabled=false;this.startButton.textContent='开始我们的旅程 →';this.startButton.focus({preventScroll:true})}
   if(window.__globeFailed){this.startButton.disabled=false;this.startButton.textContent='进入我们的相册 →'}
   if(prelude>3&&this.state==='prelude'){this.galaxy.visible=true;this.galaxy.scale.setScalar(.034);this.galaxy.position.set(0,2.1,-5);this.galaxyCloud.material.uniforms.opacity.value=THREE.MathUtils.smoothstep(prelude,3,7)*.85}
  }
  if(this.state!=='prelude'){
   const seconds=(now-this.travelStartedAt)/1000,duration=this.motion?1.8:19;
   const wipe=this.dialog.querySelector('.cinema-wipe');wipe.style.opacity=seconds<1.2?String(Math.sin(Math.min(1,seconds/1.2)*Math.PI)*.96):'0';
   if(seconds>.6){
    this.state='travel';this.burst.visible=false;this.galaxy.visible=true;this.galaxy.scale.setScalar(1);this.galaxy.position.set(0,0,0);this.earthGroup.visible=true;
    const t=this.motion?18:Math.max(0,seconds-1),smooth=THREE.MathUtils.smootherstep;
    const final=this.finalPose();let position,target;
    if(t<7){const p=smooth(t,0,7);position=new THREE.Vector3(28,58,440).lerp(new THREE.Vector3(10,20,145),p);target=new THREE.Vector3(0,0,0);this.subtitle('穿越亿万星光','MILKY WAY · 在浩瀚中，奔赴同一个方向')}
    else if(t<13){const p=smooth(t,7,13);position=new THREE.Vector3(10,20,145).lerp(new THREE.Vector3(43,-8,39),p);target=new THREE.Vector3(0,0,0).lerp(this.earthPosition,p);this.subtitle('银河深处，有我们的星球','SOLAR SYSTEM · 那颗蓝色的星球，渐渐清晰')}
    else{const p=smooth(t,13,18);position=new THREE.Vector3(43,-8,39).lerp(final.camera,p);target=this.earthPosition.clone().lerp(final.target,p);this.subtitle('把故事，留在地球上','EARTH · CHINA · 记录我们一起走过的地方')}
    this.camera.position.copy(position);this.camera.lookAt(target);this.earth.quaternion.copy(this.targetEarthRotation);this.earth.rotateY((1-smooth(t,7,17))*.8);
    this.galaxyCloud.material.uniforms.opacity.value=1-smooth(t,14,18)*.75;
    if(t>16){this.dialog.classList.add('arriving');const fade=this.motion?smooth(seconds,.6,1.8):smooth(t,16.2,18);this.dialog.style.opacity=String(1-fade);if(!this.mainResumed){this.mainResumed=true;globe.resumeAnimation();mapLabelsDirty=true}}
    this.dialog.querySelector('.cinema-progress i').style.transform=`scaleX(${Math.min(1,seconds/duration)})`;
   }
   if(seconds>=duration){this.finish();return}
  }
  this.renderer.render(this.scene,this.camera);
  if(this.state==='prelude'&&(this.motion||prelude>=8)&&window.__planetReady){cancelAnimationFrame(this.frame);this.frame=null}
 }
 finish(){
  if(this.disposed)return;this.disposed=true;cancelAnimationFrame(this.frame);this.frame=null;window.removeEventListener('resize',this.onResize);document.removeEventListener('visibilitychange',this.onVisibility);
  this.canvas?.removeEventListener('webglcontextlost',this.contextLost);for(const resource of this.owned)resource.dispose?.();this.owned.clear();this.renderer?.dispose();this.renderer?.forceContextLoss();
  if(this.dialog.open)this.dialog.close();this.dialog.remove();window.__cinematicActive=false;syncSceneActivity();$('#addBtn')?.focus({preventScroll:true});
 }
}
$('#replayIntro').onclick=openCinematic;
