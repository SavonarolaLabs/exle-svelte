import{a as K,b as H}from"../chunks/disclose-version.BLKDMZQ3.js";import"../chunks/legacy.D5_EWj1q.js";import{am as ue,aq as y,ar as g,as as x,ao as q,ap as fe,ay as Ie,az as Re,an as be,g as L,t as X,av as oe}from"../chunks/runtime.CkelMwpL.js";import{s as E}from"../chunks/render.DIxAzv3F.js";import{i as Ee}from"../chunks/if.D1WPA-yG.js";import{e as Ae,i as Le}from"../chunks/each.DN3wIlXp.js";import{s as $e,r as Pe}from"../chunks/attributes.DfSsnoEq.js";import{a as Te}from"../chunks/input.CPXcgIx6.js";import{i as pe}from"../chunks/lifecycle.CPJUkSGs.js";import{p as ke}from"../chunks/props.5NsL4bjt.js";function k(s){return Array.isArray?Array.isArray(s):ye(s)==="[object Array]"}const De=1/0;function Ce(s){if(typeof s=="string")return s;let e=s+"";return e=="0"&&1/s==-De?"-0":e}function Ne(s){return s==null?"":Ce(s)}function T(s){return typeof s=="string"}function ge(s){return typeof s=="number"}function Oe(s){return s===!0||s===!1||Fe(s)&&ye(s)=="[object Boolean]"}function me(s){return typeof s=="object"}function Fe(s){return me(s)&&s!==null}function I(s){return s!=null}function Y(s){return!s.trim().length}function ye(s){return s==null?s===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(s)}const je="Incorrect 'index' type",Ge=s=>`Invalid value for key ${s}`,Ue=s=>`Pattern length exceeds max of ${s}.`,ze=s=>`Missing ${s} property in key`,Qe=s=>`Property 'weight' in key '${s}' must be a positive integer`,ae=Object.prototype.hasOwnProperty;class We{constructor(e){this._keys=[],this._keyMap={};let t=0;e.forEach(n=>{let r=ve(n);this._keys.push(r),this._keyMap[r.id]=r,t+=r.weight}),this._keys.forEach(n=>{n.weight/=t})}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function ve(s){let e=null,t=null,n=null,r=1,i=null;if(T(s)||k(s))n=s,e=ce(s),t=Z(s);else{if(!ae.call(s,"name"))throw new Error(ze("name"));const o=s.name;if(n=o,ae.call(s,"weight")&&(r=s.weight,r<=0))throw new Error(Qe(o));e=ce(o),t=Z(o),i=s.getFn}return{path:e,id:t,weight:r,src:n,getFn:i}}function ce(s){return k(s)?s:s.split(".")}function Z(s){return k(s)?s.join("."):s}function Ke(s,e){let t=[],n=!1;const r=(i,o,a)=>{if(I(i))if(!o[a])t.push(i);else{let c=o[a];const l=i[c];if(!I(l))return;if(a===o.length-1&&(T(l)||ge(l)||Oe(l)))t.push(Ne(l));else if(k(l)){n=!0;for(let h=0,d=l.length;h<d;h+=1)r(l[h],o,a+1)}else o.length&&r(l,o,a+1)}};return r(s,T(e)?e.split("."):e,0),n?t:t[0]}const Be={includeMatches:!1,findAllMatches:!1,minMatchCharLength:1},He={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(s,e)=>s.score===e.score?s.idx<e.idx?-1:1:s.score<e.score?-1:1},Ve={location:0,threshold:.6,distance:100},Xe={useExtendedSearch:!1,getFn:Ke,ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};var u={...He,...Be,...Ve,...Xe};const Ye=/[^ ]+/g;function Je(s=1,e=3){const t=new Map,n=Math.pow(10,e);return{get(r){const i=r.match(Ye).length;if(t.has(i))return t.get(i);const o=1/Math.pow(i,.5*s),a=parseFloat(Math.round(o*n)/n);return t.set(i,a),a},clear(){t.clear()}}}class ie{constructor({getFn:e=u.getFn,fieldNormWeight:t=u.fieldNormWeight}={}){this.norm=Je(t,3),this.getFn=e,this.isCreated=!1,this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach((t,n)=>{this._keysMap[t.id]=n})}create(){this.isCreated||!this.docs.length||(this.isCreated=!0,T(this.docs[0])?this.docs.forEach((e,t)=>{this._addString(e,t)}):this.docs.forEach((e,t)=>{this._addObject(e,t)}),this.norm.clear())}add(e){const t=this.size();T(e)?this._addString(e,t):this._addObject(e,t)}removeAt(e){this.records.splice(e,1);for(let t=e,n=this.size();t<n;t+=1)this.records[t].i-=1}getValueForItemAtKeyId(e,t){return e[this._keysMap[t]]}size(){return this.records.length}_addString(e,t){if(!I(e)||Y(e))return;let n={v:e,i:t,n:this.norm.get(e)};this.records.push(n)}_addObject(e,t){let n={i:t,$:{}};this.keys.forEach((r,i)=>{let o=r.getFn?r.getFn(e):this.getFn(e,r.path);if(I(o)){if(k(o)){let a=[];const c=[{nestedArrIndex:-1,value:o}];for(;c.length;){const{nestedArrIndex:l,value:h}=c.pop();if(I(h))if(T(h)&&!Y(h)){let d={v:h,i:l,n:this.norm.get(h)};a.push(d)}else k(h)&&h.forEach((d,f)=>{c.push({nestedArrIndex:f,value:d})})}n.$[i]=a}else if(T(o)&&!Y(o)){let a={v:o,n:this.norm.get(o)};n.$[i]=a}}}),this.records.push(n)}toJSON(){return{keys:this.keys,records:this.records}}}function xe(s,e,{getFn:t=u.getFn,fieldNormWeight:n=u.fieldNormWeight}={}){const r=new ie({getFn:t,fieldNormWeight:n});return r.setKeys(s.map(ve)),r.setSources(e),r.create(),r}function qe(s,{getFn:e=u.getFn,fieldNormWeight:t=u.fieldNormWeight}={}){const{keys:n,records:r}=s,i=new ie({getFn:e,fieldNormWeight:t});return i.setKeys(n),i.setIndexRecords(r),i}function W(s,{errors:e=0,currentLocation:t=0,expectedLocation:n=0,distance:r=u.distance,ignoreLocation:i=u.ignoreLocation}={}){const o=e/s.length;if(i)return o;const a=Math.abs(n-t);return r?o+a/r:a?1:o}function Ze(s=[],e=u.minMatchCharLength){let t=[],n=-1,r=-1,i=0;for(let o=s.length;i<o;i+=1){let a=s[i];a&&n===-1?n=i:!a&&n!==-1&&(r=i-1,r-n+1>=e&&t.push([n,r]),n=-1)}return s[i-1]&&i-n>=e&&t.push([n,i-1]),t}const j=32;function et(s,e,t,{location:n=u.location,distance:r=u.distance,threshold:i=u.threshold,findAllMatches:o=u.findAllMatches,minMatchCharLength:a=u.minMatchCharLength,includeMatches:c=u.includeMatches,ignoreLocation:l=u.ignoreLocation}={}){if(e.length>j)throw new Error(Ue(j));const h=e.length,d=s.length,f=Math.max(0,Math.min(n,d));let p=i,m=f;const v=a>1||c,_=v?Array(d):[];let M;for(;(M=s.indexOf(e,m))>-1;){let S=W(e,{currentLocation:M,expectedLocation:f,distance:r,ignoreLocation:l});if(p=Math.min(S,p),m=M+h,v){let b=0;for(;b<h;)_[M+b]=1,b+=1}}m=-1;let A=[],R=1,$=h+d;const N=1<<h-1;for(let S=0;S<h;S+=1){let b=0,P=$;for(;b<P;)W(e,{errors:S,currentLocation:f+P,expectedLocation:f,distance:r,ignoreLocation:l})<=p?b=P:$=P,P=Math.floor(($-b)/2+b);$=P;let z=Math.max(1,f-P+1),O=o?d:Math.min(f+P,d)+h,D=Array(O+2);D[O+1]=(1<<S)-1;for(let w=O;w>=z;w-=1){let F=w-1,Q=t[s.charAt(F)];if(v&&(_[F]=+!!Q),D[w]=(D[w+1]<<1|1)&Q,S&&(D[w]|=(A[w+1]|A[w])<<1|1|A[w+1]),D[w]&N&&(R=W(e,{errors:S,currentLocation:F,expectedLocation:f,distance:r,ignoreLocation:l}),R<=p)){if(p=R,m=F,m<=f)break;z=Math.max(1,2*f-m)}}if(W(e,{errors:S+1,currentLocation:f,expectedLocation:f,distance:r,ignoreLocation:l})>p)break;A=D}const G={isMatch:m>=0,score:Math.max(.001,R)};if(v){const S=Ze(_,a);S.length?c&&(G.indices=S):G.isMatch=!1}return G}function tt(s){let e={};for(let t=0,n=s.length;t<n;t+=1){const r=s.charAt(t);e[r]=(e[r]||0)|1<<n-t-1}return e}class _e{constructor(e,{location:t=u.location,threshold:n=u.threshold,distance:r=u.distance,includeMatches:i=u.includeMatches,findAllMatches:o=u.findAllMatches,minMatchCharLength:a=u.minMatchCharLength,isCaseSensitive:c=u.isCaseSensitive,ignoreLocation:l=u.ignoreLocation}={}){if(this.options={location:t,threshold:n,distance:r,includeMatches:i,findAllMatches:o,minMatchCharLength:a,isCaseSensitive:c,ignoreLocation:l},this.pattern=c?e:e.toLowerCase(),this.chunks=[],!this.pattern.length)return;const h=(f,p)=>{this.chunks.push({pattern:f,alphabet:tt(f),startIndex:p})},d=this.pattern.length;if(d>j){let f=0;const p=d%j,m=d-p;for(;f<m;)h(this.pattern.substr(f,j),f),f+=j;if(p){const v=d-j;h(this.pattern.substr(v),v)}}else h(this.pattern,0)}searchIn(e){const{isCaseSensitive:t,includeMatches:n}=this.options;if(t||(e=e.toLowerCase()),this.pattern===e){let m={isMatch:!0,score:0};return n&&(m.indices=[[0,e.length-1]]),m}const{location:r,distance:i,threshold:o,findAllMatches:a,minMatchCharLength:c,ignoreLocation:l}=this.options;let h=[],d=0,f=!1;this.chunks.forEach(({pattern:m,alphabet:v,startIndex:_})=>{const{isMatch:M,score:A,indices:R}=et(e,m,v,{location:r+_,distance:i,threshold:o,findAllMatches:a,minMatchCharLength:c,includeMatches:n,ignoreLocation:l});M&&(f=!0),d+=A,M&&R&&(h=[...h,...R])});let p={isMatch:f,score:f?d/this.chunks.length:1};return f&&n&&(p.indices=h),p}}class C{constructor(e){this.pattern=e}static isMultiMatch(e){return le(e,this.multiRegex)}static isSingleMatch(e){return le(e,this.singleRegex)}search(){}}function le(s,e){const t=s.match(e);return t?t[1]:null}class st extends C{constructor(e){super(e)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(e){const t=e===this.pattern;return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}}class nt extends C{constructor(e){super(e)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(e){const n=e.indexOf(this.pattern)===-1;return{isMatch:n,score:n?0:1,indices:[0,e.length-1]}}}class rt extends C{constructor(e){super(e)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(e){const t=e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}}class it extends C{constructor(e){super(e)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(e){const t=!e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}}class ot extends C{constructor(e){super(e)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(e){const t=e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[e.length-this.pattern.length,e.length-1]}}}class at extends C{constructor(e){super(e)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(e){const t=!e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}}class Me extends C{constructor(e,{location:t=u.location,threshold:n=u.threshold,distance:r=u.distance,includeMatches:i=u.includeMatches,findAllMatches:o=u.findAllMatches,minMatchCharLength:a=u.minMatchCharLength,isCaseSensitive:c=u.isCaseSensitive,ignoreLocation:l=u.ignoreLocation}={}){super(e),this._bitapSearch=new _e(e,{location:t,threshold:n,distance:r,includeMatches:i,findAllMatches:o,minMatchCharLength:a,isCaseSensitive:c,ignoreLocation:l})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(e){return this._bitapSearch.searchIn(e)}}class Se extends C{constructor(e){super(e)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(e){let t=0,n;const r=[],i=this.pattern.length;for(;(n=e.indexOf(this.pattern,t))>-1;)t=n+i,r.push([n,t-1]);const o=!!r.length;return{isMatch:o,score:o?0:1,indices:r}}}const ee=[st,Se,rt,it,at,ot,nt,Me],he=ee.length,ct=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,lt="|";function ht(s,e={}){return s.split(lt).map(t=>{let n=t.trim().split(ct).filter(i=>i&&!!i.trim()),r=[];for(let i=0,o=n.length;i<o;i+=1){const a=n[i];let c=!1,l=-1;for(;!c&&++l<he;){const h=ee[l];let d=h.isMultiMatch(a);d&&(r.push(new h(d,e)),c=!0)}if(!c)for(l=-1;++l<he;){const h=ee[l];let d=h.isSingleMatch(a);if(d){r.push(new h(d,e));break}}}return r})}const dt=new Set([Me.type,Se.type]);class ut{constructor(e,{isCaseSensitive:t=u.isCaseSensitive,includeMatches:n=u.includeMatches,minMatchCharLength:r=u.minMatchCharLength,ignoreLocation:i=u.ignoreLocation,findAllMatches:o=u.findAllMatches,location:a=u.location,threshold:c=u.threshold,distance:l=u.distance}={}){this.query=null,this.options={isCaseSensitive:t,includeMatches:n,minMatchCharLength:r,findAllMatches:o,ignoreLocation:i,location:a,threshold:c,distance:l},this.pattern=t?e:e.toLowerCase(),this.query=ht(this.pattern,this.options)}static condition(e,t){return t.useExtendedSearch}searchIn(e){const t=this.query;if(!t)return{isMatch:!1,score:1};const{includeMatches:n,isCaseSensitive:r}=this.options;e=r?e:e.toLowerCase();let i=0,o=[],a=0;for(let c=0,l=t.length;c<l;c+=1){const h=t[c];o.length=0,i=0;for(let d=0,f=h.length;d<f;d+=1){const p=h[d],{isMatch:m,indices:v,score:_}=p.search(e);if(m){if(i+=1,a+=_,n){const M=p.constructor.type;dt.has(M)?o=[...o,...v]:o.push(v)}}else{a=0,i=0,o.length=0;break}}if(i){let d={isMatch:!0,score:a/i};return n&&(d.indices=o),d}}return{isMatch:!1,score:1}}}const te=[];function ft(...s){te.push(...s)}function se(s,e){for(let t=0,n=te.length;t<n;t+=1){let r=te[t];if(r.condition(s,e))return new r(s,e)}return new _e(s,e)}const B={AND:"$and",OR:"$or"},ne={PATH:"$path",PATTERN:"$val"},re=s=>!!(s[B.AND]||s[B.OR]),pt=s=>!!s[ne.PATH],gt=s=>!k(s)&&me(s)&&!re(s),de=s=>({[B.AND]:Object.keys(s).map(e=>({[e]:s[e]}))});function we(s,e,{auto:t=!0}={}){const n=r=>{let i=Object.keys(r);const o=pt(r);if(!o&&i.length>1&&!re(r))return n(de(r));if(gt(r)){const c=o?r[ne.PATH]:i[0],l=o?r[ne.PATTERN]:r[c];if(!T(l))throw new Error(Ge(c));const h={keyId:Z(c),pattern:l};return t&&(h.searcher=se(l,e)),h}let a={children:[],operator:i[0]};return i.forEach(c=>{const l=r[c];k(l)&&l.forEach(h=>{a.children.push(n(h))})}),a};return re(s)||(s=de(s)),n(s)}function mt(s,{ignoreFieldNorm:e=u.ignoreFieldNorm}){s.forEach(t=>{let n=1;t.matches.forEach(({key:r,norm:i,score:o})=>{const a=r?r.weight:null;n*=Math.pow(o===0&&a?Number.EPSILON:o,(a||1)*(e?1:i))}),t.score=n})}function yt(s,e){const t=s.matches;e.matches=[],I(t)&&t.forEach(n=>{if(!I(n.indices)||!n.indices.length)return;const{indices:r,value:i}=n;let o={indices:r,value:i};n.key&&(o.key=n.key.src),n.idx>-1&&(o.refIndex=n.idx),e.matches.push(o)})}function vt(s,e){e.score=s.score}function xt(s,e,{includeMatches:t=u.includeMatches,includeScore:n=u.includeScore}={}){const r=[];return t&&r.push(yt),n&&r.push(vt),s.map(i=>{const{idx:o}=i,a={item:e[o],refIndex:o};return r.length&&r.forEach(c=>{c(i,a)}),a})}class U{constructor(e,t={},n){this.options={...u,...t},this.options.useExtendedSearch,this._keyStore=new We(this.options.keys),this.setCollection(e,n)}setCollection(e,t){if(this._docs=e,t&&!(t instanceof ie))throw new Error(je);this._myIndex=t||xe(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(e){I(e)&&(this._docs.push(e),this._myIndex.add(e))}remove(e=()=>!1){const t=[];for(let n=0,r=this._docs.length;n<r;n+=1){const i=this._docs[n];e(i,n)&&(this.removeAt(n),n-=1,r-=1,t.push(i))}return t}removeAt(e){this._docs.splice(e,1),this._myIndex.removeAt(e)}getIndex(){return this._myIndex}search(e,{limit:t=-1}={}){const{includeMatches:n,includeScore:r,shouldSort:i,sortFn:o,ignoreFieldNorm:a}=this.options;let c=T(e)?T(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e);return mt(c,{ignoreFieldNorm:a}),i&&c.sort(o),ge(t)&&t>-1&&(c=c.slice(0,t)),xt(c,this._docs,{includeMatches:n,includeScore:r})}_searchStringList(e){const t=se(e,this.options),{records:n}=this._myIndex,r=[];return n.forEach(({v:i,i:o,n:a})=>{if(!I(i))return;const{isMatch:c,score:l,indices:h}=t.searchIn(i);c&&r.push({item:i,idx:o,matches:[{score:l,value:i,norm:a,indices:h}]})}),r}_searchLogical(e){const t=we(e,this.options),n=(a,c,l)=>{if(!a.children){const{keyId:d,searcher:f}=a,p=this._findMatches({key:this._keyStore.get(d),value:this._myIndex.getValueForItemAtKeyId(c,d),searcher:f});return p&&p.length?[{idx:l,item:c,matches:p}]:[]}const h=[];for(let d=0,f=a.children.length;d<f;d+=1){const p=a.children[d],m=n(p,c,l);if(m.length)h.push(...m);else if(a.operator===B.AND)return[]}return h},r=this._myIndex.records,i={},o=[];return r.forEach(({$:a,i:c})=>{if(I(a)){let l=n(t,a,c);l.length&&(i[c]||(i[c]={idx:c,item:a,matches:[]},o.push(i[c])),l.forEach(({matches:h})=>{i[c].matches.push(...h)}))}}),o}_searchObjectList(e){const t=se(e,this.options),{keys:n,records:r}=this._myIndex,i=[];return r.forEach(({$:o,i:a})=>{if(!I(o))return;let c=[];n.forEach((l,h)=>{c.push(...this._findMatches({key:l,value:o[h],searcher:t}))}),c.length&&i.push({idx:a,item:o,matches:c})}),i}_findMatches({key:e,value:t,searcher:n}){if(!I(t))return[];let r=[];if(k(t))t.forEach(({v:i,i:o,n:a})=>{if(!I(i))return;const{isMatch:c,score:l,indices:h}=n.searchIn(i);c&&r.push({score:l,key:e,value:i,idx:o,norm:a,indices:h})});else{const{v:i,n:o}=t,{isMatch:a,score:c,indices:l}=n.searchIn(i);a&&r.push({score:c,key:e,value:i,norm:o,indices:l})}return r}}U.version="7.0.0";U.createIndex=xe;U.parseIndex=qe;U.config=u;U.parseQuery=we;ft(ut);var _t=H('<div class="loan-widget rounded-lg border border-gray-300 bg-[var(--bg-color)] p-6 shadow"><div class="mb-2 flex items-center justify-between"><span class="text-sm text-gray-500"> </span> <span class="text-sm font-semibold text-[var(--text-color)]"> </span></div> <h3 class="mb-2 text-lg font-semibold text-[var(--text-color)]"> </h3> <p class="mb-4 text-sm text-gray-600"> </p> <ul class="mb-4 space-y-2 text-sm text-[var(--text-color)]"><li class="flex items-center"><svg class="mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h6v-2h-4z"></path></svg> <span> </span></li> <li class="flex items-center"><svg class="mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm-.5 13h-2v-2h2v2zm0-4h-2V7h2v4z"></path></svg> <span> </span></li></ul> <div class="mb-4"><div class="mb-1 flex items-center justify-between text-sm"><span>Funding Goal:</span> <span class="font-semibold text-[var(--text-color)]"> </span></div> <div class="h-2 w-full overflow-hidden rounded-full bg-gray-200"><div class="h-full bg-green-500"></div></div> <div class="mt-1 flex items-center justify-between text-sm"><span class="text-green-600"> </span> <span class="text-gray-600"> </span></div></div> <p class="text-sm text-gray-500"> </p></div>');function Mt(s,e){ue(e,!1);let t=ke(e,"loan",8);pe();var n=_t(),r=y(n),i=y(r),o=y(i,!0);g(i);var a=x(i,2),c=y(a,!0);g(a),g(r);var l=x(r,2),h=y(l,!0);g(l);var d=x(l,2),f=y(d,!0);g(d);var p=x(d,2),m=y(p),v=x(y(m),2),_=y(v,!0);g(v),g(m);var M=x(m,2),A=x(y(M),2),R=y(A,!0);g(A),g(M),g(p);var $=x(p,2),N=y($),G=x(y(N),2),S=y(G,!0);g(G),g(N);var b=x(N,2),P=y(b);g(b);var z=x(b,2),O=y(z),D=y(O,!0);g(O);var V=x(O,2),w=y(V);g(V),g(z),g($);var F=x($,2),Q=y(F);g(F),g(n),q(()=>{E(o,t().loanId),E(c,t().loanType),E(h,t().loanTitle),E(f,t().loanDescription),E(_,t().repaymentPeriod),E(R,t().interestRate),E(S,t().fundingGoal),$e(P,"style",`width: ${t().fundedPercentage??""}%`),E(D,t().fundedAmount),E(w,`${t().daysLeft??""} Days Left`),E(Q,`Created by: ${t().creator??""}`)}),K(s,n),fe()}const J=[{loanId:"545271...2067cc",loanType:"Crowdloan",loanTitle:"Sweetwaters Shop",loanDescription:"Requesting for $1000 loan to increase my store stock and product ranges to draw more customers during this Christmas shopping season.",repaymentPeriod:"90 Days Repayment Period",interestRate:"4.5% Interest Rate",fundingGoal:"1,500.00 SigUSD",fundedAmount:"$1,142",fundedPercentage:76,daysLeft:31,creator:"9eq6S...QXssg"},{loanId:"453231...2078dd",loanType:"Crowdloan",loanTitle:"Village Bakery",loanDescription:"Looking for a $500 loan to modernize equipment and improve product quality for local customers.",repaymentPeriod:"60 Days Repayment Period",interestRate:"3.5% Interest Rate",fundingGoal:"500.00 SigUSD",fundedAmount:"$300",fundedPercentage:60,daysLeft:20,creator:"8pd6T...QXndg"},{loanId:"348912...1267ab",loanType:"Crowdloan",loanTitle:"Tech Startup Expansion",loanDescription:"Seeking $10,000 to expand our innovative tech startup, increasing production capacity and market presence.",repaymentPeriod:"120 Days Repayment Period",interestRate:"6.5% Interest Rate",fundingGoal:"10,000.00 SigUSD",fundedAmount:"$7,500",fundedPercentage:75,daysLeft:45,creator:"7fg3S...XHdga"},{loanId:"897321...1190aa",loanType:"Crowdloan",loanTitle:"Local Farm Sustainability",loanDescription:"Raising $2,000 to invest in eco-friendly farming tools and practices for better yield and sustainability.",repaymentPeriod:"90 Days Repayment Period",interestRate:"4.0% Interest Rate",fundingGoal:"2,000.00 SigUSD",fundedAmount:"$1,300",fundedPercentage:65,daysLeft:28,creator:"4op6G...QWerr"},{loanId:"657823...3145bb",loanType:"Crowdloan",loanTitle:"Bookstore Renovation",loanDescription:"Looking for $1,200 to renovate our family-owned bookstore and attract more customers.",repaymentPeriod:"60 Days Repayment Period",interestRate:"3.8% Interest Rate",fundingGoal:"1,200.00 SigUSD",fundedAmount:"$800",fundedPercentage:66,daysLeft:15,creator:"2ty7U...QRffe"},{loanId:"234921...7644cc",loanType:"Crowdloan",loanTitle:"Artisan Coffee Expansion",loanDescription:"Seeking $5,000 to expand our coffee business to more locations in the city.",repaymentPeriod:"120 Days Repayment Period",interestRate:"5.0% Interest Rate",fundingGoal:"5,000.00 SigUSD",fundedAmount:"$3,400",fundedPercentage:68,daysLeft:38,creator:"3kl9T...QErfg"},{loanId:"874562...5412dd",loanType:"Crowdloan",loanTitle:"Community Gym Equipment",loanDescription:"Requesting $3,000 to upgrade gym equipment for our community fitness center.",repaymentPeriod:"90 Days Repayment Period",interestRate:"4.2% Interest Rate",fundingGoal:"3,000.00 SigUSD",fundedAmount:"$2,500",fundedPercentage:83,daysLeft:12,creator:"6nm1H...QRsad"},{loanId:"974563...7655ee",loanType:"Crowdloan",loanTitle:"Solar Energy Project",loanDescription:"Looking for $15,000 to set up solar panels and promote renewable energy solutions in our town.",repaymentPeriod:"180 Days Repayment Period",interestRate:"7.0% Interest Rate",fundingGoal:"15,000.00 SigUSD",fundedAmount:"$10,000",fundedPercentage:67,daysLeft:60,creator:"8lo5R...QXcfd"},{loanId:"176234...9806ff",loanType:"Crowdloan",loanTitle:"Mobile App Development",loanDescription:"Seeking $8,000 to launch a mobile app that connects small businesses with local customers.",repaymentPeriod:"120 Days Repayment Period",interestRate:"6.0% Interest Rate",fundingGoal:"8,000.00 SigUSD",fundedAmount:"$6,000",fundedPercentage:75,daysLeft:35,creator:"5rd3L...QKffd"},{loanId:"238764...5632gg",loanType:"Crowdloan",loanTitle:"Eco Clothing Line",loanDescription:"Raising $3,500 to launch an eco-friendly clothing line made from sustainable materials.",repaymentPeriod:"90 Days Repayment Period",interestRate:"4.8% Interest Rate",fundingGoal:"3,500.00 SigUSD",fundedAmount:"$2,000",fundedPercentage:57,daysLeft:25,creator:"9as3T...QWeer"},{loanId:"325614...4365hh",loanType:"Crowdloan",loanTitle:"Culinary School Startup",loanDescription:"Requesting $7,500 to start a culinary school focused on underprivileged youth.",repaymentPeriod:"150 Days Repayment Period",interestRate:"5.5% Interest Rate",fundingGoal:"7,500.00 SigUSD",fundedAmount:"$5,500",fundedPercentage:73,daysLeft:42,creator:"3lo8T...QJqqd"},{loanId:"543219...2311ii",loanType:"Crowdloan",loanTitle:"Music Studio Upgrade",loanDescription:"Looking for $4,000 to upgrade our music studio equipment for better production quality.",repaymentPeriod:"90 Days Repayment Period",interestRate:"4.5% Interest Rate",fundingGoal:"4,000.00 SigUSD",fundedAmount:"$3,000",fundedPercentage:75,daysLeft:30,creator:"4lk6R...QWeew"}];var St=H('<p class="text-center text-gray-500">No loans found. Try a different search term.</p>'),wt=H('<p class="mb-4 text-sm text-gray-500"> </p> <div id="loans-grid" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"></div>',1),It=H('<div class="container mx-auto py-8"><header class="mb-8 flex items-center justify-between"><div><h1 class="text-2xl font-semibold">Loans on EXLE</h1> <p class="text-sm"> </p></div> <div class="flex items-center gap-4"><input type="text" placeholder="Search in loans name, ID, details..." class="w-80 rounded-md border bg-light-background px-4 py-2 dark:bg-dark-background"></div></header> <!></div>');function Ct(s,e){ue(e,!1);const t={includeScore:!0,shouldSort:!0,threshold:.4,keys:["loanTitle","loanDescription","loanId",{name:"borrowerName",weight:.7},{name:"loanPurpose",weight:.5}]},n=new U(J,t);let r=oe(""),i=oe(J);function o(){if(!L(r)||L(r).trim()===""){X(i,J);return}const v=n.search(L(r));X(i,v.map(_=>_.item))}Ie(()=>L(r),()=>{L(r),o()}),Re(),pe();var a=It(),c=y(a),l=y(c),h=x(y(l),2),d=y(h);g(h),g(l);var f=x(l,2),p=y(f);Pe(p),g(f),g(c);var m=x(c,2);Ee(m,()=>L(i).length===0,v=>{var _=St();K(v,_)},v=>{var _=wt(),M=be(_),A=y(M);g(M);var R=x(M,2);Ae(R,5,()=>L(i),Le,($,N)=>{Mt($,{get loan(){return L(N)}})}),g(R),q(()=>E(A,`${L(i).length??""} Active Loans`)),K(v,_)}),g(a),q(()=>E(d,`${L(i).length??""} Active Loans`)),Te(p,()=>L(r),v=>X(r,v)),K(s,a),fe()}export{Ct as component};
