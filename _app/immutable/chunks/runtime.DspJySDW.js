var xn=Array.isArray,On=Array.from,Cn=Object.defineProperty,ft=Object.getOwnPropertyDescriptor,Zt=Object.getOwnPropertyDescriptors,Nn=Object.prototype,bn=Array.prototype,zt=Object.getPrototypeOf;const qn=()=>{};function Pn(t){return t()}function ht(t){for(var n=0;n<t.length;n++)t[n]()}const m=2,dt=4,Y=8,et=16,w=32,z=64,R=128,V=256,p=512,I=1024,b=2048,N=4096,j=8192,Jt=16384,Et=32768,Fn=65536,Wt=1<<18,yt=1<<19,_t=Symbol("$state"),Ln=Symbol("legacy props"),Mn=Symbol("");function wt(t){return t===this.v}function Xt(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function Tt(t){return!Xt(t,this.v)}function Qt(t){throw new Error("effect_in_teardown")}function tn(){throw new Error("effect_in_unowned_derived")}function nn(t){throw new Error("effect_orphan")}function rn(){throw new Error("effect_update_depth_exceeded")}function Hn(){throw new Error("hydration_failed")}function Yn(t){throw new Error("props_invalid_value")}function jn(){throw new Error("state_descriptors_fixed")}function Bn(){throw new Error("state_prototype_fixed")}function en(){throw new Error("state_unsafe_local_read")}function sn(){throw new Error("state_unsafe_mutation")}let J=!1;function Un(){J=!0}function st(t){return{f:0,v:t,reactions:null,equals:wt,version:0}}function Vn(t){return mt(st(t))}function an(t,n=!1){var e;const r=st(t);return n||(r.equals=Tt),J&&f!==null&&f.l!==null&&((e=f.l).s??(e.s=[])).push(r),r}function Gn(t,n=!1){return mt(an(t,n))}function mt(t){return o!==null&&o.f&m&&(y===null?Tn([t]):y.push(t)),t}function ln(t,n){return o!==null&&ot()&&o.f&(m|et)&&(y===null||!y.includes(t))&&sn(),un(t,n)}function un(t,n){return t.equals(n)||(t.v=n,t.version=Bt(),At(t,I),ot()&&u!==null&&u.f&p&&!(u.f&w)&&(_!==null&&_.includes(t)?(E(u,I),W(u)):g===null?mn([t]):g.push(t))),n}function At(t,n){var r=t.reactions;if(r!==null)for(var e=ot(),s=r.length,a=0;a<s;a++){var l=r[a],i=l.f;i&I||!e&&l===u||(E(l,n),i&(p|R)&&(i&m?At(l,b):W(l)))}}const Kn=1,$n=2,Zn=4,zn=8,Jn=16,Wn=1,Xn=2,Qn=4,tr=8,nr=16,rr=1,er=2,on="[",fn="[!",_n="]",gt={},sr=Symbol();function It(t){console.warn("hydration_mismatch")}let S=!1;function ar(t){S=t}let d;function L(t){if(t===null)throw It(),gt;return d=t}function lr(){return L(D(d))}function ur(t){if(S){if(D(d)!==null)throw It(),gt;d=t}}function or(t=1){if(S){for(var n=t,r=d;n--;)r=D(r);d=r}}function ir(){for(var t=0,n=d;;){if(n.nodeType===8){var r=n.data;if(r===_n){if(t===0)return n;t-=1}else(r===on||r===fn)&&(t+=1)}var e=D(n);n.remove(),n=e}}var ct,kt,St;function fr(){if(ct===void 0){ct=window;var t=Element.prototype,n=Node.prototype;kt=ft(n,"firstChild").get,St=ft(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function X(t=""){return document.createTextNode(t)}function Q(t){return kt.call(t)}function D(t){return St.call(t)}function _r(t,n){if(!S)return Q(t);var r=Q(d);if(r===null)r=d.appendChild(X());else if(n&&r.nodeType!==3){var e=X();return r==null||r.before(e),L(e),e}return L(r),r}function cr(t,n){if(!S){var r=Q(t);return r instanceof Comment&&r.data===""?D(r):r}return d}function vr(t,n=1,r=!1){let e=S?d:t;for(;n--;)e=D(e);if(!S)return e;var s=e.nodeType;if(r&&s!==3){var a=X();return e==null||e.before(a),L(a),a}return L(e),e}function pr(t){t.textContent=""}function cn(t){var n=m|I;u===null?n|=R:u.f|=yt;const r={children:null,ctx:f,deps:null,equals:wt,f:n,fn:t,reactions:null,v:null,version:0,parent:u};if(o!==null&&o.f&m){var e=o;(e.children??(e.children=[])).push(r)}return r}function hr(t){const n=cn(t);return n.equals=Tt,n}function Rt(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&m?at(e):P(e)}}}function Dt(t){var n,r=u;Z(t.parent);try{Rt(t),n=Ut(t)}finally{Z(r)}return n}function xt(t){var n=Dt(t),r=(x||t.f&R)&&t.deps!==null?b:p;E(t,r),t.equals(n)||(t.v=n,t.version=Bt())}function at(t){Rt(t),H(t,0),E(t,j),t.v=t.children=t.deps=t.ctx=t.reactions=null}function Ot(t){u===null&&o===null&&nn(),o!==null&&o.f&R&&tn(),ut&&Qt()}function vn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function q(t,n,r,e=!0){var s=(t&z)!==0,a=u,l={ctx:f,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|I,first:null,fn:n,last:null,next:null,parent:s?null:a,prev:null,teardown:null,transitions:null,version:0};if(r){var i=O;try{vt(!0),B(l),l.f|=Jt}catch(c){throw P(l),c}finally{vt(i)}}else n!==null&&W(l);var T=r&&l.deps===null&&l.first===null&&l.nodes_start===null&&l.teardown===null&&(l.f&yt)===0;if(!T&&!s&&e&&(a!==null&&vn(l,a),o!==null&&o.f&m)){var A=o;(A.children??(A.children=[])).push(l)}return l}function dr(t){const n=q(Y,null,!1);return E(n,p),n.teardown=t,n}function Er(t){Ot();var n=u!==null&&(u.f&w)!==0&&f!==null&&!f.m;if(n){var r=f;(r.e??(r.e=[])).push({fn:t,effect:u,reaction:o})}else{var e=Ct(t);return e}}function yr(t){return Ot(),lt(t)}function wr(t){const n=q(z,t,!0);return()=>{P(n)}}function Ct(t){return q(dt,t,!1)}function Tr(t,n){var r=f,e={effect:null,ran:!1};r.l.r1.push(e),e.effect=lt(()=>{t(),!e.ran&&(e.ran=!0,ln(r.l.r2,!0),Rn(n))})}function mr(){var t=f;lt(()=>{if(Sn(t.l.r2)){for(var n of t.l.r1){var r=n.effect;r.f&p&&E(r,b),F(r)&&B(r),n.ran=!1}t.l.r2.v=!1}})}function lt(t){return q(Y,t,!0)}function Ar(t){return pn(t)}function pn(t,n=0){return q(Y|et|n,t,!0)}function gr(t,n=!0){return q(Y|w,t,!0,n)}function Nt(t){var n=t.teardown;if(n!==null){const r=ut,e=o;pt(!0),$(null);try{n.call(null)}finally{pt(r),$(e)}}}function bt(t){var n=t.deriveds;if(n!==null){t.deriveds=null;for(var r=0;r<n.length;r+=1)at(n[r])}}function qt(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;P(r,n),r=e}}function hn(t){for(var n=t.first;n!==null;){var r=n.next;n.f&w||P(n),n=r}}function P(t,n=!0){var r=!1;if((n||t.f&Wt)&&t.nodes_start!==null){for(var e=t.nodes_start,s=t.nodes_end;e!==null;){var a=e===s?null:D(e);e.remove(),e=a}r=!0}qt(t,n&&!r),bt(t),H(t,0),E(t,j);var l=t.transitions;if(l!==null)for(const T of l)T.stop();Nt(t);var i=t.parent;i!==null&&i.first!==null&&Pt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.parent=t.fn=t.nodes_start=t.nodes_end=null}function Pt(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function Ir(t,n){var r=[];Ft(t,r,!0),dn(r,()=>{P(t),n&&n()})}function dn(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var s of t)s.out(e)}else n()}function Ft(t,n,r){if(!(t.f&N)){if(t.f^=N,t.transitions!==null)for(const l of t.transitions)(l.is_global||r)&&n.push(l);for(var e=t.first;e!==null;){var s=e.next,a=(e.f&Et)!==0||(e.f&w)!==0;Ft(e,n,a?r:!1),e=s}}}function kr(t){Lt(t,!0)}function Lt(t,n){if(t.f&N){F(t)&&B(t),t.f^=N;for(var r=t.first;r!==null;){var e=r.next,s=(r.f&Et)!==0||(r.f&w)!==0;Lt(r,s?n:!1),r=e}if(t.transitions!==null)for(const a of t.transitions)(a.is_global||n)&&a.in()}}const En=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let G=!1,K=!1,tt=[],nt=[];function Mt(){G=!1;const t=tt.slice();tt=[],ht(t)}function Ht(){K=!1;const t=nt.slice();nt=[],ht(t)}function Sr(t){G||(G=!0,queueMicrotask(Mt)),tt.push(t)}function Rr(t){K||(K=!0,En(Ht)),nt.push(t)}function yn(){G&&Mt(),K&&Ht()}const Yt=0,wn=1;let U=Yt,M=!1,O=!1,ut=!1;function vt(t){O=t}function pt(t){ut=t}let k=[],C=0;let o=null;function $(t){o=t}let u=null;function Z(t){u=t}let y=null;function Tn(t){y=t}let _=null,h=0,g=null;function mn(t){g=t}let jt=0,x=!1,f=null;function Bt(){return++jt}function ot(){return!J||f!==null&&f.l===null}function F(t){var l,i;var n=t.f;if(n&I)return!0;if(n&b){var r=t.deps,e=(n&R)!==0;if(r!==null){var s;if(n&V){for(s=0;s<r.length;s++)((l=r[s]).reactions??(l.reactions=[])).push(t);t.f^=V}for(s=0;s<r.length;s++){var a=r[s];if(F(a)&&xt(a),e&&u!==null&&!x&&!((i=a==null?void 0:a.reactions)!=null&&i.includes(t))&&(a.reactions??(a.reactions=[])).push(t),a.version>t.version)return!0}}e||E(t,p)}return!1}function An(t,n,r){throw t}function Ut(t){var it;var n=_,r=h,e=g,s=o,a=x,l=y,i=f,T=t.f;_=null,h=0,g=null,o=T&(w|z)?null:t,x=!O&&(T&R)!==0,y=null,f=t.ctx;try{var A=(0,t.fn)(),c=t.deps;if(_!==null){var v;if(H(t,h),c!==null&&h>0)for(c.length=h+_.length,v=0;v<_.length;v++)c[h+v]=_[v];else t.deps=c=_;if(!x)for(v=h;v<c.length;v++)((it=c[v]).reactions??(it.reactions=[])).push(t)}else c!==null&&h<c.length&&(H(t,h),c.length=h);return A}finally{_=n,h=r,g=e,o=s,x=a,y=l,f=i}}function gn(t,n){let r=n.reactions;if(r!==null){var e=r.indexOf(t);if(e!==-1){var s=r.length-1;s===0?r=n.reactions=null:(r[e]=r[s],r.pop())}}r===null&&n.f&m&&(_===null||!_.includes(n))&&(E(n,b),n.f&(R|V)||(n.f^=V),H(n,0))}function H(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)gn(t,r[e])}function B(t){var n=t.f;if(!(n&j)){E(t,p);var r=u;u=t;try{n&et?hn(t):qt(t),bt(t),Nt(t);var e=Ut(t);t.teardown=typeof e=="function"?e:null,t.version=jt}catch(s){An(s)}finally{u=r}}}function Vt(){C>1e3&&(C=0,rn()),C++}function Gt(t){var n=t.length;if(n!==0){Vt();var r=O;O=!0;try{for(var e=0;e<n;e++){var s=t[e];s.f&p||(s.f^=p);var a=[];Kt(s,a),In(a)}}finally{O=r}}}function In(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];!(e.f&(j|N))&&F(e)&&(B(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?Pt(e):e.fn=null))}}function kn(){if(M=!1,C>1001)return;const t=k;k=[],Gt(t),M||(C=0)}function W(t){U===Yt&&(M||(M=!0,queueMicrotask(kn)));for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(z|w)){if(!(r&p))return;n.f^=p}}k.push(n)}function Kt(t,n){var r=t.first,e=[];t:for(;r!==null;){var s=r.f,a=(s&w)!==0,l=a&&(s&p)!==0;if(!l&&!(s&N))if(s&Y){a?r.f^=p:F(r)&&B(r);var i=r.first;if(i!==null){r=i;continue}}else s&dt&&e.push(r);var T=r.next;if(T===null){let v=r.parent;for(;v!==null;){if(t===v)break t;var A=v.next;if(A!==null){r=A;continue t}v=v.parent}}r=T}for(var c=0;c<e.length;c++)i=e[c],n.push(i),Kt(i,n)}function $t(t){var n=U,r=k;try{Vt();const s=[];U=wn,k=s,M=!1,Gt(r);var e=t==null?void 0:t();return yn(),(k.length>0||s.length>0)&&$t(),C=0,e}finally{U=n,k=r}}async function Dr(){await Promise.resolve(),$t()}function Sn(t){var i;var n=t.f,r=(n&m)!==0;if(r&&n&j){var e=Dt(t);return at(t),e}if(o!==null){y!==null&&y.includes(t)&&en();var s=o.deps;_===null&&s!==null&&s[h]===t?h++:_===null?_=[t]:_.push(t),g!==null&&u!==null&&u.f&p&&!(u.f&w)&&g.includes(t)&&(E(u,I),W(u))}else if(r&&t.deps===null){var a=t,l=a.parent;l!==null&&!((i=l.deriveds)!=null&&i.includes(a))&&(l.deriveds??(l.deriveds=[])).push(a)}return r&&(a=t,F(a)&&xt(a)),t.v}function Rn(t){const n=o;try{return o=null,t()}finally{o=n}}const Dn=~(I|b|p);function E(t,n){t.f=t.f&Dn|n}function xr(t,n=!1,r){f={p:f,c:null,e:null,m:!1,s:t,x:null,l:null},J&&!n&&(f.l={s:null,u:null,r1:[],r2:st(!1)})}function Or(t){const n=f;if(n!==null){const l=n.e;if(l!==null){var r=u,e=o;n.e=null;try{for(var s=0;s<l.length;s++){var a=l[s];Z(a.effect),$(a.reaction),Ct(a.fn)}}finally{Z(r),$(e)}}f=n.p,n.m=!0}return{}}function Cr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(_t in t)rt(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&_t in r&&rt(r)}}}function rt(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{rt(t[e],n)}catch{}const r=zt(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Zt(r);for(let s in e){const a=e[s].get;if(a)try{a.call(t)}catch{}}}}}export{ur as $,an as A,st as B,Jn as C,D,Kn as E,Et as F,yr as G,fn as H,N as I,Er as J,f as K,Rn as L,ht as M,Sn as N,Pn as O,Cr as P,cn as Q,Rr as R,Mn as S,zt as T,Zt as U,Un as V,xr as W,cr as X,Ar as Y,Or as Z,_r as _,lr as a,vr as a0,_t as a1,Nn as a2,bn as a3,jn as a4,ln as a5,sr as a6,ft as a7,Bn as a8,Yn as a9,on as aA,gt as aB,It as aC,Hn as aD,wr as aE,Ct as aF,$t as aG,Dr as aH,Vn as aI,Xt as aJ,Fn as aa,w as ab,z as ac,Z as ad,J as ae,Xn as af,tr as ag,Ln as ah,hr as ai,Qn as aj,Tt as ak,Wn as al,nr as am,qn as an,dr as ao,ot as ap,lt as aq,Tr as ar,mr as as,Gn as at,or as au,$ as av,Cn as aw,rr as ax,er as ay,fr as az,pn as b,X as c,On as d,ar as e,d as f,kr as g,S as h,xn as i,gr as j,u as k,un as l,$n as m,Ft as n,pr as o,Ir as p,Sr as q,ir as r,L as s,dn as t,P as u,Zn as v,Q as w,_n as x,o as y,zn as z};
