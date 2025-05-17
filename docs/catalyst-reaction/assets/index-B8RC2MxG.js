var Xs=Object.defineProperty;var Ws=(i,r,a)=>r in i?Xs(i,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):i[r]=a;var O=(i,r,a)=>Ws(i,typeof r!="symbol"?r+"":r,a);(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))c(d);new MutationObserver(d=>{for(const f of d)if(f.type==="childList")for(const y of f.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&c(y)}).observe(document,{childList:!0,subtree:!0});function a(d){const f={};return d.integrity&&(f.integrity=d.integrity),d.referrerPolicy&&(f.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?f.credentials="include":d.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function c(d){if(d.ep)return;d.ep=!0;const f=a(d);fetch(d.href,f)}})();var Oi={},Fi;function Ys(){return Fi||(Fi=1,function(i){function r(e,l=0,t=1){return Math.max(l,Math.min(e,t))}function a(e,l,t){const n=t-l,s=e-l;if(s>=0)return s%n+l;{let o=n+s%n+l;return o>=t&&(o-=n),o}}function c(e,l,t){return l<=e&&e<t}function d(e){return[...Array(e).keys()]}function f(e,l){return d(e).map(t=>l(t))}function y(e,l){let t=[];for(let n=0,s=0;n<e.length;s++)l(e[n],s)?(t.push(e[n]),e.splice(n,1)):n++;return t}function S(e){return[...e].reduce((l,[t,n])=>(l[t]=n,l),{})}function b(e){return Object.keys(e).map(l=>[l,e[l]])}function A(e,l){return String.fromCharCode(e.charCodeAt(0)+l)}function I(e){return e.x!=null&&e.y!=null}class m{constructor(l,t){this.x=0,this.y=0,this.set(l,t)}set(l=0,t=0){return I(l)?(this.x=l.x,this.y=l.y,this):(this.x=l,this.y=t,this)}add(l,t){return I(l)?(this.x+=l.x,this.y+=l.y,this):(this.x+=l,this.y+=t,this)}sub(l,t){return I(l)?(this.x-=l.x,this.y-=l.y,this):(this.x-=l,this.y-=t,this)}mul(l){return this.x*=l,this.y*=l,this}div(l){return this.x/=l,this.y/=l,this}clamp(l,t,n,s){return this.x=r(this.x,l,t),this.y=r(this.y,n,s),this}wrap(l,t,n,s){return this.x=a(this.x,l,t),this.y=a(this.y,n,s),this}addWithAngle(l,t){return this.x+=Math.cos(l)*t,this.y+=Math.sin(l)*t,this}swapXy(){const l=this.x;return this.x=this.y,this.y=l,this}normalize(){return this.div(this.length),this}rotate(l){if(l===0)return this;const t=this.x;return this.x=t*Math.cos(l)-this.y*Math.sin(l),this.y=t*Math.sin(l)+this.y*Math.cos(l),this}angleTo(l,t){return I(l)?Math.atan2(l.y-this.y,l.x-this.x):Math.atan2(t-this.y,l-this.x)}distanceTo(l,t){let n,s;return I(l)?(n=l.x-this.x,s=l.y-this.y):(n=l-this.x,s=t-this.y),Math.sqrt(n*n+s*s)}isInRect(l,t,n,s){return c(this.x,l,l+n)&&c(this.y,t,t+s)}equals(l){return this.x===l.x&&this.y===l.y}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}get length(){return Math.sqrt(this.x*this.x+this.y*this.y)}get angle(){return Math.atan2(this.y,this.x)}}const P=["transparent","white","red","green","yellow","blue","purple","cyan","black","light_red","light_green","light_yellow","light_blue","light_purple","light_cyan","light_black"],L="twrgybpclRGYBPCL";let j,ne;const he=[15658734,15277667,5025616,16761095,4149685,10233776,240116,6381921];function pe(e,l){const[t,n,s]=zl(0,e);if(j=S(P.map((o,u)=>{if(u<1)return[o,{r:0,g:0,b:0,a:0}];if(u<9){const[v,x,C]=zl(u-1,e);return[o,{r:v,g:x,b:C,a:1}]}const[g,p,w]=zl(u-9+1,e);return[o,{r:Math.floor(e?g*.5:t-(t-g)*.5),g:Math.floor(e?p*.5:s-(s-p)*.5),b:Math.floor(e?w*.5:n-(n-w)*.5),a:1}]})),e){const o=j.blue;j.white={r:Math.floor(o.r*.15),g:Math.floor(o.g*.15),b:Math.floor(o.b*.15),a:1}}l!=null&&je(l)}function je(e){ne=e.map(l=>({r:l[0],g:l[1],b:l[2],a:1}));for(let l=0;l<P.length;l++){let t=1/0,n=-1;for(let s=0;s<ne.length;s++){const o=Li(ne[s],j[P[l]]);o<t&&(t=o,n=s)}j[P[l]]=ne[n]}}function Li(e,l){const t={r:.299,g:.587,b:.114},n=e.r-l.r,s=e.g-l.g,o=e.b-l.b,u=l.r===l.g&&l.g===l.b;let g=Math.sqrt(n*n*t.r+s*s*t.g+o*o*t.b);return u&&!(l.r===0&&l.g===0&&l.b===0)&&(g*=1.5),g}function zl(e,l){l&&(e===0?e=7:e===7&&(e=0));const t=he[e];return[(t&16711680)>>16,(t&65280)>>8,t&255]}function ke(e,l=1){const t=typeof e=="number"?ne[e]:j[e];return Math.floor(t.r*l)<<16|Math.floor(t.g*l)<<8|Math.floor(t.b*l)}function Pe(e,l=1){const t=typeof e=="number"?ne[e]:j[e],n=Math.floor(t.r*l),s=Math.floor(t.g*l),o=Math.floor(t.b*l);return t.a<1?`rgba(${n},${s},${o},${t.a})`:`rgb(${n},${s},${o})`}const Ui=`
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
`;function ji(e,l){return new PIXI.Filter(void 0,Ui,{width:e,height:l})}const B=new m;let N,se,R,$=new m;const Ft=5;document.createElement("img");let z,Be,Ne=1,Ll="black",J,It,Me=!1,F,Rt;function Bi(e,l,t,n,s,o,u,g){B.set(e),F=g,Ll=t;const p=`
-webkit-touch-callout: none;
-webkit-tap-highlight-color: ${l};
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
background: ${l};
color: #888;
`,w=`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
`,v=`
image-rendering: -moz-crisp-edges;
image-rendering: -webkit-optimize-contrast;
image-rendering: -o-crisp-edges;
image-rendering: pixelated;
`;if(document.body.style.cssText=p,$.set(B),F.isUsingPixi){$.mul(Ft);const C=new PIXI.Application({width:$.x,height:$.y});if(N=C.view,R=new PIXI.Graphics,R.scale.x=R.scale.y=Ft,PIXI.settings.SCALE_MODE=PIXI.SCALE_MODES.NEAREST,C.stage.addChild(R),R.filters=[],F.name==="crt"&&R.filters.push(Rt=new PIXI.filters.CRTFilter({vignettingAlpha:.7})),F.name==="pixel"&&R.filters.push(ji($.x,$.y)),F.name==="pixel"||F.name==="shapeDark"){const M=new PIXI.filters.AdvancedBloomFilter({threshold:.1,bloomScale:F.name==="pixel"?1.5:1,brightness:F.name==="pixel"?1.5:1,blur:8});R.filters.push(M)}R.lineStyle(0),N.style.cssText=w}else N=document.createElement("canvas"),N.width=$.x,N.height=$.y,se=N.getContext("2d"),se.imageSmoothingEnabled=!1,N.style.cssText=w+v;document.body.appendChild(N);const x=()=>{const M=innerWidth/innerHeight,T=$.x/$.y,E=M<T,_=E?.95*innerWidth:.95*innerHeight*T,U=E?.95*innerWidth/T:.95*innerHeight;N.style.width=`${_}px`,N.style.height=`${U}px`};if(window.addEventListener("resize",x),x(),n){z=document.createElement("canvas");let C;s?(z.width=$.x,z.height=$.y,C=o):($.x<=$.y*2?(z.width=$.y*2,z.height=$.y):(z.width=$.x,z.height=$.x/2),z.width>400&&(Ne=400/z.width,z.width=400,z.height*=Ne),C=Math.round(400/z.width)),Be=z.getContext("2d"),Be.fillStyle=l,gcc.setOptions({scale:C,capturingFps:60,isSmoothingEnabled:!1,durationSec:u})}}function rl(){if(F.isUsingPixi){R.clear(),R.beginFill(ke(Ll,F.isDarkColor?.15:1)),R.drawRect(0,0,B.x,B.y),R.endFill(),R.beginFill(ke(J)),Me=!0;return}se.fillStyle=Pe(Ll,F.isDarkColor?.15:1),se.fillRect(0,0,B.x,B.y),se.fillStyle=Pe(J)}function ee(e){if(e===J){F.isUsingPixi&&!Me&&ol(ke(J));return}if(J=e,F.isUsingPixi){Me&&R.endFill(),ol(ke(J));return}se.fillStyle=Pe(e)}function ol(e){al(),R.beginFill(e),Me=!0}function al(){Me&&(R.endFill(),Me=!1)}function cl(){It=J}function dl(){ee(It)}function Oe(e,l,t,n){if(F.isUsingPixi){F.name==="shape"||F.name==="shapeDark"?R.drawRoundedRect(e,l,t,n,2):R.drawRect(e,l,t,n);return}se.fillRect(e,l,t,n)}function Ni(e,l,t,n,s){const o=ke(J);ol(o),R.drawCircle(e,l,s*.5),R.drawCircle(t,n,s*.5),al(),R.lineStyle(s,o),R.moveTo(e,l),R.lineTo(t,n),R.lineStyle(0)}function $i(){Rt.time+=.2}function _i(){if(Be.fillRect(0,0,z.width,z.height),Ne===1)Be.drawImage(N,(z.width-N.width)/2,(z.height-N.height)/2);else{const e=N.width*Ne,l=N.height*Ne;Be.drawImage(N,(z.width-e)/2,(z.height-l)/2,e,l)}gcc.capture(z)}const Tt=[`
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

`],Gi=[`
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

`];let Fe,ul;function Hi(){Fe=[],ul=[]}function Et(){Fe=Fe.concat(ul),ul=[]}function At(e){let l={isColliding:{rect:{},text:{},char:{}}};return Fe.forEach(t=>{Ji(e,t)&&(l=Object.assign(Object.assign(Object.assign({},l),Ul(t.collision.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},l.isColliding.rect),t.collision.isColliding.rect),text:Object.assign(Object.assign({},l.isColliding.text),t.collision.isColliding.text),char:Object.assign(Object.assign({},l.isColliding.char),t.collision.isColliding.char)}}))}),l}function Ji(e,l){const t=l.pos.x-e.pos.x,n=l.pos.y-e.pos.y;return-l.size.x<t&&t<e.size.x&&-l.size.y<n&&n<e.size.y}function Ul(e){if(e==null)return{};const l={transparent:"tr",white:"wh",red:"rd",green:"gr",yellow:"yl",blue:"bl",purple:"pr",cyan:"cy",black:"lc"};let t={};return b(e).forEach(([n,s])=>{const o=l[n];s&&o!=null&&(t[o]=!0)}),t}function Dt(e,l,t,n){return zt(!1,e,l,t,n)}function Ki(e,l,t,n){return zt(!0,e,l,t,n)}function zt(e,l,t,n,s){if(typeof t=="number"){if(typeof n=="number")return re(l,t,n,Object.assign({isCharacter:e,isCheckingCollision:!0,color:J},s));throw"invalid params"}else return re(l,t.x,t.y,Object.assign({isCharacter:e,isCheckingCollision:!0,color:J},n))}const $e=6,Vi=4,le=1,D=$e*le,Ie=Vi*le;let jl,Bl,fl,Nl,$l=!1,Re,_l,_e,hl;const Gl={color:"black",backgroundColor:"transparent",rotation:0,mirror:{x:1,y:1},scale:{x:1,y:1},isSmallText:!1,edgeColor:void 0,isCharacter:!1,isCheckingCollision:!1};function Xi(){Re=document.createElement("canvas"),Re.width=Re.height=D,_l=Re.getContext("2d"),_e=document.createElement("canvas"),hl=_e.getContext("2d"),jl=Tt.map((e,l)=>gl(e,String.fromCharCode(33+l),!1)),Bl=Gi.map((e,l)=>gl(e,String.fromCharCode(33+l),!1)),fl=Tt.map((e,l)=>gl(e,String.fromCharCode(33+l),!0)),Nl={}}function Wi(e,l){const t=l.charCodeAt(0)-33;e.forEach((n,s)=>{fl[t+s]=gl(n,String.fromCharCode(33+t+s),!0)})}function Yi(){$l=!0}function re(e,l,t,n={}){const s=jt(n);let o=e,u=l,g=t,p,w={isColliding:{rect:{},text:{},char:{}}};const v=s.isSmallText?Ie:D;for(let x=0;x<o.length;x++){if(x===0){const T=o.charCodeAt(0);if(T<33||T>126)u=Math.floor(u-D/2*s.scale.x),g=Math.floor(g-D/2*s.scale.y);else{const E=T-33,_=s.isCharacter?fl[E]:s.isSmallText?Bl[E]:jl[E];u=Math.floor(u-_.size.x/2*s.scale.x),g=Math.floor(g-_.size.y/2*s.scale.y)}p=u}const C=o[x];if(C===`
`){u=p,g+=D*s.scale.y;continue}const M=qi(C,u,g,s);s.isCheckingCollision&&(w={isColliding:{rect:Object.assign(Object.assign({},w.isColliding.rect),M.isColliding.rect),text:Object.assign(Object.assign({},w.isColliding.text),M.isColliding.text),char:Object.assign(Object.assign({},w.isColliding.char),M.isColliding.char)}}),u+=v*s.scale.x}return w}function qi(e,l,t,n){const s=e.charCodeAt(0);if(s<32||s>126)return{isColliding:{rect:{},text:{},char:{}}};const o=jt(n);if(o.backgroundColor!=="transparent"){const U=o.isSmallText?Ie:D,Rl=o.isSmallText?2:1;cl(),ee(o.backgroundColor),Oe(l+Rl,t,U*o.scale.x,D*o.scale.y),dl()}if(s<=32)return{isColliding:{rect:{},text:{},char:{}}};const u=s-33,g=o.isCharacter?fl[u]:o.isSmallText?Bl[u]:jl[u],p=a(o.rotation,0,4);if(o.color==="black"&&p===0&&o.mirror.x===1&&o.mirror.y===1&&o.edgeColor==null&&(!F.isUsingPixi||o.scale.x===1&&o.scale.y===1))return Hl(g,l,t,o.scale,o.isCheckingCollision,!0);const w=JSON.stringify({c:e,options:o}),v=Nl[w];if(v!=null)return Hl(v,l,t,o.scale,o.isCheckingCollision,o.color!=="transparent");let x=!1;const C=new m(D,D);let M=Re,T=_l;if(g.size.x>D||g.size.y>D){if(p===0||p===2)C.set(g.size.x,g.size.y);else{const U=Math.max(g.size.x,g.size.y);C.set(U,U)}M=document.createElement("canvas"),M.width=C.x,M.height=C.y,T=M.getContext("2d"),T.imageSmoothingEnabled=!1}F.isUsingPixi&&(o.scale.x!==1||o.scale.y!==1)&&(_e.width=C.x*o.scale.x,_e.height=C.y*o.scale.y,hl.imageSmoothingEnabled=!1,hl.scale(o.scale.x,o.scale.y),Lt(hl,p,o,g.image,C),x=!0),T.clearRect(0,0,C.x,C.y),Lt(T,p,o,g.image,C);const E=Jl(T,C,e,o.isCharacter);o.edgeColor!=null&&(M=Qi(T,C,o.edgeColor),C.x+=2,C.y+=2);let _;if($l||F.isUsingPixi){const U=document.createElement("img");if(U.src=M.toDataURL(),F.isUsingPixi){const Rl=document.createElement("img");Rl.src=(x?_e:M).toDataURL(),_=PIXI.Texture.from(Rl)}$l&&(Nl[w]={image:U,texture:_,hitBox:E,size:C})}return Hl({image:M,texture:_,hitBox:E,size:C},l,t,o.scale,o.isCheckingCollision,o.color!=="transparent")}function Qi(e,l,t){const n=l.x+2,s=l.y+2,o=[[0,-1],[1,0],[0,1],[-1,0]],u=document.createElement("canvas");u.width=n,u.height=s;const g=u.getContext("2d");g.imageSmoothingEnabled=!1,g.drawImage(e.canvas,1,1);const w=g.getImageData(0,0,n,s).data;g.fillStyle=Pe(t);for(let v=0;v<s;v++)for(let x=0;x<n;x++){const C=(v*n+x)*4;if(w[C+3]===0)for(const[M,T]of o){const E=x+M,_=v+T;if(E>=0&&E<n&&_>=0&&_<s){const U=(_*n+E)*4;if(w[U+3]>0){g.fillRect(x,v,1,1);break}}}}return u}function Lt(e,l,t,n,s){l===0&&t.mirror.x===1&&t.mirror.y===1?e.drawImage(n,0,0):(e.save(),e.translate(s.x/2,s.y/2),e.rotate(Math.PI/2*l),(t.mirror.x===-1||t.mirror.y===-1)&&e.scale(t.mirror.x,t.mirror.y),e.drawImage(n,-s.x/2,-s.y/2),e.restore()),t.color!=="black"&&(e.globalCompositeOperation="source-in",e.fillStyle=Pe(t.color==="transparent"?"black":t.color),e.fillRect(0,0,s.x,s.y),e.globalCompositeOperation="source-over")}function Hl(e,l,t,n,s,o){if(o&&(n.x===1&&n.y===1?Ut(e,l,t):Ut(e,l,t,e.size.x*n.x,e.size.y*n.y)),!s)return;const u={pos:{x:l+e.hitBox.pos.x*n.x,y:t+e.hitBox.pos.y*n.y},size:{x:e.hitBox.size.x*n.x,y:e.hitBox.size.y*n.y},collision:e.hitBox.collision},g=At(u);return o&&Fe.push(u),g}function Ut(e,l,t,n,s){if(F.isUsingPixi){al(),R.beginTextureFill({texture:e.texture,matrix:new PIXI.Matrix().translate(l,t)}),R.drawRect(l,t,n??e.size.x,s??e.size.y),ol(ke(J));return}n==null?se.drawImage(e.image,l,t):se.drawImage(e.image,l,t,n,s)}function gl(e,l,t){if(e.indexOf(".")>=0||e.indexOf("data:image/")==0)return Zi(e,l);let n=e.split(`
`);n=n.slice(1,n.length-1);let s=0;n.forEach(M=>{s=Math.max(M.length,s)});const o=Math.max(Math.ceil(($e-s)/2),0),u=n.length,g=Math.max(Math.ceil(($e-u)/2),0),p=new m(Math.max($e,s)*le,Math.max($e,u)*le);let w=Re,v=_l;(p.x>D||p.y>D)&&(w=document.createElement("canvas"),w.width=p.x,w.height=p.y,v=w.getContext("2d"),v.imageSmoothingEnabled=!1),v.clearRect(0,0,p.x,p.y),n.forEach((M,T)=>{for(let E=0;E<s;E++){const _=M.charAt(E);let U=L.indexOf(_);_!==""&&U>=1&&(v.fillStyle=Pe(P[U]),v.fillRect((E+o)*le,(T+g)*le,le,le))}});const x=document.createElement("img");x.src=w.toDataURL();const C=Jl(v,p,l,t);return F.isUsingPixi?{image:x,texture:PIXI.Texture.from(x),size:p,hitBox:C}:{image:x,size:p,hitBox:C}}function Zi(e,l){const t=document.createElement("img");t.src=e;const n=new m,s={pos:new m,size:new m,collision:{isColliding:{char:{},text:{}}}};let o;return F.isUsingPixi?o={image:t,texture:PIXI.Texture.from(t),size:new m,hitBox:s}:o={image:t,size:n,hitBox:s},t.onload=()=>{o.size.set(t.width*le,t.height*le);const u=document.createElement("canvas");u.width=o.size.x,u.height=o.size.y;const g=u.getContext("2d");g.imageSmoothingEnabled=!1,g.drawImage(t,0,0,o.size.x,o.size.y);const p=document.createElement("img");p.src=u.toDataURL(),o.image=p,o.hitBox=Jl(g,o.size,l,!0),F.isUsingPixi&&(o.texture=PIXI.Texture.from(p))},o}function Jl(e,l,t,n){const s={pos:new m(D,D),size:new m,collision:{isColliding:{char:{},text:{}}}};n?s.collision.isColliding.char[t]=!0:s.collision.isColliding.text[t]=!0;const o=e.getImageData(0,0,l.x,l.y).data;let u=0;for(let g=0;g<l.y;g++)for(let p=0;p<l.x;p++)o[u+3]>0&&(p<s.pos.x&&(s.pos.x=p),g<s.pos.y&&(s.pos.y=g)),u+=4;u=0;for(let g=0;g<l.y;g++)for(let p=0;p<l.x;p++)o[u+3]>0&&(p>s.pos.x+s.size.x-1&&(s.size.x=p-s.pos.x+1),g>s.pos.y+s.size.y-1&&(s.size.y=g-s.pos.y+1)),u+=4;return s}function jt(e){let l=Object.assign(Object.assign({},Gl),e);return e.scale!=null&&(l.scale=Object.assign(Object.assign({},Gl.scale),e.scale)),e.mirror!=null&&(l.mirror=Object.assign(Object.assign({},Gl.mirror),e.mirror)),l}let Te=!1,ml=!1,Kl=!1;const Bt=["Escape","Digit0","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Minus","Equal","Backspace","Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Enter","ControlLeft","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Backquote","ShiftLeft","Backslash","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ShiftRight","NumpadMultiply","AltLeft","Space","CapsLock","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","Pause","ScrollLock","Numpad7","Numpad8","Numpad9","NumpadSubtract","Numpad4","Numpad5","Numpad6","NumpadAdd","Numpad1","Numpad2","Numpad3","Numpad0","NumpadDecimal","IntlBackslash","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","IntlYen","Undo","Paste","MediaTrackPrevious","Cut","Copy","MediaTrackNext","NumpadEnter","ControlRight","LaunchMail","AudioVolumeMute","MediaPlayPause","MediaStop","Eject","AudioVolumeDown","AudioVolumeUp","BrowserHome","NumpadDivide","PrintScreen","AltRight","Help","NumLock","Pause","Home","ArrowUp","PageUp","ArrowLeft","ArrowRight","End","ArrowDown","PageDown","Insert","Delete","OSLeft","OSRight","ContextMenu","BrowserSearch","BrowserFavorites","BrowserRefresh","BrowserStop","BrowserForward","BrowserBack"];let Vl;const en={onKeyDown:void 0};let Xl,Wl=!1,Yl=!1,ql=!1,Ql={},Zl={},et={};function Nt(e){Xl=Object.assign(Object.assign({},en),e),Vl=S(Bt.map(l=>[l,{isPressed:!1,isJustPressed:!1,isJustReleased:!1}])),document.addEventListener("keydown",l=>{Wl=Yl=!0,Ql[l.code]=Zl[l.code]=!0,Xl.onKeyDown!=null&&Xl.onKeyDown(),(l.code==="AltLeft"||l.code==="AltRight"||l.code==="ArrowRight"||l.code==="ArrowDown"||l.code==="ArrowLeft"||l.code==="ArrowUp")&&l.preventDefault()}),document.addEventListener("keyup",l=>{Wl=!1,ql=!0,Ql[l.code]=!1,et[l.code]=!0})}function $t(){ml=!Te&&Yl,Kl=Te&&ql,Yl=ql=!1,Te=Wl,b(Vl).forEach(([e,l])=>{l.isJustPressed=!l.isPressed&&Zl[e],l.isJustReleased=l.isPressed&&et[e],l.isPressed=!!Ql[e]}),Zl={},et={}}function _t(){ml=!1,Te=!0}var ln=Object.freeze({__proto__:null,get isPressed(){return Te},get isJustPressed(){return ml},get isJustReleased(){return Kl},codes:Bt,get code(){return Vl},init:Nt,update:$t,clearJustPressed:_t});class pl{constructor(l=null){this.setSeed(l)}get(l=1,t){return t==null&&(t=l,l=0),this.next()/4294967295*(t-l)+l}getInt(l,t){t==null&&(t=l,l=0);const n=Math.floor(l),s=Math.floor(t);return s===n?n:this.next()%(s-n)+n}getPlusOrMinus(){return this.getInt(2)*2-1}select(l){return l[this.getInt(l.length)]}setSeed(l,t=123456789,n=362436069,s=521288629,o=32){this.w=l!=null?l>>>0:Math.floor(Math.random()*4294967295)>>>0,this.x=t>>>0,this.y=n>>>0,this.z=s>>>0;for(let u=0;u<o;u++)this.next();return this}getState(){return{x:this.x,y:this.y,z:this.z,w:this.w}}next(){const l=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^(l^l>>>8))>>>0,this.w}}const Ge=new m;let oe=!1,Ee=!1,He=!1,tn={isDebugMode:!1,anchor:new m,padding:new m,onPointerDownOrUp:void 0},V,Q,H;const Je=new pl,ye=new m,ae=new m;let Ke=!1,Ve=new m,lt=!1,tt=!1,it=!1;function Gt(e,l,t){H=Object.assign(Object.assign({},tn),t),V=e,Q=new m(l.x+H.padding.x*2,l.y+H.padding.y*2),Ve.set(V.offsetLeft+V.clientWidth*(.5-H.anchor.x),V.offsetTop+V.clientWidth*(.5-H.anchor.y)),H.isDebugMode&&ye.set(V.offsetLeft+V.clientWidth*(.5-H.anchor.x),V.offsetTop+V.clientWidth*(.5-H.anchor.y)),document.addEventListener("mousedown",n=>{Kt(n.pageX,n.pageY)}),document.addEventListener("touchstart",n=>{Kt(n.touches[0].pageX,n.touches[0].pageY)}),document.addEventListener("mousemove",n=>{Vt(n.pageX,n.pageY)}),document.addEventListener("touchmove",n=>{n.preventDefault(),Vt(n.touches[0].pageX,n.touches[0].pageY)},{passive:!1}),document.addEventListener("mouseup",n=>{Xt()}),document.addEventListener("touchend",n=>{n.preventDefault(),n.target.click(),Xt()},{passive:!1})}function Ht(){nn(Ve.x,Ve.y,Ge),H.isDebugMode&&!Ge.isInRect(0,0,Q.x,Q.y)?(sn(),Ge.set(ye),Ee=!oe&&Ke,He=oe&&!Ke,oe=Ke):(Ee=!oe&&tt,He=oe&&it,oe=lt),tt=it=!1}function Jt(){Ee=!1,oe=!0}function nn(e,l,t){V!=null&&(t.x=Math.round(((e-V.offsetLeft)/V.clientWidth+H.anchor.x)*Q.x-H.padding.x),t.y=Math.round(((l-V.offsetTop)/V.clientHeight+H.anchor.y)*Q.y-H.padding.y))}function sn(){ae.length>0?(ye.add(ae),!c(ye.x,-Q.x*.1,Q.x*1.1)&&ye.x*ae.x>0&&(ae.x*=-1),!c(ye.y,-Q.y*.1,Q.y*1.1)&&ye.y*ae.y>0&&(ae.y*=-1),Je.get()<.05&&ae.set(0)):Je.get()<.1&&(ae.set(0),ae.addWithAngle(Je.get(Math.PI*2),(Q.x+Q.y)*Je.get(.01,.03))),Je.get()<.05&&(Ke=!Ke)}function Kt(e,l){Ve.set(e,l),lt=tt=!0,H.onPointerDownOrUp!=null&&H.onPointerDownOrUp()}function Vt(e,l){Ve.set(e,l)}function Xt(e){lt=!1,it=!0,H.onPointerDownOrUp!=null&&H.onPointerDownOrUp()}var rn=Object.freeze({__proto__:null,pos:Ge,get isPressed(){return oe},get isJustPressed(){return Ee},get isJustReleased(){return He},init:Gt,update:Ht,clearJustPressed:Jt});let ce=new m,de=!1,te=!1,ge=!1;function Wt(e){Nt({onKeyDown:e}),Gt(N,B,{onPointerDownOrUp:e,anchor:new m(.5,.5)})}function Yt(){$t(),Ht(),ce=Ge,de=Te||oe,te=ml||Ee,ge=Kl||He}function qt(){_t(),Jt()}function Xe(e){ce.set(e.pos),de=e.isPressed,te=e.isJustPressed,ge=e.isJustReleased}var on=Object.freeze({__proto__:null,get pos(){return ce},get isPressed(){return de},get isJustPressed(){return te},get isJustReleased(){return ge},init:Wt,update:Yt,clearJustPressed:qt,set:Xe});let X,We,nt=!1,Qt,Zt,st,ue={};function ei(e,l=1){const t=ue[e];return t==null?!1:(t.gainNode.gain.value=l,t.isPlaying=!0,!0)}function an(){const e=X.currentTime;for(const l in ue){const t=ue[l];if(!t.isReady||!t.isPlaying)continue;t.isPlaying=!1;const n=yn(e);(t.playedTime==null||n>t.playedTime)&&(gn(t,n),t.playedTime=n)}}function li(e,l=void 0){const t=ue[e];t.source!=null&&(l==null?t.source.stop():t.source.stop(l),t.source=void 0)}function cn(e=void 0){if(ue){for(const l in ue)li(l,e);ue={}}}function dn(){X=new(window.AudioContext||window.webkitAudioContext),document.addEventListener("visibilitychange",()=>{document.hidden?X.suspend():X.resume()})}function un(){nt=!0,We=X.createGain(),We.connect(X.destination),ti(),hn(),ii()}function fn(e,l){return ue[e]=mn(l),ue[e]}function ti(e=120){Qt=e,Zt=60/Qt}function hn(e=8){st=e>0?4/e:void 0}function ii(e=.1){We.gain.value=e}function gn(e,l){const t=X.createBufferSource();e.source=t,t.buffer=e.buffer,t.loop=e.isLooping,t.start=t.start||t.noteOn,t.connect(e.gainNode),t.start(l)}function mn(e){const l={buffer:void 0,source:void 0,gainNode:X.createGain(),isPlaying:!1,playedTime:void 0,isReady:!1,isLooping:!1};return l.gainNode.connect(We),pn(e).then(t=>{l.buffer=t,l.isReady=!0}),l}async function pn(e){const t=await(await fetch(e)).arrayBuffer();return await X.decodeAudioData(t)}function yn(e){if(st==null)return e;const l=Zt*st;return l>0?Math.ceil(e/l)*l:e}let ni,si;const ri=68,rt=1e3/ri;let Ye=0;const wn={viewSize:{x:100,y:100},bodyBackground:"#111",viewBackground:"black",isCapturing:!1,isCapturingGameCanvasOnly:!1,isSoundEnabled:!0,captureCanvasScale:1,theme:{name:"simple",isUsingPixi:!1,isDarkColor:!1},colorPalette:void 0};let Y,oi=10,yl;function Cn(e,l,t){ni=e,si=l,Y=Object.assign(Object.assign({},wn),t),pe(Y.theme.isDarkColor,Y.colorPalette),Bi(Y.viewSize,Y.bodyBackground,Y.viewBackground,Y.isCapturing,Y.isCapturingGameCanvasOnly,Y.captureCanvasScale,Y.captureDurationSec,Y.theme),Wt(()=>{X.resume()}),Xi(),ni(),ai()}function ai(){yl=requestAnimationFrame(ai);const e=window.performance.now();e<Ye-ri/12||(Ye+=rt,(Ye<e||Ye>e+rt*2)&&(Ye=e+rt),nt&&an(),Y.isSoundEnabled&&sss.update(),Yt(),si(),Y.isCapturing&&_i(),oi--,oi===0&&Yi())}function Sn(){yl&&(cancelAnimationFrame(yl),yl=void 0)}let wl;const Cl=new pl;function ot(){wl=[]}function ci(e,l=16,t=1,n=0,s=Math.PI*2,o=void 0){if(l<1){if(Cl.get()>l)return;l=1}for(let u=0;u<l;u++){const g=n+Cl.get(s)-s/2,p={pos:new m(e),vel:new m(t*Cl.get(.5,1),0).rotate(g),color:J,ticks:r(Cl.get(10,20)*Math.sqrt(Math.abs(t)),10,60),edgeColor:o};wl.push(p)}}function Sl(){cl(),wl=wl.filter(e=>{if(e.ticks--,e.ticks<0)return!1;e.pos.add(e.vel),e.vel.mul(.98);const l=Math.floor(e.pos.x),t=Math.floor(e.pos.y);return e.edgeColor!=null&&(ee(e.edgeColor),Oe(l-1,t-1,3,3)),ee(e.color),Oe(l,t,1,1),!0}),dl()}function at(e,l,t,n){return di(!1,e,l,t,n)}function bn(e,l,t,n){return di(!0,e,l,t,n)}function xn(e,l,t,n,s=.5,o=.5){typeof e!="number"&&(o=s,s=n,n=t,t=l,l=e.y,e=e.x);const u=new m(t).rotate(s),g=new m(e-u.x*o,l-u.y*o);return ct(g,u,n)}function vn(e,l,t=3,n=3,s=3){const o=new m,u=new m;if(typeof e=="number")if(typeof l=="number")typeof t=="number"?(o.set(e,l),u.set(t,n)):(o.set(e,l),u.set(t),s=n);else throw"invalid params";else if(typeof l=="number")if(typeof t=="number")o.set(e),u.set(l,t),s=n;else throw"invalid params";else if(typeof t=="number")o.set(e),u.set(l),s=t;else throw"invalid params";return ct(o,u.sub(o),s)}function kn(e,l,t,n,s,o){let u=new m;typeof e=="number"?u.set(e,l):(u.set(e),o=s,s=n,n=t,t=l),n==null&&(n=3),s==null&&(s=0),o==null&&(o=Math.PI*2);let g,p;if(s>o?(g=o,p=s-o):(g=s,p=o-s),p=r(p,0,Math.PI*2),p<.01)return;const w=r(Math.ceil(p*Math.sqrt(t*.25)),1,36),v=p/w;let x=g,C=new m(t).rotate(x).add(u),M=new m,T=new m,E={isColliding:{rect:{},text:{},char:{}}};for(let _=0;_<w;_++){x+=v,M.set(t).rotate(x).add(u),T.set(M).sub(C);const U=ct(C,T,n,!0);E=Object.assign(Object.assign(Object.assign({},E),Ul(U.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},E.isColliding.rect),U.isColliding.rect),text:Object.assign(Object.assign({},E.isColliding.text),U.isColliding.text),char:Object.assign(Object.assign({},E.isColliding.char),U.isColliding.char)}}),C.set(M)}return Et(),E}function di(e,l,t,n,s){if(typeof l=="number"){if(typeof t=="number")return typeof n=="number"?s==null?we(e,l,t,n,n):we(e,l,t,n,s):we(e,l,t,n.x,n.y);throw"invalid params"}else if(typeof t=="number"){if(n==null)return we(e,l.x,l.y,t,t);if(typeof n=="number")return we(e,l.x,l.y,t,n);throw"invalid params"}else return we(e,l.x,l.y,t.x,t.y)}function ct(e,l,t,n=!1){let s=!0;(F.name==="shape"||F.name==="shapeDark")&&(J!=="transparent"&&Ni(e.x,e.y,e.x+l.x,e.y+l.y,t),s=!1);const o=Math.floor(r(t,3,10)),u=Math.abs(l.x),g=Math.abs(l.y),p=r(Math.ceil(u>g?u/o:g/o)+1,3,99);l.div(p-1);let w={isColliding:{rect:{},text:{},char:{}}};for(let v=0;v<p;v++){const x=we(!0,e.x,e.y,t,t,!0,s);w=Object.assign(Object.assign(Object.assign({},w),Ul(x.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},w.isColliding.rect),x.isColliding.rect),text:Object.assign(Object.assign({},w.isColliding.text),x.isColliding.text),char:Object.assign(Object.assign({},w.isColliding.char),x.isColliding.char)}}),e.add(l)}return n||Et(),w}function we(e,l,t,n,s,o=!1,u=!0){let g=u;(F.name==="shape"||F.name==="shapeDark")&&g&&J!=="transparent"&&(e?Oe(l-n/2,t-s/2,n,s):Oe(l,t,n,s),g=!1);let p=e?{x:Math.floor(l-n/2),y:Math.floor(t-s/2)}:{x:Math.floor(l),y:Math.floor(t)};const w={x:Math.trunc(n),y:Math.trunc(s)};if(w.x===0||w.y===0)return{isColliding:{rect:{},text:{},char:{}}};w.x<0&&(p.x+=w.x,w.x*=-1),w.y<0&&(p.y+=w.y,w.y*=-1);const v={pos:p,size:w,collision:{isColliding:{rect:{}}}};v.collision.isColliding.rect[J]=!0;const x=At(v);return J!=="transparent"&&((o?ul:Fe).push(v),g&&Oe(p.x,p.y,w.x,w.y)),x}function dt({pos:e,size:l,text:t,isToggle:n=!1,onClick:s=()=>{},isSmallText:o=!0}){return{pos:e,size:l,text:t,isToggle:n,onClick:s,isPressed:!1,isSelected:!1,isHovered:!1,toggleGroup:[],isSmallText:o}}function ut(e){const l=new m(ce).sub(e.pos);e.isHovered=l.isInRect(0,0,e.size.x,e.size.y),e.isHovered&&Ee&&(e.isPressed=!0),e.isPressed&&!e.isHovered&&(e.isPressed=!1),e.isPressed&&He&&(e.onClick(),e.isPressed=!1,e.isToggle&&(e.toggleGroup.length===0?e.isSelected=!e.isSelected:(e.toggleGroup.forEach(t=>{t.isSelected=!1}),e.isSelected=!0))),bl(e)}function bl(e){cl(),ee(e.isPressed?"blue":"light_blue"),at(e.pos.x,e.pos.y,e.size.x,e.size.y),e.isToggle&&!e.isSelected&&(ee("white"),at(e.pos.x+1,e.pos.y+1,e.size.x-2,e.size.y-2)),ee(e.isHovered?"black":"blue"),Dt(e.text,e.pos.x+3,e.pos.y+3,{isSmallText:e.isSmallText}),dl()}let ie,qe,Ce,ft;function Pn(e){ie={randomSeed:e,inputs:[]}}function Mn(e){ie.inputs.push(e)}function ui(){return ie!=null}function On(e){qe=0,e.setSeed(ie.randomSeed)}function Fn(){qe>=ie.inputs.length||(Xe(ie.inputs[qe]),qe++)}function In(){Ce=[]}function Rn(e,l,t){Ce.push({randomState:t.getState(),gameState:cloneDeep(e),baseState:cloneDeep(l)})}function Tn(e){const l=Ce.pop(),t=l.randomState;return e.setSeed(t.w,t.x,t.y,t.z,0),ft={pos:new m(ce),isPressed:de,isJustPressed:te,isJustReleased:ge},Xe(ie.inputs.pop()),l}function En(e){const l=Ce[Ce.length-1],t=l.randomState;return e.setSeed(t.w,t.x,t.y,t.z,0),ft={pos:new m(ce),isPressed:de,isJustPressed:te,isJustReleased:ge},Xe(ie.inputs[ie.inputs.length-1]),l}function An(){Xe(ft)}function Dn(){return Ce.length===0}function zn(){const e=qe-1;if(!(e>=ie.inputs.length))return Ce[e]}const ht=4,Ln=60,Un="video/webm;codecs=vp8,opus",jn="video/webm",Bn="recording.webm",Nn=1e5*ht,$n=.7;let Z,xl;function _n(e,l,t){if(Z!=null)return;const n=document.createElement("canvas");n.width=e.width*ht,n.height=e.height*ht;const s=n.getContext("2d");s.imageSmoothingEnabled=!1;const o=()=>{s.drawImage(e,0,0,e.width,e.height,0,0,n.width,n.height),xl=requestAnimationFrame(o)};o();const u=n.captureStream(Ln),g=l.createMediaStreamDestination(),p=l.createGain();p.gain.value=$n,t.forEach(C=>{C!=null&&C.connect(p)}),p.connect(g);const w=g.stream,v=new MediaStream([...u.getVideoTracks(),...w.getAudioTracks()]);Z=new MediaRecorder(v,{mimeType:Un,videoBitsPerSecond:Nn});let x=[];Z.ondataavailable=C=>{C.data.size>0&&x.push(C.data)},Z.onstop=()=>{const C=new Blob(x,{type:jn}),M=URL.createObjectURL(C),T=document.createElement("a");T.href=M,T.download=Bn,T.click(),URL.revokeObjectURL(M),x=[]},Z.start()}function Gn(){Z!=null&&Z.state!=="inactive"&&(Z.stop(),Z=void 0),xl&&(cancelAnimationFrame(xl),xl=void 0)}function Hn(){return Z!=null&&Z.state==="recording"}const Jn=Math.PI,Kn=Math.abs,Vn=Math.sin,Xn=Math.cos,Wn=Math.atan2,Yn=Math.sqrt,qn=Math.pow,Qn=Math.floor,Zn=Math.round,es=Math.ceil;i.ticks=0,i.difficulty=void 0,i.score=0,i.time=void 0,i.isReplaying=!1;function ls(e=1,l){return fe.get(e,l)}function ts(e=2,l){return fe.getInt(e,l)}function is(e=1,l){return fe.get(e,l)*fe.getPlusOrMinus()}function gt(e="GAME OVER"){Ol=e,h.isShowingTime&&(i.time=void 0),Si()}function ns(e="COMPLETE"){Ol=e,Si()}function ss(e,l,t){if(i.isReplaying||(i.score+=e,l==null))return;const n=`${e>=1?"+":""}${Math.floor(e)}`;let s=new m;typeof l=="number"?s.set(l,t):s.set(l),s.x-=n.length*(h.isUsingSmallText?Ie:D)/2,s.y-=D/2,Pl.push({str:n,pos:s,vy:-2,ticks:30})}function fi(e){ee(e)}function rs(e,l,t,n,s,o){let u=new m;typeof e=="number"?(u.set(e,l),g(u,t,n,s,o)):(u.set(e),g(u,l,t,n,s));function g(p,w,v,x,C){if(ks(w)){const M=w;ci(p,M.count,M.speed,M.angle,M.angleWidth,M.edgeColor)}else ci(p,w,v,x,C)}}function hi(e,l){return new m(e,l)}function gi(e,l){!el&&!be&&(nt&&ei(e,l!=null&&l.volume!=null?l.volume:1)||(h.isSoundEnabled&&typeof sss.playSoundEffect=="function"?sss.playSoundEffect(e,l):h.isSoundEnabled&&sss.play(cs[e])))}let mt;function pt(){St&&ei(h.bgmName,h.bgmVolume)||(typeof sss.generateMml=="function"?mt=sss.playMml(sss.generateMml(),{volume:h.bgmVolume}):sss.playBgm())}function yt(){St?li(h.bgmName):mt!=null?sss.stopMml(mt):sss.stopBgm()}function mi(){_n(N,X,[We,Il])}function wt(){Gn()}function os(e){if(el){const l=En(fe),t=l.baseState;return i.score=t.score,i.ticks=t.ticks,cloneDeep(l.gameState)}else if(be){const l=Tn(fe),t=l.baseState;return i.score=t.score,i.ticks=t.ticks,l.gameState}else{if(i.isReplaying)return zn().gameState;if(Se==="inGame"){const l={score:i.score,ticks:i.ticks};Rn(e,l,fe)}}return e}function as(){be||(!i.isReplaying&&h.isRewindEnabled?Cs():gt())}const cs={coin:"c",laser:"l",explosion:"e",powerUp:"p",hit:"h",jump:"j",select:"s",lucky:"u",random:"r",click:"i",synth:"y",tone:"t"},pi={isPlayingBgm:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,captureCanvasScale:1,captureDurationSec:5,isShowingScore:!0,isShowingTime:!1,isReplayEnabled:!1,isRewindEnabled:!1,isDrawingParticleFront:!1,isDrawingScoreFront:!1,isUsingSmallText:!0,isMinifying:!1,isSoundEnabled:!0,viewSize:{x:100,y:100},audioSeed:0,seed:0,audioVolume:1,theme:"simple",colorPalette:void 0,textEdgeColor:{score:void 0,floatingScore:void 0,title:void 0,description:void 0,gameOver:void 0},bgmName:"bgm",bgmVolume:1,audioTempo:120,isRecording:!1},ds=new pl,fe=new pl;let Se,us={title:ys,inGame:ps,gameOver:ws,rewind:Ss},Qe=0,vl,kl=!0,Ze=0,h,yi,Pl,el=!1,be=!1,ll,Ml,Ol,Ct,Fl,Il,St=!1;function fs(e){window.update=e.update,window.title=e.title,window.description=e.description,window.characters=e.characters,window.options=e.options,window.audioFiles=e.audioFiles,wi()}function wi(){typeof options<"u"&&options!=null?h=Object.assign(Object.assign({},pi),options):h=pi;const e={name:h.theme,isUsingPixi:!1,isDarkColor:!1};h.theme!=="simple"&&h.theme!=="dark"&&(e.isUsingPixi=!0),(h.theme==="pixel"||h.theme==="shapeDark"||h.theme==="crt"||h.theme==="dark")&&(e.isDarkColor=!0),Ze=h.audioSeed+h.seed,h.isMinifying&&Ms(),yi={viewSize:h.viewSize,bodyBackground:e.isDarkColor?"#101010":"#e0e0e0",viewBackground:e.isDarkColor?"blue":"white",theme:e,isSoundEnabled:h.isSoundEnabled,isCapturing:h.isCapturing,isCapturingGameCanvasOnly:h.isCapturingGameCanvasOnly,captureCanvasScale:h.captureCanvasScale,captureDurationSec:h.captureDurationSec,colorPalette:h.colorPalette},Cn(gs,ms,yi)}function hs(){Sn(),wt(),cn(),window.update=void 0,window.title=void 0,window.description=void 0,window.characters=void 0,window.options=void 0,window.audioFiles=void 0}function gs(){if(typeof description<"u"&&description!=null&&description.trim().length>0&&(kl=!1,Ze+=Pi(description)),typeof title<"u"&&title!=null&&title.trim().length>0&&(kl=!1,document.title=title,Ze+=Pi(title),Fl=`crisp-game-${encodeURIComponent(title)}-${Ze}`,Qe=vs()),typeof characters<"u"&&characters!=null&&Wi(characters,"a"),dn(),typeof audioFiles<"u"&&audioFiles!=null){un(),ii(.1*h.audioVolume),ti(h.audioTempo);for(let e in audioFiles){const l=fn(e,audioFiles[e]);e===h.bgmName&&(l.isLooping=!0,St=!0)}}h.isSoundEnabled&&(Il=X.createGain(),Il.connect(X.destination),sss.init(Ze,X,Il),sss.setVolume(.1*h.audioVolume),sss.setTempo(h.audioTempo)),ee("black"),kl?(bt(),i.ticks=0):Ci()}function ms(){i.df=i.difficulty=i.ticks/3600+1,i.tc=i.ticks;const e=i.score,l=i.time;i.sc=i.score;const t=i.sc;i.inp={p:ce,ip:de,ijp:te,ijr:ge},Hi(),us[Se](),F.isUsingPixi&&(al(),F.name==="crt"&&$i()),i.ticks++,i.isReplaying?(i.score=e,i.time=l):i.sc!==t&&(i.score=i.sc)}function bt(){Se="inGame",i.ticks=-1,ot();const e=Math.floor(i.score);e>Qe&&(Qe=e),h.isShowingTime&&i.time!=null&&(vl==null||vl>i.time)&&(vl=i.time),i.score=0,i.time=0,Pl=[],h.isPlayingBgm&&h.isSoundEnabled&&pt();const l=ds.getInt(999999999);fe.setSeed(l),(h.isReplayEnabled||h.isRewindEnabled)&&(Pn(l),In(),i.isReplaying=!1)}function ps(){rl(),h.isDrawingParticleFront||Sl(),h.isDrawingScoreFront||ki(),(h.isReplayEnabled||h.isRewindEnabled)&&Mn({pos:hi(ce),isPressed:de,isJustPressed:te,isJustReleased:ge}),typeof update=="function"&&update(),h.isDrawingParticleFront&&Sl(),h.isDrawingScoreFront&&ki(),xt(),h.isShowingTime&&i.time!=null&&i.time++,h.isRecording&&!Hn()&&mi()}function Ci(){Se="title",i.ticks=-1,ot(),rl(),ui()&&(On(fe),i.isReplaying=!0)}function ys(){if(te){bt();return}if(rl(),h.isReplayEnabled&&ui()&&(Fn(),i.inp={p:ce,ip:de,ijp:te,ijr:ge},h.isDrawingParticleFront||Sl(),update(),h.isDrawingParticleFront&&Sl()),xt(),typeof title<"u"&&title!=null){let e=0;title.split(`
`).forEach(t=>{t.length>e&&(e=t.length)});const l=Math.floor((B.x-e*D)/2);title.split(`
`).forEach((t,n)=>{re(t,l,Math.floor(B.y*.25)+n*D,{edgeColor:h.textEdgeColor.title})})}if(typeof description<"u"&&description!=null){let e=0;description.split(`
`).forEach(n=>{n.length>e&&(e=n.length)});const l=h.isUsingSmallText?Ie:D,t=Math.floor((B.x-e*l)/2);description.split(`
`).forEach((n,s)=>{re(n,t,Math.floor(B.y/2)+s*D,{isSmallText:h.isUsingSmallText,edgeColor:h.textEdgeColor.description})})}}function Si(){Se="gameOver",i.isReplaying||qt(),i.ticks=-1,xi(),h.isPlayingBgm&&h.isSoundEnabled&&yt();const e=Math.floor(i.score);e>Qe&&xs(e)}function ws(){i.ticks===0&&!F.isUsingPixi&&xi(),(i.isReplaying||i.ticks>20)&&te?(bi(),bt()):i.ticks===(h.isReplayEnabled?120:300)&&!kl&&(bi(),Ci())}function bi(){!h.isRecording||i.isReplaying||wt()}function xi(){i.isReplaying||re(Ol,Math.floor((B.x-Ol.length*D)/2),Math.floor(B.y/2),{edgeColor:h.textEdgeColor.gameOver})}function Cs(){Se="rewind",el=!0,ll=dt({pos:{x:B.x-39,y:11},size:{x:36,y:7},text:"Rewind",isSmallText:h.isUsingSmallText}),Ml=dt({pos:{x:B.x-39,y:B.y-19},size:{x:36,y:7},text:"GiveUp",isSmallText:h.isUsingSmallText}),h.isPlayingBgm&&h.isSoundEnabled&&yt(),F.isUsingPixi&&(bl(ll),bl(Ml))}function Ss(){rl(),update(),xt(),An(),be?(bl(ll),(Dn()||!de)&&bs()):(ut(ll),ut(Ml),ll.isPressed&&(be=!0,el=!1)),Ml.isPressed&&(el=be=!1,gt()),h.isShowingTime&&i.time!=null&&i.time++}function bs(){be=!1,Se="inGame",ot(),h.isPlayingBgm&&h.isSoundEnabled&&pt()}function xt(){if(h.isShowingTime)vi(i.time,3,3),vi(vl,B.x-7*(h.isUsingSmallText?Ie:D),3);else if(h.isShowingScore){re(`${Math.floor(i.score)}`,3,3,{isSmallText:h.isUsingSmallText,edgeColor:h.textEdgeColor.score});const e=`HI ${Qe}`;re(e,B.x-e.length*(h.isUsingSmallText?Ie:D),3,{isSmallText:h.isUsingSmallText,edgeColor:h.textEdgeColor.score})}}function vi(e,l,t){if(e==null)return;let n=Math.floor(e*100/50);n>=10*60*100&&(n=10*60*100-1);const s=vt(Math.floor(n/6e3),1)+"'"+vt(Math.floor(n%6e3/100),2)+'"'+vt(Math.floor(n%100),2);re(s,l,t,{isSmallText:h.isUsingSmallText,edgeColor:h.textEdgeColor.score})}function vt(e,l){return("0000"+e).slice(-l)}function ki(){cl(),ee("black"),Pl=Pl.filter(e=>(re(e.str,e.pos.x,e.pos.y,{isSmallText:h.isUsingSmallText,edgeColor:h.textEdgeColor.floatingScore}),e.pos.y+=e.vy,e.vy*=.9,e.ticks--,e.ticks>0)),dl()}function Pi(e){let l=0;for(let t=0;t<e.length;t++){const n=e.charCodeAt(t);l=(l<<5)-l+n,l|=0}return l}function xs(e){if(Fl!=null)try{const l={highScore:e};localStorage.setItem(Fl,JSON.stringify(l))}catch(l){console.warn("Unable to save high score:",l)}}function vs(){try{const e=localStorage.getItem(Fl);if(e)return JSON.parse(e).highScore}catch(e){console.warn("Unable to load high score:",e)}return 0}function ks(e){return e!=null&&e.constructor===Object}function Ps(){let e=window.location.search.substring(1);if(e=e.replace(/[^A-Za-z0-9_-]/g,""),e.length===0)return;const l=document.createElement("script");Ct=`${e}/main.js`,l.setAttribute("src",Ct),document.head.appendChild(l)}function Ms(){fetch(Ct).then(e=>e.text()).then(e=>{const l=Terser.minify(e+"update();",{toplevel:!0}).code,t="function(){",n=l.indexOf(t),s="options={",o=l.indexOf(s);let u=l;if(n>=0)u=l.substring(l.indexOf(t)+t.length,l.length-4);else if(o>=0){let g=1,p;for(let w=o+s.length;w<l.length;w++){const v=l.charAt(w);if(v==="{")g++;else if(v==="}"&&(g--,g===0)){p=w+2;break}}g===0&&(u=l.substring(p))}Mi.forEach(([g,p])=>{u=u.split(g).join(p)}),console.log(u),console.log(`${u.length} letters`)})}i.inp=void 0;function Os(...e){return fi.apply(this,e)}function Fs(...e){return gi.apply(this,e)}function Is(...e){return f.apply(this,e)}function Rs(...e){return y.apply(this.args)}i.tc=void 0,i.df=void 0,i.sc=void 0;const Ts="transparent",Es="white",As="red",Ds="green",zs="yellow",Ls="blue",Us="purple",js="cyan",Bs="black",Ns="coin",$s="laser",_s="explosion",Gs="powerUp",Hs="hit",Js="jump",Ks="select",Vs="lucky";let Mi=[["===","=="],["!==","!="],["input.pos","inp.p"],["input.isPressed","inp.ip"],["input.isJustPressed","inp.ijp"],["input.isJustReleased","inp.ijr"],["color(","clr("],["play(","ply("],["times(","tms("],["remove(","rmv("],["ticks","tc"],["difficulty","df"],["score","sc"],[".isColliding.rect.transparent",".tr"],[".isColliding.rect.white",".wh"],[".isColliding.rect.red",".rd"],[".isColliding.rect.green",".gr"],[".isColliding.rect.yellow",".yl"],[".isColliding.rect.blue",".bl"],[".isColliding.rect.purple",".pr"],[".isColliding.rect.cyan",".cy"],[".isColliding.rect.black",".lc"],['"transparent"',"tr"],['"white"',"wh"],['"red"',"rd"],['"green"',"gr"],['"yellow"',"yl"],['"blue"',"bl"],['"purple"',"pr"],['"cyan"',"cy"],['"black"',"lc"],['"coin"',"cn"],['"laser"',"ls"],['"explosion"',"ex"],['"powerUp"',"pw"],['"hit"',"ht"],['"jump"',"jm"],['"select"',"sl"],['"lucky"',"uc"]];i.PI=Jn,i.abs=Kn,i.addGameScript=Ps,i.addScore=ss,i.addWithCharCode=A,i.arc=kn,i.atan2=Wn,i.bar=xn,i.bl=Ls,i.box=bn,i.ceil=es,i.char=Ki,i.clamp=r,i.clr=Os,i.cn=Ns,i.color=fi,i.complete=ns,i.cos=Xn,i.cy=js,i.end=gt,i.ex=_s,i.floor=Qn,i.frameState=os,i.getButton=dt,i.gr=Ds,i.ht=Hs,i.init=fs,i.input=on,i.jm=Js,i.keyboard=ln,i.lc=Bs,i.line=vn,i.ls=$s,i.minifyReplaces=Mi,i.onLoad=wi,i.onUnload=hs,i.particle=rs,i.play=gi,i.playBgm=pt,i.ply=Fs,i.pointer=rn,i.pow=qn,i.pr=Us,i.pw=Gs,i.range=d,i.rd=As,i.rect=at,i.remove=y,i.rewind=as,i.rmv=Rs,i.rnd=ls,i.rndi=ts,i.rnds=is,i.round=Zn,i.sin=Vn,i.sl=Ks,i.sqrt=Yn,i.startRecording=mi,i.stopBgm=yt,i.stopRecording=wt,i.text=Dt,i.times=f,i.tms=Is,i.tr=Ts,i.uc=Vs,i.updateButton=ut,i.vec=hi,i.wh=Es,i.wrap=a,i.yl=zs}(window||{})),Oi}Ys();function qs(i,r){let a=r?Zs(Qs(r)[0]):Math.random,c=i.length,d;const f=[...i];for(;c!==0;)d=Math.floor(a()*c),c--,[f[c],f[d]]=[f[d],f[c]];return f}function Qs(i){let r=1779033703,a=3144134277,c=1013904242,d=2773480762;for(let f=0,y;f<i.length;f++)y=i.charCodeAt(f),r=a^Math.imul(r^y,597399067),a=c^Math.imul(a^y,2869860233),c=d^Math.imul(c^y,951274213),d=r^Math.imul(d^y,2716044179);return r=Math.imul(c^r>>>18,597399067),a=Math.imul(d^a>>>22,2869860233),c=Math.imul(r^c>>>17,951274213),d=Math.imul(a^d>>>19,2716044179),[(r^a^c^d)>>>0,(a^r)>>>0,(c^r)>>>0,(d^r)>>>0]}function Zs(i){return function(){var r=i+=1831565813;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296}}const kt="PLAY_CATALYST",Ii=3,er=8,Ri=12,Ti=i=>{let r=i,a;do{a=!1;const c=r.field;let d=c.length;for(let f=1;f<d-1;f++){const y=c[f-1],S=c[f],b=c[f+1],A=y.rank===S.rank&&S.rank===b.rank,I=y.suit===S.suit&&S.suit===b.suit;if(A||I){const m=[...c.slice(0,f-1),...c.slice(f+2)];r={...r,field:m},a=!0;break}}}while(a);return r},Tl={gameId:"catalyst-reaction-v7-auto",gameName:"Catalyst Reaction (v7, Auto Reaction)",setupGame:i=>{const r=["SPADE","HEART","DIAMOND","CLUB"],a=["A","2","3","4","5","6","7","8","9","10","J","Q","K"];let c=[],d=0;for(const L of r)for(const j of a)c.push({suit:L,rank:j,id:`card-${d++}`});const f=qs(c,i),y=er;let S=f.slice(0,y),b=f.slice(y),A={_cardIdCounter:d,deck:b,field:S,hand:[],discardPile:[]},I=S,m=!0;for(;m;){const j=Ti({_cardIdCounter:d,deck:b,field:I,hand:[],discardPile:[]});if(j.field.length<I.length){I=j.field,b=j.deck;const he=y-I.length;if(he>0&&b.length>0){const pe=Math.min(he,b.length),je=b.slice(0,pe);I=[...I,...je],b=b.slice(pe),m=!0}else he>0&&b.length===0?m=!1:m=!0}else{const he=y-I.length;if(he>0&&b.length>0){const pe=Math.min(he,b.length),je=b.slice(0,pe);I=[...I,...je],b=b.slice(pe),m=!0}else m=!1}A={_cardIdCounter:d,deck:b,field:I,hand:[],discardPile:[]}}const P=[];for(let L=0;L<Ii&&A.deck.length>0;L++)P.push(A.deck.shift());return{...A,hand:P}},getAvailableActions:i=>{const r=[];if(i.hand.length>0)if(i.field.length>=Ri)for(const a of i.hand)for(let c=1;c<i.field.length;c++){const d=i.field[c-1],f=i.field[c],y=d.rank===a.rank&&a.rank===f.rank,S=d.suit===a.suit&&a.suit===f.suit;(y||S)&&r.push({type:kt,payload:{catalystCardId:a.id,position:c}})}else for(const a of i.hand)for(let c=0;c<=i.field.length;c++)r.push({type:kt,payload:{catalystCardId:a.id,position:c}});return r},applyAction:(i,r)=>{let a=JSON.parse(JSON.stringify(i));if(r.type===kt){const{catalystCardId:c,position:d}=r.payload,f=a.hand.findIndex(b=>b.id===c);if(f===-1)return i;const y=a.hand[f];if(d<0||d>a.field.length)return i;let S=!1;if(d>0&&d<a.field.length){const b=d-1,A=d,I=a.field[b],m=a.field[A],P=I&&m&&I.rank===y.rank&&y.rank===m.rank,L=I&&m&&I.suit===y.suit&&y.suit===m.suit;S=P||L,S&&(a.hand.splice(f,1),a.field.splice(A,1),a.field.splice(b,1))}S||(a.hand.splice(f,1),a.field.splice(d,0,y)),a=Ti(a),a.deck.length>0&&a.hand.length<Ii&&a.hand.push(a.deck.shift())}else return i;return a},checkGameEnd:i=>{if(i.field.length===0)return{status:"WIN"};if(i.hand.length===0)return{status:"LOSE",reason:"No cards in hand to play."};if(i.deck.length===0&&i.hand.length===0&&i.field.length>0)return{status:"LOSE",reason:"Deck and hand are empty, cannot make further moves."};if(i.field.length>=Ri){let r=!1;for(const a of i.hand){for(let c=1;c<i.field.length;c++){const d=i.field[c-1],f=i.field[c],y=d.rank===a.rank&&a.rank===f.rank,S=d.suit===a.suit&&a.suit===f.suit;if(y||S){r=!0;break}}if(r)break}if(!r)return{status:"LOSE",reason:"Field is full and no reactions are possible."}}return{status:"ONGOING"}}},lr=[`
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
`],Pt={spade:0,heart:1,diamond:2,club:3,back:4,joker:8};class Mt{constructor(){O(this,"pos");O(this,"size",vec(9,16));O(this,"rank");O(this,"suit");O(this,"isFaceUp");O(this,"isSelected");O(this,"isHighlighted");O(this,"isFlipping");O(this,"flipProgress");O(this,"targetIsFaceUp");O(this,"flipSpeed");O(this,"isMoving");O(this,"moveStartPos");O(this,"moveTargetPos");O(this,"moveProgress");O(this,"moveSpeed");O(this,"isDisappearing");O(this,"disappearSpeed");this.pos=vec(),this.rank=1,this.suit="spade",this.isFaceUp=!0,this.isSelected=!1,this.isHighlighted=!1,this.isFlipping=!1,this.flipProgress=0,this.targetIsFaceUp=null,this.flipSpeed=.1,this.isMoving=!1,this.moveStartPos=vec(),this.moveTargetPos=vec(),this.moveProgress=0,this.moveSpeed=.07,this.isDisappearing=!1,this.disappearSpeed=.1}getRankDisplayString(){if(this.rank===0)return"";switch(this.rank){case 1:return"A";case 10:return"f";case 11:return"J";case 12:return"Q";case 13:return"K";default:return this.rank.toString()}}startFlipAnimation(r){this.isFlipping||this.isFaceUp===r||(this.isFlipping=!0,this.flipProgress=0,this.targetIsFaceUp=r)}updateFlipAnimation(){this.isFlipping&&(this.flipProgress+=this.flipSpeed,this.flipProgress>=1&&(this.isFaceUp=this.targetIsFaceUp,this.isFlipping=!1,this.flipProgress=0,this.targetIsFaceUp=null))}startMoveAnimation(r){this.isMoving=!0,this.moveStartPos=vec(this.pos.x,this.pos.y),this.moveTargetPos=vec(r.x,r.y),this.moveProgress=0}updateMovement(){if(this.isMoving)if(this.moveProgress+=this.moveSpeed,this.moveProgress>=1)this.pos.set(this.moveTargetPos),this.isMoving=!1,this.moveProgress=0;else{const r=this.moveStartPos.x+(this.moveTargetPos.x-this.moveStartPos.x)*this.moveProgress,a=this.moveStartPos.y+(this.moveTargetPos.y-this.moveStartPos.y)*this.moveProgress;this.pos.set(r,a)}}startDisappearAnimation(){this.isDisappearing=!0,this.moveStartPos=vec(this.pos.x,this.pos.y),this.moveTargetPos=vec(this.pos.x,-this.size.y),this.moveProgress=0,this.moveSpeed=this.disappearSpeed,this.isMoving=!0}update(){this.updateFlipAnimation(),this.updateMovement()}draw(){this.update();let r=1,a=this.isFaceUp;this.isFlipping&&(r=Math.cos(this.flipProgress*PI),r<0&&(a=this.targetIsFaceUp,r*=-1)),this.isHighlighted&&(color("red"),rect(this.pos.x-(this.size.x/2+1),this.pos.y-(this.size.y/2+1),this.size.x+2,this.size.y+2)),color("black");const c=this.size.x*r;if(rect(this.pos.x-c/2,this.pos.y-this.size.y/2,c,this.size.y),r>.1){const d=this.isSelected?"light_yellow":"white";color(d);const f=(this.size.x-2)*r;if(rect(this.pos.x-f/2,this.pos.y-(this.size.y-2)/2,f,this.size.y-2),a)if(this.suit==="joker"){color("black");const y=ceil(this.pos.x-1),S={scale:{x:r}};char("i",y,this.pos.y-3,S),char("j",y,this.pos.y+3,S)}else{const y=this.suit==="heart"||this.suit==="diamond"?"red":"black",S=ceil(this.pos.x-1),b={scale:{x:r}};color(y),char(addWithCharCode("a",Pt[this.suit]),S,this.pos.y-3,b),color(y);const A=this.getRankDisplayString();A&&char(A,S,this.pos.y+3,b)}else{color("blue");const y=ceil(this.pos.x-1),S={scale:{x:r}};char(addWithCharCode("a",Pt.back),y,this.pos.y-3,S),char(addWithCharCode("a",Pt.back),y,this.pos.y+3,S)}}}containsPoint(r){const a=this.pos.x-this.size.x/2,c=this.pos.y-this.size.y/2;return r.isInRect(a,c,this.size.x,this.size.y)}}class tr{constructor(r,a,c,d,f="",y){O(this,"pos");O(this,"size");O(this,"text");O(this,"isVisible");O(this,"textColor");O(this,"backgroundColor");O(this,"borderColor");O(this,"tailAlign");O(this,"tailDirection");O(this,"tailChar");O(this,"padding",{x:3,y:2});O(this,"lineSpacing",6);O(this,"charWidth",4);O(this,"minHeight",15);this.pos=vec(r,a),this.size=vec(c,Math.max(d,this.minHeight)),this.text=f,this.isVisible=!1,this.textColor="black",this.backgroundColor="white",this.borderColor="black",this.tailAlign=(y==null?void 0:y.align)??"left",this.tailDirection=(y==null?void 0:y.direction)??"down",this.tailChar="h",this._calculateAndSetHeight(this.text)}_calculateAndSetHeight(r){const a=Math.floor((this.size.x-this.padding.x*2)/this.charWidth);if(a<=0){this.size.y=this.minHeight;return}let c=1;const d=r.split(" ");let f="";for(const S of d){const b=f?`${f} ${S}`:S;b.length<=a?f=b:(c++,f=S)}const y=c*this.lineSpacing+this.padding.y*2;this.size.y=Math.max(y,this.minHeight)}setText(r){this.text!==r&&(this.text=r,this._calculateAndSetHeight(this.text))}show(r){r&&this.text!==r?this.setText(r):this.isVisible||this._calculateAndSetHeight(this.text),this.isVisible=!0}hide(){this.isVisible=!1}setTail(r,a){this.tailAlign=r,this.tailDirection=a}draw(){if(!this.isVisible)return;color(this.backgroundColor),rect(this.pos.x,this.pos.y,this.size.x,this.size.y),color(this.borderColor),rect(this.pos.x,this.pos.y,this.size.x,1),rect(this.pos.x,this.pos.y+this.size.y-1,this.size.x,1),rect(this.pos.x,this.pos.y+1,1,this.size.y-2),rect(this.pos.x+this.size.x-1,this.pos.y+1,1,this.size.y-2),color(this.textColor);const r={isSmallText:!0},a=Math.floor((this.size.x-this.padding.x*2)/this.charWidth);let c=this.pos.y+this.padding.y+2;if(a>0){const d=this.text.split(" ");let f="";for(const y of d){const S=f?`${f} ${y}`:y;S.length<=a?f=S:(text(f,this.pos.x+this.padding.x,c,r),c+=this.lineSpacing,f=y)}f&&text(f,this.pos.x+this.padding.x,c,r)}if(this.tailDirection!=="none"){let d,f;const y={},S={};this.tailDirection==="down"?f=this.pos.y+this.size.y+1:(f=this.pos.y-1,y.mirror={y:-1});const b=3;this.tailAlign==="left"?d=this.pos.x+b:this.tailAlign==="center"?d=this.pos.x+this.size.x/2:d=this.pos.x+this.size.x-b,color(this.borderColor),char(this.tailChar,d,f,{...y,...S})}}}let k=null,q=null,Ae=null,De="ongoing",Le="";const ve=9,El=16,Ue=5,Dl=10,Ai=15,Ot=40,me=4,ze=1;let nl=[],sl=[],tl=[],G=1,K=null,W=new Set,il=null;function ir(){K||(K=new tr(5,5,70,20,"",{align:"center",direction:"down"}),K.hide()),G=1,W.clear(),il=null}function xe(i){if(G==="OFF"&&i!=="gameStart")return;let r=null;switch(i){case"gameStart":r=1,W.clear();break;case"handCardSelected":G===1?r=2:G===3&&W.has(3)?r=4:G===4&&W.has(4)&&(r="OFF");break;case"placementSelected":G===2&&!W.has(3)?r=3:G===3&&W.has(3)?r=4:G===4&&W.has(4)&&(r="OFF");break;case"reactionOccurred":G===2&&!W.has(3)&&(r=3);break;case"gameOver":r="OFF";break}r!==null&&r!==G&&(G=r)}function Ei(){if(!K||G===il&&il!==null)return;K.hide();let i="",r=50,a=30,c="center",d="down";if(G==="OFF"){il="OFF";return}switch(G){case 1:W.has(1)||(i="Click a card in your hand to select it as a catalyst.",r=Ai+K.size.x/2+1,a=Ot-K.size.y-2,d="down",c="left");break;case 2:!W.has(2)&&q&&(i="Good! Now click a yellow marker on the field to play it.",r=Ue+ve*6,a=Dl+K.size.y/2+7,d="up",c="left");break;case 3:W.has(3)||(i="Nice! Same rank or suit 3 times removes cards.",r=70,a=30,d="none");break;case 4:W.has(4)||(i="Win by clearing the field. Lose if out of moves/cards.",r=80,a=30,d="none");break}i?(K.setText(i),K.pos.set(r,a),K.setTail(c,d),K.show(),W.add(G)):W.has(G)&&K.hide(),il=G}function nr(i){if(!(!k||De!=="ongoing")){if(input.isJustPressed){let r=!1;for(const a of sl)if(a.containsPoint(input.pos)){r=!0;const c=a.rank.toString()+a.suit.charAt(0);q===c?q=null:q=c,Ae=null,zi(),xe("handCardSelected"),play("tap");break}if(!r&&q&&k){const a=Dl+El/2;for(let c=0;c<=k.field.length;c++){let d;if(c===0?d=Ue-Math.round(me/2)-ze:d=Ue+c*(ve+me)-me/2,input.pos.distanceTo(vec(d,a))<ze+3){r=!0,Ae=c,xe("placementSelected"),play("tap");break}}}if(q&&Ae!==null&&k){const a=k.hand.find(c=>Al(c.rank).toString()+c.suit.toLowerCase().charAt(0)===q);if(a){const c=a.id,d=[...k.hand],f=d.findIndex(A=>A.id===c);play("flip");const y=k.field.length,S=[...k.field],b={type:"PLAY_CATALYST",payload:{catalystCardId:a.id,position:Ae}};if(k=Tl.applyAction(k,b),f!==-1&&k.hand.length>0){const A=new Set(d.map(P=>P.id));A.delete(c);let I,m=-1;for(let P=0;P<k.hand.length;P++){const L=k.hand[P];if(!A.has(L.id)&&L.id!==c){I=L,m=P;break}}if(I&&m!==-1&&m!==f){if(f<k.hand.length){const P=k.hand.splice(m,1)[0];k.hand.splice(f,0,P)}else if(f===k.hand.length&&m<f){const P=k.hand.splice(m,1)[0];k.hand.push(P)}}}if(k&&k.field.length<y){const A=S.filter(m=>k&&!k.field.some(P=>P.id===m.id)),I=nl.filter(m=>nl.indexOf(m)<S.length?A.some(L=>Al(L.rank)===m.rank&&L.suit.toLowerCase().charAt(0)===m.suit.charAt(0)):!1);for(const m of I){const P=new Mt;P.pos=vec(m.pos.x,m.pos.y),P.rank=m.rank,P.suit=m.suit,P.isFaceUp=!0,P.startDisappearAnimation(),tl.push(P)}xe("reactionOccurred"),play("flip")}q=null,Ae=null,Di()}else q=null}}if(k){const r=Tl.checkGameEnd,a=r(k);a.status!=="ONGOING"?(De=a.status.toLowerCase(),De==="win"?(Le="YOU WIN!",play("coin")):Le=`GAME OVER
${a.reason||"No more moves!"}`,xe("gameOver")):k.hand.length===0&&k.deck.length===0&&Tl.getAvailableActions(k).length===0&&(De="lose",Le="GAME OVER\\nNo more cards or moves!",xe("gameOver"))}}}function sr(){if(color("black"),char("k",80,40),ticks||(playBgm(),ir(),xe("gameStart")),!k){k=Tl.setupGame(String(Date.now())),q=null,Ae=null,De="ongoing",Le="",tl=[],Di();return}if(De!=="ongoing"){if(input.isJustPressed&&(k=null),Le){const i=Le.split(`
`),r=6,a=3,c=3,d=2,f=i.length*r,y=r,b=f+d+y+a+c,A=80,I=160,m=60,P=(I-A)/2,L=(m-b)/2;color("black"),rect(P,L,A,b),color("white");let j=L+a;i.forEach(ne=>{text(ne,P+2,j),j+=r}),j+=d,text("[CLICK TO RESTART]",P+2,j,{isSmallText:!0,color:"light_red"})}G!=="OFF"&&(xe("gameOver"),Ei());return}if(nl.forEach(i=>i.update()),sl.forEach(i=>i.update()),tl=tl.filter(i=>(i.update(),i.isMoving)),nr(),Ei(),k){if(nl.forEach(i=>i.draw()),sl.forEach(i=>i.draw()),tl.forEach(i=>i.draw()),q){const i="yellow",r=ze*2,a=Dl+El/2;for(let c=0;c<=k.field.length;c++){let d;c===0?d=Ue-Math.round(me/2)-ze:d=Ue+c*(ve+me)-me/2;const f=d-ze,y=a-ze;color(i),rect(f,y,r,r)}}color("white"),text(`Deck: ${k.deck.length}`,60,Ot+9,{isSmallText:!0}),K&&K.isVisible&&K.draw()}}function Di(){k&&(nl=k.field.map((i,r)=>{const a=new Mt;return a.pos=vec(Ue+ve/2+r*(ve+me),Dl+El/2),a.rank=Al(i.rank),a.suit=i.suit.toLowerCase(),a.isFaceUp=!0,a}),sl=k.hand.map((i,r)=>{const a=new Mt;return a.pos=vec(Ai+ve/2+r*(ve+me),Ot+El/2),a.rank=Al(i.rank),a.suit=i.suit.toLowerCase(),a.isFaceUp=!0,a}),zi())}function zi(){sl.forEach(i=>{const r=i.rank.toString()+i.suit.charAt(0);i.isSelected=r===q})}function Al(i){if(i==="A")return 1;if(i==="K")return 13;if(i==="Q")return 12;if(i==="J")return 11;const r=parseInt(i);return!isNaN(r)&&r>=2&&r<=10?r:0}const rr=["background.png"];init({update:sr,characters:lr.concat(rr),options:{viewSize:{x:160,y:60},isShowingScore:!1,isSoundEnabled:!1,colorPalette:[[45,27,22],[34,26,24],[14,14,17],[67,101,123],[78,90,105],[27,24,21],[240,171,71],[104,96,85],[87,83,89],[94,99,97],[23,26,23],[96,97,94],[152,160,158],[104,108,105],[204,108,105],[252,240,158],[67,201,223],[244,246,245]],audioTempo:120},audioFiles:{bgm:"bgm.mp3",tap:"tap.mp3",flip:"flip.mp3",coin:"coin.mp3"}});
