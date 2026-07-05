(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const hl="167",Ed=0,Vl=1,Td=2,vh=1,wd=2,qn=3,xi=0,en=1,Un=2,gi=0,Ms=1,Wl=2,Xl=3,ql=4,Ad=5,Di=100,Rd=101,Cd=102,Pd=103,Ld=104,Id=200,Dd=201,Ud=202,Nd=203,ga=204,_a=205,Fd=206,Od=207,kd=208,Bd=209,zd=210,Hd=211,Gd=212,Vd=213,Wd=214,Xd=0,qd=1,Yd=2,hr=3,$d=4,Kd=5,jd=6,Zd=7,dl=0,Jd=1,Qd=2,_i=0,tu=1,eu=2,nu=3,iu=4,su=5,ou=6,ru=7,Mh=300,Rs=301,Cs=302,xa=303,va=304,Tr=306,Ma=1e3,Fi=1001,ya=1002,tn=1003,au=1004,So=1005,En=1006,Nr=1007,Oi=1008,Zn=1009,yh=1010,Sh=1011,ao=1012,ul=1013,Vi=1014,$n=1015,go=1016,fl=1017,pl=1018,Ps=1020,bh=35902,Eh=1021,Th=1022,wn=1023,wh=1024,Ah=1025,ys=1026,Ls=1027,Rh=1028,ml=1029,Ch=1030,gl=1031,_l=1033,tr=33776,er=33777,nr=33778,ir=33779,Sa=35840,ba=35841,Ea=35842,Ta=35843,wa=36196,Aa=37492,Ra=37496,Ca=37808,Pa=37809,La=37810,Ia=37811,Da=37812,Ua=37813,Na=37814,Fa=37815,Oa=37816,ka=37817,Ba=37818,za=37819,Ha=37820,Ga=37821,sr=36492,Va=36494,Wa=36495,Ph=36283,Xa=36284,qa=36285,Ya=36286,lu=3200,cu=3201,Lh=0,hu=1,fi="",Ln="srgb",yi="srgb-linear",xl="display-p3",wr="display-p3-linear",dr="linear",me="srgb",ur="rec709",fr="p3",Ki=7680,Yl=519,du=512,uu=513,fu=514,Ih=515,pu=516,mu=517,gu=518,_u=519,$l=35044,Kl="300 es",Kn=2e3,pr=2001;class ks{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const o=s.indexOf(e);o!==-1&&s.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let o=0,r=s.length;o<r;o++)s[o].call(this,t);t.target=null}}}const Ge=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],or=Math.PI/180,$a=180/Math.PI;function _o(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ge[i&255]+Ge[i>>8&255]+Ge[i>>16&255]+Ge[i>>24&255]+"-"+Ge[t&255]+Ge[t>>8&255]+"-"+Ge[t>>16&15|64]+Ge[t>>24&255]+"-"+Ge[e&63|128]+Ge[e>>8&255]+"-"+Ge[e>>16&255]+Ge[e>>24&255]+Ge[n&255]+Ge[n>>8&255]+Ge[n>>16&255]+Ge[n>>24&255]).toLowerCase()}function Je(i,t,e){return Math.max(t,Math.min(e,i))}function xu(i,t){return(i%t+t)%t}function Fr(i,t,e){return(1-e)*i+e*t}function Hs(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ke(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Kt{constructor(t=0,e=0){Kt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Je(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),o=this.x-t.x,r=this.y-t.y;return this.x=o*n-r*s+t.x,this.y=o*s+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gt{constructor(t,e,n,s,o,r,a,l,c){Gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,r,a,l,c)}set(t,e,n,s,o,r,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=o,h[5]=l,h[6]=n,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,r=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],v=s[1],x=s[4],y=s[7],R=s[2],w=s[5],T=s[8];return o[0]=r*_+a*v+l*R,o[3]=r*m+a*x+l*w,o[6]=r*p+a*y+l*T,o[1]=c*_+h*v+u*R,o[4]=c*m+h*x+u*w,o[7]=c*p+h*y+u*T,o[2]=d*_+f*v+g*R,o[5]=d*m+f*x+g*w,o[8]=d*p+f*y+g*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*r*h-e*a*c-n*o*h+n*a*l+s*o*c-s*r*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*r-a*c,d=a*l-h*o,f=c*o-r*l,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*c-h*n)*_,t[2]=(a*n-s*r)*_,t[3]=d*_,t[4]=(h*e-s*l)*_,t[5]=(s*o-a*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(r*e-n*o)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,o,r,a){const l=Math.cos(o),c=Math.sin(o);return this.set(n*l,n*c,-n*(l*r+c*a)+r+t,-s*c,s*l,-s*(-c*r+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Or.makeScale(t,e)),this}rotate(t){return this.premultiply(Or.makeRotation(-t)),this}translate(t,e){return this.premultiply(Or.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Or=new Gt;function Dh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function mr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function vu(){const i=mr("canvas");return i.style.display="block",i}const jl={};function io(i){i in jl||(jl[i]=!0,console.warn(i))}function Mu(i,t,e){return new Promise(function(n,s){function o(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(o,e);break;default:n()}}setTimeout(o,e)})}const Zl=new Gt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Jl=new Gt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Gs={[yi]:{transfer:dr,primaries:ur,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[Ln]:{transfer:me,primaries:ur,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[wr]:{transfer:dr,primaries:fr,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Jl),fromReference:i=>i.applyMatrix3(Zl)},[xl]:{transfer:me,primaries:fr,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Jl),fromReference:i=>i.applyMatrix3(Zl).convertLinearToSRGB()}},yu=new Set([yi,wr]),re={enabled:!0,_workingColorSpace:yi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!yu.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=Gs[t].toReference,s=Gs[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Gs[i].primaries},getTransfer:function(i){return i===fi?dr:Gs[i].transfer},getLuminanceCoefficients:function(i,t=this._workingColorSpace){return i.fromArray(Gs[t].luminanceCoefficients)}};function Ss(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function kr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ji;class Su{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ji===void 0&&(ji=mr("canvas")),ji.width=t.width,ji.height=t.height;const n=ji.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ji}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=mr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),o=s.data;for(let r=0;r<o.length;r++)o[r]=Ss(o[r]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ss(e[n]/255)*255):e[n]=Ss(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let bu=0;class Uh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:bu++}),this.uuid=_o(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let r=0,a=s.length;r<a;r++)s[r].isDataTexture?o.push(Br(s[r].image)):o.push(Br(s[r]))}else o=Br(s);n.url=o}return e||(t.images[this.uuid]=n),n}}function Br(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Su.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Eu=0;class $e extends ks{constructor(t=$e.DEFAULT_IMAGE,e=$e.DEFAULT_MAPPING,n=Fi,s=Fi,o=En,r=Oi,a=wn,l=Zn,c=$e.DEFAULT_ANISOTROPY,h=fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Eu++}),this.uuid=_o(),this.name="",this.source=new Uh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=o,this.minFilter=r,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Kt(0,0),this.repeat=new Kt(1,1),this.center=new Kt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Mh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ma:t.x=t.x-Math.floor(t.x);break;case Fi:t.x=t.x<0?0:1;break;case ya:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ma:t.y=t.y-Math.floor(t.y);break;case Fi:t.y=t.y<0?0:1;break;case ya:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}$e.DEFAULT_IMAGE=null;$e.DEFAULT_MAPPING=Mh;$e.DEFAULT_ANISOTROPY=1;class Pe{constructor(t=0,e=0,n=0,s=1){Pe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s+r[12]*o,this.y=r[1]*e+r[5]*n+r[9]*s+r[13]*o,this.z=r[2]*e+r[6]*n+r[10]*s+r[14]*o,this.w=r[3]*e+r[7]*n+r[11]*s+r[15]*o,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,o;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,y=(f+1)/2,R=(p+1)/2,w=(h+d)/4,T=(u+_)/4,P=(g+m)/4;return x>y&&x>R?x<.01?(n=0,s=.707106781,o=.707106781):(n=Math.sqrt(x),s=w/n,o=T/n):y>R?y<.01?(n=.707106781,s=0,o=.707106781):(s=Math.sqrt(y),n=w/s,o=P/s):R<.01?(n=.707106781,s=.707106781,o=0):(o=Math.sqrt(R),n=T/o,s=P/o),this.set(n,s,o,e),this}let v=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(u-_)/v,this.z=(d-h)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Tu extends ks{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Pe(0,0,t,e),this.scissorTest=!1,this.viewport=new Pe(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:En,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const o=new $e(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let a=0;a<r;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Uh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wi extends Tu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Nh extends $e{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=tn,this.minFilter=tn,this.wrapR=Fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class wu extends $e{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=tn,this.minFilter=tn,this.wrapR=Fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xo{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,o,r,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=o[r+0],f=o[r+1],g=o[r+2],_=o[r+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let m=1-a;const p=l*d+c*f+h*g+u*_,v=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const R=Math.sqrt(x),w=Math.atan2(R,p*v);m=Math.sin(m*w)/R,a=Math.sin(a*w)/R}const y=a*v;if(l=l*m+d*y,c=c*m+f*y,h=h*m+g*y,u=u*m+_*y,m===1-a){const R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,o,r){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=o[r],d=o[r+1],f=o[r+2],g=o[r+3];return t[e]=a*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-a*f,t[e+2]=c*g+h*f+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,o=t._z,r=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(o/2),d=l(n/2),f=l(s/2),g=l(o/2);switch(r){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],o=e[8],r=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(o-c)*f,this._z=(r-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+r)/f,this._z=(o+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(o-c)/f,this._x=(s+r)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(r-s)/f,this._x=(o+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Je(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,o=t._z,r=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+r*a+s*c-o*l,this._y=s*h+r*l+o*a-n*c,this._z=o*h+r*c+n*l-s*a,this._w=r*h-n*a-s*l-o*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,o=this._z,r=this._w;let a=r*t._w+n*t._x+s*t._y+o*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=n,this._y=s,this._z=o,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*r+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*o+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=r*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=o*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(t=0,e=0,n=0){O.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ql.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ql.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*s,this.y=o[1]*e+o[4]*n+o[7]*s,this.z=o[2]*e+o[5]*n+o[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=t.elements,r=1/(o[3]*e+o[7]*n+o[11]*s+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*s+o[12])*r,this.y=(o[1]*e+o[5]*n+o[9]*s+o[13])*r,this.z=(o[2]*e+o[6]*n+o[10]*s+o[14])*r,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,o=t.x,r=t.y,a=t.z,l=t.w,c=2*(r*s-a*n),h=2*(a*e-o*s),u=2*(o*n-r*e);return this.x=e+l*c+r*u-a*h,this.y=n+l*h+a*c-o*u,this.z=s+l*u+o*h-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s,this.y=o[1]*e+o[5]*n+o[9]*s,this.z=o[2]*e+o[6]*n+o[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,o=t.z,r=e.x,a=e.y,l=e.z;return this.x=s*l-o*a,this.y=o*r-n*l,this.z=n*a-s*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return zr.copy(this).projectOnVector(t),this.sub(zr)}reflect(t){return this.sub(zr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Je(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zr=new O,Ql=new xo;class vo{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(yn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(yn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=yn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=o.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,yn):yn.fromBufferAttribute(o,r),yn.applyMatrix4(t.matrixWorld),this.expandByPoint(yn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),bo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),bo.copy(n.boundingBox)),bo.applyMatrix4(t.matrixWorld),this.union(bo)}const s=t.children;for(let o=0,r=s.length;o<r;o++)this.expandByObject(s[o],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,yn),yn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Vs),Eo.subVectors(this.max,Vs),Zi.subVectors(t.a,Vs),Ji.subVectors(t.b,Vs),Qi.subVectors(t.c,Vs),Qn.subVectors(Ji,Zi),ti.subVectors(Qi,Ji),bi.subVectors(Zi,Qi);let e=[0,-Qn.z,Qn.y,0,-ti.z,ti.y,0,-bi.z,bi.y,Qn.z,0,-Qn.x,ti.z,0,-ti.x,bi.z,0,-bi.x,-Qn.y,Qn.x,0,-ti.y,ti.x,0,-bi.y,bi.x,0];return!Hr(e,Zi,Ji,Qi,Eo)||(e=[1,0,0,0,1,0,0,0,1],!Hr(e,Zi,Ji,Qi,Eo))?!1:(To.crossVectors(Qn,ti),e=[To.x,To.y,To.z],Hr(e,Zi,Ji,Qi,Eo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,yn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(yn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Bn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Bn=[new O,new O,new O,new O,new O,new O,new O,new O],yn=new O,bo=new vo,Zi=new O,Ji=new O,Qi=new O,Qn=new O,ti=new O,bi=new O,Vs=new O,Eo=new O,To=new O,Ei=new O;function Hr(i,t,e,n,s){for(let o=0,r=i.length-3;o<=r;o+=3){Ei.fromArray(i,o);const a=s.x*Math.abs(Ei.x)+s.y*Math.abs(Ei.y)+s.z*Math.abs(Ei.z),l=t.dot(Ei),c=e.dot(Ei),h=n.dot(Ei);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Au=new vo,Ws=new O,Gr=new O;class Ar{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Au.setFromPoints(t).getCenter(n);let s=0;for(let o=0,r=t.length;o<r;o++)s=Math.max(s,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ws.subVectors(t,this.center);const e=Ws.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ws,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Gr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ws.copy(t.center).add(Gr)),this.expandByPoint(Ws.copy(t.center).sub(Gr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const zn=new O,Vr=new O,wo=new O,ei=new O,Wr=new O,Ao=new O,Xr=new O;class Fh{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,zn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(zn.copy(this.origin).addScaledVector(this.direction,e),zn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Vr.copy(t).add(e).multiplyScalar(.5),wo.copy(e).sub(t).normalize(),ei.copy(this.origin).sub(Vr);const o=t.distanceTo(e)*.5,r=-this.direction.dot(wo),a=ei.dot(this.direction),l=-ei.dot(wo),c=ei.lengthSq(),h=Math.abs(1-r*r);let u,d,f,g;if(h>0)if(u=r*l-a,d=r*a-l,g=o*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+r*d+2*a)+d*(r*u+d+2*l)+c}else d=o,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*l)+c;else d=-o,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-r*o+a)),d=u>0?-o:Math.min(Math.max(-o,-l),o),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-o,-l),o),f=d*(d+2*l)+c):(u=Math.max(0,-(r*o+a)),d=u>0?o:Math.min(Math.max(-o,-l),o),f=-u*u+d*(d+2*l)+c);else d=r>0?-o:o,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Vr).addScaledVector(wo,d),f}intersectSphere(t,e){zn.subVectors(t.center,this.origin);const n=zn.dot(this.direction),s=zn.dot(zn)-n*n,o=t.radius*t.radius;if(s>o)return null;const r=Math.sqrt(o-s),a=n-r,l=n+r;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,o,r,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(o=(t.min.y-d.y)*h,r=(t.max.y-d.y)*h):(o=(t.max.y-d.y)*h,r=(t.min.y-d.y)*h),n>r||o>s||((o>n||isNaN(n))&&(n=o),(r<s||isNaN(s))&&(s=r),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,zn)!==null}intersectTriangle(t,e,n,s,o){Wr.subVectors(e,t),Ao.subVectors(n,t),Xr.crossVectors(Wr,Ao);let r=this.direction.dot(Xr),a;if(r>0){if(s)return null;a=1}else if(r<0)a=-1,r=-r;else return null;ei.subVectors(this.origin,t);const l=a*this.direction.dot(Ao.crossVectors(ei,Ao));if(l<0)return null;const c=a*this.direction.dot(Wr.cross(ei));if(c<0||l+c>r)return null;const h=-a*ei.dot(Xr);return h<0?null:this.at(h/r,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class be{constructor(t,e,n,s,o,r,a,l,c,h,u,d,f,g,_,m){be.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,r,a,l,c,h,u,d,f,g,_,m)}set(t,e,n,s,o,r,a,l,c,h,u,d,f,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=o,p[5]=r,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new be().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/ts.setFromMatrixColumn(t,0).length(),o=1/ts.setFromMatrixColumn(t,1).length(),r=1/ts.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,o=t.z,r=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(o),u=Math.sin(o);if(t.order==="XYZ"){const d=r*h,f=r*u,g=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-_*c,e[9]=-a*l,e[2]=_-d*c,e[6]=g+f*c,e[10]=r*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;e[0]=d+_*a,e[4]=g*a-f,e[8]=r*c,e[1]=r*u,e[5]=r*h,e[9]=-a,e[2]=f*a-g,e[6]=_+d*a,e[10]=r*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;e[0]=d-_*a,e[4]=-r*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=r*h,e[9]=_-d*a,e[2]=-r*c,e[6]=a,e[10]=r*l}else if(t.order==="ZYX"){const d=r*h,f=r*u,g=a*h,_=a*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+_,e[1]=l*u,e[5]=_*c+d,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=r*l}else if(t.order==="YZX"){const d=r*l,f=r*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-d*u,e[8]=g*u+f,e[1]=u,e[5]=r*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-_*u}else if(t.order==="XZY"){const d=r*l,f=r*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+_,e[5]=r*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ru,t,Cu)}lookAt(t,e,n){const s=this.elements;return rn.subVectors(t,e),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),ni.crossVectors(n,rn),ni.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),ni.crossVectors(n,rn)),ni.normalize(),Ro.crossVectors(rn,ni),s[0]=ni.x,s[4]=Ro.x,s[8]=rn.x,s[1]=ni.y,s[5]=Ro.y,s[9]=rn.y,s[2]=ni.z,s[6]=Ro.z,s[10]=rn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,r=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],v=n[3],x=n[7],y=n[11],R=n[15],w=s[0],T=s[4],P=s[8],b=s[12],M=s[1],L=s[5],D=s[9],U=s[13],z=s[2],G=s[6],X=s[10],Y=s[14],W=s[3],rt=s[7],ht=s[11],mt=s[15];return o[0]=r*w+a*M+l*z+c*W,o[4]=r*T+a*L+l*G+c*rt,o[8]=r*P+a*D+l*X+c*ht,o[12]=r*b+a*U+l*Y+c*mt,o[1]=h*w+u*M+d*z+f*W,o[5]=h*T+u*L+d*G+f*rt,o[9]=h*P+u*D+d*X+f*ht,o[13]=h*b+u*U+d*Y+f*mt,o[2]=g*w+_*M+m*z+p*W,o[6]=g*T+_*L+m*G+p*rt,o[10]=g*P+_*D+m*X+p*ht,o[14]=g*b+_*U+m*Y+p*mt,o[3]=v*w+x*M+y*z+R*W,o[7]=v*T+x*L+y*G+R*rt,o[11]=v*P+x*D+y*X+R*ht,o[15]=v*b+x*U+y*Y+R*mt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],o=t[12],r=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+o*l*u-s*c*u-o*a*d+n*c*d+s*a*f-n*l*f)+_*(+e*l*f-e*c*d+o*r*d-s*r*f+s*c*h-o*l*h)+m*(+e*c*u-e*a*f-o*r*u+n*r*f+o*a*h-n*c*h)+p*(-s*a*h-e*l*u+e*a*d+s*r*u-n*r*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],v=u*m*c-_*d*c+_*l*f-a*m*f-u*l*p+a*d*p,x=g*d*c-h*m*c-g*l*f+r*m*f+h*l*p-r*d*p,y=h*_*c-g*u*c+g*a*f-r*_*f-h*a*p+r*u*p,R=g*u*l-h*_*l-g*a*d+r*_*d+h*a*m-r*u*m,w=e*v+n*x+s*y+o*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/w;return t[0]=v*T,t[1]=(_*d*o-u*m*o-_*s*f+n*m*f+u*s*p-n*d*p)*T,t[2]=(a*m*o-_*l*o+_*s*c-n*m*c-a*s*p+n*l*p)*T,t[3]=(u*l*o-a*d*o-u*s*c+n*d*c+a*s*f-n*l*f)*T,t[4]=x*T,t[5]=(h*m*o-g*d*o+g*s*f-e*m*f-h*s*p+e*d*p)*T,t[6]=(g*l*o-r*m*o-g*s*c+e*m*c+r*s*p-e*l*p)*T,t[7]=(r*d*o-h*l*o+h*s*c-e*d*c-r*s*f+e*l*f)*T,t[8]=y*T,t[9]=(g*u*o-h*_*o-g*n*f+e*_*f+h*n*p-e*u*p)*T,t[10]=(r*_*o-g*a*o+g*n*c-e*_*c-r*n*p+e*a*p)*T,t[11]=(h*a*o-r*u*o-h*n*c+e*u*c+r*n*f-e*a*f)*T,t[12]=R*T,t[13]=(h*_*s-g*u*s+g*n*d-e*_*d-h*n*m+e*u*m)*T,t[14]=(g*a*s-r*_*s-g*n*l+e*_*l+r*n*m-e*a*m)*T,t[15]=(r*u*s-h*a*s+h*n*l-e*u*l-r*n*d+e*a*d)*T,this}scale(t){const e=this.elements,n=t.x,s=t.y,o=t.z;return e[0]*=n,e[4]*=s,e[8]*=o,e[1]*=n,e[5]*=s,e[9]*=o,e[2]*=n,e[6]*=s,e[10]*=o,e[3]*=n,e[7]*=s,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),o=1-n,r=t.x,a=t.y,l=t.z,c=o*r,h=o*a;return this.set(c*r+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*r,0,c*l-s*a,h*l+s*r,o*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,o,r){return this.set(1,n,o,0,t,1,r,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,o=e._x,r=e._y,a=e._z,l=e._w,c=o+o,h=r+r,u=a+a,d=o*c,f=o*h,g=o*u,_=r*h,m=r*u,p=a*u,v=l*c,x=l*h,y=l*u,R=n.x,w=n.y,T=n.z;return s[0]=(1-(_+p))*R,s[1]=(f+y)*R,s[2]=(g-x)*R,s[3]=0,s[4]=(f-y)*w,s[5]=(1-(d+p))*w,s[6]=(m+v)*w,s[7]=0,s[8]=(g+x)*T,s[9]=(m-v)*T,s[10]=(1-(d+_))*T,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let o=ts.set(s[0],s[1],s[2]).length();const r=ts.set(s[4],s[5],s[6]).length(),a=ts.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),t.x=s[12],t.y=s[13],t.z=s[14],Sn.copy(this);const c=1/o,h=1/r,u=1/a;return Sn.elements[0]*=c,Sn.elements[1]*=c,Sn.elements[2]*=c,Sn.elements[4]*=h,Sn.elements[5]*=h,Sn.elements[6]*=h,Sn.elements[8]*=u,Sn.elements[9]*=u,Sn.elements[10]*=u,e.setFromRotationMatrix(Sn),n.x=o,n.y=r,n.z=a,this}makePerspective(t,e,n,s,o,r,a=Kn){const l=this.elements,c=2*o/(e-t),h=2*o/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s);let f,g;if(a===Kn)f=-(r+o)/(r-o),g=-2*r*o/(r-o);else if(a===pr)f=-r/(r-o),g=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,o,r,a=Kn){const l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(r-o),d=(e+t)*c,f=(n+s)*h;let g,_;if(a===Kn)g=(r+o)*u,_=-2*u;else if(a===pr)g=o*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ts=new O,Sn=new be,Ru=new O(0,0,0),Cu=new O(1,1,1),ni=new O,Ro=new O,rn=new O,tc=new be,ec=new xo;class xn{constructor(t=0,e=0,n=0,s=xn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,o=s[0],r=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,o),this._z=0);break;case"ZXY":this._x=Math.asin(Je(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-Je(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,o)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Je(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return tc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(tc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ec.setFromEuler(this),this.setFromQuaternion(ec,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xn.DEFAULT_ORDER="XYZ";class Oh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Pu=0;const nc=new O,es=new xo,Hn=new be,Co=new O,Xs=new O,Lu=new O,Iu=new xo,ic=new O(1,0,0),sc=new O(0,1,0),oc=new O(0,0,1),rc={type:"added"},Du={type:"removed"},ns={type:"childadded",child:null},qr={type:"childremoved",child:null};class He extends ks{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Pu++}),this.uuid=_o(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=He.DEFAULT_UP.clone();const t=new O,e=new xn,n=new xo,s=new O(1,1,1);function o(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new be},normalMatrix:{value:new Gt}}),this.matrix=new be,this.matrixWorld=new be,this.matrixAutoUpdate=He.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=He.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Oh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return es.setFromAxisAngle(t,e),this.quaternion.multiply(es),this}rotateOnWorldAxis(t,e){return es.setFromAxisAngle(t,e),this.quaternion.premultiply(es),this}rotateX(t){return this.rotateOnAxis(ic,t)}rotateY(t){return this.rotateOnAxis(sc,t)}rotateZ(t){return this.rotateOnAxis(oc,t)}translateOnAxis(t,e){return nc.copy(t).applyQuaternion(this.quaternion),this.position.add(nc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ic,t)}translateY(t){return this.translateOnAxis(sc,t)}translateZ(t){return this.translateOnAxis(oc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Hn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Co.copy(t):Co.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Xs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hn.lookAt(Xs,Co,this.up):Hn.lookAt(Co,Xs,this.up),this.quaternion.setFromRotationMatrix(Hn),s&&(Hn.extractRotation(s.matrixWorld),es.setFromRotationMatrix(Hn),this.quaternion.premultiply(es.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(rc),ns.child=t,this.dispatchEvent(ns),ns.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Du),qr.child=t,this.dispatchEvent(qr),qr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Hn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Hn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Hn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(rc),ns.child=t,this.dispatchEvent(ns),ns.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xs,t,Lu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xs,Iu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];o(t.shapes,u)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(o(t.materials,this.material[l]));s.material=a}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(o(t.animations,l))}}if(e){const a=r(t.geometries),l=r(t.materials),c=r(t.textures),h=r(t.images),u=r(t.shapes),d=r(t.skeletons),f=r(t.animations),g=r(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function r(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}He.DEFAULT_UP=new O(0,1,0);He.DEFAULT_MATRIX_AUTO_UPDATE=!0;He.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const bn=new O,Gn=new O,Yr=new O,Vn=new O,is=new O,ss=new O,ac=new O,$r=new O,Kr=new O,jr=new O;class Tn{constructor(t=new O,e=new O,n=new O){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),bn.subVectors(t,e),s.cross(bn);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(t,e,n,s,o){bn.subVectors(s,e),Gn.subVectors(n,e),Yr.subVectors(t,e);const r=bn.dot(bn),a=bn.dot(Gn),l=bn.dot(Yr),c=Gn.dot(Gn),h=Gn.dot(Yr),u=r*c-a*a;if(u===0)return o.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(r*h-a*l)*d;return o.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Vn)===null?!1:Vn.x>=0&&Vn.y>=0&&Vn.x+Vn.y<=1}static getInterpolation(t,e,n,s,o,r,a,l){return this.getBarycoord(t,e,n,s,Vn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,Vn.x),l.addScaledVector(r,Vn.y),l.addScaledVector(a,Vn.z),l)}static isFrontFacing(t,e,n,s){return bn.subVectors(n,e),Gn.subVectors(t,e),bn.cross(Gn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return bn.subVectors(this.c,this.b),Gn.subVectors(this.a,this.b),bn.cross(Gn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Tn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Tn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,o){return Tn.getInterpolation(t,this.a,this.b,this.c,e,n,s,o)}containsPoint(t){return Tn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Tn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,o=this.c;let r,a;is.subVectors(s,n),ss.subVectors(o,n),$r.subVectors(t,n);const l=is.dot($r),c=ss.dot($r);if(l<=0&&c<=0)return e.copy(n);Kr.subVectors(t,s);const h=is.dot(Kr),u=ss.dot(Kr);if(h>=0&&u<=h)return e.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return r=l/(l-h),e.copy(n).addScaledVector(is,r);jr.subVectors(t,o);const f=is.dot(jr),g=ss.dot(jr);if(g>=0&&f<=g)return e.copy(o);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(ss,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return ac.subVectors(o,s),a=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(ac,a);const p=1/(m+_+d);return r=_*p,a=d*p,e.copy(n).addScaledVector(is,r).addScaledVector(ss,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const kh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ii={h:0,s:0,l:0},Po={h:0,s:0,l:0};function Zr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Ct{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ln){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=re.workingColorSpace){return this.r=t,this.g=e,this.b=n,re.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=re.workingColorSpace){if(t=xu(t,1),e=Je(e,0,1),n=Je(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,r=2*n-o;this.r=Zr(r,o,t+1/3),this.g=Zr(r,o,t),this.b=Zr(r,o,t-1/3)}return re.toWorkingColorSpace(this,s),this}setStyle(t,e=Ln){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const r=s[1],a=s[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=s[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ln){const n=kh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ss(t.r),this.g=Ss(t.g),this.b=Ss(t.b),this}copyLinearToSRGB(t){return this.r=kr(t.r),this.g=kr(t.g),this.b=kr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ln){return re.fromWorkingColorSpace(Ve.copy(this),t),Math.round(Je(Ve.r*255,0,255))*65536+Math.round(Je(Ve.g*255,0,255))*256+Math.round(Je(Ve.b*255,0,255))}getHexString(t=Ln){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=re.workingColorSpace){re.fromWorkingColorSpace(Ve.copy(this),e);const n=Ve.r,s=Ve.g,o=Ve.b,r=Math.max(n,s,o),a=Math.min(n,s,o);let l,c;const h=(a+r)/2;if(a===r)l=0,c=0;else{const u=r-a;switch(c=h<=.5?u/(r+a):u/(2-r-a),r){case n:l=(s-o)/u+(s<o?6:0);break;case s:l=(o-n)/u+2;break;case o:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=re.workingColorSpace){return re.fromWorkingColorSpace(Ve.copy(this),e),t.r=Ve.r,t.g=Ve.g,t.b=Ve.b,t}getStyle(t=Ln){re.fromWorkingColorSpace(Ve.copy(this),t);const e=Ve.r,n=Ve.g,s=Ve.b;return t!==Ln?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ii),this.setHSL(ii.h+t,ii.s+e,ii.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ii),t.getHSL(Po);const n=Fr(ii.h,Po.h,e),s=Fr(ii.s,Po.s,e),o=Fr(ii.l,Po.l,e);return this.setHSL(n,s,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*s,this.g=o[1]*e+o[4]*n+o[7]*s,this.b=o[2]*e+o[5]*n+o[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ve=new Ct;Ct.NAMES=kh;let Uu=0;class Bs extends ks{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=_o(),this.name="",this.type="Material",this.blending=Ms,this.side=xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ga,this.blendDst=_a,this.blendEquation=Di,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ct(0,0,0),this.blendAlpha=0,this.depthFunc=hr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Yl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ki,this.stencilZFail=Ki,this.stencilZPass=Ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ms&&(n.blending=this.blending),this.side!==xi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ga&&(n.blendSrc=this.blendSrc),this.blendDst!==_a&&(n.blendDst=this.blendDst),this.blendEquation!==Di&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==hr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Yl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ki&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ki&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ki&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(o){const r=[];for(const a in o){const l=o[a];delete l.metadata,r.push(l)}return r}if(e){const o=s(t.textures),r=s(t.images);o.length>0&&(n.textures=o),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let o=0;o!==s;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}onBeforeRender(){console.warn("Material: onBeforeRender() has been removed.")}}class vl extends Bs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=dl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Re=new O,Lo=new Kt;class Nn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=$l,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=$n,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return io("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Lo.fromBufferAttribute(this,e),Lo.applyMatrix3(t),this.setXY(e,Lo.x,Lo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix3(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix4(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyNormalMatrix(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.transformDirection(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Hs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ke(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Hs(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Hs(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Hs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Hs(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ke(e,this.array),n=Ke(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ke(e,this.array),n=Ke(n,this.array),s=Ke(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,o){return t*=this.itemSize,this.normalized&&(e=Ke(e,this.array),n=Ke(n,this.array),s=Ke(s,this.array),o=Ke(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==$l&&(t.usage=this.usage),t}}class Bh extends Nn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class zh extends Nn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ce extends Nn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Nu=0;const mn=new be,Jr=new He,os=new O,an=new vo,qs=new vo,De=new O;class vn extends ks{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=_o(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Dh(t)?zh:Bh)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new Gt().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return mn.makeRotationFromQuaternion(t),this.applyMatrix4(mn),this}rotateX(t){return mn.makeRotationX(t),this.applyMatrix4(mn),this}rotateY(t){return mn.makeRotationY(t),this.applyMatrix4(mn),this}rotateZ(t){return mn.makeRotationZ(t),this.applyMatrix4(mn),this}translate(t,e,n){return mn.makeTranslation(t,e,n),this.applyMatrix4(mn),this}scale(t,e,n){return mn.makeScale(t,e,n),this.applyMatrix4(mn),this}lookAt(t){return Jr.lookAt(t),Jr.updateMatrix(),this.applyMatrix4(Jr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(os).negate(),this.translate(os.x,os.y,os.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const o=t[n];e.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new Ce(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const o=e[n];an.setFromBufferAttribute(o),this.morphTargetsRelative?(De.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(De),De.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(De)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ar);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){const n=this.boundingSphere.center;if(an.setFromBufferAttribute(t),e)for(let o=0,r=e.length;o<r;o++){const a=e[o];qs.setFromBufferAttribute(a),this.morphTargetsRelative?(De.addVectors(an.min,qs.min),an.expandByPoint(De),De.addVectors(an.max,qs.max),an.expandByPoint(De)):(an.expandByPoint(qs.min),an.expandByPoint(qs.max))}an.getCenter(n);let s=0;for(let o=0,r=t.count;o<r;o++)De.fromBufferAttribute(t,o),s=Math.max(s,n.distanceToSquared(De));if(e)for(let o=0,r=e.length;o<r;o++){const a=e[o],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)De.fromBufferAttribute(a,c),l&&(os.fromBufferAttribute(t,c),De.add(os)),s=Math.max(s,n.distanceToSquared(De))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Nn(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new O,l[P]=new O;const c=new O,h=new O,u=new O,d=new Kt,f=new Kt,g=new Kt,_=new O,m=new O;function p(P,b,M){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),d.fromBufferAttribute(o,P),f.fromBufferAttribute(o,b),g.fromBufferAttribute(o,M),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const L=1/(f.x*g.y-g.x*f.y);isFinite(L)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(L),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(L),a[P].add(_),a[b].add(_),a[M].add(_),l[P].add(m),l[b].add(m),l[M].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let P=0,b=v.length;P<b;++P){const M=v[P],L=M.start,D=M.count;for(let U=L,z=L+D;U<z;U+=3)p(t.getX(U+0),t.getX(U+1),t.getX(U+2))}const x=new O,y=new O,R=new O,w=new O;function T(P){R.fromBufferAttribute(s,P),w.copy(R);const b=a[P];x.copy(b),x.sub(R.multiplyScalar(R.dot(b))).normalize(),y.crossVectors(w,b);const L=y.dot(l[P])<0?-1:1;r.setXYZW(P,x.x,x.y,x.z,L)}for(let P=0,b=v.length;P<b;++P){const M=v[P],L=M.start,D=M.count;for(let U=L,z=L+D;U<z;U+=3)T(t.getX(U+0)),T(t.getX(U+1)),T(t.getX(U+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Nn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new O,o=new O,r=new O,a=new O,l=new O,c=new O,h=new O,u=new O;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),o.fromBufferAttribute(e,_),r.fromBufferAttribute(e,m),h.subVectors(r,o),u.subVectors(s,o),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),o.fromBufferAttribute(e,d+1),r.fromBufferAttribute(e,d+2),h.subVectors(r,o),u.subVectors(s,o),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)De.fromBufferAttribute(t,e),De.normalize(),t.setXYZ(e,De.x,De.y,De.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new Nn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new vn,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const o=this.morphAttributes;for(const a in o){const l=[],c=o[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,l=r.length;a<l;a++){const c=r[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let o=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,o=!0)}o&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const o=t.morphAttributes;for(const c in o){const h=[],u=o[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let c=0,h=r.length;c<h;c++){const u=r[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const lc=new be,Ti=new Fh,Io=new Ar,cc=new O,rs=new O,as=new O,ls=new O,Qr=new O,Do=new O,Uo=new Kt,No=new Kt,Fo=new Kt,hc=new O,dc=new O,uc=new O,Oo=new O,ko=new O;class Jt extends He{constructor(t=new vn,e=new vl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,o=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(o&&a){Do.set(0,0,0);for(let l=0,c=o.length;l<c;l++){const h=a[l],u=o[l];h!==0&&(Qr.fromBufferAttribute(u,t),r?Do.addScaledVector(Qr,h):Do.addScaledVector(Qr.sub(e),h))}e.add(Do)}return e}raycast(t,e){const n=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Io.copy(n.boundingSphere),Io.applyMatrix4(o),Ti.copy(t.ray).recast(t.near),!(Io.containsPoint(Ti.origin)===!1&&(Ti.intersectSphere(Io,cc)===null||Ti.origin.distanceToSquared(cc)>(t.far-t.near)**2))&&(lc.copy(o).invert(),Ti.copy(t.ray).applyMatrix4(lc),!(n.boundingBox!==null&&Ti.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ti)))}_computeIntersections(t,e,n){let s;const o=this.geometry,r=this.material,a=o.index,l=o.attributes.position,c=o.attributes.uv,h=o.attributes.uv1,u=o.attributes.normal,d=o.groups,f=o.drawRange;if(a!==null)if(Array.isArray(r))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=r[m.materialIndex],v=Math.max(m.start,f.start),x=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let y=v,R=x;y<R;y+=3){const w=a.getX(y),T=a.getX(y+1),P=a.getX(y+2);s=Bo(this,p,t,n,c,h,u,w,T,P),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const v=a.getX(m),x=a.getX(m+1),y=a.getX(m+2);s=Bo(this,r,t,n,c,h,u,v,x,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=r[m.materialIndex],v=Math.max(m.start,f.start),x=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let y=v,R=x;y<R;y+=3){const w=y,T=y+1,P=y+2;s=Bo(this,p,t,n,c,h,u,w,T,P),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const v=m,x=m+1,y=m+2;s=Bo(this,r,t,n,c,h,u,v,x,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Fu(i,t,e,n,s,o,r,a){let l;if(t.side===en?l=n.intersectTriangle(r,o,s,!0,a):l=n.intersectTriangle(s,o,r,t.side===xi,a),l===null)return null;ko.copy(a),ko.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(ko);return c<e.near||c>e.far?null:{distance:c,point:ko.clone(),object:i}}function Bo(i,t,e,n,s,o,r,a,l,c){i.getVertexPosition(a,rs),i.getVertexPosition(l,as),i.getVertexPosition(c,ls);const h=Fu(i,t,e,n,rs,as,ls,Oo);if(h){s&&(Uo.fromBufferAttribute(s,a),No.fromBufferAttribute(s,l),Fo.fromBufferAttribute(s,c),h.uv=Tn.getInterpolation(Oo,rs,as,ls,Uo,No,Fo,new Kt)),o&&(Uo.fromBufferAttribute(o,a),No.fromBufferAttribute(o,l),Fo.fromBufferAttribute(o,c),h.uv1=Tn.getInterpolation(Oo,rs,as,ls,Uo,No,Fo,new Kt)),r&&(hc.fromBufferAttribute(r,a),dc.fromBufferAttribute(r,l),uc.fromBufferAttribute(r,c),h.normal=Tn.getInterpolation(Oo,rs,as,ls,hc,dc,uc,new O),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new O,materialIndex:0};Tn.getNormal(rs,as,ls,u.normal),h.face=u}return h}class fe extends vn{constructor(t=1,e=1,n=1,s=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:o,depthSegments:r};const a=this;s=Math.floor(s),o=Math.floor(o),r=Math.floor(r);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,r,o,0),g("z","y","x",1,-1,n,e,-t,r,o,1),g("x","z","y",1,1,t,n,e,s,r,2),g("x","z","y",1,-1,t,n,-e,s,r,3),g("x","y","z",1,-1,t,e,n,s,o,4),g("x","y","z",-1,-1,t,e,-n,s,o,5),this.setIndex(l),this.setAttribute("position",new Ce(c,3)),this.setAttribute("normal",new Ce(h,3)),this.setAttribute("uv",new Ce(u,2));function g(_,m,p,v,x,y,R,w,T,P,b){const M=y/T,L=R/P,D=y/2,U=R/2,z=w/2,G=T+1,X=P+1;let Y=0,W=0;const rt=new O;for(let ht=0;ht<X;ht++){const mt=ht*L-U;for(let Wt=0;Wt<G;Wt++){const jt=Wt*M-D;rt[_]=jt*v,rt[m]=mt*x,rt[p]=z,c.push(rt.x,rt.y,rt.z),rt[_]=0,rt[m]=0,rt[p]=w>0?1:-1,h.push(rt.x,rt.y,rt.z),u.push(Wt/T),u.push(1-ht/P),Y+=1}}for(let ht=0;ht<P;ht++)for(let mt=0;mt<T;mt++){const Wt=d+mt+G*ht,jt=d+mt+G*(ht+1),q=d+(mt+1)+G*(ht+1),J=d+(mt+1)+G*ht;l.push(Wt,jt,J),l.push(jt,q,J),W+=6}a.addGroup(f,W,b),f+=W,d+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Is(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function qe(i){const t={};for(let e=0;e<i.length;e++){const n=Is(i[e]);for(const s in n)t[s]=n[s]}return t}function Ou(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Hh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:re.workingColorSpace}const ku={clone:Is,merge:qe};var Bu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vi extends Bs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bu,this.fragmentShader=zu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Is(t.uniforms),this.uniformsGroups=Ou(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?e.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[s]={type:"m4",value:r.toArray()}:e.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Gh extends He{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new be,this.projectionMatrix=new be,this.projectionMatrixInverse=new be,this.coordinateSystem=Kn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const si=new O,fc=new Kt,pc=new Kt;class dn extends Gh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=$a*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(or*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return $a*2*Math.atan(Math.tan(or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(si.x,si.y).multiplyScalar(-t/si.z),si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(si.x,si.y).multiplyScalar(-t/si.z)}getViewSize(t,e){return this.getViewBounds(t,fc,pc),e.subVectors(pc,fc)}setViewOffset(t,e,n,s,o,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(or*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,o=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;o+=r.offsetX*s/l,e-=r.offsetY*n/c,s*=r.width/l,n*=r.height/c}const a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const cs=-90,hs=1;class Hu extends He{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new dn(cs,hs,t,e);s.layers=this.layers,this.add(s);const o=new dn(cs,hs,t,e);o.layers=this.layers,this.add(o);const r=new dn(cs,hs,t,e);r.layers=this.layers,this.add(r);const a=new dn(cs,hs,t,e);a.layers=this.layers,this.add(a);const l=new dn(cs,hs,t,e);l.layers=this.layers,this.add(l);const c=new dn(cs,hs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,o,r,a,l]=e;for(const c of e)this.remove(c);if(t===Kn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===pr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,r,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,o),t.setRenderTarget(n,1,s),t.render(e,r),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Vh extends $e{constructor(t,e,n,s,o,r,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Rs,super(t,e,n,s,o,r,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Gu extends Wi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Vh(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:En}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new fe(5,5,5),o=new vi({name:"CubemapFromEquirect",uniforms:Is(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:en,blending:gi});o.uniforms.tEquirect.value=e;const r=new Jt(s,o),a=e.minFilter;return e.minFilter===Oi&&(e.minFilter=En),new Hu(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,n,s){const o=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,s);t.setRenderTarget(o)}}const ta=new O,Vu=new O,Wu=new Gt;class Ci{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ta.subVectors(n,e).cross(Vu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ta),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Wu.getNormalMatrix(t),s=this.coplanarPoint(ta).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const wi=new Ar,zo=new O;class Ml{constructor(t=new Ci,e=new Ci,n=new Ci,s=new Ci,o=new Ci,r=new Ci){this.planes=[t,e,n,s,o,r]}set(t,e,n,s,o,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(o),a[5].copy(r),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Kn){const n=this.planes,s=t.elements,o=s[0],r=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],v=s[13],x=s[14],y=s[15];if(n[0].setComponents(l-o,d-c,m-f,y-p).normalize(),n[1].setComponents(l+o,d+c,m+f,y+p).normalize(),n[2].setComponents(l+r,d+h,m+g,y+v).normalize(),n[3].setComponents(l-r,d-h,m-g,y-v).normalize(),n[4].setComponents(l-a,d-u,m-_,y-x).normalize(),e===Kn)n[5].setComponents(l+a,d+u,m+_,y+x).normalize();else if(e===pr)n[5].setComponents(a,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),wi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),wi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(wi)}intersectsSprite(t){return wi.center.set(0,0,0),wi.radius=.7071067811865476,wi.applyMatrix4(t.matrixWorld),this.intersectsSphere(wi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(zo.x=s.normal.x>0?t.max.x:t.min.x,zo.y=s.normal.y>0?t.max.y:t.min.y,zo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(zo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Wh(){let i=null,t=!1,e=null,n=null;function s(o,r){e(o,r),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){i=o}}}function Xu(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l._updateRange,d=l.updateRanges;if(i.bindBuffer(c,a),u.count===-1&&d.length===0&&i.bufferSubData(c,0,h),d.length!==0){for(let f=0,g=d.length;f<g;f++){const _=d[f];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}u.count!==-1&&(i.bufferSubData(c,u.offset*h.BYTES_PER_ELEMENT,h,u.offset,u.count),u.count=-1),l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function r(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:o,update:r}}class Rr extends vn{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const o=t/2,r=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const v=p*d-r;for(let x=0;x<c;x++){const y=x*u-o;g.push(y,-v,0),_.push(0,0,1),m.push(x/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<a;v++){const x=v+c*p,y=v+c*(p+1),R=v+1+c*(p+1),w=v+1+c*p;f.push(x,y,w),f.push(y,R,w)}this.setIndex(f),this.setAttribute("position",new Ce(g,3)),this.setAttribute("normal",new Ce(_,3)),this.setAttribute("uv",new Ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rr(t.width,t.height,t.widthSegments,t.heightSegments)}}var qu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,$u=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ku=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ju=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Zu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ju=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Qu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ef=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,nf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,of=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,rf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,af=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,lf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,cf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,df=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,uf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ff=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,pf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,mf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,gf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,_f=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,xf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,vf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ef=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Tf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,wf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Af=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Rf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Pf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Lf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,If=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Df=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Uf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Nf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ff=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Of=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Bf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,zf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Hf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Wf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Xf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,qf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Yf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,$f=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Kf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Qf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ep=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,np=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ip=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,op=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,rp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ap=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,cp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,dp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,up=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,mp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,gp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_p=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Sp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ep=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,wp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ap=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Cp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Pp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Lp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ip=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Up=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Np=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Fp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Op=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Bp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,zp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Hp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Gp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Xp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const qp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Yp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Qp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,tm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,em=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,im=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,om=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,rm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,am=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,dm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,um=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,fm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,pm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,_m=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ym=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Sm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Em=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Tm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ht={alphahash_fragment:qu,alphahash_pars_fragment:Yu,alphamap_fragment:$u,alphamap_pars_fragment:Ku,alphatest_fragment:ju,alphatest_pars_fragment:Zu,aomap_fragment:Ju,aomap_pars_fragment:Qu,batching_pars_vertex:tf,batching_vertex:ef,begin_vertex:nf,beginnormal_vertex:sf,bsdfs:of,iridescence_fragment:rf,bumpmap_pars_fragment:af,clipping_planes_fragment:lf,clipping_planes_pars_fragment:cf,clipping_planes_pars_vertex:hf,clipping_planes_vertex:df,color_fragment:uf,color_pars_fragment:ff,color_pars_vertex:pf,color_vertex:mf,common:gf,cube_uv_reflection_fragment:_f,defaultnormal_vertex:xf,displacementmap_pars_vertex:vf,displacementmap_vertex:Mf,emissivemap_fragment:yf,emissivemap_pars_fragment:Sf,colorspace_fragment:bf,colorspace_pars_fragment:Ef,envmap_fragment:Tf,envmap_common_pars_fragment:wf,envmap_pars_fragment:Af,envmap_pars_vertex:Rf,envmap_physical_pars_fragment:Bf,envmap_vertex:Cf,fog_vertex:Pf,fog_pars_vertex:Lf,fog_fragment:If,fog_pars_fragment:Df,gradientmap_pars_fragment:Uf,lightmap_pars_fragment:Nf,lights_lambert_fragment:Ff,lights_lambert_pars_fragment:Of,lights_pars_begin:kf,lights_toon_fragment:zf,lights_toon_pars_fragment:Hf,lights_phong_fragment:Gf,lights_phong_pars_fragment:Vf,lights_physical_fragment:Wf,lights_physical_pars_fragment:Xf,lights_fragment_begin:qf,lights_fragment_maps:Yf,lights_fragment_end:$f,logdepthbuf_fragment:Kf,logdepthbuf_pars_fragment:jf,logdepthbuf_pars_vertex:Zf,logdepthbuf_vertex:Jf,map_fragment:Qf,map_pars_fragment:tp,map_particle_fragment:ep,map_particle_pars_fragment:np,metalnessmap_fragment:ip,metalnessmap_pars_fragment:sp,morphinstance_vertex:op,morphcolor_vertex:rp,morphnormal_vertex:ap,morphtarget_pars_vertex:lp,morphtarget_vertex:cp,normal_fragment_begin:hp,normal_fragment_maps:dp,normal_pars_fragment:up,normal_pars_vertex:fp,normal_vertex:pp,normalmap_pars_fragment:mp,clearcoat_normal_fragment_begin:gp,clearcoat_normal_fragment_maps:_p,clearcoat_pars_fragment:xp,iridescence_pars_fragment:vp,opaque_fragment:Mp,packing:yp,premultiplied_alpha_fragment:Sp,project_vertex:bp,dithering_fragment:Ep,dithering_pars_fragment:Tp,roughnessmap_fragment:wp,roughnessmap_pars_fragment:Ap,shadowmap_pars_fragment:Rp,shadowmap_pars_vertex:Cp,shadowmap_vertex:Pp,shadowmask_pars_fragment:Lp,skinbase_vertex:Ip,skinning_pars_vertex:Dp,skinning_vertex:Up,skinnormal_vertex:Np,specularmap_fragment:Fp,specularmap_pars_fragment:Op,tonemapping_fragment:kp,tonemapping_pars_fragment:Bp,transmission_fragment:zp,transmission_pars_fragment:Hp,uv_pars_fragment:Gp,uv_pars_vertex:Vp,uv_vertex:Wp,worldpos_vertex:Xp,background_vert:qp,background_frag:Yp,backgroundCube_vert:$p,backgroundCube_frag:Kp,cube_vert:jp,cube_frag:Zp,depth_vert:Jp,depth_frag:Qp,distanceRGBA_vert:tm,distanceRGBA_frag:em,equirect_vert:nm,equirect_frag:im,linedashed_vert:sm,linedashed_frag:om,meshbasic_vert:rm,meshbasic_frag:am,meshlambert_vert:lm,meshlambert_frag:cm,meshmatcap_vert:hm,meshmatcap_frag:dm,meshnormal_vert:um,meshnormal_frag:fm,meshphong_vert:pm,meshphong_frag:mm,meshphysical_vert:gm,meshphysical_frag:_m,meshtoon_vert:xm,meshtoon_frag:vm,points_vert:Mm,points_frag:ym,shadow_vert:Sm,shadow_frag:bm,sprite_vert:Em,sprite_frag:Tm},ot={common:{diffuse:{value:new Ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new Kt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new Ct(16777215)},opacity:{value:1},center:{value:new Kt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},In={basic:{uniforms:qe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:qe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Ct(0)}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:qe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Ct(0)},specular:{value:new Ct(1118481)},shininess:{value:30}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:qe([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new Ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:qe([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new Ct(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:qe([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:qe([ot.points,ot.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:qe([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:qe([ot.common,ot.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:qe([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:qe([ot.sprite,ot.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distanceRGBA:{uniforms:qe([ot.common,ot.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distanceRGBA_vert,fragmentShader:Ht.distanceRGBA_frag},shadow:{uniforms:qe([ot.lights,ot.fog,{color:{value:new Ct(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};In.physical={uniforms:qe([In.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new Kt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new Ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new Kt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new Ct(0)},specularColor:{value:new Ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new Kt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};const Ho={r:0,b:0,g:0},Ai=new xn,wm=new be;function Am(i,t,e,n,s,o,r){const a=new Ct(0);let l=o===!0?0:1,c,h,u=null,d=0,f=null;function g(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?e:t).get(x)),x}function _(v){let x=!1;const y=g(v);y===null?p(a,l):y&&y.isColor&&(p(y,1),x=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,r):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(v,x){const y=g(x);y&&(y.isCubeTexture||y.mapping===Tr)?(h===void 0&&(h=new Jt(new fe(1,1,1),new vi({name:"BackgroundCubeMaterial",uniforms:Is(In.backgroundCube.uniforms),vertexShader:In.backgroundCube.vertexShader,fragmentShader:In.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,w,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ai.copy(x.backgroundRotation),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(wm.makeRotationFromEuler(Ai)),h.material.toneMapped=re.getTransfer(y.colorSpace)!==me,(u!==y||d!==y.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,f=i.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Jt(new Rr(2,2),new vi({name:"BackgroundMaterial",uniforms:Is(In.background.uniforms),vertexShader:In.background.vertexShader,fragmentShader:In.background.fragmentShader,side:xi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=re.getTransfer(y.colorSpace)!==me,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,f=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function p(v,x){v.getRGB(Ho,Hh(i)),n.buffers.color.setClear(Ho.r,Ho.g,Ho.b,x,r)}return{getClearColor:function(){return a},setClearColor:function(v,x=1){a.set(v),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,p(a,l)},render:_,addToRenderList:m}}function Rm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let o=s,r=!1;function a(M,L,D,U,z){let G=!1;const X=u(U,D,L);o!==X&&(o=X,c(o.object)),G=f(M,U,D,z),G&&g(M,U,D,z),z!==null&&t.update(z,i.ELEMENT_ARRAY_BUFFER),(G||r)&&(r=!1,y(M,L,D,U),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,L,D){const U=D.wireframe===!0;let z=n[M.id];z===void 0&&(z={},n[M.id]=z);let G=z[L.id];G===void 0&&(G={},z[L.id]=G);let X=G[U];return X===void 0&&(X=d(l()),G[U]=X),X}function d(M){const L=[],D=[],U=[];for(let z=0;z<e;z++)L[z]=0,D[z]=0,U[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:D,attributeDivisors:U,object:M,attributes:{},index:null}}function f(M,L,D,U){const z=o.attributes,G=L.attributes;let X=0;const Y=D.getAttributes();for(const W in Y)if(Y[W].location>=0){const ht=z[W];let mt=G[W];if(mt===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(mt=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(mt=M.instanceColor)),ht===void 0||ht.attribute!==mt||mt&&ht.data!==mt.data)return!0;X++}return o.attributesNum!==X||o.index!==U}function g(M,L,D,U){const z={},G=L.attributes;let X=0;const Y=D.getAttributes();for(const W in Y)if(Y[W].location>=0){let ht=G[W];ht===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(ht=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(ht=M.instanceColor));const mt={};mt.attribute=ht,ht&&ht.data&&(mt.data=ht.data),z[W]=mt,X++}o.attributes=z,o.attributesNum=X,o.index=U}function _(){const M=o.newAttributes;for(let L=0,D=M.length;L<D;L++)M[L]=0}function m(M){p(M,0)}function p(M,L){const D=o.newAttributes,U=o.enabledAttributes,z=o.attributeDivisors;D[M]=1,U[M]===0&&(i.enableVertexAttribArray(M),U[M]=1),z[M]!==L&&(i.vertexAttribDivisor(M,L),z[M]=L)}function v(){const M=o.newAttributes,L=o.enabledAttributes;for(let D=0,U=L.length;D<U;D++)L[D]!==M[D]&&(i.disableVertexAttribArray(D),L[D]=0)}function x(M,L,D,U,z,G,X){X===!0?i.vertexAttribIPointer(M,L,D,z,G):i.vertexAttribPointer(M,L,D,U,z,G)}function y(M,L,D,U){_();const z=U.attributes,G=D.getAttributes(),X=L.defaultAttributeValues;for(const Y in G){const W=G[Y];if(W.location>=0){let rt=z[Y];if(rt===void 0&&(Y==="instanceMatrix"&&M.instanceMatrix&&(rt=M.instanceMatrix),Y==="instanceColor"&&M.instanceColor&&(rt=M.instanceColor)),rt!==void 0){const ht=rt.normalized,mt=rt.itemSize,Wt=t.get(rt);if(Wt===void 0)continue;const jt=Wt.buffer,q=Wt.type,J=Wt.bytesPerElement,dt=q===i.INT||q===i.UNSIGNED_INT||rt.gpuType===ul;if(rt.isInterleavedBufferAttribute){const lt=rt.data,Pt=lt.stride,Ft=rt.offset;if(lt.isInstancedInterleavedBuffer){for(let wt=0;wt<W.locationSize;wt++)p(W.location+wt,lt.meshPerAttribute);M.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let wt=0;wt<W.locationSize;wt++)m(W.location+wt);i.bindBuffer(i.ARRAY_BUFFER,jt);for(let wt=0;wt<W.locationSize;wt++)x(W.location+wt,mt/W.locationSize,q,ht,Pt*J,(Ft+mt/W.locationSize*wt)*J,dt)}else{if(rt.isInstancedBufferAttribute){for(let lt=0;lt<W.locationSize;lt++)p(W.location+lt,rt.meshPerAttribute);M.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let lt=0;lt<W.locationSize;lt++)m(W.location+lt);i.bindBuffer(i.ARRAY_BUFFER,jt);for(let lt=0;lt<W.locationSize;lt++)x(W.location+lt,mt/W.locationSize,q,ht,mt*J,mt/W.locationSize*lt*J,dt)}}else if(X!==void 0){const ht=X[Y];if(ht!==void 0)switch(ht.length){case 2:i.vertexAttrib2fv(W.location,ht);break;case 3:i.vertexAttrib3fv(W.location,ht);break;case 4:i.vertexAttrib4fv(W.location,ht);break;default:i.vertexAttrib1fv(W.location,ht)}}}}v()}function R(){P();for(const M in n){const L=n[M];for(const D in L){const U=L[D];for(const z in U)h(U[z].object),delete U[z];delete L[D]}delete n[M]}}function w(M){if(n[M.id]===void 0)return;const L=n[M.id];for(const D in L){const U=L[D];for(const z in U)h(U[z].object),delete U[z];delete L[D]}delete n[M.id]}function T(M){for(const L in n){const D=n[L];if(D[M.id]===void 0)continue;const U=D[M.id];for(const z in U)h(U[z].object),delete U[z];delete D[M.id]}}function P(){b(),r=!0,o!==s&&(o=s,c(o.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:b,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:m,disableUnusedAttributes:v}}function Cm(i,t,e){let n;function s(c){n=c}function o(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function r(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)r(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];for(let _=0;_<d.length;_++)e.update(g,n,d[_])}}this.setMode=s,this.render=o,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Pm(i,t,e,n){let s;function o(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(w){return!(w!==wn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const T=w===go&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Zn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==$n&&!T)}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=f>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:p,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:y,maxSamples:R}}function Lm(i){const t=this;let e=null,n=0,s=!1,o=!1;const r=new Ci,a=new Gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){o=!0,h(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||o&&!m)o?h(null):c();else{const v=o?0:n,x=v*4;let y=p.clippingState||null;l.value=y,y=h(g,d,x,f);for(let R=0;R!==x;++R)y[R]=e[R];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,y=f;x!==_;++x,y+=4)r.copy(u[x]).applyMatrix4(v,a),r.normal.toArray(m,y),m[y+3]=r.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Im(i){let t=new WeakMap;function e(r,a){return a===xa?r.mapping=Rs:a===va&&(r.mapping=Cs),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===xa||a===va)if(t.has(r)){const l=t.get(r).texture;return e(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new Gu(l.height);return c.fromEquirectangularTexture(i,r),t.set(r,c),r.addEventListener("dispose",s),e(c.texture,r.mapping)}else return null}}return r}function s(r){const a=r.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}class Xh extends Gh{constructor(t=-1,e=1,n=1,s=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=n-t,r=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=c*this.view.offsetX,r=o+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(o,r,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const _s=4,mc=[.125,.215,.35,.446,.526,.582],Ui=20,ea=new Xh,gc=new Ct;let na=null,ia=0,sa=0,oa=!1;const Pi=(1+Math.sqrt(5))/2,ds=1/Pi,_c=[new O(-Pi,ds,0),new O(Pi,ds,0),new O(-ds,0,Pi),new O(ds,0,Pi),new O(0,Pi,-ds),new O(0,Pi,ds),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)];class xc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){na=this._renderer.getRenderTarget(),ia=this._renderer.getActiveCubeFace(),sa=this._renderer.getActiveMipmapLevel(),oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,s,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(na,ia,sa),this._renderer.xr.enabled=oa,t.scissorTest=!1,Go(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Rs||t.mapping===Cs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),na=this._renderer.getRenderTarget(),ia=this._renderer.getActiveCubeFace(),sa=this._renderer.getActiveMipmapLevel(),oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:En,minFilter:En,generateMipmaps:!1,type:go,format:wn,colorSpace:yi,depthBuffer:!1},s=vc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vc(t,e,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Dm(o)),this._blurMaterial=Um(o,t,e)}return s}_compileMaterial(t){const e=new Jt(this._lodPlanes[0],t);this._renderer.compile(e,ea)}_sceneToCubeUV(t,e,n,s){const a=new dn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(gc),h.toneMapping=_i,h.autoClear=!1;const f=new vl({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1}),g=new Jt(new fe,f);let _=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,_=!0):(f.color.copy(gc),_=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):v===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const x=this._cubeSize;Go(s,v*x,p>2?x:0,x,x),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Rs||t.mapping===Cs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=yc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Mc());const o=s?this._cubemapMaterial:this._equirectMaterial,r=new Jt(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=t;const l=this._cubeSize;Go(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(r,ea)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let o=1;o<s;o++){const r=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=_c[(s-o-1)%_c.length];this._blur(t,o-1,o,r,a)}e.autoClear=n}_blur(t,e,n,s,o){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,s,"latitudinal",o),this._halfBlur(r,t,n,n,s,"longitudinal",o)}_halfBlur(t,e,n,s,o,r,a){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Jt(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(o)?Math.PI/(2*f):2*Math.PI/(2*Ui-1),_=o/g,m=isFinite(o)?1+Math.floor(h*_):Ui;m>Ui&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ui}`);const p=[];let v=0;for(let T=0;T<Ui;++T){const P=T/_,b=Math.exp(-P*P/2);p.push(b),T===0?v+=b:T<m&&(v+=2*b)}for(let T=0;T<p.length;T++)p[T]=p[T]/v;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=r==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-n;const y=this._sizeLods[s],R=3*y*(s>x-_s?s-x+_s:0),w=4*(this._cubeSize-y);Go(e,R,w,3*y,2*y),l.setRenderTarget(e),l.render(u,ea)}}function Dm(i){const t=[],e=[],n=[];let s=i;const o=i-_s+1+mc.length;for(let r=0;r<o;r++){const a=Math.pow(2,s);e.push(a);let l=1/a;r>i-_s?l=mc[r-i+_s-1]:r===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,v=new Float32Array(_*g*f),x=new Float32Array(m*g*f),y=new Float32Array(p*g*f);for(let w=0;w<f;w++){const T=w%3*2/3-1,P=w>2?0:-1,b=[T,P,0,T+2/3,P,0,T+2/3,P+1,0,T,P,0,T+2/3,P+1,0,T,P+1,0];v.set(b,_*g*w),x.set(d,m*g*w);const M=[w,w,w,w,w,w];y.set(M,p*g*w)}const R=new vn;R.setAttribute("position",new Nn(v,_)),R.setAttribute("uv",new Nn(x,m)),R.setAttribute("faceIndex",new Nn(y,p)),t.push(R),s>_s&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function vc(i,t,e){const n=new Wi(i,t,e);return n.texture.mapping=Tr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Go(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Um(i,t,e){const n=new Float32Array(Ui),s=new O(0,1,0);return new vi({name:"SphericalGaussianBlur",defines:{n:Ui,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Mc(){return new vi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function yc(){return new vi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function yl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Nm(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===xa||l===va,h=l===Rs||l===Cs;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new xc(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new xc(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",o),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function o(a){const l=a.target;l.removeEventListener("dispose",o);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:r}}function Fm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&io("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Om(i,t,e,n){const s={},o=new WeakMap;function r(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}d.removeEventListener("dispose",r),delete s[d.id];const f=o.get(d);f&&(t.remove(f),o.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",r),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],i.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const v=f.array;_=f.version;for(let x=0,y=v.length;x<y;x+=3){const R=v[x+0],w=v[x+1],T=v[x+2];d.push(R,w,w,T,T,R)}}else if(g!==void 0){const v=g.array;_=g.version;for(let x=0,y=v.length/3-1;x<y;x+=3){const R=x+0,w=x+1,T=x+2;d.push(R,w,w,T,T,R)}}else return;const m=new(Dh(d)?zh:Bh)(d,1);m.version=_;const p=o.get(u);p&&t.remove(p),o.set(u,m)}function h(u){const d=o.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return o.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function km(i,t,e){let n;function s(d){n=d}let o,r;function a(d){o=d.type,r=d.bytesPerElement}function l(d,f){i.drawElements(n,f,o,d*r),e.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,o,d*r,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,o,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/r,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,o,d,0,_,0,g);let p=0;for(let v=0;v<g;v++)p+=f[v];for(let v=0;v<_.length;v++)e.update(p,n,_[v])}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Bm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,r,a){switch(e.calls++,r){case i.TRIANGLES:e.triangles+=a*(o/3);break;case i.LINES:e.lines+=a*(o/2);break;case i.LINE_STRIP:e.lines+=a*(o-1);break;case i.LINE_LOOP:e.lines+=a*o;break;case i.POINTS:e.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function zm(i,t,e){const n=new WeakMap,s=new Pe;function o(r,a,l){const c=r.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let M=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var f=M;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let y=0;g===!0&&(y=1),_===!0&&(y=2),m===!0&&(y=3);let R=a.attributes.position.count*y,w=1;R>t.maxTextureSize&&(w=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const T=new Float32Array(R*w*4*u),P=new Nh(T,R,w,u);P.type=$n,P.needsUpdate=!0;const b=y*4;for(let L=0;L<u;L++){const D=p[L],U=v[L],z=x[L],G=R*w*4*L;for(let X=0;X<D.count;X++){const Y=X*b;g===!0&&(s.fromBufferAttribute(D,X),T[G+Y+0]=s.x,T[G+Y+1]=s.y,T[G+Y+2]=s.z,T[G+Y+3]=0),_===!0&&(s.fromBufferAttribute(U,X),T[G+Y+4]=s.x,T[G+Y+5]=s.y,T[G+Y+6]=s.z,T[G+Y+7]=0),m===!0&&(s.fromBufferAttribute(z,X),T[G+Y+8]=s.x,T[G+Y+9]=s.y,T[G+Y+10]=s.z,T[G+Y+11]=z.itemSize===4?s.w:1)}}d={count:u,texture:P,size:new Kt(R,w)},n.set(a,d),a.addEventListener("dispose",M)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",r.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:o}}function Hm(i,t,e,n){let s=new WeakMap;function o(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function r(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:o,dispose:r}}class qh extends $e{constructor(t,e,n,s,o,r,a,l,c,h=ys){if(h!==ys&&h!==Ls)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ys&&(n=Vi),n===void 0&&h===Ls&&(n=Ps),super(null,s,o,r,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:tn,this.minFilter=l!==void 0?l:tn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Yh=new $e,Sc=new qh(1,1),$h=new Nh,Kh=new wu,jh=new Vh,bc=[],Ec=[],Tc=new Float32Array(16),wc=new Float32Array(9),Ac=new Float32Array(4);function zs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let o=bc[s];if(o===void 0&&(o=new Float32Array(s),bc[s]=o),t!==0){n.toArray(o,0);for(let r=1,a=0;r!==t;++r)a+=e,i[r].toArray(o,a)}return o}function Le(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ie(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Cr(i,t){let e=Ec[t];e===void 0&&(e=new Int32Array(t),Ec[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Gm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Vm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;i.uniform2fv(this.addr,t),Ie(e,t)}}function Wm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Le(e,t))return;i.uniform3fv(this.addr,t),Ie(e,t)}}function Xm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;i.uniform4fv(this.addr,t),Ie(e,t)}}function qm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ie(e,t)}else{if(Le(e,n))return;Ac.set(n),i.uniformMatrix2fv(this.addr,!1,Ac),Ie(e,n)}}function Ym(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ie(e,t)}else{if(Le(e,n))return;wc.set(n),i.uniformMatrix3fv(this.addr,!1,wc),Ie(e,n)}}function $m(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ie(e,t)}else{if(Le(e,n))return;Tc.set(n),i.uniformMatrix4fv(this.addr,!1,Tc),Ie(e,n)}}function Km(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function jm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;i.uniform2iv(this.addr,t),Ie(e,t)}}function Zm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;i.uniform3iv(this.addr,t),Ie(e,t)}}function Jm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;i.uniform4iv(this.addr,t),Ie(e,t)}}function Qm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function t0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;i.uniform2uiv(this.addr,t),Ie(e,t)}}function e0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;i.uniform3uiv(this.addr,t),Ie(e,t)}}function n0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;i.uniform4uiv(this.addr,t),Ie(e,t)}}function i0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let o;this.type===i.SAMPLER_2D_SHADOW?(Sc.compareFunction=Ih,o=Sc):o=Yh,e.setTexture2D(t||o,s)}function s0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Kh,s)}function o0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||jh,s)}function r0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||$h,s)}function a0(i){switch(i){case 5126:return Gm;case 35664:return Vm;case 35665:return Wm;case 35666:return Xm;case 35674:return qm;case 35675:return Ym;case 35676:return $m;case 5124:case 35670:return Km;case 35667:case 35671:return jm;case 35668:case 35672:return Zm;case 35669:case 35673:return Jm;case 5125:return Qm;case 36294:return t0;case 36295:return e0;case 36296:return n0;case 35678:case 36198:case 36298:case 36306:case 35682:return i0;case 35679:case 36299:case 36307:return s0;case 35680:case 36300:case 36308:case 36293:return o0;case 36289:case 36303:case 36311:case 36292:return r0}}function l0(i,t){i.uniform1fv(this.addr,t)}function c0(i,t){const e=zs(t,this.size,2);i.uniform2fv(this.addr,e)}function h0(i,t){const e=zs(t,this.size,3);i.uniform3fv(this.addr,e)}function d0(i,t){const e=zs(t,this.size,4);i.uniform4fv(this.addr,e)}function u0(i,t){const e=zs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function f0(i,t){const e=zs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function p0(i,t){const e=zs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function m0(i,t){i.uniform1iv(this.addr,t)}function g0(i,t){i.uniform2iv(this.addr,t)}function _0(i,t){i.uniform3iv(this.addr,t)}function x0(i,t){i.uniform4iv(this.addr,t)}function v0(i,t){i.uniform1uiv(this.addr,t)}function M0(i,t){i.uniform2uiv(this.addr,t)}function y0(i,t){i.uniform3uiv(this.addr,t)}function S0(i,t){i.uniform4uiv(this.addr,t)}function b0(i,t,e){const n=this.cache,s=t.length,o=Cr(e,s);Le(n,o)||(i.uniform1iv(this.addr,o),Ie(n,o));for(let r=0;r!==s;++r)e.setTexture2D(t[r]||Yh,o[r])}function E0(i,t,e){const n=this.cache,s=t.length,o=Cr(e,s);Le(n,o)||(i.uniform1iv(this.addr,o),Ie(n,o));for(let r=0;r!==s;++r)e.setTexture3D(t[r]||Kh,o[r])}function T0(i,t,e){const n=this.cache,s=t.length,o=Cr(e,s);Le(n,o)||(i.uniform1iv(this.addr,o),Ie(n,o));for(let r=0;r!==s;++r)e.setTextureCube(t[r]||jh,o[r])}function w0(i,t,e){const n=this.cache,s=t.length,o=Cr(e,s);Le(n,o)||(i.uniform1iv(this.addr,o),Ie(n,o));for(let r=0;r!==s;++r)e.setTexture2DArray(t[r]||$h,o[r])}function A0(i){switch(i){case 5126:return l0;case 35664:return c0;case 35665:return h0;case 35666:return d0;case 35674:return u0;case 35675:return f0;case 35676:return p0;case 5124:case 35670:return m0;case 35667:case 35671:return g0;case 35668:case 35672:return _0;case 35669:case 35673:return x0;case 5125:return v0;case 36294:return M0;case 36295:return y0;case 36296:return S0;case 35678:case 36198:case 36298:case 36306:case 35682:return b0;case 35679:case 36299:case 36307:return E0;case 35680:case 36300:case 36308:case 36293:return T0;case 36289:case 36303:case 36311:case 36292:return w0}}class R0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=a0(e.type)}}class C0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=A0(e.type)}}class P0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let o=0,r=s.length;o!==r;++o){const a=s[o];a.setValue(t,e[a.id],n)}}}const ra=/(\w+)(\])?(\[|\.)?/g;function Rc(i,t){i.seq.push(t),i.map[t.id]=t}function L0(i,t,e){const n=i.name,s=n.length;for(ra.lastIndex=0;;){const o=ra.exec(n),r=ra.lastIndex;let a=o[1];const l=o[2]==="]",c=o[3];if(l&&(a=a|0),c===void 0||c==="["&&r+2===s){Rc(e,c===void 0?new R0(a,i,t):new C0(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new P0(a),Rc(e,u)),e=u}}}class rr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const o=t.getActiveUniform(e,s),r=t.getUniformLocation(e,o.name);L0(o,r,this)}}setValue(t,e,n,s){const o=this.map[e];o!==void 0&&o.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let o=0,r=e.length;o!==r;++o){const a=e[o],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,o=t.length;s!==o;++s){const r=t[s];r.id in e&&n.push(r)}return n}}function Cc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const I0=37297;let D0=0;function U0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let r=s;r<o;r++){const a=r+1;n.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return n.join(`
`)}function N0(i){const t=re.getPrimaries(re.workingColorSpace),e=re.getPrimaries(i);let n;switch(t===e?n="":t===fr&&e===ur?n="LinearDisplayP3ToLinearSRGB":t===ur&&e===fr&&(n="LinearSRGBToLinearDisplayP3"),i){case yi:case wr:return[n,"LinearTransferOETF"];case Ln:case xl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Pc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const r=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+U0(i.getShaderSource(t),r)}else return s}function F0(i,t){const e=N0(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function O0(i,t){let e;switch(t){case tu:e="Linear";break;case eu:e="Reinhard";break;case nu:e="OptimizedCineon";break;case iu:e="ACESFilmic";break;case ou:e="AgX";break;case ru:e="Neutral";break;case su:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Vo=new O;function k0(){re.getLuminanceCoefficients(Vo);const i=Vo.x.toFixed(4),t=Vo.y.toFixed(4),e=Vo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function B0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qs).join(`
`)}function z0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function H0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const o=i.getActiveAttrib(t,s),r=o.name;let a=1;o.type===i.FLOAT_MAT2&&(a=2),o.type===i.FLOAT_MAT3&&(a=3),o.type===i.FLOAT_MAT4&&(a=4),e[r]={type:o.type,location:i.getAttribLocation(t,r),locationSize:a}}return e}function Qs(i){return i!==""}function Lc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ic(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const G0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ka(i){return i.replace(G0,W0)}const V0=new Map;function W0(i,t){let e=Ht[t];if(e===void 0){const n=V0.get(t);if(n!==void 0)e=Ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ka(e)}const X0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dc(i){return i.replace(X0,q0)}function q0(i,t,e,n){let s="";for(let o=parseInt(t);o<parseInt(e);o++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function Uc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Y0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===vh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===wd?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===qn&&(t="SHADOWMAP_TYPE_VSM"),t}function $0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Rs:case Cs:t="ENVMAP_TYPE_CUBE";break;case Tr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function K0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Cs:t="ENVMAP_MODE_REFRACTION";break}return t}function j0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case dl:t="ENVMAP_BLENDING_MULTIPLY";break;case Jd:t="ENVMAP_BLENDING_MIX";break;case Qd:t="ENVMAP_BLENDING_ADD";break}return t}function Z0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function J0(i,t,e,n){const s=i.getContext(),o=e.defines;let r=e.vertexShader,a=e.fragmentShader;const l=Y0(e),c=$0(e),h=K0(e),u=j0(e),d=Z0(e),f=B0(e),g=z0(o),_=s.createProgram();let m,p,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Qs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Qs).join(`
`),p.length>0&&(p+=`
`)):(m=[Uc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qs).join(`
`),p=[Uc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==_i?"#define TONE_MAPPING":"",e.toneMapping!==_i?Ht.tonemapping_pars_fragment:"",e.toneMapping!==_i?O0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,F0("linearToOutputTexel",e.outputColorSpace),k0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Qs).join(`
`)),r=Ka(r),r=Lc(r,e),r=Ic(r,e),a=Ka(a),a=Lc(a,e),a=Ic(a,e),r=Dc(r),a=Dc(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Kl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Kl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=v+m+r,y=v+p+a,R=Cc(s,s.VERTEX_SHADER,x),w=Cc(s,s.FRAGMENT_SHADER,y);s.attachShader(_,R),s.attachShader(_,w),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function T(L){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(_).trim(),U=s.getShaderInfoLog(R).trim(),z=s.getShaderInfoLog(w).trim();let G=!0,X=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,R,w);else{const Y=Pc(s,R,"vertex"),W=Pc(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+D+`
`+Y+`
`+W)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(U===""||z==="")&&(X=!1);X&&(L.diagnostics={runnable:G,programLog:D,vertexShader:{log:U,prefix:m},fragmentShader:{log:z,prefix:p}})}s.deleteShader(R),s.deleteShader(w),P=new rr(s,_),b=H0(s,_)}let P;this.getUniforms=function(){return P===void 0&&T(this),P};let b;this.getAttributes=function(){return b===void 0&&T(this),b};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,I0)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=D0++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=w,this}let Q0=0;class tg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),o=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new eg(t),e.set(t,n)),n}}class eg{constructor(t){this.id=Q0++,this.code=t,this.usedTimes=0}}function ng(i,t,e,n,s,o,r){const a=new Oh,l=new tg,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,M,L,D,U){const z=D.fog,G=U.geometry,X=b.isMeshStandardMaterial?D.environment:null,Y=(b.isMeshStandardMaterial?e:t).get(b.envMap||X),W=Y&&Y.mapping===Tr?Y.image.height:null,rt=g[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const ht=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,mt=ht!==void 0?ht.length:0;let Wt=0;G.morphAttributes.position!==void 0&&(Wt=1),G.morphAttributes.normal!==void 0&&(Wt=2),G.morphAttributes.color!==void 0&&(Wt=3);let jt,q,J,dt;if(rt){const ne=In[rt];jt=ne.vertexShader,q=ne.fragmentShader}else jt=b.vertexShader,q=b.fragmentShader,l.update(b),J=l.getVertexShaderID(b),dt=l.getFragmentShaderID(b);const lt=i.getRenderTarget(),Pt=U.isInstancedMesh===!0,Ft=U.isBatchedMesh===!0,wt=!!b.map,ve=!!b.matcap,I=!!Y,Ee=!!b.aoMap,ae=!!b.lightMap,ce=!!b.bumpMap,Tt=!!b.normalMap,Te=!!b.displacementMap,Ot=!!b.emissiveMap,Bt=!!b.metalnessMap,C=!!b.roughnessMap,S=b.anisotropy>0,V=b.clearcoat>0,Z=b.dispersion>0,Q=b.iridescence>0,j=b.sheen>0,At=b.transmission>0,at=S&&!!b.anisotropyMap,ft=V&&!!b.clearcoatMap,zt=V&&!!b.clearcoatNormalMap,tt=V&&!!b.clearcoatRoughnessMap,ut=Q&&!!b.iridescenceMap,Yt=Q&&!!b.iridescenceThicknessMap,Nt=j&&!!b.sheenColorMap,pt=j&&!!b.sheenRoughnessMap,kt=!!b.specularMap,Xt=!!b.specularColorMap,xe=!!b.specularIntensityMap,N=At&&!!b.transmissionMap,et=At&&!!b.thicknessMap,$=!!b.gradientMap,K=!!b.alphaMap,it=b.alphaTest>0,Lt=!!b.alphaHash,Zt=!!b.extensions;let we=_i;b.toneMapped&&(lt===null||lt.isXRRenderTarget===!0)&&(we=i.toneMapping);const Oe={shaderID:rt,shaderType:b.type,shaderName:b.name,vertexShader:jt,fragmentShader:q,defines:b.defines,customVertexShaderID:J,customFragmentShaderID:dt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Ft,batchingColor:Ft&&U._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&U.instanceColor!==null,instancingMorph:Pt&&U.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:lt===null?i.outputColorSpace:lt.isXRRenderTarget===!0?lt.texture.colorSpace:yi,alphaToCoverage:!!b.alphaToCoverage,map:wt,matcap:ve,envMap:I,envMapMode:I&&Y.mapping,envMapCubeUVHeight:W,aoMap:Ee,lightMap:ae,bumpMap:ce,normalMap:Tt,displacementMap:d&&Te,emissiveMap:Ot,normalMapObjectSpace:Tt&&b.normalMapType===hu,normalMapTangentSpace:Tt&&b.normalMapType===Lh,metalnessMap:Bt,roughnessMap:C,anisotropy:S,anisotropyMap:at,clearcoat:V,clearcoatMap:ft,clearcoatNormalMap:zt,clearcoatRoughnessMap:tt,dispersion:Z,iridescence:Q,iridescenceMap:ut,iridescenceThicknessMap:Yt,sheen:j,sheenColorMap:Nt,sheenRoughnessMap:pt,specularMap:kt,specularColorMap:Xt,specularIntensityMap:xe,transmission:At,transmissionMap:N,thicknessMap:et,gradientMap:$,opaque:b.transparent===!1&&b.blending===Ms&&b.alphaToCoverage===!1,alphaMap:K,alphaTest:it,alphaHash:Lt,combine:b.combine,mapUv:wt&&_(b.map.channel),aoMapUv:Ee&&_(b.aoMap.channel),lightMapUv:ae&&_(b.lightMap.channel),bumpMapUv:ce&&_(b.bumpMap.channel),normalMapUv:Tt&&_(b.normalMap.channel),displacementMapUv:Te&&_(b.displacementMap.channel),emissiveMapUv:Ot&&_(b.emissiveMap.channel),metalnessMapUv:Bt&&_(b.metalnessMap.channel),roughnessMapUv:C&&_(b.roughnessMap.channel),anisotropyMapUv:at&&_(b.anisotropyMap.channel),clearcoatMapUv:ft&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:zt&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ut&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Yt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:pt&&_(b.sheenRoughnessMap.channel),specularMapUv:kt&&_(b.specularMap.channel),specularColorMapUv:Xt&&_(b.specularColorMap.channel),specularIntensityMapUv:xe&&_(b.specularIntensityMap.channel),transmissionMapUv:N&&_(b.transmissionMap.channel),thicknessMapUv:et&&_(b.thicknessMap.channel),alphaMapUv:K&&_(b.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Tt||S),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!G.attributes.uv&&(wt||K),fog:!!z,useFog:b.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:U.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:mt,morphTextureStride:Wt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:we,decodeVideoTexture:wt&&b.map.isVideoTexture===!0&&re.getTransfer(b.map.colorSpace)===me,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Un,flipSided:b.side===en,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Zt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Zt&&b.extensions.multiDraw===!0||Ft)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Oe.vertexUv1s=c.has(1),Oe.vertexUv2s=c.has(2),Oe.vertexUv3s=c.has(3),c.clear(),Oe}function p(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const L in b.defines)M.push(L),M.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(v(M,b),x(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function v(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function x(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.skinning&&a.enable(4),M.morphTargets&&a.enable(5),M.morphNormals&&a.enable(6),M.morphColors&&a.enable(7),M.premultipliedAlpha&&a.enable(8),M.shadowMapEnabled&&a.enable(9),M.doubleSided&&a.enable(10),M.flipSided&&a.enable(11),M.useDepthPacking&&a.enable(12),M.dithering&&a.enable(13),M.transmission&&a.enable(14),M.sheen&&a.enable(15),M.opaque&&a.enable(16),M.pointsUvs&&a.enable(17),M.decodeVideoTexture&&a.enable(18),M.alphaToCoverage&&a.enable(19),b.push(a.mask)}function y(b){const M=g[b.type];let L;if(M){const D=In[M];L=ku.clone(D.uniforms)}else L=b.uniforms;return L}function R(b,M){let L;for(let D=0,U=h.length;D<U;D++){const z=h[D];if(z.cacheKey===M){L=z,++L.usedTimes;break}}return L===void 0&&(L=new J0(i,M,b,o),h.push(L)),L}function w(b){if(--b.usedTimes===0){const M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function T(b){l.remove(b)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:R,releaseProgram:w,releaseShaderCache:T,programs:h,dispose:P}}function ig(){let i=new WeakMap;function t(o){let r=i.get(o);return r===void 0&&(r={},i.set(o,r)),r}function e(o){i.delete(o)}function n(o,r,a){i.get(o)[r]=a}function s(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function sg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Nc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Fc(){const i=[];let t=0;const e=[],n=[],s=[];function o(){t=0,e.length=0,n.length=0,s.length=0}function r(u,d,f,g,_,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function a(u,d,f,g,_,m){const p=r(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(u,d,f,g,_,m){const p=r(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||sg),n.length>1&&n.sort(d||Nc),s.length>1&&s.sort(d||Nc)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:o,push:a,unshift:l,finish:h,sort:c}}function og(){let i=new WeakMap;function t(n,s){const o=i.get(n);let r;return o===void 0?(r=new Fc,i.set(n,[r])):s>=o.length?(r=new Fc,o.push(r)):r=o[s],r}function e(){i=new WeakMap}return{get:t,dispose:e}}function rg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new O,color:new Ct};break;case"SpotLight":e={position:new O,direction:new O,color:new Ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new Ct,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new Ct,groundColor:new Ct};break;case"RectAreaLight":e={color:new Ct,position:new O,halfWidth:new O,halfHeight:new O};break}return i[t.id]=e,e}}}function ag(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let lg=0;function cg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function hg(i){const t=new rg,e=ag(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new O);const s=new O,o=new be,r=new be;function a(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,v=0,x=0,y=0,R=0,w=0,T=0;c.sort(cg);for(let b=0,M=c.length;b<M;b++){const L=c[b],D=L.color,U=L.intensity,z=L.distance,G=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=D.r*U,u+=D.g*U,d+=D.b*U;else if(L.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(L.sh.coefficients[X],U);T++}else if(L.isDirectionalLight){const X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Y=L.shadow,W=e.get(L);W.shadowIntensity=Y.intensity,W.shadowBias=Y.bias,W.shadowNormalBias=Y.normalBias,W.shadowRadius=Y.radius,W.shadowMapSize=Y.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=G,n.directionalShadowMatrix[f]=L.shadow.matrix,v++}n.directional[f]=X,f++}else if(L.isSpotLight){const X=t.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(D).multiplyScalar(U),X.distance=z,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,n.spot[_]=X;const Y=L.shadow;if(L.map&&(n.spotLightMap[R]=L.map,R++,Y.updateMatrices(L),L.castShadow&&w++),n.spotLightMatrix[_]=Y.matrix,L.castShadow){const W=e.get(L);W.shadowIntensity=Y.intensity,W.shadowBias=Y.bias,W.shadowNormalBias=Y.normalBias,W.shadowRadius=Y.radius,W.shadowMapSize=Y.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=G,y++}_++}else if(L.isRectAreaLight){const X=t.get(L);X.color.copy(D).multiplyScalar(U),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=X,m++}else if(L.isPointLight){const X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){const Y=L.shadow,W=e.get(L);W.shadowIntensity=Y.intensity,W.shadowBias=Y.bias,W.shadowNormalBias=Y.normalBias,W.shadowRadius=Y.radius,W.shadowMapSize=Y.mapSize,W.shadowCameraNear=Y.camera.near,W.shadowCameraFar=Y.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=G,n.pointShadowMatrix[g]=L.shadow.matrix,x++}n.point[g]=X,g++}else if(L.isHemisphereLight){const X=t.get(L);X.skyColor.copy(L.color).multiplyScalar(U),X.groundColor.copy(L.groundColor).multiplyScalar(U),n.hemi[p]=X,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ot.LTC_FLOAT_1,n.rectAreaLTC2=ot.LTC_FLOAT_2):(n.rectAreaLTC1=ot.LTC_HALF_1,n.rectAreaLTC2=ot.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const P=n.hash;(P.directionalLength!==f||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==v||P.numPointShadows!==x||P.numSpotShadows!==y||P.numSpotMaps!==R||P.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=y+R-w,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=T,P.directionalLength=f,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=v,P.numPointShadows=x,P.numSpotShadows=y,P.numSpotMaps=R,P.numLightProbes=T,n.version=lg++)}function l(c,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){const x=c[p];if(x.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(x.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(x.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),r.identity(),o.copy(x.matrixWorld),o.premultiply(m),r.extractRotation(o),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),g++}else if(x.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function Oc(i){const t=new hg(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function o(h){e.push(h)}function r(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:o,pushShadow:r}}function dg(i){let t=new WeakMap;function e(s,o=0){const r=t.get(s);let a;return r===void 0?(a=new Oc(i),t.set(s,[a])):o>=r.length?(a=new Oc(i),r.push(a)):a=r[o],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class ug extends Bs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=lu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class fg extends Bs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const pg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,mg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function gg(i,t,e){let n=new Ml;const s=new Kt,o=new Kt,r=new Pe,a=new ug({depthPacking:cu}),l=new fg,c={},h=e.maxTextureSize,u={[xi]:en,[en]:xi,[Un]:Un},d=new vi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Kt},radius:{value:4}},vertexShader:pg,fragmentShader:mg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new vn;g.setAttribute("position",new Nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Jt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vh;let p=this.type;this.render=function(w,T,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const b=i.getRenderTarget(),M=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),D=i.state;D.setBlending(gi),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const U=p!==qn&&this.type===qn,z=p===qn&&this.type!==qn;for(let G=0,X=w.length;G<X;G++){const Y=w[G],W=Y.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const rt=W.getFrameExtents();if(s.multiply(rt),o.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(o.x=Math.floor(h/rt.x),s.x=o.x*rt.x,W.mapSize.x=o.x),s.y>h&&(o.y=Math.floor(h/rt.y),s.y=o.y*rt.y,W.mapSize.y=o.y)),W.map===null||U===!0||z===!0){const mt=this.type!==qn?{minFilter:tn,magFilter:tn}:{};W.map!==null&&W.map.dispose(),W.map=new Wi(s.x,s.y,mt),W.map.texture.name=Y.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const ht=W.getViewportCount();for(let mt=0;mt<ht;mt++){const Wt=W.getViewport(mt);r.set(o.x*Wt.x,o.y*Wt.y,o.x*Wt.z,o.y*Wt.w),D.viewport(r),W.updateMatrices(Y,mt),n=W.getFrustum(),y(T,P,W.camera,Y,this.type)}W.isPointLightShadow!==!0&&this.type===qn&&v(W,P),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,M,L)};function v(w,T){const P=t.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Wi(s.x,s.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(T,null,P,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(T,null,P,f,_,null)}function x(w,T,P,b){let M=null;const L=P.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(L!==void 0)M=L;else if(M=P.isPointLight===!0?l:a,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const D=M.uuid,U=T.uuid;let z=c[D];z===void 0&&(z={},c[D]=z);let G=z[U];G===void 0&&(G=M.clone(),z[U]=G,T.addEventListener("dispose",R)),M=G}if(M.visible=T.visible,M.wireframe=T.wireframe,b===qn?M.side=T.shadowSide!==null?T.shadowSide:T.side:M.side=T.shadowSide!==null?T.shadowSide:u[T.side],M.alphaMap=T.alphaMap,M.alphaTest=T.alphaTest,M.map=T.map,M.clipShadows=T.clipShadows,M.clippingPlanes=T.clippingPlanes,M.clipIntersection=T.clipIntersection,M.displacementMap=T.displacementMap,M.displacementScale=T.displacementScale,M.displacementBias=T.displacementBias,M.wireframeLinewidth=T.wireframeLinewidth,M.linewidth=T.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const D=i.properties.get(M);D.light=P}return M}function y(w,T,P,b,M){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===qn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,w.matrixWorld);const U=t.update(w),z=w.material;if(Array.isArray(z)){const G=U.groups;for(let X=0,Y=G.length;X<Y;X++){const W=G[X],rt=z[W.materialIndex];if(rt&&rt.visible){const ht=x(w,rt,b,M);w.onBeforeShadow(i,w,T,P,U,ht,W),i.renderBufferDirect(P,null,U,ht,w,W),w.onAfterShadow(i,w,T,P,U,ht,W)}}}else if(z.visible){const G=x(w,z,b,M);w.onBeforeShadow(i,w,T,P,U,G,null),i.renderBufferDirect(P,null,U,G,w,null),w.onAfterShadow(i,w,T,P,U,G,null)}}const D=w.children;for(let U=0,z=D.length;U<z;U++)y(D[U],T,P,b,M)}function R(w){w.target.removeEventListener("dispose",R);for(const P in c){const b=c[P],M=w.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}function _g(i){function t(){let N=!1;const et=new Pe;let $=null;const K=new Pe(0,0,0,0);return{setMask:function(it){$!==it&&!N&&(i.colorMask(it,it,it,it),$=it)},setLocked:function(it){N=it},setClear:function(it,Lt,Zt,we,Oe){Oe===!0&&(it*=we,Lt*=we,Zt*=we),et.set(it,Lt,Zt,we),K.equals(et)===!1&&(i.clearColor(it,Lt,Zt,we),K.copy(et))},reset:function(){N=!1,$=null,K.set(-1,0,0,0)}}}function e(){let N=!1,et=null,$=null,K=null;return{setTest:function(it){it?dt(i.DEPTH_TEST):lt(i.DEPTH_TEST)},setMask:function(it){et!==it&&!N&&(i.depthMask(it),et=it)},setFunc:function(it){if($!==it){switch(it){case Xd:i.depthFunc(i.NEVER);break;case qd:i.depthFunc(i.ALWAYS);break;case Yd:i.depthFunc(i.LESS);break;case hr:i.depthFunc(i.LEQUAL);break;case $d:i.depthFunc(i.EQUAL);break;case Kd:i.depthFunc(i.GEQUAL);break;case jd:i.depthFunc(i.GREATER);break;case Zd:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}$=it}},setLocked:function(it){N=it},setClear:function(it){K!==it&&(i.clearDepth(it),K=it)},reset:function(){N=!1,et=null,$=null,K=null}}}function n(){let N=!1,et=null,$=null,K=null,it=null,Lt=null,Zt=null,we=null,Oe=null;return{setTest:function(ne){N||(ne?dt(i.STENCIL_TEST):lt(i.STENCIL_TEST))},setMask:function(ne){et!==ne&&!N&&(i.stencilMask(ne),et=ne)},setFunc:function(ne,kn,An){($!==ne||K!==kn||it!==An)&&(i.stencilFunc(ne,kn,An),$=ne,K=kn,it=An)},setOp:function(ne,kn,An){(Lt!==ne||Zt!==kn||we!==An)&&(i.stencilOp(ne,kn,An),Lt=ne,Zt=kn,we=An)},setLocked:function(ne){N=ne},setClear:function(ne){Oe!==ne&&(i.clearStencil(ne),Oe=ne)},reset:function(){N=!1,et=null,$=null,K=null,it=null,Lt=null,Zt=null,we=null,Oe=null}}}const s=new t,o=new e,r=new n,a=new WeakMap,l=new WeakMap;let c={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,v=null,x=null,y=null,R=null,w=new Ct(0,0,0),T=0,P=!1,b=null,M=null,L=null,D=null,U=null;const z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,X=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(Y)[1]),G=X>=1):Y.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),G=X>=2);let W=null,rt={};const ht=i.getParameter(i.SCISSOR_BOX),mt=i.getParameter(i.VIEWPORT),Wt=new Pe().fromArray(ht),jt=new Pe().fromArray(mt);function q(N,et,$,K){const it=new Uint8Array(4),Lt=i.createTexture();i.bindTexture(N,Lt),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Zt=0;Zt<$;Zt++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(et,0,i.RGBA,1,1,K,0,i.RGBA,i.UNSIGNED_BYTE,it):i.texImage2D(et+Zt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,it);return Lt}const J={};J[i.TEXTURE_2D]=q(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=q(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=q(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=q(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),r.setClear(0),dt(i.DEPTH_TEST),o.setFunc(hr),ce(!1),Tt(Vl),dt(i.CULL_FACE),Ee(gi);function dt(N){c[N]!==!0&&(i.enable(N),c[N]=!0)}function lt(N){c[N]!==!1&&(i.disable(N),c[N]=!1)}function Pt(N,et){return h[N]!==et?(i.bindFramebuffer(N,et),h[N]=et,N===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=et),N===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=et),!0):!1}function Ft(N,et){let $=d,K=!1;if(N){$=u.get(et),$===void 0&&($=[],u.set(et,$));const it=N.textures;if($.length!==it.length||$[0]!==i.COLOR_ATTACHMENT0){for(let Lt=0,Zt=it.length;Lt<Zt;Lt++)$[Lt]=i.COLOR_ATTACHMENT0+Lt;$.length=it.length,K=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,K=!0);K&&i.drawBuffers($)}function wt(N){return f!==N?(i.useProgram(N),f=N,!0):!1}const ve={[Di]:i.FUNC_ADD,[Rd]:i.FUNC_SUBTRACT,[Cd]:i.FUNC_REVERSE_SUBTRACT};ve[Pd]=i.MIN,ve[Ld]=i.MAX;const I={[Id]:i.ZERO,[Dd]:i.ONE,[Ud]:i.SRC_COLOR,[ga]:i.SRC_ALPHA,[zd]:i.SRC_ALPHA_SATURATE,[kd]:i.DST_COLOR,[Fd]:i.DST_ALPHA,[Nd]:i.ONE_MINUS_SRC_COLOR,[_a]:i.ONE_MINUS_SRC_ALPHA,[Bd]:i.ONE_MINUS_DST_COLOR,[Od]:i.ONE_MINUS_DST_ALPHA,[Hd]:i.CONSTANT_COLOR,[Gd]:i.ONE_MINUS_CONSTANT_COLOR,[Vd]:i.CONSTANT_ALPHA,[Wd]:i.ONE_MINUS_CONSTANT_ALPHA};function Ee(N,et,$,K,it,Lt,Zt,we,Oe,ne){if(N===gi){g===!0&&(lt(i.BLEND),g=!1);return}if(g===!1&&(dt(i.BLEND),g=!0),N!==Ad){if(N!==_||ne!==P){if((m!==Di||x!==Di)&&(i.blendEquation(i.FUNC_ADD),m=Di,x=Di),ne)switch(N){case Ms:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wl:i.blendFunc(i.ONE,i.ONE);break;case Xl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ql:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Ms:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wl:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Xl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ql:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}p=null,v=null,y=null,R=null,w.set(0,0,0),T=0,_=N,P=ne}return}it=it||et,Lt=Lt||$,Zt=Zt||K,(et!==m||it!==x)&&(i.blendEquationSeparate(ve[et],ve[it]),m=et,x=it),($!==p||K!==v||Lt!==y||Zt!==R)&&(i.blendFuncSeparate(I[$],I[K],I[Lt],I[Zt]),p=$,v=K,y=Lt,R=Zt),(we.equals(w)===!1||Oe!==T)&&(i.blendColor(we.r,we.g,we.b,Oe),w.copy(we),T=Oe),_=N,P=!1}function ae(N,et){N.side===Un?lt(i.CULL_FACE):dt(i.CULL_FACE);let $=N.side===en;et&&($=!$),ce($),N.blending===Ms&&N.transparent===!1?Ee(gi):Ee(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const K=N.stencilWrite;r.setTest(K),K&&(r.setMask(N.stencilWriteMask),r.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),r.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Ot(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?dt(i.SAMPLE_ALPHA_TO_COVERAGE):lt(i.SAMPLE_ALPHA_TO_COVERAGE)}function ce(N){b!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),b=N)}function Tt(N){N!==Ed?(dt(i.CULL_FACE),N!==M&&(N===Vl?i.cullFace(i.BACK):N===Td?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):lt(i.CULL_FACE),M=N}function Te(N){N!==L&&(G&&i.lineWidth(N),L=N)}function Ot(N,et,$){N?(dt(i.POLYGON_OFFSET_FILL),(D!==et||U!==$)&&(i.polygonOffset(et,$),D=et,U=$)):lt(i.POLYGON_OFFSET_FILL)}function Bt(N){N?dt(i.SCISSOR_TEST):lt(i.SCISSOR_TEST)}function C(N){N===void 0&&(N=i.TEXTURE0+z-1),W!==N&&(i.activeTexture(N),W=N)}function S(N,et,$){$===void 0&&(W===null?$=i.TEXTURE0+z-1:$=W);let K=rt[$];K===void 0&&(K={type:void 0,texture:void 0},rt[$]=K),(K.type!==N||K.texture!==et)&&(W!==$&&(i.activeTexture($),W=$),i.bindTexture(N,et||J[N]),K.type=N,K.texture=et)}function V(){const N=rt[W];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Z(){try{i.compressedTexImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Q(){try{i.compressedTexImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function j(){try{i.texSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function At(){try{i.texSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function at(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ft(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function zt(){try{i.texStorage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function tt(){try{i.texStorage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ut(){try{i.texImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Yt(){try{i.texImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Nt(N){Wt.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),Wt.copy(N))}function pt(N){jt.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),jt.copy(N))}function kt(N,et){let $=l.get(et);$===void 0&&($=new WeakMap,l.set(et,$));let K=$.get(N);K===void 0&&(K=i.getUniformBlockIndex(et,N.name),$.set(N,K))}function Xt(N,et){const K=l.get(et).get(N);a.get(et)!==K&&(i.uniformBlockBinding(et,K,N.__bindingPointIndex),a.set(et,K))}function xe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},W=null,rt={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,v=null,x=null,y=null,R=null,w=new Ct(0,0,0),T=0,P=!1,b=null,M=null,L=null,D=null,U=null,Wt.set(0,0,i.canvas.width,i.canvas.height),jt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),r.reset()}return{buffers:{color:s,depth:o,stencil:r},enable:dt,disable:lt,bindFramebuffer:Pt,drawBuffers:Ft,useProgram:wt,setBlending:Ee,setMaterial:ae,setFlipSided:ce,setCullFace:Tt,setLineWidth:Te,setPolygonOffset:Ot,setScissorTest:Bt,activeTexture:C,bindTexture:S,unbindTexture:V,compressedTexImage2D:Z,compressedTexImage3D:Q,texImage2D:ut,texImage3D:Yt,updateUBOMapping:kt,uniformBlockBinding:Xt,texStorage2D:zt,texStorage3D:tt,texSubImage2D:j,texSubImage3D:At,compressedTexSubImage2D:at,compressedTexSubImage3D:ft,scissor:Nt,viewport:pt,reset:xe}}function kc(i,t,e,n){const s=xg(n);switch(e){case Eh:return i*t;case wh:return i*t;case Ah:return i*t*2;case Rh:return i*t/s.components*s.byteLength;case ml:return i*t/s.components*s.byteLength;case Ch:return i*t*2/s.components*s.byteLength;case gl:return i*t*2/s.components*s.byteLength;case Th:return i*t*3/s.components*s.byteLength;case wn:return i*t*4/s.components*s.byteLength;case _l:return i*t*4/s.components*s.byteLength;case tr:case er:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case nr:case ir:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ba:case Ta:return Math.max(i,16)*Math.max(t,8)/4;case Sa:case Ea:return Math.max(i,8)*Math.max(t,8)/2;case wa:case Aa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ra:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ca:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Pa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case La:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ia:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Da:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ua:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Na:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Fa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Oa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ka:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ba:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case za:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ha:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ga:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case sr:case Va:case Wa:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ph:case Xa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case qa:case Ya:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function xg(i){switch(i){case Zn:case yh:return{byteLength:1,components:1};case ao:case Sh:case go:return{byteLength:2,components:1};case fl:case pl:return{byteLength:2,components:4};case Vi:case ul:case $n:return{byteLength:4,components:1};case bh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function vg(i,t,e,n,s,o,r){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Kt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,S){return f?new OffscreenCanvas(C,S):mr("canvas")}function _(C,S,V){let Z=1;const Q=Bt(C);if((Q.width>V||Q.height>V)&&(Z=V/Math.max(Q.width,Q.height)),Z<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const j=Math.floor(Z*Q.width),At=Math.floor(Z*Q.height);u===void 0&&(u=g(j,At));const at=S?g(j,At):u;return at.width=j,at.height=At,at.getContext("2d").drawImage(C,0,0,j,At),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+j+"x"+At+")."),at}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),C;return C}function m(C){return C.generateMipmaps&&C.minFilter!==tn&&C.minFilter!==En}function p(C){i.generateMipmap(C)}function v(C,S,V,Z,Q=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let j=S;if(S===i.RED&&(V===i.FLOAT&&(j=i.R32F),V===i.HALF_FLOAT&&(j=i.R16F),V===i.UNSIGNED_BYTE&&(j=i.R8)),S===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(j=i.R8UI),V===i.UNSIGNED_SHORT&&(j=i.R16UI),V===i.UNSIGNED_INT&&(j=i.R32UI),V===i.BYTE&&(j=i.R8I),V===i.SHORT&&(j=i.R16I),V===i.INT&&(j=i.R32I)),S===i.RG&&(V===i.FLOAT&&(j=i.RG32F),V===i.HALF_FLOAT&&(j=i.RG16F),V===i.UNSIGNED_BYTE&&(j=i.RG8)),S===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(j=i.RG8UI),V===i.UNSIGNED_SHORT&&(j=i.RG16UI),V===i.UNSIGNED_INT&&(j=i.RG32UI),V===i.BYTE&&(j=i.RG8I),V===i.SHORT&&(j=i.RG16I),V===i.INT&&(j=i.RG32I)),S===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),S===i.RGBA){const At=Q?dr:re.getTransfer(Z);V===i.FLOAT&&(j=i.RGBA32F),V===i.HALF_FLOAT&&(j=i.RGBA16F),V===i.UNSIGNED_BYTE&&(j=At===me?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function x(C,S){let V;return C?S===null||S===Vi||S===Ps?V=i.DEPTH24_STENCIL8:S===$n?V=i.DEPTH32F_STENCIL8:S===ao&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Vi||S===Ps?V=i.DEPTH_COMPONENT24:S===$n?V=i.DEPTH_COMPONENT32F:S===ao&&(V=i.DEPTH_COMPONENT16),V}function y(C,S){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==tn&&C.minFilter!==En?Math.log2(Math.max(S.width,S.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?S.mipmaps.length:1}function R(C){const S=C.target;S.removeEventListener("dispose",R),T(S),S.isVideoTexture&&h.delete(S)}function w(C){const S=C.target;S.removeEventListener("dispose",w),b(S)}function T(C){const S=n.get(C);if(S.__webglInit===void 0)return;const V=C.source,Z=d.get(V);if(Z){const Q=Z[S.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&P(C),Object.keys(Z).length===0&&d.delete(V)}n.remove(C)}function P(C){const S=n.get(C);i.deleteTexture(S.__webglTexture);const V=C.source,Z=d.get(V);delete Z[S.__cacheKey],r.memory.textures--}function b(C){const S=n.get(C);if(C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(S.__webglFramebuffer[Z]))for(let Q=0;Q<S.__webglFramebuffer[Z].length;Q++)i.deleteFramebuffer(S.__webglFramebuffer[Z][Q]);else i.deleteFramebuffer(S.__webglFramebuffer[Z]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[Z])}else{if(Array.isArray(S.__webglFramebuffer))for(let Z=0;Z<S.__webglFramebuffer.length;Z++)i.deleteFramebuffer(S.__webglFramebuffer[Z]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Z=0;Z<S.__webglColorRenderbuffer.length;Z++)S.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[Z]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const V=C.textures;for(let Z=0,Q=V.length;Z<Q;Z++){const j=n.get(V[Z]);j.__webglTexture&&(i.deleteTexture(j.__webglTexture),r.memory.textures--),n.remove(V[Z])}n.remove(C)}let M=0;function L(){M=0}function D(){const C=M;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),M+=1,C}function U(C){const S=[];return S.push(C.wrapS),S.push(C.wrapT),S.push(C.wrapR||0),S.push(C.magFilter),S.push(C.minFilter),S.push(C.anisotropy),S.push(C.internalFormat),S.push(C.format),S.push(C.type),S.push(C.generateMipmaps),S.push(C.premultiplyAlpha),S.push(C.flipY),S.push(C.unpackAlignment),S.push(C.colorSpace),S.join()}function z(C,S){const V=n.get(C);if(C.isVideoTexture&&Te(C),C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){const Z=C.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{jt(V,C,S);return}}e.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+S)}function G(C,S){const V=n.get(C);if(C.version>0&&V.__version!==C.version){jt(V,C,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+S)}function X(C,S){const V=n.get(C);if(C.version>0&&V.__version!==C.version){jt(V,C,S);return}e.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+S)}function Y(C,S){const V=n.get(C);if(C.version>0&&V.__version!==C.version){q(V,C,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+S)}const W={[Ma]:i.REPEAT,[Fi]:i.CLAMP_TO_EDGE,[ya]:i.MIRRORED_REPEAT},rt={[tn]:i.NEAREST,[au]:i.NEAREST_MIPMAP_NEAREST,[So]:i.NEAREST_MIPMAP_LINEAR,[En]:i.LINEAR,[Nr]:i.LINEAR_MIPMAP_NEAREST,[Oi]:i.LINEAR_MIPMAP_LINEAR},ht={[du]:i.NEVER,[_u]:i.ALWAYS,[uu]:i.LESS,[Ih]:i.LEQUAL,[fu]:i.EQUAL,[gu]:i.GEQUAL,[pu]:i.GREATER,[mu]:i.NOTEQUAL};function mt(C,S){if(S.type===$n&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===En||S.magFilter===Nr||S.magFilter===So||S.magFilter===Oi||S.minFilter===En||S.minFilter===Nr||S.minFilter===So||S.minFilter===Oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,W[S.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,W[S.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,W[S.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,rt[S.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,rt[S.minFilter]),S.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,ht[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===tn||S.minFilter!==So&&S.minFilter!==Oi||S.type===$n&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Wt(C,S){let V=!1;C.__webglInit===void 0&&(C.__webglInit=!0,S.addEventListener("dispose",R));const Z=S.source;let Q=d.get(Z);Q===void 0&&(Q={},d.set(Z,Q));const j=U(S);if(j!==C.__cacheKey){Q[j]===void 0&&(Q[j]={texture:i.createTexture(),usedTimes:0},r.memory.textures++,V=!0),Q[j].usedTimes++;const At=Q[C.__cacheKey];At!==void 0&&(Q[C.__cacheKey].usedTimes--,At.usedTimes===0&&P(S)),C.__cacheKey=j,C.__webglTexture=Q[j].texture}return V}function jt(C,S,V){let Z=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Z=i.TEXTURE_3D);const Q=Wt(C,S),j=S.source;e.bindTexture(Z,C.__webglTexture,i.TEXTURE0+V);const At=n.get(j);if(j.version!==At.__version||Q===!0){e.activeTexture(i.TEXTURE0+V);const at=re.getPrimaries(re.workingColorSpace),ft=S.colorSpace===fi?null:re.getPrimaries(S.colorSpace),zt=S.colorSpace===fi||at===ft?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);let tt=_(S.image,!1,s.maxTextureSize);tt=Ot(S,tt);const ut=o.convert(S.format,S.colorSpace),Yt=o.convert(S.type);let Nt=v(S.internalFormat,ut,Yt,S.colorSpace,S.isVideoTexture);mt(Z,S);let pt;const kt=S.mipmaps,Xt=S.isVideoTexture!==!0,xe=At.__version===void 0||Q===!0,N=j.dataReady,et=y(S,tt);if(S.isDepthTexture)Nt=x(S.format===Ls,S.type),xe&&(Xt?e.texStorage2D(i.TEXTURE_2D,1,Nt,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,Nt,tt.width,tt.height,0,ut,Yt,null));else if(S.isDataTexture)if(kt.length>0){Xt&&xe&&e.texStorage2D(i.TEXTURE_2D,et,Nt,kt[0].width,kt[0].height);for(let $=0,K=kt.length;$<K;$++)pt=kt[$],Xt?N&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,pt.width,pt.height,ut,Yt,pt.data):e.texImage2D(i.TEXTURE_2D,$,Nt,pt.width,pt.height,0,ut,Yt,pt.data);S.generateMipmaps=!1}else Xt?(xe&&e.texStorage2D(i.TEXTURE_2D,et,Nt,tt.width,tt.height),N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,tt.width,tt.height,ut,Yt,tt.data)):e.texImage2D(i.TEXTURE_2D,0,Nt,tt.width,tt.height,0,ut,Yt,tt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Xt&&xe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,et,Nt,kt[0].width,kt[0].height,tt.depth);for(let $=0,K=kt.length;$<K;$++)if(pt=kt[$],S.format!==wn)if(ut!==null)if(Xt){if(N)if(S.layerUpdates.size>0){const it=kc(pt.width,pt.height,S.format,S.type);for(const Lt of S.layerUpdates){const Zt=pt.data.subarray(Lt*it/pt.data.BYTES_PER_ELEMENT,(Lt+1)*it/pt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,Lt,pt.width,pt.height,1,ut,Zt,0,0)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,pt.width,pt.height,tt.depth,ut,pt.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,Nt,pt.width,pt.height,tt.depth,0,pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xt?N&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,pt.width,pt.height,tt.depth,ut,Yt,pt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,$,Nt,pt.width,pt.height,tt.depth,0,ut,Yt,pt.data)}else{Xt&&xe&&e.texStorage2D(i.TEXTURE_2D,et,Nt,kt[0].width,kt[0].height);for(let $=0,K=kt.length;$<K;$++)pt=kt[$],S.format!==wn?ut!==null?Xt?N&&e.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,pt.width,pt.height,ut,pt.data):e.compressedTexImage2D(i.TEXTURE_2D,$,Nt,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xt?N&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,pt.width,pt.height,ut,Yt,pt.data):e.texImage2D(i.TEXTURE_2D,$,Nt,pt.width,pt.height,0,ut,Yt,pt.data)}else if(S.isDataArrayTexture)if(Xt){if(xe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,et,Nt,tt.width,tt.height,tt.depth),N)if(S.layerUpdates.size>0){const $=kc(tt.width,tt.height,S.format,S.type);for(const K of S.layerUpdates){const it=tt.data.subarray(K*$/tt.data.BYTES_PER_ELEMENT,(K+1)*$/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,tt.width,tt.height,1,ut,Yt,it)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,ut,Yt,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Nt,tt.width,tt.height,tt.depth,0,ut,Yt,tt.data);else if(S.isData3DTexture)Xt?(xe&&e.texStorage3D(i.TEXTURE_3D,et,Nt,tt.width,tt.height,tt.depth),N&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,ut,Yt,tt.data)):e.texImage3D(i.TEXTURE_3D,0,Nt,tt.width,tt.height,tt.depth,0,ut,Yt,tt.data);else if(S.isFramebufferTexture){if(xe)if(Xt)e.texStorage2D(i.TEXTURE_2D,et,Nt,tt.width,tt.height);else{let $=tt.width,K=tt.height;for(let it=0;it<et;it++)e.texImage2D(i.TEXTURE_2D,it,Nt,$,K,0,ut,Yt,null),$>>=1,K>>=1}}else if(kt.length>0){if(Xt&&xe){const $=Bt(kt[0]);e.texStorage2D(i.TEXTURE_2D,et,Nt,$.width,$.height)}for(let $=0,K=kt.length;$<K;$++)pt=kt[$],Xt?N&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,ut,Yt,pt):e.texImage2D(i.TEXTURE_2D,$,Nt,ut,Yt,pt);S.generateMipmaps=!1}else if(Xt){if(xe){const $=Bt(tt);e.texStorage2D(i.TEXTURE_2D,et,Nt,$.width,$.height)}N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut,Yt,tt)}else e.texImage2D(i.TEXTURE_2D,0,Nt,ut,Yt,tt);m(S)&&p(Z),At.__version=j.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function q(C,S,V){if(S.image.length!==6)return;const Z=Wt(C,S),Q=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+V);const j=n.get(Q);if(Q.version!==j.__version||Z===!0){e.activeTexture(i.TEXTURE0+V);const At=re.getPrimaries(re.workingColorSpace),at=S.colorSpace===fi?null:re.getPrimaries(S.colorSpace),ft=S.colorSpace===fi||At===at?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);const zt=S.isCompressedTexture||S.image[0].isCompressedTexture,tt=S.image[0]&&S.image[0].isDataTexture,ut=[];for(let K=0;K<6;K++)!zt&&!tt?ut[K]=_(S.image[K],!0,s.maxCubemapSize):ut[K]=tt?S.image[K].image:S.image[K],ut[K]=Ot(S,ut[K]);const Yt=ut[0],Nt=o.convert(S.format,S.colorSpace),pt=o.convert(S.type),kt=v(S.internalFormat,Nt,pt,S.colorSpace),Xt=S.isVideoTexture!==!0,xe=j.__version===void 0||Z===!0,N=Q.dataReady;let et=y(S,Yt);mt(i.TEXTURE_CUBE_MAP,S);let $;if(zt){Xt&&xe&&e.texStorage2D(i.TEXTURE_CUBE_MAP,et,kt,Yt.width,Yt.height);for(let K=0;K<6;K++){$=ut[K].mipmaps;for(let it=0;it<$.length;it++){const Lt=$[it];S.format!==wn?Nt!==null?Xt?N&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,it,0,0,Lt.width,Lt.height,Nt,Lt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,it,kt,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,it,0,0,Lt.width,Lt.height,Nt,pt,Lt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,it,kt,Lt.width,Lt.height,0,Nt,pt,Lt.data)}}}else{if($=S.mipmaps,Xt&&xe){$.length>0&&et++;const K=Bt(ut[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,et,kt,K.width,K.height)}for(let K=0;K<6;K++)if(tt){Xt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ut[K].width,ut[K].height,Nt,pt,ut[K].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,kt,ut[K].width,ut[K].height,0,Nt,pt,ut[K].data);for(let it=0;it<$.length;it++){const Zt=$[it].image[K].image;Xt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,it+1,0,0,Zt.width,Zt.height,Nt,pt,Zt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,it+1,kt,Zt.width,Zt.height,0,Nt,pt,Zt.data)}}else{Xt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Nt,pt,ut[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,kt,Nt,pt,ut[K]);for(let it=0;it<$.length;it++){const Lt=$[it];Xt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,it+1,0,0,Nt,pt,Lt.image[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,it+1,kt,Nt,pt,Lt.image[K])}}}m(S)&&p(i.TEXTURE_CUBE_MAP),j.__version=Q.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function J(C,S,V,Z,Q,j){const At=o.convert(V.format,V.colorSpace),at=o.convert(V.type),ft=v(V.internalFormat,At,at,V.colorSpace);if(!n.get(S).__hasExternalTextures){const tt=Math.max(1,S.width>>j),ut=Math.max(1,S.height>>j);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,j,ft,tt,ut,S.depth,0,At,at,null):e.texImage2D(Q,j,ft,tt,ut,0,At,at,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),Tt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,Q,n.get(V).__webglTexture,0,ce(S)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,Q,n.get(V).__webglTexture,j),e.bindFramebuffer(i.FRAMEBUFFER,null)}function dt(C,S,V){if(i.bindRenderbuffer(i.RENDERBUFFER,C),S.depthBuffer){const Z=S.depthTexture,Q=Z&&Z.isDepthTexture?Z.type:null,j=x(S.stencilBuffer,Q),At=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=ce(S);Tt(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,at,j,S.width,S.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,at,j,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,j,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,At,i.RENDERBUFFER,C)}else{const Z=S.textures;for(let Q=0;Q<Z.length;Q++){const j=Z[Q],At=o.convert(j.format,j.colorSpace),at=o.convert(j.type),ft=v(j.internalFormat,At,at,j.colorSpace),zt=ce(S);V&&Tt(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,zt,ft,S.width,S.height):Tt(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,zt,ft,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,ft,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function lt(C,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),z(S.depthTexture,0);const Z=n.get(S.depthTexture).__webglTexture,Q=ce(S);if(S.depthTexture.format===ys)Tt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(S.depthTexture.format===Ls)Tt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Pt(C){const S=n.get(C),V=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!S.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");lt(S.__webglFramebuffer,C)}else if(V){S.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[Z]),S.__webglDepthbuffer[Z]=i.createRenderbuffer(),dt(S.__webglDepthbuffer[Z],C,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=i.createRenderbuffer(),dt(S.__webglDepthbuffer,C,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ft(C,S,V){const Z=n.get(C);S!==void 0&&J(Z.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&Pt(C)}function wt(C){const S=C.texture,V=n.get(C),Z=n.get(S);C.addEventListener("dispose",w);const Q=C.textures,j=C.isWebGLCubeRenderTarget===!0,At=Q.length>1;if(At||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=S.version,r.memory.textures++),j){V.__webglFramebuffer=[];for(let at=0;at<6;at++)if(S.mipmaps&&S.mipmaps.length>0){V.__webglFramebuffer[at]=[];for(let ft=0;ft<S.mipmaps.length;ft++)V.__webglFramebuffer[at][ft]=i.createFramebuffer()}else V.__webglFramebuffer[at]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){V.__webglFramebuffer=[];for(let at=0;at<S.mipmaps.length;at++)V.__webglFramebuffer[at]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(At)for(let at=0,ft=Q.length;at<ft;at++){const zt=n.get(Q[at]);zt.__webglTexture===void 0&&(zt.__webglTexture=i.createTexture(),r.memory.textures++)}if(C.samples>0&&Tt(C)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let at=0;at<Q.length;at++){const ft=Q[at];V.__webglColorRenderbuffer[at]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[at]);const zt=o.convert(ft.format,ft.colorSpace),tt=o.convert(ft.type),ut=v(ft.internalFormat,zt,tt,ft.colorSpace,C.isXRRenderTarget===!0),Yt=ce(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Yt,ut,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.RENDERBUFFER,V.__webglColorRenderbuffer[at])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),dt(V.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),mt(i.TEXTURE_CUBE_MAP,S);for(let at=0;at<6;at++)if(S.mipmaps&&S.mipmaps.length>0)for(let ft=0;ft<S.mipmaps.length;ft++)J(V.__webglFramebuffer[at][ft],C,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,ft);else J(V.__webglFramebuffer[at],C,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);m(S)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(At){for(let at=0,ft=Q.length;at<ft;at++){const zt=Q[at],tt=n.get(zt);e.bindTexture(i.TEXTURE_2D,tt.__webglTexture),mt(i.TEXTURE_2D,zt),J(V.__webglFramebuffer,C,zt,i.COLOR_ATTACHMENT0+at,i.TEXTURE_2D,0),m(zt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let at=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(at=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(at,Z.__webglTexture),mt(at,S),S.mipmaps&&S.mipmaps.length>0)for(let ft=0;ft<S.mipmaps.length;ft++)J(V.__webglFramebuffer[ft],C,S,i.COLOR_ATTACHMENT0,at,ft);else J(V.__webglFramebuffer,C,S,i.COLOR_ATTACHMENT0,at,0);m(S)&&p(at),e.unbindTexture()}C.depthBuffer&&Pt(C)}function ve(C){const S=C.textures;for(let V=0,Z=S.length;V<Z;V++){const Q=S[V];if(m(Q)){const j=C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,At=n.get(Q).__webglTexture;e.bindTexture(j,At),p(j),e.unbindTexture()}}}const I=[],Ee=[];function ae(C){if(C.samples>0){if(Tt(C)===!1){const S=C.textures,V=C.width,Z=C.height;let Q=i.COLOR_BUFFER_BIT;const j=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,At=n.get(C),at=S.length>1;if(at)for(let ft=0;ft<S.length;ft++)e.bindFramebuffer(i.FRAMEBUFFER,At.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,At.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let ft=0;ft<S.length;ft++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),at){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,At.__webglColorRenderbuffer[ft]);const zt=n.get(S[ft]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,zt,0)}i.blitFramebuffer(0,0,V,Z,0,0,V,Z,Q,i.NEAREST),l===!0&&(I.length=0,Ee.length=0,I.push(i.COLOR_ATTACHMENT0+ft),C.depthBuffer&&C.resolveDepthBuffer===!1&&(I.push(j),Ee.push(j),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ee)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,I))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),at)for(let ft=0;ft<S.length;ft++){e.bindFramebuffer(i.FRAMEBUFFER,At.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.RENDERBUFFER,At.__webglColorRenderbuffer[ft]);const zt=n.get(S[ft]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,At.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.TEXTURE_2D,zt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const S=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function ce(C){return Math.min(s.maxSamples,C.samples)}function Tt(C){const S=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Te(C){const S=r.render.frame;h.get(C)!==S&&(h.set(C,S),C.update())}function Ot(C,S){const V=C.colorSpace,Z=C.format,Q=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||V!==yi&&V!==fi&&(re.getTransfer(V)===me?(Z!==wn||Q!==Zn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),S}function Bt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=D,this.resetTextureUnits=L,this.setTexture2D=z,this.setTexture2DArray=G,this.setTexture3D=X,this.setTextureCube=Y,this.rebindTextures=Ft,this.setupRenderTarget=wt,this.updateRenderTargetMipmap=ve,this.updateMultisampleRenderTarget=ae,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=J,this.useMultisampledRTT=Tt}function Mg(i,t){function e(n,s=fi){let o;const r=re.getTransfer(s);if(n===Zn)return i.UNSIGNED_BYTE;if(n===fl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===pl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===bh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===yh)return i.BYTE;if(n===Sh)return i.SHORT;if(n===ao)return i.UNSIGNED_SHORT;if(n===ul)return i.INT;if(n===Vi)return i.UNSIGNED_INT;if(n===$n)return i.FLOAT;if(n===go)return i.HALF_FLOAT;if(n===Eh)return i.ALPHA;if(n===Th)return i.RGB;if(n===wn)return i.RGBA;if(n===wh)return i.LUMINANCE;if(n===Ah)return i.LUMINANCE_ALPHA;if(n===ys)return i.DEPTH_COMPONENT;if(n===Ls)return i.DEPTH_STENCIL;if(n===Rh)return i.RED;if(n===ml)return i.RED_INTEGER;if(n===Ch)return i.RG;if(n===gl)return i.RG_INTEGER;if(n===_l)return i.RGBA_INTEGER;if(n===tr||n===er||n===nr||n===ir)if(r===me)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===tr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===er)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===nr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ir)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===tr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===er)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===nr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ir)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Sa||n===ba||n===Ea||n===Ta)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===Sa)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ba)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ea)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ta)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===wa||n===Aa||n===Ra)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(n===wa||n===Aa)return r===me?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===Ra)return r===me?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ca||n===Pa||n===La||n===Ia||n===Da||n===Ua||n===Na||n===Fa||n===Oa||n===ka||n===Ba||n===za||n===Ha||n===Ga)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Ca)return r===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Pa)return r===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===La)return r===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ia)return r===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Da)return r===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ua)return r===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Na)return r===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Fa)return r===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Oa)return r===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ka)return r===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ba)return r===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===za)return r===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ha)return r===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ga)return r===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===sr||n===Va||n===Wa)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(n===sr)return r===me?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Va)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Wa)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ph||n===Xa||n===qa||n===Ya)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(n===sr)return o.COMPRESSED_RED_RGTC1_EXT;if(n===Xa)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===qa)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ya)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ps?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class yg extends dn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class de extends He{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Sg={type:"move"};class aa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new de,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new de,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new de,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,o=null,r=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&o!==null&&(s=o),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Sg)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=o!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new de;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const bg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Eg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Tg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new $e,o=t.properties.get(s);o.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new vi({vertexShader:bg,fragmentShader:Eg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Jt(new Rr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wg extends ks{constructor(t,e){super();const n=this;let s=null,o=1,r=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=new Tg,m=e.getContextAttributes();let p=null,v=null;const x=[],y=[],R=new Kt;let w=null;const T=new dn;T.layers.enable(1),T.viewport=new Pe;const P=new dn;P.layers.enable(2),P.viewport=new Pe;const b=[T,P],M=new yg;M.layers.enable(1),M.layers.enable(2);let L=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let J=x[q];return J===void 0&&(J=new aa,x[q]=J),J.getTargetRaySpace()},this.getControllerGrip=function(q){let J=x[q];return J===void 0&&(J=new aa,x[q]=J),J.getGripSpace()},this.getHand=function(q){let J=x[q];return J===void 0&&(J=new aa,x[q]=J),J.getHandSpace()};function U(q){const J=y.indexOf(q.inputSource);if(J===-1)return;const dt=x[J];dt!==void 0&&(dt.update(q.inputSource,q.frame,c||r),dt.dispatchEvent({type:q.type,data:q.inputSource}))}function z(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",G);for(let q=0;q<x.length;q++){const J=y[q];J!==null&&(y[q]=null,x[q].disconnect(J))}L=null,D=null,_.reset(),t.setRenderTarget(p),f=null,d=null,u=null,s=null,v=null,jt.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",z),s.addEventListener("inputsourceschange",G),m.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(R),s.renderState.layers===void 0){const J={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:o};f=new XRWebGLLayer(s,e,J),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Wi(f.framebufferWidth,f.framebufferHeight,{format:wn,type:Zn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let J=null,dt=null,lt=null;m.depth&&(lt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,J=m.stencil?Ls:ys,dt=m.stencil?Ps:Vi);const Pt={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:o};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(Pt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),v=new Wi(d.textureWidth,d.textureHeight,{format:wn,type:Zn,depthTexture:new qh(d.textureWidth,d.textureHeight,dt,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(a),jt.setContext(s),jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function G(q){for(let J=0;J<q.removed.length;J++){const dt=q.removed[J],lt=y.indexOf(dt);lt>=0&&(y[lt]=null,x[lt].disconnect(dt))}for(let J=0;J<q.added.length;J++){const dt=q.added[J];let lt=y.indexOf(dt);if(lt===-1){for(let Ft=0;Ft<x.length;Ft++)if(Ft>=y.length){y.push(dt),lt=Ft;break}else if(y[Ft]===null){y[Ft]=dt,lt=Ft;break}if(lt===-1)break}const Pt=x[lt];Pt&&Pt.connect(dt)}}const X=new O,Y=new O;function W(q,J,dt){X.setFromMatrixPosition(J.matrixWorld),Y.setFromMatrixPosition(dt.matrixWorld);const lt=X.distanceTo(Y),Pt=J.projectionMatrix.elements,Ft=dt.projectionMatrix.elements,wt=Pt[14]/(Pt[10]-1),ve=Pt[14]/(Pt[10]+1),I=(Pt[9]+1)/Pt[5],Ee=(Pt[9]-1)/Pt[5],ae=(Pt[8]-1)/Pt[0],ce=(Ft[8]+1)/Ft[0],Tt=wt*ae,Te=wt*ce,Ot=lt/(-ae+ce),Bt=Ot*-ae;J.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Bt),q.translateZ(Ot),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert();const C=wt+Ot,S=ve+Ot,V=Tt-Bt,Z=Te+(lt-Bt),Q=I*ve/S*C,j=Ee*ve/S*C;q.projectionMatrix.makePerspective(V,Z,Q,j,C,S),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}function rt(q,J){J===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(J.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;_.texture!==null&&(q.near=_.depthNear,q.far=_.depthFar),M.near=P.near=T.near=q.near,M.far=P.far=T.far=q.far,(L!==M.near||D!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),L=M.near,D=M.far,T.near=L,T.far=D,P.near=L,P.far=D,T.updateProjectionMatrix(),P.updateProjectionMatrix(),q.updateProjectionMatrix());const J=q.parent,dt=M.cameras;rt(M,J);for(let lt=0;lt<dt.length;lt++)rt(dt[lt],J);dt.length===2?W(M,T,P):M.projectionMatrix.copy(T.projectionMatrix),ht(q,M,J)};function ht(q,J,dt){dt===null?q.matrix.copy(J.matrixWorld):(q.matrix.copy(dt.matrixWorld),q.matrix.invert(),q.matrix.multiply(J.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(J.projectionMatrix),q.projectionMatrixInverse.copy(J.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=$a*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let mt=null;function Wt(q,J){if(h=J.getViewerPose(c||r),g=J,h!==null){const dt=h.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let lt=!1;dt.length!==M.cameras.length&&(M.cameras.length=0,lt=!0);for(let Ft=0;Ft<dt.length;Ft++){const wt=dt[Ft];let ve=null;if(f!==null)ve=f.getViewport(wt);else{const Ee=u.getViewSubImage(d,wt);ve=Ee.viewport,Ft===0&&(t.setRenderTargetTextures(v,Ee.colorTexture,d.ignoreDepthValues?void 0:Ee.depthStencilTexture),t.setRenderTarget(v))}let I=b[Ft];I===void 0&&(I=new dn,I.layers.enable(Ft),I.viewport=new Pe,b[Ft]=I),I.matrix.fromArray(wt.transform.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale),I.projectionMatrix.fromArray(wt.projectionMatrix),I.projectionMatrixInverse.copy(I.projectionMatrix).invert(),I.viewport.set(ve.x,ve.y,ve.width,ve.height),Ft===0&&(M.matrix.copy(I.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),lt===!0&&M.cameras.push(I)}const Pt=s.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")){const Ft=u.getDepthInformation(dt[0]);Ft&&Ft.isValid&&Ft.texture&&_.init(t,Ft,s.renderState)}}for(let dt=0;dt<x.length;dt++){const lt=y[dt],Pt=x[dt];lt!==null&&Pt!==void 0&&Pt.update(lt,J,c||r)}mt&&mt(q,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}const jt=new Wh;jt.setAnimationLoop(Wt),this.setAnimationLoop=function(q){mt=q},this.dispose=function(){}}}const Ri=new xn,Ag=new be;function Rg(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Hh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,v,x,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?o(m,p):p.isMeshToonMaterial?(o(m,p),u(m,p)):p.isMeshPhongMaterial?(o(m,p),h(m,p)):p.isMeshStandardMaterial?(o(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(o(m,p),g(m,p)):p.isMeshDepthMaterial?o(m,p):p.isMeshDistanceMaterial?(o(m,p),_(m,p)):p.isMeshNormalMaterial?o(m,p):p.isLineBasicMaterial?(r(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,v,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function o(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===en&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===en&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=t.get(p),x=v.envMap,y=v.envMapRotation;x&&(m.envMap.value=x,Ri.copy(y),Ri.x*=-1,Ri.y*=-1,Ri.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Ri.y*=-1,Ri.z*=-1),m.envMapRotation.value.setFromMatrix4(Ag.makeRotationFromEuler(Ri)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function r(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,v,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=x*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===en&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const v=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Cg(i,t,e,n){let s={},o={},r=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,x){const y=x.program;n.uniformBlockBinding(v,y)}function c(v,x){let y=s[v.id];y===void 0&&(g(v),y=h(v),s[v.id]=y,v.addEventListener("dispose",m));const R=x.program;n.updateUBOMapping(v,R);const w=t.render.frame;o[v.id]!==w&&(d(v),o[v.id]=w)}function h(v){const x=u();v.__bindingPointIndex=x;const y=i.createBuffer(),R=v.__size,w=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,R,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,y),y}function u(){for(let v=0;v<a;v++)if(r.indexOf(v)===-1)return r.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const x=s[v.id],y=v.uniforms,R=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let w=0,T=y.length;w<T;w++){const P=Array.isArray(y[w])?y[w]:[y[w]];for(let b=0,M=P.length;b<M;b++){const L=P[b];if(f(L,w,b,R)===!0){const D=L.__offset,U=Array.isArray(L.value)?L.value:[L.value];let z=0;for(let G=0;G<U.length;G++){const X=U[G],Y=_(X);typeof X=="number"||typeof X=="boolean"?(L.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,D+z,L.__data)):X.isMatrix3?(L.__data[0]=X.elements[0],L.__data[1]=X.elements[1],L.__data[2]=X.elements[2],L.__data[3]=0,L.__data[4]=X.elements[3],L.__data[5]=X.elements[4],L.__data[6]=X.elements[5],L.__data[7]=0,L.__data[8]=X.elements[6],L.__data[9]=X.elements[7],L.__data[10]=X.elements[8],L.__data[11]=0):(X.toArray(L.__data,z),z+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,x,y,R){const w=v.value,T=x+"_"+y;if(R[T]===void 0)return typeof w=="number"||typeof w=="boolean"?R[T]=w:R[T]=w.clone(),!0;{const P=R[T];if(typeof w=="number"||typeof w=="boolean"){if(P!==w)return R[T]=w,!0}else if(P.equals(w)===!1)return P.copy(w),!0}return!1}function g(v){const x=v.uniforms;let y=0;const R=16;for(let T=0,P=x.length;T<P;T++){const b=Array.isArray(x[T])?x[T]:[x[T]];for(let M=0,L=b.length;M<L;M++){const D=b[M],U=Array.isArray(D.value)?D.value:[D.value];for(let z=0,G=U.length;z<G;z++){const X=U[z],Y=_(X),W=y%R,rt=W%Y.boundary,ht=W+rt;y+=rt,ht!==0&&R-ht<Y.storage&&(y+=R-ht),D.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=y,y+=Y.storage}}}const w=y%R;return w>0&&(y+=R-w),v.__size=y,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function m(v){const x=v.target;x.removeEventListener("dispose",m);const y=r.indexOf(x.__bindingPointIndex);r.splice(y,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete o[x.id]}function p(){for(const v in s)i.deleteBuffer(s[v]);r=[],s={},o={}}return{bind:l,update:c,dispose:p}}class Pg{constructor(t={}){const{canvas:e=vu(),context:n=null,depth:s=!0,stencil:o=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=r;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ln,this.toneMapping=_i,this.toneMappingExposure=1;const x=this;let y=!1,R=0,w=0,T=null,P=-1,b=null;const M=new Pe,L=new Pe;let D=null;const U=new Ct(0);let z=0,G=e.width,X=e.height,Y=1,W=null,rt=null;const ht=new Pe(0,0,G,X),mt=new Pe(0,0,G,X);let Wt=!1;const jt=new Ml;let q=!1,J=!1;const dt=new be,lt=new O,Pt=new Pe,Ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let wt=!1;function ve(){return T===null?Y:1}let I=n;function Ee(E,F){return e.getContext(E,F)}try{const E={alpha:!0,depth:s,stencil:o,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${hl}`),e.addEventListener("webglcontextlost",$,!1),e.addEventListener("webglcontextrestored",K,!1),e.addEventListener("webglcontextcreationerror",it,!1),I===null){const F="webgl2";if(I=Ee(F,E),I===null)throw Ee(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let ae,ce,Tt,Te,Ot,Bt,C,S,V,Z,Q,j,At,at,ft,zt,tt,ut,Yt,Nt,pt,kt,Xt,xe;function N(){ae=new Fm(I),ae.init(),kt=new Mg(I,ae),ce=new Pm(I,ae,t,kt),Tt=new _g(I),Te=new Bm(I),Ot=new ig,Bt=new vg(I,ae,Tt,Ot,ce,kt,Te),C=new Im(x),S=new Nm(x),V=new Xu(I),Xt=new Rm(I,V),Z=new Om(I,V,Te,Xt),Q=new Hm(I,Z,V,Te),Yt=new zm(I,ce,Bt),zt=new Lm(Ot),j=new ng(x,C,S,ae,ce,Xt,zt),At=new Rg(x,Ot),at=new og,ft=new dg(ae),ut=new Am(x,C,S,Tt,Q,d,l),tt=new gg(x,Q,ce),xe=new Cg(I,Te,ce,Tt),Nt=new Cm(I,ae,Te),pt=new km(I,ae,Te),Te.programs=j.programs,x.capabilities=ce,x.extensions=ae,x.properties=Ot,x.renderLists=at,x.shadowMap=tt,x.state=Tt,x.info=Te}N();const et=new wg(x,I);this.xr=et,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const E=ae.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=ae.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(E){E!==void 0&&(Y=E,this.setSize(G,X,!1))},this.getSize=function(E){return E.set(G,X)},this.setSize=function(E,F,B=!0){if(et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=E,X=F,e.width=Math.floor(E*Y),e.height=Math.floor(F*Y),B===!0&&(e.style.width=E+"px",e.style.height=F+"px"),this.setViewport(0,0,E,F)},this.getDrawingBufferSize=function(E){return E.set(G*Y,X*Y).floor()},this.setDrawingBufferSize=function(E,F,B){G=E,X=F,Y=B,e.width=Math.floor(E*B),e.height=Math.floor(F*B),this.setViewport(0,0,E,F)},this.getCurrentViewport=function(E){return E.copy(M)},this.getViewport=function(E){return E.copy(ht)},this.setViewport=function(E,F,B,H){E.isVector4?ht.set(E.x,E.y,E.z,E.w):ht.set(E,F,B,H),Tt.viewport(M.copy(ht).multiplyScalar(Y).round())},this.getScissor=function(E){return E.copy(mt)},this.setScissor=function(E,F,B,H){E.isVector4?mt.set(E.x,E.y,E.z,E.w):mt.set(E,F,B,H),Tt.scissor(L.copy(mt).multiplyScalar(Y).round())},this.getScissorTest=function(){return Wt},this.setScissorTest=function(E){Tt.setScissorTest(Wt=E)},this.setOpaqueSort=function(E){W=E},this.setTransparentSort=function(E){rt=E},this.getClearColor=function(E){return E.copy(ut.getClearColor())},this.setClearColor=function(){ut.setClearColor.apply(ut,arguments)},this.getClearAlpha=function(){return ut.getClearAlpha()},this.setClearAlpha=function(){ut.setClearAlpha.apply(ut,arguments)},this.clear=function(E=!0,F=!0,B=!0){let H=0;if(E){let k=!1;if(T!==null){const nt=T.texture.format;k=nt===_l||nt===gl||nt===ml}if(k){const nt=T.texture.type,ct=nt===Zn||nt===Vi||nt===ao||nt===Ps||nt===fl||nt===pl,gt=ut.getClearColor(),_t=ut.getClearAlpha(),It=gt.r,Ut=gt.g,Rt=gt.b;ct?(f[0]=It,f[1]=Ut,f[2]=Rt,f[3]=_t,I.clearBufferuiv(I.COLOR,0,f)):(g[0]=It,g[1]=Ut,g[2]=Rt,g[3]=_t,I.clearBufferiv(I.COLOR,0,g))}else H|=I.COLOR_BUFFER_BIT}F&&(H|=I.DEPTH_BUFFER_BIT),B&&(H|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",$,!1),e.removeEventListener("webglcontextrestored",K,!1),e.removeEventListener("webglcontextcreationerror",it,!1),at.dispose(),ft.dispose(),Ot.dispose(),C.dispose(),S.dispose(),Q.dispose(),Xt.dispose(),xe.dispose(),j.dispose(),et.dispose(),et.removeEventListener("sessionstart",An),et.removeEventListener("sessionend",Fl),Si.stop()};function $(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function K(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const E=Te.autoReset,F=tt.enabled,B=tt.autoUpdate,H=tt.needsUpdate,k=tt.type;N(),Te.autoReset=E,tt.enabled=F,tt.autoUpdate=B,tt.needsUpdate=H,tt.type=k}function it(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Lt(E){const F=E.target;F.removeEventListener("dispose",Lt),Zt(F)}function Zt(E){we(E),Ot.remove(E)}function we(E){const F=Ot.get(E).programs;F!==void 0&&(F.forEach(function(B){j.releaseProgram(B)}),E.isShaderMaterial&&j.releaseShaderCache(E))}this.renderBufferDirect=function(E,F,B,H,k,nt){F===null&&(F=Ft);const ct=k.isMesh&&k.matrixWorld.determinant()<0,gt=Md(E,F,B,H,k);Tt.setMaterial(H,ct);let _t=B.index,It=1;if(H.wireframe===!0){if(_t=Z.getWireframeAttribute(B),_t===void 0)return;It=2}const Ut=B.drawRange,Rt=B.attributes.position;let ie=Ut.start*It,Me=(Ut.start+Ut.count)*It;nt!==null&&(ie=Math.max(ie,nt.start*It),Me=Math.min(Me,(nt.start+nt.count)*It)),_t!==null?(ie=Math.max(ie,0),Me=Math.min(Me,_t.count)):Rt!=null&&(ie=Math.max(ie,0),Me=Math.min(Me,Rt.count));const ye=Me-ie;if(ye<0||ye===1/0)return;Xt.setup(k,H,gt,B,_t);let sn,se=Nt;if(_t!==null&&(sn=V.get(_t),se=pt,se.setIndex(sn)),k.isMesh)H.wireframe===!0?(Tt.setLineWidth(H.wireframeLinewidth*ve()),se.setMode(I.LINES)):se.setMode(I.TRIANGLES);else if(k.isLine){let St=H.linewidth;St===void 0&&(St=1),Tt.setLineWidth(St*ve()),k.isLineSegments?se.setMode(I.LINES):k.isLineLoop?se.setMode(I.LINE_LOOP):se.setMode(I.LINE_STRIP)}else k.isPoints?se.setMode(I.POINTS):k.isSprite&&se.setMode(I.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)se.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(ae.get("WEBGL_multi_draw"))se.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const St=k._multiDrawStarts,ke=k._multiDrawCounts,oe=k._multiDrawCount,Mn=_t?V.get(_t).bytesPerElement:1,$i=Ot.get(H).currentProgram.getUniforms();for(let on=0;on<oe;on++)$i.setValue(I,"_gl_DrawID",on),se.render(St[on]/Mn,ke[on])}else if(k.isInstancedMesh)se.renderInstances(ie,ye,k.count);else if(B.isInstancedBufferGeometry){const St=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,ke=Math.min(B.instanceCount,St);se.renderInstances(ie,ye,ke)}else se.render(ie,ye)};function Oe(E,F,B){E.transparent===!0&&E.side===Un&&E.forceSinglePass===!1?(E.side=en,E.needsUpdate=!0,yo(E,F,B),E.side=xi,E.needsUpdate=!0,yo(E,F,B),E.side=Un):yo(E,F,B)}this.compile=function(E,F,B=null){B===null&&(B=E),m=ft.get(B),m.init(F),v.push(m),B.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),E!==B&&E.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),m.setupLights();const H=new Set;return E.traverse(function(k){const nt=k.material;if(nt)if(Array.isArray(nt))for(let ct=0;ct<nt.length;ct++){const gt=nt[ct];Oe(gt,B,k),H.add(gt)}else Oe(nt,B,k),H.add(nt)}),v.pop(),m=null,H},this.compileAsync=function(E,F,B=null){const H=this.compile(E,F,B);return new Promise(k=>{function nt(){if(H.forEach(function(ct){Ot.get(ct).currentProgram.isReady()&&H.delete(ct)}),H.size===0){k(E);return}setTimeout(nt,10)}ae.get("KHR_parallel_shader_compile")!==null?nt():setTimeout(nt,10)})};let ne=null;function kn(E){ne&&ne(E)}function An(){Si.stop()}function Fl(){Si.start()}const Si=new Wh;Si.setAnimationLoop(kn),typeof self<"u"&&Si.setContext(self),this.setAnimationLoop=function(E){ne=E,et.setAnimationLoop(E),E===null?Si.stop():Si.start()},et.addEventListener("sessionstart",An),et.addEventListener("sessionend",Fl),this.render=function(E,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(F),F=et.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,F,T),m=ft.get(E,v.length),m.init(F),v.push(m),dt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),jt.setFromProjectionMatrix(dt),J=this.localClippingEnabled,q=zt.init(this.clippingPlanes,J),_=at.get(E,p.length),_.init(),p.push(_),et.enabled===!0&&et.isPresenting===!0){const nt=x.xr.getDepthSensingMesh();nt!==null&&Lr(nt,F,-1/0,x.sortObjects)}Lr(E,F,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(W,rt),wt=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,wt&&ut.addToRenderList(_,E),this.info.render.frame++,q===!0&&zt.beginShadows();const B=m.state.shadowsArray;tt.render(B,E,F),q===!0&&zt.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=_.opaque,k=_.transmissive;if(m.setupLights(),F.isArrayCamera){const nt=F.cameras;if(k.length>0)for(let ct=0,gt=nt.length;ct<gt;ct++){const _t=nt[ct];kl(H,k,E,_t)}wt&&ut.render(E);for(let ct=0,gt=nt.length;ct<gt;ct++){const _t=nt[ct];Ol(_,E,_t,_t.viewport)}}else k.length>0&&kl(H,k,E,F),wt&&ut.render(E),Ol(_,E,F);T!==null&&(Bt.updateMultisampleRenderTarget(T),Bt.updateRenderTargetMipmap(T)),E.isScene===!0&&E.onAfterRender(x,E,F),Xt.resetDefaultState(),P=-1,b=null,v.pop(),v.length>0?(m=v[v.length-1],q===!0&&zt.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function Lr(E,F,B,H){if(E.visible===!1)return;if(E.layers.test(F.layers)){if(E.isGroup)B=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(F);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||jt.intersectsSprite(E)){H&&Pt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(dt);const ct=Q.update(E),gt=E.material;gt.visible&&_.push(E,ct,gt,B,Pt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||jt.intersectsObject(E))){const ct=Q.update(E),gt=E.material;if(H&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Pt.copy(E.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),Pt.copy(ct.boundingSphere.center)),Pt.applyMatrix4(E.matrixWorld).applyMatrix4(dt)),Array.isArray(gt)){const _t=ct.groups;for(let It=0,Ut=_t.length;It<Ut;It++){const Rt=_t[It],ie=gt[Rt.materialIndex];ie&&ie.visible&&_.push(E,ct,ie,B,Pt.z,Rt)}}else gt.visible&&_.push(E,ct,gt,B,Pt.z,null)}}const nt=E.children;for(let ct=0,gt=nt.length;ct<gt;ct++)Lr(nt[ct],F,B,H)}function Ol(E,F,B,H){const k=E.opaque,nt=E.transmissive,ct=E.transparent;m.setupLightsView(B),q===!0&&zt.setGlobalState(x.clippingPlanes,B),H&&Tt.viewport(M.copy(H)),k.length>0&&Mo(k,F,B),nt.length>0&&Mo(nt,F,B),ct.length>0&&Mo(ct,F,B),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function kl(E,F,B,H){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[H.id]===void 0&&(m.state.transmissionRenderTarget[H.id]=new Wi(1,1,{generateMipmaps:!0,type:ae.has("EXT_color_buffer_half_float")||ae.has("EXT_color_buffer_float")?go:Zn,minFilter:Oi,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:re.workingColorSpace}));const nt=m.state.transmissionRenderTarget[H.id],ct=H.viewport||M;nt.setSize(ct.z,ct.w);const gt=x.getRenderTarget();x.setRenderTarget(nt),x.getClearColor(U),z=x.getClearAlpha(),z<1&&x.setClearColor(16777215,.5),x.clear(),wt&&ut.render(B);const _t=x.toneMapping;x.toneMapping=_i;const It=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),m.setupLightsView(H),q===!0&&zt.setGlobalState(x.clippingPlanes,H),Mo(E,B,H),Bt.updateMultisampleRenderTarget(nt),Bt.updateRenderTargetMipmap(nt),ae.has("WEBGL_multisampled_render_to_texture")===!1){let Ut=!1;for(let Rt=0,ie=F.length;Rt<ie;Rt++){const Me=F[Rt],ye=Me.object,sn=Me.geometry,se=Me.material,St=Me.group;if(se.side===Un&&ye.layers.test(H.layers)){const ke=se.side;se.side=en,se.needsUpdate=!0,Bl(ye,B,H,sn,se,St),se.side=ke,se.needsUpdate=!0,Ut=!0}}Ut===!0&&(Bt.updateMultisampleRenderTarget(nt),Bt.updateRenderTargetMipmap(nt))}x.setRenderTarget(gt),x.setClearColor(U,z),It!==void 0&&(H.viewport=It),x.toneMapping=_t}function Mo(E,F,B){const H=F.isScene===!0?F.overrideMaterial:null;for(let k=0,nt=E.length;k<nt;k++){const ct=E[k],gt=ct.object,_t=ct.geometry,It=H===null?ct.material:H,Ut=ct.group;gt.layers.test(B.layers)&&Bl(gt,F,B,_t,It,Ut)}}function Bl(E,F,B,H,k,nt){E.onBeforeRender(x,F,B,H,k,nt),E.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),k.transparent===!0&&k.side===Un&&k.forceSinglePass===!1?(k.side=en,k.needsUpdate=!0,x.renderBufferDirect(B,F,H,k,E,nt),k.side=xi,k.needsUpdate=!0,x.renderBufferDirect(B,F,H,k,E,nt),k.side=Un):x.renderBufferDirect(B,F,H,k,E,nt),E.onAfterRender(x,F,B,H,k,nt)}function yo(E,F,B){F.isScene!==!0&&(F=Ft);const H=Ot.get(E),k=m.state.lights,nt=m.state.shadowsArray,ct=k.state.version,gt=j.getParameters(E,k.state,nt,F,B),_t=j.getProgramCacheKey(gt);let It=H.programs;H.environment=E.isMeshStandardMaterial?F.environment:null,H.fog=F.fog,H.envMap=(E.isMeshStandardMaterial?S:C).get(E.envMap||H.environment),H.envMapRotation=H.environment!==null&&E.envMap===null?F.environmentRotation:E.envMapRotation,It===void 0&&(E.addEventListener("dispose",Lt),It=new Map,H.programs=It);let Ut=It.get(_t);if(Ut!==void 0){if(H.currentProgram===Ut&&H.lightsStateVersion===ct)return Hl(E,gt),Ut}else gt.uniforms=j.getUniforms(E),E.onBeforeCompile(gt,x),Ut=j.acquireProgram(gt,_t),It.set(_t,Ut),H.uniforms=gt.uniforms;const Rt=H.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Rt.clippingPlanes=zt.uniform),Hl(E,gt),H.needsLights=Sd(E),H.lightsStateVersion=ct,H.needsLights&&(Rt.ambientLightColor.value=k.state.ambient,Rt.lightProbe.value=k.state.probe,Rt.directionalLights.value=k.state.directional,Rt.directionalLightShadows.value=k.state.directionalShadow,Rt.spotLights.value=k.state.spot,Rt.spotLightShadows.value=k.state.spotShadow,Rt.rectAreaLights.value=k.state.rectArea,Rt.ltc_1.value=k.state.rectAreaLTC1,Rt.ltc_2.value=k.state.rectAreaLTC2,Rt.pointLights.value=k.state.point,Rt.pointLightShadows.value=k.state.pointShadow,Rt.hemisphereLights.value=k.state.hemi,Rt.directionalShadowMap.value=k.state.directionalShadowMap,Rt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Rt.spotShadowMap.value=k.state.spotShadowMap,Rt.spotLightMatrix.value=k.state.spotLightMatrix,Rt.spotLightMap.value=k.state.spotLightMap,Rt.pointShadowMap.value=k.state.pointShadowMap,Rt.pointShadowMatrix.value=k.state.pointShadowMatrix),H.currentProgram=Ut,H.uniformsList=null,Ut}function zl(E){if(E.uniformsList===null){const F=E.currentProgram.getUniforms();E.uniformsList=rr.seqWithValue(F.seq,E.uniforms)}return E.uniformsList}function Hl(E,F){const B=Ot.get(E);B.outputColorSpace=F.outputColorSpace,B.batching=F.batching,B.batchingColor=F.batchingColor,B.instancing=F.instancing,B.instancingColor=F.instancingColor,B.instancingMorph=F.instancingMorph,B.skinning=F.skinning,B.morphTargets=F.morphTargets,B.morphNormals=F.morphNormals,B.morphColors=F.morphColors,B.morphTargetsCount=F.morphTargetsCount,B.numClippingPlanes=F.numClippingPlanes,B.numIntersection=F.numClipIntersection,B.vertexAlphas=F.vertexAlphas,B.vertexTangents=F.vertexTangents,B.toneMapping=F.toneMapping}function Md(E,F,B,H,k){F.isScene!==!0&&(F=Ft),Bt.resetTextureUnits();const nt=F.fog,ct=H.isMeshStandardMaterial?F.environment:null,gt=T===null?x.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:yi,_t=(H.isMeshStandardMaterial?S:C).get(H.envMap||ct),It=H.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ut=!!B.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Rt=!!B.morphAttributes.position,ie=!!B.morphAttributes.normal,Me=!!B.morphAttributes.color;let ye=_i;H.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(ye=x.toneMapping);const sn=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,se=sn!==void 0?sn.length:0,St=Ot.get(H),ke=m.state.lights;if(q===!0&&(J===!0||E!==b)){const pn=E===b&&H.id===P;zt.setState(H,E,pn)}let oe=!1;H.version===St.__version?(St.needsLights&&St.lightsStateVersion!==ke.state.version||St.outputColorSpace!==gt||k.isBatchedMesh&&St.batching===!1||!k.isBatchedMesh&&St.batching===!0||k.isBatchedMesh&&St.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&St.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&St.instancing===!1||!k.isInstancedMesh&&St.instancing===!0||k.isSkinnedMesh&&St.skinning===!1||!k.isSkinnedMesh&&St.skinning===!0||k.isInstancedMesh&&St.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&St.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&St.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&St.instancingMorph===!1&&k.morphTexture!==null||St.envMap!==_t||H.fog===!0&&St.fog!==nt||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==zt.numPlanes||St.numIntersection!==zt.numIntersection)||St.vertexAlphas!==It||St.vertexTangents!==Ut||St.morphTargets!==Rt||St.morphNormals!==ie||St.morphColors!==Me||St.toneMapping!==ye||St.morphTargetsCount!==se)&&(oe=!0):(oe=!0,St.__version=H.version);let Mn=St.currentProgram;oe===!0&&(Mn=yo(H,F,k));let $i=!1,on=!1,Ir=!1;const Ae=Mn.getUniforms(),Jn=St.uniforms;if(Tt.useProgram(Mn.program)&&($i=!0,on=!0,Ir=!0),H.id!==P&&(P=H.id,on=!0),$i||b!==E){Ae.setValue(I,"projectionMatrix",E.projectionMatrix),Ae.setValue(I,"viewMatrix",E.matrixWorldInverse);const pn=Ae.map.cameraPosition;pn!==void 0&&pn.setValue(I,lt.setFromMatrixPosition(E.matrixWorld)),ce.logarithmicDepthBuffer&&Ae.setValue(I,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Ae.setValue(I,"isOrthographic",E.isOrthographicCamera===!0),b!==E&&(b=E,on=!0,Ir=!0)}if(k.isSkinnedMesh){Ae.setOptional(I,k,"bindMatrix"),Ae.setOptional(I,k,"bindMatrixInverse");const pn=k.skeleton;pn&&(pn.boneTexture===null&&pn.computeBoneTexture(),Ae.setValue(I,"boneTexture",pn.boneTexture,Bt))}k.isBatchedMesh&&(Ae.setOptional(I,k,"batchingTexture"),Ae.setValue(I,"batchingTexture",k._matricesTexture,Bt),Ae.setOptional(I,k,"batchingIdTexture"),Ae.setValue(I,"batchingIdTexture",k._indirectTexture,Bt),Ae.setOptional(I,k,"batchingColorTexture"),k._colorsTexture!==null&&Ae.setValue(I,"batchingColorTexture",k._colorsTexture,Bt));const Dr=B.morphAttributes;if((Dr.position!==void 0||Dr.normal!==void 0||Dr.color!==void 0)&&Yt.update(k,B,Mn),(on||St.receiveShadow!==k.receiveShadow)&&(St.receiveShadow=k.receiveShadow,Ae.setValue(I,"receiveShadow",k.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Jn.envMap.value=_t,Jn.flipEnvMap.value=_t.isCubeTexture&&_t.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&F.environment!==null&&(Jn.envMapIntensity.value=F.environmentIntensity),on&&(Ae.setValue(I,"toneMappingExposure",x.toneMappingExposure),St.needsLights&&yd(Jn,Ir),nt&&H.fog===!0&&At.refreshFogUniforms(Jn,nt),At.refreshMaterialUniforms(Jn,H,Y,X,m.state.transmissionRenderTarget[E.id]),rr.upload(I,zl(St),Jn,Bt)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(rr.upload(I,zl(St),Jn,Bt),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Ae.setValue(I,"center",k.center),Ae.setValue(I,"modelViewMatrix",k.modelViewMatrix),Ae.setValue(I,"normalMatrix",k.normalMatrix),Ae.setValue(I,"modelMatrix",k.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const pn=H.uniformsGroups;for(let Ur=0,bd=pn.length;Ur<bd;Ur++){const Gl=pn[Ur];xe.update(Gl,Mn),xe.bind(Gl,Mn)}}return Mn}function yd(E,F){E.ambientLightColor.needsUpdate=F,E.lightProbe.needsUpdate=F,E.directionalLights.needsUpdate=F,E.directionalLightShadows.needsUpdate=F,E.pointLights.needsUpdate=F,E.pointLightShadows.needsUpdate=F,E.spotLights.needsUpdate=F,E.spotLightShadows.needsUpdate=F,E.rectAreaLights.needsUpdate=F,E.hemisphereLights.needsUpdate=F}function Sd(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(E,F,B){Ot.get(E.texture).__webglTexture=F,Ot.get(E.depthTexture).__webglTexture=B;const H=Ot.get(E);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=B===void 0,H.__autoAllocateDepthBuffer||ae.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,F){const B=Ot.get(E);B.__webglFramebuffer=F,B.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(E,F=0,B=0){T=E,R=F,w=B;let H=!0,k=null,nt=!1,ct=!1;if(E){const _t=Ot.get(E);_t.__useDefaultFramebuffer!==void 0?(Tt.bindFramebuffer(I.FRAMEBUFFER,null),H=!1):_t.__webglFramebuffer===void 0?Bt.setupRenderTarget(E):_t.__hasExternalTextures&&Bt.rebindTextures(E,Ot.get(E.texture).__webglTexture,Ot.get(E.depthTexture).__webglTexture);const It=E.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(ct=!0);const Ut=Ot.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ut[F])?k=Ut[F][B]:k=Ut[F],nt=!0):E.samples>0&&Bt.useMultisampledRTT(E)===!1?k=Ot.get(E).__webglMultisampledFramebuffer:Array.isArray(Ut)?k=Ut[B]:k=Ut,M.copy(E.viewport),L.copy(E.scissor),D=E.scissorTest}else M.copy(ht).multiplyScalar(Y).floor(),L.copy(mt).multiplyScalar(Y).floor(),D=Wt;if(Tt.bindFramebuffer(I.FRAMEBUFFER,k)&&H&&Tt.drawBuffers(E,k),Tt.viewport(M),Tt.scissor(L),Tt.setScissorTest(D),nt){const _t=Ot.get(E.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+F,_t.__webglTexture,B)}else if(ct){const _t=Ot.get(E.texture),It=F||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,_t.__webglTexture,B||0,It)}P=-1},this.readRenderTargetPixels=function(E,F,B,H,k,nt,ct){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let gt=Ot.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ct!==void 0&&(gt=gt[ct]),gt){Tt.bindFramebuffer(I.FRAMEBUFFER,gt);try{const _t=E.texture,It=_t.format,Ut=_t.type;if(!ce.textureFormatReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ce.textureTypeReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=E.width-H&&B>=0&&B<=E.height-k&&I.readPixels(F,B,H,k,kt.convert(It),kt.convert(Ut),nt)}finally{const _t=T!==null?Ot.get(T).__webglFramebuffer:null;Tt.bindFramebuffer(I.FRAMEBUFFER,_t)}}},this.readRenderTargetPixelsAsync=async function(E,F,B,H,k,nt,ct){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let gt=Ot.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ct!==void 0&&(gt=gt[ct]),gt){Tt.bindFramebuffer(I.FRAMEBUFFER,gt);try{const _t=E.texture,It=_t.format,Ut=_t.type;if(!ce.textureFormatReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ce.textureTypeReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=E.width-H&&B>=0&&B<=E.height-k){const Rt=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Rt),I.bufferData(I.PIXEL_PACK_BUFFER,nt.byteLength,I.STREAM_READ),I.readPixels(F,B,H,k,kt.convert(It),kt.convert(Ut),0),I.flush();const ie=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);await Mu(I,ie,4);try{I.bindBuffer(I.PIXEL_PACK_BUFFER,Rt),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,nt)}finally{I.deleteBuffer(Rt),I.deleteSync(ie)}return nt}}finally{const _t=T!==null?Ot.get(T).__webglFramebuffer:null;Tt.bindFramebuffer(I.FRAMEBUFFER,_t)}}},this.copyFramebufferToTexture=function(E,F=null,B=0){E.isTexture!==!0&&(io("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,E=arguments[1]);const H=Math.pow(2,-B),k=Math.floor(E.image.width*H),nt=Math.floor(E.image.height*H),ct=F!==null?F.x:0,gt=F!==null?F.y:0;Bt.setTexture2D(E,0),I.copyTexSubImage2D(I.TEXTURE_2D,B,0,0,ct,gt,k,nt),Tt.unbindTexture()},this.copyTextureToTexture=function(E,F,B=null,H=null,k=0){E.isTexture!==!0&&(io("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,E=arguments[1],F=arguments[2],k=arguments[3]||0,B=null);let nt,ct,gt,_t,It,Ut;B!==null?(nt=B.max.x-B.min.x,ct=B.max.y-B.min.y,gt=B.min.x,_t=B.min.y):(nt=E.image.width,ct=E.image.height,gt=0,_t=0),H!==null?(It=H.x,Ut=H.y):(It=0,Ut=0);const Rt=kt.convert(F.format),ie=kt.convert(F.type);Bt.setTexture2D(F,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,F.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,F.unpackAlignment);const Me=I.getParameter(I.UNPACK_ROW_LENGTH),ye=I.getParameter(I.UNPACK_IMAGE_HEIGHT),sn=I.getParameter(I.UNPACK_SKIP_PIXELS),se=I.getParameter(I.UNPACK_SKIP_ROWS),St=I.getParameter(I.UNPACK_SKIP_IMAGES),ke=E.isCompressedTexture?E.mipmaps[k]:E.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,ke.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ke.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,gt),I.pixelStorei(I.UNPACK_SKIP_ROWS,_t),E.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,k,It,Ut,nt,ct,Rt,ie,ke.data):E.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,k,It,Ut,ke.width,ke.height,Rt,ke.data):I.texSubImage2D(I.TEXTURE_2D,k,It,Ut,nt,ct,Rt,ie,ke),I.pixelStorei(I.UNPACK_ROW_LENGTH,Me),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ye),I.pixelStorei(I.UNPACK_SKIP_PIXELS,sn),I.pixelStorei(I.UNPACK_SKIP_ROWS,se),I.pixelStorei(I.UNPACK_SKIP_IMAGES,St),k===0&&F.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),Tt.unbindTexture()},this.copyTextureToTexture3D=function(E,F,B=null,H=null,k=0){E.isTexture!==!0&&(io("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,H=arguments[1]||null,E=arguments[2],F=arguments[3],k=arguments[4]||0);let nt,ct,gt,_t,It,Ut,Rt,ie,Me;const ye=E.isCompressedTexture?E.mipmaps[k]:E.image;B!==null?(nt=B.max.x-B.min.x,ct=B.max.y-B.min.y,gt=B.max.z-B.min.z,_t=B.min.x,It=B.min.y,Ut=B.min.z):(nt=ye.width,ct=ye.height,gt=ye.depth,_t=0,It=0,Ut=0),H!==null?(Rt=H.x,ie=H.y,Me=H.z):(Rt=0,ie=0,Me=0);const sn=kt.convert(F.format),se=kt.convert(F.type);let St;if(F.isData3DTexture)Bt.setTexture3D(F,0),St=I.TEXTURE_3D;else if(F.isDataArrayTexture||F.isCompressedArrayTexture)Bt.setTexture2DArray(F,0),St=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,F.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,F.unpackAlignment);const ke=I.getParameter(I.UNPACK_ROW_LENGTH),oe=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Mn=I.getParameter(I.UNPACK_SKIP_PIXELS),$i=I.getParameter(I.UNPACK_SKIP_ROWS),on=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,ye.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ye.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,_t),I.pixelStorei(I.UNPACK_SKIP_ROWS,It),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ut),E.isDataTexture||E.isData3DTexture?I.texSubImage3D(St,k,Rt,ie,Me,nt,ct,gt,sn,se,ye.data):F.isCompressedArrayTexture?I.compressedTexSubImage3D(St,k,Rt,ie,Me,nt,ct,gt,sn,ye.data):I.texSubImage3D(St,k,Rt,ie,Me,nt,ct,gt,sn,se,ye),I.pixelStorei(I.UNPACK_ROW_LENGTH,ke),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,oe),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Mn),I.pixelStorei(I.UNPACK_SKIP_ROWS,$i),I.pixelStorei(I.UNPACK_SKIP_IMAGES,on),k===0&&F.generateMipmaps&&I.generateMipmap(St),Tt.unbindTexture()},this.initRenderTarget=function(E){Ot.get(E).__webglFramebuffer===void 0&&Bt.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Bt.setTextureCube(E,0):E.isData3DTexture?Bt.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Bt.setTexture2DArray(E,0):Bt.setTexture2D(E,0),Tt.unbindTexture()},this.resetState=function(){R=0,w=0,T=null,Tt.reset(),Xt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===xl?"display-p3":"srgb",e.unpackColorSpace=re.workingColorSpace===wr?"display-p3":"srgb"}}class Sl{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ct(t),this.near=e,this.far=n}clone(){return new Sl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Zh extends He{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xn,this.environmentIntensity=1,this.environmentRotation=new xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Jh extends Bs{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ct(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const gr=new O,_r=new O,Bc=new be,Ys=new Fh,Wo=new Ar,la=new O,zc=new O;class Lg extends He{constructor(t=new vn,e=new Jh){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,o=e.count;s<o;s++)gr.fromBufferAttribute(e,s-1),_r.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=gr.distanceTo(_r);t.setAttribute("lineDistance",new Ce(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,o=t.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Wo.copy(n.boundingSphere),Wo.applyMatrix4(s),Wo.radius+=o,t.ray.intersectsSphere(Wo)===!1)return;Bc.copy(s).invert(),Ys.copy(t.ray).applyMatrix4(Bc);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let _=f,m=g-1;_<m;_+=c){const p=h.getX(_),v=h.getX(_+1),x=Xo(this,t,Ys,l,p,v);x&&e.push(x)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=Xo(this,t,Ys,l,_,m);p&&e.push(p)}}else{const f=Math.max(0,r.start),g=Math.min(d.count,r.start+r.count);for(let _=f,m=g-1;_<m;_+=c){const p=Xo(this,t,Ys,l,_,_+1);p&&e.push(p)}if(this.isLineLoop){const _=Xo(this,t,Ys,l,g-1,f);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function Xo(i,t,e,n,s,o){const r=i.geometry.attributes.position;if(gr.fromBufferAttribute(r,s),_r.fromBufferAttribute(r,o),e.distanceSqToSegment(gr,_r,la,zc)>n)return;la.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(la);if(!(l<t.near||l>t.far))return{distance:l,point:zc.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,object:i}}const Hc=new O,Gc=new O;class Ig extends Lg{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,o=e.count;s<o;s+=2)Hc.fromBufferAttribute(e,s),Gc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Hc.distanceTo(Gc);t.setAttribute("lineDistance",new Ce(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Qh extends $e{constructor(t,e,n,s,o,r,a,l,c){super(t,e,n,s,o,r,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class xr extends vn{constructor(t=1,e=1,n=1,s=32,o=1,r=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:o,openEnded:r,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),o=Math.floor(o);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;v(),r===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new Ce(u,3)),this.setAttribute("normal",new Ce(d,3)),this.setAttribute("uv",new Ce(f,2));function v(){const y=new O,R=new O;let w=0;const T=(e-t)/n;for(let P=0;P<=o;P++){const b=[],M=P/o,L=M*(e-t)+t;for(let D=0;D<=s;D++){const U=D/s,z=U*l+a,G=Math.sin(z),X=Math.cos(z);R.x=L*G,R.y=-M*n+m,R.z=L*X,u.push(R.x,R.y,R.z),y.set(G,T,X).normalize(),d.push(y.x,y.y,y.z),f.push(U,1-M),b.push(g++)}_.push(b)}for(let P=0;P<s;P++)for(let b=0;b<o;b++){const M=_[b][P],L=_[b+1][P],D=_[b+1][P+1],U=_[b][P+1];h.push(M,L,U),h.push(L,D,U),w+=6}c.addGroup(p,w,0),p+=w}function x(y){const R=g,w=new Kt,T=new O;let P=0;const b=y===!0?t:e,M=y===!0?1:-1;for(let D=1;D<=s;D++)u.push(0,m*M,0),d.push(0,M,0),f.push(.5,.5),g++;const L=g;for(let D=0;D<=s;D++){const z=D/s*l+a,G=Math.cos(z),X=Math.sin(z);T.x=b*X,T.y=m*M,T.z=b*G,u.push(T.x,T.y,T.z),d.push(0,M,0),w.x=G*.5+.5,w.y=X*.5*M+.5,f.push(w.x,w.y),g++}for(let D=0;D<s;D++){const U=R+D,z=L+D;y===!0?h.push(z,z+1,U):h.push(z+1,z,U),P+=3}c.addGroup(p,P,y===!0?1:2),p+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xr(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const qo=new O,Yo=new O,ca=new O,$o=new Tn;class Dg extends vn{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),o=Math.cos(or*e),r=t.getIndex(),a=t.getAttribute("position"),l=r?r.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let g=0;g<l;g+=3){r?(c[0]=r.getX(g),c[1]=r.getX(g+1),c[2]=r.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:_,b:m,c:p}=$o;if(_.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),$o.getNormal(ca),u[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let v=0;v<3;v++){const x=(v+1)%3,y=u[v],R=u[x],w=$o[h[v]],T=$o[h[x]],P=`${y}_${R}`,b=`${R}_${y}`;b in d&&d[b]?(ca.dot(d[b].normal)<=o&&(f.push(w.x,w.y,w.z),f.push(T.x,T.y,T.z)),d[b]=null):P in d||(d[P]={index0:c[v],index1:c[x],normal:ca.clone()})}}for(const g in d)if(d[g]){const{index0:_,index1:m}=d[g];qo.fromBufferAttribute(a,_),Yo.fromBufferAttribute(a,m),f.push(qo.x,qo.y,qo.z),f.push(Yo.x,Yo.y,Yo.z)}this.setAttribute("position",new Ce(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class bl extends vn{constructor(t=1,e=32,n=16,s=0,o=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:o,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(r+a,Math.PI);let c=0;const h=[],u=new O,d=new O,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const v=[],x=p/n;let y=0;p===0&&r===0?y=.5/e:p===n&&l===Math.PI&&(y=-.5/e);for(let R=0;R<=e;R++){const w=R/e;u.x=-t*Math.cos(s+w*o)*Math.sin(r+x*a),u.y=t*Math.cos(r+x*a),u.z=t*Math.sin(s+w*o)*Math.sin(r+x*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(w+y,1-x),v.push(c++)}h.push(v)}for(let p=0;p<n;p++)for(let v=0;v<e;v++){const x=h[p][v+1],y=h[p][v],R=h[p+1][v],w=h[p+1][v+1];(p!==0||r>0)&&f.push(x,y,w),(p!==n-1||l<Math.PI)&&f.push(y,R,w)}this.setIndex(f),this.setAttribute("position",new Ce(g,3)),this.setAttribute("normal",new Ce(_,3)),this.setAttribute("uv",new Ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bl(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Qe extends Bs{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lh,this.normalScale=new Kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=dl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class td extends He{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ct(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const ha=new be,Vc=new O,Wc=new O;class Ug{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Kt(512,512),this.map=null,this.mapPass=null,this.matrix=new be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ml,this._frameExtents=new Kt(1,1),this._viewportCount=1,this._viewports=[new Pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Vc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Vc),Wc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Wc),e.updateMatrixWorld(),ha.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ha),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ha)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Ng extends Ug{constructor(){super(new Xh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class vr extends td{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(He.DEFAULT_UP),this.updateMatrix(),this.target=new He,this.shadow=new Ng}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class ed extends td{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:hl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=hl);const nd=Math.sqrt(3),Fg=.5*(nd-1),$s=(3-nd)/6,Og=1/3,Rn=1/6,so=i=>Math.floor(i)|0,Xc=new Float64Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]),da=new Float64Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]);function kg(i=Math.random){const t=id(i),e=new Float64Array(t).map(s=>Xc[s%12*2]),n=new Float64Array(t).map(s=>Xc[s%12*2+1]);return function(o,r){let a=0,l=0,c=0;const h=(o+r)*Fg,u=so(o+h),d=so(r+h),f=(u+d)*$s,g=u-f,_=d-f,m=o-g,p=r-_;let v,x;m>p?(v=1,x=0):(v=0,x=1);const y=m-v+$s,R=p-x+$s,w=m-1+2*$s,T=p-1+2*$s,P=u&255,b=d&255;let M=.5-m*m-p*p;if(M>=0){const U=P+t[b],z=e[U],G=n[U];M*=M,a=M*M*(z*m+G*p)}let L=.5-y*y-R*R;if(L>=0){const U=P+v+t[b+x],z=e[U],G=n[U];L*=L,l=L*L*(z*y+G*R)}let D=.5-w*w-T*T;if(D>=0){const U=P+1+t[b+1],z=e[U],G=n[U];D*=D,c=D*D*(z*w+G*T)}return 70*(a+l+c)}}function Bg(i=Math.random){const t=id(i),e=new Float64Array(t).map(o=>da[o%12*3]),n=new Float64Array(t).map(o=>da[o%12*3+1]),s=new Float64Array(t).map(o=>da[o%12*3+2]);return function(r,a,l){let c,h,u,d;const f=(r+a+l)*Og,g=so(r+f),_=so(a+f),m=so(l+f),p=(g+_+m)*Rn,v=g-p,x=_-p,y=m-p,R=r-v,w=a-x,T=l-y;let P,b,M,L,D,U;R>=w?w>=T?(P=1,b=0,M=0,L=1,D=1,U=0):R>=T?(P=1,b=0,M=0,L=1,D=0,U=1):(P=0,b=0,M=1,L=1,D=0,U=1):w<T?(P=0,b=0,M=1,L=0,D=1,U=1):R<T?(P=0,b=1,M=0,L=0,D=1,U=1):(P=0,b=1,M=0,L=1,D=1,U=0);const z=R-P+Rn,G=w-b+Rn,X=T-M+Rn,Y=R-L+2*Rn,W=w-D+2*Rn,rt=T-U+2*Rn,ht=R-1+3*Rn,mt=w-1+3*Rn,Wt=T-1+3*Rn,jt=g&255,q=_&255,J=m&255;let dt=.6-R*R-w*w-T*T;if(dt<0)c=0;else{const wt=jt+t[q+t[J]];dt*=dt,c=dt*dt*(e[wt]*R+n[wt]*w+s[wt]*T)}let lt=.6-z*z-G*G-X*X;if(lt<0)h=0;else{const wt=jt+P+t[q+b+t[J+M]];lt*=lt,h=lt*lt*(e[wt]*z+n[wt]*G+s[wt]*X)}let Pt=.6-Y*Y-W*W-rt*rt;if(Pt<0)u=0;else{const wt=jt+L+t[q+D+t[J+U]];Pt*=Pt,u=Pt*Pt*(e[wt]*Y+n[wt]*W+s[wt]*rt)}let Ft=.6-ht*ht-mt*mt-Wt*Wt;if(Ft<0)d=0;else{const wt=jt+1+t[q+1+t[J+1]];Ft*=Ft,d=Ft*Ft*(e[wt]*ht+n[wt]*mt+s[wt]*Wt)}return 32*(c+h+u+d)}}function id(i){const e=new Uint8Array(512);for(let n=0;n<512/2;n++)e[n]=n;for(let n=0;n<512/2-1;n++){const s=n+~~(i()*(256-n)),o=e[n];e[n]=e[s],e[s]=o}for(let n=256;n<512;n++)e[n]=e[n-256];return e}const ee=0,lo=1,co=2,Ye=3,Hi=4,Cn=5,sd=6,El=7,Be=8,Ds=9,qc=10,Ze=11,od=12,ja=14,Mr=15,Za=16,rd=17,Tl=18,wl=19,Al=20,Ko=22,zg=23,yr=25,ci=26,Hg=27,Dn=29,ar=30,bs=31,Us=32,Ns=33,Rl=34,ui=35,ps=36,ad=37,to=38,hi=39,lr=40,je=41,Li=42,eo=43,Ja=44,ld=45,Qa=46,ho=47,cd=48,hd=49,uo=50,ki=51,fo=52,Qt=53,hn=54,po=55,Bi=56,zi=57,_e=60,ms=61,Cl=62,We=63,Xe=64,dd=65,Pl=66,Sr=67,ud=68,Ll=69,Il=70,tl=71,fd=72,Dl=73,qi=[null,{name:"Grass",solid:!0,action:"dig",breakTime:.4,requiresTool:!1,handMult:2.5,textures:{top:[0,0],side:[1,0],bottom:[2,0]},color:"#5d9c33"},{name:"Dirt",solid:!0,action:"dig",breakTime:.4,requiresTool:!1,handMult:2.5,textures:{all:[2,0]},color:"#8B5E3C"},{name:"Stone",solid:!0,action:"mine",breakTime:1.5,requiresTool:!0,textures:{all:[3,0]},color:"#888"},{name:"Sand",solid:!0,action:"dig",breakTime:.5,requiresTool:!1,handMult:2,textures:{all:[4,0]},color:"#e8d99b"},{name:"Gravel",solid:!0,action:"dig",breakTime:.6,requiresTool:!1,handMult:2,textures:{all:[5,0]},color:"#999"},{name:"Wood Log",solid:!0,action:"chop",breakTime:2,requiresTool:!1,handMult:4,textures:{top:[6,0],side:[7,0],bottom:[6,0]},color:"#6b4c2a"},{name:"Leaves",solid:!0,action:"break",breakTime:.2,requiresTool:!1,handMult:1,transparent:!0,textures:{all:[8,0]},color:"#2d7a1f"},{name:"Planks",solid:!0,action:"chop",breakTime:1.5,requiresTool:!1,handMult:3.5,textures:{all:[9,0]},color:"#c8a264"},{name:"Cobblestone",solid:!0,action:"mine",breakTime:2,requiresTool:!0,textures:{all:[10,0]},color:"#777"},{name:"Bedrock",solid:!0,action:"mine",breakTime:999,requiresTool:!0,unbreakable:!0,textures:{all:[11,0]},color:"#333"},{name:"Glass",solid:!0,action:"break",breakTime:.3,requiresTool:!1,handMult:1,transparent:!0,textures:{all:[13,0]},color:"#9dcfe8"},{name:"Snow Block",solid:!0,action:"dig",breakTime:.3,requiresTool:!1,handMult:1.5,textures:{top:[12,0],side:[12,0],bottom:[2,0]},color:"#eef"},{name:"Ice",solid:!0,action:"mine",breakTime:.5,requiresTool:!1,handMult:3,transparent:!0,textures:{all:[14,0]},color:"#9bc8e8"},{name:"Water",solid:!1,action:"break",breakTime:.1,requiresTool:!1,handMult:1,transparent:!0,liquid:!0,textures:{all:[15,0]},color:"#2255aa"},{name:"Crafting Table",solid:!0,action:"chop",breakTime:1.5,requiresTool:!1,handMult:3.5,textures:{top:[0,1],side:[1,1],bottom:[2,0]},color:"#c8a264"},{name:"Furnace",solid:!0,action:"mine",breakTime:1.25,requiresTool:!0,textures:{top:[2,1],side:[4,1],bottom:[2,0]},color:"#777"},{name:"Coal Ore",solid:!0,action:"mine",breakTime:2.5,requiresTool:!0,textures:{all:[5,1]},color:"#555"},{name:"Iron Ore",solid:!0,action:"mine",breakTime:3,requiresTool:!0,textures:{all:[6,1]},color:"#c8a090"},{name:"Gold Ore",solid:!0,action:"mine",breakTime:3,requiresTool:!0,textures:{all:[7,1]},color:"#e8c830"},{name:"Diamond Ore",solid:!0,action:"mine",breakTime:5,requiresTool:!0,textures:{all:[8,1]},color:"#5be8e8"},{name:"Lava",solid:!1,action:"break",breakTime:.5,requiresTool:!1,handMult:1,liquid:!0,emissive:!0,textures:{all:[9,1]},color:"#f04010"},{name:"Glowstone",solid:!0,action:"mine",breakTime:.75,requiresTool:!0,textures:{all:[10,1]},color:"#f0d060"},{name:"TNT",solid:!0,action:"break",breakTime:.5,requiresTool:!1,handMult:1,textures:{top:[11,1],side:[12,1],bottom:[13,1]},color:"#e04040"},{name:"Obsidian",solid:!0,action:"mine",breakTime:10,requiresTool:!0,textures:{all:[14,1]},color:"#1a0a2e"},{name:"Brick",solid:!0,action:"mine",breakTime:1.5,requiresTool:!0,textures:{all:[15,1]},color:"#a0503c"},{name:"Bookshelf",solid:!0,action:"chop",breakTime:1.5,requiresTool:!1,handMult:3.5,textures:{top:[9,0],side:[0,2],bottom:[9,0]},color:"#c8a264"},{name:"Mossy Cobble",solid:!0,action:"mine",breakTime:2,requiresTool:!0,textures:{all:[1,2]},color:"#5a7a5a"},{name:"Sponge",solid:!0,action:"dig",breakTime:.5,requiresTool:!1,handMult:1.5,textures:{all:[2,2]},color:"#d0cc60"},{name:"Wool",solid:!0,action:"break",breakTime:.2,requiresTool:!1,handMult:1,textures:{all:[3,2]},color:"#eeeeff"},{name:"Torch",solid:!0,action:"break",breakTime:.05,requiresTool:!1,handMult:1,emissive:!0,textures:{all:[4,2]},color:"#f0c040"},{name:"Chest",solid:!0,action:"chop",breakTime:1.5,requiresTool:!1,handMult:3.5,textures:{top:[5,2],side:[6,2],bottom:[5,2]},color:"#a07030"},{name:"Bed",solid:!0,action:"break",breakTime:.2,requiresTool:!1,handMult:1,textures:{all:[7,2]},color:"#cc4444"},{name:"Concrete",solid:!0,action:"mine",breakTime:2,requiresTool:!0,textures:{all:[8,2]},color:"#909090"},{name:"Asphalt",solid:!0,action:"mine",breakTime:1.5,requiresTool:!0,textures:{all:[9,2]},color:"#2c2c2c"},{name:"Door",solid:!0,action:"chop",breakTime:1,requiresTool:!1,handMult:3,textures:{all:[10,2]},color:"#7a4010"},{name:"Door (Open)",solid:!1,action:"break",breakTime:.1,requiresTool:!1,handMult:1,transparent:!0,textures:{all:[11,2]},color:"rgba(120,70,20,0.15)"},{name:"Sidewalk",solid:!0,action:"mine",breakTime:1,requiresTool:!0,textures:{all:[12,2]},color:"#c8c8c4"},{name:"Clay",solid:!0,action:"dig",breakTime:.5,requiresTool:!1,handMult:1.5,textures:{all:[13,2]},color:"#8090a8"},{name:"Chair",solid:!0,action:"chop",breakTime:.8,requiresTool:!1,handMult:3,textures:{all:[0,3]},color:"#8B6030"},{name:"Table",solid:!0,action:"chop",breakTime:1,requiresTool:!1,handMult:3.5,textures:{all:[1,3]},color:"#c8a264"},{name:"Lamp",solid:!0,action:"break",breakTime:.3,requiresTool:!1,handMult:1,emissive:!0,textures:{all:[2,3]},color:"#f0c040"},{name:"Counter",solid:!0,action:"mine",breakTime:1.5,requiresTool:!0,textures:{all:[3,3]},color:"#909090"},{name:"Desk",solid:!0,action:"chop",breakTime:1,requiresTool:!1,handMult:3.5,textures:{all:[4,3]},color:"#a07030"},{name:"TV",solid:!0,action:"break",breakTime:.5,requiresTool:!1,handMult:1,emissive:!0,textures:{top:[5,3],side:[5,3],bottom:[5,3]},color:"#111111"},{name:"Stool",solid:!0,action:"chop",breakTime:.6,requiresTool:!1,handMult:3,textures:{all:[6,3]},color:"#7a5230"},{name:"Filing Cabinet",solid:!0,action:"mine",breakTime:1.5,requiresTool:!0,textures:{all:[7,3]},color:"#808080"},{name:"Escalator",solid:!0,action:"break",breakTime:.3,requiresTool:!1,handMult:1,emissive:!0,textures:{all:[8,3]},color:"#f0c040"},{name:"Ladder",solid:!1,action:"break",breakTime:.3,requiresTool:!1,handMult:1,textures:{all:[9,3]},color:"#a07030"},{name:"Fence",solid:!0,action:"chop",breakTime:1.5,requiresTool:!1,handMult:3.5,textures:{all:[10,3]},color:"#c8a264"},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{name:"Lantern",solid:!0,action:"break",breakTime:.3,requiresTool:!1,handMult:1,emissive:!0,textures:{all:[11,3]},color:"#f8a020"}],Mi={[uo]:{name:"Stone Pickaxe",toolAction:"mine",isItem:!0,maxStack:1,speed:1,damage:1},[ki]:{name:"Stone Axe",toolAction:"chop",isItem:!0,maxStack:1,speed:1,damage:1},[fo]:{name:"Stone Shovel",toolAction:"dig",isItem:!0,maxStack:1,speed:1,damage:1},[po]:{name:"Stone Sword",toolAction:"swing",isItem:!0,maxStack:1,speed:1,damage:2},[Bi]:{name:"Hoe",toolAction:"till",isItem:!0,maxStack:1,speed:1,damage:1},[Pl]:{name:"Gold Pickaxe",toolAction:"mine",isItem:!0,maxStack:1,speed:2,damage:1},[Sr]:{name:"Gold Axe",toolAction:"chop",isItem:!0,maxStack:1,speed:2,damage:1},[ud]:{name:"Gold Shovel",toolAction:"dig",isItem:!0,maxStack:1,speed:2,damage:1},[Ll]:{name:"Gold Sword",toolAction:"swing",isItem:!0,maxStack:1,speed:1,damage:3},[Il]:{name:"Diamond Pickaxe",toolAction:"mine",isItem:!0,maxStack:1,speed:4,damage:2},[tl]:{name:"Diamond Axe",toolAction:"chop",isItem:!0,maxStack:1,speed:4,damage:2},[fd]:{name:"Diamond Shovel",toolAction:"dig",isItem:!0,maxStack:1,speed:4,damage:2},[Dl]:{name:"Diamond Sword",toolAction:"swing",isItem:!0,maxStack:1,speed:1,damage:4}},mo={[Qt]:{name:"Stick",isItem:!0,maxStack:64},[hn]:{name:"Coal",isItem:!0,maxStack:64},[zi]:{name:"Gold Coin",isItem:!0,maxStack:999},[_e]:{name:"Iron Ingot",isItem:!0,maxStack:64},[ms]:{name:"Steel Ingot",isItem:!0,maxStack:64},[Cl]:{name:"Vehicle",isItem:!0,maxStack:1},[We]:{name:"Gold Ingot",isItem:!0,maxStack:64},[Xe]:{name:"Diamond",isItem:!0,maxStack:64}},Gg={[lo]:{id:co,count:1},[rd]:{id:hn,count:1},[Tl]:{id:_e,count:1},[wl]:{id:We,count:1},[Al]:{id:Xe,count:1}};function Ks(i){var t,e,n;return((t=Mi[i])==null?void 0:t.name)||((e=mo[i])==null?void 0:e.name)||((n=qi[i])==null?void 0:n.name)||""}function Vg(i){return Mi[i]?Mi[i].maxStack??1:mo[i]?mo[i].maxStack??64:64}function el(i){var t;return((t=Mi[i])==null?void 0:t.toolAction)??null}const Wg={dig:"Digging",chop:"Chopping",mine:"Mining",break:"Breaking"},Xg={mine:"Needs a Pickaxe",chop:"Needs an Axe",dig:"Needs a Shovel"};function jo(i){return qi[i]||null}function Es(i){var t;return i>0&&!!((t=qi[i])!=null&&t.solid)}function Yc(i){var t;return i===ee||!!((t=qi[i])!=null&&t.transparent)}function qg(i,t){const e=qi[i];if(!e)return[0,0];const n=e.textures;return n.all?n.all:t==="top"&&n.top?n.top:t==="bottom"&&n.bottom?n.bottom:n.side?n.side:n.top||[0,0]}const nl=16,il=4,A=16;function Ue(i){let t=i*1664525+1013904223>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967295)}function yt(i,t,e,n){i.fillStyle=n,i.fillRect(t*A,e*A,A,A)}function Yn(i,t,e,n,s,o){i.fillStyle=o,i.fillRect(t*A+n,e*A+s,1,1)}function Dt(i,t,e,n,s=.3,o=0){const r=Ue(t*100+e*1e3+o);for(let a=0;a<A;a++)for(let l=0;l<A;l++)r()<s&&Yn(i,t,e,l,a,n[Math.floor(r()*n.length)])}function he(i,t,e,n,s){i.fillStyle=s,i.fillRect(t*A,e*A+n,A,1)}function Pn(i,t,e,n,s){i.fillStyle=s,i.fillRect(t*A+n,e*A,1,A)}function pd(){const i=nl*A,t=il*A,e=document.createElement("canvas");e.width=i,e.height=t;const n=e.getContext("2d");n.imageSmoothingEnabled=!1,yt(n,0,0,"#5d9c33"),Dt(n,0,0,["#6aad3a","#4f8a2d","#72b840","#3d7020"],.4,1),yt(n,1,0,"#8B5E3C"),Dt(n,1,0,["#7a5230","#9e6b42"],.25,2);for(let o=0;o<16;o++){const r=3+Math.floor(Ue(o*7)()*3);for(let a=0;a<r;a++)Yn(n,1,0,o,a,["#5d9c33","#4f8a2d","#6aad3a"][Math.floor(Ue(o*3+a)()*3)])}yt(n,2,0,"#8B5E3C"),Dt(n,2,0,["#7a5230","#9e6b42","#6b4820","#a07040"],.35,3),yt(n,3,0,"#888"),Dt(n,3,0,["#999","#777","#6a6a6a","#aaa"],.3,4),yt(n,4,0,"#e8d99b"),Dt(n,4,0,["#f0e4a8","#d8c880","#e0d090"],.3,5),yt(n,5,0,"#909090"),Dt(n,5,0,["#808080","#a0a0a0","#787878","#b0b0b0"],.4,6);{const o=Ue(60);for(let r=0;r<8;r++){const a=Math.floor(o()*14),l=Math.floor(o()*14);n.fillStyle="#b8b8b8",n.fillRect(5*A+a,0*A+l,2,2)}}yt(n,6,0,"#c8a060");{n.strokeStyle="#8B5E3C",n.lineWidth=1;for(let a=2;a<=6;a+=2)n.beginPath(),n.arc(104,8,a,0,Math.PI*2),n.stroke();n.fillStyle="#6b4820",n.fillRect(103,7,2,2)}yt(n,7,0,"#a07030");{const o=Ue(70);for(let r=0;r<16;r++){const a=["#a07030","#8B5E20","#b08040","#956030"][Math.floor(o()*4)];Pn(n,7,0,r,a)}}yt(n,8,0,"#2d7a1f"),Dt(n,8,0,["#1f6015","#3a9028","#256618","#48a830"],.5,8);{const o=Ue(80);for(let r=0;r<8;r++)Yn(n,8,0,Math.floor(o()*16),Math.floor(o()*16),"rgba(0,0,0,0)")}yt(n,9,0,"#c8a264");for(let o=0;o<16;o+=4)he(n,9,0,o,"#8B6030"),Dt(n,9,0,["#d4ac70","#bc9858"],.2,o+90);{const o=Ue(95);Pn(n,9,0,8,"#a0784088");for(let r=0;r<16;r++)o()<.15&&Yn(n,9,0,8,r,"#a07840")}yt(n,10,0,"#777");{for(let o=0;o<16;o+=4)he(n,10,0,o,"#555");for(let o=0;o<4;o++){const r=o%2===0?0:8;for(let a=r;a<16;a+=8)Pn(n,10,0,a===0?0:a,"#555")}Dt(n,10,0,["#888","#666","#999"],.2,101)}yt(n,11,0,"#222"),Dt(n,11,0,["#333","#111","#444","#2a2a2a"],.5,110),yt(n,12,0,"#f4f8ff"),Dt(n,12,0,["#ffffff","#e8f0ff","#dce8fa","#f0f6ff"],.25,120);{const o=Ue(121);for(let r=0;r<12;r++){const a=Math.floor(o()*15),l=Math.floor(o()*15);Yn(n,12,0,a,l,"#ccd8ee"),Yn(n,12,0,a+1,l,"#e4eeff"),Yn(n,12,0,a,l+1,"#e4eeff")}}yt(n,13,0,"rgba(185,228,248,0.17)"),n.strokeStyle="rgba(130,195,228,0.92)",n.lineWidth=1.5,n.strokeRect(13*A+.75,0*A+.75,A-1.5,A-1.5),n.strokeStyle="rgba(150,210,240,0.7)",n.lineWidth=1,n.beginPath(),n.moveTo(13*A+8,0*A+1),n.lineTo(13*A+8,0*A+A-1),n.stroke(),n.beginPath(),n.moveTo(13*A+1,0*A+8),n.lineTo(13*A+A-1,0*A+8),n.stroke(),n.fillStyle="rgba(255,255,255,0.28)",n.fillRect(13*A+2,0*A+2,4,2),yt(n,14,0,"rgba(140,190,230,0.7)"),Dt(n,14,0,["rgba(160,210,240,0.5)","rgba(120,170,210,0.5)"],.2,140),n.strokeStyle="rgba(180,220,255,0.8)",n.lineWidth=1,n.strokeRect(14*A+.5,0*A+.5,A-1,A-1),yt(n,15,0,"rgba(30,80,200,0.75)"),Dt(n,15,0,["rgba(20,60,180,0.6)","rgba(50,110,220,0.7)"],.3,150);for(let o=2;o<16;o+=5)he(n,15,0,o,"rgba(80,140,240,0.5)");yt(n,0,1,"#c8a264");for(let o=0;o<16;o+=4)he(n,0,1,o,"#8B6030");{const o=0*A,r=1*A;n.fillStyle="#5a3a10";for(let a=0;a<3;a++)for(let l=0;l<3;l++)n.fillRect(o+2+a*5,r+2+l*5,3,3)}yt(n,1,1,"#c8a264");for(let o=0;o<16;o+=4)he(n,1,1,o,"#8B6030");n.fillStyle="#5a3a10",n.fillRect(1*A+1,1*A+5,A-2,6),n.fillStyle="#c8a264",n.fillRect(1*A+2,1*A+6,A-4,4),yt(n,2,1,"#777"),Dt(n,2,1,["#888","#666"],.25,21),yt(n,3,1,"#777"),Dt(n,3,1,["#888","#666"],.2,31),n.fillStyle="#111",n.fillRect(3*A+3,1*A+3,10,10),n.fillStyle="#f04010",n.fillRect(3*A+5,1*A+9,6,4),yt(n,4,1,"#777"),Dt(n,4,1,["#888","#666"],.2,41),n.fillStyle="#555",n.fillRect(4*A+3,1*A+3,A-6,A-6),yt(n,5,1,"#888"),Dt(n,5,1,["#999","#777"],.2,51);{const o=Ue(510);for(let r=0;r<6;r++){const a=Math.floor(o()*12)+2,l=Math.floor(o()*12)+2;n.fillStyle="#111",n.fillRect(5*A+a,1*A+l,2,2)}}yt(n,6,1,"#888"),Dt(n,6,1,["#999","#777"],.2,61);{const o=Ue(610);for(let r=0;r<5;r++){const a=Math.floor(o()*12)+2,l=Math.floor(o()*12)+2;n.fillStyle="#c09080",n.fillRect(6*A+a,1*A+l,2,2)}}yt(n,7,1,"#888"),Dt(n,7,1,["#999","#777"],.2,71);{const o=Ue(710);for(let r=0;r<5;r++){const a=Math.floor(o()*12)+2,l=Math.floor(o()*12)+2;n.fillStyle="#e8c830",n.fillRect(7*A+a,1*A+l,2,2)}}yt(n,8,1,"#888"),Dt(n,8,1,["#999","#777"],.2,81);{const o=Ue(810);for(let r=0;r<5;r++){const a=Math.floor(o()*12)+2,l=Math.floor(o()*12)+2;n.fillStyle="#30e8e8",n.fillRect(8*A+a,1*A+l,2,2)}}yt(n,9,1,"#f04010"),Dt(n,9,1,["#f86020","#d83000","#ff8030","#e05000"],.4,91);{const o=Ue(912);for(let r=0;r<6;r++){const a=Math.floor(o()*14)+1,l=Math.floor(o()*14)+1;n.fillStyle="#ffcc40",n.fillRect(9*A+a,1*A+l,2,2)}}yt(n,10,1,"#f0d060"),Dt(n,10,1,["#e8c840","#fff080","#d8a830"],.35,101);{const o=Ue(1010);for(let r=0;r<4;r++){const a=Math.floor(o()*14)+1,l=Math.floor(o()*14)+1;n.fillStyle="#ffffff",n.fillRect(10*A+a,1*A+l,1,1)}}yt(n,11,1,"#e04040"),n.fillStyle="#fff",n.fillRect(11*A+4,1*A+4,8,8),yt(n,12,1,"#e04040");for(let o=0;o<16;o+=4)n.fillStyle="#fff",n.fillRect(12*A,1*A+o,A,2);n.fillStyle="#222",n.fillRect(12*A+2,1*A+5,12,6),n.fillStyle="#e04040",n.fillRect(12*A+3,1*A+6,10,4),yt(n,13,1,"#e04040"),n.fillStyle="#fff",n.fillRect(13*A+4,1*A+4,8,8),yt(n,14,1,"#1a0a2e"),Dt(n,14,1,["#2a1040","#0e0620","#3a1860"],.3,141);{const o=Ue(1410);for(let r=0;r<4;r++)Yn(n,14,1,Math.floor(o()*16),Math.floor(o()*16),"#6030a0")}yt(n,15,1,"#a0503c"),Dt(n,15,1,["#b06048","#905038"],.2,151);for(let o=0;o<16;o+=4)he(n,15,1,o,"#7a3828");for(let o=0;o<4;o++){const r=o%2===0?4:0;Pn(n,15,1,(r+8)%16,"#7a3828")}yt(n,0,2,"#c8a264");for(let o=0;o<16;o+=4)he(n,0,2,o,"#8B6030");const s=["#a02020","#2040c0","#208040","#c08000","#802080"];{const o=Ue(200);for(let r=1;r<15;r+=3){const a=s[Math.floor(o()*s.length)];n.fillStyle=a,n.fillRect(0*A+r,2*A+1,2,14)}}yt(n,1,2,"#777");for(let o=0;o<16;o+=4)he(n,1,2,o,"#555");{for(let o=0;o<16;o+=8)Pn(n,1,2,o,"#555");Dt(n,1,2,["#4a7a30","#3a6020","#5a8838"],.25,122)}yt(n,2,2,"#c8c040"),Dt(n,2,2,["#d0cc50","#b8b030"],.25,220);{const o=Ue(222);for(let r=0;r<20;r++)Yn(n,2,2,Math.floor(o()*16),Math.floor(o()*16),"#888820")}yt(n,3,2,"#e8e8f0"),Dt(n,3,2,["#d8d8e8","#f4f4ff","#ccccdd","#f0f0fc"],.35,320),yt(n,4,2,"#f0c040"),Dt(n,4,2,["#ffe060","#d8a020","#fff080","#e8b030"],.4,420),n.fillStyle="#ffffff",n.fillRect(4*A+6,2*A+5,4,4),n.fillStyle="#ffe880",n.fillRect(4*A+5,2*A+4,6,6),yt(n,5,2,"#b08840"),Dt(n,5,2,["#c09850","#a07830"],.2,520);for(let o=0;o<16;o+=4)he(n,5,2,o,"#8B6020");n.strokeStyle="#604010",n.lineWidth=1,n.strokeRect(5*A+.5,2*A+.5,A-1,A-1),n.fillStyle="#555",n.fillRect(5*A+6,2*A+6,4,4),n.fillStyle="#888",n.fillRect(5*A+7,2*A+7,2,2),yt(n,6,2,"#b08840"),Dt(n,6,2,["#c09850","#a07830"],.2,620);for(let o=0;o<16;o+=4)he(n,6,2,o,"#8B6020");n.strokeStyle="#604010",n.lineWidth=1,n.strokeRect(6*A+.5,2*A+.5,A-1,A-1),n.fillStyle="#909090",n.fillRect(6*A+1,2*A+7,14,2),n.fillStyle="#686868",n.fillRect(6*A+6,2*A+4,4,7),n.fillStyle="#404040",n.fillRect(6*A+7,2*A+6,2,4),yt(n,8,2,"#8e8e8e"),Dt(n,8,2,["#9a9a9a","#828282","#959595"],.15,820),he(n,8,2,0,"#7a7a7a"),he(n,8,2,8,"#7a7a7a"),Pn(n,8,2,0,"#7a7a7a"),Pn(n,8,2,8,"#7a7a7a"),yt(n,9,2,"#2c2c2c"),Dt(n,9,2,["#383838","#222222","#303030"],.3,920);{const o=Ue(921);for(let r=0;r<20;r++)n.fillStyle="rgba(80,80,80,0.5)",n.fillRect(9*A+Math.floor(o()*15),2*A+Math.floor(o()*15),1,1)}yt(n,10,2,"#8B4513"),Dt(n,10,2,["#7a3a0a","#9a4a18","#6e3208"],.2,1020),n.strokeStyle="#4a2000",n.lineWidth=1,n.strokeRect(10*A+.5,2*A+.5,A-1,A-1),n.fillStyle="rgba(0,0,0,0.18)",n.fillRect(10*A+3,2*A+2,A-6,5),n.fillRect(10*A+3,2*A+9,A-6,5),he(n,10,2,8,"#4a2000"),n.fillStyle="#fbbf24",n.fillRect(10*A+11,2*A+8,2,2),n.fillStyle="#ca8a04",n.fillRect(10*A+12,2*A+9,1,1),n.strokeStyle="rgba(100,55,10,0.5)",n.lineWidth=2,n.strokeRect(11*A+1.5,2*A+1.5,A-3,A-3),yt(n,7,2,"#cc3333"),Dt(n,7,2,["#dd4444","#bb2222"],.2,720),n.fillStyle="rgba(255,255,255,0.25)",n.fillRect(7*A+0,2*A+5,16,3),n.fillRect(7*A+0,2*A+11,16,2),n.fillStyle="#eeeeff",n.fillRect(7*A+2,2*A+1,12,4),Dt(n,7,2,["rgba(200,200,230,0.5)"],.2,721),yt(n,12,2,"#c4c4be"),Dt(n,12,2,["#cecec8","#b8b8b2","#c8c8c2","#bababc"],.2,1220),n.fillStyle="#9a9a96",he(n,12,2,0,"#9a9a96"),he(n,12,2,7,"#9a9a96"),he(n,12,2,15,"#9a9a96"),Pn(n,12,2,0,"#9a9a96"),Pn(n,12,2,7,"#9a9a96"),Pn(n,12,2,15,"#9a9a96"),n.fillStyle="#d4d4ce",n.fillRect(12*A+1,2*A+1,6,1),n.fillRect(12*A+1,2*A+1,1,5),n.fillRect(12*A+8,2*A+8,6,1),n.fillRect(12*A+8,2*A+8,1,6),yt(n,13,2,"#8494aa"),Dt(n,13,2,["#7888a0","#90a0b4","#7c8ca2","#8ea0b8"],.3,1320),he(n,13,2,5,"rgba(100,115,135,0.5)"),he(n,13,2,10,"rgba(100,115,135,0.5)"),yt(n,0,3,"#c8a264"),Dt(n,0,3,["#d4ac70","#bc9858"],.2,300),n.fillStyle="#8B6030",n.fillRect(0*A+2,3*A+2,12,8),n.fillStyle="#6b4820",n.fillRect(0*A+2,3*A+10,2,5),n.fillRect(0*A+12,3*A+10,2,5),n.fillStyle="#a07030",n.fillRect(0*A+2,3*A+1,12,2),yt(n,1,3,"#c8a264"),Dt(n,1,3,["#d4b870","#b89050"],.15,310),n.fillStyle="#8B6030",he(n,1,3,0,"#7a5220"),he(n,1,3,4,"#7a5220"),he(n,1,3,15,"#7a5220"),n.fillStyle="#6b4820",n.fillRect(1*A+0,3*A+5,2,10),n.fillRect(1*A+14,3*A+5,2,10),yt(n,2,3,"#f0c040"),Dt(n,2,3,["#ffe060","#d8a020","#fff080"],.35,320),n.fillStyle="#ffffff",n.fillRect(2*A+5,3*A+5,6,6),n.fillStyle="#fffbc0",n.fillRect(2*A+3,3*A+3,10,10),n.strokeStyle="#e8b030",n.lineWidth=1,n.strokeRect(2*A+1.5,3*A+1.5,13,13),yt(n,3,3,"#909090"),Dt(n,3,3,["#9a9a9a","#828282"],.2,330),n.fillStyle="#a8a8a8",n.fillRect(3*A,3*A,16,5),he(n,3,3,0,"#888"),he(n,3,3,4,"#888"),n.fillStyle="#b08840",n.fillRect(3*A,3*A+5,16,11),Dt(n,3,3,["#c09850","#a07830"],.15,331),yt(n,4,3,"#a07030"),Dt(n,4,3,["#b08040","#906020"],.2,340);for(let o=0;o<16;o+=4)he(n,4,3,o,"#7a5010");n.fillStyle="#b89050",n.fillRect(4*A+3,3*A+2,10,8),n.fillStyle="#303030",n.fillRect(4*A+4,3*A+5,5,1),yt(n,5,3,"#111111"),Dt(n,5,3,["#181818","#0a0a0a"],.2,350),n.fillStyle="rgba(30,80,200,0.35)",n.fillRect(5*A+2,3*A+2,12,10),n.strokeStyle="#333333",n.lineWidth=1.5,n.strokeRect(5*A+1,3*A+1,14,12),n.fillStyle="#222222",n.fillRect(5*A+5,3*A+13,6,3),n.fillStyle="#00ff88",n.fillRect(5*A+14,3*A+13,1,1),yt(n,6,3,"#c8a264"),Dt(n,6,3,["#d4ac70","#bc9858"],.2,360),n.fillStyle="#8B5E3C",n.beginPath(),n.arc(6*A+8,3*A+7,6,0,Math.PI*2),n.fill(),n.fillStyle="#6b4820",n.fillRect(6*A+7,3*A+9,2,7),n.fillRect(6*A+4,3*A+14,8,2),yt(n,7,3,"#808080"),Dt(n,7,3,["#8a8a8a","#767676"],.15,370),he(n,7,3,5,"#555555"),he(n,7,3,10,"#555555"),he(n,7,3,0,"#606060"),he(n,7,3,15,"#606060"),n.fillStyle="#fbbf24",n.fillRect(7*A+6,3*A+2,4,2),n.fillRect(7*A+6,3*A+7,4,2),n.fillRect(7*A+6,3*A+12,4,2),yt(n,8,3,"#d97706"),n.strokeStyle="#1a1100",n.lineWidth=2;for(let o=-16;o<=32;o+=5)n.beginPath(),n.moveTo(8*A+o,3*A),n.lineTo(8*A+o+A,3*A+A),n.stroke();n.fillStyle="#d97706",n.fillRect(8*A,3*A,1,A),n.fillRect(8*A+A-1,3*A,1,A),n.fillRect(8*A,3*A,A,1),n.fillRect(8*A,3*A+A-1,A,1),n.fillStyle="#ffffff",n.fillRect(8*A+7,3*A+3,2,7),n.fillRect(8*A+4,3*A+6,8,2),n.fillRect(8*A+5,3*A+4,6,2),n.fillRect(8*A+6,3*A+2,4,2),yt(n,9,3,"rgba(0,0,0,0)"),n.fillStyle="#8B5E3C",n.fillRect(9*A+1,3*A,3,A),n.fillRect(9*A+12,3*A,3,A);for(let o=1;o<=13;o+=4)n.fillStyle="#a07030",n.fillRect(9*A+1,3*A+o,14,2);return yt(n,10,3,"rgba(0,0,0,0)"),n.fillStyle="#c8a264",n.fillRect(10*A+7,3*A,2,A),n.fillRect(10*A,3*A+4,A,3),n.fillRect(10*A,3*A+10,A,3),n.fillStyle="#a07030",n.fillRect(10*A,3*A+4,A,1),n.fillRect(10*A,3*A+10,A,1),yt(n,11,3,"#f8a020"),Dt(n,11,3,["#ffcc40","#e88010","#ffd060"],.35,113),n.fillStyle="#555",n.fillRect(11*A,3*A,A,1),n.fillRect(11*A,3*A+15,A,1),n.fillRect(11*A,3*A,1,A),n.fillRect(11*A+15,3*A,1,A),n.fillRect(11*A+7,3*A,2,A),n.fillRect(11*A,3*A+7,A,2),n.fillStyle="#fff8c0",n.fillRect(11*A+5,3*A+5,6,6),e}function Yg(i,t){const e=i/nl,n=(i+1)/nl,s=t/il,o=(t+1)/il;return{u0:e,u1:n,v0:s,v1:o}}const sl=400,$c=80,Xi=24,Fe=26,$g=6,un=3,te=$g+un*2,ol=Fe-te-1,Kg=2,Kc=6,jg=3;function Ts(i){let t=i*1664525+1013904223>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967295)}function Fs(i,t){return(i%t+t)%t}function br(i,t,e){const n=sl,s=Math.floor(i/n),o=Math.floor(t/n);for(let r=-1;r<=1;r++)for(let a=-1;a<=1;a++){const l=s+r,c=o+a,h=Ts(e*31337+l*92837+c*18671),u=(l+.2+h()*.6)*n,d=(c+.2+h()*.6)*n,f=i-u,g=t-d,_=Math.sqrt(f*f+g*g);if(_<$c)return{centerX:u,centerZ:d,localX:f,localZ:g,dist:_,density:1-_/$c,seed:l*92837+c*18671+e}}return null}function Os(i,t,e,n){const s=Fs(Math.floor(i),Fe),o=Fs(Math.floor(t),Fe);if(s<te||o<te){const P=s<te&&(s<un||s>=te-un),b=o<te&&(o<un||o>=te-un);let M;return s<te&&o>=te?M=P:o<te&&s>=te?M=b:M=P&&b,{type:"road",isSidewalk:M}}const r=s-te,a=o-te,l=ol,c=r===0||r===l||a===0||a===l,h=(r===0||r===l)&&(a===0||a===l),u=Math.floor(i/Fe),d=Math.floor(t/Fe),f=Ts(n*99991+u*73856+d*19349);if(f()<.25)return{type:"park",inX:r,inZ:a};const g=["residential","residential","residential","commercial","commercial","restaurant","restaurant","police","fire_station","community_center"],_=g[Math.floor(f()*g.length)],m=1+Math.floor(f()*2),p=m*3,v=Math.floor(f()*4);let x=!1;if(c&&!h){const P=Kc,b=Kc+Kg-1;v===0&&a===0&&r>=P&&r<=b&&(x=!0),v===1&&r===l&&a>=P&&a<=b&&(x=!0),v===2&&a===l&&r>=P&&r<=b&&(x=!0),v===3&&r===0&&a>=P&&a<=b&&(x=!0)}const y=f();let R,w=!1;switch(_){case"police":R=yr;break;case"fire_station":R=Ds;break;case"community_center":R=Ye;break;default:{const P=[Ns,yr,Ye,Be,Ds,Ze],b=Math.floor(y*P.length);R=P[b],w=b===5}}const T=f()>.5;return{type:"building",height:p,floors:m,isPerimeter:c,isCorner:h,isDoor:x,inX:r,inZ:a,wallBlock:R,glassExterior:w,wallAxisX:T,buildingType:_}}function Zg(i,t,e,n){const o=[],r=new Set;for(const[c,h]of[[2,2],[2,10],[10,2],[10,10],[6,6],[6,2],[2,6],[10,6],[6,10]]){const u=i*16+c,d=t*16+h,f=n(u,d);if(!f)continue;const g=Os(f.localX,f.localZ,f.density,f.seed);if(g.type!=="building"||!g.isDoor)continue;const _=`${u},${d}`;if(r.has(_))continue;r.add(_);const p=Ts(e+u*4999+d*7691)();let v;switch(g.buildingType){case"police":v="police";break;case"fire_station":v="builder";break;case"restaurant":v="merchant";break;default:v=p<.5?"merchant":p<.75?"builder":"businessperson"}o.push({wx:u+.5,wy:Xi+1,wz:d+.5,type:v,wander:!1,seed:Math.floor(e+u*4999+d*7691)})}const a=Ts(e*7+i*9431+t*6271),l=Math.floor(a()*3);for(let c=0;c<l;c++){const h=Math.floor(a()*16),u=Math.floor(a()*16),d=i*16+h,f=t*16+u,g=n(d,f);if(!g||Os(g.localX,g.localZ,g.density,g.seed).type!=="road")continue;const m=`ped:${d},${f}`;if(r.has(m))continue;r.add(m);const v=Ts(e+d*3571+f*8219+c)(),x=v<.35?"citizen":v<.6?"police":v<.85?"businessperson":"tourist";o.push({wx:d+.5,wy:Xi+1,wz:f+.5,type:x,wander:!0,seed:Math.floor(e+d*3571+f*8219+c)})}return o}const jc=["car","car","car","car","truck","truck","monster_truck","limo","motorcycle","motorcycle","bus","dog_car"],Jg={car:.26,truck:.32,monster_truck:.78,limo:.28,motorcycle:.34,bus:.36,dog_car:.26};function Qg(i,t,e,n){const o=[],r=new Set,a=Ts(e*13+i*6571+t*8831),l=Math.floor(a()*2.5);for(let c=0;c<l;c++){const h=Math.floor(a()*16),u=Math.floor(a()*16),d=i*16+h,f=t*16+u,g=n(d,f);if(!g)continue;const _=Os(g.localX,g.localZ,g.density,g.seed);if(_.type!=="road"||_.isSidewalk)continue;const m=`car:${d},${f}`;if(r.has(m))continue;r.add(m);const p=Fs(Math.floor(g.localX),Fe),v=Fs(Math.floor(g.localZ),Fe);let x;p<te&&v>=te?x=a()<.5?0:Math.PI:v<te&&p>=te?x=a()<.5?Math.PI/2:-Math.PI/2:x=Math.floor(a()*4)*Math.PI/2;const y=jc[Math.floor(a()*jc.length)];o.push({wx:d+.5,wy:Xi+1+(Jg[y]??.26),wz:f+.5,heading:x,seed:Math.floor(e+d*5003+f*7411+c),vehicleType:y})}return o}function t_(i,t,e,n){const o=[],r=new Set;for(let a=0;a<16;a++)for(let l=0;l<16;l++){const c=i*16+a,h=t*16+l,u=n(c,h);if(!u)continue;const d=Fs(Math.floor(u.localX),Fe),f=Fs(Math.floor(u.localZ),Fe);if(!(d<te&&f>=te&&d===1)||f-te!==7||Math.floor(u.localZ/Fe)%2!==0)continue;const g=`bs:${c},${h}`;r.has(g)||(r.add(g),o.push({wx:c+.5,wz:h+.5,cityX:u.centerX,cityZ:u.centerZ}))}return o}function e_(i,t,e,n){const o=[],r=new Set;for(let a=0;a<16;a++)for(let l=0;l<16;l++){const c=i*16+a,h=t*16+l,u=n(c,h);if(!u)continue;const d=Os(u.localX,u.localZ,u.density,u.seed);if(d.type!=="building"||d.isPerimeter||d.inX!==6||d.inZ!==4)continue;const f=`shop:${c},${h}`;if(r.has(f))continue;r.add(f);let g;switch(d.buildingType){case"commercial":g="shopkeeper";break;case"restaurant":g="chef";break;case"police":g="police";break;case"fire_station":g="builder";break;case"community_center":g="researcher";break;case"residential":g="researcher";break;default:g="shopkeeper";break}o.push({wx:c+.5,wy:Xi+1,wz:h+.5,type:"shopkeeper",role:g,wander:!1,seed:Math.floor(e+c*5113+h*7919)})}return o}function n_(i,t,e,n,s,o){if(i===2&&t===2||i===3&&t===2)return ee;const r=s?i===7:t===7,a=s?t>=5&&t<=7||t<=1||t>=ol-1:i>=5&&i<=7||i<=1||i>=ol-1;if(r&&!a&&o!=="fire_station")return Be;if(n!==1)return ee;if(i===1&&t===1||i===12&&t===12)return bs;switch(o){case"residential":return i===1&&t===12||i===12&&t===1?ci:e===0&&i===4&&t===4?Li:e===0&&i===9&&t===4?Za:e===0&&i===6&&t===8?lr:e===0&&i===5&&t===8||e===0&&i===7&&t===8?hi:e===0&&i===3&&t===2?je:e>0&&i===4&&t===10||e>0&&i===9&&t===10?Us:e>0&&i===4&&t===3?eo:e>0&&i===3&&t===2?je:ee;case"restaurant":if(i===1&&t===12)return Za;if(i===12&&t===1)return Mr;if(t<=3&&i>=2&&i<=11)return Li;if(t===4&&i>=2&&i<=11&&i%2===0)return ld;if(t>=6&&t<=10&&i>=2&&i<=11){if(i%3===0&&t%3===0)return lr;if(i%3===1&&t%3===0||i%3===2&&t%3===0)return hi}return i===11&&t===12||i===2&&t===12?je:ee;case"office":return i===1&&t===12||i===12&&t===1?ci:t>=2&&t<=10&&t%3===2&&i>=2&&i<=11?eo:t>=2&&t<=10&&t%3===0&&i>=2&&i<=11&&i%2===0?hi:i===2&&t>=2&&t<=10&&t%4===2?Qa:e===0&&i===11&&t===12?Ja:i===11&&t===2||i===2&&t===11?je:ee;case"commercial":default:return i===1&&t===12?ci:i===12&&t===1?Mr:t<=3&&i>=2&&i<=11?Li:t>=5&&t<=9&&i>=3&&i<=10&&i%4===3&&t%4===1?bs:i===3&&t===11?je:ee;case"police":return t<=3&&i>=2&&i<=11?Li:t>=5&&t<=9&&i%3===2&&i>=2&&i<=11?eo:t>=5&&t<=9&&i%3===0&&i>=2&&i<=11?hi:i===11&&t>=5&&t<=9&&t%2===1?Qa:i===11&&t===4?Ja:i===4&&t===11||i===9&&t===11?je:ee;case"fire_station":return i>=4&&i<=9?ee:t>=2&&t<=8?Li:t>=10&&i>=5&&i<=8?eo:i===2&&t===10||i===11&&t===10?je:ee;case"community_center":if(i===1&&t===12||i===12&&t===12)return ci;if(t===2&&i>=4&&i<=9)return Li;if(t>=5&&t<=10&&i>=2&&i<=11){if(i%4===2&&t%3===2)return lr;if((i%4===1||i%4===3)&&t%3===2)return hi}return i===3&&t===11||i===10&&t===11?je:ee}}const xt=16,Ne=64,pi=22;function Ni(i,t,e){return i+e*xt+t*xt*xt}function i_(i,t,e){return i+(t-i)*e}function s_(i,t,e,n,s=0){const o=new Uint8Array(xt*xt*Ne),r=[];for(let a=0;a<xt;a++)for(let l=0;l<xt;l++){const c=i*xt+a,h=t*xt+l,u=br(c,h,s);if(u){const D=Os(u.localX,u.localZ,u.density,u.seed),U=Xi;for(let z=0;z<Ne;z++){const G=Ni(a,z,l);if(z===0){o[G]=qc;continue}if(z<U-3){o[G]=Ye;continue}if(z<U){o[G]=co;continue}if(D.type==="road"){D.isSidewalk?o[G]=z===U?ad:ee:o[G]=z===U?Rl:ee;continue}if(D.type==="park"){z===U?(o[G]=lo,(u.seed*77777+c*12391+h*87173>>>0)/4294967295<.15&&r.push({lx:a,lz:l,surfY:U,snowy:!1})):o[G]=ee;continue}const X=D.height,Y=z-U;if(z===U)o[G]=!D.isPerimeter&&D.inX===2&&D.inZ===2?ho:Ns;else if(z<=U+X)if(D.isPerimeter)if(D.isDoor&&Y>=1&&Y<=2)o[G]=ui;else if(D.isDoor&&Y>=3&&Y<=jg)o[G]=ee;else if(D.glassExterior)o[G]=Ze;else{const W=!D.isCorner&&Y%3===2&&Y<X;o[G]=W?Ze:D.wallBlock}else{const W=Y%3,rt=Math.floor(Y/3);W===0?D.inX===2&&D.inZ===2?o[G]=ho:D.inX===3&&D.inZ===2?o[G]=ee:o[G]=Be:o[G]=n_(D.inX,D.inZ,rt,W,D.wallAxisX,D.buildingType)}else z===U+X+1?o[G]=Ns:o[G]=ee}continue}const d=e(c*.0025,h*.0025),f=e(c*.0025+200,h*.0025+200),g=d>.35&&f<0,_=d<-.35,m=f>.2&&!g,p=e(c*.003+300,h*.003+300),v=Math.max(0,Math.min(1,(p+.25)*1.6)),x=v*v*(3-2*v),y=e(c*.006,h*.006),R=e(c*.02,h*.02)*.5,w=e(c*.06,h*.06)*.25,T=Math.max(0,e(c*.004+50,h*.004+50)),P=y*i_(1,.3,x)+R*(1-x*.92)+w*(1-x*.88)+T*.8*(1-x),b=Math.floor(pi+P*20),M=Math.max(1,Math.min(Ne-4,b)),L=D=>n(c*.05,D*.05,h*.05)>.55;for(let D=0;D<Ne;D++){const U=Ni(a,D,l),z=D<M-4,G=D===M,X=D>=M-4&&D<M,Y=M<=pi;if(D===0){o[U]=qc;continue}if(z){if(L(D)){o[U]=ee;continue}const W=n(c*.12+10,D*.12+10,h*.12+10);D<=10&&W>.82?o[U]=Al:D<=20&&W>.78?o[U]=wl:W>.72?o[U]=Tl:W>.62?o[U]=rd:o[U]=Ye;continue}if(X){o[U]=g?Hi:co;continue}if(G){if(Y&&!g){const W=e(c*.05+777,h*.05+777);o[U]=W>.2?to:Hi}else Y||g?o[U]=Hi:_?o[U]=od:o[U]=lo;continue}if(D<=pi&&D>M){o[U]=ja;continue}o[U]=ee}!g&&M>pi+1&&M<Ne-10&&e(c*.28+500,h*.28+500)>(m?.65:.72)&&r.push({lx:a,lz:l,surfY:M,snowy:_}),!g&&!_&&M>pi&&M<Ne-2&&e(c*.7+900,h*.7+900)>.92&&(o[Ni(a,M+1,l)]=Dn)}for(const{lx:a,lz:l,surfY:c,snowy:h}of r){const u=4+Math.floor(Math.abs(e((i*16+a)*.5+999,(t*16+l)*.5+999))*3),d=c+u;for(let g=c+1;g<=d&&!(g>=Ne);g++)o[Ni(a,g,l)]=sd;const f=2;for(let g=-f;g<=f;g++)for(let _=-f;_<=f+1;_++)for(let m=-f;m<=f;m++){if(g*g+_*_+m*m>(f+.5)*(f+.5))continue;const p=a+g,v=d+_,x=l+m;if(p<0||p>=xt||x<0||x>=xt||v<=0||v>=Ne)continue;const y=br(i*16+p,t*16+x,s);if(y&&Os(y.localX,y.localZ,y.density,y.seed).type==="building")continue;const R=Ni(p,v,x);o[R]===ee&&(o[R]=El)}}return o}const Zc=[{dir:[0,1,0],v:[[0,1,1],[1,1,1],[1,1,0],[0,1,0]],slot:"top"},{dir:[0,-1,0],v:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]],slot:"bottom"},{dir:[0,0,1],v:[[0,0,1],[1,0,1],[1,1,1],[0,1,1]],slot:"side"},{dir:[0,0,-1],v:[[1,0,0],[0,0,0],[0,1,0],[1,1,0]],slot:"side"},{dir:[1,0,0],v:[[1,0,1],[1,0,0],[1,1,0],[1,1,1]],slot:"side"},{dir:[-1,0,0],v:[[0,0,0],[0,0,1],[0,1,1],[0,1,0]],slot:"side"}],o_=[1,.5,.8,.8,.6,.6];class r_{constructor(t,e,n){this.cx=t,this.cz=e,this.world=n,this.worldX=t*xt,this.worldZ=e*xt,this.key=`${t},${e}`,this.data=null,this.solidMesh=null,this.transMesh=null,this.dirty=!0}generate(t,e){this.data=s_(this.cx,this.cz,t,e,this.world.seed),this.dirty=!0}getLocal(t,e,n){return t<0||t>=xt||n<0||n>=xt||e<0||e>=Ne?ee:this.data[Ni(t,e,n)]}setLocal(t,e,n,s){t<0||t>=xt||n<0||n>=xt||e<0||e>=Ne||(this.data[Ni(t,e,n)]=s,this.dirty=!0)}_neighborBlock(t,e,n){return t>=0&&t<xt&&n>=0&&n<xt?this.getLocal(t,e,n):this.world.getBlock(this.worldX+t,e,this.worldZ+n)}buildMesh(t,e){this.disposeMeshes();const n={pos:[],norm:[],uv:[],color:[],idx:[]},s={pos:[],norm:[],uv:[],color:[],idx:[]};let o=0,r=0;for(let a=0;a<Ne;a++)for(let l=0;l<xt;l++)for(let c=0;c<xt;c++){const h=this.getLocal(c,a,l);if(h===ee)continue;const u=Yc(h),d=u?s:n;let f=u?r:o;for(let g=0;g<Zc.length;g++){const _=Zc[g],m=c+_.dir[0],p=a+_.dir[1],v=l+_.dir[2],x=this._neighborBlock(m,p,v);if(!Yc(x)||u&&x===h)continue;const[y,R]=qg(h,_.slot),{u0:w,u1:T,v0:P,v1:b}=Yg(y,R),M=o_[g];for(const[L,D,U]of _.v)d.pos.push(this.worldX+c+L,a+D,this.worldZ+l+U),d.norm.push(..._.dir),d.color.push(M,M,M);d.uv.push(w,b,T,b,T,P,w,P),d.idx.push(f,f+1,f+2,f,f+2,f+3),f+=4,u?r=f:o=f}}n.idx.length>0&&(this.solidMesh=this._buildThreeMesh(n,t),this.world.scene.add(this.solidMesh)),s.idx.length>0&&(this.transMesh=this._buildThreeMesh(s,e),this.world.scene.add(this.transMesh)),this.dirty=!1}_buildThreeMesh({pos:t,norm:e,uv:n,color:s,idx:o},r){const a=new vn;return a.setAttribute("position",new Ce(t,3)),a.setAttribute("normal",new Ce(e,3)),a.setAttribute("uv",new Ce(n,2)),a.setAttribute("color",new Ce(s,3)),a.setIndex(o),a.computeBoundingSphere(),new Jt(a,r)}disposeMeshes(){this.solidMesh&&(this.world.scene.remove(this.solidMesh),this.solidMesh.geometry.dispose(),this.solidMesh=null),this.transMesh&&(this.world.scene.remove(this.transMesh),this.transMesh.geometry.dispose(),this.transMesh=null)}dispose(){this.disposeMeshes(),this.data=null}}const a_={shopkeeper:{mood:"easy",start:"welcome",nodes:{welcome:{text:"Welcome in! Best prices in the district. What can I do for you?",options:[{text:"I'd like to buy something.",next:"offer_buy"},{text:"I have things to sell.",next:"offer_sell"},{text:"What do you sell here?",next:"describe_wares"},{text:"Just browsing, thanks.",next:"just_looking"}]},offer_buy:{text:"Great choice! Take a look at my stock.",options:[{text:"Open the shop.",action:"buy"},{text:"Actually, one question first.",next:"city_question"},{text:"Never mind.",next:"farewell"}]},offer_sell:{text:"I'm always looking for raw materials. What've you got?",options:[{text:"Let me sell some items.",action:"sell"},{text:"Changed my mind.",next:"farewell"}]},describe_wares:{text:"Building materials, tools, everyday supplies. Been stocking this place for years.",options:[{text:"Sounds useful — let me browse.",next:"offer_buy"},{text:"What's your best item?",next:"best_item"},{text:"Thanks, maybe later.",next:"farewell"}]},best_item:{text:"Honestly? The pickaxe. Can't mine without one. Glass is popular with builders too.",options:[{text:"I'll take a look.",next:"offer_buy"},{text:"Good to know.",next:"farewell"}]},city_question:{text:"Sure, ask away. I've been here a while — know the district well.",options:[{text:"Where can I find iron ore?",next:"iron_tip"},{text:"Are there other shops nearby?",next:"other_shops"},{text:"How do I craft a vehicle?",next:"vehicle_tip"},{text:"Never mind.",next:"farewell"}]},iron_tip:{text:"Head past the city edge and dig down. Iron is around Y=15–20. Bring a pickaxe.",options:[{text:"Thanks, that's helpful!",next:"farewell"},{text:"One more question.",next:"city_question"}]},other_shops:{text:"Check the commercial buildings nearby — each has its own stock. Some carry specialty items.",options:[{text:"Good to know.",next:"farewell"}]},vehicle_tip:{text:"Four steel ingots, two iron ingots, and a glass block at a crafting table. Then right-click it onto asphalt.",options:[{text:"I'll try that!",next:"farewell"}]},just_looking:{text:"Of course! No pressure. Shout if you need anything.",options:[{text:"Actually, can I buy something?",next:"offer_buy"},{text:"Thanks.",next:"farewell"}]},farewell:{text:"Come back anytime — I'll always have stock for a good customer!",options:[{text:"Goodbye.",action:"close"}]}}},chef:{mood:"tough",start:"intro",nodes:{intro:{text:"We're closed for prep. Can't you read the sign?",options:[{text:"I just need one quick thing.",next:"pushback"},{text:"When do you open?",next:"hours"},{text:"Sorry to bother you.",next:"dismissed"}]},pushback:{text:"One quick thing. They ALL say that. Then you're touching the mise en place and asking questions.",options:[{text:"I promise just one — I'll buy something.",next:"reluctant"},{text:"What's mise en place?",next:"explain_mise"},{text:"Fine, I'll come back later.",next:"dismissed"}]},explain_mise:{text:"French. 'Everything in its place.' Which is where I NEED everything right now. Prep starts in ten.",options:[{text:"I respect the dedication. I'll come back.",next:"dismissed"}]},reluctant:{text:"...Fine. ONE item. And don't touch anything on the counter.",options:[{text:"Deal. Open the shop.",action:"buy"},{text:"Thank you so much!",next:"thanks_warning"}]},thanks_warning:{text:"Don't thank me, just be quick.",options:[{text:"Open the shop.",action:"buy"}]},hours:{text:"Dinner service at six. Breakfast? Missed it. This is a restaurant, not a canteen.",options:[{text:"I'll be back at six.",next:"dismissed"},{text:"Could I get something now anyway?",next:"pushback"}]},dismissed:{text:"Right. Goodbye. Close the door on your way out.",options:[{text:"...",action:"close"}]}}},office_worker:{mood:"deadend",start:"intro",nodes:{intro:{text:"...What? I'm in the middle of something.",options:[{text:"Just a quick question.",next:"no_time"},{text:"Is the manager around?",next:"manager"},{text:"Sorry, wrong person.",next:"dismissed"}]},no_time:{text:"A quick question. Sure. You have five seconds.",options:[{text:"What does this company do?",next:"company"},{text:"How do I get to the upper floors?",next:"directions"},{text:"Actually, never mind.",next:"dismissed"}]},company:{text:"Material logistics. Cobblestone to glass, ore to ingot. Very exciting. Done?",options:[{text:"One more thing —",next:"cut_off"},{text:"Fascinating, thanks.",next:"dismissed"}]},cut_off:{text:"No. We're done. I have a report due.",options:[{text:"Okay. I'm going.",next:"dismissed"}]},directions:{text:"Escalator in the lobby corner. Unless maintenance broke it again. In which case, walk.",options:[{text:"Thanks.",next:"dismissed"}]},manager:{text:"She's on the upper floors. No walk-ins. You'd need an appointment. Which I can't make for you.",options:[{text:"Okay then.",action:"close"}]},dismissed:{text:"*already back to work*",options:[{text:"Goodbye.",action:"close"}]}}},researcher:{mood:"informative",start:"greeting",nodes:{greeting:{text:"Ah, a visitor! I've spent years studying these lands. Ask me anything.",options:[{text:"Tell me about the biomes.",next:"biomes"},{text:"What's underground?",next:"underground"},{text:"Tell me about the city.",next:"city_history"},{text:"How do I craft a vehicle?",next:"vehicle"}]},biomes:{text:"Deserts: hot, sandy, no trees. Snowy tundra: white and harsh. Forests: thick wood and coal. Climate follows temperature and rainfall gradients.",options:[{text:"Which biome is best for resources?",next:"biome_resources"},{text:"What else can you tell me?",next:"greeting"},{text:"Thank you.",next:"farewell"}]},biome_resources:{text:"Forests have surface coal. Deserts give sand for glass. Underground everywhere: iron, gold, diamond. Depth determines rarity — diamonds only below Y=10.",options:[{text:"Tell me about underground.",next:"underground"},{text:"Good to know.",next:"farewell"}]},underground:{text:"Coal near Y=17. Iron between Y=5–20. Gold Y=10–20. Diamonds below Y=10. Caves connect everything — but lava lurks. Bring torches.",options:[{text:"What about bedrock?",next:"bedrock"},{text:"How do I get iron ingots?",next:"iron_info"},{text:"Very useful, thank you.",next:"farewell"}]},bedrock:{text:"Bedrock at Y=0. Unbreakable by any tool. The absolute floor of the world. Expeditions that dug below it didn't come back with answers.",options:[{text:"Intriguing...",next:"greeting"},{text:"That's unsettling.",next:"farewell"}]},iron_info:{text:"Mine iron ore with a pickaxe. Craft it into iron ingots. Two ingots plus coal make steel ingots — useful for vehicles and advanced crafting.",options:[{text:"How do I craft a vehicle?",next:"vehicle"},{text:"Got it, thanks!",next:"farewell"}]},city_history:{text:"This city emerged from procedural forces — concrete, glass, steel on a precise 26-block grid: 6-block road, 3-block sidewalks, 14-block building footprint.",options:[{text:"How far does the city extend?",next:"city_edge"},{text:"Are there other cities?",next:"other_cities"},{text:"Interesting.",next:"farewell"}]},city_edge:{text:"Roughly 220 blocks from the center you hit wilderness. Beyond: plains, forests, deserts. Cities are islands of civilization in a very large world.",options:[{text:"How many cities are there?",next:"other_cities"},{text:"Good to know.",next:"farewell"}]},other_cities:{text:"Cities are spaced roughly 600 blocks apart. Far enough to feel distant, close enough for trade. Dozens, maybe hundreds in the world.",options:[{text:"Remarkable.",next:"greeting"},{text:"Thank you.",next:"farewell"}]},vehicle:{text:"Four steel ingots, two iron ingots, and one glass block at a 3×3 crafting table. Then right-click the item onto any asphalt block to deploy it. Press E to enter.",options:[{text:"I'll try that!",next:"farewell"},{text:"What else can you tell me?",next:"greeting"}]},farewell:{text:"Knowledge is the greatest resource. Come back anytime — I have much more to share.",options:[{text:"Goodbye.",action:"close"}]}}}};function l_(i){return a_[i]||null}const Jc={merchant:[{shirt:"#92400e",pants:"#1c1917",skin:"#f0c898",hair:"#1a0a00",hat:null},{shirt:"#78350f",pants:"#292524",skin:"#d4a070",hair:"#111",hat:null},{shirt:"#b45309",pants:"#1c1917",skin:"#8b6248",hair:"#222",hat:null},{shirt:"#d97706",pants:"#1c1917",skin:"#fbd0b8",hair:"#333",hat:null}],citizen:[{shirt:"#3b82f6",pants:"#1e3a5f",skin:"#f0c898",hair:"#3b1f00",hat:null},{shirt:"#ef4444",pants:"#1e1e2e",skin:"#d4a070",hair:"#1a0a00",hat:null},{shirt:"#10b981",pants:"#374151",skin:"#f0c898",hair:"#222",hat:null},{shirt:"#8b5cf6",pants:"#1f1f2e",skin:"#d4a070",hair:"#333",hat:null},{shirt:"#ec4899",pants:"#1e1e2e",skin:"#fbd0b8",hair:"#1a1a1a",hat:null},{shirt:"#f97316",pants:"#292524",skin:"#f0c898",hair:"#6b3d00",hat:null}],builder:[{shirt:"#f59e0b",pants:"#78350f",skin:"#f0c898",hair:"#111",hat:"#f59e0b"},{shirt:"#d97706",pants:"#451a03",skin:"#d4a070",hair:"#222",hat:"#d97706"},{shirt:"#fbbf24",pants:"#292524",skin:"#8b6248",hair:"#333",hat:"#fbbf24"}],police:[{shirt:"#1e3a5f",pants:"#172554",skin:"#f0c898",hair:"#1a0a00",hat:"#1e3a5f"},{shirt:"#1d4ed8",pants:"#1e3a5f",skin:"#d4a070",hair:"#111",hat:"#1d4ed8"},{shirt:"#1e40af",pants:"#172554",skin:"#8b6248",hair:"#222",hat:"#1e40af"}],businessperson:[{shirt:"#4b5563",pants:"#1f2937",skin:"#f0c898",hair:"#1a0a00",hat:null},{shirt:"#6b7280",pants:"#111827",skin:"#d4a070",hair:"#333",hat:null},{shirt:"#374151",pants:"#1f2937",skin:"#8b6248",hair:"#111",hat:null},{shirt:"#9ca3af",pants:"#1f2937",skin:"#fbd0b8",hair:"#555",hat:null}],tourist:[{shirt:"#f472b6",pants:"#fef3c7",skin:"#f0c898",hair:"#b45309",hat:"#fde68a"},{shirt:"#34d399",pants:"#ecfdf5",skin:"#d4a070",hair:"#111",hat:"#6ee7b7"},{shirt:"#60a5fa",pants:"#eff6ff",skin:"#fbd0b8",hair:"#92400e",hat:"#bfdbfe"},{shirt:"#fb923c",pants:"#fff7ed",skin:"#8b6248",hair:"#1a0a00",hat:"#fed7aa"}],shopkeeper:[{shirt:"#6d28d9",pants:"#1f2937",skin:"#f0c898",hair:"#3b1f00",hat:null},{shirt:"#7c3aed",pants:"#111827",skin:"#d4a070",hair:"#1a0a00",hat:null},{shirt:"#5b21b6",pants:"#1f2937",skin:"#8b6248",hair:"#222",hat:null},{shirt:"#4c1d95",pants:"#0f172a",skin:"#fbd0b8",hair:"#555",hat:null}]},Qc={merchant:["Welcome! Best prices in the city, guaranteed.","Everything you need to build your empire.","I've been in this spot for years — loyal customers only.","Gold coins accepted, barter considered.","Fresh stock just came in from the mines.","You look like someone who needs a good pickaxe."],citizen:["City life is hectic but I love every second of it.","Have you seen the new skyscrapers going up north?","There's wilderness beyond the city limits if you're brave.","Welcome! I hope you find what you're looking for.","I've been here for years — still discover new streets.","Watch out around construction sites — falling blocks hurt!","The underground tunnels below go on forever, they say.","Don't forget — merchants sell supplies if you need them.","I heard someone found diamonds under the old district.","The fog rolls in at night. Stay close to the lights."],builder:["Solid concrete and glass — that's how you build a real city.","These towers took months. Worth every swing of the pickaxe.","I'm on my lunch break, but happy to chat.","The city keeps growing. We can barely keep up.","Good foundations are everything. Don't skimp underground.","We're pouring a new floor in the east wing tomorrow.","The view from the top floor is incredible. Worth the climb.","Steel scaffolding would be better, but concrete does the job."],police:["Keep it moving, citizen.","Stay safe out there — it's rough beyond the city limits.","I've patrolled this block for years. Know every face.","Report any suspicious block-breaking to the station.","We had a griefer last week. Not on my watch again.","The underground? You did NOT hear that from me.","Eyes open at all times. That's the job.","Had a call about a creeper sighting near the east wall.","The mayor's pushing for better street lighting. About time.","Nothing gets past me on this corner."],businessperson:["Productivity is up 40% since we moved to this district.","I'm late for a meeting on the 8th floor. Can't stop.","Concrete prices are astronomical right now.","Work hard, mine harder. That's my motto.","The quarterly numbers don't lie — this city is booming.","Have you visited the trading district? Best deals in town.","Always carry gold coins — you never know when you'll need them.","My firm handles imports from the outer biomes.","Expansion plans are on the table. Big things coming.","Time is gold. Literally, out here."],tourist:["This city is incredible! Where did it all come from?","I walked for days just to get here. Worth every step.","Do you know the way to the trading district?","Back home we only had dirt huts. This is paradise!","How tall do these buildings go? I can barely see the top!","I heard there are merchants who sell pickaxes here somewhere.","The architecture is stunning. Especially those glass windows.","I'm trying to visit every city before the fog closes in.","Can you take my photo in front of that building?","I've never seen asphalt before. Very smooth underfoot!"]},Ii={hardware:[{id:Be,price:3,count:4,label:"Oak Planks ×4"},{id:Ds,price:1,count:8,label:"Cobblestone ×8"},{id:Ye,price:2,count:4,label:"Stone ×4"},{id:Ze,price:5,count:2,label:"Glass ×2"},{id:Ns,price:4,count:4,label:"Concrete ×4"},{id:ar,price:2,count:4,label:"Torch ×4"},{id:dd,price:8,count:1,label:"Lantern"},{id:bs,price:18,count:1,label:"Chest"},{id:Dn,price:3,count:4,label:"Wool ×4"},{id:Us,price:14,count:1,label:"Bed"},{id:cd,price:2,count:3,label:"Ladder ×3"},{id:hd,price:2,count:4,label:"Fence ×4"}],tools:[{id:uo,price:20,count:1,label:"Stone Pickaxe"},{id:ki,price:18,count:1,label:"Stone Axe"},{id:fo,price:14,count:1,label:"Stone Shovel"},{id:po,price:24,count:1,label:"Stone Sword"},{id:Bi,price:12,count:1,label:"Hoe"},{id:Pl,price:45,count:1,label:"Gold Pickaxe"},{id:Sr,price:40,count:1,label:"Gold Axe"},{id:Ll,price:55,count:1,label:"Gold Sword"},{id:Il,price:90,count:1,label:"Diamond Pickaxe"},{id:Dl,price:110,count:1,label:"Diamond Sword"},{id:ar,price:2,count:4,label:"Torch ×4"},{id:Qt,price:1,count:8,label:"Sticks ×8"}],general:[{id:hn,price:3,count:2,label:"Coal ×2"},{id:Qt,price:1,count:8,label:"Sticks ×8"},{id:Dn,price:3,count:2,label:"Wool ×2"},{id:Be,price:2,count:4,label:"Planks ×4"},{id:Ds,price:1,count:8,label:"Cobblestone ×8"},{id:ar,price:2,count:4,label:"Torch ×4"},{id:Ze,price:4,count:2,label:"Glass ×2"},{id:We,price:20,count:1,label:"Gold Ingot"},{id:Xe,price:40,count:1,label:"Diamond"}]},Zo=["City Hardware","Tools & More","Urban Supply Co.","Builder's Paradise","The General Store","Metro Goods","East Side Hardware","Corner Supply","Downtown Depot"],fn={};for(const i of Object.values(Ii))for(const t of i)fn[t.id]||(fn[t.id]=Math.max(1,Math.floor(t.price/2)));fn[hn]=1;fn[Ye]=1;fn[Ds]=1;fn[Be]=1;fn[Ze]=2;fn[Ns]=1;fn[Dn]=1;fn[Us]=6;fn[bs]=8;const th=["Chef Romano","Chef Lin","Chef Okafor","Chef Santos","Chef Müller"],eh=["Dr. Chen","Dr. Patel","Dr. Nguyen","Dr. Andersen","Prof. Rivera"],nh=["Alex","Sam","Jordan","Taylor","Morgan","Casey","Riley","Drew","Blake","Quinn","Lee","Skyler","Avery","Reese","Jamie","Cameron","Sage","River","Finley","Emery"],ih=["Smith","Chen","Garcia","Kumar","Wilson","Park","Martinez","Brown","Lee","Patel","Okafor","Nguyen","Rossi","Müller","Santos","Kim","Andersen","Johansson","Ivanova","Nakamura"];function oi(i){return new Qe({color:i})}function gn(i,t,e,n){return new Jt(new fe(i,t,e),n)}function sh(i){let t=i*1664525+1013904223>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967295)}const c_={merchant:3,citizen:3,builder:4,police:6,businessperson:3,tourist:2,shopkeeper:3};class h_{constructor(t,e,{wx:n,wy:s,wz:o,type:r,role:a,seed:l,wander:c=!1}){this.homePos=new O(n,s,o),this.pos=new O(n,s,o),this.type=r,this.role=a||null,this.wander=c&&r!=="merchant"&&r!=="shopkeeper",this._world=e,this.hp=c_[r]??3,this._hitFlash=0,this._dying=!1,this._deathTimer=0;const h=sh(l),u=Jc[r]||Jc.citizen,d=u[Math.floor(h()*u.length)],f=nh[Math.floor(h()*nh.length)],g=ih[Math.floor(h()*ih.length)];if(r==="merchant"){this.name=Zo[Math.floor(h()*Zo.length)];const L=Object.keys(Ii);this.shopType=L[Math.floor(h()*L.length)],this.wares=Ii[this.shopType]}else if(r==="shopkeeper")if(this.conversationTree=l_(a),a==="chef"){this.name=th[Math.floor(h()*th.length)];const L=Object.keys(Ii);this.shopType=L[Math.floor(h()*L.length)],this.wares=Ii[this.shopType]}else if(a==="office_worker")this.name=`${f} ${g}`;else if(a==="researcher")this.name=eh[Math.floor(h()*eh.length)];else{this.name=Zo[Math.floor(h()*Zo.length)];const L=Object.keys(Ii);this.shopType=L[Math.floor(h()*L.length)],this.wares=Ii[this.shopType]}else r==="police"?this.name=`Officer ${g}`:r==="builder"?this.name=`${f} (Builder)`:r==="businessperson"?this.name=`${f} ${g}`:r==="tourist"?this.name=`${f} (Visitor)`:this.name=`${f} ${g}`;this.dialog=Qc[r]||Qc.citizen,this._dlgIdx=Math.floor(h()*this.dialog.length),this._phase=h()*Math.PI*2,this._wanderTarget=this.homePos.clone(),this._wanderTimer=h()*3,this._moving=!1,this._walkPhase=0;const _=new de,m=oi(d.skin),p=oi(d.shirt),v=oi(d.pants),x=oi(d.hair),y=gn(.24,.76,.28,v);y.position.set(-.13,.38,0);const R=gn(.24,.76,.28,v);R.position.set(.13,.38,0),this._legL=y,this._legR=R,_.add(y,R);const w=gn(.54,.74,.3,p);w.position.set(0,1.13,0),_.add(w);const T=gn(.22,.66,.26,p);T.position.set(-.38,1.1,0);const P=gn(.22,.66,.26,p);P.position.set(.38,1.1,0),this._armL=T,this._armR=P,_.add(T,P);const b=gn(.5,.5,.5,m);b.position.set(0,1.76,0),this._head=b,_.add(b);const M=gn(.52,.16,.52,x);if(M.position.set(0,2.06,0),_.add(M),d.hat){const L=oi(d.hat),D=gn(.64,.06,.64,L);D.position.set(0,2,0);const U=gn(.44,.22,.44,L);if(U.position.set(0,2.16,0),_.add(D,U),r==="police"){const z=gn(.1,.1,.02,oi("#fbbf24"));z.position.set(-.16,1.22,.16),_.add(z)}}if(r==="businessperson"){const L=gn(.07,.4,.02,oi("#dc2626"));L.position.set(0,1.05,.16),_.add(L)}if(r==="tourist"){const L=gn(.14,.1,.08,oi("#1f2937"));L.position.set(.28,1.22,.16),_.add(L)}_.position.copy(this.homePos),t.add(_),this._group=_}_isBlocked(t,e){if(!this._world)return!1;const n=Math.floor(this.homePos.y);for(const[s,o]of[[0,0],[1,0],[0,1],[1,1]]){const r=Math.floor(t+(s-.5)*.35),a=Math.floor(e+(o-.5)*.35);if(this._world.isSolid(r,n,a)||this._world.isSolid(r,n+1,a)||!this._world.isSolid(r,n-1,a))return!0}return!1}takeDamage(t){this._dying||(this.hp-=t,this._hitFlash=.25,this.hp<=0&&(this._dying=!0))}_setEmissive(t){this._group.traverse(e=>{e.isMesh&&e.material.emissive&&e.material.emissive.setHex(t)})}update(t,e){if(this._dying){this._deathTimer+=t;const n=Math.min(this._deathTimer/.7,1);if(this._group.rotation.z=n*Math.PI/2,this._group.position.y=this.homePos.y-n*.6,n>=1){const s=Math.max(0,1-(this._deathTimer-.7)/.4);if(this._group.traverse(o=>{o.isMesh&&(o.material.transparent=!0,o.material.opacity=s)}),this._deathTimer>1.1)return this.dispose(),!0}return!1}if(this._phase+=t*1.1,this._hitFlash>0&&(this._hitFlash-=t,this._setEmissive(this._hitFlash>0?6689041:0)),this.talking){if(this._moving=!1,this._legL.rotation.x*=.8,this._legR.rotation.x*=.8,this._armL.rotation.x*=.8,this._armR.rotation.x*=.8,e){const s=Math.atan2(e.x-this.pos.x,e.z-this.pos.z)-this._group.rotation.y;this._group.rotation.y+=Math.sin(s)*Math.min(1,t*6)}}else if(this.wander){if(this._wanderTimer-=t,this._wanderTimer<=0){const r=sh(Math.floor(Date.now()/4e3)^this.homePos.x*31+this.homePos.z),a=r()*Math.PI*2,l=3+r()*9;this._wanderTarget.set(this.homePos.x+Math.cos(a)*l,this.homePos.y,this.homePos.z+Math.sin(a)*l),this._wanderTimer=4+r()*6}const n=this._wanderTarget.x-this._group.position.x,s=this._wanderTarget.z-this._group.position.z,o=n*n+s*s;if(this._moving=o>.04,this._moving){const r=1.8*t,a=Math.sqrt(o),l=Math.min(r,a),c=this._group.position.x+n/a*l,h=this._group.position.z+s/a*l;this._isBlocked(c,h)?(this._wanderTarget.copy(this._group.position),this._wanderTimer=0):(this._group.position.x=c,this._group.position.z=h),this._group.position.y=this.homePos.y,this._group.rotation.y=Math.atan2(n,s),this._walkPhase+=t*7;const u=Math.sin(this._walkPhase)*.45;this._legL.rotation.x=u,this._legR.rotation.x=-u,this._armL.rotation.x=-u*.7,this._armR.rotation.x=u*.7}else this._legL.rotation.x*=.85,this._legR.rotation.x*=.85,this._armL.rotation.x*=.85,this._armR.rotation.x*=.85;this.pos.copy(this._group.position)}else{if(e){const s=Math.atan2(e.x-this.pos.x,e.z-this.pos.z)-this._group.rotation.y;this._group.rotation.y+=Math.sin(s)*Math.min(1,t*3)}this._group.position.y=this.homePos.y+Math.sin(this._phase)*.025,this._armL.rotation.x=Math.sin(this._phase*.7)*.12,this._armR.rotation.x=-Math.sin(this._phase*.7)*.12}return this._moving?this._head.rotation.y*=.9:this._head.rotation.y=Math.sin(this._phase*.4)*.28,!1}nextLine(){const t=this.dialog[this._dlgIdx];return this._dlgIdx=(this._dlgIdx+1)%this.dialog.length,t}dispose(){var t;(t=this._group.parent)==null||t.remove(this._group),this._group.traverse(e=>{e.isMesh&&(e.geometry.dispose(),e.material.dispose())})}}class d_{constructor(t,e){this._scene=t,this._world=e,this._npcs=new Map,this._chunks=new Map}spawnForChunk(t,e){if(this._chunks.has(t))return;const n=new Set;for(const s of e){const o=`${s.wx.toFixed(1)},${s.wz.toFixed(1)},${s.type}`;this._npcs.has(o)||this._npcs.set(o,new h_(this._scene,this._world,s)),n.add(o)}this._chunks.set(t,n)}despawnChunk(t){var n;const e=this._chunks.get(t);if(e){for(const s of e)(n=this._npcs.get(s))==null||n.dispose(),this._npcs.delete(s);this._chunks.delete(t)}}getNearest(t,e=4){let n=null,s=e*e;for(const o of this._npcs.values()){const r=o.pos,a=t.x-r.x,l=t.z-r.z,c=a*a+l*l;c<s&&(s=c,n=o)}return n}update(t,e){for(const[n,s]of this._npcs)if(s.update(t,e)){this._npcs.delete(n);for(const r of this._chunks.values())r.delete(n)}}}function us(i,t){return(i%t+t)%t}const u_=.28;function ge(i,t={}){return new Qe({color:i,...t})}function vt(i,t,e,n){return new Jt(new fe(i,t,e),n)}function f_(i){let t=i*1664525+1013904223>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967295)}const oh=[{body:"#ef4444",trim:"#b91c1c"},{body:"#3b82f6",trim:"#1d4ed8"},{body:"#f8fafc",trim:"#cbd5e1"},{body:"#fbbf24",trim:"#d97706"},{body:"#1e293b",trim:"#0f172a"},{body:"#94a3b8",trim:"#64748b"},{body:"#10b981",trim:"#047857"},{body:"#f97316",trim:"#c2410c"},{body:"#a855f7",trim:"#7e22ce"},{body:"#14b8a6",trim:"#0f766e"}],Er=["car","car","car","car","truck","truck","monster_truck","limo","motorcycle","motorcycle","bus","dog_car"],rh={car:{accel:14,maxSpd:18,drag:3,steerMax:.55,steerRate:1.6,aiSpd:7,groundClearance:.26,hitW:.85,hitL:1.8},truck:{accel:9,maxSpd:14,drag:2.5,steerMax:.45,steerRate:1.2,aiSpd:5,groundClearance:.32,hitW:1,hitL:2.1},monster_truck:{accel:11,maxSpd:16,drag:2,steerMax:.4,steerRate:1,aiSpd:5,groundClearance:.78,hitW:1.1,hitL:2},limo:{accel:12,maxSpd:22,drag:2,steerMax:.3,steerRate:.9,aiSpd:9,groundClearance:.28,hitW:.9,hitL:3.2},motorcycle:{accel:18,maxSpd:28,drag:3.5,steerMax:.7,steerRate:2.2,aiSpd:11,groundClearance:.34,hitW:.3,hitL:.8},bus:{accel:6,maxSpd:10,drag:1.5,steerMax:.28,steerRate:.7,aiSpd:4,groundClearance:.36,hitW:1,hitL:2.8},dog_car:{accel:14,maxSpd:18,drag:3,steerMax:.55,steerRate:1.6,aiSpd:7,groundClearance:.26,hitW:.85,hitL:1.8}};function ri(i,t,e,n,s,o,r,a){const l=new de;l.add(new Jt(new fe(s,o*2,o*2),r));const c=new Jt(new fe(s+.04,o*1.2,o*1.2),a);return l.add(c),l.position.set(t,e,n),i.add(l),l}function p_(i,t,e){const n=ge(t.body),s=ge(t.trim),o=ge("#bfdbfe",{transparent:!0,opacity:.75}),r=ge("#18181b"),a=ge("#a1a1aa"),l=ge("#fef9c3",{emissive:"#fef9c3",emissiveIntensity:.6}),c=ge("#991b1b",{emissive:"#991b1b",emissiveIntensity:.4}),h=new de,u=[];if(i==="car"){const d=vt(1.8,.5,3.8,n);d.position.set(0,.35,0),h.add(d);const f=vt(1.45,.44,2,n);f.position.set(0,.82,-.05),h.add(f);const g=new Jt(new fe(1.25,.36,.07),o);g.position.set(0,.83,.97),g.rotation.x=.38,h.add(g);const _=new Jt(new fe(1.25,.36,.07),o);_.position.set(0,.83,-1.07),_.rotation.x=-.38,h.add(_);for(const v of[-.73,.73]){const x=vt(.07,.3,1.65,o);x.position.set(v,.82,-.05),h.add(x)}for(const[v,x,y]of[[-.95,0,1.25],[.95,0,1.25],[-.95,0,-1.25],[.95,0,-1.25]])u.push(ri(h,v,x,y,.24,.26,r,a));for(const v of[-.55,.55]){const x=vt(.38,.17,.06,l);x.position.set(v,.36,1.92),h.add(x)}for(const v of[-.55,.55]){const x=vt(.34,.15,.06,c);x.position.set(v,.36,-1.92),h.add(x)}const m=vt(1.85,.22,.12,s);m.position.set(0,.17,1.96),h.add(m);const p=vt(1.85,.22,.12,s);p.position.set(0,.17,-1.96),h.add(p);for(const[v,x]of[[-.91,.4],[.91,.4],[-.91,-.5],[.91,-.5]]){const y=vt(.04,.06,.22,a);y.position.set(v,.55,x),h.add(y)}}else if(i==="truck"){const d=vt(2,.55,4.2,n);d.position.set(0,.35,0),h.add(d);const f=vt(1.9,.6,2,n);f.position.set(0,.93,.9),h.add(f);const g=new Jt(new fe(1.5,.38,.07),o);g.position.set(0,.95,1.92),g.rotation.x=.35,h.add(g);for(const y of[-.95,.95]){const R=vt(.07,.32,1.6,o);R.position.set(y,.95,.9),h.add(R)}const _=vt(1.9,.12,1.9,ge("#92400e"));_.position.set(0,.62,-1),h.add(_);for(const[y,R,w,T]of[[0,1.9,.45,-2],[-.9,.12,.45,-1],[.9,.12,.45,-1]]){const P=vt(R,w,.12,ge("#92400e"));P.position.set(y,.85,T),h.add(P)}const m=vt(.12,.45,1.9,ge("#92400e"));m.position.set(-.9,.85,-1),h.add(m);const p=vt(.12,.45,1.9,ge("#92400e"));p.position.set(.9,.85,-1),h.add(p);for(const y of[-.65,.65]){const R=vt(.38,.18,.06,l);R.position.set(y,.38,2.12),h.add(R)}for(const y of[-.65,.65]){const R=vt(.35,.16,.06,c);R.position.set(y,.38,-2.12),h.add(R)}const v=vt(2.05,.22,.13,s);v.position.set(0,.17,2.16),h.add(v);const x=vt(2.05,.22,.13,s);x.position.set(0,.17,-2.16),h.add(x);for(const[y,R]of[[-1.05,1.4],[1.05,1.4],[-1.05,-1.3],[1.05,-1.3]])u.push(ri(h,y,.1,R,.28,.32,r,a))}else if(i==="monster_truck"){const d=vt(2.2,.6,4,n);d.position.set(0,.85,0),h.add(d);const f=vt(2,.65,2.1,n);f.position.set(0,1.55,-.1),h.add(f);const g=new Jt(new fe(1.7,.4,.08),o);g.position.set(0,1.57,1.07),g.rotation.x=.33,h.add(g);for(const m of[-1,1]){const p=vt(.08,.38,1.8,o);p.position.set(m,1.55,-.1),h.add(p)}for(const[m,p]of[[-1.3,1.5],[1.3,1.5],[-1.3,-1.5],[1.3,-1.5]])u.push(ri(h,m,0,p,.36,.78,r,a));for(const m of[-.7,.7]){const p=vt(.4,.2,.07,l);p.position.set(m,.9,2.06),h.add(p)}for(const m of[-.7,.7]){const p=vt(.4,.18,.07,c);p.position.set(m,.9,-2.06),h.add(p)}const _=vt(2.3,.28,.18,s);_.position.set(0,.5,2.09),h.add(_)}else if(i==="limo"){const d=ge("#1e3a5f"),f=ge("#d4af37"),g=vt(1.85,.5,6.5,d);g.position.set(0,.35,0),h.add(g);const _=vt(1.6,.45,4.8,d);_.position.set(0,.82,-.3),h.add(_);const m=new Jt(new fe(1.35,.36,.07),o);m.position.set(0,.83,3.18),m.rotation.x=.32,h.add(m);const p=new Jt(new fe(1.35,.36,.07),o);p.position.set(0,.83,-3.38),p.rotation.x=-.32,h.add(p);for(const w of[-.93,.93])for(let T=0;T<5;T++){const P=vt(.07,.28,.56,o);P.position.set(w,.83,2.5-T*.85),h.add(P)}const v=vt(1.86,.06,6.52,f);v.position.set(0,.61,0),h.add(v);const x=vt(1.86,.06,6.52,f);x.position.set(0,1.04,0),h.add(x);for(const w of[-.6,.6]){const T=vt(.4,.17,.06,l);T.position.set(w,.36,3.27),h.add(T)}for(const w of[-.6,.6]){const T=vt(.38,.15,.06,c);T.position.set(w,.36,-3.27),h.add(T)}const y=vt(1.9,.22,.12,f);y.position.set(0,.17,3.32),h.add(y);const R=vt(1.9,.22,.12,f);R.position.set(0,.17,-3.32),h.add(R);for(const[w,T]of[[-.98,2.4],[.98,2.4],[-.98,0],[.98,0],[-.98,-2.4],[.98,-2.4]])u.push(ri(h,w,0,T,.24,.28,r,a))}else if(i==="motorcycle"){const d=vt(.4,.3,1.6,n);d.position.set(0,.62,0),h.add(d);const f=vt(.38,.2,.55,n);f.position.set(0,.82,.1),h.add(f);const g=vt(.35,.1,.6,ge("#111"));g.position.set(0,.87,-.3),h.add(g);const _=vt(.06,.35,.06,s);_.position.set(0,.82,.72),h.add(_);const m=vt(.72,.06,.06,s);m.position.set(0,1,.72),h.add(m);const p=vt(.07,.07,.9,ge("#71717a"));p.position.set(.22,.42,-.2),p.rotation.z=.15,h.add(p);const v=vt(.22,.18,.06,l);v.position.set(0,.7,.85),h.add(v),u.push(ri(h,0,0,.75,.14,.34,r,a)),u.push(ri(h,0,0,-.75,.14,.34,r,a))}else if(i==="bus"){const d=ge("#fbbf24"),f=ge("#18181b"),g=vt(2.2,1.5,5.8,d);g.position.set(0,1,0),h.add(g);const _=vt(2.2,1.5,.15,f);_.position.set(0,1,2.97),h.add(_);const m=new Jt(new fe(1.9,.9,.09),o);m.position.set(0,1.15,2.95),h.add(m);for(const v of[-1.11,1.11])for(let x=0;x<6;x++){const y=vt(.09,.55,.68,o);y.position.set(v,1.25,2.1-x*.82),h.add(y)}const p=vt(1.6,.28,.08,ge("#1e3a5f"));p.position.set(0,2.05,2.98),h.add(p);for(const v of[-.7,.7]){const x=vt(.5,.2,.07,c);x.position.set(v,.5,-2.97),h.add(x)}for(const v of[-.7,.7]){const x=vt(.4,.22,.07,l);x.position.set(v,.5,2.97),h.add(x)}for(const[v,x]of[[-1.15,2.2],[1.15,2.2],[-1.15,0],[1.15,0],[-1.15,-2.2],[1.15,-2.2]])u.push(ri(h,v,0,x,.3,.36,r,a))}else if(i==="dog_car"){const d=ge("#92400e"),f=ge("#111827"),g=ge("#111827"),_=vt(1.8,.55,3.6,d);_.position.set(0,.38,0),h.add(_);const m=vt(1.7,.5,2,d);m.position.set(0,.88,0),h.add(m);const p=vt(.9,.35,.55,ge("#b45309"));p.position.set(0,.7,1.1),h.add(p);const v=vt(.3,.2,.1,f);v.position.set(0,.82,1.36),h.add(v);for(const w of[-.38,.38]){const T=vt(.12,.12,.08,g);T.position.set(w,1,1.1),h.add(T)}for(const w of[-.55,.55]){const T=vt(.38,.38,.42,d);T.position.set(w,1.45,.3),h.add(T)}const x=vt(.18,.35,.35,d);x.position.set(0,.9,-1.82),x.rotation.x=-.5,h.add(x);for(const w of[-.55,.55]){const T=vt(.32,.17,.06,l);T.position.set(w,.38,1.82),h.add(T)}for(const w of[-.55,.55]){const T=vt(.3,.15,.06,c);T.position.set(w,.38,-1.82),h.add(T)}const y=vt(1.85,.22,.12,ge("#b45309"));y.position.set(0,.17,1.86),h.add(y);const R=vt(1.85,.22,.12,ge("#b45309"));R.position.set(0,.17,-1.86),h.add(R);for(const[w,T]of[[-.95,1.2],[.95,1.2],[-.95,-1.2],[.95,-1.2]])u.push(ri(h,w,0,T,.24,.26,r,a))}return{g:h,wheels:u}}class ah{constructor(t,{wx:e,wy:n,wz:s,seed:o,heading:r=0,vehicleType:a}){this.pos=new O(e,n,s),this.heading=r,this.speed=0,this.steer=0,this._velY=0,this.occupied=!1,this._scene=t,this._inIntersection=!1,this._stuckTimer=0,this._lastPos=new O(e,n,s);const l=f_(o),c=oh[Math.floor(l()*oh.length)];this.vehicleType=a||Er[Math.floor(l()*Er.length)],this._physics=rh[this.vehicleType]||rh.car;const{g:h,wheels:u}=p_(this.vehicleType,c);this._wheels=u,h.position.copy(this.pos),h.rotation.y=r,t.add(h),this._group=h,this._wheelRot=0}update(t,e,n,s,o){this.occupied&&e?this._playerUpdate(t,e):this.occupied||this._aiUpdate(t,n,s),this._applyMovement(t,o),!this.occupied&&s&&this._constrainToRoad(s)}_constrainToRoad(t){const e=t(this.pos.x,this.pos.z);if(!e)return;const n=us(e.localX,Fe),s=us(e.localZ,Fe),o=Math.floor(n),r=Math.floor(s),a=o<te&&r>=te,l=r<te&&o>=te,c=te-un;let h=!1;a?n<un?(this.pos.x+=un+.5-n,h=!0):n>c&&(this.pos.x+=c-.5-n,h=!0):l&&(s<un?(this.pos.z+=un+.5-s,h=!0):s>c&&(this.pos.z+=c-.5-s,h=!0)),h&&this._group.position.copy(this.pos)}_playerUpdate(t,e){const{accel:n,maxSpd:s,drag:o,steerMax:r,steerRate:a}=this._physics;if(e.KeyW||e.ArrowUp?this.speed=Math.min(this.speed+n*t,s):e.KeyS||e.ArrowDown?this.speed=Math.max(this.speed-n*t,-s*.4):(this.speed*=Math.exp(-o*t),Math.abs(this.speed)<.05&&(this.speed=0)),Math.abs(this.speed)>.2){const l=e.KeyA||e.ArrowLeft,c=e.KeyD||e.ArrowRight,h=typeof e._analogSteer=="number"?e._analogSteer:void 0,u=h!==void 0?h*r:l?-r:c?r:0,d=Math.abs(u)>.02||l||c?a*8:14;this.steer+=(u-this.steer)*Math.min(1,d*t)}else this.steer*=Math.exp(-8*t),Math.abs(this.steer)<.001&&(this.steer=0);this.steer=Math.max(-r,Math.min(r,this.steer)),this.heading+=this.steer*this.speed*u_*t}_aiUpdate(t,e,n){const{aiSpd:s}=this._physics,o=n?n(this.pos.x,this.pos.z):null;if(!o){this.speed=Math.max(0,this.speed-6*t);return}const r=us(Math.floor(o.localX),Fe),a=us(Math.floor(o.localZ),Fe);if(r<te&&a<te){if(!this._inIntersection){this._inIntersection=!0;const c=Math.random();c<.3?this.heading-=Math.PI/2:c<.55&&(this.heading+=Math.PI/2),this.heading=Math.round(this.heading/(Math.PI/2))*(Math.PI/2)}}else{if(this._inIntersection=!1,e){const c=un+2,h=this.pos.x+Math.sin(this.heading)*c,u=this.pos.z+Math.cos(this.heading)*c,d=n(h,u);if(d){const f=us(Math.floor(d.localX),Fe),g=us(Math.floor(d.localZ),Fe);if(f<te&&g<te&&!e.isGreenForHeading(this.heading)){this.speed=Math.max(0,this.speed-10*t);return}}}this._stuckTimer+=t,this._stuckTimer>3&&(this.pos.distanceTo(this._lastPos)<1&&(this.heading+=(Math.random()<.5?1:-1)*Math.PI/2,this.heading=Math.round(this.heading/(Math.PI/2))*(Math.PI/2)),this._stuckTimer=0,this._lastPos.copy(this.pos))}this.speed=Math.min(s,this.speed+6*t)}_getSurfaceY(t){const e=Math.floor(this.pos.x),n=Math.floor(this.pos.z),s=Math.min(Math.floor(this.pos.y)+3,62);for(let o=s;o>=Math.max(0,s-24);o--)if(t(e,o,n)!==0)return o+1;return Math.floor(this.pos.y)}_hitsSolid(t,e,n){const{hitW:s,hitL:o}=this._physics,r=Math.floor(this.pos.y),a=Math.sin(this.heading),l=Math.cos(this.heading);for(const[c,h]of[[-o,-s],[-o,s],[o,-s],[o,s]]){const u=Math.floor(t+a*c+l*h),d=Math.floor(e+l*c-a*h);if(n(u,r,d)!==0||n(u,r+1,d)!==0)return!0}return!1}_applyMovement(t,e){const n=Math.sin(this.heading)*this.speed*t,s=Math.cos(this.heading)*this.speed*t;if(e){this._hitsSolid(this.pos.x+n,this.pos.z,e)?this.speed*=.3:this.pos.x+=n,this._hitsSolid(this.pos.x,this.pos.z+s,e)?this.speed*=.3:this.pos.z+=s;const o=this._getSurfaceY(e)+this._physics.groundClearance;this.pos.y>o+.05?(this._velY-=30*t,this.pos.y+=this._velY*t,this.pos.y<o&&(this.pos.y=o,this._velY=0)):(this.pos.y=o,this._velY=0)}else this.pos.x+=n,this.pos.z+=s;this._group.position.copy(this.pos),this._group.rotation.y=this.heading,this._wheelRot+=this.speed*t*2.5;for(let o=0;o<this._wheels.length;o++)this._wheels[o].rotation.x=-this._wheelRot,o<2&&(this._wheels[o].rotation.y=(this.occupied?this.steer:0)*.45)}dispose(){var t;(t=this._group.parent)==null||t.remove(this._group),this._group.traverse(e=>{e.isMesh&&(e.geometry.dispose(),e.material.dispose())})}}class m_{constructor(t){this._scene=t,this._cars=new Map,this._chunks=new Map}spawnForChunk(t,e){if(this._chunks.has(t))return;const n=[];for(const s of e){const o=`car:${s.wx.toFixed(1)},${s.wz.toFixed(1)}`;this._cars.has(o)||this._cars.set(o,new ah(this._scene,s)),n.push(o)}this._chunks.set(t,n)}despawnChunk(t){const e=this._chunks.get(t);if(e){for(const n of e){const s=this._cars.get(n);s&&!s.occupied&&(s.dispose(),this._cars.delete(n))}this._chunks.delete(t)}}getNearest(t,e=3.5){let n=null,s=e*e;for(const o of this._cars.values()){const r=t.x-o.pos.x,a=t.z-o.pos.z,l=r*r+a*a;l<s&&(s=l,n=o)}return n}deployAt(t,e,n,s,o,r){const a=Math.floor(e*7411+s*5003+Date.now()),l=`car:${e.toFixed(1)},${s.toFixed(1)}`;if(!this._cars.has(l)){const c=new ah(t,{wx:e,wy:n,wz:s,seed:a,heading:o,vehicleType:r});this._cars.set(l,c)}}update(t,e,n,s,o,r){for(const a of this._cars.values()){const l=a===n;a.update(t,l?e:null,s,o,l?r:null)}}}class g_{constructor(t){this._scene=t,this._stops=new Map}spawnForChunk(t,e){if(this._stops.has(t))return;const n=new Qe({color:"#6b7280"}),s=new Qe({color:"#1e3a5f"}),o=new Qe({color:"#fbbf24"}),r=[];for(const a of e){const l=new de;for(const u of[-.7,.7]){const d=new Jt(new fe(.1,2,.1),n);d.position.set(u,1,0),l.add(d)}const c=new Jt(new fe(2.2,.15,.8),s);c.position.set(0,2.07,0),l.add(c);const h=new Jt(new fe(.6,.5,.08),o);h.position.set(-.7,1.4,.09),l.add(h),l.position.set(a.wx,24,a.wz),this._scene.add(l),r.push({group:l,data:a})}this._stops.set(t,r)}despawnChunk(t){const e=this._stops.get(t);if(e){for(const{group:n}of e)this._scene.remove(n),n.traverse(s=>{s.isMesh&&(s.geometry.dispose(),s.material.dispose())});this._stops.delete(t)}}getNearest(t,e){let n=null,s=e*e;for(const o of this._stops.values())for(const{data:r}of o){const a=t.x-r.wx,l=t.z-r.wz,c=a*a+l*l;c<s&&(s=c,n=r)}return n}}const no=9,rl=2,__=(no+rl)*2;function al(i,t){return(i%t+t)%t}function mi(i,t={}){return new Qe({color:i,...t})}function xs(i,t,e,n){return new Jt(new fe(i,t,e),n)}function x_(i,t){const e=new de,n=mi(8947848),s=xs(.08,2,.08,n);s.position.set(0,1,0),e.add(s);const o=mi(13373713),r=mi(16777215),a=new xr(.28,.28,.06,8),l=new xr(.32,.32,.04,8),c=new Jt(l,r),h=new Jt(a,o);h.rotation.y=Math.PI/8,c.rotation.y=Math.PI/8,h.position.set(0,2.1,0),c.position.set(0,2.1,0),e.add(c),e.add(h);const u=mi(16777215),d=xs(.36,.04,.08,u);return d.position.set(0,2.1,0),e.add(d),e.position.set(i,Xi+1,t),e}function v_(i,t){const e=new de,n=mi(4473924),s=mi(1118481),o=xs(.1,3,.1,n);o.position.set(0,1.5,0),e.add(o);const r=xs(.8,.1,.1,n);r.position.set(.4,3.1,0),e.add(r);const a=xs(.28,.85,.28,s);a.position.set(.8,3.1,0),e.add(a);const l=mi(1118481);for(let u=-1;u<=1;u++){const d=xs(.3,.05,.18,l);d.position.set(.8,3.1+u*.27+.14,.12),e.add(d)}const c=[{name:"red",offColor:4849664,onColor:16719904,emissiveOn:new Ct(16711680),y:.27},{name:"yellow",offColor:3811840,onColor:16763904,emissiveOn:new Ct(16755200),y:0},{name:"green",offColor:13056,onColor:2289186,emissiveOn:new Ct(52224),y:-.27}],h={};for(const u of c){const d=new bl(.09,8,8),f=mi(u.offColor,{emissive:0}),g=new Jt(d,f);g.position.set(.8,3.1+u.y,.01),e.add(g),h[u.name]={mesh:g,offColor:new Ct(u.offColor),onColor:new Ct(u.onColor),emissiveOn:u.emissiveOn}}return e.position.set(i,Xi+1,t),{group:e,lights:h}}class M_{constructor(t){this.scene=t,this._tl=new Map,this._signs=new Map,this._time=0}_state(t,e){const n=al(t,__);if(e)return n<no?"green":n<no+rl?"yellow":"red";{const s=no+rl;return n<s?"red":n<s+no?"green":"yellow"}}isGreenForHeading(t){const e=(t%(Math.PI*2)+Math.PI*2)%(Math.PI*2),n=e<Math.PI/4||e>7*Math.PI/4||e>3*Math.PI/4&&e<5*Math.PI/4;return this._state(this._time,n)!=="red"}spawnForChunk(t,e){if(this._tl.has(t))return;const n=[],s=[];for(const o of e)if(o.kind==="light"){const{group:r,lights:a}=v_(o.wx,o.wz);this.scene.add(r),n.push({group:r,lights:a,isNS:o.isNS})}else{const r=x_(o.wx,o.wz);this.scene.add(r),s.push(r)}this._tl.set(t,n),this._signs.set(t,s)}despawnChunk(t){for(const e of this._tl.get(t)||[])this.scene.remove(e.group),e.group.traverse(n=>{n.isMesh&&(n.geometry.dispose(),n.material.dispose())});for(const e of this._signs.get(t)||[])this.scene.remove(e),e.traverse(n=>{n.isMesh&&(n.geometry.dispose(),n.material.dispose())});this._tl.delete(t),this._signs.delete(t)}update(t){this._time+=t;for(const e of this._tl.values())for(const n of e){const s=this._state(this._time,n.isNS);for(const[o,r]of Object.entries(n.lights)){const a=o===s;r.mesh.material.color.set(a?r.onColor:r.offColor),r.mesh.material.emissive.set(a?r.emissiveOn:new Ct(0))}}}}function y_(i,t,e,n){const o=[],r=new Set,a=un-1,l=te-un;for(let c=0;c<16;c++)for(let h=0;h<16;h++){const u=i*16+c,d=t*16+h,f=n(u,d);if(!f)continue;const g=al(Math.floor(f.localX),Fe),_=al(Math.floor(f.localZ),Fe);if(g<te&&_<te){if(g===l&&_===a){const m=`tl:${u},${d}`;r.has(m)||(r.add(m),o.push({kind:"light",wx:u+.5,wz:d+.5,isNS:!0}))}if(g===a&&_===l){const m=`tl:${u},${d}`;r.has(m)||(r.add(m),o.push({kind:"light",wx:u+.5,wz:d+.5,isNS:!1}))}if(g===a&&_===a){const m=`sg:${u},${d}`;r.has(m)||(r.add(m),o.push({kind:"stop",wx:u+.5,wz:d+.5}))}if(g===l&&_===l){const m=`sg2:${u},${d}`;r.has(m)||(r.add(m),o.push({kind:"stop",wx:u+.5,wz:d+.5}))}}}return o}function Vt(i){return new Qe({color:i})}function st(i,t,e,n){return new Jt(new fe(i,t,e),n)}function md(i){let t=i*1664525+1013904223>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967295)}function gd(i){const t=new de,e=Vt("#f2f2ee"),n=Vt("#aaa"),s=.72,o=.52,r=.44,a=.14,l=.38,c=st(s,o,r,e);c.position.set(0,l+o/2,0),t.add(c);const h=st(s*.9,o*.35,r*.85,e);h.position.set(0,l+o+o*.15,0),t.add(h);function u(w,T){const P=st(a,l,a,n);return P.position.set(w,l/2,T),t.add(P),P}const d=s*.3,f=r*.28,g=u(-d,-f),_=u(d,-f),m=u(-d,f),p=u(d,f),v=st(.32,.28,.3,n);v.position.set(0,l+o*.75,-r/2-.1),t.add(v);const x=Vt("#999"),y=st(.06,.14,.05,x);y.position.set(-.16,l+o+.03,-r/2-.05),y.rotation.z=.4,t.add(y);const R=st(.06,.14,.05,x);return R.position.set(.16,l+o+.03,-r/2-.05),R.rotation.z=-.4,t.add(R),{g:t,legFL:g,legFR:_,legBL:m,legBR:p,head:v}}function S_(i){const t=new de,e=i()>.5?"#5c3a1a":"#222",n=Vt(e),s=Vt("#f0f0f0"),o=Vt("#d4a070"),r=.94,a=.6,l=.52,c=.22,h=.52,u=st(r,a,l,n);u.position.set(0,h+a/2,0),t.add(u);const d=st(r*.5,a*.6,.03,s);d.position.set(.12,h+a/2,l/2+.01),t.add(d);function f(P,b){const M=st(c,h,c,n);return M.position.set(P,h/2,b),t.add(M),M}const g=r*.31,_=l*.3,m=f(-g,-_),p=f(g,-_),v=f(-g,_),x=f(g,_),y=new de;y.position.set(0,h+a*.72,-l/2);const R=st(.44,.38,.36,n);R.position.set(0,0,-.14),y.add(R);const w=st(.3,.24,.18,o);w.position.set(0,-.05,-.32),y.add(w),t.add(y);const T=st(.32,.12,.22,Vt("#f0c0b0"));return T.position.set(0,h+.08,l*.2),t.add(T),{g:t,legFL:m,legFR:p,legBL:v,legBR:x,head:y}}function b_(i){const t=new de,e=["#7a3a10","#3a2010","#888","#c8a060"][Math.floor(i()*4)],n=Vt(e),s=Vt("#2a1808"),o=Vt("#2a1808"),r=1,a=.64,l=.48,c=.2,h=.72,u=st(r,a,l,n);u.position.set(0,h+a/2,0),t.add(u);function d(T,P){const b=st(c,h,c,o);return b.position.set(T,h/2,P),t.add(b),b}const f=r*.3,g=l*.3,_=d(-f,-g),m=d(f,-g),p=d(-f,g),v=d(f,g),x=st(.28,.4,.24,n);x.position.set(0,h+a*.8,-l/2-.06),x.rotation.x=-.3,t.add(x);const y=st(.28,.3,.4,n);y.position.set(0,h+a*.85+.28,-l/2-.32),t.add(y);const R=st(.14,.4,.18,s);R.position.set(0,h+a*.85+.3,-l/2-.1),t.add(R);const w=st(.14,.38,.1,s);return w.position.set(0,h+a*.72,l/2+.05),w.rotation.x=.5,t.add(w),{g:t,legFL:_,legFR:m,legBL:p,legBR:v,head:y}}function E_(i){const t=new de,e=["#c8820a","#8B5020","#f0d090","#222"][Math.floor(i()*4)],n=Vt(e);Vt(e);const s=.6,o=.4,r=.38,a=.14,l=.36,c=st(s,o,r,n);c.position.set(0,l+o/2,0),t.add(c);function h(T,P){const b=st(a,l,a,n);return b.position.set(T,l/2,P),t.add(b),b}const u=s*.3,d=r*.28,f=h(-u,-d),g=h(u,-d),_=h(-u,d),m=h(u,d),p=st(.3,.28,.28,n);p.position.set(0,l+o*.72,-r/2-.08),t.add(p);const v=st(.18,.14,.16,Vt("#8B5020"));v.position.set(0,l+o*.56,-r/2-.2),t.add(v);const x=Vt("#7a4010"),y=st(.08,.18,.1,x);y.position.set(-.18,l+o*.72-.06,-r/2-.04),y.rotation.z=.3,t.add(y);const R=st(.08,.18,.1,x);R.position.set(.18,l+o*.72-.06,-r/2-.04),R.rotation.z=-.3,t.add(R);const w=st(.08,.26,.08,n);return w.position.set(0,l+o*.72,r/2+.04),w.rotation.x=-.6,t.add(w),{g:t,legFL:f,legFR:g,legBL:_,legBR:m,head:p}}function T_(i){const t=new de,e=Vt("#777"),n=Vt("#444"),s=.72,o=.48,r=.44,a=.16,l=.42,c=st(s,o,r,e);c.position.set(0,l+o/2,0),t.add(c);const h=st(s*.7,o*.4,r*.7,n);h.position.set(0,l+o*.78,r*.04),t.add(h);function u(P,b){const M=st(a,l,a,n);return M.position.set(P,l/2,b),t.add(M),M}const d=s*.3,f=r*.28,g=u(-d,-f),_=u(d,-f),m=u(-d,f),p=u(d,f),v=st(.36,.32,.36,e);v.position.set(0,l+o*.76,-r/2-.1),t.add(v);const x=st(.22,.16,.22,n);x.position.set(0,l+o*.58,-r/2-.24),t.add(x);const y=Vt("#555"),R=st(.1,.16,.06,y);R.position.set(-.14,l+o+.12,-r/2-.06),t.add(R);const w=st(.1,.16,.06,y);w.position.set(.14,l+o+.12,-r/2-.06),t.add(w);const T=st(.16,.3,.14,e);return T.position.set(0,l+o*.72,r/2+.06),T.rotation.x=.7,t.add(T),{g:t,legFL:g,legFR:_,legBL:m,legBR:p,head:v}}function w_(i){const t=new de,e=i()>.5,n=Vt(e?"#ddd":"#aaa"),s=Vt("#c8a060"),o=.66,r=.46,a=.4,l=.14,c=.4,h=st(o,r,a,n);h.position.set(0,c+r/2,0),t.add(h);function u(w,T){const P=st(l,c,l,n);return P.position.set(w,c/2,T),t.add(P),P}const d=o*.3,f=a*.28,g=u(-d,-f),_=u(d,-f),m=u(-d,f),p=u(d,f),v=st(.3,.28,.3,n);v.position.set(0,c+r*.76,-a/2-.08),t.add(v);const x=st(.06,.18,.06,s);x.position.set(-.12,c+r+.16,-a/2-.04),x.rotation.z=.2,t.add(x);const y=st(.06,.18,.06,s);y.position.set(.12,c+r+.16,-a/2-.04),y.rotation.z=-.2,t.add(y);const R=st(.08,.14,.06,Vt("#ccc"));return R.position.set(0,c+r*.42,-a/2-.14),t.add(R),{g:t,legFL:g,legFR:_,legBL:m,legBR:p,head:v}}function A_(i){const t=new de,e=i()>.4?"#f0f0ee":"#c8b090",n=Vt(e),s=Vt(e),o=Vt("#f070a0"),r=.3,a=.32,l=.26,c=.1,h=.22,u=st(r,a,l,n);u.position.set(0,h+a/2+.06,0),t.add(u);const d=st(r*.9,a*.6,l*.7,n);d.position.set(0,h+.14,l*.2),t.add(d);function f(w,T){const P=st(c,h,c,n);return P.position.set(w,h/2,T),t.add(P),P}const g=f(-r*.28,-l*.22),_=f(r*.28,-l*.22),m=f(-r*.26,l*.24),p=f(r*.26,l*.24),v=st(.24,.22,.22,n);v.position.set(0,h+a+.08,-l/2-.02),t.add(v);const x=st(.06,.28,.06,s);x.position.set(-.08,h+a+.3,-l/2+.02),t.add(x);const y=st(.06,.28,.06,s);y.position.set(.08,h+a+.3,-l/2+.02),t.add(y);const R=st(.06,.06,.02,o);return R.position.set(0,h+a+.06,-l/2-.12),t.add(R),{g:t,legFL:g,legFR:_,legBL:m,legBR:p,head:v}}function R_(i){const t=new de,e=Vt("#9a5a20"),n=Vt("#6a3a10"),s=Vt("#7a5030"),o=.78,r=.56,a=.46,l=.15,c=.68,h=st(o,r,a,e);h.position.set(0,c+r/2,0),t.add(h);const u=st(o*.6,r*.4,.04,Vt("#f0e8d0"));u.position.set(0,c+r*.35,a/2+.01),t.add(u);function d(R,w){const T=st(l,c,l,n);return T.position.set(R,c/2,w),t.add(T),T}const f=o*.3,g=a*.28,_=d(-f,-g),m=d(f,-g),p=d(-f,g),v=d(f,g),x=st(.26,.3,.3,e);x.position.set(0,c+r*.82,-a/2-.08),t.add(x);const y=st(.18,.16,.16,Vt("#c09060"));if(y.position.set(0,c+r*.66,-a/2-.2),t.add(y),i()>.4){const R=st(.04,.28,.04,s);R.position.set(-.1,c+r+.24,-a/2-.04),R.rotation.z=.15,t.add(R);const w=st(.04,.28,.04,s);w.position.set(.1,c+r+.24,-a/2-.04),w.rotation.z=-.15,t.add(w);const T=st(.14,.04,.04,s);T.position.set(-.14,c+r+.32,-a/2-.04),t.add(T);const P=st(.14,.04,.04,s);P.position.set(.14,c+r+.32,-a/2-.04),t.add(P)}return{g:t,legFL:_,legFR:m,legBL:p,legBR:v,head:x}}function C_(i){const t=new de,e=i()>.5?"#3a9a30":"#5ab040",n=Vt(e),s=Vt("#c0e090"),o=Vt("#f8f800"),r=.48,a=.2,l=.42,c=st(r,a,l,n);c.position.set(0,a/2+.06,0),t.add(c);const h=st(r*.7,a*.5,.03,s);h.position.set(0,a*.4,l/2+.01),t.add(h);const u=st(.2,.08,.08,n);u.position.set(-r*.52,.1,-l*.3),t.add(u);const d=st(.2,.08,.08,n);d.position.set(r*.52,.1,-l*.3),t.add(d);const f=st(.12,.1,.28,n);f.position.set(-r*.52,.1,l*.28),f.rotation.y=-.7,t.add(f);const g=st(.12,.1,.28,n);g.position.set(r*.52,.1,l*.28),g.rotation.y=.7,t.add(g);const _=st(r*.88,a*.8,.22,n);_.position.set(0,a*.7,-l/2+.02),t.add(_);const m=st(.12,.12,.1,o);m.position.set(-.16,a+.08,-l/2+.04),t.add(m);const p=st(.12,.12,.1,o);p.position.set(.16,a+.08,-l/2+.04),t.add(p);const v=st(.06,.06,.04,Vt("#000"));v.position.set(-.16,a+.08,-l/2),t.add(v);const x=st(.06,.06,.04,Vt("#000"));return x.position.set(.16,a+.08,-l/2),t.add(x),{g:t,legFL:u,legFR:d,legBL:f,legBR:g,head:_}}function P_(i){const t=new de,e=Vt("#6a4a20"),n=Vt("#7a8a30"),s=Vt("#4a7a30"),o=.68,r=.2,a=.58,l=.16,c=.12,h=st(o,r,a,e);h.position.set(0,c+r/2,0),t.add(h);const u=st(o*.86,r*1.1,a*.86,n);u.position.set(0,c+r+r*.4,0),t.add(u);const d=st(o*.82,.03,.04,Vt("#5a6a20"));d.position.set(0,c+r+r*.5,0),t.add(d);function f(x,y){const R=st(l,c,l*1.5,s);return R.position.set(x,c/2,y),t.add(R),R}const g=f(-o*.38,-a*.28),_=f(o*.38,-a*.28),m=f(-o*.38,a*.28),p=f(o*.38,a*.28),v=st(.22,.18,.24,s);return v.position.set(0,c+r*.5,-a/2-.06),t.add(v),{g:t,legFL:g,legFR:_,legBL:m,legBR:p,head:v}}function L_(i){const t=new de,e=["#f06020","#2060f0","#f0c020","#20c060","#c040c0"][Math.floor(i()*5)],n=Vt(e),s=Vt(e),o=Vt("#fff"),r=.54,a=.22,l=.28,c=st(r,a,l,n);c.position.set(0,0,0),t.add(c);const h=st(r*.7,a*.85,l*.6,n);h.position.set(0,0,-l*.7),t.add(h);const u=st(r*.5,a*.65,l*.55,n);u.position.set(0,0,l*.72),t.add(u);const d=st(r*.6,a*1.2,.06,s);d.position.set(0,0,l+.08),t.add(d);const f=st(r*.5,a*.7,.06,s);f.position.set(0,a*.86,0),f.rotation.x=Math.PI/2,t.add(f);const g=st(.14,.05,.18,s);g.position.set(-r/2-.04,0,-l*.1),g.rotation.z=.4,t.add(g);const _=st(.14,.05,.18,s);_.position.set(r/2+.04,0,-l*.1),_.rotation.z=-.4,t.add(_);const m=st(.08,.08,.04,o);return m.position.set(-r*.36,.04,-l*.6-.08),t.add(m),{g:t,tail:d}}const lh={sheep:{speed:1.2,flee:!0,fleeR:5,legsPhase:8},cow:{speed:1.4,flee:!0,fleeR:4,legsPhase:7},horse:{speed:3.5,flee:!0,fleeR:7,legsPhase:12},dog:{speed:2.2,flee:!1,fleeR:0,legsPhase:10},wolf:{speed:2.4,flee:!1,fleeR:0,legsPhase:11},goat:{speed:1.8,flee:!0,fleeR:5,legsPhase:9},rabbit:{speed:3.2,flee:!0,fleeR:6,legsPhase:16,hop:!0},deer:{speed:2.8,flee:!0,fleeR:8,legsPhase:13},frog:{speed:.9,flee:!0,fleeR:4,legsPhase:8,hop:!0},turtle:{speed:.4,flee:!0,fleeR:3,legsPhase:4},fish:{speed:1.6,flee:!1,fleeR:0,legsPhase:8,swim:!0}},I_={sheep:gd,cow:S_,horse:b_,dog:E_,wolf:T_,goat:w_,rabbit:A_,deer:R_,frog:C_,turtle:P_,fish:L_};class D_{constructor(t,e,{wx:n,wy:s,wz:o,type:r,seed:a}){this.pos=new O(n,s,o),this.homePos=new O(n,s,o),this.type=r,this._world=e,this._phase=0,this._walkPh=0,this._moving=!1,this._fleeing=!1,this._hopTimer=0,this._hopVelY=0,this._hopOffY=0,this._velY=0;const l=md(a);this._stagger=l()*Math.PI*2,this._wanderTarget=this.pos.clone(),this._wanderTimer=l()*4;const h=(I_[r]||gd)(l);this._group=h.g,this._parts=h,this._group.position.copy(this.pos),t.add(this._group)}_isBlocked(t,e){const n=Math.floor(this.homePos.y)+1;for(const[s,o]of[[0,0],[1,0],[0,1],[1,1]]){const r=Math.floor(t+(s-.5)*.25),a=Math.floor(e+(o-.5)*.25);if(Es(this._world.getBlock(r,n,a)))return!0}return!1}update(t,e){const n=lh[this.type]||lh.sheep;if(this._phase+=t,n.swim){if(this._walkPh+=t*n.legsPhase,this._group.rotation.z=Math.sin(this._walkPh*.5)*.12,this._parts.tail&&(this._parts.tail.rotation.y=Math.sin(this._walkPh)*.5),this._wanderTimer-=t,this._wanderTimer<=0){const d=Math.random()*Math.PI*2,f=3+Math.random()*8;this._wanderTarget.set(this.homePos.x+Math.cos(d)*f,this.homePos.y,this.homePos.z+Math.sin(d)*f),this._wanderTimer=3+Math.random()*5}const c=this._wanderTarget.x-this._group.position.x,h=this._wanderTarget.z-this._group.position.z,u=c*c+h*h;if(u>.1){const d=Math.sqrt(u),f=n.speed*t;this._group.position.x+=c/d*Math.min(f,d),this._group.position.z+=h/d*Math.min(f,d),this._group.rotation.y=Math.atan2(c,h)}return this.pos.copy(this._group.position),!1}let s=n.speed;if(this._fleeing=!1,n.flee&&e){const c=this._group.position.x-e.x,h=this._group.position.z-e.z,u=c*c+h*h;if(u<n.fleeR*n.fleeR){const d=Math.sqrt(u)||1,f=this._group.position.x+c/d*12,g=this._group.position.z+h/d*12;this._wanderTarget.set(f,this.homePos.y,g),this._wanderTimer=2,s=n.speed*2.4,this._fleeing=!0}}if(this._wanderTimer-=t,this._wanderTimer<=0){const c=this._stagger+this._phase*.3+Math.random()*Math.PI*2,h=4+Math.random()*10;this._wanderTarget.set(this.homePos.x+Math.cos(c)*h,this.homePos.y,this.homePos.z+Math.sin(c)*h),this._wanderTimer=3+Math.random()*6}const o=this._wanderTarget.x-this._group.position.x,r=this._wanderTarget.z-this._group.position.z,a=o*o+r*r;if(this._moving=a>.05,this._moving){const c=Math.sqrt(a),h=Math.min(s*t,c),u=this._group.position.x+o/c*h,d=this._group.position.z+r/c*h;this._isBlocked(u,d)?(this._wanderTarget.copy(this._group.position),this._wanderTimer=0):(this._group.position.x=u,this._group.position.z=d),this._group.rotation.y=Math.atan2(o,r),this._walkPh+=t*n.legsPhase}else this._walkPh*=.92;if(!n.swim){const c=Math.floor(this._group.position.x),h=Math.floor(this._group.position.z),u=Math.floor(this._group.position.y);for(let d=0;d<=16&&!(u-d<0);d++)if(this._world.isSolid(c,u-d,h)){this.homePos.y=u-d+.5;break}}if(!n.swim&&!n.hop){this._velY-=22*t,this._velY<-20&&(this._velY=-20);const c=this._group.position.y+this._velY*t;c<=this.homePos.y?(this._group.position.y=this.homePos.y,this._velY=0):this._group.position.y=c}n.hop&&(this._hopTimer-=t,this._moving&&this._hopTimer<=0&&this._hopOffY<=.01&&(this._hopVelY=this.type==="rabbit"?4.5:2.8,this._hopTimer=this.type==="rabbit"?.35:.8),this._hopVelY-=18*t,this._hopOffY=Math.max(0,this._hopOffY+this._hopVelY*t));const l=this._parts;if(l.legFL&&l.legBR){const c=Math.sin(this._walkPh)*.55;l.legFL.rotation.x=c,l.legBR.rotation.x=c,l.legFR.rotation.x=-c,l.legBL.rotation.x=-c}return l.head&&this._moving?l.head.rotation.x=Math.sin(this._walkPh*2)*.06:l.head&&(l.head.rotation.x*=.9,l.head.rotation.y=Math.sin(this._phase*this._stagger*.1+.5)*.2),n.hop?this._group.position.y=this.homePos.y+this._hopOffY:!n.swim&&this._velY===0&&!this._moving&&(this._group.position.y=this.homePos.y+Math.sin(this._phase*.8+this._stagger)*.012),this.pos.copy(this._group.position),!1}dispose(){var t;(t=this._group.parent)==null||t.remove(this._group),this._group.traverse(e=>{e.isMesh&&(e.geometry.dispose(),e.material.dispose())})}}class U_{constructor(t,e){this._scene=t,this._world=e,this._animals=new Map,this._chunks=new Map}spawnForChunk(t,e){if(this._chunks.has(t))return;const n=new Set;for(const s of e){const o=`animal:${s.wx.toFixed(1)},${s.wz.toFixed(1)},${s.type}`;this._animals.has(o)||this._animals.set(o,new D_(this._scene,this._world,s)),n.add(o)}this._chunks.set(t,n)}despawnChunk(t){var n;const e=this._chunks.get(t);if(e){for(const s of e)(n=this._animals.get(s))==null||n.dispose(),this._animals.delete(s);this._chunks.delete(t)}}update(t,e){for(const[n,s]of this._animals)s.update(t,e)}get _npcs(){return this._animals}}const N_=["sheep","sheep","sheep","cow","cow","horse","dog","dog","rabbit","rabbit","deer","deer","goat"],F_=["wolf","wolf","rabbit","rabbit","deer"],ch=["fish","fish","fish","turtle"],O_=["frog","frog","turtle"],k_=["deer","deer","wolf","rabbit","rabbit","frog"];function B_(i,t,e){const n=i.cx,s=i.cz,o=md(n*73856093^s*19349663^(t|0));if(o()>.35)return[];const r=n*xt+8,a=s*xt+8;if(e&&e(r,a))return[];if(!i.data)return[];const l=[[4,4],[4,12],[12,4],[12,12],[8,8]];let c=0,h=-1,u=0;for(const[m,p]of l)for(let v=Ne-1;v>=0;v--){const x=i.data[m+p*xt+v*xt*xt];if(x!==0){h<0&&(h=v,c=x),x===ja&&u++;break}}if(h<0)return[];let d;if(c===ja||u>=3)d=ch;else if(c===od)d=F_;else if(c===Hi)d=O_;else if(c===lo)d=o()>.55?k_:N_;else return[];const f=d===ch,g=1+Math.floor(o()*(f?2:3)),_=[];for(let m=0;m<g;m++){const p=d[Math.floor(o()*d.length)],v=1+Math.floor(o()*14),x=1+Math.floor(o()*14),y=n*xt+v,R=s*xt+x;let w=-1;for(let P=Ne-1;P>=0;P--)if(i.data[v+x*xt+P*xt*xt]!==0){w=P;break}if(w<0)continue;let T;if(f)T=pi-.5;else{if(w<=pi)continue;T=w+.5}_.push({wx:y+.5,wy:T,wz:R+.5,type:p,seed:o()*1e9|0})}return _}const ai=7,z_=8e3;class H_{constructor(t,e=Math.random()*1e4){this.scene=t,this.chunks=new Map,this.seed=e,this._grassQueue=new Map;const n=r=>{let a=r;return()=>(a=a*1664525+1013904223>>>0,a/4294967296)},s=n(e);this.noise2D=kg(s),this.noise3D=Bg(n(e+1));const o=pd();this.atlasTexture=new Qh(o),this.atlasTexture.flipY=!1,this.atlasTexture.magFilter=tn,this.atlasTexture.minFilter=tn,this.solidMat=new Qe({map:this.atlasTexture,vertexColors:!0}),this.transMat=new Qe({map:this.atlasTexture,vertexColors:!0,transparent:!0,alphaTest:.1,side:Un}),this._pendingBuilds=[],this.npcs=new d_(t,this),this.cars=new m_(t),this.busStops=new g_(t),this.traffic=new M_(t),this.animals=new U_(t,this)}cityInfo(t,e){return br(t,e,this.seed)}key(t,e){return`${t},${e}`}getChunk(t,e){return this.chunks.get(this.key(t,e))||null}getBlock(t,e,n){if(e<0||e>=Ne)return ee;const s=Math.floor(t/xt),o=Math.floor(n/xt),r=this.getChunk(s,o);if(!r||!r.data)return ee;const a=(t%xt+xt)%xt,l=(n%xt+xt)%xt;return r.getLocal(a,e,l)}setBlock(t,e,n,s){if(e<0||e>=Ne)return;const o=Math.floor(t/xt),r=Math.floor(n/xt),a=this.getChunk(o,r);if(!a||!a.data)return;const l=(t%xt+xt)%xt,c=(n%xt+xt)%xt;a.setLocal(l,e,c,s),s===ee&&this.getBlock(t,e-1,n)===co&&this._grassQueue.set(`${t},${e-1},${n}`,Date.now()+z_),s!==ee&&(this._grassQueue.delete(`${t},${e},${n}`),this._grassQueue.delete(`${t},${e-1},${n}`));const h=[];l===0&&h.push(this.getChunk(o-1,r)),l===xt-1&&h.push(this.getChunk(o+1,r)),c===0&&h.push(this.getChunk(o,r-1)),c===xt-1&&h.push(this.getChunk(o,r+1));for(const u of h)u&&(u.dirty=!0);this._scheduleBuild(a);for(const u of h)u&&this._scheduleBuild(u)}isSolid(t,e,n){return Es(this.getBlock(t,e,n))}_scheduleBuild(t){this._pendingBuilds.includes(t)||this._pendingBuilds.push(t)}update(t,e){const n=Math.floor(t/xt),s=Math.floor(e/xt);for(let r=-ai;r<=ai;r++)for(let a=-ai;a<=ai;a++){if(r*r+a*a>ai*ai)continue;const l=n+r,c=s+a,h=this.key(l,c);if(!this.chunks.has(h)){const u=new r_(l,c,this);u.generate(this.noise2D,this.noise3D),this.chunks.set(h,u),this._scheduleBuild(u);const d=Zg(l,c,this.seed,(v,x)=>this.cityInfo(v,x));this.npcs.spawnForChunk(h,d);const f=Qg(l,c,this.seed,(v,x)=>this.cityInfo(v,x));this.cars.spawnForChunk(h,f);const g=y_(l,c,this.seed,(v,x)=>this.cityInfo(v,x));this.traffic.spawnForChunk(h,g);const _=e_(l,c,this.seed,(v,x)=>this.cityInfo(v,x));this.npcs.spawnForChunk(h+":shop",_);const m=B_(u,this.seed,(v,x)=>this.cityInfo(v,x));this.animals.spawnForChunk(h,m);const p=t_(l,c,this.seed,(v,x)=>this.cityInfo(v,x));this.busStops.spawnForChunk(h,p)}}for(const[r,a]of this.chunks){const l=a.cx-n,c=a.cz-s;l*l+c*c>(ai+2)*(ai+2)&&(this.npcs.despawnChunk(r),this.npcs.despawnChunk(r+":shop"),this.cars.despawnChunk(r),this.busStops.despawnChunk(r),this.traffic.despawnChunk(r),this.animals.despawnChunk(r),a.dispose(),this.chunks.delete(r))}if(this._grassQueue.size>0){const r=Date.now();for(const[a,l]of this._grassQueue){if(r<l)continue;this._grassQueue.delete(a);const[c,h,u]=a.split(",").map(Number);this.getBlock(c,h,u)===co&&this.getBlock(c,h+1,u)===ee&&this.setBlock(c,h,u,lo)}}let o=0;for(;this._pendingBuilds.length>0&&o<3;){const r=this._pendingBuilds.shift();r&&r.data&&r.dirty&&(r.buildMesh(this.solidMat,this.transMat),o++)}}raycast(t,e,n=5){let s=Math.floor(t.x),o=Math.floor(t.y),r=Math.floor(t.z);const a=e.x,l=e.y,c=e.z,h=Math.sign(a),u=Math.sign(l),d=Math.sign(c),f=Math.abs(1/a),g=Math.abs(1/l),_=Math.abs(1/c);let m=a>0?(Math.ceil(t.x)-t.x)*f:(t.x-Math.floor(t.x))*f,p=l>0?(Math.ceil(t.y)-t.y)*g:(t.y-Math.floor(t.y))*g,v=c>0?(Math.ceil(t.z)-t.z)*_:(t.z-Math.floor(t.z))*_,x=null,y=0;for(;y<n;){const R=this.getBlock(s,o,r);if(R!==ee&&(Es(R)||R===ps))return{wx:s,wy:o,wz:r,face:x};if(m<p?m<v?(y=m,s+=h,m+=f,x=h>0?[-1,0,0]:[1,0,0]):(y=v,r+=d,v+=_,x=d>0?[0,0,-1]:[0,0,1]):p<v?(y=p,o+=u,p+=g,x=u>0?[0,-1,0]:[0,1,0]):(y=v,r+=d,v+=_,x=d>0?[0,0,-1]:[0,0,1]),y>n)break}return null}findLandSpawn(){for(let t=0;t<=12;t++)for(let e=-t;e<=t;e++)for(let n=-t;n<=t;n++){if(Math.abs(e)!==t&&Math.abs(n)!==t)continue;const s=8+e*4,o=8+n*4,r=Math.floor(s/xt),a=Math.floor(o/xt);if(this.chunks.has(this.key(r,a))){for(let l=Ne-1;l>pi;l--)if(Es(this.getBlock(s,l,o)))return{x:s+.5,y:l+2,z:o+.5}}}return null}}const G_=28,V_=9,W_=5,X_=9,Jo=12,q_=1.62,Qo=.3,Y_=1.8,$_=5;class K_{constructor(t,e){this.camera=t,this.world=e,this.pos=new O(0,30,0),this.vel=new O,this.yaw=0,this.pitch=0,this.onGround=!1,this.flying=!1,this.sprinting=!1,this.health=20,this.maxHealth=20,this.hotbar=Array(9).fill(null),this.inventory=Array(18).fill(null),this.selectedSlot=0,this.craftGrid=Array(9).fill(null),this.craftGridSize=2,this.target=null,this.breakProgress=0,this.effectiveBreakTime=.6,this.breakTarget=null,this.breakable=!1,this.keys={},this.spawned=!1,this.addItem(zi,50),this._dir=new O,this._euler=new xn(0,0,0,"YXZ"),this._scrollAccum=0,this._bindInput()}addItem(t,e=1){const n=Vg(t);let s=e;const o=a=>{for(const l of a){if(!l||l.id!==t||l.count>=n)continue;const c=Math.min(s,n-l.count);if(l.count+=c,s-=c,s===0)return}},r=a=>{for(let l=0;l<a.length&&s>0;l++){if(a[l])continue;const c=Math.min(s,n);a[l]={id:t,count:c},s-=c}};o(this.hotbar),o(this.inventory),r(this.hotbar),r(this.inventory)}removeItem(t,e){let n=e;const s=o=>{for(let r=0;r<o.length&&n>0;r++){const a=o[r];if(!a||a.id!==t)continue;const l=Math.min(n,a.count);a.count-=l,n-=l,a.count===0&&(o[r]=null)}};return s(this.hotbar),s(this.inventory),e-n}countItem(t){let e=0;for(const n of[...this.hotbar,...this.inventory])(n==null?void 0:n.id)===t&&(e+=n.count);return e}_bindInput(){document.addEventListener("keydown",t=>{if(this.keys[t.code]=!0,!!this.active){t.code==="KeyG"&&(this.flying=!this.flying,this.vel.set(0,0,0)),t.code==="Space"&&!this.flying&&this.onGround&&(this.vel.y=V_,this.onGround=!1),t.code==="Space"&&this.flying&&(this.vel.y=Jo);for(let e=1;e<=9;e++)t.code===`Digit${e}`&&(this.selectedSlot=e-1,this._onSlotChange())}}),document.addEventListener("keyup",t=>{this.keys[t.code]=!1,t.code==="Space"&&this.flying&&(this.vel.y=0)}),document.addEventListener("mousemove",t=>{if(!this.active)return;const e=.002;this.yaw-=t.movementX*e,this.pitch-=t.movementY*e,this.pitch=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,this.pitch))}),document.addEventListener("wheel",t=>{if(!this.active)return;const e=t.deltaMode===1?t.deltaY*40:t.deltaMode===2?t.deltaY*400:t.deltaY;if(this._scrollAccum+=e,Math.abs(this._scrollAccum)>=120){const n=Math.sign(this._scrollAccum);this.selectedSlot=(this.selectedSlot+n+9)%9,this._onSlotChange(),this._scrollAccum=0}}),document.addEventListener("mousedown",t=>{this.active&&(t.button===0&&this._startBreak(),t.button===2&&this._interact())}),document.addEventListener("mouseup",t=>{this.active&&t.button===0&&(this.breakTarget=null,this.breakProgress=0)}),document.addEventListener("contextmenu",t=>t.preventDefault())}_onSlotChange(){document.dispatchEvent(new CustomEvent("slotChange",{detail:this.selectedSlot}))}_interact(){if(!this.target)return;const{wx:t,wy:e,wz:n,face:s}=this.target,o=this.world.getBlock(t,e,n);if(o===Mr){this.craftGridSize=3,document.dispatchEvent(new CustomEvent("openCrafting",{detail:3}));return}if(o===ui||o===ps){const g=o===ui?ps:ui,_=(m,p,v)=>{const x=this.world.getBlock(m,p,v);if(!(x!==ui&&x!==ps)){this.world.setBlock(m,p,v,g);for(const y of[1,-1]){const R=this.world.getBlock(m,p+y,v);if(R===ui||R===ps){this.world.setBlock(m,p+y,v,g);break}}}};_(t,e,n);for(const[m,p]of[[1,0],[-1,0],[0,1],[0,-1]]){const v=this.world.getBlock(t+m,e,n+p);if(v===ui||v===ps){_(t+m,e,n+p);break}}return}{const g=this.hotbar[this.selectedSlot];if((g==null?void 0:g.id)===Cl&&o===Rl){const _=e+1.26,m=Math.round(this.yaw/(Math.PI/2))*(Math.PI/2),p=Er[Math.floor(Math.random()*Er.length)];this.world.cars.deployAt(this.world.scene,t+.5,_,n+.5,m,p),g.count--,g.count===0&&(this.hotbar[this.selectedSlot]=null);return}}if(!s)return;const r=t+s[0],a=e+s[1],l=n+s[2],c=Math.floor(this.pos.x),h=Math.floor(this.pos.y),u=Math.floor(this.pos.z);if((a===h||a===h+1)&&r===c&&l===u)return;const d=this.hotbar[this.selectedSlot],f=d==null?void 0:d.id;f&&(Mi[f]||mo[f]||(this.world.setBlock(r,a,l,f),d.count--,d.count===0&&(this.hotbar[this.selectedSlot]=null)))}_startBreak(){if(!this.target)return;const{wx:t,wy:e,wz:n}=this.target,s=this.world.getBlock(t,e,n),o=jo(s);!o||o.unbreakable||(this.breakTarget={wx:t,wy:e,wz:n,id:s},this.breakProgress=0,this.effectiveBreakTime=o.breakTime,this.breakable=!0)}_updateBreaking(t){var d,f,g;if(!this.breakTarget)return;const{wx:e,wy:n,wz:s}=this.breakTarget;if(!this.target||this.target.wx!==e||this.target.wy!==n||this.target.wz!==s){this.breakTarget=null,this.breakProgress=0;return}const o=this.world.getBlock(e,n,s),r=jo(o);if(!r||r.unbreakable){this.breakTarget=null,this.breakProgress=0;return}const l=el((d=this.hotbar[this.selectedSlot])==null?void 0:d.id)===r.action;if(this.breakable=!r.requiresTool||l,!this.breakable){this.breakProgress=0,this.effectiveBreakTime=1/0;return}const c=Mi[(f=this.hotbar[this.selectedSlot])==null?void 0:f.id],h=l?(c==null?void 0:c.speed)??1:1,u=l?1:r.handMult??3;if(this.effectiveBreakTime=r.breakTime*u/h,this.breakProgress+=t,this.breakProgress>=this.effectiveBreakTime){if(o!==ee&&!((g=jo(o))!=null&&g.unbreakable)){this.world.setBlock(e,n,s,ee);const _=Gg[o];_?this.addItem(_.id,_.count):this.addItem(o,1)}this.breakTarget=null,this.breakProgress=0}}update(t){this._updateLook(),this._updateMovement(t),this._updateBreaking(t),this._updateTarget(),this._applyCamera()}_updateLook(){}_updateMovement(t){const e=this.flying?Jo:this.keys.ShiftLeft||this.keys.ShiftRight?X_:W_,n=new O(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),s=new O(Math.cos(this.yaw),0,-Math.sin(this.yaw)),o=new O;if((this.keys.KeyW||this.keys.ArrowUp)&&o.add(n),(this.keys.KeyS||this.keys.ArrowDown)&&o.sub(n),(this.keys.KeyD||this.keys.ArrowRight)&&o.add(s),(this.keys.KeyA||this.keys.ArrowLeft)&&o.sub(s),o.lengthSq()>0&&o.normalize().multiplyScalar(e),this.vel.x=o.x,this.vel.z=o.z,this.flying?this.keys.Space?this.vel.y=Jo:this.keys.ControlLeft||this.keys.ControlRight?this.vel.y=-Jo:this.vel.y=0:(this.vel.y-=G_*t,this.vel.y<-40&&(this.vel.y=-40)),!this.flying){const c=Math.floor(this.pos.x),h=Math.floor(this.pos.z);let u=!1;for(let d=0;d<=6;d++){const f=Math.floor(this.pos.y)-d;if(f<0)break;const g=this.world.getBlock(c,f,h);if(g===ho){u=!0;break}if(Es(g))break}u&&(this.vel.y=5.5,this.pos.x=c+.5,this.pos.z=h+.5)}const r=this.pos.x+this.vel.x*t;this._collide(r,this.pos.y,this.pos.z)?this.vel.x=0:this.pos.x=r;const a=this.pos.y+this.vel.y*t;this._collide(this.pos.x,a,this.pos.z,this.vel.y>0)?(this.vel.y<0&&(this.onGround=!0),this.vel.y=0):(this.pos.y=a,this.flying||(this.onGround=!1));const l=this.pos.z+this.vel.z*t;this._collide(this.pos.x,this.pos.y,l)?this.vel.z=0:this.pos.z=l,this.pos.y<1&&(this.pos.y=1,this.vel.y=0,this.onGround=!0),this.pos.y<-10&&(this.health=0,this.pos.set(0,60,0),this.vel.set(0,0,0))}_collide(t,e,n,s=!1){const o=t-Qo,r=t+Qo,a=e,l=e+Y_,c=n-Qo,h=n+Qo;for(let u=Math.floor(o);u<=Math.floor(r-.001);u++)for(let d=Math.floor(a);d<=Math.floor(l-.001);d++)for(let f=Math.floor(c);f<=Math.floor(h-.001);f++){const g=this.world.getBlock(u,d,f);if(Es(g)&&!(s&&g===ho))return!0}return!1}_updateTarget(){const t=this.camera.position.clone(),e=new O(0,0,-1).applyQuaternion(this.camera.quaternion).normalize();this.target=this.world.raycast(t,e,$_)}_applyCamera(){this._euler.set(this.pitch,this.yaw,0,"YXZ"),this.camera.quaternion.setFromEuler(this._euler),this.camera.position.set(this.pos.x,this.pos.y+q_,this.pos.z)}getBreakProgress(){return!this.breakTarget||!this.breakable?0:Math.min(1,this.breakProgress/(this.effectiveBreakTime||1))}getBreakInfo(){var o;if(!this.breakTarget)return null;const t=jo(this.breakTarget.id),e=el((o=this.hotbar[this.selectedSlot])==null?void 0:o.id),n=e===(t==null?void 0:t.action),s=!(t!=null&&t.requiresTool)||n;return{fraction:this.getBreakProgress(),action:(t==null?void 0:t.action)||"break",heldToolAction:e,name:(t==null?void 0:t.name)||"",canBreak:s,needsTool:s?null:t==null?void 0:t.action}}spawn(t){if(this.spawned)return;const e=t.findLandSpawn();e&&(this.pos.set(e.x,e.y,e.z),this.spawned=!0)}}const Mt=Be,$t=Qt,le=Ds,j_=sd,ua=El,Z_=[{size:2,shapeless:!0,ingredients:[j_],result:{id:Mt,count:4}},{size:2,rows:[[Mt],[Mt]],result:{id:$t,count:4}},{size:2,rows:[[Mt,Mt],[Mt,Mt]],result:{id:Mr,count:1}},{size:3,rows:[[Mt,Mt,Mt],[null,$t,null],[null,$t,null]],result:{id:uo,count:1}},{size:3,rows:[[le,le,le],[null,$t,null],[null,$t,null]],result:{id:uo,count:1}},{size:3,rows:[[Mt,Mt],[Mt,$t],[null,$t]],result:{id:ki,count:1}},{size:3,rows:[[Mt,Mt],[$t,Mt],[$t,null]],result:{id:ki,count:1}},{size:3,rows:[[le,le],[le,$t],[null,$t]],result:{id:ki,count:1}},{size:3,rows:[[le,le],[$t,le],[$t,null]],result:{id:ki,count:1}},{size:3,rows:[[Mt],[$t],[$t]],result:{id:fo,count:1}},{size:3,rows:[[le],[$t],[$t]],result:{id:fo,count:1}},{size:3,rows:[[Mt],[Mt],[$t]],result:{id:po,count:1}},{size:3,rows:[[le],[le],[$t]],result:{id:po,count:1}},{size:3,rows:[[Mt,Mt],[null,$t],[null,$t]],result:{id:Bi,count:1}},{size:3,rows:[[Mt,Mt],[$t,null],[$t,null]],result:{id:Bi,count:1}},{size:3,rows:[[le,le],[null,$t],[null,$t]],result:{id:Bi,count:1}},{size:3,rows:[[le,le],[$t,null],[$t,null]],result:{id:Bi,count:1}},{size:2,rows:[[hn],[$t]],result:{id:ar,count:4}},{size:3,rows:[[Mt,Mt,Mt],[Mt,null,Mt],[Mt,Mt,Mt]],result:{id:bs,count:1}},{size:3,rows:[[le,le,le],[le,null,le],[le,le,le]],result:{id:Za,count:1}},{size:3,rows:[[Dn,Dn,Dn],[Mt,Mt,Mt]],result:{id:Us,count:1}},{size:3,rows:[[ua,ua,ua],[Mt,Mt,Mt]],result:{id:Us,count:1}},{size:3,rows:[[Hi,Hi,Hi]],result:{id:Ze,count:3}},{size:2,rows:[[le,le],[le,le]],result:{id:yr,count:2}},{size:2,rows:[[to,to],[to,to]],result:{id:yr,count:2}},{size:2,shapeless:!0,ingredients:[le,El],result:{id:Hg,count:1}},{size:2,shapeless:!0,ingredients:[Cn,Cn,Ye,Ye],result:{id:Ns,count:4}},{size:2,shapeless:!0,ingredients:[Cn,Cn,Cn,hn],result:{id:Rl,count:4}},{size:2,rows:[[Ye,Ye],[Ye,Ye]],result:{id:ad,count:4}},{size:3,rows:[[Mt,Mt],[Mt,Mt],[Mt,Mt]],result:{id:ui,count:1}},{size:2,shapeless:!0,ingredients:[Tl],result:{id:_e,count:1}},{size:2,shapeless:!0,ingredients:[_e,_e,hn],result:{id:ms,count:2}},{size:3,rows:[[Mt,null],[Mt,Mt],[$t,$t]],result:{id:hi,count:1}},{size:3,rows:[[Mt,Mt,Mt],[null,$t,null],[null,$t,null]],result:{id:lr,count:2}},{size:2,shapeless:!0,ingredients:[Ko,Ze],result:{id:je,count:1}},{size:3,rows:[[Ye,Ye,Ye],[Mt,Mt,Mt]],result:{id:Li,count:3}},{size:3,rows:[[Mt,Mt,Mt],[_e,null,_e]],result:{id:eo,count:2}},{size:3,rows:[[_e,_e,_e],[_e,Ze,_e],[_e,hn,_e]],result:{id:Ja,count:1}},{size:3,rows:[[null,Mt,null],[null,$t,null],[$t,null,null]],result:{id:ld,count:1}},{size:2,rows:[[_e,Mt],[_e,Mt]],result:{id:Qa,count:1}},{size:3,shapeless:!0,ingredients:[ms,ms,ms,ms,_e,_e,Ze],result:{id:Cl,count:1}},{size:2,rows:[[_e,Ko],[Ko,_e]],result:{id:ho,count:4}},{size:2,shapeless:!0,ingredients:[wl],result:{id:We,count:1}},{size:2,shapeless:!0,ingredients:[Al],result:{id:Xe,count:1}},{size:3,rows:[[Be,Be,Be],[Dn,Dn,Dn],[Be,Be,Be]],result:{id:ci,count:1}},{size:3,rows:[[Cn,hn,Cn],[hn,Cn,hn],[Cn,hn,Cn]],result:{id:zg,count:1}},{size:3,rows:[[Qt,null,Qt],[Qt,Qt,Qt],[Qt,null,Qt]],result:{id:cd,count:3}},{size:3,rows:[[Be,Qt,Be],[Be,Qt,Be]],result:{id:hd,count:4}},{size:3,rows:[[_e,Ze,_e],[Ze,Ko,Ze],[_e,Ze,_e]],result:{id:dd,count:2}},{size:3,rows:[[We,We,We],[null,Qt,null],[null,Qt,null]],result:{id:Pl,count:1}},{size:3,rows:[[We,We],[We,Qt],[null,Qt]],result:{id:Sr,count:1}},{size:3,rows:[[We,We],[Qt,We],[Qt,null]],result:{id:Sr,count:1}},{size:3,rows:[[We],[Qt],[Qt]],result:{id:ud,count:1}},{size:3,rows:[[We],[We],[Qt]],result:{id:Ll,count:1}},{size:3,rows:[[Xe,Xe,Xe],[null,Qt,null],[null,Qt,null]],result:{id:Il,count:1}},{size:3,rows:[[Xe,Xe],[Xe,Qt],[null,Qt]],result:{id:tl,count:1}},{size:3,rows:[[Xe,Xe],[Qt,Xe],[Qt,null]],result:{id:tl,count:1}},{size:3,rows:[[Xe],[Qt],[Qt]],result:{id:fd,count:1}},{size:3,rows:[[Xe],[Xe],[Qt]],result:{id:Dl,count:1}}];function J_(i,t){var c;let e=t,n=-1,s=t,o=-1;for(let h=0;h<i.length;h++)if(i[h]!=null){const u=Math.floor(h/t),d=h%t;u<e&&(e=u),u>n&&(n=u),d<s&&(s=d),d>o&&(o=d)}if(n<0)return null;const r=n-e+1,a=o-s+1,l=[];for(let h=e;h<=n;h++){const u=[];for(let d=s;d<=o;d++)u.push(i[h*t+d]??null);l.push(u)}for(const h of Z_)if(!(h.size>t))if(h.shapeless){const u={};for(const g of i)g!=null&&(u[g]=(u[g]||0)+1);const d={};for(const g of h.ingredients)d[g]=(d[g]||0)+1;if(Object.keys(u).length!==Object.keys(d).length)continue;let f=!0;for(const[g,_]of Object.entries(d))if(u[g]!==_){f=!1;break}if(f)return h.result}else{const u=h.rows.length,d=Math.max(...h.rows.map(g=>g.length));if(r!==u||a!==d)continue;let f=!0;for(let g=0;g<u&&f;g++)for(let _=0;_<d&&f;_++){const m=h.rows[g][_]??null,p=((c=l[g])==null?void 0:c[_])??null;m!==p&&(f=!1)}if(f)return h.result}return null}let fa=null;function Q_(){return fa||(fa=pd()),fa}function di(i,t,e){const n=i.getContext("2d");n.clearRect(0,0,32,32),t&&(Mi[t]?ex(n,t):mo[t]?nx(n,t):tx(n,t),e!=null&&e>1&&(n.fillStyle="rgba(0,0,0,0.55)",n.font="bold 10px monospace",n.textAlign="right",n.fillText(e,30,30),n.fillStyle="#fff",n.fillText(e,29,29)))}function tx(i,t){const e=qi[t];if(!e)return;const n=Q_(),[s,o]=e.textures.side||e.textures.all||[0,0],[r,a]=e.textures.top||e.textures.all||[0,0],l=e.transparent&&t!==0;if(l){i.fillStyle="#6b7280",i.fillRect(0,0,32,32),i.fillStyle="#9ca3af";for(let c=0;c<32;c+=6)for(let h=0;h<32;h+=6)(Math.floor(h/6)+Math.floor(c/6))%2===0&&i.fillRect(h,c,6,6);i.globalAlpha=.62}i.drawImage(n,r*A,a*A,A,A,1,0,30,14),i.drawImage(n,s*A,o*A,A,A,1,14,30,18),i.fillStyle="rgba(0,0,0,0.22)",i.fillRect(1,14,30,18),l&&(i.globalAlpha=1)}function ex(i,t){const e="#9a6b3a",n="#c0c8d0",s="#d8e0e8";t===uo?(i.fillStyle=e,i.fillRect(13,14,5,16),i.fillStyle=n,i.fillRect(4,8,24,6),i.fillRect(4,14,6,6),i.fillRect(22,14,6,6),i.fillStyle=s,i.fillRect(4,8,24,2)):t===ki?(i.fillStyle=e,i.fillRect(13,14,5,18),i.fillStyle=n,i.fillRect(13,4,14,14),i.fillRect(10,4,3,9),i.fillStyle=s,i.fillRect(25,4,2,14)):t===fo?(i.fillStyle=e,i.fillRect(13,8,5,24),i.fillStyle=n,i.fillRect(8,2,16,10),i.fillRect(9,12,14,2),i.fillRect(10,14,12,2),i.fillStyle=s,i.fillRect(8,2,16,2)):t===po?(i.fillStyle=n,i.fillRect(13,2,6,18),i.fillStyle=s,i.fillRect(14,2,2,18),i.fillStyle=n,i.fillRect(14,0,4,3),i.fillStyle=s,i.fillRect(15,0,2,2),i.fillStyle=n,i.fillRect(6,19,20,4),i.fillStyle=s,i.fillRect(6,19,20,2),i.fillStyle=e,i.fillRect(13,23,6,8),i.fillStyle="#c89a60",i.fillRect(14,24,3,6)):t===Bi&&(i.fillStyle=e,i.fillRect(13,8,5,22),i.fillStyle="#c89a60",i.fillRect(14,9,3,20),i.fillStyle=n,i.fillRect(14,2,14,5),i.fillStyle=s,i.fillRect(14,2,14,2),i.fillStyle=n,i.fillRect(14,7,5,3))}function nx(i,t){t===Qt?(i.strokeStyle="#9a6b3a",i.lineWidth=4,i.lineCap="round",i.beginPath(),i.moveTo(6,6),i.lineTo(26,26),i.stroke(),i.strokeStyle="#c89a60",i.lineWidth=2,i.beginPath(),i.moveTo(6,6),i.lineTo(26,26),i.stroke()):t===hn?(i.fillStyle="#1a1a1a",i.beginPath(),i.moveTo(16,4),i.lineTo(24,8),i.lineTo(28,16),i.lineTo(24,24),i.lineTo(14,28),i.lineTo(6,22),i.lineTo(4,12),i.lineTo(10,5),i.closePath(),i.fill(),i.fillStyle="#3a3a3a",i.fillRect(10,8,5,4),i.fillRect(14,7,3,2)):t===zi&&(i.fillStyle="#f59e0b",i.beginPath(),i.arc(16,16,12,0,Math.PI*2),i.fill(),i.fillStyle="#d97706",i.beginPath(),i.arc(16,16,12,0,Math.PI*2),i.stroke(),i.strokeStyle="#92400e",i.lineWidth=1.5,i.beginPath(),i.arc(16,16,12,0,Math.PI*2),i.stroke(),i.fillStyle="#92400e",i.font="bold 14px monospace",i.textAlign="center",i.textBaseline="middle",i.fillText("¢",16,17))}class ix{constructor(t,e){this.player=t,this.world=e,this.overlay=document.getElementById("overlay"),this.hotbarEl=document.getElementById("hotbar"),this.slots=Array.from(document.querySelectorAll("#hotbar .slot")),this.healthEl=document.getElementById("health-bar"),this.blockNameEl=document.getElementById("block-name"),this.debugEl=document.getElementById("debug-info"),this.invScreen=document.getElementById("inventory-screen"),this.actionEl=document.getElementById("action-indicator"),this.actionLabel=document.getElementById("action-label"),this.breakRingFg=document.getElementById("break-ring-fg"),this._ringCirc=106.8,this.craftGrid=document.getElementById("craft-grid"),this.craftOutput=document.getElementById("craft-output"),this.craftHint=document.getElementById("craft-hint"),this.craftSizeLbl=document.getElementById("craft-size-label"),this.invMainGrid=document.getElementById("inv-main-grid"),this.invHotbarRow=document.getElementById("inv-hotbar-row"),this.cursorEl=document.getElementById("cursor-item"),this.cursorCanvas=document.getElementById("cursor-canvas"),this.cursorCount=document.getElementById("cursor-count"),this._held=null,this._craftCells=[],this._craftResult=null,this._blockNameTimer=0,this._lastSlot=-1,this._buildHotbarIcons(),document.addEventListener("slotChange",n=>{this._updateSlotHighlight(n.detail),this._showItemName(n.detail)}),this.invScreen.addEventListener("mousemove",n=>{this._held&&(this.cursorEl.style.left=`${n.clientX+10}px`,this.cursorEl.style.top=`${n.clientY+6}px`)}),document.getElementById("close-inventory").addEventListener("click",()=>this.closeInventory())}_buildHotbarIcons(){this.slots.forEach((t,e)=>{const n=t.querySelector(".slot-icon");n.innerHTML="";const s=document.createElement("canvas");s.width=32,s.height=32,s.style.cssText="width:32px;height:32px;image-rendering:pixelated",n.appendChild(s),this._refreshHotbarSlot(e)})}_refreshHotbarSlot(t){const e=this.slots[t],n=e.querySelector("canvas");if(!n)return;const s=this.player.hotbar[t];di(n,s==null?void 0:s.id,s==null?void 0:s.count);const o=e.querySelector(".slot-label");o&&(o.textContent=t+1)}_updateSlotHighlight(t){this.slots.forEach((e,n)=>e.classList.toggle("active",n===t))}_showItemName(t){const e=this.player.hotbar[t],n=Ks(e==null?void 0:e.id)||"";this.blockNameEl.textContent=n,this.blockNameEl.classList.toggle("show",!!n),this._blockNameTimer=2}openInventory(t=2){this.player.craftGridSize=t,this._held=null,this._buildCraftGrid(t),this._buildInventorySlots(),this._refreshInventoryScreen(),this.craftSizeLbl.textContent=t===3?"(3×3 Crafting Table)":"(2×2 Pocket)",this.cursorEl.classList.add("hidden"),this.invScreen.classList.remove("hidden")}closeInventory(){this._held&&(this.player.addItem(this._held.id,this._held.count),this._held=null),this.cursorEl.classList.add("hidden");for(let t=0;t<this.player.craftGrid.length;t++){const e=this.player.craftGrid[t];e&&(this.player.addItem(e.id,e.count),this.player.craftGrid[t]=null)}this.player.craftGridSize=2,this.invScreen.classList.add("hidden"),this._buildHotbarIcons(),document.dispatchEvent(new CustomEvent("inventoryClosed"))}isInventoryOpen(){return!this.invScreen.classList.contains("hidden")}_buildCraftGrid(t){this.craftGrid.innerHTML="",this.craftGrid.className=`craft-grid-cells size-${t}`,this._craftCells=[];const e=t*t;for(let n=0;n<e;n++){const s=this._makeSlotEl("craft",n);this._craftCells.push(s),this.craftGrid.appendChild(s)}this.craftOutput.querySelector("canvas"),this.craftOutput.onclick=()=>this._onOutputClick()}_buildInventorySlots(){this.invMainGrid.innerHTML="",this.invHotbarRow.innerHTML="";for(let t=0;t<18;t++)this.invMainGrid.appendChild(this._makeSlotEl("inv",t));for(let t=0;t<9;t++)this.invHotbarRow.appendChild(this._makeSlotEl("hotbar",t))}_makeSlotEl(t,e){const n=document.createElement("div");n.className="inv-slot";const s=document.createElement("canvas");s.width=32,s.height=32,s.style.cssText="width:28px;height:28px;image-rendering:pixelated",n.appendChild(s);const o=document.createElement("span");return o.className="slot-badge",n.appendChild(o),n.addEventListener("click",()=>this._onSlotClick(t,e,n)),n}_refreshInventoryScreen(){var r,a;const t=this.player.craftGridSize;this._craftCells.forEach((l,c)=>{const h=hh(c),u=this.player.craftGrid[h];pa(l,u)});const e=this.player.craftGrid.slice(0,t*t).map(l=>(l==null?void 0:l.id)??null);this._craftResult=J_(e,t);const n=this.craftOutput.querySelector("canvas");di(n,(r=this._craftResult)==null?void 0:r.id,(a=this._craftResult)==null?void 0:a.count),this.craftOutput.classList.toggle("has-result",!!this._craftResult),this._craftResult?this.craftHint.textContent=`→ ${Ks(this._craftResult.id)} ×${this._craftResult.count}`:this.craftHint.textContent="",this.invMainGrid.querySelectorAll(".inv-slot").forEach((l,c)=>pa(l,this.player.inventory[c])),this.invHotbarRow.querySelectorAll(".inv-slot").forEach((l,c)=>pa(l,this.player.hotbar[c]))}_onSlotClick(t,e,n){if(t==="craft"){this.player.craftGridSize;const s=hh(e),o=this.player.craftGrid[s];if(this._held){const r=o;r&&r.id===this._held.id&&r.count<64?(r.count++,this._held.count--,this._held.count===0&&(this._held=null)):(this.player.craftGrid[s]={id:this._held.id,count:this._held.count},this._held=r?{id:r.id,count:r.count}:null)}else o&&(this._held={id:o.id,count:o.count},this.player.craftGrid[s]=null)}else{const s=t==="hotbar"?this.player.hotbar:this.player.inventory,o=s[e];if(this._held)if(o&&o.id===this._held.id&&o.count<64){const r=64-o.count,a=Math.min(this._held.count,r);o.count+=a,this._held.count-=a,this._held.count===0&&(this._held=null)}else s[e]=this._held.count>0?this._held:null,this._held=o?{id:o.id,count:o.count}:null;else o&&(this._held={id:o.id,count:o.count},s[e]=null)}this._held?(di(this.cursorCanvas,this._held.id,this._held.count),this.cursorEl.classList.remove("hidden")):this.cursorEl.classList.add("hidden"),this._refreshInventoryScreen(),this._buildHotbarIcons()}_onOutputClick(){if(!this._craftResult)return;const{id:t,count:e}=this._craftResult,n=this.player.craftGridSize,s=n*n;for(let o=0;o<s;o++){const r=this.player.craftGrid[o];r&&(r.count--,r.count===0&&(this.player.craftGrid[o]=null))}this._held&&this._held.id===t&&this._held.count+e<=64?(this._held.count+=e,di(this.cursorCanvas,this._held.id,this._held.count)):this._held?this.player.addItem(t,e):(this._held={id:t,count:e},di(this.cursorCanvas,t,e),this.cursorEl.classList.remove("hidden")),this._refreshInventoryScreen(),this._buildHotbarIcons()}show(){this.overlay.classList.add("active")}hide(){this.overlay.classList.remove("active")}update(t){const e=this.player;this._blockNameTimer>0&&(this._blockNameTimer-=t,this._blockNameTimer<=0&&this.blockNameEl.classList.remove("show")),e.selectedSlot!==this._lastSlot&&(this._updateSlotHighlight(e.selectedSlot),this._lastSlot=e.selectedSlot);for(let o=0;o<9;o++)this._refreshHotbarSlot(o);this.healthEl.innerHTML="";for(let o=0;o<10;o++){const r=document.createElement("div"),a=e.health-o*2;r.className="heart"+(a>=2?"":a>=1?" half":" empty"),this.healthEl.appendChild(r)}const n=e.getBreakInfo();if(n)if(!n.canBreak)this.breakRingFg.style.strokeDashoffset=this._ringCirc,this.breakRingFg.style.stroke="#ff4444",this.actionLabel.textContent=Xg[n.needsTool]||"Wrong tool",this.actionLabel.style.color="#ff6666",this.actionEl.classList.remove("hidden"),this.actionEl.classList.add("visible");else if(n.fraction>0){this.breakRingFg.style.strokeDashoffset=(this._ringCirc*(1-n.fraction)).toFixed(2),this.breakRingFg.style.stroke=this._ringColor(n.action);const o=Wg[n.action]||"Breaking";this.actionLabel.textContent=`${o} ${n.name}…`,this.actionLabel.style.color=this._ringColor(n.action),this.actionEl.classList.remove("hidden"),this.actionEl.classList.add("visible")}else this._hideRing();else this._hideRing();const s=e.hotbar[e.selectedSlot];this.debugEl.innerHTML=`XYZ: ${e.pos.x.toFixed(1)}, ${e.pos.y.toFixed(1)}, ${e.pos.z.toFixed(1)}<br>${e.flying?"FLY":e.onGround?"GROUND":"AIR"} | Slot ${e.selectedSlot+1}: ${Ks(s==null?void 0:s.id)||"Empty"}`+((s==null?void 0:s.count)>1?` ×${s.count}`:"")}_ringColor(t){return{dig:"#e8d99b",chop:"#c8a264",mine:"#5be8e8",break:"#fff"}[t]||"#fff"}_hideRing(){this.breakRingFg.style.strokeDashoffset=this._ringCirc,this.breakRingFg.style.stroke="white",this.actionEl.classList.remove("visible"),this.actionEl.classList.add("hidden")}openDialog(t){this._dialogNPC=t,this._treeActive=!!t.conversationTree,this._renderDialogHeader(t),this._treeActive?(this._treeNode=t.conversationTree.nodes[t.conversationTree.start],document.getElementById("dialog-actions").classList.add("hidden"),document.getElementById("dialog-options").classList.remove("hidden"),this._renderTreeNode()):(document.getElementById("dialog-options").classList.add("hidden"),document.getElementById("dialog-actions").classList.remove("hidden"),document.getElementById("dialog-text").textContent=t.nextLine(),document.getElementById("dialog-shop-btn").classList.toggle("hidden",t.type!=="merchant")),document.getElementById("dialog-screen").classList.remove("hidden")}_renderDialogHeader(t){document.getElementById("dialog-npc-name").textContent=t.name;const e={merchant:"Merchant",builder:"Builder",police:"Officer",businessperson:"Business",tourist:"Tourist",citizen:"Citizen",shopkeeper:"Shopkeeper"},n={shopkeeper:"Shopkeeper",chef:"Chef",office_worker:"Office Worker",researcher:"Researcher"};document.getElementById("dialog-npc-badge").textContent=t.role&&n[t.role]||e[t.type]||"Citizen";const s={merchant:"#f59e0b",builder:"#d97706",police:"#1d4ed8",businessperson:"#4b5563",tourist:"#f472b6",citizen:"#3b82f6",shopkeeper:"#7c3aed"},o={shopkeeper:"#7c3aed",chef:"#ef4444",office_worker:"#0ea5e9",researcher:"#4b5563"},a=t.role&&o[t.role]||s[t.type]||"#3b82f6",c=document.getElementById("dialog-avatar").getContext("2d");c.clearRect(0,0,48,48),c.fillStyle=a,c.fillRect(10,4,28,28),c.fillStyle=a,c.fillRect(8,32,32,14),c.fillStyle="#f0c898",c.fillRect(13,8,22,20)}_renderTreeNode(){const t=this._treeNode;document.getElementById("dialog-text").textContent=t.text;const e=document.getElementById("dialog-options");e.innerHTML="";for(const n of t.options){const s=document.createElement("button");s.className="dlg-opt",n.action==="buy"&&s.classList.add("action-buy"),n.action==="sell"&&s.classList.add("action-sell"),n.action==="close"&&s.classList.add("action-close"),s.textContent=n.text,s.addEventListener("click",()=>this._selectTreeOption(n)),e.appendChild(s)}}_selectTreeOption(t){if(t.action==="buy"){document.dispatchEvent(new CustomEvent("openShop",{detail:{mode:"buy"}}));return}if(t.action==="sell"){document.dispatchEvent(new CustomEvent("openShop",{detail:{mode:"sell"}}));return}if(t.action==="close"||!t.next){document.dispatchEvent(new CustomEvent("dialogClose"));return}const e=this._dialogNPC.conversationTree.nodes[t.next];e&&(this._treeNode=e,this._renderTreeNode())}closeDialog(){document.getElementById("dialog-screen").classList.add("hidden"),document.getElementById("dialog-options").classList.add("hidden"),document.getElementById("dialog-actions").classList.remove("hidden")}openShop(t,e,n="buy"){this._shopPlayer=e,this._shopNPC=t,this._shopMode=n,document.getElementById("shop-npc-name").textContent=t.name,this._setShopTab(n),this._refreshShop(),document.getElementById("shop-screen").classList.remove("hidden"),document.getElementById("dialog-screen").classList.add("hidden"),document.getElementById("shop-tab-buy").onclick=()=>{this._shopMode="buy",this._setShopTab("buy"),this._refreshShop()},document.getElementById("shop-tab-sell").onclick=()=>{this._shopMode="sell",this._setShopTab("sell"),this._refreshShop()}}_setShopTab(t){document.getElementById("shop-tab-buy").classList.toggle("active",t==="buy"),document.getElementById("shop-tab-sell").classList.toggle("active",t==="sell");const e=this._shopNPC,n=e&&(e.wares||e.type==="shopkeeper");document.getElementById("shop-tab-sell").style.display=n?"":"none"}_refreshShop(){const t=this._shopPlayer,e=this._shopNPC,n=t.countItem(zi);document.getElementById("shop-coin-count").textContent=n;const s=document.getElementById("shop-items-grid");s.innerHTML="",this._shopMode==="sell"?this._renderSellGrid(t,s):this._renderBuyGrid(t,e,n,s)}_renderBuyGrid(t,e,n,s){if(!e.wares){const o=document.createElement("p");o.style.cssText="color:#888;text-align:center;padding:20px 0",o.textContent="This vendor has nothing to sell.",s.appendChild(o);return}for(const o of e.wares){const r=document.createElement("div");r.className="shop-item-card"+(n<o.price?" cannot-afford":"");const a=document.createElement("canvas");a.width=a.height=32,di(a,o.id,o.count),r.appendChild(a);const l=document.createElement("span");l.className="shop-item-label",l.textContent=o.label,r.appendChild(l);const c=document.createElement("span");c.className="shop-item-price",c.textContent=`${o.price} coin${o.price!==1?"s":""}`,r.appendChild(c);const h=document.createElement("button");h.className="shop-buy-btn",h.textContent="Buy",h.disabled=n<o.price,h.addEventListener("click",()=>{const u=t.removeItem(zi,o.price);if(u<o.price){t.addItem(zi,u);return}t.addItem(o.id,o.count),document.getElementById("shop-status").textContent=`Bought: ${o.label}`,this._refreshShop()}),r.appendChild(h),s.appendChild(r)}}_renderSellGrid(t,e){const n=[...t.hotbar.map((s,o)=>({s,src:"hotbar",i:o})),...t.inventory.map((s,o)=>({s,src:"inv",i:o}))].filter(({s})=>s&&s.id&&fn[s.id]);if(n.length===0){const s=document.createElement("p");s.style.cssText="color:#888;text-align:center;padding:20px 0",s.textContent="Nothing to sell. Mine or craft items first.",e.appendChild(s);return}for(const{s,src:o,i:r}of n){const a=fn[s.id]||1,l=document.createElement("div");l.className="shop-item-card";const c=document.createElement("canvas");c.width=c.height=32,di(c,s.id,s.count),l.appendChild(c);const h=document.createElement("span");h.className="shop-item-label",h.textContent=`${Ks(s.id)} ×${s.count}`,l.appendChild(h);const u=document.createElement("span");u.className="shop-item-price",u.textContent=`${a*s.count} coin${a*s.count!==1?"s":""}`,l.appendChild(u);const d=document.createElement("button");d.className="shop-buy-btn",d.textContent="Sell All",d.addEventListener("click",()=>{const f=o==="hotbar"?t.hotbar:t.inventory,g=f[r];if(!g)return;const _=a*g.count;f[r]=null,t.addItem(zi,_),document.getElementById("shop-status").textContent=`Sold ${Ks(s.id)} ×${g.count} for ${_} coins`,this._refreshShop()}),l.appendChild(d),e.appendChild(l)}}closeShop(){document.getElementById("shop-screen").classList.add("hidden"),this._shopPlayer=null,this._shopNPC=null,this._shopMode="buy"}}function hh(i,t){return i}function pa(i,t){const e=i.querySelector("canvas");e&&di(e,t==null?void 0:t.id,t==null?void 0:t.count);const n=i.querySelector(".slot-badge");n&&(n.textContent=(t==null?void 0:t.count)>1?t.count:""),i.classList.toggle("has-item",!!t)}const dh={mine:{speed:3.2,depth:1.3,backTilt:.45},chop:{speed:2.8,depth:1.15,backTilt:.35},dig:{speed:3,depth:.85,backTilt:.18},break:{speed:4.5,depth:.65,backTilt:.3}};function sx(i){return i*i*i}function uh(i){return 1-Math.pow(1-i,3)}function fh(i,t,e){if(i<.28)return e*uh(i/.28);if(i<.5){const n=(i-.28)/.22;return e+(-t-e)*sx(n)}else{const n=(i-.5)/.5;return-t*(1-uh(n))}}class ox{constructor(t){this.renderer=t,this.scene=new Zh,this.camera=new dn(70,window.innerWidth/window.innerHeight,.01,10),this.scene.add(new ed(16777215,.65));const e=new vr(16777215,.85);e.position.set(2,4,3),this.scene.add(e);const n=new vr(8956671,.25);n.position.set(-2,-1,-2),this.scene.add(n),this._mats={skin:new Qe({color:13149300}),wood:new Qe({color:10119994}),iron:new Qe({color:12107976}),stone:new Qe({color:9474192}),gold:new Qe({color:15255600})},this.handGroup=new de,this.swingPivot=new de,this.toolMount=new de,this.scene.add(this.handGroup),this.handGroup.add(this.swingPivot);const s=new Jt(new fe(.22,.72,.22),this._mats.skin);s.position.set(0,-.36,0),this.swingPivot.add(s);const o=new Jt(new fe(.26,.21,.24),this._mats.skin);o.position.set(.02,-.1,.04),this.swingPivot.add(o),this.toolMount.position.set(0,.1,0),this.swingPivot.add(this.toolMount),this._tools={mine:this._buildPickaxe(),chop:this._buildAxe(),dig:this._buildShovel(),break:null},this._basePos=new O(.78,-.2,-1),this._baseRot=new xn(.1,-.52,.13),this.action=null,this._swingT=0,this._isSwinging=!1,this._bobT=0,this._idleT=0,this._applyTool(null)}_buildPickaxe(){const t=new de,{wood:e,iron:n}=this._mats;return t.add(this._box(.058,.56,.058,e,0,0,0)),t.add(this._box(.36,.068,.068,n,0,.3,0)),t.add(this._box(.068,.068,.22,n,-.15,.3,-.1)),t.add(this._box(.068,.068,.22,n,.15,.3,-.1)),t}_buildAxe(){const t=new de,{wood:e,iron:n}=this._mats;return t.add(this._box(.058,.6,.058,e,0,0,0)),t.add(this._box(.3,.36,.068,n,.12,.24,0)),t.add(this._box(.06,.36,.04,n,.27,.24,-.055)),t.add(this._box(.1,.16,.068,n,-.06,.24,0)),t}_buildShovel(){const t=new de,{wood:e,iron:n}=this._mats;return t.add(this._box(.058,.62,.058,e,0,0,0)),t.add(this._box(.24,.32,.05,n,0,.44,0)),t.add(this._box(.2,.04,.05,n,0,.26,0)),t}_box(t,e,n,s,o=0,r=0,a=0){const l=new Jt(new fe(t,e,n),s);return l.position.set(o,r,a),l}startBreaking(t){t!==this.action&&this._applyTool(t),this._isSwinging=!0}stopBreaking(){this._isSwinging=!1}switchTool(t){t!==this.action&&this._applyTool(t)}update(t,e){this._bobT+=t,this._idleT+=t*.5;const n=dh[this.action]||dh.break;this._isSwinging?(this._swingT+=t*n.speed,this._swingT>=1&&(this._swingT-=1)):this._swingT*=Math.pow(.001,t);const s=this._isSwinging?fh(this._swingT,n.depth,n.backTilt):fh(this._swingT,n.depth,n.backTilt)*this._swingT;this.swingPivot.rotation.x=s,this.swingPivot.rotation.z=this.action==="chop"?s*.18:0,this.swingPivot.position.z=Math.min(0,s*-.06);const o=e?Math.sin(this._bobT*9)*.013:0,r=e?Math.sin(this._bobT*4.5)*.007:0,a=Math.sin(this._idleT*1.1)*.004,l=Math.sin(this._idleT*.7)*.003;this.handGroup.position.set(this._basePos.x+r+a,this._basePos.y+o+l,this._basePos.z),this.handGroup.rotation.copy(this._baseRot)}render(){this.renderer.clearDepth(),this.renderer.render(this.scene,this.camera)}resize(t){this.camera.aspect=t,this.camera.updateProjectionMatrix()}_applyTool(t){for(;this.toolMount.children.length>0;)this.toolMount.remove(this.toolMount.children[0]);const e=this._tools[t];e&&this.toolMount.add(e),this.action=t}}const ln=128,ue=ln/2,rx=qi.map(i=>{if(!i||!i.color)return null;const t=i.color;if(t.startsWith("rgba"))return[60,40,15];const e=t.match(/^#([0-9a-f]{3,6})$/i);if(!e)return null;const n=e[1].length===3?e[1].split("").map(s=>s+s).join(""):e[1];return[parseInt(n.slice(0,2),16),parseInt(n.slice(2,4),16),parseInt(n.slice(4,6),16)]});class ax{constructor(t,e){this.canvas=t,this.ctx=t.getContext("2d"),this.world=e,this._frame=0,this._img=this.ctx.createImageData(ln,ln),this._cx=null,this._cz=null,this._inside=new Uint8Array(ln*ln);for(let s=0;s<ln;s++)for(let o=0;o<ln;o++){const r=o-ue+.5,a=s-ue+.5;r*r+a*a<ue*ue&&(this._inside[s*ln+o]=1)}const n=this._img.data;for(let s=0;s<ln*ln;s++)this._inside[s]||(n[s*4+3]=0)}render(t,e,n,s){this._frame++;const o=Math.round(t),r=Math.round(e);(this._frame%4===0||this._cx===null||Math.abs(o-this._cx)>2||Math.abs(r-this._cz)>2)&&(this._cx=o,this._cz=r,this._bakeTerrain(o,r)),this.ctx.putImageData(this._img,0,0),this._drawNPCs(s,t,e),this._drawPlayer(n),this._drawCompass()}_bakeTerrain(t,e){const n=this._img.data,s=this.world.chunks;for(let o=0;o<ln;o++)for(let r=0;r<ln;r++){const a=o*ln+r;if(!this._inside[a])continue;const l=t+(r-ue),c=e+(o-ue),h=Math.floor(l/xt),u=Math.floor(c/xt),d=s.get(`${h},${u}`),f=a*4;if(!d||!d.data){n[f]=20,n[f+1]=20,n[f+2]=22,n[f+3]=255;continue}const g=l-h*xt,_=c-u*xt,m=g+_*xt,p=xt*xt;let v=20,x=20,y=22;for(let R=Ne-1;R>=0;R--){const w=d.data[m+R*p];if(w!==0){const T=rx[w];if(T){const P=.65+R/(Ne-1)*.45;v=Math.min(255,T[0]*P|0),x=Math.min(255,T[1]*P|0),y=Math.min(255,T[2]*P|0)}break}}n[f]=v,n[f+1]=x,n[f+2]=y,n[f+3]=255}}_drawNPCs(t,e,n){if(!t)return;const s=this.ctx;for(const[,o]of t._npcs){const r=o.pos.x-e,a=o.pos.z-n;if(Math.abs(r)>ue||Math.abs(a)>ue)continue;const l=ue+r,c=ue+a;if((l-ue)*(l-ue)+(c-ue)*(c-ue)>(ue-3)*(ue-3))continue;const h=o.role==="shopkeeper"||o.role==="tools"||o.role==="general";s.beginPath(),s.arc(l,c,h?3:2,0,Math.PI*2),s.fillStyle=h?"#ffd700":"#e0e0ff",s.fill(),s.strokeStyle="rgba(0,0,0,0.7)",s.lineWidth=.8,s.stroke()}}_drawPlayer(t){const e=this.ctx;e.save(),e.translate(ue,ue),e.rotate(-t),e.beginPath(),e.moveTo(0,-8),e.lineTo(-5,6),e.lineTo(0,3),e.lineTo(5,6),e.closePath(),e.fillStyle="#ffffff",e.strokeStyle="#000000",e.lineWidth=1.5,e.fill(),e.stroke(),e.restore()}_drawCompass(){const t=this.ctx,e=ue-6;t.font="bold 8px monospace",t.textAlign="center",t.textBaseline="middle",t.shadowColor="rgba(0,0,0,0.9)",t.shadowBlur=3,t.fillStyle="#ff5555",t.fillText("N",ue,ue-e),t.fillStyle="rgba(220,220,220,0.85)",t.fillText("S",ue,ue+e),t.fillText("W",ue-e,ue),t.fillText("E",ue+e,ue),t.shadowBlur=0}}var xh;const nn=typeof window<"u"&&("ontouchstart"in window||navigator.maxTouchPoints>0||((xh=window.matchMedia)==null?void 0:xh.call(window,"(pointer: coarse)").matches)||/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent)),ph=.004,js=52,Zs=10;function cn(i,t,e){const n=document.createElement(i);return t&&(n.style.cssText=t),e!==void 0&&(n.textContent=e),n}function fs(i,t,e=60){return cn("div",[`background:${t}cc`,"color:#fff",`width:${e}px`,`height:${e}px`,"border-radius:50%","display:flex","align-items:center","justify-content:center","font-size:1.2em","font-weight:700","border:2px solid rgba(255,255,255,0.3)","pointer-events:auto","touch-action:none","user-select:none","-webkit-user-select:none","box-shadow:0 3px 10px rgba(0,0,0,0.5)"].join(";"),i)}function lx(i,t){return cn("div",[`background:${t}cc`,"color:#fff","height:44px","padding:0 16px","border-radius:22px","display:flex","align-items:center","justify-content:center","font-size:0.95em","font-weight:700","white-space:nowrap","border:2px solid rgba(255,255,255,0.3)","pointer-events:auto","touch-action:none","user-select:none","-webkit-user-select:none","box-shadow:0 3px 10px rgba(0,0,0,0.5)"].join(";"),i)}class cx{constructor(t){this.player=t,this.onExitCar=null,this.onPause=null,this._jId=null,this._lId=null,this._ll={x:0,y:0},this._jCX=0,this._jCY=0,this._isDriving=!1,this._buildDOM(),this._bindEvents()}_buildDOM(){const t=cn("div",["position:fixed","inset:0","z-index:500","pointer-events:none","touch-action:none","display:none"].join(";"));this._root=t;const e=cn("div",["position:absolute","top:0","left:0","width:45%","height:100%","pointer-events:auto","touch-action:none"].join(";"));t.appendChild(e),this._lz=e;const n=cn("div",["position:absolute","top:0","right:0","width:55%","height:100%","pointer-events:auto","touch-action:none"].join(";"));t.appendChild(n),this._rz=n;const s=cn("div",["position:absolute","pointer-events:none","display:none","width:120px","height:120px","border-radius:50%","background:rgba(255,255,255,0.1)","border:2px solid rgba(255,255,255,0.35)","transform:translate(-50%,-50%)"].join(";")),o=cn("div",["position:absolute","width:54px","height:54px","border-radius:50%","background:rgba(255,255,255,0.5)","top:50%","left:50%","transform:translate(-50%,-50%)","box-shadow:0 2px 8px rgba(0,0,0,0.4)"].join(";"));s.appendChild(o),t.appendChild(s),this._jBase=s,this._jKnob=o,this._pauseBtn=cn("div",["position:absolute","top:16px","left:16px","z-index:1","background:rgba(0,0,0,0.45)","color:#fff","width:46px","height:46px","border-radius:8px","display:flex","align-items:center","justify-content:center","font-size:1.3em","border:1px solid rgba(255,255,255,0.25)","pointer-events:auto","touch-action:none","user-select:none","-webkit-user-select:none"].join(";"),"⏸"),t.appendChild(this._pauseBtn);const r=cn("div",["position:absolute","bottom:24px","right:16px","z-index:1","display:flex","flex-direction:column","gap:10px","align-items:flex-end","pointer-events:none"].join(";")),a=cn("div","display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:flex-end;");this._sprintBtn=fs("⚡","#b45309",46),this._flyBtn=lx("🛸 FLY","#7c3aed"),this._fBtn=fs("F","#0f766e",46),this._invBtn=cn("div",["background:#0369a1cc","color:#fff","width:72px","height:50px","border-radius:12px","display:flex","flex-direction:column","align-items:center","justify-content:center","font-size:0.82em","font-weight:700","line-height:1.25","border:2px solid rgba(255,255,255,0.3)","pointer-events:auto","touch-action:none","user-select:none","-webkit-user-select:none","box-shadow:0 3px 10px rgba(0,0,0,0.5)"].join(";")),this._invBtn.innerHTML='🎒 INV<br><span style="font-size:0.82em;opacity:0.85">CRAFT</span>',a.appendChild(this._sprintBtn),a.appendChild(this._flyBtn),a.appendChild(this._fBtn),a.appendChild(this._invBtn);const l=cn("div","display:flex;gap:8px;align-items:center;");this._upBtn=fs("↑","#15803d",68),this._downBtn=fs("↓","#1e3a5f",56),this._breakBtn=fs("⛏","#dc2626",58),this._placeBtn=fs("▣","#1d4ed8",58),l.appendChild(this._upBtn),l.appendChild(this._downBtn),l.appendChild(this._breakBtn),l.appendChild(this._placeBtn),r.appendChild(a),r.appendChild(l),t.appendChild(r),this._exitBtn=cn("div",["position:absolute","top:16px","left:50%","z-index:1","transform:translateX(-50%)","background:#dc2626cc","color:#fff","padding:12px 28px","border-radius:8px","font-weight:bold","font-size:1.1em","border:2px solid rgba(255,255,255,0.3)","pointer-events:auto","touch-action:none","display:none","box-shadow:0 2px 8px rgba(0,0,0,0.5)","user-select:none","-webkit-user-select:none"].join(";"),"EXIT CAR"),t.appendChild(this._exitBtn),document.body.appendChild(t)}_bindEvents(){const t=this.player;this._lz.addEventListener("touchstart",n=>{if(n.preventDefault(),this._jId!==null)return;const s=n.changedTouches[0];this._jId=s.identifier,this._jCX=s.clientX,this._jCY=s.clientY,this._jBase.style.left=s.clientX+"px",this._jBase.style.top=s.clientY+"px",this._jBase.style.display="",this._jKnob.style.transform="translate(-50%,-50%)"},{passive:!1}),this._rz.addEventListener("touchstart",n=>{n.preventDefault();for(const s of n.changedTouches)if(this._lId===null){this._lId=s.identifier,this._ll={x:s.clientX,y:s.clientY};break}},{passive:!1}),document.addEventListener("touchmove",n=>{let s=!1;for(const o of n.changedTouches){if(o.identifier===this._jId){s=!0;const r=o.clientX-this._jCX,a=o.clientY-this._jCY,l=Math.hypot(r,a),c=l>js?r/l*js:r,h=l>js?a/l*js:a;if(this._jKnob.style.transform=`translate(calc(-50% + ${c}px), calc(-50% + ${h}px))`,t.keys.KeyW=h<-Zs,t.keys.KeyS=h>Zs,this._isDriving){const u=c/js;t.keys._analogSteer=Math.abs(c)>Zs*1.5?-u:0,t.keys.KeyA=!1,t.keys.KeyD=!1}else t.keys._analogSteer=void 0,t.keys.KeyA=c<-Zs,t.keys.KeyD=c>Zs}if(o.identifier===this._lId){s=!0;const r=o.clientX-this._ll.x,a=o.clientY-this._ll.y;t.yaw-=r*ph,t.pitch=Math.max(-1.56,Math.min(1.56,t.pitch-a*ph)),this._ll={x:o.clientX,y:o.clientY}}}s&&n.preventDefault()},{passive:!1});const e=n=>{for(const s of n.changedTouches)s.identifier===this._jId&&(this._jId=null,this._jBase.style.display="none",t.keys.KeyW=t.keys.KeyS=t.keys.KeyA=t.keys.KeyD=!1,t.keys._analogSteer=void 0),s.identifier===this._lId&&(this._lId=null)};document.addEventListener("touchend",e,{passive:!0}),document.addEventListener("touchcancel",e,{passive:!0}),this._upBtn.addEventListener("touchstart",n=>{n.preventDefault(),n.stopPropagation(),t.flying?t.keys.Space=!0:t.onGround&&(t.vel.y=9,t.onGround=!1)},{passive:!1}),this._upBtn.addEventListener("touchend",n=>{n.preventDefault(),t.keys.Space=!1},{passive:!1}),this._downBtn.addEventListener("touchstart",n=>{n.preventDefault(),n.stopPropagation(),t.keys.ControlLeft=!0},{passive:!1}),this._downBtn.addEventListener("touchend",n=>{n.preventDefault(),t.keys.ControlLeft=!1},{passive:!1}),this._breakBtn.addEventListener("touchstart",n=>{n.preventDefault(),n.stopPropagation(),t._startBreak()},{passive:!1}),this._breakBtn.addEventListener("touchend",n=>{n.preventDefault(),t.breakTarget=null,t.breakProgress=0},{passive:!1}),this._tap(this._placeBtn,()=>t._interact()),this._tap(this._flyBtn,()=>{t.flying=!t.flying,t.vel.set(0,0,0),t.keys.Space=!1,t.keys.ControlLeft=!1,t.flying?(this._flyBtn.textContent="🛬 LAND",this._flyBtn.style.background="#dc2626ec"):(this._flyBtn.textContent="🛸 FLY",this._flyBtn.style.background="#7c3aedcc")}),this._tap(this._sprintBtn,()=>{const n=!t.keys.ShiftLeft;t.keys.ShiftLeft=n,this._sprintBtn.style.background=n?"#d97706ec":"#b45309cc"}),this._tap(this._invBtn,()=>document.dispatchEvent(new KeyboardEvent("keydown",{code:"KeyE",bubbles:!0}))),this._tap(this._fBtn,()=>document.dispatchEvent(new KeyboardEvent("keydown",{code:"KeyF",bubbles:!0}))),this._tap(this._pauseBtn,()=>{this.onPause&&this.onPause()}),this._tap(this._exitBtn,()=>{this.onExitCar&&this.onExitCar()})}_tap(t,e){t.addEventListener("touchstart",n=>{n.preventDefault(),n.stopPropagation(),e()},{passive:!1})}showPlaying(){this._root.style.display="",this._exitBtn.style.display="none",this._pauseBtn.style.display="",this._isDriving=!1,this.player.flying||(this._flyBtn.textContent="🛸 FLY",this._flyBtn.style.background="#7c3aedcc"),this.player.active=!0,this.player.keys.KeyW=this.player.keys.KeyS=this.player.keys.KeyA=this.player.keys.KeyD=!1}showDriving(){this._root.style.display="",this._exitBtn.style.display="",this._pauseBtn.style.display="none",this._isDriving=!0}hide(){this._root.style.display="none"}}const Ul=document.getElementById("game-canvas"),Fn=new Pg({canvas:Ul,antialias:!1});Fn.setPixelRatio(Math.min(window.devicePixelRatio,2));Fn.setSize(window.innerWidth,window.innerHeight);Fn.shadowMap.enabled=!1;Fn.setClearColor(8900331);Fn.autoClear=!1;const On=new Zh;On.fog=new Sl(8900331,80,160);const Gi=new dn(75,window.innerWidth/window.innerHeight,.05,500);On.add(Gi);const ll=new ed(16777215,.6);On.add(ll);const oo=new vr(16776160,1.4);oo.position.set(100,200,50);On.add(oo);const _d=new vr(11193599,.3);_d.position.set(-50,50,-50);On.add(_d);const hx=new fe(1.002,1.002,1.002),dx=new Dg(hx),vs=new Ig(dx,new Jh({color:0,depthTest:!0,linewidth:2}));vs.visible=!1;On.add(vs);const Pr=document.createElement("canvas");Pr.width=64;Pr.height=64;const _n=Pr.getContext("2d"),Nl=new Qh(Pr);Nl.flipY=!1;const ux=new vl({map:Nl,transparent:!0,depthTest:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1}),ws=new Jt(new fe(1.002,1.002,1.002),ux);ws.visible=!1;On.add(ws);function Js(i){let t=i*1664525+1013904223>>>0;return t=t*1664525+1013904223>>>0,(t>>>0)/4294967295}function fx(i,t){if(!t||i<=0){ws.visible=!1;return}ws.visible=!0,ws.position.set(t.wx+.5,t.wy+.5,t.wz+.5);const e=64;_n.clearRect(0,0,e,e),_n.fillStyle=`rgba(0,0,0,${(i*.55).toFixed(2)})`,_n.fillRect(0,0,e,e);const n=Math.ceil(i*10);for(let s=0;s<n;s++){const o=.55+i*.45;_n.strokeStyle=`rgba(0,0,0,${o.toFixed(2)})`,_n.lineWidth=1+i,_n.beginPath();let r=Js(s*3)*e,a=Js(s*3+1)*e;_n.moveTo(r,a);const l=2+Math.floor(Js(s*7)*4);for(let c=0;c<l;c++)r+=(Js(s*11+c*2)-.5)*e*.4,a+=(Js(s*11+c*2+1)-.5)*e*.4,_n.lineTo(r,a);_n.stroke(),_n.strokeStyle=`rgba(255,255,255,${(i*.3).toFixed(2)})`,_n.lineWidth=.5,_n.stroke()}Nl.needsUpdate=!0}const qt=new H_(On),bt=new K_(Gi,qt),ze=new ix(bt,qt),gs=new ox(Fn),px=new ax(document.getElementById("minimap"),qt);let pe=null;nn&&(pe=new cx(bt),pe.onExitCar=()=>cl(),pe.onPause=()=>{Et==="playing"&&(pe.hide(),bt.active=!1,Et="paused",document.getElementById("pause-screen").classList.remove("hidden"),ze.hide())});let Et="menu",mh=0,jn=null,Se=null;const gh=new O,_h=new O;let ma=.3;const mx=600,Wn={night:new Ct(328975),dawn:new Ct(16742192),day:new Ct(8900331),dusk:new Ct(16736288)},Xn={night:new Ct(1057023),dawn:new Ct(16748624),day:new Ct(16776160),dusk:new Ct(16744512)};function li(i,t,e){return i.clone().lerp(t,e)}function gx(i){let t,e,n,s;if(i<.2){const r=i/.2;t=li(Wn.night,Wn.dawn,r),e=li(Xn.night,Xn.dawn,r),n=.1+.2*r,s=.05+.4*r}else if(i<.3){const r=(i-.2)/.1;t=li(Wn.dawn,Wn.day,r),e=li(Xn.dawn,Xn.day,r),n=.3+.3*r,s=.45+.95*r}else if(i<.7)t=Wn.day.clone(),e=Xn.day.clone(),n=.6,s=1.4;else if(i<.8){const r=(i-.7)/.1;t=li(Wn.day,Wn.dusk,r),e=li(Xn.day,Xn.dusk,r),n=.6-.3*r,s=1.4-.95*r}else{const r=(i-.8)/.2;t=li(Wn.dusk,Wn.night,r),e=li(Xn.dusk,Xn.night,r),n=.3-.2*r,s=.45-.4*r}Fn.setClearColor(t),On.fog.color.copy(t),ll.color.copy(t.clone().lerp(new Ct(16777215),.4)),ll.intensity=Math.max(.1,n),oo.color.copy(e),oo.intensity=Math.max(.05,s);const o=i*Math.PI*2;oo.position.set(Math.cos(o)*200,Math.sin(o)*200,50)}window.addEventListener("resize",()=>{const i=window.innerWidth/window.innerHeight;Gi.aspect=i,Gi.updateProjectionMatrix(),gs.resize(i),Fn.setSize(window.innerWidth,window.innerHeight)});function Yi(){nn||Ul.requestPointerLock()}document.addEventListener("pointerlockchange",()=>{nn||(document.pointerLockElement===Ul?bt.active=!0:(bt.active=!1,Et==="playing"&&(Et="paused",document.getElementById("pause-screen").classList.remove("hidden"),ze.hide())))});document.getElementById("play-btn").addEventListener("click",Mx);document.getElementById("resume-btn").addEventListener("click",()=>{document.getElementById("pause-screen").classList.add("hidden"),Et="playing",ze.show(),nn&&pe?pe.showPlaying():Yi()});document.getElementById("quit-btn").addEventListener("click",()=>{document.getElementById("pause-screen").classList.add("hidden"),document.getElementById("menu-screen").classList.remove("hidden"),Et="menu",ze.hide()});document.addEventListener("inventoryClosed",()=>{Et==="inventory"&&(Et="playing",nn&&pe?pe.showPlaying():Yi())});document.addEventListener("openShop",i=>{var e;if(!jn||Et!=="dialog")return;const t=((e=i.detail)==null?void 0:e.mode)||"buy";Et="shop",ze.openShop(jn,bt,t)});document.addEventListener("dialogClose",()=>{Et==="dialog"&&As()});document.addEventListener("shopClosed",()=>{Et==="shop"&&(Et="dialog",ze.closeShop(),ze.openDialog(jn))});document.addEventListener("openCrafting",i=>{Et==="playing"&&(document.exitPointerLock(),Et="inventory",ze.openInventory(i.detail),nn&&pe&&pe.hide())});document.addEventListener("keydown",i=>{if(i.code==="KeyE"&&Et==="playing"){const t=qt.cars.getNearest(bt.pos,3.5);if(t&&!t.occupied){_x(t);return}document.exitPointerLock(),Et="inventory",ze.openInventory(2),nn&&pe&&pe.hide();return}if(i.code==="KeyE"&&Et==="driving"){cl();return}if(i.code==="KeyE"&&Et==="inventory"){ze.closeInventory();return}if(i.code==="Escape"&&Et==="driving"){cl();return}if(i.code==="Escape"&&Et==="inventory"){ze.closeInventory();return}if(i.code==="KeyF"&&Et==="playing"){const t=qt.busStops.getNearest(bt.pos,3);if(t){vx(t);return}const e=qt.npcs.getNearest(bt.pos,4);e&&xd(e);return}if(i.code==="KeyF"&&Et==="dialog"){if(ro){cr();return}As();return}if(i.code==="KeyF"&&Et==="shop"){As();return}if(i.code==="Escape"&&Et==="dialog"){As();return}if(i.code==="Escape"&&Et==="shop"){ze.closeShop(),Et="dialog";return}});function xd(i){jn=i,i.talking=!0,Et="dialog",document.exitPointerLock(),ze.openDialog(i),nn&&pe&&(pe.hide(),bt.active=!1)}function As(){ze.closeDialog(),ze.closeShop(),jn&&(jn.talking=!1),jn=null,Et="playing",nn&&pe?pe.showPlaying():Yi()}function _x(i){if(Se=i,i.occupied=!0,Et="driving",bt.active=!1,document.exitPointerLock(),nn&&pe)pe.showDriving();else{const t=document.getElementById("npc-hint");t.textContent="WASD / Arrows = Drive  |  E or Esc = Exit Car",t.classList.remove("hidden")}}function cl(){Se&&(bt.pos.set(Se.pos.x+Math.sin(Se.heading+Math.PI/2)*2.5,Math.max(Se.pos.y+1,24),Se.pos.z+Math.cos(Se.heading+Math.PI/2)*2.5),Se.occupied=!1,Se=null,Et="playing",bt.vel.set(0,0,0),bt.flying=!0,document.getElementById("npc-hint").classList.add("hidden"),nn&&pe?pe.showPlaying():Yi())}document.addEventListener("mousedown",i=>{var t;if(!(i.button!==0||!bt.active||Et!=="playing")&&!bt.target){const e=qt.npcs.getNearest(bt.pos,3);if(e){const n=Mi[(t=bt.hotbar[bt.selectedSlot])==null?void 0:t.id],s=(n==null?void 0:n.damage)??1;e.takeDamage(s)}}});document.getElementById("dialog-bye-btn").addEventListener("click",()=>{As()});document.getElementById("dialog-talk-btn").addEventListener("click",()=>{jn&&(document.getElementById("dialog-text").textContent=jn.nextLine())});document.getElementById("dialog-shop-btn").addEventListener("click",()=>{document.dispatchEvent(new CustomEvent("openShop"))});document.getElementById("shop-back-btn").addEventListener("click",()=>{document.dispatchEvent(new CustomEvent("shopClosed"))});document.getElementById("shop-close-btn").addEventListener("click",()=>{As()});window.__tp=(i,t,e)=>{bt.pos.set(i,t??30,e),bt.vel.set(0,0,0)};window.__world=()=>qt;window.__findSnow=()=>{for(const i of qt.chunks.values())if(i.data){for(let t=0;t<16;t++)for(let e=0;e<16;e++)for(let n=60;n>=20;n--)if(i.getLocal(t,n,e)===12){const s=i.cx*16+t,o=i.cz*16+e;return window.__tp(s,n+2,o),`snow at ${s},${n},${o}`}}return"no snow in loaded chunks"};window.__testGrassRegrow=()=>{const i=Math.floor(bt.pos.x),t=Math.floor(bt.pos.z);for(let e=Math.floor(bt.pos.y);e>=0;e--)if(qt.getBlock(i,e,t)!==0){qt.setBlock(i,e,t,0);const n=qt._grassQueue.size;return`broke (${i},${e},${t}), queue=${n}, regrows in ${Math.round((qt._grassQueue.get(`${i},${e-1},${t}`)-Date.now())/1e3)}s`}return"no surface block found"};window.__findCity=()=>{for(let i=0;i<1200;i+=10)for(let t=0;t<1200;t+=10){const e=qt.cityInfo(i,t);if(e)return window.__tp(e.centerX,40,e.centerZ),`City at ${e.centerX.toFixed(0)},${e.centerZ.toFixed(0)}`}return"No city found in scan range"};window.__findShopkeeper=i=>{let t=null;for(const n of qt.npcs._npcs.values())if(n.type==="shopkeeper"){if(!i||n.role===i)return window.__tp(n.homePos.x,n.homePos.y+1,n.homePos.z),`Found ${n.name} (${n.role}) at ${n.homePos.x.toFixed(1)},${n.homePos.z.toFixed(1)}`;t=n}if(t&&!i)return window.__tp(t.homePos.x,t.homePos.y+1,t.homePos.z),`Found ${t.name} (${t.role}) at ${t.homePos.x.toFixed(1)},${t.homePos.z.toFixed(1)}`;const e=[...qt.npcs._npcs.values()].filter(n=>n.type==="shopkeeper").map(n=>n.role);return`No ${i||"shopkeeper"} found. Loaded: ${[...new Set(e)].join(", ")||"none"}`};window.__openShopkeeperDialog=i=>{for(const t of qt.npcs._npcs.values())if(t.type==="shopkeeper"&&(!i||t.role===i))return xd(t),t.name+" ("+t.role+")";return"none"};let ro=null;function xx(i,t,e){const n=[[1,0,"E"],[-1,0,"W"],[0,1,"S"],[0,-1,"N"],[1,1,"SE"],[-1,1,"SW"],[1,-1,"NE"],[-1,-1,"NW"]],s=[],o=new Set;for(const[r,a,l]of n){for(let c=1;c<=2&&s.length<4;c++){const h=i+r*sl*c,u=t+a*sl*c,d=e(h,u);if(!d)continue;const f=`${Math.round(d.centerX)},${Math.round(d.centerZ)}`;if(o.has(f)||Math.round(d.centerX)===Math.round(i)&&Math.round(d.centerZ)===Math.round(t))continue;o.add(f);const g=Math.round(Math.sqrt((d.centerX-i)**2+(d.centerZ-t)**2));if(s.push({label:`Village (${l}, ${g}m)`,x:d.centerX,z:d.centerZ}),s.length>=4)break}if(s.length>=4)break}return s}function vx(i){cr(),Et="dialog",document.exitPointerLock(),nn&&pe&&(pe.hide(),bt.active=!1);const t=document.createElement("div");t.id="bus-route-panel",t.style.cssText=["position:fixed","top:50%","left:50%","transform:translate(-50%,-50%)","background:#1e3a5f","color:#fff","border:3px solid #d4af37","border-radius:8px","padding:24px 32px","min-width:300px","font-family:sans-serif","z-index:1000","display:flex","flex-direction:column","gap:12px"].join(";");const e=document.createElement("h2");e.textContent="Bus Routes",e.style.cssText="margin:0;font-size:1.4em;color:#fbbf24;text-align:center;",t.appendChild(e);const n=(r,a)=>br(r,a,qt.seed),s=xx(i.cityX,i.cityZ,n);if(s.length===0){const r=document.createElement("p");r.textContent="No nearby villages found.",r.style.textAlign="center",t.appendChild(r)}for(const r of s){const a=document.createElement("button");a.textContent=r.label,a.style.cssText=["padding:10px 16px","background:#0f766e","color:#fff","border:none","border-radius:5px","cursor:pointer","font-size:1em"].join(";"),a.addEventListener("click",()=>{cr(),Et="playing",document.getElementById("npc-hint").classList.add("hidden"),bt.pos.set(r.x,40,r.z),bt.vel.set(0,0,0),qt.update(r.x,r.z),Yi()}),t.appendChild(a)}const o=document.createElement("button");o.textContent="Close [F]",o.style.cssText=["padding:8px 16px","background:#374151","color:#fff","border:none","border-radius:5px","cursor:pointer","font-size:0.9em","margin-top:4px"].join(";"),o.addEventListener("click",cr),t.appendChild(o),document.body.appendChild(t),ro=t}function cr(){ro&&(ro.remove(),ro=null),Et==="dialog"&&(Et="playing",nn&&pe?pe.showPlaying():Yi())}function Mx(){document.getElementById("menu-screen").classList.add("hidden"),Et="playing",ze.show(),nn&&pe?pe.showPlaying():Yi(),qt.update(8,8)}function vd(i){var o;requestAnimationFrame(vd);const t=Math.min((i-mh)/1e3,.05);mh=i;const e=bt.active&&(bt.keys.KeyW||bt.keys.KeyS||bt.keys.KeyA||bt.keys.KeyD);Et!=="menu"&&Et!=="paused"&&(qt.npcs.update(t,bt.pos),qt.animals.update(t,bt.pos));const n=(r,a)=>qt.cityInfo(r,a),s=(r,a,l)=>qt.getBlock(r,a,l);if(Et!=="menu"&&Et!=="paused"&&qt.traffic.update(t),(Et==="playing"||Et==="dialog"||Et==="shop")&&!Se&&qt.cars.update(t,null,null,qt.traffic,n),Et==="driving"&&Se){qt.cars.update(t,bt.keys,Se,qt.traffic,n,s),bt.pos.copy(Se.pos),qt.update(Se.pos.x,Se.pos.z);const r=Se.vehicleType,a=r==="motorcycle"?-3.5:r==="bus"||r==="limo"?-7.5:r==="monster_truck"?-6:-5.5,l=new O(Math.sin(Se.heading),0,Math.cos(Se.heading));gh.copy(Se.pos).addScaledVector(l,a).setY(Se.pos.y+2.8),Gi.position.lerp(gh,Math.min(1,t*10)),_h.copy(Se.pos).addScaledVector(l,3).setY(Se.pos.y+.8),Gi.lookAt(_h)}if(Et==="playing"){ma=(ma+t/mx)%1,gx(ma),bt.spawned||bt.spawn(qt),bt.update(t),qt.update(bt.pos.x,bt.pos.z),ze.update(t);const r=document.getElementById("npc-hint"),a=qt.npcs.getNearest(bt.pos,4),l=qt.cars.getNearest(bt.pos,3.5),c=qt.busStops.getNearest(bt.pos,3);if(l&&!l.occupied?(r.textContent="Press E to enter car",r.classList.remove("hidden")):c?(r.textContent="Press F for bus routes",r.classList.remove("hidden")):a?(r.textContent="Press F to talk",r.classList.remove("hidden")):r.classList.add("hidden"),fx(bt.getBreakProgress(),bt.breakTarget),bt.target){const{wx:f,wy:g,wz:_}=bt.target;vs.position.set(f+.5,g+.5,_+.5),vs.visible=!0}else vs.visible=!1;const h=((o=bt.hotbar[bt.selectedSlot])==null?void 0:o.id)??null,u=el(h),d=bt.getBreakInfo();d&&d.canBreak?gs.startBreaking(u||"break"):(gs.stopBreaking(),gs.switchTool(u)),gs.update(t,e)}Fn.clear(),Fn.render(On,Gi),(Et==="playing"||Et==="dialog"||Et==="shop")&&gs.render(),Et==="driving"&&(vs.visible=!1,ws.visible=!1),(Et==="playing"||Et==="dialog"||Et==="shop"||Et==="driving")&&px.render(bt.pos.x,bt.pos.z,bt.yaw,qt.npcs)}requestAnimationFrame(vd);
