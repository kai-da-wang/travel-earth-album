// Planet surfaces: Solar System Scope / INOVE, CC BY 4.0.
// The scene is an artistic composition; distances are chosen for the album UI.
async function installCosmos(globeView){
 const scene=globeView.scene(),camera=globeView.camera(),renderer=globeView.renderer();
 const container=document.querySelector('#globe');
 const motion=matchMedia('(prefers-reduced-motion:reduce)');
 const loader=new THREE.TextureLoader(),textures={};
 await Promise.all(Object.entries(PLANET_TEXTURES).map(async([name,url])=>{
  const texture=await loader.loadAsync(url);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());textures[name]=texture;
 }));
 const skyMaterial=new THREE.ShaderMaterial({uniforms:{skyMap:{value:textures.sky},viewport:{value:new THREE.Vector2()}},vertexShader:'varying vec2 mapUv;void main(){mapUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:`
  uniform sampler2D skyMap;uniform vec2 viewport;varying vec2 mapUv;
  void main(){
   vec2 d=vec2(.003,.004);vec3 cloud=texture2D(skyMap,mapUv,3.).rgb*.4;
   cloud+=(texture2D(skyMap,mapUv+vec2(d.x,0.),3.).rgb+texture2D(skyMap,mapUv-vec2(d.x,0.),3.).rgb+texture2D(skyMap,mapUv+vec2(0.,d.y),3.).rgb+texture2D(skyMap,mapUv-vec2(0.,d.y),3.).rgb)*.15;
   vec3 c=pow(cloud,vec3(.31));float strength=max(c.r,max(c.g,c.b));vec2 s=gl_FragCoord.xy/viewport;
   float edge=smoothstep(0.,.15,s.x)*smoothstep(0.,.15,1.-s.x)*smoothstep(0.,.16,s.y)*smoothstep(0.,.16,1.-s.y);
   gl_FragColor=vec4(c*.72,clamp(strength*2.5,0.0,.62)*edge);
  }`,side:THREE.BackSide,transparent:true,depthWrite:false});
 const sky=new THREE.Mesh(new THREE.SphereGeometry(5000,48,32),skyMaterial);
 sky.name='milkyWaySky';sky.quaternion.copy(camera.quaternion).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(.38,Math.PI/2+.35,-.4)));sky.raycast=()=>{};sky.renderOrder=-20;scene.add(sky);
 let seed=20261002;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296};
 const count=matchMedia('(max-width:760px)').matches?4200:9500;
 const positions=new Float32Array(count*3),colors=new Float32Array(count*3),sizes=new Float32Array(count),phases=new Float32Array(count);
 const palette=[new THREE.Color('#e9eef7'),new THREE.Color('#a4c0e3'),new THREE.Color('#ecd8bf')];
 for(let i=0;i<count;i++){
  const a=random()*Math.PI*2,z=random()*2-1,r=2300+random()*1600,plane=Math.sqrt(1-z*z),color=palette[Math.floor(random()*palette.length)];
  positions.set([r*plane*Math.cos(a),r*z,r*plane*Math.sin(a)],i*3);colors.set([color.r,color.g,color.b],i*3);sizes[i]=1.3+Math.pow(random(),4)*2.7;phases[i]=random()*Math.PI*2;
 }
 const starGeometry=new THREE.BufferGeometry();starGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));starGeometry.setAttribute('starColor',new THREE.BufferAttribute(colors,3));starGeometry.setAttribute('starSize',new THREE.BufferAttribute(sizes,1));starGeometry.setAttribute('starPhase',new THREE.BufferAttribute(phases,1));
 const starMaterial=new THREE.ShaderMaterial({uniforms:{time:{value:0},pixelRatio:{value:Math.min(devicePixelRatio||1,2)}},vertexShader:`
  attribute vec3 starColor;attribute float starSize;attribute float starPhase;
  uniform float pixelRatio;varying vec3 color;varying float phase;
  void main(){color=starColor;phase=starPhase;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(starSize*2300.0/max(1.0,-mv.z),.7,4.0)*pixelRatio;}
 `,fragmentShader:`
  uniform float time;varying vec3 color;varying float phase;
  void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;float core=exp(-d*d*38.0)+.08*exp(-d*d*8.0);float shimmer=.72+.12*sin(time*.28+phase);gl_FragColor=vec4(color,core*shimmer);}
 `,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
 const stars=new THREE.Points(starGeometry,starMaterial);stars.name='cosmicStarfield';stars.raycast=()=>{};stars.frustumCulled=false;stars.renderOrder=-10;scene.add(stars);
 const display=new THREE.Group();display.name='solarSystemDisplay';camera.add(display);if(!camera.parent)scene.add(camera);
 const distantGalaxies=[{x:.56,y:.12,radius:48,depth:1600,mobile:{x:.88,y:.43,radius:13}},{x:.94,y:.49,radius:28,depth:1900,mobile:{x:.13,y:.58,radius:12}}].map((config,index)=>{
  const total=index?4800:9000,coords=new Float32Array(total*3),hues=new Float32Array(total*3);
  for(let i=0;i<total;i++){
   const core=i<total*.28,r=core?Math.pow(random(),1.6)*.28:Math.pow(random(),.65),arm=i%2;
   const angle=core||i%5===0?random()*Math.PI*2:Math.log(r+.12)*3.15+arm*Math.PI+(random()-.5)*(1.4+r);
   coords.set([Math.cos(angle)*r,(random()-.5)*(core?.13:.035),Math.sin(angle)*r],i*3);
   const color=new THREE.Color(core?'#f5e6d1':random()>.2?'#a3bddf':'#d6ddeb');hues.set([color.r,color.g,color.b],i*3);
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(coords,3));g.setAttribute('tint',new THREE.BufferAttribute(hues,3));
  const m=new THREE.ShaderMaterial({uniforms:{pixelRatio:{value:Math.min(devicePixelRatio||1,2)}},vertexShader:'attribute vec3 tint;uniform float pixelRatio;varying vec3 shade;void main(){shade=tint;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_PointSize=3.1*pixelRatio;}',fragmentShader:'varying vec3 shade;void main(){float r=length(gl_PointCoord-.5);if(r>.5)discard;gl_FragColor=vec4(shade,exp(-r*r*25.)*.052);}',transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
  const points=new THREE.Points(g,m);points.name='distantSpiralGalaxy-'+index;points.rotation.set(index?1.07:.68,.2,index?-.45:.35);points.raycast=()=>{};camera.add(points);return {config,points};
 });
 const ambient=new THREE.AmbientLight('#8fa1ba',.24);scene.add(ambient);
 const sun=new THREE.DirectionalLight('#fff3df',2.5);sun.position.set(-500,650,50);sun.target.position.set(0,0,-900);camera.add(sun,sun.target);
 sun.castShadow=true;const shadowSize=matchMedia('(max-width:760px)').matches?1024:2048;sun.shadow.mapSize.set(shadowSize,shadowSize);Object.assign(sun.shadow.camera,{left:-950,right:950,top:950,bottom:-950,near:1,far:2800});sun.shadow.bias=-.0002;sun.shadow.normalBias=.025;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 const geometry=new THREE.SphereGeometry(1,72,48);
 const configs=[
  {name:'土星',key:'saturn',x:.835,y:.235,radius:45,depth:850,mobile:{x:.765,y:.155,radius:25}},
  {name:'木星',key:'jupiter',x:.145,y:.67,radius:55,depth:720,mobile:{x:.19,y:.72,radius:31}},
  {name:'火星',key:'mars',x:.14,y:.465,radius:25,depth:950,mobile:{x:.185,y:.32,radius:17}},
  {name:'月球',key:'moon',x:.867,y:.705,radius:25,depth:620,mobile:{x:.815,y:.755,radius:16}},
  {name:'海王星',key:'neptune',x:.685,y:.1,radius:17,depth:1200,mobile:{x:.63,y:.1,radius:9}}
 ];
 const planets=configs.map((config,index)=>{
  const group=new THREE.Group();group.name='planet-'+config.key;
  const material=new THREE.MeshStandardMaterial({map:textures[config.key],roughness:.96,metalness:0});
  if(config.key==='moon'||config.key==='mars'){material.bumpMap=textures[config.key];material.bumpScale=.014;}
  const sphere=new THREE.Mesh(geometry,material);sphere.name='surface-'+config.key;sphere.castShadow=true;sphere.receiveShadow=true;sphere.raycast=()=>{};sphere.rotation.set(.08,index*.9,.12);
  group.add(sphere);display.add(group);
  if(config.key!=='moon'){
   const tint={saturn:'#e6c694',jupiter:'#dbb88a',mars:'#cc7850',neptune:'#5b9fe1'}[config.key];
   const haze=new THREE.Mesh(geometry,new THREE.ShaderMaterial({
    uniforms:{tint:{value:new THREE.Color(tint)}},
    vertexShader:'varying vec3 viewNormal;varying vec3 toEye;void main(){vec4 p=modelViewMatrix*vec4(position,1.);viewNormal=normalize(normalMatrix*normal);toEye=normalize(-p.xyz);gl_Position=projectionMatrix*p;}',
    fragmentShader:'uniform vec3 tint;varying vec3 viewNormal;varying vec3 toEye;void main(){vec3 n=normalize(viewNormal);float rim=pow(1.-abs(dot(n,normalize(toEye))),3.5);float lit=.2+.8*max(0.,dot(n,normalize(vec3(-.5,.7,.6))));gl_FragColor=vec4(tint,rim*lit*.22);}',
    transparent:true,depthWrite:false,side:THREE.FrontSide,blending:THREE.AdditiveBlending
   }));haze.name='atmosphere-'+config.key;haze.scale.setScalar(1.035);haze.raycast=()=>{};group.add(haze);
  }
  let rings;
  if(config.key==='saturn'){
   const ringGeometry=new THREE.RingGeometry(1.3,2.35,192,4),position=ringGeometry.attributes.position,uv=ringGeometry.attributes.uv;
   for(let i=0;i<position.count;i++){const radius=Math.hypot(position.getX(i),position.getY(i));uv.setXY(i,(radius-1.3)/1.05,.5)}
   const ringMaterial=new THREE.MeshStandardMaterial({map:textures.saturnRing,side:THREE.DoubleSide,transparent:true,alphaTest:.08,roughness:.92,metalness:0,depthWrite:false});
   rings=new THREE.Mesh(ringGeometry,ringMaterial);rings.name='saturnRings';rings.rotation.set(-1.02,-.22,-.30);rings.castShadow=true;rings.receiveShadow=true;rings.raycast=()=>{};group.add(rings);
  }
  const label=document.createElement('span');label.className='solar-caption';label.textContent=config.name;label.setAttribute('aria-hidden','true');container.append(label);
  return {config,group,sphere,rings,label};
 });
 const startedAt=performance.now(),previousBeforeRender=scene.onBeforeRender;
 scene.onBeforeRender=function(...args){
  if(typeof previousBeforeRender==='function')previousBeforeRender.apply(this,args);
  const elapsed=motion.matches?0:(performance.now()-startedAt)/1000;starMaterial.uniforms.time.value=elapsed;
  renderer.getDrawingBufferSize(skyMaterial.uniforms.viewport.value);
  const width=container.clientWidth,height=container.clientHeight,isMobile=matchMedia('(max-width:760px)').matches,zoom=320/camera.position.length();
  for(const galaxy of distantGalaxies){const c=galaxy.config,p=isMobile?{...c,...c.mobile}:c;const h=2*p.depth*Math.tan(THREE.MathUtils.degToRad(camera.fov/2));galaxy.points.position.set((p.x-.5)*h*camera.aspect*zoom,(.5-p.y)*h*zoom,-p.depth);galaxy.points.scale.setScalar(p.radius/height*h*zoom);galaxy.points.updateMatrixWorld(true)}
  for(const planet of planets){
   const c=planet.config,p=isMobile?{...c,...c.mobile}:c;
   const viewHeight=2*p.depth*Math.tan(THREE.MathUtils.degToRad(camera.fov/2)),viewWidth=viewHeight*camera.aspect;
   const drift=motion.matches?0:Math.sin(elapsed*.08+configs.indexOf(c))*1.5;
   planet.group.position.set((p.x-.5)*viewWidth*zoom,((.5-p.y)*viewHeight+drift)*zoom,-p.depth);
   planet.group.scale.setScalar(p.radius/height*viewHeight*zoom);planet.sphere.rotation.y=elapsed*(c.key==='jupiter'?.025:.01)+configs.indexOf(c)*.9;
   planet.label.style.left=((.5+(p.x-.5)*zoom)*width)+'px';planet.label.style.top=((.5+(p.y-.5)*zoom)*height+p.radius*zoom*(c.key==='saturn'?1.2:1)+12)+'px';
   planet.label.hidden=isMobile&&(c.key==='neptune'||c.key==='mars');
  }
  display.updateMatrixWorld(true);sun.updateMatrixWorld(true);sun.target.updateMatrixWorld(true);
 };
 camera.far=Math.max(camera.far,11000);camera.updateProjectionMatrix();
 window.__cosmosReady=true;
}
