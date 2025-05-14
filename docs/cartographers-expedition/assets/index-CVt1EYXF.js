var wr=Object.defineProperty;var xr=(t,u,r)=>u in t?wr(t,u,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[u]=r;var G=(t,u,r)=>xr(t,typeof u!="symbol"?u+"":u,r);(function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const y of document.querySelectorAll('link[rel="modulepreload"]'))x(y);new MutationObserver(y=>{for(const w of y)if(w.type==="childList")for(const p of w.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&x(p)}).observe(document,{childList:!0,subtree:!0});function r(y){const w={};return y.integrity&&(w.integrity=y.integrity),y.referrerPolicy&&(w.referrerPolicy=y.referrerPolicy),y.crossOrigin==="use-credentials"?w.credentials="include":y.crossOrigin==="anonymous"?w.credentials="omit":w.credentials="same-origin",w}function x(y){if(y.ep)return;y.ep=!0;const w=r(y);fetch(y.href,w)}})();function vr(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Cr(t){if(Object.prototype.hasOwnProperty.call(t,"__esModule"))return t;var u=t.default;if(typeof u=="function"){var r=function x(){return this instanceof x?Reflect.construct(u,arguments,this.constructor):u.apply(this,arguments)};r.prototype=u.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(t).forEach(function(x){var y=Object.getOwnPropertyDescriptor(t,x);Object.defineProperty(r,x,y.get?y:{enumerable:!0,get:function(){return t[x]}})}),r}var Ji={},Ki;function Sr(){return Ki||(Ki=1,function(t){function u(e,l=0,i=1){return Math.max(l,Math.min(e,i))}function r(e,l,i){const n=i-l,a=e-l;if(a>=0)return a%n+l;{let f=n+a%n+l;return f>=i&&(f-=n),f}}function x(e,l,i){return l<=e&&e<i}function y(e){return[...Array(e).keys()]}function w(e,l){return y(e).map(i=>l(i))}function p(e,l){let i=[];for(let n=0,a=0;n<e.length;a++)l(e[n],a)?(i.push(e[n]),e.splice(n,1)):n++;return i}function h(e){return[...e].reduce((l,[i,n])=>(l[i]=n,l),{})}function s(e){return Object.keys(e).map(l=>[l,e[l]])}function d(e,l){return String.fromCharCode(e.charCodeAt(0)+l)}function g(e){return e.x!=null&&e.y!=null}class o{constructor(l,i){this.x=0,this.y=0,this.set(l,i)}set(l=0,i=0){return g(l)?(this.x=l.x,this.y=l.y,this):(this.x=l,this.y=i,this)}add(l,i){return g(l)?(this.x+=l.x,this.y+=l.y,this):(this.x+=l,this.y+=i,this)}sub(l,i){return g(l)?(this.x-=l.x,this.y-=l.y,this):(this.x-=l,this.y-=i,this)}mul(l){return this.x*=l,this.y*=l,this}div(l){return this.x/=l,this.y/=l,this}clamp(l,i,n,a){return this.x=u(this.x,l,i),this.y=u(this.y,n,a),this}wrap(l,i,n,a){return this.x=r(this.x,l,i),this.y=r(this.y,n,a),this}addWithAngle(l,i){return this.x+=Math.cos(l)*i,this.y+=Math.sin(l)*i,this}swapXy(){const l=this.x;return this.x=this.y,this.y=l,this}normalize(){return this.div(this.length),this}rotate(l){if(l===0)return this;const i=this.x;return this.x=i*Math.cos(l)-this.y*Math.sin(l),this.y=i*Math.sin(l)+this.y*Math.cos(l),this}angleTo(l,i){return g(l)?Math.atan2(l.y-this.y,l.x-this.x):Math.atan2(i-this.y,l-this.x)}distanceTo(l,i){let n,a;return g(l)?(n=l.x-this.x,a=l.y-this.y):(n=l-this.x,a=i-this.y),Math.sqrt(n*n+a*a)}isInRect(l,i,n,a){return x(this.x,l,l+n)&&x(this.y,i,i+a)}equals(l){return this.x===l.x&&this.y===l.y}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}get length(){return Math.sqrt(this.x*this.x+this.y*this.y)}get angle(){return Math.atan2(this.y,this.x)}}const c=["transparent","white","red","green","yellow","blue","purple","cyan","black","light_red","light_green","light_yellow","light_blue","light_purple","light_cyan","light_black"],m="twrgybpclRGYBPCL";let v,b;const D=[15658734,15277667,5025616,16761095,4149685,10233776,240116,6381921];function M(e,l){const[i,n,a]=R(0,e);if(v=h(c.map((f,C)=>{if(C<1)return[f,{r:0,g:0,b:0,a:0}];if(C<9){const[$,U,F]=R(C-1,e);return[f,{r:$,g:U,b:F,a:1}]}const[k,P,O]=R(C-9+1,e);return[f,{r:Math.floor(e?k*.5:i-(i-k)*.5),g:Math.floor(e?P*.5:a-(a-P)*.5),b:Math.floor(e?O*.5:n-(n-O)*.5),a:1}]})),e){const f=v.blue;v.white={r:Math.floor(f.r*.15),g:Math.floor(f.g*.15),b:Math.floor(f.b*.15),a:1}}l!=null&&E(l)}function E(e){b=e.map(l=>({r:l[0],g:l[1],b:l[2],a:1}));for(let l=0;l<c.length;l++){let i=1/0,n=-1;for(let a=0;a<b.length;a++){const f=T(b[a],v[c[l]]);f<i&&(i=f,n=a)}v[c[l]]=b[n]}}function T(e,l){const i={r:.299,g:.587,b:.114},n=e.r-l.r,a=e.g-l.g,f=e.b-l.b,C=l.r===l.g&&l.g===l.b;let k=Math.sqrt(n*n*i.r+a*a*i.g+f*f*i.b);return C&&!(l.r===0&&l.g===0&&l.b===0)&&(k*=1.5),k}function R(e,l){l&&(e===0?e=7:e===7&&(e=0));const i=D[e];return[(i&16711680)>>16,(i&65280)>>8,i&255]}function I(e,l=1){const i=typeof e=="number"?b[e]:v[e];return Math.floor(i.r*l)<<16|Math.floor(i.g*l)<<8|Math.floor(i.b*l)}function L(e,l=1){const i=typeof e=="number"?b[e]:v[e],n=Math.floor(i.r*l),a=Math.floor(i.g*l),f=Math.floor(i.b*l);return i.a<1?`rgba(${n},${a},${f},${i.a})`:`rgb(${n},${a},${f})`}const V=`
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float width;
uniform float height;

float gridValue(vec2 uv, float res) {
  vec2 grid = fract(uv * res);
  return (step(res, grid.x) * step(res, grid.y));
}

void main(void) {
  vec4 color = texture2D(uSampler, vTextureCoord);  
  vec2 grid_uv = vTextureCoord.xy * vec2(width, height);
  float v = gridValue(grid_uv, 0.2);
  gl_FragColor.rgba = color * v;
}
`;function J(e,l){return new PIXI.Filter(void 0,V,{width:e,height:l})}const N=new o;let H,W,j,B=new o;const de=5;document.createElement("img");let Y,fe,Qe=1,Zl="black",se,Vt,Be=!1,X,Wt;function un(e,l,i,n,a,f,C,k){N.set(e),X=k,Zl=i;const P=`
-webkit-touch-callout: none;
-webkit-tap-highlight-color: ${l};
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
background: ${l};
color: #888;
`,O=`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
`,$=`
image-rendering: -moz-crisp-edges;
image-rendering: -webkit-optimize-contrast;
image-rendering: -o-crisp-edges;
image-rendering: pixelated;
`;if(document.body.style.cssText=P,B.set(N),X.isUsingPixi){B.mul(de);const F=new PIXI.Application({width:B.x,height:B.y});if(H=F.view,j=new PIXI.Graphics,j.scale.x=j.scale.y=de,PIXI.settings.SCALE_MODE=PIXI.SCALE_MODES.NEAREST,F.stage.addChild(j),j.filters=[],X.name==="crt"&&j.filters.push(Wt=new PIXI.filters.CRTFilter({vignettingAlpha:.7})),X.name==="pixel"&&j.filters.push(J(B.x,B.y)),X.name==="pixel"||X.name==="shapeDark"){const _=new PIXI.filters.AdvancedBloomFilter({threshold:.1,bloomScale:X.name==="pixel"?1.5:1,brightness:X.name==="pixel"?1.5:1,blur:8});j.filters.push(_)}j.lineStyle(0),H.style.cssText=O}else H=document.createElement("canvas"),H.width=B.x,H.height=B.y,W=H.getContext("2d"),W.imageSmoothingEnabled=!1,H.style.cssText=O+$;document.body.appendChild(H);const U=()=>{const _=innerWidth/innerHeight,Q=B.x/B.y,Z=_<Q,ie=Z?.95*innerWidth:.95*innerHeight*Q,te=Z?.95*innerWidth/Q:.95*innerHeight;H.style.width=`${ie}px`,H.style.height=`${te}px`};if(window.addEventListener("resize",U),U(),n){Y=document.createElement("canvas");let F;a?(Y.width=B.x,Y.height=B.y,F=f):(B.x<=B.y*2?(Y.width=B.y*2,Y.height=B.y):(Y.width=B.x,Y.height=B.x/2),Y.width>400&&(Qe=400/Y.width,Y.width=400,Y.height*=Qe),F=Math.round(400/Y.width)),fe=Y.getContext("2d"),fe.fillStyle=l,gcc.setOptions({scale:F,capturingFps:60,isSmoothingEnabled:!1,durationSec:C})}}function yl(){if(X.isUsingPixi){j.clear(),j.beginFill(I(Zl,X.isDarkColor?.15:1)),j.drawRect(0,0,N.x,N.y),j.endFill(),j.beginFill(I(se)),Be=!0;return}W.fillStyle=L(Zl,X.isDarkColor?.15:1),W.fillRect(0,0,N.x,N.y),W.fillStyle=L(se)}function me(e){if(e===se){X.isUsingPixi&&!Be&&wl(I(se));return}if(se=e,X.isUsingPixi){Be&&j.endFill(),wl(I(se));return}W.fillStyle=L(e)}function wl(e){xl(),j.beginFill(e),Be=!0}function xl(){Be&&(j.endFill(),Be=!1)}function vl(){Vt=se}function Cl(){me(Vt)}function _e(e,l,i,n){if(X.isUsingPixi){X.name==="shape"||X.name==="shapeDark"?j.drawRoundedRect(e,l,i,n,2):j.drawRect(e,l,i,n);return}W.fillRect(e,l,i,n)}function dn(e,l,i,n,a){const f=I(se);wl(f),j.drawCircle(e,l,a*.5),j.drawCircle(i,n,a*.5),xl(),j.lineStyle(a,f),j.moveTo(e,l),j.lineTo(i,n),j.lineStyle(0)}function fn(){Wt.time+=.2}function hn(){if(fe.fillRect(0,0,Y.width,Y.height),Qe===1)fe.drawImage(H,(Y.width-H.width)/2,(Y.height-H.height)/2);else{const e=H.width*Qe,l=H.height*Qe;fe.drawImage(H,(Y.width-e)/2,(Y.height-l)/2,e,l)}gcc.capture(Y)}const Yt=[`
l
l
l

l
`,`
l l
l l



`,`
 l l
lllll
 l l
lllll
 l l
`,`
 lll
l l
 lll
  l l
 lll
`,`
l   l
l  l
  l
 l  l
l   l
`,`
 l
l l
 ll l
l  l
 ll l
`,`
l
l



`,`
 l
l
l
l
 l
`,`
l
 l
 l
 l
l
`,`
  l
l l l
 lll
l l l
  l
`,`
  l
  l
lllll
  l
  l
`,`



 l
l
`,`


lllll


`,`




l
`,`
    l
   l
  l
 l
l
`,`
 lll
l  ll
l l l
ll  l
 lll
`,`
 ll
l l
  l
  l
lllll
`,`
 lll
l   l
  ll
 l
lllll
`,`
llll
    l
  ll
    l
llll
`,`
  ll
 l l
l  l
lllll
   l
`,`
lllll
l
llll
    l
llll
`,`
 lll
l
llll
l   l
 lll
`,`
lllll
l   l
   l
  l
 l
`,`
 lll
l   l
 lll
l   l
 lll
`,`
 lll
l   l
 llll
    l
 lll
`,`

l

l

`,`

 l

 l
l
`,`
   ll
 ll
l
 ll
   ll
`,`

lllll

lllll

`,`
ll
  ll
    l
  ll
ll
`,`
 lll
l   l
  ll

  l
`,`
 lll
l   l
l lll
l
 lll
`,`
 lll
l   l
lllll
l   l
l   l
`,`
llll
l   l
llll
l   l
llll
`,`
 llll
l
l
l
 llll
`,`
llll
l   l
l   l
l   l
llll
`,`
lllll
l
llll
l
lllll
`,`
lllll
l
llll
l
l
`,`
 lll
l
l  ll
l   l
 llll
`,`
l   l
l   l
lllll
l   l
l   l
`,`
lllll
  l
  l
  l
lllll
`,`
  lll
   l
   l
   l
lll
`,`
l   l
l  l
lll
l  l
l   l
`,`
l
l
l
l
lllll
`,`
l   l
ll ll
l l l
l   l
l   l
`,`
l   l
ll  l
l l l
l  ll
l   l
`,`
 lll
l   l
l   l
l   l
 lll
`,`
llll
l   l
llll
l
l
`,`
 lll
l   l
l   l
l  ll
 llll
`,`
llll
l   l
llll
l   l
l   l
`,`
 llll
l
 lll
    l
llll
`,`
lllll
  l
  l
  l
  l
`,`
l   l
l   l
l   l
l   l
 lll
`,`
l   l
l   l
l   l
 l l
  l
`,`
l   l
l l l
l l l
l l l
 l l
`,`
l   l
 l l
  l
 l l
l   l
`,`
l   l
 l l
  l
  l
  l
`,`
lllll
   l
  l
 l
lllll
`,`
  ll
  l
  l
  l
  ll
`,`
l
 l
  l
   l
    l
`,`
 ll
  l
  l
  l
 ll
`,`
  l
 l l



`,`




lllll
`,`
 l
  l



`,`

 lll
l  l
l  l
 lll
`,`
l
l
lll
l  l
lll
`,`

 lll
l  
l
 lll
`,`
   l
   l
 lll
l  l
 lll
`,`

 ll
l ll
ll
 ll
`,`
  l
 l 
lll
 l
 l
`,`
 ll
l  l
 lll
   l
 ll
`,`
l
l
ll
l l
l l
`,`

l

l
l
`,`
 l

 l
 l
l
`,`
l
l
l l
ll
l l
`,`
ll
 l
 l
 l
lll
`,`

llll
l l l
l l l
l   l
`,`

lll
l  l
l  l
l  l
`,`

 ll
l  l
l  l
 ll
`,`

lll
l  l
lll
l
`,`

 lll
l  l
 lll
   l
`,`

l ll
ll
l
l
`,`

 lll
ll
  ll
lll
`,`

 l
lll
 l
  l
`,`

l  l
l  l
l  l
 lll
`,`

l  l
l  l
 ll
 ll
`,`

l   l
l l l
l l l
 l l
`,`

l  l
 ll
 ll
l  l
`,`

l  l
 ll
 l
l
`,`

llll
  l
 l
llll
`,`
 ll
 l
l
 l
 ll
`,`
l
l
l
l
l
`,`
ll
 l
  l
 l
ll
`,`

 l
l l l
   l

`],gn=[`
 l
 l
 l

 l
`,`
l l
l l



`,`
l l
lll
l l
lll
l l
`,`
 ll
ll
lll
 ll
ll
`,`
l l
  l
 l
l
l l
`,`
ll
ll
lll
l 
lll
`,`
 l
 l



`,`
  l
 l
 l
 l
  l
`,`
l
 l
 l
 l
l
`,`
 l
lll
 l
lll
 l
`,`
 l
 l
lll
 l
 l
`,`



 l
l
`,`


lll


`,`




 l
`,`
  l
 l
 l
 l
l
`,`
lll
l l
l l
l l
lll
`,`
  l
  l
  l
  l
  l
`,`
lll
  l
lll
l
lll
`,`
lll
  l
lll
  l
lll
`,`
l l
l l
lll
  l
  l
`,`
lll
l
lll
  l
lll
`,`
l
l
lll
l l
lll
`,`
lll
  l
  l
  l
  l
`,`
lll
l l
lll
l l
lll
`,`
lll
l l
lll
  l
  l
`,`

 l

 l

`,`

 l

 l
l
`,`
  l
 l
l
 l
  l
`,`

lll

lll

`,`
l
 l
  l
 l
l
`,`
lll
  l
 ll

 l
`,`

lll
l l
l
 ll
`,`
lll
l l
lll
l l
l l
`,`
ll
l l
lll
l l
ll
`,`
lll
l
l
l
lll
`,`
ll
l l
l l
l l
ll
`,`
lll
l
lll
l
lll
`,`
lll
l
lll
l
l
`,`
lll
l
l l
l l
 ll
`,`
l l
l l
lll
l l
l l
`,`
 l
 l
 l
 l
 l
`,`
  l
  l
  l
  l
ll
`,`
l l
l l
ll
l l
l l
`,`
l
l
l
l
lll
`,`
l l
lll
l l
l l
l l
`,`
l l
lll
lll
lll
l l
`,`
lll
l l
l l
l l
lll
`,`
lll
l l
lll
l
l
`,`
lll
l l
l l
lll
lll
`,`
ll
l l
ll
l l
l l
`,`
lll
l
lll
  l
lll
`,`
lll
 l
 l
 l
 l
`,`
l l
l l
l l
l l
lll
`,`
l l
l l
l l
l l
 l
`,`
l l
l l
lll
lll
l l
`,`
l l
l l
 l
l l
l l
`,`
l l
l l
lll
 l
 l
`,`
lll
  l
 l
l
lll
`,`
 ll
 l
 l
 l
 ll
`,`
l
 l
 l
 l
  l
`,`
ll
 l
 l
 l
ll
`,`
 l
l l



`,`




lll
`,`
l
 l



`,`


 ll
l l
 ll
`,`

l
lll
l l
lll
`,`


lll
l
lll
`,`

  l
lll
l l
lll
`,`


lll
l
 ll
`,`

 ll
 l
lll
 l
`,`

lll
lll
  l
ll
`,`

l
l
lll
l l
`,`

 l

 l
 l
`,`

 l

 l
ll
`,`

l
l l
ll
l l
`,`

 l
 l
 l
 l
`,`


lll
lll
l l
`,`


ll
l l
l l
`,`


lll
l l
lll
`,`


lll
lll
l
`,`


lll
lll
  l
`,`


lll
l
l
`,`


 ll
lll
ll
`,`


lll
 l
 l
`,`


l l
l l
lll
`,`


l l
l l
 l
`,`


l l
lll
l l
`,`


l l
 l
l l
`,`


l l
 l
l
`,`


lll
 l
lll
`,`
 ll
 l
l
 l
 ll
`,`
 l
 l
 l
 l
 l
`,`
ll
 l
  l
 l
ll
`,`

l
lll
  l

`];let He,Sl;function pn(){He=[],Sl=[]}function Qt(){He=He.concat(Sl),Sl=[]}function Zt(e){let l={isColliding:{rect:{},text:{},char:{}}};return He.forEach(i=>{mn(e,i)&&(l=Object.assign(Object.assign(Object.assign({},l),et(i.collision.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},l.isColliding.rect),i.collision.isColliding.rect),text:Object.assign(Object.assign({},l.isColliding.text),i.collision.isColliding.text),char:Object.assign(Object.assign({},l.isColliding.char),i.collision.isColliding.char)}}))}),l}function mn(e,l){const i=l.pos.x-e.pos.x,n=l.pos.y-e.pos.y;return-l.size.x<i&&i<e.size.x&&-l.size.y<n&&n<e.size.y}function et(e){if(e==null)return{};const l={transparent:"tr",white:"wh",red:"rd",green:"gr",yellow:"yl",blue:"bl",purple:"pr",cyan:"cy",black:"lc"};let i={};return s(e).forEach(([n,a])=>{const f=l[n];a&&f!=null&&(i[f]=!0)}),i}function ei(e,l,i,n){return li(!1,e,l,i,n)}function yn(e,l,i,n){return li(!0,e,l,i,n)}function li(e,l,i,n,a){if(typeof i=="number"){if(typeof n=="number")return ke(l,i,n,Object.assign({isCharacter:e,isCheckingCollision:!0,color:se},a));throw"invalid params"}else return ke(l,i.x,i.y,Object.assign({isCharacter:e,isCheckingCollision:!0,color:se},n))}const Ze=6,wn=4,ye=1,ee=Ze*ye,Ge=wn*ye;let lt,tt,bl,it,nt=!1,Xe,st,el,kl;const rt={color:"black",backgroundColor:"transparent",rotation:0,mirror:{x:1,y:1},scale:{x:1,y:1},isSmallText:!1,edgeColor:void 0,isCharacter:!1,isCheckingCollision:!1};function xn(){Xe=document.createElement("canvas"),Xe.width=Xe.height=ee,st=Xe.getContext("2d"),el=document.createElement("canvas"),kl=el.getContext("2d"),lt=Yt.map((e,l)=>Pl(e,String.fromCharCode(33+l),!1)),tt=gn.map((e,l)=>Pl(e,String.fromCharCode(33+l),!1)),bl=Yt.map((e,l)=>Pl(e,String.fromCharCode(33+l),!0)),it={}}function vn(e,l){const i=l.charCodeAt(0)-33;e.forEach((n,a)=>{bl[i+a]=Pl(n,String.fromCharCode(33+i+a),!0)})}function Cn(){nt=!0}function ke(e,l,i,n={}){const a=ni(n);let f=e,C=l,k=i,P,O={isColliding:{rect:{},text:{},char:{}}};const $=a.isSmallText?Ge:ee;for(let U=0;U<f.length;U++){if(U===0){const Q=f.charCodeAt(0);if(Q<33||Q>126)C=Math.floor(C-ee/2*a.scale.x),k=Math.floor(k-ee/2*a.scale.y);else{const Z=Q-33,ie=a.isCharacter?bl[Z]:a.isSmallText?tt[Z]:lt[Z];C=Math.floor(C-ie.size.x/2*a.scale.x),k=Math.floor(k-ie.size.y/2*a.scale.y)}P=C}const F=f[U];if(F===`
`){C=P,k+=ee*a.scale.y;continue}const _=Sn(F,C,k,a);a.isCheckingCollision&&(O={isColliding:{rect:Object.assign(Object.assign({},O.isColliding.rect),_.isColliding.rect),text:Object.assign(Object.assign({},O.isColliding.text),_.isColliding.text),char:Object.assign(Object.assign({},O.isColliding.char),_.isColliding.char)}}),C+=$*a.scale.x}return O}function Sn(e,l,i,n){const a=e.charCodeAt(0);if(a<32||a>126)return{isColliding:{rect:{},text:{},char:{}}};const f=ni(n);if(f.backgroundColor!=="transparent"){const te=f.isSmallText?Ge:ee,Bl=f.isSmallText?2:1;vl(),me(f.backgroundColor),_e(l+Bl,i,te*f.scale.x,ee*f.scale.y),Cl()}if(a<=32)return{isColliding:{rect:{},text:{},char:{}}};const C=a-33,k=f.isCharacter?bl[C]:f.isSmallText?tt[C]:lt[C],P=r(f.rotation,0,4);if(f.color==="black"&&P===0&&f.mirror.x===1&&f.mirror.y===1&&f.edgeColor==null&&(!X.isUsingPixi||f.scale.x===1&&f.scale.y===1))return ot(k,l,i,f.scale,f.isCheckingCollision,!0);const O=JSON.stringify({c:e,options:f}),$=it[O];if($!=null)return ot($,l,i,f.scale,f.isCheckingCollision,f.color!=="transparent");let U=!1;const F=new o(ee,ee);let _=Xe,Q=st;if(k.size.x>ee||k.size.y>ee){if(P===0||P===2)F.set(k.size.x,k.size.y);else{const te=Math.max(k.size.x,k.size.y);F.set(te,te)}_=document.createElement("canvas"),_.width=F.x,_.height=F.y,Q=_.getContext("2d"),Q.imageSmoothingEnabled=!1}X.isUsingPixi&&(f.scale.x!==1||f.scale.y!==1)&&(el.width=F.x*f.scale.x,el.height=F.y*f.scale.y,kl.imageSmoothingEnabled=!1,kl.scale(f.scale.x,f.scale.y),ti(kl,P,f,k.image,F),U=!0),Q.clearRect(0,0,F.x,F.y),ti(Q,P,f,k.image,F);const Z=at(Q,F,e,f.isCharacter);f.edgeColor!=null&&(_=bn(Q,F,f.edgeColor),F.x+=2,F.y+=2);let ie;if(nt||X.isUsingPixi){const te=document.createElement("img");if(te.src=_.toDataURL(),X.isUsingPixi){const Bl=document.createElement("img");Bl.src=(U?el:_).toDataURL(),ie=PIXI.Texture.from(Bl)}nt&&(it[O]={image:te,texture:ie,hitBox:Z,size:F})}return ot({image:_,texture:ie,hitBox:Z,size:F},l,i,f.scale,f.isCheckingCollision,f.color!=="transparent")}function bn(e,l,i){const n=l.x+2,a=l.y+2,f=[[0,-1],[1,0],[0,1],[-1,0]],C=document.createElement("canvas");C.width=n,C.height=a;const k=C.getContext("2d");k.imageSmoothingEnabled=!1,k.drawImage(e.canvas,1,1);const O=k.getImageData(0,0,n,a).data;k.fillStyle=L(i);for(let $=0;$<a;$++)for(let U=0;U<n;U++){const F=($*n+U)*4;if(O[F+3]===0)for(const[_,Q]of f){const Z=U+_,ie=$+Q;if(Z>=0&&Z<n&&ie>=0&&ie<a){const te=(ie*n+Z)*4;if(O[te+3]>0){k.fillRect(U,$,1,1);break}}}}return C}function ti(e,l,i,n,a){l===0&&i.mirror.x===1&&i.mirror.y===1?e.drawImage(n,0,0):(e.save(),e.translate(a.x/2,a.y/2),e.rotate(Math.PI/2*l),(i.mirror.x===-1||i.mirror.y===-1)&&e.scale(i.mirror.x,i.mirror.y),e.drawImage(n,-a.x/2,-a.y/2),e.restore()),i.color!=="black"&&(e.globalCompositeOperation="source-in",e.fillStyle=L(i.color==="transparent"?"black":i.color),e.fillRect(0,0,a.x,a.y),e.globalCompositeOperation="source-over")}function ot(e,l,i,n,a,f){if(f&&(n.x===1&&n.y===1?ii(e,l,i):ii(e,l,i,e.size.x*n.x,e.size.y*n.y)),!a)return;const C={pos:{x:l+e.hitBox.pos.x*n.x,y:i+e.hitBox.pos.y*n.y},size:{x:e.hitBox.size.x*n.x,y:e.hitBox.size.y*n.y},collision:e.hitBox.collision},k=Zt(C);return f&&He.push(C),k}function ii(e,l,i,n,a){if(X.isUsingPixi){xl(),j.beginTextureFill({texture:e.texture,matrix:new PIXI.Matrix().translate(l,i)}),j.drawRect(l,i,n??e.size.x,a??e.size.y),wl(I(se));return}n==null?W.drawImage(e.image,l,i):W.drawImage(e.image,l,i,n,a)}function Pl(e,l,i){if(e.indexOf(".")>=0||e.indexOf("data:image/")==0)return kn(e,l);let n=e.split(`
`);n=n.slice(1,n.length-1);let a=0;n.forEach(_=>{a=Math.max(_.length,a)});const f=Math.max(Math.ceil((Ze-a)/2),0),C=n.length,k=Math.max(Math.ceil((Ze-C)/2),0),P=new o(Math.max(Ze,a)*ye,Math.max(Ze,C)*ye);let O=Xe,$=st;(P.x>ee||P.y>ee)&&(O=document.createElement("canvas"),O.width=P.x,O.height=P.y,$=O.getContext("2d"),$.imageSmoothingEnabled=!1),$.clearRect(0,0,P.x,P.y),n.forEach((_,Q)=>{for(let Z=0;Z<a;Z++){const ie=_.charAt(Z);let te=m.indexOf(ie);ie!==""&&te>=1&&($.fillStyle=L(c[te]),$.fillRect((Z+f)*ye,(Q+k)*ye,ye,ye))}});const U=document.createElement("img");U.src=O.toDataURL();const F=at($,P,l,i);return X.isUsingPixi?{image:U,texture:PIXI.Texture.from(U),size:P,hitBox:F}:{image:U,size:P,hitBox:F}}function kn(e,l){const i=document.createElement("img");i.src=e;const n=new o,a={pos:new o,size:new o,collision:{isColliding:{char:{},text:{}}}};let f;return X.isUsingPixi?f={image:i,texture:PIXI.Texture.from(i),size:new o,hitBox:a}:f={image:i,size:n,hitBox:a},i.onload=()=>{f.size.set(i.width*ye,i.height*ye);const C=document.createElement("canvas");C.width=f.size.x,C.height=f.size.y;const k=C.getContext("2d");k.imageSmoothingEnabled=!1,k.drawImage(i,0,0,f.size.x,f.size.y);const P=document.createElement("img");P.src=C.toDataURL(),f.image=P,f.hitBox=at(k,f.size,l,!0),X.isUsingPixi&&(f.texture=PIXI.Texture.from(P))},f}function at(e,l,i,n){const a={pos:new o(ee,ee),size:new o,collision:{isColliding:{char:{},text:{}}}};n?a.collision.isColliding.char[i]=!0:a.collision.isColliding.text[i]=!0;const f=e.getImageData(0,0,l.x,l.y).data;let C=0;for(let k=0;k<l.y;k++)for(let P=0;P<l.x;P++)f[C+3]>0&&(P<a.pos.x&&(a.pos.x=P),k<a.pos.y&&(a.pos.y=k)),C+=4;C=0;for(let k=0;k<l.y;k++)for(let P=0;P<l.x;P++)f[C+3]>0&&(P>a.pos.x+a.size.x-1&&(a.size.x=P-a.pos.x+1),k>a.pos.y+a.size.y-1&&(a.size.y=k-a.pos.y+1)),C+=4;return a}function ni(e){let l=Object.assign(Object.assign({},rt),e);return e.scale!=null&&(l.scale=Object.assign(Object.assign({},rt.scale),e.scale)),e.mirror!=null&&(l.mirror=Object.assign(Object.assign({},rt.mirror),e.mirror)),l}let qe=!1,Rl=!1,ct=!1;const si=["Escape","Digit0","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Minus","Equal","Backspace","Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Enter","ControlLeft","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Backquote","ShiftLeft","Backslash","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ShiftRight","NumpadMultiply","AltLeft","Space","CapsLock","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","Pause","ScrollLock","Numpad7","Numpad8","Numpad9","NumpadSubtract","Numpad4","Numpad5","Numpad6","NumpadAdd","Numpad1","Numpad2","Numpad3","Numpad0","NumpadDecimal","IntlBackslash","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","IntlYen","Undo","Paste","MediaTrackPrevious","Cut","Copy","MediaTrackNext","NumpadEnter","ControlRight","LaunchMail","AudioVolumeMute","MediaPlayPause","MediaStop","Eject","AudioVolumeDown","AudioVolumeUp","BrowserHome","NumpadDivide","PrintScreen","AltRight","Help","NumLock","Pause","Home","ArrowUp","PageUp","ArrowLeft","ArrowRight","End","ArrowDown","PageDown","Insert","Delete","OSLeft","OSRight","ContextMenu","BrowserSearch","BrowserFavorites","BrowserRefresh","BrowserStop","BrowserForward","BrowserBack"];let ut;const Pn={onKeyDown:void 0};let dt,ft=!1,ht=!1,gt=!1,pt={},mt={},yt={};function ri(e){dt=Object.assign(Object.assign({},Pn),e),ut=h(si.map(l=>[l,{isPressed:!1,isJustPressed:!1,isJustReleased:!1}])),document.addEventListener("keydown",l=>{ft=ht=!0,pt[l.code]=mt[l.code]=!0,dt.onKeyDown!=null&&dt.onKeyDown(),(l.code==="AltLeft"||l.code==="AltRight"||l.code==="ArrowRight"||l.code==="ArrowDown"||l.code==="ArrowLeft"||l.code==="ArrowUp")&&l.preventDefault()}),document.addEventListener("keyup",l=>{ft=!1,gt=!0,pt[l.code]=!1,yt[l.code]=!0})}function oi(){Rl=!qe&&ht,ct=qe&&gt,ht=gt=!1,qe=ft,s(ut).forEach(([e,l])=>{l.isJustPressed=!l.isPressed&&mt[e],l.isJustReleased=l.isPressed&&yt[e],l.isPressed=!!pt[e]}),mt={},yt={}}function ai(){Rl=!1,qe=!0}var Rn=Object.freeze({__proto__:null,get isPressed(){return qe},get isJustPressed(){return Rl},get isJustReleased(){return ct},codes:si,get code(){return ut},init:ri,update:oi,clearJustPressed:ai});class Ml{constructor(l=null){this.setSeed(l)}get(l=1,i){return i==null&&(i=l,l=0),this.next()/4294967295*(i-l)+l}getInt(l,i){i==null&&(i=l,l=0);const n=Math.floor(l),a=Math.floor(i);return a===n?n:this.next()%(a-n)+n}getPlusOrMinus(){return this.getInt(2)*2-1}select(l){return l[this.getInt(l.length)]}setSeed(l,i=123456789,n=362436069,a=521288629,f=32){this.w=l!=null?l>>>0:Math.floor(Math.random()*4294967295)>>>0,this.x=i>>>0,this.y=n>>>0,this.z=a>>>0;for(let C=0;C<f;C++)this.next();return this}getState(){return{x:this.x,y:this.y,z:this.z,w:this.w}}next(){const l=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^(l^l>>>8))>>>0,this.w}}const ll=new o;let Pe=!1,Je=!1,tl=!1,Mn={isDebugMode:!1,anchor:new o,padding:new o,onPointerDownOrUp:void 0},re,he,ne;const il=new Ml,Ue=new o,Re=new o;let nl=!1,sl=new o,wt=!1,xt=!1,vt=!1;function ci(e,l,i){ne=Object.assign(Object.assign({},Mn),i),re=e,he=new o(l.x+ne.padding.x*2,l.y+ne.padding.y*2),sl.set(re.offsetLeft+re.clientWidth*(.5-ne.anchor.x),re.offsetTop+re.clientWidth*(.5-ne.anchor.y)),ne.isDebugMode&&Ue.set(re.offsetLeft+re.clientWidth*(.5-ne.anchor.x),re.offsetTop+re.clientWidth*(.5-ne.anchor.y)),document.addEventListener("mousedown",n=>{fi(n.pageX,n.pageY)}),document.addEventListener("touchstart",n=>{fi(n.touches[0].pageX,n.touches[0].pageY)}),document.addEventListener("mousemove",n=>{hi(n.pageX,n.pageY)}),document.addEventListener("touchmove",n=>{n.preventDefault(),hi(n.touches[0].pageX,n.touches[0].pageY)},{passive:!1}),document.addEventListener("mouseup",n=>{gi()}),document.addEventListener("touchend",n=>{n.preventDefault(),n.target.click(),gi()},{passive:!1})}function ui(){In(sl.x,sl.y,ll),ne.isDebugMode&&!ll.isInRect(0,0,he.x,he.y)?(Tn(),ll.set(Ue),Je=!Pe&&nl,tl=Pe&&!nl,Pe=nl):(Je=!Pe&&xt,tl=Pe&&vt,Pe=wt),xt=vt=!1}function di(){Je=!1,Pe=!0}function In(e,l,i){re!=null&&(i.x=Math.round(((e-re.offsetLeft)/re.clientWidth+ne.anchor.x)*he.x-ne.padding.x),i.y=Math.round(((l-re.offsetTop)/re.clientHeight+ne.anchor.y)*he.y-ne.padding.y))}function Tn(){Re.length>0?(Ue.add(Re),!x(Ue.x,-he.x*.1,he.x*1.1)&&Ue.x*Re.x>0&&(Re.x*=-1),!x(Ue.y,-he.y*.1,he.y*1.1)&&Ue.y*Re.y>0&&(Re.y*=-1),il.get()<.05&&Re.set(0)):il.get()<.1&&(Re.set(0),Re.addWithAngle(il.get(Math.PI*2),(he.x+he.y)*il.get(.01,.03))),il.get()<.05&&(nl=!nl)}function fi(e,l){sl.set(e,l),wt=xt=!0,ne.onPointerDownOrUp!=null&&ne.onPointerDownOrUp()}function hi(e,l){sl.set(e,l)}function gi(e){wt=!1,vt=!0,ne.onPointerDownOrUp!=null&&ne.onPointerDownOrUp()}var On=Object.freeze({__proto__:null,pos:ll,get isPressed(){return Pe},get isJustPressed(){return Je},get isJustReleased(){return tl},init:ci,update:ui,clearJustPressed:di});let Me=new o,Ie=!1,we=!1,Ae=!1;function pi(e){ri({onKeyDown:e}),ci(H,N,{onPointerDownOrUp:e,anchor:new o(.5,.5)})}function mi(){oi(),ui(),Me=ll,Ie=qe||Pe,we=Rl||Je,Ae=ct||tl}function yi(){ai(),di()}function rl(e){Me.set(e.pos),Ie=e.isPressed,we=e.isJustPressed,Ae=e.isJustReleased}var An=Object.freeze({__proto__:null,get pos(){return Me},get isPressed(){return Ie},get isJustPressed(){return we},get isJustReleased(){return Ae},init:pi,update:mi,clearJustPressed:yi,set:rl});let oe,ol,Ct=!1,wi,xi,St,Te={};function vi(e,l=1){const i=Te[e];return i==null?!1:(i.gainNode.gain.value=l,i.isPlaying=!0,!0)}function Dn(){const e=oe.currentTime;for(const l in Te){const i=Te[l];if(!i.isReady||!i.isPlaying)continue;i.isPlaying=!1;const n=Bn(e);(i.playedTime==null||n>i.playedTime)&&(Ln(i,n),i.playedTime=n)}}function Ci(e,l=void 0){const i=Te[e];i.source!=null&&(l==null?i.source.stop():i.source.stop(l),i.source=void 0)}function En(e=void 0){if(Te){for(const l in Te)Ci(l,e);Te={}}}function Fn(){oe=new(window.AudioContext||window.webkitAudioContext),document.addEventListener("visibilitychange",()=>{document.hidden?oe.suspend():oe.resume()})}function zn(){Ct=!0,ol=oe.createGain(),ol.connect(oe.destination),Si(),jn(),bi()}function Un(e,l){return Te[e]=Nn(l),Te[e]}function Si(e=120){wi=e,xi=60/wi}function jn(e=8){St=e>0?4/e:void 0}function bi(e=.1){ol.gain.value=e}function Ln(e,l){const i=oe.createBufferSource();e.source=i,i.buffer=e.buffer,i.loop=e.isLooping,i.start=i.start||i.noteOn,i.connect(e.gainNode),i.start(l)}function Nn(e){const l={buffer:void 0,source:void 0,gainNode:oe.createGain(),isPlaying:!1,playedTime:void 0,isReady:!1,isLooping:!1};return l.gainNode.connect(ol),$n(e).then(i=>{l.buffer=i,l.isReady=!0}),l}async function $n(e){const i=await(await fetch(e)).arrayBuffer();return await oe.decodeAudioData(i)}function Bn(e){if(St==null)return e;const l=xi*St;return l>0?Math.ceil(e/l)*l:e}let ki,Pi;const Ri=68,bt=1e3/Ri;let al=0;const _n={viewSize:{x:100,y:100},bodyBackground:"#111",viewBackground:"black",isCapturing:!1,isCapturingGameCanvasOnly:!1,isSoundEnabled:!0,captureCanvasScale:1,theme:{name:"simple",isUsingPixi:!1,isDarkColor:!1},colorPalette:void 0};let ae,Mi=10,Il;function Hn(e,l,i){ki=e,Pi=l,ae=Object.assign(Object.assign({},_n),i),M(ae.theme.isDarkColor,ae.colorPalette),un(ae.viewSize,ae.bodyBackground,ae.viewBackground,ae.isCapturing,ae.isCapturingGameCanvasOnly,ae.captureCanvasScale,ae.captureDurationSec,ae.theme),pi(()=>{oe.resume()}),xn(),ki(),Ii()}function Ii(){Il=requestAnimationFrame(Ii);const e=window.performance.now();e<al-Ri/12||(al+=bt,(al<e||al>e+bt*2)&&(al=e+bt),Ct&&Dn(),ae.isSoundEnabled&&sss.update(),mi(),Pi(),ae.isCapturing&&hn(),Mi--,Mi===0&&Cn())}function Gn(){Il&&(cancelAnimationFrame(Il),Il=void 0)}let Tl;const Ol=new Ml;function kt(){Tl=[]}function Ti(e,l=16,i=1,n=0,a=Math.PI*2,f=void 0){if(l<1){if(Ol.get()>l)return;l=1}for(let C=0;C<l;C++){const k=n+Ol.get(a)-a/2,P={pos:new o(e),vel:new o(i*Ol.get(.5,1),0).rotate(k),color:se,ticks:u(Ol.get(10,20)*Math.sqrt(Math.abs(i)),10,60),edgeColor:f};Tl.push(P)}}function Al(){vl(),Tl=Tl.filter(e=>{if(e.ticks--,e.ticks<0)return!1;e.pos.add(e.vel),e.vel.mul(.98);const l=Math.floor(e.pos.x),i=Math.floor(e.pos.y);return e.edgeColor!=null&&(me(e.edgeColor),_e(l-1,i-1,3,3)),me(e.color),_e(l,i,1,1),!0}),Cl()}function Pt(e,l,i,n){return Oi(!1,e,l,i,n)}function Xn(e,l,i,n){return Oi(!0,e,l,i,n)}function qn(e,l,i,n,a=.5,f=.5){typeof e!="number"&&(f=a,a=n,n=i,i=l,l=e.y,e=e.x);const C=new o(i).rotate(a),k=new o(e-C.x*f,l-C.y*f);return Rt(k,C,n)}function Jn(e,l,i=3,n=3,a=3){const f=new o,C=new o;if(typeof e=="number")if(typeof l=="number")typeof i=="number"?(f.set(e,l),C.set(i,n)):(f.set(e,l),C.set(i),a=n);else throw"invalid params";else if(typeof l=="number")if(typeof i=="number")f.set(e),C.set(l,i),a=n;else throw"invalid params";else if(typeof i=="number")f.set(e),C.set(l),a=i;else throw"invalid params";return Rt(f,C.sub(f),a)}function Kn(e,l,i,n,a,f){let C=new o;typeof e=="number"?C.set(e,l):(C.set(e),f=a,a=n,n=i,i=l),n==null&&(n=3),a==null&&(a=0),f==null&&(f=Math.PI*2);let k,P;if(a>f?(k=f,P=a-f):(k=a,P=f-a),P=u(P,0,Math.PI*2),P<.01)return;const O=u(Math.ceil(P*Math.sqrt(i*.25)),1,36),$=P/O;let U=k,F=new o(i).rotate(U).add(C),_=new o,Q=new o,Z={isColliding:{rect:{},text:{},char:{}}};for(let ie=0;ie<O;ie++){U+=$,_.set(i).rotate(U).add(C),Q.set(_).sub(F);const te=Rt(F,Q,n,!0);Z=Object.assign(Object.assign(Object.assign({},Z),et(te.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},Z.isColliding.rect),te.isColliding.rect),text:Object.assign(Object.assign({},Z.isColliding.text),te.isColliding.text),char:Object.assign(Object.assign({},Z.isColliding.char),te.isColliding.char)}}),F.set(_)}return Qt(),Z}function Oi(e,l,i,n,a){if(typeof l=="number"){if(typeof i=="number")return typeof n=="number"?a==null?je(e,l,i,n,n):je(e,l,i,n,a):je(e,l,i,n.x,n.y);throw"invalid params"}else if(typeof i=="number"){if(n==null)return je(e,l.x,l.y,i,i);if(typeof n=="number")return je(e,l.x,l.y,i,n);throw"invalid params"}else return je(e,l.x,l.y,i.x,i.y)}function Rt(e,l,i,n=!1){let a=!0;(X.name==="shape"||X.name==="shapeDark")&&(se!=="transparent"&&dn(e.x,e.y,e.x+l.x,e.y+l.y,i),a=!1);const f=Math.floor(u(i,3,10)),C=Math.abs(l.x),k=Math.abs(l.y),P=u(Math.ceil(C>k?C/f:k/f)+1,3,99);l.div(P-1);let O={isColliding:{rect:{},text:{},char:{}}};for(let $=0;$<P;$++){const U=je(!0,e.x,e.y,i,i,!0,a);O=Object.assign(Object.assign(Object.assign({},O),et(U.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},O.isColliding.rect),U.isColliding.rect),text:Object.assign(Object.assign({},O.isColliding.text),U.isColliding.text),char:Object.assign(Object.assign({},O.isColliding.char),U.isColliding.char)}}),e.add(l)}return n||Qt(),O}function je(e,l,i,n,a,f=!1,C=!0){let k=C;(X.name==="shape"||X.name==="shapeDark")&&k&&se!=="transparent"&&(e?_e(l-n/2,i-a/2,n,a):_e(l,i,n,a),k=!1);let P=e?{x:Math.floor(l-n/2),y:Math.floor(i-a/2)}:{x:Math.floor(l),y:Math.floor(i)};const O={x:Math.trunc(n),y:Math.trunc(a)};if(O.x===0||O.y===0)return{isColliding:{rect:{},text:{},char:{}}};O.x<0&&(P.x+=O.x,O.x*=-1),O.y<0&&(P.y+=O.y,O.y*=-1);const $={pos:P,size:O,collision:{isColliding:{rect:{}}}};$.collision.isColliding.rect[se]=!0;const U=Zt($);return se!=="transparent"&&((f?Sl:He).push($),k&&_e(P.x,P.y,O.x,O.y)),U}function Mt({pos:e,size:l,text:i,isToggle:n=!1,onClick:a=()=>{},isSmallText:f=!0}){return{pos:e,size:l,text:i,isToggle:n,onClick:a,isPressed:!1,isSelected:!1,isHovered:!1,toggleGroup:[],isSmallText:f}}function It(e){const l=new o(Me).sub(e.pos);e.isHovered=l.isInRect(0,0,e.size.x,e.size.y),e.isHovered&&Je&&(e.isPressed=!0),e.isPressed&&!e.isHovered&&(e.isPressed=!1),e.isPressed&&tl&&(e.onClick(),e.isPressed=!1,e.isToggle&&(e.toggleGroup.length===0?e.isSelected=!e.isSelected:(e.toggleGroup.forEach(i=>{i.isSelected=!1}),e.isSelected=!0))),Dl(e)}function Dl(e){vl(),me(e.isPressed?"blue":"light_blue"),Pt(e.pos.x,e.pos.y,e.size.x,e.size.y),e.isToggle&&!e.isSelected&&(me("white"),Pt(e.pos.x+1,e.pos.y+1,e.size.x-2,e.size.y-2)),me(e.isHovered?"black":"blue"),ei(e.text,e.pos.x+3,e.pos.y+3,{isSmallText:e.isSmallText}),Cl()}let xe,cl,Le,Tt;function Vn(e){xe={randomSeed:e,inputs:[]}}function Wn(e){xe.inputs.push(e)}function Ai(){return xe!=null}function Yn(e){cl=0,e.setSeed(xe.randomSeed)}function Qn(){cl>=xe.inputs.length||(rl(xe.inputs[cl]),cl++)}function Zn(){Le=[]}function es(e,l,i){Le.push({randomState:i.getState(),gameState:cloneDeep(e),baseState:cloneDeep(l)})}function ls(e){const l=Le.pop(),i=l.randomState;return e.setSeed(i.w,i.x,i.y,i.z,0),Tt={pos:new o(Me),isPressed:Ie,isJustPressed:we,isJustReleased:Ae},rl(xe.inputs.pop()),l}function ts(e){const l=Le[Le.length-1],i=l.randomState;return e.setSeed(i.w,i.x,i.y,i.z,0),Tt={pos:new o(Me),isPressed:Ie,isJustPressed:we,isJustReleased:Ae},rl(xe.inputs[xe.inputs.length-1]),l}function is(){rl(Tt)}function ns(){return Le.length===0}function ss(){const e=cl-1;if(!(e>=xe.inputs.length))return Le[e]}const Ot=4,rs=60,os="video/webm;codecs=vp8,opus",as="video/webm",cs="recording.webm",us=1e5*Ot,ds=.7;let ge,El;function fs(e,l,i){if(ge!=null)return;const n=document.createElement("canvas");n.width=e.width*Ot,n.height=e.height*Ot;const a=n.getContext("2d");a.imageSmoothingEnabled=!1;const f=()=>{a.drawImage(e,0,0,e.width,e.height,0,0,n.width,n.height),El=requestAnimationFrame(f)};f();const C=n.captureStream(rs),k=l.createMediaStreamDestination(),P=l.createGain();P.gain.value=ds,i.forEach(F=>{F!=null&&F.connect(P)}),P.connect(k);const O=k.stream,$=new MediaStream([...C.getVideoTracks(),...O.getAudioTracks()]);ge=new MediaRecorder($,{mimeType:os,videoBitsPerSecond:us});let U=[];ge.ondataavailable=F=>{F.data.size>0&&U.push(F.data)},ge.onstop=()=>{const F=new Blob(U,{type:as}),_=URL.createObjectURL(F),Q=document.createElement("a");Q.href=_,Q.download=cs,Q.click(),URL.revokeObjectURL(_),U=[]},ge.start()}function hs(){ge!=null&&ge.state!=="inactive"&&(ge.stop(),ge=void 0),El&&(cancelAnimationFrame(El),El=void 0)}function gs(){return ge!=null&&ge.state==="recording"}const ps=Math.PI,ms=Math.abs,ys=Math.sin,ws=Math.cos,xs=Math.atan2,vs=Math.sqrt,Cs=Math.pow,Ss=Math.floor,bs=Math.round,ks=Math.ceil;t.ticks=0,t.difficulty=void 0,t.score=0,t.time=void 0,t.isReplaying=!1;function Ps(e=1,l){return Oe.get(e,l)}function Rs(e=2,l){return Oe.getInt(e,l)}function Ms(e=1,l){return Oe.get(e,l)*Oe.getPlusOrMinus()}function At(e="GAME OVER"){Ll=e,S.isShowingTime&&(t.time=void 0),$i()}function Is(e="COMPLETE"){Ll=e,$i()}function Ts(e,l,i){if(t.isReplaying||(t.score+=e,l==null))return;const n=`${e>=1?"+":""}${Math.floor(e)}`;let a=new o;typeof l=="number"?a.set(l,i):a.set(l),a.x-=n.length*(S.isUsingSmallText?Ge:ee)/2,a.y-=ee/2,Ul.push({str:n,pos:a,vy:-2,ticks:30})}function Di(e){me(e)}function Os(e,l,i,n,a,f){let C=new o;typeof e=="number"?(C.set(e,l),k(C,i,n,a,f)):(C.set(e),k(C,l,i,n,a));function k(P,O,$,U,F){if(Ks(O)){const _=O;Ti(P,_.count,_.speed,_.angle,_.angleWidth,_.edgeColor)}else Ti(P,O,$,U,F)}}function Ei(e,l){return new o(e,l)}function Fi(e,l){!fl&&!$e&&(Ct&&vi(e,l!=null&&l.volume!=null?l.volume:1)||(S.isSoundEnabled&&typeof sss.playSoundEffect=="function"?sss.playSoundEffect(e,l):S.isSoundEnabled&&sss.play(Es[e])))}let Dt;function Et(){jt&&vi(S.bgmName,S.bgmVolume)||(typeof sss.generateMml=="function"?Dt=sss.playMml(sss.generateMml(),{volume:S.bgmVolume}):sss.playBgm())}function Ft(){jt?Ci(S.bgmName):Dt!=null?sss.stopMml(Dt):sss.stopBgm()}function zi(){fs(H,oe,[ol,$l])}function zt(){hs()}function As(e){if(fl){const l=ts(Oe),i=l.baseState;return t.score=i.score,t.ticks=i.ticks,cloneDeep(l.gameState)}else if($e){const l=ls(Oe),i=l.baseState;return t.score=i.score,t.ticks=i.ticks,l.gameState}else{if(t.isReplaying)return ss().gameState;if(Ne==="inGame"){const l={score:t.score,ticks:t.ticks};es(e,l,Oe)}}return e}function Ds(){$e||(!t.isReplaying&&S.isRewindEnabled?Hs():At())}const Es={coin:"c",laser:"l",explosion:"e",powerUp:"p",hit:"h",jump:"j",select:"s",lucky:"u",random:"r",click:"i",synth:"y",tone:"t"},Ui={isPlayingBgm:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,captureCanvasScale:1,captureDurationSec:5,isShowingScore:!0,isShowingTime:!1,isReplayEnabled:!1,isRewindEnabled:!1,isDrawingParticleFront:!1,isDrawingScoreFront:!1,isUsingSmallText:!0,isMinifying:!1,isSoundEnabled:!0,viewSize:{x:100,y:100},audioSeed:0,seed:0,audioVolume:1,theme:"simple",colorPalette:void 0,textEdgeColor:{score:void 0,floatingScore:void 0,title:void 0,description:void 0,gameOver:void 0},bgmName:"bgm",bgmVolume:1,audioTempo:120,isRecording:!1},Fs=new Ml,Oe=new Ml;let Ne,zs={title:Bs,inGame:$s,gameOver:_s,rewind:Gs},ul=0,Fl,zl=!0,dl=0,S,ji,Ul,fl=!1,$e=!1,hl,jl,Ll,Ut,Nl,$l,jt=!1;function Us(e){window.update=e.update,window.title=e.title,window.description=e.description,window.characters=e.characters,window.options=e.options,window.audioFiles=e.audioFiles,Li()}function Li(){typeof options<"u"&&options!=null?S=Object.assign(Object.assign({},Ui),options):S=Ui;const e={name:S.theme,isUsingPixi:!1,isDarkColor:!1};S.theme!=="simple"&&S.theme!=="dark"&&(e.isUsingPixi=!0),(S.theme==="pixel"||S.theme==="shapeDark"||S.theme==="crt"||S.theme==="dark")&&(e.isDarkColor=!0),dl=S.audioSeed+S.seed,S.isMinifying&&Ws(),ji={viewSize:S.viewSize,bodyBackground:e.isDarkColor?"#101010":"#e0e0e0",viewBackground:e.isDarkColor?"blue":"white",theme:e,isSoundEnabled:S.isSoundEnabled,isCapturing:S.isCapturing,isCapturingGameCanvasOnly:S.isCapturingGameCanvasOnly,captureCanvasScale:S.captureCanvasScale,captureDurationSec:S.captureDurationSec,colorPalette:S.colorPalette},Hn(Ls,Ns,ji)}function js(){Gn(),zt(),En(),window.update=void 0,window.title=void 0,window.description=void 0,window.characters=void 0,window.options=void 0,window.audioFiles=void 0}function Ls(){if(typeof description<"u"&&description!=null&&description.trim().length>0&&(zl=!1,dl+=Xi(description)),typeof title<"u"&&title!=null&&title.trim().length>0&&(zl=!1,document.title=title,dl+=Xi(title),Nl=`crisp-game-${encodeURIComponent(title)}-${dl}`,ul=Js()),typeof characters<"u"&&characters!=null&&vn(characters,"a"),Fn(),typeof audioFiles<"u"&&audioFiles!=null){zn(),bi(.1*S.audioVolume),Si(S.audioTempo);for(let e in audioFiles){const l=Un(e,audioFiles[e]);e===S.bgmName&&(l.isLooping=!0,jt=!0)}}S.isSoundEnabled&&($l=oe.createGain(),$l.connect(oe.destination),sss.init(dl,oe,$l),sss.setVolume(.1*S.audioVolume),sss.setTempo(S.audioTempo)),me("black"),zl?(Lt(),t.ticks=0):Ni()}function Ns(){t.df=t.difficulty=t.ticks/3600+1,t.tc=t.ticks;const e=t.score,l=t.time;t.sc=t.score;const i=t.sc;t.inp={p:Me,ip:Ie,ijp:we,ijr:Ae},pn(),zs[Ne](),X.isUsingPixi&&(xl(),X.name==="crt"&&fn()),t.ticks++,t.isReplaying?(t.score=e,t.time=l):t.sc!==i&&(t.score=t.sc)}function Lt(){Ne="inGame",t.ticks=-1,kt();const e=Math.floor(t.score);e>ul&&(ul=e),S.isShowingTime&&t.time!=null&&(Fl==null||Fl>t.time)&&(Fl=t.time),t.score=0,t.time=0,Ul=[],S.isPlayingBgm&&S.isSoundEnabled&&Et();const l=Fs.getInt(999999999);Oe.setSeed(l),(S.isReplayEnabled||S.isRewindEnabled)&&(Vn(l),Zn(),t.isReplaying=!1)}function $s(){yl(),S.isDrawingParticleFront||Al(),S.isDrawingScoreFront||Gi(),(S.isReplayEnabled||S.isRewindEnabled)&&Wn({pos:Ei(Me),isPressed:Ie,isJustPressed:we,isJustReleased:Ae}),typeof update=="function"&&update(),S.isDrawingParticleFront&&Al(),S.isDrawingScoreFront&&Gi(),Nt(),S.isShowingTime&&t.time!=null&&t.time++,S.isRecording&&!gs()&&zi()}function Ni(){Ne="title",t.ticks=-1,kt(),yl(),Ai()&&(Yn(Oe),t.isReplaying=!0)}function Bs(){if(we){Lt();return}if(yl(),S.isReplayEnabled&&Ai()&&(Qn(),t.inp={p:Me,ip:Ie,ijp:we,ijr:Ae},S.isDrawingParticleFront||Al(),update(),S.isDrawingParticleFront&&Al()),Nt(),typeof title<"u"&&title!=null){let e=0;title.split(`
`).forEach(i=>{i.length>e&&(e=i.length)});const l=Math.floor((N.x-e*ee)/2);title.split(`
`).forEach((i,n)=>{ke(i,l,Math.floor(N.y*.25)+n*ee,{edgeColor:S.textEdgeColor.title})})}if(typeof description<"u"&&description!=null){let e=0;description.split(`
`).forEach(n=>{n.length>e&&(e=n.length)});const l=S.isUsingSmallText?Ge:ee,i=Math.floor((N.x-e*l)/2);description.split(`
`).forEach((n,a)=>{ke(n,i,Math.floor(N.y/2)+a*ee,{isSmallText:S.isUsingSmallText,edgeColor:S.textEdgeColor.description})})}}function $i(){Ne="gameOver",t.isReplaying||yi(),t.ticks=-1,_i(),S.isPlayingBgm&&S.isSoundEnabled&&Ft();const e=Math.floor(t.score);e>ul&&qs(e)}function _s(){t.ticks===0&&!X.isUsingPixi&&_i(),(t.isReplaying||t.ticks>20)&&we?(Bi(),Lt()):t.ticks===(S.isReplayEnabled?120:300)&&!zl&&(Bi(),Ni())}function Bi(){!S.isRecording||t.isReplaying||zt()}function _i(){t.isReplaying||ke(Ll,Math.floor((N.x-Ll.length*ee)/2),Math.floor(N.y/2),{edgeColor:S.textEdgeColor.gameOver})}function Hs(){Ne="rewind",fl=!0,hl=Mt({pos:{x:N.x-39,y:11},size:{x:36,y:7},text:"Rewind",isSmallText:S.isUsingSmallText}),jl=Mt({pos:{x:N.x-39,y:N.y-19},size:{x:36,y:7},text:"GiveUp",isSmallText:S.isUsingSmallText}),S.isPlayingBgm&&S.isSoundEnabled&&Ft(),X.isUsingPixi&&(Dl(hl),Dl(jl))}function Gs(){yl(),update(),Nt(),is(),$e?(Dl(hl),(ns()||!Ie)&&Xs()):(It(hl),It(jl),hl.isPressed&&($e=!0,fl=!1)),jl.isPressed&&(fl=$e=!1,At()),S.isShowingTime&&t.time!=null&&t.time++}function Xs(){$e=!1,Ne="inGame",kt(),S.isPlayingBgm&&S.isSoundEnabled&&Et()}function Nt(){if(S.isShowingTime)Hi(t.time,3,3),Hi(Fl,N.x-7*(S.isUsingSmallText?Ge:ee),3);else if(S.isShowingScore){ke(`${Math.floor(t.score)}`,3,3,{isSmallText:S.isUsingSmallText,edgeColor:S.textEdgeColor.score});const e=`HI ${ul}`;ke(e,N.x-e.length*(S.isUsingSmallText?Ge:ee),3,{isSmallText:S.isUsingSmallText,edgeColor:S.textEdgeColor.score})}}function Hi(e,l,i){if(e==null)return;let n=Math.floor(e*100/50);n>=10*60*100&&(n=10*60*100-1);const a=$t(Math.floor(n/6e3),1)+"'"+$t(Math.floor(n%6e3/100),2)+'"'+$t(Math.floor(n%100),2);ke(a,l,i,{isSmallText:S.isUsingSmallText,edgeColor:S.textEdgeColor.score})}function $t(e,l){return("0000"+e).slice(-l)}function Gi(){vl(),me("black"),Ul=Ul.filter(e=>(ke(e.str,e.pos.x,e.pos.y,{isSmallText:S.isUsingSmallText,edgeColor:S.textEdgeColor.floatingScore}),e.pos.y+=e.vy,e.vy*=.9,e.ticks--,e.ticks>0)),Cl()}function Xi(e){let l=0;for(let i=0;i<e.length;i++){const n=e.charCodeAt(i);l=(l<<5)-l+n,l|=0}return l}function qs(e){if(Nl!=null)try{const l={highScore:e};localStorage.setItem(Nl,JSON.stringify(l))}catch(l){console.warn("Unable to save high score:",l)}}function Js(){try{const e=localStorage.getItem(Nl);if(e)return JSON.parse(e).highScore}catch(e){console.warn("Unable to load high score:",e)}return 0}function Ks(e){return e!=null&&e.constructor===Object}function Vs(){let e=window.location.search.substring(1);if(e=e.replace(/[^A-Za-z0-9_-]/g,""),e.length===0)return;const l=document.createElement("script");Ut=`${e}/main.js`,l.setAttribute("src",Ut),document.head.appendChild(l)}function Ws(){fetch(Ut).then(e=>e.text()).then(e=>{const l=Terser.minify(e+"update();",{toplevel:!0}).code,i="function(){",n=l.indexOf(i),a="options={",f=l.indexOf(a);let C=l;if(n>=0)C=l.substring(l.indexOf(i)+i.length,l.length-4);else if(f>=0){let k=1,P;for(let O=f+a.length;O<l.length;O++){const $=l.charAt(O);if($==="{")k++;else if($==="}"&&(k--,k===0)){P=O+2;break}}k===0&&(C=l.substring(P))}qi.forEach(([k,P])=>{C=C.split(k).join(P)}),console.log(C),console.log(`${C.length} letters`)})}t.inp=void 0;function Ys(...e){return Di.apply(this,e)}function Qs(...e){return Fi.apply(this,e)}function Zs(...e){return w.apply(this,e)}function er(...e){return p.apply(this.args)}t.tc=void 0,t.df=void 0,t.sc=void 0;const lr="transparent",tr="white",ir="red",nr="green",sr="yellow",rr="blue",or="purple",ar="cyan",cr="black",ur="coin",dr="laser",fr="explosion",hr="powerUp",gr="hit",pr="jump",mr="select",yr="lucky";let qi=[["===","=="],["!==","!="],["input.pos","inp.p"],["input.isPressed","inp.ip"],["input.isJustPressed","inp.ijp"],["input.isJustReleased","inp.ijr"],["color(","clr("],["play(","ply("],["times(","tms("],["remove(","rmv("],["ticks","tc"],["difficulty","df"],["score","sc"],[".isColliding.rect.transparent",".tr"],[".isColliding.rect.white",".wh"],[".isColliding.rect.red",".rd"],[".isColliding.rect.green",".gr"],[".isColliding.rect.yellow",".yl"],[".isColliding.rect.blue",".bl"],[".isColliding.rect.purple",".pr"],[".isColliding.rect.cyan",".cy"],[".isColliding.rect.black",".lc"],['"transparent"',"tr"],['"white"',"wh"],['"red"',"rd"],['"green"',"gr"],['"yellow"',"yl"],['"blue"',"bl"],['"purple"',"pr"],['"cyan"',"cy"],['"black"',"lc"],['"coin"',"cn"],['"laser"',"ls"],['"explosion"',"ex"],['"powerUp"',"pw"],['"hit"',"ht"],['"jump"',"jm"],['"select"',"sl"],['"lucky"',"uc"]];t.PI=ps,t.abs=ms,t.addGameScript=Vs,t.addScore=Ts,t.addWithCharCode=d,t.arc=Kn,t.atan2=xs,t.bar=qn,t.bl=rr,t.box=Xn,t.ceil=ks,t.char=yn,t.clamp=u,t.clr=Ys,t.cn=ur,t.color=Di,t.complete=Is,t.cos=ws,t.cy=ar,t.end=At,t.ex=fr,t.floor=Ss,t.frameState=As,t.getButton=Mt,t.gr=nr,t.ht=gr,t.init=Us,t.input=An,t.jm=pr,t.keyboard=Rn,t.lc=cr,t.line=Jn,t.ls=dr,t.minifyReplaces=qi,t.onLoad=Li,t.onUnload=js,t.particle=Os,t.play=Fi,t.playBgm=Et,t.ply=Qs,t.pointer=On,t.pow=Cs,t.pr=or,t.pw=hr,t.range=y,t.rd=ir,t.rect=Pt,t.remove=p,t.rewind=Ds,t.rmv=er,t.rnd=Ps,t.rndi=Rs,t.rnds=Ms,t.round=bs,t.sin=ys,t.sl=mr,t.sqrt=vs,t.startRecording=zi,t.stopBgm=Ft,t.stopRecording=zt,t.text=ei,t.times=w,t.tms=Zs,t.tr=lr,t.uc=yr,t.updateButton=It,t.vec=Ei,t.wh=tr,t.wrap=r,t.yl=sr}(window||{})),Ji}Sr();const br=[`
  l
 lll
lllll
l l l
  l
 lll
`,`
 r r
rr rr
rrrrr
rrrrr
 rrr
  r
`,`
  r
 rrr
rrrrr
rrrrr
 rrr
  r
`,`
 lll
 lll
ll ll
ll ll
  l
 lll
`,`
l l l
 l l
l l l
 l l
l l l
 l l
`,`
l lll
l l l
l l l
l l l
l lll
`,`
  ll
llllll
l    l
l    l
 l  l
 llll
`,`
lwwwwl
lwwwl
lwwl
lwl
ll
`,`
 y r
r r y
 y r
y   r
 yrr
`,`
 l ll
 l ll
 l ll
 l ll
ll ll
`],Bt={spade:0,heart:1,diamond:2,club:3,back:4,joker:8};class Yl{constructor(){G(this,"pos");G(this,"size",vec(9,16));G(this,"rank");G(this,"suit");G(this,"isFaceUp");G(this,"isSelected");G(this,"isHighlighted");G(this,"isFlipping");G(this,"flipProgress");G(this,"targetIsFaceUp");G(this,"flipSpeed");G(this,"isMoving");G(this,"moveStartPos");G(this,"moveTargetPos");G(this,"moveProgress");G(this,"moveSpeed");G(this,"isDisappearing");G(this,"disappearSpeed");this.pos=vec(),this.rank=1,this.suit="spade",this.isFaceUp=!0,this.isSelected=!1,this.isHighlighted=!1,this.isFlipping=!1,this.flipProgress=0,this.targetIsFaceUp=null,this.flipSpeed=.1,this.isMoving=!1,this.moveStartPos=vec(),this.moveTargetPos=vec(),this.moveProgress=0,this.moveSpeed=.07,this.isDisappearing=!1,this.disappearSpeed=.1}getRankDisplayString(){if(this.rank===0)return"";switch(this.rank){case 1:return"A";case 10:return"f";case 11:return"J";case 12:return"Q";case 13:return"K";default:return this.rank.toString()}}startFlipAnimation(u){this.isFlipping||this.isFaceUp===u||(this.isFlipping=!0,this.flipProgress=0,this.targetIsFaceUp=u)}updateFlipAnimation(){this.isFlipping&&(this.flipProgress+=this.flipSpeed,this.flipProgress>=1&&(this.isFaceUp=this.targetIsFaceUp,this.isFlipping=!1,this.flipProgress=0,this.targetIsFaceUp=null))}startMoveAnimation(u){this.isMoving=!0,this.moveStartPos=vec(this.pos.x,this.pos.y),this.moveTargetPos=vec(u.x,u.y),this.moveProgress=0}updateMovement(){if(this.isMoving)if(this.moveProgress+=this.moveSpeed,this.moveProgress>=1)this.pos.set(this.moveTargetPos),this.isMoving=!1,this.moveProgress=0;else{const u=this.moveStartPos.x+(this.moveTargetPos.x-this.moveStartPos.x)*this.moveProgress,r=this.moveStartPos.y+(this.moveTargetPos.y-this.moveStartPos.y)*this.moveProgress;this.pos.set(u,r)}}startDisappearAnimation(){this.isDisappearing=!0,this.moveStartPos=vec(this.pos.x,this.pos.y),this.moveTargetPos=vec(this.pos.x,-this.size.y),this.moveProgress=0,this.moveSpeed=this.disappearSpeed,this.isMoving=!0}update(){this.updateFlipAnimation(),this.updateMovement()}draw(){this.update();let u=1,r=this.isFaceUp;this.isFlipping&&(u=Math.cos(this.flipProgress*PI),u<0&&(r=this.targetIsFaceUp,u*=-1)),this.isHighlighted&&(color("red"),rect(this.pos.x-(this.size.x/2+1),this.pos.y-(this.size.y/2+1),this.size.x+2,this.size.y+2)),color("black");const x=this.size.x*u;if(rect(this.pos.x-x/2,this.pos.y-this.size.y/2,x,this.size.y),u>.1){const y=this.isSelected?"light_yellow":"white";color(y);const w=(this.size.x-2)*u;if(rect(this.pos.x-w/2,this.pos.y-(this.size.y-2)/2,w,this.size.y-2),r)if(this.suit==="joker"){color("black");const p=ceil(this.pos.x-1),h={scale:{x:u}};char("i",p,this.pos.y-3,h),char("j",p,this.pos.y+3,h)}else{const p=this.suit==="heart"||this.suit==="diamond"?"red":"black",h=ceil(this.pos.x-1),s={scale:{x:u}};color(p),char(addWithCharCode("a",Bt[this.suit]),h,this.pos.y-3,s),color(p);const d=this.getRankDisplayString();d&&char(d,h,this.pos.y+3,s)}else{color("blue");const p=ceil(this.pos.x-1),h={scale:{x:u}};char(addWithCharCode("a",Bt.back),p,this.pos.y-3,h),char(addWithCharCode("a",Bt.back),p,this.pos.y+3,h)}}}containsPoint(u){const r=this.pos.x-this.size.x/2,x=this.pos.y-this.size.y/2;return u.isInRect(r,x,this.size.x,this.size.y)}}class kr{constructor(u,r,x,y,w="",p){G(this,"pos");G(this,"size");G(this,"text");G(this,"isVisible");G(this,"textColor");G(this,"backgroundColor");G(this,"borderColor");G(this,"tailAlign");G(this,"tailDirection");G(this,"tailChar");G(this,"padding",{x:3,y:2});G(this,"lineSpacing",6);G(this,"charWidth",4);G(this,"minHeight",15);this.pos=vec(u,r),this.size=vec(x,Math.max(y,this.minHeight)),this.text=w,this.isVisible=!1,this.textColor="black",this.backgroundColor="white",this.borderColor="black",this.tailAlign=(p==null?void 0:p.align)??"left",this.tailDirection=(p==null?void 0:p.direction)??"down",this.tailChar="h",this._calculateAndSetHeight(this.text)}_calculateAndSetHeight(u){const r=Math.floor((this.size.x-this.padding.x*2)/this.charWidth);if(r<=0){this.size.y=this.minHeight;return}let x=1;const y=u.split(" ");let w="";for(const h of y){const s=w?`${w} ${h}`:h;s.length<=r?w=s:(x++,w=h)}const p=x*this.lineSpacing+this.padding.y*2;this.size.y=Math.max(p,this.minHeight)}setText(u){this.text!==u&&(this.text=u,this._calculateAndSetHeight(this.text))}show(u){u&&this.text!==u?this.setText(u):this.isVisible||this._calculateAndSetHeight(this.text),this.isVisible=!0}hide(){this.isVisible=!1}setTail(u,r){this.tailAlign=u,this.tailDirection=r}draw(){if(!this.isVisible)return;color(this.backgroundColor),rect(this.pos.x,this.pos.y,this.size.x,this.size.y),color(this.borderColor),rect(this.pos.x,this.pos.y,this.size.x,1),rect(this.pos.x,this.pos.y+this.size.y-1,this.size.x,1),rect(this.pos.x,this.pos.y+1,1,this.size.y-2),rect(this.pos.x+this.size.x-1,this.pos.y+1,1,this.size.y-2),color(this.textColor);const u={isSmallText:!0},r=Math.floor((this.size.x-this.padding.x*2)/this.charWidth);let x=this.pos.y+this.padding.y+2;if(r>0){const y=this.text.split(" ");let w="";for(const p of y){const h=w?`${w} ${p}`:p;h.length<=r?w=h:(text(w,this.pos.x+this.padding.x,x,u),x+=this.lineSpacing,w=p)}w&&text(w,this.pos.x+this.padding.x,x,u)}if(this.tailDirection!=="none"){let y,w;const p={},h={};this.tailDirection==="down"?w=this.pos.y+this.size.y+1:(w=this.pos.y-1,p.mirror={y:-1});const s=3;this.tailAlign==="left"?y=this.pos.x+s:this.tailAlign==="center"?y=this.pos.x+this.size.x/2:y=this.pos.x+this.size.x-s,color(this.borderColor),char(this.tailChar,y,w,{...p,...h})}}}var _l={exports:{}},Pr=_l.exports,Vi;function Rr(){return Vi||(Vi=1,function(t){(function(u,r,x){function y(s){var d=this,g=h();d.next=function(){var o=2091639*d.s0+d.c*23283064365386963e-26;return d.s0=d.s1,d.s1=d.s2,d.s2=o-(d.c=o|0)},d.c=1,d.s0=g(" "),d.s1=g(" "),d.s2=g(" "),d.s0-=g(s),d.s0<0&&(d.s0+=1),d.s1-=g(s),d.s1<0&&(d.s1+=1),d.s2-=g(s),d.s2<0&&(d.s2+=1),g=null}function w(s,d){return d.c=s.c,d.s0=s.s0,d.s1=s.s1,d.s2=s.s2,d}function p(s,d){var g=new y(s),o=d&&d.state,c=g.next;return c.int32=function(){return g.next()*4294967296|0},c.double=function(){return c()+(c()*2097152|0)*11102230246251565e-32},c.quick=c,o&&(typeof o=="object"&&w(o,g),c.state=function(){return w(g,{})}),c}function h(){var s=4022871197,d=function(g){g=String(g);for(var o=0;o<g.length;o++){s+=g.charCodeAt(o);var c=.02519603282416938*s;s=c>>>0,c-=s,c*=s,s=c>>>0,c-=s,s+=c*4294967296}return(s>>>0)*23283064365386963e-26};return d}r&&r.exports?r.exports=p:this.alea=p})(Pr,t)}(_l)),_l.exports}var Hl={exports:{}},Mr=Hl.exports,Wi;function Ir(){return Wi||(Wi=1,function(t){(function(u,r,x){function y(h){var s=this,d="";s.x=0,s.y=0,s.z=0,s.w=0,s.next=function(){var o=s.x^s.x<<11;return s.x=s.y,s.y=s.z,s.z=s.w,s.w^=s.w>>>19^o^o>>>8},h===(h|0)?s.x=h:d+=h;for(var g=0;g<d.length+64;g++)s.x^=d.charCodeAt(g)|0,s.next()}function w(h,s){return s.x=h.x,s.y=h.y,s.z=h.z,s.w=h.w,s}function p(h,s){var d=new y(h),g=s&&s.state,o=function(){return(d.next()>>>0)/4294967296};return o.double=function(){do var c=d.next()>>>11,m=(d.next()>>>0)/4294967296,v=(c+m)/(1<<21);while(v===0);return v},o.int32=d.next,o.quick=o,g&&(typeof g=="object"&&w(g,d),o.state=function(){return w(d,{})}),o}r&&r.exports?r.exports=p:this.xor128=p})(Mr,t)}(Hl)),Hl.exports}var Gl={exports:{}},Tr=Gl.exports,Yi;function Or(){return Yi||(Yi=1,function(t){(function(u,r,x){function y(h){var s=this,d="";s.next=function(){var o=s.x^s.x>>>2;return s.x=s.y,s.y=s.z,s.z=s.w,s.w=s.v,(s.d=s.d+362437|0)+(s.v=s.v^s.v<<4^(o^o<<1))|0},s.x=0,s.y=0,s.z=0,s.w=0,s.v=0,h===(h|0)?s.x=h:d+=h;for(var g=0;g<d.length+64;g++)s.x^=d.charCodeAt(g)|0,g==d.length&&(s.d=s.x<<10^s.x>>>4),s.next()}function w(h,s){return s.x=h.x,s.y=h.y,s.z=h.z,s.w=h.w,s.v=h.v,s.d=h.d,s}function p(h,s){var d=new y(h),g=s&&s.state,o=function(){return(d.next()>>>0)/4294967296};return o.double=function(){do var c=d.next()>>>11,m=(d.next()>>>0)/4294967296,v=(c+m)/(1<<21);while(v===0);return v},o.int32=d.next,o.quick=o,g&&(typeof g=="object"&&w(g,d),o.state=function(){return w(d,{})}),o}r&&r.exports?r.exports=p:this.xorwow=p})(Tr,t)}(Gl)),Gl.exports}var Xl={exports:{}},Ar=Xl.exports,Qi;function Dr(){return Qi||(Qi=1,function(t){(function(u,r,x){function y(h){var s=this;s.next=function(){var g=s.x,o=s.i,c,m;return c=g[o],c^=c>>>7,m=c^c<<24,c=g[o+1&7],m^=c^c>>>10,c=g[o+3&7],m^=c^c>>>3,c=g[o+4&7],m^=c^c<<7,c=g[o+7&7],c=c^c<<13,m^=c^c<<9,g[o]=m,s.i=o+1&7,m};function d(g,o){var c,m=[];if(o===(o|0))m[0]=o;else for(o=""+o,c=0;c<o.length;++c)m[c&7]=m[c&7]<<15^o.charCodeAt(c)+m[c+1&7]<<13;for(;m.length<8;)m.push(0);for(c=0;c<8&&m[c]===0;++c);for(c==8?m[7]=-1:m[c],g.x=m,g.i=0,c=256;c>0;--c)g.next()}d(s,h)}function w(h,s){return s.x=h.x.slice(),s.i=h.i,s}function p(h,s){h==null&&(h=+new Date);var d=new y(h),g=s&&s.state,o=function(){return(d.next()>>>0)/4294967296};return o.double=function(){do var c=d.next()>>>11,m=(d.next()>>>0)/4294967296,v=(c+m)/(1<<21);while(v===0);return v},o.int32=d.next,o.quick=o,g&&(g.x&&w(g,d),o.state=function(){return w(d,{})}),o}r&&r.exports?r.exports=p:this.xorshift7=p})(Ar,t)}(Xl)),Xl.exports}var ql={exports:{}},Er=ql.exports,Zi;function Fr(){return Zi||(Zi=1,function(t){(function(u,r,x){function y(h){var s=this;s.next=function(){var g=s.w,o=s.X,c=s.i,m,v;return s.w=g=g+1640531527|0,v=o[c+34&127],m=o[c=c+1&127],v^=v<<13,m^=m<<17,v^=v>>>15,m^=m>>>12,v=o[c]=v^m,s.i=c,v+(g^g>>>16)|0};function d(g,o){var c,m,v,b,D,M=[],E=128;for(o===(o|0)?(m=o,o=null):(o=o+"\0",m=0,E=Math.max(E,o.length)),v=0,b=-32;b<E;++b)o&&(m^=o.charCodeAt((b+32)%o.length)),b===0&&(D=m),m^=m<<10,m^=m>>>15,m^=m<<4,m^=m>>>13,b>=0&&(D=D+1640531527|0,c=M[b&127]^=m+D,v=c==0?v+1:0);for(v>=128&&(M[(o&&o.length||0)&127]=-1),v=127,b=4*128;b>0;--b)m=M[v+34&127],c=M[v=v+1&127],m^=m<<13,c^=c<<17,m^=m>>>15,c^=c>>>12,M[v]=m^c;g.w=D,g.X=M,g.i=v}d(s,h)}function w(h,s){return s.i=h.i,s.w=h.w,s.X=h.X.slice(),s}function p(h,s){h==null&&(h=+new Date);var d=new y(h),g=s&&s.state,o=function(){return(d.next()>>>0)/4294967296};return o.double=function(){do var c=d.next()>>>11,m=(d.next()>>>0)/4294967296,v=(c+m)/(1<<21);while(v===0);return v},o.int32=d.next,o.quick=o,g&&(g.X&&w(g,d),o.state=function(){return w(d,{})}),o}r&&r.exports?r.exports=p:this.xor4096=p})(Er,t)}(ql)),ql.exports}var Jl={exports:{}},zr=Jl.exports,en;function Ur(){return en||(en=1,function(t){(function(u,r,x){function y(h){var s=this,d="";s.next=function(){var o=s.b,c=s.c,m=s.d,v=s.a;return o=o<<25^o>>>7^c,c=c-m|0,m=m<<24^m>>>8^v,v=v-o|0,s.b=o=o<<20^o>>>12^c,s.c=c=c-m|0,s.d=m<<16^c>>>16^v,s.a=v-o|0},s.a=0,s.b=0,s.c=-1640531527,s.d=1367130551,h===Math.floor(h)?(s.a=h/4294967296|0,s.b=h|0):d+=h;for(var g=0;g<d.length+20;g++)s.b^=d.charCodeAt(g)|0,s.next()}function w(h,s){return s.a=h.a,s.b=h.b,s.c=h.c,s.d=h.d,s}function p(h,s){var d=new y(h),g=s&&s.state,o=function(){return(d.next()>>>0)/4294967296};return o.double=function(){do var c=d.next()>>>11,m=(d.next()>>>0)/4294967296,v=(c+m)/(1<<21);while(v===0);return v},o.int32=d.next,o.quick=o,g&&(typeof g=="object"&&w(g,d),o.state=function(){return w(d,{})}),o}r&&r.exports?r.exports=p:this.tychei=p})(zr,t)}(Jl)),Jl.exports}var Kl={exports:{}};const jr={},Lr=Object.freeze(Object.defineProperty({__proto__:null,default:jr},Symbol.toStringTag,{value:"Module"})),Nr=Cr(Lr);var $r=Kl.exports,ln;function Br(){return ln||(ln=1,function(t){(function(u,r,x){var y=256,w=6,p=52,h="random",s=x.pow(y,w),d=x.pow(2,p),g=d*2,o=y-1,c;function m(R,I,L){var V=[];I=I==!0?{entropy:!0}:I||{};var J=M(D(I.entropy?[R,T(r)]:R??E(),3),V),N=new v(V),H=function(){for(var W=N.g(w),j=s,B=0;W<d;)W=(W+B)*y,j*=y,B=N.g(1);for(;W>=g;)W/=2,j/=2,B>>>=1;return(W+B)/j};return H.int32=function(){return N.g(4)|0},H.quick=function(){return N.g(4)/4294967296},H.double=H,M(T(N.S),r),(I.pass||L||function(W,j,B,de){return de&&(de.S&&b(de,N),W.state=function(){return b(N,{})}),B?(x[h]=W,j):W})(H,J,"global"in I?I.global:this==x,I.state)}function v(R){var I,L=R.length,V=this,J=0,N=V.i=V.j=0,H=V.S=[];for(L||(R=[L++]);J<y;)H[J]=J++;for(J=0;J<y;J++)H[J]=H[N=o&N+R[J%L]+(I=H[J])],H[N]=I;(V.g=function(W){for(var j,B=0,de=V.i,Y=V.j,fe=V.S;W--;)j=fe[de=o&de+1],B=B*y+fe[o&(fe[de]=fe[Y=o&Y+j])+(fe[Y]=j)];return V.i=de,V.j=Y,B})(y)}function b(R,I){return I.i=R.i,I.j=R.j,I.S=R.S.slice(),I}function D(R,I){var L=[],V=typeof R,J;if(I&&V=="object")for(J in R)try{L.push(D(R[J],I-1))}catch{}return L.length?L:V=="string"?R:R+"\0"}function M(R,I){for(var L=R+"",V,J=0;J<L.length;)I[o&J]=o&(V^=I[o&J]*19)+L.charCodeAt(J++);return T(I)}function E(){try{var R;return c&&(R=c.randomBytes)?R=R(y):(R=new Uint8Array(y),(u.crypto||u.msCrypto).getRandomValues(R)),T(R)}catch{var I=u.navigator,L=I&&I.plugins;return[+new Date,u,L,u.screen,T(r)]}}function T(R){return String.fromCharCode.apply(0,R)}if(M(x.random(),r),t.exports){t.exports=m;try{c=Nr}catch{}}else x["seed"+h]=m})(typeof self<"u"?self:$r,[],Math)}(Kl)),Kl.exports}var _t,tn;function _r(){if(tn)return _t;tn=1;var t=Rr(),u=Ir(),r=Or(),x=Dr(),y=Fr(),w=Ur(),p=Br();return p.alea=t,p.xor128=u,p.xorwow=r,p.xorshift7=x,p.xor4096=y,p.tychei=w,_t=p,_t}var Hr=_r();const Gr=vr(Hr),Xr=t=>t?Gr(t):Math.random,qr=["SPADE","HEART","DIAMOND","CLUB"],Jr=["A","2","3","4","5","6","7","8","9","10","J","Q","K"],Kr=(t=0)=>{let u=[],r=t;for(const x of qr)for(const y of Jr)u.push({suit:x,rank:y,id:`card-${r++}`});return u},Ht=(t,u)=>{const r=u?Xr(u):Math.random,x=[...t];for(let y=x.length-1;y>0;y--){const w=Math.floor(r()*(y+1));[x[y],x[w]]=[x[w],x[y]]}return x},De=5,Ee=5,Vr=4,Se=["J","Q","K","10"],pl={gameId:"cartographers_expedition_v1_find_aces",gameName:"Cartographer's Expedition (Find Aces)",description:"A solitaire game where you reveal adjacent cards using matching hand cards to find the four corner Aces.",setupGame:t=>{const u=Kr(),r=u.filter(M=>M.rank==="A"),x=u.filter(M=>M.rank!=="A"),y=Ht([...x],t?`${t}-nonaces`:void 0),w=Ht([...r],t?`${t}-aces`:void 0),p=Array(De).fill(null).map(()=>Array(Ee).fill(null)),h=[],s=[{r:0,c:0},{r:0,c:Ee-1},{r:De-1,c:0},{r:De-1,c:Ee-1}];s.forEach((M,E)=>{w[E]&&(p[M.r][M.c]={...w[E],faceUp:!1})});let d=0;for(let M=0;M<De;M++)for(let E=0;E<Ee;E++){const T=s.some(I=>I.r===M&&I.c===E),R=M===Math.floor(De/2)&&E===Math.floor(Ee/2);!T&&!R&&d<y.length&&(p[M][E]={...y[d++],faceUp:!1})}const g=Math.floor(De/2),o=Math.floor(Ee/2);let c=null,m=y.slice(d);for(let M=0;M<Vr&&m.length>0;M++){const E=m.shift();E&&h.push(E)}const v=m;let b=[];v.length>0?(c={...v.shift(),faceUp:!0},p[g][o]=c):(console.warn("Draw pile empty before placing initial center card!"),p[g][o]=null);let D=!1;if(c){const M=Se.includes(c.rank),E=h.some(T=>T.suit===c.suit||T.rank===c.rank);(M||!E)&&(D=!0)}if(D&&c){console.log("Initial center card requires redraw. Starting redraw...");const M=[];M.push(c),p[g][o]=null;let E=!1;for(;v.length>0;){const T=v.shift(),R=Se.includes(T.rank),I=h.some(L=>L.suit===T.suit||L.rank===T.rank);if(!R&&I){console.log(`Found suitable center card: ${T.rank}${T.suit}`),p[g][o]={...T,faceUp:!0},E=!0;break}else M.push(T)}v.push(...M),Ht(v,t?`${t}-redraw-shuffle`:void 0),console.log(`Draw pile reshuffled. New size: ${v.length}`),E||(console.warn("Draw pile exhausted during redraw, center remains empty."),p[g][o]=null)}return{grid:p,hand:h,drawPile:v,discardPile:b,moves:0,_cardIdCounter:52}},getAvailableActions:t=>{var y,w,p;const u=[],r=t.grid.length,x=((y=t.grid[0])==null?void 0:y.length)??0;if(t.hand.length>0)for(let h=0;h<t.hand.length;h++){const s=t.hand[h];if(s)for(let d=0;d<r;d++)for(let g=0;g<x;g++){const o=(w=t.grid[d])==null?void 0:w[g];if(o&&o.faceUp){let c=!1;if(Se.includes(o.rank)?s.rank===o.rank&&(c=!0):(s.suit===o.suit||s.rank===o.rank)&&(c=!0),c){const v=[[d-1,g],[d+1,g],[d,g-1],[d,g+1]];for(const[b,D]of v)if(Vl(b,D,r,x)){const M=(p=t.grid[b])==null?void 0:p[D];M&&!M.faceUp&&u.push({type:"revealAdjacent",payload:{handIndex:h,sourceRow:d,sourceCol:g,targetRow:b,targetCol:D}})}}}}}if(t.hand.length>0&&t.drawPile.length>0)for(let h=0;h<t.hand.length;h++)t.hand[h]&&u.push({type:"discardAndDraw",payload:{handIndex:h}});return u},applyAction:(t,u)=>{var p,h,s;const r=t.grid.length,x=((p=t.grid[0])==null?void 0:p.length)??0,y=[];for(const d of t.grid)y.push(d?d.map(g=>g?{...g}:null):[]);const w={...t,grid:y,hand:t.hand.map(d=>d?{...d}:null).filter(Boolean),drawPile:t.drawPile.map(d=>({...d})),discardPile:t.discardPile.map(d=>({...d}))};if(u.type==="discardAndDraw"){const{handIndex:d}=u.payload;if(d<0||d>=t.hand.length||!t.hand[d]||t.drawPile.length===0)return console.warn("Invalid discard action:",u,t.hand,t.drawPile.length),t;const g={...w,moves:t.moves+1},o=g.hand.splice(d,1)[0];if(o)g.discardPile.push(o);else return console.warn("Discard failed: splice returned nothing at index",d),t;const c=g.drawPile.pop();return c&&g.hand.splice(d,0,c),g}if(u.type==="revealAdjacent"){const{handIndex:d,sourceRow:g,sourceCol:o,targetRow:c,targetCol:m}=u.payload;if(d<0||d>=t.hand.length||!t.hand[d])return console.warn("Invalid reveal action: bad hand index",u,t.hand),t;if(!Vl(g,o,r,x)||!Vl(c,m,r,x))return console.warn("Invalid reveal action: out of bounds",u),t;const v=t.hand[d],b=(h=t.grid[g])==null?void 0:h[o],D=(s=t.grid[c])==null?void 0:s[m];if(!b||!b.faceUp||!D||D.faceUp)return console.warn("Invalid reveal action: card state invalid",u,b,D),t;if(!(v.suit===b.suit||v.rank===b.rank))return console.warn("Invalid reveal action: hand/source mismatch",u,v,b),t;const M=Math.abs(g-c),E=Math.abs(o-m);if(M+E!==1)return console.warn("Invalid reveal action: not adjacent",u),t;const T={...w,moves:t.moves+1},R=T.grid[c][m];if(R)T.grid[c][m]={...R,faceUp:!0};else return console.warn("Target card unexpectedly null in newState",c,m),t;const I=T.hand.splice(d,1)[0];if(I)T.discardPile.push(I);else return console.warn("Reveal discard failed: splice returned nothing at index",d),t;if(T.drawPile.length>0){const L=T.drawPile.pop();L&&T.hand.splice(d,0,L)}return T}return console.warn(`DEBUG applyAction: Unknown action type received: ${(u==null?void 0:u.type)??"undefined"}`),t},checkGameEnd:t=>{var y;if(t.grid.length,(y=t.grid[0])==null||y.length,[t.grid[0][0],t.grid[0][Ee-1],t.grid[De-1][0],t.grid[De-1][Ee-1]].filter(w=>w&&w.rank==="A"&&w.faceUp).length===4)return{status:"WIN",reason:"Found the 4 corner Aces!"};if(t.drawPile.length===0)return{status:"LOSE",reason:"Draw pile is empty."};if(pl.getAvailableActions(t).length===0){const w=Wr(t),p=t.hand.length>0&&t.drawPile.length>0;if(!w&&!p){let h="No valid moves left.";return t.hand.length===0&&t.drawPile.length===0&&(h="Hand and draw pile are both empty."),{status:"LOSE",reason:h}}}return{status:"ONGOING"}}};function Vl(t,u,r,x){return t>=0&&t<r&&u>=0&&u<x}function Wr(t){var x,y,w;const u=t.grid.length,r=((x=t.grid[0])==null?void 0:x.length)??0;if(t.hand.length===0||t.hand.every(p=>!p))return!1;for(let p=0;p<t.hand.length;p++){const h=t.hand[p];if(h)for(let s=0;s<u;s++)for(let d=0;d<r;d++){const g=(y=t.grid[s])==null?void 0:y[d];if(g&&g.faceUp&&(h.suit===g.suit||h.rank===g.rank)){const o=[[s-1,d],[s+1,d],[s,d-1],[s,d+1]];for(const[c,m]of o)if(Vl(c,m,u,r)){const v=(w=t.grid[c])==null?void 0:w[m];if(v&&!v.faceUp)return!0}}}}return!1}let z=null,q=null,A=null,Wl="ONGOING",gl=null,le=!1,K=1,Gt=null,Fe=null,ce=new Set,Ce=[],ue=[];const Ke=5,Ve=10,ze=12,We=18,be={x:70,y:130},qt=Ke,an=Ve+5*We+9,Yr=qt,Qr=an-5,cn=an,Jt=be.x-5,Kt=be.y-5,nn=6,Xt=6;let ve="NeedsInit";function Ye(t){return t==="A"?1:t==="K"?13:t==="Q"?12:t==="J"?11:parseInt(t,10)}function ml(t){return t.toLowerCase()}function sn(t){var r;if(!z||!t)return!1;const u=(r=z.grid[t.r])==null?void 0:r[t.c];if(!u||!u.faceUp)return!1;for(const x of z.hand)if(x&&(x.suit===u.suit||x.rank===u.rank))return!0;return!1}function Zr(t,u,r){if(!r)return;if(t==="OFF"){r.hide();return}const x=5,y=u.has(t);if(y&&t!==6){r.hide();return}else y||u.add(t);if(r.show(),t===1){r.setText("Click a face-up card.");const w=Ve+2*We,p=Ke+2.5*ze-r.size.x/2,h=w-r.size.y-x+1;r.pos.set(p,h),r.setTail("center","down")}else if(t===2){r.setText("OK! Now click a Hand card (match suit or rank).");const w=cn,p=qt+5,h=w-r.size.y-x+3;r.pos.set(p,h),r.setTail("left","none")}else if(t===3){r.setText("No match? Click the trash icon, then a hand card to discard.");const w=Jt-r.size.x*.9,p=Kt-r.size.y-x-Xt/2-5;r.pos.set(w,p),r.setTail("right","down")}else if(t===4){r.setText("Good! Click a face-down card next to a Selected card.");const w=Ve+3*We;let p=Ke+2.5*ze-r.size.x/2,h=w+x;p=clamp(p,0,be.x-r.size.x),r.setTail("center","none"),r.pos.set(p,h)}else if(t===5){r.setText("10, J, Q, K are special! Need matching rank (J for J, etc.) to reveal from here.");const w=Ke+2.5*ze-r.size.x/2,p=Ve;r.pos.set(clamp(w,0,be.x-r.size.x),p),r.setTail("center","none")}else if(t===6){r.setText("Goal: Reveal 4 corner Aces (A)! Lose if draw pile empty!");const w=Ke+2.5*ze-r.size.x/2,p=Ve;r.pos.set(clamp(w,0,be.x-r.size.x),p),r.setTail("center","none")}else r.hide()}function pe(t,u,r){if(t==="OFF")return"OFF";switch(u){case"sourceClicked":if(r.selectedSourceCell){if(r.selectedHandIndex===null&&(t===1||t===2||t===3))return r.canSelectHand?2:3}else return 1;break;case"targetClicked":break;case"handClicked":if(r.selectedHandIndex!==null&&r.selectedSourceCell!==null)return 4;if(r.selectedHandIndex!==null&&r.selectedSourceCell===null)return 1;if(r.selectedHandIndex===null)return 1;break;case"backgroundClicked":if(!r.isDiscardModeActive)return q=null,A=null,1;break;case"discardTriggered":break;case"discardActionTaken":return 1;case"revealActionTaken":if(r.revealedCardRank){const x=Se.includes(r.revealedCardRank),y=r.shownSteps.has(5),w=r.shownSteps.has(6);return x&&!y?5:w?1:6}else return 1;case"gameOver":return"OFF";case"invalidAction":if(t===4)return 4;if(t===2||t===3)return t;if(t===1)return 1;break}return t}function rn(t,u,r,x){t!==u&&r&&(Zr(t,x,r),Gt=t)}function Ql(t){const u=qt+t*ze+ze/2,r=cn+We/2;return vec(u,r)}function eo(t){Ce=[];for(let u=0;u<t.grid.length;u++){Ce[u]=[];for(let r=0;r<t.grid[u].length;r++){const x=t.grid[u][r];if(x){const y=Ke+r*ze+ze/2,w=Ve+u*We+We/2,p=new Yl;p.pos=vec(y,w),p.rank=Ye(x.rank),p.suit=ml(x.suit),p.isFaceUp=x.faceUp,Ce[u][r]=p}else Ce[u][r]=null}}ue=Array(t.hand.length).fill(null),t.hand.forEach((u,r)=>{const x=Ql(r),y=new Yl;y.pos=x,y.rank=Ye(u.rank),y.suit=ml(u.suit),y.isFaceUp=!0,ue[r]=y})}function lo(){console.log("DEBUG: Initializing session..."),playBgm(),Fe||(Fe=new kr(0,0,60,20,"",{align:"center",direction:"down"})),console.log("DEBUG: Session initialization complete.")}function to(){return console.log("DEBUG: Starting new game..."),z=pl.setupGame(),eo(z),q=null,A=null,le=!1,Wl="ONGOING",gl=null,z?(console.log("DEBUG: New game start complete."),!0):(console.error("CRITICAL: Failed to initialize gameState after setupGame() call!"),!1)}function io(){var w,p,h,s,d,g,o;if(!z)return!1;const t=input.pos;let u=!1,r=!1,x=!1;const y={x:Jt-nn/2,y:Kt-Xt/2,width:nn,height:Xt};if(t.isInRect(y.x,y.y,y.width,y.height)&&(play("tap"),le=!le,le&&(A=null),u=!0,K=pe(K,"discardTriggered",{selectedSourceCell:A,selectedHandIndex:q,isDiscardModeActive:le,shownSteps:ce})),!r&&!u)for(let c=0;c<5&&!u&&!r;c++){for(let m=0;m<5&&!u&&!r;m++){const v=(w=Ce[c])==null?void 0:w[m];if(v&&v.containsPoint(t)){u=!0;const b=(p=z.grid[c])==null?void 0:p[m];if(le){le=!1,K=pe(K,"backgroundClicked",{selectedSourceCell:A,selectedHandIndex:q,isDiscardModeActive:le,shownSteps:ce});break}if(b&&q!==null&&A!==null){if(b.faceUp){const D=A.r===c&&A.c===m;if(play("tap"),D)console.log("Clicked selected source again -> Deselecting source ONLY."),A=null,K=pe(K,"sourceClicked",{selectedSourceCell:A,selectedHandIndex:q,isDiscardModeActive:le,shownSteps:ce,canSelectHand:!1});else{console.log("Clicked different face-up card -> New source selection."),A={r:c,c:m};const M=sn(A);K=pe(K,"sourceClicked",{selectedSourceCell:A,selectedHandIndex:q,isDiscardModeActive:le,shownSteps:ce,canSelectHand:M});const E=z.hand[q],T=(h=z.grid[c])==null?void 0:h[m];let R=!1;E&&T&&(Se.includes(T.rank)?E.rank===T.rank&&(R=!0):(E.suit===T.suit||E.rank===T.rank)&&(R=!0)),R?K=4:K=M?2:3}}else if(v&&!v.isFlipping&&!v.isMoving){const D=Math.abs(A.r-c),M=Math.abs(A.c-m);let E=!1,T,R;if(D+M===1&&(T=z.hand[q],R=(s=z.grid[A.r])==null?void 0:s[A.c],R&&T&&(Se.includes(R.rank)?T.rank===R.rank&&(E=!0):(T.suit===R.suit||T.rank===R.rank)&&(E=!0))),E&&T&&R){const I={type:"revealAdjacent",payload:{handIndex:q,sourceRow:A.r,sourceCol:A.c,targetRow:c,targetCol:m}},L=q,V=(d=Ce[c])==null?void 0:d[m];if(V){V.startFlipAnimation(!0);const J=z.drawPile.length===0;z=pl.applyAction(z,I);const N=(g=z.grid[c])==null?void 0:g[m];if(play((N==null?void 0:N.rank)==="A"?"coin":"flip"),K=pe(K,"revealActionTaken",{selectedSourceCell:null,selectedHandIndex:null,isDiscardModeActive:le,shownSteps:ce,revealedCardRank:N==null?void 0:N.rank}),J)ue[L]=null;else{const H=z.hand[L],W=Ql(L),j=vec(W.x,be.y+30),B=new Yl;B.pos=j,B.rank=Ye(H.rank),B.suit=ml(H.suit),B.isFaceUp=!0,B.startMoveAnimation(W),ue[L]=B}q=null,A=null,r=!0}else console.error(`Target CardView missing at [${c}, ${m}]`),play("buzz"),x=!0}else play("buzz"),x=!0}}else b&&b.faceUp?(play("tap"),A=(A==null?void 0:A.r)===c&&(A==null?void 0:A.c)===m?null:{r:c,c:m},K=pe(K,"sourceClicked",{selectedSourceCell:A,selectedHandIndex:q,isDiscardModeActive:le,shownSteps:ce,canSelectHand:A?sn(A):!1})):b&&!b.faceUp&&(play("buzz"),x=!0)}}if(u)break}if(!r&&!u)if(le)for(let c=0;c<ue.length;c++){const m=ue[c];if(m&&!m.isMoving&&m.containsPoint(t)){if(u=!0,z.drawPile.length>0){const v=c,b={type:"discardAndDraw",payload:{handIndex:v}},D=ue[c];if(D&&!D.isMoving){z=pl.applyAction(z,b);const M=z.hand[v];if(M){const E=Ql(v),T=vec(E.x,be.y+30),R=new Yl;R.pos=T,R.rank=Ye(M.rank),R.suit=ml(M.suit),R.isFaceUp=!0,R.startMoveAnimation(E),ue[c]=R}else ue[c]=null;play("flip"),q=null,A=null,r=!0,le=!1,K=pe(K,"discardActionTaken",{selectedSourceCell:A,selectedHandIndex:q,isDiscardModeActive:le,shownSteps:ce})}}else play("buzz"),x=!0;break}}else for(let c=0;c<ue.length;c++){const m=ue[c];if(m&&!m.isMoving&&m.containsPoint(t)){if(u=!0,play("tap"),q=q===c?null:c,K=pe(K,"handClicked",{selectedSourceCell:A,selectedHandIndex:q,isDiscardModeActive:le,shownSteps:ce}),q!==null&&A!==null){const v=z.hand[q],b=(o=z.grid[A.r])==null?void 0:o[A.c];let D=!1;v&&b&&(Se.includes(b.rank)?v.rank===b.rank&&(D=!0):(v.suit===b.suit||v.rank===b.rank)&&(D=!0)),D?K=4:(play("buzz"),x=!0)}break}}if(!r&&!u){const c=le;le&&(le=!1),c||(q=null,A=null),K=pe(K,"backgroundClicked",{selectedSourceCell:c?A:null,selectedHandIndex:c?q:null,isDiscardModeActive:c,shownSteps:ce})}return x&&(K=pe(K,"invalidAction",{selectedSourceCell:A,selectedHandIndex:q,isDiscardModeActive:le,shownSteps:ce})),r}function on(){var t,u,r,x,y,w,p;if(z){if(Ce.length>0){let h=0;for(let b=0;b<z.grid.length;b++)for(let D=0;D<z.grid[b].length;D++)(u=(t=z.grid[b])==null?void 0:t[D])!=null&&u.faceUp&&h++;const s=h<3;for(let b=0;b<Ce.length;b++)for(let D=0;D<Ce[b].length;D++){const M=(r=Ce[b])==null?void 0:r[D];if(M){M.isSelected=A!==null&&A.r===b&&A.c===D,M.isHighlighted=!1;const E=(x=z.grid[b])==null?void 0:x[D];if(s&&E&&q!==null&&A!==null&&!E.faceUp&&!M.isFlipping&&!M.isMoving){const T=Math.abs(A.r-b),R=Math.abs(A.c-D);if(T+R===1){const I=z.hand[q],L=(y=z.grid[A.r])==null?void 0:y[A.c];if(L&&I){const V=Se.includes(L.rank);let J=!1;V?I.rank===L.rank&&(J=!0):(I.suit===L.suit||I.rank===L.rank)&&(J=!0),J&&(M.isHighlighted=!0)}}}else if(s&&E&&q!==null&&A===null&&E.faceUp&&!M.isFlipping&&!M.isMoving){const T=z.hand[q];if(T){const R=Se.includes(E.rank);let I=!1;R?T.rank===E.rank&&(I=!0):(T.suit===E.suit||T.rank===E.rank)&&(I=!0),I&&(M.isHighlighted=!0)}}M.draw()}}color("black"),text(`Draw: ${z.drawPile.length}`,Yr,Qr,{isSmallText:!0}),ue.forEach((b,D)=>{var M;if(b){const E=Ql(D);if(b.isMoving||b.pos.set(E),b.isSelected=q===D,b.isHighlighted=!1,!b.isMoving&&s){if(le)b.isHighlighted=!0;else if(q===null&&A!==null){const T=(M=z==null?void 0:z.grid[A.r])==null?void 0:M[A.c];if(T){const R=Se.includes(T.rank);let I=!1;R?Ye(T.rank)===b.rank&&(I=!0):(ml(T.suit)===b.suit||Ye(T.rank)===b.rank)&&(I=!0),I&&(b.isHighlighted=!0)}}}b.draw()}}),color(le?"cyan":"black"),char("g",Jt,Kt);let d=0;const g=z.grid.length,o=((w=z.grid[0])==null?void 0:w.length)??0,c=[{r:0,c:0},{r:0,c:o-1},{r:g-1,c:0},{r:g-1,c:o-1}];for(const b of c){const D=(p=z.grid[b.r])==null?void 0:p[b.c];D&&D.faceUp&&D.rank==="A"&&d++}const m=`ACES: ${d} / 4`,v=m.length*4;text(m,be.x-2-v,5,{isSmallText:!0,color:"black",backgroundColor:"white"})}Fe&&Fe.draw()}}function no(){if(color("black"),char("k",40,50),ticks||lo(),ve==="NeedsInit"){if(ve="Initializing",!to()){color("red"),text("Error initializing game!",5,50),ve="NeedsInit";return}if(!z){console.error("CRITICAL: gameState is null after successful startNewGame call!"),ve="NeedsInit";return}ve="Ongoing",rn(K,Gt,Fe,ce)}if(!z){console.error("CRITICAL: gameState became null unexpectedly!"),ve="NeedsInit";return}if(rn(K,Gt,Fe,ce),ve==="Ongoing"){if(input.isJustPressed?io():!1){const u=pl.checkGameEnd(z);u.status!=="ONGOING"&&(ve="GameOver",Wl=u.status,gl=u.reason??null,K=pe(K,"gameOver",{selectedSourceCell:A,selectedHandIndex:q,isDiscardModeActive:le,shownSteps:ce}),Fe&&Fe.hide())}on()}else if(ve==="GameOver"){input.isJustPressed&&(console.log("Retry triggered! Setting lifecycle to NeedsInit."),ve="NeedsInit"),on();const t=Wl==="WIN"?"ALL REVEALED":"GAME OVER",u=t.length*4,r=be.x/2;if(text(t,r-u/2,60,{isSmallText:!0,color:"black",backgroundColor:"white"}),Wl==="LOSE"&&gl){const x=gl.length*4;text(gl,r-x/2,75,{isSmallText:!0,color:"black",backgroundColor:"white"})}text("Click to Retry",r-14*4/2,90,{isSmallText:!0,color:"black",backgroundColor:"white"})}}const so=["background.png"];init({update:no,characters:br.concat(so),options:{isSoundEnabled:!1,isShowingScore:!1,viewSize:be,colorPalette:[[200,172,136],[231,208,172],[119,98,80],[122,89,62],[48,39,41],[42,37,41],[89,66,67],[42,39,43],[42,39,45],[231,104,86],[251,208,86],[131,208,172]],audioTempo:120},audioFiles:{bgm:"bgm.mp3",flip:"flip.mp3",tap:"tap.mp3",coin:"coin.mp3",buzz:"buzz.mp3"}});
