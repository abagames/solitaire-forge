var Xs=Object.defineProperty;var Ws=(i,r,a)=>r in i?Xs(i,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):i[r]=a;var E=(i,r,a)=>Ws(i,typeof r!="symbol"?r+"":r,a);(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))c(d);new MutationObserver(d=>{for(const f of d)if(f.type==="childList")for(const y of f.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&c(y)}).observe(document,{childList:!0,subtree:!0});function a(d){const f={};return d.integrity&&(f.integrity=d.integrity),d.referrerPolicy&&(f.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?f.credentials="include":d.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function c(d){if(d.ep)return;d.ep=!0;const f=a(d);fetch(d.href,f)}})();var Ei={},Fi;function Ys(){return Fi||(Fi=1,function(i){function r(e,l=0,t=1){return Math.max(l,Math.min(e,t))}function a(e,l,t){const n=t-l,s=e-l;if(s>=0)return s%n+l;{let o=n+s%n+l;return o>=t&&(o-=n),o}}function c(e,l,t){return l<=e&&e<t}function d(e){return[...Array(e).keys()]}function f(e,l){return d(e).map(t=>l(t))}function y(e,l){let t=[];for(let n=0,s=0;n<e.length;s++)l(e[n],s)?(t.push(e[n]),e.splice(n,1)):n++;return t}function b(e){return[...e].reduce((l,[t,n])=>(l[t]=n,l),{})}function S(e){return Object.keys(e).map(l=>[l,e[l]])}function O(e,l){return String.fromCharCode(e.charCodeAt(0)+l)}function I(e){return e.x!=null&&e.y!=null}class p{constructor(l,t){this.x=0,this.y=0,this.set(l,t)}set(l=0,t=0){return I(l)?(this.x=l.x,this.y=l.y,this):(this.x=l,this.y=t,this)}add(l,t){return I(l)?(this.x+=l.x,this.y+=l.y,this):(this.x+=l,this.y+=t,this)}sub(l,t){return I(l)?(this.x-=l.x,this.y-=l.y,this):(this.x-=l,this.y-=t,this)}mul(l){return this.x*=l,this.y*=l,this}div(l){return this.x/=l,this.y/=l,this}clamp(l,t,n,s){return this.x=r(this.x,l,t),this.y=r(this.y,n,s),this}wrap(l,t,n,s){return this.x=a(this.x,l,t),this.y=a(this.y,n,s),this}addWithAngle(l,t){return this.x+=Math.cos(l)*t,this.y+=Math.sin(l)*t,this}swapXy(){const l=this.x;return this.x=this.y,this.y=l,this}normalize(){return this.div(this.length),this}rotate(l){if(l===0)return this;const t=this.x;return this.x=t*Math.cos(l)-this.y*Math.sin(l),this.y=t*Math.sin(l)+this.y*Math.cos(l),this}angleTo(l,t){return I(l)?Math.atan2(l.y-this.y,l.x-this.x):Math.atan2(t-this.y,l-this.x)}distanceTo(l,t){let n,s;return I(l)?(n=l.x-this.x,s=l.y-this.y):(n=l-this.x,s=t-this.y),Math.sqrt(n*n+s*s)}isInRect(l,t,n,s){return c(this.x,l,l+n)&&c(this.y,t,t+s)}equals(l){return this.x===l.x&&this.y===l.y}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}get length(){return Math.sqrt(this.x*this.x+this.y*this.y)}get angle(){return Math.atan2(this.y,this.x)}}const v=["transparent","white","red","green","yellow","blue","purple","cyan","black","light_red","light_green","light_yellow","light_blue","light_purple","light_cyan","light_black"],z="twrgybpclRGYBPCL";let U,ne;const ge=[15658734,15277667,5025616,16761095,4149685,10233776,240116,6381921];function se(e,l){const[t,n,s]=zl(0,e);if(U=b(v.map((o,u)=>{if(u<1)return[o,{r:0,g:0,b:0,a:0}];if(u<9){const[k,x,C]=zl(u-1,e);return[o,{r:k,g:x,b:C,a:1}]}const[g,m,w]=zl(u-9+1,e);return[o,{r:Math.floor(e?g*.5:t-(t-g)*.5),g:Math.floor(e?m*.5:s-(s-m)*.5),b:Math.floor(e?w*.5:n-(n-w)*.5),a:1}]})),e){const o=U.blue;U.white={r:Math.floor(o.r*.15),g:Math.floor(o.g*.15),b:Math.floor(o.b*.15),a:1}}l!=null&&$e(l)}function $e(e){ne=e.map(l=>({r:l[0],g:l[1],b:l[2],a:1}));for(let l=0;l<v.length;l++){let t=1/0,n=-1;for(let s=0;s<ne.length;s++){const o=Li(ne[s],U[v[l]]);o<t&&(t=o,n=s)}U[v[l]]=ne[n]}}function Li(e,l){const t={r:.299,g:.587,b:.114},n=e.r-l.r,s=e.g-l.g,o=e.b-l.b,u=l.r===l.g&&l.g===l.b;let g=Math.sqrt(n*n*t.r+s*s*t.g+o*o*t.b);return u&&!(l.r===0&&l.g===0&&l.b===0)&&(g*=1.5),g}function zl(e,l){l&&(e===0?e=7:e===7&&(e=0));const t=ge[e];return[(t&16711680)>>16,(t&65280)>>8,t&255]}function ke(e,l=1){const t=typeof e=="number"?ne[e]:U[e];return Math.floor(t.r*l)<<16|Math.floor(t.g*l)<<8|Math.floor(t.b*l)}function Pe(e,l=1){const t=typeof e=="number"?ne[e]:U[e],n=Math.floor(t.r*l),s=Math.floor(t.g*l),o=Math.floor(t.b*l);return t.a<1?`rgba(${n},${s},${o},${t.a})`:`rgb(${n},${s},${o})`}const Ui=`
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
`;function $i(e,l){return new PIXI.Filter(void 0,Ui,{width:e,height:l})}const B=new p;let j,re,R,N=new p;const Ft=5;document.createElement("img");let L,Be,je=1,Ll="black",J,It,Me=!1,F,Rt;function Bi(e,l,t,n,s,o,u,g){B.set(e),F=g,Ll=t;const m=`
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
`,k=`
image-rendering: -moz-crisp-edges;
image-rendering: -webkit-optimize-contrast;
image-rendering: -o-crisp-edges;
image-rendering: pixelated;
`;if(document.body.style.cssText=m,N.set(B),F.isUsingPixi){N.mul(Ft);const C=new PIXI.Application({width:N.x,height:N.y});if(j=C.view,R=new PIXI.Graphics,R.scale.x=R.scale.y=Ft,PIXI.settings.SCALE_MODE=PIXI.SCALE_MODES.NEAREST,C.stage.addChild(R),R.filters=[],F.name==="crt"&&R.filters.push(Rt=new PIXI.filters.CRTFilter({vignettingAlpha:.7})),F.name==="pixel"&&R.filters.push($i(N.x,N.y)),F.name==="pixel"||F.name==="shapeDark"){const M=new PIXI.filters.AdvancedBloomFilter({threshold:.1,bloomScale:F.name==="pixel"?1.5:1,brightness:F.name==="pixel"?1.5:1,blur:8});R.filters.push(M)}R.lineStyle(0),j.style.cssText=w}else j=document.createElement("canvas"),j.width=N.x,j.height=N.y,re=j.getContext("2d"),re.imageSmoothingEnabled=!1,j.style.cssText=w+k;document.body.appendChild(j);const x=()=>{const M=innerWidth/innerHeight,T=N.x/N.y,D=M<T,G=D?.95*innerWidth:.95*innerHeight*T,$=D?.95*innerWidth/T:.95*innerHeight;j.style.width=`${G}px`,j.style.height=`${$}px`};if(window.addEventListener("resize",x),x(),n){L=document.createElement("canvas");let C;s?(L.width=N.x,L.height=N.y,C=o):(N.x<=N.y*2?(L.width=N.y*2,L.height=N.y):(L.width=N.x,L.height=N.x/2),L.width>400&&(je=400/L.width,L.width=400,L.height*=je),C=Math.round(400/L.width)),Be=L.getContext("2d"),Be.fillStyle=l,gcc.setOptions({scale:C,capturingFps:60,isSmoothingEnabled:!1,durationSec:u})}}function rl(){if(F.isUsingPixi){R.clear(),R.beginFill(ke(Ll,F.isDarkColor?.15:1)),R.drawRect(0,0,B.x,B.y),R.endFill(),R.beginFill(ke(J)),Me=!0;return}re.fillStyle=Pe(Ll,F.isDarkColor?.15:1),re.fillRect(0,0,B.x,B.y),re.fillStyle=Pe(J)}function ee(e){if(e===J){F.isUsingPixi&&!Me&&ol(ke(J));return}if(J=e,F.isUsingPixi){Me&&R.endFill(),ol(ke(J));return}re.fillStyle=Pe(e)}function ol(e){al(),R.beginFill(e),Me=!0}function al(){Me&&(R.endFill(),Me=!1)}function cl(){It=J}function dl(){ee(It)}function Ee(e,l,t,n){if(F.isUsingPixi){F.name==="shape"||F.name==="shapeDark"?R.drawRoundedRect(e,l,t,n,2):R.drawRect(e,l,t,n);return}re.fillRect(e,l,t,n)}function ji(e,l,t,n,s){const o=ke(J);ol(o),R.drawCircle(e,l,s*.5),R.drawCircle(t,n,s*.5),al(),R.lineStyle(s,o),R.moveTo(e,l),R.lineTo(t,n),R.lineStyle(0)}function Ni(){Rt.time+=.2}function Gi(){if(Be.fillRect(0,0,L.width,L.height),je===1)Be.drawImage(j,(L.width-j.width)/2,(L.height-j.height)/2);else{const e=j.width*je,l=j.height*je;Be.drawImage(j,(L.width-e)/2,(L.height-l)/2,e,l)}gcc.capture(L)}const Ot=[`
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

`],_i=[`
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

`];let Fe,ul;function Hi(){Fe=[],ul=[]}function Tt(){Fe=Fe.concat(ul),ul=[]}function Dt(e){let l={isColliding:{rect:{},text:{},char:{}}};return Fe.forEach(t=>{Ji(e,t)&&(l=Object.assign(Object.assign(Object.assign({},l),Ul(t.collision.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},l.isColliding.rect),t.collision.isColliding.rect),text:Object.assign(Object.assign({},l.isColliding.text),t.collision.isColliding.text),char:Object.assign(Object.assign({},l.isColliding.char),t.collision.isColliding.char)}}))}),l}function Ji(e,l){const t=l.pos.x-e.pos.x,n=l.pos.y-e.pos.y;return-l.size.x<t&&t<e.size.x&&-l.size.y<n&&n<e.size.y}function Ul(e){if(e==null)return{};const l={transparent:"tr",white:"wh",red:"rd",green:"gr",yellow:"yl",blue:"bl",purple:"pr",cyan:"cy",black:"lc"};let t={};return S(e).forEach(([n,s])=>{const o=l[n];s&&o!=null&&(t[o]=!0)}),t}function At(e,l,t,n){return zt(!1,e,l,t,n)}function Ki(e,l,t,n){return zt(!0,e,l,t,n)}function zt(e,l,t,n,s){if(typeof t=="number"){if(typeof n=="number")return oe(l,t,n,Object.assign({isCharacter:e,isCheckingCollision:!0,color:J},s));throw"invalid params"}else return oe(l,t.x,t.y,Object.assign({isCharacter:e,isCheckingCollision:!0,color:J},n))}const Ne=6,Vi=4,le=1,A=Ne*le,Ie=Vi*le;let $l,Bl,fl,jl,Nl=!1,Re,Gl,Ge,hl;const _l={color:"black",backgroundColor:"transparent",rotation:0,mirror:{x:1,y:1},scale:{x:1,y:1},isSmallText:!1,edgeColor:void 0,isCharacter:!1,isCheckingCollision:!1};function Xi(){Re=document.createElement("canvas"),Re.width=Re.height=A,Gl=Re.getContext("2d"),Ge=document.createElement("canvas"),hl=Ge.getContext("2d"),$l=Ot.map((e,l)=>gl(e,String.fromCharCode(33+l),!1)),Bl=_i.map((e,l)=>gl(e,String.fromCharCode(33+l),!1)),fl=Ot.map((e,l)=>gl(e,String.fromCharCode(33+l),!0)),jl={}}function Wi(e,l){const t=l.charCodeAt(0)-33;e.forEach((n,s)=>{fl[t+s]=gl(n,String.fromCharCode(33+t+s),!0)})}function Yi(){Nl=!0}function oe(e,l,t,n={}){const s=$t(n);let o=e,u=l,g=t,m,w={isColliding:{rect:{},text:{},char:{}}};const k=s.isSmallText?Ie:A;for(let x=0;x<o.length;x++){if(x===0){const T=o.charCodeAt(0);if(T<33||T>126)u=Math.floor(u-A/2*s.scale.x),g=Math.floor(g-A/2*s.scale.y);else{const D=T-33,G=s.isCharacter?fl[D]:s.isSmallText?Bl[D]:$l[D];u=Math.floor(u-G.size.x/2*s.scale.x),g=Math.floor(g-G.size.y/2*s.scale.y)}m=u}const C=o[x];if(C===`
`){u=m,g+=A*s.scale.y;continue}const M=qi(C,u,g,s);s.isCheckingCollision&&(w={isColliding:{rect:Object.assign(Object.assign({},w.isColliding.rect),M.isColliding.rect),text:Object.assign(Object.assign({},w.isColliding.text),M.isColliding.text),char:Object.assign(Object.assign({},w.isColliding.char),M.isColliding.char)}}),u+=k*s.scale.x}return w}function qi(e,l,t,n){const s=e.charCodeAt(0);if(s<32||s>126)return{isColliding:{rect:{},text:{},char:{}}};const o=$t(n);if(o.backgroundColor!=="transparent"){const $=o.isSmallText?Ie:A,Rl=o.isSmallText?2:1;cl(),ee(o.backgroundColor),Ee(l+Rl,t,$*o.scale.x,A*o.scale.y),dl()}if(s<=32)return{isColliding:{rect:{},text:{},char:{}}};const u=s-33,g=o.isCharacter?fl[u]:o.isSmallText?Bl[u]:$l[u],m=a(o.rotation,0,4);if(o.color==="black"&&m===0&&o.mirror.x===1&&o.mirror.y===1&&o.edgeColor==null&&(!F.isUsingPixi||o.scale.x===1&&o.scale.y===1))return Hl(g,l,t,o.scale,o.isCheckingCollision,!0);const w=JSON.stringify({c:e,options:o}),k=jl[w];if(k!=null)return Hl(k,l,t,o.scale,o.isCheckingCollision,o.color!=="transparent");let x=!1;const C=new p(A,A);let M=Re,T=Gl;if(g.size.x>A||g.size.y>A){if(m===0||m===2)C.set(g.size.x,g.size.y);else{const $=Math.max(g.size.x,g.size.y);C.set($,$)}M=document.createElement("canvas"),M.width=C.x,M.height=C.y,T=M.getContext("2d"),T.imageSmoothingEnabled=!1}F.isUsingPixi&&(o.scale.x!==1||o.scale.y!==1)&&(Ge.width=C.x*o.scale.x,Ge.height=C.y*o.scale.y,hl.imageSmoothingEnabled=!1,hl.scale(o.scale.x,o.scale.y),Lt(hl,m,o,g.image,C),x=!0),T.clearRect(0,0,C.x,C.y),Lt(T,m,o,g.image,C);const D=Jl(T,C,e,o.isCharacter);o.edgeColor!=null&&(M=Qi(T,C,o.edgeColor),C.x+=2,C.y+=2);let G;if(Nl||F.isUsingPixi){const $=document.createElement("img");if($.src=M.toDataURL(),F.isUsingPixi){const Rl=document.createElement("img");Rl.src=(x?Ge:M).toDataURL(),G=PIXI.Texture.from(Rl)}Nl&&(jl[w]={image:$,texture:G,hitBox:D,size:C})}return Hl({image:M,texture:G,hitBox:D,size:C},l,t,o.scale,o.isCheckingCollision,o.color!=="transparent")}function Qi(e,l,t){const n=l.x+2,s=l.y+2,o=[[0,-1],[1,0],[0,1],[-1,0]],u=document.createElement("canvas");u.width=n,u.height=s;const g=u.getContext("2d");g.imageSmoothingEnabled=!1,g.drawImage(e.canvas,1,1);const w=g.getImageData(0,0,n,s).data;g.fillStyle=Pe(t);for(let k=0;k<s;k++)for(let x=0;x<n;x++){const C=(k*n+x)*4;if(w[C+3]===0)for(const[M,T]of o){const D=x+M,G=k+T;if(D>=0&&D<n&&G>=0&&G<s){const $=(G*n+D)*4;if(w[$+3]>0){g.fillRect(x,k,1,1);break}}}}return u}function Lt(e,l,t,n,s){l===0&&t.mirror.x===1&&t.mirror.y===1?e.drawImage(n,0,0):(e.save(),e.translate(s.x/2,s.y/2),e.rotate(Math.PI/2*l),(t.mirror.x===-1||t.mirror.y===-1)&&e.scale(t.mirror.x,t.mirror.y),e.drawImage(n,-s.x/2,-s.y/2),e.restore()),t.color!=="black"&&(e.globalCompositeOperation="source-in",e.fillStyle=Pe(t.color==="transparent"?"black":t.color),e.fillRect(0,0,s.x,s.y),e.globalCompositeOperation="source-over")}function Hl(e,l,t,n,s,o){if(o&&(n.x===1&&n.y===1?Ut(e,l,t):Ut(e,l,t,e.size.x*n.x,e.size.y*n.y)),!s)return;const u={pos:{x:l+e.hitBox.pos.x*n.x,y:t+e.hitBox.pos.y*n.y},size:{x:e.hitBox.size.x*n.x,y:e.hitBox.size.y*n.y},collision:e.hitBox.collision},g=Dt(u);return o&&Fe.push(u),g}function Ut(e,l,t,n,s){if(F.isUsingPixi){al(),R.beginTextureFill({texture:e.texture,matrix:new PIXI.Matrix().translate(l,t)}),R.drawRect(l,t,n??e.size.x,s??e.size.y),ol(ke(J));return}n==null?re.drawImage(e.image,l,t):re.drawImage(e.image,l,t,n,s)}function gl(e,l,t){if(e.indexOf(".")>=0||e.indexOf("data:image/")==0)return Zi(e,l);let n=e.split(`
`);n=n.slice(1,n.length-1);let s=0;n.forEach(M=>{s=Math.max(M.length,s)});const o=Math.max(Math.ceil((Ne-s)/2),0),u=n.length,g=Math.max(Math.ceil((Ne-u)/2),0),m=new p(Math.max(Ne,s)*le,Math.max(Ne,u)*le);let w=Re,k=Gl;(m.x>A||m.y>A)&&(w=document.createElement("canvas"),w.width=m.x,w.height=m.y,k=w.getContext("2d"),k.imageSmoothingEnabled=!1),k.clearRect(0,0,m.x,m.y),n.forEach((M,T)=>{for(let D=0;D<s;D++){const G=M.charAt(D);let $=z.indexOf(G);G!==""&&$>=1&&(k.fillStyle=Pe(v[$]),k.fillRect((D+o)*le,(T+g)*le,le,le))}});const x=document.createElement("img");x.src=w.toDataURL();const C=Jl(k,m,l,t);return F.isUsingPixi?{image:x,texture:PIXI.Texture.from(x),size:m,hitBox:C}:{image:x,size:m,hitBox:C}}function Zi(e,l){const t=document.createElement("img");t.src=e;const n=new p,s={pos:new p,size:new p,collision:{isColliding:{char:{},text:{}}}};let o;return F.isUsingPixi?o={image:t,texture:PIXI.Texture.from(t),size:new p,hitBox:s}:o={image:t,size:n,hitBox:s},t.onload=()=>{o.size.set(t.width*le,t.height*le);const u=document.createElement("canvas");u.width=o.size.x,u.height=o.size.y;const g=u.getContext("2d");g.imageSmoothingEnabled=!1,g.drawImage(t,0,0,o.size.x,o.size.y);const m=document.createElement("img");m.src=u.toDataURL(),o.image=m,o.hitBox=Jl(g,o.size,l,!0),F.isUsingPixi&&(o.texture=PIXI.Texture.from(m))},o}function Jl(e,l,t,n){const s={pos:new p(A,A),size:new p,collision:{isColliding:{char:{},text:{}}}};n?s.collision.isColliding.char[t]=!0:s.collision.isColliding.text[t]=!0;const o=e.getImageData(0,0,l.x,l.y).data;let u=0;for(let g=0;g<l.y;g++)for(let m=0;m<l.x;m++)o[u+3]>0&&(m<s.pos.x&&(s.pos.x=m),g<s.pos.y&&(s.pos.y=g)),u+=4;u=0;for(let g=0;g<l.y;g++)for(let m=0;m<l.x;m++)o[u+3]>0&&(m>s.pos.x+s.size.x-1&&(s.size.x=m-s.pos.x+1),g>s.pos.y+s.size.y-1&&(s.size.y=g-s.pos.y+1)),u+=4;return s}function $t(e){let l=Object.assign(Object.assign({},_l),e);return e.scale!=null&&(l.scale=Object.assign(Object.assign({},_l.scale),e.scale)),e.mirror!=null&&(l.mirror=Object.assign(Object.assign({},_l.mirror),e.mirror)),l}let Oe=!1,ml=!1,Kl=!1;const Bt=["Escape","Digit0","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Minus","Equal","Backspace","Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Enter","ControlLeft","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Backquote","ShiftLeft","Backslash","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ShiftRight","NumpadMultiply","AltLeft","Space","CapsLock","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","Pause","ScrollLock","Numpad7","Numpad8","Numpad9","NumpadSubtract","Numpad4","Numpad5","Numpad6","NumpadAdd","Numpad1","Numpad2","Numpad3","Numpad0","NumpadDecimal","IntlBackslash","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","IntlYen","Undo","Paste","MediaTrackPrevious","Cut","Copy","MediaTrackNext","NumpadEnter","ControlRight","LaunchMail","AudioVolumeMute","MediaPlayPause","MediaStop","Eject","AudioVolumeDown","AudioVolumeUp","BrowserHome","NumpadDivide","PrintScreen","AltRight","Help","NumLock","Pause","Home","ArrowUp","PageUp","ArrowLeft","ArrowRight","End","ArrowDown","PageDown","Insert","Delete","OSLeft","OSRight","ContextMenu","BrowserSearch","BrowserFavorites","BrowserRefresh","BrowserStop","BrowserForward","BrowserBack"];let Vl;const en={onKeyDown:void 0};let Xl,Wl=!1,Yl=!1,ql=!1,Ql={},Zl={},et={};function jt(e){Xl=Object.assign(Object.assign({},en),e),Vl=b(Bt.map(l=>[l,{isPressed:!1,isJustPressed:!1,isJustReleased:!1}])),document.addEventListener("keydown",l=>{Wl=Yl=!0,Ql[l.code]=Zl[l.code]=!0,Xl.onKeyDown!=null&&Xl.onKeyDown(),(l.code==="AltLeft"||l.code==="AltRight"||l.code==="ArrowRight"||l.code==="ArrowDown"||l.code==="ArrowLeft"||l.code==="ArrowUp")&&l.preventDefault()}),document.addEventListener("keyup",l=>{Wl=!1,ql=!0,Ql[l.code]=!1,et[l.code]=!0})}function Nt(){ml=!Oe&&Yl,Kl=Oe&&ql,Yl=ql=!1,Oe=Wl,S(Vl).forEach(([e,l])=>{l.isJustPressed=!l.isPressed&&Zl[e],l.isJustReleased=l.isPressed&&et[e],l.isPressed=!!Ql[e]}),Zl={},et={}}function Gt(){ml=!1,Oe=!0}var ln=Object.freeze({__proto__:null,get isPressed(){return Oe},get isJustPressed(){return ml},get isJustReleased(){return Kl},codes:Bt,get code(){return Vl},init:jt,update:Nt,clearJustPressed:Gt});class pl{constructor(l=null){this.setSeed(l)}get(l=1,t){return t==null&&(t=l,l=0),this.next()/4294967295*(t-l)+l}getInt(l,t){t==null&&(t=l,l=0);const n=Math.floor(l),s=Math.floor(t);return s===n?n:this.next()%(s-n)+n}getPlusOrMinus(){return this.getInt(2)*2-1}select(l){return l[this.getInt(l.length)]}setSeed(l,t=123456789,n=362436069,s=521288629,o=32){this.w=l!=null?l>>>0:Math.floor(Math.random()*4294967295)>>>0,this.x=t>>>0,this.y=n>>>0,this.z=s>>>0;for(let u=0;u<o;u++)this.next();return this}getState(){return{x:this.x,y:this.y,z:this.z,w:this.w}}next(){const l=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^(l^l>>>8))>>>0,this.w}}const _e=new p;let ae=!1,Te=!1,He=!1,tn={isDebugMode:!1,anchor:new p,padding:new p,onPointerDownOrUp:void 0},V,Q,H;const Je=new pl,ye=new p,ce=new p;let Ke=!1,Ve=new p,lt=!1,tt=!1,it=!1;function _t(e,l,t){H=Object.assign(Object.assign({},tn),t),V=e,Q=new p(l.x+H.padding.x*2,l.y+H.padding.y*2),Ve.set(V.offsetLeft+V.clientWidth*(.5-H.anchor.x),V.offsetTop+V.clientWidth*(.5-H.anchor.y)),H.isDebugMode&&ye.set(V.offsetLeft+V.clientWidth*(.5-H.anchor.x),V.offsetTop+V.clientWidth*(.5-H.anchor.y)),document.addEventListener("mousedown",n=>{Kt(n.pageX,n.pageY)}),document.addEventListener("touchstart",n=>{Kt(n.touches[0].pageX,n.touches[0].pageY)}),document.addEventListener("mousemove",n=>{Vt(n.pageX,n.pageY)}),document.addEventListener("touchmove",n=>{n.preventDefault(),Vt(n.touches[0].pageX,n.touches[0].pageY)},{passive:!1}),document.addEventListener("mouseup",n=>{Xt()}),document.addEventListener("touchend",n=>{n.preventDefault(),n.target.click(),Xt()},{passive:!1})}function Ht(){nn(Ve.x,Ve.y,_e),H.isDebugMode&&!_e.isInRect(0,0,Q.x,Q.y)?(sn(),_e.set(ye),Te=!ae&&Ke,He=ae&&!Ke,ae=Ke):(Te=!ae&&tt,He=ae&&it,ae=lt),tt=it=!1}function Jt(){Te=!1,ae=!0}function nn(e,l,t){V!=null&&(t.x=Math.round(((e-V.offsetLeft)/V.clientWidth+H.anchor.x)*Q.x-H.padding.x),t.y=Math.round(((l-V.offsetTop)/V.clientHeight+H.anchor.y)*Q.y-H.padding.y))}function sn(){ce.length>0?(ye.add(ce),!c(ye.x,-Q.x*.1,Q.x*1.1)&&ye.x*ce.x>0&&(ce.x*=-1),!c(ye.y,-Q.y*.1,Q.y*1.1)&&ye.y*ce.y>0&&(ce.y*=-1),Je.get()<.05&&ce.set(0)):Je.get()<.1&&(ce.set(0),ce.addWithAngle(Je.get(Math.PI*2),(Q.x+Q.y)*Je.get(.01,.03))),Je.get()<.05&&(Ke=!Ke)}function Kt(e,l){Ve.set(e,l),lt=tt=!0,H.onPointerDownOrUp!=null&&H.onPointerDownOrUp()}function Vt(e,l){Ve.set(e,l)}function Xt(e){lt=!1,it=!0,H.onPointerDownOrUp!=null&&H.onPointerDownOrUp()}var rn=Object.freeze({__proto__:null,pos:_e,get isPressed(){return ae},get isJustPressed(){return Te},get isJustReleased(){return He},init:_t,update:Ht,clearJustPressed:Jt});let de=new p,ue=!1,te=!1,me=!1;function Wt(e){jt({onKeyDown:e}),_t(j,B,{onPointerDownOrUp:e,anchor:new p(.5,.5)})}function Yt(){Nt(),Ht(),de=_e,ue=Oe||ae,te=ml||Te,me=Kl||He}function qt(){Gt(),Jt()}function Xe(e){de.set(e.pos),ue=e.isPressed,te=e.isJustPressed,me=e.isJustReleased}var on=Object.freeze({__proto__:null,get pos(){return de},get isPressed(){return ue},get isJustPressed(){return te},get isJustReleased(){return me},init:Wt,update:Yt,clearJustPressed:qt,set:Xe});let X,We,nt=!1,Qt,Zt,st,fe={};function ei(e,l=1){const t=fe[e];return t==null?!1:(t.gainNode.gain.value=l,t.isPlaying=!0,!0)}function an(){const e=X.currentTime;for(const l in fe){const t=fe[l];if(!t.isReady||!t.isPlaying)continue;t.isPlaying=!1;const n=yn(e);(t.playedTime==null||n>t.playedTime)&&(gn(t,n),t.playedTime=n)}}function li(e,l=void 0){const t=fe[e];t.source!=null&&(l==null?t.source.stop():t.source.stop(l),t.source=void 0)}function cn(e=void 0){if(fe){for(const l in fe)li(l,e);fe={}}}function dn(){X=new(window.AudioContext||window.webkitAudioContext),document.addEventListener("visibilitychange",()=>{document.hidden?X.suspend():X.resume()})}function un(){nt=!0,We=X.createGain(),We.connect(X.destination),ti(),hn(),ii()}function fn(e,l){return fe[e]=mn(l),fe[e]}function ti(e=120){Qt=e,Zt=60/Qt}function hn(e=8){st=e>0?4/e:void 0}function ii(e=.1){We.gain.value=e}function gn(e,l){const t=X.createBufferSource();e.source=t,t.buffer=e.buffer,t.loop=e.isLooping,t.start=t.start||t.noteOn,t.connect(e.gainNode),t.start(l)}function mn(e){const l={buffer:void 0,source:void 0,gainNode:X.createGain(),isPlaying:!1,playedTime:void 0,isReady:!1,isLooping:!1};return l.gainNode.connect(We),pn(e).then(t=>{l.buffer=t,l.isReady=!0}),l}async function pn(e){const t=await(await fetch(e)).arrayBuffer();return await X.decodeAudioData(t)}function yn(e){if(st==null)return e;const l=Zt*st;return l>0?Math.ceil(e/l)*l:e}let ni,si;const ri=68,rt=1e3/ri;let Ye=0;const wn={viewSize:{x:100,y:100},bodyBackground:"#111",viewBackground:"black",isCapturing:!1,isCapturingGameCanvasOnly:!1,isSoundEnabled:!0,captureCanvasScale:1,theme:{name:"simple",isUsingPixi:!1,isDarkColor:!1},colorPalette:void 0};let Y,oi=10,yl;function Cn(e,l,t){ni=e,si=l,Y=Object.assign(Object.assign({},wn),t),se(Y.theme.isDarkColor,Y.colorPalette),Bi(Y.viewSize,Y.bodyBackground,Y.viewBackground,Y.isCapturing,Y.isCapturingGameCanvasOnly,Y.captureCanvasScale,Y.captureDurationSec,Y.theme),Wt(()=>{X.resume()}),Xi(),ni(),ai()}function ai(){yl=requestAnimationFrame(ai);const e=window.performance.now();e<Ye-ri/12||(Ye+=rt,(Ye<e||Ye>e+rt*2)&&(Ye=e+rt),nt&&an(),Y.isSoundEnabled&&sss.update(),Yt(),si(),Y.isCapturing&&Gi(),oi--,oi===0&&Yi())}function bn(){yl&&(cancelAnimationFrame(yl),yl=void 0)}let wl;const Cl=new pl;function ot(){wl=[]}function ci(e,l=16,t=1,n=0,s=Math.PI*2,o=void 0){if(l<1){if(Cl.get()>l)return;l=1}for(let u=0;u<l;u++){const g=n+Cl.get(s)-s/2,m={pos:new p(e),vel:new p(t*Cl.get(.5,1),0).rotate(g),color:J,ticks:r(Cl.get(10,20)*Math.sqrt(Math.abs(t)),10,60),edgeColor:o};wl.push(m)}}function bl(){cl(),wl=wl.filter(e=>{if(e.ticks--,e.ticks<0)return!1;e.pos.add(e.vel),e.vel.mul(.98);const l=Math.floor(e.pos.x),t=Math.floor(e.pos.y);return e.edgeColor!=null&&(ee(e.edgeColor),Ee(l-1,t-1,3,3)),ee(e.color),Ee(l,t,1,1),!0}),dl()}function at(e,l,t,n){return di(!1,e,l,t,n)}function Sn(e,l,t,n){return di(!0,e,l,t,n)}function xn(e,l,t,n,s=.5,o=.5){typeof e!="number"&&(o=s,s=n,n=t,t=l,l=e.y,e=e.x);const u=new p(t).rotate(s),g=new p(e-u.x*o,l-u.y*o);return ct(g,u,n)}function vn(e,l,t=3,n=3,s=3){const o=new p,u=new p;if(typeof e=="number")if(typeof l=="number")typeof t=="number"?(o.set(e,l),u.set(t,n)):(o.set(e,l),u.set(t),s=n);else throw"invalid params";else if(typeof l=="number")if(typeof t=="number")o.set(e),u.set(l,t),s=n;else throw"invalid params";else if(typeof t=="number")o.set(e),u.set(l),s=t;else throw"invalid params";return ct(o,u.sub(o),s)}function kn(e,l,t,n,s,o){let u=new p;typeof e=="number"?u.set(e,l):(u.set(e),o=s,s=n,n=t,t=l),n==null&&(n=3),s==null&&(s=0),o==null&&(o=Math.PI*2);let g,m;if(s>o?(g=o,m=s-o):(g=s,m=o-s),m=r(m,0,Math.PI*2),m<.01)return;const w=r(Math.ceil(m*Math.sqrt(t*.25)),1,36),k=m/w;let x=g,C=new p(t).rotate(x).add(u),M=new p,T=new p,D={isColliding:{rect:{},text:{},char:{}}};for(let G=0;G<w;G++){x+=k,M.set(t).rotate(x).add(u),T.set(M).sub(C);const $=ct(C,T,n,!0);D=Object.assign(Object.assign(Object.assign({},D),Ul($.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},D.isColliding.rect),$.isColliding.rect),text:Object.assign(Object.assign({},D.isColliding.text),$.isColliding.text),char:Object.assign(Object.assign({},D.isColliding.char),$.isColliding.char)}}),C.set(M)}return Tt(),D}function di(e,l,t,n,s){if(typeof l=="number"){if(typeof t=="number")return typeof n=="number"?s==null?we(e,l,t,n,n):we(e,l,t,n,s):we(e,l,t,n.x,n.y);throw"invalid params"}else if(typeof t=="number"){if(n==null)return we(e,l.x,l.y,t,t);if(typeof n=="number")return we(e,l.x,l.y,t,n);throw"invalid params"}else return we(e,l.x,l.y,t.x,t.y)}function ct(e,l,t,n=!1){let s=!0;(F.name==="shape"||F.name==="shapeDark")&&(J!=="transparent"&&ji(e.x,e.y,e.x+l.x,e.y+l.y,t),s=!1);const o=Math.floor(r(t,3,10)),u=Math.abs(l.x),g=Math.abs(l.y),m=r(Math.ceil(u>g?u/o:g/o)+1,3,99);l.div(m-1);let w={isColliding:{rect:{},text:{},char:{}}};for(let k=0;k<m;k++){const x=we(!0,e.x,e.y,t,t,!0,s);w=Object.assign(Object.assign(Object.assign({},w),Ul(x.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},w.isColliding.rect),x.isColliding.rect),text:Object.assign(Object.assign({},w.isColliding.text),x.isColliding.text),char:Object.assign(Object.assign({},w.isColliding.char),x.isColliding.char)}}),e.add(l)}return n||Tt(),w}function we(e,l,t,n,s,o=!1,u=!0){let g=u;(F.name==="shape"||F.name==="shapeDark")&&g&&J!=="transparent"&&(e?Ee(l-n/2,t-s/2,n,s):Ee(l,t,n,s),g=!1);let m=e?{x:Math.floor(l-n/2),y:Math.floor(t-s/2)}:{x:Math.floor(l),y:Math.floor(t)};const w={x:Math.trunc(n),y:Math.trunc(s)};if(w.x===0||w.y===0)return{isColliding:{rect:{},text:{},char:{}}};w.x<0&&(m.x+=w.x,w.x*=-1),w.y<0&&(m.y+=w.y,w.y*=-1);const k={pos:m,size:w,collision:{isColliding:{rect:{}}}};k.collision.isColliding.rect[J]=!0;const x=Dt(k);return J!=="transparent"&&((o?ul:Fe).push(k),g&&Ee(m.x,m.y,w.x,w.y)),x}function dt({pos:e,size:l,text:t,isToggle:n=!1,onClick:s=()=>{},isSmallText:o=!0}){return{pos:e,size:l,text:t,isToggle:n,onClick:s,isPressed:!1,isSelected:!1,isHovered:!1,toggleGroup:[],isSmallText:o}}function ut(e){const l=new p(de).sub(e.pos);e.isHovered=l.isInRect(0,0,e.size.x,e.size.y),e.isHovered&&Te&&(e.isPressed=!0),e.isPressed&&!e.isHovered&&(e.isPressed=!1),e.isPressed&&He&&(e.onClick(),e.isPressed=!1,e.isToggle&&(e.toggleGroup.length===0?e.isSelected=!e.isSelected:(e.toggleGroup.forEach(t=>{t.isSelected=!1}),e.isSelected=!0))),Sl(e)}function Sl(e){cl(),ee(e.isPressed?"blue":"light_blue"),at(e.pos.x,e.pos.y,e.size.x,e.size.y),e.isToggle&&!e.isSelected&&(ee("white"),at(e.pos.x+1,e.pos.y+1,e.size.x-2,e.size.y-2)),ee(e.isHovered?"black":"blue"),At(e.text,e.pos.x+3,e.pos.y+3,{isSmallText:e.isSmallText}),dl()}let ie,qe,Ce,ft;function Pn(e){ie={randomSeed:e,inputs:[]}}function Mn(e){ie.inputs.push(e)}function ui(){return ie!=null}function En(e){qe=0,e.setSeed(ie.randomSeed)}function Fn(){qe>=ie.inputs.length||(Xe(ie.inputs[qe]),qe++)}function In(){Ce=[]}function Rn(e,l,t){Ce.push({randomState:t.getState(),gameState:cloneDeep(e),baseState:cloneDeep(l)})}function On(e){const l=Ce.pop(),t=l.randomState;return e.setSeed(t.w,t.x,t.y,t.z,0),ft={pos:new p(de),isPressed:ue,isJustPressed:te,isJustReleased:me},Xe(ie.inputs.pop()),l}function Tn(e){const l=Ce[Ce.length-1],t=l.randomState;return e.setSeed(t.w,t.x,t.y,t.z,0),ft={pos:new p(de),isPressed:ue,isJustPressed:te,isJustReleased:me},Xe(ie.inputs[ie.inputs.length-1]),l}function Dn(){Xe(ft)}function An(){return Ce.length===0}function zn(){const e=qe-1;if(!(e>=ie.inputs.length))return Ce[e]}const ht=4,Ln=60,Un="video/webm;codecs=vp8,opus",$n="video/webm",Bn="recording.webm",jn=1e5*ht,Nn=.7;let Z,xl;function Gn(e,l,t){if(Z!=null)return;const n=document.createElement("canvas");n.width=e.width*ht,n.height=e.height*ht;const s=n.getContext("2d");s.imageSmoothingEnabled=!1;const o=()=>{s.drawImage(e,0,0,e.width,e.height,0,0,n.width,n.height),xl=requestAnimationFrame(o)};o();const u=n.captureStream(Ln),g=l.createMediaStreamDestination(),m=l.createGain();m.gain.value=Nn,t.forEach(C=>{C!=null&&C.connect(m)}),m.connect(g);const w=g.stream,k=new MediaStream([...u.getVideoTracks(),...w.getAudioTracks()]);Z=new MediaRecorder(k,{mimeType:Un,videoBitsPerSecond:jn});let x=[];Z.ondataavailable=C=>{C.data.size>0&&x.push(C.data)},Z.onstop=()=>{const C=new Blob(x,{type:$n}),M=URL.createObjectURL(C),T=document.createElement("a");T.href=M,T.download=Bn,T.click(),URL.revokeObjectURL(M),x=[]},Z.start()}function _n(){Z!=null&&Z.state!=="inactive"&&(Z.stop(),Z=void 0),xl&&(cancelAnimationFrame(xl),xl=void 0)}function Hn(){return Z!=null&&Z.state==="recording"}const Jn=Math.PI,Kn=Math.abs,Vn=Math.sin,Xn=Math.cos,Wn=Math.atan2,Yn=Math.sqrt,qn=Math.pow,Qn=Math.floor,Zn=Math.round,es=Math.ceil;i.ticks=0,i.difficulty=void 0,i.score=0,i.time=void 0,i.isReplaying=!1;function ls(e=1,l){return he.get(e,l)}function ts(e=2,l){return he.getInt(e,l)}function is(e=1,l){return he.get(e,l)*he.getPlusOrMinus()}function gt(e="GAME OVER"){El=e,h.isShowingTime&&(i.time=void 0),bi()}function ns(e="COMPLETE"){El=e,bi()}function ss(e,l,t){if(i.isReplaying||(i.score+=e,l==null))return;const n=`${e>=1?"+":""}${Math.floor(e)}`;let s=new p;typeof l=="number"?s.set(l,t):s.set(l),s.x-=n.length*(h.isUsingSmallText?Ie:A)/2,s.y-=A/2,Pl.push({str:n,pos:s,vy:-2,ticks:30})}function fi(e){ee(e)}function rs(e,l,t,n,s,o){let u=new p;typeof e=="number"?(u.set(e,l),g(u,t,n,s,o)):(u.set(e),g(u,l,t,n,s));function g(m,w,k,x,C){if(ks(w)){const M=w;ci(m,M.count,M.speed,M.angle,M.angleWidth,M.edgeColor)}else ci(m,w,k,x,C)}}function hi(e,l){return new p(e,l)}function gi(e,l){!el&&!Se&&(nt&&ei(e,l!=null&&l.volume!=null?l.volume:1)||(h.isSoundEnabled&&typeof sss.playSoundEffect=="function"?sss.playSoundEffect(e,l):h.isSoundEnabled&&sss.play(cs[e])))}let mt;function pt(){bt&&ei(h.bgmName,h.bgmVolume)||(typeof sss.generateMml=="function"?mt=sss.playMml(sss.generateMml(),{volume:h.bgmVolume}):sss.playBgm())}function yt(){bt?li(h.bgmName):mt!=null?sss.stopMml(mt):sss.stopBgm()}function mi(){Gn(j,X,[We,Il])}function wt(){_n()}function os(e){if(el){const l=Tn(he),t=l.baseState;return i.score=t.score,i.ticks=t.ticks,cloneDeep(l.gameState)}else if(Se){const l=On(he),t=l.baseState;return i.score=t.score,i.ticks=t.ticks,l.gameState}else{if(i.isReplaying)return zn().gameState;if(be==="inGame"){const l={score:i.score,ticks:i.ticks};Rn(e,l,he)}}return e}function as(){Se||(!i.isReplaying&&h.isRewindEnabled?Cs():gt())}const cs={coin:"c",laser:"l",explosion:"e",powerUp:"p",hit:"h",jump:"j",select:"s",lucky:"u",random:"r",click:"i",synth:"y",tone:"t"},pi={isPlayingBgm:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,captureCanvasScale:1,captureDurationSec:5,isShowingScore:!0,isShowingTime:!1,isReplayEnabled:!1,isRewindEnabled:!1,isDrawingParticleFront:!1,isDrawingScoreFront:!1,isUsingSmallText:!0,isMinifying:!1,isSoundEnabled:!0,viewSize:{x:100,y:100},audioSeed:0,seed:0,audioVolume:1,theme:"simple",colorPalette:void 0,textEdgeColor:{score:void 0,floatingScore:void 0,title:void 0,description:void 0,gameOver:void 0},bgmName:"bgm",bgmVolume:1,audioTempo:120,isRecording:!1},ds=new pl,he=new pl;let be,us={title:ys,inGame:ps,gameOver:ws,rewind:bs},Qe=0,vl,kl=!0,Ze=0,h,yi,Pl,el=!1,Se=!1,ll,Ml,El,Ct,Fl,Il,bt=!1;function fs(e){window.update=e.update,window.title=e.title,window.description=e.description,window.characters=e.characters,window.options=e.options,window.audioFiles=e.audioFiles,wi()}function wi(){typeof options<"u"&&options!=null?h=Object.assign(Object.assign({},pi),options):h=pi;const e={name:h.theme,isUsingPixi:!1,isDarkColor:!1};h.theme!=="simple"&&h.theme!=="dark"&&(e.isUsingPixi=!0),(h.theme==="pixel"||h.theme==="shapeDark"||h.theme==="crt"||h.theme==="dark")&&(e.isDarkColor=!0),Ze=h.audioSeed+h.seed,h.isMinifying&&Ms(),yi={viewSize:h.viewSize,bodyBackground:e.isDarkColor?"#101010":"#e0e0e0",viewBackground:e.isDarkColor?"blue":"white",theme:e,isSoundEnabled:h.isSoundEnabled,isCapturing:h.isCapturing,isCapturingGameCanvasOnly:h.isCapturingGameCanvasOnly,captureCanvasScale:h.captureCanvasScale,captureDurationSec:h.captureDurationSec,colorPalette:h.colorPalette},Cn(gs,ms,yi)}function hs(){bn(),wt(),cn(),window.update=void 0,window.title=void 0,window.description=void 0,window.characters=void 0,window.options=void 0,window.audioFiles=void 0}function gs(){if(typeof description<"u"&&description!=null&&description.trim().length>0&&(kl=!1,Ze+=Pi(description)),typeof title<"u"&&title!=null&&title.trim().length>0&&(kl=!1,document.title=title,Ze+=Pi(title),Fl=`crisp-game-${encodeURIComponent(title)}-${Ze}`,Qe=vs()),typeof characters<"u"&&characters!=null&&Wi(characters,"a"),dn(),typeof audioFiles<"u"&&audioFiles!=null){un(),ii(.1*h.audioVolume),ti(h.audioTempo);for(let e in audioFiles){const l=fn(e,audioFiles[e]);e===h.bgmName&&(l.isLooping=!0,bt=!0)}}h.isSoundEnabled&&(Il=X.createGain(),Il.connect(X.destination),sss.init(Ze,X,Il),sss.setVolume(.1*h.audioVolume),sss.setTempo(h.audioTempo)),ee("black"),kl?(St(),i.ticks=0):Ci()}function ms(){i.df=i.difficulty=i.ticks/3600+1,i.tc=i.ticks;const e=i.score,l=i.time;i.sc=i.score;const t=i.sc;i.inp={p:de,ip:ue,ijp:te,ijr:me},Hi(),us[be](),F.isUsingPixi&&(al(),F.name==="crt"&&Ni()),i.ticks++,i.isReplaying?(i.score=e,i.time=l):i.sc!==t&&(i.score=i.sc)}function St(){be="inGame",i.ticks=-1,ot();const e=Math.floor(i.score);e>Qe&&(Qe=e),h.isShowingTime&&i.time!=null&&(vl==null||vl>i.time)&&(vl=i.time),i.score=0,i.time=0,Pl=[],h.isPlayingBgm&&h.isSoundEnabled&&pt();const l=ds.getInt(999999999);he.setSeed(l),(h.isReplayEnabled||h.isRewindEnabled)&&(Pn(l),In(),i.isReplaying=!1)}function ps(){rl(),h.isDrawingParticleFront||bl(),h.isDrawingScoreFront||ki(),(h.isReplayEnabled||h.isRewindEnabled)&&Mn({pos:hi(de),isPressed:ue,isJustPressed:te,isJustReleased:me}),typeof update=="function"&&update(),h.isDrawingParticleFront&&bl(),h.isDrawingScoreFront&&ki(),xt(),h.isShowingTime&&i.time!=null&&i.time++,h.isRecording&&!Hn()&&mi()}function Ci(){be="title",i.ticks=-1,ot(),rl(),ui()&&(En(he),i.isReplaying=!0)}function ys(){if(te){St();return}if(rl(),h.isReplayEnabled&&ui()&&(Fn(),i.inp={p:de,ip:ue,ijp:te,ijr:me},h.isDrawingParticleFront||bl(),update(),h.isDrawingParticleFront&&bl()),xt(),typeof title<"u"&&title!=null){let e=0;title.split(`
`).forEach(t=>{t.length>e&&(e=t.length)});const l=Math.floor((B.x-e*A)/2);title.split(`
`).forEach((t,n)=>{oe(t,l,Math.floor(B.y*.25)+n*A,{edgeColor:h.textEdgeColor.title})})}if(typeof description<"u"&&description!=null){let e=0;description.split(`
`).forEach(n=>{n.length>e&&(e=n.length)});const l=h.isUsingSmallText?Ie:A,t=Math.floor((B.x-e*l)/2);description.split(`
`).forEach((n,s)=>{oe(n,t,Math.floor(B.y/2)+s*A,{isSmallText:h.isUsingSmallText,edgeColor:h.textEdgeColor.description})})}}function bi(){be="gameOver",i.isReplaying||qt(),i.ticks=-1,xi(),h.isPlayingBgm&&h.isSoundEnabled&&yt();const e=Math.floor(i.score);e>Qe&&xs(e)}function ws(){i.ticks===0&&!F.isUsingPixi&&xi(),(i.isReplaying||i.ticks>20)&&te?(Si(),St()):i.ticks===(h.isReplayEnabled?120:300)&&!kl&&(Si(),Ci())}function Si(){!h.isRecording||i.isReplaying||wt()}function xi(){i.isReplaying||oe(El,Math.floor((B.x-El.length*A)/2),Math.floor(B.y/2),{edgeColor:h.textEdgeColor.gameOver})}function Cs(){be="rewind",el=!0,ll=dt({pos:{x:B.x-39,y:11},size:{x:36,y:7},text:"Rewind",isSmallText:h.isUsingSmallText}),Ml=dt({pos:{x:B.x-39,y:B.y-19},size:{x:36,y:7},text:"GiveUp",isSmallText:h.isUsingSmallText}),h.isPlayingBgm&&h.isSoundEnabled&&yt(),F.isUsingPixi&&(Sl(ll),Sl(Ml))}function bs(){rl(),update(),xt(),Dn(),Se?(Sl(ll),(An()||!ue)&&Ss()):(ut(ll),ut(Ml),ll.isPressed&&(Se=!0,el=!1)),Ml.isPressed&&(el=Se=!1,gt()),h.isShowingTime&&i.time!=null&&i.time++}function Ss(){Se=!1,be="inGame",ot(),h.isPlayingBgm&&h.isSoundEnabled&&pt()}function xt(){if(h.isShowingTime)vi(i.time,3,3),vi(vl,B.x-7*(h.isUsingSmallText?Ie:A),3);else if(h.isShowingScore){oe(`${Math.floor(i.score)}`,3,3,{isSmallText:h.isUsingSmallText,edgeColor:h.textEdgeColor.score});const e=`HI ${Qe}`;oe(e,B.x-e.length*(h.isUsingSmallText?Ie:A),3,{isSmallText:h.isUsingSmallText,edgeColor:h.textEdgeColor.score})}}function vi(e,l,t){if(e==null)return;let n=Math.floor(e*100/50);n>=10*60*100&&(n=10*60*100-1);const s=vt(Math.floor(n/6e3),1)+"'"+vt(Math.floor(n%6e3/100),2)+'"'+vt(Math.floor(n%100),2);oe(s,l,t,{isSmallText:h.isUsingSmallText,edgeColor:h.textEdgeColor.score})}function vt(e,l){return("0000"+e).slice(-l)}function ki(){cl(),ee("black"),Pl=Pl.filter(e=>(oe(e.str,e.pos.x,e.pos.y,{isSmallText:h.isUsingSmallText,edgeColor:h.textEdgeColor.floatingScore}),e.pos.y+=e.vy,e.vy*=.9,e.ticks--,e.ticks>0)),dl()}function Pi(e){let l=0;for(let t=0;t<e.length;t++){const n=e.charCodeAt(t);l=(l<<5)-l+n,l|=0}return l}function xs(e){if(Fl!=null)try{const l={highScore:e};localStorage.setItem(Fl,JSON.stringify(l))}catch(l){console.warn("Unable to save high score:",l)}}function vs(){try{const e=localStorage.getItem(Fl);if(e)return JSON.parse(e).highScore}catch(e){console.warn("Unable to load high score:",e)}return 0}function ks(e){return e!=null&&e.constructor===Object}function Ps(){let e=window.location.search.substring(1);if(e=e.replace(/[^A-Za-z0-9_-]/g,""),e.length===0)return;const l=document.createElement("script");Ct=`${e}/main.js`,l.setAttribute("src",Ct),document.head.appendChild(l)}function Ms(){fetch(Ct).then(e=>e.text()).then(e=>{const l=Terser.minify(e+"update();",{toplevel:!0}).code,t="function(){",n=l.indexOf(t),s="options={",o=l.indexOf(s);let u=l;if(n>=0)u=l.substring(l.indexOf(t)+t.length,l.length-4);else if(o>=0){let g=1,m;for(let w=o+s.length;w<l.length;w++){const k=l.charAt(w);if(k==="{")g++;else if(k==="}"&&(g--,g===0)){m=w+2;break}}g===0&&(u=l.substring(m))}Mi.forEach(([g,m])=>{u=u.split(g).join(m)}),console.log(u),console.log(`${u.length} letters`)})}i.inp=void 0;function Es(...e){return fi.apply(this,e)}function Fs(...e){return gi.apply(this,e)}function Is(...e){return f.apply(this,e)}function Rs(...e){return y.apply(this.args)}i.tc=void 0,i.df=void 0,i.sc=void 0;const Os="transparent",Ts="white",Ds="red",As="green",zs="yellow",Ls="blue",Us="purple",$s="cyan",Bs="black",js="coin",Ns="laser",Gs="explosion",_s="powerUp",Hs="hit",Js="jump",Ks="select",Vs="lucky";let Mi=[["===","=="],["!==","!="],["input.pos","inp.p"],["input.isPressed","inp.ip"],["input.isJustPressed","inp.ijp"],["input.isJustReleased","inp.ijr"],["color(","clr("],["play(","ply("],["times(","tms("],["remove(","rmv("],["ticks","tc"],["difficulty","df"],["score","sc"],[".isColliding.rect.transparent",".tr"],[".isColliding.rect.white",".wh"],[".isColliding.rect.red",".rd"],[".isColliding.rect.green",".gr"],[".isColliding.rect.yellow",".yl"],[".isColliding.rect.blue",".bl"],[".isColliding.rect.purple",".pr"],[".isColliding.rect.cyan",".cy"],[".isColliding.rect.black",".lc"],['"transparent"',"tr"],['"white"',"wh"],['"red"',"rd"],['"green"',"gr"],['"yellow"',"yl"],['"blue"',"bl"],['"purple"',"pr"],['"cyan"',"cy"],['"black"',"lc"],['"coin"',"cn"],['"laser"',"ls"],['"explosion"',"ex"],['"powerUp"',"pw"],['"hit"',"ht"],['"jump"',"jm"],['"select"',"sl"],['"lucky"',"uc"]];i.PI=Jn,i.abs=Kn,i.addGameScript=Ps,i.addScore=ss,i.addWithCharCode=O,i.arc=kn,i.atan2=Wn,i.bar=xn,i.bl=Ls,i.box=Sn,i.ceil=es,i.char=Ki,i.clamp=r,i.clr=Es,i.cn=js,i.color=fi,i.complete=ns,i.cos=Xn,i.cy=$s,i.end=gt,i.ex=Gs,i.floor=Qn,i.frameState=os,i.getButton=dt,i.gr=As,i.ht=Hs,i.init=fs,i.input=on,i.jm=Js,i.keyboard=ln,i.lc=Bs,i.line=vn,i.ls=Ns,i.minifyReplaces=Mi,i.onLoad=wi,i.onUnload=hs,i.particle=rs,i.play=gi,i.playBgm=pt,i.ply=Fs,i.pointer=rn,i.pow=qn,i.pr=Us,i.pw=_s,i.range=d,i.rd=Ds,i.rect=at,i.remove=y,i.rewind=as,i.rmv=Rs,i.rnd=ls,i.rndi=ts,i.rnds=is,i.round=Zn,i.sin=Vn,i.sl=Ks,i.sqrt=Yn,i.startRecording=mi,i.stopBgm=yt,i.stopRecording=wt,i.text=At,i.times=f,i.tms=Is,i.tr=Os,i.uc=Vs,i.updateButton=ut,i.vec=hi,i.wh=Ts,i.wrap=a,i.yl=zs}(window||{})),Ei}Ys();function qs(i,r){let a=r?Zs(Qs(r)[0]):Math.random,c=i.length,d;const f=[...i];for(;c!==0;)d=Math.floor(a()*c),c--,[f[c],f[d]]=[f[d],f[c]];return f}function Qs(i){let r=1779033703,a=3144134277,c=1013904242,d=2773480762;for(let f=0,y;f<i.length;f++)y=i.charCodeAt(f),r=a^Math.imul(r^y,597399067),a=c^Math.imul(a^y,2869860233),c=d^Math.imul(c^y,951274213),d=r^Math.imul(d^y,2716044179);return r=Math.imul(c^r>>>18,597399067),a=Math.imul(d^a>>>22,2869860233),c=Math.imul(r^c>>>17,951274213),d=Math.imul(a^d>>>19,2716044179),[(r^a^c^d)>>>0,(a^r)>>>0,(c^r)>>>0,(d^r)>>>0]}function Zs(i){return function(){var r=i+=1831565813;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296}}const kt="PLAY_CATALYST",Ii=3,er=8,Ri=12,Oi=i=>{let r=i,a;do{a=!1;const c=r.field;let d=c.length;for(let f=1;f<d-1;f++){const y=c[f-1],b=c[f],S=c[f+1],O=y.rank===b.rank&&b.rank===S.rank,I=y.suit===b.suit&&b.suit===S.suit;if(O||I){console.log(`DEBUG: Auto-reaction triggered at index ${f} by ${O?"rank":"suit"} match: [${y.rank}${y.suit}, ${b.rank}${b.suit}, ${S.rank}${S.suit}]`);const v=[...c.slice(0,f-1),...c.slice(f+2)];r={...r,field:v},a=!0;break}}}while(a);return r},Ol={gameId:"catalyst-reaction-v7-auto",gameName:"Catalyst Reaction (v7, Auto Reaction)",setupGame:i=>{const r=["SPADE","HEART","DIAMOND","CLUB"],a=["A","2","3","4","5","6","7","8","9","10","J","Q","K"];let c=[],d=0;for(const z of r)for(const U of a)c.push({suit:z,rank:U,id:`card-${d++}`});const f=qs(c,i),y=er;let b=f.slice(0,y),S=f.slice(y),O={_cardIdCounter:d,deck:S,field:b,hand:[],discardPile:[]};console.log("DEBUG: Starting initial field stabilization...");let I=b,p=!0;for(;p;){const z={_cardIdCounter:d,deck:S,field:I,hand:[],discardPile:[]};console.log(`DEBUG: Checking reactions on field size: ${I.length}`);const U=Oi(z);if(U.field.length<I.length){console.log(`DEBUG: Reactions occurred. Field reduced to: ${U.field.length}`),I=U.field,S=U.deck;const ge=y-I.length;if(ge>0&&S.length>0){const se=Math.min(ge,S.length);console.log(`DEBUG: Replenishing field with ${se} card(s).`);const $e=S.slice(0,se);I=[...I,...$e],S=S.slice(se),p=!0}else ge>0&&S.length===0?(console.log("DEBUG: Deck empty, cannot fully replenish field."),p=!1):p=!0}else{console.log("DEBUG: No reactions occurred in this pass.");const ge=y-I.length;if(ge>0&&S.length>0){const se=Math.min(ge,S.length);console.log(`DEBUG: Performing final replenish with ${se} card(s).`);const $e=S.slice(0,se);I=[...I,...$e],S=S.slice(se),p=!0}else p=!1}O={_cardIdCounter:d,deck:S,field:I,hand:[],discardPile:[]}}console.log(`DEBUG: Initial field stabilized at size: ${O.field.length}`);const v=[];for(let z=0;z<Ii&&O.deck.length>0;z++)v.push(O.deck.shift());return{...O,hand:v}},getAvailableActions:i=>{const r=[];if(i.hand.length>0)if(i.field.length>=Ri)for(const a of i.hand)for(let c=1;c<i.field.length;c++){const d=i.field[c-1],f=i.field[c],y=d.rank===a.rank&&a.rank===f.rank,b=d.suit===a.suit&&a.suit===f.suit;(y||b)&&r.push({type:kt,payload:{catalystCardId:a.id,position:c}})}else for(const a of i.hand)for(let c=0;c<=i.field.length;c++)r.push({type:kt,payload:{catalystCardId:a.id,position:c}});return r},applyAction:(i,r)=>{let a=JSON.parse(JSON.stringify(i));if(r.type===kt){const{catalystCardId:c,position:d}=r.payload,f=a.hand.findIndex(S=>S.id===c);if(f===-1)return console.error(`Catalyst card ${c} not found in hand.`),i;const y=a.hand[f];if(d<0||d>a.field.length)return console.error(`Invalid position: ${d} for field size ${a.field.length}`),i;let b=!1;if(d>0&&d<a.field.length){const S=d-1,O=d,I=a.field[S],p=a.field[O],v=I&&p&&I.rank===y.rank&&y.rank===p.rank,z=I&&p&&I.suit===y.suit&&y.suit===p.suit;b=v||z,b&&(console.log(`DEBUG: Player reaction triggered by ${y.rank}${y.suit} at pos ${d}`),a.hand.splice(f,1),a.field.splice(O,1),a.field.splice(S,1))}b||(console.log(`DEBUG: Player action places ${y.rank}${y.suit} at pos ${d}`),a.hand.splice(f,1),a.field.splice(d,0,y)),console.log("DEBUG: Checking for auto-reactions after player move..."),a=Oi(a),console.log(`DEBUG: Field size after player move & auto-reactions: ${a.field.length}`),a.deck.length>0&&a.hand.length<Ii&&(console.log("DEBUG: Drawing card..."),a.hand.push(a.deck.shift()))}else return console.error("Unknown action type:",r.type),i;return a},checkGameEnd:i=>{if(i.field.length===0)return{status:"WIN"};if(i.hand.length===0)return{status:"LOSE",reason:"No cards in hand to play."};if(i.deck.length===0&&i.hand.length===0&&i.field.length>0)return{status:"LOSE",reason:"Deck and hand are empty, cannot make further moves."};if(i.field.length>=Ri){let r=!1;for(const a of i.hand){for(let c=1;c<i.field.length;c++){const d=i.field[c-1],f=i.field[c],y=d.rank===a.rank&&a.rank===f.rank,b=d.suit===a.suit&&a.suit===f.suit;if(y||b){r=!0;break}}if(r)break}if(!r)return{status:"LOSE",reason:"Field is full and no reactions are possible."}}return{status:"ONGOING"}}},lr=[`
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
`],Pt={spade:0,heart:1,diamond:2,club:3,back:4,joker:8};class Mt{constructor(){E(this,"pos");E(this,"size",vec(9,16));E(this,"rank");E(this,"suit");E(this,"isFaceUp");E(this,"isSelected");E(this,"isHighlighted");E(this,"isFlipping");E(this,"flipProgress");E(this,"targetIsFaceUp");E(this,"flipSpeed");E(this,"isMoving");E(this,"moveStartPos");E(this,"moveTargetPos");E(this,"moveProgress");E(this,"moveSpeed");E(this,"isDisappearing");E(this,"disappearSpeed");this.pos=vec(),this.rank=1,this.suit="spade",this.isFaceUp=!0,this.isSelected=!1,this.isHighlighted=!1,this.isFlipping=!1,this.flipProgress=0,this.targetIsFaceUp=null,this.flipSpeed=.1,this.isMoving=!1,this.moveStartPos=vec(),this.moveTargetPos=vec(),this.moveProgress=0,this.moveSpeed=.07,this.isDisappearing=!1,this.disappearSpeed=.1}getRankDisplayString(){if(this.rank===0)return"";switch(this.rank){case 1:return"A";case 10:return"f";case 11:return"J";case 12:return"Q";case 13:return"K";default:return this.rank.toString()}}startFlipAnimation(r){this.isFlipping||this.isFaceUp===r||(this.isFlipping=!0,this.flipProgress=0,this.targetIsFaceUp=r)}updateFlipAnimation(){this.isFlipping&&(this.flipProgress+=this.flipSpeed,this.flipProgress>=1&&(this.isFaceUp=this.targetIsFaceUp,this.isFlipping=!1,this.flipProgress=0,this.targetIsFaceUp=null))}startMoveAnimation(r){this.isMoving=!0,this.moveStartPos=vec(this.pos.x,this.pos.y),this.moveTargetPos=vec(r.x,r.y),this.moveProgress=0}updateMovement(){if(this.isMoving)if(this.moveProgress+=this.moveSpeed,this.moveProgress>=1)this.pos.set(this.moveTargetPos),this.isMoving=!1,this.moveProgress=0;else{const r=this.moveStartPos.x+(this.moveTargetPos.x-this.moveStartPos.x)*this.moveProgress,a=this.moveStartPos.y+(this.moveTargetPos.y-this.moveStartPos.y)*this.moveProgress;this.pos.set(r,a)}}startDisappearAnimation(){this.isDisappearing=!0,this.moveStartPos=vec(this.pos.x,this.pos.y),this.moveTargetPos=vec(this.pos.x,-this.size.y),this.moveProgress=0,this.moveSpeed=this.disappearSpeed,this.isMoving=!0}update(){this.updateFlipAnimation(),this.updateMovement()}draw(){this.update();let r=1,a=this.isFaceUp;this.isFlipping&&(r=Math.cos(this.flipProgress*PI),r<0&&(a=this.targetIsFaceUp,r*=-1)),this.isHighlighted&&(color("red"),rect(this.pos.x-(this.size.x/2+1),this.pos.y-(this.size.y/2+1),this.size.x+2,this.size.y+2)),color("black");const c=this.size.x*r;if(rect(this.pos.x-c/2,this.pos.y-this.size.y/2,c,this.size.y),r>.1){const d=this.isSelected?"light_yellow":"white";color(d);const f=(this.size.x-2)*r;if(rect(this.pos.x-f/2,this.pos.y-(this.size.y-2)/2,f,this.size.y-2),a)if(this.suit==="joker"){color("black");const y=ceil(this.pos.x-1),b={scale:{x:r}};char("i",y,this.pos.y-3,b),char("j",y,this.pos.y+3,b)}else{const y=this.suit==="heart"||this.suit==="diamond"?"red":"black",b=ceil(this.pos.x-1),S={scale:{x:r}};color(y),char(addWithCharCode("a",Pt[this.suit]),b,this.pos.y-3,S),color(y);const O=this.getRankDisplayString();O&&char(O,b,this.pos.y+3,S)}else{color("blue");const y=ceil(this.pos.x-1),b={scale:{x:r}};char(addWithCharCode("a",Pt.back),y,this.pos.y-3,b),char(addWithCharCode("a",Pt.back),y,this.pos.y+3,b)}}}containsPoint(r){const a=this.pos.x-this.size.x/2,c=this.pos.y-this.size.y/2;return r.isInRect(a,c,this.size.x,this.size.y)}}class tr{constructor(r,a,c,d,f="",y){E(this,"pos");E(this,"size");E(this,"text");E(this,"isVisible");E(this,"textColor");E(this,"backgroundColor");E(this,"borderColor");E(this,"tailAlign");E(this,"tailDirection");E(this,"tailChar");E(this,"padding",{x:3,y:2});E(this,"lineSpacing",6);E(this,"charWidth",4);E(this,"minHeight",15);this.pos=vec(r,a),this.size=vec(c,Math.max(d,this.minHeight)),this.text=f,this.isVisible=!1,this.textColor="black",this.backgroundColor="white",this.borderColor="black",this.tailAlign=(y==null?void 0:y.align)??"left",this.tailDirection=(y==null?void 0:y.direction)??"down",this.tailChar="h",this._calculateAndSetHeight(this.text)}_calculateAndSetHeight(r){const a=Math.floor((this.size.x-this.padding.x*2)/this.charWidth);if(a<=0){this.size.y=this.minHeight;return}let c=1;const d=r.split(" ");let f="";for(const b of d){const S=f?`${f} ${b}`:b;S.length<=a?f=S:(c++,f=b)}const y=c*this.lineSpacing+this.padding.y*2;this.size.y=Math.max(y,this.minHeight)}setText(r){this.text!==r&&(this.text=r,this._calculateAndSetHeight(this.text))}show(r){r&&this.text!==r?this.setText(r):this.isVisible||this._calculateAndSetHeight(this.text),this.isVisible=!0}hide(){this.isVisible=!1}setTail(r,a){this.tailAlign=r,this.tailDirection=a}draw(){if(!this.isVisible)return;color(this.backgroundColor),rect(this.pos.x,this.pos.y,this.size.x,this.size.y),color(this.borderColor),rect(this.pos.x,this.pos.y,this.size.x,1),rect(this.pos.x,this.pos.y+this.size.y-1,this.size.x,1),rect(this.pos.x,this.pos.y+1,1,this.size.y-2),rect(this.pos.x+this.size.x-1,this.pos.y+1,1,this.size.y-2),color(this.textColor);const r={isSmallText:!0},a=Math.floor((this.size.x-this.padding.x*2)/this.charWidth);let c=this.pos.y+this.padding.y+2;if(a>0){const d=this.text.split(" ");let f="";for(const y of d){const b=f?`${f} ${y}`:y;b.length<=a?f=b:(text(f,this.pos.x+this.padding.x,c,r),c+=this.lineSpacing,f=y)}f&&text(f,this.pos.x+this.padding.x,c,r)}if(this.tailDirection!=="none"){let d,f;const y={},b={};this.tailDirection==="down"?f=this.pos.y+this.size.y+1:(f=this.pos.y-1,y.mirror={y:-1});const S=3;this.tailAlign==="left"?d=this.pos.x+S:this.tailAlign==="center"?d=this.pos.x+this.size.x/2:d=this.pos.x+this.size.x-S,color(this.borderColor),char(this.tailChar,d,f,{...y,...b})}}}let P=null,q=null,De=null,Ae="ongoing",Le="";const ve=9,Tl=16,Ue=5,Al=10,Di=15,Et=40,pe=4,ze=1;let nl=[],sl=[],tl=[],_=1,K=null,W=new Set,il=null;function ir(){K||(K=new tr(5,5,70,20,"",{align:"center",direction:"down"}),K.hide()),_=1,W.clear(),il=null}function xe(i){if(_==="OFF"&&i!=="gameStart")return;let r=null;switch(i){case"gameStart":r=1,W.clear();break;case"handCardSelected":_===1?r=2:_===3&&W.has(3)?r=4:_===4&&W.has(4)&&(r="OFF");break;case"placementSelected":_===2&&!W.has(3)?r=3:_===3&&W.has(3)?r=4:_===4&&W.has(4)&&(r="OFF");break;case"reactionOccurred":_===2&&!W.has(3)&&(r=3);break;case"gameOver":r="OFF";break}r!==null&&r!==_&&(_=r)}function Ti(){if(!K||_===il&&il!==null)return;K.hide();let i="",r=50,a=30,c="center",d="down";if(_==="OFF"){il="OFF";return}switch(_){case 1:W.has(1)||(i="Click a card in your hand to select it as a catalyst.",r=Di+K.size.x/2+1,a=Et-K.size.y-2,d="down",c="left");break;case 2:!W.has(2)&&q&&(i="Good! Now click a yellow marker on the field to play it.",r=Ue+ve*6,a=Al+K.size.y/2+7,d="up",c="left");break;case 3:W.has(3)||(i="Nice! Same rank or suit 3 times removes cards.",r=70,a=30,d="none");break;case 4:W.has(4)||(i="Win by clearing the field. Lose if out of moves/cards.",r=80,a=30,d="none");break}i?(K.setText(i),K.pos.set(r,a),K.setTail(c,d),K.show(),W.add(_)):W.has(_)&&K.hide(),il=_}function nr(i){if(!(!P||Ae!=="ongoing")){if(input.isJustPressed){let r=!1;for(const a of sl)if(a.containsPoint(input.pos)){r=!0;const c=a.rank.toString()+a.suit.charAt(0);q===c?q=null:q=c,De=null,zi(),xe("handCardSelected"),play("tap");break}if(!r&&q&&P){const a=Al+Tl/2;for(let c=0;c<=P.field.length;c++){let d;if(c===0?d=Ue-Math.round(pe/2)-ze:d=Ue+c*(ve+pe)-pe/2,input.pos.distanceTo(vec(d,a))<ze+3){r=!0,De=c,xe("placementSelected"),play("tap");break}}}if(q&&De!==null&&P){const a=P.hand.find(c=>Dl(c.rank).toString()+c.suit.toLowerCase().charAt(0)===q);if(a){const c=a.id,d=[...P.hand],f=d.findIndex(O=>O.id===c);play("flip");const y=P.field.length,b=[...P.field],S={type:"PLAY_CATALYST",payload:{catalystCardId:a.id,position:De}};if(P=Ol.applyAction(P,S),f!==-1&&P.hand.length>0){const O=new Set(d.map(v=>v.id));O.delete(c);let I,p=-1;for(let v=0;v<P.hand.length;v++){const z=P.hand[v];if(!O.has(z.id)&&z.id!==c){I=z,p=v;break}}if(I&&p!==-1&&p!==f){if(f<P.hand.length){const v=P.hand.splice(p,1)[0];P.hand.splice(f,0,v)}else if(f===P.hand.length&&p<f){const v=P.hand.splice(p,1)[0];P.hand.push(v)}}}if(P&&P.field.length<y){const O=b.filter(p=>P&&!P.field.some(v=>v.id===p.id)),I=nl.filter(p=>nl.indexOf(p)<b.length?O.some(z=>Dl(z.rank)===p.rank&&z.suit.toLowerCase().charAt(0)===p.suit.charAt(0)):!1);for(const p of I){const v=new Mt;v.pos=vec(p.pos.x,p.pos.y),v.rank=p.rank,v.suit=p.suit,v.isFaceUp=!0,v.startDisappearAnimation(),tl.push(v)}xe("reactionOccurred"),play("flip")}q=null,De=null,Ai()}else q=null}}if(P){const r=Ol.checkGameEnd,a=r(P);a.status!=="ONGOING"?(Ae=a.status.toLowerCase(),Ae==="win"?(Le="YOU WIN!",play("coin")):Le=`GAME OVER
${a.reason||"No more moves!"}`,xe("gameOver")):P.hand.length===0&&P.deck.length===0&&Ol.getAvailableActions(P).length===0&&(Ae="lose",Le="GAME OVER\\nNo more cards or moves!",xe("gameOver"))}}}function sr(){if(color("black"),char("k",80,40),ticks||(playBgm(),ir(),xe("gameStart")),!P){P=Ol.setupGame(String(Date.now())),q=null,De=null,Ae="ongoing",Le="",tl=[],Ai();return}if(Ae!=="ongoing"){if(input.isJustPressed&&(P=null),Le){const i=Le.split(`
`),r=6,a=3,c=3,d=2,f=i.length*r,y=r,S=f+d+y+a+c,O=80,I=160,p=60,v=(I-O)/2,z=(p-S)/2;color("black"),rect(v,z,O,S),color("white");let U=z+a;i.forEach(ne=>{text(ne,v+2,U),U+=r}),U+=d,text("[CLICK TO RESTART]",v+2,U,{isSmallText:!0,color:"light_red"})}_!=="OFF"&&(xe("gameOver"),Ti());return}if(nl.forEach(i=>i.update()),sl.forEach(i=>i.update()),tl=tl.filter(i=>(i.update(),i.isMoving)),nr(),Ti(),P){if(nl.forEach(i=>i.draw()),sl.forEach(i=>i.draw()),tl.forEach(i=>i.draw()),q){const i="yellow",r=ze*2,a=Al+Tl/2;for(let c=0;c<=P.field.length;c++){let d;c===0?d=Ue-Math.round(pe/2)-ze:d=Ue+c*(ve+pe)-pe/2;const f=d-ze,y=a-ze;color(i),rect(f,y,r,r)}}color("white"),text(`Deck: ${P.deck.length}`,60,Et+9,{isSmallText:!0}),K&&K.isVisible&&K.draw()}}function Ai(){P&&(nl=P.field.map((i,r)=>{const a=new Mt;return a.pos=vec(Ue+ve/2+r*(ve+pe),Al+Tl/2),a.rank=Dl(i.rank),a.suit=i.suit.toLowerCase(),a.isFaceUp=!0,a}),sl=P.hand.map((i,r)=>{const a=new Mt;return a.pos=vec(Di+ve/2+r*(ve+pe),Et+Tl/2),a.rank=Dl(i.rank),a.suit=i.suit.toLowerCase(),a.isFaceUp=!0,a}),zi())}function zi(){sl.forEach(i=>{const r=i.rank.toString()+i.suit.charAt(0);i.isSelected=r===q})}function Dl(i){if(i==="A")return 1;if(i==="K")return 13;if(i==="Q")return 12;if(i==="J")return 11;const r=parseInt(i);return!isNaN(r)&&r>=2&&r<=10?r:0}const rr=["background.png"];init({update:sr,characters:lr.concat(rr),options:{viewSize:{x:160,y:60},isShowingScore:!1,isSoundEnabled:!1,colorPalette:[[45,27,22],[34,26,24],[14,14,17],[67,101,123],[78,90,105],[27,24,21],[240,171,71],[104,96,85],[87,83,89],[94,99,97],[23,26,23],[96,97,94],[152,160,158],[104,108,105],[204,108,105],[252,240,158],[67,201,223],[244,246,245]],audioTempo:120},audioFiles:{bgm:"bgm.mp3",tap:"tap.mp3",flip:"flip.mp3",coin:"coin.mp3"}});
