/* Quick FlipBook v1.1.3, Copyright (c) 2024 bandinopla, BSD-2-Clause. Includes three.modifiers v2.5.7 (drawcall, BSD) and Three.js BufferGeometryUtils r185 (MIT). See accompanying license notices. */
var QuickFlipbook=(function(){
const n=(function(){const module={exports:{}};const exports=module.exports;/*! three.modifiers-v2.5.7 */
!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var i=e();for(var o in i)("object"==typeof exports?exports:t)[o]=i[o]}}("undefined"!=typeof self?self:this,function(){return function(t){function e(o){if(i[o])return i[o].exports;var n=i[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var i={};return e.m=t,e.c=i,e.d=function(t,i,o){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=7)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Modifier=void 0;var o=function(){function t(){}return t.prototype.setModifiable=function(t){this.mod=t},t.prototype.getVertices=function(){return this.mod.getVertices()},t.prototype.destroy=function(){this.mod=null},t}();e.Modifier=o},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Vector3=void 0;var o=function(){function t(t,e,i){void 0===t&&(t=0),void 0===e&&(e=0),void 0===i&&(i=0),this.x=t,this.y=e,this.z=i}return t.prototype.clone=function(){return new t(this.x,this.y,this.z)},t.prototype.equals=function(t){return this.x==t.x&&this.y==t.y&&this.z==t.z},t.prototype.zero=function(){this.x=this.y=this.z=0},t.prototype.negate=function(){return new t(-this.x,-this.y,-this.z)},t.prototype.add=function(e){return new t(this.x+e.x,this.y+e.y,this.z+e.z)},t.prototype.subtract=function(e){return new t(this.x-e.x,this.y-e.y,this.z-e.z)},t.prototype.multiplyScalar=function(e){return new t(this.x*e,this.y*e,this.z*e)},t.prototype.multiply=function(e){return new t(this.x*e.x,this.y*e.y,this.z*e.z)},t.prototype.divide=function(e){var i=1/e;return new t(this.x*i,this.y*i,this.z*i)},t.prototype.normalize=function(){var t=this.x*this.x+this.y*this.y+this.z*this.z;if(t>0){var e=1/Math.sqrt(t);this.x*=e,this.y*=e,this.z*=e}},Object.defineProperty(t.prototype,"magnitude",{get:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},set:function(t){this.normalize(),this.x*=t,this.y*=t,this.z*=t},enumerable:!1,configurable:!0}),t.prototype.fromBufferAttribute=function(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this},t.prototype.toString=function(){return"["+this.x+" , "+this.y+" , "+this.z+"]"},t.sum=function(t,e){return t.add(e)},t.dot=function(t,e){return t.x*e.x+t.y*e.y+t.z*e.z},t.cross=function(e,i){return new t(e.y*i.z-e.z*i.y,e.z*i.x-e.x*i.z,e.x*i.y-e.y*i.x)},t.distance=function(t,e){var i=t.x-e.x,o=t.y-e.y,n=t.z-e.z;return Math.sqrt(i*i+o*o+n*n)},t.ZERO=new t(0,0,0),t}();e.Vector3=o},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ModConstant=void 0;var o=function(){function t(){}return t.NONE=0,t.X=1,t.Y=2,t.Z=4,t.LEFT=-1,t.RIGHT=1,t}();e.ModConstant=o},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TMath=void 0;var o=function(){function t(){}return t.normalize=function(e,i,o){var n=i-e;return 0==n?1:t.trim(0,1,(o-e)/i)},t.toRange=function(t,e,i){var o=e-t;return 0==o?0:t+(e-t)*i},t.inInRange=function(t,e,i,o){return void 0===o&&(o=!1),o?i>=t&&i<=e:i>t&&i<e},t.sign=function(t,e){return void 0===e&&(e=0),0==t?e:t>0?1:-1},t.trim=function(t,e,i){return Math.min(e,Math.max(t,i))},t.wrap=function(t,e,i){return i<t?i+(e-t):i>=e?i-(e-t):i},t.degToRad=function(t){return t/180*Math.PI},t.radToDeg=function(t){return t/Math.PI*180},t.presicion=function(t,e){var i=Math.pow(10,e);return Math.round(t*i)/i},t.uceil=function(t){return t<0?Math.floor(t):Math.ceil(t)},t.mappedKey=function(t){var e=Math.pow(10,4);return Math.round(t.x*e)+"_"+Math.round(t.y*e)+"_"+Math.round(t.z*e)},t.PI=3.1415,t}();e.TMath=o},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Matrix4=void 0;var o=function(){function t(t,e,i,o,n,r,s,c,u,a,h,f,p,l,y,d){void 0===t&&(t=1),void 0===e&&(e=0),void 0===i&&(i=0),void 0===o&&(o=0),void 0===n&&(n=0),void 0===r&&(r=1),void 0===s&&(s=0),void 0===c&&(c=0),void 0===u&&(u=0),void 0===a&&(a=0),void 0===h&&(h=1),void 0===f&&(f=0),void 0===p&&(p=0),void 0===l&&(l=0),void 0===y&&(y=0),void 0===d&&(d=1),this.n11=t,this.n12=e,this.n13=i,this.n14=o,this.n21=n,this.n22=r,this.n23=s,this.n24=c,this.n31=u,this.n32=a,this.n33=h,this.n34=f,this.n41=p,this.n42=l,this.n43=y,this.n44=d}return t.translationMatrix=function(e,i,o){var n=new t;return n.n14=e,n.n24=i,n.n34=o,n},t.scaleMatrix=function(e,i,o){var n=new t;return n.n11=e,n.n22=i,n.n33=o,n},t.rotationMatrix=function(e,i,o,n,r){void 0===r&&(r=null);var s;s=r||new t;var c=Math.cos(n),u=Math.sin(n),a=1-c,h=e*i*a,f=i*o*a,p=e*o*a,l=u*o,y=u*i,d=u*e;return s.n11=c+e*e*a,s.n12=-l+h,s.n13=y+p,s.n14=0,s.n21=l+h,s.n22=c+i*i*a,s.n23=-d+f,s.n24=0,s.n31=-y+p,s.n32=d+f,s.n33=c+o*o*a,s.n34=0,s},t.prototype.calculateMultiply=function(t,e){var i=t.n11,o=e.n11,n=t.n21,r=e.n21,s=t.n31,c=e.n31,u=t.n12,a=e.n12,h=t.n22,f=e.n22,p=t.n32,l=e.n32,y=t.n13,d=e.n13,_=t.n23,v=e.n23,b=t.n33,m=e.n33,g=t.n14,x=e.n14,M=t.n24,O=e.n24,P=t.n34,w=e.n34;this.n11=i*o+u*r+y*c,this.n12=i*a+u*f+y*l,this.n13=i*d+u*v+y*m,this.n14=i*x+u*O+y*w+g,this.n21=n*o+h*r+_*c,this.n22=n*a+h*f+_*l,this.n23=n*d+h*v+_*m,this.n24=n*x+h*O+_*w+M,this.n31=s*o+p*r+b*c,this.n32=s*a+p*f+b*l,this.n33=s*d+p*v+b*m,this.n34=s*x+p*O+b*w+P},t.multiply=function(e,i){var o=new t;return o.calculateMultiply(e,i),o},t.multiplyVector=function(t,e){var i=e.x,o=e.y,n=e.z;e.x=i*t.n11+o*t.n12+n*t.n13+t.n14,e.y=i*t.n21+o*t.n22+n*t.n23+t.n24,e.z=i*t.n31+o*t.n32+n*t.n33+t.n34},t}();e.Matrix4=o},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Vector2=void 0;var o=function(){function t(t,e){this.x=t,this.y=e}return t.prototype.clone=function(){return new t(this.x,this.y)},t.prototype.equals=function(t){return this.x==t.x&&this.y==t.y},t.prototype.zero=function(){this.x=this.y},t.prototype.negate=function(){return new t(-this.x,-this.y)},t.prototype.add=function(e){return new t(this.x+e.x,this.y+e.y)},t.prototype.subtract=function(e){return new t(this.x-e.x,this.y-e.y)},t.prototype.multiplyScalar=function(e){return new t(this.x*e,this.y*e)},t.prototype.multiply=function(e){return new t(this.x*e.x,this.y*e.y)},t.prototype.divide=function(e){var i=1/e;return new t(this.x*i,this.y*i)},t.prototype.normalize=function(){var t=this.x*this.x+this.y*this.y;if(t>0){var e=1/Math.sqrt(t);this.x*=e,this.y*=e}},Object.defineProperty(t.prototype,"magnitude",{get:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},set:function(t){this.normalize(),this.x*=t,this.y*=t},enumerable:!1,configurable:!0}),t.prototype.toString=function(){return"["+this.x+" , "+this.y+"]"},t.sum=function(t,e){return t.add(e)},t.dot=function(t,e){return t.x*e.x+t.y*e.y},t.distance=function(t,e){var i=t.x-e.x,o=t.y-e.y;return Math.sqrt(i*i+o*o)},t.ZERO=new t(0,0),t}();e.Vector2=o},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Range=void 0;var o=i(3),n=function(){function t(t,e){void 0===t&&(t=0),void 0===e&&(e=1),this._start=t,this._end=e}return Object.defineProperty(t.prototype,"start",{get:function(){return this._start},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"end",{get:function(){return this._end},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"size",{get:function(){return this._end-this._start},enumerable:!1,configurable:!0}),t.prototype.move=function(t){this._start+=t,this._end+=t},t.prototype.isIn=function(t){return t>=this._start&&t<=this._end},t.prototype.normalize=function(t){return o.TMath.normalize(this._start,this._end,t)},t.prototype.toRange=function(t){return o.TMath.toRange(this._start,this._end,t)},t.prototype.trim=function(t){return o.TMath.trim(this._start,this._end,t)},t.prototype.interpolate=function(t,e){return this.toRange(e.normalize(t))},t.prototype.toString=function(){return"["+this.start+" - "+this.end+"]"},t}();e.Range=n},function(t,e,i){t.exports=i(8)},function(t,e,i){"use strict";var o=this&&this.__createBinding||(Object.create?function(t,e,i,o){void 0===o&&(o=i),Object.defineProperty(t,o,{enumerable:!0,get:function(){return e[i]}})}:function(t,e,i,o){void 0===o&&(o=i),t[o]=e[i]}),n=this&&this.__exportStar||function(t,e){for(var i in t)"default"===i||Object.prototype.hasOwnProperty.call(e,i)||o(e,t,i)};Object.defineProperty(e,"__esModule",{value:!0}),n(i(9),e),n(i(16),e),n(i(6),e),n(i(5),e),n(i(1),e),n(i(3),e),n(i(2),e),n(i(17),e),n(i(19),e),n(i(20),e),n(i(21),e),n(i(25),e),n(i(26),e),n(i(27),e),n(i(28),e),n(i(29),e),n(i(30),e),n(i(31),e)},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ModifierStack=void 0;var o=i(10),n=function(){function t(t){this.baseMesh=new o.ThreeMesh,this.baseMesh.setMesh(t),this.baseMesh.analyzeGeometry(),this.stack=[]}return Object.defineProperty(t.prototype,"indexUpdate",{set:function(t){this.baseMesh.indexUpdate=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"boundUpdate",{set:function(t){this.baseMesh.boundUpdate=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"uvsAndColorUpdate",{set:function(t){this.baseMesh.uvsAndColorUpdate=t},enumerable:!1,configurable:!0}),t.prototype.addModifier=function(t){t.setModifiable(this.baseMesh),this.stack.push(t)},t.prototype.removeModifier=function(t){var e=this.stack.indexOf(t);e>-1&&this.stack.splice(e,1)},t.prototype.apply=function(){this.baseMesh.resetGeometry();for(var t=0;t<this.stack.length;t++)this.stack[t].apply();this.baseMesh.postApply()},t.prototype.collapse=function(){this.apply(),this.baseMesh.collapseGeometry(),this.stack.length=0},t.prototype.reset=function(){this.baseMesh.resetGeometry()},t.prototype.clear=function(){this.stack.length=0},t.prototype.destroy=function(){this.baseMesh.destroy();for(var t=0;t<this.stack.length;t++)this.stack[t].destroy();this.clear()},t}();e.ModifierStack=n},function(t,e,i){"use strict";var o=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function o(){this.constructor=e}if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}();Object.defineProperty(e,"__esModule",{value:!0}),e.ThreeMesh=void 0;var n=i(11),r=i(13),s=i(14),c=i(3),u=i(1),a=i(15),h=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.verticesMap=new a.TMap,e.uvsAndColorUpdate=!1,e}return o(e,t),e.prototype.setMesh=function(t){this.mesh=t,this.setVertices(),this.setFaces(),this.mergeVertices(),this.mergeFaces()},e.prototype.setVertices=function(){for(var t=this.getAttr("position"),e=0;e<t.count;e++){var i=new n.ThreeVertex,o=(new u.Vector3).fromBufferAttribute(t,e);i.setVertex(o),this.vertices.push(i)}},e.prototype.setFaces=function(){var t=this.getAttr("index"),e=this.getAttr("position");if(null!==t)for(var i=0;i<t.count;i+=3){var o=new s.FaceProxy,n=t.getX(i),r=t.getX(i+1),c=t.getX(i+2),u=this.vertices[n],a=this.vertices[r],h=this.vertices[c];o.addVertices(u,a,h),this.faces.push(o)}else for(var i=0;i<e.count;i+=3){var o=new s.FaceProxy,n=i,r=i+1,c=i+2,u=this.vertices[n],a=this.vertices[r],h=this.vertices[c];o.addVertices(u,a,h),this.faces.push(o)}},e.prototype.mergeVertices=function(){for(var t=[],e=this.verticesMap,i=0;i<this.vertices.length;i++){var o=this.vertices[i],n=c.TMath.mappedKey(o);if(e.includeByValue(n)){var r=e.getToByValue(n);e.add(r,i,n)}else{var r=t.length;o.only=!0,t.push(o),e.add(r,i,n)}}this.vertices=t},e.prototype.mergeFaces=function(){for(var t=[],e=0,i=this.faces.length;e<i;e++){var o=this.faces[e],n=c.TMath.mappedKey(o.a),r=c.TMath.mappedKey(o.b),s=c.TMath.mappedKey(o.c),u=this.verticesMap.getToByValue(n),a=this.verticesMap.getToByValue(r),h=this.verticesMap.getToByValue(s);o.a=this.vertices[u],o.b=this.vertices[a],o.c=this.vertices[h];for(var f=[u,a,h],p=0;p<3;p++)if(f[p]===f[(p+1)%3]){t.push(e);break}}for(var e=t.length-1;e>=0;e--){var l=t[e];this.faces.splice(l,1)}},e.prototype.postApply=function(){this.updatePosition(),this.updateIndex(),this.computeBounding(),this.updateUvsAndColor()},e.prototype.updateUvsAndColor=function(){if(this.uvsAndColorUpdate){var t=this.getAttr("color");t&&(t.needsUpdate=!0);var e=this.getAttr("uv");e&&(e.needsUpdate=!0)}},e.prototype.computeBounding=function(){if(this.boundUpdate){var t=this.mesh.geometry;t.computeBoundingBox(),t.computeBoundingSphere()}},e.prototype.updatePosition=function(){var t,e,i,o,n,r=this.getAttr("position"),s=this.vertices.length;for(i=0;i<s;i++)for(e=this.vertices[i],t=this.verticesMap.getFromByTo(i),o=0;o<t.length;o++)n=t[o],r.setX(n,e.x),r.setY(n,e.y),r.setZ(n,e.z);r.needsUpdate=!0},e.prototype.updateIndex=function(){if(this.indexUpdate){var t=this.getAttr("index");t&&(t.needsUpdate=!0)}},e.prototype.getAttr=function(t){var e=this.mesh.geometry;return"index"===t?e.getIndex():e.getAttribute(t)},e.prototype.updateMeshPosition=function(t){this.mesh.position.x+=t.x,this.mesh.position.y+=t.y,this.mesh.position.z+=t.z},e.prototype.destroy=function(){t.prototype.destroy.call(this),this.verticesMap.destroy(),this.verticesMap=null,this.mesh=null},e}(r.MeshProxy);e.ThreeMesh=h},function(t,e,i){"use strict";var o=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function o(){this.constructor=e}if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}();Object.defineProperty(e,"__esModule",{value:!0}),e.ThreeVertex=void 0;var n=i(12),r=function(t){function e(){var e=t.call(this)||this;return e.only=!1,e}return o(e,t),e.prototype.setVertex=function(t){this.vertor=t,this.ox=this.vertor.x,this.oy=this.vertor.y,this.oz=this.vertor.z},Object.defineProperty(e.prototype,"x",{get:function(){return this.vertor.x},set:function(t){this.vertor.x=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"y",{get:function(){return this.vertor.y},set:function(t){this.vertor.y=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"z",{get:function(){return this.vertor.z},set:function(t){this.vertor.z=t},enumerable:!1,configurable:!0}),e.prototype.toString=function(){return t.prototype.toString.call(this)+" only:"+this.only},e}(n.VertexProxy);e.ThreeVertex=r},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VertexProxy=void 0;var o=i(1),n=i(2),r=function(){function t(){this.id=""}return t.prototype.setVertex=function(t){},t.prototype.setRatios=function(t,e,i){this._ratioX=t,this._ratioY=e,this._ratioZ=i},t.prototype.setOriginalPosition=function(t,e,i){this.ox=t,this.oy=e,this.oz=i},Object.defineProperty(t.prototype,"x",{get:function(){return 0},set:function(t){},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return 0},set:function(t){},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"z",{get:function(){return 0},set:function(t){},enumerable:!1,configurable:!0}),t.prototype.getValue=function(t){switch(t){case n.ModConstant.X:return this.x;case n.ModConstant.Y:return this.y;case n.ModConstant.Z:return this.z}return 0},t.prototype.setValue=function(t,e){switch(t){case n.ModConstant.X:this.x=e;break;case n.ModConstant.Y:this.y=e;break;case n.ModConstant.Z:this.z=e}},Object.defineProperty(t.prototype,"ratioX",{get:function(){return this._ratioX},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"ratioY",{get:function(){return this._ratioY},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"ratioZ",{get:function(){return this._ratioZ},enumerable:!1,configurable:!0}),t.prototype.getRatio=function(t){switch(t){case n.ModConstant.X:return this._ratioX;case n.ModConstant.Y:return this._ratioY;case n.ModConstant.Z:return this._ratioZ}return-1},Object.defineProperty(t.prototype,"originalX",{get:function(){return this.ox},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"originalY",{get:function(){return this.oy},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"originalZ",{get:function(){return this.oz},enumerable:!1,configurable:!0}),t.prototype.getOriginalValue=function(t){switch(t){case n.ModConstant.X:return this.ox;case n.ModConstant.Y:return this.oy;case n.ModConstant.Z:return this.oz}return 0},t.prototype.reset=function(){this.x=this.ox,this.y=this.oy,this.z=this.oz},t.prototype.collapse=function(){this.ox=this.x,this.oy=this.y,this.oz=this.z},Object.defineProperty(t.prototype,"vector",{get:function(){return new o.Vector3(this.x,this.y,this.z)},set:function(t){this.x=t.x,this.y=t.y,this.z=t.z},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"ratioVector",{get:function(){return new o.Vector3(this.ratioX,this.ratioY,this.ratioZ)},enumerable:!1,configurable:!0}),t.prototype.toString=function(){return"Vertex id:"+this.id+" xyz:"+this.x+" "+this.y+" "+this.z},t}();e.VertexProxy=r},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.MeshProxy=void 0;var o=i(2),n=function(){function t(){this.boundUpdate=!1,this.indexUpdate=!1,this.uvsAndColorUpdate=!1,this.vertices=[],this.faces=[]}return t.prototype.setMesh=function(t){},t.prototype.updateMeshPosition=function(t){},t.prototype.getVertices=function(){return this.vertices},t.prototype.getFaces=function(){return this.faces},t.prototype.analyzeGeometry=function(){for(var t,e=this.getVertices().length,i=0;i<e;i++)t=this.getVertices()[i],0==i?(this._minX=this._maxX=t.x,this._minY=this._maxY=t.y,this._minZ=this._maxZ=t.z):(this._minX=Math.min(this._minX,t.x),this._minY=Math.min(this._minY,t.y),this._minZ=Math.min(this._minZ,t.z),this._maxX=Math.max(this._maxX,t.x),this._maxY=Math.max(this._maxY,t.y),this._maxZ=Math.max(this._maxZ,t.z)),t.setOriginalPosition(t.x,t.y,t.z);this._width=this._maxX-this._minX,this._height=this._maxY-this._minY,this._depth=this._maxZ-this._minZ;var n=Math.max(this._width,Math.max(this._height,this._depth)),r=Math.min(this._width,Math.min(this._height,this._depth));n==this._width&&r==this._height?(this._minAxis=o.ModConstant.Y,this._midAxis=o.ModConstant.Z,this._maxAxis=o.ModConstant.X):n==this._width&&r==this._depth?(this._minAxis=o.ModConstant.Z,this._midAxis=o.ModConstant.Y,this._maxAxis=o.ModConstant.X):n==this._height&&r==this._width?(this._minAxis=o.ModConstant.X,this._midAxis=o.ModConstant.Z,this._maxAxis=o.ModConstant.Y):n==this._height&&r==this._depth?(this._minAxis=o.ModConstant.Z,this._midAxis=o.ModConstant.X,this._maxAxis=o.ModConstant.Y):n==this._depth&&r==this._width?(this._minAxis=o.ModConstant.X,this._midAxis=o.ModConstant.Y,this._maxAxis=o.ModConstant.Z):n==this._depth&&r==this._height&&(this._minAxis=o.ModConstant.Y,this._midAxis=o.ModConstant.X,this._maxAxis=o.ModConstant.Z);for(var i=0;i<e;i++)t=this.getVertices()[i],t.setRatios((t.x-this._minX)/this._width,(t.y-this._minY)/this._height,(t.z-this._minZ)/this._depth)},t.prototype.resetGeometry=function(){for(var t=this.getVertices().length,e=0;e<t;e++){this.getVertices()[e].reset()}},t.prototype.collapseGeometry=function(){for(var t=this.getVertices().length,e=0;e<t;e++){this.getVertices()[e].collapse()}this.analyzeGeometry()},Object.defineProperty(t.prototype,"minX",{get:function(){return this._minX},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"minY",{get:function(){return this._minY},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"minZ",{get:function(){return this._minZ},enumerable:!1,configurable:!0}),t.prototype.getMin=function(t){switch(t){case o.ModConstant.X:return this._minX;case o.ModConstant.Y:return this._minY;case o.ModConstant.Z:return this._minZ}return-1},Object.defineProperty(t.prototype,"maxX",{get:function(){return this._maxX},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"maxY",{get:function(){return this._maxY},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"maxZ",{get:function(){return this._maxZ},enumerable:!1,configurable:!0}),t.prototype.getMax=function(t){switch(t){case o.ModConstant.X:return this._maxX;case o.ModConstant.Y:return this._maxY;case o.ModConstant.Z:return this._maxZ}return-1},Object.defineProperty(t.prototype,"maxAxis",{get:function(){return this._maxAxis},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"midAxis",{get:function(){return this._midAxis},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"minAxis",{get:function(){return this._minAxis},enumerable:!1,configurable:!0}),t.prototype.getSize=function(t){switch(t){case o.ModConstant.X:return this._width;case o.ModConstant.Y:return this._height;case o.ModConstant.Z:return this._depth}return-1},Object.defineProperty(t.prototype,"width",{get:function(){return this._width},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this._height},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"depth",{get:function(){return this._depth},enumerable:!1,configurable:!0}),t.prototype.postApply=function(){},t.prototype.destroy=function(){this.vertices.length=0,this.faces.length=0},t}();e.MeshProxy=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.FaceProxy=void 0;var o=function(){function t(){this._vertices=[]}return Object.defineProperty(t.prototype,"a",{get:function(){return this._vertices[0]},set:function(t){this._vertices[0]=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"b",{get:function(){return this._vertices[1]},set:function(t){this._vertices[1]=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"c",{get:function(){return this._vertices[2]},set:function(t){this._vertices[2]=t},enumerable:!1,configurable:!0}),t.prototype.addVertex=function(t){this._vertices.push(t)},t.prototype.addVertices=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var i=0;i<t.length;i++)this.addVertex(t[i])},t.prototype.addABC=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var i=0;i<t.length;i++)this.addVertex(t[i])},Object.defineProperty(t.prototype,"vertices",{get:function(){return this._vertices},enumerable:!1,configurable:!0}),t.prototype.toString=function(){for(var t="",e=0;e<this._vertices.length;e++)t+=e+":"+this._vertices[e]+" ";return t},t}();e.FaceProxy=o},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TMap=void 0;var o=function(){function t(){this.from=[]}return t.prototype.push=function(t){this.from.push(t)},t}(),n=function(){function t(){this._map={}}return t.prototype.add=function(t,e,i){var n="t_"+t;this._map[n]||(this._map[n]=new o),this._map[n].push(e),this._map[n].to=t,this._map[n].value=i},t.prototype.getToByValue=function(t){var e=this.getItemByValue(t);return e?e.to:-1},t.prototype.getFromByTo=function(t){var e=this.getItemByTo(t);return e?e.from:null},t.prototype.includeByValue=function(t){return!!this.getItemByValue(t)},t.prototype.getItemByValue=function(t){for(var e in this._map){var i=this._map[e];if(i.value===t)return i}return null},t.prototype.getItemByTo=function(t){var e="t_"+t;return this._map[e]},t.prototype.destroy=function(){for(var t in this._map)delete this._map[t]},t}();e.TMap=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Phase=void 0;var o=function(){function t(t){void 0===t&&(t=0),this.v=t}return Object.defineProperty(t.prototype,"value",{get:function(){return this.v},set:function(t){this.v=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"phasedValue",{get:function(){return Math.sin(this.v)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"absPhasedValue",{get:function(){return Math.abs(this.phasedValue)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"normValue",{get:function(){return(this.phasedValue+1)/2},enumerable:!1,configurable:!0}),t}();e.Phase=o},function(t,e,i){"use strict";var o=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function o(){this.constructor=e}if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}();Object.defineProperty(e,"__esModule",{value:!0}),e.Bend=void 0;var n=i(2),r=i(0),s=i(5),c=i(18),u=function(t){function e(e,i,o){void 0===e&&(e=0),void 0===i&&(i=.5),void 0===o&&(o=0);var r=t.call(this)||this;return r._constraint=n.ModConstant.NONE,r.switchAxes=!1,r._force=e,r._offset=i,r.angle=o,r}return o(e,t),e.prototype.setModifiable=function(e){t.prototype.setModifiable.call(this,e),this.max=this.switchAxes?e.midAxis:e.maxAxis,this.min=e.minAxis,this.mid=this.switchAxes?e.maxAxis:e.midAxis,this.width=e.getSize(this.max),this.height=e.getSize(this.mid),this.origin=e.getMin(this.max),this._diagAngle=Math.atan(this.width/this.height)},Object.defineProperty(e.prototype,"force",{get:function(){return this._force},set:function(t){this._force=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"constraint",{get:function(){return this._constraint},set:function(t){this._constraint=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"offset",{get:function(){return this._offset},set:function(t){this._offset=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"diagAngle",{get:function(){return this._diagAngle},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"angle",{get:function(){return this._angle},set:function(t){this._angle=t,this.m1=new c.Matrix(1,0,0,1),this.m1.rotate(this._angle),this.m2=new c.Matrix(1,0,0,1),this.m2.rotate(-this._angle)},enumerable:!1,configurable:!0}),e.prototype.apply=function(){if(0!=this.force)for(var t=this.mod.getVertices(),e=t.length,i=this.origin+this.width*this.offset,o=this.width/Math.PI/this.force,r=2*Math.PI*(this.width/(o*Math.PI*2)),c=0;c<e;c++){var u=t[c],a=u.getValue(this.max),h=u.getValue(this.mid),f=u.getValue(this.min),p=this.m1.transformPoint(new s.Vector2(a,h));a=p.x,h=p.y;var l=(a-this.origin)/this.width;if(this.constraint==n.ModConstant.LEFT&&l<=this.offset||this.constraint==n.ModConstant.RIGHT&&l>=this.offset);else{var y=Math.PI/2-r*this.offset+r*l,d=Math.sin(y)*(o+f),_=Math.cos(y)*(o+f);f=d-o,a=i-_}var v=this.m2.transformPoint(new s.Vector2(a,h));a=v.x,h=v.y,u.setValue(this.max,a),u.setValue(this.mid,h),u.setValue(this.min,f)}},e}(r.Modifier);e.Bend=u},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Matrix=void 0;var o=i(5),n=function(){function t(t,e,i,o){this.m=[t,e,i,o]}return t.prototype.dispose=function(){return this.m.length=0,this},t.prototype.reset=function(){return this.m[0]=1,this.m[1]=0,this.m[2]=0,this.m[3]=1,this},t.prototype.rotate=function(t){var e=Math.cos(t),i=Math.sin(t);return this.m[0]=e,this.m[1]=-i,this.m[2]=i,this.m[3]=e,this},t.prototype.scale=function(t,e){return this.m[0]=1,this.m[1]=0,this.m[2]=0,this.m[3]=1,void 0!==t&&(this.m[0]=t,this.m[3]=t),void 0!==e&&(this.m[3]=e),this},t.prototype.multiply=function(e){return t.mult(this,e)},t.prototype.transformPoint=function(e){var i=t.transform(this,[e.x,e.y]);return new o.Vector2(i[0],i[1])},t.prototype.transformPointSelf=function(e){var i=t.transform(this,[e.x,e.y]);return e.x=i[0],e.y=i[1],e},t.prototype.clone=function(){var e=this.m;return new t(e[0],e[1],e[2],e[3])},t.transform=function(t,e){var i=t.m,o=e[0],n=e[1];return e[0]=i[0]*o+i[1]*n,e[1]=i[2]*o+i[3]*n,e},t.mult=function(t,e){var i=t.m,o=e.m,n=i[0],r=i[1],s=i[2],c=i[3];return i[0]=n*o[0]+r*o[2],i[1]=n*o[1]+r*o[3],i[2]=s*o[0]+c*o[2],i[3]=s*o[1]+c*o[3],t},t}();e.Matrix=n},function(t,e,i){"use strict";var o=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function o(){this.constructor=e}if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}();Object.defineProperty(e,"__esModule",{value:!0}),e.Bloat=void 0;var n=i(1),r=i(0),s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e._center=n.Vector3.ZERO,e._r=0,e._a=.01,e._u=n.Vector3.ZERO,e}return o(e,t),Object.defineProperty(e.prototype,"center",{get:function(){return this._center},set:function(t){this._center=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"radius",{get:function(){return this._r},set:function(t){this._r=Math.max(0,t)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"a",{get:function(){return this._a},set:function(t){this._a=Math.max(0,t)},enumerable:!1,configurable:!0}),e.prototype.apply=function(){for(var t=this.mod.getVertices(),e=0,i=t;e<i.length;e++){var o=i[e],n=o;this._u.x=n.x-this._center.x,this._u.y=n.y-this._center.y,this._u.z=n.z-this._center.z,this._u.magnitude+=this._r*Math.exp(-this._u.magnitude*this._a),n.x=this._u.x+this._center.x,n.y=this._u.y+this._center.y,n.z=this._u.z+this._center.z}},e}(r.Modifier);e.Bloat=s},function(t,e,i){"use strict";var o=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function o(){this.constructor=e}if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}();Object.defineProperty(e,"__esModule",{value:!0}),e.Break=void 0;var n=i(6),r=i(1),s=i(4),c=i(0),u=function(t){function e(e,i){void 0===e&&(e=0),void 0===i&&(i=0);var o=t.call(this)||this;return o.bv=new r.Vector3(0,1,0),o.range=new n.Range(0,1),o.angle=i,o._offset=e,o}return o(e,t),e.prototype.apply=function(){for(var t=this.mod.getVertices(),e=t.length,i=new r.Vector3(0,0,-(this.mod.minZ+this.mod.depth*this.offset)),o=0;o<e;o++){var n=t[o],c=n.vector;if(c=c.add(i),c.z>=0&&this.range.isIn(n.ratioY)){var u=this.angle,a=s.Matrix4.rotationMatrix(this.bv.x,this.bv.y,this.bv.z,u);s.Matrix4.multiplyVector(a,c)}var h=i.negate();c=c.add(h),n.x=c.x,n.y=c.y,n.z=c.z}},Object.defineProperty(e.prototype,"offset",{get:function(){return this._offset},set:function(t){this._offset=t},enumerable:!1,configurable:!0}),e}(c.Modifier);e.Break=u},function(t,e,i){"use strict";var o=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function o(){this.constructor=e}if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}();Object.defineProperty(e,"__esModule",{value:!0}),e.Cloth=void 0;var n=i(2),r=i(22),s=i(0),c=i(23),u=i(24),a=function(t){function e(e,i){void 0===e&&(e=1),void 0===i&&(i=0);var o=t.call(this)||this;return o._forceX=0,o._forceY=0,o._forceZ=0,o._dic=new r.Dictionary,o._rigidity=e,o.friction=i,o}return o(e,t),e.prototype.setBounds=function(t,e,i,o,n,r){void 0===t&&(t=Number.NEGATIVE_INFINITY),void 0===e&&(e=Number.POSITIVE_INFINITY),void 0===i&&(i=Number.NEGATIVE_INFINITY),void 0===o&&(o=Number.POSITIVE_INFINITY),void 0===n&&(n=Number.NEGATIVE_INFINITY),void 0===r&&(r=Number.POSITIVE_INFINITY),this._useBounds=!0,this._boundsMinX=t,this._boundsMaxX=e,this._boundsMinY=i,this._boundsMaxY=o,this._boundsMinZ=n,this._boundsMaxZ=r},e.prototype.clearBounds=function(){this._useBounds=!1},Object.defineProperty(e.prototype,"verletVertices",{get:function(){return this._vertices},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"friction",{get:function(){return 100*(this._friction-1)},set:function(t){t<0&&(t=0),this._friction=t/100+1},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"rigidity",{get:function(){return this._rigidity},set:function(t){var e,i,o=this._connections.length;for(t>1?t=1:t<0&&(t=0),this._rigidity=t,e=.5*t;i=this._connections[--o];)i.rigidity=e},enumerable:!1,configurable:!0}),e.prototype.setForce=function(t,e,i){this._forceX=t,this._forceY=e,this._forceZ=i},Object.defineProperty(e.prototype,"forceX",{get:function(){return this._forceX},set:function(t){this._forceX=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"forceY",{get:function(){return this._forceY},set:function(t){this._forceY=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"forceZ",{get:function(){return this._forceZ},set:function(t){this._forceZ=t},enumerable:!1,configurable:!0}),e.prototype.unlockAll=function(){for(var t,e=this._vertices.length;t=this._vertices[--e];)t.mobileX=!0,t.mobileY=!0,t.mobileZ=!0},e.prototype.lockXMin=function(t,e){void 0===t&&(t=0),void 0===e&&(e=7),this.lockSet(this.mod.minX,"x",t,e)},e.prototype.lockXMax=function(t,e){void 0===t&&(t=0),void 0===e&&(e=7),this.lockSet(this.mod.maxX,"x",t,e)},e.prototype.lockYMin=function(t,e){void 0===t&&(t=0),void 0===e&&(e=7),this.lockSet(this.mod.minY,"y",t,e)},e.prototype.lockYMax=function(t,e){void 0===t&&(t=0),void 0===e&&(e=7),this.lockSet(this.mod.maxY,"y",t,e)},e.prototype.lockZMin=function(t,e){void 0===t&&(t=0),void 0===e&&(e=7),this.lockSet(this.mod.minZ,"z",t,e)},e.prototype.lockZMax=function(t,e){void 0===t&&(t=0),void 0===e&&(e=7),this.lockSet(this.mod.maxZ,"z",t,e)},e.prototype.lockSet=function(t,e,i,o){void 0===i&&(i=0),void 0===o&&(o=7);for(var r,s=this._vertices.length;r=this._vertices[--s];)Math.abs(r[e]-t)<=i&&(o&n.ModConstant.X&&(r.mobileX=!1),o&n.ModConstant.Y&&(r.mobileY=!1),o&n.ModConstant.Z&&(r.mobileZ=!1))},e.prototype.setModifiable=function(e){t.prototype.setModifiable.call(this,e),this.initVerletVertices(),this.initVerletConnections(),this.rigidity=this._rigidity},e.prototype.apply=function(){var t,e,i;for(t=this._connections.length;e=this._connections[--t];)e.update();for(t=this._vertices.length;i=this._vertices[--t];)i.mobileX&&(i.x+=this._forceX),i.mobileY&&(i.y+=this._forceY),i.mobileZ&&(i.z+=this._forceZ),i.velocityX/=this._friction,i.velocityY/=this._friction,i.velocityZ/=this._friction,this._useBounds&&(i.x<this._boundsMinX?i.x=this._boundsMinX:i.x>this._boundsMaxX&&(i.x=this._boundsMaxX),i.y<this._boundsMinY?i.y=this._boundsMinY:i.y>this._boundsMaxY&&(i.y=this._boundsMaxY),i.z<this._boundsMinZ?i.z=this._boundsMinZ:i.z>this._boundsMaxZ&&(i.z=this._boundsMaxZ)),i.update()},e.prototype.initVerletVertices=function(){var t,e=this.mod.getVertices(),i=e.length;for(this._vertices=[];t=e[--i];){var o=new u.VerletVertex(t);this._vertices.push(o),this._dic.setVal(t,o)}},e.prototype.initVerletConnections=function(){var t,e,i,o=this.mod.getFaces(),n=o.length;this._connections=[];for(var r=0;r<n;r++){t=o[r],e=t.vertices,i=e.length;for(var s=0;s<i-1;s++)this.createConnection(this._dic.getVal(e[s]),this._dic.getVal(e[s+1])),s>1&&this.createConnection(this._dic.getVal(e[0]),this._dic.getVal(e[s]));this.createConnection(this._dic.getVal(e[i-1]),this._dic.getVal(e[0]))}},e.prototype.createConnection=function(t,e){if(t&&e){var i=t.distanceTo(e),o=new c.VerletConnection(t,e,i,this._rigidity);this._connections.push(o)}},e}(s.Modifier);e.Cloth=a},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Dictionary=void 0;var o=function(){function t(){this.dic={}}return t.prototype.setVal=function(t,e){var i=this.getKey(t);this.dic[i]=e},t.prototype.getVal=function(t){var e=this.getKey(t);return this.dic[e]},t.prototype.getKey=function(t){if("object"==typeof t){if(t.id)return t.id;var e="d_"+Math.floor(Math.random()*Math.pow(10,10));return t.id=e,e}return t+""},t}();e.Dictionary=o},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VerletConnection=void 0;var o=function(){function t(t,e,i,o){void 0===o&&(o=.5),this._rigidity=.5,this._v1=t,this._v2=e,this._strictDistance=i,this._rigidity=o}return Object.defineProperty(t.prototype,"rigidity",{get:function(){return this._rigidity},set:function(t){this._rigidity=t},enumerable:!1,configurable:!0}),t.prototype.update=function(){var t,e,i,o,n=this._v1.x,r=this._v2.x,s=this._v1.y,c=this._v2.y,u=this._v1.z,a=this._v2.z,h=r-n,f=c-s,p=a-u,l=Math.sqrt(h*h+f*f+p*p);l!=this._strictDistance&&(t=(this._strictDistance-l)/l*this._rigidity,e=t*h,i=t*f,o=t*p,this._v1.mobileX&&this._v2.mobileX||(e*=2),this._v1.mobileY&&this._v2.mobileY||(i*=2),this._v1.mobileZ&&this._v2.mobileZ||(o*=2),this._v1.mobileX&&(this._v1.x-=e),this._v1.mobileY&&(this._v1.y-=i),this._v1.mobileZ&&(this._v1.z-=o),this._v2.mobileX&&(this._v2.x+=e),this._v2.mobileY&&(this._v2.y+=i),this._v2.mobileZ&&(this._v2.z+=o))},t}();e.VerletConnection=o},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VerletVertex=void 0;var o=function(){function t(t){this.mobileX=!0,this.mobileY=!0,this.mobileZ=!0,this._v=t,this.setPosition(this._v.x,this._v.y,this._v.z)}return t.prototype.setPosition=function(t,e,i){this._x=this._oldX=t,this._y=this._oldY=e,this._z=this._oldZ=i,this._v.x=t,this._v.y=e,this._v.z=i},t.prototype.update=function(){var t,e,i;this.mobileX&&(t=this.x,this.x+=this.velocityX,this._oldX=t),this.mobileY&&(e=this.y,this.y+=this.velocityY,this._oldY=e),this.mobileZ&&(i=this.z,this.z+=this.velocityZ,this._oldZ=i)},Object.defineProperty(t.prototype,"x",{get:function(){return this._x},set:function(t){this._x=t,this.mobileX||(this._oldX=t),this._v.x=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this._y},set:function(t){this._y=t,this.mobileY||(this._oldY=t),this._v.y=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"z",{get:function(){return this._z},set:function(t){this._z=t,this.mobileZ||(this._oldZ=t),this._v.z=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"velocityX",{get:function(){return this._x-this._oldX},set:function(t){this._oldX=this._x-t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"velocityY",{get:function(){return this._y-this._oldY},set:function(t){this._oldY=this._y-t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"velocityZ",{get:function(){return this._z-this._oldZ},set:function(t){this._oldZ=this._z-t},enumerable:!1,configurable:!0}),t.prototype.distanceTo=function(t){return Math.sqrt((this.x-t.x)*(this.x-t.x)+(this.y-t.y)*(this.y-t.y)+(this.z-t.z)*(this.z-t.z))},t}();e.VerletVertex=o},function(t,e,i){"use strict";var o=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function o(){this.constructor=e}if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}();Object.defineProperty(e,"__esModule",{value:!0}),e.Noise=void 0;var n=i(2),r=i(0),s=function(t){function e(e){void 0===e&&(e=0);var i=t.call(this)||this;return i.axc=n.ModConstant.NONE,i.start=0,i.end=0,i.frc=e,i}return o(e,t),Object.defineProperty(e.prototype,"force",{get:function(){return this.frc},set:function(t){this.frc=t},enumerable:!1,configurable:!0}),e.prototype.constraintAxes=function(t){this.axc=t},e.prototype.setFalloff=function(t,e){void 0===t&&(t=0),void 0===e&&(e=1),this.start=t,this.end=e},e.prototype.apply=function(){for(var t=this.mod.getVertices(),e=t.length,i=0;i<e;i++){var o=t[i],n=Math.random()*this.force-this.force/2,r=o.getRatio(this.mod.maxAxis);this.start<this.end?(r<this.start&&(r=0),r>this.end&&(r=1)):this.start>this.end?(r=1-r,r>this.start&&(r=0),r<this.end&&(r=1)):r=1,1&this.axc||(o.x+=n*r),this.axc>>1&1||(o.y+=n*r),this.axc>>2&1||(o.z+=n*r)}},e}(r.Modifier);e.Noise=s},function(t,e,i){"use strict";var o=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function o(){this.constructor=e}if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}();Object.defineProperty(e,"__esModule",{value:!0}),e.Pivot=void 0;var n=i(1),r=i(0),s=function(t){function e(e,i,o){void 0===e&&(e=0),void 0===i&&(i=0),void 0===o&&(o=0);var r=t.call(this)||this;return r.pivot=new n.Vector3(e,i,o),r}return o(e,t),e.prototype.setMeshCenter=function(){var t=-(this.mod.minX+this.mod.width/2),e=-(this.mod.minY+this.mod.height/2),i=-(this.mod.minZ+this.mod.depth/2);this.pivot=new n.Vector3(t,e,i)},e.prototype.apply=function(){for(var t=this.mod.getVertices(),e=t.length,i=0;i<e;i++){var o=t[i];o.vector=o.vector.add(this.pivot)}var n=this.pivot.clone();this.mod.updateMeshPosition(n.negate())},e}(r.Modifier);e.Pivot=s},function(t,e,i){"use strict";var o=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function o(){this.constructor=e}if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}();Object.defineProperty(e,"__esModule",{value:!0}),e.Skew=void 0;var n=i(3),r=i(2),s=i(0),c=function(t){function e(e){void 0===e&&(e=0);var i=t.call(this)||this;return i._offset=.5,i._constraint=r.ModConstant.NONE,i._power=1,i._falloff=1,i._inverseFalloff=!1,i._oneSide=!1,i._swapAxes=!1,i._force=e,i}return o(e,t),e.prototype.setModifiable=function(e){t.prototype.setModifiable.call(this,e),this._skewAxis=this._skewAxis||e.maxAxis},e.prototype.apply=function(){for(var t=this.mod.getVertices(),e=t.length,i=0;i<e;i++){var o=t[i];if(!(this._constraint==r.ModConstant.LEFT&&o.getRatio(this._skewAxis)<=this._offset)&&!(this._constraint==r.ModConstant.RIGHT&&o.getRatio(this._skewAxis)>this._offset)){var s=o.getRatio(this._skewAxis)-this._offset;this._oneSide&&(s=Math.abs(s));var c=o.getRatio(this.displaceAxis);this._inverseFalloff&&(c=1-c);var u=this._falloff+c*(1-this._falloff),a=Math.pow(Math.abs(s),this._power)*n.TMath.sign(s,1),h=o.getValue(this.displaceAxis)+this.force*a*u;o.setValue(this.displaceAxis,h)}}},Object.defineProperty(e.prototype,"displaceAxis",{get:function(){switch(this._skewAxis){case r.ModConstant.X:return this._swapAxes?r.ModConstant.Z:r.ModConstant.Y;case r.ModConstant.Y:return this._swapAxes?r.ModConstant.Z:r.ModConstant.X;case r.ModConstant.Z:return this._swapAxes?r.ModConstant.Y:r.ModConstant.X;default:return 0}},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"force",{get:function(){return this._force},set:function(t){this._force=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"constraint",{get:function(){return this._constraint},set:function(t){this._constraint=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"offset",{get:function(){return this._offset},set:function(t){this._offset=n.TMath.trim(0,1,t)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"power",{get:function(){return this._power},set:function(t){this._power=Math.max(1,t)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"falloff",{get:function(){return this._falloff},set:function(t){this._falloff=n.TMath.trim(0,1,t)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"oneSide",{get:function(){return this._oneSide},set:function(t){this._oneSide=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"skewAxis",{get:function(){return this._skewAxis},set:function(t){this._skewAxis=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"swapAxes",{get:function(){return this._swapAxes},set:function(t){this._swapAxes=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"inverseFalloff",{get:function(){return this._inverseFalloff},set:function(t){this._inverseFalloff=t},enumerable:!1,configurable:!0}),e}(s.Modifier);e.Skew=c},function(t,e,i){"use strict";var o=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function o(){this.constructor=e}if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}();Object.defineProperty(e,"__esModule",{value:!0}),e.Taper=void 0;var n=i(4),r=i(1),s=i(0),c=function(t){function e(e){var i=t.call(this)||this;return i.start=0,i.end=1,i._vector=new r.Vector3(1,0,1),i._vector2=new r.Vector3(0,1,0),i.frc=e,i.pow=1,i}return o(e,t),e.prototype.setFalloff=function(t,e){void 0===t&&(t=0),void 0===e&&(e=1),this.start=t,this.end=e},Object.defineProperty(e.prototype,"force",{get:function(){return this.frc},set:function(t){this.frc=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"power",{get:function(){return this.pow},set:function(t){this.pow=t},enumerable:!1,configurable:!0}),e.prototype.apply=function(){for(var t=this.mod.getVertices(),e=t.length,i=0;i<e;i++){var o=t[i],r=o.ratioVector.multiply(this._vector2),s=this.frc*Math.pow(r.magnitude,this.pow),c=n.Matrix4.scaleMatrix(1+s*this._vector.x,1+s*this._vector.y,1+s*this._vector.z),u=o.vector;n.Matrix4.multiplyVector(c,u),o.vector=u}},e}(s.Modifier);e.Taper=c},function(t,e,i){"use strict";var o=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function o(){this.constructor=e}if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}();Object.defineProperty(e,"__esModule",{value:!0}),e.Twist=void 0;var n=i(4),r=i(1),s=i(0),c=function(t){function e(e){void 0===e&&(e=0);var i=t.call(this)||this;return i._vector=new r.Vector3(0,1,0),i.center=r.Vector3.ZERO,i._angle=e,i}return o(e,t),Object.defineProperty(e.prototype,"angle",{get:function(){return this._angle},set:function(t){this._angle=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"vector",{get:function(){return this._vector},set:function(t){this._vector=t},enumerable:!1,configurable:!0}),e.prototype.apply=function(){this._vector.normalize();for(var t=new r.Vector3(this.mod.maxX/2,this.mod.maxY/2,this.mod.maxZ/2),e=-r.Vector3.dot(this._vector,this.center),i=0;i<this.mod.getVertices().length;i++){var o=this.mod.getVertices()[i],n=r.Vector3.dot(new r.Vector3(o.x,o.y,o.z),this._vector)+e;this.twistPoint(o,n/t.magnitude*this._angle)}},e.prototype.twistPoint=function(t,e){var i=n.Matrix4.translationMatrix(t.x,t.y,t.z);i=n.Matrix4.multiply(n.Matrix4.rotationMatrix(this._vector.x,this._vector.y,this._vector.z,e),i),t.x=i.n14,t.y=i.n24,t.z=i.n34},e}(s.Modifier);e.Twist=c},function(t,e,i){"use strict";var o=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function o(){this.constructor=e}if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}();Object.defineProperty(e,"__esModule",{value:!0}),e.Wheel=void 0;var n=i(4),r=i(1),s=i(0),c=function(t){function e(){var e=t.call(this)||this;return e.steerVector=new r.Vector3(0,1,0),e.rollVector=new r.Vector3(0,0,1),e.speed=0,e.turn=0,e.roll=0,e}return o(e,t),e.prototype.setModifiable=function(e){t.prototype.setModifiable.call(this,e),this._radius=e.width/2},e.prototype.apply=function(){this.roll+=this.speed;var t,e,i=this.mod.getVertices(),o=i.length;if(0!=this.turn){e=n.Matrix4.rotationMatrix(this.steerVector.x,this.steerVector.y,this.steerVector.z,this.turn);var r=this.rollVector.clone();n.Matrix4.multiplyVector(e,r),t=n.Matrix4.rotationMatrix(r.x,r.y,r.z,this.roll)}else t=n.Matrix4.rotationMatrix(this.rollVector.x,this.rollVector.y,this.rollVector.z,this.roll);for(var s=0;s<o;s++){var c=i[s],u=c.vector.clone();0!=this.turn&&n.Matrix4.multiplyVector(e,u),n.Matrix4.multiplyVector(t,u),c.x=u.x,c.y=u.y,c.z=u.z}},Object.defineProperty(e.prototype,"step",{get:function(){return this._radius*this.speed/Math.PI},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"perimeter",{get:function(){return 2*this._radius*Math.PI},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"radius",{get:function(){return this._radius},enumerable:!1,configurable:!0}),e}(s.Modifier);e.Wheel=c},function(t,e,i){"use strict";var o=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function o(){this.constructor=e}if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}();Object.defineProperty(e,"__esModule",{value:!0}),e.UserDefined=void 0;var n=i(0),r=i(32),s=function(t){function e(){var e=t.call(this)||this;return e.eventEmitter=new r.EventEmitter,e}return o(e,t),e.prototype.apply=function(){for(var t=this.mod.getVertices(),e=t.length,i=0;i<e;i++){var o=t[i];this.renderVector&&this.renderVector(o,i,e)}this.dispatchEvent("CHANGE")},e.prototype.addEventListener=function(t,e){this.eventEmitter.on(t,e)},e.prototype.dispatchEvent=function(t){return this.eventEmitter.emit(t)},e.prototype.hasEventListener=function(t){return this.eventEmitter.has(t)},e.prototype.removeEventListener=function(t,e){this.eventEmitter.off(t,e)},e}(n.Modifier);e.UserDefined=s},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.EventEmitter=void 0;var o=function(){function t(){}return t.prototype.on=function(t,e){return n||(n={}),n[t]||(n[t]=[]),n[t].push(e),e},t.prototype.emit=function(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];var o=!1;if(t&&n){var r=n[t];if(!r)return o;r=r.slice();var s=r.length,c=Array.prototype.slice.call(arguments);for(c.shift();s--;){var u=r[s];o=o||u.apply(null,c)}}return!!o},t.prototype.one=function(t,e){var i=this,o=Array.prototype.slice.call(arguments,2),n=function(){i.off(t,n),e.apply(null,o)};this.on(t,n)},t.prototype.has=function(t){return!(!n||!n[t])},t.prototype.off=function(t,e){if(n&&n[t])for(var i=n[t],o=0,r=i.length;o<r;o++)if(i[o].toString()==e.toString()){1==r?delete n[t]:i.splice(o,1);break}},t.prototype.offAll=function(t){t?n&&delete n[t]:n=null},t}();e.EventEmitter=o;var n}])});;return module.exports;})();
const utils=(function(){const {
	BufferAttribute,
	BufferGeometry,
	Float32BufferAttribute,
	InstancedBufferAttribute,
	InterleavedBuffer,
	InterleavedBufferAttribute,
	TriangleFanDrawMode,
	TriangleStripDrawMode,
	TrianglesDrawMode,
	Vector3,
}=THREE;

/**
 * @module BufferGeometryUtils
 * @three_import import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
 */

/**
 * Computes vertex tangents using the MikkTSpace algorithm. MikkTSpace generates the same tangents consistently,
 * and is used in most modelling tools and normal map bakers. Use MikkTSpace for materials with normal maps,
 * because inconsistent tangents may lead to subtle visual issues in the normal map, particularly around mirrored
 * UV seams.
 *
 * In comparison to this method, {@link BufferGeometry#computeTangents} (a custom algorithm) generates tangents that
 * probably will not match the tangents in other software. The custom algorithm is sufficient for general use with a
 * custom material, and may be faster than MikkTSpace.
 *
 * Returns the original BufferGeometry. Indexed geometries will be de-indexed. Requires position, normal, and uv attributes.
 *
 * @param {BufferGeometry} geometry - The geometry to compute tangents for.
 * @param {Object} MikkTSpace - Instance of `examples/jsm/libs/mikktspace.module.js`, or `mikktspace` npm package.
 * Await `MikkTSpace.ready` before use.
 * @param {boolean} [negateSign=true] - Whether to negate the sign component (.w) of each tangent.
 * Required for normal map conventions in some formats, including glTF.
 * @return {BufferGeometry} The updated geometry.
 */
function computeMikkTSpaceTangents( geometry, MikkTSpace, negateSign = true ) {

	if ( ! MikkTSpace || ! MikkTSpace.isReady ) {

		throw new Error( 'THREE.BufferGeometryUtils: Initialized MikkTSpace library required.' );

	}

	if ( ! geometry.hasAttribute( 'position' ) || ! geometry.hasAttribute( 'normal' ) || ! geometry.hasAttribute( 'uv' ) ) {

		throw new Error( 'THREE.BufferGeometryUtils: Tangents require "position", "normal", and "uv" attributes.' );

	}

	function getAttributeArray( attribute ) {

		if ( attribute.normalized || attribute.isInterleavedBufferAttribute ) {

			const dstArray = new Float32Array( attribute.count * attribute.itemSize );

			for ( let i = 0, j = 0; i < attribute.count; i ++ ) {

				dstArray[ j ++ ] = attribute.getX( i );
				dstArray[ j ++ ] = attribute.getY( i );

				if ( attribute.itemSize > 2 ) {

					dstArray[ j ++ ] = attribute.getZ( i );

				}

			}

			return dstArray;

		}

		if ( attribute.array instanceof Float32Array ) {

			return attribute.array;

		}

		return new Float32Array( attribute.array );

	}

	// MikkTSpace algorithm requires non-indexed input.

	const _geometry = geometry.index ? geometry.toNonIndexed() : geometry;

	// Compute vertex tangents.

	const tangents = MikkTSpace.generateTangents(

		getAttributeArray( _geometry.attributes.position ),
		getAttributeArray( _geometry.attributes.normal ),
		getAttributeArray( _geometry.attributes.uv )

	);

	// Texture coordinate convention of glTF differs from the apparent
	// default of the MikkTSpace library; .w component must be flipped.

	if ( negateSign ) {

		for ( let i = 3; i < tangents.length; i += 4 ) {

			tangents[ i ] *= - 1;

		}

	}

	//

	_geometry.setAttribute( 'tangent', new BufferAttribute( tangents, 4 ) );

	if ( geometry !== _geometry ) {

		geometry.copy( _geometry );

	}

	return geometry;

}

/**
 * Merges a set of geometries into a single instance. All geometries must have compatible attributes.
 *
 * @param {Array<BufferGeometry>} geometries - The geometries to merge.
 * @param {boolean} [useGroups=false] - Whether to use groups or not.
 * @return {?BufferGeometry} The merged geometry. Returns `null` if the merge does not succeed.
 */
function mergeGeometries( geometries, useGroups = false ) {

	const isIndexed = geometries[ 0 ].index !== null;

	const attributesUsed = new Set( Object.keys( geometries[ 0 ].attributes ) );
	const morphAttributesUsed = new Set( Object.keys( geometries[ 0 ].morphAttributes ) );

	const attributes = {};
	const morphAttributes = {};

	const morphTargetsRelative = geometries[ 0 ].morphTargetsRelative;

	const mergedGeometry = new BufferGeometry();

	let offset = 0;

	for ( let i = 0; i < geometries.length; ++ i ) {

		const geometry = geometries[ i ];
		let attributesCount = 0;

		// ensure that all geometries are indexed, or none

		if ( isIndexed !== ( geometry.index !== null ) ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.' );
			return null;

		}

		// gather attributes, exit early if they're different

		for ( const name in geometry.attributes ) {

			if ( ! attributesUsed.has( name ) ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure "' + name + '" attribute exists among all geometries, or in none of them.' );
				return null;

			}

			if ( attributes[ name ] === undefined ) attributes[ name ] = [];

			attributes[ name ].push( geometry.attributes[ name ] );

			attributesCount ++;

		}

		// ensure geometries have the same number of attributes

		if ( attributesCount !== attributesUsed.size ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. Make sure all geometries have the same number of attributes.' );
			return null;

		}

		// gather morph attributes, exit early if they're different

		if ( morphTargetsRelative !== geometry.morphTargetsRelative ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. .morphTargetsRelative must be consistent throughout all geometries.' );
			return null;

		}

		for ( const name in geometry.morphAttributes ) {

			if ( ! morphAttributesUsed.has( name ) ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '.  .morphAttributes must be consistent throughout all geometries.' );
				return null;

			}

			if ( morphAttributes[ name ] === undefined ) morphAttributes[ name ] = [];

			morphAttributes[ name ].push( geometry.morphAttributes[ name ] );

		}

		if ( useGroups ) {

			let count;

			if ( isIndexed ) {

				count = geometry.index.count;

			} else if ( geometry.attributes.position !== undefined ) {

				count = geometry.attributes.position.count;

			} else {

				console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. The geometry must have either an index or a position attribute' );
				return null;

			}

			mergedGeometry.addGroup( offset, count, i );

			offset += count;

		}

	}

	// merge indices

	if ( isIndexed ) {

		let indexOffset = 0;
		const mergedIndex = [];

		for ( let i = 0; i < geometries.length; ++ i ) {

			const index = geometries[ i ].index;

			for ( let j = 0; j < index.count; ++ j ) {

				mergedIndex.push( index.getX( j ) + indexOffset );

			}

			indexOffset += geometries[ i ].attributes.position.count;

		}

		mergedGeometry.setIndex( mergedIndex );

	}

	// merge attributes

	for ( const name in attributes ) {

		const mergedAttribute = mergeAttributes( attributes[ name ] );

		if ( ! mergedAttribute ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the ' + name + ' attribute.' );
			return null;

		}

		mergedGeometry.setAttribute( name, mergedAttribute );

	}

	// merge morph attributes

	for ( const name in morphAttributes ) {

		const numMorphTargets = morphAttributes[ name ][ 0 ].length;
		if ( numMorphTargets === 0 ) continue;

		mergedGeometry.morphAttributes = mergedGeometry.morphAttributes || {};
		mergedGeometry.morphAttributes[ name ] = [];

		for ( let i = 0; i < numMorphTargets; ++ i ) {

			const morphAttributesToMerge = [];

			for ( let j = 0; j < morphAttributes[ name ].length; ++ j ) {

				morphAttributesToMerge.push( morphAttributes[ name ][ j ][ i ] );

			}

			const mergedMorphAttribute = mergeAttributes( morphAttributesToMerge );

			if ( ! mergedMorphAttribute ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the ' + name + ' morphAttribute.' );
				return null;

			}

			mergedGeometry.morphAttributes[ name ].push( mergedMorphAttribute );

		}

	}

	return mergedGeometry;

}

/**
 * Merges a set of attributes into a single instance. All attributes must have compatible properties and types.
 * Instances of {@link InterleavedBufferAttribute} are not supported.
 *
 * @param {Array<BufferAttribute>} attributes - The attributes to merge.
 * @return {?BufferAttribute} The merged attribute. Returns `null` if the merge does not succeed.
 */
function mergeAttributes( attributes ) {

	let TypedArray;
	let itemSize;
	let normalized;
	let gpuType = - 1;
	let arrayLength = 0;

	for ( let i = 0; i < attributes.length; ++ i ) {

		const attribute = attributes[ i ];

		if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
		if ( TypedArray !== attribute.array.constructor ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.' );
			return null;

		}

		if ( itemSize === undefined ) itemSize = attribute.itemSize;
		if ( itemSize !== attribute.itemSize ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.' );
			return null;

		}

		if ( normalized === undefined ) normalized = attribute.normalized;
		if ( normalized !== attribute.normalized ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.' );
			return null;

		}

		if ( gpuType === - 1 ) gpuType = attribute.gpuType;
		if ( gpuType !== attribute.gpuType ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.' );
			return null;

		}

		arrayLength += attribute.count * itemSize;

	}

	const array = new TypedArray( arrayLength );
	const result = new BufferAttribute( array, itemSize, normalized );
	let offset = 0;

	for ( let i = 0; i < attributes.length; ++ i ) {

		const attribute = attributes[ i ];
		if ( attribute.isInterleavedBufferAttribute ) {

			const tupleOffset = offset / itemSize;
			for ( let j = 0, l = attribute.count; j < l; j ++ ) {

				for ( let c = 0; c < itemSize; c ++ ) {

					const value = attribute.getComponent( j, c );
					result.setComponent( j + tupleOffset, c, value );

				}

			}

		} else {

			array.set( attribute.array, offset );

		}

		offset += attribute.count * itemSize;

	}

	if ( gpuType !== undefined ) {

		result.gpuType = gpuType;

	}

	return result;

}

/**
 * Performs a deep clone of the given buffer attribute.
 *
 * @param {BufferAttribute} attribute - The attribute to clone.
 * @return {BufferAttribute} The cloned attribute.
 */
function deepCloneAttribute( attribute ) {

	if ( attribute.isInstancedInterleavedBufferAttribute || attribute.isInterleavedBufferAttribute ) {

		return deinterleaveAttribute( attribute );

	}

	if ( attribute.isInstancedBufferAttribute ) {

		return new InstancedBufferAttribute().copy( attribute );

	}

	return new BufferAttribute().copy( attribute );

}

/**
 * Interleaves a set of attributes and returns a new array of corresponding attributes that share a
 * single {@link InterleavedBuffer} instance. All attributes must have compatible types.
 *
 * @param {Array<BufferAttribute>} attributes - The attributes to interleave.
 * @return {?Array<InterleavedBufferAttribute>} An array of interleaved attributes. If interleave does not succeed, the method returns `null`.
 */
function interleaveAttributes( attributes ) {

	// Interleaves the provided attributes into an InterleavedBuffer and returns
	// a set of InterleavedBufferAttributes for each attribute
	let TypedArray;
	let arrayLength = 0;
	let stride = 0;

	// calculate the length and type of the interleavedBuffer
	for ( let i = 0, l = attributes.length; i < l; ++ i ) {

		const attribute = attributes[ i ];

		if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
		if ( TypedArray !== attribute.array.constructor ) {

			console.error( 'AttributeBuffers of different types cannot be interleaved' );
			return null;

		}

		arrayLength += attribute.array.length;
		stride += attribute.itemSize;

	}

	// Create the set of buffer attributes
	const interleavedBuffer = new InterleavedBuffer( new TypedArray( arrayLength ), stride );
	let offset = 0;
	const res = [];
	const getters = [ 'getX', 'getY', 'getZ', 'getW' ];
	const setters = [ 'setX', 'setY', 'setZ', 'setW' ];

	for ( let j = 0, l = attributes.length; j < l; j ++ ) {

		const attribute = attributes[ j ];
		const itemSize = attribute.itemSize;
		const count = attribute.count;
		const iba = new InterleavedBufferAttribute( interleavedBuffer, itemSize, offset, attribute.normalized );
		res.push( iba );

		offset += itemSize;

		// Move the data for each attribute into the new interleavedBuffer
		// at the appropriate offset
		for ( let c = 0; c < count; c ++ ) {

			for ( let k = 0; k < itemSize; k ++ ) {

				iba[ setters[ k ] ]( c, attribute[ getters[ k ] ]( c ) );

			}

		}

	}

	return res;

}

/**
 * Returns a new, non-interleaved version of the given attribute.
 *
 * @param {InterleavedBufferAttribute} attribute - The interleaved attribute.
 * @return {BufferAttribute} The non-interleaved attribute.
 */
function deinterleaveAttribute( attribute ) {

	const cons = attribute.data.array.constructor;
	const count = attribute.count;
	const itemSize = attribute.itemSize;
	const normalized = attribute.normalized;

	const array = new cons( count * itemSize );
	let newAttribute;
	if ( attribute.isInstancedInterleavedBufferAttribute ) {

		newAttribute = new InstancedBufferAttribute( array, itemSize, normalized, attribute.meshPerAttribute );

	} else {

		newAttribute = new BufferAttribute( array, itemSize, normalized );

	}

	for ( let i = 0; i < count; i ++ ) {

		newAttribute.setX( i, attribute.getX( i ) );

		if ( itemSize >= 2 ) {

			newAttribute.setY( i, attribute.getY( i ) );

		}

		if ( itemSize >= 3 ) {

			newAttribute.setZ( i, attribute.getZ( i ) );

		}

		if ( itemSize >= 4 ) {

			newAttribute.setW( i, attribute.getW( i ) );

		}

	}

	return newAttribute;

}

/**
 * Deinterleaves all attributes on the given geometry.
 *
 * @param {BufferGeometry} geometry - The geometry to deinterleave.
 */
function deinterleaveGeometry( geometry ) {

	const attributes = geometry.attributes;
	const morphTargets = geometry.morphTargets;
	const attrMap = new Map();

	for ( const key in attributes ) {

		const attr = attributes[ key ];
		if ( attr.isInterleavedBufferAttribute ) {

			if ( ! attrMap.has( attr ) ) {

				attrMap.set( attr, deinterleaveAttribute( attr ) );

			}

			attributes[ key ] = attrMap.get( attr );

		}

	}

	for ( const key in morphTargets ) {

		const attr = morphTargets[ key ];
		if ( attr.isInterleavedBufferAttribute ) {

			if ( ! attrMap.has( attr ) ) {

				attrMap.set( attr, deinterleaveAttribute( attr ) );

			}

			morphTargets[ key ] = attrMap.get( attr );

		}

	}

}

/**
 * Returns the amount of bytes used by all attributes to represent the geometry.
 *
 * @param {BufferGeometry} geometry - The geometry.
 * @return {number} The estimate bytes used.
 */
function estimateBytesUsed( geometry ) {

	// Return the estimated memory used by this geometry in bytes
	// Calculate using itemSize, count, and BYTES_PER_ELEMENT to account
	// for InterleavedBufferAttributes.
	let mem = 0;
	for ( const name in geometry.attributes ) {

		const attr = geometry.getAttribute( name );
		mem += attr.count * attr.itemSize * attr.array.BYTES_PER_ELEMENT;

	}

	const indices = geometry.getIndex();
	mem += indices ? indices.count * indices.itemSize * indices.array.BYTES_PER_ELEMENT : 0;
	return mem;

}

/**
 * Returns a new geometry with vertices for which all similar vertex attributes (within tolerance) are merged.
 *
 * @param {BufferGeometry} geometry - The geometry to merge vertices for.
 * @param {number} [tolerance=1e-4] - The tolerance value.
 * @return {BufferGeometry} - The new geometry with merged vertices.
 */
function mergeVertices( geometry, tolerance = 1e-4 ) {

	tolerance = Math.max( tolerance, Number.EPSILON );

	// Generate an index buffer if the geometry doesn't have one, or optimize it
	// if it's already available.
	const hashToIndex = {};
	const indices = geometry.getIndex();
	const positions = geometry.getAttribute( 'position' );
	const vertexCount = indices ? indices.count : positions.count;

	// next value for triangle indices
	let nextIndex = 0;

	// attributes and new attribute arrays
	const attributeNames = Object.keys( geometry.attributes );
	const tmpAttributes = {};
	const tmpMorphAttributes = {};
	const newIndices = [];
	const getters = [ 'getX', 'getY', 'getZ', 'getW' ];
	const setters = [ 'setX', 'setY', 'setZ', 'setW' ];

	// Initialize the arrays, allocating space conservatively. Extra
	// space will be trimmed in the last step.
	for ( let i = 0, l = attributeNames.length; i < l; i ++ ) {

		const name = attributeNames[ i ];
		const attr = geometry.attributes[ name ];

		tmpAttributes[ name ] = new attr.constructor(
			new attr.array.constructor( attr.count * attr.itemSize ),
			attr.itemSize,
			attr.normalized
		);

		const morphAttributes = geometry.morphAttributes[ name ];
		if ( morphAttributes ) {

			if ( ! tmpMorphAttributes[ name ] ) tmpMorphAttributes[ name ] = [];
			morphAttributes.forEach( ( morphAttr, i ) => {

				const array = new morphAttr.array.constructor( morphAttr.count * morphAttr.itemSize );
				tmpMorphAttributes[ name ][ i ] = new morphAttr.constructor( array, morphAttr.itemSize, morphAttr.normalized );

			} );

		}

	}

	// convert the error tolerance to an amount of decimal places to truncate to
	const halfTolerance = tolerance * 0.5;
	const exponent = Math.log10( 1 / tolerance );
	const hashMultiplier = Math.pow( 10, exponent );
	const hashAdditive = halfTolerance * hashMultiplier;
	for ( let i = 0; i < vertexCount; i ++ ) {

		const index = indices ? indices.getX( i ) : i;

		// Generate a hash for the vertex attributes at the current index 'i'
		let hash = '';
		for ( let j = 0, l = attributeNames.length; j < l; j ++ ) {

			const name = attributeNames[ j ];
			const attribute = geometry.getAttribute( name );
			const itemSize = attribute.itemSize;

			for ( let k = 0; k < itemSize; k ++ ) {

				// double tilde truncates the decimal value
				hash += `${ ~ ~ ( attribute[ getters[ k ] ]( index ) * hashMultiplier + hashAdditive ) },`;

			}

		}

		// Add another reference to the vertex if it's already
		// used by another index
		if ( hash in hashToIndex ) {

			newIndices.push( hashToIndex[ hash ] );

		} else {

			// copy data to the new index in the temporary attributes
			for ( let j = 0, l = attributeNames.length; j < l; j ++ ) {

				const name = attributeNames[ j ];
				const attribute = geometry.getAttribute( name );
				const morphAttributes = geometry.morphAttributes[ name ];
				const itemSize = attribute.itemSize;
				const newArray = tmpAttributes[ name ];
				const newMorphArrays = tmpMorphAttributes[ name ];

				for ( let k = 0; k < itemSize; k ++ ) {

					const getterFunc = getters[ k ];
					const setterFunc = setters[ k ];
					newArray[ setterFunc ]( nextIndex, attribute[ getterFunc ]( index ) );

					if ( morphAttributes ) {

						for ( let m = 0, ml = morphAttributes.length; m < ml; m ++ ) {

							newMorphArrays[ m ][ setterFunc ]( nextIndex, morphAttributes[ m ][ getterFunc ]( index ) );

						}

					}

				}

			}

			hashToIndex[ hash ] = nextIndex;
			newIndices.push( nextIndex );
			nextIndex ++;

		}

	}

	// generate result BufferGeometry
	const result = geometry.clone();
	for ( const name in geometry.attributes ) {

		const tmpAttribute = tmpAttributes[ name ];

		result.setAttribute( name, new tmpAttribute.constructor(
			tmpAttribute.array.slice( 0, nextIndex * tmpAttribute.itemSize ),
			tmpAttribute.itemSize,
			tmpAttribute.normalized,
		) );

		if ( ! ( name in tmpMorphAttributes ) ) continue;

		for ( let j = 0; j < tmpMorphAttributes[ name ].length; j ++ ) {

			const tmpMorphAttribute = tmpMorphAttributes[ name ][ j ];

			result.morphAttributes[ name ][ j ] = new tmpMorphAttribute.constructor(
				tmpMorphAttribute.array.slice( 0, nextIndex * tmpMorphAttribute.itemSize ),
				tmpMorphAttribute.itemSize,
				tmpMorphAttribute.normalized,
			);

		}

	}

	// indices

	result.setIndex( newIndices );

	return result;

}

/**
 * Returns a new indexed geometry based on `TrianglesDrawMode` draw mode.
 * This mode corresponds to the `gl.TRIANGLES` primitive in WebGL.
 *
 * @param {BufferGeometry} geometry - The geometry to convert.
 * @param {number} drawMode - The current draw mode.
 * @return {BufferGeometry} The new geometry using `TrianglesDrawMode`.
 */
function toTrianglesDrawMode( geometry, drawMode ) {

	if ( drawMode === TrianglesDrawMode ) {

		console.warn( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.' );
		return geometry;

	}

	if ( drawMode === TriangleFanDrawMode || drawMode === TriangleStripDrawMode ) {

		let index = geometry.getIndex();

		// generate index if not present

		if ( index === null ) {

			const indices = [];

			const position = geometry.getAttribute( 'position' );

			if ( position !== undefined ) {

				for ( let i = 0; i < position.count; i ++ ) {

					indices.push( i );

				}

				geometry.setIndex( indices );
				index = geometry.getIndex();

			} else {

				console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.' );
				return geometry;

			}

		}

		//

		const numberOfTriangles = index.count - 2;
		const newIndices = [];

		if ( drawMode === TriangleFanDrawMode ) {

			// gl.TRIANGLE_FAN

			for ( let i = 1; i <= numberOfTriangles; i ++ ) {

				newIndices.push( index.getX( 0 ) );
				newIndices.push( index.getX( i ) );
				newIndices.push( index.getX( i + 1 ) );

			}

		} else {

			// gl.TRIANGLE_STRIP

			for ( let i = 0; i < numberOfTriangles; i ++ ) {

				if ( i % 2 === 0 ) {

					newIndices.push( index.getX( i ) );
					newIndices.push( index.getX( i + 1 ) );
					newIndices.push( index.getX( i + 2 ) );

				} else {

					newIndices.push( index.getX( i + 2 ) );
					newIndices.push( index.getX( i + 1 ) );
					newIndices.push( index.getX( i ) );

				}

			}

		}

		if ( ( newIndices.length / 3 ) !== numberOfTriangles ) {

			console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.' );

		}

		// build final geometry

		const newGeometry = geometry.clone();
		newGeometry.setIndex( newIndices );
		newGeometry.clearGroups();

		return newGeometry;

	} else {

		console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:', drawMode );
		return geometry;

	}

}

/**
 * Calculates the morphed attributes of a morphed/skinned BufferGeometry.
 *
 * Helpful for Raytracing or Decals (i.e. a `DecalGeometry` applied to a morphed Object with a `BufferGeometry`
 * will use the original `BufferGeometry`, not the morphed/skinned one, generating an incorrect result.
 * Using this function to create a shadow `Object3`D the `DecalGeometry` can be correctly generated).
 *
 * @param {Mesh|Line|Points} object - The 3D object to compute morph attributes for.
 * @return {Object} An object with original position/normal attributes and morphed ones.
 */
function computeMorphedAttributes( object ) {

	const _vA = new Vector3();
	const _vB = new Vector3();
	const _vC = new Vector3();

	const _tempA = new Vector3();
	const _tempB = new Vector3();
	const _tempC = new Vector3();

	const _morphA = new Vector3();
	const _morphB = new Vector3();
	const _morphC = new Vector3();

	function _calculateMorphedAttributeData(
		object,
		attribute,
		morphAttribute,
		morphTargetsRelative,
		a,
		b,
		c,
		modifiedAttributeArray
	) {

		_vA.fromBufferAttribute( attribute, a );
		_vB.fromBufferAttribute( attribute, b );
		_vC.fromBufferAttribute( attribute, c );

		const morphInfluences = object.morphTargetInfluences;

		if ( morphAttribute && morphInfluences ) {

			_morphA.set( 0, 0, 0 );
			_morphB.set( 0, 0, 0 );
			_morphC.set( 0, 0, 0 );

			for ( let i = 0, il = morphAttribute.length; i < il; i ++ ) {

				const influence = morphInfluences[ i ];
				const morph = morphAttribute[ i ];

				if ( influence === 0 ) continue;

				_tempA.fromBufferAttribute( morph, a );
				_tempB.fromBufferAttribute( morph, b );
				_tempC.fromBufferAttribute( morph, c );

				if ( morphTargetsRelative ) {

					_morphA.addScaledVector( _tempA, influence );
					_morphB.addScaledVector( _tempB, influence );
					_morphC.addScaledVector( _tempC, influence );

				} else {

					_morphA.addScaledVector( _tempA.sub( _vA ), influence );
					_morphB.addScaledVector( _tempB.sub( _vB ), influence );
					_morphC.addScaledVector( _tempC.sub( _vC ), influence );

				}

			}

			_vA.add( _morphA );
			_vB.add( _morphB );
			_vC.add( _morphC );

		}

		if ( object.isSkinnedMesh ) {

			object.applyBoneTransform( a, _vA );
			object.applyBoneTransform( b, _vB );
			object.applyBoneTransform( c, _vC );

		}

		modifiedAttributeArray[ a * 3 + 0 ] = _vA.x;
		modifiedAttributeArray[ a * 3 + 1 ] = _vA.y;
		modifiedAttributeArray[ a * 3 + 2 ] = _vA.z;
		modifiedAttributeArray[ b * 3 + 0 ] = _vB.x;
		modifiedAttributeArray[ b * 3 + 1 ] = _vB.y;
		modifiedAttributeArray[ b * 3 + 2 ] = _vB.z;
		modifiedAttributeArray[ c * 3 + 0 ] = _vC.x;
		modifiedAttributeArray[ c * 3 + 1 ] = _vC.y;
		modifiedAttributeArray[ c * 3 + 2 ] = _vC.z;

	}

	const geometry = object.geometry;
	const material = object.material;

	let a, b, c;
	const index = geometry.index;
	const positionAttribute = geometry.attributes.position;
	const morphPosition = geometry.morphAttributes.position;
	const morphTargetsRelative = geometry.morphTargetsRelative;
	const normalAttribute = geometry.attributes.normal;
	const morphNormal = geometry.morphAttributes.normal;

	const groups = geometry.groups;
	const drawRange = geometry.drawRange;
	let i, j, il, jl;
	let group;
	let start, end;

	const modifiedPosition = new Float32Array( positionAttribute.count * positionAttribute.itemSize );
	const modifiedNormal = new Float32Array( normalAttribute.count * normalAttribute.itemSize );

	if ( index !== null ) {

		// indexed buffer geometry

		if ( Array.isArray( material ) ) {

			for ( i = 0, il = groups.length; i < il; i ++ ) {

				group = groups[ i ];

				start = Math.max( group.start, drawRange.start );
				end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

				for ( j = start, jl = end; j < jl; j += 3 ) {

					a = index.getX( j );
					b = index.getX( j + 1 );
					c = index.getX( j + 2 );

					_calculateMorphedAttributeData(
						object,
						positionAttribute,
						morphPosition,
						morphTargetsRelative,
						a, b, c,
						modifiedPosition
					);

					_calculateMorphedAttributeData(
						object,
						normalAttribute,
						morphNormal,
						morphTargetsRelative,
						a, b, c,
						modifiedNormal
					);

				}

			}

		} else {

			start = Math.max( 0, drawRange.start );
			end = Math.min( index.count, ( drawRange.start + drawRange.count ) );

			for ( i = start, il = end; i < il; i += 3 ) {

				a = index.getX( i );
				b = index.getX( i + 1 );
				c = index.getX( i + 2 );

				_calculateMorphedAttributeData(
					object,
					positionAttribute,
					morphPosition,
					morphTargetsRelative,
					a, b, c,
					modifiedPosition
				);

				_calculateMorphedAttributeData(
					object,
					normalAttribute,
					morphNormal,
					morphTargetsRelative,
					a, b, c,
					modifiedNormal
				);

			}

		}

	} else {

		// non-indexed buffer geometry

		if ( Array.isArray( material ) ) {

			for ( i = 0, il = groups.length; i < il; i ++ ) {

				group = groups[ i ];

				start = Math.max( group.start, drawRange.start );
				end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

				for ( j = start, jl = end; j < jl; j += 3 ) {

					a = j;
					b = j + 1;
					c = j + 2;

					_calculateMorphedAttributeData(
						object,
						positionAttribute,
						morphPosition,
						morphTargetsRelative,
						a, b, c,
						modifiedPosition
					);

					_calculateMorphedAttributeData(
						object,
						normalAttribute,
						morphNormal,
						morphTargetsRelative,
						a, b, c,
						modifiedNormal
					);

				}

			}

		} else {

			start = Math.max( 0, drawRange.start );
			end = Math.min( positionAttribute.count, ( drawRange.start + drawRange.count ) );

			for ( i = start, il = end; i < il; i += 3 ) {

				a = i;
				b = i + 1;
				c = i + 2;

				_calculateMorphedAttributeData(
					object,
					positionAttribute,
					morphPosition,
					morphTargetsRelative,
					a, b, c,
					modifiedPosition
				);

				_calculateMorphedAttributeData(
					object,
					normalAttribute,
					morphNormal,
					morphTargetsRelative,
					a, b, c,
					modifiedNormal
				);

			}

		}

	}

	const morphedPositionAttribute = new Float32BufferAttribute( modifiedPosition, 3 );
	const morphedNormalAttribute = new Float32BufferAttribute( modifiedNormal, 3 );

	return {

		positionAttribute: positionAttribute,
		normalAttribute: normalAttribute,
		morphedPositionAttribute: morphedPositionAttribute,
		morphedNormalAttribute: morphedNormalAttribute

	};

}

/**
 * Merges the {@link BufferGeometry#groups} for the given geometry.
 *
 * @param {BufferGeometry} geometry - The geometry to modify.
 * @return {BufferGeometry} - The updated geometry
 */
function mergeGroups( geometry ) {

	if ( geometry.groups.length === 0 ) {

		console.warn( 'THREE.BufferGeometryUtils.mergeGroups(): No groups are defined. Nothing to merge.' );
		return geometry;

	}

	let groups = geometry.groups;

	// sort groups by material index

	groups = groups.sort( ( a, b ) => {

		if ( a.materialIndex !== b.materialIndex ) return a.materialIndex - b.materialIndex;

		return a.start - b.start;

	} );

	// create index for non-indexed geometries

	if ( geometry.getIndex() === null ) {

		const positionAttribute = geometry.getAttribute( 'position' );
		const indices = [];

		for ( let i = 0; i < positionAttribute.count; i += 3 ) {

			indices.push( i, i + 1, i + 2 );

		}

		geometry.setIndex( indices );

	}

	// sort index

	const index = geometry.getIndex();

	const newIndices = [];

	for ( let i = 0; i < groups.length; i ++ ) {

		const group = groups[ i ];

		const groupStart = group.start;
		const groupLength = groupStart + group.count;

		for ( let j = groupStart; j < groupLength; j ++ ) {

			newIndices.push( index.getX( j ) );

		}

	}

	geometry.dispose(); // Required to force buffer recreation
	geometry.setIndex( newIndices );

	// update groups indices

	let start = 0;

	for ( let i = 0; i < groups.length; i ++ ) {

		const group = groups[ i ];

		group.start = start;
		start += group.count;

	}

	// merge groups

	let currentGroup = groups[ 0 ];

	geometry.groups = [ currentGroup ];

	for ( let i = 1; i < groups.length; i ++ ) {

		const group = groups[ i ];

		if ( currentGroup.materialIndex === group.materialIndex ) {

			currentGroup.count += group.count;

		} else {

			currentGroup = group;
			geometry.groups.push( currentGroup );

		}

	}

	return geometry;

}

/**
 * Modifies the supplied geometry if it is non-indexed, otherwise creates a new,
 * non-indexed geometry. Returns the geometry with smooth normals everywhere except
 * faces that meet at an angle greater than the crease angle.
 *
 * @param {BufferGeometry} geometry - The geometry to modify.
 * @param {number} [creaseAngle=Math.PI/3] - The crease angle in radians.
 * @return {BufferGeometry} - The updated geometry
 */
function toCreasedNormals( geometry, creaseAngle = Math.PI / 3 /* 60 degrees */ ) {

	// BufferGeometry.toNonIndexed() warns if the geometry is non-indexed
	// and returns the original geometry
	const resultGeometry = geometry.index ? geometry.toNonIndexed() : geometry;
	const posAttr = resultGeometry.attributes.position;
	const vertexCount = posAttr.count;

	let positions;

	if ( posAttr.isBufferAttribute === true && posAttr.itemSize === 3 && posAttr.normalized === false ) {

		positions = posAttr.array;

	} else {

		// flatten the position buffer so the math below operates on plain numbers
		positions = new Float64Array( vertexCount * 3 );

		for ( let i = 0; i < vertexCount; i ++ ) {

			positions[ 3 * i + 0 ] = posAttr.getX( i );
			positions[ 3 * i + 1 ] = posAttr.getY( i );
			positions[ 3 * i + 2 ] = posAttr.getZ( i );

		}

	}

	const creaseDot = Math.cos( creaseAngle );
	const hashMultiplier = ( 1 + 1e-10 ) * 1e2;
	const faceCount = vertexCount / 3;

	// compute the normal of each face
	const faceNormals = new Float64Array( faceCount * 3 );
	for ( let f = 0; f < faceCount; f ++ ) {

		const f9 = 9 * f;
		const ax = positions[ f9 + 0 ], ay = positions[ f9 + 1 ], az = positions[ f9 + 2 ];
		const bx = positions[ f9 + 3 ], by = positions[ f9 + 4 ], bz = positions[ f9 + 5 ];
		const cx = positions[ f9 + 6 ], cy = positions[ f9 + 7 ], cz = positions[ f9 + 8 ];

		const v1x = cx - bx, v1y = cy - by, v1z = cz - bz;
		const v2x = ax - bx, v2y = ay - by, v2z = az - bz;

		const nx = v1y * v2z - v1z * v2y;
		const ny = v1z * v2x - v1x * v2z;
		const nz = v1x * v2y - v1y * v2x;

		const invLength = 1 / ( Math.sqrt( nx * nx + ny * ny + nz * nz ) || 1 );
		faceNormals[ 3 * f + 0 ] = nx * invLength;
		faceNormals[ 3 * f + 1 ] = ny * invLength;
		faceNormals[ 3 * f + 2 ] = nz * invLength;

	}

	// assign an id to each vertex, sharing the id between vertices with the same
	// quantized position via an open-addressed hash table (slots hold id + 1, 0 means empty)
	const vertexIds = new Int32Array( vertexCount );
	const quantized = new Int32Array( vertexCount * 3 );

	let tableSize = 1;
	while ( tableSize < vertexCount * 2 ) tableSize <<= 1;
	const tableMask = tableSize - 1;
	const table = new Int32Array( tableSize );

	let uniqueCount = 0;
	for ( let i = 0; i < vertexCount; i ++ ) {

		const i3 = 3 * i;
		const qx = ~ ~ ( positions[ i3 + 0 ] * hashMultiplier );
		const qy = ~ ~ ( positions[ i3 + 1 ] * hashMultiplier );
		const qz = ~ ~ ( positions[ i3 + 2 ] * hashMultiplier );

		let slot = ( Math.imul( qx, 73856093 ) ^ Math.imul( qy, 19349663 ) ^ Math.imul( qz, 83492791 ) ) & tableMask;

		while ( true ) {

			const id = table[ slot ];

			if ( id === 0 ) {

				const q3 = 3 * uniqueCount;
				quantized[ q3 + 0 ] = qx;
				quantized[ q3 + 1 ] = qy;
				quantized[ q3 + 2 ] = qz;

				table[ slot ] = uniqueCount + 1;
				vertexIds[ i ] = uniqueCount ++;
				break;

			}

			const q3 = 3 * ( id - 1 );

			if ( quantized[ q3 + 0 ] === qx && quantized[ q3 + 1 ] === qy && quantized[ q3 + 2 ] === qz ) {

				vertexIds[ i ] = id - 1;
				break;

			}

			slot = ( slot + 1 ) & tableMask;

		}

	}

	// bucket the faces surrounding each unique vertex position
	const bucketOffsets = new Int32Array( uniqueCount + 1 );
	for ( let i = 0; i < vertexCount; i ++ ) bucketOffsets[ vertexIds[ i ] + 1 ] ++;
	for ( let i = 0; i < uniqueCount; i ++ ) bucketOffsets[ i + 1 ] += bucketOffsets[ i ];

	const bucketFaces = new Int32Array( vertexCount );
	const bucketCursors = bucketOffsets.slice( 0, uniqueCount );
	for ( let f = 0; f < faceCount; f ++ ) {

		const f3 = 3 * f;
		bucketFaces[ bucketCursors[ vertexIds[ f3 + 0 ] ] ++ ] = f;
		bucketFaces[ bucketCursors[ vertexIds[ f3 + 1 ] ] ++ ] = f;
		bucketFaces[ bucketCursors[ vertexIds[ f3 + 2 ] ] ++ ] = f;

	}

	// average the normals of the faces surrounding each vertex if they are within the
	// provided crease threshold
	const normalArray = new Float32Array( vertexCount * 3 );
	for ( let f = 0; f < faceCount; f ++ ) {

		const f3 = 3 * f;
		const nx = faceNormals[ f3 + 0 ];
		const ny = faceNormals[ f3 + 1 ];
		const nz = faceNormals[ f3 + 2 ];

		for ( let n = 0; n < 3; n ++ ) {

			const i = f3 + n;
			const id = vertexIds[ i ];

			let sumX = 0, sumY = 0, sumZ = 0;

			for ( let k = bucketOffsets[ id ], end = bucketOffsets[ id + 1 ]; k < end; k ++ ) {

				const o3 = 3 * bucketFaces[ k ];
				const ox = faceNormals[ o3 + 0 ];
				const oy = faceNormals[ o3 + 1 ];
				const oz = faceNormals[ o3 + 2 ];

				if ( nx * ox + ny * oy + nz * oz > creaseDot ) {

					sumX += ox;
					sumY += oy;
					sumZ += oz;

				}

			}

			const invLength = 1 / ( Math.sqrt( sumX * sumX + sumY * sumY + sumZ * sumZ ) || 1 );
			normalArray[ 3 * i + 0 ] = sumX * invLength;
			normalArray[ 3 * i + 1 ] = sumY * invLength;
			normalArray[ 3 * i + 2 ] = sumZ * invLength;

		}

	}

	resultGeometry.setAttribute( 'normal', new BufferAttribute( normalArray, 3, false ) );
	return resultGeometry;

}

return {mergeGeometries};})();
const h=THREE, _=utils.mergeGeometries, m=n.UserDefined, c=n.ModConstant;
class w extends m {
  /** 
   * @param elevationAxis Axis to use as elevation dimension
   * @param alongAxis Axis to use as the "plane" (perpendicular to elevation ideally)
   * @param effectRange from 0 to 1, along the "along axis" what portion wil be subjected to this effect. 
   * @param effectMid from 0 to 1, at what point we stop climbing up and start going down again?
   * @param elevationHeight how "high" we elevate the vertices along the elevationAxis?
   */
  constructor(t = c.Y, e = c.X, s = 0.5, i = 0.5, r = 0.5) {
    super(), this.elevationAxis = t, this.alongAxis = e, this.effectRange = s, this.effectMid = i, this.elevationHeight = r, this.intensity = 1, this.renderVector = this._renderVector;
  }
  _renderVector(t, e, s) {
    let i = t.getRatio(this.alongAxis), r = t.getValue(this.elevationAxis);
    if (i <= this.effectRange) {
      i /= this.effectRange;
      let a = 0;
      i < this.effectMid ? (i = i / this.effectMid, a = Math.sqrt(1 - Math.pow(i, 2) + i * 2 - 1)) : (i = (i - this.effectMid) / (1 - this.effectMid), a = (Math.cos(i * Math.PI) - -1) / 2), t.setValue(this.elevationAxis, r + a * this.elevationHeight * this.intensity);
    }
  }
}
const d = (o) => {
  for (var t = o.attributes.uv, e = 0; e < t.count; e++) {
    var s = t.getX(e), i = t.getY(e);
    t.setXY(e, 1 - s, i);
  }
  return o;
}, g = new h.MeshStandardMaterial({ color: "#ffffff" });
class v extends h.Mesh {
  constructor(t = 10) {
    super();
    let e = new h.Mesh(
      _(
        [
          d(new h.PlaneGeometry(1, 1, t, t)),
          d(new h.PlaneGeometry(1, 1, t, t).rotateY(Math.PI))
        ],
        !0
        // allow groups
      ),
      [
        g,
        g
      ]
    );
    e.castShadow = !0, e.receiveShadow = !0, e.rotateX(Math.PI / 2), e.position.x = 0.5, this.scale.z = -1, this.add(e), this.page = e, this.modifiers = new n.ModifierStack(e), this.bend = new n.Bend(0, 0, 0), this.bend.constraint = n.ModConstant.LEFT, this.twist = new n.Twist(0), this.twist.vector = new n.Vector3(2, 0, 0), this.twist.center = new n.Vector3(-0.5, 0, 0), this.pageCurve = new w(
      n.ModConstant.Z,
      n.ModConstant.X,
      0.812,
      0.325,
      0.054
    ), this.modifiers.addModifier(this.pageCurve), this.modifiers.addModifier(this.bend), this.modifiers.addModifier(this.twist);
  }
  /**
   * Sets the material for a page's face.
   * @param newMaterial New material for this page's face.
   * @param index 0 or 1
   */
  setPageMaterial(t, e) {
    this.page.material[e] = t;
  }
  /**
   * Sets the internal progress of the flip of this page. 0 = no flip. 1 = fully flipped to the otehr side.
   * @param progress a number from 0 to 1
   * @param direction either -1 or 1 to know to which side we are flipping (this is used to invert the bending of the page to the correct side on flip)
   * @param pageCurveIntensity Intensity of the page curve modifier effect
   */
  flip(t, e, s = 1) {
    this.rotation.z = Math.PI * t, this.bend.force = Math.min(-Math.sin(this.rotation.z) / 2, -1e-4) * e, this.twist.angle = Math.sin(this.rotation.z) / 10, this.pageCurve.intensity = (-1 + 2 * t) * (-Math.sin(this.rotation.z) + 1) * s, this.modifiers.apply();
  }
  /**
   * call dispose on the material of this face.
   */
  disposeMaterial(t) {
    const e = this.page.material[t];
    e !== g && e.dispose();
  }
  /**
   * Just sets all materials to "no texture"
   */
  reset() {
    this.setPageMaterial(g, 0), this.setPageMaterial(g, 1);
  }
  dispose(t = !1) {
    t && (this.disposeMaterial(0), this.disposeMaterial(1)), this.page.geometry.dispose(), this.modifiers.destroy();
  }
}
const u = /* @__PURE__ */ function() {
  var o;
  return () => {
    if (!o) {
      const t = document.createElement("canvas");
      t.width = 256, t.height = 256;
      const e = t.getContext("2d"), s = e.createLinearGradient(0, 0, t.width, 0);
      s.addColorStop(0, "black"), s.addColorStop(0.1, "white"), e.fillStyle = s, e.fillRect(0, 0, t.width, t.height), o = new h.CanvasTexture(t), t.remove();
    }
    return o;
  };
}();
class y extends h.Mesh {
  constructor(t) {
    super(), this.pages = [], this.pool = [], this._url2Loader = /* @__PURE__ */ new Map(), this._currentProgress = 0, this._flipDuration = (t == null ? void 0 : t.flipDuration) || 1, this._ySpacing = (t == null ? void 0 : t.yBetweenPages) || 1e-3, this._pageSubdivisions = (t == null ? void 0 : t.pageSubdivisions) || 20, this.currentPage = 0;
  }
  [Symbol.iterator]() {
    let t = 0;
    return {
      next: () => t < this.pages.length ? { value: this.pages[t++], done: !1 } : { value: null, done: !0 }
    };
  }
  /** 
   * Initialize the book. Pass in the URLs to the images to use for each page.
   * The order in which they will be loaded is one page (2 images per page) at a time.
   * After one page is loaded, the next will start loading. While one page is loading the rest are in perpetual inactive state (nothing loading) 
    
   * @param pagesSources Array with the "source" to use as the page texture, either a material or a url to load an image from.
   */
  setPages(t) {
    for (t.length % 2 !== 0 && t.push(""); this.pages.length; ) {
      let s = this.pages.pop();
      s.reset(), this.pool.push(s), this.remove(s);
    }
    let e = Promise.resolve();
    for (let s = 0; s < t.length; s += 2) {
      const i = t[s], r = t[s + 1];
      let a = this.pool.pop();
      a || (a = new v(this._pageSubdivisions)), this.add(a), a.position.y = -this._ySpacing * this.pages.length, this.pages.push(a), a.name = `Page#${this.pages.length}`, e = e.then(this.loadPages(i, r, a));
    }
    this.currentPage > this.pages.length * 2 - 1 && (this._currentPage = this.pages.length * 2 - 1, this._currentProgress = this.pages.length), this.flipPages();
  }
  /**
   * Returns the total number of pages.
   * **Do not confuse with the number of sheets of paper**
   */
  get totalPages() {
    return this.pages.length * 2;
  }
  /**
   * Loads the 2 faces of a page at the same time...
   */
  loadPages(t, e, s) {
    return () => Promise.all([
      this.loadPage(t, 1, s),
      this.loadPage(e, 0, s)
    ]);
  }
  /**
   * Loads a page's face. If it is a Material it just puts that, if it is a string it will try to load it using the TextureLoader
   */
  loadPage(t, e, s) {
    if (!t || t === "") {
      const r = new h.MeshStandardMaterial({
        color: "white",
        roughness: 0.2,
        aoMapIntensity: 0.7,
        aoMap: e == 1 ? u() : null
      });
      return s.setPageMaterial(r, e), Promise.resolve();
    }
    if (t instanceof h.Material)
      return s.setPageMaterial(t, e), Promise.resolve();
    if (t instanceof h.Texture)
      return s.setPageMaterial(this.textureToMaterial(t, e), e), Promise.resolve();
    const i = t;
    return this._url2Loader.has(i) || this._url2Loader.set(i, new Promise((r, a) => {
      new h.TextureLoader().load(
        t,
        (l) => {
          r(this.textureToMaterial(l, e));
        },
        void 0,
        (l) => {
          r(null);
        }
      );
    })), this._url2Loader.get(i).then((r) => {
      s.setPageMaterial(r, e);
    });
  }
  textureToMaterial(t, e) {
    return t.magFilter = h.LinearFilter, t.minFilter = h.LinearFilter, t.generateMipmaps = !1, t.colorSpace = h.SRGBColorSpace, new h.MeshStandardMaterial({
      color: "white",
      map: t,
      roughness: 0.2,
      aoMapIntensity: 0.7,
      aoMap: e == 1 ? u() : null,
      toneMapped: !1
    });
  }
  /**
   * The current "page" (as you would read on a book, the page number...)
   */
  get currentPage() {
    return this._currentPage;
  }
  set currentPage(t) {
    let e = Math.ceil(t / 2), s = e - this._currentProgress;
    this._stepSize = s / this._flipDuration, this._flipDirection = this._stepSize > 0 ? 1 : -1, this._currentPage = Math.ceil(t), this._goalProgress = e, this.flipPages();
  }
  /**
   * Each page has a progress that goes form 0 to 1. 
   * Here, the progress of a book goes form 0 to `Total Pages` (but in this case, by "page" we mean paper, a paper has 2 pages, the fornt and back page...)
   * and the decimal portion is the progress of the flip of that page. 
   * If you have 3 pages, for example, to send the user to the last page's back side, you have to call .progress = 3 (which is almost equivalent to 2.9999... )
   * 
   * expects a number from `0` to `book.totalPages/2`
   */
  get progress() {
    return this._currentProgress;
  }
  set progress(t) {
    let e = this._currentProgress;
    this._currentProgress = Math.max(0, Math.min(t, this.pages.length)), this._currentPage = Math.floor(this._currentProgress * 2), this._stepSize = 0, this._flipDirection = this._currentProgress > e ? 1 : -1, this.flipPages();
  }
  /**
   * Call this to animate this book every frame.
   * @param delta seconds since last frame render
   */
  animate(t) {
    this._stepSize != 0 && (this._currentProgress += this._stepSize * t, (this._stepSize > 0 && this._currentProgress > this._goalProgress || this._stepSize < 0 && this._currentProgress < this._goalProgress) && (this._currentProgress = this._goalProgress, this._stepSize = 0), this.flipPages());
  }
  /**
   * It will flip all the pages until this page is facing at the user.
   * @param page Page of interest
   */
  flipPage(t) {
    var e = this.pages.indexOf(t);
    if (e < 0)
      throw new ReferenceError("I don't own that page! Not mine!");
    const s = e * 2, i = s + 1;
    this.currentPage = this._currentPage <= s ? i : s;
  }
  /**
   * Send the book to the next page
   */
  nextPage() {
    this.currentPage = Math.min(Math.ceil(this.currentPage / 2) + 1, this.pages.length) * 2;
  }
  /**
   * Send the book to the previous page
   */
  previousPage() {
    this.currentPage = Math.max(Math.ceil(this.currentPage / 2) - 1, 0) * 2;
  }
  /**
   * Goes one by one and calculate the progress of each FlipPage based on the progress of the book.
   */
  flipPages() {
    const t = this.pages.length;
    let e = this._currentProgress % 1, s = Math.floor(this._currentProgress);
    for (let r = 0; r < t; r++) {
      const a = this.pages[r], l = s < r ? 0 : s > r ? 1 : e, P = l < 0.5 ? 0 : (l - 0.5) / 0.5, f = -this._ySpacing * (t - r), p = -this._ySpacing * r, M = this._currentProgress < 1 ? e : this._currentProgress >= t ? 0 : this._currentProgress >= t - 1 ? 1 - e : 1;
      a.flip(l, this._flipDirection, M), a.position.y = p + P * (f - p);
    }
    const i = s == 0 ? -0.5 + 0.5 * e : s == t - 1 ? 0.5 * e : s == t ? 0.5 : 0;
    this.position.x = i * this.scale.x;
  }
  /**
   * Will dispose the book, the pages and all the materials used. Also the internal cache.
   */
  dispose() {
    for (; this.pages.length; ) {
      let t = this.pages.pop();
      this.remove(t);
    }
    for (; this.pool.length; )
      this.pool.pop().dispose(!0);
    this._url2Loader.forEach((t) => t.then((e) => e.dispose())), this._url2Loader.clear();
  }
}
return {FlipBook:y};
})();
