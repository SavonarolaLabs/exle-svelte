const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../nodes/0.Cvo439x8.js","../chunks/disclose-version.BLKDMZQ3.js","../chunks/runtime.CkelMwpL.js","../chunks/legacy.D5_EWj1q.js","../chunks/render.DIxAzv3F.js","../chunks/each.DN3wIlXp.js","../chunks/attributes.DfSsnoEq.js","../chunks/class.CO3LvAnO.js","../chunks/store.8rOse5cU.js","../chunks/if.D1WPA-yG.js","../chunks/lifecycle.CPJUkSGs.js","../chunks/index.FU14l6ui.js","../chunks/paths.Bo0YdqWz.js","../assets/0.AOJwmils.css","../nodes/1.DnUqX8Dk.js","../chunks/entry.6FVedAzP.js","../nodes/2.BJBInteg.js","../chunks/props.5NsL4bjt.js","../chunks/proxy.BZObPxtm.js","../assets/2.SJma3TXW.css","../nodes/3.C17x0uiH.js","../chunks/input.CPXcgIx6.js","../nodes/4.BBhx36qx.js","../nodes/5.qg5S-L3h.js"])))=>i.map(i=>d[i]);
var U=e=>{throw TypeError(e)};var F=(e,t,r)=>t.has(e)||U("Cannot "+r);var u=(e,t,r)=>(F(e,t,"read from private field"),r?r.call(e):t.get(e)),A=(e,t,r)=>t.has(e)?U("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),S=(e,t,r,i)=>(F(e,t,"write to private field"),i?i.call(e,r):t.set(e,r),r);import{D as G,G as Q,C as X,aa as Z,T as $,N as tt,U as et,au as rt,a9 as st,b as K,V as at,S as nt,g as v,k as ot,t as x,aK as it,aD as ct,y as ut,c as O,l as lt,a as M,am as ft,u as dt,an as w,ap as mt,aL as ht,as as _t,aq as vt,ao as gt,ar as yt,aM as p,f as C}from"../chunks/runtime.CkelMwpL.js";import{h as Et,m as Pt,u as bt,s as Rt}from"../chunks/render.DIxAzv3F.js";import{d as D,a as b,b as W,t as kt}from"../chunks/disclose-version.BLKDMZQ3.js";import{i as V}from"../chunks/if.D1WPA-yG.js";import{p as wt}from"../chunks/proxy.BZObPxtm.js";import{p as I}from"../chunks/props.5NsL4bjt.js";function xt(e){throw new Error("lifecycle_outside_component")}function q(e,t,r){G&&Q();var i=e,n,o;X(()=>{n!==(n=t())&&(o&&(et(o),o=null),n&&(o=$(()=>r(i,n))))},Z),G&&(i=tt)}function N(e,t){return e===t||(e==null?void 0:e[nt])===t}function B(e={},t,r,i){return rt(()=>{var n,o;return st(()=>{n=o,o=[],K(()=>{e!==r(...o)&&(t(e,...o),n&&N(r(...n),e)&&t(null,...n))})}),()=>{at(()=>{o&&N(r(...o),e)&&t(null,...o)})}}),e}function Lt(e){return class extends Tt{constructor(t){super({component:e,...t})}}}var g,f;class Tt{constructor(t){A(this,g);A(this,f);var o;var r=new Map,i=(a,s)=>{var d=ut(s);return r.set(a,d),d};const n=new Proxy({...t.props||{},$$events:{}},{get(a,s){return v(r.get(s)??i(s,Reflect.get(a,s)))},has(a,s){return s===ot?!0:(v(r.get(s)??i(s,Reflect.get(a,s))),Reflect.has(a,s))},set(a,s,d){return x(r.get(s)??i(s,d),d),Reflect.set(a,s,d)}});S(this,f,(t.hydrate?Et:Pt)(t.component,{target:t.target,anchor:t.anchor,props:n,context:t.context,intro:t.intro??!1,recover:t.recover})),(!((o=t==null?void 0:t.props)!=null&&o.$$host)||t.sync===!1)&&it(),S(this,g,n.$$events);for(const a of Object.keys(u(this,f)))a==="$set"||a==="$destroy"||a==="$on"||ct(this,a,{get(){return u(this,f)[a]},set(s){u(this,f)[a]=s},enumerable:!0});u(this,f).$set=a=>{Object.assign(n,a)},u(this,f).$destroy=()=>{bt(u(this,f))}}$set(t){u(this,f).$set(t)}$on(t,r){u(this,g)[t]=u(this,g)[t]||[];const i=(...n)=>r.call(this,...n);return u(this,g)[t].push(i),()=>{u(this,g)[t]=u(this,g)[t].filter(n=>n!==i)}}$destroy(){u(this,f).$destroy()}}g=new WeakMap,f=new WeakMap;function At(e){O===null&&xt(),lt&&O.l!==null?St(O).m.push(e):M(()=>{const t=K(e);if(typeof t=="function")return t})}function St(e){var t=e.l;return t.u??(t.u={a:[],b:[],m:[]})}const Ot="modulepreload",pt=function(e,t){return new URL(e,t).href},Y={},R=function(t,r,i){let n=Promise.resolve();if(r&&r.length>0){const a=document.getElementsByTagName("link"),s=document.querySelector("meta[property=csp-nonce]"),d=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));n=Promise.allSettled(r.map(l=>{if(l=pt(l,i),l in Y)return;Y[l]=!0;const y=l.endsWith(".css"),L=y?'[rel="stylesheet"]':"";if(!!i)for(let m=a.length-1;m>=0;m--){const _=a[m];if(_.href===l&&(!y||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${L}`))return;const c=document.createElement("link");if(c.rel=y?"stylesheet":Ot,y||(c.as="script"),c.crossOrigin="",c.href=l,d&&c.setAttribute("nonce",d),document.head.appendChild(c),y)return new Promise((m,_)=>{c.addEventListener("load",m),c.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(a){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a}return n.then(a=>{for(const s of a||[])s.status==="rejected"&&o(s.reason);return t().catch(o)})},Yt={};var Ct=W('<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>'),Dt=W("<!> <!>",1);function Vt(e,t){ft(t,!0);let r=I(t,"components",23,()=>[]),i=I(t,"data_0",3,null),n=I(t,"data_1",3,null);dt(()=>t.stores.page.set(t.page)),M(()=>{t.stores,t.page,t.constructors,r(),t.form,i(),n(),t.stores.page.notify()});let o=p(!1),a=p(!1),s=p(null);At(()=>{const E=t.stores.page.subscribe(()=>{v(o)&&(x(a,!0),ht().then(()=>{x(s,wt(document.title||"untitled page"))}))});return x(o,!0),E});const d=C(()=>t.constructors[1]);var l=Dt(),y=w(l);V(y,()=>t.constructors[1],E=>{var c=D();const m=C(()=>t.constructors[0]);var _=w(c);q(_,()=>v(m),(P,T)=>{B(T(P,{get data(){return i()},get form(){return t.form},children:(h,It)=>{var j=D(),z=w(j);q(z,()=>v(d),(H,J)=>{B(J(H,{get data(){return n()},get form(){return t.form}}),k=>r()[1]=k,()=>{var k;return(k=r())==null?void 0:k[1]})}),b(h,j)},$$slots:{default:!0}}),h=>r()[0]=h,()=>{var h;return(h=r())==null?void 0:h[0]})}),b(E,c)},E=>{var c=D();const m=C(()=>t.constructors[0]);var _=w(c);q(_,()=>v(m),(P,T)=>{B(T(P,{get data(){return i()},get form(){return t.form}}),h=>r()[0]=h,()=>{var h;return(h=r())==null?void 0:h[0]})}),b(E,c)});var L=_t(y,2);V(L,()=>v(o),E=>{var c=Ct(),m=vt(c);V(m,()=>v(a),_=>{var P=kt();gt(()=>Rt(P,v(s))),b(_,P)}),yt(c),b(E,c)}),b(e,l),mt()}const Kt=Lt(Vt),Mt=[()=>R(()=>import("../nodes/0.Cvo439x8.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13]),import.meta.url),()=>R(()=>import("../nodes/1.DnUqX8Dk.js"),__vite__mapDeps([14,1,2,3,4,10,8,15,11,12]),import.meta.url),()=>R(()=>import("../nodes/2.BJBInteg.js"),__vite__mapDeps([16,1,2,3,6,4,12,7,17,18,8,5,19]),import.meta.url),()=>R(()=>import("../nodes/3.C17x0uiH.js"),__vite__mapDeps([20,1,2,3,4,9,5,6,21,10,17,18,8]),import.meta.url),()=>R(()=>import("../nodes/4.BBhx36qx.js"),__vite__mapDeps([22,1,2,3,4,9,6,7,21,18]),import.meta.url),()=>R(()=>import("../nodes/5.qg5S-L3h.js"),__vite__mapDeps([23,1,2,3]),import.meta.url)],Wt=[],zt={"/":[2],"/loans":[3],"/loans/create":[4],"/repayments":[5]},Ht={handleError:({error:e})=>{console.error(e)},reroute:()=>{}};export{zt as dictionary,Ht as hooks,Yt as matchers,Mt as nodes,Kt as root,Wt as server_loads};
