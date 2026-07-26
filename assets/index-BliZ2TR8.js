var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function l(e){let t=Object.create(null);for(let n of e.split(`,`))t[n]=1;return e=>e in t}var u={},d=[],f=()=>{},p=()=>!1,m=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),h=e=>e.startsWith(`onUpdate:`),g=Object.assign,_=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},v=Object.prototype.hasOwnProperty,y=(e,t)=>v.call(e,t),b=Array.isArray,x=e=>k(e)===`[object Map]`,S=e=>k(e)===`[object Set]`,C=e=>k(e)===`[object Date]`,w=e=>typeof e==`function`,T=e=>typeof e==`string`,E=e=>typeof e==`symbol`,D=e=>typeof e==`object`&&!!e,ee=e=>(D(e)||w(e))&&w(e.then)&&w(e.catch),O=Object.prototype.toString,k=e=>O.call(e),te=e=>k(e).slice(8,-1),A=e=>k(e)===`[object Object]`,j=e=>T(e)&&e!==`NaN`&&e[0]!==`-`&&``+parseInt(e,10)===e,M=l(`,key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted`),N=e=>{let t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},ne=/-\w/g,P=N(e=>e.replace(ne,e=>e.slice(1).toUpperCase())),re=/\B([A-Z])/g,ie=N(e=>e.replace(re,`-$1`).toLowerCase()),ae=N(e=>e.charAt(0).toUpperCase()+e.slice(1)),oe=N(e=>e?`on${ae(e)}`:``),F=(e,t)=>!Object.is(e,t),se=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},ce=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},le=e=>{let t=parseFloat(e);return isNaN(t)?e:t},ue=e=>{let t=T(e)?Number(e):NaN;return isNaN(t)?e:t},de,fe=()=>de||=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{};function pe(e){if(b(e)){let t={};for(let n=0;n<e.length;n++){let r=e[n],i=T(r)?_e(r):pe(r);if(i)for(let e in i)t[e]=i[e]}return t}else if(T(e)||D(e))return e}var me=/;(?![^(]*\))/g,he=/:([^]+)/,ge=/\/\*[^]*?\*\//g;function _e(e){let t={};return e.replace(ge,``).split(me).forEach(e=>{if(e){let n=e.split(he);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function ve(e){let t=``;if(T(e))t=e;else if(b(e))for(let n=0;n<e.length;n++){let r=ve(e[n]);r&&(t+=r+` `)}else if(D(e))for(let n in e)e[n]&&(t+=n+` `);return t.trim()}function ye(e){if(!e)return null;let{class:t,style:n}=e;return t&&!T(t)&&(e.class=ve(t)),n&&(e.style=pe(n)),e}var be=`itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`,xe=l(be);be+``;function Se(e){return!!e||e===``}function Ce(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=we(e[r],t[r]);return n}function we(e,t){if(e===t)return!0;let n=C(e),r=C(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=E(e),r=E(t),n||r)return e===t;if(n=b(e),r=b(t),n||r)return n&&r?Ce(e,t):!1;if(n=D(e),r=D(t),n||r){if(!n||!r||Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e){let r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!we(e[n],t[n]))return!1}}return String(e)===String(t)}var Te=e=>!!(e&&e.__v_isRef===!0),Ee=e=>T(e)?e:e==null?``:b(e)||D(e)&&(e.toString===O||!w(e.toString))?Te(e)?Ee(e.value):JSON.stringify(e,De,2):String(e),De=(e,t)=>Te(t)?De(e,t.value):x(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[Oe(t,r)+` =>`]=n,e),{})}:S(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>Oe(e))}:E(t)?Oe(t):D(t)&&!b(t)&&!A(t)?String(t):t,Oe=(e,t=``)=>E(e)?`Symbol(${e.description??t})`:e,I,ke=class{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&I&&(I.active?(this.parent=I,this.index=(I.scopes||=[]).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){let t=I;try{return I=this,e()}finally{I=t}}}on(){++this._on===1&&(this.prevScope=I,I=this)}off(){if(this._on>0&&--this._on===0){if(I===this)I=this.prevScope;else{let e=I;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}};function Ae(e){return new ke(e)}function je(){return I}function Me(e,t=!1){I&&I.cleanups.push(e)}var L,Ne=new WeakSet,Pe=class{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,I&&(I.active?I.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ne.has(this)&&(Ne.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Re(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ze(this),Ve(this);let e=L,t=qe;L=this,qe=!0;try{return this.fn()}finally{He(this),L=e,qe=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Ge(e);this.deps=this.depsTail=void 0,Ze(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ne.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ue(this)&&this.run()}get dirty(){return Ue(this)}},Fe=0,Ie,Le;function Re(e,t=!1){if(e.flags|=8,t){e.next=Le,Le=e;return}e.next=Ie,Ie=e}function ze(){Fe++}function Be(){if(--Fe>0)return;if(Le){let e=Le;for(Le=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;for(;Ie;){let t=Ie;for(Ie=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(t){e||=t}t=n}}if(e)throw e}function Ve(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function He(e){let t,n=e.depsTail,r=n;for(;r;){let e=r.prevDep;r.version===-1?(r===n&&(n=e),Ge(r),Ke(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function Ue(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(We(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function We(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===Qe)||(e.globalVersion=Qe,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Ue(e))))return;e.flags|=2;let t=e.dep,n=L,r=qe;L=e,qe=!0;try{Ve(e);let n=e.fn(e._value);(t.version===0||F(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(e){throw t.version++,e}finally{L=n,qe=r,He(e),e.flags&=-3}}function Ge(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)Ge(e,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Ke(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}var qe=!0,Je=[];function Ye(){Je.push(qe),qe=!1}function Xe(){let e=Je.pop();qe=e===void 0?!0:e}function Ze(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=L;L=void 0;try{t()}finally{L=e}}}var Qe=0,$e=class{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},et=class{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!L||!qe||L===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==L)t=this.activeLink=new $e(L,this),L.deps?(t.prevDep=L.depsTail,L.depsTail.nextDep=t,L.depsTail=t):L.deps=L.depsTail=t,tt(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=L.depsTail,t.nextDep=void 0,L.depsTail.nextDep=t,L.depsTail=t,L.deps===t&&(L.deps=e)}return t}trigger(e){this.version++,Qe++,this.notify(e)}notify(e){ze();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{Be()}}};function tt(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)tt(e)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var nt=new WeakMap,rt=Symbol(``),it=Symbol(``),at=Symbol(``);function ot(e,t,n){if(qe&&L){let t=nt.get(e);t||nt.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new et),r.map=t,r.key=n),r.track()}}function st(e,t,n,r,i,a){let o=nt.get(e);if(!o){Qe++;return}let s=e=>{e&&e.trigger()};if(ze(),t===`clear`)o.forEach(s);else{let i=b(e),a=i&&j(n);if(i&&n===`length`){let e=Number(r);o.forEach((t,n)=>{(n===`length`||n===at||!E(n)&&n>=e)&&s(t)})}else switch((n!==void 0||o.has(void 0))&&s(o.get(n)),a&&s(o.get(at)),t){case`add`:i?a&&s(o.get(`length`)):(s(o.get(rt)),x(e)&&s(o.get(it)));break;case`delete`:i||(s(o.get(rt)),x(e)&&s(o.get(it)));break;case`set`:x(e)&&s(o.get(rt));break}}Be()}function ct(e,t){let n=nt.get(e);return n&&n.get(t)}function lt(e){let t=R(e);return t===e?t:(ot(t,`iterate`,at),Yt(e)?t:t.map(Qt))}function ut(e){return ot(e=R(e),`iterate`,at),e}function dt(e,t){return Jt(e)?$t(qt(e)?Qt(t):t):Qt(t)}var ft={__proto__:null,[Symbol.iterator](){return pt(this,Symbol.iterator,e=>dt(this,e))},concat(...e){return lt(this).concat(...e.map(e=>b(e)?lt(e):e))},entries(){return pt(this,`entries`,e=>(e[1]=dt(this,e[1]),e))},every(e,t){return ht(this,`every`,e,t,void 0,arguments)},filter(e,t){return ht(this,`filter`,e,t,e=>e.map(e=>dt(this,e)),arguments)},find(e,t){return ht(this,`find`,e,t,e=>dt(this,e),arguments)},findIndex(e,t){return ht(this,`findIndex`,e,t,void 0,arguments)},findLast(e,t){return ht(this,`findLast`,e,t,e=>dt(this,e),arguments)},findLastIndex(e,t){return ht(this,`findLastIndex`,e,t,void 0,arguments)},forEach(e,t){return ht(this,`forEach`,e,t,void 0,arguments)},includes(...e){return _t(this,`includes`,e)},indexOf(...e){return _t(this,`indexOf`,e)},join(e){return lt(this).join(e)},lastIndexOf(...e){return _t(this,`lastIndexOf`,e)},map(e,t){return ht(this,`map`,e,t,void 0,arguments)},pop(){return vt(this,`pop`)},push(...e){return vt(this,`push`,e)},reduce(e,...t){return gt(this,`reduce`,e,t)},reduceRight(e,...t){return gt(this,`reduceRight`,e,t)},shift(){return vt(this,`shift`)},some(e,t){return ht(this,`some`,e,t,void 0,arguments)},splice(...e){return vt(this,`splice`,e)},toReversed(){return lt(this).toReversed()},toSorted(e){return lt(this).toSorted(e)},toSpliced(...e){return lt(this).toSpliced(...e)},unshift(...e){return vt(this,`unshift`,e)},values(){return pt(this,`values`,e=>dt(this,e))}};function pt(e,t,n){let r=ut(e),i=r[t]();return r!==e&&!Yt(e)&&(i._next=i.next,i.next=()=>{let e=i._next();return e.done||(e.value=n(e.value)),e}),i}var mt=Array.prototype;function ht(e,t,n,r,i,a){let o=ut(e),s=o!==e&&!Yt(e),c=o[t];if(c!==mt[t]){let t=c.apply(e,a);return s?Qt(t):t}let l=n;o!==e&&(s?l=function(t,r){return n.call(this,dt(e,t),r,e)}:n.length>2&&(l=function(t,r){return n.call(this,t,r,e)}));let u=c.call(o,l,r);return s&&i?i(u):u}function gt(e,t,n,r){let i=ut(e),a=i!==e&&!Yt(e),o=n,s=!1;i!==e&&(a?(s=r.length===0,o=function(t,r,i){return s&&(s=!1,t=dt(e,t)),n.call(this,t,dt(e,r),i,e)}):n.length>3&&(o=function(t,r,i){return n.call(this,t,r,i,e)}));let c=i[t](o,...r);return s?dt(e,c):c}function _t(e,t,n){let r=R(e);ot(r,`iterate`,at);let i=r[t](...n);return(i===-1||i===!1)&&Xt(n[0])?(n[0]=R(n[0]),r[t](...n)):i}function vt(e,t,n=[]){Ye(),ze();let r=R(e)[t].apply(e,n);return Be(),Xe(),r}var yt=l(`__proto__,__v_isRef,__isVue`),bt=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!==`arguments`&&e!==`caller`).map(e=>Symbol[e]).filter(E));function xt(e){E(e)||(e=String(e));let t=R(this);return ot(t,`has`,e),t.hasOwnProperty(e)}var St=class{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t===`__v_skip`)return e.__v_skip;let r=this._isReadonly,i=this._isShallow;if(t===`__v_isReactive`)return!r;if(t===`__v_isReadonly`)return r;if(t===`__v_isShallow`)return i;if(t===`__v_raw`)return n===(r?i?Bt:zt:i?Rt:Lt).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let a=b(e);if(!r){let e;if(a&&(e=ft[t]))return e;if(t===`hasOwnProperty`)return xt}let o=Reflect.get(e,t,z(e)?e:n);if((E(t)?bt.has(t):yt(t))||(r||ot(e,`get`,t),i))return o;if(z(o)){let e=a&&j(t)?o:o.value;return r&&D(e)?Gt(e):e}return D(o)?r?Gt(o):Ut(o):o}},Ct=class extends St{constructor(e=!1){super(!1,e)}set(e,t,n,r){let i=e[t],a=b(e)&&j(t);if(!this._isShallow){let e=Jt(i);if(!Yt(n)&&!Jt(n)&&(i=R(i),n=R(n)),!a&&z(i)&&!z(n))return e||(i.value=n),!0}let o=a?Number(t)<e.length:y(e,t),s=Reflect.set(e,t,n,z(e)?e:r);return e===R(r)&&(o?F(n,i)&&st(e,`set`,t,n,i):st(e,`add`,t,n)),s}deleteProperty(e,t){let n=y(e,t),r=e[t],i=Reflect.deleteProperty(e,t);return i&&n&&st(e,`delete`,t,void 0,r),i}has(e,t){let n=Reflect.has(e,t);return(!E(t)||!bt.has(t))&&ot(e,`has`,t),n}ownKeys(e){return ot(e,`iterate`,b(e)?`length`:rt),Reflect.ownKeys(e)}},wt=class extends St{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}},Tt=new Ct,Et=new wt,Dt=new Ct(!0),Ot=e=>e,kt=e=>Reflect.getPrototypeOf(e);function At(e,t,n){return function(...r){let i=this.__v_raw,a=R(i),o=x(a),s=e===`entries`||e===Symbol.iterator&&o,c=e===`keys`&&o,l=i[e](...r),u=n?Ot:t?$t:Qt;return!t&&ot(a,`iterate`,c?it:rt),g(Object.create(l),{next(){let{value:e,done:t}=l.next();return t?{value:e,done:t}:{value:s?[u(e[0]),u(e[1])]:u(e),done:t}}})}}function jt(e){return function(...t){return e===`delete`?!1:e===`clear`?void 0:this}}function Mt(e,t){let n={get(n){let r=this.__v_raw,i=R(r),a=R(n);e||(F(n,a)&&ot(i,`get`,n),ot(i,`get`,a));let{has:o}=kt(i),s=t?Ot:e?$t:Qt;if(o.call(i,n))return s(r.get(n));if(o.call(i,a))return s(r.get(a));r!==i&&r.get(n)},get size(){let t=this.__v_raw;return!e&&ot(R(t),`iterate`,rt),t.size},has(t){let n=this.__v_raw,r=R(n),i=R(t);return e||(F(t,i)&&ot(r,`has`,t),ot(r,`has`,i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,a=i.__v_raw,o=R(a),s=t?Ot:e?$t:Qt;return!e&&ot(o,`iterate`,rt),a.forEach((e,t)=>n.call(r,s(e),s(t),i))}};return g(n,e?{add:jt(`add`),set:jt(`set`),delete:jt(`delete`),clear:jt(`clear`)}:{add(e){let n=R(this),r=kt(n),i=R(e),a=!t&&!Yt(e)&&!Jt(e)?i:e;return r.has.call(n,a)||F(e,a)&&r.has.call(n,e)||F(i,a)&&r.has.call(n,i)||(n.add(a),st(n,`add`,a,a)),this},set(e,n){!t&&!Yt(n)&&!Jt(n)&&(n=R(n));let r=R(this),{has:i,get:a}=kt(r),o=i.call(r,e);o||=(e=R(e),i.call(r,e));let s=a.call(r,e);return r.set(e,n),o?F(n,s)&&st(r,`set`,e,n,s):st(r,`add`,e,n),this},delete(e){let t=R(this),{has:n,get:r}=kt(t),i=n.call(t,e);i||=(e=R(e),n.call(t,e));let a=r?r.call(t,e):void 0,o=t.delete(e);return i&&st(t,`delete`,e,void 0,a),o},clear(){let e=R(this),t=e.size!==0,n=e.clear();return t&&st(e,`clear`,void 0,void 0,void 0),n}}),[`keys`,`values`,`entries`,Symbol.iterator].forEach(r=>{n[r]=At(r,e,t)}),n}function Nt(e,t){let n=Mt(e,t);return(t,r,i)=>r===`__v_isReactive`?!e:r===`__v_isReadonly`?e:r===`__v_raw`?t:Reflect.get(y(n,r)&&r in t?n:t,r,i)}var Pt={get:Nt(!1,!1)},Ft={get:Nt(!1,!0)},It={get:Nt(!0,!1)},Lt=new WeakMap,Rt=new WeakMap,zt=new WeakMap,Bt=new WeakMap;function Vt(e){switch(e){case`Object`:case`Array`:return 1;case`Map`:case`Set`:case`WeakMap`:case`WeakSet`:return 2;default:return 0}}function Ht(e){return e.__v_skip||!Object.isExtensible(e)?0:Vt(te(e))}function Ut(e){return Jt(e)?e:Kt(e,!1,Tt,Pt,Lt)}function Wt(e){return Kt(e,!1,Dt,Ft,Rt)}function Gt(e){return Kt(e,!0,Et,It,zt)}function Kt(e,t,n,r,i){if(!D(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;let a=Ht(e);if(a===0)return e;let o=i.get(e);if(o)return o;let s=new Proxy(e,a===2?r:n);return i.set(e,s),s}function qt(e){return Jt(e)?qt(e.__v_raw):!!(e&&e.__v_isReactive)}function Jt(e){return!!(e&&e.__v_isReadonly)}function Yt(e){return!!(e&&e.__v_isShallow)}function Xt(e){return e?!!e.__v_raw:!1}function R(e){let t=e&&e.__v_raw;return t?R(t):e}function Zt(e){return!y(e,`__v_skip`)&&Object.isExtensible(e)&&ce(e,`__v_skip`,!0),e}var Qt=e=>D(e)?Ut(e):e,$t=e=>D(e)?Gt(e):e;function z(e){return e?e.__v_isRef===!0:!1}function en(e){return tn(e,!1)}function tn(e,t){return z(e)?e:new nn(e,t)}var nn=class{constructor(e,t){this.dep=new et,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:R(e),this._value=t?e:Qt(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||Yt(e)||Jt(e);e=n?e:R(e),F(e,t)&&(this._rawValue=e,this._value=n?e:Qt(e),this.dep.trigger())}};function B(e){return z(e)?e.value:e}var rn={get:(e,t,n)=>t===`__v_raw`?e:B(Reflect.get(e,t,n)),set:(e,t,n,r)=>{let i=e[t];return z(i)&&!z(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function an(e){return qt(e)?e:new Proxy(e,rn)}function on(e){let t=b(e)?Array(e.length):{};for(let n in e)t[n]=cn(e,n);return t}var sn=class{constructor(e,t,n){this._object=e,this._defaultValue=n,this.__v_isRef=!0,this._value=void 0,this._key=E(t)?t:String(t),this._raw=R(e);let r=!0,i=e;if(!b(e)||E(this._key)||!j(this._key))do r=!Xt(i)||Yt(i);while(r&&(i=i.__v_raw));this._shallow=r}get value(){let e=this._object[this._key];return this._shallow&&(e=B(e)),this._value=e===void 0?this._defaultValue:e}set value(e){if(this._shallow&&z(this._raw[this._key])){let t=this._object[this._key];if(z(t)){t.value=e;return}}this._object[this._key]=e}get dep(){return ct(this._raw,this._key)}};function cn(e,t,n){return new sn(e,t,n)}var ln=class{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new et(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Qe-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&L!==this)return Re(this,!0),!0}get value(){let e=this.dep.track();return We(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}};function un(e,t,n=!1){let r,i;return w(e)?r=e:(r=e.get,i=e.set),new ln(r,i,n)}var dn={},fn=new WeakMap,pn=void 0;function mn(e,t=!1,n=pn){if(n){let t=fn.get(n);t||fn.set(n,t=[]),t.push(e)}}function hn(e,t,n=u){let{immediate:r,deep:i,once:a,scheduler:o,augmentJob:s,call:c}=n,l=e=>i?e:Yt(e)||i===!1||i===0?gn(e,1):gn(e),d,p,m,h,g=!1,v=!1;if(z(e)?(p=()=>e.value,g=Yt(e)):qt(e)?(p=()=>l(e),g=!0):b(e)?(v=!0,g=e.some(e=>qt(e)||Yt(e)),p=()=>e.map(e=>{if(z(e))return e.value;if(qt(e))return l(e);if(w(e))return c?c(e,2):e()})):p=w(e)?t?c?()=>c(e,2):e:()=>{if(m){Ye();try{m()}finally{Xe()}}let t=pn;pn=d;try{return c?c(e,3,[h]):e(h)}finally{pn=t}}:f,t&&i){let e=p,t=i===!0?1/0:i;p=()=>gn(e(),t)}let y=je(),x=()=>{d.stop(),y&&y.active&&_(y.effects,d)};if(a&&t){let e=t;t=(...t)=>{e(...t),x()}}let S=v?Array(e.length).fill(dn):dn,C=e=>{if(!(!(d.flags&1)||!d.dirty&&!e))if(t){let e=d.run();if(i||g||(v?e.some((e,t)=>F(e,S[t])):F(e,S))){m&&m();let n=pn;pn=d;try{let n=[e,S===dn?void 0:v&&S[0]===dn?[]:S,h];S=e,c?c(t,3,n):t(...n)}finally{pn=n}}}else d.run()};return s&&s(C),d=new Pe(p),d.scheduler=o?()=>o(C,!1):C,h=e=>mn(e,!1,d),m=d.onStop=()=>{let e=fn.get(d);if(e){if(c)c(e,4);else for(let t of e)t();fn.delete(d)}},t?r?C(!0):S=d.run():o?o(C.bind(null,!0),!0):d.run(),x.pause=d.pause.bind(d),x.resume=d.resume.bind(d),x.stop=x,x}function gn(e,t=1/0,n){if(t<=0||!D(e)||e.__v_skip||(n||=new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,z(e))gn(e.value,t,n);else if(b(e))for(let r=0;r<e.length;r++)gn(e[r],t,n);else if(S(e)||x(e))e.forEach(e=>{gn(e,t,n)});else if(A(e)){for(let r in e)gn(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&gn(e[r],t,n)}return e}function _n(e,t,n,r){try{return r?e(...r):e()}catch(e){yn(e,t,n)}}function vn(e,t,n,r){if(w(e)){let i=_n(e,t,n,r);return i&&ee(i)&&i.catch(e=>{yn(e,t,n)}),i}if(b(e)){let i=[];for(let a=0;a<e.length;a++)i.push(vn(e[a],t,n,r));return i}}function yn(e,t,n,r=!0){let i=t?t.vnode:null,{errorHandler:a,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||u;if(t){let r=t.parent,i=t.proxy,o=`https://vuejs.org/error-reference/#runtime-${n}`;for(;r;){let t=r.ec;if(t){for(let n=0;n<t.length;n++)if(t[n](e,i,o)===!1)return}r=r.parent}if(a){Ye(),_n(a,null,10,[e,i,o]),Xe();return}}bn(e,n,i,r,o)}function bn(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}var xn=[],Sn=-1,Cn=[],wn=null,Tn=0,En=Promise.resolve(),Dn=null;function On(e){let t=Dn||En;return e?t.then(this?e.bind(this):e):t}function kn(e){let t=Sn+1,n=xn.length;for(;t<n;){let r=t+n>>>1,i=xn[r],a=Fn(i);a<e||a===e&&i.flags&2?t=r+1:n=r}return t}function An(e){if(!(e.flags&1)){let t=Fn(e),n=xn[xn.length-1];!n||!(e.flags&2)&&t>=Fn(n)?xn.push(e):xn.splice(kn(t),0,e),e.flags|=1,jn()}}function jn(){Dn||=En.then(In)}function Mn(e){b(e)?Cn.push(...e):wn&&e.id===-1?wn.splice(Tn+1,0,e):e.flags&1||(Cn.push(e),e.flags|=1),jn()}function Nn(e,t,n=Sn+1){for(;n<xn.length;n++){let t=xn[n];if(t&&t.flags&2){if(e&&t.id!==e.uid)continue;xn.splice(n,1),n--,t.flags&4&&(t.flags&=-2),t(),t.flags&4||(t.flags&=-2)}}}function Pn(e){if(Cn.length){let e=[...new Set(Cn)].sort((e,t)=>Fn(e)-Fn(t));if(Cn.length=0,wn){wn.push(...e);return}for(wn=e,Tn=0;Tn<wn.length;Tn++){let e=wn[Tn];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}wn=null,Tn=0}}var Fn=e=>e.id==null?e.flags&2?-1:1/0:e.id;function In(e){try{for(Sn=0;Sn<xn.length;Sn++){let e=xn[Sn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),_n(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Sn<xn.length;Sn++){let e=xn[Sn];e&&(e.flags&=-2)}Sn=-1,xn.length=0,Pn(e),Dn=null,(xn.length||Cn.length)&&In(e)}}var Ln=null,Rn=null;function zn(e){let t=Ln;return Ln=e,Rn=e&&e.type.__scopeId||null,t}function Bn(e,t=Ln,n){if(!t||e._n)return e;let r=(...n)=>{r._d&&Aa(-1);let i=zn(t),a;try{a=e(...n)}finally{zn(i),r._d&&Aa(1)}return a};return r._n=!0,r._c=!0,r._d=!0,r}function Vn(e,t){if(Ln===null)return e;let n=fo(Ln),r=e.dirs||=[];for(let e=0;e<t.length;e++){let[i,a,o,s=u]=t[e];i&&(w(i)&&(i={mounted:i,updated:i}),i.deep&&gn(a),r.push({dir:i,instance:n,value:a,oldValue:void 0,arg:o,modifiers:s}))}return e}function Hn(e,t,n,r){let i=e.dirs,a=t&&t.dirs;for(let o=0;o<i.length;o++){let s=i[o];a&&(s.oldValue=a[o].value);let c=s.dir[r];c&&(Ye(),vn(c,n,8,[e.el,s,e,t]),Xe())}}function Un(e,t){if(Ya){let n=Ya.provides,r=Ya.parent&&Ya.parent.provides;r===n&&(n=Ya.provides=Object.create(r)),n[e]=t}}function Wn(e,t,n=!1){let r=Xa();if(r||Ni){let i=Ni?Ni._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&w(t)?t.call(r&&r.proxy):t}}function Gn(){return!!(Xa()||Ni)}var Kn=Symbol.for(`v-scx`),qn=()=>Wn(Kn);function Jn(e,t){return Xn(e,null,t)}function Yn(e,t,n){return Xn(e,t,n)}function Xn(e,t,n=u){let{immediate:r,deep:i,flush:a,once:o}=n,s=g({},n),c=t&&r||!t&&a!==`post`,l;if(no){if(a===`sync`){let e=qn();l=e.__watcherHandles||=[]}else if(!c){let e=()=>{};return e.stop=f,e.resume=f,e.pause=f,e}}let d=Ya;s.call=(e,t,n)=>vn(e,d,t,n);let p=!1;a===`post`?s.scheduler=e=>{ua(e,d&&d.suspense)}:a!==`sync`&&(p=!0,s.scheduler=(e,t)=>{t?e():An(e)}),s.augmentJob=e=>{t&&(e.flags|=4),p&&(e.flags|=2,d&&(e.id=d.uid,e.i=d))};let m=hn(e,t,s);return no&&(l?l.push(m):c&&m()),m}function Zn(e,t,n){let r=this.proxy,i=T(e)?e.includes(`.`)?Qn(r,e):()=>r[e]:e.bind(r,r),a;w(t)?a=t:(a=t.handler,n=t);let o=$a(this),s=Xn(i,a.bind(r),n);return o(),s}function Qn(e,t){let n=t.split(`.`);return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}var $n=new WeakMap,er=Symbol(`_vte`),tr=e=>e.__isTeleport,nr=e=>e&&(e.disabled||e.disabled===``),rr=e=>e&&(e.defer||e.defer===``),ir=e=>typeof SVGElement<`u`&&e instanceof SVGElement,ar=e=>typeof MathMLElement==`function`&&e instanceof MathMLElement,or=(e,t)=>{let n=e&&e.to;return T(n)?t?t(n):null:n},sr={name:`Teleport`,__isTeleport:!0,process(e,t,n,r,i,a,o,s,c,l){let{mc:u,pc:d,pbc:f,o:{insert:p,querySelector:m,createText:h,createComment:g,parentNode:_}}=l,v=nr(t.props),{dynamicChildren:y}=t,b=(e,t,n)=>{e.shapeFlag&16&&u(e.children,t,n,i,a,o,s,c)},x=(e=t)=>{let n=nr(e.props),r=e.target=or(e.props,m),a=fr(r,e,h,p);r&&(o!==`svg`&&ir(r)?o=`svg`:o!==`mathml`&&ar(r)&&(o=`mathml`),i&&i.isCE&&(i.ce._teleportTargets||(i.ce._teleportTargets=new Set)).add(r),n||(b(e,r,a),dr(e,!1)))},S=e=>{let t=()=>{$n.get(e)===t&&($n.delete(e),nr(e.props)&&(b(e,_(e.el)||n,e.anchor),dr(e,!0)),x(e))};$n.set(e,t),ua(t,a)};if(e==null){let e=t.el=h(``),i=t.anchor=h(``);if(p(e,n,r),p(i,n,r),rr(t.props)||a&&a.pendingBranch){S(t);return}v&&(b(t,n,i),dr(t,!0)),x()}else{t.el=e.el;let r=t.anchor=e.anchor,u=$n.get(e);if(u){u.flags|=8,$n.delete(e),S(t);return}t.targetStart=e.targetStart;let p=t.target=e.target,h=t.targetAnchor=e.targetAnchor,g=nr(e.props),_=g?n:p,b=g?r:h;if(o===`svg`||ir(p)?o=`svg`:(o===`mathml`||ar(p))&&(o=`mathml`),y?(f(e.dynamicChildren,y,_,i,a,o,s),ga(e,t,!0)):c||d(e,t,_,b,i,a,o,s,!1),v)g?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):cr(t,n,r,l,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){let e=t.target=or(t.props,m);e&&cr(t,e,null,l,0)}else g&&cr(t,p,h,l,1);dr(t,v)}},remove(e,t,n,{um:r,o:{remove:i}},a){let{shapeFlag:o,children:s,anchor:c,targetStart:l,targetAnchor:u,target:d,props:f}=e,p=a||!nr(f),m=$n.get(e);if(m&&(m.flags|=8,$n.delete(e),p=!1),d&&(i(l),i(u)),a&&i(c),o&16)for(let e=0;e<s.length;e++){let i=s[e];r(i,t,n,p,!!i.dynamicChildren)}},move:cr,hydrate:lr};function cr(e,t,n,{o:{insert:r},m:i},a=2){a===0&&r(e.targetAnchor,t,n);let{el:o,anchor:s,shapeFlag:c,children:l,props:u}=e,d=a===2;if(d&&r(o,t,n),!$n.has(e)&&(!d||nr(u))&&c&16)for(let e=0;e<l.length;e++)i(l[e],t,n,2);d&&r(s,t,n)}function lr(e,t,n,r,i,a,{o:{nextSibling:o,parentNode:s,querySelector:c,insert:l,createText:u}},d){function f(e,n){let r=n;for(;r;){if(r&&r.nodeType===8){if(r.data===`teleport start anchor`)t.targetStart=r;else if(r.data===`teleport anchor`){t.targetAnchor=r,e._lpa=t.targetAnchor&&o(t.targetAnchor);break}}r=o(r)}}function p(e,t){t.anchor=d(o(e),t,s(e),n,r,i,a)}let m=t.target=or(t.props,c),h=nr(t.props);if(m){let c=m._lpa||m.firstChild;t.shapeFlag&16&&(h?(p(e,t),f(m,c),t.targetAnchor||fr(m,t,u,l,s(e)===m?e:null)):(t.anchor=o(e),f(m,c),t.targetAnchor||fr(m,t,u,l),d(c&&o(c),t,m,n,r,i,a))),dr(t,h)}else h&&t.shapeFlag&16&&(p(e,t),t.targetStart=e,t.targetAnchor=o(e));return t.anchor&&o(t.anchor)}var ur=sr;function dr(e,t){let n=e.ctx;if(n&&n.ut){let r,i;for(t?(r=e.el,i=e.anchor):(r=e.targetStart,i=e.targetAnchor);r&&r!==i;)r.nodeType===1&&r.setAttribute(`data-v-owner`,n.uid),r=r.nextSibling;n.ut()}}function fr(e,t,n,r,i=null){let a=t.targetStart=n(``),o=t.targetAnchor=n(``);return a[er]=o,e&&(r(a,e,i),r(o,e,i)),o}var pr=Symbol(`_leaveCb`),mr=Symbol(`_enterCb`);function hr(){let e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Wr(()=>{e.isMounted=!0}),qr(()=>{e.isUnmounting=!0}),e}var gr=[Function,Array],_r={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:gr,onEnter:gr,onAfterEnter:gr,onEnterCancelled:gr,onBeforeLeave:gr,onLeave:gr,onAfterLeave:gr,onLeaveCancelled:gr,onBeforeAppear:gr,onAppear:gr,onAfterAppear:gr,onAppearCancelled:gr},vr=e=>{let t=e.subTree;return t.component?vr(t.component):t},yr={name:`BaseTransition`,props:_r,setup(e,{slots:t}){let n=Xa(),r=hr();return()=>{let i=t.default&&Dr(t.default(),!0),a=i&&i.length?br(i):n.subTree?Va():void 0;if(!a)return;let o=R(e),{mode:s}=o;if(r.isLeaving)return wr(a);let c=Tr(a);if(!c)return wr(a);let l=Cr(c,o,r,n,e=>l=e);c.type!==wa&&Er(c,l);let u=n.subTree&&Tr(n.subTree);if(u&&u.type!==wa&&!Pa(u,c)&&vr(n).type!==wa){let e=Cr(u,o,r,n);if(Er(u,e),s===`out-in`&&c.type!==wa)return r.isLeaving=!0,e.afterLeave=()=>{r.isLeaving=!1,n.job.flags&8||n.update(),delete e.afterLeave,u=void 0},wr(a);s===`in-out`&&c.type!==wa?e.delayLeave=(e,t,n)=>{let i=Sr(r,u);i[String(u.key)]=u,e[pr]=()=>{t(),e[pr]=void 0,delete l.delayedLeave,u=void 0},l.delayedLeave=()=>{n(),delete l.delayedLeave,u=void 0}}:u=void 0}else u&&=void 0;return a}}};function br(e){let t=e[0];if(e.length>1){for(let n of e)if(n.type!==wa){t=n;break}}return t}var xr=yr;function Sr(e,t){let{leavingVNodes:n}=e,r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function Cr(e,t,n,r,i){let{appear:a,mode:o,persisted:s=!1,onBeforeEnter:c,onEnter:l,onAfterEnter:u,onEnterCancelled:d,onBeforeLeave:f,onLeave:p,onAfterLeave:m,onLeaveCancelled:h,onBeforeAppear:g,onAppear:_,onAfterAppear:v,onAppearCancelled:y}=t,x=String(e.key),S=Sr(n,e),C=(e,t)=>{e&&vn(e,r,9,t)},w=(e,t)=>{let n=t[1];C(e,t),b(e)?e.every(e=>e.length<=1)&&n():e.length<=1&&n()},T={mode:o,persisted:s,beforeEnter(t){let r=c;if(!n.isMounted)if(a)r=g||c;else return;t[pr]&&t[pr](!0);let i=S[x];i&&Pa(e,i)&&i.el[pr]&&i.el[pr](),C(r,[t])},enter(t){if(S[x]===e)return;let r=l,i=u,o=d;if(!n.isMounted)if(a)r=_||l,i=v||u,o=y||d;else return;let s=!1;t[mr]=e=>{s||(s=!0,C(e?o:i,[t]),T.delayedLeave&&T.delayedLeave(),t[mr]=void 0)};let c=t[mr].bind(null,!1);r?w(r,[t,c]):c()},leave(t,r){let i=String(e.key);if(t[mr]&&t[mr](!0),n.isUnmounting)return r();C(f,[t]);let a=!1;t[pr]=n=>{a||(a=!0,r(),C(n?h:m,[t]),t[pr]=void 0,S[i]===e&&delete S[i])};let o=t[pr].bind(null,!1);S[i]=e,p?w(p,[t,o]):o()},clone(e){let a=Cr(e,t,n,r,i);return i&&i(a),a}};return T}function wr(e){if(Ir(e))return e=za(e),e.children=null,e}function Tr(e){if(!Ir(e))return tr(e.type)&&e.children?br(e.children):e;if(e.component)return e.component.subTree;let{shapeFlag:t,children:n}=e;if(n){if(t&16)return n[0];if(t&32&&w(n.default))return n.default()}}function Er(e,t){e.shapeFlag&6&&e.component?(e.transition=t,Er(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Dr(e,t=!1,n){let r=[],i=0;for(let a=0;a<e.length;a++){let o=e[a],s=n==null?o.key:String(n)+String(o.key==null?a:o.key);o.type===H?(o.patchFlag&128&&i++,r=r.concat(Dr(o.children,t,s))):(t||o.type!==wa)&&r.push(s==null?o:za(o,{key:s}))}if(i>1)for(let e=0;e<r.length;e++)r[e].patchFlag=-2;return r}function Or(e,t){return w(e)?g({name:e.name},t,{setup:e}):e}function kr(){let e=Xa();return e?(e.appContext.config.idPrefix||`v`)+`-`+e.ids[0]+ e.ids[1]++:``}function Ar(e){e.ids=[e.ids[0]+ e.ids[2]+++`-`,0,0]}function jr(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var Mr=new WeakMap;function Nr(e,t,n,r,i=!1){if(b(e)){e.forEach((e,a)=>Nr(e,t&&(b(t)?t[a]:t),n,r,i));return}if(Fr(r)&&!i){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&Nr(e,t,n,r.component.subTree);return}let a=r.shapeFlag&4?fo(r.component):r.el,o=i?null:a,{i:s,r:c}=e,l=t&&t.r,d=s.refs===u?s.refs={}:s.refs,f=s.setupState,m=R(f),h=f===u?p:e=>jr(d,e)?!1:y(m,e),g=(e,t)=>!(t&&jr(d,t));if(l!=null&&l!==c){if(Pr(t),T(l))d[l]=null,h(l)&&(f[l]=null);else if(z(l)){let e=t;g(l,e.k)&&(l.value=null),e.k&&(d[e.k]=null)}}if(w(c))_n(c,s,12,[o,d]);else{let t=T(c),r=z(c);if(t||r){let s=()=>{if(e.f){let n=t?h(c)?f[c]:d[c]:g(c)||!e.k?c.value:d[e.k];if(i)b(n)&&_(n,a);else if(b(n))n.includes(a)||n.push(a);else if(t)d[c]=[a],h(c)&&(f[c]=d[c]);else{let t=[a];g(c,e.k)&&(c.value=t),e.k&&(d[e.k]=t)}}else t?(d[c]=o,h(c)&&(f[c]=o)):r&&(g(c,e.k)&&(c.value=o),e.k&&(d[e.k]=o))};if(o){let t=()=>{s(),Mr.delete(e)};t.id=-1,Mr.set(e,t),ua(t,n)}else Pr(e),s()}}}function Pr(e){let t=Mr.get(e);t&&(t.flags|=8,Mr.delete(e))}fe().requestIdleCallback,fe().cancelIdleCallback;var Fr=e=>!!e.type.__asyncLoader,Ir=e=>e.type.__isKeepAlive;function Lr(e,t){zr(e,`a`,t)}function Rr(e,t){zr(e,`da`,t)}function zr(e,t,n=Ya){let r=e.__wdc||=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent}return e()};if(Vr(t,r,n),n){let e=n.parent;for(;e&&e.parent;)Ir(e.parent.vnode)&&Br(r,t,n,e),e=e.parent}}function Br(e,t,n,r){let i=Vr(t,e,r,!0);Jr(()=>{_(r[t],i)},n)}function Vr(e,t,n=Ya,r=!1){if(n){let i=n[e]||(n[e]=[]),a=t.__weh||=(...r)=>{Ye();let i=$a(n),a=vn(t,n,e,r);return i(),Xe(),a};return r?i.unshift(a):i.push(a),a}}var Hr=e=>(t,n=Ya)=>{(!no||e===`sp`)&&Vr(e,(...e)=>t(...e),n)},Ur=Hr(`bm`),Wr=Hr(`m`),Gr=Hr(`bu`),Kr=Hr(`u`),qr=Hr(`bum`),Jr=Hr(`um`),Yr=Hr(`sp`),Xr=Hr(`rtg`),Zr=Hr(`rtc`);function Qr(e,t=Ya){Vr(`ec`,e,t)}var $r=`components`,ei=`directives`;function ti(e,t){return ai($r,e,!0,t)||e}var ni=Symbol.for(`v-ndc`);function ri(e){return T(e)?ai($r,e,!1)||e:e||ni}function ii(e){return ai(ei,e)}function ai(e,t,n=!0,r=!1){let i=Ln||Ya;if(i){let n=i.type;if(e===$r){let e=po(n,!1);if(e&&(e===t||e===P(t)||e===ae(P(t))))return n}let a=oi(i[e]||n[e],t)||oi(i.appContext[e],t);return!a&&r?n:a}}function oi(e,t){return e&&(e[t]||e[P(t)]||e[ae(P(t))])}function si(e,t,n,r){let i,a=n&&n[r],o=b(e);if(o||T(e)){let n=o&&qt(e),r=!1,s=!1;n&&(r=!Yt(e),s=Jt(e),e=ut(e)),i=Array(e.length);for(let n=0,o=e.length;n<o;n++)i[n]=t(r?s?$t(Qt(e[n])):Qt(e[n]):e[n],n,void 0,a&&a[n])}else if(typeof e==`number`){i=Array(e);for(let n=0;n<e;n++)i[n]=t(n+1,n,void 0,a&&a[n])}else if(D(e))if(e[Symbol.iterator])i=Array.from(e,(e,n)=>t(e,n,void 0,a&&a[n]));else{let n=Object.keys(e);i=Array(n.length);for(let r=0,o=n.length;r<o;r++){let o=n[r];i[r]=t(e[o],o,r,a&&a[r])}}else i=[];return n&&(n[r]=i),i}function ci(e,t){for(let n=0;n<t.length;n++){let r=t[n];if(b(r))for(let t=0;t<r.length;t++)e[r[t].name]=r[t].fn;else r&&(e[r.name]=r.key?(...e)=>{let t=r.fn(...e);return t&&(t.key=r.key),t}:r.fn)}return e}function V(e,t,n={},r,i){if(Ln.ce||Ln.parent&&Fr(Ln.parent)&&Ln.parent.ce){let e=Object.keys(n).length>0;return t!==`default`&&(n.name=t),U(),Ma(H,null,[K(`slot`,n,r&&r())],e?-2:64)}let a=e[t];a&&a._c&&(a._d=!1),U();let o=a&&li(a(n)),s=n.key||o&&o.key,c=Ma(H,{key:(s&&!E(s)?s:`_${t}`)+(!o&&r?`_fb`:``)},o||(r?r():[]),o&&e._===1?64:-2);return!i&&c.scopeId&&(c.slotScopeIds=[c.scopeId+`-s`]),a&&a._c&&(a._d=!0),c}function li(e){return e.some(e=>Na(e)?!(e.type===wa||e.type===H&&!li(e.children)):!0)?e:null}var ui=e=>e?to(e)?fo(e):ui(e.parent):null,di=g(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>ui(e.parent),$root:e=>ui(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>bi(e),$forceUpdate:e=>e.f||=()=>{An(e.update)},$nextTick:e=>e.n||=On.bind(e.proxy),$watch:e=>Zn.bind(e)}),fi=(e,t)=>e!==u&&!e.__isScriptSetup&&y(e,t),pi={get({_:e},t){if(t===`__v_skip`)return!0;let{ctx:n,setupState:r,data:i,props:a,accessCache:o,type:s,appContext:c}=e;if(t[0]!==`$`){let e=o[t];if(e!==void 0)switch(e){case 1:return r[t];case 2:return i[t];case 4:return n[t];case 3:return a[t]}else if(fi(r,t))return o[t]=1,r[t];else if(i!==u&&y(i,t))return o[t]=2,i[t];else if(y(a,t))return o[t]=3,a[t];else if(n!==u&&y(n,t))return o[t]=4,n[t];else hi&&(o[t]=0)}let l=di[t],d,f;if(l)return t===`$attrs`&&ot(e.attrs,`get`,``),l(e);if((d=s.__cssModules)&&(d=d[t]))return d;if(n!==u&&y(n,t))return o[t]=4,n[t];if(f=c.config.globalProperties,y(f,t))return f[t]},set({_:e},t,n){let{data:r,setupState:i,ctx:a}=e;return fi(i,t)?(i[t]=n,!0):r!==u&&y(r,t)?(r[t]=n,!0):y(e.props,t)||t[0]===`$`&&t.slice(1)in e?!1:(a[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:i,props:a,type:o}},s){let c;return!!(n[s]||e!==u&&s[0]!==`$`&&y(e,s)||fi(t,s)||y(a,s)||y(r,s)||y(di,s)||y(i.config.globalProperties,s)||(c=o.__cssModules)&&c[s])},defineProperty(e,t,n){return n.get==null?y(n,`value`)&&this.set(e,t,n.value,null):e._.accessCache[t]=0,Reflect.defineProperty(e,t,n)}};function mi(e){return b(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}var hi=!0;function gi(e){let t=bi(e),n=e.proxy,r=e.ctx;hi=!1,t.beforeCreate&&vi(t.beforeCreate,e,`bc`);let{data:i,computed:a,methods:o,watch:s,provide:c,inject:l,created:u,beforeMount:d,mounted:p,beforeUpdate:m,updated:h,activated:g,deactivated:_,beforeDestroy:v,beforeUnmount:y,destroyed:x,unmounted:S,render:C,renderTracked:T,renderTriggered:E,errorCaptured:ee,serverPrefetch:O,expose:k,inheritAttrs:te,components:A,directives:j,filters:M}=t;if(l&&_i(l,r,null),o)for(let e in o){let t=o[e];w(t)&&(r[e]=t.bind(n))}if(i){let t=i.call(n,n);D(t)&&(e.data=Ut(t))}if(hi=!0,a)for(let e in a){let t=a[e],i=ho({get:w(t)?t.bind(n,n):w(t.get)?t.get.bind(n,n):f,set:!w(t)&&w(t.set)?t.set.bind(n):f});Object.defineProperty(r,e,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e})}if(s)for(let e in s)yi(s[e],r,n,e);if(c){let e=w(c)?c.call(n):c;Reflect.ownKeys(e).forEach(t=>{Un(t,e[t])})}u&&vi(u,e,`c`);function N(e,t){b(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(N(Ur,d),N(Wr,p),N(Gr,m),N(Kr,h),N(Lr,g),N(Rr,_),N(Qr,ee),N(Zr,T),N(Xr,E),N(qr,y),N(Jr,S),N(Yr,O),b(k))if(k.length){let t=e.exposed||={};k.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t,enumerable:!0})})}else e.exposed||={};C&&e.render===f&&(e.render=C),te!=null&&(e.inheritAttrs=te),A&&(e.components=A),j&&(e.directives=j),O&&Ar(e)}function _i(e,t,n=f){b(e)&&(e=Ti(e));for(let n in e){let r=e[n],i;i=D(r)?`default`in r?Wn(r.from||n,r.default,!0):Wn(r.from||n):Wn(r),z(i)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e}):t[n]=i}}function vi(e,t,n){vn(b(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function yi(e,t,n,r){let i=r.includes(`.`)?Qn(n,r):()=>n[r];if(T(e)){let n=t[e];w(n)&&Yn(i,n)}else if(w(e))Yn(i,e.bind(n));else if(D(e))if(b(e))e.forEach(e=>yi(e,t,n,r));else{let r=w(e.handler)?e.handler.bind(n):t[e.handler];w(r)&&Yn(i,r,e)}}function bi(e){let t=e.type,{mixins:n,extends:r}=t,{mixins:i,optionsCache:a,config:{optionMergeStrategies:o}}=e.appContext,s=a.get(t),c;return s?c=s:!i.length&&!n&&!r?c=t:(c={},i.length&&i.forEach(e=>xi(c,e,o,!0)),xi(c,t,o)),D(t)&&a.set(t,c),c}function xi(e,t,n,r=!1){let{mixins:i,extends:a}=t;a&&xi(e,a,n,!0),i&&i.forEach(t=>xi(e,t,n,!0));for(let i in t)if(!(r&&i===`expose`)){let r=Si[i]||n&&n[i];e[i]=r?r(e[i],t[i]):t[i]}return e}var Si={data:Ci,props:Oi,emits:Oi,methods:Di,computed:Di,beforeCreate:Ei,created:Ei,beforeMount:Ei,mounted:Ei,beforeUpdate:Ei,updated:Ei,beforeDestroy:Ei,beforeUnmount:Ei,destroyed:Ei,unmounted:Ei,activated:Ei,deactivated:Ei,errorCaptured:Ei,serverPrefetch:Ei,components:Di,directives:Di,watch:ki,provide:Ci,inject:wi};function Ci(e,t){return t?e?function(){return g(w(e)?e.call(this,this):e,w(t)?t.call(this,this):t)}:t:e}function wi(e,t){return Di(Ti(e),Ti(t))}function Ti(e){if(b(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function Ei(e,t){return e?[...new Set([].concat(e,t))]:t}function Di(e,t){return e?g(Object.create(null),e,t):t}function Oi(e,t){return e?b(e)&&b(t)?[...new Set([...e,...t])]:g(Object.create(null),mi(e),mi(t??{})):t}function ki(e,t){if(!e)return t;if(!t)return e;let n=g(Object.create(null),e);for(let r in t)n[r]=Ei(e[r],t[r]);return n}function Ai(){return{app:null,config:{isNativeTag:p,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var ji=0;function Mi(e,t){return function(n,r=null){w(n)||(n=g({},n)),r!=null&&!D(r)&&(r=null);let i=Ai(),a=new WeakSet,o=[],s=!1,c=i.app={_uid:ji++,_component:n,_props:r,_container:null,_context:i,_instance:null,version:_o,get config(){return i.config},set config(e){},use(e,...t){return a.has(e)||(e&&w(e.install)?(a.add(e),e.install(c,...t)):w(e)&&(a.add(e),e(c,...t))),c},mixin(e){return i.mixins.includes(e)||i.mixins.push(e),c},component(e,t){return t?(i.components[e]=t,c):i.components[e]},directive(e,t){return t?(i.directives[e]=t,c):i.directives[e]},mount(a,o,l){if(!s){let u=c._ceVNode||K(n,r);return u.appContext=i,l===!0?l=`svg`:l===!1&&(l=void 0),o&&t?t(u,a):e(u,a,l),s=!0,c._container=a,a.__vue_app__=c,fo(u.component)}},onUnmount(e){o.push(e)},unmount(){s&&(vn(o,c._instance,16),e(null,c._container),delete c._container.__vue_app__)},provide(e,t){return i.provides[e]=t,c},runWithContext(e){let t=Ni;Ni=c;try{return e()}finally{Ni=t}}};return c}}var Ni=null,Pi=(e,t)=>t===`modelValue`||t===`model-value`?e.modelModifiers:e[`${t}Modifiers`]||e[`${P(t)}Modifiers`]||e[`${ie(t)}Modifiers`];function Fi(e,t,...n){if(e.isUnmounted)return;let r=e.vnode.props||u,i=n,a=t.startsWith(`update:`),o=a&&Pi(r,t.slice(7));o&&(o.trim&&(i=n.map(e=>T(e)?e.trim():e)),o.number&&(i=n.map(le)));let s,c=r[s=oe(t)]||r[s=oe(P(t))];!c&&a&&(c=r[s=oe(ie(t))]),c&&vn(c,e,6,i);let l=r[s+`Once`];if(l){if(!e.emitted)e.emitted={};else if(e.emitted[s])return;e.emitted[s]=!0,vn(l,e,6,i)}}var Ii=new WeakMap;function Li(e,t,n=!1){let r=n?Ii:t.emitsCache,i=r.get(e);if(i!==void 0)return i;let a=e.emits,o={},s=!1;if(!w(e)){let r=e=>{let n=Li(e,t,!0);n&&(s=!0,g(o,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return!a&&!s?(D(e)&&r.set(e,null),null):(b(a)?a.forEach(e=>o[e]=null):g(o,a),D(e)&&r.set(e,o),o)}function Ri(e,t){return!e||!m(t)?!1:(t=t.slice(2).replace(/Once$/,``),y(e,t[0].toLowerCase()+t.slice(1))||y(e,ie(t))||y(e,t))}function zi(e){let{type:t,vnode:n,proxy:r,withProxy:i,propsOptions:[a],slots:o,attrs:s,emit:c,render:l,renderCache:u,props:d,data:f,setupState:p,ctx:m,inheritAttrs:g}=e,_=zn(e),v,y;try{if(n.shapeFlag&4){let e=i||r,t=e;v=Ha(l.call(t,e,u,d,p,f,m)),y=s}else{let e=t;v=Ha(e.length>1?e(d,{attrs:s,slots:o,emit:c}):e(d,null)),y=t.props?s:Bi(s)}}catch(t){Ea.length=0,yn(t,e,1),v=K(wa)}let b=v;if(y&&g!==!1){let e=Object.keys(y),{shapeFlag:t}=b;e.length&&t&7&&(a&&e.some(h)&&(y=Vi(y,a)),b=za(b,y,!1,!0))}return n.dirs&&(b=za(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&Er(b,n.transition),v=b,zn(_),v}var Bi=e=>{let t;for(let n in e)(n===`class`||n===`style`||m(n))&&((t||={})[n]=e[n]);return t},Vi=(e,t)=>{let n={};for(let r in e)(!h(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function Hi(e,t,n){let{props:r,children:i,component:a}=e,{props:o,children:s,patchFlag:c}=t,l=a.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?Ui(r,o,l):!!o;if(c&8){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(Wi(o,r,n)&&!Ri(l,n))return!0}}}else return(i||s)&&(!s||!s.$stable)?!0:r===o?!1:r?o?Ui(r,o,l):!0:!!o;return!1}function Ui(e,t,n){let r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){let a=r[i];if(Wi(t,e,a)&&!Ri(n,a))return!0}return!1}function Wi(e,t,n){let r=e[n],i=t[n];return n===`style`&&D(r)&&D(i)?!we(r,i):r!==i}function Gi({vnode:e,parent:t,suspense:n},r){for(;t;){let n=t.subTree;if(n.suspense&&n.suspense.activeBranch===e&&(n.suspense.vnode.el=n.el=r,e=n),n===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}var Ki={},qi=()=>Object.create(Ki),Ji=e=>Object.getPrototypeOf(e)===Ki;function Yi(e,t,n,r=!1){let i={},a=qi();e.propsDefaults=Object.create(null),Zi(e,t,i,a);for(let t in e.propsOptions[0])t in i||(i[t]=void 0);n?e.props=r?i:Wt(i):e.type.props?e.props=i:e.props=a,e.attrs=a}function Xi(e,t,n,r){let{props:i,attrs:a,vnode:{patchFlag:o}}=e,s=R(i),[c]=e.propsOptions,l=!1;if((r||o>0)&&!(o&16)){if(o&8){let n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let o=n[r];if(Ri(e.emitsOptions,o))continue;let u=t[o];if(c)if(y(a,o))u!==a[o]&&(a[o]=u,l=!0);else{let t=P(o);i[t]=Qi(c,s,t,u,e,!1)}else u!==a[o]&&(a[o]=u,l=!0)}}}else{Zi(e,t,i,a)&&(l=!0);let r;for(let a in s)(!t||!y(t,a)&&((r=ie(a))===a||!y(t,r)))&&(c?n&&(n[a]!==void 0||n[r]!==void 0)&&(i[a]=Qi(c,s,a,void 0,e,!0)):delete i[a]);if(a!==s)for(let e in a)(!t||!y(t,e))&&(delete a[e],l=!0)}l&&st(e.attrs,`set`,``)}function Zi(e,t,n,r){let[i,a]=e.propsOptions,o=!1,s;if(t)for(let c in t){if(M(c))continue;let l=t[c],u;i&&y(i,u=P(c))?!a||!a.includes(u)?n[u]=l:(s||={})[u]=l:Ri(e.emitsOptions,c)||(!(c in r)||l!==r[c])&&(r[c]=l,o=!0)}if(a){let t=R(n),r=s||u;for(let o=0;o<a.length;o++){let s=a[o];n[s]=Qi(i,t,s,r[s],e,!y(r,s))}}return o}function Qi(e,t,n,r,i,a){let o=e[n];if(o!=null){let e=y(o,`default`);if(e&&r===void 0){let e=o.default;if(o.type!==Function&&!o.skipFactory&&w(e)){let{propsDefaults:a}=i;if(n in a)r=a[n];else{let o=$a(i);r=a[n]=e.call(null,t),o()}}else r=e;i.ce&&i.ce._setProp(n,r)}o[0]&&(a&&!e?r=!1:o[1]&&(r===``||r===ie(n))&&(r=!0))}return r}var $i=new WeakMap;function ea(e,t,n=!1){let r=n?$i:t.propsCache,i=r.get(e);if(i)return i;let a=e.props,o={},s=[],c=!1;if(!w(e)){let r=e=>{c=!0;let[n,r]=ea(e,t,!0);g(o,n),r&&s.push(...r)};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}if(!a&&!c)return D(e)&&r.set(e,d),d;if(b(a))for(let e=0;e<a.length;e++){let t=P(a[e]);ta(t)&&(o[t]=u)}else if(a)for(let e in a){let t=P(e);if(ta(t)){let n=a[e],r=o[t]=b(n)||w(n)?{type:n}:g({},n),i=r.type,c=!1,l=!0;if(b(i))for(let e=0;e<i.length;++e){let t=i[e],n=w(t)&&t.name;if(n===`Boolean`){c=!0;break}else n===`String`&&(l=!1)}else c=w(i)&&i.name===`Boolean`;r[0]=c,r[1]=l,(c||y(r,`default`))&&s.push(t)}}let l=[o,s];return D(e)&&r.set(e,l),l}function ta(e){return e[0]!==`$`&&!M(e)}var na=e=>e===`_`||e===`_ctx`||e===`$stable`,ra=e=>b(e)?e.map(Ha):[Ha(e)],ia=(e,t,n)=>{if(t._n)return t;let r=Bn((...e)=>ra(t(...e)),n);return r._c=!1,r},aa=(e,t,n)=>{let r=e._ctx;for(let n in e){if(na(n))continue;let i=e[n];if(w(i))t[n]=ia(n,i,r);else if(i!=null){let e=ra(i);t[n]=()=>e}}},oa=(e,t)=>{let n=ra(t);e.slots.default=()=>n},sa=(e,t,n)=>{for(let r in t)(n||!na(r))&&(e[r]=t[r])},ca=(e,t,n)=>{let r=e.slots=qi();if(e.vnode.shapeFlag&32){let e=t._;e?(sa(r,t,n),n&&ce(r,`_`,e,!0)):aa(t,r)}else t&&oa(e,t)},la=(e,t,n)=>{let{vnode:r,slots:i}=e,a=!0,o=u;if(r.shapeFlag&32){let e=t._;e?n&&e===1?a=!1:sa(i,t,n):(a=!t.$stable,aa(t,i)),o=t}else t&&(oa(e,t),o={default:1});if(a)for(let e in i)!na(e)&&o[e]==null&&delete i[e]},ua=Sa;function da(e){return fa(e)}function fa(e,t){let n=fe();n.__VUE__=!0;let{insert:r,remove:i,patchProp:a,createElement:o,createText:s,createComment:c,setText:l,setElementText:p,parentNode:m,nextSibling:h,setScopeId:g=f,insertStaticContent:_}=e,v=(e,t,n,r=null,i=null,a=null,o=void 0,s=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!Pa(e,t)&&(r=pe(e),F(e,i,a,!0),e=null),t.patchFlag===-2&&(c=!1,t.dynamicChildren=null);let{type:l,ref:u,shapeFlag:d}=t;switch(l){case Ca:y(e,t,n,r);break;case wa:b(e,t,n,r);break;case Ta:e??x(t,n,r,o);break;case H:te(e,t,n,r,i,a,o,s,c);break;default:d&1?w(e,t,n,r,i,a,o,s,c):d&6?A(e,t,n,r,i,a,o,s,c):(d&64||d&128)&&l.process(e,t,n,r,i,a,o,s,c,ge)}u!=null&&i?Nr(u,e&&e.ref,a,t||e,!t):u==null&&e&&e.ref!=null&&Nr(e.ref,null,a,e,!0)},y=(e,t,n,i)=>{if(e==null)r(t.el=s(t.children),n,i);else{let n=t.el=e.el;t.children!==e.children&&l(n,t.children)}},b=(e,t,n,i)=>{e==null?r(t.el=c(t.children||``),n,i):t.el=e.el},x=(e,t,n,r)=>{[e.el,e.anchor]=_(e.children,t,n,r,e.el,e.anchor)},S=({el:e,anchor:t},n,i)=>{let a;for(;e&&e!==t;)a=h(e),r(e,n,i),e=a;r(t,n,i)},C=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=h(e),i(e),e=n;i(t)},w=(e,t,n,r,i,a,o,s,c)=>{if(t.type===`svg`?o=`svg`:t.type===`math`&&(o=`mathml`),e==null)T(t,n,r,i,a,o,s,c);else{let n=e.el&&e.el._isVueCE?e.el:null;try{n&&n._beginPatch(),ee(e,t,i,a,o,s,c)}finally{n&&n._endPatch()}}},T=(e,t,n,i,s,c,l,u)=>{let d,f,{props:m,shapeFlag:h,transition:g,dirs:_}=e;if(d=e.el=o(e.type,c,m&&m.is,m),h&8?p(d,e.children):h&16&&D(e.children,d,null,i,s,pa(e,c),l,u),_&&Hn(e,null,i,`created`),E(d,e,e.scopeId,l,i),m){for(let e in m)e!==`value`&&!M(e)&&a(d,e,null,m[e],c,i);`value`in m&&a(d,`value`,null,m.value,c),(f=m.onVnodeBeforeMount)&&Ga(f,i,e)}_&&Hn(e,null,i,`beforeMount`);let v=ha(s,g);v&&g.beforeEnter(d),r(d,t,n),((f=m&&m.onVnodeMounted)||v||_)&&ua(()=>{try{f&&Ga(f,i,e),v&&g.enter(d),_&&Hn(e,null,i,`mounted`)}finally{}},s)},E=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let t=0;t<r.length;t++)g(e,r[t]);if(i){let n=i.subTree;if(t===n||xa(n.type)&&(n.ssContent===t||n.ssFallback===t)){let t=i.vnode;E(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},D=(e,t,n,r,i,a,o,s,c=0)=>{for(let l=c;l<e.length;l++)v(null,e[l]=s?Ua(e[l]):Ha(e[l]),t,n,r,i,a,o,s)},ee=(e,t,n,r,i,o,s)=>{let c=t.el=e.el,{patchFlag:l,dynamicChildren:d,dirs:f}=t;l|=e.patchFlag&16;let m=e.props||u,h=t.props||u,g;if(n&&ma(n,!1),(g=h.onVnodeBeforeUpdate)&&Ga(g,n,t,e),f&&Hn(t,e,n,`beforeUpdate`),n&&ma(n,!0),(m.innerHTML&&h.innerHTML==null||m.textContent&&h.textContent==null)&&p(c,``),d?O(e.dynamicChildren,d,c,n,r,pa(t,i),o):s||re(e,t,c,null,n,r,pa(t,i),o,!1),l>0){if(l&16)k(c,m,h,n,i);else if(l&2&&m.class!==h.class&&a(c,`class`,null,h.class,i),l&4&&a(c,`style`,m.style,h.style,i),l&8){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let r=e[t],o=m[r],s=h[r];(s!==o||r===`value`)&&a(c,r,o,s,i,n)}}l&1&&e.children!==t.children&&p(c,t.children)}else !s&&d==null&&k(c,m,h,n,i);((g=h.onVnodeUpdated)||f)&&ua(()=>{g&&Ga(g,n,t,e),f&&Hn(t,e,n,`updated`)},r)},O=(e,t,n,r,i,a,o)=>{for(let s=0;s<t.length;s++){let c=e[s],l=t[s];v(c,l,c.el&&(c.type===H||!Pa(c,l)||c.shapeFlag&198)?m(c.el):n,null,r,i,a,o,!0)}},k=(e,t,n,r,i)=>{if(t!==n){if(t!==u)for(let o in t)!M(o)&&!(o in n)&&a(e,o,t[o],null,i,r);for(let o in n){if(M(o))continue;let s=n[o],c=t[o];s!==c&&o!==`value`&&a(e,o,c,s,i,r)}`value`in n&&a(e,`value`,t.value,n.value,i)}},te=(e,t,n,i,a,o,c,l,u)=>{let d=t.el=e?e.el:s(``),f=t.anchor=e?e.anchor:s(``),{patchFlag:p,dynamicChildren:m,slotScopeIds:h}=t;h&&(l=l?l.concat(h):h),e==null?(r(d,n,i),r(f,n,i),D(t.children||[],n,f,a,o,c,l,u)):p>0&&p&64&&m&&e.dynamicChildren&&e.dynamicChildren.length===m.length?(O(e.dynamicChildren,m,n,a,o,c,l),(t.key!=null||a&&t===a.subTree)&&ga(e,t,!0)):re(e,t,n,f,a,o,c,l,u)},A=(e,t,n,r,i,a,o,s,c)=>{t.slotScopeIds=s,e==null?t.shapeFlag&512?i.ctx.activate(t,n,r,o,c):j(t,n,r,i,a,o,c):N(e,t,c)},j=(e,t,n,r,i,a,o)=>{let s=e.component=Ja(e,r,i);if(Ir(e)&&(s.ctx.renderer=ge),ro(s,!1,o),s.asyncDep){if(i&&i.registerDep(s,ne,o),!e.el){let r=s.subTree=K(wa);b(null,r,t,n),e.placeholder=r.el}}else ne(s,e,t,n,i,a,o)},N=(e,t,n)=>{let r=t.component=e.component;if(Hi(e,t,n))if(r.asyncDep&&!r.asyncResolved){P(r,t,n);return}else r.next=t,r.update();else t.el=e.el,r.vnode=t},ne=(e,t,n,r,i,a,o)=>{let s=()=>{if(e.isMounted){let{next:t,bu:n,u:r,parent:s,vnode:c}=e;{let n=va(e);if(n){t&&(t.el=c.el,P(e,t,o)),n.asyncDep.then(()=>{ua(()=>{e.isUnmounted||l()},i)});return}}let u=t,d;ma(e,!1),t?(t.el=c.el,P(e,t,o)):t=c,n&&se(n),(d=t.props&&t.props.onVnodeBeforeUpdate)&&Ga(d,s,t,c),ma(e,!0);let f=zi(e),p=e.subTree;e.subTree=f,v(p,f,m(p.el),pe(p),e,i,a),t.el=f.el,u===null&&Gi(e,f.el),r&&ua(r,i),(d=t.props&&t.props.onVnodeUpdated)&&ua(()=>Ga(d,s,t,c),i)}else{let o,{el:s,props:c}=t,{bm:l,m:u,parent:d,root:f,type:p}=e,m=Fr(t);if(ma(e,!1),l&&se(l),!m&&(o=c&&c.onVnodeBeforeMount)&&Ga(o,d,t),ma(e,!0),s&&ve){let t=()=>{e.subTree=zi(e),ve(s,e.subTree,e,i,null)};m&&p.__asyncHydrate?p.__asyncHydrate(s,e,t):t()}else{f.ce&&f.ce._hasShadowRoot()&&f.ce._injectChildStyle(p,e.parent?e.parent.type:void 0);let o=e.subTree=zi(e);v(null,o,n,r,e,i,a),t.el=o.el}if(u&&ua(u,i),!m&&(o=c&&c.onVnodeMounted)){let e=t;ua(()=>Ga(o,d,e),i)}(t.shapeFlag&256||d&&Fr(d.vnode)&&d.vnode.shapeFlag&256)&&e.a&&ua(e.a,i),e.isMounted=!0,t=n=r=null}};e.scope.on();let c=e.effect=new Pe(s);e.scope.off();let l=e.update=c.run.bind(c),u=e.job=c.runIfDirty.bind(c);u.i=e,u.id=e.uid,c.scheduler=()=>An(u),ma(e,!0),l()},P=(e,t,n)=>{t.component=e;let r=e.vnode.props;e.vnode=t,e.next=null,Xi(e,t.props,r,n),la(e,t.children,n),Ye(),Nn(e),Xe()},re=(e,t,n,r,i,a,o,s,c=!1)=>{let l=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:f,shapeFlag:m}=t;if(f>0){if(f&128){ae(l,d,n,r,i,a,o,s,c);return}else if(f&256){ie(l,d,n,r,i,a,o,s,c);return}}m&8?(u&16&&de(l,i,a),d!==l&&p(n,d)):u&16?m&16?ae(l,d,n,r,i,a,o,s,c):de(l,i,a,!0):(u&8&&p(n,``),m&16&&D(d,n,r,i,a,o,s,c))},ie=(e,t,n,r,i,a,o,s,c)=>{e||=d,t||=d;let l=e.length,u=t.length,f=Math.min(l,u),p;for(p=0;p<f;p++){let r=t[p]=c?Ua(t[p]):Ha(t[p]);v(e[p],r,n,null,i,a,o,s,c)}l>u?de(e,i,a,!0,!1,f):D(t,n,r,i,a,o,s,c,f)},ae=(e,t,n,r,i,a,o,s,c)=>{let l=0,u=t.length,f=e.length-1,p=u-1;for(;l<=f&&l<=p;){let r=e[l],u=t[l]=c?Ua(t[l]):Ha(t[l]);if(Pa(r,u))v(r,u,n,null,i,a,o,s,c);else break;l++}for(;l<=f&&l<=p;){let r=e[f],l=t[p]=c?Ua(t[p]):Ha(t[p]);if(Pa(r,l))v(r,l,n,null,i,a,o,s,c);else break;f--,p--}if(l>f){if(l<=p){let e=p+1,d=e<u?t[e].el:r;for(;l<=p;)v(null,t[l]=c?Ua(t[l]):Ha(t[l]),n,d,i,a,o,s,c),l++}}else if(l>p)for(;l<=f;)F(e[l],i,a,!0),l++;else{let m=l,h=l,g=new Map;for(l=h;l<=p;l++){let e=t[l]=c?Ua(t[l]):Ha(t[l]);e.key!=null&&g.set(e.key,l)}let _,y=0,b=p-h+1,x=!1,S=0,C=Array(b);for(l=0;l<b;l++)C[l]=0;for(l=m;l<=f;l++){let r=e[l];if(y>=b){F(r,i,a,!0);continue}let u;if(r.key!=null)u=g.get(r.key);else for(_=h;_<=p;_++)if(C[_-h]===0&&Pa(r,t[_])){u=_;break}u===void 0?F(r,i,a,!0):(C[u-h]=l+1,u>=S?S=u:x=!0,v(r,t[u],n,null,i,a,o,s,c),y++)}let w=x?_a(C):d;for(_=w.length-1,l=b-1;l>=0;l--){let e=h+l,d=t[e],f=t[e+1],p=e+1<u?f.el||ba(f):r;C[l]===0?v(null,d,n,p,i,a,o,s,c):x&&(_<0||l!==w[_]?oe(d,n,p,2):_--)}}},oe=(e,t,n,a,o=null)=>{let{el:s,type:c,transition:l,children:u,shapeFlag:d}=e;if(d&6){oe(e.component.subTree,t,n,a);return}if(d&128){e.suspense.move(t,n,a);return}if(d&64){c.move(e,t,n,ge);return}if(c===H){r(s,t,n);for(let e=0;e<u.length;e++)oe(u[e],t,n,a);r(e.anchor,t,n);return}if(c===Ta){S(e,t,n);return}if(a!==2&&d&1&&l)if(a===0)l.beforeEnter(s),r(s,t,n),ua(()=>l.enter(s),o);else{let{leave:a,delayLeave:o,afterLeave:c}=l,u=()=>{e.ctx.isUnmounted?i(s):r(s,t,n)},d=()=>{s._isLeaving&&s[pr](!0),a(s,()=>{u(),c&&c()})};o?o(s,u,d):d()}else r(s,t,n)},F=(e,t,n,r=!1,i=!1)=>{let{type:a,props:o,ref:s,children:c,dynamicChildren:l,shapeFlag:u,patchFlag:d,dirs:f,cacheIndex:p,memo:m}=e;if(d===-2&&(i=!1),s!=null&&(Ye(),Nr(s,null,n,e,!0),Xe()),p!=null&&(t.renderCache[p]=void 0),u&256){t.ctx.deactivate(e);return}let h=u&1&&f,g=!Fr(e),_;if(g&&(_=o&&o.onVnodeBeforeUnmount)&&Ga(_,t,e),u&6)ue(e.component,n,r);else{if(u&128){e.suspense.unmount(n,r);return}h&&Hn(e,null,t,`beforeUnmount`),u&64?e.type.remove(e,t,n,ge,r):l&&!l.hasOnce&&(a!==H||d>0&&d&64)?de(l,t,n,!1,!0):(a===H&&d&384||!i&&u&16)&&de(c,t,n),r&&ce(e)}let v=m!=null&&p==null;(g&&(_=o&&o.onVnodeUnmounted)||h||v)&&ua(()=>{_&&Ga(_,t,e),h&&Hn(e,null,t,`unmounted`),v&&(e.el=null)},n)},ce=e=>{let{type:t,el:n,anchor:r,transition:a}=e;if(t===H){le(n,r);return}if(t===Ta){C(e);return}let o=()=>{i(n),a&&!a.persisted&&a.afterLeave&&a.afterLeave()};if(e.shapeFlag&1&&a&&!a.persisted){let{leave:t,delayLeave:r}=a,i=()=>t(n,o);r?r(e.el,o,i):i()}else o()},le=(e,t)=>{let n;for(;e!==t;)n=h(e),i(e),e=n;i(t)},ue=(e,t,n)=>{let{bum:r,scope:i,job:a,subTree:o,um:s,m:c,a:l}=e;ya(c),ya(l),r&&se(r),i.stop(),a&&(a.flags|=8,F(o,e,t,n)),s&&ua(s,t),ua(()=>{e.isUnmounted=!0},t)},de=(e,t,n,r=!1,i=!1,a=0)=>{for(let o=a;o<e.length;o++)F(e[o],t,n,r,i)},pe=e=>{if(e.shapeFlag&6)return pe(e.component.subTree);if(e.shapeFlag&128)return e.suspense.next();let t=h(e.anchor||e.el),n=t&&t[er];return n?h(n):t},me=!1,he=(e,t,n)=>{let r;e==null?t._vnode&&(F(t._vnode,null,null,!0),r=t._vnode.component):v(t._vnode||null,e,t,null,null,null,n),t._vnode=e,me||=(me=!0,Nn(r),Pn(),!1)},ge={p:v,um:F,m:oe,r:ce,mt:j,mc:D,pc:re,pbc:O,n:pe,o:e},_e,ve;return t&&([_e,ve]=t(ge)),{render:he,hydrate:_e,createApp:Mi(he,_e)}}function pa({type:e,props:t},n){return n===`svg`&&e===`foreignObject`||n===`mathml`&&e===`annotation-xml`&&t&&t.encoding&&t.encoding.includes(`html`)?void 0:n}function ma({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function ha(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function ga(e,t,n=!1){let r=e.children,i=t.children;if(b(r)&&b(i))for(let e=0;e<r.length;e++){let t=r[e],a=i[e];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[e]=Ua(i[e]),a.el=t.el),!n&&a.patchFlag!==-2&&ga(t,a)),a.type===Ca&&(a.patchFlag===-1&&(a=i[e]=Ua(a)),a.el=t.el),a.type===wa&&!a.el&&(a.el=t.el)}}function _a(e){let t=e.slice(),n=[0],r,i,a,o,s,c=e.length;for(r=0;r<c;r++){let c=e[r];if(c!==0){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}for(a=0,o=n.length-1;a<o;)s=a+o>>1,e[n[s]]<c?a=s+1:o=s;c<e[n[a]]&&(a>0&&(t[r]=n[a-1]),n[a]=r)}}for(a=n.length,o=n[a-1];a-- >0;)n[a]=o,o=t[o];return n}function va(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:va(t)}function ya(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function ba(e){if(e.placeholder)return e.placeholder;let t=e.component;return t?ba(t.subTree):null}var xa=e=>e.__isSuspense;function Sa(e,t){t&&t.pendingBranch?b(e)?t.effects.push(...e):t.effects.push(e):Mn(e)}var H=Symbol.for(`v-fgt`),Ca=Symbol.for(`v-txt`),wa=Symbol.for(`v-cmt`),Ta=Symbol.for(`v-stc`),Ea=[],Da=null;function U(e=!1){Ea.push(Da=e?null:[])}function Oa(){Ea.pop(),Da=Ea[Ea.length-1]||null}var ka=1;function Aa(e,t=!1){ka+=e,e<0&&Da&&t&&(Da.hasOnce=!0)}function ja(e){return e.dynamicChildren=ka>0?Da||d:null,Oa(),ka>0&&Da&&Da.push(e),e}function W(e,t,n,r,i,a){return ja(G(e,t,n,r,i,a,!0))}function Ma(e,t,n,r,i){return ja(K(e,t,n,r,i,!0))}function Na(e){return e?e.__v_isVNode===!0:!1}function Pa(e,t){return e.type===t.type&&e.key===t.key}var Fa=({key:e})=>e??null,Ia=({ref:e,ref_key:t,ref_for:n})=>(typeof e==`number`&&(e=``+e),e==null?null:T(e)||z(e)||w(e)?{i:Ln,r:e,k:t,f:!!n}:e);function G(e,t=null,n=null,r=0,i=null,a=e===H?0:1,o=!1,s=!1){let c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Fa(t),ref:t&&Ia(t),scopeId:Rn,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:Ln};return s?(Wa(c,n),a&128&&e.normalize(c)):n&&(c.shapeFlag|=T(n)?8:16),ka>0&&!o&&Da&&(c.patchFlag>0||a&6)&&c.patchFlag!==32&&Da.push(c),c}var K=La;function La(e,t=null,n=null,r=0,i=null,a=!1){if((!e||e===ni)&&(e=wa),Na(e)){let r=za(e,t,!0);return n&&Wa(r,n),ka>0&&!a&&Da&&(r.shapeFlag&6?Da[Da.indexOf(e)]=r:Da.push(r)),r.patchFlag=-2,r}if(mo(e)&&(e=e.__vccOpts),t){t=Ra(t);let{class:e,style:n}=t;e&&!T(e)&&(t.class=ve(e)),D(n)&&(Xt(n)&&!b(n)&&(n=g({},n)),t.style=pe(n))}let o=T(e)?1:xa(e)?128:tr(e)?64:D(e)?4:w(e)?2:0;return G(e,t,n,r,i,o,a,!0)}function Ra(e){return e?Xt(e)||Ji(e)?g({},e):e:null}function za(e,t,n=!1,r=!1){let{props:i,ref:a,patchFlag:o,children:s,transition:c}=e,l=t?q(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Fa(l),ref:t&&t.ref?n&&a?b(a)?a.concat(Ia(t)):[a,Ia(t)]:Ia(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==H?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&za(e.ssContent),ssFallback:e.ssFallback&&za(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&r&&Er(u,c.clone(u)),u}function Ba(e=` `,t=0){return K(Ca,null,e,t)}function Va(e=``,t=!1){return t?(U(),Ma(wa,null,e)):K(wa,null,e)}function Ha(e){return e==null||typeof e==`boolean`?K(wa):b(e)?K(H,null,e.slice()):Na(e)?Ua(e):K(Ca,null,String(e))}function Ua(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:za(e)}function Wa(e,t){let n=0,{shapeFlag:r}=e;if(t==null)t=null;else if(b(t))n=16;else if(typeof t==`object`)if(r&65){let n=t.default;n&&(n._c&&(n._d=!1),Wa(e,n()),n._c&&(n._d=!0));return}else{n=32;let r=t._;!r&&!Ji(t)?t._ctx=Ln:r===3&&Ln&&(Ln.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else w(t)?(t={default:t,_ctx:Ln},n=32):(t=String(t),r&64?(n=16,t=[Ba(t)]):n=8);e.children=t,e.shapeFlag|=n}function q(...e){let t={};for(let n=0;n<e.length;n++){let r=e[n];for(let e in r)if(e===`class`)t.class!==r.class&&(t.class=ve([t.class,r.class]));else if(e===`style`)t.style=pe([t.style,r.style]);else if(m(e)){let n=t[e],i=r[e];i&&n!==i&&!(b(n)&&n.includes(i))?t[e]=n?[].concat(n,i):i:i==null&&n==null&&!h(e)&&(t[e]=i)}else e!==``&&(t[e]=r[e])}return t}function Ga(e,t,n,r=null){vn(e,t,7,[n,r])}var Ka=Ai(),qa=0;function Ja(e,t,n){let r=e.type,i=(t?t.appContext:e.appContext)||Ka,a={uid:qa++,vnode:e,type:r,parent:t,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new ke(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(i.provides),ids:t?t.ids:[``,0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:ea(r,i),emitsOptions:Li(r,i),emit:null,emitted:null,propsDefaults:u,inheritAttrs:r.inheritAttrs,ctx:u,data:u,props:u,attrs:u,slots:u,refs:u,setupState:u,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return a.ctx={_:a},a.root=t?t.root:a,a.emit=Fi.bind(null,a),e.ce&&e.ce(a),a}var Ya=null,Xa=()=>Ya||Ln,Za,Qa;{let e=fe(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};Za=t(`__VUE_INSTANCE_SETTERS__`,e=>Ya=e),Qa=t(`__VUE_SSR_SETTERS__`,e=>no=e)}var $a=e=>{let t=Ya;return Za(e),e.scope.on(),()=>{e.scope.off(),Za(t)}},eo=()=>{Ya&&Ya.scope.off(),Za(null)};function to(e){return e.vnode.shapeFlag&4}var no=!1;function ro(e,t=!1,n=!1){t&&Qa(t);let{props:r,children:i}=e.vnode,a=to(e);Yi(e,r,a,t),ca(e,i,n||t);let o=a?io(e,t):void 0;return t&&Qa(!1),o}function io(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,pi);let{setup:r}=n;if(r){Ye();let n=e.setupContext=r.length>1?uo(e):null,i=$a(e),a=_n(r,e,0,[e.props,n]),o=ee(a);if(Xe(),i(),(o||e.sp)&&!Fr(e)&&Ar(e),o){if(a.then(eo,eo),t)return a.then(n=>{ao(e,n,t)}).catch(t=>{yn(t,e,0)});e.asyncDep=a}else ao(e,a,t)}else co(e,t)}function ao(e,t,n){w(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:D(t)&&(e.setupState=an(t)),co(e,n)}var oo,so;function co(e,t,n){let r=e.type;if(!e.render){if(!t&&oo&&!r.render){let t=r.template||bi(e).template;if(t){let{isCustomElement:n,compilerOptions:i}=e.appContext.config,{delimiters:a,compilerOptions:o}=r;r.render=oo(t,g(g({isCustomElement:n,delimiters:a},i),o))}}e.render=r.render||f,so&&so(e)}{let t=$a(e);Ye();try{gi(e)}finally{Xe(),t()}}}var lo={get(e,t){return ot(e,`get`,``),e[t]}};function uo(e){return{attrs:new Proxy(e.attrs,lo),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{}}}}function fo(e){return e.exposed?e.exposeProxy||=new Proxy(an(Zt(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in di)return di[n](e)},has(e,t){return t in e||t in di}}):e.proxy}function po(e,t=!0){return w(e)?e.displayName||e.name:e.name||t&&e.__name}function mo(e){return w(e)&&`__vccOpts`in e}var ho=(e,t)=>un(e,t,no);function go(e,t,n){try{Aa(-1);let r=arguments.length;return r===2?D(t)&&!b(t)?Na(t)?K(e,null,[t]):K(e,t):K(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Na(n)&&(n=[n]),K(e,t,n))}finally{Aa(1)}}var _o=`3.5.34`,vo=void 0,yo=typeof window<`u`&&window.trustedTypes;if(yo)try{vo=yo.createPolicy(`vue`,{createHTML:e=>e})}catch{}var bo=vo?e=>vo.createHTML(e):e=>e,xo=`http://www.w3.org/2000/svg`,So=`http://www.w3.org/1998/Math/MathML`,Co=typeof document<`u`?document:null,wo=Co&&Co.createElement(`template`),To={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{let i=t===`svg`?Co.createElementNS(xo,e):t===`mathml`?Co.createElementNS(So,e):n?Co.createElement(e,{is:n}):Co.createElement(e);return e===`select`&&r&&r.multiple!=null&&i.setAttribute(`multiple`,r.multiple),i},createText:e=>Co.createTextNode(e),createComment:e=>Co.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Co.querySelector(e),setScopeId(e,t){e.setAttribute(t,``)},insertStaticContent(e,t,n,r,i,a){let o=n?n.previousSibling:t.lastChild;if(i&&(i===a||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),!(i===a||!(i=i.nextSibling)););else{wo.innerHTML=bo(r===`svg`?`<svg>${e}</svg>`:r===`mathml`?`<math>${e}</math>`:e);let i=wo.content;if(r===`svg`||r===`mathml`){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Eo=`transition`,Do=`animation`,Oo=Symbol(`_vtc`),ko={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Ao=g({},_r,ko),jo=(e=>(e.displayName=`Transition`,e.props=Ao,e))((e,{slots:t})=>go(xr,Po(e),t)),Mo=(e,t=[])=>{b(e)?e.forEach(e=>e(...t)):e&&e(...t)},No=e=>e?b(e)?e.some(e=>e.length>1):e.length>1:!1;function Po(e){let t={};for(let n in e)n in ko||(t[n]=e[n]);if(e.css===!1)return t;let{name:n=`v`,type:r,duration:i,enterFromClass:a=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:s=`${n}-enter-to`,appearFromClass:c=a,appearActiveClass:l=o,appearToClass:u=s,leaveFromClass:d=`${n}-leave-from`,leaveActiveClass:f=`${n}-leave-active`,leaveToClass:p=`${n}-leave-to`}=e,m=Fo(i),h=m&&m[0],_=m&&m[1],{onBeforeEnter:v,onEnter:y,onEnterCancelled:b,onLeave:x,onLeaveCancelled:S,onBeforeAppear:C=v,onAppear:w=y,onAppearCancelled:T=b}=t,E=(e,t,n,r)=>{e._enterCancelled=r,Ro(e,t?u:s),Ro(e,t?l:o),n&&n()},D=(e,t)=>{e._isLeaving=!1,Ro(e,d),Ro(e,p),Ro(e,f),t&&t()},ee=e=>(t,n)=>{let i=e?w:y,o=()=>E(t,e,n);Mo(i,[t,o]),zo(()=>{Ro(t,e?c:a),Lo(t,e?u:s),No(i)||Vo(t,r,h,o)})};return g(t,{onBeforeEnter(e){Mo(v,[e]),Lo(e,a),Lo(e,o)},onBeforeAppear(e){Mo(C,[e]),Lo(e,c),Lo(e,l)},onEnter:ee(!1),onAppear:ee(!0),onLeave(e,t){e._isLeaving=!0;let n=()=>D(e,t);Lo(e,d),e._enterCancelled?(Lo(e,f),Go(e)):(Go(e),Lo(e,f)),zo(()=>{e._isLeaving&&(Ro(e,d),Lo(e,p),No(x)||Vo(e,r,_,n))}),Mo(x,[e,n])},onEnterCancelled(e){E(e,!1,void 0,!0),Mo(b,[e])},onAppearCancelled(e){E(e,!0,void 0,!0),Mo(T,[e])},onLeaveCancelled(e){D(e),Mo(S,[e])}})}function Fo(e){if(e==null)return null;if(D(e))return[Io(e.enter),Io(e.leave)];{let t=Io(e);return[t,t]}}function Io(e){return ue(e)}function Lo(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.add(t)),(e[Oo]||(e[Oo]=new Set)).add(t)}function Ro(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.remove(t));let n=e[Oo];n&&(n.delete(t),n.size||(e[Oo]=void 0))}function zo(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}var Bo=0;function Vo(e,t,n,r){let i=e._endId=++Bo,a=()=>{i===e._endId&&r()};if(n!=null)return setTimeout(a,n);let{type:o,timeout:s,propCount:c}=Ho(e,t);if(!o)return r();let l=o+`end`,u=0,d=()=>{e.removeEventListener(l,f),a()},f=t=>{t.target===e&&++u>=c&&d()};setTimeout(()=>{u<c&&d()},s+1),e.addEventListener(l,f)}function Ho(e,t){let n=window.getComputedStyle(e),r=e=>(n[e]||``).split(`, `),i=r(`${Eo}Delay`),a=r(`${Eo}Duration`),o=Uo(i,a),s=r(`${Do}Delay`),c=r(`${Do}Duration`),l=Uo(s,c),u=null,d=0,f=0;t===Eo?o>0&&(u=Eo,d=o,f=a.length):t===Do?l>0&&(u=Do,d=l,f=c.length):(d=Math.max(o,l),u=d>0?o>l?Eo:Do:null,f=u?u===Eo?a.length:c.length:0);let p=u===Eo&&/\b(?:transform|all)(?:,|$)/.test(r(`${Eo}Property`).toString());return{type:u,timeout:d,propCount:f,hasTransform:p}}function Uo(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((t,n)=>Wo(t)+Wo(e[n])))}function Wo(e){return e===`auto`?0:Number(e.slice(0,-1).replace(`,`,`.`))*1e3}function Go(e){return(e?e.ownerDocument:document).body.offsetHeight}function Ko(e,t,n){let r=e[Oo];r&&(t=(t?[t,...r]:[...r]).join(` `)),t==null?e.removeAttribute(`class`):n?e.setAttribute(`class`,t):e.className=t}var qo=Symbol(`_vod`),Jo=Symbol(`_vsh`),Yo={name:`show`,beforeMount(e,{value:t},{transition:n}){e[qo]=e.style.display===`none`?``:e.style.display,n&&t?n.beforeEnter(e):Xo(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:r}){!t!=!n&&(r?t?(r.beforeEnter(e),Xo(e,!0),r.enter(e)):r.leave(e,()=>{Xo(e,!1)}):Xo(e,t))},beforeUnmount(e,{value:t}){Xo(e,t)}};function Xo(e,t){e.style.display=t?e[qo]:`none`,e[Jo]=!t}var Zo=Symbol(``),Qo=/(?:^|;)\s*display\s*:/;function $o(e,t,n){let r=e.style,i=T(n),a=!1;if(n&&!i){if(t)if(T(t))for(let e of t.split(`;`)){let t=e.slice(0,e.indexOf(`:`)).trim();n[t]??ts(r,t,``)}else for(let e in t)n[e]??ts(r,e,``);for(let i in n){i===`display`&&(a=!0);let o=n[i];o==null?ts(r,i,``):as(e,i,!T(t)&&t?t[i]:void 0,o)||ts(r,i,o)}}else if(i){if(t!==n){let e=r[Zo];e&&(n+=`;`+e),r.cssText=n,a=Qo.test(n)}}else t&&e.removeAttribute(`style`);qo in e&&(e[qo]=a?r.display:``,e[Jo]&&(r.display=`none`))}var es=/\s*!important$/;function ts(e,t,n){if(b(n))n.forEach(n=>ts(e,t,n));else if(n??=``,t.startsWith(`--`))e.setProperty(t,n);else{let r=is(e,t);es.test(n)?e.setProperty(ie(r),n.replace(es,``),`important`):e[r]=n}}var ns=[`Webkit`,`Moz`,`ms`],rs={};function is(e,t){let n=rs[t];if(n)return n;let r=P(t);if(r!==`filter`&&r in e)return rs[t]=r;r=ae(r);for(let n=0;n<ns.length;n++){let i=ns[n]+r;if(i in e)return rs[t]=i}return t}function as(e,t,n,r){return e.tagName===`TEXTAREA`&&(t===`width`||t===`height`)&&T(r)&&n===r}var os=`http://www.w3.org/1999/xlink`;function ss(e,t,n,r,i,a=xe(t)){r&&t.startsWith(`xlink:`)?n==null?e.removeAttributeNS(os,t.slice(6,t.length)):e.setAttributeNS(os,t,n):n==null||a&&!Se(n)?e.removeAttribute(t):e.setAttribute(t,a?``:E(n)?String(n):n)}function cs(e,t,n,r,i){if(t===`innerHTML`||t===`textContent`){n!=null&&(e[t]=t===`innerHTML`?bo(n):n);return}let a=e.tagName;if(t===`value`&&a!==`PROGRESS`&&!a.includes(`-`)){let r=a===`OPTION`?e.getAttribute(`value`)||``:e.value,i=n==null?e.type===`checkbox`?`on`:``:String(n);(r!==i||!(`_value`in e))&&(e.value=i),n??e.removeAttribute(t),e._value=n;return}let o=!1;if(n===``||n==null){let r=typeof e[t];r===`boolean`?n=Se(n):n==null&&r===`string`?(n=``,o=!0):r===`number`&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(i||t)}function ls(e,t,n,r){e.addEventListener(t,n,r)}function us(e,t,n,r){e.removeEventListener(t,n,r)}var ds=Symbol(`_vei`);function fs(e,t,n,r,i=null){let a=e[ds]||(e[ds]={}),o=a[t];if(r&&o)o.value=r;else{let[n,s]=ms(t);r?ls(e,n,a[t]=vs(r,i),s):o&&(us(e,n,o,s),a[t]=void 0)}}var ps=/(?:Once|Passive|Capture)$/;function ms(e){let t;if(ps.test(e)){t={};let n;for(;n=e.match(ps);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}return[e[2]===`:`?e.slice(3):ie(e.slice(2)),t]}var hs=0,gs=Promise.resolve(),_s=()=>hs||=(gs.then(()=>hs=0),Date.now());function vs(e,t){let n=e=>{if(!e._vts)e._vts=Date.now();else if(e._vts<=n.attached)return;vn(ys(e,n.value),t,5,[e])};return n.value=e,n.attached=_s(),n}function ys(e,t){if(b(t)){let n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(e=>t=>!t._stopped&&e&&e(t))}else return t}var bs=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,xs=(e,t,n,r,i,a)=>{let o=i===`svg`;t===`class`?Ko(e,r,o):t===`style`?$o(e,n,r):m(t)?h(t)||fs(e,t,n,r,a):(t[0]===`.`?(t=t.slice(1),!0):t[0]===`^`?(t=t.slice(1),!1):Ss(e,t,r,o))?(cs(e,t,r),!e.tagName.includes(`-`)&&(t===`value`||t===`checked`||t===`selected`)&&ss(e,t,r,o,a,t!==`value`)):e._isVueCE&&(Cs(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!T(r)))?cs(e,P(t),r,a,t):(t===`true-value`?e._trueValue=r:t===`false-value`&&(e._falseValue=r),ss(e,t,r,o))};function Ss(e,t,n,r){if(r)return!!(t===`innerHTML`||t===`textContent`||t in e&&bs(t)&&w(n));if(t===`spellcheck`||t===`draggable`||t===`translate`||t===`autocorrect`||t===`sandbox`&&e.tagName===`IFRAME`||t===`form`||t===`list`&&e.tagName===`INPUT`||t===`type`&&e.tagName===`TEXTAREA`)return!1;if(t===`width`||t===`height`){let t=e.tagName;if(t===`IMG`||t===`VIDEO`||t===`CANVAS`||t===`SOURCE`)return!1}return bs(t)&&T(n)?!1:t in e}function Cs(e,t){let n=e._def.props;if(!n)return!1;let r=P(t);return Array.isArray(n)?n.some(e=>P(e)===r):Object.keys(n).some(e=>P(e)===r)}var ws=[`ctrl`,`shift`,`alt`,`meta`],Ts={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>`button`in e&&e.button!==0,middle:e=>`button`in e&&e.button!==1,right:e=>`button`in e&&e.button!==2,exact:(e,t)=>ws.some(n=>e[`${n}Key`]&&!t.includes(n))},Es=(e,t)=>{if(!e)return e;let n=e._withMods||={},r=t.join(`.`);return n[r]||(n[r]=((n,...r)=>{for(let e=0;e<t.length;e++){let r=Ts[t[e]];if(r&&r(n,t))return}return e(n,...r)}))},Ds=g({patchProp:xs},To),Os;function ks(){return Os||=da(Ds)}var As=((...e)=>{let t=ks().createApp(...e),{mount:n}=t;return t.mount=e=>{let r=Ms(e);if(!r)return;let i=t._component;!w(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent=``);let a=n(r,!1,js(r));return r instanceof Element&&(r.removeAttribute(`v-cloak`),r.setAttribute(`data-v-app`,``)),a},t});function js(e){if(e instanceof SVGElement)return`svg`;if(typeof MathMLElement==`function`&&e instanceof MathMLElement)return`mathml`}function Ms(e){return T(e)?document.querySelector(e):e}var Ns=typeof window<`u`,Ps,Fs=e=>Ps=e,Is=Symbol();function Ls(e){return e&&typeof e==`object`&&Object.prototype.toString.call(e)===`[object Object]`&&typeof e.toJSON!=`function`}var Rs;(function(e){e.direct=`direct`,e.patchObject=`patch object`,e.patchFunction=`patch function`})(Rs||={});var zs=typeof window==`object`&&window.window===window?window:typeof self==`object`&&self.self===self?self:typeof global==`object`&&global.global===global?global:typeof globalThis==`object`?globalThis:{HTMLElement:null};function Bs(e,{autoBom:t=!1}={}){return t&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob([`﻿`,e],{type:e.type}):e}function Vs(e,t,n){let r=new XMLHttpRequest;r.open(`GET`,e),r.responseType=`blob`,r.onload=function(){Ks(r.response,t,n)},r.onerror=function(){console.error(`could not download file`)},r.send()}function Hs(e){let t=new XMLHttpRequest;t.open(`HEAD`,e,!1);try{t.send()}catch{}return t.status>=200&&t.status<=299}function Us(e){try{e.dispatchEvent(new MouseEvent(`click`))}catch{let t=new MouseEvent(`click`,{bubbles:!0,cancelable:!0,view:window,detail:0,screenX:80,screenY:20,clientX:80,clientY:20,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,button:0,relatedTarget:null});e.dispatchEvent(t)}}var Ws=typeof navigator==`object`?navigator:{userAgent:``},Gs=/Macintosh/.test(Ws.userAgent)&&/AppleWebKit/.test(Ws.userAgent)&&!/Safari/.test(Ws.userAgent),Ks=Ns?typeof HTMLAnchorElement<`u`&&`download`in HTMLAnchorElement.prototype&&!Gs?qs:`msSaveOrOpenBlob`in Ws?Js:Ys:()=>{};function qs(e,t=`download`,n){let r=document.createElement(`a`);r.download=t,r.rel=`noopener`,typeof e==`string`?(r.href=e,r.origin===location.origin?Us(r):Hs(r.href)?Vs(e,t,n):(r.target=`_blank`,Us(r))):(r.href=URL.createObjectURL(e),setTimeout(function(){URL.revokeObjectURL(r.href)},4e4),setTimeout(function(){Us(r)},0))}function Js(e,t=`download`,n){if(typeof e==`string`)if(Hs(e))Vs(e,t,n);else{let t=document.createElement(`a`);t.href=e,t.target=`_blank`,setTimeout(function(){Us(t)})}else navigator.msSaveOrOpenBlob(Bs(e,n),t)}function Ys(e,t,n,r){if(r||=open(``,`_blank`),r&&(r.document.title=r.document.body.innerText=`downloading...`),typeof e==`string`)return Vs(e,t,n);let i=e.type===`application/octet-stream`,a=/constructor/i.test(String(zs.HTMLElement))||`safari`in zs,o=/CriOS\/[\d]+/.test(navigator.userAgent);if((o||i&&a||Gs)&&typeof FileReader<`u`){let t=new FileReader;t.onloadend=function(){let e=t.result;if(typeof e!=`string`)throw r=null,Error(`Wrong reader.result type`);e=o?e:e.replace(/^data:[^;]*;/,`data:attachment/file;`),r?r.location.href=e:location.assign(e),r=null},t.readAsDataURL(e)}else{let t=URL.createObjectURL(e);r?r.location.assign(t):location.href=t,r=null,setTimeout(function(){URL.revokeObjectURL(t)},4e4)}}var{assign:Xs}=Object;function Zs(){let e=Ae(!0),t=e.run(()=>en({})),n=[],r=[],i=Zt({install(e){Fs(i),i._a=e,e.provide(Is,i),e.config.globalProperties.$pinia=i,r.forEach(e=>n.push(e)),r=[]},use(e){return this._a?n.push(e):r.push(e),this},_p:n,_a:null,_e:e,_s:new Map,state:t});return i}var Qs=()=>{};function $s(e,t,n,r=Qs){e.add(t);let i=()=>{e.delete(t)&&r()};return!n&&je()&&Me(i),i}function ec(e,...t){e.forEach(e=>{e(...t)})}var tc=e=>e(),nc=Symbol(),rc=Symbol();function ic(e,t){e instanceof Map&&t instanceof Map?t.forEach((t,n)=>e.set(n,t)):e instanceof Set&&t instanceof Set&&t.forEach(e.add,e);for(let n in t){if(!t.hasOwnProperty(n))continue;let r=t[n],i=e[n];Ls(i)&&Ls(r)&&e.hasOwnProperty(n)&&!z(r)&&!qt(r)?e[n]=ic(i,r):e[n]=r}return e}var ac=Symbol();function oc(e){return!Ls(e)||!Object.prototype.hasOwnProperty.call(e,ac)}var{assign:sc}=Object;function cc(e){return!!(z(e)&&e.effect)}function lc(e,t,n,r){let{state:i,actions:a,getters:o}=t,s=n.state.value[e],c;function l(){return s||(n.state.value[e]=i?i():{}),sc(on(n.state.value[e]),a,Object.keys(o||{}).reduce((t,r)=>(t[r]=Zt(ho(()=>{Fs(n);let t=n._s.get(e);return o[r].call(t,t)})),t),{}))}return c=uc(e,l,t,n,r,!0),c}function uc(e,t,n={},r,i,a){let o,s=sc({actions:{}},n),c={deep:!0},l,u,d=new Set,f=new Set,p=r.state.value[e];!a&&!p&&(r.state.value[e]={});let m;function h(t){let n;l=u=!1,typeof t==`function`?(t(r.state.value[e]),n={type:Rs.patchFunction,storeId:e,events:void 0}):(ic(r.state.value[e],t),n={type:Rs.patchObject,payload:t,storeId:e,events:void 0});let i=m=Symbol();On().then(()=>{m===i&&(l=!0)}),u=!0,ec(d,n,r.state.value[e])}let g=a?function(){let{state:e}=n,t=e?e():{};this.$patch(e=>{sc(e,t)})}:Qs;function _(){o.stop(),d.clear(),f.clear(),r._s.delete(e)}let v=(t,n=``)=>{if(nc in t)return t[rc]=n,t;let i=function(){Fs(r);let n=Array.from(arguments),a=new Set,o=new Set;function s(e){a.add(e)}function c(e){o.add(e)}ec(f,{args:n,name:i[rc],store:y,after:s,onError:c});let l;try{l=t.apply(this&&this.$id===e?this:y,n)}catch(e){throw ec(o,e),e}return l instanceof Promise?l.then(e=>(ec(a,e),e)).catch(e=>(ec(o,e),Promise.reject(e))):(ec(a,l),l)};return i[nc]=!0,i[rc]=n,i},y=Ut({_p:r,$id:e,$onAction:$s.bind(null,f),$patch:h,$reset:g,$subscribe(t,n={}){let i=$s(d,t,n.detached,()=>a()),a=o.run(()=>Yn(()=>r.state.value[e],r=>{(n.flush===`sync`?u:l)&&t({storeId:e,type:Rs.direct,events:void 0},r)},sc({},c,n)));return i},$dispose:_});r._s.set(e,y);let b=(r._a&&r._a.runWithContext||tc)(()=>r._e.run(()=>(o=Ae()).run(()=>t({action:v}))));for(let t in b){let n=b[t];z(n)&&!cc(n)||qt(n)?a||(p&&oc(n)&&(z(n)?n.value=p[t]:ic(n,p[t])),r.state.value[e][t]=n):typeof n==`function`&&(b[t]=v(n,t),s.actions[t]=n)}return sc(y,b),sc(R(y),b),Object.defineProperty(y,`$state`,{get:()=>r.state.value[e],set:e=>{h(t=>{sc(t,e)})}}),r._p.forEach(e=>{sc(y,o.run(()=>e({store:y,app:r._a,pinia:r,options:s})))}),p&&a&&n.hydrate&&n.hydrate(y.$state,p),l=!0,u=!0,y}function dc(e,t,n){let r,i=typeof t==`function`;r=i?n:t;function a(n,a){let o=Gn();return n||=o?Wn(Is,null):null,n&&Fs(n),n=Ps,n._s.has(e)||(i?uc(e,t,r,n):lc(e,r,n)),n._s.get(e)}return a.$id=e,a}function fc(){return window.matchMedia&&window.matchMedia(`(prefers-color-scheme: dark)`).matches}var pc=dc(`settings`,()=>{let e=en(`Canvas`),t=en(1),n=en(`light`),r=en(fc()),i=e=>{r.value=e,e?document.documentElement.classList.add(`app-dark-mode`):document.documentElement.classList.remove(`app-dark-mode`)};return i(r.value),{renderer:e,scale:t,theme:n,darkMode:r,setDarkMode:i,preferredLang:en(`typescript`)}}),mc=`modulepreload`,hc=function(e){return`/plotive/`+e},gc={},_c=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=hc(t,n),t in gc)return;gc[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:mc,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},vc=null;async function yc(){return vc||=bc().catch(e=>{throw vc=null,e}),vc}async function bc(){let e=await _c(()=>import(`./plotive_wasm-DXwgY8Y3.js`),[]);return await e.default(),e.set_panic_hook(),e}var xc={"black-white":{theme:`light`,palette:`black`},light:{theme:`light`,palette:`standard`},dark:{theme:`dark`,palette:`pastel`},"tol-bright":{theme:`light`,palette:`tol-bright`},"okabe-ito":{theme:`light`,palette:`okabe-ito`},"catppuccin-mocha":{theme:`catppuccin-mocha`,palette:`catppuccin-mocha`},"catppuccin-macchiato":{theme:`catppuccin-macchiato`,palette:`catppuccin-macchiato`},"catppuccin-frappe":{theme:`catppuccin-frappe`,palette:`catppuccin-frappe`},"catppuccin-latte":{theme:`catppuccin-latte`,palette:`catppuccin-latte`},dracula:{theme:`dracula`,palette:`dracula`},alucard:{theme:`alucard`,palette:`alucard`}};async function Sc(e){let t=[];for(let n of e)if(n instanceof ArrayBuffer||ArrayBuffer.isView(n))t.push(n);else if(typeof n==`string`||n instanceof URL){let e=await fetch(n.toString());if(!e.ok)throw Error(`Failed to load font "${n}" from "${n}": ${e.statusText}`);t.push(await e.arrayBuffer())}else if(n instanceof Blob)t.push(await n.arrayBuffer());else throw Error(`Unsupported font source type for "${n}"`);return t}async function Cc(e,t){let n=await yc();return t?.fontdb&&(t.fontdb=await Sc(t.fontdb)),n.render_to_png_data_url(e,t)}async function wc(e,t,n){let r=await yc();n?.fontdb&&(n.fontdb=await Sc(n.fontdb)),await r.render_to_svg(t,e,n)}async function Tc(e,t,n){e.src=await Cc(t,n)}async function Ec(e,t,n){let r=await yc();n?.fontdb&&(n.fontdb=await Sc(n.fontdb)),await r.render_to_canvas(t,e,n)}async function Dc(e){return(await yc()).parse_csv(e)}var Oc=c(o(((e,t)=>{function n(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw Error(`map is read-only`)}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw Error(`set is read-only`)}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let r=e[t],i=typeof r;(i===`object`||i===`function`)&&!Object.isFrozen(r)&&n(r)}),e}var r=class{constructor(e){e.data===void 0&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function i(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#x27;`)}function a(e,...t){let n=Object.create(null);for(let t in e)n[t]=e[t];return t.forEach(function(e){for(let t in e)n[t]=e[t]}),n}var o=`</span>`,s=e=>!!e.scope,c=(e,{prefix:t})=>{if(e.startsWith(`language:`))return e.replace(`language:`,`language-`);if(e.includes(`.`)){let n=e.split(`.`);return[`${t}${n.shift()}`,...n.map((e,t)=>`${e}${`_`.repeat(t+1)}`)].join(` `)}return`${t}${e}`},l=class{constructor(e,t){this.buffer=``,this.classPrefix=t.classPrefix,e.walk(this)}addText(e){this.buffer+=i(e)}openNode(e){if(!s(e))return;let t=c(e.scope,{prefix:this.classPrefix});this.span(t)}closeNode(e){s(e)&&(this.buffer+=o)}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}},u=(e={})=>{let t={children:[]};return Object.assign(t,e),t},d=class e{constructor(){this.rootNode=u(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){let t=u({scope:e});this.add(t),this.stack.push(t)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,t){return typeof t==`string`?e.addText(t):t.children&&(e.openNode(t),t.children.forEach(t=>this._walk(e,t)),e.closeNode(t)),e}static _collapse(t){typeof t!=`string`&&t.children&&(t.children.every(e=>typeof e==`string`)?t.children=[t.children.join(``)]:t.children.forEach(t=>{e._collapse(t)}))}},f=class extends d{constructor(e){super(),this.options=e}addText(e){e!==``&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,t){let n=e.root;t&&(n.scope=`language:${t}`),this.add(n)}toHTML(){return new l(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function p(e){return e?typeof e==`string`?e:e.source:null}function m(e){return _(`(?=`,e,`)`)}function h(e){return _(`(?:`,e,`)*`)}function g(e){return _(`(?:`,e,`)?`)}function _(...e){return e.map(e=>p(e)).join(``)}function v(e){let t=e[e.length-1];return typeof t==`object`&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function y(...e){return`(`+(v(e).capture?``:`?:`)+e.map(e=>p(e)).join(`|`)+`)`}function b(e){return RegExp(e.toString()+`|`).exec(``).length-1}function x(e,t){let n=e&&e.exec(t);return n&&n.index===0}var S=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function C(e,{joinWith:t}){let n=0;return e.map(e=>{n+=1;let t=n,r=p(e),i=``;for(;r.length>0;){let e=S.exec(r);if(!e){i+=r;break}i+=r.substring(0,e.index),r=r.substring(e.index+e[0].length),e[0][0]===`\\`&&e[1]?i+=`\\`+String(Number(e[1])+t):(i+=e[0],e[0]===`(`&&n++)}return i}).map(e=>`(${e})`).join(t)}var w=/\b\B/,T=`[a-zA-Z]\\w*`,E=`[a-zA-Z_]\\w*`,D=`\\b\\d+(\\.\\d+)?`,ee=`(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)`,O=`\\b(0b[01]+)`,k=`!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~`,te=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=_(t,/.*\b/,e.binary,/\b.*/)),a({scope:`meta`,begin:t,end:/$/,relevance:0,"on:begin":(e,t)=>{e.index!==0&&t.ignoreMatch()}},e)},A={begin:`\\\\[\\s\\S]`,relevance:0},j={scope:`string`,begin:`'`,end:`'`,illegal:`\\n`,contains:[A]},M={scope:`string`,begin:`"`,end:`"`,illegal:`\\n`,contains:[A]},N={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},ne=function(e,t,n={}){let r=a({scope:`comment`,begin:e,end:t,contains:[]},n);r.contains.push({scope:`doctag`,begin:`[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)`,end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let i=y(`I`,`a`,`is`,`so`,`us`,`to`,`at`,`if`,`in`,`it`,`on`,/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return r.contains.push({begin:_(/[ ]+/,`(`,i,/[.]?[:]?([.][ ]|[ ])/,`){3}`)}),r},P=ne(`//`,`$`),re=ne(`/\\*`,`\\*/`),ie=ne(`#`,`$`),ae={scope:`number`,begin:D,relevance:0},oe={scope:`number`,begin:ee,relevance:0},F={scope:`number`,begin:O,relevance:0},se={scope:`regexp`,begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[A,{begin:/\[/,end:/\]/,relevance:0,contains:[A]}]},ce={scope:`title`,begin:T,relevance:0},le={scope:`title`,begin:E,relevance:0},ue={begin:`\\.\\s*`+E,relevance:0},de=Object.freeze({__proto__:null,APOS_STRING_MODE:j,BACKSLASH_ESCAPE:A,BINARY_NUMBER_MODE:F,BINARY_NUMBER_RE:O,COMMENT:ne,C_BLOCK_COMMENT_MODE:re,C_LINE_COMMENT_MODE:P,C_NUMBER_MODE:oe,C_NUMBER_RE:ee,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,t)=>{t.data._beginMatch=e[1]},"on:end":(e,t)=>{t.data._beginMatch!==e[1]&&t.ignoreMatch()}})},HASH_COMMENT_MODE:ie,IDENT_RE:T,MATCH_NOTHING_RE:w,METHOD_GUARD:ue,NUMBER_MODE:ae,NUMBER_RE:D,PHRASAL_WORDS_MODE:N,QUOTE_STRING_MODE:M,REGEXP_MODE:se,RE_STARTERS_RE:k,SHEBANG:te,TITLE_MODE:ce,UNDERSCORE_IDENT_RE:E,UNDERSCORE_TITLE_MODE:le});function fe(e,t){e.input[e.index-1]===`.`&&t.ignoreMatch()}function pe(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function me(e,t){t&&e.beginKeywords&&(e.begin=`\\b(`+e.beginKeywords.split(` `).join(`|`)+`)(?!\\.)(?=\\b|\\s)`,e.__beforeBegin=fe,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function he(e,t){Array.isArray(e.illegal)&&(e.illegal=y(...e.illegal))}function ge(e,t){if(e.match){if(e.begin||e.end)throw Error(`begin & end are not supported with match`);e.begin=e.match,delete e.match}}function _e(e,t){e.relevance===void 0&&(e.relevance=1)}var ve=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw Error(`beforeMatch cannot be used with starts`);let n=Object.assign({},e);Object.keys(e).forEach(t=>{delete e[t]}),e.keywords=n.keywords,e.begin=_(n.beforeMatch,m(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},ye=[`of`,`and`,`for`,`in`,`not`,`or`,`if`,`then`,`parent`,`list`,`value`],be=`keyword`;function xe(e,t,n=be){let r=Object.create(null);return typeof e==`string`?i(n,e.split(` `)):Array.isArray(e)?i(n,e):Object.keys(e).forEach(function(n){Object.assign(r,xe(e[n],t,n))}),r;function i(e,n){t&&(n=n.map(e=>e.toLowerCase())),n.forEach(function(t){let n=t.split(`|`);r[n[0]]=[e,Se(n[0],n[1])]})}}function Se(e,t){return t?Number(t):+!Ce(e)}function Ce(e){return ye.includes(e.toLowerCase())}var we={},Te=e=>{console.error(e)},Ee=(e,...t)=>{console.log(`WARN: ${e}`,...t)},De=(e,t)=>{we[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),we[`${e}/${t}`]=!0)},Oe=Error();function I(e,t,{key:n}){let r=0,i=e[n],a={},o={};for(let e=1;e<=t.length;e++)o[e+r]=i[e],a[e+r]=!0,r+=b(t[e-1]);e[n]=o,e[n]._emit=a,e[n]._multi=!0}function ke(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw Te(`skip, excludeBegin, returnBegin not compatible with beginScope: {}`),Oe;if(typeof e.beginScope!=`object`||e.beginScope===null)throw Te(`beginScope must be object`),Oe;I(e,e.begin,{key:`beginScope`}),e.begin=C(e.begin,{joinWith:``})}}function Ae(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw Te(`skip, excludeEnd, returnEnd not compatible with endScope: {}`),Oe;if(typeof e.endScope!=`object`||e.endScope===null)throw Te(`endScope must be object`),Oe;I(e,e.end,{key:`endScope`}),e.end=C(e.end,{joinWith:``})}}function je(e){e.scope&&typeof e.scope==`object`&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Me(e){je(e),typeof e.beginScope==`string`&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope==`string`&&(e.endScope={_wrap:e.endScope}),ke(e),Ae(e)}function L(e){function t(t,n){return new RegExp(p(t),`m`+(e.case_insensitive?`i`:``)+(e.unicodeRegex?`u`:``)+(n?`g`:``))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,t){t.position=this.position++,this.matchIndexes[this.matchAt]=t,this.regexes.push([t,e]),this.matchAt+=b(e)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let e=this.regexes.map(e=>e[1]);this.matcherRe=t(C(e,{joinWith:`|`}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;let t=this.matcherRe.exec(e);if(!t)return null;let n=t.findIndex((e,t)=>t>0&&e!==void 0),r=this.matchIndexes[n];return t.splice(0,n),Object.assign(t,r)}}class r{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];let t=new n;return this.rules.slice(e).forEach(([e,n])=>t.addRule(e,n)),t.compile(),this.multiRegexes[e]=t,t}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(e,t){this.rules.push([e,t]),t.type===`begin`&&this.count++}exec(e){let t=this.getMatcher(this.regexIndex);t.lastIndex=this.lastIndex;let n=t.exec(e);if(this.resumingScanAtSamePosition()&&!(n&&n.index===this.lastIndex)){let t=this.getMatcher(0);t.lastIndex=this.lastIndex+1,n=t.exec(e)}return n&&(this.regexIndex+=n.position+1,this.regexIndex===this.count&&this.considerAll()),n}}function i(e){let t=new r;return e.contains.forEach(e=>t.addRule(e.begin,{rule:e,type:`begin`})),e.terminatorEnd&&t.addRule(e.terminatorEnd,{type:`end`}),e.illegal&&t.addRule(e.illegal,{type:`illegal`}),t}function o(n,r){let a=n;if(n.isCompiled)return a;[pe,ge,Me,ve].forEach(e=>e(n,r)),e.compilerExtensions.forEach(e=>e(n,r)),n.__beforeBegin=null,[me,he,_e].forEach(e=>e(n,r)),n.isCompiled=!0;let s=null;return typeof n.keywords==`object`&&n.keywords.$pattern&&(n.keywords=Object.assign({},n.keywords),s=n.keywords.$pattern,delete n.keywords.$pattern),s||=/\w+/,n.keywords&&=xe(n.keywords,e.case_insensitive),a.keywordPatternRe=t(s,!0),r&&(n.begin||=/\B|\b/,a.beginRe=t(a.begin),!n.end&&!n.endsWithParent&&(n.end=/\B|\b/),n.end&&(a.endRe=t(a.end)),a.terminatorEnd=p(a.end)||``,n.endsWithParent&&r.terminatorEnd&&(a.terminatorEnd+=(n.end?`|`:``)+r.terminatorEnd)),n.illegal&&(a.illegalRe=t(n.illegal)),n.contains||=[],n.contains=[].concat(...n.contains.map(function(e){return Pe(e===`self`?n:e)})),n.contains.forEach(function(e){o(e,a)}),n.starts&&o(n.starts,r),a.matcher=i(a),a}if(e.compilerExtensions||=[],e.contains&&e.contains.includes(`self`))throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=a(e.classNameAliases||{}),o(e)}function Ne(e){return e?e.endsWithParent||Ne(e.starts):!1}function Pe(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return a(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Ne(e)?a(e,{starts:e.starts?a(e.starts):null}):Object.isFrozen(e)?a(e):e}var Fe=`11.11.1`,Ie=class extends Error{constructor(e,t){super(e),this.name=`HTMLInjectionError`,this.html=t}},Le=i,Re=a,ze=Symbol(`nomatch`),Be=7,Ve=function(e){let t=Object.create(null),i=Object.create(null),a=[],o=!0,s=`Could not find the language '{}', did you forget to load/include a language module?`,c={disableAutodetect:!0,name:`Plain text`,contains:[]},l={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:`hljs-`,cssSelector:`pre code`,languages:null,__emitter:f};function u(e){return l.noHighlightRe.test(e)}function d(e){let t=e.className+` `;t+=e.parentNode?e.parentNode.className:``;let n=l.languageDetectRe.exec(t);if(n){let t=j(n[1]);return t||(Ee(s.replace(`{}`,n[1])),Ee(`Falling back to no-highlight mode for this block.`,e)),t?n[1]:`no-highlight`}return t.split(/\s+/).find(e=>u(e)||j(e))}function p(e,t,n){let r=``,i=``;typeof t==`object`?(r=e,n=t.ignoreIllegals,i=t.language):(De(`10.7.0`,`highlight(lang, code, ...args) has been deprecated.`),De(`10.7.0`,`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),i=e,r=t),n===void 0&&(n=!0);let a={code:r,language:i};ie(`before:highlight`,a);let o=a.result?a.result:v(a.language,a.code,n);return o.code=a.code,ie(`after:highlight`,o),o}function v(e,n,i,a){let c=Object.create(null);function u(e,t){return e.keywords[t]}function d(){if(!k.keywords){A.addText(M);return}let e=0;k.keywordPatternRe.lastIndex=0;let t=k.keywordPatternRe.exec(M),n=``;for(;t;){n+=M.substring(e,t.index);let r=D.case_insensitive?t[0].toLowerCase():t[0],i=u(k,r);if(i){let[e,a]=i;if(A.addText(n),n=``,c[r]=(c[r]||0)+1,c[r]<=Be&&(N+=a),e.startsWith(`_`))n+=t[0];else{let n=D.classNameAliases[e]||e;m(t[0],n)}}else n+=t[0];e=k.keywordPatternRe.lastIndex,t=k.keywordPatternRe.exec(M)}n+=M.substring(e),A.addText(n)}function f(){if(M===``)return;let e=null;if(typeof k.subLanguage==`string`){if(!t[k.subLanguage]){A.addText(M);return}e=v(k.subLanguage,M,!0,te[k.subLanguage]),te[k.subLanguage]=e._top}else e=S(M,k.subLanguage.length?k.subLanguage:null);k.relevance>0&&(N+=e.relevance),A.__addSublanguage(e._emitter,e.language)}function p(){k.subLanguage==null?d():f(),M=``}function m(e,t){e!==``&&(A.startScope(t),A.addText(e),A.endScope())}function h(e,t){let n=1,r=t.length-1;for(;n<=r;){if(!e._emit[n]){n++;continue}let r=D.classNameAliases[e[n]]||e[n],i=t[n];r?m(i,r):(M=i,d(),M=``),n++}}function g(e,t){return e.scope&&typeof e.scope==`string`&&A.openNode(D.classNameAliases[e.scope]||e.scope),e.beginScope&&(e.beginScope._wrap?(m(M,D.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),M=``):e.beginScope._multi&&(h(e.beginScope,t),M=``)),k=Object.create(e,{parent:{value:k}}),k}function _(e,t,n){let i=x(e.endRe,n);if(i){if(e[`on:end`]){let n=new r(e);e[`on:end`](t,n),n.isMatchIgnored&&(i=!1)}if(i){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return _(e.parent,t,n)}function y(e){return k.matcher.regexIndex===0?(M+=e[0],1):(re=!0,0)}function b(e){let t=e[0],n=e.rule,i=new r(n),a=[n.__beforeBegin,n[`on:begin`]];for(let n of a)if(n&&(n(e,i),i.isMatchIgnored))return y(t);return n.skip?M+=t:(n.excludeBegin&&(M+=t),p(),!n.returnBegin&&!n.excludeBegin&&(M=t)),g(n,e),n.returnBegin?0:t.length}function C(e){let t=e[0],r=n.substring(e.index),i=_(k,e,r);if(!i)return ze;let a=k;k.endScope&&k.endScope._wrap?(p(),m(t,k.endScope._wrap)):k.endScope&&k.endScope._multi?(p(),h(k.endScope,e)):a.skip?M+=t:(a.returnEnd||a.excludeEnd||(M+=t),p(),a.excludeEnd&&(M=t));do k.scope&&A.closeNode(),!k.skip&&!k.subLanguage&&(N+=k.relevance),k=k.parent;while(k!==i.parent);return i.starts&&g(i.starts,e),a.returnEnd?0:t.length}function w(){let e=[];for(let t=k;t!==D;t=t.parent)t.scope&&e.unshift(t.scope);e.forEach(e=>A.openNode(e))}let T={};function E(t,r){let a=r&&r[0];if(M+=t,a==null)return p(),0;if(T.type===`begin`&&r.type===`end`&&T.index===r.index&&a===``){if(M+=n.slice(r.index,r.index+1),!o){let t=Error(`0 width match regex (${e})`);throw t.languageName=e,t.badRule=T.rule,t}return 1}if(T=r,r.type===`begin`)return b(r);if(r.type===`illegal`&&!i){let e=Error(`Illegal lexeme "`+a+`" for mode "`+(k.scope||`<unnamed>`)+`"`);throw e.mode=k,e}else if(r.type===`end`){let e=C(r);if(e!==ze)return e}if(r.type===`illegal`&&a===``)return M+=`
`,1;if(P>1e5&&P>r.index*3)throw Error(`potential infinite loop, way more iterations than matches`);return M+=a,a.length}let D=j(e);if(!D)throw Te(s.replace(`{}`,e)),Error(`Unknown language: "`+e+`"`);let ee=L(D),O=``,k=a||ee,te={},A=new l.__emitter(l);w();let M=``,N=0,ne=0,P=0,re=!1;try{if(D.__emitTokens)D.__emitTokens(n,A);else{for(k.matcher.considerAll();;){P++,re?re=!1:k.matcher.considerAll(),k.matcher.lastIndex=ne;let e=k.matcher.exec(n);if(!e)break;let t=E(n.substring(ne,e.index),e);ne=e.index+t}E(n.substring(ne))}return A.finalize(),O=A.toHTML(),{language:e,value:O,relevance:N,illegal:!1,_emitter:A,_top:k}}catch(t){if(t.message&&t.message.includes(`Illegal`))return{language:e,value:Le(n),illegal:!0,relevance:0,_illegalBy:{message:t.message,index:ne,context:n.slice(ne-100,ne+100),mode:t.mode,resultSoFar:O},_emitter:A};if(o)return{language:e,value:Le(n),illegal:!1,relevance:0,errorRaised:t,_emitter:A,_top:k};throw t}}function b(e){let t={value:Le(e),illegal:!1,relevance:0,_top:c,_emitter:new l.__emitter(l)};return t._emitter.addText(e),t}function S(e,n){n=n||l.languages||Object.keys(t);let r=b(e),i=n.filter(j).filter(N).map(t=>v(t,e,!1));i.unshift(r);let[a,o]=i.sort((e,t)=>{if(e.relevance!==t.relevance)return t.relevance-e.relevance;if(e.language&&t.language){if(j(e.language).supersetOf===t.language)return 1;if(j(t.language).supersetOf===e.language)return-1}return 0}),s=a;return s.secondBest=o,s}function C(e,t,n){let r=t&&i[t]||n;e.classList.add(`hljs`),e.classList.add(`language-${r}`)}function w(e){let t=null,n=d(e);if(u(n))return;if(ie(`before:highlightElement`,{el:e,language:n}),e.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",e);return}if(e.children.length>0&&(l.ignoreUnescapedHTML||(console.warn(`One of your code blocks includes unescaped HTML. This is a potentially serious security risk.`),console.warn(`https://github.com/highlightjs/highlight.js/wiki/security`),console.warn(`The element with unescaped HTML:`),console.warn(e)),l.throwUnescapedHTML))throw new Ie(`One of your code blocks includes unescaped HTML.`,e.innerHTML);t=e;let r=t.textContent,i=n?p(r,{language:n,ignoreIllegals:!0}):S(r);e.innerHTML=i.value,e.dataset.highlighted=`yes`,C(e,n,i.language),e.result={language:i.language,re:i.relevance,relevance:i.relevance},i.secondBest&&(e.secondBest={language:i.secondBest.language,relevance:i.secondBest.relevance}),ie(`after:highlightElement`,{el:e,result:i,text:r})}function T(e){l=Re(l,e)}let E=()=>{O(),De(`10.6.0`,`initHighlighting() deprecated.  Use highlightAll() now.`)};function D(){O(),De(`10.6.0`,`initHighlightingOnLoad() deprecated.  Use highlightAll() now.`)}let ee=!1;function O(){function e(){O()}if(document.readyState===`loading`){ee||window.addEventListener(`DOMContentLoaded`,e,!1),ee=!0;return}document.querySelectorAll(l.cssSelector).forEach(w)}function k(n,r){let i=null;try{i=r(e)}catch(e){if(Te(`Language definition for '{}' could not be registered.`.replace(`{}`,n)),o)Te(e);else throw e;i=c}i.name||=n,t[n]=i,i.rawDefinition=r.bind(null,e),i.aliases&&M(i.aliases,{languageName:n})}function te(e){delete t[e];for(let t of Object.keys(i))i[t]===e&&delete i[t]}function A(){return Object.keys(t)}function j(e){return e=(e||``).toLowerCase(),t[e]||t[i[e]]}function M(e,{languageName:t}){typeof e==`string`&&(e=[e]),e.forEach(e=>{i[e.toLowerCase()]=t})}function N(e){let t=j(e);return t&&!t.disableAutodetect}function ne(e){e[`before:highlightBlock`]&&!e[`before:highlightElement`]&&(e[`before:highlightElement`]=t=>{e[`before:highlightBlock`](Object.assign({block:t.el},t))}),e[`after:highlightBlock`]&&!e[`after:highlightElement`]&&(e[`after:highlightElement`]=t=>{e[`after:highlightBlock`](Object.assign({block:t.el},t))})}function P(e){ne(e),a.push(e)}function re(e){let t=a.indexOf(e);t!==-1&&a.splice(t,1)}function ie(e,t){let n=e;a.forEach(function(e){e[n]&&e[n](t)})}function ae(e){return De(`10.7.0`,`highlightBlock will be removed entirely in v12.0`),De(`10.7.0`,`Please use highlightElement now.`),w(e)}Object.assign(e,{highlight:p,highlightAuto:S,highlightAll:O,highlightElement:w,highlightBlock:ae,configure:T,initHighlighting:E,initHighlightingOnLoad:D,registerLanguage:k,unregisterLanguage:te,listLanguages:A,getLanguage:j,registerAliases:M,autoDetection:N,inherit:Re,addPlugin:P,removePlugin:re}),e.debugMode=function(){o=!1},e.safeMode=function(){o=!0},e.versionString=Fe,e.regex={concat:_,lookahead:m,either:y,optional:g,anyNumberOfTimes:h};for(let e in de)typeof de[e]==`object`&&n(de[e]);return Object.assign(e,de),e},He=Ve({});He.newInstance=()=>Ve({}),t.exports=He,He.HighlightJS=He,He.default=He}))()).default,kc=`[A-Za-z$_][0-9A-Za-z$_]*`,Ac=`as.in.of.if.for.while.finally.var.new.function.do.return.void.else.break.catch.instanceof.with.throw.case.default.try.switch.continue.typeof.delete.let.yield.const.class.debugger.async.await.static.import.from.export.extends.using`.split(`.`),jc=[`true`,`false`,`null`,`undefined`,`NaN`,`Infinity`],Mc=`Object.Function.Boolean.Symbol.Math.Date.Number.BigInt.String.RegExp.Array.Float32Array.Float64Array.Int8Array.Uint8Array.Uint8ClampedArray.Int16Array.Int32Array.Uint16Array.Uint32Array.BigInt64Array.BigUint64Array.Set.Map.WeakSet.WeakMap.ArrayBuffer.SharedArrayBuffer.Atomics.DataView.JSON.Promise.Generator.GeneratorFunction.AsyncFunction.Reflect.Proxy.Intl.WebAssembly`.split(`.`),Nc=[`Error`,`EvalError`,`InternalError`,`RangeError`,`ReferenceError`,`SyntaxError`,`TypeError`,`URIError`],Pc=[`setInterval`,`setTimeout`,`clearInterval`,`clearTimeout`,`require`,`exports`,`eval`,`isFinite`,`isNaN`,`parseFloat`,`parseInt`,`decodeURI`,`decodeURIComponent`,`encodeURI`,`encodeURIComponent`,`escape`,`unescape`],Fc=[`arguments`,`this`,`super`,`console`,`window`,`document`,`localStorage`,`sessionStorage`,`module`,`global`],Ic=[].concat(Pc,Mc,Nc);function Lc(e){let t=e.regex,n=(e,{after:t})=>{let n=`</`+e[0].slice(1);return e.input.indexOf(n,t)!==-1},r=kc,i={begin:`<>`,end:`</>`},a=/<[A-Za-z0-9\\._:-]+\s*\/>/,o={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(e,t)=>{let r=e[0].length+e.index,i=e.input[r];if(i===`<`||i===`,`){t.ignoreMatch();return}i===`>`&&(n(e,{after:r})||t.ignoreMatch());let a,o=e.input.substring(r);if(a=o.match(/^\s*=/)){t.ignoreMatch();return}if((a=o.match(/^\s+extends\s+/))&&a.index===0){t.ignoreMatch();return}}},s={$pattern:kc,keyword:Ac,literal:jc,built_in:Ic,"variable.language":Fc},c=`[0-9](_?[0-9])*`,l=`\\.(${c})`,u=`0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`,d={className:`number`,variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:`\\b(0|[1-9](_?[0-9])*)n\\b`},{begin:`\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b`},{begin:`\\b0[bB][0-1](_?[0-1])*n?\\b`},{begin:`\\b0[oO][0-7](_?[0-7])*n?\\b`},{begin:`\\b0[0-7]+n?\\b`}],relevance:0},f={className:`subst`,begin:`\\$\\{`,end:`\\}`,keywords:s,contains:[]},p={begin:".?html`",end:``,starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:`xml`}},m={begin:".?css`",end:``,starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:`css`}},h={begin:".?gql`",end:``,starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:`graphql`}},g={className:`string`,begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},_={className:`comment`,variants:[e.COMMENT(/\/\*\*(?!\/)/,`\\*/`,{relevance:0,contains:[{begin:`(?=@[A-Za-z]+)`,relevance:0,contains:[{className:`doctag`,begin:`@[A-Za-z]+`},{className:`type`,begin:`\\{`,end:`\\}`,excludeEnd:!0,excludeBegin:!0,relevance:0},{className:`variable`,begin:r+`(?=\\s*(-)|$)`,endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},v=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,p,m,h,g,{match:/\$\d+/},d];f.contains=v.concat({begin:/\{/,end:/\}/,keywords:s,contains:[`self`].concat(v)});let y=[].concat(_,f.contains),b=y.concat([{begin:/(\s*)\(/,end:/\)/,keywords:s,contains:[`self`].concat(y)}]),x={className:`params`,begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:b},S={variants:[{match:[/class/,/\s+/,r,/\s+/,/extends/,/\s+/,t.concat(r,`(`,t.concat(/\./,r),`)*`)],scope:{1:`keyword`,3:`title.class`,5:`keyword`,7:`title.class.inherited`}},{match:[/class/,/\s+/,r],scope:{1:`keyword`,3:`title.class`}}]},C={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:`title.class`,keywords:{_:[...Mc,...Nc]}},w={label:`use_strict`,className:`meta`,relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},T={variants:[{match:[/function/,/\s+/,r,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:`keyword`,3:`title.function`},label:`func.def`,contains:[x],illegal:/%/},E={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:`variable.constant`};function D(e){return t.concat(`(?!`,e.join(`|`),`)`)}let ee={match:t.concat(/\b/,D([...Pc,`super`,`import`].map(e=>`${e}\\s*\\(`)),r,t.lookahead(/\s*\(/)),className:`title.function`,relevance:0},O={begin:t.concat(/\./,t.lookahead(t.concat(r,/(?![0-9A-Za-z$_(])/))),end:r,excludeBegin:!0,keywords:`prototype`,className:`property`,relevance:0},k={match:[/get|set/,/\s+/,r,/(?=\()/],className:{1:`keyword`,3:`title.function`},contains:[{begin:/\(\)/},x]},te=`(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|`+e.UNDERSCORE_IDENT_RE+`)\\s*=>`,A={match:[/const|var|let/,/\s+/,r,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(te)],keywords:`async`,className:{1:`keyword`,3:`title.function`},contains:[x]};return{name:`JavaScript`,aliases:[`js`,`jsx`,`mjs`,`cjs`],keywords:s,exports:{PARAMS_CONTAINS:b,CLASS_REFERENCE:C},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:`shebang`,binary:`node`,relevance:5}),w,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,p,m,h,g,_,{match:/\$\d+/},d,C,{scope:`attr`,match:r+t.lookahead(`:`),relevance:0},A,{begin:`(`+e.RE_STARTERS_RE+`|\\b(case|return|throw)\\b)\\s*`,keywords:`return throw case`,relevance:0,contains:[_,e.REGEXP_MODE,{className:`function`,begin:te,returnBegin:!0,end:`\\s*=>`,contains:[{className:`params`,variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:b}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:i.begin,end:i.end},{match:a},{begin:o.begin,"on:begin":o.isTrulyOpeningTag,end:o.end}],subLanguage:`xml`,contains:[{begin:o.begin,end:o.end,skip:!0,contains:[`self`]}]}]},T,{beginKeywords:`while if switch catch for`},{begin:`\\b(?!function)`+e.UNDERSCORE_IDENT_RE+`\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{`,returnBegin:!0,label:`func.def`,contains:[x,e.inherit(e.TITLE_MODE,{begin:r,className:`title.function`})]},{match:/\.\.\./,relevance:0},O,{match:`\\$`+r,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:`title.function`},contains:[x]},ee,E,S,k,{match:/\$[(.]/}]}}function Rc(e){let t=e.regex,n=Lc(e),r=kc,i=[`any`,`void`,`number`,`boolean`,`string`,`object`,`never`,`symbol`,`bigint`,`unknown`],a={begin:[/namespace/,/\s+/,e.IDENT_RE],beginScope:{1:`keyword`,3:`title.class`}},o={beginKeywords:`interface`,end:/\{/,excludeEnd:!0,keywords:{keyword:`interface extends`,built_in:i},contains:[n.exports.CLASS_REFERENCE]},s={className:`meta`,relevance:10,begin:/^\s*['"]use strict['"]/},c={$pattern:kc,keyword:Ac.concat([`type`,`interface`,`public`,`private`,`protected`,`implements`,`declare`,`abstract`,`readonly`,`enum`,`override`,`satisfies`]),literal:jc,built_in:Ic.concat(i),"variable.language":Fc},l={className:`meta`,begin:`@`+r},u=(e,t,n)=>{let r=e.contains.findIndex(e=>e.label===t);if(r===-1)throw Error(`can not find mode to replace`);e.contains.splice(r,1,n)};Object.assign(n.keywords,c),n.exports.PARAMS_CONTAINS.push(l);let d=n.contains.find(e=>e.scope===`attr`),f=Object.assign({},d,{match:t.concat(r,t.lookahead(/\s*\?:/))});n.exports.PARAMS_CONTAINS.push([n.exports.CLASS_REFERENCE,d,f]),n.contains=n.contains.concat([l,a,o,f]),u(n,`shebang`,e.SHEBANG()),u(n,`use_strict`,s);let p=n.contains.find(e=>e.label===`func.def`);return p.relevance=0,Object.assign(n,{name:`TypeScript`,aliases:[`ts`,`tsx`,`mts`,`cts`]}),n}function zc(e){let t=e.regex,n=/(r#)?/,r=t.concat(n,e.UNDERSCORE_IDENT_RE),i=t.concat(n,e.IDENT_RE),a={className:`title.function.invoke`,relevance:0,begin:t.concat(/\b/,/(?!let|for|while|if|else|match\b)/,i,t.lookahead(/\s*\(/))},o=`([ui](8|16|32|64|128|size)|f(32|64))?`,s=`abstract.as.async.await.become.box.break.const.continue.crate.do.dyn.else.enum.extern.false.final.fn.for.if.impl.in.let.loop.macro.match.mod.move.mut.override.priv.pub.ref.return.self.Self.static.struct.super.trait.true.try.type.typeof.union.unsafe.unsized.use.virtual.where.while.yield`.split(`.`),c=[`true`,`false`,`Some`,`None`,`Ok`,`Err`],l=`drop .Copy.Send.Sized.Sync.Drop.Fn.FnMut.FnOnce.ToOwned.Clone.Debug.PartialEq.PartialOrd.Eq.Ord.AsRef.AsMut.Into.From.Default.Iterator.Extend.IntoIterator.DoubleEndedIterator.ExactSizeIterator.SliceConcatExt.ToString.assert!.assert_eq!.bitflags!.bytes!.cfg!.col!.concat!.concat_idents!.debug_assert!.debug_assert_eq!.env!.eprintln!.panic!.file!.format!.format_args!.include_bytes!.include_str!.line!.local_data_key!.module_path!.option_env!.print!.println!.select!.stringify!.try!.unimplemented!.unreachable!.vec!.write!.writeln!.macro_rules!.assert_ne!.debug_assert_ne!`.split(`.`),u=[`i8`,`i16`,`i32`,`i64`,`i128`,`isize`,`u8`,`u16`,`u32`,`u64`,`u128`,`usize`,`f32`,`f64`,`str`,`char`,`bool`,`Box`,`Option`,`Result`,`String`,`Vec`];return{name:`Rust`,aliases:[`rs`],keywords:{$pattern:e.IDENT_RE+`!?`,type:u,keyword:s,literal:c,built_in:l},illegal:`</`,contains:[e.C_LINE_COMMENT_MODE,e.COMMENT(`/\\*`,`\\*/`,{contains:[`self`]}),e.inherit(e.QUOTE_STRING_MODE,{begin:/b?"/,illegal:null}),{className:`symbol`,begin:/'[a-zA-Z_][a-zA-Z0-9_]*(?!')/},{scope:`string`,variants:[{begin:/b?r(#*)"(.|\n)*?"\1(?!#)/},{begin:/b?'/,end:/'/,contains:[{scope:`char.escape`,match:/\\('|\w|x\w{2}|u\w{4}|U\w{8})/}]}]},{className:`number`,variants:[{begin:`\\b0b([01_]+)`+o},{begin:`\\b0o([0-7_]+)`+o},{begin:`\\b0x([A-Fa-f0-9_]+)`+o},{begin:`\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)`+o}],relevance:0},{begin:[/fn/,/\s+/,r],className:{1:`keyword`,3:`title.function`}},{className:`meta`,begin:`#!?\\[`,end:`\\]`,contains:[{className:`string`,begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE]}]},{begin:[/let/,/\s+/,/(?:mut\s+)?/,r],className:{1:`keyword`,3:`keyword`,4:`variable`}},{begin:[/for/,/\s+/,r,/\s+/,/in/],className:{1:`keyword`,3:`variable`,5:`keyword`}},{begin:[/type/,/\s+/,r],className:{1:`keyword`,3:`title.class`}},{begin:[/(?:trait|enum|struct|union|impl|for)/,/\s+/,r],className:{1:`keyword`,3:`title.class`}},{begin:e.IDENT_RE+`::`,keywords:{keyword:`Self`,built_in:l,type:u}},{className:`punctuation`,begin:`->`},a]}}function Bc(e){let t=e.regex,n=/[\p{XID_Start}_]\p{XID_Continue}*/u,r=`and.as.assert.async.await.break.case.class.continue.def.del.elif.else.except.finally.for.from.global.if.import.in.is.lambda.match.nonlocal|10.not.or.pass.raise.return.try.while.with.yield`.split(`.`),i={$pattern:/[A-Za-z]\w+|__\w+__/,keyword:r,built_in:`__import__.abs.all.any.ascii.bin.bool.breakpoint.bytearray.bytes.callable.chr.classmethod.compile.complex.delattr.dict.dir.divmod.enumerate.eval.exec.filter.float.format.frozenset.getattr.globals.hasattr.hash.help.hex.id.input.int.isinstance.issubclass.iter.len.list.locals.map.max.memoryview.min.next.object.oct.open.ord.pow.print.property.range.repr.reversed.round.set.setattr.slice.sorted.staticmethod.str.sum.super.tuple.type.vars.zip`.split(`.`),literal:[`__debug__`,`Ellipsis`,`False`,`None`,`NotImplemented`,`True`],type:[`Any`,`Callable`,`Coroutine`,`Dict`,`List`,`Literal`,`Generic`,`Optional`,`Sequence`,`Set`,`Tuple`,`Type`,`Union`]},a={className:`meta`,begin:/^(>>>|\.\.\.) /},o={className:`subst`,begin:/\{/,end:/\}/,keywords:i,illegal:/#/},s={begin:/\{\{/,relevance:0},c={className:`string`,contains:[e.BACKSLASH_ESCAPE],variants:[{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE,a],relevance:10},{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,a],relevance:10},{begin:/([fF][rR]|[rR][fF]|[fF])'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE,a,s,o]},{begin:/([fF][rR]|[rR][fF]|[fF])"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,a,s,o]},{begin:/([uU]|[rR])'/,end:/'/,relevance:10},{begin:/([uU]|[rR])"/,end:/"/,relevance:10},{begin:/([bB]|[bB][rR]|[rR][bB])'/,end:/'/},{begin:/([bB]|[bB][rR]|[rR][bB])"/,end:/"/},{begin:/([fF][rR]|[rR][fF]|[fF])'/,end:/'/,contains:[e.BACKSLASH_ESCAPE,s,o]},{begin:/([fF][rR]|[rR][fF]|[fF])"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,s,o]},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},l=`[0-9](_?[0-9])*`,u=`(\\b(${l}))?\\.(${l})|\\b(${l})\\.`,d=`\\b|${r.join(`|`)}`,f={className:`number`,relevance:0,variants:[{begin:`(\\b(${l})|(${u}))[eE][+-]?(${l})[jJ]?(?=${d})`},{begin:`(${u})[jJ]?`},{begin:`\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${d})`},{begin:`\\b0[bB](_?[01])+[lL]?(?=${d})`},{begin:`\\b0[oO](_?[0-7])+[lL]?(?=${d})`},{begin:`\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${d})`},{begin:`\\b(${l})[jJ](?=${d})`}]},p={className:`comment`,begin:t.lookahead(/# type:/),end:/$/,keywords:i,contains:[{begin:/# type:/},{begin:/#/,end:/\b\B/,endsWithParent:!0}]},m={className:`params`,variants:[{className:``,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:i,contains:[`self`,a,f,c,e.HASH_COMMENT_MODE]}]};return o.contains=[c,f,a],{name:`Python`,aliases:[`py`,`gyp`,`ipython`],unicodeRegex:!0,keywords:i,illegal:/(<\/|\?)|=>/,contains:[a,f,{scope:`variable.language`,match:/\bself\b/},{beginKeywords:`if`,relevance:0},{match:/\bor\b/,scope:`keyword`},c,p,e.HASH_COMMENT_MODE,{match:[/\bdef/,/\s+/,n],scope:{1:`keyword`,3:`title.function`},contains:[m]},{variants:[{match:[/\bclass/,/\s+/,n,/\s*/,/\(\s*/,n,/\s*\)/]},{match:[/\bclass/,/\s+/,n]}],scope:{1:`keyword`,3:`title.class`,6:`title.class.inherited`}},{className:`meta`,begin:/^[\t ]*@/,end:/(?=#)|$/,contains:[f,m,c]}]}}var Vc=Object.defineProperty,Hc=Object.getOwnPropertySymbols,Uc=Object.prototype.hasOwnProperty,Wc=Object.prototype.propertyIsEnumerable,Gc=(e,t,n)=>t in e?Vc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Kc=(e,t)=>{for(var n in t||={})Uc.call(t,n)&&Gc(e,n,t[n]);if(Hc)for(var n of Hc(t))Wc.call(t,n)&&Gc(e,n,t[n]);return e};function qc(e){return e==null||e===``||Array.isArray(e)&&e.length===0||!(e instanceof Date)&&typeof e==`object`&&Object.keys(e).length===0}function Jc(e,t,n=new WeakSet){if(e===t)return!0;if(!e||!t||typeof e!=`object`||typeof t!=`object`||n.has(e)||n.has(t))return!1;n.add(e).add(t);let r=Array.isArray(e),i=Array.isArray(t),a,o,s;if(r&&i){if(o=e.length,o!=t.length)return!1;for(a=o;a--!==0;)if(!Jc(e[a],t[a],n))return!1;return!0}if(r!=i)return!1;let c=e instanceof Date,l=t instanceof Date;if(c!=l)return!1;if(c&&l)return e.getTime()==t.getTime();let u=e instanceof RegExp,d=t instanceof RegExp;if(u!=d)return!1;if(u&&d)return e.toString()==t.toString();let f=Object.keys(e);if(o=f.length,o!==Object.keys(t).length)return!1;for(a=o;a--!==0;)if(!Object.prototype.hasOwnProperty.call(t,f[a]))return!1;for(a=o;a--!==0;)if(s=f[a],!Jc(e[s],t[s],n))return!1;return!0}function Yc(e,t){return Jc(e,t)}function Xc(e){return typeof e==`function`&&`call`in e&&`apply`in e}function J(e){return!qc(e)}function Zc(e,t){if(!e||!t)return null;try{let n=e[t];if(J(n))return n}catch{}if(Object.keys(e).length){if(Xc(t))return t(e);if(t.indexOf(`.`)===-1)return e[t];{let n=t.split(`.`),r=e;for(let e=0,t=n.length;e<t;++e){if(r==null)return null;r=r[n[e]]}return r}}return null}function Qc(e,t,n){return n?Zc(e,n)===Zc(t,n):Yc(e,t)}function $c(e,t=!0){return e instanceof Object&&e.constructor===Object&&(t||Object.keys(e).length!==0)}function el(e={},t={}){let n=Kc({},e);return Object.keys(t).forEach(r=>{let i=r;$c(t[i])&&i in e&&$c(e[i])?n[i]=el(e[i],t[i]):n[i]=t[i]}),n}function tl(...e){return e.reduce((e,t,n)=>n===0?t:el(e,t),{})}function nl(e,t){let n=-1;if(J(e))try{n=e.findLastIndex(t)}catch{n=e.lastIndexOf([...e].reverse().find(t))}return n}function rl(e,...t){return Xc(e)?e(...t):e}function il(e,t=!0){return typeof e==`string`&&(t||e!==``)}function al(e){return il(e)?e.replace(/(-|_)/g,``).toLowerCase():e}function ol(e,t=``,n={}){let r=al(t).split(`.`),i=r.shift();return i?$c(e)?ol(rl(e[Object.keys(e).find(e=>al(e)===i)||``],n),r.join(`.`),n):void 0:rl(e,n)}function sl(e,t=!0){return Array.isArray(e)&&(t||e.length!==0)}function cl(e){return J(e)&&!isNaN(e)}function ll(e=``){return J(e)&&e.length===1&&!!e.match(/\S| /)}function ul(e,t){if(t){let n=t.test(e);return t.lastIndex=0,n}return!1}function dl(...e){return tl(...e)}function fl(e){return e&&e.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g,``).replace(/ {2,}/g,` `).replace(/ ([{:}]) /g,`$1`).replace(/([;,]) /g,`$1`).replace(/ !/g,`!`).replace(/: /g,`:`).trim()}function pl(e){if(e&&/[\xC0-\xFF\u0100-\u017E]/.test(e)){let t={A:/[\xC0-\xC5\u0100\u0102\u0104]/g,AE:/[\xC6]/g,C:/[\xC7\u0106\u0108\u010A\u010C]/g,D:/[\xD0\u010E\u0110]/g,E:/[\xC8-\xCB\u0112\u0114\u0116\u0118\u011A]/g,G:/[\u011C\u011E\u0120\u0122]/g,H:/[\u0124\u0126]/g,I:/[\xCC-\xCF\u0128\u012A\u012C\u012E\u0130]/g,IJ:/[\u0132]/g,J:/[\u0134]/g,K:/[\u0136]/g,L:/[\u0139\u013B\u013D\u013F\u0141]/g,N:/[\xD1\u0143\u0145\u0147\u014A]/g,O:/[\xD2-\xD6\xD8\u014C\u014E\u0150]/g,OE:/[\u0152]/g,R:/[\u0154\u0156\u0158]/g,S:/[\u015A\u015C\u015E\u0160]/g,T:/[\u0162\u0164\u0166]/g,U:/[\xD9-\xDC\u0168\u016A\u016C\u016E\u0170\u0172]/g,W:/[\u0174]/g,Y:/[\xDD\u0176\u0178]/g,Z:/[\u0179\u017B\u017D]/g,a:/[\xE0-\xE5\u0101\u0103\u0105]/g,ae:/[\xE6]/g,c:/[\xE7\u0107\u0109\u010B\u010D]/g,d:/[\u010F\u0111]/g,e:/[\xE8-\xEB\u0113\u0115\u0117\u0119\u011B]/g,g:/[\u011D\u011F\u0121\u0123]/g,i:/[\xEC-\xEF\u0129\u012B\u012D\u012F\u0131]/g,ij:/[\u0133]/g,j:/[\u0135]/g,k:/[\u0137,\u0138]/g,l:/[\u013A\u013C\u013E\u0140\u0142]/g,n:/[\xF1\u0144\u0146\u0148\u014B]/g,p:/[\xFE]/g,o:/[\xF2-\xF6\xF8\u014D\u014F\u0151]/g,oe:/[\u0153]/g,r:/[\u0155\u0157\u0159]/g,s:/[\u015B\u015D\u015F\u0161]/g,t:/[\u0163\u0165\u0167]/g,u:/[\xF9-\xFC\u0169\u016B\u016D\u016F\u0171\u0173]/g,w:/[\u0175]/g,y:/[\xFD\xFF\u0177]/g,z:/[\u017A\u017C\u017E]/g};for(let n in t)e=e.replace(t[n],n)}return e}function ml(e){return il(e,!1)?e[0].toUpperCase()+e.slice(1):e}function hl(e){return il(e)?e.replace(/(_)/g,`-`).replace(/([a-z])([A-Z])/g,`$1-$2`).toLowerCase():e}function gl(){let e=new Map;return{on(t,n){let r=e.get(t);return r?r.push(n):r=[n],e.set(t,r),this},off(t,n){let r=e.get(t);return r&&r.splice(r.indexOf(n)>>>0,1),this},emit(t,n){let r=e.get(t);r&&r.forEach(e=>{e(n)})},clear(){e.clear()}}}function _l(...e){if(e){let t=[];for(let n=0;n<e.length;n++){let r=e[n];if(!r)continue;let i=typeof r;if(i===`string`||i===`number`)t.push(r);else if(i===`object`){let e=Array.isArray(r)?[_l(...r)]:Object.entries(r).map(([e,t])=>t?e:void 0);t=e.length?t.concat(e.filter(e=>!!e)):t}}return t.join(` `).trim()}}function vl(e,t){return e?e.classList?e.classList.contains(t):RegExp(`(^| )`+t+`( |$)`,`gi`).test(e.className):!1}function yl(e,t){if(e&&t){let n=t=>{vl(e,t)||(e.classList?e.classList.add(t):e.className+=` `+t)};[t].flat().filter(Boolean).forEach(e=>e.split(` `).forEach(n))}}function bl(e,t){if(e&&t){let n=t=>{e.classList?e.classList.remove(t):e.className=e.className.replace(RegExp(`(^|\\b)`+t.split(` `).join(`|`)+`(\\b|$)`,`gi`),` `)};[t].flat().filter(Boolean).forEach(e=>e.split(` `).forEach(n))}}function xl(e){for(let t of document==null?void 0:document.styleSheets)try{for(let n of t?.cssRules)for(let t of n?.style)if(e.test(t))return{name:t,value:n.style.getPropertyValue(t).trim()}}catch{}return null}function Sl(e){let t={width:0,height:0};if(e){let[n,r]=[e.style.visibility,e.style.display],i=e.getBoundingClientRect();e.style.visibility=`hidden`,e.style.display=`block`,t.width=i.width||e.offsetWidth,t.height=i.height||e.offsetHeight,e.style.display=r,e.style.visibility=n}return t}function Cl(){let e=window,t=document,n=t.documentElement,r=t.getElementsByTagName(`body`)[0];return{width:e.innerWidth||n.clientWidth||r.clientWidth,height:e.innerHeight||n.clientHeight||r.clientHeight}}function wl(e){return e?Math.abs(e.scrollLeft):0}function Tl(){let e=document.documentElement;return(window.pageXOffset||wl(e))-(e.clientLeft||0)}function El(){let e=document.documentElement;return(window.pageYOffset||e.scrollTop)-(e.clientTop||0)}function Dl(e){return e?getComputedStyle(e).direction===`rtl`:!1}function Ol(e,t,n=!0){if(e){let r=e.offsetParent?{width:e.offsetWidth,height:e.offsetHeight}:Sl(e),i=r.height,a=r.width,o=t.offsetHeight,s=t.offsetWidth,c=t.getBoundingClientRect(),l=El(),u=Tl(),d=Cl(),f,p,m=`top`;c.top+o+i>d.height?(f=c.top+l-i,m=`bottom`,f<0&&(f=l)):f=o+c.top+l,p=c.left+a>d.width?Math.max(0,c.left+u+s-a):c.left+u,Dl(e)?e.style.insetInlineEnd=p+`px`:e.style.insetInlineStart=p+`px`,e.style.top=f+`px`,e.style.transformOrigin=m,n&&(e.style.marginTop=m===`bottom`?`calc(${xl(/-anchor-gutter$/)?.value??`2px`} * -1)`:xl(/-anchor-gutter$/)?.value??``)}}function kl(e,t){e&&(typeof t==`string`?e.style.cssText=t:Object.entries(t||{}).forEach(([t,n])=>e.style[t]=n))}function Al(e,t){if(e instanceof HTMLElement){let n=e.offsetWidth;if(t){let t=getComputedStyle(e);n+=parseFloat(t.marginLeft)+parseFloat(t.marginRight)}return n}return 0}function jl(e,t,n=!0,r=void 0){if(e){let i=e.offsetParent?{width:e.offsetWidth,height:e.offsetHeight}:Sl(e),a=t.offsetHeight,o=t.getBoundingClientRect(),s=Cl(),c,l,u=r??`top`;if(!r&&o.top+a+i.height>s.height?(c=-1*i.height,u=`bottom`,o.top+c<0&&(c=-1*o.top)):c=a,l=i.width>s.width?o.left*-1:o.left+i.width>s.width?(o.left+i.width-s.width)*-1:0,e.style.top=c+`px`,e.style.insetInlineStart=l+`px`,e.style.transformOrigin=u,n){let t=xl(/-anchor-gutter$/)?.value;e.style.marginTop=u===`bottom`?`calc(${t??`2px`} * -1)`:t??``}}}function Ml(e){if(e){let t=e.parentNode;return t&&t instanceof ShadowRoot&&t.host&&(t=t.host),t}return null}function Nl(e){return!!(e!=null&&e.nodeName&&Ml(e))}function Pl(e){return typeof Element<`u`?e instanceof Element:typeof e==`object`&&!!e&&e.nodeType===1&&typeof e.nodeName==`string`}function Fl(e,t={}){if(Pl(e)){let n=(t,r)=>{var i;let a=(i=e?.$attrs)!=null&&i[t]?[e?.$attrs?.[t]]:[];return[r].flat().reduce((e,r)=>{if(r!=null){let i=typeof r;if(i===`string`||i===`number`)e.push(r);else if(i===`object`){let i=Array.isArray(r)?n(t,r):Object.entries(r).map(([e,n])=>t===`style`&&(n||n===0)?`${e.replace(/([a-z])([A-Z])/g,`$1-$2`).toLowerCase()}:${n}`:n?e:void 0);e=i.length?e.concat(i.filter(e=>!!e)):e}}return e},a)};Object.entries(t).forEach(([t,r])=>{if(r!=null){let i=t.match(/^on(.+)/);i?e.addEventListener(i[1].toLowerCase(),r):t===`p-bind`||t===`pBind`?Fl(e,r):(r=t===`class`?[...new Set(n(`class`,r))].join(` `).trim():t===`style`?n(`style`,r).join(`;`).trim():r,(e.$attrs=e.$attrs||{})&&(e.$attrs[t]=r),e.setAttribute(t,r))}})}}function Il(e,t={},...n){if(e){let r=document.createElement(e);return Fl(r,t),r.append(...n),r}}function Ll(e,t){return Pl(e)?Array.from(e.querySelectorAll(t)):[]}function Rl(e,t){return Pl(e)?e.matches(t)?e:e.querySelector(t):null}function zl(e,t){e&&document.activeElement!==e&&e.focus(t)}function Bl(e,t){if(Pl(e)){let n=e.getAttribute(t);return isNaN(n)?n===`true`||n===`false`?n===`true`:n:+n}}function Vl(e,t=``){let n=Ll(e,`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            [href]:not([tabindex = "-1"]):not([style*="display:none"]):not([hidden])${t},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t}`),r=[];for(let e of n)getComputedStyle(e).display!=`none`&&getComputedStyle(e).visibility!=`hidden`&&r.push(e);return r}function Hl(e,t){let n=Vl(e,t);return n.length>0?n[0]:null}function Ul(e){if(e){let t=e.offsetHeight,n=getComputedStyle(e);return t-=parseFloat(n.paddingTop)+parseFloat(n.paddingBottom)+parseFloat(n.borderTopWidth)+parseFloat(n.borderBottomWidth),t}return 0}function Wl(e,t){let n=Vl(e,t);return n.length>0?n[n.length-1]:null}function Gl(e){if(e){let t=e.getBoundingClientRect();return{top:t.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:t.left+(window.pageXOffset||wl(document.documentElement)||wl(document.body)||0)}}return{top:`auto`,left:`auto`}}function Kl(e,t){if(e){let n=e.offsetHeight;if(t){let t=getComputedStyle(e);n+=parseFloat(t.marginTop)+parseFloat(t.marginBottom)}return n}return 0}function ql(e,t=[]){let n=Ml(e);return n===null?t:ql(n,t.concat([n]))}function Jl(e){let t=[];if(e){let n=ql(e),r=/(auto|scroll)/,i=e=>{try{let t=window.getComputedStyle(e,null);return r.test(t.getPropertyValue(`overflow`))||r.test(t.getPropertyValue(`overflowX`))||r.test(t.getPropertyValue(`overflowY`))}catch{return!1}};for(let e of n){let n=e.nodeType===1&&e.dataset.scrollselectors;if(n){let r=n.split(`,`);for(let n of r){let r=Rl(e,n);r&&i(r)&&t.push(r)}}e.nodeType!==9&&i(e)&&t.push(e)}}return t}function Yl(e){if(e){let t=e.offsetWidth,n=getComputedStyle(e);return t-=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight)+parseFloat(n.borderLeftWidth)+parseFloat(n.borderRightWidth),t}return 0}function Xl(){return/(android)/i.test(navigator.userAgent)}function Zl(){return!!(typeof window<`u`&&window.document&&window.document.createElement)}function Ql(e){return!!(e&&e.offsetParent!=null)}function $l(){return`ontouchstart`in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0}function eu(e,t=``,n){Pl(e)&&n!=null&&e.setAttribute(t,n)}var tu={};function nu(e=`pui_id_`){return Object.hasOwn(tu,e)||(tu[e]=0),tu[e]++,`${e}${tu[e]}`}function ru(){let e=[],t=(t,n,r=999)=>{let a=i(t,n,r),o=a.value+(a.key===t?0:r)+1;return e.push({key:t,value:o}),o},n=t=>{e=e.filter(e=>e.value!==t)},r=(e,t)=>i(e,t).value,i=(t,n,r=0)=>[...e].reverse().find(e=>n?!0:e.key===t)||{key:t,value:r},a=e=>e&&parseInt(e.style.zIndex,10)||0;return{get:a,set:(e,n,r)=>{n&&(n.style.zIndex=String(t(e,!0,r)))},clear:e=>{e&&(n(a(e)),e.style.zIndex=``)},getCurrent:e=>r(e,!0)}}var iu=ru(),au=Object.defineProperty,ou=Object.defineProperties,su=Object.getOwnPropertyDescriptors,cu=Object.getOwnPropertySymbols,lu=Object.prototype.hasOwnProperty,uu=Object.prototype.propertyIsEnumerable,du=(e,t,n)=>t in e?au(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,fu=(e,t)=>{for(var n in t||={})lu.call(t,n)&&du(e,n,t[n]);if(cu)for(var n of cu(t))uu.call(t,n)&&du(e,n,t[n]);return e},pu=(e,t)=>ou(e,su(t)),mu=(e,t)=>{var n={};for(var r in e)lu.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&cu)for(var r of cu(e))t.indexOf(r)<0&&uu.call(e,r)&&(n[r]=e[r]);return n};function hu(...e){return tl(...e)}var gu=gl(),_u=/{([^}]*)}/g,vu=/(\d+\s+[\+\-\*\/]\s+\d+)/g,yu=/var\([^)]+\)/g;function bu(e){return il(e)?e.replace(/[A-Z]/g,(e,t)=>t===0?e:`.`+e.toLowerCase()).toLowerCase():e}function xu(e){return $c(e)&&e.hasOwnProperty(`$value`)&&e.hasOwnProperty(`$type`)?e.$value:e}function Su(e){return e.replaceAll(/ /g,``).replace(/[^\w]/g,`-`)}function Cu(e=``,t=``){return Su(`${il(e,!1)&&il(t,!1)?`${e}-`:e}${t}`)}function wu(e=``,t=``){return`--${Cu(e,t)}`}function Tu(e=``){return((e.match(/{/g)||[]).length+(e.match(/}/g)||[]).length)%2!=0}function Eu(e,t=``,n=``,r=[],i){if(il(e)){let t=e.trim();if(Tu(t))return;if(ul(t,_u)){let e=t.replaceAll(_u,e=>`var(${wu(n,hl(e.replace(/{|}/g,``).split(`.`).filter(e=>!r.some(t=>ul(e,t))).join(`-`)))}${J(i)?`, ${i}`:``})`);return ul(e.replace(yu,`0`),vu)?`calc(${e})`:e}return t}else if(cl(e))return e}function Du(e,t,n){il(t,!1)&&e.push(`${t}:${n};`)}function Ou(e,t){return e?`${e}{${t}}`:``}function ku(e,t){if(e.indexOf(`dt(`)===-1)return e;function n(e,t){let n=[],i=0,a=``,o=null,s=0;for(;i<=e.length;){let c=e[i];if((c===`"`||c===`'`||c==="`")&&e[i-1]!==`\\`&&(o=o===c?null:c),!o&&(c===`(`&&s++,c===`)`&&s--,(c===`,`||i===e.length)&&s===0)){let e=a.trim();e.startsWith(`dt(`)?n.push(ku(e,t)):n.push(r(e)),a=``,i++;continue}c!==void 0&&(a+=c),i++}return n}function r(e){let t=e[0];if((t===`"`||t===`'`||t==="`")&&e[e.length-1]===t)return e.slice(1,-1);let n=Number(e);return isNaN(n)?e:n}let i=[],a=[];for(let t=0;t<e.length;t++)if(e[t]===`d`&&e.slice(t,t+3)===`dt(`)a.push(t),t+=2;else if(e[t]===`)`&&a.length>0){let e=a.pop();a.length===0&&i.push([e,t])}if(!i.length)return e;for(let r=i.length-1;r>=0;r--){let[a,o]=i[r],s=t(...n(e.slice(a+3,o),t));e=e.slice(0,a)+s+e.slice(o+1)}return e}var Au=(...e)=>ju(Y.getTheme(),...e),ju=(e={},t,n,r)=>{if(t){let{variable:i,options:a}=Y.defaults||{},{prefix:o,transform:s}=e?.options||a||{},c=ul(t,_u)?t:`{${t}}`;return r===`value`||qc(r)&&s===`strict`?Y.getTokenValue(t):Eu(c,void 0,o,[i.excludedKeyRegex],n)}return``};function Mu(e,...t){return e instanceof Array?ku(e.reduce((e,n,r)=>e+n+(rl(t[r],{dt:Au})??``),``),Au):rl(e,{dt:Au})}function Nu(e,t={}){let n=Y.defaults.variable,{prefix:r=n.prefix,selector:i=n.selector,excludedKeyRegex:a=n.excludedKeyRegex}=t,o=[],s=[],c=[{node:e,path:r}];for(;c.length;){let{node:e,path:t}=c.pop();for(let n in e){let i=e[n],l=xu(i),u=ul(n,a)?Cu(t):Cu(t,hl(n));if($c(l))c.push({node:l,path:u});else{Du(s,wu(u),Eu(l,u,r,[a]));let e=u;r&&e.startsWith(r+`-`)&&(e=e.slice(r.length+1)),o.push(e.replace(/-/g,`.`))}}}let l=s.join(``);return{value:s,tokens:o,declarations:l,css:Ou(i,l)}}var Pu={regex:{rules:{class:{pattern:/^\.([a-zA-Z][\w-]*)$/,resolve(e){return{type:`class`,selector:e,matched:this.pattern.test(e.trim())}}},attr:{pattern:/^\[(.*)\]$/,resolve(e){return{type:`attr`,selector:`:root${e},:host${e}`,matched:this.pattern.test(e.trim())}}},media:{pattern:/^@media (.*)$/,resolve(e){return{type:`media`,selector:e,matched:this.pattern.test(e.trim())}}},system:{pattern:/^system$/,resolve(e){return{type:`system`,selector:`@media (prefers-color-scheme: dark)`,matched:this.pattern.test(e.trim())}}},custom:{resolve(e){return{type:`custom`,selector:e,matched:!0}}}},resolve(e){let t=Object.keys(this.rules).filter(e=>e!==`custom`).map(e=>this.rules[e]);return[e].flat().map(e=>t.map(t=>t.resolve(e)).find(e=>e.matched)??this.rules.custom.resolve(e))}},_toVariables(e,t){return Nu(e,{prefix:t?.prefix})},getCommon({name:e=``,theme:t={},params:n,set:r,defaults:i}){let{preset:a,options:o}=t,s,c,l,u,d,f,p;if(J(a)&&o.transform!==`strict`){let{primitive:t,semantic:n,extend:m}=a,h=n||{},{colorScheme:g}=h,_=mu(h,[`colorScheme`]),v=m||{},{colorScheme:y}=v,b=mu(v,[`colorScheme`]),x=g||{},{dark:S}=x,C=mu(x,[`dark`]),w=y||{},{dark:T}=w,E=mu(w,[`dark`]),D=J(t)?this._toVariables({primitive:t},o):{},ee=J(_)?this._toVariables({semantic:_},o):{},O=J(C)?this._toVariables({light:C},o):{},k=J(S)?this._toVariables({dark:S},o):{},te=J(b)?this._toVariables({semantic:b},o):{},A=J(E)?this._toVariables({light:E},o):{},j=J(T)?this._toVariables({dark:T},o):{},[M,N]=[D.declarations??``,D.tokens],[ne,P]=[ee.declarations??``,ee.tokens||[]],[re,ie]=[O.declarations??``,O.tokens||[]],[ae,oe]=[k.declarations??``,k.tokens||[]],[F,se]=[te.declarations??``,te.tokens||[]],[ce,le]=[A.declarations??``,A.tokens||[]],[ue,de]=[j.declarations??``,j.tokens||[]];s=this.transformCSS(e,M,`light`,`variable`,o,r,i),c=N,l=`${this.transformCSS(e,`${ne}${re}`,`light`,`variable`,o,r,i)}${this.transformCSS(e,`${ae}`,`dark`,`variable`,o,r,i)}`,u=[...new Set([...P,...ie,...oe])],d=`${this.transformCSS(e,`${F}${ce}color-scheme:light`,`light`,`variable`,o,r,i)}${this.transformCSS(e,`${ue}color-scheme:dark`,`dark`,`variable`,o,r,i)}`,f=[...new Set([...se,...le,...de])],p=rl(a.css,{dt:Au})}return{primitive:{css:s,tokens:c},semantic:{css:l,tokens:u},global:{css:d,tokens:f},style:p}},getPreset({name:e=``,preset:t={},options:n,params:r,set:i,defaults:a,selector:o}){let s,c,l;if(J(t)&&n.transform!==`strict`){let r=e.replace(`-directive`,``),u=t,{colorScheme:d,extend:f,css:p}=u,m=mu(u,[`colorScheme`,`extend`,`css`]),h=f||{},{colorScheme:g}=h,_=mu(h,[`colorScheme`]),v=d||{},{dark:y}=v,b=mu(v,[`dark`]),x=g||{},{dark:S}=x,C=mu(x,[`dark`]),w=J(m)?this._toVariables({[r]:fu(fu({},m),_)},n):{},T=J(b)?this._toVariables({[r]:fu(fu({},b),C)},n):{},E=J(y)?this._toVariables({[r]:fu(fu({},y),S)},n):{},[D,ee]=[w.declarations??``,w.tokens||[]],[O,k]=[T.declarations??``,T.tokens||[]],[te,A]=[E.declarations??``,E.tokens||[]];s=`${this.transformCSS(r,`${D}${O}`,`light`,`variable`,n,i,a,o)}${this.transformCSS(r,te,`dark`,`variable`,n,i,a,o)}`,c=[...new Set([...ee,...k,...A])],l=rl(p,{dt:Au})}return{css:s,tokens:c,style:l}},getPresetC({name:e=``,theme:t={},params:n,set:r,defaults:i}){let{preset:a,options:o}=t,s=a?.components?.[e];return this.getPreset({name:e,preset:s,options:o,params:n,set:r,defaults:i})},getPresetD({name:e=``,theme:t={},params:n,set:r,defaults:i}){let a=e.replace(`-directive`,``),{preset:o,options:s}=t,c=o?.components?.[a]||o?.directives?.[a];return this.getPreset({name:a,preset:c,options:s,params:n,set:r,defaults:i})},applyDarkColorScheme(e){return!(e.darkModeSelector===`none`||e.darkModeSelector===!1)},getColorSchemeOption(e,t){return this.applyDarkColorScheme(e)?this.regex.resolve(e.darkModeSelector===!0?t.options.darkModeSelector:e.darkModeSelector??t.options.darkModeSelector):[]},getLayerOrder(e,t={},n,r){let{cssLayer:i}=t;return i?`@layer ${rl(i.order||i.name||`primeui`,n)}`:``},getCommonStyleSheet({name:e=``,theme:t={},params:n,props:r={},set:i,defaults:a}){let o=this.getCommon({name:e,theme:t,params:n,set:i,defaults:a}),s=Object.entries(r).reduce((e,[t,n])=>e.push(`${t}="${n}"`)&&e,[]).join(` `);return Object.entries(o||{}).reduce((e,[t,n])=>{if($c(n)&&Object.hasOwn(n,`css`)){let r=fl(n.css),i=`${t}-variables`;e.push(`<style type="text/css" data-primevue-style-id="${i}" ${s}>${r}</style>`)}return e},[]).join(``)},getStyleSheet({name:e=``,theme:t={},params:n,props:r={},set:i,defaults:a}){let o={name:e,theme:t,params:n,set:i,defaults:a},s=(e.includes(`-directive`)?this.getPresetD(o):this.getPresetC(o))?.css,c=Object.entries(r).reduce((e,[t,n])=>e.push(`${t}="${n}"`)&&e,[]).join(` `);return s?`<style type="text/css" data-primevue-style-id="${e}-variables" ${c}>${fl(s)}</style>`:``},createTokens(e={},t,n=``,r=``,i={}){let a=function(e,t={},n=[]){if(n.includes(this.path))return console.warn(`Circular reference detected at ${this.path}`),{colorScheme:e,path:this.path,paths:t,value:void 0};n.push(this.path),t.name=this.path,t.binding||={};let r=this.value;if(typeof this.value==`string`&&_u.test(this.value)){let i=this.value.trim().replace(_u,r=>{let i=r.slice(1,-1),a=this.tokens[i];if(!a)return console.warn(`Token not found for path: ${i}`),`__UNRESOLVED__`;let o=a.computed(e,t,n);return Array.isArray(o)&&o.length===2?`light-dark(${o[0].value},${o[1].value})`:o?.value??`__UNRESOLVED__`});r=vu.test(i.replace(yu,`0`))?`calc(${i})`:i}return qc(t.binding)&&delete t.binding,n.pop(),{colorScheme:e,path:this.path,paths:t,value:r.includes(`__UNRESOLVED__`)?void 0:r}},o=(e,n,r)=>{Object.entries(e).forEach(([e,s])=>{let c=ul(e,t.variable.excludedKeyRegex)?n:n?`${n}.${bu(e)}`:bu(e),l=r?`${r}.${e}`:e;$c(s)?o(s,c,l):(i[c]||(i[c]={paths:[],computed:(e,t={},n=[])=>{if(i[c].paths.length===1)return i[c].paths[0].computed(i[c].paths[0].scheme,t.binding,n);if(e&&e!==`none`)for(let r=0;r<i[c].paths.length;r++){let a=i[c].paths[r];if(a.scheme===e)return a.computed(e,t.binding,n)}return i[c].paths.map(e=>e.computed(e.scheme,t[e.scheme],n))}}),i[c].paths.push({path:l,value:s,scheme:l.includes(`colorScheme.light`)?`light`:l.includes(`colorScheme.dark`)?`dark`:`none`,computed:a,tokens:i}))})};return o(e,n,r),i},getTokenValue(e,t,n){let r=(e=>e.split(`.`).filter(e=>!ul(e.toLowerCase(),n.variable.excludedKeyRegex)).join(`.`))(t),i=t.includes(`colorScheme.light`)?`light`:t.includes(`colorScheme.dark`)?`dark`:void 0,a=[e[r]?.computed(i)].flat().filter(e=>e);return a.length===1?a[0].value:a.reduce((e={},t)=>{let n=t,{colorScheme:r}=n;return e[r]=mu(n,[`colorScheme`]),e},void 0)},getSelectorRule(e,t,n,r){return n===`class`||n===`attr`?Ou(J(t)?`${e}${t},${e} ${t}`:e,r):Ou(e,Ou(t??`:root,:host`,r))},transformCSS(e,t,n,r,i={},a,o,s){if(J(t)){let{cssLayer:c}=i;if(r!==`style`){let e=this.getColorSchemeOption(i,o);t=n===`dark`?e.reduce((e,{type:n,selector:r})=>(J(r)&&(e+=r.includes(`[CSS]`)?r.replace(`[CSS]`,t):this.getSelectorRule(r,s,n,t)),e),``):Ou(s??`:root,:host`,t)}if(c){let n={name:`primeui`,order:`primeui`};$c(c)&&(n.name=rl(c.name,{name:e,type:r})),J(n.name)&&(t=Ou(`@layer ${n.name}`,t),a?.layerNames(n.name))}return t}return``}},Y={defaults:{variable:{prefix:`p`,selector:`:root,:host`,excludedKeyRegex:/^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi},options:{prefix:`p`,darkModeSelector:`system`,cssLayer:!1}},_theme:void 0,_layerNames:new Set,_loadedStyleNames:new Set,_loadingStyles:new Set,_tokens:{},update(e={}){let{theme:t}=e;t&&(this._theme=pu(fu({},t),{options:fu(fu({},this.defaults.options),t.options)}),this._tokens=Pu.createTokens(this.preset,this.defaults),this.clearLoadedStyleNames())},get theme(){return this._theme},get preset(){return this.theme?.preset||{}},get options(){return this.theme?.options||{}},get tokens(){return this._tokens},getTheme(){return this.theme},setTheme(e){this.update({theme:e}),gu.emit(`theme:change`,e)},getPreset(){return this.preset},setPreset(e){this._theme=pu(fu({},this.theme),{preset:e}),this._tokens=Pu.createTokens(e,this.defaults),this.clearLoadedStyleNames(),gu.emit(`preset:change`,e),gu.emit(`theme:change`,this.theme)},getOptions(){return this.options},setOptions(e){this._theme=pu(fu({},this.theme),{options:e}),this.clearLoadedStyleNames(),gu.emit(`options:change`,e),gu.emit(`theme:change`,this.theme)},getLayerNames(){return[...this._layerNames]},setLayerNames(e){this._layerNames.add(e)},getLoadedStyleNames(){return this._loadedStyleNames},isStyleNameLoaded(e){return this._loadedStyleNames.has(e)},setLoadedStyleName(e){this._loadedStyleNames.add(e)},deleteLoadedStyleName(e){this._loadedStyleNames.delete(e)},clearLoadedStyleNames(){this._loadedStyleNames.clear()},getTokenValue(e){return Pu.getTokenValue(this.tokens,e,this.defaults)},getCommon(e=``,t){return Pu.getCommon({name:e,theme:this.theme,params:t,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},getComponent(e=``,t){let n={name:e,theme:this.theme,params:t,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return Pu.getPresetC(n)},getDirective(e=``,t){let n={name:e,theme:this.theme,params:t,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return Pu.getPresetD(n)},getCustomPreset(e=``,t,n,r){let i={name:e,preset:t,options:this.options,selector:n,params:r,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return Pu.getPreset(i)},getLayerOrderCSS(e=``){return Pu.getLayerOrder(e,this.options,{names:this.getLayerNames()},this.defaults)},transformCSS(e=``,t,n=`style`,r){return Pu.transformCSS(e,t,r,n,this.options,{layerNames:this.setLayerNames.bind(this)},this.defaults)},getCommonStyleSheet(e=``,t,n={}){return Pu.getCommonStyleSheet({name:e,theme:this.theme,params:t,props:n,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},getStyleSheet(e,t,n={}){return Pu.getStyleSheet({name:e,theme:this.theme,params:t,props:n,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},onStyleMounted(e){this._loadingStyles.add(e)},onStyleUpdated(e){this._loadingStyles.add(e)},onStyleLoaded(e,{name:t}){this._loadingStyles.size&&(this._loadingStyles.delete(t),gu.emit(`theme:${t}:load`,e),!this._loadingStyles.size&&gu.emit(`theme:load`))}},Fu={_loadedStyleNames:new Set,getLoadedStyleNames:function(){return this._loadedStyleNames},isStyleNameLoaded:function(e){return this._loadedStyleNames.has(e)},setLoadedStyleName:function(e){this._loadedStyleNames.add(e)},deleteLoadedStyleName:function(e){this._loadedStyleNames.delete(e)},clearLoadedStyleNames:function(){this._loadedStyleNames.clear()}},Iu=`
    *,
    ::before,
    ::after {
        box-sizing: border-box;
    }

    .p-collapsible-enter-active {
        animation: p-animate-collapsible-expand 0.2s ease-out;
        overflow: hidden;
    }

    .p-collapsible-leave-active {
        animation: p-animate-collapsible-collapse 0.2s ease-out;
        overflow: hidden;
    }

    @keyframes p-animate-collapsible-expand {
        from {
            grid-template-rows: 0fr;
        }
        to {
            grid-template-rows: 1fr;
        }
    }

    @keyframes p-animate-collapsible-collapse {
        from {
            grid-template-rows: 1fr;
        }
        to {
            grid-template-rows: 0fr;
        }
    }

    .p-disabled,
    .p-disabled * {
        cursor: default;
        pointer-events: none;
        user-select: none;
    }

    .p-disabled,
    .p-component:disabled {
        opacity: dt('disabled.opacity');
    }

    .pi {
        font-size: dt('icon.size');
    }

    .p-icon {
        width: dt('icon.size');
        height: dt('icon.size');
    }

    .p-overlay-mask {
        background: var(--px-mask-background, dt('mask.background'));
        color: dt('mask.color');
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .p-overlay-mask-enter-active {
        animation: p-animate-overlay-mask-enter dt('mask.transition.duration') forwards;
    }

    .p-overlay-mask-leave-active {
        animation: p-animate-overlay-mask-leave dt('mask.transition.duration') forwards;
    }

    @keyframes p-animate-overlay-mask-enter {
        from {
            background: transparent;
        }
        to {
            background: var(--px-mask-background, dt('mask.background'));
        }
    }
    @keyframes p-animate-overlay-mask-leave {
        from {
            background: var(--px-mask-background, dt('mask.background'));
        }
        to {
            background: transparent;
        }
    }

    .p-anchored-overlay-enter-active {
        animation: p-animate-anchored-overlay-enter 300ms cubic-bezier(.19,1,.22,1);
    }

    .p-anchored-overlay-leave-active {
        animation: p-animate-anchored-overlay-leave 300ms cubic-bezier(.19,1,.22,1);
    }

    @keyframes p-animate-anchored-overlay-enter {
        from {
            opacity: 0;
            transform: scale(0.93);
        }
    }

    @keyframes p-animate-anchored-overlay-leave {
        to {
            opacity: 0;
            transform: scale(0.93);
        }
    }
`;function Lu(e){"@babel/helpers - typeof";return Lu=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Lu(e)}function Ru(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function zu(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?Ru(Object(n),!0).forEach(function(t){Bu(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ru(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function Bu(e,t,n){return(t=Vu(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Vu(e){var t=Hu(e,`string`);return Lu(t)==`symbol`?t:t+``}function Hu(e,t){if(Lu(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(Lu(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function Uu(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;Xa()&&Xa().components?Wr(e):t?e():On(e)}var Wu=0;function Gu(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=en(!1),r=en(e),i=en(null),a=Zl()?window.document:void 0,o=t.document,s=o===void 0?a:o,c=t.immediate,l=c===void 0?!0:c,u=t.manual,d=u===void 0?!1:u,f=t.name,p=f===void 0?`style_${++Wu}`:f,m=t.id,h=m===void 0?void 0:m,g=t.media,_=g===void 0?void 0:g,v=t.nonce,y=v===void 0?void 0:v,b=t.first,x=b===void 0?!1:b,S=t.onMounted,C=S===void 0?void 0:S,w=t.onUpdated,T=w===void 0?void 0:w,E=t.onLoad,D=E===void 0?void 0:E,ee=t.props,O=ee===void 0?{}:ee,k=function(){},te=function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(s){var o=zu(zu({},O),a),c=o.name||p,l=o.id||h,u=o.nonce||y;i.value=s.querySelector(`style[data-primevue-style-id="${c}"]`)||s.getElementById(l)||s.createElement(`style`),i.value.isConnected||(r.value=t||e,Fl(i.value,{type:`text/css`,id:l,media:_,nonce:u}),x?s.head.prepend(i.value):s.head.appendChild(i.value),eu(i.value,`data-primevue-style-id`,c),Fl(i.value,o),i.value.onload=function(e){return D?.(e,{name:c})},C?.(c)),!n.value&&(k=Yn(r,function(e){i.value.textContent=e,T?.(c)},{immediate:!0}),n.value=!0)}};return l&&!d&&Uu(te),{id:h,name:p,el:i,css:r,unload:function(){!s||!n.value||(k(),Nl(i.value)&&s.head.removeChild(i.value),n.value=!1,i.value=null)},load:te,isLoaded:Gt(n)}}function Ku(e){"@babel/helpers - typeof";return Ku=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Ku(e)}var qu,Ju,Yu,Xu;function Zu(e,t){return nd(e)||td(e,t)||$u(e,t)||Qu()}function Qu(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function $u(e,t){if(e){if(typeof e==`string`)return ed(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ed(e,t):void 0}}function ed(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function td(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t!==0)for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function nd(e){if(Array.isArray(e))return e}function rd(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function id(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?rd(Object(n),!0).forEach(function(t){ad(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):rd(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function ad(e,t,n){return(t=od(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function od(e){var t=sd(e,`string`);return Ku(t)==`symbol`?t:t+``}function sd(e,t){if(Ku(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(Ku(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function cd(e,t){return t||=e.slice(0),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var X={name:`base`,css:function(e){var t=e.dt;return`
.p-hidden-accessible {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    opacity: 0;
    overflow: hidden;
    padding: 0;
    pointer-events: none;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}

.p-overflow-hidden {
    overflow: hidden;
    padding-right: ${t(`scrollbar.width`)};
}
`},style:Iu,classes:{},inlineStyles:{},load:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=(arguments.length>2&&arguments[2]!==void 0?arguments[2]:function(e){return e})(Mu(qu||=cd([``,``]),e));return J(n)?Gu(fl(n),id({name:this.name},t)):{}},loadCSS:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return this.load(this.css,e)},loadStyle:function(){var e=this,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:``;return this.load(this.style,t,function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``;return Y.transformCSS(t.name||e.name,`${r}${Mu(Ju||=cd([``,``]),n)}`)})},getCommonTheme:function(e){return Y.getCommon(this.name,e)},getComponentTheme:function(e){return Y.getComponent(this.name,e)},getDirectiveTheme:function(e){return Y.getDirective(this.name,e)},getPresetTheme:function(e,t,n){return Y.getCustomPreset(this.name,e,t,n)},getLayerOrderThemeCSS:function(){return Y.getLayerOrderCSS(this.name)},getStyleSheet:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(this.css){var n=rl(this.css,{dt:Au})||``,r=fl(Mu(Yu||=cd([``,``,``]),n,e)),i=Object.entries(t).reduce(function(e,t){var n=Zu(t,2),r=n[0],i=n[1];return e.push(`${r}="${i}"`)&&e},[]).join(` `);return J(r)?`<style type="text/css" data-primevue-style-id="${this.name}" ${i}>${r}</style>`:``}return``},getCommonThemeStyleSheet:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return Y.getCommonStyleSheet(this.name,e,t)},getThemeStyleSheet:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=[Y.getStyleSheet(this.name,e,t)];if(this.style){var r=this.name===`base`?`global-style`:`${this.name}-style`,i=Mu(Xu||=cd([``,``]),rl(this.style,{dt:Au})),a=fl(Y.transformCSS(r,i)),o=Object.entries(t).reduce(function(e,t){var n=Zu(t,2),r=n[0],i=n[1];return e.push(`${r}="${i}"`)&&e},[]).join(` `);J(a)&&n.push(`<style type="text/css" data-primevue-style-id="${r}" ${o}>${a}</style>`)}return n.join(``)},extend:function(e){return id(id({},this),{},{css:void 0,style:void 0},e)}};function ld(){return`${arguments.length>0&&arguments[0]!==void 0?arguments[0]:`pc`}${kr().replace(`v-`,``).replaceAll(`-`,`_`)}`}var ud=X.extend({name:`common`});function dd(e){"@babel/helpers - typeof";return dd=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},dd(e)}function fd(e){return yd(e)||pd(e)||gd(e)||hd()}function pd(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function md(e,t){return yd(e)||vd(e,t)||gd(e,t)||hd()}function hd(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function gd(e,t){if(e){if(typeof e==`string`)return _d(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_d(e,t):void 0}}function _d(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function vd(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function yd(e){if(Array.isArray(e))return e}function bd(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Z(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?bd(Object(n),!0).forEach(function(t){xd(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):bd(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function xd(e,t,n){return(t=Sd(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Sd(e){var t=Cd(e,`string`);return dd(t)==`symbol`?t:t+``}function Cd(e,t){if(dd(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(dd(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var wd={name:`BaseComponent`,props:{pt:{type:Object,default:void 0},ptOptions:{type:Object,default:void 0},unstyled:{type:Boolean,default:void 0},dt:{type:Object,default:void 0}},inject:{$parentInstance:{default:void 0}},watch:{isUnstyled:{immediate:!0,handler:function(e){gu.off(`theme:change`,this._loadCoreStyles),e||(this._loadCoreStyles(),this._themeChangeListener(this._loadCoreStyles))}},dt:{immediate:!0,handler:function(e,t){var n=this;gu.off(`theme:change`,this._themeScopedListener),e?(this._loadScopedThemeStyles(e),this._themeScopedListener=function(){return n._loadScopedThemeStyles(e)},this._themeChangeListener(this._themeScopedListener)):this._unloadScopedThemeStyles()}}},scopedStyleEl:void 0,rootEl:void 0,uid:void 0,$attrSelector:void 0,beforeCreate:function(){var e,t,n,r,i,a,o,s,c,l,u=this.pt?._usept,d=u?(e=this.pt)==null||(e=e.originalValue)==null?void 0:e[this.$.type.name]:void 0;(n=(u?(t=this.pt)==null||(t=t.value)==null?void 0:t[this.$.type.name]:this.pt)||d)==null||(n=n.hooks)==null||(r=n.onBeforeCreate)==null||r.call(n);var f=(i=this.$primevueConfig)==null||(i=i.pt)==null?void 0:i._usept,p=f?(a=this.$primevue)==null||(a=a.config)==null||(a=a.pt)==null?void 0:a.originalValue:void 0;(c=(f?(o=this.$primevue)==null||(o=o.config)==null||(o=o.pt)==null?void 0:o.value:(s=this.$primevue)==null||(s=s.config)==null?void 0:s.pt)||p)==null||(c=c[this.$.type.name])==null||(c=c.hooks)==null||(l=c.onBeforeCreate)==null||l.call(c),this.$attrSelector=ld(),this.uid=this.$attrs.id||this.$attrSelector.replace(`pc`,`pv_id_`)},created:function(){this._hook(`onCreated`)},beforeMount:function(){this.rootEl=Rl(Pl(this.$el)?this.$el:this.$el?.parentElement,`[${this.$attrSelector}]`),this.rootEl&&(this.rootEl.$pc=Z({name:this.$.type.name,attrSelector:this.$attrSelector},this.$params)),this._loadStyles(),this._hook(`onBeforeMount`)},mounted:function(){this._hook(`onMounted`)},beforeUpdate:function(){this._hook(`onBeforeUpdate`)},updated:function(){this._hook(`onUpdated`)},beforeUnmount:function(){this._hook(`onBeforeUnmount`)},unmounted:function(){this._removeThemeListeners(),this._unloadScopedThemeStyles(),this._hook(`onUnmounted`)},methods:{_hook:function(e){if(!this.$options.hostName){var t=this._usePT(this._getPT(this.pt,this.$.type.name),this._getOptionValue,`hooks.${e}`),n=this._useDefaultPT(this._getOptionValue,`hooks.${e}`);t?.(),n?.()}},_mergeProps:function(e){var t=[...arguments].slice(1);return Xc(e)?e.apply(void 0,t):q.apply(void 0,t)},_load:function(){Fu.isStyleNameLoaded(`base`)||(X.loadCSS(this.$styleOptions),this._loadGlobalStyles(),Fu.setLoadedStyleName(`base`)),this._loadThemeStyles()},_loadStyles:function(){this._load(),this._themeChangeListener(this._load)},_loadCoreStyles:function(){var e;!Fu.isStyleNameLoaded(this.$style?.name)&&(e=this.$style)!=null&&e.name&&(ud.loadCSS(this.$styleOptions),this.$options.style&&this.$style.loadCSS(this.$styleOptions),Fu.setLoadedStyleName(this.$style.name))},_loadGlobalStyles:function(){var e=this._useGlobalPT(this._getOptionValue,`global.css`,this.$params);J(e)&&X.load(e,Z({name:`global`},this.$styleOptions))},_loadThemeStyles:function(){var e;if(!(this.isUnstyled||this.$theme===`none`)){if(!Y.isStyleNameLoaded(`common`)){var t,n,r=((t=this.$style)==null||(n=t.getCommonTheme)==null?void 0:n.call(t))||{},i=r.primitive,a=r.semantic,o=r.global,s=r.style;X.load(i?.css,Z({name:`primitive-variables`},this.$styleOptions)),X.load(a?.css,Z({name:`semantic-variables`},this.$styleOptions)),X.load(o?.css,Z({name:`global-variables`},this.$styleOptions)),X.loadStyle(Z({name:`global-style`},this.$styleOptions),s),Y.setLoadedStyleName(`common`)}if(!Y.isStyleNameLoaded(this.$style?.name)&&(e=this.$style)!=null&&e.name){var c,l,u,d,f=((c=this.$style)==null||(l=c.getComponentTheme)==null?void 0:l.call(c))||{},p=f.css,m=f.style;(u=this.$style)==null||u.load(p,Z({name:`${this.$style.name}-variables`},this.$styleOptions)),(d=this.$style)==null||d.loadStyle(Z({name:`${this.$style.name}-style`},this.$styleOptions),m),Y.setLoadedStyleName(this.$style.name)}if(!Y.isStyleNameLoaded(`layer-order`)){var h,g,_=(h=this.$style)==null||(g=h.getLayerOrderThemeCSS)==null?void 0:g.call(h);X.load(_,Z({name:`layer-order`,first:!0},this.$styleOptions)),Y.setLoadedStyleName(`layer-order`)}}},_loadScopedThemeStyles:function(e){var t,n,r=(((t=this.$style)==null||(n=t.getPresetTheme)==null?void 0:n.call(t,e,`[${this.$attrSelector}]`))||{}).css,i=this.$style?.load(r,Z({name:`${this.$attrSelector}-${this.$style.name}`},this.$styleOptions));this.scopedStyleEl=i.el},_unloadScopedThemeStyles:function(){var e;(e=this.scopedStyleEl)==null||(e=e.value)==null||e.remove()},_themeChangeListener:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(){};Fu.clearLoadedStyleNames(),gu.on(`theme:change`,e)},_removeThemeListeners:function(){gu.off(`theme:change`,this._loadCoreStyles),gu.off(`theme:change`,this._load),gu.off(`theme:change`,this._themeScopedListener)},_getHostInstance:function(e){return e?this.$options.hostName?e.$.type.name===this.$options.hostName?e:this._getHostInstance(e.$parentInstance):e.$parentInstance:void 0},_getPropValue:function(e){return this[e]||this._getHostInstance(this)?.[e]},_getOptionValue:function(e){return ol(e,arguments.length>1&&arguments[1]!==void 0?arguments[1]:``,arguments.length>2&&arguments[2]!==void 0?arguments[2]:{})},_getPTValue:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:``,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!0,i=/./g.test(t)&&!!n[t.split(`.`)[0]],a=this._getPropValue(`ptOptions`)||this.$primevueConfig?.ptOptions||{},o=a.mergeSections,s=o===void 0?!0:o,c=a.mergeProps,l=c===void 0?!1:c,u=r?i?this._useGlobalPT(this._getPTClassValue,t,n):this._useDefaultPT(this._getPTClassValue,t,n):void 0,d=i?void 0:this._getPTSelf(e,this._getPTClassValue,t,Z(Z({},n),{},{global:u||{}})),f=this._getPTDatasets(t);return s||!s&&d?l?this._mergeProps(l,u,d,f):Z(Z(Z({},u),d),f):Z(Z({},d),f)},_getPTSelf:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=[...arguments].slice(1);return q(this._usePT.apply(this,[this._getPT(e,this.$name)].concat(t)),this._usePT.apply(this,[this.$_attrsPT].concat(t)))},_getPTDatasets:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,t=`data-pc-`,n=e===`root`&&J(this.pt?.[`data-pc-section`]);return e!==`transition`&&Z(Z({},e===`root`&&Z(Z(xd({},`${t}name`,al(n?this.pt?.[`data-pc-section`]:this.$.type.name)),n&&xd({},`${t}extend`,al(this.$.type.name))),{},xd({},`${this.$attrSelector}`,``))),{},xd({},`${t}section`,al(e)))},_getPTClassValue:function(){var e=this._getOptionValue.apply(this,arguments);return il(e)||sl(e)?{class:e}:e},_getPT:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:``,r=arguments.length>2?arguments[2]:void 0,i=function(e){var i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,a=r?r(e):e,o=al(n),s=al(t.$name);return(i&&o===s?void 0:a?.[o])??a};return e!=null&&e.hasOwnProperty(`_usept`)?{_usept:e._usept,originalValue:i(e.originalValue),value:i(e.value)}:i(e,!0)},_usePT:function(e,t,n,r){var i=function(e){return t(e,n,r)};if(e!=null&&e.hasOwnProperty(`_usept`)){var a=e._usept||this.$primevueConfig?.ptOptions||{},o=a.mergeSections,s=o===void 0?!0:o,c=a.mergeProps,l=c===void 0?!1:c,u=i(e.originalValue),d=i(e.value);return u===void 0&&d===void 0?void 0:il(d)?d:il(u)?u:s||!s&&d?l?this._mergeProps(l,u,d):Z(Z({},u),d):d}return i(e)},_useGlobalPT:function(e,t,n){return this._usePT(this.globalPT,e,t,n)},_useDefaultPT:function(e,t,n){return this._usePT(this.defaultPT,e,t,n)},ptm:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this._getPTValue(this.pt,e,Z(Z({},this.$params),t))},ptmi:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=q(this.$_attrsWithoutPT,this.ptm(e,t));return n!=null&&n.hasOwnProperty(`id`)&&(n.id??=this.$id),n},ptmo:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:``,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return this._getPTValue(e,t,Z({instance:this},n),!1)},cx:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this.isUnstyled?void 0:this._getOptionValue(this.$style.classes,e,Z(Z({},this.$params),t))},sx:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(t){var r=this._getOptionValue(this.$style.inlineStyles,e,Z(Z({},this.$params),n));return[this._getOptionValue(ud.inlineStyles,e,Z(Z({},this.$params),n)),r]}}},computed:{globalPT:function(){var e=this;return this._getPT(this.$primevueConfig?.pt,void 0,function(t){return rl(t,{instance:e})})},defaultPT:function(){var e=this;return this._getPT(this.$primevueConfig?.pt,void 0,function(t){return e._getOptionValue(t,e.$name,Z({},e.$params))||rl(t,Z({},e.$params))})},isUnstyled:function(){return this.unstyled===void 0?this.$primevueConfig?.unstyled:this.unstyled},$id:function(){return this.$attrs.id||this.uid},$inProps:function(){var e=Object.keys(this.$.vnode?.props||{});return Object.fromEntries(Object.entries(this.$props).filter(function(t){var n=md(t,1)[0];return e?.includes(n)}))},$theme:function(){return this.$primevueConfig?.theme},$style:function(){return Z(Z({classes:void 0,inlineStyles:void 0,load:function(){},loadCSS:function(){},loadStyle:function(){}},(this._getHostInstance(this)||{}).$style),this.$options.style)},$styleOptions:function(){var e;return{nonce:(e=this.$primevueConfig)==null||(e=e.csp)==null?void 0:e.nonce}},$primevueConfig:function(){return this.$primevue?.config},$name:function(){return this.$options.hostName||this.$.type.name},$params:function(){var e=this._getHostInstance(this)||this.$parent;return{instance:this,props:this.$props,state:this.$data,attrs:this.$attrs,parent:{instance:e,props:e?.$props,state:e?.$data,attrs:e?.$attrs}}},$_attrsPT:function(){return Object.entries(this.$attrs||{}).filter(function(e){return md(e,1)[0]?.startsWith(`pt:`)}).reduce(function(e,t){var n=md(t,2),r=n[0],i=n[1];return _d(fd(r.split(`:`))).slice(1)?.reduce(function(e,t,n,r){return!e[t]&&(e[t]=n===r.length-1?i:{}),e[t]},e),e},{})},$_attrsWithoutPT:function(){return Object.entries(this.$attrs||{}).filter(function(e){var t=md(e,1)[0];return!(t!=null&&t.startsWith(`pt:`))}).reduce(function(e,t){var n=md(t,2),r=n[0];return e[r]=n[1],e},{})}}},Td=X.extend({name:`tabs`,style:`
    .p-tabs {
        display: flex;
        flex-direction: column;
    }

    .p-tablist {
        display: flex;
        position: relative;
        overflow: hidden;
        background: dt('tabs.tablist.background');
    }

    .p-tablist-viewport {
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        scrollbar-width: none;
        overscroll-behavior: contain auto;
    }

    .p-tablist-viewport::-webkit-scrollbar {
        display: none;
    }

    .p-tablist-tab-list {
        position: relative;
        display: flex;
        border-style: solid;
        border-color: dt('tabs.tablist.border.color');
        border-width: dt('tabs.tablist.border.width');
    }

    .p-tablist-content {
        flex-grow: 1;
    }

    .p-tablist-nav-button {
        all: unset;
        position: absolute !important;
        flex-shrink: 0;
        inset-block-start: 0;
        z-index: 2;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: dt('tabs.nav.button.background');
        color: dt('tabs.nav.button.color');
        width: dt('tabs.nav.button.width');
        transition:
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        box-shadow: dt('tabs.nav.button.shadow');
        outline-color: transparent;
        cursor: pointer;
    }

    .p-tablist-nav-button:focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.nav.button.focus.ring.shadow');
        outline: dt('tabs.nav.button.focus.ring.width') dt('tabs.nav.button.focus.ring.style') dt('tabs.nav.button.focus.ring.color');
        outline-offset: dt('tabs.nav.button.focus.ring.offset');
    }

    .p-tablist-nav-button:hover {
        color: dt('tabs.nav.button.hover.color');
    }

    .p-tablist-prev-button {
        inset-inline-start: 0;
    }

    .p-tablist-next-button {
        inset-inline-end: 0;
    }

    .p-tablist-prev-button:dir(rtl),
    .p-tablist-next-button:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-tab {
        flex-shrink: 0;
        cursor: pointer;
        user-select: none;
        position: relative;
        border-style: solid;
        white-space: nowrap;
        gap: dt('tabs.tab.gap');
        background: dt('tabs.tab.background');
        border-width: dt('tabs.tab.border.width');
        border-color: dt('tabs.tab.border.color');
        color: dt('tabs.tab.color');
        padding: dt('tabs.tab.padding');
        font-weight: dt('tabs.tab.font.weight');
        transition:
            background dt('tabs.transition.duration'),
            border-color dt('tabs.transition.duration'),
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        margin: dt('tabs.tab.margin');
        outline-color: transparent;
    }

    .p-tab:not(.p-disabled):focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.tab.focus.ring.shadow');
        outline: dt('tabs.tab.focus.ring.width') dt('tabs.tab.focus.ring.style') dt('tabs.tab.focus.ring.color');
        outline-offset: dt('tabs.tab.focus.ring.offset');
    }

    .p-tab:not(.p-tab-active):not(.p-disabled):hover {
        background: dt('tabs.tab.hover.background');
        border-color: dt('tabs.tab.hover.border.color');
        color: dt('tabs.tab.hover.color');
    }

    .p-tab-active {
        background: dt('tabs.tab.active.background');
        border-color: dt('tabs.tab.active.border.color');
        color: dt('tabs.tab.active.color');
    }

    .p-tabpanels {
        background: dt('tabs.tabpanel.background');
        color: dt('tabs.tabpanel.color');
        padding: dt('tabs.tabpanel.padding');
        outline: 0 none;
    }

    .p-tabpanel:focus-visible {
        box-shadow: dt('tabs.tabpanel.focus.ring.shadow');
        outline: dt('tabs.tabpanel.focus.ring.width') dt('tabs.tabpanel.focus.ring.style') dt('tabs.tabpanel.focus.ring.color');
        outline-offset: dt('tabs.tabpanel.focus.ring.offset');
    }

    .p-tablist-active-bar {
        z-index: 1;
        display: block;
        position: absolute;
        inset-block-end: dt('tabs.active.bar.bottom');
        height: dt('tabs.active.bar.height');
        background: dt('tabs.active.bar.background');
        transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
    }
`,classes:{root:function(e){return[`p-tabs p-component`,{"p-tabs-scrollable":e.props.scrollable}]}}}),Ed={name:`Tabs`,extends:{name:`BaseTabs`,extends:wd,props:{value:{type:[String,Number],default:void 0},lazy:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},showNavigators:{type:Boolean,default:!0},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1}},style:Td,provide:function(){return{$pcTabs:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`update:value`],data:function(){return{d_value:this.value}},watch:{value:function(e){this.d_value=e}},methods:{updateValue:function(e){this.d_value!==e&&(this.d_value=e,this.$emit(`update:value`,e))},isVertical:function(){return this.orientation===`vertical`}}};function Dd(e,t,n,r,i,a){return U(),W(`div`,q({class:e.cx(`root`)},e.ptmi(`root`)),[V(e.$slots,`default`)],16)}Ed.render=Dd;var Od=X.extend({name:`baseicon`,css:`
.p-icon {
    display: inline-block;
    vertical-align: baseline;
    flex-shrink: 0;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`});function kd(e){"@babel/helpers - typeof";return kd=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},kd(e)}function Ad(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function jd(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?Ad(Object(n),!0).forEach(function(t){Md(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ad(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function Md(e,t,n){return(t=Nd(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Nd(e){var t=Pd(e,`string`);return kd(t)==`symbol`?t:t+``}function Pd(e,t){if(kd(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(kd(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Fd={name:`BaseIcon`,extends:wd,props:{label:{type:String,default:void 0},spin:{type:Boolean,default:!1}},style:Od,provide:function(){return{$pcIcon:this,$parentInstance:this}},methods:{pti:function(){var e=qc(this.label);return jd(jd({},!this.isUnstyled&&{class:[`p-icon`,{"p-icon-spin":this.spin}]}),{},{role:e?void 0:`img`,"aria-label":e?void 0:this.label,"aria-hidden":e})}}},Id={name:`ChevronLeftIcon`,extends:Fd};function Ld(e){return Vd(e)||Bd(e)||zd(e)||Rd()}function Rd(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function zd(e,t){if(e){if(typeof e==`string`)return Hd(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Hd(e,t):void 0}}function Bd(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function Vd(e){if(Array.isArray(e))return Hd(e)}function Hd(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Ud(e,t,n,r,i,a){return U(),W(`svg`,q({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),Ld(t[0]||=[G(`path`,{d:`M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z`,fill:`currentColor`},null,-1)]),16)}Id.render=Ud;var Wd={name:`ChevronRightIcon`,extends:Fd};function Gd(e){return Yd(e)||Jd(e)||qd(e)||Kd()}function Kd(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function qd(e,t){if(e){if(typeof e==`string`)return Xd(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Xd(e,t):void 0}}function Jd(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function Yd(e){if(Array.isArray(e))return Xd(e)}function Xd(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Zd(e,t,n,r,i,a){return U(),W(`svg`,q({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),Gd(t[0]||=[G(`path`,{d:`M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z`,fill:`currentColor`},null,-1)]),16)}Wd.render=Zd;var Qd=gl();function $d(e){"@babel/helpers - typeof";return $d=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},$d(e)}function ef(e,t){return of(e)||af(e,t)||nf(e,t)||tf()}function tf(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function nf(e,t){if(e){if(typeof e==`string`)return rf(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?rf(e,t):void 0}}function rf(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function af(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t!==0)for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function of(e){if(Array.isArray(e))return e}function sf(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Q(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?sf(Object(n),!0).forEach(function(t){cf(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):sf(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function cf(e,t,n){return(t=lf(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function lf(e){var t=uf(e,`string`);return $d(t)==`symbol`?t:t+``}function uf(e,t){if($d(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if($d(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var $={_getMeta:function(){return[$c(arguments.length<=0?void 0:arguments[0])||arguments.length<=0?void 0:arguments[0],rl($c(arguments.length<=0?void 0:arguments[0])?arguments.length<=0?void 0:arguments[0]:arguments.length<=1?void 0:arguments[1])]},_getConfig:function(e,t){var n,r;return((e==null||(n=e.instance)==null?void 0:n.$primevue)||(t==null||(r=t.ctx)==null||(r=r.appContext)==null||(r=r.config)==null||(r=r.globalProperties)==null?void 0:r.$primevue))?.config},_getOptionValue:ol,_getPTValue:function(){var e,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:``,i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!0,o=function(){var e=$._getOptionValue.apply($,arguments);return il(e)||sl(e)?{class:e}:e},s=((e=t.binding)==null||(e=e.value)==null?void 0:e.ptOptions)||t.$primevueConfig?.ptOptions||{},c=s.mergeSections,l=c===void 0?!0:c,u=s.mergeProps,d=u===void 0?!1:u,f=a?$._useDefaultPT(t,t.defaultPT(),o,r,i):void 0,p=$._usePT(t,$._getPT(n,t.$name),o,r,Q(Q({},i),{},{global:f||{}})),m=$._getPTDatasets(t,r);return l||!l&&p?d?$._mergeProps(t,d,f,p,m):Q(Q(Q({},f),p),m):Q(Q({},p),m)},_getPTDatasets:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:``,n=`data-pc-`;return Q(Q({},t===`root`&&cf({},`${n}name`,al(e.$name))),{},cf({},`${n}section`,al(t)))},_getPT:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:``,n=arguments.length>2?arguments[2]:void 0,r=function(e){var r=n?n(e):e,i=al(t);return r?.[i]??r};return e&&Object.hasOwn(e,`_usept`)?{_usept:e._usept,originalValue:r(e.originalValue),value:r(e.value)}:r(e)},_usePT:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0,i=arguments.length>4?arguments[4]:void 0,a=function(e){return n(e,r,i)};if(t&&Object.hasOwn(t,`_usept`)){var o=t._usept||e.$primevueConfig?.ptOptions||{},s=o.mergeSections,c=s===void 0?!0:s,l=o.mergeProps,u=l===void 0?!1:l,d=a(t.originalValue),f=a(t.value);return d===void 0&&f===void 0?void 0:il(f)?f:il(d)?d:c||!c&&f?u?$._mergeProps(e,u,d,f):Q(Q({},d),f):f}return a(t)},_useDefaultPT:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0,i=arguments.length>4?arguments[4]:void 0;return $._usePT(e,t,n,r,i)},_loadStyles:function(){var e,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0,i=$._getConfig(n,r),a={nonce:i==null||(e=i.csp)==null?void 0:e.nonce};$._loadCoreStyles(t,a),$._loadThemeStyles(t,a),$._loadScopedThemeStyles(t,a),$._removeThemeListeners(t),t.$loadStyles=function(){return $._loadThemeStyles(t,a)},$._themeChangeListener(t.$loadStyles)},_loadCoreStyles:function(){var e,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0;if(!Fu.isStyleNameLoaded(t.$style?.name)&&(e=t.$style)!=null&&e.name){var r;X.loadCSS(n),(r=t.$style)==null||r.loadCSS(n),Fu.setLoadedStyleName(t.$style.name)}},_loadThemeStyles:function(){var e,t,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=arguments.length>1?arguments[1]:void 0;if(!(n!=null&&n.isUnstyled()||(n==null||(e=n.theme)==null?void 0:e.call(n))===`none`)){if(!Y.isStyleNameLoaded(`common`)){var i,a,o=((i=n.$style)==null||(a=i.getCommonTheme)==null?void 0:a.call(i))||{},s=o.primitive,c=o.semantic,l=o.global,u=o.style;X.load(s?.css,Q({name:`primitive-variables`},r)),X.load(c?.css,Q({name:`semantic-variables`},r)),X.load(l?.css,Q({name:`global-variables`},r)),X.loadStyle(Q({name:`global-style`},r),u),Y.setLoadedStyleName(`common`)}if(!Y.isStyleNameLoaded(n.$style?.name)&&(t=n.$style)!=null&&t.name){var d,f,p,m,h=((d=n.$style)==null||(f=d.getDirectiveTheme)==null?void 0:f.call(d))||{},g=h.css,_=h.style;(p=n.$style)==null||p.load(g,Q({name:`${n.$style.name}-variables`},r)),(m=n.$style)==null||m.loadStyle(Q({name:`${n.$style.name}-style`},r),_),Y.setLoadedStyleName(n.$style.name)}if(!Y.isStyleNameLoaded(`layer-order`)){var v,y,b=(v=n.$style)==null||(y=v.getLayerOrderThemeCSS)==null?void 0:y.call(v);X.load(b,Q({name:`layer-order`,first:!0},r)),Y.setLoadedStyleName(`layer-order`)}}},_loadScopedThemeStyles:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,n=e.preset();if(n&&e.$attrSelector){var r,i,a=(((r=e.$style)==null||(i=r.getPresetTheme)==null?void 0:i.call(r,n,`[${e.$attrSelector}]`))||{}).css;e.scopedStyleEl=(e.$style?.load(a,Q({name:`${e.$attrSelector}-${e.$style.name}`},t))).el}},_themeChangeListener:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(){};Fu.clearLoadedStyleNames(),gu.on(`theme:change`,e)},_removeThemeListeners:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};gu.off(`theme:change`,e.$loadStyles),e.$loadStyles=void 0},_hook:function(e,t,n,r,i,a){var o,s,c=`on${ml(t)}`,l=$._getConfig(r,i),u=n?.$instance,d=$._usePT(u,$._getPT(r==null||(o=r.value)==null?void 0:o.pt,e),$._getOptionValue,`hooks.${c}`),f=$._useDefaultPT(u,l==null||(s=l.pt)==null||(s=s.directives)==null?void 0:s[e],$._getOptionValue,`hooks.${c}`),p={el:n,binding:r,vnode:i,prevVnode:a};d?.(u,p),f?.(u,p)},_mergeProps:function(){var e=arguments.length>1?arguments[1]:void 0,t=[...arguments].slice(2);return Xc(e)?e.apply(void 0,t):q.apply(void 0,t)},_extend:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=function(n,r,i,a,o){var s,c,l;r._$instances=r._$instances||{};var u=$._getConfig(i,a),d=r._$instances[e]||{},f=qc(d)?Q(Q({},t),t?.methods):{};r._$instances[e]=Q(Q({},d),{},{$name:e,$host:r,$binding:i,$modifiers:i?.modifiers,$value:i?.value,$el:d.$el||r||void 0,$style:Q({classes:void 0,inlineStyles:void 0,load:function(){},loadCSS:function(){},loadStyle:function(){}},t?.style),$primevueConfig:u,$attrSelector:(s=r.$pd)==null||(s=s[e])==null?void 0:s.attrSelector,defaultPT:function(){return $._getPT(u?.pt,void 0,function(t){var n;return t==null||(n=t.directives)==null?void 0:n[e]})},isUnstyled:function(){var t,n;return((t=r._$instances[e])==null||(t=t.$binding)==null||(t=t.value)==null?void 0:t.unstyled)===void 0?u?.unstyled:(n=r._$instances[e])==null||(n=n.$binding)==null||(n=n.value)==null?void 0:n.unstyled},theme:function(){var t;return(t=r._$instances[e])==null||(t=t.$primevueConfig)==null?void 0:t.theme},preset:function(){var t;return(t=r._$instances[e])==null||(t=t.$binding)==null||(t=t.value)==null?void 0:t.dt},ptm:function(){var t,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return $._getPTValue(r._$instances[e],(t=r._$instances[e])==null||(t=t.$binding)==null||(t=t.value)==null?void 0:t.pt,n,Q({},i))},ptmo:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:``,i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return $._getPTValue(r._$instances[e],t,n,i,!1)},cx:function(){var t,n,i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return(t=r._$instances[e])!=null&&t.isUnstyled()?void 0:$._getOptionValue((n=r._$instances[e])==null||(n=n.$style)==null?void 0:n.classes,i,Q({},a))},sx:function(){var t,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:``,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return i?$._getOptionValue((t=r._$instances[e])==null||(t=t.$style)==null?void 0:t.inlineStyles,n,Q({},a)):void 0}},f),r.$instance=r._$instances[e],(c=(l=r.$instance)[n])==null||c.call(l,r,i,a,o),r[`\$${e}`]=r.$instance,$._hook(e,n,r,i,a,o),r.$pd||={},r.$pd[e]=Q(Q({},r.$pd?.[e]),{},{name:e,instance:r._$instances[e]})},r=function(t){var n,r,i,a=t._$instances[e],o=a?.watch,s=function(e){var t,n=e.newValue,r=e.oldValue;return o==null||(t=o.config)==null?void 0:t.call(a,n,r)},c=function(e){var t,n=e.newValue,r=e.oldValue;return o==null||(t=o[`config.ripple`])==null?void 0:t.call(a,n,r)};a.$watchersCallback={config:s,"config.ripple":c},o==null||(n=o.config)==null||n.call(a,a?.$primevueConfig),Qd.on(`config:change`,s),o==null||(r=o[`config.ripple`])==null||r.call(a,a==null||(i=a.$primevueConfig)==null?void 0:i.ripple),Qd.on(`config:ripple:change`,c)},i=function(t){var n=t._$instances[e].$watchersCallback;n&&(Qd.off(`config:change`,n.config),Qd.off(`config:ripple:change`,n[`config.ripple`]),t._$instances[e].$watchersCallback=void 0)};return{created:function(t,r,i,a){t.$pd||={},t.$pd[e]={name:e,attrSelector:nu(`pd`)},n(`created`,t,r,i,a)},beforeMount:function(t,i,a,o){$._loadStyles(t.$pd[e]?.instance,i,a),n(`beforeMount`,t,i,a,o),r(t)},mounted:function(t,r,i,a){$._loadStyles(t.$pd[e]?.instance,r,i),n(`mounted`,t,r,i,a)},beforeUpdate:function(e,t,r,i){n(`beforeUpdate`,e,t,r,i)},updated:function(t,r,i,a){$._loadStyles(t.$pd[e]?.instance,r,i),n(`updated`,t,r,i,a)},beforeUnmount:function(t,r,a,o){i(t),$._removeThemeListeners(t.$pd[e]?.instance),n(`beforeUnmount`,t,r,a,o)},unmounted:function(t,r,i,a){var o;(o=t.$pd[e])==null||(o=o.instance)==null||(o=o.scopedStyleEl)==null||(o=o.value)==null||o.remove(),n(`unmounted`,t,r,i,a)}}},extend:function(){var e=ef($._getMeta.apply($,arguments),2),t=e[0],n=e[1];return Q({extend:function(){var e=ef($._getMeta.apply($,arguments),2),t=e[0],r=e[1];return $.extend(t,Q(Q(Q({},n),n?.methods),r))}},$._extend(t,n))}},df=X.extend({name:`ripple-directive`,style:`
    .p-ink {
        display: block;
        position: absolute;
        background: dt('ripple.background');
        border-radius: 100%;
        transform: scale(0);
        pointer-events: none;
    }

    .p-ink-active {
        animation: ripple 0.4s linear;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`,classes:{root:`p-ink`}}),ff=$.extend({style:df});function pf(e){"@babel/helpers - typeof";return pf=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},pf(e)}function mf(e){return vf(e)||_f(e)||gf(e)||hf()}function hf(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function gf(e,t){if(e){if(typeof e==`string`)return yf(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?yf(e,t):void 0}}function _f(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function vf(e){if(Array.isArray(e))return yf(e)}function yf(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function bf(e,t,n){return(t=xf(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function xf(e){var t=Sf(e,`string`);return pf(t)==`symbol`?t:t+``}function Sf(e,t){if(pf(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(pf(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Cf=ff.extend(`ripple`,{watch:{"config.ripple":function(e){e?(this.createRipple(this.$host),this.bindEvents(this.$host),this.$host.setAttribute(`data-pd-ripple`,!0),this.$host.style.overflow=`hidden`,this.$host.style.position=`relative`):(this.remove(this.$host),this.$host.removeAttribute(`data-pd-ripple`))}},unmounted:function(e){this.remove(e)},timeout:void 0,methods:{bindEvents:function(e){e.addEventListener(`mousedown`,this.onMouseDown.bind(this))},unbindEvents:function(e){e.removeEventListener(`mousedown`,this.onMouseDown.bind(this))},createRipple:function(e){var t=this.getInk(e);t||(t=Il(`span`,bf(bf({role:`presentation`,"aria-hidden":!0,"data-p-ink":!0,"data-p-ink-active":!1,class:!this.isUnstyled()&&this.cx(`root`),onAnimationEnd:this.onAnimationEnd.bind(this)},this.$attrSelector,``),`p-bind`,this.ptm(`root`))),e.appendChild(t),this.$el=t)},remove:function(e){var t=this.getInk(e);t&&(this.$host.style.overflow=``,this.$host.style.position=``,this.unbindEvents(e),t.removeEventListener(`animationend`,this.onAnimationEnd),t.remove())},onMouseDown:function(e){var t=this,n=e.currentTarget,r=this.getInk(n);if(!(!r||getComputedStyle(r,null).display===`none`)){if(!this.isUnstyled()&&bl(r,`p-ink-active`),r.setAttribute(`data-p-ink-active`,`false`),!Ul(r)&&!Yl(r)){var i=Math.max(Al(n),Kl(n));r.style.height=i+`px`,r.style.width=i+`px`}var a=Gl(n),o=e.pageX-a.left+document.body.scrollTop-Yl(r)/2,s=e.pageY-a.top+document.body.scrollLeft-Ul(r)/2;r.style.top=s+`px`,r.style.left=o+`px`,!this.isUnstyled()&&yl(r,`p-ink-active`),r.setAttribute(`data-p-ink-active`,`true`),this.timeout=setTimeout(function(){r&&(!t.isUnstyled()&&bl(r,`p-ink-active`),r.setAttribute(`data-p-ink-active`,`false`))},401)}},onAnimationEnd:function(e){this.timeout&&clearTimeout(this.timeout),!this.isUnstyled()&&bl(e.currentTarget,`p-ink-active`),e.currentTarget.setAttribute(`data-p-ink-active`,`false`)},getInk:function(e){return e&&e.children?mf(e.children).find(function(e){return Bl(e,`data-pc-name`)===`ripple`}):void 0}}}),wf={name:`TabList`,extends:{name:`BaseTabList`,extends:wd,props:{},style:X.extend({name:`tablist`,classes:{root:`p-tablist`,content:`p-tablist-content p-tablist-viewport`,tabList:`p-tablist-tab-list`,activeBar:`p-tablist-active-bar`,prevButton:`p-tablist-prev-button p-tablist-nav-button`,nextButton:`p-tablist-next-button p-tablist-nav-button`}}),provide:function(){return{$pcTabList:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcTabs`],data:function(){return{isPrevButtonEnabled:!1,isNextButtonEnabled:!0}},resizeObserver:void 0,inkBarObserver:void 0,watch:{showNavigators:function(e){e?this.bindResizeObserver():this.unbindResizeObserver()},activeValue:{flush:`post`,handler:function(){this.updateInkBar(),this.bindInkBarObserver()}}},mounted:function(){var e=this;setTimeout(function(){e.updateInkBar(),e.bindInkBarObserver()},150),this.showNavigators&&(this.updateButtonState(),this.bindResizeObserver())},updated:function(){this.showNavigators&&this.updateButtonState()},beforeUnmount:function(){this.unbindResizeObserver(),this.unbindInkBarObserver()},methods:{onScroll:function(e){this.showNavigators&&this.updateButtonState(),e.preventDefault()},onPrevButtonClick:function(){var e=this.$refs.content,t=this.getVisibleButtonWidths(),n=Yl(e)-t,r=Math.abs(e.scrollLeft)-n*.8,i=Math.max(r,0);e.scrollLeft=Dl(e)?-1*i:i},onNextButtonClick:function(){var e=this.$refs.content,t=this.getVisibleButtonWidths(),n=Yl(e)-t,r=Math.abs(e.scrollLeft)+n*.8,i=e.scrollWidth-n,a=Math.min(r,i);e.scrollLeft=Dl(e)?-1*a:a},bindResizeObserver:function(){var e=this;this.resizeObserver=new ResizeObserver(function(){return e.updateButtonState()}),this.resizeObserver.observe(this.$refs.list)},unbindResizeObserver:function(){var e;(e=this.resizeObserver)==null||e.unobserve(this.$refs.list),this.resizeObserver=void 0},bindInkBarObserver:function(){var e=this;this.unbindInkBarObserver();var t=this.$refs.content,n=Rl(t,`[data-pc-name="tab"][data-p-active="true"]`);n&&(this.inkBarObserver=new ResizeObserver(function(){return e.updateInkBar()}),this.inkBarObserver.observe(n))},unbindInkBarObserver:function(){var e;(e=this.inkBarObserver)==null||e.disconnect(),this.inkBarObserver=void 0},updateInkBar:function(){var e=this.$refs,t=e.content,n=e.inkbar,r=e.tabs;if(n){var i=Rl(t,`[data-pc-name="tab"][data-p-active="true"]`);this.$pcTabs.isVertical()?(n.style.height=Kl(i)+`px`,n.style.top=Gl(i).top-Gl(r).top+`px`):(n.style.width=Al(i)+`px`,n.style.left=Gl(i).left-Gl(r).left+`px`)}},updateButtonState:function(){var e=this.$refs,t=e.list,n=e.content,r=n.scrollTop,i=n.scrollWidth,a=n.scrollHeight,o=n.offsetWidth,s=n.offsetHeight,c=Math.abs(n.scrollLeft),l=[Yl(n),Ul(n)],u=l[0],d=l[1];this.$pcTabs.isVertical()?(this.isPrevButtonEnabled=r!==0,this.isNextButtonEnabled=t.offsetHeight>=s&&parseInt(r)!==a-d):(this.isPrevButtonEnabled=c!==0,this.isNextButtonEnabled=t.offsetWidth>=o&&parseInt(c)!==i-u)},getVisibleButtonWidths:function(){var e=this.$refs,t=e.prevButton,n=e.nextButton,r=0;return this.showNavigators&&(r=(t?.offsetWidth||0)+(n?.offsetWidth||0)),r}},computed:{templates:function(){return this.$pcTabs.$slots},activeValue:function(){return this.$pcTabs.d_value},showNavigators:function(){return this.$pcTabs.showNavigators},prevButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.previous:void 0},nextButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.next:void 0},dataP:function(){return _l({scrollable:this.$pcTabs.scrollable})}},components:{ChevronLeftIcon:Id,ChevronRightIcon:Wd},directives:{ripple:Cf}},Tf=[`data-p`],Ef=[`aria-label`,`tabindex`],Df=[`data-p`],Of=[`aria-orientation`],kf=[`aria-label`,`tabindex`];function Af(e,t,n,r,i,a){var o=ii(`ripple`);return U(),W(`div`,q({ref:`list`,class:e.cx(`root`),"data-p":a.dataP},e.ptmi(`root`)),[a.showNavigators&&i.isPrevButtonEnabled?Vn((U(),W(`button`,q({key:0,ref:`prevButton`,type:`button`,class:e.cx(`prevButton`),"aria-label":a.prevButtonAriaLabel,tabindex:a.$pcTabs.tabindex,onClick:t[0]||=function(){return a.onPrevButtonClick&&a.onPrevButtonClick.apply(a,arguments)}},e.ptm(`prevButton`),{"data-pc-group-section":`navigator`}),[(U(),Ma(ri(a.templates.previcon||`ChevronLeftIcon`),q({"aria-hidden":`true`},e.ptm(`prevIcon`)),null,16))],16,Ef)),[[o]]):Va(``,!0),G(`div`,q({ref:`content`,class:e.cx(`content`),onScroll:t[1]||=function(){return a.onScroll&&a.onScroll.apply(a,arguments)},"data-p":a.dataP},e.ptm(`content`)),[G(`div`,q({ref:`tabs`,class:e.cx(`tabList`),role:`tablist`,"aria-orientation":a.$pcTabs.orientation||`horizontal`},e.ptm(`tabList`)),[V(e.$slots,`default`),G(`span`,q({ref:`inkbar`,class:e.cx(`activeBar`),role:`presentation`,"aria-hidden":`true`},e.ptm(`activeBar`)),null,16)],16,Of)],16,Df),a.showNavigators&&i.isNextButtonEnabled?Vn((U(),W(`button`,q({key:1,ref:`nextButton`,type:`button`,class:e.cx(`nextButton`),"aria-label":a.nextButtonAriaLabel,tabindex:a.$pcTabs.tabindex,onClick:t[2]||=function(){return a.onNextButtonClick&&a.onNextButtonClick.apply(a,arguments)}},e.ptm(`nextButton`),{"data-pc-group-section":`navigator`}),[(U(),Ma(ri(a.templates.nexticon||`ChevronRightIcon`),q({"aria-hidden":`true`},e.ptm(`nextIcon`)),null,16))],16,kf)),[[o]]):Va(``,!0)],16,Tf)}wf.render=Af;var jf=X.extend({name:`tab`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-tab`,{"p-tab-active":t.active,"p-disabled":n.disabled}]}}}),Mf={name:`Tab`,extends:{name:`BaseTab`,extends:wd,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},as:{type:[String,Object],default:`BUTTON`},asChild:{type:Boolean,default:!1}},style:jf,provide:function(){return{$pcTab:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcTabs`,`$pcTabList`],methods:{onFocus:function(){this.$pcTabs.selectOnFocus&&this.changeActiveValue()},onClick:function(){this.changeActiveValue()},onKeydown:function(e){switch(e.code){case`ArrowRight`:this.onArrowRightKey(e);break;case`ArrowLeft`:this.onArrowLeftKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`PageDown`:this.onPageDownKey(e);break;case`PageUp`:this.onPageUpKey(e);break;case`Enter`:case`NumpadEnter`:case`Space`:this.onEnterKey(e);break}},onArrowRightKey:function(e){var t=this.findNextTab(e.currentTarget);t?this.changeFocusedTab(e,t):this.onHomeKey(e),e.preventDefault()},onArrowLeftKey:function(e){var t=this.findPrevTab(e.currentTarget);t?this.changeFocusedTab(e,t):this.onEndKey(e),e.preventDefault()},onHomeKey:function(e){var t=this.findFirstTab();this.changeFocusedTab(e,t),e.preventDefault()},onEndKey:function(e){var t=this.findLastTab();this.changeFocusedTab(e,t),e.preventDefault()},onPageDownKey:function(e){this.scrollInView(this.findLastTab()),e.preventDefault()},onPageUpKey:function(e){this.scrollInView(this.findFirstTab()),e.preventDefault()},onEnterKey:function(e){this.changeActiveValue()},findNextTab:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1]?e:e.nextElementSibling;return t?Bl(t,`data-p-disabled`)||Bl(t,`data-pc-section`)===`activebar`?this.findNextTab(t):Rl(t,`[data-pc-name="tab"]`):null},findPrevTab:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1]?e:e.previousElementSibling;return t?Bl(t,`data-p-disabled`)||Bl(t,`data-pc-section`)===`activebar`?this.findPrevTab(t):Rl(t,`[data-pc-name="tab"]`):null},findFirstTab:function(){return this.findNextTab(this.$pcTabList.$refs.tabs.firstElementChild,!0)},findLastTab:function(){return this.findPrevTab(this.$pcTabList.$refs.tabs.lastElementChild,!0)},changeActiveValue:function(){this.$pcTabs.updateValue(this.value)},changeFocusedTab:function(e,t){zl(t),this.scrollInView(t)},scrollInView:function(e){var t;e==null||(t=e.scrollIntoView)==null||t.call(e,{block:`nearest`})}},computed:{active:function(){return Qc(this.$pcTabs?.d_value,this.value)},id:function(){return`${this.$pcTabs?.$id}_tab_${this.value}`},ariaControls:function(){return`${this.$pcTabs?.$id}_tabpanel_${this.value}`},attrs:function(){return q(this.asAttrs,this.a11yAttrs,this.ptmi(`root`,this.ptParams))},asAttrs:function(){return this.as===`BUTTON`?{type:`button`,disabled:this.disabled}:void 0},a11yAttrs:function(){return{id:this.id,tabindex:this.active?this.$pcTabs.tabindex:-1,role:`tab`,"aria-selected":this.active,"aria-controls":this.ariaControls,"data-pc-name":`tab`,"data-p-disabled":this.disabled,"data-p-active":this.active,onFocus:this.onFocus,onKeydown:this.onKeydown}},ptParams:function(){return{context:{active:this.active}}},dataP:function(){return _l({active:this.active})}},directives:{ripple:Cf}};function Nf(e,t,n,r,i,a){var o=ii(`ripple`);return e.asChild?V(e.$slots,`default`,{key:1,dataP:a.dataP,class:ve(e.cx(`root`)),active:a.active,a11yAttrs:a.a11yAttrs,onClick:a.onClick}):Vn((U(),Ma(ri(e.as),q({key:0,class:e.cx(`root`),"data-p":a.dataP,onClick:a.onClick},a.attrs),{default:Bn(function(){return[V(e.$slots,`default`)]}),_:3},16,[`class`,`data-p`,`onClick`])),[[o]])}Mf.render=Nf;var Pf={class:`example-layout mb-8`},Ff={class:`title-and-figure-col`},If={class:`text-lg`},Lf={key:0,class:`example-controls mt-4`},Rf={class:`min-h-56 p-3 text-center mt-4`,"aria-label":`figure preview`},zf={class:`code-col`},Bf={class:`code-block text-sm`},Vf=[`innerHTML`],Hf=Or({__name:`Example`,props:{name:{},figureFn:{type:Function},tsCode:{},rsCode:{},pyCode:{}},setup(e){Oc.registerLanguage(`typescript`,Rc),Oc.registerLanguage(`rust`,zc),Oc.registerLanguage(`python`,Bc);let t=e,n=pc(),r=en(null),i=en(null),a=en(null),o=ho(()=>n.preferredLang===`rust`?`language-rust`:n.preferredLang===`python`?`language-python`:`language-typescript`),s=ho(()=>n.preferredLang===`rust`?Oc.highlight(t.rsCode,{language:`rust`}).value:n.preferredLang===`python`?Oc.highlight(t.pyCode,{language:`python`}).value:Oc.highlight(t.tsCode,{language:`typescript`}).value);async function c(e,t,n){let o={style:n};if(t===`Canvas`&&r.value)try{await Ec(r.value,e,o)}catch(e){console.error(`Error rendering to canvas:`,e)}else if(t===`SVG`&&i.value)try{await wc(i.value,e,o)}catch(e){console.error(`Error rendering to SVG:`,e)}else if(t===`PNG`&&a.value)try{await Tc(a.value,e,o)}catch(e){console.error(`Error rendering to PNG:`,e)}else{console.warn(`No valid renderer or container found`);return}}return Jn(e=>{let r=!1;e(()=>{r=!0});let i=n.renderer,a=n.theme||`light`;Promise.resolve(t.figureFn()).then(e=>{if(!r)return c(e,i,a)}).catch(e=>{r||console.error(`Error building figure:`,e)})}),(e,c)=>(U(),W(`section`,Pf,[G(`div`,Ff,[G(`h2`,If,Ee(t.name),1),e.$slots.default?(U(),W(`div`,Lf,[V(e.$slots,`default`,{},void 0,!0)])):Va(``,!0),G(`div`,Rf,[Vn(G(`canvas`,{ref_key:`canvasEl`,ref:r,class:`mx-auto block max-w-full`},null,512),[[Yo,B(n).renderer===`Canvas`]]),Vn((U(),W(`svg`,{ref_key:`svgEl`,ref:i,class:`mx-auto block max-w-full`},null,512)),[[Yo,B(n).renderer===`SVG`]]),Vn(G(`img`,{ref_key:`imgEl`,ref:a,alt:`figure render`,class:`mx-auto block max-w-full`},null,512),[[Yo,B(n).renderer===`PNG`]])])]),G(`div`,zf,[K(B(Ed),{value:B(n).preferredLang,"onUpdate:value":c[0]||=e=>B(n).preferredLang=e},{default:Bn(()=>[K(B(wf),null,{default:Bn(()=>[K(B(Mf),{value:`typescript`},{default:Bn(()=>[...c[1]||=[Ba(`TypeScript`,-1)]]),_:1}),K(B(Mf),{value:`rust`},{default:Bn(()=>[...c[2]||=[Ba(`Rust`,-1)]]),_:1}),K(B(Mf),{value:`python`},{default:Bn(()=>[...c[3]||=[Ba(`Python`,-1)]]),_:1})]),_:1})]),_:1},8,[`value`]),G(`pre`,Bf,[G(`code`,{class:ve([`hljs`,o.value,`rounded-xl`]),innerHTML:s.value},null,10,Vf)])])]))}}),Uf=(e,t)=>{let n=e.__vccOpts||e;for(let[e,r]of t)n[e]=r;return n},Wf=Uf(Hf,[[`__scopeId`,`data-v-0b95133e`]]),Gf={name:`BaseEditableHolder`,extends:wd,emits:[`update:modelValue`,`value-change`],props:{modelValue:{type:null,default:void 0},defaultValue:{type:null,default:void 0},name:{type:String,default:void 0},invalid:{type:Boolean,default:void 0},disabled:{type:Boolean,default:!1},formControl:{type:Object,default:void 0}},inject:{$parentInstance:{default:void 0},$pcForm:{default:void 0},$pcFormField:{default:void 0}},data:function(){return{d_value:this.defaultValue===void 0?this.modelValue:this.defaultValue}},watch:{modelValue:{deep:!0,handler:function(e){this.d_value=e}},defaultValue:function(e){this.d_value=e},$formName:{immediate:!0,handler:function(e){var t,n;this.formField=((t=this.$pcForm)==null||(n=t.register)==null?void 0:n.call(t,e,this.$formControl))||{}}},$formControl:{immediate:!0,handler:function(e){var t,n;this.formField=((t=this.$pcForm)==null||(n=t.register)==null?void 0:n.call(t,this.$formName,e))||{}}},$formDefaultValue:{immediate:!0,handler:function(e){this.d_value!==e&&(this.d_value=e)}},$formValue:{immediate:!1,handler:function(e){var t;(t=this.$pcForm)!=null&&t.getFieldState(this.$formName)&&e!==this.d_value&&(this.d_value=e)}}},formField:{},methods:{writeValue:function(e,t){var n,r;this.controlled&&(this.d_value=e,this.$emit(`update:modelValue`,e)),this.$emit(`value-change`,e),(n=(r=this.formField).onChange)==null||n.call(r,{originalEvent:t,value:e})},findNonEmpty:function(){return[...arguments].find(J)}},computed:{$filled:function(){return J(this.d_value)},$invalid:function(){var e,t;return!this.$formNovalidate&&this.findNonEmpty(this.invalid,(e=this.$pcFormField)==null||(e=e.$field)==null?void 0:e.invalid,(t=this.$pcForm)==null||(t=t.getFieldState(this.$formName))==null?void 0:t.invalid)},$formName:function(){return this.$formNovalidate?void 0:this.name||this.$formControl?.name},$formControl:function(){return this.formControl||this.$pcFormField?.formControl},$formNovalidate:function(){return this.$formControl?.novalidate},$formDefaultValue:function(){var e;return this.findNonEmpty(this.d_value,this.$pcFormField?.initialValue,(e=this.$pcForm)==null||(e=e.initialValues)==null?void 0:e[this.$formName])},$formValue:function(){var e,t;return this.findNonEmpty((e=this.$pcFormField)==null||(e=e.$field)==null?void 0:e.value,(t=this.$pcForm)==null||(t=t.getFieldState(this.$formName))==null?void 0:t.value)},controlled:function(){return this.$inProps.hasOwnProperty(`modelValue`)||!this.$inProps.hasOwnProperty(`modelValue`)&&!this.$inProps.hasOwnProperty(`defaultValue`)},filled:function(){return this.$filled}}},Kf=X.extend({name:`togglebutton`,style:`
    .p-togglebutton {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        position: relative;
        color: dt('togglebutton.color');
        background: dt('togglebutton.background');
        border: 1px solid dt('togglebutton.border.color');
        padding: dt('togglebutton.padding');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
        border-radius: dt('togglebutton.border.radius');
        outline-color: transparent;
        font-weight: dt('togglebutton.font.weight');
    }

    .p-togglebutton-content {
        display: inline-flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        gap: dt('togglebutton.gap');
        padding: dt('togglebutton.content.padding');
        background: transparent;
        border-radius: dt('togglebutton.content.border.radius');
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
        background: dt('togglebutton.hover.background');
        color: dt('togglebutton.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked {
        background: dt('togglebutton.checked.background');
        border-color: dt('togglebutton.checked.border.color');
        color: dt('togglebutton.checked.color');
    }

    .p-togglebutton-checked .p-togglebutton-content {
        background: dt('togglebutton.content.checked.background');
        box-shadow: dt('togglebutton.content.checked.shadow');
    }

    .p-togglebutton:focus-visible {
        box-shadow: dt('togglebutton.focus.ring.shadow');
        outline: dt('togglebutton.focus.ring.width') dt('togglebutton.focus.ring.style') dt('togglebutton.focus.ring.color');
        outline-offset: dt('togglebutton.focus.ring.offset');
    }

    .p-togglebutton.p-invalid {
        border-color: dt('togglebutton.invalid.border.color');
    }

    .p-togglebutton:disabled {
        opacity: 1;
        cursor: default;
        background: dt('togglebutton.disabled.background');
        border-color: dt('togglebutton.disabled.border.color');
        color: dt('togglebutton.disabled.color');
    }

    .p-togglebutton-label,
    .p-togglebutton-icon {
        position: relative;
        transition: none;
    }

    .p-togglebutton-icon {
        color: dt('togglebutton.icon.color');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover .p-togglebutton-icon {
        color: dt('togglebutton.icon.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked .p-togglebutton-icon {
        color: dt('togglebutton.icon.checked.color');
    }

    .p-togglebutton:disabled .p-togglebutton-icon {
        color: dt('togglebutton.icon.disabled.color');
    }

    .p-togglebutton-sm {
        padding: dt('togglebutton.sm.padding');
        font-size: dt('togglebutton.sm.font.size');
    }

    .p-togglebutton-sm .p-togglebutton-content {
        padding: dt('togglebutton.content.sm.padding');
    }

    .p-togglebutton-lg {
        padding: dt('togglebutton.lg.padding');
        font-size: dt('togglebutton.lg.font.size');
    }

    .p-togglebutton-lg .p-togglebutton-content {
        padding: dt('togglebutton.content.lg.padding');
    }

    .p-togglebutton-fluid {
        width: 100%;
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-togglebutton p-component`,{"p-togglebutton-checked":t.active,"p-invalid":t.$invalid,"p-togglebutton-fluid":n.fluid,"p-togglebutton-sm p-inputfield-sm":n.size===`small`,"p-togglebutton-lg p-inputfield-lg":n.size===`large`}]},content:`p-togglebutton-content`,icon:`p-togglebutton-icon`,label:`p-togglebutton-label`}}),qf={name:`BaseToggleButton`,extends:Gf,props:{onIcon:String,offIcon:String,onLabel:{type:String,default:`Yes`},offLabel:{type:String,default:`No`},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null},size:{type:String,default:null},fluid:{type:Boolean,default:null}},style:Kf,provide:function(){return{$pcToggleButton:this,$parentInstance:this}}};function Jf(e){"@babel/helpers - typeof";return Jf=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Jf(e)}function Yf(e,t,n){return(t=Xf(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Xf(e){var t=Zf(e,`string`);return Jf(t)==`symbol`?t:t+``}function Zf(e,t){if(Jf(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(Jf(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Qf={name:`ToggleButton`,extends:qf,inheritAttrs:!1,emits:[`change`],methods:{getPTOptions:function(e){return(e===`root`?this.ptmi:this.ptm)(e,{context:{active:this.active,disabled:this.disabled}})},onChange:function(e){!this.disabled&&!this.readonly&&(this.writeValue(!this.d_value,e),this.$emit(`change`,e))},onBlur:function(e){var t,n;(t=(n=this.formField).onBlur)==null||t.call(n,e)}},computed:{active:function(){return this.d_value===!0},hasLabel:function(){return J(this.onLabel)&&J(this.offLabel)},label:function(){return this.hasLabel?this.d_value?this.onLabel:this.offLabel:`\xA0`},dataP:function(){return _l(Yf({checked:this.active,invalid:this.$invalid},this.size,this.size))}},directives:{ripple:Cf}},$f=[`tabindex`,`disabled`,`aria-pressed`,`aria-label`,`aria-labelledby`,`data-p-checked`,`data-p-disabled`,`data-p`],ep=[`data-p`];function tp(e,t,n,r,i,a){var o=ii(`ripple`);return Vn((U(),W(`button`,q({type:`button`,class:e.cx(`root`),tabindex:e.tabindex,disabled:e.disabled,"aria-pressed":e.d_value,onClick:t[0]||=function(){return a.onChange&&a.onChange.apply(a,arguments)},onBlur:t[1]||=function(){return a.onBlur&&a.onBlur.apply(a,arguments)}},a.getPTOptions(`root`),{"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,"data-p-checked":a.active,"data-p-disabled":e.disabled,"data-p":a.dataP}),[G(`span`,q({class:e.cx(`content`)},a.getPTOptions(`content`),{"data-p":a.dataP}),[V(e.$slots,`default`,{},function(){return[V(e.$slots,`icon`,{value:e.d_value,class:ve(e.cx(`icon`))},function(){return[e.onIcon||e.offIcon?(U(),W(`span`,q({key:0,class:[e.cx(`icon`),e.d_value?e.onIcon:e.offIcon]},a.getPTOptions(`icon`)),null,16)):Va(``,!0)]}),G(`span`,q({class:e.cx(`label`)},a.getPTOptions(`label`)),Ee(a.label),17)]})],16,ep)],16,$f)),[[o]])}Qf.render=tp;var np=X.extend({name:`selectbutton`,style:`
    .p-selectbutton {
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        outline-color: transparent;
        border-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton {
        border-radius: 0;
        border-width: 1px 1px 1px 0;
    }

    .p-selectbutton .p-togglebutton:focus-visible {
        position: relative;
        z-index: 1;
    }

    .p-selectbutton .p-togglebutton:first-child {
        border-inline-start-width: 1px;
        border-start-start-radius: dt('selectbutton.border.radius');
        border-end-start-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton:last-child {
        border-start-end-radius: dt('selectbutton.border.radius');
        border-end-end-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton.p-invalid {
        outline: 1px solid dt('selectbutton.invalid.border.color');
        outline-offset: 0;
    }

    .p-selectbutton-fluid {
        width: 100%;
    }
    
    .p-selectbutton-fluid .p-togglebutton {
        flex: 1 1 0;
    }
`,classes:{root:function(e){var t=e.props;return[`p-selectbutton p-component`,{"p-invalid":e.instance.$invalid,"p-selectbutton-fluid":t.fluid}]}}}),rp={name:`BaseSelectButton`,extends:Gf,props:{options:Array,optionLabel:null,optionValue:null,optionDisabled:null,multiple:Boolean,allowEmpty:{type:Boolean,default:!0},dataKey:null,ariaLabelledby:{type:String,default:null},size:{type:String,default:null},fluid:{type:Boolean,default:null}},style:np,provide:function(){return{$pcSelectButton:this,$parentInstance:this}}};function ip(e,t){var n=typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(!n){if(Array.isArray(e)||(n=sp(e))||t){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var a,o=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){s=!0,a=e},f:function(){try{o||n.return==null||n.return()}finally{if(s)throw a}}}}function ap(e){return lp(e)||cp(e)||sp(e)||op()}function op(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function sp(e,t){if(e){if(typeof e==`string`)return up(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?up(e,t):void 0}}function cp(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function lp(e){if(Array.isArray(e))return up(e)}function up(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var dp={name:`SelectButton`,extends:rp,inheritAttrs:!1,emits:[`change`],methods:{getOptionLabel:function(e){return this.optionLabel?Zc(e,this.optionLabel):e},getOptionValue:function(e){return this.optionValue?Zc(e,this.optionValue):e},getOptionRenderKey:function(e){return this.dataKey?Zc(e,this.dataKey):this.getOptionLabel(e)},isOptionDisabled:function(e){return this.optionDisabled?Zc(e,this.optionDisabled):!1},isOptionReadonly:function(e){if(this.allowEmpty)return!1;var t=this.isSelected(e);return this.multiple?t&&this.d_value.length===1:t},onOptionSelect:function(e,t,n){var r=this;if(!(this.disabled||this.isOptionDisabled(t)||this.isOptionReadonly(t))){var i=this.isSelected(t),a=this.getOptionValue(t),o;if(this.multiple)if(i){if(o=this.d_value.filter(function(e){return!Qc(e,a,r.equalityKey)}),!this.allowEmpty&&o.length===0)return}else o=this.d_value?[].concat(ap(this.d_value),[a]):[a];else{if(i&&!this.allowEmpty)return;o=i?null:a}this.writeValue(o,e),this.$emit(`change`,{originalEvent:e,value:o})}},isSelected:function(e){var t=!1,n=this.getOptionValue(e);if(this.multiple){if(this.d_value){var r=ip(this.d_value),i;try{for(r.s();!(i=r.n()).done;){var a=i.value;if(Qc(a,n,this.equalityKey)){t=!0;break}}}catch(e){r.e(e)}finally{r.f()}}}else t=Qc(this.d_value,n,this.equalityKey);return t}},computed:{equalityKey:function(){return this.optionValue?null:this.dataKey},dataP:function(){return _l({invalid:this.$invalid})}},directives:{ripple:Cf},components:{ToggleButton:Qf}},fp=[`aria-labelledby`,`data-p`];function pp(e,t,n,r,i,a){var o=ti(`ToggleButton`);return U(),W(`div`,q({class:e.cx(`root`),role:`group`,"aria-labelledby":e.ariaLabelledby},e.ptmi(`root`),{"data-p":a.dataP}),[(U(!0),W(H,null,si(e.options,function(t,n){return U(),Ma(o,{key:a.getOptionRenderKey(t),modelValue:a.isSelected(t),onLabel:a.getOptionLabel(t),offLabel:a.getOptionLabel(t),disabled:e.disabled||a.isOptionDisabled(t),unstyled:e.unstyled,size:e.size,readonly:a.isOptionReadonly(t),onChange:function(e){return a.onOptionSelect(e,t,n)},pt:e.ptm(`pcToggleButton`)},ci({_:2},[e.$slots.option?{name:`default`,fn:Bn(function(){return[V(e.$slots,`option`,{option:t,index:n},function(){return[G(`span`,q({ref_for:!0},e.ptm(`pcToggleButton`).label),Ee(a.getOptionLabel(t)),17)]})]}),key:`0`}:void 0]),1032,[`modelValue`,`onLabel`,`offLabel`,`disabled`,`unstyled`,`size`,`readonly`,`onChange`,`pt`])}),128))],16,fp)}dp.render=pp;var mp={STARTS_WITH:`startsWith`,CONTAINS:`contains`,NOT_CONTAINS:`notContains`,ENDS_WITH:`endsWith`,EQUALS:`equals`,NOT_EQUALS:`notEquals`,IN:`in`,LESS_THAN:`lt`,LESS_THAN_OR_EQUAL_TO:`lte`,GREATER_THAN:`gt`,GREATER_THAN_OR_EQUAL_TO:`gte`,BETWEEN:`between`,DATE_IS:`dateIs`,DATE_IS_NOT:`dateIsNot`,DATE_BEFORE:`dateBefore`,DATE_AFTER:`dateAfter`};function hp(e,t){var n=typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(!n){if(Array.isArray(e)||(n=gp(e))||t){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var a,o=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){s=!0,a=e},f:function(){try{o||n.return==null||n.return()}finally{if(s)throw a}}}}function gp(e,t){if(e){if(typeof e==`string`)return _p(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_p(e,t):void 0}}function _p(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var vp={filter:function(e,t,n,r,i){var a=[];if(!e)return a;var o=hp(e),s;try{for(o.s();!(s=o.n()).done;){var c=s.value;if(typeof c==`string`){if(this.filters[r](c,n,i)){a.push(c);continue}}else{var l=hp(t),u;try{for(l.s();!(u=l.n()).done;){var d=u.value,f=Zc(c,d);if(this.filters[r](f,n,i)){a.push(c);break}}}catch(e){l.e(e)}finally{l.f()}}}}catch(e){o.e(e)}finally{o.f()}return a},filters:{startsWith:function(e,t,n){if(t==null||t===``)return!0;if(e==null)return!1;var r=pl(t.toString()).toLocaleLowerCase(n);return pl(e.toString()).toLocaleLowerCase(n).slice(0,r.length)===r},contains:function(e,t,n){if(t==null||t===``)return!0;if(e==null)return!1;var r=pl(t.toString()).toLocaleLowerCase(n);return pl(e.toString()).toLocaleLowerCase(n).indexOf(r)!==-1},notContains:function(e,t,n){if(t==null||t===``)return!0;if(e==null)return!1;var r=pl(t.toString()).toLocaleLowerCase(n);return pl(e.toString()).toLocaleLowerCase(n).indexOf(r)===-1},endsWith:function(e,t,n){if(t==null||t===``)return!0;if(e==null)return!1;var r=pl(t.toString()).toLocaleLowerCase(n),i=pl(e.toString()).toLocaleLowerCase(n);return i.indexOf(r,i.length-r.length)!==-1},equals:function(e,t,n){return t==null||t===``?!0:e==null?!1:e.getTime&&t.getTime?e.getTime()===t.getTime():pl(e.toString()).toLocaleLowerCase(n)==pl(t.toString()).toLocaleLowerCase(n)},notEquals:function(e,t,n){return t==null||t===``?!1:e==null?!0:e.getTime&&t.getTime?e.getTime()!==t.getTime():pl(e.toString()).toLocaleLowerCase(n)!=pl(t.toString()).toLocaleLowerCase(n)},in:function(e,t){if(t==null||t.length===0)return!0;for(var n=0;n<t.length;n++)if(Qc(e,t[n]))return!0;return!1},between:function(e,t){return t==null||t[0]==null||t[1]==null?!0:e==null?!1:e.getTime?t[0].getTime()<=e.getTime()&&e.getTime()<=t[1].getTime():t[0]<=e&&e<=t[1]},lt:function(e,t){return t==null?!0:e==null?!1:e.getTime&&t.getTime?e.getTime()<t.getTime():e<t},lte:function(e,t){return t==null?!0:e==null?!1:e.getTime&&t.getTime?e.getTime()<=t.getTime():e<=t},gt:function(e,t){return t==null?!0:e==null?!1:e.getTime&&t.getTime?e.getTime()>t.getTime():e>t},gte:function(e,t){return t==null?!0:e==null?!1:e.getTime&&t.getTime?e.getTime()>=t.getTime():e>=t},dateIs:function(e,t){return t==null?!0:e==null?!1:(typeof e==`string`&&(e=new Date(e)),typeof t==`string`&&(t=new Date(t)),e.toDateString()===t.toDateString())},dateIsNot:function(e,t){return t==null?!0:e==null?!1:(typeof e==`string`&&(e=new Date(e)),typeof t==`string`&&(t=new Date(t)),e.toDateString()!==t.toDateString())},dateBefore:function(e,t){return t==null?!0:e==null?!1:(typeof e==`string`&&(e=new Date(e)),typeof t==`string`&&(t=new Date(t)),e.getTime()<t.getTime())},dateAfter:function(e,t){return t==null?!0:e==null?!1:(typeof e==`string`&&(e=new Date(e)),typeof t==`string`&&(t=new Date(t)),e.getTime()>t.getTime())}},register:function(e,t){this.filters[e]=t}};function yp(e){"@babel/helpers - typeof";return yp=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},yp(e)}function bp(e,t){if(!(e instanceof t))throw TypeError(`Cannot call a class as a function`)}function xp(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&&(r.writable=!0),Object.defineProperty(e,Cp(r.key),r)}}function Sp(e,t,n){return t&&xp(e.prototype,t),Object.defineProperty(e,`prototype`,{writable:!1}),e}function Cp(e){var t=wp(e,`string`);return yp(t)==`symbol`?t:t+``}function wp(e,t){if(yp(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(yp(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return String(e)}var Tp=function(){function e(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:function(){};bp(this,e),this.element=t,this.listener=n}return Sp(e,[{key:`bindScrollListener`,value:function(){this.scrollableParents=Jl(this.element);for(var e=0;e<this.scrollableParents.length;e++)this.scrollableParents[e].addEventListener(`scroll`,this.listener)}},{key:`unbindScrollListener`,value:function(){if(this.scrollableParents)for(var e=0;e<this.scrollableParents.length;e++)this.scrollableParents[e].removeEventListener(`scroll`,this.listener)}},{key:`destroy`,value:function(){this.unbindScrollListener(),this.element=null,this.listener=null,this.scrollableParents=null}}])}(),Ep={name:`BlankIcon`,extends:Fd};function Dp(e){return jp(e)||Ap(e)||kp(e)||Op()}function Op(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function kp(e,t){if(e){if(typeof e==`string`)return Mp(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Mp(e,t):void 0}}function Ap(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function jp(e){if(Array.isArray(e))return Mp(e)}function Mp(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Np(e,t,n,r,i,a){return U(),W(`svg`,q({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),Dp(t[0]||=[G(`rect`,{width:`1`,height:`1`,fill:`currentColor`,"fill-opacity":`0`},null,-1)]),16)}Ep.render=Np;var Pp={name:`CheckIcon`,extends:Fd};function Fp(e){return zp(e)||Rp(e)||Lp(e)||Ip()}function Ip(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Lp(e,t){if(e){if(typeof e==`string`)return Bp(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Bp(e,t):void 0}}function Rp(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function zp(e){if(Array.isArray(e))return Bp(e)}function Bp(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Vp(e,t,n,r,i,a){return U(),W(`svg`,q({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),Fp(t[0]||=[G(`path`,{d:`M4.86199 11.5948C4.78717 11.5923 4.71366 11.5745 4.64596 11.5426C4.57826 11.5107 4.51779 11.4652 4.46827 11.4091L0.753985 7.69483C0.683167 7.64891 0.623706 7.58751 0.580092 7.51525C0.536478 7.44299 0.509851 7.36177 0.502221 7.27771C0.49459 7.19366 0.506156 7.10897 0.536046 7.03004C0.565935 6.95111 0.613367 6.88 0.674759 6.82208C0.736151 6.76416 0.8099 6.72095 0.890436 6.69571C0.970973 6.67046 1.05619 6.66385 1.13966 6.67635C1.22313 6.68886 1.30266 6.72017 1.37226 6.76792C1.44186 6.81567 1.4997 6.8786 1.54141 6.95197L4.86199 10.2503L12.6397 2.49483C12.7444 2.42694 12.8689 2.39617 12.9932 2.40745C13.1174 2.41873 13.2343 2.47141 13.3251 2.55705C13.4159 2.64268 13.4753 2.75632 13.4938 2.87973C13.5123 3.00315 13.4888 3.1292 13.4271 3.23768L5.2557 11.4091C5.20618 11.4652 5.14571 11.5107 5.07801 11.5426C5.01031 11.5745 4.9368 11.5923 4.86199 11.5948Z`,fill:`currentColor`},null,-1)]),16)}Pp.render=Vp;var Hp={name:`ChevronDownIcon`,extends:Fd};function Up(e){return qp(e)||Kp(e)||Gp(e)||Wp()}function Wp(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Gp(e,t){if(e){if(typeof e==`string`)return Jp(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Jp(e,t):void 0}}function Kp(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function qp(e){if(Array.isArray(e))return Jp(e)}function Jp(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Yp(e,t,n,r,i,a){return U(),W(`svg`,q({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),Up(t[0]||=[G(`path`,{d:`M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z`,fill:`currentColor`},null,-1)]),16)}Hp.render=Yp;var Xp={name:`SearchIcon`,extends:Fd};function Zp(e){return tm(e)||em(e)||$p(e)||Qp()}function Qp(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function $p(e,t){if(e){if(typeof e==`string`)return nm(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?nm(e,t):void 0}}function em(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function tm(e){if(Array.isArray(e))return nm(e)}function nm(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function rm(e,t,n,r,i,a){return U(),W(`svg`,q({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),Zp(t[0]||=[G(`path`,{"fill-rule":`evenodd`,"clip-rule":`evenodd`,d:`M2.67602 11.0265C3.6661 11.688 4.83011 12.0411 6.02086 12.0411C6.81149 12.0411 7.59438 11.8854 8.32483 11.5828C8.87005 11.357 9.37808 11.0526 9.83317 10.6803L12.9769 13.8241C13.0323 13.8801 13.0983 13.9245 13.171 13.9548C13.2438 13.985 13.3219 14.0003 13.4007 14C13.4795 14.0003 13.5575 13.985 13.6303 13.9548C13.7031 13.9245 13.7691 13.8801 13.8244 13.8241C13.9367 13.7116 13.9998 13.5592 13.9998 13.4003C13.9998 13.2414 13.9367 13.089 13.8244 12.9765L10.6807 9.8328C11.053 9.37773 11.3573 8.86972 11.5831 8.32452C11.8857 7.59408 12.0414 6.81119 12.0414 6.02056C12.0414 4.8298 11.6883 3.66579 11.0268 2.67572C10.3652 1.68564 9.42494 0.913972 8.32483 0.45829C7.22472 0.00260857 6.01418 -0.116618 4.84631 0.115686C3.67844 0.34799 2.60568 0.921393 1.76369 1.76338C0.921698 2.60537 0.348296 3.67813 0.115991 4.84601C-0.116313 6.01388 0.00291375 7.22441 0.458595 8.32452C0.914277 9.42464 1.68595 10.3649 2.67602 11.0265ZM3.35565 2.0158C4.14456 1.48867 5.07206 1.20731 6.02086 1.20731C7.29317 1.20731 8.51338 1.71274 9.41304 2.6124C10.3127 3.51206 10.8181 4.73226 10.8181 6.00457C10.8181 6.95337 10.5368 7.88088 10.0096 8.66978C9.48251 9.45868 8.73328 10.0736 7.85669 10.4367C6.98011 10.7997 6.01554 10.8947 5.08496 10.7096C4.15439 10.5245 3.2996 10.0676 2.62869 9.39674C1.95778 8.72583 1.50089 7.87104 1.31579 6.94046C1.13068 6.00989 1.22568 5.04532 1.58878 4.16874C1.95187 3.29215 2.56675 2.54292 3.35565 2.0158Z`,fill:`currentColor`},null,-1)]),16)}Xp.render=rm;var im={name:`SpinnerIcon`,extends:Fd};function am(e){return lm(e)||cm(e)||sm(e)||om()}function om(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function sm(e,t){if(e){if(typeof e==`string`)return um(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?um(e,t):void 0}}function cm(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function lm(e){if(Array.isArray(e))return um(e)}function um(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function dm(e,t,n,r,i,a){return U(),W(`svg`,q({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),am(t[0]||=[G(`path`,{d:`M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z`,fill:`currentColor`},null,-1)]),16)}im.render=dm;var fm={name:`TimesIcon`,extends:Fd};function pm(e){return _m(e)||gm(e)||hm(e)||mm()}function mm(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function hm(e,t){if(e){if(typeof e==`string`)return vm(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?vm(e,t):void 0}}function gm(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function _m(e){if(Array.isArray(e))return vm(e)}function vm(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function ym(e,t,n,r,i,a){return U(),W(`svg`,q({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),pm(t[0]||=[G(`path`,{d:`M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z`,fill:`currentColor`},null,-1)]),16)}fm.render=ym;var bm={name:`IconField`,extends:{name:`BaseIconField`,extends:wd,style:X.extend({name:`iconfield`,style:`
    .p-iconfield {
        position: relative;
        display: block;
    }

    .p-inputicon {
        position: absolute;
        top: 50%;
        margin-top: calc(-1 * (dt('icon.size') / 2));
        color: dt('iconfield.icon.color');
        line-height: 1;
        z-index: 1;
    }

    .p-iconfield .p-inputicon:first-child {
        inset-inline-start: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputicon:last-child {
        inset-inline-end: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputtext:not(:first-child),
    .p-iconfield .p-inputwrapper:not(:first-child) .p-inputtext {
        padding-inline-start: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield .p-inputtext:not(:last-child) {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield:has(.p-inputfield-sm) .p-inputicon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
        margin-top: calc(-1 * (dt('form.field.sm.font.size') / 2));
    }

    .p-iconfield:has(.p-inputfield-lg) .p-inputicon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
        margin-top: calc(-1 * (dt('form.field.lg.font.size') / 2));
    }
`,classes:{root:`p-iconfield`}}),provide:function(){return{$pcIconField:this,$parentInstance:this}}},inheritAttrs:!1};function xm(e,t,n,r,i,a){return U(),W(`div`,q({class:e.cx(`root`)},e.ptmi(`root`)),[V(e.$slots,`default`)],16)}bm.render=xm;var Sm={name:`InputIcon`,extends:{name:`BaseInputIcon`,extends:wd,style:X.extend({name:`inputicon`,classes:{root:`p-inputicon`}}),props:{class:null},provide:function(){return{$pcInputIcon:this,$parentInstance:this}}},inheritAttrs:!1,computed:{containerClass:function(){return[this.cx(`root`),this.class]}}};function Cm(e,t,n,r,i,a){return U(),W(`span`,q({class:a.containerClass},e.ptmi(`root`),{"aria-hidden":`true`}),[V(e.$slots,`default`)],16)}Sm.render=Cm;var wm={name:`BaseInput`,extends:Gf,props:{size:{type:String,default:null},fluid:{type:Boolean,default:null},variant:{type:String,default:null}},inject:{$parentInstance:{default:void 0},$pcFluid:{default:void 0}},computed:{$variant:function(){return this.variant??(this.$primevue.config.inputStyle||this.$primevue.config.inputVariant)},$fluid:function(){return this.fluid??!!this.$pcFluid},hasFluid:function(){return this.$fluid}}},Tm={name:`BaseInputText`,extends:wm,style:X.extend({name:`inputtext`,style:`
    .p-inputtext {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('inputtext.color');
        background: dt('inputtext.background');
        padding-block: dt('inputtext.padding.y');
        padding-inline: dt('inputtext.padding.x');
        border: 1px solid dt('inputtext.border.color');
        transition:
            background dt('inputtext.transition.duration'),
            color dt('inputtext.transition.duration'),
            border-color dt('inputtext.transition.duration'),
            outline-color dt('inputtext.transition.duration'),
            box-shadow dt('inputtext.transition.duration');
        appearance: none;
        border-radius: dt('inputtext.border.radius');
        outline-color: transparent;
        box-shadow: dt('inputtext.shadow');
    }

    .p-inputtext:enabled:hover {
        border-color: dt('inputtext.hover.border.color');
    }

    .p-inputtext:enabled:focus {
        border-color: dt('inputtext.focus.border.color');
        box-shadow: dt('inputtext.focus.ring.shadow');
        outline: dt('inputtext.focus.ring.width') dt('inputtext.focus.ring.style') dt('inputtext.focus.ring.color');
        outline-offset: dt('inputtext.focus.ring.offset');
    }

    .p-inputtext.p-invalid {
        border-color: dt('inputtext.invalid.border.color');
    }

    .p-inputtext.p-variant-filled {
        background: dt('inputtext.filled.background');
    }

    .p-inputtext.p-variant-filled:enabled:hover {
        background: dt('inputtext.filled.hover.background');
    }

    .p-inputtext.p-variant-filled:enabled:focus {
        background: dt('inputtext.filled.focus.background');
    }

    .p-inputtext:disabled {
        opacity: 1;
        background: dt('inputtext.disabled.background');
        color: dt('inputtext.disabled.color');
    }

    .p-inputtext::placeholder {
        color: dt('inputtext.placeholder.color');
    }

    .p-inputtext.p-invalid::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }

    .p-inputtext-sm {
        font-size: dt('inputtext.sm.font.size');
        padding-block: dt('inputtext.sm.padding.y');
        padding-inline: dt('inputtext.sm.padding.x');
    }

    .p-inputtext-lg {
        font-size: dt('inputtext.lg.font.size');
        padding-block: dt('inputtext.lg.padding.y');
        padding-inline: dt('inputtext.lg.padding.x');
    }

    .p-inputtext-fluid {
        width: 100%;
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-inputtext p-component`,{"p-filled":t.$filled,"p-inputtext-sm p-inputfield-sm":n.size===`small`,"p-inputtext-lg p-inputfield-lg":n.size===`large`,"p-invalid":t.$invalid,"p-variant-filled":t.$variant===`filled`,"p-inputtext-fluid":t.$fluid}]}}}),provide:function(){return{$pcInputText:this,$parentInstance:this}}};function Em(e){"@babel/helpers - typeof";return Em=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Em(e)}function Dm(e,t,n){return(t=Om(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Om(e){var t=km(e,`string`);return Em(t)==`symbol`?t:t+``}function km(e,t){if(Em(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(Em(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Am={name:`InputText`,extends:Tm,inheritAttrs:!1,methods:{onInput:function(e){this.writeValue(e.target.value,e)}},computed:{attrs:function(){return q(this.ptmi(`root`,{context:{filled:this.$filled,disabled:this.disabled}}),this.formField)},dataP:function(){return _l(Dm({invalid:this.$invalid,fluid:this.$fluid,filled:this.$variant===`filled`},this.size,this.size))}}},jm=[`value`,`name`,`disabled`,`aria-invalid`,`data-p`];function Mm(e,t,n,r,i,a){return U(),W(`input`,q({type:`text`,class:e.cx(`root`),value:e.d_value,name:e.name,disabled:e.disabled,"aria-invalid":e.$invalid||void 0,"data-p":a.dataP,onInput:t[0]||=function(){return a.onInput&&a.onInput.apply(a,arguments)}},a.attrs),null,16,jm)}Am.render=Mm;var Nm=gl(),Pm={name:`Portal`,props:{appendTo:{type:[String,Object],default:`body`},disabled:{type:Boolean,default:!1}},data:function(){return{mounted:!1}},mounted:function(){this.mounted=Zl()},computed:{inline:function(){return this.disabled||this.appendTo===`self`}}};function Fm(e,t,n,r,i,a){return a.inline?V(e.$slots,`default`,{key:0}):i.mounted?(U(),Ma(ur,{key:1,to:n.appendTo},[V(e.$slots,`default`)],8,[`to`])):Va(``,!0)}Pm.render=Fm;var Im=X.extend({name:`virtualscroller`,css:`
.p-virtualscroller {
    position: relative;
    overflow: auto;
    contain: strict;
    transform: translateZ(0);
    will-change: scroll-position;
    outline: 0 none;
}

.p-virtualscroller-content {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    min-width: 100%;
    will-change: transform;
}

.p-virtualscroller-spacer {
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    width: 1px;
    transform-origin: 0 0;
    pointer-events: none;
}

.p-virtualscroller-loader {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.p-virtualscroller-loader-mask {
    display: flex;
    align-items: center;
    justify-content: center;
}

.p-virtualscroller-horizontal > .p-virtualscroller-content {
    display: flex;
}

.p-virtualscroller-inline .p-virtualscroller-content {
    position: static;
}

.p-virtualscroller .p-virtualscroller-loading {
    transform: none !important;
    min-height: 0;
    position: sticky;
    inset-block-start: 0;
    inset-inline-start: 0;
}
`,style:`
    .p-virtualscroller-loader {
        background: dt('virtualscroller.loader.mask.background');
        color: dt('virtualscroller.loader.mask.color');
    }

    .p-virtualscroller-loading-icon {
        font-size: dt('virtualscroller.loader.icon.size');
        width: dt('virtualscroller.loader.icon.size');
        height: dt('virtualscroller.loader.icon.size');
    }
`}),Lm={name:`BaseVirtualScroller`,extends:wd,props:{id:{type:String,default:null},style:null,class:null,items:{type:Array,default:null},itemSize:{type:[Number,Array],default:0},scrollHeight:null,scrollWidth:null,orientation:{type:String,default:`vertical`},numToleratedItems:{type:Number,default:null},delay:{type:Number,default:0},resizeDelay:{type:Number,default:10},lazy:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},loaderDisabled:{type:Boolean,default:!1},columns:{type:Array,default:null},loading:{type:Boolean,default:!1},showSpacer:{type:Boolean,default:!0},showLoader:{type:Boolean,default:!1},tabindex:{type:Number,default:0},inline:{type:Boolean,default:!1},step:{type:Number,default:0},appendOnly:{type:Boolean,default:!1},autoSize:{type:Boolean,default:!1}},style:Im,provide:function(){return{$pcVirtualScroller:this,$parentInstance:this}},beforeMount:function(){var e;Im.loadCSS({nonce:(e=this.$primevueConfig)==null||(e=e.csp)==null?void 0:e.nonce})}};function Rm(e){"@babel/helpers - typeof";return Rm=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Rm(e)}function zm(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Bm(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?zm(Object(n),!0).forEach(function(t){Vm(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):zm(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function Vm(e,t,n){return(t=Hm(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Hm(e){var t=Um(e,`string`);return Rm(t)==`symbol`?t:t+``}function Um(e,t){if(Rm(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(Rm(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Wm={name:`VirtualScroller`,extends:Lm,inheritAttrs:!1,emits:[`update:numToleratedItems`,`scroll`,`scroll-index-change`,`lazy-load`],data:function(){var e=this.isBoth();return{first:e?{rows:0,cols:0}:0,last:e?{rows:0,cols:0}:0,page:e?{rows:0,cols:0}:0,numItemsInViewport:e?{rows:0,cols:0}:0,lastScrollPos:e?{top:0,left:0}:0,d_numToleratedItems:this.numToleratedItems,d_loading:this.loading,loaderArr:[],spacerStyle:{},contentStyle:{}}},element:null,content:null,lastScrollPos:null,scrollTimeout:null,resizeTimeout:null,defaultWidth:0,defaultHeight:0,defaultContentWidth:0,defaultContentHeight:0,isRangeChanged:!1,lazyLoadState:{},resizeListener:null,resizeObserver:null,initialized:!1,watch:{numToleratedItems:function(e){this.d_numToleratedItems=e},loading:function(e,t){this.lazy&&e!==t&&e!==this.d_loading&&(this.d_loading=e)},items:{handler:function(e,t){(!t||t.length!==(e||[]).length)&&(this.init(),this.calculateAutoSize())},deep:!0},itemSize:function(){this.init(),this.calculateAutoSize()},orientation:function(){this.lastScrollPos=this.isBoth()?{top:0,left:0}:0},scrollHeight:function(){this.init(),this.calculateAutoSize()},scrollWidth:function(){this.init(),this.calculateAutoSize()}},mounted:function(){this.viewInit(),this.lastScrollPos=this.isBoth()?{top:0,left:0}:0,this.lazyLoadState=this.lazyLoadState||{}},updated:function(){!this.initialized&&this.viewInit()},unmounted:function(){this.unbindResizeListener(),this.initialized=!1},methods:{viewInit:function(){Ql(this.element)&&(this.setContentEl(this.content),this.init(),this.calculateAutoSize(),this.defaultWidth=Yl(this.element),this.defaultHeight=Ul(this.element),this.defaultContentWidth=Yl(this.content),this.defaultContentHeight=Ul(this.content),this.initialized=!0),this.element&&this.bindResizeListener()},init:function(){this.disabled||(this.setSize(),this.calculateOptions(),this.setSpacerSize())},isVertical:function(){return this.orientation===`vertical`},isHorizontal:function(){return this.orientation===`horizontal`},isBoth:function(){return this.orientation===`both`},scrollTo:function(e){this.element&&this.element.scrollTo(e)},scrollToIndex:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:`auto`,r=this.isBoth(),i=this.isHorizontal();if(r?e.every(function(e){return e>-1}):e>-1){var a=this.first,o=this.element,s=o.scrollTop,c=s===void 0?0:s,l=o.scrollLeft,u=l===void 0?0:l,d=this.calculateNumItems().numToleratedItems,f=this.getContentPosition(),p=this.itemSize,m=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0;return e<=(arguments.length>1?arguments[1]:void 0)?0:e},h=function(e,t,n){return e*t+n},g=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return t.scrollTo({left:e,top:r,behavior:n})},_=r?{rows:0,cols:0}:0,v=!1,y=!1;r?(_={rows:m(e[0],d[0]),cols:m(e[1],d[1])},g(h(_.cols,p[1],f.left),h(_.rows,p[0],f.top)),y=this.lastScrollPos.top!==c||this.lastScrollPos.left!==u,v=_.rows!==a.rows||_.cols!==a.cols):(_=m(e,d),i?g(h(_,p,f.left),c):g(u,h(_,p,f.top)),y=this.lastScrollPos!==(i?u:c),v=_!==a),this.isRangeChanged=v,y&&(this.first=_)}},scrollInView:function(e,t){var n=this,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:`auto`;if(t){var i=this.isBoth(),a=this.isHorizontal();if(i?e.every(function(e){return e>-1}):e>-1){var o=this.getRenderedRange(),s=o.first,c=o.viewport,l=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return n.scrollTo({left:e,top:t,behavior:r})},u=t===`to-start`,d=t===`to-end`;if(u){if(i)c.first.rows-s.rows>e[0]?l(c.first.cols*this.itemSize[1],(c.first.rows-1)*this.itemSize[0]):c.first.cols-s.cols>e[1]&&l((c.first.cols-1)*this.itemSize[1],c.first.rows*this.itemSize[0]);else if(c.first-s>e){var f=(c.first-1)*this.itemSize;a?l(f,0):l(0,f)}}else if(d){if(i)c.last.rows-s.rows<=e[0]+1?l(c.first.cols*this.itemSize[1],(c.first.rows+1)*this.itemSize[0]):c.last.cols-s.cols<=e[1]+1&&l((c.first.cols+1)*this.itemSize[1],c.first.rows*this.itemSize[0]);else if(c.last-s<=e+1){var p=(c.first+1)*this.itemSize;a?l(p,0):l(0,p)}}}}else this.scrollToIndex(e,r)},getRenderedRange:function(){var e=function(e,t){return Math.floor(e/(t||e))},t=this.first,n=0;if(this.element){var r=this.isBoth(),i=this.isHorizontal(),a=this.element,o=a.scrollTop,s=a.scrollLeft;r?(t={rows:e(o,this.itemSize[0]),cols:e(s,this.itemSize[1])},n={rows:t.rows+this.numItemsInViewport.rows,cols:t.cols+this.numItemsInViewport.cols}):(t=e(i?s:o,this.itemSize),n=t+this.numItemsInViewport)}return{first:this.first,last:this.last,viewport:{first:t,last:n}}},calculateNumItems:function(){var e=this.isBoth(),t=this.isHorizontal(),n=this.itemSize,r=this.getContentPosition(),i=this.element?this.element.offsetWidth-r.left:0,a=this.element?this.element.offsetHeight-r.top:0,o=function(e,t){return Math.ceil(e/(t||e))},s=function(e){return Math.ceil(e/2)},c=e?{rows:o(a,n[0]),cols:o(i,n[1])}:o(t?i:a,n);return{numItemsInViewport:c,numToleratedItems:this.d_numToleratedItems||(e?[s(c.rows),s(c.cols)]:s(c))}},calculateOptions:function(){var e=this,t=this.isBoth(),n=this.first,r=this.calculateNumItems(),i=r.numItemsInViewport,a=r.numToleratedItems,o=function(t,n,r){var i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1;return e.getLast(t+n+(t<r?2:3)*r,i)},s=t?{rows:o(n.rows,i.rows,a[0]),cols:o(n.cols,i.cols,a[1],!0)}:o(n,i,a);this.last=s,this.numItemsInViewport=i,this.d_numToleratedItems=a,this.$emit(`update:numToleratedItems`,this.d_numToleratedItems),this.showLoader&&(this.loaderArr=t?Array.from({length:i.rows}).map(function(){return Array.from({length:i.cols})}):Array.from({length:i})),this.lazy&&Promise.resolve().then(function(){e.lazyLoadState={first:e.step?t?{rows:0,cols:n.cols}:0:n,last:Math.min(e.step?e.step:s,e.items?.length||0)},e.$emit(`lazy-load`,e.lazyLoadState)})},calculateAutoSize:function(){var e=this;this.autoSize&&!this.d_loading&&Promise.resolve().then(function(){if(e.content){var t=e.isBoth(),n=e.isHorizontal(),r=e.isVertical();e.content.style.minHeight=e.content.style.minWidth=`auto`,e.content.style.position=`relative`,e.element.style.contain=`none`;var i=[Yl(e.element),Ul(e.element)],a=i[0],o=i[1];(t||n)&&(e.element.style.width=a<e.defaultWidth?a+`px`:e.scrollWidth||e.defaultWidth+`px`),(t||r)&&(e.element.style.height=o<e.defaultHeight?o+`px`:e.scrollHeight||e.defaultHeight+`px`),e.content.style.minHeight=e.content.style.minWidth=``,e.content.style.position=``,e.element.style.contain=``}})},getLast:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;return this.items?Math.min(t?(this.columns||this.items[0])?.length||0:this.items?.length||0,e):0},getContentPosition:function(){if(this.content){var e=getComputedStyle(this.content),t=parseFloat(e.paddingLeft)+Math.max(parseFloat(e.left)||0,0),n=parseFloat(e.paddingRight)+Math.max(parseFloat(e.right)||0,0),r=parseFloat(e.paddingTop)+Math.max(parseFloat(e.top)||0,0),i=parseFloat(e.paddingBottom)+Math.max(parseFloat(e.bottom)||0,0);return{left:t,right:n,top:r,bottom:i,x:t+n,y:r+i}}return{left:0,right:0,top:0,bottom:0,x:0,y:0}},setSize:function(){var e=this;if(this.element){var t=this.isBoth(),n=this.isHorizontal(),r=this.element.parentElement,i=this.scrollWidth||`${this.element.offsetWidth||r.offsetWidth}px`,a=this.scrollHeight||`${this.element.offsetHeight||r.offsetHeight}px`,o=function(t,n){return e.element.style[t]=n};t||n?(o(`height`,a),o(`width`,i)):o(`height`,a)}},setSpacerSize:function(){var e=this,t=this.items;if(t){var n=this.isBoth(),r=this.isHorizontal(),i=this.getContentPosition(),a=function(t,n,r){var i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0;return e.spacerStyle=Bm(Bm({},e.spacerStyle),Vm({},`${t}`,(n||[]).length*r+i+`px`))};n?(a(`height`,t,this.itemSize[0],i.y),a(`width`,this.columns||t[1],this.itemSize[1],i.x)):r?a(`width`,this.columns||t,this.itemSize,i.x):a(`height`,t,this.itemSize,i.y)}},setContentPosition:function(e){var t=this;if(this.content&&!this.appendOnly){var n=this.isBoth(),r=this.isHorizontal(),i=e?e.first:this.first,a=function(e,t){return e*t},o=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return t.contentStyle=Bm(Bm({},t.contentStyle),{transform:`translate3d(${e}px, ${n}px, 0)`})};if(n)o(a(i.cols,this.itemSize[1]),a(i.rows,this.itemSize[0]));else{var s=a(i,this.itemSize);r?o(s,0):o(0,s)}}},onScrollPositionChange:function(e){var t=this,n=e.target,r=this.isBoth(),i=this.isHorizontal(),a=this.getContentPosition(),o=function(e,t){return e?e>t?e-t:e:0},s=function(e,t){return Math.floor(e/(t||e))},c=function(e,t,n,r,i,a){return e<=i?i:a?n-r-i:t+i-1},l=function(e,n,r,i,a,o,s,c){if(e<=o)return 0;var l=Math.max(0,s?e<n?r:e-o:e>n?r:e-2*o),u=t.getLast(l,c);return l>u?u-a:l},u=function(e,n,r,i,a,o){var s=n+i+2*a;return e>=a&&(s+=a+1),t.getLast(s,o)},d=o(n.scrollTop,a.top),f=o(n.scrollLeft,a.left),p=r?{rows:0,cols:0}:0,m=this.last,h=!1,g=this.lastScrollPos;if(r){var _=this.lastScrollPos.top<=d,v=this.lastScrollPos.left<=f;if(!this.appendOnly||this.appendOnly&&(_||v)){var y={rows:s(d,this.itemSize[0]),cols:s(f,this.itemSize[1])},b={rows:c(y.rows,this.first.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0],_),cols:c(y.cols,this.first.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],v)};p={rows:l(y.rows,b.rows,this.first.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0],_),cols:l(y.cols,b.cols,this.first.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],v,!0)},m={rows:u(y.rows,p.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0]),cols:u(y.cols,p.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],!0)},h=p.rows!==this.first.rows||m.rows!==this.last.rows||p.cols!==this.first.cols||m.cols!==this.last.cols||this.isRangeChanged,g={top:d,left:f}}}else{var x=i?f:d,S=this.lastScrollPos<=x;if(!this.appendOnly||this.appendOnly&&S){var C=s(x,this.itemSize);p=l(C,c(C,this.first,this.last,this.numItemsInViewport,this.d_numToleratedItems,S),this.first,this.last,this.numItemsInViewport,this.d_numToleratedItems,S),m=u(C,p,this.last,this.numItemsInViewport,this.d_numToleratedItems),h=p!==this.first||m!==this.last||this.isRangeChanged,g=x}}return{first:p,last:m,isRangeChanged:h,scrollPos:g}},onScrollChange:function(e){var t=this.onScrollPositionChange(e),n=t.first,r=t.last,i=t.isRangeChanged,a=t.scrollPos;if(i){var o={first:n,last:r};if(this.setContentPosition(o),this.first=n,this.last=r,this.lastScrollPos=a,this.$emit(`scroll-index-change`,o),this.lazy&&this.isPageChanged(n)){var s={first:this.step?Math.min(this.getPageByFirst(n)*this.step,(this.items?.length||0)-this.step):n,last:Math.min(this.step?(this.getPageByFirst(n)+1)*this.step:r,this.items?.length||0)};(this.lazyLoadState.first!==s.first||this.lazyLoadState.last!==s.last)&&this.$emit(`lazy-load`,s),this.lazyLoadState=s}}},onScroll:function(e){var t=this;this.$emit(`scroll`,e),this.delay?(this.scrollTimeout&&clearTimeout(this.scrollTimeout),this.isPageChanged()&&(!this.d_loading&&this.showLoader&&(this.onScrollPositionChange(e).isRangeChanged||this.step&&this.isPageChanged())&&(this.d_loading=!0),this.scrollTimeout=setTimeout(function(){t.onScrollChange(e),t.d_loading&&t.showLoader&&(!t.lazy||t.loading===void 0)&&(t.d_loading=!1,t.page=t.getPageByFirst())},this.delay))):this.onScrollChange(e)},onResize:function(){var e=this;this.resizeTimeout&&clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(function(){if(Ql(e.element)){var t=e.isBoth(),n=e.isVertical(),r=e.isHorizontal(),i=[Yl(e.element),Ul(e.element)],a=i[0],o=i[1],s=a!==e.defaultWidth,c=o!==e.defaultHeight;(t?s||c:r?s:n&&c)&&(e.d_numToleratedItems=e.numToleratedItems,e.defaultWidth=a,e.defaultHeight=o,e.defaultContentWidth=Yl(e.content),e.defaultContentHeight=Ul(e.content),e.init())}},this.resizeDelay)},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=this.onResize.bind(this),window.addEventListener(`resize`,this.resizeListener),window.addEventListener(`orientationchange`,this.resizeListener),this.resizeObserver=new ResizeObserver(function(){e.onResize()}),this.resizeObserver.observe(this.element))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),window.removeEventListener(`orientationchange`,this.resizeListener),null),this.resizeObserver&&=(this.resizeObserver.disconnect(),null)},getOptions:function(e){var t=(this.items||[]).length,n=this.isBoth()?this.first.rows+e:this.first+e;return{index:n,count:t,first:n===0,last:n===t-1,even:n%2==0,odd:n%2!=0}},getLoaderOptions:function(e,t){var n=this.loaderArr.length;return Bm({index:e,count:n,first:e===0,last:e===n-1,even:e%2==0,odd:e%2!=0},t)},getPageByFirst:function(e){return Math.floor(((e??this.first)+this.d_numToleratedItems*4)/(this.step||1))},isPageChanged:function(e){return this.step&&!this.lazy?this.page!==this.getPageByFirst(e??this.first):!0},setContentEl:function(e){this.content=e||this.content||Rl(this.element,`[data-pc-section="content"]`)},elementRef:function(e){this.element=e},contentRef:function(e){this.content=e}},computed:{containerClass:function(){return[`p-virtualscroller`,this.class,{"p-virtualscroller-inline":this.inline,"p-virtualscroller-both p-both-scroll":this.isBoth(),"p-virtualscroller-horizontal p-horizontal-scroll":this.isHorizontal()}]},contentClass:function(){return[`p-virtualscroller-content`,{"p-virtualscroller-loading":this.d_loading}]},loaderClass:function(){return[`p-virtualscroller-loader`,{"p-virtualscroller-loader-mask":!this.$slots.loader}]},loadedItems:function(){var e=this;return this.items&&!this.d_loading?this.isBoth()?this.items.slice(this.appendOnly?0:this.first.rows,this.last.rows).map(function(t){return e.columns?t:t.slice(e.appendOnly?0:e.first.cols,e.last.cols)}):this.isHorizontal()&&this.columns?this.items:this.items.slice(this.appendOnly?0:this.first,this.last):[]},loadedRows:function(){return this.d_loading?this.loaderDisabled?this.loaderArr:[]:this.loadedItems},loadedColumns:function(){if(this.columns){var e=this.isBoth(),t=this.isHorizontal();if(e||t)return this.d_loading&&this.loaderDisabled?e?this.loaderArr[0]:this.loaderArr:this.columns.slice(e?this.first.cols:this.first,e?this.last.cols:this.last)}return this.columns}},components:{SpinnerIcon:im}},Gm=[`tabindex`];function Km(e,t,n,r,i,a){var o=ti(`SpinnerIcon`);return e.disabled?(U(),W(H,{key:1},[V(e.$slots,`default`),V(e.$slots,`content`,{items:e.items,rows:e.items,columns:a.loadedColumns})],64)):(U(),W(`div`,q({key:0,ref:a.elementRef,class:a.containerClass,tabindex:e.tabindex,style:e.style,onScroll:t[0]||=function(){return a.onScroll&&a.onScroll.apply(a,arguments)}},e.ptmi(`root`)),[V(e.$slots,`content`,{styleClass:a.contentClass,items:a.loadedItems,getItemOptions:a.getOptions,loading:i.d_loading,getLoaderOptions:a.getLoaderOptions,itemSize:e.itemSize,rows:a.loadedRows,columns:a.loadedColumns,contentRef:a.contentRef,spacerStyle:i.spacerStyle,contentStyle:i.contentStyle,vertical:a.isVertical(),horizontal:a.isHorizontal(),both:a.isBoth()},function(){return[G(`div`,q({ref:a.contentRef,class:a.contentClass,style:i.contentStyle},e.ptm(`content`)),[(U(!0),W(H,null,si(a.loadedItems,function(t,n){return V(e.$slots,`item`,{key:n,item:t,options:a.getOptions(n)})}),128))],16)]}),e.showSpacer?(U(),W(`div`,q({key:0,class:`p-virtualscroller-spacer`,style:i.spacerStyle},e.ptm(`spacer`)),null,16)):Va(``,!0),!e.loaderDisabled&&e.showLoader&&i.d_loading?(U(),W(`div`,q({key:1,class:a.loaderClass},e.ptm(`loader`)),[e.$slots&&e.$slots.loader?(U(!0),W(H,{key:0},si(i.loaderArr,function(t,n){return V(e.$slots,`loader`,{key:n,options:a.getLoaderOptions(n,a.isBoth()&&{numCols:e.d_numItemsInViewport.cols})})}),128)):Va(``,!0),V(e.$slots,`loadingicon`,{},function(){return[K(o,q({spin:``,class:`p-virtualscroller-loading-icon`},e.ptm(`loadingIcon`)),null,16)]})],16)):Va(``,!0)],16,Gm))}Wm.render=Km;var qm=X.extend({name:`select`,style:`
    .p-select {
        display: inline-flex;
        cursor: pointer;
        position: relative;
        user-select: none;
        background: dt('select.background');
        border: 1px solid dt('select.border.color');
        transition:
            background dt('select.transition.duration'),
            color dt('select.transition.duration'),
            border-color dt('select.transition.duration'),
            outline-color dt('select.transition.duration'),
            box-shadow dt('select.transition.duration');
        border-radius: dt('select.border.radius');
        outline-color: transparent;
        box-shadow: dt('select.shadow');
    }

    .p-select:not(.p-disabled):hover {
        border-color: dt('select.hover.border.color');
    }

    .p-select:not(.p-disabled).p-focus {
        border-color: dt('select.focus.border.color');
        box-shadow: dt('select.focus.ring.shadow');
        outline: dt('select.focus.ring.width') dt('select.focus.ring.style') dt('select.focus.ring.color');
        outline-offset: dt('select.focus.ring.offset');
    }

    .p-select.p-variant-filled {
        background: dt('select.filled.background');
    }

    .p-select.p-variant-filled:not(.p-disabled):hover {
        background: dt('select.filled.hover.background');
    }

    .p-select.p-variant-filled:not(.p-disabled).p-focus {
        background: dt('select.filled.focus.background');
    }

    .p-select.p-invalid {
        border-color: dt('select.invalid.border.color');
    }

    .p-select.p-disabled {
        opacity: 1;
        background: dt('select.disabled.background');
    }

    .p-select-clear-icon {
        align-self: center;
        color: dt('select.clear.icon.color');
        inset-inline-end: dt('select.dropdown.width');
    }

    .p-select-dropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: transparent;
        color: dt('select.dropdown.color');
        width: dt('select.dropdown.width');
        border-start-end-radius: dt('select.border.radius');
        border-end-end-radius: dt('select.border.radius');
    }

    .p-select-label {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        flex: 1 1 auto;
        width: 1%;
        padding: dt('select.padding.y') dt('select.padding.x');
        text-overflow: ellipsis;
        cursor: pointer;
        color: dt('select.color');
        background: transparent;
        border: 0 none;
        outline: 0 none;
        font-size: 1rem;
    }

    .p-select-label.p-placeholder {
        color: dt('select.placeholder.color');
    }

    .p-select.p-invalid .p-select-label.p-placeholder {
        color: dt('select.invalid.placeholder.color');
    }

    .p-select.p-disabled .p-select-label {
        color: dt('select.disabled.color');
    }

    .p-select-label-empty {
        overflow: hidden;
        opacity: 0;
    }

    input.p-select-label {
        cursor: default;
    }

    .p-select-overlay {
        position: absolute;
        top: 0;
        left: 0;
        background: dt('select.overlay.background');
        color: dt('select.overlay.color');
        border: 1px solid dt('select.overlay.border.color');
        border-radius: dt('select.overlay.border.radius');
        box-shadow: dt('select.overlay.shadow');
        min-width: 100%;
        transform-origin: inherit;
        will-change: transform;
    }

    .p-select-header {
        padding: dt('select.list.header.padding');
    }

    .p-select-filter {
        width: 100%;
    }

    .p-select-list-container {
        overflow: auto;
    }

    .p-select-option-group {
        cursor: auto;
        margin: 0;
        padding: dt('select.option.group.padding');
        background: dt('select.option.group.background');
        color: dt('select.option.group.color');
        font-weight: dt('select.option.group.font.weight');
    }

    .p-select-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        padding: dt('select.list.padding');
        gap: dt('select.list.gap');
        display: flex;
        flex-direction: column;
    }

    .p-select-option {
        cursor: pointer;
        font-weight: normal;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        padding: dt('select.option.padding');
        border: 0 none;
        color: dt('select.option.color');
        background: transparent;
        transition:
            background dt('select.transition.duration'),
            color dt('select.transition.duration'),
            border-color dt('select.transition.duration'),
            box-shadow dt('select.transition.duration'),
            outline-color dt('select.transition.duration');
        border-radius: dt('select.option.border.radius');
    }

    .p-select-option:not(.p-select-option-selected):not(.p-disabled).p-focus {
        background: dt('select.option.focus.background');
        color: dt('select.option.focus.color');
    }

    .p-select-option:not(.p-select-option-selected):not(.p-disabled):hover {
        background: dt('select.option.focus.background');
        color: dt('select.option.focus.color');
    }

    .p-select-option.p-select-option-selected {
        background: dt('select.option.selected.background');
        color: dt('select.option.selected.color');
    }

    .p-select-option.p-select-option-selected.p-focus {
        background: dt('select.option.selected.focus.background');
        color: dt('select.option.selected.focus.color');
    }
   
    .p-select-option-blank-icon {
        flex-shrink: 0;
    }

    .p-select-option-check-icon {
        position: relative;
        flex-shrink: 0;
        margin-inline-start: dt('select.checkmark.gutter.start');
        margin-inline-end: dt('select.checkmark.gutter.end');
        color: dt('select.checkmark.color');
    }

    .p-select-empty-message {
        padding: dt('select.empty.message.padding');
    }

    .p-select-fluid {
        display: flex;
        width: 100%;
    }

    .p-select-sm .p-select-label {
        font-size: dt('select.sm.font.size');
        padding-block: dt('select.sm.padding.y');
        padding-inline: dt('select.sm.padding.x');
    }

    .p-select-sm .p-select-dropdown .p-icon {
        font-size: dt('select.sm.font.size');
        width: dt('select.sm.font.size');
        height: dt('select.sm.font.size');
    }

    .p-select-lg .p-select-label {
        font-size: dt('select.lg.font.size');
        padding-block: dt('select.lg.padding.y');
        padding-inline: dt('select.lg.padding.x');
    }

    .p-select-lg .p-select-dropdown .p-icon {
        font-size: dt('select.lg.font.size');
        width: dt('select.lg.font.size');
        height: dt('select.lg.font.size');
    }

    .p-floatlabel-in .p-select-filter {
        padding-block-start: dt('select.padding.y');
        padding-block-end: dt('select.padding.y');
    }
`,classes:{root:function(e){var t=e.instance,n=e.props,r=e.state;return[`p-select p-component p-inputwrapper`,{"p-disabled":n.disabled,"p-invalid":t.$invalid,"p-variant-filled":t.$variant===`filled`,"p-focus":r.focused,"p-inputwrapper-filled":t.$filled,"p-inputwrapper-focus":r.focused||r.overlayVisible,"p-select-open":r.overlayVisible,"p-select-fluid":t.$fluid,"p-select-sm p-inputfield-sm":n.size===`small`,"p-select-lg p-inputfield-lg":n.size===`large`}]},label:function(e){var t=e.instance,n=e.props;return[`p-select-label`,{"p-placeholder":!n.editable&&t.label===n.placeholder,"p-select-label-empty":!n.editable&&!t.$slots.value&&(t.label===`p-emptylabel`||t.label?.length===0)}]},clearIcon:`p-select-clear-icon`,dropdown:`p-select-dropdown`,loadingicon:`p-select-loading-icon`,dropdownIcon:`p-select-dropdown-icon`,overlay:`p-select-overlay p-component`,header:`p-select-header`,pcFilter:`p-select-filter`,listContainer:`p-select-list-container`,list:`p-select-list`,optionGroup:`p-select-option-group`,optionGroupLabel:`p-select-option-group-label`,option:function(e){var t=e.instance,n=e.props,r=e.state,i=e.option,a=e.focusedOption;return[`p-select-option`,{"p-select-option-selected":t.isSelected(i)&&n.highlightOnSelect,"p-focus":r.focusedOptionIndex===a,"p-disabled":t.isOptionDisabled(i)}]},optionLabel:`p-select-option-label`,optionCheckIcon:`p-select-option-check-icon`,optionBlankIcon:`p-select-option-blank-icon`,emptyMessage:`p-select-empty-message`}}),Jm={name:`BaseSelect`,extends:wm,props:{options:Array,optionLabel:[String,Function],optionValue:[String,Function],optionDisabled:[String,Function],optionGroupLabel:[String,Function],optionGroupChildren:[String,Function],scrollHeight:{type:String,default:`14rem`},filter:Boolean,filterPlaceholder:String,filterLocale:String,filterMatchMode:{type:String,default:`contains`},filterFields:{type:Array,default:null},editable:Boolean,placeholder:{type:String,default:null},dataKey:null,showClear:{type:Boolean,default:!1},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},labelId:{type:String,default:null},labelClass:{type:[String,Object],default:null},labelStyle:{type:Object,default:null},panelClass:{type:[String,Object],default:null},overlayStyle:{type:Object,default:null},overlayClass:{type:[String,Object],default:null},panelStyle:{type:Object,default:null},appendTo:{type:[String,Object],default:`body`},loading:{type:Boolean,default:!1},clearIcon:{type:String,default:void 0},dropdownIcon:{type:String,default:void 0},filterIcon:{type:String,default:void 0},loadingIcon:{type:String,default:void 0},resetFilterOnHide:{type:Boolean,default:!1},resetFilterOnClear:{type:Boolean,default:!1},virtualScrollerOptions:{type:Object,default:null},autoOptionFocus:{type:Boolean,default:!1},autoFilterFocus:{type:Boolean,default:!1},selectOnFocus:{type:Boolean,default:!1},focusOnHover:{type:Boolean,default:!0},highlightOnSelect:{type:Boolean,default:!0},checkmark:{type:Boolean,default:!1},filterMessage:{type:String,default:null},selectionMessage:{type:String,default:null},emptySelectionMessage:{type:String,default:null},emptyFilterMessage:{type:String,default:null},emptyMessage:{type:String,default:null},tabindex:{type:Number,default:0},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},style:qm,provide:function(){return{$pcSelect:this,$parentInstance:this}}};function Ym(e){"@babel/helpers - typeof";return Ym=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Ym(e)}function Xm(e){return eh(e)||$m(e)||Qm(e)||Zm()}function Zm(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Qm(e,t){if(e){if(typeof e==`string`)return th(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?th(e,t):void 0}}function $m(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function eh(e){if(Array.isArray(e))return th(e)}function th(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function nh(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function rh(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?nh(Object(n),!0).forEach(function(t){ih(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):nh(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function ih(e,t,n){return(t=ah(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ah(e){var t=oh(e,`string`);return Ym(t)==`symbol`?t:t+``}function oh(e,t){if(Ym(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(Ym(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var sh={name:`Select`,extends:Jm,inheritAttrs:!1,emits:[`change`,`focus`,`blur`,`before-show`,`before-hide`,`show`,`hide`,`filter`],outsideClickListener:null,scrollHandler:null,resizeListener:null,labelClickListener:null,matchMediaOrientationListener:null,overlay:null,list:null,virtualScroller:null,searchTimeout:null,searchValue:null,isModelValueChanged:!1,data:function(){return{clicked:!1,focused:!1,focusedOptionIndex:-1,filterValue:null,overlayVisible:!1,queryOrientation:null}},watch:{modelValue:function(){this.isModelValueChanged=!0},options:function(){this.autoUpdateModel()}},mounted:function(){this.autoUpdateModel(),this.bindLabelClickListener(),this.bindMatchMediaOrientationListener()},updated:function(){this.overlayVisible&&this.isModelValueChanged&&this.scrollInView(this.findSelectedOptionIndex()),this.isModelValueChanged=!1},beforeUnmount:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindLabelClickListener(),this.unbindMatchMediaOrientationListener(),this.scrollHandler&&=(this.scrollHandler.destroy(),null),this.overlay&&=(iu.clear(this.overlay),null)},methods:{getOptionIndex:function(e,t){return this.virtualScrollerDisabled?e:t&&t(e).index},getOptionLabel:function(e){return this.optionLabel?Zc(e,this.optionLabel):e},getOptionValue:function(e){return this.optionValue?Zc(e,this.optionValue):e},getOptionRenderKey:function(e,t){return(this.dataKey?Zc(e,this.dataKey):this.getOptionLabel(e))+`_`+t},getPTItemOptions:function(e,t,n,r){return this.ptm(r,{context:{option:e,index:n,selected:this.isSelected(e),focused:this.focusedOptionIndex===this.getOptionIndex(n,t),disabled:this.isOptionDisabled(e)}})},isOptionDisabled:function(e){return this.optionDisabled?Zc(e,this.optionDisabled):!1},isOptionGroup:function(e){return this.optionGroupLabel&&e.optionGroup&&e.group},getOptionGroupLabel:function(e){return Zc(e,this.optionGroupLabel)},getOptionGroupChildren:function(e){return Zc(e,this.optionGroupChildren)},getAriaPosInset:function(e){var t=this;return(this.optionGroupLabel?e-this.visibleOptions.slice(0,e).filter(function(e){return t.isOptionGroup(e)}).length:e)+1},show:function(e){this.$emit(`before-show`),this.overlayVisible=!0,this.focusedOptionIndex=this.focusedOptionIndex===-1?this.autoOptionFocus?this.findFirstFocusedOptionIndex():this.editable?-1:this.findSelectedOptionIndex():this.focusedOptionIndex,e&&zl(this.$refs.focusInput)},hide:function(e){var t=this,n=function(){t.$emit(`before-hide`),t.overlayVisible=!1,t.clicked=!1,t.focusedOptionIndex=-1,t.searchValue=``,t.resetFilterOnHide&&(t.filterValue=null),e&&zl(t.$refs.focusInput)};setTimeout(function(){n()},0)},onFocus:function(e){this.disabled||(this.focused=!0,this.overlayVisible&&(this.focusedOptionIndex=this.focusedOptionIndex===-1?this.autoOptionFocus?this.findFirstFocusedOptionIndex():this.editable?-1:this.findSelectedOptionIndex():this.focusedOptionIndex,this.scrollInView(this.focusedOptionIndex)),this.$emit(`focus`,e))},onBlur:function(e){var t=this;setTimeout(function(){var n,r;t.focused=!1,t.focusedOptionIndex=-1,t.searchValue=``,t.$emit(`blur`,e),(n=(r=t.formField).onBlur)==null||n.call(r,e)},100)},onKeyDown:function(e){var t=this;if(this.disabled){e.preventDefault();return}if(Xl())switch(e.code){case`Backspace`:this.onBackspaceKey(e,this.editable);break;case`Enter`:case`NumpadDecimal`:this.onEnterKey(e);break;default:e.preventDefault();return}var n=e.metaKey||e.ctrlKey;switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e,this.editable);break;case`ArrowLeft`:case`ArrowRight`:this.onArrowLeftKey(e,this.editable);break;case`Home`:this.onHomeKey(e,this.editable);break;case`End`:this.onEndKey(e,this.editable);break;case`PageDown`:this.onPageDownKey(e);break;case`PageUp`:this.onPageUpKey(e);break;case`Space`:this.onSpaceKey(e,this.editable);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Escape`:this.onEscapeKey(e);break;case`Tab`:this.onTabKey(e);break;case`Backspace`:this.onBackspaceKey(e,this.editable);break;case`ShiftLeft`:case`ShiftRight`:break;default:!n&&ll(e.key)&&(!this.overlayVisible&&this.show(),!this.editable&&this.searchOptions(e,e.key),this.filter&&this.$nextTick(function(){t.$refs.filterInput&&zl(t.$refs.filterInput.$el)}));break}this.clicked=!1},onEditableInput:function(e){var t=e.target.value;this.searchValue=``,!this.searchOptions(e,t)&&(this.focusedOptionIndex=-1),this.updateModel(e,t),!this.overlayVisible&&J(t)&&this.show()},onContainerClick:function(e){this.disabled||this.loading||e.target.tagName===`INPUT`||e.target.getAttribute(`data-pc-section`)===`clearicon`||e.target.closest(`[data-pc-section="clearicon"]`)||((!this.overlay||!this.overlay.contains(e.target))&&(this.overlayVisible?this.hide(!0):this.show(!0)),this.clicked=!0)},onClearClick:function(e){this.updateModel(e,null),this.resetFilterOnClear&&(this.filterValue=null)},onFirstHiddenFocus:function(e){zl(e.relatedTarget===this.$refs.focusInput?Hl(this.overlay,`:not([data-p-hidden-focusable="true"])`):this.$refs.focusInput)},onLastHiddenFocus:function(e){zl(e.relatedTarget===this.$refs.focusInput?Wl(this.overlay,`:not([data-p-hidden-focusable="true"])`):this.$refs.focusInput)},onOptionSelect:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0;if(this.overlayVisible){var r=this.getOptionValue(t);this.updateModel(e,r),n&&this.hide(!0)}},onOptionMouseMove:function(e,t){this.focusOnHover&&this.changeFocusedOptionIndex(e,t)},onFilterChange:function(e){var t=e.target.value;this.filterValue=t,this.focusedOptionIndex=-1,this.$emit(`filter`,{originalEvent:e,value:t}),!this.virtualScrollerDisabled&&this.virtualScroller.scrollToIndex(0)},onFilterKeyDown:function(e){if(!e.isComposing)switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e,!0);break;case`ArrowLeft`:case`ArrowRight`:this.onArrowLeftKey(e,!0);break;case`Home`:this.onHomeKey(e,!0);break;case`End`:this.onEndKey(e,!0);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Escape`:this.onEscapeKey(e);break;case`Tab`:this.onTabKey(e);break}},onFilterBlur:function(){this.focusedOptionIndex=-1},onFilterUpdated:function(){this.overlayVisible&&this.alignOverlay()},onOverlayClick:function(e){Nm.emit(`overlay-click`,{originalEvent:e,target:this.$el})},onOverlayKeyDown:function(e){switch(e.code){case`Escape`:this.onEscapeKey(e);break}},onArrowDownKey:function(e){if(!this.overlayVisible)this.show(),this.editable&&this.changeFocusedOptionIndex(e,this.findSelectedOptionIndex());else{var t=this.focusedOptionIndex===-1?this.clicked?this.findFirstOptionIndex():this.findFirstFocusedOptionIndex():this.findNextOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(e,t)}e.preventDefault()},onArrowUpKey:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(e.altKey&&!t)this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.overlayVisible&&this.hide(),e.preventDefault();else{var n=this.focusedOptionIndex===-1?this.clicked?this.findLastOptionIndex():this.findLastFocusedOptionIndex():this.findPrevOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(e,n),!this.overlayVisible&&this.show(),e.preventDefault()}},onArrowLeftKey:function(e){arguments.length>1&&arguments[1]!==void 0&&arguments[1]&&(this.focusedOptionIndex=-1)},onHomeKey:function(e){if(arguments.length>1&&arguments[1]!==void 0&&arguments[1]){var t=e.currentTarget;e.shiftKey?t.setSelectionRange(0,e.target.selectionStart):(t.setSelectionRange(0,0),this.focusedOptionIndex=-1)}else this.changeFocusedOptionIndex(e,this.findFirstOptionIndex()),!this.overlayVisible&&this.show();e.preventDefault()},onEndKey:function(e){if(arguments.length>1&&arguments[1]!==void 0&&arguments[1]){var t=e.currentTarget;if(e.shiftKey)t.setSelectionRange(e.target.selectionStart,t.value.length);else{var n=t.value.length;t.setSelectionRange(n,n),this.focusedOptionIndex=-1}}else this.changeFocusedOptionIndex(e,this.findLastOptionIndex()),!this.overlayVisible&&this.show();e.preventDefault()},onPageUpKey:function(e){this.scrollInView(0),e.preventDefault()},onPageDownKey:function(e){this.scrollInView(this.visibleOptions.length-1),e.preventDefault()},onEnterKey:function(e){this.overlayVisible?(this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.hide(!0)):(this.focusedOptionIndex=-1,this.onArrowDownKey(e)),e.preventDefault()},onSpaceKey:function(e){!(arguments.length>1&&arguments[1]!==void 0&&arguments[1])&&this.onEnterKey(e)},onEscapeKey:function(e){this.overlayVisible&&this.hide(!0),e.preventDefault(),e.stopPropagation()},onTabKey:function(e){arguments.length>1&&arguments[1]!==void 0&&arguments[1]||(this.overlayVisible&&this.hasFocusableElements()?(zl(this.$refs.firstHiddenFocusableElementOnOverlay),e.preventDefault()):(this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.overlayVisible&&this.hide(this.filter)))},onBackspaceKey:function(e){arguments.length>1&&arguments[1]!==void 0&&arguments[1]&&!this.overlayVisible&&this.show()},onOverlayEnter:function(e){var t=this;iu.set(`overlay`,e,this.$primevue.config.zIndex.overlay),kl(e,{position:`absolute`,top:`0`}),this.alignOverlay(),this.scrollInView(),this.$attrSelector&&e.setAttribute(this.$attrSelector,``),setTimeout(function(){t.autoFilterFocus&&t.filter&&zl(t.$refs.filterInput.$el),t.autoUpdateModel()},1)},onOverlayAfterEnter:function(){this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.$emit(`show`)},onOverlayLeave:function(e){var t=this;e.style.pointerEvents=`none`,this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.autoFilterFocus&&this.filter&&!this.editable&&this.$nextTick(function(){t.$refs.filterInput&&zl(t.$refs.filterInput.$el)}),this.$emit(`hide`),this.overlay=null},onOverlayAfterLeave:function(e){iu.clear(e)},alignOverlay:function(){this.appendTo===`self`?jl(this.overlay,this.$el):this.overlay&&(this.overlay.style.minWidth=Al(this.$el)+`px`,Ol(this.overlay,this.$el))},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){var n=t.composedPath();e.overlayVisible&&e.overlay&&!n.includes(e.$el)&&!n.includes(e.overlay)&&e.hide()},document.addEventListener(`click`,this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&=(document.removeEventListener(`click`,this.outsideClickListener,!0),null)},bindScrollListener:function(){var e=this;this.scrollHandler||=new Tp(this.$refs.container,function(){e.overlayVisible&&e.hide()}),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.overlayVisible&&!$l()&&e.hide()},window.addEventListener(`resize`,this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),null)},bindLabelClickListener:function(){var e=this;if(!this.editable&&!this.labelClickListener){var t=document.querySelector(`label[for="${this.labelId}"]`);t&&Ql(t)&&(this.labelClickListener=function(){zl(e.$refs.focusInput)},t.addEventListener(`click`,this.labelClickListener))}},unbindLabelClickListener:function(){if(this.labelClickListener){var e=document.querySelector(`label[for="${this.labelId}"]`);e&&Ql(e)&&e.removeEventListener(`click`,this.labelClickListener)}},bindMatchMediaOrientationListener:function(){var e=this;if(!this.matchMediaOrientationListener){var t=matchMedia(`(orientation: portrait)`);this.queryOrientation=t,this.matchMediaOrientationListener=function(){e.alignOverlay()},this.queryOrientation.addEventListener(`change`,this.matchMediaOrientationListener)}},unbindMatchMediaOrientationListener:function(){this.matchMediaOrientationListener&&=(this.queryOrientation.removeEventListener(`change`,this.matchMediaOrientationListener),this.queryOrientation=null,null)},hasFocusableElements:function(){return Vl(this.overlay,`:not([data-p-hidden-focusable="true"])`).length>0},isOptionExactMatched:function(e){return this.isValidOption(e)&&typeof this.getOptionLabel(e)==`string`&&this.getOptionLabel(e)?.toLocaleLowerCase(this.filterLocale)==this.searchValue.toLocaleLowerCase(this.filterLocale)},isOptionStartsWith:function(e){return this.isValidOption(e)&&typeof this.getOptionLabel(e)==`string`&&this.getOptionLabel(e)?.toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale))},isValidOption:function(e){return J(e)&&!(this.isOptionDisabled(e)||this.isOptionGroup(e))},isValidSelectedOption:function(e){return this.isValidOption(e)&&this.isSelected(e)},isSelected:function(e){return Qc(this.d_value,this.getOptionValue(e),this.equalityKey)},findFirstOptionIndex:function(){var e=this;return this.visibleOptions.findIndex(function(t){return e.isValidOption(t)})},findLastOptionIndex:function(){var e=this;return nl(this.visibleOptions,function(t){return e.isValidOption(t)})},findNextOptionIndex:function(e){var t=this,n=e<this.visibleOptions.length-1?this.visibleOptions.slice(e+1).findIndex(function(e){return t.isValidOption(e)}):-1;return n>-1?n+e+1:e},findPrevOptionIndex:function(e){var t=this,n=e>0?nl(this.visibleOptions.slice(0,e),function(e){return t.isValidOption(e)}):-1;return n>-1?n:e},findSelectedOptionIndex:function(){var e=this;return this.visibleOptions.findIndex(function(t){return e.isValidSelectedOption(t)})},findFirstFocusedOptionIndex:function(){var e=this.findSelectedOptionIndex();return e<0?this.findFirstOptionIndex():e},findLastFocusedOptionIndex:function(){var e=this.findSelectedOptionIndex();return e<0?this.findLastOptionIndex():e},searchOptions:function(e,t){var n=this;this.searchValue=(this.searchValue||``)+t;var r=-1,i=!1;return J(this.searchValue)&&(r=this.visibleOptions.findIndex(function(e){return n.isOptionExactMatched(e)}),r===-1&&(r=this.visibleOptions.findIndex(function(e){return n.isOptionStartsWith(e)})),r!==-1&&(i=!0),r===-1&&this.focusedOptionIndex===-1&&(r=this.findFirstFocusedOptionIndex()),r!==-1&&this.changeFocusedOptionIndex(e,r)),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){n.searchValue=``,n.searchTimeout=null},500),i},changeFocusedOptionIndex:function(e,t){this.focusedOptionIndex!==t&&(this.focusedOptionIndex=t,this.scrollInView(),this.selectOnFocus&&this.onOptionSelect(e,this.visibleOptions[t],!1))},scrollInView:function(){var e=this,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:-1;this.$nextTick(function(){var n=t===-1?e.focusedOptionId:`${e.$id}_${t}`,r=Rl(e.list,`li[id="${n}"]`);r?r.scrollIntoView&&r.scrollIntoView({block:`nearest`,inline:`nearest`}):e.virtualScrollerDisabled||e.virtualScroller&&e.virtualScroller.scrollToIndex(t===-1?e.focusedOptionIndex:t)})},autoUpdateModel:function(){this.autoOptionFocus&&(this.focusedOptionIndex=this.findFirstFocusedOptionIndex()),this.selectOnFocus&&this.autoOptionFocus&&!this.$filled&&this.onOptionSelect(null,this.visibleOptions[this.focusedOptionIndex],!1)},updateModel:function(e,t){this.writeValue(t,e),this.$emit(`change`,{originalEvent:e,value:t})},flatOptions:function(e){var t=this;return(e||[]).reduce(function(e,n,r){e.push({optionGroup:n,group:!0,index:r});var i=t.getOptionGroupChildren(n);return i&&i.forEach(function(t){return e.push(t)}),e},[])},overlayRef:function(e){this.overlay=e},listRef:function(e,t){this.list=e,t&&t(e)},virtualScrollerRef:function(e){this.virtualScroller=e}},computed:{visibleOptions:function(){var e=this,t=this.optionGroupLabel?this.flatOptions(this.options):this.options||[];if(this.filterValue){var n=vp.filter(t,this.searchFields,this.filterValue,this.filterMatchMode,this.filterLocale);if(this.optionGroupLabel){var r=this.options||[],i=[];return r.forEach(function(t){var r=e.getOptionGroupChildren(t).filter(function(e){return n.includes(e)});r.length>0&&i.push(rh(rh({},t),{},ih({},typeof e.optionGroupChildren==`string`?e.optionGroupChildren:`items`,Xm(r))))}),this.flatOptions(i)}return n}return t},hasSelectedOption:function(){return this.$filled},label:function(){var e=this.findSelectedOptionIndex();return e===-1?this.placeholder||`p-emptylabel`:this.getOptionLabel(this.visibleOptions[e])},editableInputValue:function(){var e=this.findSelectedOptionIndex();return e===-1?this.d_value||``:this.getOptionLabel(this.visibleOptions[e])},equalityKey:function(){return this.optionValue?null:this.dataKey},searchFields:function(){return this.filterFields||[this.optionLabel]},filterResultMessageText:function(){return J(this.visibleOptions)?this.filterMessageText.replaceAll(`{0}`,this.visibleOptions.length):this.emptyFilterMessageText},filterMessageText:function(){return this.filterMessage||this.$primevue.config.locale.searchMessage||``},emptyFilterMessageText:function(){return this.emptyFilterMessage||this.$primevue.config.locale.emptySearchMessage||this.$primevue.config.locale.emptyFilterMessage||``},emptyMessageText:function(){return this.emptyMessage||this.$primevue.config.locale.emptyMessage||``},selectionMessageText:function(){return this.selectionMessage||this.$primevue.config.locale.selectionMessage||``},emptySelectionMessageText:function(){return this.emptySelectionMessage||this.$primevue.config.locale.emptySelectionMessage||``},selectedMessageText:function(){return this.$filled?this.selectionMessageText.replaceAll(`{0}`,`1`):this.emptySelectionMessageText},focusedOptionId:function(){return this.focusedOptionIndex===-1?null:`${this.$id}_${this.focusedOptionIndex}`},ariaSetSize:function(){var e=this;return this.visibleOptions.filter(function(t){return!e.isOptionGroup(t)}).length},isClearIconVisible:function(){return this.showClear&&this.d_value!=null&&!this.disabled&&!this.loading},virtualScrollerDisabled:function(){return!this.virtualScrollerOptions},containerDataP:function(){return _l(ih({invalid:this.$invalid,disabled:this.disabled,focus:this.focused,fluid:this.$fluid,filled:this.$variant===`filled`},this.size,this.size))},labelDataP:function(){return _l(ih(ih({placeholder:!this.editable&&this.label===this.placeholder,clearable:this.showClear,disabled:this.disabled,editable:this.editable},this.size,this.size),`empty`,!this.editable&&!this.$slots.value&&(this.label===`p-emptylabel`||this.label.length===0)))},dropdownIconDataP:function(){return _l(ih({},this.size,this.size))},overlayDataP:function(){return _l(ih({},`portal-`+this.appendTo,`portal-`+this.appendTo))}},directives:{ripple:Cf},components:{InputText:Am,VirtualScroller:Wm,Portal:Pm,InputIcon:Sm,IconField:bm,TimesIcon:fm,ChevronDownIcon:Hp,SpinnerIcon:im,SearchIcon:Xp,CheckIcon:Pp,BlankIcon:Ep}},ch=[`id`,`data-p`],lh=[`name`,`id`,`value`,`placeholder`,`tabindex`,`disabled`,`aria-label`,`aria-labelledby`,`aria-expanded`,`aria-controls`,`aria-activedescendant`,`aria-invalid`,`data-p`],uh=[`name`,`id`,`tabindex`,`aria-label`,`aria-labelledby`,`aria-expanded`,`aria-controls`,`aria-activedescendant`,`aria-invalid`,`aria-disabled`,`data-p`],dh=[`data-p`],fh=[`id`],ph=[`id`],mh=[`id`,`aria-label`,`aria-selected`,`aria-disabled`,`aria-setsize`,`aria-posinset`,`onMousedown`,`onMousemove`,`data-p-selected`,`data-p-focused`,`data-p-disabled`];function hh(e,t,n,r,i,a){var o=ti(`SpinnerIcon`),s=ti(`InputText`),c=ti(`SearchIcon`),l=ti(`InputIcon`),u=ti(`IconField`),d=ti(`CheckIcon`),f=ti(`BlankIcon`),p=ti(`VirtualScroller`),m=ti(`Portal`),h=ii(`ripple`);return U(),W(`div`,q({ref:`container`,id:e.$id,class:e.cx(`root`),onClick:t[12]||=function(){return a.onContainerClick&&a.onContainerClick.apply(a,arguments)},"data-p":a.containerDataP},e.ptmi(`root`)),[e.editable?(U(),W(`input`,q({key:0,ref:`focusInput`,name:e.name,id:e.labelId||e.inputId,type:`text`,class:[e.cx(`label`),e.inputClass,e.labelClass],style:[e.inputStyle,e.labelStyle],value:a.editableInputValue,placeholder:e.placeholder,tabindex:e.disabled?-1:e.tabindex,disabled:e.disabled,autocomplete:`off`,role:`combobox`,"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,"aria-haspopup":`listbox`,"aria-expanded":i.overlayVisible,"aria-controls":i.overlayVisible?e.$id+`_list`:void 0,"aria-activedescendant":i.focused?a.focusedOptionId:void 0,"aria-invalid":e.invalid||void 0,onFocus:t[0]||=function(){return a.onFocus&&a.onFocus.apply(a,arguments)},onBlur:t[1]||=function(){return a.onBlur&&a.onBlur.apply(a,arguments)},onKeydown:t[2]||=function(){return a.onKeyDown&&a.onKeyDown.apply(a,arguments)},onInput:t[3]||=function(){return a.onEditableInput&&a.onEditableInput.apply(a,arguments)},"data-p":a.labelDataP},e.ptm(`label`)),null,16,lh)):(U(),W(`span`,q({key:1,ref:`focusInput`,name:e.name,id:e.labelId||e.inputId,class:[e.cx(`label`),e.inputClass,e.labelClass],style:[e.inputStyle,e.labelStyle],tabindex:e.disabled?-1:e.tabindex,role:`combobox`,"aria-label":e.ariaLabel||(a.label===`p-emptylabel`?void 0:a.label),"aria-labelledby":e.ariaLabelledby,"aria-haspopup":`listbox`,"aria-expanded":i.overlayVisible,"aria-controls":e.$id+`_list`,"aria-activedescendant":i.focused?a.focusedOptionId:void 0,"aria-invalid":e.invalid||void 0,"aria-disabled":e.disabled,onFocus:t[4]||=function(){return a.onFocus&&a.onFocus.apply(a,arguments)},onBlur:t[5]||=function(){return a.onBlur&&a.onBlur.apply(a,arguments)},onKeydown:t[6]||=function(){return a.onKeyDown&&a.onKeyDown.apply(a,arguments)},"data-p":a.labelDataP},e.ptm(`label`)),[V(e.$slots,`value`,{value:e.d_value,placeholder:e.placeholder},function(){return[Ba(Ee(a.label===`p-emptylabel`?`\xA0`:a.label??`empty`),1)]})],16,uh)),a.isClearIconVisible?V(e.$slots,`clearicon`,{key:2,class:ve(e.cx(`clearIcon`)),clearCallback:a.onClearClick},function(){return[(U(),Ma(ri(e.clearIcon?`i`:`TimesIcon`),q({ref:`clearIcon`,class:[e.cx(`clearIcon`),e.clearIcon],onClick:a.onClearClick},e.ptm(`clearIcon`),{"data-pc-section":`clearicon`}),null,16,[`class`,`onClick`]))]}):Va(``,!0),G(`div`,q({class:e.cx(`dropdown`)},e.ptm(`dropdown`)),[e.loading?V(e.$slots,`loadingicon`,{key:0,class:ve(e.cx(`loadingIcon`))},function(){return[e.loadingIcon?(U(),W(`span`,q({key:0,class:[e.cx(`loadingIcon`),`pi-spin`,e.loadingIcon],"aria-hidden":`true`},e.ptm(`loadingIcon`)),null,16)):(U(),Ma(o,q({key:1,class:e.cx(`loadingIcon`),spin:``,"aria-hidden":`true`},e.ptm(`loadingIcon`)),null,16,[`class`]))]}):V(e.$slots,`dropdownicon`,{key:1,class:ve(e.cx(`dropdownIcon`))},function(){return[(U(),Ma(ri(e.dropdownIcon?`span`:`ChevronDownIcon`),q({class:[e.cx(`dropdownIcon`),e.dropdownIcon],"aria-hidden":`true`,"data-p":a.dropdownIconDataP},e.ptm(`dropdownIcon`)),null,16,[`class`,`data-p`]))]})],16),K(m,{appendTo:e.appendTo},{default:Bn(function(){return[K(jo,q({name:`p-anchored-overlay`,onEnter:a.onOverlayEnter,onAfterEnter:a.onOverlayAfterEnter,onLeave:a.onOverlayLeave,onAfterLeave:a.onOverlayAfterLeave},e.ptm(`transition`)),{default:Bn(function(){return[i.overlayVisible?(U(),W(`div`,q({key:0,ref:a.overlayRef,class:[e.cx(`overlay`),e.panelClass,e.overlayClass],style:[e.panelStyle,e.overlayStyle],onClick:t[10]||=function(){return a.onOverlayClick&&a.onOverlayClick.apply(a,arguments)},onKeydown:t[11]||=function(){return a.onOverlayKeyDown&&a.onOverlayKeyDown.apply(a,arguments)},"data-p":a.overlayDataP},e.ptm(`overlay`)),[G(`span`,q({ref:`firstHiddenFocusableElementOnOverlay`,role:`presentation`,"aria-hidden":`true`,class:`p-hidden-accessible p-hidden-focusable`,tabindex:0,onFocus:t[7]||=function(){return a.onFirstHiddenFocus&&a.onFirstHiddenFocus.apply(a,arguments)}},e.ptm(`hiddenFirstFocusableEl`),{"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0}),null,16),V(e.$slots,`header`,{value:e.d_value,options:a.visibleOptions}),e.filter?(U(),W(`div`,q({key:0,class:e.cx(`header`)},e.ptm(`header`)),[K(u,{unstyled:e.unstyled,pt:e.ptm(`pcFilterContainer`)},{default:Bn(function(){return[K(s,{ref:`filterInput`,type:`text`,value:i.filterValue,onVnodeMounted:a.onFilterUpdated,onVnodeUpdated:a.onFilterUpdated,class:ve(e.cx(`pcFilter`)),placeholder:e.filterPlaceholder,variant:e.variant,unstyled:e.unstyled,role:`searchbox`,autocomplete:`off`,"aria-owns":e.$id+`_list`,"aria-activedescendant":a.focusedOptionId,onKeydown:a.onFilterKeyDown,onBlur:a.onFilterBlur,onInput:a.onFilterChange,pt:e.ptm(`pcFilter`),formControl:{novalidate:!0}},null,8,[`value`,`onVnodeMounted`,`onVnodeUpdated`,`class`,`placeholder`,`variant`,`unstyled`,`aria-owns`,`aria-activedescendant`,`onKeydown`,`onBlur`,`onInput`,`pt`]),K(l,{unstyled:e.unstyled,pt:e.ptm(`pcFilterIconContainer`)},{default:Bn(function(){return[V(e.$slots,`filtericon`,{},function(){return[e.filterIcon?(U(),W(`span`,q({key:0,class:e.filterIcon},e.ptm(`filterIcon`)),null,16)):(U(),Ma(c,ye(q({key:1},e.ptm(`filterIcon`))),null,16))]})]}),_:3},8,[`unstyled`,`pt`])]}),_:3},8,[`unstyled`,`pt`]),G(`span`,q({role:`status`,"aria-live":`polite`,class:`p-hidden-accessible`},e.ptm(`hiddenFilterResult`),{"data-p-hidden-accessible":!0}),Ee(a.filterResultMessageText),17)],16)):Va(``,!0),G(`div`,q({class:e.cx(`listContainer`),style:{"max-height":a.virtualScrollerDisabled?e.scrollHeight:``}},e.ptm(`listContainer`)),[K(p,q({ref:a.virtualScrollerRef},e.virtualScrollerOptions,{items:a.visibleOptions,style:{height:e.scrollHeight},tabindex:-1,disabled:a.virtualScrollerDisabled,pt:e.ptm(`virtualScroller`)}),ci({content:Bn(function(n){var r=n.styleClass,o=n.contentRef,s=n.items,c=n.getItemOptions,l=n.contentStyle,u=n.itemSize;return[G(`ul`,q({ref:function(e){return a.listRef(e,o)},id:e.$id+`_list`,class:[e.cx(`list`),r],style:l,role:`listbox`},e.ptm(`list`)),[(U(!0),W(H,null,si(s,function(n,r){return U(),W(H,{key:a.getOptionRenderKey(n,a.getOptionIndex(r,c))},[a.isOptionGroup(n)?(U(),W(`li`,q({key:0,id:e.$id+`_`+a.getOptionIndex(r,c),style:{height:u?u+`px`:void 0},class:e.cx(`optionGroup`),role:`option`},{ref_for:!0},e.ptm(`optionGroup`)),[V(e.$slots,`optiongroup`,{option:n.optionGroup,index:a.getOptionIndex(r,c)},function(){return[G(`span`,q({class:e.cx(`optionGroupLabel`)},{ref_for:!0},e.ptm(`optionGroupLabel`)),Ee(a.getOptionGroupLabel(n.optionGroup)),17)]})],16,ph)):Vn((U(),W(`li`,q({key:1,id:e.$id+`_`+a.getOptionIndex(r,c),class:e.cx(`option`,{option:n,focusedOption:a.getOptionIndex(r,c)}),style:{height:u?u+`px`:void 0},role:`option`,"aria-label":a.getOptionLabel(n),"aria-selected":a.isSelected(n),"aria-disabled":a.isOptionDisabled(n),"aria-setsize":a.ariaSetSize,"aria-posinset":a.getAriaPosInset(a.getOptionIndex(r,c)),onMousedown:function(e){return a.onOptionSelect(e,n)},onMousemove:function(e){return a.onOptionMouseMove(e,a.getOptionIndex(r,c))},onClick:t[8]||=Es(function(){},[`stop`]),"data-p-selected":!e.checkmark&&a.isSelected(n),"data-p-focused":i.focusedOptionIndex===a.getOptionIndex(r,c),"data-p-disabled":a.isOptionDisabled(n)},{ref_for:!0},a.getPTItemOptions(n,c,r,`option`)),[e.checkmark?(U(),W(H,{key:0},[a.isSelected(n)?(U(),Ma(d,q({key:0,class:e.cx(`optionCheckIcon`)},{ref_for:!0},e.ptm(`optionCheckIcon`)),null,16,[`class`])):(U(),Ma(f,q({key:1,class:e.cx(`optionBlankIcon`)},{ref_for:!0},e.ptm(`optionBlankIcon`)),null,16,[`class`]))],64)):Va(``,!0),V(e.$slots,`option`,{option:n,selected:a.isSelected(n),index:a.getOptionIndex(r,c)},function(){return[G(`span`,q({class:e.cx(`optionLabel`)},{ref_for:!0},e.ptm(`optionLabel`)),Ee(a.getOptionLabel(n)),17)]})],16,mh)),[[h]])],64)}),128)),i.filterValue&&(!s||s&&s.length===0)?(U(),W(`li`,q({key:0,class:e.cx(`emptyMessage`),role:`option`},e.ptm(`emptyMessage`),{"data-p-hidden-accessible":!0}),[V(e.$slots,`emptyfilter`,{},function(){return[Ba(Ee(a.emptyFilterMessageText),1)]})],16)):!e.options||e.options&&e.options.length===0?(U(),W(`li`,q({key:1,class:e.cx(`emptyMessage`),role:`option`},e.ptm(`emptyMessage`),{"data-p-hidden-accessible":!0}),[V(e.$slots,`empty`,{},function(){return[Ba(Ee(a.emptyMessageText),1)]})],16)):Va(``,!0)],16,fh)]}),_:2},[e.$slots.loader?{name:`loader`,fn:Bn(function(t){var n=t.options;return[V(e.$slots,`loader`,{options:n})]}),key:`0`}:void 0]),1040,[`items`,`style`,`disabled`,`pt`])],16),V(e.$slots,`footer`,{value:e.d_value,options:a.visibleOptions}),!e.options||e.options&&e.options.length===0?(U(),W(`span`,q({key:1,role:`status`,"aria-live":`polite`,class:`p-hidden-accessible`},e.ptm(`hiddenEmptyMessage`),{"data-p-hidden-accessible":!0}),Ee(a.emptyMessageText),17)):Va(``,!0),G(`span`,q({role:`status`,"aria-live":`polite`,class:`p-hidden-accessible`},e.ptm(`hiddenSelectedMessage`),{"data-p-hidden-accessible":!0}),Ee(a.selectedMessageText),17),G(`span`,q({ref:`lastHiddenFocusableElementOnOverlay`,role:`presentation`,"aria-hidden":`true`,class:`p-hidden-accessible p-hidden-focusable`,tabindex:0,onFocus:t[9]||=function(){return a.onLastHiddenFocus&&a.onLastHiddenFocus.apply(a,arguments)}},e.ptm(`hiddenLastFocusableEl`),{"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0}),null,16)],16,dh)):Va(``,!0)]}),_:3},16,[`onEnter`,`onAfterEnter`,`onLeave`,`onAfterLeave`])]}),_:3},8,[`appendTo`])],16,ch)}sh.render=hh;var gh=X.extend({name:`slider`,style:`
    .p-slider {
        display: block;
        position: relative;
        background: dt('slider.track.background');
        border-radius: dt('slider.track.border.radius');
    }

    .p-slider-handle {
        cursor: grab;
        touch-action: none;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        height: dt('slider.handle.height');
        width: dt('slider.handle.width');
        background: dt('slider.handle.background');
        border-radius: dt('slider.handle.border.radius');
        transition:
            background dt('slider.transition.duration'),
            color dt('slider.transition.duration'),
            border-color dt('slider.transition.duration'),
            box-shadow dt('slider.transition.duration'),
            outline-color dt('slider.transition.duration');
        outline-color: transparent;
    }

    .p-slider-handle::before {
        content: '';
        width: dt('slider.handle.content.width');
        height: dt('slider.handle.content.height');
        display: block;
        background: dt('slider.handle.content.background');
        border-radius: dt('slider.handle.content.border.radius');
        box-shadow: dt('slider.handle.content.shadow');
        transition: background dt('slider.transition.duration');
    }

    .p-slider:not(.p-disabled) .p-slider-handle:hover {
        background: dt('slider.handle.hover.background');
    }

    .p-slider:not(.p-disabled) .p-slider-handle:hover::before {
        background: dt('slider.handle.content.hover.background');
    }

    .p-slider-handle:focus-visible {
        box-shadow: dt('slider.handle.focus.ring.shadow');
        outline: dt('slider.handle.focus.ring.width') dt('slider.handle.focus.ring.style') dt('slider.handle.focus.ring.color');
        outline-offset: dt('slider.handle.focus.ring.offset');
    }

    .p-slider-range {
        display: block;
        background: dt('slider.range.background');
        border-radius: dt('slider.track.border.radius');
    }

    .p-slider.p-slider-horizontal {
        height: dt('slider.track.size');
    }

    .p-slider-horizontal .p-slider-range {
        inset-block-start: 0;
        inset-inline-start: 0;
        height: 100%;
    }

    .p-slider-horizontal .p-slider-handle {
        inset-block-start: 50%;
        margin-block-start: calc(-1 * calc(dt('slider.handle.height') / 2));
        margin-inline-start: calc(-1 * calc(dt('slider.handle.width') / 2));
    }

    .p-slider-vertical {
        min-height: 100px;
        width: dt('slider.track.size');
    }

    .p-slider-vertical .p-slider-handle {
        inset-inline-start: 50%;
        margin-inline-start: calc(-1 * calc(dt('slider.handle.width') / 2));
        margin-block-end: calc(-1 * calc(dt('slider.handle.height') / 2));
    }

    .p-slider-vertical .p-slider-range {
        inset-block-end: 0;
        inset-inline-start: 0;
        width: 100%;
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-slider p-component`,{"p-disabled":n.disabled,"p-invalid":t.$invalid,"p-slider-horizontal":n.orientation===`horizontal`,"p-slider-vertical":n.orientation===`vertical`}]},range:`p-slider-range`,handle:`p-slider-handle`},inlineStyles:{handle:{position:`absolute`},range:{position:`absolute`}}}),_h={name:`BaseSlider`,extends:Gf,props:{min:{type:Number,default:0},max:{type:Number,default:100},orientation:{type:String,default:`horizontal`},step:{type:Number,default:null},range:{type:Boolean,default:!1},tabindex:{type:Number,default:0},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:gh,provide:function(){return{$pcSlider:this,$parentInstance:this}}};function vh(e){"@babel/helpers - typeof";return vh=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},vh(e)}function yh(e,t,n){return(t=bh(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function bh(e){var t=xh(e,`string`);return vh(t)==`symbol`?t:t+``}function xh(e,t){if(vh(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(vh(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function Sh(e){return Eh(e)||Th(e)||wh(e)||Ch()}function Ch(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function wh(e,t){if(e){if(typeof e==`string`)return Dh(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Dh(e,t):void 0}}function Th(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function Eh(e){if(Array.isArray(e))return Dh(e)}function Dh(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var Oh={name:`Slider`,extends:_h,inheritAttrs:!1,emits:[`change`,`slideend`],dragging:!1,handleIndex:null,initX:null,initY:null,barWidth:null,barHeight:null,dragListener:null,dragEndListener:null,beforeUnmount:function(){this.unbindDragListeners()},methods:{updateDomData:function(){var e=this.$el.getBoundingClientRect();this.initX=e.left+Tl(),this.initY=e.top+El(),this.barWidth=this.$el.offsetWidth,this.barHeight=this.$el.offsetHeight},setValue:function(e){var t,n=e.touches?e.touches[0].pageX:e.pageX,r=e.touches?e.touches[0].pageY:e.pageY;t=this.orientation===`horizontal`?Dl(this.$el)?(this.initX+this.barWidth-n)*100/this.barWidth:(n-this.initX)*100/this.barWidth:(this.initY+this.barHeight-r)*100/this.barHeight;var i=(this.max-this.min)*(t/100)+this.min;if(this.step){var a=this.range?this.value[this.handleIndex]:this.value,o=i-a;o<0?i=a+Math.ceil(i/this.step-a/this.step)*this.step:o>0&&(i=a+Math.floor(i/this.step-a/this.step)*this.step)}else i=Math.floor(i);this.updateModel(e,i)},updateModel:function(e,t){var n=Math.round(t*100)/100,r;this.range?(r=this.value?Sh(this.value):[],this.handleIndex==0?(n<this.min?n=this.min:n>=this.max&&(n=this.max),r[0]=n):(n>this.max?n=this.max:n<=this.min&&(n=this.min),r[1]=n)):(n<this.min?n=this.min:n>this.max&&(n=this.max),r=n),this.writeValue(r,e),this.$emit(`change`,r)},onDragStart:function(e,t){this.disabled||(this.$el.setAttribute(`data-p-sliding`,!0),this.dragging=!0,this.updateDomData(),this.range&&this.value[0]===this.max?this.handleIndex=0:this.handleIndex=t,e.currentTarget.focus())},onDrag:function(e){this.dragging&&this.setValue(e)},onDragEnd:function(e){this.dragging&&(this.dragging=!1,this.$el.setAttribute(`data-p-sliding`,!1),this.$emit(`slideend`,{originalEvent:e,value:this.value}))},onBarClick:function(e){this.disabled||Bl(e.target,`data-pc-section`)!==`handle`&&(this.updateDomData(),this.setValue(e))},onMouseDown:function(e,t){this.bindDragListeners(),this.onDragStart(e,t)},onKeyDown:function(e,t){switch(this.handleIndex=t,e.code){case`ArrowDown`:case`ArrowLeft`:this.decrementValue(e,t),e.preventDefault();break;case`ArrowUp`:case`ArrowRight`:this.incrementValue(e,t),e.preventDefault();break;case`PageDown`:this.decrementValue(e,t,!0),e.preventDefault();break;case`PageUp`:this.incrementValue(e,t,!0),e.preventDefault();break;case`Home`:this.updateModel(e,this.min),e.preventDefault();break;case`End`:this.updateModel(e,this.max),e.preventDefault();break}},onBlur:function(e,t){var n,r;(n=(r=this.formField).onBlur)==null||n.call(r,e)},decrementValue:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,r=this.range?this.step?this.value[t]-this.step:this.value[t]-1:this.step?this.value-this.step:!this.step&&n?this.value-10:this.value-1;this.updateModel(e,r),e.preventDefault()},incrementValue:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,r=this.range?this.step?this.value[t]+this.step:this.value[t]+1:this.step?this.value+this.step:!this.step&&n?this.value+10:this.value+1;this.updateModel(e,r),e.preventDefault()},bindDragListeners:function(){this.dragListener||(this.dragListener=this.onDrag.bind(this),document.addEventListener(`mousemove`,this.dragListener)),this.dragEndListener||(this.dragEndListener=this.onDragEnd.bind(this),document.addEventListener(`mouseup`,this.dragEndListener))},unbindDragListeners:function(){this.dragListener&&=(document.removeEventListener(`mousemove`,this.dragListener),null),this.dragEndListener&&=(document.removeEventListener(`mouseup`,this.dragEndListener),null)},rangeStyle:function(){if(this.range){var e=this.rangeEndPosition>this.rangeStartPosition?this.rangeEndPosition-this.rangeStartPosition:this.rangeStartPosition-this.rangeEndPosition,t=this.rangeEndPosition>this.rangeStartPosition?this.rangeStartPosition:this.rangeEndPosition;return this.horizontal?{"inset-inline-start":t+`%`,width:e+`%`}:{bottom:t+`%`,height:e+`%`}}else if(this.horizontal)return{width:this.handlePosition+`%`};else return{height:this.handlePosition+`%`}},handleStyle:function(){return this.horizontal?{"inset-inline-start":this.handlePosition+`%`}:{bottom:this.handlePosition+`%`}},rangeStartHandleStyle:function(){return this.horizontal?{"inset-inline-start":this.rangeStartPosition+`%`}:{bottom:this.rangeStartPosition+`%`}},rangeEndHandleStyle:function(){return this.horizontal?{"inset-inline-start":this.rangeEndPosition+`%`}:{bottom:this.rangeEndPosition+`%`}}},computed:{value:function(){return this.range?[this.d_value?.[0]??this.min,this.d_value?.[1]??this.max]:this.d_value??this.min},horizontal:function(){return this.orientation===`horizontal`},vertical:function(){return this.orientation===`vertical`},handlePosition:function(){return this.value<this.min?0:this.value>this.max?100:(this.value-this.min)*100/(this.max-this.min)},rangeStartPosition:function(){return this.value&&this.value[0]!==void 0?this.value[0]<this.min?0:(this.value[0]-this.min)*100/(this.max-this.min):0},rangeEndPosition:function(){return this.value&&this.value.length===2&&this.value[1]!==void 0?this.value[1]>this.max?100:(this.value[1]-this.min)*100/(this.max-this.min):100},dataP:function(){return _l(yh({},this.orientation,this.orientation))}}},kh=[`data-p`],Ah=[`data-p`],jh=[`tabindex`,`aria-valuemin`,`aria-valuenow`,`aria-valuemax`,`aria-labelledby`,`aria-label`,`aria-orientation`,`data-p`],Mh=[`tabindex`,`aria-valuemin`,`aria-valuenow`,`aria-valuemax`,`aria-labelledby`,`aria-label`,`aria-orientation`,`data-p`],Nh=[`tabindex`,`aria-valuemin`,`aria-valuenow`,`aria-valuemax`,`aria-labelledby`,`aria-label`,`aria-orientation`,`data-p`];function Ph(e,t,n,r,i,a){return U(),W(`div`,q({class:e.cx(`root`),onClick:t[18]||=function(){return a.onBarClick&&a.onBarClick.apply(a,arguments)}},e.ptmi(`root`),{"data-p-sliding":!1,"data-p":a.dataP}),[G(`span`,q({class:e.cx(`range`),style:[e.sx(`range`),a.rangeStyle()]},e.ptm(`range`),{"data-p":a.dataP}),null,16,Ah),e.range?Va(``,!0):(U(),W(`span`,q({key:0,class:e.cx(`handle`),style:[e.sx(`handle`),a.handleStyle()],onTouchstartPassive:t[0]||=function(e){return a.onDragStart(e)},onTouchmovePassive:t[1]||=function(e){return a.onDrag(e)},onTouchend:t[2]||=function(e){return a.onDragEnd(e)},onMousedown:t[3]||=function(e){return a.onMouseDown(e)},onKeydown:t[4]||=function(e){return a.onKeyDown(e)},onBlur:t[5]||=function(e){return a.onBlur(e)},tabindex:e.tabindex,role:`slider`,"aria-valuemin":e.min,"aria-valuenow":e.d_value,"aria-valuemax":e.max,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-orientation":e.orientation},e.ptm(`handle`),{"data-p":a.dataP}),null,16,jh)),e.range?(U(),W(`span`,q({key:1,class:e.cx(`handle`),style:[e.sx(`handle`),a.rangeStartHandleStyle()],onTouchstartPassive:t[6]||=function(e){return a.onDragStart(e,0)},onTouchmovePassive:t[7]||=function(e){return a.onDrag(e)},onTouchend:t[8]||=function(e){return a.onDragEnd(e)},onMousedown:t[9]||=function(e){return a.onMouseDown(e,0)},onKeydown:t[10]||=function(e){return a.onKeyDown(e,0)},onBlur:t[11]||=function(e){return a.onBlur(e,0)},tabindex:e.tabindex,role:`slider`,"aria-valuemin":e.min,"aria-valuenow":e.d_value?e.d_value[0]:null,"aria-valuemax":e.max,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-orientation":e.orientation},e.ptm(`startHandler`),{"data-p":a.dataP}),null,16,Mh)):Va(``,!0),e.range?(U(),W(`span`,q({key:2,class:e.cx(`handle`),style:[e.sx(`handle`),a.rangeEndHandleStyle()],onTouchstartPassive:t[12]||=function(e){return a.onDragStart(e,1)},onTouchmovePassive:t[13]||=function(e){return a.onDrag(e)},onTouchend:t[14]||=function(e){return a.onDragEnd(e)},onMousedown:t[15]||=function(e){return a.onMouseDown(e,1)},onKeydown:t[16]||=function(e){return a.onKeyDown(e,1)},onBlur:t[17]||=function(e){return a.onBlur(e,1)},tabindex:e.tabindex,role:`slider`,"aria-valuemin":e.min,"aria-valuenow":e.d_value?e.d_value[1]:null,"aria-valuemax":e.max,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-orientation":e.orientation},e.ptm(`endHandler`),{"data-p":a.dataP}),null,16,Nh)):Va(``,!0)],16,kh)}Oh.render=Ph;function Fh(){let e=Array.from({length:500},(e,t)=>t/499*2*Math.PI);return{title:`Sine Wave`,plot:{series:{type:`line`,x:e,y:e.map(e=>Math.sin(e)),name:`y=sin(x)`},xAxis:{title:`x`,ticks:`pimultiple`,grid:`auto`},yAxis:{title:`sin(x)`,ticks:`auto`,grid:`auto`},legend:`in-top-right`}}}var Ih=`import type { Figure } from "plotive";

export default function (): Figure {
    const x = Array.from({ length: 500 }, (_, i) => (i / 499) * 2 * Math.PI);
    const y = x.map((x) => Math.sin(x));

    return {
        title: "Sine Wave",
        plot: {
            series: {
                type: "line",
                x,
                y,
                name: "y=sin(x)",
            },
            xAxis: {
                title: "x",
                ticks: "pimultiple",
                grid: "auto",
            },
            yAxis: {
                title: "sin(x)",
                ticks: "auto",
                grid: "auto",
            },
            legend: "in-top-right",
        },
    };
}
`,Lh=`use std::f64::consts::PI;

use plotive::{data, des};

mod common;

fn main() {
    let fig = des::series::Line::new(des::data_src_ref("x"), des::data_src_ref("y"))
        .with_name("y=sin(x)")
        .into_plot()
        .with_x_axis(
            des::Axis::new()
                .with_title("x".into())
                .with_ticks(
                    des::axis::Ticks::new()
                        .with_locator(des::axis::ticks::PiMultipleLocator::default().into()),
                )
                .with_grid(Default::default()),
        )
        .with_y_axis(
            des::Axis::new()
                .with_title("y".into())
                .with_ticks(Default::default())
                .with_grid(Default::default()),
        )
        .with_legend(des::plot::LegendPos::InTopRight.into())
        .into_figure()
        .with_title("Sine wave".into());

    let x: Vec<f64> = (0..=360).map(|t| t as f64 * PI / 180.0).collect();
    let y = x.iter().map(|x| x.sin()).collect();

    let data_source = data::TableSource::new()
        .with_f64_column("x".into(), x)
        .with_f64_column("y".into(), y);

    common::process_figure(&fig, &data_source, None, "sine");
}
`,Rh=`import plotive as pv
import numpy as np

fig = pv.Figure(
    title="Sine Wave",
    plot=pv.Plot(
        series=[
            pv.series.Line(
                x="x",
                y="y",
                name="y=sin(x)",
            )
        ],
        x_axis=pv.Axis(title="x", ticks="pimultiple", grid="auto"),
        y_axis=pv.Axis(title="sin(x)", ticks="auto", grid="auto"),
        legend="in-top-right",
    ),
)

x = np.linspace(0, 2 * np.pi, 500)
y = np.sin(x)

import _common

_common.process_figure(fig, {"x": x, "y": y}, "sine")
`,zh=Object.defineProperty,Bh=(e,t,n)=>t in e?zh(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Vh=(e,t,n)=>Bh(e,typeof t==`symbol`?t:t+``,n),Hh=class{},Uh=class e extends Hh{constructor(e){super(),Vh(this,`_name`),Vh(this,`_rngFn`),this._name=e.name??`function`,this._rngFn=e}get name(){return this._name}next(){return this._rngFn()}clone(){return new e(this._rngFn)}};function Wh(e){switch(typeof e){case`object`:if(e instanceof Hh)return e;break;case`function`:return new Uh(e);default:return new Zh(e)}throw Error(`invalid RNG seed or instance "${e}"`)}function Gh(e,t){let n=`${e}`,r=0,i=0;for(;i<n.length;)t[255&i]=255&(r^=(t[255&i]??0)*19)+n.charCodeAt(i++);return t.length?t:[0]}function Kh(e,t){for(let n=t.length-1;n>0;--n){let r=Math.floor(e.next()*(n+1)),i=t[n];t[n]=t[r],t[r]=i}}function qh(e,t,n){let r=new Map,i=t.length-1,a=Array.from({length:n});for(let o=0;o<n;o++){let n=i-o+1,s=Math.floor(e.next()*n);a[o]=t[r.get(s)??s],r.set(s,r.get(i-o)??i-o)}return a}var Jh=281474976710656,Yh=4503599627370496,Xh=9007199254740992,Zh=class e extends Hh{constructor(e=crypto.randomUUID()){super(),Vh(this,`_seed`),Vh(this,`i`),Vh(this,`j`),Vh(this,`S`),this._seed=e;let t=Gh(e,[]),n=[],r=t.length;this.i=0,this.j=0,this.S=n;let i=0;for(;i<=255;)n[i]=i++;for(let e=0,i=0;e<=255;e++){let a=n[e];i=255&i+t[e%r]+a,n[e]=n[i],n[i]=a}this.g(256)}get name(){return`arc4`}next(){let e=this.g(6),t=Jh,n=0;for(;e<Yh;)e=(e+n)*256,t*=256,n=this.g(1);for(;e>=Xh;)e/=2,t/=2,n>>>=1;return(e+n)/t}g(e){let{S:t}=this,{i:n,j:r}=this,i=0;for(;e--;){n=255&n+1;let e=t[n];t[r]=e,r=255&r+e,t[n]=t[r],i=i*256+t[255&t[n]+e]}return this.i=n,this.j=r,i}clone(){return new e(this._seed)}},Qh=class e extends Hh{get name(){return`Math.random`}next(){return Math.random()}clone(){return new e}};function $h(e){return new eg(e)}var eg=class{constructor(e){Vh(this,`n`),Vh(this,`isInt`,()=>{if(Number.isInteger(this.n))return this;throw Error(`Expected number to be an integer, got ${this.n}`)}),Vh(this,`isPositive`,()=>{if(this.n>0)return this;throw Error(`Expected number to be positive, got ${this.n}`)}),Vh(this,`lessThan`,e=>{if(this.n<e)return this;throw Error(`Expected number to be less than ${e}, got ${this.n}`)}),Vh(this,`lessThanOrEqual`,e=>{if(this.n<=e)return this;throw Error(`Expected number to be less than or equal to ${e}, got ${this.n}`)}),Vh(this,`greaterThanOrEqual`,e=>{if(this.n>=e)return this;throw Error(`Expected number to be greater than or equal to ${e}, got ${this.n}`)}),Vh(this,`greaterThan`,e=>{if(this.n>e)return this;throw Error(`Expected number to be greater than ${e}, got ${this.n}`)}),this.n=e}};function tg(e,t=1){$h(t).isInt().isPositive();let n=e.irwinHall(t);return()=>n()/t}function ng(e,t=.5){return $h(t).greaterThanOrEqual(0).lessThanOrEqual(1),()=>Math.min(1,Math.floor(e.next()+t))}function rg(e,t=1,n=.5){return $h(t).isInt().isPositive(),$h(n).greaterThanOrEqual(0).lessThan(1),()=>{let r=0,i=0;for(;r++<t;)e.next()<n&&i++;return i}}function ig(e,t=1){return $h(t).isPositive(),()=>-Math.log(1-e.next())/t}function ag(e,t=.5){$h(t).greaterThan(0).lessThan(1);let n=1/Math.log(1-t);return()=>Math.floor(1+Math.log(e.next())*n)}function og(e,t=1){return $h(t).isInt().greaterThanOrEqual(0),()=>{let n=0;for(let r=0;r<t;++r)n+=e.next();return n}}function sg(e,t=0,n=1){let r=e.normal(t,n);return()=>Math.exp(r())}function cg(e,t=0,n=1){return()=>{let r,i,a;do r=e.next()*2-1,i=e.next()*2-1,a=r*r+i*i;while(!a||a>1);return t+n*i*Math.sqrt(-2*Math.log(a)/a)}}function lg(e,t=1){$h(t).greaterThanOrEqual(0);let n=1/t;return()=>1/(1-e.next())**n}var ug=[0,0,.6931471805599453,1.791759469228055,3.1780538303479458,4.787491742782046,6.579251212010101,8.525161361065415,10.60460290274525,12.801827480081469],dg=e=>ug[e],fg=.9189385332046727;function pg(e,t=1){if($h(t).isPositive(),t<10){let n=Math.exp(-t);return()=>{let r=n,i=0,a=e.next();for(;a>r;)a-=r,r=t*r/++i;return i}}else{let n=Math.sqrt(t),r=.931+2.53*n,i=-.059+.02483*r,a=1.1239+1.1328/(r-3.4),o=.9277-3.6224/(r-2);return()=>{for(;;){let s,c=e.next();if(c<=.86*o)return s=c/o-.43,Math.floor((2*i/(.5-Math.abs(s))+r)*s+t+.445);c>=o?s=e.next()-.5:(s=c/o-.93,s=(s<0?-.5:.5)-s,c=e.next()*o);let l=.5-Math.abs(s);if(l<.013&&c>l)continue;let u=Math.floor((2*i/l+r)*s+t+.445);if(c=c*a/(i/(l*l)+r),u>=10){let e=(u+.5)*Math.log(t/u)-t-fg+u-(1/12-(1/360-1/(1260*u*u))/(u*u))/u;if(Math.log(c*n)<=e)return u}else if(u>=0){let e=dg(u)??0;if(Math.log(c)<=u*Math.log(t)-t-e)return u}}}}}function mg(e,t=0,n=1){return()=>e.next()*(n-t)+t}function hg(e){return()=>e.next()>=.5}function gg(e,t=0,n=1){return n===void 0&&(n=t===void 0?1:t,t=0),$h(t).isInt(),$h(n).isInt(),()=>Math.floor(e.next()*(n-t+1)+t)}function _g(e,t,n){return $h(t).greaterThan(0),$h(n).greaterThan(0),()=>{let r=1-e.next();return t*(-Math.log(r))**(1/n)}}var vg=new class e{constructor(e=new Qh){Vh(this,`_rng`),Vh(this,`_cache`,{}),this._rng=Wh(e)}get rng(){return this._rng}clone(t=this.rng.clone()){return new e(t)}use(e){this._rng=Wh(e),this._cache={}}next(){return this._rng.next()}float(e,t){return this.uniform(e,t)()}int(e,t){return this.uniformInt(e,t)()}integer(e,t){return this.uniformInt(e,t)()}bool(){return this.uniformBoolean()()}boolean(){return this.uniformBoolean()()}choice(e){if(!Array.isArray(e))throw TypeError(`Random.choice expected input to be an array, got ${typeof e}`);let t=e.length;if(t>0)return e[this.uniformInt(0,t-1)()]}sample(e,t){if(!Array.isArray(e))throw TypeError(`Random.sample expected input to be an array, got ${typeof e}`);if(t<0||t>e.length)throw Error(`Random.sample: k must be between 0 and array.length (${e.length}), got ${t}`);return qh(this.rng,e,t)}sampler(e,t){if(!Array.isArray(e))throw TypeError(`Random.sampler expected input to be an array, got ${typeof e}`);if(t<0||t>e.length)throw Error(`Random.sampler: k must be between 0 and array.length (${e.length}), got ${t}`);let n=this.rng;return()=>qh(n,e,t)}shuffle(e){if(!Array.isArray(e))throw TypeError(`Random.shuffle expected input to be an array, got ${typeof e}`);let t=[...e];return Kh(this.rng,t),t}shuffler(e){if(!Array.isArray(e))throw TypeError(`Random.shuffler expected input to be an array, got ${typeof e}`);let t=this.rng,n=[...e];return()=>(Kh(t,n),[...n])}uniform(e,t){return this._memoize(`uniform`,mg,e,t)}uniformInt(e,t){return this._memoize(`uniformInt`,gg,e,t)}uniformBoolean(){return this._memoize(`uniformBoolean`,hg)}normal(e,t){return cg(this,e,t)}logNormal(e,t){return sg(this,e,t)}bernoulli(e){return ng(this,e)}binomial(e,t){return rg(this,e,t)}geometric(e){return ag(this,e)}poisson(e){return pg(this,e)}exponential(e){return ig(this,e)}irwinHall(e){return og(this,e)}bates(e){return tg(this,e)}pareto(e){return lg(this,e)}weibull(e,t){return _g(this,e,t)}_memoize(e,t,...n){let r=`${n.join(`;`)}`,i=this._cache[e];return(i===void 0||i.key!==r)&&(i={key:r,distribution:t(this,...n)},this._cache[e]=i),i.distribution}};function yg(){let e=vg.normal(30,5),t=vg.normal(20,2),n=vg.normal(40,2),r=vg.normal(10,5),i=Array.from({length:300},()=>e()),a=Array.from({length:300},()=>t()),o=Array.from({length:500},()=>n()),s=Array.from({length:500},()=>r());return{title:`Scatter Plot Example`,plot:{series:[{type:`scatter`,x:i,y:a,name:`Series 1`,marker:{shape:`circle`,size:3}},{type:`scatter`,x:o,y:s,name:`Series 2`,marker:{shape:`square`,size:3}}],xAxis:{ticks:`auto`,grid:`auto`},yAxis:{ticks:`auto`,grid:`auto`},legend:`in-bottom-left`}}}var bg=`import type { Figure } from "plotive";
import random from "random";

export default function (): Figure {
    const normalX1 = random.normal(30, 5);
    const normalY1 = random.normal(20, 2);
    const normalX2 = random.normal(40, 2);
    const normalY2 = random.normal(10, 5);
    const x1 = Array.from({ length: 300 }, () => normalX1());
    const y1 = Array.from({ length: 300 }, () => normalY1());
    const x2 = Array.from({ length: 500 }, () => normalX2());
    const y2 = Array.from({ length: 500 }, () => normalY2());

    return {
        title: "Scatter Plot Example",
        plot: {
            series: [
                {
                    type: "scatter",
                    x: x1,
                    y: y1,
                    name: "Series 1",
                    marker: {
                        shape: "circle",
                        size: 3.0,
                    },
                },
                {
                    type: "scatter",
                    x: x2,
                    y: y2,
                    name: "Series 2",
                    marker: {
                        shape: "square",
                        size: 3.0,
                    },
                },
            ],
            xAxis: {
                ticks: "auto",
                grid: "auto",
            },
            yAxis: {
                ticks: "auto",
                grid: "auto",
            },
            legend: "in-bottom-left",
        },
    };
}
`,xg=`use plotive::{data, des, style};
use rand::Rng;

mod common;

fn normal_sample(rng: &mut impl Rng, mean: f64, std_dev: f64, n: usize) -> Vec<f64> {
    use rand_distr::Normal;
    rng.sample_iter(Normal::new(mean, std_dev).unwrap())
        .take(n)
        .collect()
}
fn main() {
    let mut rng = rand::rng();
    let x1 = normal_sample(&mut rng, 30.0, 5.0, 300);
    let y1 = normal_sample(&mut rng, 20.0, 2.0, 300);
    let x2 = normal_sample(&mut rng, 40.0, 2.0, 500);
    let y2 = normal_sample(&mut rng, 10.0, 5.0, 500);

    let data_src = data::NamedColumns::new()
        .with_column("x1", &x1)
        .with_column("y1", &y1)
        .with_column("x2", &x2)
        .with_column("y2", &y2);

    let fig = des::Figure::new(
        des::Plot::new(vec![
            des::series::Scatter::new(
                des::series::data_src_ref("x1"),
                des::series::data_src_ref("y1"),
            )
            .with_name("Series 1")
            .with_marker(
                style::Marker::default()
                    .with_shape(style::MarkerShape::Circle)
                    .with_size(3.0),
            )
            .into(),
            des::series::Scatter::new(
                des::series::data_src_ref("x2"),
                des::series::data_src_ref("y2"),
            )
            .with_name("Series 2")
            .with_marker(
                style::Marker::default()
                    .with_shape(style::MarkerShape::Square)
                    .with_size(3.0),
            )
            .into(),
        ])
        .with_x_axis(
            des::Axis::default()
                .with_ticks(Default::default())
                .with_grid(Default::default()),
        )
        .with_y_axis(
            des::Axis::default()
                .with_ticks(Default::default())
                .with_grid(Default::default()),
        )
        .with_legend(des::plot::LegendPos::InBottomLeft.into())
        .into(),
    )
    .with_title("Scatter Plot Example".into());

    common::process_figure(&fig, &data_src, None, "scatter");
}
`,Sg=`import numpy as np\r
import plotive as pv\r
\r
np.random.seed(1234)\r
\r
data = {\r
    "x1": np.random.normal(loc=30, scale=5, size=300),\r
    "y1": np.random.normal(loc=20, scale=2, size=300),\r
    "x2": np.random.normal(loc=40, scale=2, size=500),\r
    "y2": np.random.normal(loc=10, scale=5, size=500),\r
}\r
\r
fig = pv.Figure(\r
    title="Scatter Plot Example",\r
    plot=pv.Plot(\r
        series=[\r
            pv.series.Scatter(\r
                x="x1",\r
                y="y1",\r
                name="Series 1",\r
                marker=pv.style.Marker(shape="circle", size=3),\r
            ),\r
            pv.series.Scatter(\r
                x="x2",\r
                y="y2",\r
                name="Series 2",\r
                marker=pv.style.Marker(shape="square", size=3),\r
            ),\r
        ],\r
        x_axis=pv.Axis(ticks="auto", grid="auto"),\r
        y_axis=pv.Axis(ticks="auto", grid="auto"),\r
        legend="in-bottom-left",\r
    ),\r
)\r
\r
import _common\r
\r
_common.process_figure(fig, data, "scatter")\r
`;function Cg(){let e=Array.from({length:500},(e,t)=>t/499*Math.PI),t=e.map(e=>Math.sin(e)-.8*Math.sin(e)**2),n=e.map(e=>100*Math.cos(e-Math.PI/4)),r=e.map(e=>1e3*Math.sin(e));return{plot:{series:[{type:`line`,name:`y1 = sin(x) - 0.8*sin(x)^2`,x:e,y:t,yAxis:0},{type:`line`,name:`y2 = 100 * cos(x - π/4)`,x:e,y:n,yAxis:`y2`},{type:`line`,name:`y3 = 1000 * sin(x)`,x:e,y:r,yAxis:`Y3`}],xAxis:{title:`X`,ticks:`pimultiple`},yAxes:[{title:`Y1`,ticks:`percent`},{id:`y2`,title:`Y2`,ticks:`auto`,side:`right`},{title:`Y3`,ticks:`auto`,side:`right`}]},legend:`bottom`}}var wg=`import type { Figure } from "plotive";

export default function (): Figure {
    const x = Array.from({ length: 500 }, (_, i) => (i / 499) * Math.PI);
    const y1 = x.map((x) => Math.sin(x) - 0.8 * Math.sin(x) ** 2);
    const y2 = x.map((x) => 100 * Math.cos(x - Math.PI / 4));
    const y3 = x.map((x) => 1000 * Math.sin(x));

    return {
        plot: {
            series: [
                {
                    type: "line",
                    name: "y1 = sin(x) - 0.8*sin(x)^2",
                    x: x,
                    y: y1,
                    yAxis: 0, // referring to Y1 by its index (optional as it is the first Y-axis)
                },
                {
                    type: "line",
                    name: "y2 = 100 * cos(x - π/4)",
                    x: x,
                    y: y2,
                    yAxis: "y2", // referring to Y2 by its id
                },
                {
                    type: "line",
                    name: "y3 = 1000 * sin(x)",
                    x: x,
                    y: y3,
                    yAxis: "Y3", // referring to Y3 by its title
                },
            ],
            xAxis: {
                title: "X",
                ticks: "pimultiple",
            },
            yAxes: [
                {
                    title: "Y1",
                    ticks: "percent",
                },
                {
                    id: "y2",
                    title: "Y2",
                    ticks: "auto",
                    side: "right",
                },
                {
                    title: "Y3",
                    ticks: "auto",
                    side: "right",
                },
            ],
        },
        legend: "bottom",
    };
}
`,Tg=`use std::f64::consts::PI;

use plotive::{data, des, utils};

mod common;

fn main() {
    let x = utils::linspace(0.0, PI, 500);
    let y1 = x
        .iter()
        .map(|x| x.sin() - 0.8 * x.sin().powi(2))
        .collect::<Vec<f64>>();
    let y2 = x
        .iter()
        .map(|x| 100.0 * (x - PI / 4.0).cos())
        .collect::<Vec<f64>>();
    let y3 = x.iter().map(|x| 1000.0 * x.sin()).collect::<Vec<f64>>();

    let mut data_src = data::NamedColumns::new();
    data_src.add_column("x", &x as &dyn data::Column);
    data_src.add_column("y1", &y1 as &dyn data::Column);
    data_src.add_column("y2", &y2 as &dyn data::Column);
    data_src.add_column("y3", &y3 as &dyn data::Column);

    let fig = des::Plot::new(vec![
        des::series::Line::new(
            des::series::data_src_ref("x"),
            des::series::data_src_ref("y1"),
        )
        .with_name("y1 = sin(x) - 0.8 sin^2(x)")
        .into(),
        des::series::Line::new(
            des::series::data_src_ref("x"),
            des::series::data_src_ref("y2"),
        )
        .with_name("y2 = 100 * cos(x - π/4)")
        // Referencing the second y-axis by its id.
        .with_y_axis(des::axis::ref_id("y2"))
        .into(),
        des::series::Line::new(
            des::series::data_src_ref("x"),
            des::series::data_src_ref("y3"),
        )
        .with_name("y3 = 1000 * sin(x)")
        // Referencing the third y-axis by its title.
        .with_y_axis(des::axis::ref_id("Y3"))
        .into(),
    ])
    .with_x_axis(
        des::Axis::new()
            .with_title("X".into())
            .with_ticks(des::axis::ticks::PiMultipleLocator::default().into()),
    )
    .with_y_axis(
        des::Axis::new()
            .with_title("Y1".into())
            .with_ticks(des::axis::ticks::PercentFormatter::default().into()),
    )
    .with_y_axis(
        des::Axis::new()
            .with_id("y2")
            .with_title("Y2".into())
            .with_ticks(Default::default())
            .with_opposite_side(),
    )
    .with_y_axis(
        des::Axis::new()
            .with_title("Y3".into())
            .with_ticks(Default::default())
            .with_opposite_side(),
    )
    .into_figure()
    .with_legend(des::figure::LegendPos::Bottom.into());

    common::process_figure(&fig, &data_src, None, "multiple-axes");
}
`,Eg=`import numpy as np
import plotive as pv

x = np.linspace(0.0, np.pi, 500)
data = {
    "x": x,
    "y1": np.sin(x) - 0.8 * np.pow(np.sin(x), 2),
    "y2": 100.0 * np.cos(x - np.pi / 4),
    "y3": 1000.0 * np.sin(x),
}

fig = pv.Figure(
    plot=pv.Plot(
        series=[
            pv.series.Line(
                x="x",
                y="y1",
                name="y1 = sin(x) - 0.8*sin(x)^2",
            ),
            pv.series.Line(
                x="x",
                y="y2",
                name="y2 = 100 * cos(x - π)",
                # reference the second y-axis by its id
                y_axis="y2",
            ),
            pv.series.Line(
                x="x",
                y="y3",
                name="y3 = 1000*sin(x)",
                # reference the third y-axis by its title
                y_axis="Y3",
            ),
        ],
        x_axis=pv.Axis(title="X", ticks="pimultiple"),
        y_axes=[
            pv.Axis(title="Y1", ticks="percent"),
            pv.Axis(id="y2", title="Y2", ticks="auto", side="right"),
            pv.Axis(title="Y3", ticks="auto", side="right"),
        ],
    ),
    legend="bottom",
)

import _common

_common.process_figure(fig, data, "multiple-axes")
`,Dg=`Date,Open,High,Low,Close,Adj Close,Volume
2014-09-17,465.864014,468.174011,452.421997,457.334015,457.334015,21056800
2014-09-18,456.859985,456.859985,413.104004,424.440002,424.440002,34483200
2014-09-19,424.102997,427.834991,384.532013,394.795990,394.795990,37919700
2014-09-20,394.673004,423.295990,389.882996,408.903992,408.903992,36863600
2014-09-21,408.084991,412.425995,393.181000,398.821014,398.821014,26580100
2014-09-22,399.100006,406.915985,397.130005,402.152008,402.152008,24127600
2014-09-23,402.092010,441.557007,396.196991,435.790985,435.790985,45099500
2014-09-24,435.751007,436.112000,421.131989,423.204987,423.204987,30627700
2014-09-25,423.156006,423.519989,409.467987,411.574005,411.574005,26814400
2014-09-26,411.428986,414.937988,400.009003,404.424988,404.424988,21460800
2014-09-27,403.556000,406.622986,397.372009,399.519989,399.519989,15029300
2014-09-28,399.471008,401.016998,374.332001,377.181000,377.181000,23613300
2014-09-29,376.928009,385.210999,372.239990,375.467010,375.467010,32497700
2014-09-30,376.088013,390.976990,373.442993,386.944000,386.944000,34707300
2014-10-01,387.427002,391.378998,380.779999,383.614990,383.614990,26229400
2014-10-02,383.988007,385.497009,372.946014,375.071991,375.071991,21777700
2014-10-03,375.181000,377.695007,357.859009,359.511993,359.511993,30901200
2014-10-04,359.891998,364.487000,325.885986,328.865997,328.865997,47236500
2014-10-05,328.915985,341.800995,289.295990,320.510010,320.510010,83308096
2014-10-06,320.389008,345.134003,302.559998,330.079010,330.079010,79011800
2014-10-07,330.584015,339.247009,320.481995,336.187012,336.187012,49199900
2014-10-08,336.115997,354.364014,327.187988,352.940002,352.940002,54736300
2014-10-09,352.747986,382.726013,347.687012,365.026001,365.026001,83641104
2014-10-10,364.687012,375.066986,352.963013,361.562012,361.562012,43665700
2014-10-11,361.362000,367.191010,355.950989,362.299011,362.299011,13345200
2014-10-12,362.605988,379.433014,356.144012,378.549011,378.549011,17552800
2014-10-13,377.920990,397.226013,368.897003,390.414001,390.414001,35221400
2014-10-14,391.691986,411.697998,391.324005,400.869995,400.869995,38491500
2014-10-15,400.954987,402.226990,388.765991,394.773010,394.773010,25267100
2014-10-16,394.518005,398.807007,373.070007,382.556000,382.556000,26990000
2014-10-17,382.756012,385.477997,375.389008,383.757996,383.757996,13600700
2014-10-18,383.976013,395.157990,378.971008,391.441986,391.441986,11416800
2014-10-19,391.253998,393.938995,386.457001,389.545990,389.545990,5914570
2014-10-20,389.230988,390.084015,378.252014,382.845001,382.845001,16419000
2014-10-21,382.420990,392.645996,380.834015,386.475006,386.475006,14188900
2014-10-22,386.118011,388.575989,382.248993,383.157990,383.157990,11641300
2014-10-23,382.962006,385.048004,356.446991,358.416992,358.416992,26456900
2014-10-24,358.591003,364.345001,353.304993,358.345001,358.345001,15585700
2014-10-25,358.610992,359.860992,342.877014,347.270996,347.270996,18127500
2014-10-26,347.487000,359.221008,343.931000,354.704010,354.704010,11272500
2014-10-27,354.777008,358.631989,349.808990,352.989014,352.989014,13033000
2014-10-28,353.214996,359.984009,352.678986,357.618011,357.618011,7845880
2014-10-29,357.088989,357.833008,335.342987,335.591003,335.591003,18192700
2014-10-30,335.709015,350.912994,335.071991,345.304993,345.304993,30177900
2014-10-31,345.009003,348.045013,337.141998,338.321014,338.321014,12545400
2014-11-01,338.649994,340.528992,321.054993,325.748993,325.748993,16677200
2014-11-02,326.075012,329.049988,320.626007,325.891998,325.891998,8603620
2014-11-03,325.569000,334.002014,325.480988,327.553986,327.553986,12948500
2014-11-04,327.161011,331.766998,325.076996,330.492004,330.492004,15655500
2014-11-05,330.683014,343.368988,330.683014,339.485992,339.485992,19817200
2014-11-06,339.458008,352.966003,338.424011,349.290009,349.290009,18797000
2014-11-07,349.817993,352.731995,341.776001,342.415009,342.415009,16834200
2014-11-08,342.153992,347.032013,342.153992,345.488007,345.488007,8535470
2014-11-09,345.376007,363.626007,344.255005,363.264008,363.264008,24205600
2014-11-10,362.265015,374.816010,357.561005,366.924011,366.924011,30450100
2014-11-11,365.856995,371.309998,363.734985,367.695007,367.695007,15838900
2014-11-12,367.984985,429.717987,367.984985,423.561005,423.561005,45783200
2014-11-13,427.273010,457.092987,401.122986,420.734985,420.734985,58945000
2014-11-14,418.416992,419.252014,384.789001,397.817993,397.817993,29589200
2014-11-15,399.649994,405.528015,371.007996,376.132996,376.132996,15727500
2014-11-16,374.730011,390.799011,374.601990,387.881989,387.881989,11905600
2014-11-17,388.348999,410.199005,377.502014,387.407990,387.407990,41518800
2014-11-18,387.785004,392.402008,371.117004,375.197998,375.197998,32222500
2014-11-19,373.895996,386.480988,373.895996,380.554993,380.554993,18931800
2014-11-20,380.307007,382.024994,356.781006,357.839996,357.839996,25233200
2014-11-21,357.878998,357.878998,344.112000,350.847992,350.847992,29850100
2014-11-22,351.604004,364.841003,350.877991,352.920013,352.920013,15273000
2014-11-23,353.174988,370.845001,353.174988,367.572998,367.572998,15151600
2014-11-24,366.947998,387.209015,366.669006,376.901001,376.901001,30930100
2014-11-25,376.885986,394.700989,374.783997,375.347992,375.347992,25442200
2014-11-26,376.019012,377.697998,365.816010,368.369995,368.369995,18601700
2014-11-27,370.502014,373.992004,368.282013,369.670013,369.670013,8748030
2014-11-28,369.373993,382.838013,358.454987,376.446991,376.446991,22946500
2014-11-29,376.152008,387.601013,372.144989,375.490997,375.490997,15375600
2014-11-30,375.510010,382.527008,373.308990,378.046997,378.046997,9194440
2014-12-01,378.248993,383.661987,376.669006,379.244995,379.244995,11763000
2014-12-02,379.250000,384.037994,377.863007,381.315002,381.315002,12364100
2014-12-03,381.721985,383.026001,374.346008,375.010010,375.010010,13340100
2014-12-04,375.717987,378.654999,367.759003,369.604004,369.604004,14529600
2014-12-05,369.441986,379.191986,365.756012,376.854004,376.854004,15181800
2014-12-06,376.756989,378.447998,370.945007,374.785004,374.785004,7009320
2014-12-07,374.835999,376.291992,373.274994,375.095001,375.095001,6491650
2014-12-08,374.964996,376.028992,361.885986,361.908997,361.908997,18898700
2014-12-09,361.894989,363.066986,344.950989,352.218994,352.218994,32915500
2014-12-10,352.204987,352.384003,346.364990,346.364990,346.364990,16427700
2014-12-11,344.339996,361.356995,338.763000,350.506012,350.506012,32431300
2014-12-12,350.833008,352.983002,349.290985,352.541992,352.541992,16989800
2014-12-13,352.381012,352.381012,346.588013,347.376007,347.376007,11675900
2014-12-14,346.726990,353.316010,345.417999,351.631989,351.631989,12415200
2014-12-15,351.360992,351.815002,344.933990,345.345001,345.345001,17264200
2014-12-16,345.673004,345.859009,327.062012,327.062012,327.062012,30864900
2014-12-17,326.855011,333.954010,315.152008,319.776001,319.776001,37567900
2014-12-18,319.785004,323.709015,304.231995,311.395996,311.395996,39173000
2014-12-19,311.178986,318.532990,306.769012,317.842987,317.842987,23823100
2014-12-20,317.618988,330.325012,316.044006,329.955994,329.955994,20856700
2014-12-21,329.542999,329.628998,318.903015,320.842987,320.842987,15207600
2014-12-22,321.067993,334.117004,320.424988,331.885986,331.885986,22315100
2014-12-23,332.016998,336.286987,329.601990,334.571991,334.571991,16574200
2014-12-24,334.385010,334.740997,321.356995,322.533997,322.533997,15092300
2014-12-25,322.286011,322.670013,316.958008,319.007996,319.007996,9883640
2014-12-26,319.152008,331.424011,316.627014,327.924011,327.924011,16410500
2014-12-27,327.583008,328.911011,312.630005,315.863007,315.863007,15185200
2014-12-28,316.160004,320.028015,311.078003,317.239014,317.239014,11676600
2014-12-29,317.700989,320.266998,312.307007,312.670013,312.670013,12302500
2014-12-30,312.718994,314.808990,309.372986,310.737000,310.737000,12528300
2014-12-31,310.914001,320.192993,310.210999,320.192993,320.192993,13942900
2015-01-01,320.434998,320.434998,314.002991,314.248993,314.248993,8036550
2015-01-02,314.079010,315.838989,313.565002,315.032013,315.032013,7860650
2015-01-03,314.846008,315.149994,281.082001,281.082001,281.082001,33054400
2015-01-04,281.145996,287.230011,257.612000,264.195007,264.195007,55629100
2015-01-05,265.084015,278.341003,265.084015,274.473999,274.473999,43962800
2015-01-06,274.610992,287.553009,272.696014,286.188995,286.188995,23245700
2015-01-07,286.076996,298.753998,283.079010,294.337006,294.337006,24866800
2015-01-08,294.135010,294.135010,282.174988,283.348999,283.348999,19982500
2015-01-09,282.382996,291.114014,280.532990,290.407990,290.407990,18718600
2015-01-10,287.303009,288.127014,273.966003,274.795990,274.795990,15264300
2015-01-11,274.608002,279.638000,265.039001,265.660004,265.660004,18200800
2015-01-12,266.145996,272.203003,265.200012,267.795990,267.795990,18880300
2015-01-13,267.394012,268.277008,219.906006,225.860992,225.860992,72843904
2015-01-14,223.893997,223.893997,171.509995,178.102997,178.102997,97638704
2015-01-15,176.897003,229.067001,176.897003,209.843994,209.843994,81773504
2015-01-16,209.070007,221.591003,199.770996,208.097000,208.097000,38421000
2015-01-17,207.834000,211.731003,194.875000,199.259995,199.259995,23469700
2015-01-18,200.050003,218.695007,194.505997,210.339005,210.339005,30085100
2015-01-19,211.470993,216.727997,207.317993,214.860992,214.860992,18658300
2015-01-20,212.906998,215.240997,205.153000,211.315002,211.315002,24051100
2015-01-21,211.378006,227.787994,211.212006,226.897003,226.897003,29924600
2015-01-22,227.322006,237.018997,226.434006,233.406006,233.406006,33544600
2015-01-23,233.516998,234.845001,225.195999,232.878998,232.878998,24621700
2015-01-24,232.699997,248.210007,230.022003,247.847000,247.847000,24782500
2015-01-25,247.352005,255.074005,243.889999,253.718002,253.718002,33582700
2015-01-26,254.078995,309.384003,254.078995,273.472992,273.472992,106794000
2015-01-27,273.166992,275.480011,250.653000,263.475006,263.475006,44399000
2015-01-28,263.351013,266.535004,227.046005,233.914993,233.914993,44352200
2015-01-29,233.348007,238.705994,220.712006,233.513000,233.513000,32213400
2015-01-30,232.772003,242.850998,225.839005,226.425003,226.425003,26605200
2015-01-31,226.440994,233.503998,216.309006,217.464005,217.464005,23348200
2015-02-01,216.867004,231.574005,212.014999,226.972000,226.972000,29128500
2015-02-02,226.490997,242.175003,222.658997,238.229004,238.229004,30612100
2015-02-03,237.453995,245.957001,224.483002,227.268005,227.268005,40783700
2015-02-04,227.511002,230.057999,221.113007,226.852997,226.852997,26594300
2015-02-05,227.664993,239.404999,214.725006,217.110992,217.110992,22516400
2015-02-06,216.923004,230.509995,216.231995,222.266006,222.266006,24435300
2015-02-07,222.632996,230.298996,222.606995,227.753998,227.753998,21604200
2015-02-08,227.692993,229.438004,221.076996,223.412003,223.412003,17145200
2015-02-09,223.389008,223.977005,217.018997,220.110001,220.110001,27791300
2015-02-10,220.281998,221.807007,215.332001,219.839005,219.839005,21115100
2015-02-11,219.731995,223.406006,218.074005,219.184998,219.184998,17201900
2015-02-12,219.207993,222.199005,217.613998,221.764008,221.764008,15206200
2015-02-13,221.968994,240.259003,221.261993,235.427002,235.427002,42744400
2015-02-14,235.528000,259.808014,235.528000,257.321014,257.321014,49732500
2015-02-15,257.506989,265.610992,227.684006,234.824997,234.824997,56552400
2015-02-16,234.824997,239.520996,229.022003,233.843002,233.843002,28153700
2015-02-17,233.421997,245.774994,232.313995,243.610001,243.610001,27363100
2015-02-18,243.779999,244.251007,232.339996,236.326004,236.326004,25200800
2015-02-19,236.410004,242.671997,235.591995,240.283005,240.283005,18270500
2015-02-20,240.251007,247.100998,239.298996,243.779007,243.779007,23876700
2015-02-21,243.751999,255.320007,243.184006,244.533997,244.533997,12284200
2015-02-22,244.544006,246.391998,233.850998,235.977005,235.977005,19527000
2015-02-23,235.994995,240.108994,232.421005,238.891998,238.891998,16400000
2015-02-24,238.998001,239.901001,236.401993,238.735001,238.735001,14200400
2015-02-25,238.889999,239.339996,235.529999,237.470001,237.470001,11496200
2015-02-26,237.337006,237.710007,234.257004,236.425995,236.425995,13619400
2015-02-27,236.436005,256.653015,236.436005,253.828003,253.828003,44013900
2015-02-28,253.520004,254.692001,249.479004,254.263000,254.263000,13949300
2015-03-01,254.283005,261.660004,245.932999,260.201996,260.201996,25213700
2015-03-02,260.356995,276.300995,258.312988,275.670013,275.670013,40465700
2015-03-03,275.045990,285.795990,268.161011,281.701996,281.701996,50461300
2015-03-04,281.989990,284.225006,268.126007,273.092010,273.092010,41383000
2015-03-05,272.739014,281.666992,264.769012,276.178009,276.178009,41302400
2015-03-06,275.600006,277.608002,270.015015,272.722992,272.722992,28918900
2015-03-07,272.294006,277.854004,270.132996,276.260986,276.260986,17825900
2015-03-08,276.433014,277.858002,272.565002,274.354004,274.354004,22067900
2015-03-09,274.812012,292.700989,273.893005,289.606995,289.606995,59178200
2015-03-10,289.862000,300.044006,289.743011,291.760010,291.760010,67770800
2015-03-11,291.524994,297.390991,290.507996,296.378998,296.378998,33963900
2015-03-12,296.127014,297.088013,292.412994,294.354004,294.354004,32585200
2015-03-13,294.118011,294.497986,285.337006,285.337006,285.337006,31421500
2015-03-14,284.441986,286.342010,280.976013,281.885010,281.885010,22612300
2015-03-15,281.424988,286.528992,280.996002,286.393005,286.393005,11970100
2015-03-16,285.684998,294.112000,285.684998,290.592987,290.592987,21516100
2015-03-17,290.595001,292.364990,284.373993,285.505005,285.505005,21497200
2015-03-18,285.066986,285.335999,249.869995,256.299011,256.299011,57008000
2015-03-19,255.880005,264.243988,248.636002,260.928009,260.928009,52732000
2015-03-20,260.955994,264.847992,259.161987,261.748993,261.748993,18456700
2015-03-21,261.644012,262.196014,255.649994,260.024994,260.024994,17130100
2015-03-22,259.916992,269.747009,259.589996,267.959991,267.959991,18438100
2015-03-23,267.894989,277.296997,261.744995,266.739990,266.739990,22811900
2015-03-24,266.576996,267.002991,244.154999,245.595001,245.595001,40073700
2015-03-25,247.472000,249.190002,236.514999,246.197006,246.197006,35866900
2015-03-26,246.276001,254.354004,244.904999,248.531998,248.531998,25730000
2015-03-27,248.565994,256.811005,245.212997,247.029007,247.029007,17274900
2015-03-28,246.975006,254.205002,246.975006,252.798004,252.798004,16040900
2015-03-29,252.740005,253.139008,240.850006,242.712997,242.712997,21699400
2015-03-30,242.878998,249.242004,239.214005,247.526001,247.526001,23009600
2015-03-31,247.453995,248.729996,242.738998,244.223999,244.223999,22672000
2015-04-01,244.223007,247.541000,241.160004,247.272003,247.272003,22877200
2015-04-02,247.089005,254.460999,245.416000,253.005005,253.005005,26272600
2015-04-03,253.074005,256.042999,251.878998,254.322006,254.322006,23146600
2015-04-04,254.291000,255.257996,251.100006,253.697006,253.697006,12493500
2015-04-05,253.761002,260.674988,251.942001,260.597992,260.597992,19649200
2015-04-06,260.721008,261.798004,254.574997,255.492004,255.492004,20034200
2015-04-07,255.274002,255.804993,252.205002,253.179993,253.179993,18467400
2015-04-08,253.063995,253.847000,244.214996,245.022003,245.022003,30086400
2015-04-09,244.751007,246.117996,239.399994,243.675995,243.675995,21643500
2015-04-10,243.694000,243.694000,232.770996,236.072006,236.072006,28882000
2015-04-11,236.016006,239.537003,234.175003,236.552002,236.552002,16365200
2015-04-12,236.535004,237.727997,233.494995,236.153000,236.153000,12387900
2015-04-13,235.949997,236.934998,221.996002,224.587006,224.587006,31181800
2015-04-14,224.759003,224.975998,216.322998,219.158997,219.158997,31719000
2015-04-15,219.072998,223.832993,218.649002,223.832993,223.832993,22562000
2015-04-16,223.917007,229.671997,223.917007,228.572998,228.572998,24805400
2015-04-17,228.574997,228.906006,221.942001,222.882004,222.882004,20429800
2015-04-18,222.852997,224.315994,220.876007,223.356003,223.356003,12939000
2015-04-19,223.455994,226.352997,222.373001,222.600006,222.600006,15021500
2015-04-20,222.612000,226.350998,221.977005,224.626007,224.626007,18364700
2015-04-21,224.619995,235.268997,224.300995,235.268997,235.268997,24978000
2015-04-22,235.602005,237.908997,233.475998,234.175995,234.175995,23847900
2015-04-23,234.052994,236.475006,233.199005,236.462006,236.462006,17036000
2015-04-24,235.970001,236.304993,229.932999,231.268005,231.268005,21448700
2015-04-25,231.235001,232.561005,226.337006,226.389999,226.389999,13957200
2015-04-26,226.410004,226.944000,214.873993,219.429993,219.429993,28943700
2015-04-27,219.429001,233.304993,218.022995,229.285995,229.285995,38574000
2015-04-28,228.968994,229.494995,223.069000,225.854996,225.854996,21469200
2015-04-29,225.591003,227.039993,223.429993,225.807999,225.807999,18936500
2015-04-30,225.692993,239.563004,224.992996,236.145004,236.145004,33818600
2015-05-01,235.938995,238.966003,232.078995,232.078995,232.078995,18815300
2015-05-02,232.341003,235.727005,232.341003,234.929993,234.929993,12535500
2015-05-03,234.880005,243.240005,234.082993,240.358002,240.358002,18494100
2015-05-04,240.356003,242.638000,237.809998,239.018005,239.018005,21223400
2015-05-05,238.852005,239.203995,232.054001,236.121002,236.121002,23929100
2015-05-06,236.248993,236.453995,229.231003,229.781998,229.781998,29587200
2015-05-07,229.662003,239.104996,228.572998,237.334000,237.334000,29064400
2015-05-08,237.203995,246.274994,236.274002,243.863007,243.863007,27445500
2015-05-09,243.768997,247.804001,239.639008,241.832001,241.832001,19790500
2015-05-10,241.729004,244.067993,238.848999,240.296005,240.296005,15019100
2015-05-11,240.298996,244.270004,239.376007,242.158005,242.158005,20892300
2015-05-12,242.145004,242.880997,240.098999,241.112000,241.112000,19282600
2015-05-13,241.397995,243.703995,235.044998,236.376999,236.376999,27180100
2015-05-14,236.214005,237.798996,234.057007,236.929001,236.929001,24413700
2015-05-15,236.955002,238.753006,236.794998,237.604996,237.604996,16329400
2015-05-16,237.643997,237.697006,235.294998,236.153000,236.153000,11089700
2015-05-17,236.009995,238.024994,236.009995,236.802002,236.802002,11134300
2015-05-18,236.886993,237.210007,232.460007,233.128006,233.128006,16780300
2015-05-19,233.037003,234.151001,231.817001,231.947006,231.947006,14241900
2015-05-20,231.889999,234.682999,231.841995,234.018005,234.018005,15499400
2015-05-21,234.016006,236.242004,233.835007,235.343994,235.343994,15108900
2015-05-22,235.320999,240.968994,235.059998,240.348007,240.348007,27003000
2015-05-23,240.285995,241.024994,238.690994,238.871994,238.871994,14605000
2015-05-24,238.975998,241.977997,238.811005,240.953003,240.953003,11508000
2015-05-25,240.927002,241.020996,236.636993,237.110001,237.110001,14423900
2015-05-26,237.104004,238.242004,235.692001,237.115997,237.115997,16425000
2015-05-27,237.065002,238.636002,236.695007,237.283005,237.283005,18837000
2015-05-28,237.257004,237.824005,236.651993,237.408005,237.408005,13829600
2015-05-29,237.376999,237.522003,235.731003,237.095993,237.095993,14805000
2015-05-30,237.091995,237.093002,232.046005,233.345001,233.345001,14098600
2015-05-31,233.134995,233.251999,229.542007,230.190002,230.190002,14730800
2015-06-01,230.233002,231.712997,221.296005,222.925995,222.925995,26090500
2015-06-02,222.893997,226.416000,222.419006,225.802994,225.802994,20459000
2015-06-03,225.735992,227.404007,223.929993,225.873993,225.873993,17752400
2015-06-04,225.772003,226.580994,224.054001,224.324005,224.324005,14728100
2015-06-05,224.154007,225.968002,223.179001,224.951996,224.951996,18056500
2015-06-06,225.005005,225.718994,224.378998,225.619003,225.619003,11131500
2015-06-07,225.595993,226.194000,222.651993,222.880997,222.880997,13318400
2015-06-08,222.878998,229.464005,222.839005,228.488998,228.488998,23378400
2015-06-09,228.537994,230.953995,227.929001,229.048004,229.048004,28353100
2015-06-10,228.994995,229.781998,228.009995,228.802994,228.802994,15904800
2015-06-11,228.854996,230.287003,228.766998,229.705002,229.705002,14416000
2015-06-12,229.705002,231.057007,229.313004,229.981995,229.981995,14017700
2015-06-13,229.919998,232.651993,229.210007,232.401993,232.401993,13305300
2015-06-14,232.442001,234.858002,232.003998,233.542999,233.542999,12165900
2015-06-15,233.421997,237.835999,233.421997,236.822998,236.822998,19912100
2015-06-16,236.764999,251.742004,236.121994,250.895004,250.895004,41612000
2015-06-17,250.822998,256.852997,246.475998,249.283997,249.283997,43858400
2015-06-18,249.427994,252.108002,244.126999,249.007004,249.007004,30980200
2015-06-19,249.042999,250.977005,243.787003,244.606003,244.606003,23965300
2015-06-20,244.529999,245.828003,240.626999,245.212006,245.212006,20608100
2015-06-21,245.100006,245.223999,241.882004,243.944000,243.944000,10600900
2015-06-22,243.968994,247.917007,243.779007,246.990005,246.990005,17692500
2015-06-23,246.927002,247.304001,243.132996,244.296005,244.296005,15108700
2015-06-24,244.281998,244.341003,240.514999,240.514999,240.514999,17344900
2015-06-25,240.365005,243.332001,240.365005,242.798996,242.798996,16133100
2015-06-26,242.604004,243.748993,241.552994,243.593994,243.593994,13983500
2015-06-27,243.548996,251.339005,243.117004,250.990005,250.990005,20488600
2015-06-28,250.955002,251.171997,247.434006,249.011002,249.011002,15137600
2015-06-29,248.720993,257.173004,248.580994,257.063995,257.063995,34742900
2015-06-30,257.036011,267.867004,255.945999,263.071991,263.071991,44533800
2015-07-01,263.345001,265.171997,255.774002,258.621002,258.621002,27029800
2015-07-02,258.552002,261.631012,254.115997,255.412003,255.412003,21551900
2015-07-03,255.459000,257.076996,253.505005,256.335999,256.335999,19033800
2015-07-04,256.490997,261.457001,254.199997,260.885986,260.885986,15620400
2015-07-05,260.804993,274.506012,258.700989,271.912994,271.912994,44156100
2015-07-06,271.108002,277.421997,267.600006,269.029999,269.029999,49154800
2015-07-07,269.963013,271.341003,264.832001,266.207001,266.207001,28857600
2015-07-08,265.981995,272.971008,264.385986,270.785004,270.785004,36980200
2015-07-09,270.826996,272.334991,267.085999,269.227997,269.227997,40301200
2015-07-10,269.156006,294.591003,268.802002,284.894012,284.894012,100390000
2015-07-11,284.880005,298.506012,283.529999,293.114990,293.114990,41109900
2015-07-12,293.140015,314.394012,292.505005,310.867004,310.867004,56405000
2015-07-13,310.826996,310.947998,281.010986,292.053986,292.053986,62053900
2015-07-14,292.033997,296.147003,286.638000,287.463989,287.463989,28727200
2015-07-15,288.045013,293.247986,285.367004,285.829010,285.829010,27486600
2015-07-16,286.041992,291.183014,275.239990,278.088989,278.088989,49482600
2015-07-17,278.091003,280.279999,272.042999,279.471985,279.471985,27591400
2015-07-18,279.330994,282.527008,274.075012,274.901001,274.901001,25187100
2015-07-19,274.766998,275.670013,272.513000,273.614014,273.614014,15332500
2015-07-20,273.498993,278.980988,272.959991,278.980988,278.980988,22711400
2015-07-21,278.881989,280.546997,275.419006,275.833008,275.833008,22930700
2015-07-22,275.657013,277.665985,274.381012,277.221985,277.221985,19389800
2015-07-23,277.341003,278.110992,275.716003,276.049011,276.049011,18531300
2015-07-24,276.005005,289.252991,275.253998,288.278015,288.278015,37199400
2015-07-25,288.164001,290.733002,286.002014,288.696991,288.696991,20662200
2015-07-26,288.640015,293.052002,287.705994,292.686005,292.686005,16032300
2015-07-27,292.639008,297.773987,287.450012,293.623993,293.623993,30592000
2015-07-28,293.632996,296.648987,293.423004,294.427002,294.427002,25453600
2015-07-29,294.484009,294.536011,288.777008,289.589996,289.589996,24672600
2015-07-30,289.102997,290.126007,286.567993,287.721985,287.721985,21635800
2015-07-31,287.696014,288.959015,282.343994,284.649994,284.649994,23629100
2015-08-01,284.686005,284.932007,278.112000,281.601013,281.601013,18995000
2015-08-02,280.449005,283.032013,277.528992,282.614014,282.614014,17722200
2015-08-03,282.806000,285.471008,280.233002,281.226990,281.226990,21474100
2015-08-04,281.225006,285.714996,281.225006,285.217987,285.217987,21908700
2015-08-05,284.846985,285.501007,281.488007,281.881989,281.881989,20128000
2015-08-06,281.906006,281.906006,278.403015,278.576996,278.576996,18792100
2015-08-07,278.740997,280.391998,276.365997,279.584991,279.584991,42484800
2015-08-08,279.742004,279.928009,260.709991,260.997009,260.997009,58533000
2015-08-09,261.115997,267.002991,260.467987,265.083008,265.083008,23789600
2015-08-10,265.477997,267.032013,262.596008,264.470001,264.470001,20979400
2015-08-11,264.342010,270.385986,264.093994,270.385986,270.385986,25433900
2015-08-12,270.597992,270.673004,265.468994,266.376007,266.376007,26815400
2015-08-13,266.183014,266.231995,262.841003,264.079987,264.079987,27685500
2015-08-14,264.131989,267.466003,261.477997,265.679993,265.679993,27091200
2015-08-15,265.528992,266.666992,261.295990,261.550995,261.550995,19321100
2015-08-16,261.865997,262.440002,257.040985,258.506989,258.506989,29717000
2015-08-17,258.489990,260.505005,257.117004,257.976013,257.976013,21617900
2015-08-18,257.925995,257.993011,211.078995,211.078995,211.078995,42147200
2015-08-19,225.671005,237.408997,222.766006,226.684006,226.684006,60869200
2015-08-20,226.899002,237.365005,226.899002,235.350006,235.350006,32275000
2015-08-21,235.354996,236.432007,231.723999,232.569000,232.569000,23173800
2015-08-22,232.662003,234.957001,222.703995,230.389999,230.389999,23205900
2015-08-23,230.376007,232.705002,225.580002,228.169006,228.169006,18406600
2015-08-24,228.112000,228.139008,210.442993,210.494995,210.494995,59220700
2015-08-25,210.067993,226.320999,199.567001,221.608994,221.608994,61089200
2015-08-26,222.076004,231.182999,220.203995,225.830994,225.830994,31808000
2015-08-27,226.050003,228.643005,223.684006,224.768997,224.768997,21905400
2015-08-28,224.701004,235.218994,220.925995,231.395996,231.395996,31336600
2015-08-29,231.548996,233.222000,227.330002,229.779999,229.779999,17142500
2015-08-30,229.895004,232.067993,226.246994,228.761002,228.761002,19412600
2015-08-31,229.113998,231.955994,225.914993,230.056000,230.056000,20710700
2015-09-01,230.255997,231.216003,226.860001,228.121002,228.121002,20575200
2015-09-02,228.026993,230.576996,226.475006,229.283997,229.283997,18760400
2015-09-03,229.324005,229.604996,226.667007,227.182999,227.182999,17482000
2015-09-04,227.214996,230.899994,227.050995,230.298004,230.298004,20962400
2015-09-05,230.199005,236.143005,229.442993,235.018997,235.018997,20671400
2015-09-06,234.869995,242.912003,234.681000,239.839996,239.839996,25473700
2015-09-07,239.934006,242.106003,238.722000,239.847000,239.847000,21192200
2015-09-08,239.845993,245.781006,239.677994,243.606995,243.606995,26879200
2015-09-09,243.414993,244.416000,237.820999,238.167999,238.167999,23635700
2015-09-10,238.335999,241.292999,235.791000,238.477005,238.477005,21215500
2015-09-11,238.328995,241.169006,238.328995,240.106995,240.106995,19224700
2015-09-12,239.854996,240.123993,234.753998,235.229004,235.229004,17962600
2015-09-13,235.242004,235.934998,229.332001,230.511993,230.511993,18478800
2015-09-14,230.608994,232.440002,227.960999,230.643997,230.643997,20997800
2015-09-15,230.492004,259.182007,229.822006,230.304001,230.304001,19177800
2015-09-16,230.250000,231.214996,227.401993,229.091003,229.091003,20144200
2015-09-17,229.076004,230.285004,228.925995,229.809998,229.809998,18935400
2015-09-18,233.520996,234.352997,232.184998,232.975006,232.975006,20242200
2015-09-19,232.858002,233.205002,231.089005,231.492996,231.492996,12712600
2015-09-20,231.399002,232.365005,230.910004,231.212006,231.212006,14444700
2015-09-21,231.216995,231.216995,226.520996,227.085007,227.085007,19678800
2015-09-22,226.968994,232.386002,225.117004,230.617996,230.617996,25009300
2015-09-23,230.936005,231.835007,229.591003,230.283005,230.283005,17254100
2015-09-24,230.358002,235.649002,230.294998,234.529007,234.529007,25097800
2015-09-25,234.362000,237.427002,233.684006,235.143997,235.143997,22363600
2015-09-26,235.076004,235.403000,233.358002,234.339996,234.339996,13724100
2015-09-27,234.139008,234.526001,232.475998,232.757004,232.757004,14179900
2015-09-28,232.835999,239.339005,232.466995,239.141998,239.141998,24713000
2015-09-29,239.016006,239.802002,235.927994,236.686996,236.686996,22691300
2015-09-30,236.639999,237.733994,235.628998,236.059998,236.059998,19743500
2015-10-01,236.003998,238.445007,235.615997,237.548996,237.548996,20488800
2015-10-02,237.264008,238.541000,236.602997,237.292999,237.292999,19677900
2015-10-03,237.201996,239.315002,236.944000,238.729996,238.729996,16482700
2015-10-04,238.531006,238.968002,237.940002,238.259003,238.259003,12999000
2015-10-05,238.147003,240.382996,237.035004,240.382996,240.382996,23335900
2015-10-06,240.363998,246.934998,240.136002,246.063004,246.063004,27535100
2015-10-07,246.169998,246.681000,242.585007,242.968994,242.968994,22999200
2015-10-08,243.074997,244.251007,242.179001,242.304001,242.304001,18515300
2015-10-09,242.498001,244.227997,242.121994,243.931000,243.931000,17353100
2015-10-10,243.740005,245.319000,243.074005,244.940994,244.940994,15912700
2015-10-11,244.742004,247.242996,244.151993,247.050003,247.050003,16827300
2015-10-12,246.875000,247.453995,245.179001,245.307999,245.307999,17388300
2015-10-13,245.199997,250.235992,243.757004,249.507996,249.507996,28198500
2015-10-14,249.492996,254.274994,248.903000,251.988998,251.988998,27462600
2015-10-15,252.106995,255.962006,252.046005,254.320007,254.320007,25223500
2015-10-16,254.296005,266.135010,253.925995,262.868988,262.868988,35901500
2015-10-17,262.747009,273.578003,262.367004,270.640015,270.640015,43199600
2015-10-18,270.907013,271.667999,260.777008,261.643005,261.643005,22434300
2015-10-19,261.860992,264.820007,260.950989,263.437012,263.437012,25258800
2015-10-20,263.571991,270.834991,263.226990,269.463013,269.463013,30889800
2015-10-21,269.306000,270.769989,263.838989,266.272003,266.272003,25637300
2015-10-22,266.496002,276.510010,266.135010,274.023010,274.023010,37808600
2015-10-23,273.648987,278.683990,273.542999,276.496002,276.496002,29442500
2015-10-24,276.503998,281.705994,276.503998,281.653992,281.653992,25942400
2015-10-25,281.445007,294.058990,281.445007,283.679993,283.679993,45717100
2015-10-26,283.627991,285.299988,280.510010,285.299988,285.299988,32108800
2015-10-27,285.181000,296.212006,285.007996,293.787994,293.787994,46331800
2015-10-28,293.703003,306.330994,293.703003,304.618011,304.618011,50808100
2015-10-29,304.324005,318.170013,301.822998,313.855011,313.855011,64495900
2015-10-30,313.942993,334.169006,313.940002,328.015015,328.015015,78305000
2015-10-31,328.511993,332.777008,309.251007,314.165985,314.165985,48598100
2015-11-01,315.005005,327.471985,311.881012,325.431000,325.431000,37001100
2015-11-02,325.941986,365.359985,323.209015,361.188995,361.188995,101918000
2015-11-03,361.872986,417.899994,357.647003,403.416992,403.416992,206162000
2015-11-04,403.664001,495.562012,380.548004,411.562988,411.562988,263900000
2015-11-05,408.076996,447.561005,374.580994,386.354004,386.354004,151824992
2015-11-06,388.046997,395.835999,354.024994,374.470001,374.470001,122687000
2015-11-07,374.269012,390.585999,372.433014,386.481995,386.481995,56625100
2015-11-08,384.278015,389.894989,368.700012,373.368011,373.368011,51817600
2015-11-09,374.324005,385.278015,362.894989,380.256989,380.256989,68224400
2015-11-10,379.984009,381.386993,329.108002,336.819000,336.819000,95797904
2015-11-11,339.820007,340.584991,300.997009,311.084015,311.084015,107070000
2015-11-12,314.079010,345.080994,313.355988,338.152008,338.152008,78477800
2015-11-13,338.497986,340.914001,326.075012,336.752991,336.752991,52003000
2015-11-14,336.623993,338.181000,329.970001,332.906006,332.906006,38612000
2015-11-15,333.050995,334.661987,317.489990,320.165985,320.165985,44213100
2015-11-16,319.734985,331.626007,315.904999,330.751007,330.751007,47980100
2015-11-17,330.362000,338.350006,329.614014,335.093994,335.093994,51001600
2015-11-18,334.592987,336.531006,330.640015,334.589996,334.589996,43783800
2015-11-19,334.678986,335.334015,325.273010,326.148987,326.148987,45011100
2015-11-20,326.411011,326.472992,312.217010,322.022003,322.022003,53152900
2015-11-21,322.092010,328.158997,319.595001,326.927002,326.927002,28200500
2015-11-22,326.975006,327.010010,321.259003,324.536011,324.536011,23439400
2015-11-23,324.350006,325.118011,321.290009,323.045990,323.045990,27478900
2015-11-24,323.014008,323.058014,318.118011,320.045990,320.045990,29362600
2015-11-25,320.045013,329.134003,316.769989,328.205994,328.205994,41666900
2015-11-26,328.303009,366.756989,328.229004,352.683990,352.683990,106105000
2015-11-27,351.860992,363.588989,347.869995,358.041992,358.041992,55179100
2015-11-28,357.140991,359.536011,352.171997,357.381012,357.381012,36816600
2015-11-29,357.471985,371.938995,355.665985,371.294006,371.294006,40409300
2015-11-30,371.437012,382.363007,370.382996,377.321014,377.321014,71701600
2015-12-01,377.414001,378.931000,356.562988,362.488007,362.488007,60452200
2015-12-02,361.845001,362.231995,349.464996,359.187012,359.187012,54160500
2015-12-03,359.330994,370.274994,357.411987,361.045990,361.045990,50714900
2015-12-04,361.261993,363.515991,355.756989,363.183014,363.183014,35784100
2015-12-05,363.721008,389.785004,363.229004,388.949005,388.949005,66282200
2015-12-06,389.554993,402.808990,387.088989,388.782990,388.782990,77762000
2015-12-07,389.977997,399.968994,385.411011,395.536011,395.536011,63455800
2015-12-08,395.753998,415.562988,389.950012,415.562988,415.562988,57801400
2015-12-09,414.441010,423.119995,406.290985,417.562988,417.562988,90917200
2015-12-10,417.988007,419.509003,411.548004,415.479004,415.479004,52138900
2015-12-11,415.281006,451.937988,415.281006,451.937988,451.937988,110944000
2015-12-12,452.334991,469.102997,410.740997,434.997009,434.997009,131969000
2015-12-13,431.660004,441.679993,426.268005,433.755005,433.755005,55050600
2015-12-14,433.272003,447.141998,430.455994,444.182007,444.182007,130496000
2015-12-15,443.877991,465.321014,443.877991,465.321014,465.321014,83121104
2015-12-16,465.208008,465.208008,443.851013,454.933990,454.933990,107944000
2015-12-17,454.777008,457.859985,448.858002,456.078003,456.078003,47978400
2015-12-18,455.846985,465.177002,454.940002,463.615997,463.615997,60220100
2015-12-19,463.552002,465.580994,456.765015,462.321991,462.321991,47892700
2015-12-20,462.234009,462.644989,434.338013,442.684998,442.684998,75409400
2015-12-21,442.838013,444.729004,427.312012,438.639008,438.639008,77639696
2015-12-22,437.436005,443.687988,435.515991,436.571991,436.571991,50840400
2015-12-23,436.720001,444.528992,436.618988,442.401001,442.401001,47161400
2015-12-24,443.091003,458.455994,443.076996,454.984985,454.984985,57157200
2015-12-25,454.855011,458.304993,452.075012,455.653015,455.653015,39078500
2015-12-26,455.756012,457.489014,405.760010,417.273987,417.273987,116166000
2015-12-27,416.514008,424.006989,408.882996,422.822998,422.822998,53591200
2015-12-28,423.342987,429.769012,418.480988,422.278992,422.278992,49638600
2015-12-29,422.097992,432.983002,420.627014,432.983002,432.983002,51596500
2015-12-30,433.299988,434.386993,422.084015,426.619995,426.619995,46889400
2015-12-31,425.875000,432.920990,418.734985,430.566986,430.566986,45996600
2016-01-01,430.721008,436.246002,427.515015,434.334015,434.334015,36278900
2016-01-02,434.622009,436.062012,431.869995,433.437988,433.437988,30096600
2016-01-03,433.578003,433.743011,424.705994,430.010986,430.010986,39633800
2016-01-04,430.061005,434.516998,429.084015,433.091003,433.091003,38477500
2016-01-05,433.069000,434.182007,429.675995,431.959991,431.959991,34522600
2016-01-06,431.855988,431.855988,426.341003,429.105011,429.105011,34042500
2016-01-07,430.010986,458.765991,429.076996,458.048004,458.048004,87562200
2016-01-08,457.537994,462.933990,447.937988,453.230011,453.230011,56993000
2016-01-09,453.382996,454.640015,446.889008,447.610992,447.610992,32278000
2016-01-10,448.238007,448.308990,440.351013,447.990997,447.990997,35995900
2016-01-11,448.697998,450.661987,443.855011,448.428009,448.428009,40450000
2016-01-12,448.182007,448.182007,435.690002,435.690002,435.690002,115607000
2016-01-13,434.665009,435.186005,424.442993,432.371002,432.371002,173888000
2016-01-14,432.287994,433.324005,427.845001,430.306000,430.306000,43945500
2016-01-15,430.255005,430.255005,364.330994,364.330994,364.330994,153351008
2016-01-16,365.072998,390.557007,354.914001,387.536011,387.536011,120352000
2016-01-17,387.152008,390.964996,380.092010,382.299011,382.299011,45319600
2016-01-18,381.733002,388.104004,376.665009,387.167999,387.167999,54403900
2016-01-19,387.026001,387.730011,378.971985,380.148987,380.148987,46819800
2016-01-20,379.739990,425.266998,376.598999,420.230011,420.230011,121720000
2016-01-21,419.631989,422.877014,406.299988,410.261993,410.261993,68338000
2016-01-22,409.751007,410.410004,375.282013,382.492004,382.492004,91546600
2016-01-23,382.433990,394.542999,381.980988,387.490997,387.490997,56247400
2016-01-24,388.101990,405.484985,387.510010,402.971008,402.971008,54824800
2016-01-25,402.316986,402.316986,388.553986,391.726013,391.726013,59062400
2016-01-26,392.002014,397.765991,390.575012,392.153015,392.153015,58147000
2016-01-27,392.444000,396.842987,391.782013,394.971985,394.971985,47424400
2016-01-28,395.145996,395.502014,379.734985,380.289001,380.289001,59247900
2016-01-29,380.108002,384.378998,365.451996,379.473999,379.473999,86125296
2016-01-30,378.864990,380.916992,376.490997,378.255005,378.255005,30284400
2016-01-31,378.292999,380.346985,367.834991,368.766998,368.766998,37894300
2016-02-01,369.350006,378.071991,367.957001,373.056000,373.056000,51656700
2016-02-02,372.920013,375.882996,372.920013,374.447998,374.447998,40378700
2016-02-03,374.645996,374.950012,368.045013,369.949005,369.949005,45933400
2016-02-04,370.174011,391.608002,369.993011,389.593994,389.593994,69285504
2016-02-05,388.898010,391.093994,385.571991,386.549011,386.549011,43825000
2016-02-06,386.588989,386.631012,372.386993,376.522003,376.522003,49249300
2016-02-07,376.514008,380.871002,374.903015,376.619995,376.619995,37076300
2016-02-08,376.756989,379.878998,373.334015,373.446991,373.446991,47671100
2016-02-09,373.423004,377.246002,372.898010,376.028992,376.028992,55318500
2016-02-10,376.145996,385.483002,375.782990,381.648987,381.648987,85130896
2016-02-11,382.114014,383.130005,376.398987,379.653992,379.653992,74375600
2016-02-12,379.686005,384.954010,379.600006,384.263000,384.263000,67042800
2016-02-13,384.640991,391.859985,384.640991,391.859985,391.859985,61911700
2016-02-14,392.932007,407.230011,392.932007,407.230011,407.230011,74469800
2016-02-15,407.567993,410.381012,397.748993,400.184998,400.184998,74070496
2016-02-16,401.432007,408.945007,401.432007,407.488007,407.488007,73093104
2016-02-17,407.656006,421.166992,406.783997,416.321991,416.321991,83193600
2016-02-18,416.571991,425.996002,415.638000,422.372986,422.372986,76752600
2016-02-19,422.730011,423.104004,417.604004,420.785004,420.785004,55711300
2016-02-20,421.601013,441.984009,421.601013,437.164001,437.164001,93992096
2016-02-21,437.773010,448.045990,429.076996,438.798004,438.798004,89820704
2016-02-22,438.989014,439.045013,432.916992,437.747986,437.747986,85385200
2016-02-23,438.255005,439.858002,417.821014,420.735992,420.735992,85244896
2016-02-24,420.955994,425.549988,413.907013,424.954987,424.954987,67743696
2016-02-25,425.036987,427.718994,420.415009,424.544006,424.544006,70798000
2016-02-26,424.628998,432.152008,421.619995,432.152008,432.152008,61486000
2016-02-27,432.838989,434.230988,428.102997,432.519012,432.519012,41893600
2016-02-28,432.571014,435.683014,423.820007,433.503998,433.503998,53033400
2016-02-29,433.437988,441.506989,431.692993,437.696991,437.696991,60694700
2016-03-01,437.916992,439.653015,432.319000,435.122986,435.122986,74895800
2016-03-02,435.131012,435.916992,423.989014,423.989014,423.989014,74955296
2016-03-03,423.911987,425.372986,419.411011,421.651001,421.651001,100484000
2016-03-04,421.835999,425.178009,410.938995,410.938995,410.938995,90856096
2016-03-05,410.781006,411.256989,394.035004,400.570007,400.570007,135384992
2016-03-06,400.524994,411.907013,395.778015,407.707001,407.707001,91212496
2016-03-07,407.756989,415.916992,406.308990,414.321014,414.321014,85762400
2016-03-08,414.464996,416.243011,411.093994,413.971985,413.971985,70311696
2016-03-09,413.894012,416.032013,411.605988,414.859985,414.859985,70012304
2016-03-10,414.743988,417.511993,413.251007,417.131012,417.131012,81022896
2016-03-11,417.238007,423.925995,417.013000,421.690002,421.690002,73969696
2016-03-12,421.605011,421.795013,410.093994,411.623993,411.623993,92712896
2016-03-13,411.648010,416.604004,411.641998,414.065002,414.065002,74322800
2016-03-14,414.200989,416.683990,414.200989,416.437988,416.437988,95259400
2016-03-15,416.388000,418.131012,414.984985,416.829987,416.829987,66781700
2016-03-16,416.888000,417.686005,415.911987,417.010986,417.010986,65185800
2016-03-17,417.889008,420.997009,417.889008,420.621002,420.621002,83528600
2016-03-18,420.546997,420.546997,406.136993,409.548004,409.548004,104940000
2016-03-19,409.265015,410.984009,407.230011,410.444000,410.444000,58423000
2016-03-20,410.401001,414.625000,410.401001,413.755005,413.755005,45947900
2016-03-21,413.417999,413.417999,410.381012,413.307007,413.307007,61655400
2016-03-22,413.131989,418.375000,412.531006,418.088989,418.088989,66813300
2016-03-23,418.161011,419.268005,417.364014,418.040985,418.040985,61444200
2016-03-24,418.424011,418.679993,415.485992,416.394012,416.394012,68346704
2016-03-25,416.507996,418.079987,415.558014,417.177002,417.177002,52560000
2016-03-26,417.364990,418.987000,416.259003,417.945007,417.945007,44650400
2016-03-27,418.140015,428.796997,417.710999,426.765015,426.765015,71229400
2016-03-28,426.548004,426.856995,423.292999,424.230988,424.230988,68522800
2016-03-29,424.303986,426.203003,412.681000,416.515991,416.515991,75411504
2016-03-30,416.834015,416.834015,412.496002,414.816010,414.816010,66034100
2016-03-31,415.256989,418.368988,415.256989,416.729004,416.729004,60215200
2016-04-01,416.760010,418.173004,415.830994,417.959991,417.959991,51235700
2016-04-02,418.421997,422.080994,418.421997,420.872986,420.872986,45681200
2016-04-03,421.173004,421.579987,419.696991,420.903992,420.903992,38053700
2016-04-04,421.299011,422.342987,419.601013,421.444000,421.444000,50634300
2016-04-05,421.016998,424.256989,420.614014,424.029999,424.029999,60718000
2016-04-06,424.283997,424.527008,422.729004,423.412994,423.412994,59091000
2016-04-07,423.619995,423.657013,420.518005,422.744995,422.744995,57858600
2016-04-08,422.907013,425.360992,419.635010,420.348999,420.348999,63454700
2016-04-09,420.811005,420.890991,416.515015,419.411011,419.411011,49792700
2016-04-10,419.592010,422.434998,419.256989,421.563995,421.563995,73478600
2016-04-11,421.872009,422.739014,420.532990,422.483002,422.483002,50747500
2016-04-12,422.842987,427.277008,422.842987,425.190002,425.190002,70728800
2016-04-13,425.631989,426.657990,422.915985,423.734009,423.734009,69060400
2016-04-14,423.934998,425.371002,423.013000,424.282013,424.282013,45281000
2016-04-15,424.427002,429.928009,424.427002,429.713013,429.713013,54801500
2016-04-16,429.575012,432.625000,428.984009,430.571991,430.571991,39392800
2016-04-17,430.635986,431.371002,426.079010,427.398987,427.398987,52125900
2016-04-18,427.610992,429.273987,427.085999,428.591003,428.591003,55670900
2016-04-19,428.703003,436.019989,428.104004,435.509003,435.509003,52810500
2016-04-20,435.324005,443.053986,434.406006,441.389008,441.389008,72890096
2016-04-21,441.415985,450.548004,440.951996,449.424988,449.424988,68204704
2016-04-22,449.687988,449.809998,444.149994,445.737000,445.737000,58804400
2016-04-23,445.860992,450.282013,444.330994,450.282013,450.282013,50485400
2016-04-24,450.559998,460.145996,448.928009,458.554993,458.554993,68198400
2016-04-25,459.121002,466.619995,453.592010,461.425995,461.425995,87091800
2016-04-26,461.648010,467.964996,461.621002,466.088989,466.088989,78971904
2016-04-27,466.261993,467.079010,444.134003,444.687012,444.687012,93564896
2016-04-28,445.037994,449.550995,436.649994,449.010986,449.010986,74064704
2016-04-29,449.407990,455.384003,446.016998,455.096985,455.096985,49258500
2016-04-30,455.178009,455.587006,447.696991,448.317993,448.317993,69322600
2016-05-01,448.484009,452.479004,447.927002,451.875000,451.875000,40660100
2016-05-02,451.933014,452.445007,441.776001,444.669006,444.669006,92127000
2016-05-03,444.726990,451.096985,442.617004,450.303986,450.303986,59366400
2016-05-04,450.183014,450.377991,445.630005,446.721985,446.721985,50407300
2016-05-05,446.710999,448.506012,445.882996,447.976013,447.976013,50440800
2016-05-06,447.941986,461.375000,447.067993,459.602997,459.602997,72796800
2016-05-07,459.639008,460.674988,457.324005,458.536011,458.536011,38364500
2016-05-08,458.428986,459.416992,455.983002,458.548004,458.548004,40315000
2016-05-09,458.205994,462.480988,456.531006,460.483002,460.483002,55493100
2016-05-10,460.518005,461.928986,448.954010,450.894989,450.894989,58956100
2016-05-11,450.864014,454.575989,450.864014,452.727997,452.727997,50605200
2016-05-12,452.446991,454.949005,449.250000,454.765991,454.765991,59849300
2016-05-13,454.850006,457.054993,453.453003,455.670013,455.670013,60845000
2016-05-14,455.822998,456.835999,454.786011,455.670990,455.670990,37209000
2016-05-15,455.759003,458.691986,455.459015,457.567993,457.567993,28514000
2016-05-16,457.585999,458.200012,452.945007,454.162994,454.162994,59171500
2016-05-17,454.009003,455.071991,453.605011,453.782990,453.782990,64100300
2016-05-18,453.691010,455.997986,453.299011,454.618988,454.618988,86850096
2016-05-19,454.523987,454.632996,438.714996,438.714996,438.714996,96027400
2016-05-20,437.792999,444.053986,437.389008,442.675995,442.675995,81987904
2016-05-21,442.966003,443.778015,441.705994,443.187988,443.187988,42762300
2016-05-22,443.217987,443.427002,439.035004,439.322998,439.322998,39657600
2016-05-23,439.347992,444.345001,438.822998,444.154999,444.154999,50582500
2016-05-24,444.290985,447.100006,443.929993,445.980988,445.980988,65783100
2016-05-25,446.062012,450.298004,446.062012,449.598999,449.598999,65231000
2016-05-26,449.671997,453.644012,447.895996,453.384003,453.384003,65203800
2016-05-27,453.520996,478.148987,453.520996,473.463989,473.463989,164780992
2016-05-28,473.028992,533.473022,472.699005,530.039978,530.039978,181199008
2016-05-29,527.476990,553.960022,512.179016,526.232971,526.232971,148736992
2016-05-30,528.471008,544.348999,522.963013,533.864014,533.864014,87958704
2016-05-31,534.190979,546.617981,520.661987,531.385986,531.385986,138450000
2016-06-01,531.106995,543.080017,525.635986,536.919983,536.919983,86061800
2016-06-02,536.515015,540.351990,533.078003,537.971985,537.971985,60378200
2016-06-03,537.682007,574.638000,536.919983,569.193970,569.193970,122020000
2016-06-04,569.705017,590.132019,564.237976,572.726990,572.726990,94925296
2016-06-05,573.307983,582.807983,569.177979,574.976990,574.976990,68874096
2016-06-06,574.601990,586.469971,574.601990,585.536987,585.536987,72138896
2016-06-07,585.445007,590.258972,567.513977,576.596985,576.596985,107770000
2016-06-08,577.166992,582.838989,573.130005,581.645020,581.645020,80265800
2016-06-09,582.203003,582.203003,570.950989,574.630005,574.630005,71301000
2016-06-10,575.836975,579.127014,573.325012,577.469971,577.469971,66991900
2016-06-11,578.674011,607.116028,578.674011,606.726990,606.726990,82357000
2016-06-12,609.684021,684.843994,607.039001,672.783997,672.783997,277084992
2016-06-13,671.653992,716.004028,664.487000,704.375977,704.375977,243295008
2016-06-14,704.504028,704.504028,662.804016,685.559021,685.559021,186694000
2016-06-15,685.684998,696.302979,672.560974,694.468994,694.468994,99223800
2016-06-16,696.523010,773.721985,696.523010,766.307983,766.307983,271633984
2016-06-17,768.487000,775.356018,716.556030,748.908997,748.908997,363320992
2016-06-18,748.755981,777.989990,733.929016,756.226990,756.226990,252718000
2016-06-19,756.687988,766.620972,745.627991,763.781006,763.781006,136184992
2016-06-20,763.927002,764.083984,732.726990,737.226013,737.226013,174511008
2016-06-21,735.882996,735.882996,639.070007,666.651978,666.651978,309944000
2016-06-22,665.914978,678.669983,587.482971,596.116028,596.116028,266392992
2016-06-23,597.442993,629.327026,558.138977,623.976990,623.976990,253462000
2016-06-24,625.575012,681.726990,625.271973,665.299011,665.299011,224316992
2016-06-25,665.281006,691.731018,646.559021,665.122986,665.122986,126656000
2016-06-26,665.931030,665.979980,616.934021,629.367004,629.367004,109225000
2016-06-27,629.348999,655.275024,620.523987,655.275024,655.275024,122134000
2016-06-28,658.101990,659.247986,637.773010,647.000977,647.000977,138384992
2016-06-29,644.122009,644.682007,628.283997,639.890015,639.890015,142456000
2016-06-30,640.591003,675.403015,636.607971,673.336975,673.336975,138980000
2016-07-01,672.515015,686.153992,669.593994,676.296021,676.296021,134431008
2016-07-02,676.734009,703.702026,676.398987,703.702026,703.702026,112354000
2016-07-03,704.968018,704.968018,649.008972,658.664001,658.664001,129512000
2016-07-04,658.804016,683.661987,650.507996,683.661987,683.661987,92008400
2016-07-05,683.208984,683.491028,665.065979,670.627014,670.627014,130476000
2016-07-06,670.418030,681.898010,670.418030,677.330994,677.330994,134960992
2016-07-07,678.090027,682.432007,611.833984,640.562012,640.562012,258091008
2016-07-08,640.687988,666.706970,636.466980,666.523010,666.523010,141970000
2016-07-09,666.383972,666.383972,633.398987,650.960022,650.960022,180536000
2016-07-10,650.598999,652.294006,641.263977,649.359985,649.359985,102532000
2016-07-11,648.484009,659.629028,644.979980,647.658997,647.658997,107910000
2016-07-12,648.283020,675.258972,646.778992,664.551025,664.551025,138172992
2016-07-13,664.796997,668.700012,654.468018,654.468018,654.468018,131449000
2016-07-14,652.922974,662.901978,652.922974,658.078003,658.078003,98511400
2016-07-15,659.171021,667.077026,659.039978,663.255005,663.255005,81673104
2016-07-16,663.781006,666.460022,659.333984,660.767029,660.767029,50330200
2016-07-17,661.992981,682.364990,661.992981,679.458984,679.458984,74407904
2016-07-18,679.809021,681.554993,668.625000,673.106018,673.106018,69465000
2016-07-19,672.737976,673.276978,667.632019,672.864014,672.864014,61203300
2016-07-20,672.806030,672.929016,663.359985,665.684998,665.684998,94636400
2016-07-21,665.228027,666.218994,660.414978,665.012024,665.012024,60491800
2016-07-22,664.921997,666.583008,646.721985,650.619019,650.619019,134169000
2016-07-23,650.726013,656.366028,648.523987,655.556030,655.556030,69532200
2016-07-24,655.409973,663.109985,652.793030,661.284973,661.284973,118184000
2016-07-25,661.263000,661.828003,653.395020,654.096985,654.096985,78176496
2016-07-26,654.226013,656.224976,645.879028,651.783997,651.783997,225135008
2016-07-27,651.627014,657.455994,648.447021,654.351990,654.351990,147460992
2016-07-28,654.492004,657.594971,654.492004,655.034973,655.034973,86428400
2016-07-29,655.111023,657.796021,654.786011,656.992004,656.992004,60703500
2016-07-30,657.012024,658.223022,654.208984,655.046997,655.046997,38456100
2016-07-31,655.099976,655.284973,624.364990,624.681030,624.681030,110818000
2016-08-01,624.601990,626.119019,605.883972,606.271973,606.271973,121887000
2016-08-02,606.396973,612.848022,531.333984,547.465027,547.465027,330932992
2016-08-03,548.656006,573.359985,541.546997,566.354980,566.354980,207982000
2016-08-04,566.328979,579.495972,565.776978,578.289001,578.289001,125292000
2016-08-05,578.281006,578.281006,569.981995,575.043030,575.043030,66127900
2016-08-06,575.030029,588.395996,569.468994,587.778015,587.778015,80797296
2016-08-07,587.770996,597.513000,586.815979,592.690002,592.690002,82398400
2016-08-08,592.736023,592.994019,588.046997,591.054016,591.054016,61194100
2016-08-09,591.038025,591.091003,584.793030,587.801025,587.801025,92228096
2016-08-10,587.648010,599.984009,586.370972,592.103027,592.103027,102905000
2016-08-11,592.124023,597.541992,589.119995,589.119995,589.119995,74514400
2016-08-12,588.797974,589.909973,583.810974,587.559021,587.559021,69218000
2016-08-13,587.356995,589.773987,584.979004,585.588013,585.588013,43563000
2016-08-14,585.588989,585.666016,564.781006,570.473022,570.473022,60851100
2016-08-15,570.494019,573.580017,563.239990,567.239990,567.239990,57262300
2016-08-16,567.242981,581.737976,566.716003,577.439026,577.439026,58405200
2016-08-17,577.760986,580.893982,571.429993,573.216003,573.216003,54443000
2016-08-18,573.706970,577.791992,573.429993,574.317993,574.317993,59896600
2016-08-19,574.338989,578.237976,574.182007,575.630005,575.630005,50631600
2016-08-20,576.083984,582.817993,575.456970,581.697021,581.697021,45301400
2016-08-21,581.939026,584.158020,580.218018,581.307983,581.307983,38299400
2016-08-22,581.310974,588.447998,580.593994,586.752991,586.752991,72844000
2016-08-23,586.770996,589.473999,581.633972,583.414978,583.414978,85349200
2016-08-24,583.411987,583.590027,579.854980,580.182007,580.182007,56328200
2016-08-25,580.179993,580.450989,575.166992,577.760986,577.760986,136130000
2016-08-26,577.752991,580.622986,576.857971,579.651001,579.651001,48856800
2016-08-27,579.452026,579.844971,568.630005,569.947021,569.947021,59698300
2016-08-28,569.830017,574.038025,569.739990,573.911987,573.911987,86301600
2016-08-29,574.070984,576.278015,573.465027,574.106995,574.106995,110398000
2016-08-30,574.114014,578.356995,574.114014,577.502991,577.502991,70342400
2016-08-31,577.591003,577.861023,573.642029,575.471985,575.471985,75840896
2016-09-01,575.546021,576.310974,571.814026,572.302979,572.302979,76923400
2016-09-02,572.409973,575.643005,570.810974,575.536987,575.536987,79910800
2016-09-03,575.554993,599.500000,574.056030,598.211975,598.211975,159014000
2016-09-04,598.590027,611.836975,596.848022,608.633972,608.633972,97942896
2016-09-05,608.989990,609.054993,602.242004,606.590027,606.590027,82446800
2016-09-06,606.505981,610.830017,605.091003,610.435974,610.435974,78529104
2016-09-07,610.572998,614.544983,608.513000,614.544006,614.544006,75032400
2016-09-08,614.635010,628.770020,613.843994,626.315979,626.315979,86713000
2016-09-09,626.351990,626.830017,620.263000,622.861023,622.861023,64550200
2016-09-10,622.927002,625.094971,622.395020,623.508972,623.508972,45016800
2016-09-11,623.424011,628.817993,600.505981,606.718994,606.718994,73610800
2016-09-12,607.005005,608.458984,605.411011,608.242981,608.242981,72812304
2016-09-13,608.025024,611.192993,606.924988,609.241028,609.241028,86920600
2016-09-14,608.841003,611.952026,608.409973,610.684021,610.684021,47877700
2016-09-15,610.588013,611.085999,607.155029,607.155029,607.155029,59464600
2016-09-16,607.245972,609.260986,606.734985,606.973022,606.973022,64963400
2016-09-17,607.218018,607.859985,605.192017,605.984009,605.984009,37140300
2016-09-18,606.283020,610.158020,605.856018,609.874023,609.874023,48679400
2016-09-19,609.870972,610.932007,608.270020,609.226990,609.226990,54796400
2016-09-20,609.254028,609.525024,607.937988,608.312012,608.312012,72710896
2016-09-21,603.588013,603.588013,595.882996,597.148987,597.148987,82776200
2016-09-22,597.278992,598.487000,596.213013,596.297974,596.297974,67085300
2016-09-23,596.198975,603.205017,595.786011,602.841980,602.841980,51067000
2016-09-24,602.960999,604.580017,602.044983,602.625000,602.625000,35359500
2016-09-25,602.749023,603.380981,599.710999,600.825989,600.825989,33977800
2016-09-26,600.807007,608.143005,600.348999,608.043030,608.043030,59153800
2016-09-27,608.021973,608.247986,604.109985,606.166016,606.166016,49422400
2016-09-28,606.242981,606.590027,604.606995,604.728027,604.728027,48722600
2016-09-29,605.018982,606.823975,604.848022,605.692993,605.692993,55658600
2016-09-30,605.715027,609.734985,604.142029,609.734985,609.734985,56122400
2016-10-01,609.929016,615.237000,609.929016,613.982971,613.982971,56357000
2016-10-02,613.947998,614.005005,609.682007,610.892029,610.892029,39249800
2016-10-03,610.968018,612.567993,610.455017,612.132996,612.132996,46798300
2016-10-04,612.052002,612.054016,609.479004,610.203979,610.203979,49801600
2016-10-05,610.218018,613.814026,609.617004,612.510986,612.510986,68077504
2016-10-06,612.469971,613.818970,611.468994,613.020996,613.020996,56812100
2016-10-07,612.607971,617.911987,611.820984,617.120972,617.120972,64071400
2016-10-08,617.341003,619.848999,617.341003,619.107971,619.107971,42345900
2016-10-09,619.171997,619.197998,616.606995,616.752014,616.752014,39243400
2016-10-10,616.822021,621.317993,616.197021,618.994019,618.994019,67481104
2016-10-11,619.237976,642.080017,618.500000,641.072021,641.072021,103590000
2016-10-12,640.870972,641.336975,635.965027,636.192017,636.192017,92370200
2016-10-13,636.030029,638.833008,635.028992,636.786011,636.786011,61620700
2016-10-14,637.007996,641.284973,637.007996,640.377991,640.377991,58144600
2016-10-15,640.310974,642.101990,637.390015,638.645996,638.645996,39035400
2016-10-16,639.083008,642.898010,638.901001,641.630981,641.630981,40298100
2016-10-17,641.817993,642.328003,638.663025,639.192993,639.192993,58063600
2016-10-18,639.411011,640.736023,635.995972,637.960022,637.960022,65546700
2016-10-19,638.133972,638.874023,628.013000,630.520020,630.520020,69381696
2016-10-20,630.663025,631.916992,628.257996,630.856995,630.856995,56957300
2016-10-21,630.825012,634.093994,630.693970,632.828003,632.828003,55951000
2016-10-22,633.135986,658.197021,632.849976,657.294006,657.294006,78556496
2016-10-23,657.620972,661.129028,653.885986,657.070984,657.070984,54474600
2016-10-24,657.161011,657.252014,652.594971,653.760986,653.760986,62218200
2016-10-25,654.002014,664.424011,653.697998,657.588013,657.588013,90378800
2016-10-26,657.677979,679.728027,657.677979,678.304016,678.304016,88877104
2016-10-27,678.213989,688.593994,678.039978,688.312988,688.312988,96105296
2016-10-28,688.000000,690.443970,684.161987,689.651001,689.651001,81145504
2016-10-29,690.289001,720.401978,690.052002,714.479004,714.479004,134760992
2016-10-30,714.117981,714.117981,696.474976,701.864014,701.864014,100665000
2016-10-31,702.640015,709.289001,691.682007,700.971985,700.971985,97064400
2016-11-01,701.336975,736.452026,701.336975,729.793030,729.793030,130527000
2016-11-02,730.065979,740.828979,722.348999,740.828979,740.828979,84865200
2016-11-03,742.346008,745.773010,678.156006,688.700012,688.700012,172808000
2016-11-04,689.124023,706.929993,685.562988,703.234985,703.234985,99907696
2016-11-05,703.525024,707.510010,697.739014,703.418030,703.418030,53752300
2016-11-06,703.812012,714.257996,699.559998,711.521973,711.521973,59902200
2016-11-07,710.736023,710.736023,699.903015,703.130981,703.130981,65047100
2016-11-08,703.088989,712.987000,702.390015,709.848022,709.848022,79660800
2016-11-09,709.825012,740.046021,708.609985,723.273010,723.273010,132429000
2016-11-10,722.843994,723.018005,711.210022,715.533997,715.533997,68807800
2016-11-11,715.554993,718.317993,714.409973,716.411011,716.411011,63119700
2016-11-12,716.752014,717.148010,704.034973,705.054016,705.054016,64622500
2016-11-13,705.195984,705.257019,687.315002,702.031006,702.031006,80318096
2016-11-14,701.997009,706.283997,699.807983,705.020996,705.020996,62993000
2016-11-15,705.794006,715.718018,705.260010,711.619019,711.619019,72038496
2016-11-16,711.166992,747.614990,709.039001,744.197998,744.197998,141294000
2016-11-17,744.875977,755.645020,739.510986,740.976990,740.976990,108579000
2016-11-18,740.705017,752.882019,736.890015,751.585022,751.585022,87363104
2016-11-19,751.833008,756.237000,744.466980,751.616028,751.616028,110608000
2016-11-20,751.879028,755.479980,717.943970,731.026001,731.026001,154116000
2016-11-21,731.265015,741.721985,730.510010,739.247986,739.247986,60802400
2016-11-22,739.643005,753.869995,736.526978,751.346985,751.346985,129906000
2016-11-23,751.741028,752.250000,738.924011,744.593994,744.593994,76543800
2016-11-24,744.619995,746.831970,733.489990,740.289001,740.289001,85919296
2016-11-25,740.442017,741.648987,734.591003,741.648987,741.648987,67807600
2016-11-26,741.510986,742.213989,729.625000,735.382019,735.382019,54962700
2016-11-27,735.437012,739.018005,731.085022,732.034973,732.034973,52601800
2016-11-28,732.484009,738.005981,732.484009,735.812988,735.812988,61888600
2016-11-29,736.328979,737.471008,734.559021,735.604004,735.604004,68511104
2016-11-30,736.283997,747.929016,736.265015,745.690979,745.690979,84070800
2016-12-01,746.046021,758.275024,746.046021,756.773987,756.773987,80461904
2016-12-02,757.544983,781.296021,757.544983,777.943970,777.943970,127605000
2016-12-03,778.247986,778.247986,764.856018,771.155029,771.155029,69547296
2016-12-04,771.638000,773.872009,768.161011,773.872009,773.872009,60557900
2016-12-05,773.393982,773.468018,751.713013,758.700012,758.700012,106363000
2016-12-06,758.719971,765.622009,758.719971,764.223999,764.223999,116218000
2016-12-07,764.210999,771.543030,759.750000,768.132019,768.132019,96426096
2016-12-08,768.075989,774.697998,765.945984,770.809998,770.809998,80111904
2016-12-09,769.943970,774.528015,769.648987,772.794006,772.794006,68705296
2016-12-10,773.023010,777.091980,772.909973,774.650024,774.650024,53843100
2016-12-11,774.752014,774.797974,765.411987,769.731018,769.731018,57313400
2016-12-12,770.039978,781.921997,770.039978,780.086975,780.086975,76571000
2016-12-13,780.646973,788.460022,777.961975,780.556030,780.556030,81645600
2016-12-14,780.005005,782.033997,776.838989,781.481018,781.481018,75979000
2016-12-15,780.070007,781.434998,777.802002,778.088013,778.088013,81580096
2016-12-16,778.963013,785.031982,778.963013,784.906982,784.906982,83608200
2016-12-17,785.166016,792.508972,784.864014,790.828979,790.828979,78989800
2016-12-18,791.007996,794.737000,788.026001,790.530029,790.530029,60524400
2016-12-19,790.692017,793.611023,790.320007,792.713989,792.713989,74886400
2016-12-20,792.247009,801.336975,791.497009,800.875977,800.875977,99629296
2016-12-21,800.643982,834.281006,799.405029,834.281006,834.281006,155576000
2016-12-22,834.179993,875.781982,834.148987,864.539978,864.539978,200027008
2016-12-23,864.888000,925.117004,864.677002,921.984009,921.984009,275564000
2016-12-24,922.179993,923.479004,886.335022,898.822021,898.822021,137727008
2016-12-25,899.651978,899.651978,862.424011,896.182983,896.182983,143664992
2016-12-26,896.905029,913.184021,896.898010,907.609985,907.609985,123771000
2016-12-27,908.354004,940.047974,904.255005,933.197998,933.197998,167308000
2016-12-28,934.830994,975.921021,934.830994,975.921021,975.921021,236630000
2016-12-29,975.125000,979.396973,954.502991,973.497009,973.497009,199320000
2016-12-30,972.534973,972.534973,934.833008,961.237976,961.237976,187474000
2016-12-31,960.627014,963.742981,947.236023,963.742981,963.742981,99135104
2017-01-01,963.658020,1003.080017,958.698975,998.325012,998.325012,147775008
2017-01-02,998.617004,1031.390015,996.702026,1021.750000,1021.750000,222184992
2017-01-03,1021.599976,1044.079956,1021.599976,1043.839966,1043.839966,185168000
2017-01-04,1044.400024,1159.420044,1044.400024,1154.729980,1154.729980,344945984
2017-01-05,1156.729980,1191.099976,910.416992,1013.380005,1013.380005,510199008
2017-01-06,1014.239990,1046.810059,883.943970,902.200989,902.200989,351876000
2017-01-07,903.487000,908.585022,823.556030,908.585022,908.585022,279550016
2017-01-08,908.174988,942.723999,887.249023,911.198975,911.198975,158715008
2017-01-09,913.244019,913.685974,879.807007,902.828003,902.828003,141876992
2017-01-10,902.440002,914.872986,901.059998,907.679016,907.679016,115808000
2017-01-11,908.114990,919.447998,762.765015,777.757019,777.757019,310928992
2017-01-12,775.177979,826.245972,755.755981,804.833984,804.833984,222326000
2017-01-13,803.737000,829.000977,780.002991,823.984009,823.984009,168968000
2017-01-14,825.142029,835.085022,812.455994,818.411987,818.411987,93063296
2017-01-15,818.142029,823.307007,812.870972,821.797974,821.797974,71013600
2017-01-16,821.783020,834.530029,820.270996,831.533997,831.533997,82755200
2017-01-17,830.945984,910.560974,830.796021,907.937988,907.937988,155095008
2017-01-18,909.372986,917.499023,858.304016,886.617981,886.617981,225676992
2017-01-19,888.335022,904.614014,884.338013,899.072998,899.072998,105625000
2017-01-20,898.171997,899.398010,887.007996,895.026001,895.026001,86728400
2017-01-21,895.549011,927.367004,895.534973,921.789001,921.789001,111158000
2017-01-22,922.205017,937.525024,897.564026,924.672974,924.672974,116573000
2017-01-23,925.499023,928.265991,916.737976,921.012024,921.012024,73588600
2017-01-24,910.677002,924.145020,892.286011,892.687012,892.687012,111349000
2017-01-25,891.924011,903.252014,891.687012,901.541992,901.541992,120831000
2017-01-26,902.395020,919.325989,902.223999,917.585999,917.585999,131958000
2017-01-27,918.359009,923.223022,915.846008,919.750000,919.750000,125594000
2017-01-28,919.810974,923.911011,919.810974,921.590027,921.590027,68979600
2017-01-29,922.067017,923.418030,919.148010,919.495972,919.495972,60851700
2017-01-30,920.151001,923.047974,919.473999,920.382019,920.382019,78227296
2017-01-31,920.958984,972.018982,920.958984,970.403015,970.403015,164582000
2017-02-01,970.940979,989.114014,970.742004,989.023010,989.023010,150110000
2017-02-02,990.000977,1013.520020,983.221008,1011.799988,1011.799988,145820992
2017-02-03,1011.460022,1033.869995,1008.789978,1029.910034,1029.910034,201278000
2017-02-04,1031.329956,1045.900024,1015.159973,1042.900024,1042.900024,155064000
2017-02-05,1043.520020,1043.630005,1022.369995,1027.339966,1027.339966,114208000
2017-02-06,1028.400024,1044.640015,1028.160034,1038.150024,1038.150024,111762000
2017-02-07,1040.140015,1061.930054,1040.140015,1061.349976,1061.349976,146007008
2017-02-08,1062.319946,1078.969971,1037.489990,1063.069946,1063.069946,201855008
2017-02-09,1064.699951,1088.989990,953.343994,994.382996,994.382996,407220000
2017-02-10,995.632019,998.905029,946.690979,988.674011,988.674011,190452000
2017-02-11,988.898010,1009.289978,982.830017,1004.450012,1004.450012,102261000
2017-02-12,1003.520020,1004.760010,996.921021,999.181030,999.181030,67530000
2017-02-13,998.885010,1002.099976,976.002014,990.642029,990.642029,100607000
2017-02-14,991.734985,1011.510010,986.471008,1004.549988,1004.549988,137946000
2017-02-15,1006.210022,1008.840027,1001.580017,1007.479980,1007.479980,89759400
2017-02-16,1007.650024,1033.369995,1007.650024,1027.439941,1027.439941,122277000
2017-02-17,1026.119995,1053.170044,1025.640015,1046.209961,1046.209961,136474000
2017-02-18,1049.209961,1061.099976,1046.959961,1054.420044,1054.420044,99073504
2017-02-19,1054.760010,1056.810059,1043.459961,1047.869995,1047.869995,77423296
2017-02-20,1048.689941,1080.489990,1041.689941,1079.979980,1079.979980,109478000
2017-02-21,1079.280029,1117.250000,1076.930054,1115.300049,1115.300049,186868992
2017-02-22,1114.800049,1125.390015,1100.550049,1117.439941,1117.439941,136100000
2017-02-23,1117.270020,1176.619995,1116.959961,1166.719971,1166.719971,189454000
2017-02-24,1172.709961,1200.390015,1131.959961,1173.680054,1173.680054,330759008
2017-02-25,1170.410034,1174.849976,1124.589966,1143.839966,1143.839966,139960992
2017-02-26,1144.270020,1167.469971,1130.199951,1165.199951,1165.199951,116486000
2017-02-27,1163.780029,1181.979980,1163.380005,1179.969971,1179.969971,131570000
2017-02-28,1180.719971,1193.250000,1171.819946,1179.969971,1179.969971,184956000
2017-03-01,1180.040039,1222.500000,1179.689941,1222.500000,1222.500000,229056992
2017-03-02,1224.680054,1262.130005,1215.619995,1251.010010,1251.010010,368275008
2017-03-03,1250.709961,1280.310059,1250.709961,1274.989990,1274.989990,315739008
2017-03-04,1277.430054,1279.400024,1230.510010,1255.150024,1255.150024,183270000
2017-03-05,1254.290039,1267.290039,1238.060059,1267.119995,1267.119995,134127000
2017-03-06,1267.469971,1276.000000,1264.599976,1272.829956,1272.829956,153656992
2017-03-07,1273.209961,1275.550049,1204.800049,1223.540039,1223.540039,291256000
2017-03-08,1223.229980,1232.160034,1148.079956,1150.000000,1150.000000,332603008
2017-03-09,1150.349976,1197.459961,1141.229980,1188.489990,1188.489990,212283008
2017-03-10,1189.359985,1270.469971,1077.250000,1116.719971,1116.719971,563795968
2017-03-11,1116.319946,1193.829956,1116.319946,1175.829956,1175.829956,283320000
2017-03-12,1176.619995,1226.979980,1175.359985,1221.380005,1221.380005,227176000
2017-03-13,1221.780029,1237.369995,1217.030029,1231.920044,1231.920044,380276992
2017-03-14,1232.160034,1244.810059,1220.719971,1240.000000,1240.000000,245306000
2017-03-15,1240.160034,1251.609985,1239.750000,1249.609985,1249.609985,297804992
2017-03-16,1251.329956,1257.979980,1152.439941,1187.810059,1187.810059,638568000
2017-03-17,1180.160034,1180.160034,1099.569946,1100.229980,1100.229980,706598976
2017-03-18,1099.689941,1114.069946,957.655029,973.817993,973.817993,621302016
2017-03-19,976.729980,1069.910034,976.729980,1036.739990,1036.739990,406648000
2017-03-20,1037.239990,1063.030029,1036.680054,1054.229980,1054.229980,286529984
2017-03-21,1055.359985,1122.430054,1055.359985,1120.540039,1120.540039,337391008
2017-03-22,1120.650024,1120.650024,1014.210022,1049.140015,1049.140015,380840992
2017-03-23,1050.050049,1058.010010,1028.930054,1038.589966,1038.589966,248540000
2017-03-24,1038.449951,1040.469971,934.357971,937.520020,937.520020,491038016
2017-03-25,936.539978,975.760986,903.713013,972.778992,972.778992,435803008
2017-03-26,974.015015,1007.960022,954.185974,966.724976,966.724976,303668000
2017-03-27,972.054993,1046.400024,971.984009,1045.770020,1045.770020,372535008
2017-03-28,1044.579956,1064.650024,1027.729980,1047.150024,1047.150024,326332000
2017-03-29,1046.079956,1055.130005,1015.880005,1039.969971,1039.969971,298457984
2017-03-30,1042.209961,1049.290039,1020.039978,1026.430054,1026.430054,352968992
2017-03-31,1026.640015,1074.920044,1026.640015,1071.790039,1071.790039,447287008
2017-04-01,1071.709961,1091.719971,1061.089966,1080.500000,1080.500000,289633984
2017-04-02,1080.609985,1107.589966,1075.449951,1102.170044,1102.170044,514187008
2017-04-03,1102.949951,1151.739990,1102.949951,1143.810059,1143.810059,580444032
2017-04-04,1145.520020,1156.439941,1120.520020,1133.250000,1133.250000,436310016
2017-04-05,1134.140015,1135.089966,1113.630005,1124.780029,1124.780029,414784000
2017-04-06,1125.810059,1188.369995,1125.810059,1182.680054,1182.680054,511222016
2017-04-07,1178.939941,1186.579956,1163.390015,1176.900024,1176.900024,317022016
2017-04-08,1172.650024,1184.979980,1162.579956,1175.949951,1175.949951,209312000
2017-04-09,1176.569946,1197.209961,1171.859985,1187.869995,1187.869995,242343008
2017-04-10,1187.300049,1190.339966,1179.040039,1187.130005,1187.130005,215883008
2017-04-11,1187.459961,1208.069946,1187.459961,1205.010010,1205.010010,216182000
2017-04-12,1204.810059,1207.140015,1196.760010,1200.369995,1200.369995,288702016
2017-04-13,1201.020020,1205.890015,1156.439941,1169.280029,1169.280029,351968992
2017-04-14,1170.329956,1190.800049,1159.790039,1167.540039,1167.540039,254827008
2017-04-15,1167.300049,1188.000000,1164.959961,1172.520020,1172.520020,203559008
2017-04-16,1172.609985,1187.219971,1172.609985,1182.939941,1182.939941,183231008
2017-04-17,1183.250000,1194.900024,1172.650024,1193.910034,1193.910034,253206000
2017-04-18,1193.770020,1217.569946,1193.770020,1211.670044,1211.670044,270524000
2017-04-19,1212.130005,1215.510010,1205.079956,1210.290039,1210.290039,288060992
2017-04-20,1211.079956,1240.790039,1208.410034,1229.079956,1229.079956,315108000
2017-04-21,1229.420044,1235.939941,1215.560059,1222.050049,1222.050049,272167008
2017-04-22,1222.709961,1235.560059,1208.469971,1231.709961,1231.709961,249320000
2017-04-23,1231.920044,1232.199951,1203.939941,1207.209961,1207.209961,258951008
2017-04-24,1209.630005,1250.939941,1209.630005,1250.150024,1250.150024,235806000
2017-04-25,1250.449951,1267.579956,1249.969971,1265.489990,1265.489990,242556000
2017-04-26,1265.989990,1294.829956,1265.930054,1281.079956,1281.079956,329631008
2017-04-27,1281.880005,1319.699951,1281.300049,1317.729980,1317.729980,449196992
2017-04-28,1317.739990,1331.280029,1292.369995,1316.479980,1316.479980,527488992
2017-04-29,1317.839966,1327.199951,1315.209961,1321.790039,1321.790039,422705984
2017-04-30,1321.869995,1347.910034,1314.920044,1347.890015,1347.890015,413115008
2017-05-01,1348.300049,1434.319946,1348.300049,1421.599976,1421.599976,713624000
2017-05-02,1421.030029,1473.900024,1415.689941,1452.819946,1452.819946,477337984
2017-05-03,1453.780029,1492.770020,1447.489990,1490.089966,1490.089966,583795968
2017-05-04,1490.719971,1608.910034,1490.719971,1537.670044,1537.670044,933548992
2017-05-05,1540.869995,1618.030029,1530.310059,1555.449951,1555.449951,946035968
2017-05-06,1556.810059,1578.800049,1542.500000,1578.800049,1578.800049,582529984
2017-05-07,1579.469971,1596.719971,1559.760010,1596.709961,1596.709961,1080029952
2017-05-08,1596.920044,1723.349976,1596.920044,1723.349976,1723.349976,1340320000
2017-05-09,1723.890015,1833.489990,1716.300049,1755.359985,1755.359985,1167920000
2017-05-10,1756.520020,1788.439941,1719.099976,1787.130005,1787.130005,915723008
2017-05-11,1780.369995,1873.930054,1755.349976,1848.569946,1848.569946,799489984
2017-05-12,1845.760010,1856.150024,1694.010010,1724.239990,1724.239990,740984000
2017-05-13,1723.119995,1812.989990,1651.079956,1804.910034,1804.910034,579635008
2017-05-14,1800.859985,1831.420044,1776.619995,1808.910034,1808.910034,437196000
2017-05-15,1808.439941,1812.800049,1708.540039,1738.430054,1738.430054,731529024
2017-05-16,1741.699951,1785.939941,1686.540039,1734.449951,1734.449951,959044992
2017-05-17,1726.729980,1864.050049,1661.910034,1839.089966,1839.089966,1064729984
2017-05-18,1818.699951,1904.479980,1807.119995,1888.650024,1888.650024,894321024
2017-05-19,1897.369995,2004.520020,1890.250000,1987.709961,1987.709961,1157289984
2017-05-20,1984.239990,2084.729980,1974.920044,2084.729980,2084.729980,961336000
2017-05-21,2067.030029,2119.080078,2037.500000,2041.199951,2041.199951,1147859968
2017-05-22,2043.189941,2303.899902,2017.869995,2173.399902,2173.399902,1942220032
2017-05-23,2191.560059,2320.820068,2178.500000,2320.419922,2320.419922,1378749952
2017-05-24,2321.370117,2523.719971,2321.370117,2443.639893,2443.639893,1725379968
2017-05-25,2446.239990,2763.709961,2285.300049,2304.979980,2304.979980,2406700032
2017-05-26,2320.889893,2573.790039,2071.989990,2202.419922,2202.419922,1763480064
2017-05-27,2196.270020,2260.199951,1855.829956,2038.869995,2038.869995,1700480000
2017-05-28,2054.080078,2267.340088,2054.080078,2155.800049,2155.800049,1147139968
2017-05-29,2159.429932,2307.050049,2107.169922,2255.610107,2255.610107,994625024
2017-05-30,2255.360107,2301.959961,2124.570068,2175.469971,2175.469971,1443970048
2017-05-31,2187.189941,2311.080078,2145.570068,2286.409912,2286.409912,1544829952
2017-06-01,2288.330078,2448.389893,2288.330078,2407.879883,2407.879883,1653180032
2017-06-02,2404.030029,2488.550049,2373.320068,2488.550049,2488.550049,1317030016
2017-06-03,2493.719971,2581.909912,2423.570068,2515.350098,2515.350098,1514950016
2017-06-04,2547.790039,2585.889893,2452.540039,2511.810059,2511.810059,1355120000
2017-06-05,2512.399902,2686.810059,2510.219971,2686.810059,2686.810059,1369309952
2017-06-06,2690.840088,2999.909912,2690.840088,2863.199951,2863.199951,2089609984
2017-06-07,2869.379883,2869.379883,2700.560059,2732.159912,2732.159912,1517709952
2017-06-08,2720.489990,2815.300049,2670.949951,2805.620117,2805.620117,1281170048
2017-06-09,2807.439941,2901.709961,2795.620117,2823.810059,2823.810059,1348950016
2017-06-10,2828.139893,2950.989990,2746.550049,2947.709961,2947.709961,2018889984
2017-06-11,2942.409912,2996.600098,2840.530029,2958.110107,2958.110107,1752400000
2017-06-12,2953.219971,2997.260010,2518.560059,2659.629883,2659.629883,2569530112
2017-06-13,2680.909912,2789.040039,2650.379883,2717.020020,2717.020020,1781200000
2017-06-14,2716.879883,2786.830078,2412.939941,2506.370117,2506.370117,1696560000
2017-06-15,2499.580078,2534.709961,2212.959961,2464.580078,2464.580078,2026259968
2017-06-16,2469.570068,2539.919922,2385.149902,2518.560059,2518.560059,1195190016
2017-06-17,2514.010010,2685.189941,2484.959961,2655.879883,2655.879883,1534509952
2017-06-18,2655.350098,2662.100098,2516.330078,2548.290039,2548.290039,1178659968
2017-06-19,2549.030029,2662.850098,2549.030029,2589.600098,2589.600098,1446840064
2017-06-20,2591.260010,2763.449951,2589.820068,2721.790039,2721.790039,1854189952
2017-06-21,2709.429932,2772.010010,2660.399902,2689.100098,2689.100098,1626579968
2017-06-22,2691.030029,2723.739990,2642.360107,2705.409912,2705.409912,1097939968
2017-06-23,2707.340088,2765.169922,2706.370117,2744.909912,2744.909912,961318976
2017-06-24,2738.520020,2757.939941,2583.189941,2608.719971,2608.719971,982750016
2017-06-25,2607.250000,2682.260010,2552.120117,2589.409912,2589.409912,1161100032
2017-06-26,2590.570068,2615.250000,2376.290039,2478.449951,2478.449951,1663280000
2017-06-27,2478.449951,2552.449951,2332.989990,2552.449951,2552.449951,1489789952
2017-06-28,2553.030029,2603.979980,2484.419922,2574.790039,2574.790039,1183869952
2017-06-29,2567.560059,2588.830078,2510.479980,2539.320068,2539.320068,949979008
2017-06-30,2539.239990,2559.250000,2478.429932,2480.840088,2480.840088,860273024
2017-07-01,2492.600098,2515.270020,2419.229980,2434.550049,2434.550049,779913984
2017-07-02,2436.399902,2514.280029,2394.840088,2506.469971,2506.469971,803747008
2017-07-03,2498.560059,2595.000000,2480.469971,2564.060059,2564.060059,964112000
2017-07-04,2561.000000,2631.590088,2559.350098,2601.639893,2601.639893,985516032
2017-07-05,2602.870117,2622.649902,2538.550049,2601.989990,2601.989990,941566016
2017-07-06,2608.100098,2616.719971,2581.689941,2608.560059,2608.560059,761956992
2017-07-07,2608.590088,2916.139893,2498.870117,2518.659912,2518.659912,917411968
2017-07-08,2520.270020,2571.340088,2492.310059,2571.340088,2571.340088,733329984
2017-07-09,2572.610107,2635.489990,2517.590088,2518.439941,2518.439941,527856000
2017-07-10,2525.250000,2537.159912,2321.129883,2372.560059,2372.560059,1111200000
2017-07-11,2385.889893,2413.469971,2296.810059,2337.790039,2337.790039,1329760000
2017-07-12,2332.770020,2423.709961,2275.139893,2398.840088,2398.840088,1117410048
2017-07-13,2402.699951,2425.219971,2340.830078,2357.899902,2357.899902,835769984
2017-07-14,2360.590088,2363.250000,2183.219971,2233.340088,2233.340088,882502976
2017-07-15,2230.120117,2231.139893,1990.410034,1998.859985,1998.859985,993608000
2017-07-16,1991.979980,2058.770020,1843.030029,1929.819946,1929.819946,1182870016
2017-07-17,1932.619995,2230.489990,1932.619995,2228.409912,2228.409912,1201760000
2017-07-18,2233.520020,2387.610107,2164.770020,2318.879883,2318.879883,1512450048
2017-07-19,2323.080078,2397.169922,2260.229980,2273.429932,2273.429932,1245100032
2017-07-20,2269.889893,2900.699951,2269.889893,2817.600098,2817.600098,2249260032
2017-07-21,2838.409912,2838.409912,2621.850098,2667.760010,2667.760010,1489449984
2017-07-22,2668.629883,2862.419922,2657.709961,2810.120117,2810.120117,1177129984
2017-07-23,2808.100098,2832.179932,2653.939941,2730.399902,2730.399902,1072840000
2017-07-24,2732.699951,2777.260010,2699.189941,2754.860107,2754.860107,866473984
2017-07-25,2757.500000,2768.080078,2480.959961,2576.479980,2576.479980,1460089984
2017-07-26,2577.770020,2610.760010,2450.800049,2529.449951,2529.449951,937404032
2017-07-27,2538.709961,2693.320068,2529.340088,2671.780029,2671.780029,789104000
2017-07-28,2679.729980,2897.449951,2679.729980,2809.010010,2809.010010,1380099968
2017-07-29,2807.020020,2808.760010,2692.800049,2726.449951,2726.449951,803745984
2017-07-30,2724.389893,2758.530029,2644.850098,2757.179932,2757.179932,705942976
2017-07-31,2763.239990,2889.620117,2720.610107,2875.340088,2875.340088,860574976
2017-08-01,2871.300049,2921.350098,2685.610107,2718.260010,2718.260010,1324669952
2017-08-02,2727.129883,2762.530029,2668.590088,2710.669922,2710.669922,1094950016
2017-08-03,2709.560059,2813.310059,2685.139893,2804.729980,2804.729980,804796992
2017-08-04,2806.929932,2899.330078,2743.719971,2895.889893,2895.889893,1002120000
2017-08-05,2897.629883,3290.010010,2874.830078,3252.909912,3252.909912,1945699968
2017-08-06,3257.610107,3293.290039,3155.600098,3213.939941,3213.939941,1105030016
2017-08-07,3212.780029,3397.679932,3180.889893,3378.939941,3378.939941,1482279936
2017-08-08,3370.219971,3484.850098,3345.830078,3419.939941,3419.939941,1752760064
2017-08-09,3420.399902,3422.760010,3247.669922,3342.469971,3342.469971,1468960000
2017-08-10,3341.840088,3453.449951,3319.469971,3381.280029,3381.280029,1515110016
2017-08-11,3373.820068,3679.719971,3372.120117,3650.620117,3650.620117,2021190016
2017-08-12,3650.629883,3949.919922,3613.699951,3884.709961,3884.709961,2219589888
2017-08-13,3880.040039,4208.390137,3857.800049,4073.260010,4073.260010,3159089920
2017-08-14,4066.100098,4325.129883,3989.159912,4325.129883,4325.129883,2463089920
2017-08-15,4326.990234,4455.970215,3906.179932,4181.930176,4181.930176,3258050048
2017-08-16,4200.339844,4381.229980,3994.419922,4376.629883,4376.629883,2272039936
2017-08-17,4384.439941,4484.700195,4243.709961,4331.689941,4331.689941,2553359872
2017-08-18,4324.339844,4370.129883,4015.399902,4160.620117,4160.620117,2941710080
2017-08-19,4137.750000,4243.259766,3970.550049,4193.700195,4193.700195,2975820032
2017-08-20,4189.310059,4196.290039,4069.879883,4087.659912,4087.659912,2109769984
2017-08-21,4090.479980,4109.140137,3988.600098,4001.739990,4001.739990,2800890112
2017-08-22,3998.350098,4128.759766,3674.580078,4100.520020,4100.520020,3764239872
2017-08-23,4089.010010,4255.779785,4078.409912,4151.520020,4151.520020,2369819904
2017-08-24,4137.600098,4376.390137,4130.259766,4334.680176,4334.680176,2037750016
2017-08-25,4332.819824,4455.700195,4307.350098,4371.600098,4371.600098,1727970048
2017-08-26,4372.060059,4379.279785,4269.520020,4352.399902,4352.399902,1511609984
2017-08-27,4345.100098,4416.589844,4317.290039,4382.879883,4382.879883,1537459968
2017-08-28,4384.450195,4403.930176,4224.640137,4382.660156,4382.660156,1959330048
2017-08-29,4389.209961,4625.680176,4352.129883,4579.020020,4579.020020,2486080000
2017-08-30,4570.359863,4626.520020,4471.410156,4565.299805,4565.299805,1937849984
2017-08-31,4555.589844,4736.049805,4549.399902,4703.390137,4703.390137,1944930048
2017-09-01,4701.759766,4892.009766,4678.529785,4892.009766,4892.009766,2599079936
2017-09-02,4901.419922,4975.040039,4469.240234,4578.770020,4578.770020,2722139904
2017-09-03,4585.270020,4714.080078,4417.589844,4582.959961,4582.959961,1933190016
2017-09-04,4591.629883,4591.629883,4108.399902,4236.310059,4236.310059,2987330048
2017-09-05,4228.290039,4427.839844,3998.110107,4376.529785,4376.529785,2697969920
2017-09-06,4376.589844,4617.250000,4376.589844,4597.120117,4597.120117,2172100096
2017-09-07,4589.140137,4655.040039,4491.330078,4599.879883,4599.879883,1844620032
2017-09-08,4605.160156,4661.000000,4075.179932,4228.750000,4228.750000,2700890112
2017-09-09,4229.810059,4308.819824,4114.109863,4226.060059,4226.060059,1386230016
2017-09-10,4229.339844,4245.439941,3951.040039,4122.939941,4122.939941,1679090048
2017-09-11,4122.470215,4261.669922,4099.399902,4161.270020,4161.270020,1557330048
2017-09-12,4168.879883,4344.649902,4085.219971,4130.810059,4130.810059,1864530048
2017-09-13,4131.979980,4131.979980,3789.919922,3882.590088,3882.590088,2219409920
2017-09-14,3875.370117,3920.600098,3153.860107,3154.949951,3154.949951,2716310016
2017-09-15,3166.300049,3733.449951,2946.620117,3637.520020,3637.520020,4148069888
2017-09-16,3637.750000,3808.840088,3487.790039,3625.040039,3625.040039,1818400000
2017-09-17,3606.280029,3664.810059,3445.639893,3582.879883,3582.879883,1239149952
2017-09-18,3591.090088,4079.229980,3591.090088,4065.199951,4065.199951,1943209984
2017-09-19,4073.790039,4094.070068,3868.870117,3924.969971,3924.969971,1563980032
2017-09-20,3916.360107,4031.389893,3857.729980,3905.949951,3905.949951,1213830016
2017-09-21,3901.469971,3916.419922,3613.629883,3631.040039,3631.040039,1411480064
2017-09-22,3628.020020,3758.270020,3553.530029,3630.699951,3630.699951,1194829952
2017-09-23,3629.919922,3819.209961,3594.580078,3792.399902,3792.399902,928113984
2017-09-24,3796.149902,3796.149902,3666.899902,3682.840088,3682.840088,768014976
2017-09-25,3681.580078,3950.250000,3681.580078,3926.070068,3926.070068,1374210048
2017-09-26,3928.409912,3969.889893,3869.899902,3892.350098,3892.350098,1043740032
2017-09-27,3892.939941,4210.049805,3884.820068,4200.669922,4200.669922,1686880000
2017-09-28,4197.129883,4279.310059,4109.700195,4174.729980,4174.729980,1712320000
2017-09-29,4171.620117,4214.629883,4039.290039,4163.069824,4163.069824,1367049984
2017-09-30,4166.109863,4358.430176,4160.859863,4338.709961,4338.709961,1207449984
2017-10-01,4341.049805,4403.740234,4269.810059,4403.740234,4403.740234,1208210048
2017-10-02,4395.810059,4470.229980,4377.459961,4409.319824,4409.319824,1431730048
2017-10-03,4408.459961,4432.470215,4258.890137,4317.479980,4317.479980,1288019968
2017-10-04,4319.370117,4352.310059,4210.419922,4229.359863,4229.359863,1116770048
2017-10-05,4229.879883,4362.640137,4164.049805,4328.410156,4328.410156,1161769984
2017-10-06,4324.459961,4413.270020,4320.529785,4370.810059,4370.810059,1069939968
2017-10-07,4369.350098,4443.879883,4321.049805,4426.890137,4426.890137,906928000
2017-10-08,4429.669922,4624.140137,4405.640137,4610.479980,4610.479980,1313869952
2017-10-09,4614.520020,4878.709961,4564.250000,4772.020020,4772.020020,1968739968
2017-10-10,4776.209961,4922.169922,4765.100098,4781.990234,4781.990234,1597139968
2017-10-11,4789.250000,4873.729980,4751.629883,4826.479980,4826.479980,1222279936
2017-10-12,4829.580078,5446.910156,4822.000000,5446.910156,5446.910156,2791610112
2017-10-13,5464.160156,5840.299805,5436.850098,5647.209961,5647.209961,3615480064
2017-10-14,5643.529785,5837.700195,5591.640137,5831.790039,5831.790039,1669030016
2017-10-15,5835.959961,5852.479980,5478.609863,5678.189941,5678.189941,1976039936
2017-10-16,5687.569824,5776.229980,5544.209961,5725.589844,5725.589844,2008070016
2017-10-17,5741.580078,5800.350098,5472.720215,5605.509766,5605.509766,1821570048
2017-10-18,5603.819824,5603.819824,5151.439941,5590.689941,5590.689941,2399269888
2017-10-19,5583.740234,5744.350098,5531.060059,5708.520020,5708.520020,1780540032
2017-10-20,5708.109863,6060.109863,5627.229980,6011.450195,6011.450195,2354429952
2017-10-21,5996.790039,6194.879883,5965.069824,6031.600098,6031.600098,2207099904
2017-10-22,6036.660156,6076.259766,5792.339844,6008.419922,6008.419922,2034630016
2017-10-23,6006.000000,6075.589844,5732.470215,5930.319824,5930.319824,2401840128
2017-10-24,5935.520020,5935.520020,5504.180176,5526.640137,5526.640137,2735699968
2017-10-25,5524.600098,5754.330078,5397.879883,5750.799805,5750.799805,1966989952
2017-10-26,5747.950195,5976.799805,5721.220215,5904.830078,5904.830078,1905040000
2017-10-27,5899.740234,5988.390137,5728.819824,5780.899902,5780.899902,1710130048
2017-10-28,5787.819824,5876.720215,5689.189941,5753.089844,5753.089844,1403920000
2017-10-29,5754.439941,6255.709961,5724.580078,6153.850098,6153.850098,2859040000
2017-10-30,6114.850098,6214.990234,6040.850098,6130.529785,6130.529785,1772150016
2017-10-31,6132.020020,6470.430176,6103.330078,6468.399902,6468.399902,2311379968
2017-11-01,6440.970215,6767.310059,6377.879883,6767.310059,6767.310059,2870320128
2017-11-02,6777.770020,7367.330078,6758.720215,7078.500000,7078.500000,4653770240
2017-11-03,7087.529785,7461.290039,7002.939941,7207.759766,7207.759766,3369860096
2017-11-04,7164.479980,7492.859863,7031.279785,7379.950195,7379.950195,2483800064
2017-11-05,7404.520020,7617.479980,7333.189941,7407.410156,7407.410156,2380410112
2017-11-06,7403.220215,7445.770020,7007.310059,7022.759766,7022.759766,3111899904
2017-11-07,7023.100098,7253.319824,7023.100098,7144.379883,7144.379883,2326340096
2017-11-08,7141.379883,7776.419922,7114.020020,7459.689941,7459.689941,4602200064
2017-11-09,7446.830078,7446.830078,7101.520020,7143.580078,7143.580078,3226249984
2017-11-10,7173.729980,7312.000000,6436.870117,6618.140137,6618.140137,5208249856
2017-11-11,6618.609863,6873.149902,6204.220215,6357.600098,6357.600098,4908680192
2017-11-12,6295.450195,6625.049805,5519.009766,5950.069824,5950.069824,8957349888
2017-11-13,5938.250000,6811.189941,5844.290039,6559.490234,6559.490234,6263249920
2017-11-14,6561.479980,6764.979980,6461.750000,6635.750000,6635.750000,3197110016
2017-11-15,6634.759766,7342.250000,6634.759766,7315.540039,7315.540039,4200880128
2017-11-16,7323.240234,7967.379883,7176.580078,7871.689941,7871.689941,5123809792
2017-11-17,7853.569824,8004.589844,7561.089844,7708.990234,7708.990234,4651670016
2017-11-18,7697.209961,7884.990234,7463.439941,7790.149902,7790.149902,3667190016
2017-11-19,7766.029785,8101.910156,7694.100098,8036.490234,8036.490234,3149319936
2017-11-20,8039.069824,8336.860352,7949.359863,8200.639648,8200.639648,3488450048
2017-11-21,8205.740234,8348.660156,7762.709961,8071.259766,8071.259766,4277609984
2017-11-22,8077.950195,8302.259766,8075.470215,8253.549805,8253.549805,3633530112
2017-11-23,8232.379883,8267.400391,8038.770020,8038.770020,8038.770020,4225179904
2017-11-24,8074.020020,8374.160156,7940.930176,8253.690430,8253.690430,5058610176
2017-11-25,8241.709961,8790.919922,8191.149902,8790.919922,8790.919922,4342060032
2017-11-26,8789.040039,9522.929688,8775.589844,9330.549805,9330.549805,5475579904
2017-11-27,9352.719727,9818.349609,9352.719727,9818.349609,9818.349609,5653320192
2017-11-28,9823.429688,10125.700195,9736.299805,10058.799805,10058.799805,6348819968
2017-11-29,10077.400391,11517.400391,9601.030273,9888.610352,9888.610352,11568799744
2017-11-30,9906.790039,10801.000000,9202.049805,10233.599609,10233.599609,8310689792
2017-12-01,10198.599609,11046.700195,9694.650391,10975.599609,10975.599609,6783119872
2017-12-02,10978.299805,11320.200195,10905.099609,11074.599609,11074.599609,5138500096
2017-12-03,11082.700195,11858.700195,10862.000000,11323.200195,11323.200195,6608309760
2017-12-04,11315.400391,11657.200195,11081.799805,11657.200195,11657.200195,6132409856
2017-12-05,11685.700195,12032.000000,11604.599609,11916.700195,11916.700195,6895260160
2017-12-06,11923.400391,14369.099609,11923.400391,14291.500000,14291.500000,12656300032
2017-12-07,14266.099609,17899.699219,14057.299805,17899.699219,17899.699219,17950699520
2017-12-08,17802.900391,18353.400391,14336.900391,16569.400391,16569.400391,21135998976
2017-12-09,16523.300781,16783.000000,13674.900391,15178.200195,15178.200195,13911300096
2017-12-10,15168.400391,15850.599609,13226.599609,15455.400391,15455.400391,13433299968
2017-12-11,15427.400391,17513.900391,15404.799805,16936.800781,16936.800781,12153900032
2017-12-12,16919.800781,17781.800781,16571.599609,17415.400391,17415.400391,14603799552
2017-12-13,17500.000000,17653.099609,16039.700195,16408.199219,16408.199219,12976900096
2017-12-14,16384.599609,17085.800781,16185.900391,16564.000000,16564.000000,13777399808
2017-12-15,16601.300781,18154.099609,16601.300781,17706.900391,17706.900391,14309999616
2017-12-16,17760.300781,19716.699219,17515.300781,19497.400391,19497.400391,12740599808
2017-12-17,19475.800781,20089.000000,18974.099609,19140.800781,19140.800781,13314599936
2017-12-18,19106.400391,19371.000000,18355.900391,19114.199219,19114.199219,14839499776
2017-12-19,19118.300781,19177.800781,17275.400391,17776.699219,17776.699219,16894499840
2017-12-20,17760.300781,17934.699219,16077.700195,16624.599609,16624.599609,22149699584
2017-12-21,16642.400391,17567.699219,15342.700195,15802.900391,15802.900391,16516599808
2017-12-22,15898.000000,15943.400391,11833.000000,13831.799805,13831.799805,22197999616
2017-12-23,13948.700195,15603.200195,13828.799805,14699.200195,14699.200195,13086000128
2017-12-24,14608.200195,14626.000000,12747.700195,13925.799805,13925.799805,11572299776
2017-12-25,13995.900391,14593.000000,13448.900391,14026.599609,14026.599609,10664699904
2017-12-26,14036.599609,16461.199219,14028.900391,16099.799805,16099.799805,13454300160
2017-12-27,16163.500000,16930.900391,15114.299805,15838.500000,15838.500000,12487600128
2017-12-28,15864.099609,15888.400391,13937.299805,14606.500000,14606.500000,12336499712
2017-12-29,14695.799805,15279.000000,14307.000000,14656.200195,14656.200195,13025500160
2017-12-30,14681.900391,14681.900391,12350.099609,12952.200195,12952.200195,14452599808
2017-12-31,12897.700195,14377.400391,12755.599609,14156.400391,14156.400391,12136299520
2018-01-01,14112.200195,14112.200195,13154.700195,13657.200195,13657.200195,10291200000
2018-01-02,13625.000000,15444.599609,13163.599609,14982.099609,14982.099609,16846600192
2018-01-03,14978.200195,15572.799805,14844.500000,15201.000000,15201.000000,16871900160
2018-01-04,15270.700195,15739.700195,14522.200195,15599.200195,15599.200195,21783199744
2018-01-05,15477.200195,17705.199219,15202.799805,17429.500000,17429.500000,23840899072
2018-01-06,17462.099609,17712.400391,16764.599609,17527.000000,17527.000000,18314600448
2018-01-07,17527.300781,17579.599609,16087.700195,16477.599609,16477.599609,15866000384
2018-01-08,16476.199219,16537.900391,14208.200195,15170.099609,15170.099609,18413899776
2018-01-09,15123.700195,15497.500000,14424.000000,14595.400391,14595.400391,16659999744
2018-01-10,14588.500000,14973.299805,13691.200195,14973.299805,14973.299805,18500800512
2018-01-11,14968.200195,15018.799805,13105.900391,13405.799805,13405.799805,16534099968
2018-01-12,13453.900391,14229.900391,13158.099609,13980.599609,13980.599609,12065699840
2018-01-13,13952.400391,14659.500000,13952.400391,14360.200195,14360.200195,12763599872
2018-01-14,14370.799805,14511.799805,13268.000000,13772.000000,13772.000000,11084099584
2018-01-15,13767.299805,14445.500000,13641.700195,13819.799805,13819.799805,12750799872
2018-01-16,13836.099609,13843.099609,10194.900391,11490.500000,11490.500000,18853799936
2018-01-17,11431.099609,11678.000000,9402.290039,11188.599609,11188.599609,18830600192
2018-01-18,11198.799805,12107.299805,10942.500000,11474.900391,11474.900391,15020399616
2018-01-19,11429.799805,11992.799805,11172.099609,11607.400391,11607.400391,10740400128
2018-01-20,11656.200195,13103.000000,11656.200195,12899.200195,12899.200195,11801700352
2018-01-21,12889.200195,12895.900391,11288.200195,11600.099609,11600.099609,9935179776
2018-01-22,11633.099609,11966.400391,10240.200195,10931.400391,10931.400391,10537400320
2018-01-23,10944.500000,11377.599609,10129.700195,10868.400391,10868.400391,9660609536
2018-01-24,10903.400391,11501.400391,10639.799805,11359.400391,11359.400391,9940989952
2018-01-25,11421.700195,11785.700195,11057.400391,11259.400391,11259.400391,8873169920
2018-01-26,11256.000000,11656.700195,10470.299805,11171.400391,11171.400391,9746199552
2018-01-27,11174.900391,11614.900391,10989.200195,11440.700195,11440.700195,7583269888
2018-01-28,11475.299805,12040.299805,11475.299805,11786.299805,11786.299805,8350360064
2018-01-29,11755.500000,11875.599609,11179.200195,11296.400391,11296.400391,7107359744
2018-01-30,11306.799805,11307.200195,10036.200195,10106.299805,10106.299805,8637859840
2018-01-31,10108.200195,10381.599609,9777.419922,10221.099609,10221.099609,8041160192
2018-02-01,10237.299805,10288.799805,8812.280273,9170.540039,9170.540039,9959400448
2018-02-02,9142.280273,9142.280273,7796.490234,8830.750000,8830.750000,12726899712
2018-02-03,8852.120117,9430.750000,8251.629883,9174.910156,9174.910156,7263790080
2018-02-04,9175.700195,9334.870117,8031.220215,8277.009766,8277.009766,7073549824
2018-02-05,8270.540039,8364.839844,6756.680176,6955.270020,6955.270020,9285289984
2018-02-06,7051.750000,7850.700195,6048.259766,7754.000000,7754.000000,13999800320
2018-02-07,7755.490234,8509.110352,7236.790039,7621.299805,7621.299805,9169280000
2018-02-08,7637.859863,8558.769531,7637.859863,8265.589844,8265.589844,9346750464
2018-02-09,8271.839844,8736.980469,7884.709961,8736.980469,8736.980469,6784820224
2018-02-10,8720.080078,9122.549805,8295.469727,8621.900391,8621.900391,7780960256
2018-02-11,8616.129883,8616.129883,7931.100098,8129.970215,8129.970215,6122189824
2018-02-12,8141.430176,8985.919922,8141.430176,8926.570313,8926.570313,6256439808
2018-02-13,8926.719727,8958.469727,8455.410156,8598.309570,8598.309570,5696719872
2018-02-14,8599.919922,9518.540039,8599.919922,9494.629883,9494.629883,7909819904
2018-02-15,9488.320313,10234.799805,9395.580078,10166.400391,10166.400391,9062540288
2018-02-16,10135.700195,10324.099609,9824.820313,10233.900391,10233.900391,7296159744
2018-02-17,10207.500000,11139.500000,10149.400391,11112.700195,11112.700195,8660880384
2018-02-18,11123.400391,11349.799805,10326.000000,10551.799805,10551.799805,8744009728
2018-02-19,10552.599609,11273.799805,10513.200195,11225.299805,11225.299805,7652089856
2018-02-20,11231.799805,11958.500000,11231.799805,11403.700195,11403.700195,9926540288
2018-02-21,11372.200195,11418.500000,10479.099609,10690.400391,10690.400391,9405339648
2018-02-22,10660.400391,11039.099609,9939.089844,10005.000000,10005.000000,8040079872
2018-02-23,9937.070313,10487.299805,9734.559570,10301.099609,10301.099609,7739500032
2018-02-24,10287.700195,10597.200195,9546.969727,9813.070313,9813.070313,6917929984
2018-02-25,9796.419922,9923.219727,9407.059570,9664.730469,9664.730469,5706939904
2018-02-26,9669.429688,10475.000000,9501.730469,10366.700195,10366.700195,7287690240
2018-02-27,10393.900391,10878.500000,10246.099609,10725.599609,10725.599609,6966179840
2018-02-28,10687.200195,11089.799805,10393.099609,10397.900391,10397.900391,6936189952
2018-03-01,10385.000000,11052.299805,10352.700195,10951.000000,10951.000000,7317279744
2018-03-02,10977.400391,11189.000000,10850.099609,11086.400391,11086.400391,7620590080
2018-03-03,11101.900391,11528.200195,11002.400391,11489.700195,11489.700195,6690570240
2018-03-04,11497.400391,11512.599609,11136.099609,11512.599609,11512.599609,6084149760
2018-03-05,11532.400391,11704.099609,11443.900391,11573.299805,11573.299805,6468539904
2018-03-06,11500.099609,11500.099609,10694.299805,10779.900391,10779.900391,6832169984
2018-03-07,10803.900391,10929.500000,9692.120117,9965.570313,9965.570313,8797910016
2018-03-08,9951.440430,10147.400391,9335.870117,9395.009766,9395.009766,7186089984
2018-03-09,9414.690430,9466.349609,8513.030273,9337.549805,9337.549805,8704190464
2018-03-10,9350.589844,9531.320313,8828.469727,8866.000000,8866.000000,5386319872
2018-03-11,8852.780273,9711.889648,8607.120117,9578.629883,9578.629883,6296370176
2018-03-12,9602.929688,9937.500000,8956.429688,9205.120117,9205.120117,6457399808
2018-03-13,9173.040039,9470.379883,8958.190430,9194.849609,9194.849609,5991139840
2018-03-14,9214.650391,9355.849609,8068.589844,8269.809570,8269.809570,6438230016
2018-03-15,8290.759766,8428.349609,7783.049805,8300.860352,8300.860352,6834429952
2018-03-16,8322.910156,8585.150391,8005.310059,8338.349609,8338.349609,5289379840
2018-03-17,8321.910156,8346.530273,7812.819824,7916.879883,7916.879883,4426149888
2018-03-18,7890.520020,8245.509766,7397.990234,8223.679688,8223.679688,6639190016
2018-03-19,8344.120117,8675.870117,8182.399902,8630.650391,8630.650391,6729110016
2018-03-20,8619.669922,9051.019531,8389.889648,8913.469727,8913.469727,6361789952
2018-03-21,8937.480469,9177.370117,8846.330078,8929.280273,8929.280273,6043129856
2018-03-22,8939.440430,9100.709961,8564.900391,8728.469727,8728.469727,5530390016
2018-03-23,8736.250000,8879.620117,8360.620117,8879.620117,8879.620117,5954120192
2018-03-24,8901.950195,8996.179688,8665.700195,8668.120117,8668.120117,5664600064
2018-03-25,8612.809570,8682.009766,8449.099609,8495.780273,8495.780273,4569880064
2018-03-26,8498.469727,8530.080078,7921.430176,8209.400391,8209.400391,5921039872
2018-03-27,8200.000000,8232.780273,7797.279785,7833.040039,7833.040039,5378250240
2018-03-28,7836.830078,8122.890137,7809.169922,7954.479980,7954.479980,4935289856
2018-03-29,7979.069824,7994.330078,7081.379883,7165.700195,7165.700195,6361229824
2018-03-30,7171.450195,7276.660156,6683.930176,6890.520020,6890.520020,6289509888
2018-03-31,6892.479980,7207.850098,6863.520020,6973.529785,6973.529785,4553269760
2018-04-01,7003.060059,7060.950195,6526.870117,6844.229980,6844.229980,4532100096
2018-04-02,6844.859863,7135.470215,6816.580078,7083.799805,7083.799805,4333440000
2018-04-03,7102.259766,7530.939941,7072.490234,7456.109863,7456.109863,5499700224
2018-04-04,7456.410156,7469.879883,6803.879883,6853.839844,6853.839844,4936000000
2018-04-05,6848.649902,6933.819824,6644.799805,6811.470215,6811.470215,5639320064
2018-04-06,6815.959961,6857.490234,6575.000000,6636.319824,6636.319824,3766810112
2018-04-07,6630.509766,7050.540039,6630.509766,6911.089844,6911.089844,3976610048
2018-04-08,6919.979980,7111.560059,6919.979980,7023.520020,7023.520020,3652499968
2018-04-09,7044.319824,7178.109863,6661.990234,6770.729980,6770.729980,4894060032
2018-04-10,6795.439941,6872.410156,6704.149902,6834.759766,6834.759766,4272750080
2018-04-11,6843.470215,6968.319824,6817.589844,6968.319824,6968.319824,4641889792
2018-04-12,6955.379883,7899.229980,6806.509766,7889.250000,7889.250000,8906250240
2018-04-13,7901.089844,8183.959961,7758.930176,7895.959961,7895.959961,7764460032
2018-04-14,7874.669922,8140.709961,7846.000000,7986.240234,7986.240234,5191430144
2018-04-15,7999.330078,8338.419922,7999.330078,8329.110352,8329.110352,5244480000
2018-04-16,8337.570313,8371.150391,7925.729980,8058.669922,8058.669922,5631309824
2018-04-17,8071.660156,8285.959961,7881.720215,7902.089844,7902.089844,6900879872
2018-04-18,7944.430176,8197.799805,7886.009766,8163.419922,8163.419922,6529909760
2018-04-19,8159.270020,8298.690430,8138.779785,8294.309570,8294.309570,7063209984
2018-04-20,8286.879883,8880.230469,8244.540039,8845.830078,8845.830078,8438110208
2018-04-21,8848.790039,8997.570313,8652.150391,8895.580078,8895.580078,7548550144
2018-04-22,8925.059570,9001.639648,8779.610352,8802.459961,8802.459961,6629899776
2018-04-23,8794.389648,8958.549805,8788.809570,8930.879883,8930.879883,6925190144
2018-04-24,8934.339844,9732.610352,8927.830078,9697.500000,9697.500000,10678800384
2018-04-25,9701.030273,9745.320313,8799.839844,8845.740234,8845.740234,11083100160
2018-04-26,8867.320313,9281.509766,8727.089844,9281.509766,9281.509766,8970559488
2018-04-27,9290.629883,9375.469727,8987.049805,8987.049805,8987.049805,7566289920
2018-04-28,8939.269531,9412.089844,8931.990234,9348.480469,9348.480469,7805479936
2018-04-29,9346.410156,9531.490234,9193.709961,9419.080078,9419.080078,8853000192
2018-04-30,9426.110352,9477.139648,9166.809570,9240.549805,9240.549805,8673920000
2018-05-01,9251.469727,9255.879883,8891.049805,9119.009766,9119.009766,7713019904
2018-05-02,9104.599609,9256.519531,9015.139648,9235.919922,9235.919922,7558159872
2018-05-03,9233.969727,9798.330078,9188.150391,9743.860352,9743.860352,10207299584
2018-05-04,9695.500000,9779.200195,9585.959961,9700.759766,9700.759766,8217829888
2018-05-05,9700.280273,9964.500000,9695.120117,9858.150391,9858.150391,7651939840
2018-05-06,9845.309570,9940.139648,9465.250000,9654.799805,9654.799805,7222280192
2018-05-07,9645.669922,9665.849609,9231.530273,9373.009766,9373.009766,7394019840
2018-05-08,9380.870117,9462.750000,9127.769531,9234.820313,9234.820313,7415869952
2018-05-09,9223.730469,9374.759766,9031.620117,9325.179688,9325.179688,7226890240
2018-05-10,9325.959961,9396.040039,9040.519531,9043.940430,9043.940430,6906699776
2018-05-11,9052.959961,9052.959961,8394.459961,8441.490234,8441.490234,8488520192
2018-05-12,8441.440430,8664.860352,8223.500000,8504.889648,8504.889648,6821380096
2018-05-13,8515.490234,8773.549805,8395.120117,8723.940430,8723.940430,5866379776
2018-05-14,8713.099609,8881.120117,8367.969727,8716.790039,8716.790039,7364149760
2018-05-15,8705.190430,8836.190430,8456.450195,8510.379883,8510.379883,6705710080
2018-05-16,8504.410156,8508.429688,8175.490234,8368.830078,8368.830078,6760220160
2018-05-17,8370.049805,8445.540039,8054.120117,8094.319824,8094.319824,5862530048
2018-05-18,8091.830078,8274.120117,7974.819824,8250.969727,8250.969727,5764190208
2018-05-19,8255.730469,8372.059570,8183.350098,8247.179688,8247.179688,4712399872
2018-05-20,8246.990234,8562.410156,8205.240234,8513.250000,8513.250000,5191059968
2018-05-21,8522.330078,8557.519531,8365.120117,8418.990234,8418.990234,5154990080
2018-05-22,8419.870117,8423.250000,8004.580078,8041.779785,8041.779785,5137010176
2018-05-23,8037.080078,8054.660156,7507.879883,7557.819824,7557.819824,6491120128
2018-05-24,7561.120117,7738.600098,7331.140137,7587.339844,7587.339844,6049220096
2018-05-25,7592.299805,7659.140137,7392.649902,7480.140137,7480.140137,4867829760
2018-05-26,7486.479980,7595.160156,7349.120117,7355.879883,7355.879883,4051539968
2018-05-27,7362.080078,7381.740234,7270.959961,7368.220215,7368.220215,4056519936
2018-05-28,7371.310059,7419.049805,7100.890137,7135.990234,7135.990234,5040600064
2018-05-29,7129.459961,7526.419922,7090.680176,7472.589844,7472.589844,5662660096
2018-05-30,7469.729980,7573.770020,7313.600098,7406.520020,7406.520020,4922540032
2018-05-31,7406.149902,7608.899902,7361.129883,7494.169922,7494.169922,5127130112
2018-06-01,7500.700195,7604.729980,7407.339844,7541.450195,7541.450195,4921460224
2018-06-02,7536.720215,7695.830078,7497.259766,7643.450195,7643.450195,4939299840
2018-06-03,7632.089844,7754.890137,7613.040039,7720.250000,7720.250000,4851760128
2018-06-04,7722.529785,7753.819824,7474.040039,7514.470215,7514.470215,4993169920
2018-06-05,7500.899902,7643.229980,7397.000000,7633.759766,7633.759766,4961739776
2018-06-06,7625.970215,7680.430176,7502.009766,7653.979980,7653.979980,4692259840
2018-06-07,7650.819824,7741.270020,7650.819824,7678.240234,7678.240234,4485799936
2018-06-08,7685.140137,7698.189941,7558.399902,7624.919922,7624.919922,4227579904
2018-06-09,7632.520020,7683.580078,7531.979980,7531.979980,7531.979980,3845220096
2018-06-10,7499.549805,7499.549805,6709.069824,6786.020020,6786.020020,5804839936
2018-06-11,6799.290039,6910.180176,6706.629883,6906.919922,6906.919922,4745269760
2018-06-12,6905.819824,6907.959961,6542.080078,6582.359863,6582.359863,4654380032
2018-06-13,6596.879883,6631.660156,6285.629883,6349.899902,6349.899902,5052349952
2018-06-14,6342.750000,6707.140137,6334.459961,6675.350098,6675.350098,5138710016
2018-06-15,6674.080078,6681.080078,6433.870117,6456.580078,6456.580078,3955389952
2018-06-16,6455.450195,6592.490234,6402.290039,6550.160156,6550.160156,3194170112
2018-06-17,6545.529785,6589.109863,6499.270020,6499.270020,6499.270020,3104019968
2018-06-18,6510.069824,6781.140137,6446.680176,6734.819824,6734.819824,4039200000
2018-06-19,6742.390137,6822.500000,6709.919922,6769.939941,6769.939941,4057029888
2018-06-20,6770.759766,6821.560059,6611.879883,6776.549805,6776.549805,3888640000
2018-06-21,6780.089844,6810.939941,6715.169922,6729.740234,6729.740234,3529129984
2018-06-22,6737.879883,6747.080078,6006.600098,6083.689941,6083.689941,5079810048
2018-06-23,6090.100098,6224.819824,6071.810059,6162.479980,6162.479980,3431360000
2018-06-24,6164.279785,6223.779785,5826.410156,6173.229980,6173.229980,4566909952
2018-06-25,6171.970215,6327.370117,6119.680176,6249.180176,6249.180176,5500810240
2018-06-26,6253.549805,6290.160156,6093.669922,6093.669922,6093.669922,3279759872
2018-06-27,6084.399902,6180.000000,6052.850098,6157.129883,6157.129883,3296219904
2018-06-28,6153.160156,6170.410156,5873.049805,5903.439941,5903.439941,3467800064
2018-06-29,5898.129883,6261.660156,5835.750000,6218.299805,6218.299805,3966230016
2018-06-30,6214.220215,6465.509766,6214.220215,6404.000000,6404.000000,4543860224
2018-07-01,6411.680176,6432.850098,6289.290039,6385.819824,6385.819824,4788259840
2018-07-02,6380.379883,6683.859863,6305.700195,6614.180176,6614.180176,4396930048
2018-07-03,6596.660156,6671.370117,6447.750000,6529.589844,6529.589844,4672309760
2018-07-04,6550.870117,6771.919922,6450.459961,6597.549805,6597.549805,4176689920
2018-07-05,6599.709961,6749.540039,6546.649902,6639.140137,6639.140137,4999240192
2018-07-06,6638.689941,6700.939941,6533.549805,6673.500000,6673.500000,4313959936
2018-07-07,6668.709961,6863.990234,6579.240234,6856.930176,6856.930176,3961080064
2018-07-08,6857.799805,6885.910156,6747.979980,6773.879883,6773.879883,3386210048
2018-07-09,6775.080078,6838.680176,6724.339844,6741.750000,6741.750000,3718129920
2018-07-10,6739.209961,6767.740234,6320.720215,6329.950195,6329.950195,4052430080
2018-07-11,6330.770020,6444.959961,6330.470215,6394.709961,6394.709961,3644859904
2018-07-12,6396.779785,6397.100098,6136.419922,6228.810059,6228.810059,3770170112
2018-07-13,6235.029785,6310.549805,6192.240234,6238.049805,6238.049805,3805400064
2018-07-14,6247.500000,6298.189941,6212.220215,6276.120117,6276.120117,2923670016
2018-07-15,6272.700195,6403.459961,6256.509766,6359.640137,6359.640137,3285459968
2018-07-16,6357.009766,6741.750000,6357.009766,6741.750000,6741.750000,4725799936
2018-07-17,6739.649902,7387.240234,6684.169922,7321.040039,7321.040039,5961950208
2018-07-18,7315.319824,7534.990234,7280.470215,7370.779785,7370.779785,6103410176
2018-07-19,7378.200195,7494.459961,7295.459961,7466.859863,7466.859863,5111629824
2018-07-20,7467.399902,7594.669922,7323.259766,7354.129883,7354.129883,4936869888
2018-07-21,7352.720215,7437.640137,7262.410156,7419.290039,7419.290039,3726609920
2018-07-22,7417.799805,7537.950195,7383.819824,7418.490234,7418.490234,3695460096
2018-07-23,7414.709961,7771.500000,7409.100098,7711.109863,7711.109863,5132480000
2018-07-24,7716.509766,8424.269531,7705.500000,8424.269531,8424.269531,7277689856
2018-07-25,8379.660156,8416.870117,8086.359863,8181.390137,8181.390137,5845400064
2018-07-26,8176.850098,8290.330078,7878.709961,7951.580078,7951.580078,4899089920
2018-07-27,7950.399902,8262.660156,7839.759766,8165.009766,8165.009766,5195879936
2018-07-28,8169.060059,8222.849609,8110.770020,8192.150391,8192.150391,3988750080
2018-07-29,8205.820313,8272.259766,8141.180176,8218.459961,8218.459961,4107190016
2018-07-30,8221.580078,8235.500000,7917.500000,8180.479980,8180.479980,5551400000
2018-07-31,8181.200195,8181.529785,7696.930176,7780.439941,7780.439941,5287530000
2018-08-01,7769.040039,7769.040039,7504.950195,7624.910156,7624.910156,4797620000
2018-08-02,7634.189941,7712.770020,7523.439941,7567.149902,7567.149902,4214110000
2018-08-03,7562.140137,7562.140137,7328.649902,7434.390137,7434.390137,4627150000
2018-08-04,7438.669922,7497.490234,6984.069824,7032.850098,7032.850098,4268390000
2018-08-05,7031.080078,7102.770020,6940.700195,7068.479980,7068.479980,3679110000
2018-08-06,7062.939941,7166.549805,6890.540039,6951.799805,6951.799805,3925900000
2018-08-07,6958.319824,7146.560059,6748.240234,6753.120117,6753.120117,4682800000
2018-08-08,6746.850098,6746.850098,6226.220215,6305.799805,6305.799805,5064430000
2018-08-09,6305.560059,6625.729980,6249.069824,6568.229980,6568.229980,4267040000
2018-08-10,6571.419922,6591.259766,6124.520020,6184.709961,6184.709961,4528680000
2018-08-11,6185.790039,6455.740234,6109.029785,6295.729980,6295.729980,4047850000
2018-08-12,6283.649902,6409.850098,6237.500000,6322.689941,6322.689941,5665250000
2018-08-13,6341.359863,6537.049805,6225.720215,6297.569824,6297.569824,4083980000
2018-08-14,6287.660156,6287.939941,5971.049805,6199.709961,6199.709961,5301700000
2018-08-15,6221.419922,6588.490234,6221.419922,6308.520020,6308.520020,4895450000
2018-08-16,6294.229980,6473.500000,6276.410156,6334.729980,6334.729980,4328420000
2018-08-17,6340.910156,6582.500000,6324.970215,6580.629883,6580.629883,4992990000
2018-08-18,6583.430176,6617.350098,6353.729980,6423.759766,6423.759766,3984520000
2018-08-19,6422.569824,6537.979980,6361.549805,6506.069824,6506.069824,3311170000
2018-08-20,6500.509766,6536.919922,6297.930176,6308.529785,6308.529785,3665100000
2018-08-21,6301.069824,6500.870117,6298.240234,6488.759766,6488.759766,3377180000
2018-08-22,6486.250000,6816.790039,6310.109863,6376.709961,6376.709961,4668110000
2018-08-23,6371.339844,6546.540039,6371.339844,6534.879883,6534.879883,3426180000
2018-08-24,6551.520020,6719.959961,6498.640137,6719.959961,6719.959961,4097820000
2018-08-25,6719.950195,6789.629883,6700.959961,6763.189941,6763.189941,3312600000
2018-08-26,6754.640137,6774.750000,6620.750000,6707.259766,6707.259766,3295500000
2018-08-27,6710.799805,6884.640137,6689.709961,6884.640137,6884.640137,4019000000
2018-08-28,6891.080078,7109.560059,6882.339844,7096.279785,7096.279785,4659940000
2018-08-29,7091.709961,7113.299805,6970.819824,7047.160156,7047.160156,4145880000
2018-08-30,7043.759766,7072.689941,6834.689941,6978.229980,6978.229980,4463250000
2018-08-31,6973.970215,7057.169922,6920.160156,7037.580078,7037.580078,4495650000
2018-09-01,7044.810059,7242.290039,7038.049805,7193.250000,7193.250000,4116050000
2018-09-02,7189.580078,7306.310059,7132.160156,7272.720215,7272.720215,4329540000
2018-09-03,7279.029785,7317.939941,7208.149902,7260.060059,7260.060059,4087760000
2018-09-04,7263.000000,7388.259766,7255.439941,7361.660156,7361.660156,4273640000
2018-09-05,7361.459961,7388.430176,6792.830078,6792.830078,6792.830078,5800460000
2018-09-06,6755.140137,6755.140137,6404.720215,6529.169922,6529.169922,5523470000
2018-09-07,6528.919922,6555.290039,6396.870117,6467.069824,6467.069824,4264680000
2018-09-08,6460.169922,6534.250000,6197.520020,6225.979980,6225.979980,3835060000
2018-09-09,6223.379883,6446.259766,6201.220215,6300.859863,6300.859863,3671890000
2018-09-10,6301.569824,6374.979980,6292.759766,6329.700195,6329.700195,3714100000
2018-09-11,6331.879883,6398.919922,6260.209961,6321.200195,6321.200195,3849910000
2018-09-12,6317.009766,6363.870117,6265.089844,6351.799805,6351.799805,4064230000
2018-09-13,6354.240234,6535.410156,6354.240234,6517.310059,6517.310059,4210910000
2018-09-14,6515.410156,6596.100098,6456.169922,6512.709961,6512.709961,4076220000
2018-09-15,6509.399902,6561.720215,6493.549805,6543.200195,6543.200195,3216300000
2018-09-16,6536.680176,6544.330078,6460.100098,6517.180176,6517.180176,3273730000
2018-09-17,6514.060059,6540.209961,6257.520020,6281.200195,6281.200195,3910780000
2018-09-18,6280.910156,6384.180176,6265.709961,6371.299805,6371.299805,4180090000
2018-09-19,6371.850098,6448.459961,6208.339844,6398.540039,6398.540039,4431340000
2018-09-20,6398.850098,6529.259766,6395.950195,6519.669922,6519.669922,4348110000
2018-09-21,6513.870117,6794.330078,6496.359863,6734.950195,6734.950195,6531940000
2018-09-22,6735.049805,6814.560059,6616.799805,6721.979980,6721.979980,4509660000
2018-09-23,6715.319824,6766.149902,6679.419922,6710.629883,6710.629883,4197500000
2018-09-24,6704.770020,6713.560059,6580.899902,6595.410156,6595.410156,4177310000
2018-09-25,6603.640137,6603.640137,6381.859863,6446.470215,6446.470215,4726180000
2018-09-26,6452.790039,6585.910156,6397.890137,6495.000000,6495.000000,4437300000
2018-09-27,6495.290039,6712.100098,6464.950195,6676.750000,6676.750000,4606810000
2018-09-28,6678.750000,6785.029785,6598.319824,6644.129883,6644.129883,5014430000
2018-09-29,6643.100098,6643.100098,6511.649902,6601.959961,6601.959961,4363690000
2018-09-30,6604.709961,6643.779785,6566.540039,6625.560059,6625.560059,4002280000
2018-10-01,6619.850098,6653.299805,6549.080078,6589.620117,6589.620117,4000970000
2018-10-02,6593.240234,6611.839844,6537.899902,6556.100098,6556.100098,3979260000
2018-10-03,6553.859863,6571.459961,6454.029785,6502.589844,6502.589844,3887310000
2018-10-04,6497.910156,6603.310059,6497.910156,6576.689941,6576.689941,3838410000
2018-10-05,6574.149902,6623.620117,6557.410156,6622.479980,6622.479980,3671500000
2018-10-06,6622.450195,6628.540039,6577.799805,6588.310059,6588.310059,3259740000
2018-10-07,6590.680176,6641.490234,6557.040039,6602.950195,6602.950195,3306630000
2018-10-08,6600.189941,6675.060059,6576.040039,6652.229980,6652.229980,3979460000
2018-10-09,6653.080078,6661.410156,6606.939941,6642.640137,6642.640137,3580810000
2018-10-10,6640.290039,6640.290039,6538.959961,6585.529785,6585.529785,3787650000
2018-10-11,6586.740234,6586.740234,6243.740234,6256.240234,6256.240234,5181640000
2018-10-12,6239.250000,6328.500000,6236.470215,6274.580078,6274.580078,3783500000
2018-10-13,6278.080078,6308.509766,6259.810059,6285.990234,6285.990234,3064030000
2018-10-14,6288.490234,6363.209961,6280.149902,6290.930176,6290.930176,3085320000
2018-10-15,6292.640137,6965.060059,6258.680176,6596.540039,6596.540039,7370770000
2018-10-16,6601.410156,6673.589844,6571.370117,6596.109863,6596.109863,4074800000
2018-10-17,6590.520020,6601.209961,6517.450195,6544.430176,6544.430176,4088420000
2018-10-18,6542.330078,6567.540039,6450.040039,6476.709961,6476.709961,3924080000
2018-10-19,6478.069824,6493.680176,6445.310059,6465.410156,6465.410156,3578870000
2018-10-20,6460.919922,6497.720215,6449.000000,6489.189941,6489.189941,3379130000
2018-10-21,6490.089844,6556.379883,6476.000000,6482.350098,6482.350098,3253610000
2018-10-22,6486.049805,6543.799805,6462.979980,6487.160156,6487.160156,3672860000
2018-10-23,6472.359863,6506.009766,6451.270020,6475.740234,6475.740234,3716150000
2018-10-24,6478.890137,6521.990234,6468.859863,6495.839844,6495.839844,3424670000
2018-10-25,6484.649902,6504.649902,6447.029785,6476.290039,6476.290039,3230550000
2018-10-26,6468.439941,6498.290039,6449.609863,6474.750000,6474.750000,3306050000
2018-10-27,6480.839844,6507.410156,6453.529785,6480.379883,6480.379883,3393250000
2018-10-28,6482.660156,6502.279785,6447.910156,6486.390137,6486.390137,3445190000
2018-10-29,6492.350098,6503.600098,6306.990234,6332.629883,6332.629883,4199910000
2018-10-30,6337.040039,6364.990234,6310.140137,6334.270020,6334.270020,3781100000
2018-10-31,6336.990234,6349.160156,6316.879883,6317.609863,6317.609863,4191240000
2018-11-01,6318.140137,6547.140137,6311.830078,6377.779785,6377.779785,3789400000
2018-11-02,6378.919922,6396.859863,6327.379883,6388.439941,6388.439941,4234870000
2018-11-03,6387.240234,6400.069824,6342.370117,6361.259766,6361.259766,3658640000
2018-11-04,6365.470215,6388.629883,6294.569824,6376.129883,6376.129883,4390020000
2018-11-05,6363.620117,6480.589844,6363.620117,6419.660156,6419.660156,4174800000
2018-11-06,6433.379883,6463.549805,6408.160156,6461.009766,6461.009766,4700040000
2018-11-07,6468.500000,6552.160156,6468.310059,6530.140137,6530.140137,4941260000
2018-11-08,6522.270020,6536.919922,6438.529785,6453.720215,6453.720215,4665260000
2018-11-09,6442.600098,6456.459961,6373.370117,6385.620117,6385.620117,4346820000
2018-11-10,6386.129883,6437.279785,6385.310059,6409.220215,6409.220215,3705320000
2018-11-11,6413.629883,6423.250000,6350.169922,6411.270020,6411.270020,3939060000
2018-11-12,6411.759766,6434.209961,6360.470215,6371.270020,6371.270020,4295770000
2018-11-13,6373.189941,6395.270020,6342.669922,6359.490234,6359.490234,4503800000
2018-11-14,6351.240234,6371.549805,5544.089844,5738.350098,5738.350098,7398940000
2018-11-15,5736.149902,5774.819824,5358.379883,5648.029785,5648.029785,7032140000
2018-11-16,5645.319824,5657.020020,5498.939941,5575.549805,5575.549805,5279320000
2018-11-17,5578.580078,5578.580078,5519.560059,5554.330078,5554.330078,4303150000
2018-11-18,5559.740234,5653.609863,5559.740234,5623.540039,5623.540039,4159680000
2018-11-19,5620.779785,5620.779785,4842.910156,4871.490234,4871.490234,7039560000
2018-11-20,4863.930176,4951.609863,4272.109863,4451.870117,4451.870117,8428290000
2018-11-21,4465.540039,4675.729980,4343.979980,4602.169922,4602.169922,6120120000
2018-11-22,4611.569824,4629.640137,4365.640137,4365.939941,4365.939941,4569370000
2018-11-23,4360.700195,4396.419922,4195.680176,4347.109863,4347.109863,4871490000
2018-11-24,4347.689941,4413.089844,3795.159912,3880.760010,3880.760010,4679500000
2018-11-25,3880.780029,4120.870117,3585.060059,4009.969971,4009.969971,6825640000
2018-11-26,4015.070068,4107.140137,3643.919922,3779.129883,3779.129883,6476900000
2018-11-27,3765.949951,3862.959961,3661.010010,3820.719971,3820.719971,5998720000
2018-11-28,3822.469971,4385.899902,3822.469971,4257.419922,4257.419922,7280280000
2018-11-29,4269.004395,4413.020508,4145.765137,4278.846680,4278.846680,6503347767
2018-11-30,4289.088867,4322.976563,3942.822021,4017.268555,4017.268555,6048016717
2018-12-01,4024.464355,4309.377441,3969.710693,4214.671875,4214.671875,5375314093
2018-12-02,4200.733398,4301.519531,4110.978516,4139.877930,4139.877930,5262697895
2018-12-03,4147.323730,4155.979492,3840.446289,3894.130859,3894.130859,5089570994
2018-12-04,3886.294922,4075.627686,3832.750000,3956.893799,3956.893799,5028069239
2018-12-05,3958.894775,3969.535889,3753.994873,3753.994873,3753.994873,5302481574
2018-12-06,3754.074463,3874.966064,3521.101807,3521.101807,3521.101807,5878333109
2018-12-07,3512.590332,3512.590332,3280.228760,3419.937256,3419.937256,6835615448
2018-12-08,3421.910400,3506.043457,3350.650635,3476.114746,3476.114746,5305024497
2018-12-09,3473.227539,3685.305664,3469.094238,3614.234375,3614.234375,4947372847
2018-12-10,3612.046387,3647.332520,3470.144531,3502.656006,3502.656006,5020968740
2018-12-11,3497.554688,3513.185059,3392.250000,3424.588135,3424.588135,4696765188
2018-12-12,3421.458252,3534.228516,3413.481445,3486.950195,3486.950195,4139364829
2018-12-13,3487.879395,3489.739502,3298.132080,3313.677246,3313.677246,4343372456
2018-12-14,3311.751953,3329.555908,3206.542236,3242.484863,3242.484863,4372763663
2018-12-15,3243.997559,3275.377930,3191.303467,3236.761719,3236.761719,3551763561
2018-12-16,3236.274658,3305.753174,3233.819824,3252.839111,3252.839111,3744248994
2018-12-17,3253.123047,3597.917969,3253.123047,3545.864746,3545.864746,5409247918
2018-12-18,3544.761475,3701.349365,3487.169189,3696.059082,3696.059082,5911325473
2018-12-19,3706.824951,3949.322998,3687.229980,3745.950684,3745.950684,6810689119
2018-12-20,3742.195068,4191.228516,3728.974609,4134.441406,4134.441406,8927129279
2018-12-21,4133.703613,4198.429688,3850.946289,3896.543701,3896.543701,7206015706
2018-12-22,3898.083740,4014.182617,3855.739014,4014.182617,4014.182617,5605823233
2018-12-23,4020.994629,4085.723633,3976.405762,3998.980225,3998.980225,6151275490
2018-12-24,4000.331787,4271.792480,4000.331787,4078.599121,4078.599121,7240968501
2018-12-25,4081.030518,4089.561523,3760.020508,3815.490723,3815.490723,6158207293
2018-12-26,3819.666748,3893.359619,3769.863770,3857.297607,3857.297607,5326547918
2018-12-27,3854.688477,3874.416992,3645.448486,3654.833496,3654.833496,5130222366
2018-12-28,3653.131836,3956.135986,3642.632080,3923.918701,3923.918701,5631554348
2018-12-29,3932.491699,3963.758789,3820.408691,3820.408691,3820.408691,4991655917
2018-12-30,3822.384766,3901.908936,3797.219238,3865.952637,3865.952637,4770578575
2018-12-31,3866.839111,3868.742920,3725.867432,3742.700439,3742.700439,4661840806
2019-01-01,3746.713379,3850.913818,3707.231201,3843.520020,3843.520020,4324200990
2019-01-02,3849.216309,3947.981201,3817.409424,3943.409424,3943.409424,5244856836
2019-01-03,3931.048584,3935.685059,3826.222900,3836.741211,3836.741211,4530215219
2019-01-04,3832.040039,3865.934570,3783.853760,3857.717529,3857.717529,4847965467
2019-01-05,3851.973877,3904.903076,3836.900146,3845.194580,3845.194580,5137609824
2019-01-06,3836.519043,4093.297363,3826.513184,4076.632568,4076.632568,5597027440
2019-01-07,4078.584961,4092.613525,4020.894043,4025.248291,4025.248291,5228625637
2019-01-08,4028.472168,4109.020996,3996.955322,4030.847900,4030.847900,5306593305
2019-01-09,4031.552002,4068.403564,4022.662842,4035.296387,4035.296387,5115905225
2019-01-10,4034.411377,4064.066650,3659.174561,3678.924561,3678.924561,6874143796
2019-01-11,3674.015381,3713.881836,3653.069824,3687.365479,3687.365479,5538712865
2019-01-12,3686.973145,3698.978271,3653.810791,3661.301025,3661.301025,4778170883
2019-01-13,3658.868164,3674.760010,3544.927246,3552.953125,3552.953125,4681302466
2019-01-14,3557.311035,3727.836182,3552.285156,3706.052246,3706.052246,5651384490
2019-01-15,3704.216309,3720.153320,3619.949219,3630.675293,3630.675293,5537192302
2019-01-16,3631.509766,3685.777100,3624.673340,3655.006836,3655.006836,5394457145
2019-01-17,3651.871094,3680.135986,3621.960938,3678.563965,3678.563965,5464420383
2019-01-18,3677.990479,3682.520020,3637.080811,3657.839355,3657.839355,5002961727
2019-01-19,3652.377930,3758.533447,3652.377930,3728.568359,3728.568359,5955691380
2019-01-20,3725.446045,3743.387939,3583.019531,3601.013672,3601.013672,5582489560
2019-01-21,3600.372803,3608.840820,3558.537109,3576.032471,3576.032471,5004347059
2019-01-22,3575.081299,3620.746582,3539.721436,3604.577148,3604.577148,5313623556
2019-01-23,3605.557129,3623.067871,3565.313965,3585.123047,3585.123047,5433755649
2019-01-24,3584.500244,3616.087402,3569.092773,3600.865479,3600.865479,5262869046
2019-01-25,3607.390381,3612.927734,3575.597412,3599.765869,3599.765869,5265847539
2019-01-26,3599.715332,3654.933105,3593.345947,3602.460449,3602.460449,5098183235
2019-01-27,3604.687256,3612.671387,3567.245850,3583.965820,3583.965820,5570752966
2019-01-28,3584.283203,3586.750977,3439.232910,3470.450439,3470.450439,6908930483
2019-01-29,3468.870117,3476.065430,3400.819824,3448.116943,3448.116943,5897159493
2019-01-30,3443.896973,3495.174805,3429.387939,3486.181641,3486.181641,5955112627
2019-01-31,3485.409180,3504.804932,3447.915771,3457.792725,3457.792725,5831198271
2019-02-01,3460.547119,3501.954102,3431.591553,3487.945313,3487.945313,5422926707
2019-02-02,3484.625977,3523.287354,3467.574707,3521.060791,3521.060791,5071623601
2019-02-03,3516.139648,3521.388184,3447.924316,3464.013428,3464.013428,5043937584
2019-02-04,3467.211670,3476.223877,3442.586914,3459.154053,3459.154053,5332718886
2019-02-05,3454.950928,3478.148193,3451.937012,3466.357422,3466.357422,5227549545
2019-02-06,3469.091797,3469.091797,3398.565430,3413.767822,3413.767822,5482196038
2019-02-07,3414.929443,3427.945557,3394.218506,3399.471680,3399.471680,5004962683
2019-02-08,3401.376465,3695.614014,3391.023682,3666.780273,3666.780273,7735623101
2019-02-09,3671.585938,3679.941406,3646.559326,3671.203613,3671.203613,6158833645
2019-02-10,3673.201416,3695.036133,3640.979980,3690.188232,3690.188232,6282256903
2019-02-11,3695.613037,3695.613037,3642.287842,3648.430664,3648.430664,6277056434
2019-02-12,3642.751953,3668.586914,3618.556885,3653.528564,3653.528564,6480384532
2019-02-13,3653.604004,3669.746582,3617.246338,3632.070557,3632.070557,6438903823
2019-02-14,3631.170166,3646.256592,3607.697754,3616.880859,3616.880859,6271044418
2019-02-15,3617.368408,3647.795166,3608.206543,3620.810791,3620.810791,6091952231
2019-02-16,3615.270264,3652.841309,3615.270264,3629.787598,3629.787598,5934744052
2019-02-17,3633.359375,3680.537354,3619.182129,3673.836182,3673.836182,7039512503
2019-02-18,3671.369873,3936.665039,3669.982422,3915.714355,3915.714355,9908216640
2019-02-19,3911.661621,4010.879395,3908.153076,3947.094482,3947.094482,9933626655
2019-02-20,3946.685059,4000.486328,3926.246826,3999.820557,3999.820557,8693373948
2019-02-21,4000.256836,4010.009521,3940.108154,3954.118164,3954.118164,7775128102
2019-02-22,3952.406494,4006.538330,3950.816406,4005.526611,4005.526611,7826525254
2019-02-23,3998.916260,4166.286133,3968.726807,4142.526855,4142.526855,8922258316
2019-02-24,4145.458008,4210.641602,3793.708984,3810.427490,3810.427490,10794227451
2019-02-25,3807.002441,3913.707275,3807.002441,3882.696289,3882.696289,9318796067
2019-02-26,3878.697266,3891.578857,3837.986328,3854.357910,3854.357910,7931218996
2019-02-27,3857.479736,3888.802490,3787.058838,3851.047363,3851.047363,8301309684
2019-02-28,3848.261963,3906.058350,3845.821289,3854.785400,3854.785400,8399767798
2019-03-01,3853.757080,3907.795410,3851.692383,3859.583740,3859.583740,7661247975
2019-03-02,3855.318115,3874.607422,3832.127930,3864.415039,3864.415039,7578786076
2019-03-03,3862.266113,3875.483643,3836.905762,3847.175781,3847.175781,7253558152
2019-03-04,3845.091553,3867.381836,3733.749756,3761.557129,3761.557129,9029175788
2019-03-05,3759.832520,3903.916748,3745.183105,3896.375000,3896.375000,10174126415
2019-03-06,3897.081055,3919.510498,3871.460693,3903.942627,3903.942627,9175291529
2019-03-07,3903.384766,3939.373291,3894.113037,3911.484375,3911.484375,9584165519
2019-03-08,3913.225830,3950.432129,3875.228516,3901.131592,3901.131592,10638638944
2019-03-09,3894.552490,3987.237793,3892.390381,3963.313721,3963.313721,10796103518
2019-03-10,3966.174316,3966.174316,3924.381104,3951.599854,3951.599854,9713267607
2019-03-11,3953.740234,3966.384766,3889.239014,3905.227295,3905.227295,10125901903
2019-03-12,3903.758301,3926.889160,3863.559082,3909.156250,3909.156250,9809887079
2019-03-13,3913.047363,3926.597656,3891.904297,3906.717285,3906.717285,9469184841
2019-03-14,3905.576904,3946.504395,3901.296875,3924.369141,3924.369141,10480789570
2019-03-15,3926.663330,3968.542969,3914.015381,3960.911133,3960.911133,9394210605
2019-03-16,3963.900146,4077.036377,3961.657471,4048.725830,4048.725830,9856166973
2019-03-17,4047.719482,4054.122070,4006.411133,4025.229004,4025.229004,8221625400
2019-03-18,4029.968506,4071.556641,4009.117188,4032.507324,4032.507324,9646954186
2019-03-19,4032.691895,4082.216064,4023.812500,4071.190186,4071.190186,9344919956
2019-03-20,4070.793945,4089.461914,4031.110840,4087.476318,4087.476318,10175916388
2019-03-21,4083.953857,4097.359863,4005.151367,4029.326904,4029.326904,10831212662
2019-03-22,4028.514648,4053.906738,4021.542480,4023.968262,4023.968262,9252935969
2019-03-23,4022.713379,4049.882568,4015.964600,4035.826416,4035.826416,9578850549
2019-03-24,4035.163574,4040.699707,4006.192871,4022.168213,4022.168213,9144851065
2019-03-25,4024.112793,4038.840820,3934.031250,3963.070557,3963.070557,10359818883
2019-03-26,3969.228760,3985.080811,3944.753174,3985.080811,3985.080811,10707678815
2019-03-27,3984.244873,4087.066162,3977.810547,4087.066162,4087.066162,10897131934
2019-03-28,4087.584473,4094.902100,4040.266357,4069.107178,4069.107178,9353915899
2019-03-29,4068.299805,4113.500977,4034.097168,4098.374512,4098.374512,10918665557
2019-03-30,4092.136230,4296.806641,4053.909668,4106.660156,4106.660156,9732688060
2019-03-31,4105.456055,4113.023438,4094.100830,4105.404297,4105.404297,9045122443
2019-04-01,4105.362305,4164.953125,4096.901367,4158.183105,4158.183105,10157794171
2019-04-02,4156.919434,4905.954590,4155.316895,4879.877930,4879.877930,21315047816
2019-04-03,4879.958008,5307.003418,4876.621094,4973.021973,4973.021973,22899891582
2019-04-04,4971.307617,5063.159668,4836.793945,4922.798828,4922.798828,18251810240
2019-04-05,4922.806152,5053.509766,4919.491699,5036.681152,5036.681152,16837325387
2019-04-06,5036.792969,5205.821777,4992.222168,5059.817383,5059.817383,16929795194
2019-04-07,5062.793945,5235.186523,5050.412109,5198.896973,5198.896973,16655416140
2019-04-08,5199.835449,5318.836426,5148.211914,5289.770996,5289.770996,17154113634
2019-04-09,5289.917969,5289.917969,5167.418945,5204.958496,5204.958496,14722104361
2019-04-10,5204.105469,5421.651367,5193.382324,5324.551758,5324.551758,15504590933
2019-04-11,5325.081543,5354.225586,5017.296387,5064.487793,5064.487793,16555616019
2019-04-12,5061.200684,5103.274414,4955.852539,5089.539063,5089.539063,13675206312
2019-04-13,5088.850098,5127.122070,5061.589355,5096.586426,5096.586426,10823289598
2019-04-14,5095.758789,5184.016113,5053.568359,5167.722168,5167.722168,10391952498
2019-04-15,5167.321777,5196.606934,5024.069336,5067.108398,5067.108398,12290155061
2019-04-16,5066.577637,5238.945313,5055.194824,5235.559570,5235.559570,11618660197
2019-04-17,5236.135254,5274.275391,5219.205566,5251.937988,5251.937988,12438480677
2019-04-18,5251.480469,5319.986328,5250.506836,5298.385742,5298.385742,13256489918
2019-04-19,5298.154297,5336.680176,5233.334961,5303.812500,5303.812500,13780238655
2019-04-20,5304.160645,5358.490723,5295.877930,5337.886230,5337.886230,13169647522
2019-04-21,5335.878906,5359.924805,5257.339355,5314.531250,5314.531250,13731844223
2019-04-22,5312.494629,5422.687500,5280.276855,5399.365234,5399.365234,14601631648
2019-04-23,5399.365723,5633.802246,5389.408691,5572.362305,5572.362305,15867308108
2019-04-24,5571.508301,5642.044434,5418.263184,5464.866699,5464.866699,17048033399
2019-04-25,5466.524414,5542.238281,5181.338867,5210.515625,5210.515625,15330283408
2019-04-26,5210.304688,5383.634277,5177.368652,5279.348145,5279.348145,16812108040
2019-04-27,5279.471191,5310.750000,5233.635742,5268.291016,5268.291016,13111274675
2019-04-28,5271.746582,5326.231934,5255.683594,5285.139160,5285.139160,12819992056
2019-04-29,5284.858398,5311.274902,5216.487793,5247.352539,5247.352539,13735490672
2019-04-30,5247.726074,5363.257324,5224.189941,5350.726563,5350.726563,13878964574
2019-05-01,5350.914551,5418.003906,5347.645996,5402.697266,5402.697266,13679528236
2019-05-02,5402.422852,5522.262695,5394.217285,5505.283691,5505.283691,14644460907
2019-05-03,5505.552246,5865.881836,5490.201660,5768.289551,5768.289551,18720780006
2019-05-04,5769.202637,5886.893555,5645.469238,5831.167480,5831.167480,17567780766
2019-05-05,5831.068359,5833.862793,5708.035156,5795.708496,5795.708496,14808830723
2019-05-06,5791.693359,5802.957520,5653.687500,5746.807129,5746.807129,15737171804
2019-05-07,5745.599121,5988.178223,5741.395996,5829.501465,5829.501465,18026409033
2019-05-08,5849.481445,5989.980957,5794.715820,5982.457520,5982.457520,15320605300
2019-05-09,5982.316406,6183.039063,5982.316406,6174.528809,6174.528809,16784645411
2019-05-10,6175.822754,6434.617676,6161.519043,6378.849121,6378.849121,19419875368
2019-05-11,6379.666992,7333.002930,6375.698730,7204.771484,7204.771484,28867562329
2019-05-12,7203.507324,7503.872070,6815.770996,6972.371582,6972.371582,27773333680
2019-05-13,6971.178223,8047.413086,6898.282227,7814.915039,7814.915039,28677672181
2019-05-14,7807.884277,8268.712891,7696.391113,7994.416016,7994.416016,32031452227
2019-05-15,7989.374512,8216.423828,7899.106934,8205.167969,8205.167969,28344112920
2019-05-16,8194.500977,8320.824219,7729.608398,7884.909180,7884.909180,33167197581
2019-05-17,7886.925781,7929.145508,7038.124512,7343.895508,7343.895508,30066644905
2019-05-18,7341.664551,7447.271973,7251.504395,7271.208008,7271.208008,21354286562
2019-05-19,7267.962891,8261.941406,7267.962891,8197.689453,8197.689453,25902422040
2019-05-20,8196.923828,8200.967773,7678.781738,7978.309082,7978.309082,23843404340
2019-05-21,7977.969238,8062.167969,7843.339844,7963.327637,7963.327637,25127245056
2019-05-22,7956.291992,7997.612305,7615.987305,7680.066406,7680.066406,24719473175
2019-05-23,7677.269043,7943.791504,7533.196777,7881.846680,7881.846680,24457107820
2019-05-24,7881.695313,8140.719727,7824.448730,7987.371582,7987.371582,25919126991
2019-05-25,7991.885254,8117.925781,7965.976074,8052.543945,8052.543945,22256813107
2019-05-26,8055.206055,8687.520508,7924.670410,8673.215820,8673.215820,26677970091
2019-05-27,8674.072266,8907.174805,8668.705078,8805.778320,8805.778320,27949839564
2019-05-28,8802.757813,8807.016602,8634.721680,8719.961914,8719.961914,24226919267
2019-05-29,8718.591797,8755.852539,8482.728516,8659.487305,8659.487305,23473479966
2019-05-30,8661.760742,9008.314453,8221.273438,8319.472656,8319.472656,29246528551
2019-05-31,8320.286133,8586.659180,8172.550781,8574.501953,8574.501953,25365190957
2019-06-01,8573.839844,8625.600586,8481.578125,8564.016602,8564.016602,22488303544
2019-06-02,8565.473633,8809.303711,8561.235352,8742.958008,8742.958008,20266216022
2019-06-03,8741.747070,8743.500000,8204.185547,8208.995117,8208.995117,22004511436
2019-06-04,8210.985352,8210.985352,7564.488770,7707.770996,7707.770996,24609731549
2019-06-05,7704.343262,7901.849121,7668.668457,7824.231445,7824.231445,21760923463
2019-06-06,7819.633301,7937.340820,7571.471191,7822.023438,7822.023438,19474611077
2019-06-07,7826.901367,8126.153320,7788.373535,8043.951172,8043.951172,19141423231
2019-06-08,8036.774902,8076.891113,7837.610840,7954.127930,7954.127930,16522722810
2019-06-09,7949.674805,7975.974121,7583.219727,7688.077148,7688.077148,16610726547
2019-06-10,7692.284668,8031.909668,7586.730957,8000.329590,8000.329590,18689275117
2019-06-11,8004.243652,8026.394043,7772.803711,7927.714355,7927.714355,17107279932
2019-06-12,7925.434082,8196.648438,7862.359863,8145.857422,8145.857422,19034432883
2019-06-13,8145.545410,8311.567383,8087.061035,8230.923828,8230.923828,18669407147
2019-06-14,8230.898438,8710.636719,8183.393066,8693.833008,8693.833008,19831162906
2019-06-15,8689.746094,8859.127930,8618.395508,8838.375000,8838.375000,18371033226
2019-06-16,8841.440430,9335.867188,8814.556641,8994.488281,8994.488281,23348550311
2019-06-17,8988.923828,9416.407227,8988.923828,9320.352539,9320.352539,15562951919
2019-06-18,9335.466797,9348.374023,9004.901367,9081.762695,9081.762695,15848210536
2019-06-19,9078.727539,9299.621094,9070.395508,9273.521484,9273.521484,15546809946
2019-06-20,9273.060547,9594.419922,9232.484375,9527.160156,9527.160156,17846823784
2019-06-21,9525.074219,10144.556641,9525.074219,10144.556641,10144.556641,20624008643
2019-06-22,10175.923828,11157.345703,10107.035156,10701.691406,10701.691406,29995204861
2019-06-23,10696.691406,11246.144531,10556.095703,10855.371094,10855.371094,20998326502
2019-06-24,10853.744141,11065.896484,10610.427734,11011.102539,11011.102539,19271652365
2019-06-25,11007.202148,11790.916992,11007.202148,11790.916992,11790.916992,24879684533
2019-06-26,11778.581055,13796.489258,11755.597656,13016.231445,13016.231445,45105733173
2019-06-27,13017.125000,13311.144531,10491.852539,11182.806641,11182.806641,39977475223
2019-06-28,11162.167969,12445.174805,10914.495117,12407.332031,12407.332031,35087757766
2019-06-29,12400.763672,12400.910156,11508.378906,11959.371094,11959.371094,29923961128
2019-06-30,11931.991211,12178.383789,10799.008789,10817.155273,10817.155273,27256473494
2019-07-01,10796.930664,11206.439453,10089.314453,10583.134766,10583.134766,29378589324
2019-07-02,10588.683594,10912.188477,9737.884766,10801.677734,10801.677734,31015895223
2019-07-03,10818.156250,11968.078125,10818.156250,11961.269531,11961.269531,30796494294
2019-07-04,11972.718750,12006.075195,11166.569336,11215.437500,11215.437500,25920294033
2019-07-05,11203.102539,11395.661133,10874.964844,10978.459961,10978.459961,23838480210
2019-07-06,10982.543945,11620.964844,10982.543945,11208.550781,11208.550781,21092024306
2019-07-07,11217.616211,11541.620117,11148.804688,11450.846680,11450.846680,19369044277
2019-07-08,11446.596680,12345.833008,11393.374023,12285.958008,12285.958008,23482551458
2019-07-09,12284.326172,12779.131836,12233.261719,12573.812500,12573.812500,28167921523
2019-07-10,12571.537109,13129.529297,11710.978516,12156.512695,12156.512695,33627574244
2019-07-11,12139.713867,12144.623047,11158.922852,11358.662109,11358.662109,28595327690
2019-07-12,11354.299805,11905.487305,11179.144531,11815.986328,11815.986328,23534692797
2019-07-13,11813.126953,11841.957031,10908.479492,11392.378906,11392.378906,21042616384
2019-07-14,11381.020508,11451.204102,10234.576172,10256.058594,10256.058594,22486000001
2019-07-15,10257.838867,11052.766602,9992.006836,10895.089844,10895.089844,25384047207
2019-07-16,10896.653320,10996.632813,9448.106445,9477.641602,9477.641602,24151199070
2019-07-17,9471.213867,9963.134766,9163.134766,9693.802734,9693.802734,24569921549
2019-07-18,9698.502930,10736.842773,9376.798828,10666.482422,10666.482422,25187024648
2019-07-19,10653.956055,10716.980469,10229.628906,10530.732422,10530.732422,20727426310
2019-07-20,10525.819336,11048.662109,10451.276367,10767.139648,10767.139648,20206615155
2019-07-21,10777.529297,10841.887695,10389.599609,10599.105469,10599.105469,17130580467
2019-07-22,10596.948242,10651.791016,10154.921875,10343.106445,10343.106445,16334414913
2019-07-23,10346.748047,10346.748047,9883.594727,9900.767578,9900.767578,17851916995
2019-07-24,9887.730469,9908.796875,9614.306641,9811.925781,9811.925781,17398734322
2019-07-25,9809.096680,10154.253906,9773.957031,9911.841797,9911.841797,15821952090
2019-07-26,9913.126953,9916.517578,9717.982422,9870.303711,9870.303711,14495714483
2019-07-27,9871.165039,10167.320313,9411.521484,9477.677734,9477.677734,16817809536
2019-07-28,9491.626953,9575.544922,9252.296875,9552.860352,9552.860352,13738687093
2019-07-29,9548.178711,9681.648438,9472.948242,9519.145508,9519.145508,13791445323
2019-07-30,9522.329102,9701.759766,9437.335938,9607.423828,9607.423828,13829811132
2019-07-31,9604.050781,10085.627930,9598.097656,10085.627930,10085.627930,16631520648
2019-08-01,10077.442383,10446.919922,9922.019531,10399.668945,10399.668945,17165337858
2019-08-02,10402.042969,10657.953125,10371.013672,10518.174805,10518.174805,17489094082
2019-08-03,10519.278320,10946.781250,10503.504883,10821.726563,10821.726563,15352685061
2019-08-04,10821.632813,11009.207031,10620.278320,10970.184570,10970.184570,16530894787
2019-08-05,10960.735352,11895.091797,10960.735352,11805.653320,11805.653320,23875988832
2019-08-06,11811.544922,12273.821289,11290.731445,11478.168945,11478.168945,23635107660
2019-08-07,11476.193359,12036.990234,11433.701172,11941.968750,11941.968750,22194988641
2019-08-08,11954.040039,11979.419922,11556.167969,11966.407227,11966.407227,19481591730
2019-08-09,11953.469727,11970.458008,11709.745117,11862.936523,11862.936523,18339989960
2019-08-10,11861.556641,11915.655273,11323.898438,11354.024414,11354.024414,18125355447
2019-08-11,11349.740234,11523.579102,11248.294922,11523.579102,11523.579102,15774371518
2019-08-12,11528.189453,11528.189453,11320.951172,11382.616211,11382.616211,13647198229
2019-08-13,11385.052734,11420.049805,10830.327148,10895.830078,10895.830078,16681503537
2019-08-14,10889.487305,10889.556641,10028.135742,10051.704102,10051.704102,19990838300
2019-08-15,10038.421875,10437.411133,9675.316406,10311.545898,10311.545898,22899115082
2019-08-16,10319.419922,10524.349609,9855.478516,10374.338867,10374.338867,20228207096
2019-08-17,10358.722656,10452.625000,10086.698242,10231.744141,10231.744141,13778035685
2019-08-18,10233.005859,10487.070313,10119.094727,10345.810547,10345.810547,12999813869
2019-08-19,10350.283203,10916.053711,10313.204102,10916.053711,10916.053711,16038264603
2019-08-20,10916.346680,10947.041992,10618.960938,10763.232422,10763.232422,15053082175
2019-08-21,10764.572266,10798.729492,9962.721680,10138.049805,10138.049805,19473084768
2019-08-22,10142.521484,10232.996094,9831.462891,10131.055664,10131.055664,17097508856
2019-08-23,10136.309570,10442.443359,10078.192383,10407.964844,10407.964844,15627023886
2019-08-24,10407.644531,10418.020508,9982.296875,10159.960938,10159.960938,15451030650
2019-08-25,10160.737305,10304.622070,10008.789063,10138.517578,10138.517578,14153856610
2019-08-26,10126.299805,10512.328125,10126.299805,10370.820313,10370.820313,18438654080
2019-08-27,10372.826172,10381.328125,10087.300781,10185.500000,10185.500000,14762609503
2019-08-28,10203.426758,10279.366211,9716.656250,9754.422852,9754.422852,17603790323
2019-08-29,9756.786133,9756.786133,9421.629883,9510.200195,9510.200195,17045878501
2019-08-30,9514.844727,9656.124023,9428.302734,9598.173828,9598.173828,13595263986
2019-08-31,9597.539063,9673.220703,9531.799805,9630.664063,9630.664063,11454806419
2019-09-01,9630.592773,9796.755859,9582.944336,9757.970703,9757.970703,11445355859
2019-09-02,9757.473633,10396.591797,9730.650391,10346.760742,10346.760742,17248102294
2019-09-03,10345.725586,10736.104492,10308.547852,10623.540039,10623.540039,19384917989
2019-09-04,10621.180664,10762.644531,10434.709961,10594.493164,10594.493164,16742664769
2019-09-05,10588.183594,10627.269531,10516.417969,10575.533203,10575.533203,14551239508
2019-09-06,10578.198242,10898.761719,10292.299805,10353.302734,10353.302734,19536574783
2019-09-07,10353.931641,10558.673828,10348.918945,10517.254883,10517.254883,15307366476
2019-09-08,10518.114258,10595.637695,10409.090820,10441.276367,10441.276367,13670567493
2019-09-09,10443.228516,10450.311523,10144.929688,10334.974609,10334.974609,17595943368
2019-09-10,10336.408203,10394.353516,10020.573242,10115.975586,10115.975586,14906809639
2019-09-11,10123.035156,10215.948242,9980.776367,10178.372070,10178.372070,15428063426
2019-09-12,10176.819336,10442.253906,10099.242188,10410.126953,10410.126953,15323563925
2019-09-13,10415.362305,10441.489258,10226.596680,10360.546875,10360.546875,14109864675
2019-09-14,10345.403320,10422.133789,10291.694336,10358.048828,10358.048828,13468713124
2019-09-15,10356.465820,10387.035156,10313.092773,10347.712891,10347.712891,12043433567
2019-09-16,10347.222656,10386.867188,10189.744141,10276.793945,10276.793945,15160167779
2019-09-17,10281.513672,10296.771484,10199.739258,10241.272461,10241.272461,15304603363
2019-09-18,10247.795898,10275.928711,10191.469727,10198.248047,10198.248047,16169268880
2019-09-19,10200.496094,10295.668945,9851.692383,10266.415039,10266.415039,19937691247
2019-09-20,10266.318359,10285.872070,10132.186523,10181.641602,10181.641602,14734189639
2019-09-21,10183.648438,10188.097656,10000.708008,10019.716797,10019.716797,13425266806
2019-09-22,10024.115234,10074.444336,9922.533203,10070.392578,10070.392578,13199651698
2019-09-23,10067.962891,10074.238281,9727.143555,9729.324219,9729.324219,15144925408
2019-09-24,9729.321289,9804.317383,8370.801758,8620.566406,8620.566406,25002886689
2019-09-25,8603.428711,8744.828125,8325.396484,8486.993164,8486.993164,21744728353
2019-09-26,8487.669922,8515.685547,7895.629395,8118.967773,8118.967773,19258205289
2019-09-27,8113.101074,8271.520508,7965.922852,8251.845703,8251.845703,16408941156
2019-09-28,8251.273438,8285.617188,8125.431641,8245.915039,8245.915039,14141152736
2019-09-29,8246.037109,8261.707031,7990.497070,8104.185547,8104.185547,13034629109
2019-09-30,8104.226563,8314.231445,7830.758789,8293.868164,8293.868164,17115474183
2019-10-01,8299.720703,8497.692383,8232.679688,8343.276367,8343.276367,15305343413
2019-10-02,8344.212891,8393.041992,8227.695313,8393.041992,8393.041992,13125712443
2019-10-03,8390.774414,8414.227539,8146.437012,8259.992188,8259.992188,13668823409
2019-10-04,8259.494141,8260.055664,8151.236816,8205.939453,8205.939453,13139456229
2019-10-05,8210.149414,8215.526367,8071.120605,8151.500488,8151.500488,12200497197
2019-10-06,8149.876953,8161.410156,7958.850586,7988.155762,7988.155762,13160830305
2019-10-07,7989.120605,8308.450195,7905.766113,8245.623047,8245.623047,18009742607
2019-10-08,8246.849609,8332.714844,8185.763184,8228.783203,8228.783203,15592264032
2019-10-09,8229.840820,8627.706055,8169.298828,8595.740234,8595.740234,19384942333
2019-10-10,8585.280273,8625.272461,8471.933594,8586.473633,8586.473633,17618660671
2019-10-11,8585.262695,8721.780273,8316.181641,8321.756836,8321.756836,19604381101
2019-10-12,8315.665039,8415.242188,8313.340820,8336.555664,8336.555664,14532641605
2019-10-13,8336.902344,8470.988281,8276.612305,8321.005859,8321.005859,13808286059
2019-10-14,8320.832031,8390.208984,8284.130859,8374.686523,8374.686523,15151387859
2019-10-15,8373.458008,8410.714844,8182.706543,8205.369141,8205.369141,15220412632
2019-10-16,8204.674805,8216.812500,7985.089844,8047.526855,8047.526855,16071646996
2019-10-17,8047.812500,8134.831543,8000.942871,8103.911133,8103.911133,14313052244
2019-10-18,8100.933594,8138.413574,7902.164063,7973.207520,7973.207520,15651592610
2019-10-19,7973.803711,8082.629395,7944.776855,7988.560547,7988.560547,13797825640
2019-10-20,7997.807129,8281.818359,7949.439453,8222.078125,8222.078125,15504249442
2019-10-21,8225.115234,8296.694336,8196.416016,8243.720703,8243.720703,15868748866
2019-10-22,8243.402344,8296.651367,8074.462891,8078.203125,8078.203125,16803377857
2019-10-23,8076.228516,8092.999512,7469.322754,7514.671875,7514.671875,21942878958
2019-10-24,7509.728027,7532.867676,7446.988770,7493.488770,7493.488770,16268708849
2019-10-25,7490.703125,8691.540039,7479.984375,8660.700195,8660.700195,28705065488
2019-10-26,8667.577148,10021.744141,8662.622070,9244.972656,9244.972656,44496255609
2019-10-27,9241.707031,9749.529297,9112.541992,9551.714844,9551.714844,32593129501
2019-10-28,9565.101563,9805.118164,9256.148438,9256.148438,9256.148438,30948255332
2019-10-29,9248.440430,9516.180664,9232.648438,9427.687500,9427.687500,28426779937
2019-10-30,9422.462891,9426.874023,9085.370117,9205.726563,9205.726563,27706531577
2019-10-31,9202.458008,9383.161133,9028.717773,9199.584961,9199.584961,26583653947
2019-11-01,9193.992188,9275.657227,9132.047852,9261.104492,9261.104492,24324691031
2019-11-02,9259.783203,9377.486328,9249.587891,9324.717773,9324.717773,21242676385
2019-11-03,9324.787109,9379.806641,9141.251953,9235.354492,9235.354492,21132220847
2019-11-04,9235.607422,9505.051758,9191.485352,9412.612305,9412.612305,26170255634
2019-11-05,9413.004883,9457.417969,9256.931641,9342.527344,9342.527344,26198609048
2019-11-06,9340.864258,9423.237305,9305.909180,9360.879883,9360.879883,23133895765
2019-11-07,9352.393555,9368.476563,9202.353516,9267.561523,9267.561523,22700383839
2019-11-08,9265.368164,9272.759766,8775.534180,8804.880859,8804.880859,24333037836
2019-11-09,8809.468750,8891.818359,8793.163086,8813.582031,8813.582031,17578630606
2019-11-10,8812.489258,9103.826172,8806.162109,9055.526367,9055.526367,20587919881
2019-11-11,9056.917969,9081.279297,8700.608398,8757.788086,8757.788086,20265510765
2019-11-12,8759.751953,8853.768555,8685.427734,8815.662109,8815.662109,20309769107
2019-11-13,8812.033203,8836.841797,8761.651367,8808.262695,8808.262695,17545755405
2019-11-14,8811.936523,8826.943359,8692.551758,8708.094727,8708.094727,19084739975
2019-11-15,8705.708008,8730.873047,8484.843750,8491.992188,8491.992188,21796856471
2019-11-16,8491.166016,8591.997070,8473.973633,8550.760742,8550.760742,16495389808
2019-11-17,8549.470703,8727.789063,8500.967773,8577.975586,8577.975586,18668638897
2019-11-18,8573.980469,8653.280273,8273.573242,8309.286133,8309.286133,21579470673
2019-11-19,8305.134766,8408.516602,8099.963379,8206.145508,8206.145508,21083613816
2019-11-20,8203.613281,8237.240234,8010.511719,8027.268066,8027.268066,20764300437
2019-11-21,8023.644531,8110.098145,7597.381836,7642.750000,7642.750000,22514243371
2019-11-22,7643.569336,7697.382813,6936.706543,7296.577637,7296.577637,34242315785
2019-11-23,7296.164551,7442.258789,7151.417969,7397.796875,7397.796875,21008924418
2019-11-24,7398.633789,7408.577148,7029.289063,7047.916992,7047.916992,30433517289
2019-11-25,7039.977051,7319.856934,6617.166992,7146.133789,7146.133789,42685231262
2019-11-26,7145.159180,7320.230469,7098.572266,7218.371094,7218.371094,21129505542
2019-11-27,7220.880859,7619.693359,6974.174316,7531.663574,7531.663574,23991412764
2019-11-28,7536.820313,7730.072754,7454.121582,7463.105957,7463.105957,19050116751
2019-11-29,7466.727051,7781.179688,7460.756348,7761.243652,7761.243652,19709695456
2019-11-30,7764.057129,7836.102051,7515.849609,7569.629883,7569.629883,17158194786
2019-12-01,7571.616211,7571.616211,7291.341797,7424.292480,7424.292480,18720708479
2019-12-02,7424.036133,7474.818848,7233.399414,7321.988281,7321.988281,17082040706
2019-12-03,7323.975586,7418.858887,7229.356934,7320.145508,7320.145508,14797485769
2019-12-04,7320.125000,7539.784668,7170.922852,7252.034668,7252.034668,21664240918
2019-12-05,7253.241699,7743.431641,7232.676758,7448.307617,7448.307617,18816085231
2019-12-06,7450.561523,7546.996582,7392.175293,7546.996582,7546.996582,18104466307
2019-12-07,7547.265625,7589.951660,7525.711426,7556.237793,7556.237793,15453520564
2019-12-08,7551.338867,7634.606445,7476.091309,7564.345215,7564.345215,15409908086
2019-12-09,7561.795410,7618.091797,7365.985352,7400.899414,7400.899414,17872021272
2019-12-10,7397.134277,7424.022949,7246.043945,7278.119629,7278.119629,18249031195
2019-12-11,7277.197754,7324.156250,7195.527344,7217.427246,7217.427246,16350490689
2019-12-12,7216.738770,7266.639648,7164.741211,7243.134277,7243.134277,18927080224
2019-12-13,7244.662109,7293.560547,7227.122559,7269.684570,7269.684570,17125736940
2019-12-14,7268.902832,7308.836426,7097.208984,7124.673828,7124.673828,17137029730
2019-12-15,7124.239746,7181.075684,6924.375977,7152.301758,7152.301758,16881129804
2019-12-16,7153.663086,7171.168945,6903.682617,6932.480469,6932.480469,20213265950
2019-12-17,6931.315430,6964.075195,6587.974121,6640.515137,6640.515137,22363804217
2019-12-18,6647.698242,7324.984863,6540.049316,7276.802734,7276.802734,31836522778
2019-12-19,7277.590820,7346.602539,7041.381836,7202.844238,7202.844238,25904604416
2019-12-20,7208.636719,7257.921875,7086.124023,7218.816406,7218.816406,22633815180
2019-12-21,7220.593750,7223.226074,7112.735840,7191.158691,7191.158691,19312552168
2019-12-22,7191.188477,7518.033203,7167.179199,7511.588867,7511.588867,23134537956
2019-12-23,7508.902344,7656.176270,7326.192383,7355.628418,7355.628418,27831788041
2019-12-24,7354.393066,7535.716797,7269.528809,7322.532227,7322.532227,22991622105
2019-12-25,7325.755859,7357.020020,7220.991211,7275.155762,7275.155762,21559505149
2019-12-26,7274.799316,7388.302734,7200.386719,7238.966797,7238.966797,22787010034
2019-12-27,7238.141113,7363.529297,7189.934082,7290.088379,7290.088379,22777360996
2019-12-28,7289.031250,7399.041016,7286.905273,7317.990234,7317.990234,21365673026
2019-12-29,7317.647461,7513.948242,7279.865234,7422.652832,7422.652832,22445257702
2019-12-30,7420.272949,7454.824219,7276.308105,7292.995117,7292.995117,22874131672
2019-12-31,7294.438965,7335.290039,7169.777832,7193.599121,7193.599121,21167946112
2020-01-01,7194.892090,7254.330566,7174.944336,7200.174316,7200.174316,18565664997
2020-01-02,7202.551270,7212.155273,6935.270020,6985.470215,6985.470215,20802083465
2020-01-03,6984.428711,7413.715332,6914.996094,7344.884277,7344.884277,28111481032
2020-01-04,7345.375488,7427.385742,7309.514160,7410.656738,7410.656738,18444271275
2020-01-05,7410.451660,7544.497070,7400.535645,7411.317383,7411.317383,19725074095
2020-01-06,7410.452148,7781.867188,7409.292969,7769.219238,7769.219238,23276261598
2020-01-07,7768.682129,8178.215820,7768.227539,8163.692383,8163.692383,28767291327
2020-01-08,8161.935547,8396.738281,7956.774414,8079.862793,8079.862793,31672559265
2020-01-09,8082.295898,8082.295898,7842.403809,7879.071289,7879.071289,24045990466
2020-01-10,7878.307617,8166.554199,7726.774902,8166.554199,8166.554199,28714583844
2020-01-11,8162.190918,8218.359375,8029.642090,8037.537598,8037.537598,25521165085
2020-01-12,8033.261719,8200.063477,8009.059082,8192.494141,8192.494141,22903438381
2020-01-13,8189.771973,8197.788086,8079.700684,8144.194336,8144.194336,22482910688
2020-01-14,8140.933105,8879.511719,8140.933105,8827.764648,8827.764648,44841784107
2020-01-15,8825.343750,8890.117188,8657.187500,8807.010742,8807.010742,40102834650
2020-01-16,8812.481445,8846.460938,8612.095703,8723.786133,8723.786133,31313981931
2020-01-17,8725.209961,8958.122070,8677.316406,8929.038086,8929.038086,36372139320
2020-01-18,8927.211914,9012.198242,8827.332031,8942.808594,8942.808594,32337772627
2020-01-19,8941.445313,9164.362305,8620.080078,8706.245117,8706.245117,34217320471
2020-01-20,8704.631836,8745.590820,8560.473633,8657.642578,8657.642578,26422375678
2020-01-21,8658.991211,8755.706055,8544.520508,8745.894531,8745.894531,24097418512
2020-01-22,8744.210938,8792.994141,8636.747070,8680.875977,8680.875977,22600204051
2020-01-23,8680.650391,8687.747070,8333.637695,8406.515625,8406.515625,25770680779
2020-01-24,8405.567383,8514.666992,8266.840820,8445.434570,8445.434570,24397913026
2020-01-25,8440.119141,8458.453125,8296.218750,8367.847656,8367.847656,19647331549
2020-01-26,8364.410156,8602.401367,8325.498047,8596.830078,8596.830078,22177678796
2020-01-27,8597.308594,8977.726563,8597.308594,8909.819336,8909.819336,28647338393
2020-01-28,8912.524414,9358.589844,8908.447266,9358.589844,9358.589844,34398744403
2020-01-29,9357.470703,9406.431641,9269.467773,9316.629883,9316.629883,30682598115
2020-01-30,9316.016602,9553.125977,9230.897461,9508.993164,9508.993164,32378792851
2020-01-31,9508.313477,9521.706055,9230.776367,9350.529297,9350.529297,29432489719
2020-02-01,9346.357422,9439.323242,9313.239258,9392.875000,9392.875000,25922656496
2020-02-02,9389.820313,9468.797852,9217.824219,9344.365234,9344.365234,30835736946
2020-02-03,9344.683594,9540.372070,9248.633789,9293.521484,9293.521484,30934096509
2020-02-04,9292.841797,9331.265625,9112.811523,9180.962891,9180.962891,29893183716
2020-02-05,9183.416016,9701.299805,9163.704102,9613.423828,9613.423828,35222060874
2020-02-06,9617.821289,9824.619141,9539.818359,9729.801758,9729.801758,37628823716
2020-02-07,9726.002930,9834.716797,9726.002930,9795.943359,9795.943359,34522718159
2020-02-08,9793.070313,9876.749023,9678.910156,9865.119141,9865.119141,35172043762
2020-02-09,9863.894531,10129.435547,9850.392578,10116.673828,10116.673828,35807884663
2020-02-10,10115.559570,10165.765625,9784.563477,9856.611328,9856.611328,39386548075
2020-02-11,9855.891602,10210.052734,9729.334961,10208.236328,10208.236328,37648059389
2020-02-12,10202.387695,10393.611328,10202.387695,10326.054688,10326.054688,43444303830
2020-02-13,10323.960938,10457.626953,10116.161133,10214.379883,10214.379883,49356071373
2020-02-14,10211.550781,10321.996094,10125.534180,10312.116211,10312.116211,43338264162
2020-02-15,10313.856445,10341.555664,9874.427734,9889.424805,9889.424805,43865054831
2020-02-16,9889.179688,10053.968750,9722.386719,9934.433594,9934.433594,43374780305
2020-02-17,9936.560547,9938.815430,9507.637695,9690.142578,9690.142578,45998298413
2020-02-18,9691.230469,10161.935547,9632.382813,10141.996094,10141.996094,47271023953
2020-02-19,10143.798828,10191.675781,9611.223633,9633.386719,9633.386719,46992019710
2020-02-20,9629.325195,9643.216797,9507.900391,9608.475586,9608.475586,44925260237
2020-02-21,9611.782227,9723.014648,9589.743164,9686.441406,9686.441406,40930547513
2020-02-22,9687.707031,9698.231445,9600.728516,9663.181641,9663.181641,35838025154
2020-02-23,9663.318359,9937.404297,9657.791016,9924.515625,9924.515625,41185185761
2020-02-24,9921.583008,9951.746094,9537.042969,9650.174805,9650.174805,45080496648
2020-02-25,9651.312500,9652.737305,9305.021484,9341.705078,9341.705078,42515259129
2020-02-26,9338.290039,9354.778320,8704.426758,8820.522461,8820.522461,50420050762
2020-02-27,8825.093750,8932.892578,8577.199219,8784.494141,8784.494141,45470195695
2020-02-28,8788.728516,8890.456055,8492.932617,8672.455078,8672.455078,44605450443
2020-02-29,8671.212891,8775.631836,8599.508789,8599.508789,8599.508789,35792392544
2020-03-01,8599.758789,8726.796875,8471.212891,8562.454102,8562.454102,35349164300
2020-03-02,8563.264648,8921.308594,8532.630859,8869.669922,8869.669922,42857674409
2020-03-03,8865.387695,8901.598633,8704.990234,8787.786133,8787.786133,42386715821
2020-03-04,8788.541992,8843.366211,8712.431641,8755.246094,8755.246094,34746706368
2020-03-05,8760.285156,9142.054688,8757.253906,9078.762695,9078.762695,39698054597
2020-03-06,9078.308594,9167.695313,9032.079102,9122.545898,9122.545898,40826885651
2020-03-07,9121.600586,9163.220703,8890.744141,8909.954102,8909.954102,36216930370
2020-03-08,8908.206055,8914.343750,8105.252930,8108.116211,8108.116211,39973102121
2020-03-09,8111.146484,8177.793457,7690.098145,7923.644531,7923.644531,46936995808
2020-03-10,7922.146973,8136.945313,7814.763184,7909.729492,7909.729492,42213940994
2020-03-11,7910.089844,7950.814453,7642.812500,7911.430176,7911.430176,38682762605
2020-03-12,7913.616211,7929.116211,4860.354004,4970.788086,4970.788086,53980357243
2020-03-13,5017.831055,5838.114746,4106.980957,5563.707031,5563.707031,74156772075
2020-03-14,5573.077637,5625.226563,5125.069336,5200.366211,5200.366211,36154506008
2020-03-15,5201.066895,5836.645020,5169.283203,5392.314941,5392.314941,33997889639
2020-03-16,5385.229492,5385.229492,4575.357910,5014.479980,5014.479980,45368026430
2020-03-17,5002.578125,5371.348633,4981.909180,5225.629395,5225.629395,38622642935
2020-03-18,5227.113770,5331.833984,5069.335938,5238.438477,5238.438477,37878801016
2020-03-19,5245.416504,6329.735840,5236.968750,6191.192871,6191.192871,51000731797
2020-03-20,6191.653809,6844.261719,5865.781738,6198.778320,6198.778320,54442976103
2020-03-21,6206.521484,6378.135254,5932.823242,6185.066406,6185.066406,42494390880
2020-03-22,6185.558105,6359.697266,5823.713867,5830.254883,5830.254883,40099664740
2020-03-23,5831.374512,6443.934570,5785.004395,6416.314941,6416.314941,46491916000
2020-03-24,6436.642578,6789.022949,6411.066406,6734.803711,6734.803711,48221910672
2020-03-25,6738.716797,6892.511230,6536.926270,6681.062988,6681.062988,44590107888
2020-03-26,6675.170898,6735.463867,6590.962891,6716.440430,6716.440430,35319797642
2020-03-27,6719.389160,6793.836426,6466.701660,6469.798340,6469.798340,34585598367
2020-03-28,6467.253906,6467.500977,6117.837891,6242.193848,6242.193848,34885225901
2020-03-29,6245.624512,6250.467285,5920.085938,5922.042969,5922.042969,28373690931
2020-03-30,5925.538574,6517.195801,5903.234375,6429.841797,6429.841797,37101651525
2020-03-31,6430.606445,6504.515137,6374.162109,6438.644531,6438.644531,32786468812
2020-04-01,6437.319336,6612.573730,6202.373535,6606.776367,6606.776367,40346426266
2020-04-02,6606.776367,7088.247559,6595.918457,6793.624512,6793.624512,47660646124
2020-04-03,6797.396484,7003.220703,6673.335938,6733.387207,6733.387207,38976504903
2020-04-04,6738.382813,6878.953613,6696.484863,6867.527344,6867.527344,33185988584
2020-04-05,6862.537598,6883.414063,6715.929199,6791.129395,6791.129395,29510409856
2020-04-06,6788.049805,7271.781250,6782.889648,7271.781250,7271.781250,46896904615
2020-04-07,7273.644043,7427.939453,7136.714355,7176.414551,7176.414551,44243482668
2020-04-08,7179.283203,7356.223633,7153.305664,7334.098633,7334.098633,37563249549
2020-04-09,7337.966309,7341.448242,7179.094238,7302.089355,7302.089355,34815139178
2020-04-10,7303.815430,7303.815430,6802.475098,6865.493164,6865.493164,43622840992
2020-04-11,6867.440430,6926.069824,6789.920898,6859.083008,6859.083008,31222085946
2020-04-12,6858.067871,7119.947266,6811.078125,6971.091797,6971.091797,35759567632
2020-04-13,6965.616699,6965.616699,6668.259766,6845.037598,6845.037598,38619308647
2020-04-14,6843.281738,6958.557129,6793.821289,6842.427734,6842.427734,34110434052
2020-04-15,6845.561523,6928.664551,6633.402832,6642.109863,6642.109863,32288311031
2020-04-16,6640.454102,7134.450684,6555.504395,7116.804199,7116.804199,46783242377
2020-04-17,7116.552734,7167.183105,7050.332031,7096.184570,7096.184570,32513423567
2020-04-18,7092.291504,7269.956543,7089.247070,7257.665039,7257.665039,32447188386
2020-04-19,7260.922363,7280.521973,7167.054688,7189.424805,7189.424805,31311210215
2020-04-20,7186.873535,7240.290527,6835.502930,6881.958496,6881.958496,37747113936
2020-04-21,6879.784180,6934.551758,6834.442383,6880.323242,6880.323242,32589741511
2020-04-22,6879.440430,7145.865723,6867.781738,7117.207520,7117.207520,33249153866
2020-04-23,7121.306152,7491.785156,7081.594727,7429.724609,7429.724609,43500782316
2020-04-24,7434.181641,7574.195801,7434.181641,7550.900879,7550.900879,34636526286
2020-04-25,7550.482910,7641.363770,7521.672363,7569.936035,7569.936035,32941541447
2020-04-26,7570.139160,7700.594238,7561.407715,7679.867188,7679.867188,33070154491
2020-04-27,7679.418945,7795.601074,7679.418945,7795.601074,7795.601074,36162144725
2020-04-28,7796.970215,7814.527344,7730.806641,7807.058594,7807.058594,33187959921
2020-04-29,7806.712402,8871.753906,7786.049316,8801.038086,8801.038086,60201052203
2020-04-30,8797.669922,9440.650391,8533.255859,8658.553711,8658.553711,66964629541
2020-05-01,8672.782227,9048.023438,8667.763672,8864.766602,8864.766602,44068389997
2020-05-02,8869.057617,9007.187500,8811.366211,8988.596680,8988.596680,40134388683
2020-05-03,8983.614258,9167.781250,8830.971680,8897.468750,8897.468750,47101785174
2020-05-04,8895.745117,8956.906250,8645.024414,8912.654297,8912.654297,45718796276
2020-05-05,8912.832031,9062.415039,8856.827148,9003.070313,9003.070313,43148462663
2020-05-06,9007.441406,9411.467773,8966.706055,9268.761719,9268.761719,49371886931
2020-05-07,9261.895508,9992.664063,9138.322266,9951.518555,9951.518555,61112700562
2020-05-08,9936.162109,9996.743164,9767.172852,9842.666016,9842.666016,51780748042
2020-05-09,9840.906250,9913.863281,9580.644531,9593.896484,9593.896484,46566121841
2020-05-10,9591.168945,9595.581055,8395.107422,8756.430664,8756.430664,63325279337
2020-05-11,8755.535156,9033.470703,8374.323242,8601.795898,8601.795898,57119858802
2020-05-12,8610.385742,8949.898438,8569.643555,8804.477539,8804.477539,42142717533
2020-05-13,8805.387695,9317.878906,8805.387695,9269.987305,9269.987305,45558144023
2020-05-14,9271.329102,9793.268555,9255.035156,9733.721680,9733.721680,56426907637
2020-05-15,9734.291016,9755.828125,9261.398438,9328.197266,9328.197266,48158802327
2020-05-16,9333.240234,9564.205078,9260.694336,9377.013672,9377.013672,36164766408
2020-05-17,9374.929688,9823.001953,9349.545898,9670.739258,9670.739258,40084250663
2020-05-18,9675.695313,9906.030273,9570.359375,9726.575195,9726.575195,41827139896
2020-05-19,9727.063477,9836.047852,9539.624023,9729.038086,9729.038086,39254288955
2020-05-20,9725.329102,9804.793945,9447.201172,9522.981445,9522.981445,36546239703
2020-05-21,9522.740234,9555.242188,8869.930664,9081.761719,9081.761719,39326160532
2020-05-22,9080.334961,9232.936523,9008.638672,9182.577148,9182.577148,29810773699
2020-05-23,9185.062500,9302.501953,9118.108398,9209.287109,9209.287109,27727866812
2020-05-24,9212.283203,9288.404297,8787.250977,8790.368164,8790.368164,32518803300
2020-05-25,8786.107422,8951.005859,8719.667969,8906.934570,8906.934570,31288157264
2020-05-26,8909.585938,8991.967773,8757.293945,8835.052734,8835.052734,29584186947
2020-05-27,8837.380859,9203.320313,8834.157227,9181.017578,9181.017578,32740536902
2020-05-28,9184.945313,9546.319336,9148.457031,9525.750977,9525.750977,34367073114
2020-05-29,9528.355469,9573.666992,9379.338867,9439.124023,9439.124023,32896642044
2020-05-30,9438.914063,9704.030273,9366.729492,9700.414063,9700.414063,32722975141
2020-05-31,9700.105469,9700.343750,9432.296875,9461.058594,9461.058594,27773290299
2020-06-01,9463.605469,10199.565430,9450.899414,10167.268555,10167.268555,35198901068
2020-06-02,10162.973633,10182.340820,9460.571289,9529.803711,9529.803711,39137252109
2020-06-03,9533.760742,9682.859375,9471.846680,9656.717773,9656.717773,25007459262
2020-06-04,9655.854492,9887.610352,9525.247070,9800.636719,9800.636719,25921805072
2020-06-05,9800.215820,9869.237305,9663.216797,9665.533203,9665.533203,23509628646
2020-06-06,9664.904297,9773.431641,9591.024414,9653.679688,9653.679688,20438419222
2020-06-07,9653.002930,9768.498047,9458.150391,9758.852539,9758.852539,25015250846
2020-06-08,9760.063477,9782.306641,9675.885742,9771.489258,9771.489258,21486346312
2020-06-09,9774.360352,9836.369141,9664.719727,9795.700195,9795.700195,23717842783
2020-06-10,9794.119141,9908.896484,9728.291016,9870.094727,9870.094727,25706567601
2020-06-11,9870.078125,9938.297852,9263.069336,9321.781250,9321.781250,30247143440
2020-06-12,9320.690430,9540.465820,9285.851563,9480.843750,9480.843750,22610564515
2020-06-13,9480.735352,9493.211914,9396.009766,9475.277344,9475.277344,17564322315
2020-06-14,9477.553711,9482.270508,9347.593750,9386.788086,9386.788086,18991732746
2020-06-15,9386.035156,9504.860352,8990.175781,9450.702148,9450.702148,26699704768
2020-06-16,9454.266602,9579.430664,9400.445313,9538.024414,9538.024414,21565537209
2020-06-17,9533.784180,9540.422852,9327.339844,9480.254883,9480.254883,20177709879
2020-06-18,9481.567383,9482.782227,9328.395508,9411.840820,9411.840820,17770083003
2020-06-19,9410.293945,9440.875977,9274.295898,9288.018555,9288.018555,19632223107
2020-06-20,9290.959961,9394.971680,9247.379883,9332.340820,9332.340820,17130541557
2020-06-21,9330.926758,9401.107422,9300.430664,9303.629883,9303.629883,15324301169
2020-06-22,9300.915039,9655.073242,9296.872070,9648.717773,9648.717773,21104009514
2020-06-23,9644.076172,9670.541016,9547.247070,9629.658203,9629.658203,17006433272
2020-06-24,9632.149414,9680.367188,9278.233398,9313.610352,9313.610352,18961716076
2020-06-25,9314.126953,9340.161133,9095.324219,9264.813477,9264.813477,18616048626
2020-06-26,9260.995117,9310.516602,9101.738281,9162.917969,9162.917969,18341465837
2020-06-27,9167.824219,9207.810547,8998.216797,9045.390625,9045.390625,17273093144
2020-06-28,9048.460938,9197.546875,8975.525391,9143.582031,9143.582031,14560870760
2020-06-29,9140.029297,9237.573242,9041.875977,9190.854492,9190.854492,16460547078
2020-06-30,9185.581055,9217.835938,9084.837891,9137.993164,9137.993164,15735797744
2020-07-01,9145.985352,9309.754883,9104.735352,9228.325195,9228.325195,15971550355
2020-07-02,9231.139648,9274.962891,9036.623047,9123.410156,9123.410156,16338916796
2020-07-03,9124.842773,9202.344727,9058.794922,9087.303711,9087.303711,13078970999
2020-07-04,9084.233398,9183.295898,9053.629883,9132.488281,9132.488281,12290528515
2020-07-05,9126.090820,9162.183594,8977.015625,9073.942383,9073.942383,12903406143
2020-07-06,9072.849609,9375.474609,9058.664063,9375.474609,9375.474609,17889263252
2020-07-07,9349.161133,9360.617188,9201.815430,9252.277344,9252.277344,13839652595
2020-07-08,9253.020508,9450.335938,9249.500000,9428.333008,9428.333008,19702359883
2020-07-09,9427.994141,9431.378906,9234.999023,9277.967773,9277.967773,18000702524
2020-07-10,9273.357422,9287.471680,9118.001953,9278.807617,9278.807617,16860035605
2020-07-11,9277.511719,9293.532227,9199.485352,9240.346680,9240.346680,13249910444
2020-07-12,9241.054688,9319.418945,9197.450195,9276.500000,9276.500000,14452361907
2020-07-13,9277.205078,9306.405273,9224.292969,9243.614258,9243.614258,17519821266
2020-07-14,9238.703125,9283.841797,9171.661133,9243.213867,9243.213867,18085038362
2020-07-15,9241.897461,9275.325195,9171.933594,9192.836914,9192.836914,15844731575
2020-07-16,9191.980469,9214.312500,9088.947266,9132.227539,9132.227539,15713967523
2020-07-17,9131.812500,9182.253906,9089.202148,9151.392578,9151.392578,13944570749
2020-07-18,9151.183594,9230.983398,9100.824219,9159.040039,9159.040039,12252601475
2020-07-19,9158.005859,9201.398438,9097.632813,9185.817383,9185.817383,12939002784
2020-07-20,9187.220703,9214.270508,9137.509766,9164.231445,9164.231445,13755604146
2020-07-21,9162.514648,9407.262695,9149.389648,9374.887695,9374.887695,18069581956
2020-07-22,9375.080078,9530.518555,9319.653320,9525.363281,9525.363281,16532254884
2020-07-23,9527.141602,9610.247070,9483.003906,9581.072266,9581.072266,18146399002
2020-07-24,9585.514648,9623.336914,9481.454102,9536.892578,9536.892578,16552768325
2020-07-25,9539.485352,9704.556641,9530.211914,9677.113281,9677.113281,16610070933
2020-07-26,9680.234375,10023.807617,9652.847656,9905.166992,9905.166992,20507998997
2020-07-27,9905.217773,11298.221680,9903.969727,10990.873047,10990.873047,35359749590
2020-07-28,11017.463867,11204.327148,10632.631836,10912.823242,10912.823242,28766551142
2020-07-29,10912.953125,11304.397461,10856.141602,11100.467773,11100.467773,24617249715
2020-07-30,11099.833008,11169.356445,10895.455078,11111.213867,11111.213867,22857247901
2020-07-31,11110.210938,11415.864258,10987.053711,11323.466797,11323.466797,23160469766
2020-08-01,11322.570313,11794.775391,11239.682617,11759.592773,11759.592773,26075670303
2020-08-02,11758.764648,12034.144531,11018.129883,11053.614258,11053.614258,27410067336
2020-08-03,11043.768555,11453.079102,11012.415039,11246.348633,11246.348633,20271713443
2020-08-04,11246.203125,11385.381836,11094.145508,11205.892578,11205.892578,21250197042
2020-08-05,11203.823242,11786.617188,11158.285156,11747.022461,11747.022461,24411254471
2020-08-06,11749.871094,11902.335938,11598.713867,11779.773438,11779.773438,23400740340
2020-08-07,11778.894531,11898.038086,11408.593750,11601.472656,11601.472656,23132312867
2020-08-08,11604.553711,11800.064453,11558.431641,11754.045898,11754.045898,17572057837
2020-08-09,11737.325195,11806.056641,11548.784180,11675.739258,11675.739258,17489608833
2020-08-10,11662.256836,12045.140625,11662.256836,11878.111328,11878.111328,26114112569
2020-08-11,11881.647461,11932.710938,11195.708984,11410.525391,11410.525391,27039782640
2020-08-12,11404.596680,11748.396484,11249.605469,11584.934570,11584.934570,25064548486
2020-08-13,11588.405273,11796.396484,11216.872070,11784.137695,11784.137695,27522199497
2020-08-14,11772.659180,12150.994141,11685.455078,11768.871094,11768.871094,24237958589
2020-08-15,11768.697266,11963.203125,11768.697266,11865.698242,11865.698242,23354924400
2020-08-16,11866.685547,11934.901367,11737.188477,11892.803711,11892.803711,20583375490
2020-08-17,11895.658203,12359.056641,11806.696289,12254.402344,12254.402344,28227687027
2020-08-18,12251.895508,12335.707031,11954.525391,11991.233398,11991.233398,26043227672
2020-08-19,11990.884766,12028.923828,11687.333008,11758.283203,11758.283203,24502851117
2020-08-20,11761.500000,11900.411133,11710.063477,11878.372070,11878.372070,20175242945
2020-08-21,11878.026367,11899.259766,11564.979492,11592.489258,11592.489258,23762425999
2020-08-22,11585.477539,11689.407227,11448.805664,11681.825195,11681.825195,20224191306
2020-08-23,11679.696289,11713.429688,11559.920898,11664.847656,11664.847656,18482062658
2020-08-24,11663.689453,11807.631836,11623.250000,11774.595703,11774.595703,20681511755
2020-08-25,11773.588867,11778.299805,11189.850586,11366.134766,11366.134766,26301509932
2020-08-26,11366.894531,11530.052734,11296.993164,11488.363281,11488.363281,22466660958
2020-08-27,11485.608398,11570.786133,11185.941406,11323.397461,11323.397461,23240415076
2020-08-28,11325.295898,11545.615234,11316.422852,11542.500000,11542.500000,19807127588
2020-08-29,11541.054688,11585.640625,11466.292969,11506.865234,11506.865234,17485597759
2020-08-30,11508.713867,11715.264648,11492.381836,11711.505859,11711.505859,19760127945
2020-08-31,11713.306641,11768.876953,11598.318359,11680.820313,11680.820313,22285928250
2020-09-01,11679.316406,12067.081055,11601.128906,11970.478516,11970.478516,27311555343
2020-09-02,11964.823242,11964.823242,11290.793945,11414.034180,11414.034180,28037405299
2020-09-03,11407.191406,11443.022461,10182.464844,10245.296875,10245.296875,31927261555
2020-09-04,10230.365234,10663.919922,10207.940430,10511.813477,10511.813477,29965130374
2020-09-05,10512.530273,10581.571289,9946.675781,10169.567383,10169.567383,44916565292
2020-09-06,10167.216797,10353.927734,10056.885742,10280.351563,10280.351563,37071460174
2020-09-07,10280.998047,10399.153320,9916.493164,10369.563477,10369.563477,33703098409
2020-09-08,10369.306641,10414.775391,9945.110352,10131.516602,10131.516602,33430927462
2020-09-09,10134.151367,10350.542969,10017.250977,10242.347656,10242.347656,24128292755
2020-09-10,10242.330078,10503.912109,10238.135742,10363.138672,10363.138672,54406443211
2020-09-11,10369.028320,10434.922852,10140.836914,10400.915039,10400.915039,45201121775
2020-09-12,10409.861328,10578.837891,10292.386719,10442.170898,10442.170898,36750077324
2020-09-13,10452.399414,10577.214844,10224.330078,10323.755859,10323.755859,36506852789
2020-09-14,10328.734375,10800.010742,10266.008789,10680.837891,10680.837891,35453581940
2020-09-15,10677.754883,10938.631836,10656.459961,10796.951172,10796.951172,32509451925
2020-09-16,10797.761719,11100.124023,10704.884766,10974.905273,10974.905273,30769986455
2020-09-17,10973.251953,11037.420898,10774.627930,10948.990234,10948.990234,38151810523
2020-09-18,10951.820313,11034.908203,10829.657227,10944.585938,10944.585938,26341903912
2020-09-19,10933.752930,11134.092773,10909.618164,11094.346680,11094.346680,22764204008
2020-09-20,11095.870117,11095.870117,10814.477539,10938.271484,10938.271484,24699523788
2020-09-21,10934.925781,10988.304688,10380.260742,10462.259766,10462.259766,28884999244
2020-09-22,10459.624023,10568.077148,10382.726563,10538.459961,10538.459961,23621787804
2020-09-23,10535.492188,10537.828125,10197.865234,10246.186523,10246.186523,23788661867
2020-09-24,10248.786133,10771.056641,10231.490234,10760.066406,10760.066406,47144380902
2020-09-25,10761.109375,10777.696289,10578.914063,10692.716797,10692.716797,39348590957
2020-09-26,10695.575195,10772.999023,10667.281250,10750.723633,10750.723633,46852525493
2020-09-27,10746.892578,10803.976563,10622.921875,10775.269531,10775.269531,53745972818
2020-09-28,10776.613281,10945.347656,10703.893555,10709.652344,10709.652344,47762394731
2020-09-29,10709.650391,10860.000977,10649.495117,10844.640625,10844.640625,46582396602
2020-09-30,10843.871094,10847.256836,10669.321289,10784.491211,10784.491211,44171073700
2020-10-01,10795.254883,10933.624023,10472.356445,10619.452148,10619.452148,40023134100
2020-10-02,10619.821289,10657.837891,10416.689453,10575.974609,10575.974609,48661453918
2020-10-03,10575.100586,10598.940430,10511.129883,10549.329102,10549.329102,44660271563
2020-10-04,10550.440430,10686.000000,10534.391602,10669.583008,10669.583008,71251776995
2020-10-05,10676.529297,10793.507813,10634.600586,10793.339844,10793.339844,47537578009
2020-10-06,10796.306641,10797.578125,10528.890625,10604.406250,10604.406250,42623695307
2020-10-07,10603.355469,10680.507813,10562.506836,10668.968750,10668.968750,37799458436
2020-10-08,10669.371094,10945.737305,10562.606445,10915.685547,10915.685547,63314794397
2020-10-09,10927.913086,11102.671875,10846.850586,11064.458008,11064.458008,22799117613
2020-10-10,11059.142578,11442.210938,11056.940430,11296.361328,11296.361328,22877978588
2020-10-11,11296.082031,11428.813477,11288.627930,11384.181641,11384.181641,19968627060
2020-10-12,11392.635742,11698.467773,11240.686523,11555.363281,11555.363281,26163972642
2020-10-13,11548.719727,11548.984375,11321.224609,11425.899414,11425.899414,24241420251
2020-10-14,11429.047852,11539.977539,11307.831055,11429.506836,11429.506836,24103426719
2020-10-15,11426.602539,11569.914063,11303.603516,11495.349609,11495.349609,24487233058
2020-10-16,11502.828125,11540.061523,11223.012695,11322.123047,11322.123047,25635480772
2020-10-17,11322.123047,11386.261719,11285.345703,11358.101563,11358.101563,19130430174
2020-10-18,11355.982422,11483.359375,11347.578125,11483.359375,11483.359375,18283314340
2020-10-19,11495.038086,11799.092773,11408.290039,11742.037109,11742.037109,23860769928
2020-10-20,11745.974609,11999.917969,11681.480469,11916.334961,11916.334961,30915821592
2020-10-21,11913.077148,13184.566406,11900.928711,12823.689453,12823.689453,43414712626
2020-10-22,12801.635742,13161.593750,12717.093750,12965.891602,12965.891602,34729759598
2020-10-23,12971.548828,13015.961914,12752.647461,12931.539063,12931.539063,28974975003
2020-10-24,12931.574219,13145.066406,12885.747070,13108.062500,13108.062500,24542317940
2020-10-25,13108.063477,13329.183594,12910.061523,13031.173828,13031.173828,24406920575
2020-10-26,13031.201172,13225.297852,12822.382813,13075.248047,13075.248047,29461458313
2020-10-27,13075.242188,13759.668945,13060.837891,13654.218750,13654.218750,33749878156
2020-10-28,13654.214844,13837.695313,12932.250977,13271.285156,13271.285156,35867318895
2020-10-29,13271.298828,13612.047852,12980.059570,13437.882813,13437.882813,56499499598
2020-10-30,13437.874023,13651.516602,13136.198242,13546.522461,13546.522461,30581485201
2020-10-31,13546.532227,14028.213867,13457.530273,13780.995117,13780.995117,30306464719
2020-11-01,13780.995117,13862.033203,13628.377930,13737.109375,13737.109375,24453857900
2020-11-02,13737.032227,13808.323242,13243.160156,13550.489258,13550.489258,30771455468
2020-11-03,13550.451172,13984.981445,13325.441406,13950.300781,13950.300781,29869951617
2020-11-04,13950.488281,14218.766602,13580.471680,14133.707031,14133.707031,35116364962
2020-11-05,14133.733398,15706.404297,14102.088867,15579.848633,15579.848633,40856321439
2020-11-06,15579.729492,15903.437500,15226.839844,15565.880859,15565.880859,39837841971
2020-11-07,15565.880859,15737.095703,14423.203125,14833.753906,14833.753906,35024953706
2020-11-08,14833.753906,15637.320313,14744.110352,15479.567383,15479.567383,26632075029
2020-11-09,15479.595703,15785.136719,14865.529297,15332.315430,15332.315430,34149115566
2020-11-10,15332.350586,15450.329102,15124.959961,15290.902344,15290.902344,25574938143
2020-11-11,15290.909180,15916.260742,15290.006836,15701.339844,15701.339844,29772374934
2020-11-12,15701.298828,16305.003906,15534.771484,16276.343750,16276.343750,34175758344
2020-11-13,16276.440430,16463.177734,15992.152344,16317.808594,16317.808594,31599492172
2020-11-14,16317.808594,16317.808594,15749.193359,16068.138672,16068.138672,27481710135
2020-11-15,16068.139648,16123.110352,15793.534180,15955.587891,15955.587891,23653867583
2020-11-16,15955.577148,16816.181641,15880.706055,16716.111328,16716.111328,31526766675
2020-11-17,16685.691406,17782.919922,16564.544922,17645.406250,17645.406250,39006849170
2020-11-18,17645.191406,18393.949219,17352.906250,17804.005859,17804.005859,49064800278
2020-11-19,17803.861328,18119.546875,17382.554688,17817.089844,17817.089844,36985055355
2020-11-20,17817.083984,18773.226563,17765.794922,18621.314453,18621.314453,36992873940
2020-11-21,18621.316406,18936.621094,18444.359375,18642.232422,18642.232422,39650210707
2020-11-22,18642.232422,18688.968750,17671.384766,18370.001953,18370.001953,41280434226
2020-11-23,18370.017578,18711.425781,18000.796875,18364.121094,18364.121094,42741112308
2020-11-24,18365.015625,19348.271484,18128.656250,19107.464844,19107.464844,51469565009
2020-11-25,19104.410156,19390.964844,18581.146484,18732.121094,18732.121094,43710357371
2020-11-26,18729.839844,18866.285156,16351.035156,17150.623047,17150.623047,61396835737
2020-11-27,17153.914063,17445.023438,16526.423828,17108.402344,17108.402344,38886494645
2020-11-28,17112.933594,17853.939453,16910.652344,17717.414063,17717.414063,32601040734
2020-11-29,17719.634766,18283.628906,17559.117188,18177.484375,18177.484375,31133957704
2020-11-30,18178.322266,19749.263672,18178.322266,19625.835938,19625.835938,47728480399
2020-12-01,19633.769531,19845.974609,18321.921875,18802.998047,18802.998047,49633658712
2020-12-02,18801.744141,19308.330078,18347.718750,19201.091797,19201.091797,37387697139
2020-12-03,19205.925781,19566.191406,18925.785156,19445.398438,19445.398438,31930317405
2020-12-04,19446.966797,19511.404297,18697.193359,18699.765625,18699.765625,33872388058
2020-12-05,18698.384766,19160.449219,18590.193359,19154.230469,19154.230469,27242455064
2020-12-06,19154.179688,19390.500000,18897.894531,19345.121094,19345.121094,25293775714
2020-12-07,19343.128906,19411.828125,18931.142578,19191.630859,19191.630859,26896357742
2020-12-08,19191.529297,19283.478516,18269.945313,18321.144531,18321.144531,31692288756
2020-12-09,18320.884766,18626.292969,17935.546875,18553.916016,18553.916016,34420373071
2020-12-10,18553.298828,18553.298828,17957.064453,18264.992188,18264.992188,25547132265
2020-12-11,18263.929688,18268.453125,17619.533203,18058.904297,18058.904297,27919640985
2020-12-12,18051.320313,18919.550781,18046.041016,18803.656250,18803.656250,21752580802
2020-12-13,18806.765625,19381.535156,18734.332031,19142.382813,19142.382813,25450468637
2020-12-14,19144.492188,19305.099609,19012.708984,19246.644531,19246.644531,22473997681
2020-12-15,19246.919922,19525.007813,19079.841797,19417.076172,19417.076172,26741982541
2020-12-16,19418.818359,21458.908203,19298.316406,21310.597656,21310.597656,44409011479
2020-12-17,21308.351563,23642.660156,21234.675781,22805.162109,22805.162109,71378606374
2020-12-18,22806.796875,23238.601563,22399.812500,23137.960938,23137.960938,40387896275
2020-12-19,23132.865234,24085.855469,22826.472656,23869.832031,23869.832031,38487546580
2020-12-20,23861.765625,24209.660156,23147.710938,23477.294922,23477.294922,37844228422
2020-12-21,23474.455078,24059.982422,22159.367188,22803.082031,22803.082031,45852713981
2020-12-22,22794.039063,23789.902344,22430.605469,23783.029297,23783.029297,44171632681
2020-12-23,23781.974609,24024.490234,22802.646484,23241.345703,23241.345703,51146161904
2020-12-24,23240.203125,23768.337891,22777.597656,23735.949219,23735.949219,41080759713
2020-12-25,23733.570313,24710.101563,23463.673828,24664.791016,24664.791016,42068395846
2020-12-26,24677.015625,26718.070313,24522.689453,26437.037109,26437.037109,48332647295
2020-12-27,26439.373047,28288.839844,25922.769531,26272.294922,26272.294922,66479895605
2020-12-28,26280.822266,27389.111328,26207.640625,27084.808594,27084.808594,49056742893
2020-12-29,27081.810547,27370.720703,25987.298828,27362.437500,27362.437500,45265946774
2020-12-30,27360.089844,28937.740234,27360.089844,28840.953125,28840.953125,51287442704
2020-12-31,28841.574219,29244.876953,28201.992188,29001.720703,29001.720703,46754964848
2021-01-01,28994.009766,29600.626953,28803.585938,29374.152344,29374.152344,40730301359
2021-01-02,29376.455078,33155.117188,29091.181641,32127.267578,32127.267578,67865420765
2021-01-03,32129.408203,34608.558594,32052.316406,32782.023438,32782.023438,78665235202
2021-01-04,32810.949219,33440.218750,28722.755859,31971.914063,31971.914063,81163475344
2021-01-05,31977.041016,34437.589844,30221.187500,33992.429688,33992.429688,67547324782
2021-01-06,34013.613281,36879.699219,33514.035156,36824.363281,36824.363281,75289433811
2021-01-07,36833.875000,40180.367188,36491.191406,39371.042969,39371.042969,84762141031
2021-01-08,39381.765625,41946.738281,36838.636719,40797.609375,40797.609375,88107519480
2021-01-09,40788.640625,41436.351563,38980.875000,40254.546875,40254.546875,61984162837
2021-01-10,40254.218750,41420.191406,35984.628906,38356.441406,38356.441406,79980747690
2021-01-11,38346.531250,38346.531250,30549.599609,35566.656250,35566.656250,123320567399
2021-01-12,35516.359375,36568.527344,32697.976563,33922.960938,33922.960938,74773277909
2021-01-13,33915.121094,37599.960938,32584.667969,37316.359375,37316.359375,69364315979
2021-01-14,37325.109375,39966.406250,36868.562500,39187.328125,39187.328125,63615990033
2021-01-15,39156.707031,39577.710938,34659.589844,36825.367188,36825.367188,67760757881
2021-01-16,36821.648438,37864.367188,35633.554688,36178.140625,36178.140625,57706187875
2021-01-17,36163.648438,36722.351563,34069.320313,35791.277344,35791.277344,52359854336
2021-01-18,35792.238281,37299.285156,34883.843750,36630.074219,36630.074219,49511702429
2021-01-19,36642.234375,37755.890625,36069.804688,36069.804688,36069.804688,57244195486
2021-01-20,36050.113281,36378.328125,33570.476563,35547.750000,35547.750000,66834573161
2021-01-21,35549.398438,35552.679688,30250.750000,30825.699219,30825.699219,75643067688
2021-01-22,30817.625000,33811.851563,28953.373047,33005.761719,33005.761719,77207272511
2021-01-23,32985.757813,33360.976563,31493.160156,32067.642578,32067.642578,48354737975
2021-01-24,32064.376953,32944.007813,31106.685547,32289.378906,32289.378906,48643830599
2021-01-25,32285.798828,34802.742188,32087.787109,32366.392578,32366.392578,59897054838
2021-01-26,32358.613281,32794.550781,31030.265625,32569.849609,32569.849609,60255421470
2021-01-27,32564.029297,32564.029297,29367.138672,30432.546875,30432.546875,62576762015
2021-01-28,30441.041016,33858.312500,30023.207031,33466.097656,33466.097656,76517157706
2021-01-29,34318.671875,38406.261719,32064.814453,34316.386719,34316.386719,117894572511
2021-01-30,34295.933594,34834.707031,32940.187500,34269.523438,34269.523438,65141828798
2021-01-31,34270.878906,34288.332031,32270.175781,33114.359375,33114.359375,52754542671
2021-02-01,33114.578125,34638.214844,32384.228516,33537.175781,33537.175781,61400400660
2021-02-02,33533.199219,35896.882813,33489.218750,35510.289063,35510.289063,63088585433
2021-02-03,35510.820313,37480.187500,35443.984375,37472.089844,37472.089844,61166818159
2021-02-04,37475.105469,38592.175781,36317.500000,36926.066406,36926.066406,68838074392
2021-02-05,36931.546875,38225.906250,36658.761719,38144.308594,38144.308594,58598066402
2021-02-06,38138.386719,40846.546875,38138.386719,39266.011719,39266.011719,71326033653
2021-02-07,39250.191406,39621.835938,37446.152344,38903.441406,38903.441406,65500641143
2021-02-08,38886.828125,46203.929688,38076.324219,46196.464844,46196.464844,101467222687
2021-02-09,46184.992188,48003.722656,45166.960938,46481.105469,46481.105469,91809846886
2021-02-10,46469.761719,47145.566406,43881.152344,44918.183594,44918.183594,87301089896
2021-02-11,44898.710938,48463.468750,44187.761719,47909.332031,47909.332031,81388911810
2021-02-12,47877.035156,48745.734375,46424.976563,47504.851563,47504.851563,76555041196
2021-02-13,47491.203125,48047.746094,46392.281250,47105.515625,47105.515625,70250456155
2021-02-14,47114.507813,49487.640625,47114.507813,48717.289063,48717.289063,71248675228
2021-02-15,48696.535156,48875.570313,46347.476563,47945.058594,47945.058594,77069903166
2021-02-16,47944.457031,50341.101563,47201.304688,49199.871094,49199.871094,77049582886
2021-02-17,49207.277344,52533.914063,49072.378906,52149.007813,52149.007813,80820545404
2021-02-18,52140.972656,52474.105469,51015.765625,51679.796875,51679.796875,52054723579
2021-02-19,51675.980469,56113.652344,50937.277344,55888.132813,55888.132813,63495496918
2021-02-20,55887.335938,57505.226563,54626.558594,56099.519531,56099.519531,68145460026
2021-02-21,56068.566406,58330.570313,55672.609375,57539.945313,57539.945313,51897585191
2021-02-22,57532.738281,57533.390625,48967.566406,54207.320313,54207.320313,92052420332
2021-02-23,54204.929688,54204.929688,45290.589844,48824.425781,48824.425781,106102492824
2021-02-24,48835.085938,51290.136719,47213.500000,49705.332031,49705.332031,63695521388
2021-02-25,49709.082031,51948.968750,47093.851563,47093.851563,47093.851563,54506565949
2021-02-26,47180.464844,48370.785156,44454.843750,46339.761719,46339.761719,350967941479
2021-02-27,46344.773438,48253.269531,45269.027344,46188.453125,46188.453125,45910946382
2021-02-28,46194.015625,46716.429688,43241.617188,45137.769531,45137.769531,53443887451
2021-03-01,45159.503906,49784.015625,45115.093750,49631.242188,49631.242188,53891300112
2021-03-02,49612.105469,50127.511719,47228.843750,48378.988281,48378.988281,47530897720
2021-03-03,48415.816406,52535.136719,48274.320313,50538.242188,50538.242188,53220811975
2021-03-04,50522.304688,51735.089844,47656.929688,48561.167969,48561.167969,52343816680
2021-03-05,48527.031250,49396.429688,46542.515625,48927.304688,48927.304688,48625928883
2021-03-06,48899.230469,49147.218750,47257.527344,48912.382813,48912.382813,34363564661
2021-03-07,48918.679688,51384.367188,48918.679688,51206.691406,51206.691406,43137459378
2021-03-08,51174.117188,52314.070313,49506.054688,52246.523438,52246.523438,48597428048
2021-03-09,52272.968750,54824.117188,51981.832031,54824.117188,54824.117188,50912227385
2021-03-10,54824.011719,57258.253906,53290.890625,56008.550781,56008.550781,57295577614
2021-03-11,55963.179688,58091.062500,54484.593750,57805.121094,57805.121094,56772343595
2021-03-12,57821.218750,57996.621094,55376.648438,57332.089844,57332.089844,55689944702
2021-03-13,57343.371094,61683.863281,56217.972656,61243.085938,61243.085938,60669829814
2021-03-14,61221.132813,61597.917969,59302.316406,59302.316406,59302.316406,43901225564
2021-03-15,59267.429688,60540.992188,55393.164063,55907.199219,55907.199219,66419369890
2021-03-16,55840.785156,56833.179688,53555.027344,56804.902344,56804.902344,59749798599
2021-03-17,56825.828125,58969.816406,54528.628906,58870.894531,58870.894531,60258313191
2021-03-18,58893.078125,60116.250000,54253.578125,57858.921875,57858.921875,55746041000
2021-03-19,57850.441406,59498.375000,56643.703125,58346.652344,58346.652344,49063873786
2021-03-20,58332.261719,60031.285156,58213.296875,58313.644531,58313.644531,50361731222
2021-03-21,58309.914063,58767.898438,56005.617188,57523.421875,57523.421875,51943414539
2021-03-22,57517.890625,58471.480469,54288.156250,54529.144531,54529.144531,56521454974
2021-03-23,54511.660156,55985.441406,53470.695313,54738.945313,54738.945313,56435023914
2021-03-24,54710.488281,57262.382813,52514.332031,52774.265625,52774.265625,70567223787
2021-03-25,52726.746094,53392.386719,50856.570313,51704.160156,51704.160156,67999812841
2021-03-26,51683.011719,55137.312500,51579.855469,55137.312500,55137.312500,56652197978
2021-03-27,55137.566406,56568.214844,54242.910156,55973.511719,55973.511719,47266542233
2021-03-28,55974.941406,56610.312500,55071.113281,55950.746094,55950.746094,47686580918
2021-03-29,55947.898438,58342.097656,55139.339844,57750.199219,57750.199219,57625587027
2021-03-30,57750.132813,59447.222656,57251.550781,58917.691406,58917.691406,54414116432
2021-03-31,58930.277344,59930.027344,57726.417969,58918.832031,58918.832031,65520826225
2021-04-01,58926.562500,59586.070313,58505.277344,59095.808594,59095.808594,61669163792
2021-04-02,59098.878906,60267.187500,58869.281250,59384.312500,59384.312500,58727860620
2021-04-03,59397.410156,60110.269531,57603.890625,57603.890625,57603.890625,59641344484
2021-04-04,57604.839844,58913.746094,57168.675781,58758.554688,58758.554688,50749662970
2021-04-05,58760.875000,59891.296875,57694.824219,59057.878906,59057.878906,60706272115
2021-04-06,59171.933594,59479.578125,57646.808594,58192.359375,58192.359375,66058027988
2021-04-07,58186.507813,58731.144531,55604.023438,56048.937500,56048.937500,75645303584
2021-04-08,56099.914063,58338.738281,55879.085938,58323.953125,58323.953125,53053855641
2021-04-09,58326.562500,58937.046875,57807.863281,58245.003906,58245.003906,46655208546
2021-04-10,58253.777344,61276.664063,58038.707031,59793.234375,59793.234375,58238470525
2021-04-11,59846.230469,60790.554688,59289.796875,60204.964844,60204.964844,46280252580
2021-04-12,60175.945313,61253.035156,59589.875000,59893.453125,59893.453125,51828688519
2021-04-13,59890.019531,63742.285156,59869.957031,63503.457031,63503.457031,69983454362
2021-04-14,63523.753906,64863.097656,61554.796875,63109.695313,63109.695313,77451779687
2021-04-15,63075.195313,63821.671875,62208.964844,63314.011719,63314.011719,60954381579
2021-04-16,63258.503906,63594.722656,60222.531250,61572.789063,61572.789063,84293007468
2021-04-17,61529.921875,62572.175781,60361.351563,60683.820313,60683.820313,66138759198
2021-04-18,60701.886719,61057.457031,52829.535156,56216.183594,56216.183594,97468872758
2021-04-19,56191.585938,57520.054688,54368.593750,55724.265625,55724.265625,65344865159
2021-04-20,55681.792969,57062.148438,53448.046875,56473.031250,56473.031250,67849323955
2021-04-21,56471.128906,56757.972656,53695.468750,53906.089844,53906.089844,54926612466
2021-04-22,53857.105469,55410.230469,50583.812500,51762.273438,51762.273438,74798630778
2021-04-23,51739.808594,52120.792969,47714.664063,51093.652344,51093.652344,86668667320
2021-04-24,51143.226563,51167.562500,48805.285156,50050.867188,50050.867188,49014494781
2021-04-25,50052.832031,50506.019531,47159.484375,49004.253906,49004.253906,46117114240
2021-04-26,49077.792969,54288.003906,48852.796875,54021.753906,54021.753906,58284039825
2021-04-27,54030.304688,55416.964844,53319.187500,55033.117188,55033.117188,49448222757
2021-04-28,55036.636719,56227.207031,53887.917969,54824.703125,54824.703125,48000572955
2021-04-29,54858.089844,55115.843750,52418.027344,53555.109375,53555.109375,46088929780
2021-04-30,53568.664063,57900.718750,53129.601563,57750.175781,57750.175781,52395931985
2021-05-01,57714.664063,58448.339844,57052.273438,57828.050781,57828.050781,42836427360
2021-05-02,57825.863281,57902.593750,56141.906250,56631.078125,56631.078125,38177405335
2021-05-03,56620.273438,58973.308594,56590.871094,57200.292969,57200.292969,51713139031
2021-05-04,57214.179688,57214.179688,53191.425781,53333.539063,53333.539063,68564706967
2021-05-05,53252.164063,57911.363281,52969.054688,57424.007813,57424.007813,69241316747
2021-05-06,57441.308594,58363.316406,55382.507813,56396.515625,56396.515625,69523285106
2021-05-07,56413.953125,58606.632813,55321.847656,57356.402344,57356.402344,68434023376
2021-05-08,57352.765625,59464.613281,56975.210938,58803.777344,58803.777344,65382980634
2021-05-09,58877.390625,59210.882813,56482.003906,58232.316406,58232.316406,65906690347
2021-05-10,58250.871094,59519.355469,54071.457031,55859.796875,55859.796875,71776546298
2021-05-11,55847.242188,56872.542969,54608.652344,56704.574219,56704.574219,61308396325
2021-05-12,56714.531250,57939.363281,49150.535156,49150.535156,49150.535156,75215403907
2021-05-13,49735.433594,51330.843750,46980.019531,49716.191406,49716.191406,96721152926
2021-05-14,49682.980469,51438.117188,48868.578125,49880.535156,49880.535156,55737497453
2021-05-15,49855.496094,50639.664063,46664.140625,46760.187500,46760.187500,59161047474
2021-05-16,46716.636719,49720.042969,43963.351563,46456.058594,46456.058594,64047871555
2021-05-17,46415.898438,46623.558594,42207.289063,43537.511719,43537.511719,74903638450
2021-05-18,43488.058594,45812.457031,42367.832031,42909.402344,42909.402344,56187365084
2021-05-19,42944.976563,43546.117188,30681.496094,37002.441406,37002.441406,126358098747
2021-05-20,36753.667969,42462.984375,35050.617188,40782.738281,40782.738281,88281943359
2021-05-21,40596.949219,42172.171875,33616.453125,37304.691406,37304.691406,82051616861
2021-05-22,37371.031250,38831.054688,35383.683594,37536.632813,37536.632813,57377273240
2021-05-23,37531.449219,38289.218750,31227.339844,34770.582031,34770.582031,78469274361
2021-05-24,34700.363281,39835.140625,34551.082031,38705.980469,38705.980469,67359584098
2021-05-25,38795.781250,39776.351563,36581.429688,38402.222656,38402.222656,56211915803
2021-05-26,38392.625000,40782.078125,37905.835938,39294.199219,39294.199219,51346735160
2021-05-27,39316.890625,40379.617188,37247.902344,38436.968750,38436.968750,43210968721
2021-05-28,38507.082031,38856.968750,34779.039063,35697.605469,35697.605469,55200191952
2021-05-29,35684.156250,37234.500000,33693.929688,34616.066406,34616.066406,45231013335
2021-05-30,34607.406250,36400.667969,33520.738281,35678.128906,35678.128906,31646080921
2021-05-31,35658.593750,37468.250000,34241.945313,37332.855469,37332.855469,39009847639
2021-06-01,37293.792969,37896.734375,35787.085938,36684.925781,36684.925781,34639423297
2021-06-02,36699.921875,38231.339844,35966.308594,37575.179688,37575.179688,33070867190
2021-06-03,37599.410156,39478.953125,37243.972656,39208.765625,39208.765625,35460750427
2021-06-04,39242.484375,39242.484375,35717.722656,36894.406250,36894.406250,41831090187
2021-06-05,36880.156250,37917.714844,34900.414063,35551.957031,35551.957031,35959473399
2021-06-06,35538.609375,36436.421875,35304.578125,35862.378906,35862.378906,28913440585
2021-06-07,35835.265625,36790.570313,33480.640625,33560.707031,33560.707031,33683936663
2021-06-08,33589.519531,34017.386719,31114.443359,33472.632813,33472.632813,49902050442
2021-06-09,33416.976563,37537.371094,32475.865234,37345.121094,37345.121094,53972919008
2021-06-10,37389.515625,38334.324219,35847.593750,36702.597656,36702.597656,43576032854
2021-06-11,36697.031250,37608.695313,36044.449219,37334.398438,37334.398438,38699736985
2021-06-12,37340.144531,37408.925781,34728.191406,35552.515625,35552.515625,37924228550
2021-06-13,35555.789063,39322.781250,34864.109375,39097.859375,39097.859375,40669112838
2021-06-14,39016.968750,40978.363281,38757.285156,40218.476563,40218.476563,43148914673
2021-06-15,40427.167969,41295.269531,39609.468750,40406.269531,40406.269531,46420149185
2021-06-16,40168.691406,40516.777344,38176.035156,38347.062500,38347.062500,39211635100
2021-06-17,38341.421875,39513.671875,37439.675781,38053.503906,38053.503906,37096670047
2021-06-18,38099.476563,38187.261719,35255.855469,35787.246094,35787.246094,36200887275
2021-06-19,35854.527344,36457.796875,34933.062500,35615.871094,35615.871094,31207279719
2021-06-20,35563.140625,36059.484375,33432.074219,35698.296875,35698.296875,36664034054
2021-06-21,35641.144531,35721.640625,31295.935547,31676.693359,31676.693359,52809038594
2021-06-22,31622.376953,33292.453125,28893.621094,32505.660156,32505.660156,58964353058
2021-06-23,32515.714844,34753.410156,31772.632813,33723.027344,33723.027344,46317108925
2021-06-24,33682.800781,35228.851563,32385.214844,34662.437500,34662.437500,33123368116
2021-06-25,34659.105469,35487.246094,31350.884766,31637.779297,31637.779297,40230904226
2021-06-26,31594.664063,32637.587891,30184.501953,32186.277344,32186.277344,38585385521
2021-06-27,32287.523438,34656.128906,32071.757813,34649.644531,34649.644531,35511640894
2021-06-28,34679.121094,35219.890625,33902.074219,34434.335938,34434.335938,33892523752
2021-06-29,34475.558594,36542.109375,34252.484375,35867.777344,35867.777344,37901460044
2021-06-30,35908.386719,36074.757813,34086.152344,35040.835938,35040.835938,34059036099
2021-07-01,35035.984375,35035.984375,32883.781250,33572.117188,33572.117188,37838957079
2021-07-02,33549.601563,33939.589844,32770.679688,33897.046875,33897.046875,38728974942
2021-07-03,33854.421875,34909.261719,33402.695313,34668.546875,34668.546875,24383958643
2021-07-04,34665.566406,35937.566406,34396.476563,35287.781250,35287.781250,24924307911
2021-07-05,35284.343750,35284.343750,33213.660156,33746.003906,33746.003906,26721554282
2021-07-06,33723.507813,35038.535156,33599.917969,34235.195313,34235.195313,26501259870
2021-07-07,34225.679688,34997.664063,33839.289063,33855.328125,33855.328125,24796027477
2021-07-08,33889.605469,33907.906250,32133.183594,32877.371094,32877.371094,29910396946
2021-07-09,32861.671875,34042.292969,32318.880859,33798.011719,33798.011719,27436021028
2021-07-10,33811.242188,34209.070313,33116.011719,33520.519531,33520.519531,22971873468
2021-07-11,33509.078125,34584.703125,33346.738281,34240.187500,34240.187500,20108729370
2021-07-12,34254.015625,34592.156250,32697.308594,33155.847656,33155.847656,24321499537
2021-07-13,33125.468750,33327.101563,32261.419922,32702.025391,32702.025391,19120856669
2021-07-14,32723.845703,33061.398438,31639.125000,32822.347656,32822.347656,21376531210
2021-07-15,32827.875000,33159.640625,31175.708984,31780.730469,31780.730469,21300524237
2021-07-16,31841.550781,32218.406250,31100.673828,31421.539063,31421.539063,23699476918
2021-07-17,31397.308594,31935.945313,31223.990234,31533.068359,31533.068359,18895018942
2021-07-18,31533.884766,32398.996094,31215.492188,31796.810547,31796.810547,18787986667
2021-07-19,31800.011719,31885.859375,30563.734375,30817.832031,30817.832031,20434789545
2021-07-20,30838.285156,31006.187500,29360.955078,29807.347656,29807.347656,23148267245
2021-07-21,29796.285156,32752.326172,29526.183594,32110.693359,32110.693359,28203024559
2021-07-22,32138.873047,32576.400391,31745.298828,32313.105469,32313.105469,19555230518
2021-07-23,32305.958984,33581.550781,32057.892578,33581.550781,33581.550781,22552046192
2021-07-24,33593.730469,34490.390625,33424.859375,34292.445313,34292.445313,21664706865
2021-07-25,34290.292969,35364.925781,33881.835938,35350.187500,35350.187500,20856685287
2021-07-26,35384.031250,40499.675781,35287.312500,37337.535156,37337.535156,51022126212
2021-07-27,37276.035156,39406.941406,36441.726563,39406.941406,39406.941406,35097370560
2021-07-28,39503.187500,40816.070313,38862.437500,39995.906250,39995.906250,38702404695
2021-07-29,39995.453125,40593.070313,39352.058594,40008.421875,40008.421875,27167146027
2021-07-30,40027.484375,42235.546875,38397.355469,42235.546875,42235.546875,33072782960
2021-07-31,42196.304688,42231.449219,41110.832031,41626.195313,41626.195313,25802845343
2021-08-01,41460.843750,42541.679688,39540.941406,39974.894531,39974.894531,26688438115
2021-08-02,39907.261719,40419.179688,38746.347656,39201.945313,39201.945313,25595265436
2021-08-03,39178.402344,39750.031250,37782.050781,38152.980469,38152.980469,26189830450
2021-08-04,38213.332031,39952.296875,37589.164063,39747.503906,39747.503906,25372562724
2021-08-05,39744.515625,41341.933594,37458.003906,40869.554688,40869.554688,35185031017
2021-08-06,40865.867188,43271.660156,39932.179688,42816.500000,42816.500000,38226483046
2021-08-07,42832.796875,44689.859375,42618.566406,44555.800781,44555.800781,40030862141
2021-08-08,44574.437500,45282.351563,43331.910156,43798.117188,43798.117188,36302664750
2021-08-09,43791.925781,46456.832031,42848.687500,46365.402344,46365.402344,38734079049
2021-08-10,46280.847656,46637.988281,44705.554688,45585.031250,45585.031250,33546019517
2021-08-11,45599.703125,46735.632813,45351.710938,45593.636719,45593.636719,34319709073
2021-08-12,45576.878906,46228.910156,43861.445313,44428.289063,44428.289063,33723620826
2021-08-13,44439.691406,47831.976563,44282.417969,47793.320313,47793.320313,31744259539
2021-08-14,47810.687500,48098.683594,46177.632813,47096.945313,47096.945313,31211354442
2021-08-15,47096.667969,47357.105469,45579.589844,47047.003906,47047.003906,30988958446
2021-08-16,47019.960938,47998.097656,45700.320313,46004.484375,46004.484375,32776876610
2021-08-17,45936.457031,47139.570313,44512.417969,44695.359375,44695.359375,33451362600
2021-08-18,44686.750000,45952.062500,44364.027344,44801.187500,44801.187500,32194123075
2021-08-19,44741.882813,46970.761719,43998.316406,46717.578125,46717.578125,37204312299
2021-08-20,46723.121094,49342.152344,46650.707031,49339.175781,49339.175781,34706867452
2021-08-21,49327.074219,49717.019531,48312.199219,48905.492188,48905.492188,40585205312
2021-08-22,48869.105469,49471.609375,48199.941406,49321.652344,49321.652344,25370975378
2021-08-23,49291.675781,50482.078125,49074.605469,49546.148438,49546.148438,34305053719
2021-08-24,49562.347656,49878.769531,47687.117188,47706.117188,47706.117188,35361168834
2021-08-25,47727.257813,49202.878906,47163.613281,48960.789063,48960.789063,32646349931
2021-08-26,49002.640625,49347.582031,46405.781250,46942.218750,46942.218750,32666549568
2021-08-27,46894.554688,49112.785156,46394.281250,49058.667969,49058.667969,34511076995
2021-08-28,49072.585938,49283.503906,48499.238281,48902.402344,48902.402344,28568103401
2021-08-29,48911.250000,49644.113281,47925.855469,48829.832031,48829.832031,25889650240
2021-08-30,48834.851563,48925.605469,46950.273438,47054.984375,47054.984375,31847007016
2021-08-31,47024.339844,48189.550781,46750.093750,47166.687500,47166.687500,34730363427
2021-09-01,47099.773438,49111.089844,46562.437500,48847.027344,48847.027344,39139399125
2021-09-02,48807.847656,50343.421875,48652.320313,49327.722656,49327.722656,39508070319
2021-09-03,49288.250000,50982.273438,48386.085938,50025.375000,50025.375000,43206179619
2021-09-04,50009.324219,50545.582031,49548.781250,49944.625000,49944.625000,37471327794
2021-09-05,49937.859375,51868.679688,49538.597656,51753.410156,51753.410156,30322676319
2021-09-06,51769.003906,52700.941406,51053.679688,52633.535156,52633.535156,38884105426
2021-09-07,52660.480469,52853.765625,43285.207031,46811.128906,46811.128906,65210059683
2021-09-08,46827.761719,47334.054688,44561.394531,46091.390625,46091.390625,49007762488
2021-09-09,45774.742188,47261.949219,45669.738281,46391.421875,46391.421875,38672657013
2021-09-10,46396.664063,47031.742188,44344.484375,44883.910156,44883.910156,39154666597
2021-09-11,44869.839844,45969.292969,44818.265625,45201.457031,45201.457031,34499835245
2021-09-12,45206.628906,46364.878906,44790.460938,46063.269531,46063.269531,27881980161
2021-09-13,46057.214844,46598.679688,43591.320313,44963.074219,44963.074219,40969943253
2021-09-14,44960.050781,47218.125000,44752.332031,47092.492188,47092.492188,38652152880
2021-09-15,47098.000000,48450.468750,46773.328125,48176.347656,48176.347656,30484496466
2021-09-16,48158.906250,48486.828125,47079.558594,47783.359375,47783.359375,31764293754
2021-09-17,47771.003906,48160.921875,46832.523438,47267.519531,47267.519531,28727713711
2021-09-18,47273.527344,48791.781250,47087.285156,48278.363281,48278.363281,28575630451
2021-09-19,48268.855469,48328.367188,46919.804688,47260.218750,47260.218750,26967722648
2021-09-20,47261.406250,47328.199219,42598.914063,42843.800781,42843.800781,43909845642
2021-09-21,43012.234375,43607.609375,39787.609375,40693.675781,40693.675781,48701090088
2021-09-22,40677.953125,43978.621094,40625.632813,43574.507813,43574.507813,38139709246
2021-09-23,43560.296875,44942.175781,43109.339844,44895.097656,44895.097656,34244064430
2021-09-24,44894.300781,45080.492188,40936.558594,42839.750000,42839.750000,42839345714
2021-09-25,42840.890625,42996.257813,41759.921875,42716.593750,42716.593750,31604717236
2021-09-26,42721.628906,43919.300781,40848.460938,43208.539063,43208.539063,30661222077
2021-09-27,43234.183594,44313.246094,42190.632813,42235.730469,42235.730469,30980029059
2021-09-28,42200.898438,42775.144531,40931.664063,41034.542969,41034.542969,30214940550
2021-09-29,41064.984375,42545.257813,40829.667969,41564.363281,41564.363281,30602359905
2021-09-30,41551.269531,44092.601563,41444.582031,43790.894531,43790.894531,31141681925
2021-10-01,43816.742188,48436.011719,43320.023438,48116.941406,48116.941406,42850641582
2021-10-02,48137.468750,48282.062500,47465.496094,47711.488281,47711.488281,30614346492
2021-10-03,47680.027344,49130.691406,47157.289063,48199.953125,48199.953125,26638115879
2021-10-04,48208.906250,49456.777344,47045.003906,49112.902344,49112.902344,33383173002
2021-10-05,49174.960938,51839.984375,49072.839844,51514.812500,51514.812500,35873904236
2021-10-06,51486.664063,55568.464844,50488.191406,55361.449219,55361.449219,49034730168
2021-10-07,55338.625000,55338.625000,53525.468750,53805.984375,53805.984375,36807860413
2021-10-08,53802.144531,55922.980469,53688.054688,53967.847656,53967.847656,34800873924
2021-10-09,53929.781250,55397.945313,53735.144531,54968.222656,54968.222656,32491211414
2021-10-10,54952.820313,56401.304688,54264.257813,54771.578125,54771.578125,39527792364
2021-10-11,54734.125000,57793.039063,54519.765625,57484.789063,57484.789063,42637331698
2021-10-12,57526.832031,57627.878906,54477.972656,56041.058594,56041.058594,41083758949
2021-10-13,56038.257813,57688.660156,54370.972656,57401.097656,57401.097656,41684252783
2021-10-14,57372.832031,58478.734375,56957.074219,57321.523438,57321.523438,36615791366
2021-10-15,57345.902344,62757.128906,56868.144531,61593.949219,61593.949219,51780081801
2021-10-16,61609.527344,62274.476563,60206.121094,60892.179688,60892.179688,34250964237
2021-10-17,60887.652344,61645.523438,59164.468750,61553.617188,61553.617188,29032367511
2021-10-18,61548.804688,62614.660156,60012.757813,62026.078125,62026.078125,38055562075
2021-10-19,62043.164063,64434.535156,61622.933594,64261.992188,64261.992188,40471196346
2021-10-20,64284.585938,66930.390625,63610.675781,65992.835938,65992.835938,40788955582
2021-10-21,66002.234375,66600.546875,62117.410156,62210.171875,62210.171875,45908121370
2021-10-22,62237.890625,63715.023438,60122.796875,60692.265625,60692.265625,38434082775
2021-10-23,60694.628906,61743.878906,59826.523438,61393.617188,61393.617188,26882546034
2021-10-24,61368.343750,61505.804688,59643.343750,60930.835938,60930.835938,27316183882
2021-10-25,60893.925781,63729.324219,60691.800781,63039.824219,63039.824219,31064911614
2021-10-26,63032.761719,63229.027344,59991.160156,60363.792969,60363.792969,34878965587
2021-10-27,60352.000000,61435.183594,58208.187500,58482.386719,58482.386719,43657076893
2021-10-28,58470.730469,62128.632813,58206.917969,60622.136719,60622.136719,45257083247
2021-10-29,60624.871094,62927.609375,60329.964844,62227.964844,62227.964844,36856881767
2021-10-30,62239.363281,62330.144531,60918.386719,61888.832031,61888.832031,32157938616
2021-10-31,61850.488281,62406.171875,60074.328125,61318.957031,61318.957031,32241199927
2021-11-01,61320.449219,62419.003906,59695.183594,61004.406250,61004.406250,36150572843
2021-11-02,60963.253906,64242.792969,60673.054688,63226.402344,63226.402344,37746665647
2021-11-03,63254.335938,63516.937500,61184.238281,62970.046875,62970.046875,36124731509
2021-11-04,62941.804688,63123.289063,60799.664063,61452.230469,61452.230469,32615846901
2021-11-05,61460.078125,62541.468750,60844.609375,61125.675781,61125.675781,30605102446
2021-11-06,61068.875000,61590.683594,60163.781250,61527.480469,61527.480469,29094934221
2021-11-07,61554.921875,63326.988281,61432.488281,63326.988281,63326.988281,24726754302
2021-11-08,63344.066406,67673.742188,63344.066406,67566.828125,67566.828125,41125608330
2021-11-09,67549.734375,68530.335938,66382.062500,66971.828125,66971.828125,42357991721
2021-11-10,66953.335938,68789.625000,63208.113281,64995.230469,64995.230469,48730828378
2021-11-11,64978.890625,65579.015625,64180.488281,64949.960938,64949.960938,35880633236
2021-11-12,64863.980469,65460.816406,62333.914063,64155.941406,64155.941406,36084893887
2021-11-13,64158.121094,64915.675781,63303.734375,64469.527344,64469.527344,30474228777
2021-11-14,64455.371094,65495.179688,63647.808594,65466.839844,65466.839844,25122092191
2021-11-15,65521.289063,66281.570313,63548.144531,63557.871094,63557.871094,30558763548
2021-11-16,63721.195313,63721.195313,59016.335938,60161.246094,60161.246094,46844335592
2021-11-17,60139.621094,60823.609375,58515.410156,60368.011719,60368.011719,39178392930
2021-11-18,60360.136719,60948.500000,56550.792969,56942.136719,56942.136719,41388338699
2021-11-19,56896.128906,58351.113281,55705.179688,58119.578125,58119.578125,38702407772
2021-11-20,58115.082031,59859.878906,57469.726563,59697.195313,59697.195313,30624264863
2021-11-21,59730.507813,60004.425781,58618.929688,58730.476563,58730.476563,26123447605
2021-11-22,58706.847656,59266.359375,55679.839844,56289.289063,56289.289063,35036121783
2021-11-23,56304.554688,57875.515625,55632.761719,57569.074219,57569.074219,37485803899
2021-11-24,57565.851563,57803.066406,55964.222656,56280.425781,56280.425781,36635566789
2021-11-25,57165.417969,59367.968750,57146.683594,57274.679688,57274.679688,34284016248
2021-11-26,58960.285156,59183.480469,53569.765625,53569.765625,53569.765625,41810748221
2021-11-27,53736.429688,55329.257813,53668.355469,54815.078125,54815.078125,30560857714
2021-11-28,54813.023438,57393.843750,53576.734375,57248.457031,57248.457031,28116886357
2021-11-29,57291.906250,58872.878906,56792.527344,57806.566406,57806.566406,32370840356
2021-11-30,57830.113281,59113.402344,56057.281250,57005.425781,57005.425781,36708594618
2021-12-01,56907.964844,59041.683594,56553.082031,57229.828125,57229.828125,36858195307
2021-12-02,57217.371094,57349.234375,55895.132813,56477.816406,56477.816406,32379968686
2021-12-03,56509.164063,57482.167969,52496.585938,53598.246094,53598.246094,39789134215
2021-12-04,53727.878906,53904.679688,42874.617188,49200.703125,49200.703125,61385677469
2021-12-05,49201.519531,49768.148438,47857.496094,49368.847656,49368.847656,37198201161
2021-12-06,49413.480469,50929.519531,47281.035156,50582.625000,50582.625000,37707308001
2021-12-07,50581.828125,51934.781250,50175.808594,50700.085938,50700.085938,33676814852
2021-12-08,50667.648438,51171.375000,48765.988281,50504.796875,50504.796875,28479699446
2021-12-09,50450.082031,50797.164063,47358.351563,47672.121094,47672.121094,29603577251
2021-12-10,47642.144531,50015.253906,47023.699219,47243.304688,47243.304688,30966005122
2021-12-11,47264.632813,49458.210938,46942.347656,49362.507813,49362.507813,25775869261
2021-12-12,49354.855469,50724.867188,48725.851563,50098.335938,50098.335938,21939223599
2021-12-13,50114.742188,50205.000000,45894.847656,46737.480469,46737.480469,32166727776
2021-12-14,46709.824219,48431.398438,46424.496094,46612.632813,46612.632813,34638619079
2021-12-15,48379.753906,49473.957031,46671.964844,48896.722656,48896.722656,36541828520
2021-12-16,48900.464844,49425.574219,47529.878906,47665.425781,47665.425781,27268150947
2021-12-17,47653.730469,48004.894531,45618.214844,46202.144531,46202.144531,32902725329
2021-12-18,46219.253906,47313.828125,45598.441406,46848.777344,46848.777344,26098292690
2021-12-19,46853.867188,48089.664063,46502.953125,46707.015625,46707.015625,25154053861
2021-12-20,46707.062500,47401.718750,45579.808594,46880.277344,46880.277344,30961902129
2021-12-21,46886.078125,49300.917969,46698.773438,48936.613281,48936.613281,27055803928
2021-12-22,48937.097656,49544.796875,48450.941406,48628.511719,48628.511719,24447979559
2021-12-23,48626.343750,51332.339844,48065.835938,50784.539063,50784.539063,28223878108
2021-12-24,50806.050781,51814.027344,50514.496094,50822.195313,50822.195313,24367912228
2021-12-25,50854.917969,51176.597656,50236.707031,50429.859375,50429.859375,19030650914
2021-12-26,50428.691406,51196.378906,49623.105469,50809.515625,50809.515625,20964372926
2021-12-27,50802.609375,51956.328125,50499.468750,50640.417969,50640.417969,24324345758
2021-12-28,50679.859375,50679.859375,47414.210938,47588.855469,47588.855469,33430376883
2021-12-29,47623.871094,48119.742188,46201.496094,46444.710938,46444.710938,30049226299
2021-12-30,46490.605469,47879.964844,46060.312500,47178.125000,47178.125000,26686491018
2021-12-31,47169.371094,48472.527344,45819.953125,46306.445313,46306.445313,36974172400
2022-01-01,46311.746094,47827.312500,46288.484375,47686.812500,47686.812500,24582667004
2022-01-02,47680.925781,47881.406250,46856.937500,47345.218750,47345.218750,27951569547
2022-01-03,47343.542969,47510.726563,45835.964844,46458.117188,46458.117188,33071628362
2022-01-04,46458.851563,47406.546875,45752.464844,45897.574219,45897.574219,42494677905
2022-01-05,45899.359375,46929.046875,42798.222656,43569.003906,43569.003906,36851084859
2022-01-06,43565.511719,43748.718750,42645.539063,43160.929688,43160.929688,30208048289
2022-01-07,43153.570313,43153.570313,41077.445313,41557.902344,41557.902344,84196607520
2022-01-08,41561.464844,42228.941406,40672.277344,41733.941406,41733.941406,28066355845
2022-01-09,41734.726563,42663.949219,41338.160156,41911.601563,41911.601563,21294384372
2022-01-10,41910.230469,42199.484375,39796.570313,41821.261719,41821.261719,32104232331
2022-01-11,41819.507813,43001.156250,41407.753906,42735.855469,42735.855469,26327648900
2022-01-12,42742.179688,44135.367188,42528.988281,43949.101563,43949.101563,33499938689
2022-01-13,43946.742188,44278.421875,42447.042969,42591.570313,42591.570313,47691135082
2022-01-14,42598.871094,43346.687500,41982.617188,43099.699219,43099.699219,23577403399
2022-01-15,43101.898438,43724.671875,42669.035156,43177.398438,43177.398438,18371348298
2022-01-16,43172.039063,43436.808594,42691.023438,43113.878906,43113.878906,17902097845
2022-01-17,43118.121094,43179.390625,41680.320313,42250.550781,42250.550781,21690904261
2022-01-18,42250.074219,42534.402344,41392.214844,42375.632813,42375.632813,22417209227
2022-01-19,42374.039063,42478.304688,41242.914063,41744.328125,41744.328125,23091543258
2022-01-20,41744.027344,43413.023438,40672.824219,40680.417969,40680.417969,20382033940
2022-01-21,40699.605469,41060.527344,35791.425781,36457.316406,36457.316406,43011992031
2022-01-22,36471.589844,36688.812500,34349.250000,35030.250000,35030.250000,39714385405
2022-01-23,35047.359375,36433.312500,34784.968750,36276.804688,36276.804688,26017975951
2022-01-24,36275.734375,37247.519531,33184.058594,36654.328125,36654.328125,41856658597
2022-01-25,36654.804688,37444.570313,35779.429688,36954.003906,36954.003906,26428189594
2022-01-26,36950.515625,38825.410156,36374.906250,36852.121094,36852.121094,31324598034
2022-01-27,36841.878906,37148.324219,35629.281250,37138.234375,37138.234375,25041426629
2022-01-28,37128.445313,37952.878906,36211.109375,37784.332031,37784.332031,22238830523
2022-01-29,37780.714844,38576.261719,37406.472656,38138.179688,38138.179688,17194183075
2022-01-30,38151.917969,38266.339844,37437.710938,37917.601563,37917.601563,14643548444
2022-01-31,37920.281250,38647.261719,36733.574219,38483.125000,38483.125000,20734730465
2022-02-01,38481.765625,39115.132813,38113.664063,38743.273438,38743.273438,20288500328
2022-02-02,38743.714844,38834.617188,36832.730469,36952.984375,36952.984375,19155189416
2022-02-03,36944.804688,37154.601563,36375.539063,37154.601563,37154.601563,18591534769
2022-02-04,37149.265625,41527.785156,37093.628906,41500.875000,41500.875000,29412210792
2022-02-05,41501.480469,41847.164063,41038.097656,41441.164063,41441.164063,19652846215
2022-02-06,41441.121094,42500.785156,41244.906250,42412.433594,42412.433594,16142097334
2022-02-07,42406.781250,44401.863281,41748.156250,43840.285156,43840.285156,28641855926
2022-02-08,43854.652344,45293.867188,42807.835938,44118.445313,44118.445313,33079398868
2022-02-09,44096.703125,44727.800781,43232.968750,44338.796875,44338.796875,23245887300
2022-02-10,44347.800781,45661.171875,43402.808594,43565.113281,43565.113281,32142048537
2022-02-11,43571.128906,43810.832031,42114.539063,42407.937500,42407.937500,26954925781
2022-02-12,42412.300781,42992.550781,41852.574219,42244.468750,42244.468750,18152390304
2022-02-13,42236.566406,42693.054688,41950.941406,42197.515625,42197.515625,14741589015
2022-02-14,42157.398438,42775.777344,41681.957031,42586.917969,42586.917969,20827783012
2022-02-15,42586.464844,44667.218750,42491.035156,44575.203125,44575.203125,22721659051
2022-02-16,44578.277344,44578.277344,43456.691406,43961.859375,43961.859375,19792547657
2022-02-17,43937.070313,44132.972656,40249.371094,40538.011719,40538.011719,26246662813
2022-02-18,40552.132813,40929.152344,39637.617188,40030.976563,40030.976563,23310007704
2022-02-19,40026.023438,40418.878906,39713.058594,40122.156250,40122.156250,13736557863
2022-02-20,40118.101563,40119.890625,38112.812500,38431.378906,38431.378906,18340576452
2022-02-21,38423.210938,39394.437500,36950.476563,37075.281250,37075.281250,29280402798
2022-02-22,37068.769531,38359.855469,36488.933594,38286.027344,38286.027344,25493150450
2022-02-23,38285.281250,39122.394531,37201.816406,37296.570313,37296.570313,21849073843
2022-02-24,37278.566406,38968.839844,34459.218750,38332.609375,38332.609375,46383802093
2022-02-25,38333.746094,39630.324219,38111.343750,39214.218750,39214.218750,26545599159
2022-02-26,39213.082031,40005.347656,38702.535156,39105.148438,39105.148438,17467554129
2022-02-27,39098.699219,39778.941406,37268.976563,37709.785156,37709.785156,23450127612
2022-02-28,37706.000000,43760.457031,37518.214844,43193.234375,43193.234375,35690014104
2022-03-01,43194.503906,44793.601563,42952.585938,44354.636719,44354.636719,32479047645
2022-03-02,44357.617188,45077.578125,43432.851563,43924.117188,43924.117188,29183112630
2022-03-03,43925.195313,44021.578125,41914.750000,42451.789063,42451.789063,24967782593
2022-03-04,42458.140625,42479.613281,38805.847656,39137.605469,39137.605469,28516271427
2022-03-05,39148.449219,39566.335938,38777.035156,39400.585938,39400.585938,16975917450
2022-03-06,39404.199219,39640.175781,38211.648438,38419.984375,38419.984375,19745229902
2022-03-07,38429.304688,39430.226563,37260.203125,38062.039063,38062.039063,28546143503
2022-03-08,38059.902344,39304.441406,37957.386719,38737.269531,38737.269531,25776583476
2022-03-09,38742.816406,42465.671875,38706.093750,41982.925781,41982.925781,32284121034
2022-03-10,41974.070313,42004.726563,38832.941406,39437.460938,39437.460938,31078064711
2022-03-11,39439.968750,40081.679688,38347.433594,38794.972656,38794.972656,26364890465
2022-03-12,38794.464844,39308.597656,38772.535156,38904.011719,38904.011719,14616450657
2022-03-13,38884.726563,39209.351563,37728.144531,37849.664063,37849.664063,17300745310
2022-03-14,37846.316406,39742.500000,37680.734375,39666.753906,39666.753906,24322159070
2022-03-15,39664.250000,39794.628906,38310.210938,39338.785156,39338.785156,23934000868
2022-03-16,39335.570313,41465.453125,39022.347656,41143.929688,41143.929688,39616916192
2022-03-17,41140.843750,41287.535156,40662.871094,40951.378906,40951.378906,22009601093
2022-03-18,40944.839844,42195.746094,40302.398438,41801.156250,41801.156250,34421564942
2022-03-19,41794.648438,42316.554688,41602.667969,42190.652344,42190.652344,19664853187
2022-03-20,42191.406250,42241.164063,41004.757813,41247.824219,41247.824219,20127946682
2022-03-21,41246.132813,41454.410156,40668.042969,41077.996094,41077.996094,24615543271
2022-03-22,41074.105469,43124.707031,40948.281250,42358.808594,42358.808594,32004652376
2022-03-23,42364.378906,42893.507813,41877.507813,42892.957031,42892.957031,25242943069
2022-03-24,42886.652344,44131.855469,42726.164063,43960.933594,43960.933594,31042992291
2022-03-25,43958.675781,44982.519531,43711.871094,44395.964844,44395.964844,30379415552`;async function Og(){return Dc(Dg)}async function kg(){let e=await Og(),t=e.Date,n=e.Close,r=e.Volume;return{title:`Bitcoin historical data`,plot:{series:[{type:`line`,x:t,y:n,name:`Closing Price`},{type:`line`,x:t,y:r,name:`Volume`,yAxis:`volume`}],xAxis:{title:`Date`,ticks:`auto`},yAxes:[{title:`Price [USD]`,scale:[0,8e4],ticks:`auto`,grid:`auto`},{title:`Volume [USD]`,scale:[0,4e11],ticks:`auto`,id:`volume`,side:`right`}],legend:`in-top-left`}}}var Ag=`import type { Figure, DataCol } from "plotive";
import { getBcData } from "@/data/bitcoin";

export default async function (): Promise<Figure> {
    let data = await getBcData();
    let time = data["Date"] as DataCol;
    let price = data["Close"] as DataCol;
    let volume = data["Volume"] as DataCol;

    return {
        title: "Bitcoin historical data",
        plot: {
            series: [
                {
                    type: "line",
                    x: time,
                    y: price,
                    name: "Closing Price",
                },
                {
                    type: "line",
                    x: time,
                    y: volume,
                    name: "Volume",
                    yAxis: "volume",
                },
            ],
            xAxis: {
                title: "Date",
                ticks: "auto",
            },
            yAxes: [
                {
                    title: "Price [USD]",
                    scale: [0, 8e4],
                    ticks: "auto",
                    grid: "auto",
                },
                {
                    title: "Volume [USD]",
                    scale: [0, 4e11],
                    ticks: "auto",
                    id: "volume",
                    side: "right",
                },
            ],
            legend: "in-top-left",
        },
    };
}

`,jg=`use plotive::{data, des};

mod common;

fn main() {
    let btc_csv = common::example_res("BTC-USD.csv");
    let csv_data = std::fs::read_to_string(&btc_csv).unwrap();
    let data_source = data::csv::parse_str(&csv_data, Default::default()).unwrap();

    let price_series =
        des::series::Line::new(des::data_src_ref("Date"), des::data_src_ref("Close"))
            .with_name("Closing Price")
            .into();

    let volume_series =
        des::series::Line::new(des::data_src_ref("Date"), des::data_src_ref("Volume"))
            .with_name("Volume")
            .with_y_axis(des::axis::ref_id("volume"))
            .into();

    let date_axis = des::Axis::new().with_ticks(Default::default());
    // setting Y-ranges to have ticks at same level
    // this will line-up the grid lines
    let price_axis = des::Axis::new()
        .with_title("Price [USD]".into())
        .with_scale(des::axis::Range(Some(0.0), Some(8e4)).into())
        .with_ticks(Default::default())
        .with_grid(Default::default());
    let volume_axis = des::Axis::new()
        .with_title("Volume [USD]".into())
        .with_scale(des::axis::Range(Some(0.0), Some(4e11)).into())
        .with_ticks(Default::default())
        .with_id("volume")
        .with_opposite_side();
    let plot = des::Plot::new(vec![price_series, volume_series])
        .with_x_axis(date_axis)
        .with_y_axis(price_axis)
        .with_y_axis(volume_axis)
        .with_legend(des::plot::LegendPos::InTopLeft.into());
    let fig = des::Figure::new(plot.into()).with_title("Bitcoin historical data".into());

    common::process_figure(&fig, &data_source, None, "bitcoin");
}
`,Mg=`from os import path
import pandas as pd
import plotive as pv

csv_file = path.join(path.dirname(path.abspath(__file__)), "BTC-USD.csv")
df = pd.read_csv(csv_file, parse_dates=["Date"], index_col="Date")

fig = pv.Figure(
    title="Bitcoin historical data",
    plot=pv.Plot(
        series=[
            pv.series.Line(
                x="Date",
                y="Close",
                name="Closing Price",
            ),
            pv.series.Line(
                x="Date",
                y="Volume",
                name="Volume",
                y_axis="volume",
            ),
        ],
        x_axis=pv.Axis(
            title="Date",
            ticks="auto",
        ),
        y_axes=[
            pv.Axis(
                title="Price [USD]",
                scale=(0, 8e4),
                ticks="auto",
                grid="auto",
            ),
            pv.Axis(
                title="Volume [USD]",
                scale=(0, 4e11),
                ticks="auto",
                id="volume",
                side="right",
            ),
        ],
        legend="in-top-left",
    ),
)

import _common

_common.process_figure(fig, df, "bitcoin")
`,Ng=`Id,SepalLengthCm,SepalWidthCm,PetalLengthCm,PetalWidthCm,Species
1,5.1,3.5,1.4,0.2,Iris-setosa
2,4.9,3.0,1.4,0.2,Iris-setosa
3,4.7,3.2,1.3,0.2,Iris-setosa
4,4.6,3.1,1.5,0.2,Iris-setosa
5,5.0,3.6,1.4,0.2,Iris-setosa
6,5.4,3.9,1.7,0.4,Iris-setosa
7,4.6,3.4,1.4,0.3,Iris-setosa
8,5.0,3.4,1.5,0.2,Iris-setosa
9,4.4,2.9,1.4,0.2,Iris-setosa
10,4.9,3.1,1.5,0.1,Iris-setosa
11,5.4,3.7,1.5,0.2,Iris-setosa
12,4.8,3.4,1.6,0.2,Iris-setosa
13,4.8,3.0,1.4,0.1,Iris-setosa
14,4.3,3.0,1.1,0.1,Iris-setosa
15,5.8,4.0,1.2,0.2,Iris-setosa
16,5.7,4.4,1.5,0.4,Iris-setosa
17,5.4,3.9,1.3,0.4,Iris-setosa
18,5.1,3.5,1.4,0.3,Iris-setosa
19,5.7,3.8,1.7,0.3,Iris-setosa
20,5.1,3.8,1.5,0.3,Iris-setosa
21,5.4,3.4,1.7,0.2,Iris-setosa
22,5.1,3.7,1.5,0.4,Iris-setosa
23,4.6,3.6,1.0,0.2,Iris-setosa
24,5.1,3.3,1.7,0.5,Iris-setosa
25,4.8,3.4,1.9,0.2,Iris-setosa
26,5.0,3.0,1.6,0.2,Iris-setosa
27,5.0,3.4,1.6,0.4,Iris-setosa
28,5.2,3.5,1.5,0.2,Iris-setosa
29,5.2,3.4,1.4,0.2,Iris-setosa
30,4.7,3.2,1.6,0.2,Iris-setosa
31,4.8,3.1,1.6,0.2,Iris-setosa
32,5.4,3.4,1.5,0.4,Iris-setosa
33,5.2,4.1,1.5,0.1,Iris-setosa
34,5.5,4.2,1.4,0.2,Iris-setosa
35,4.9,3.1,1.5,0.1,Iris-setosa
36,5.0,3.2,1.2,0.2,Iris-setosa
37,5.5,3.5,1.3,0.2,Iris-setosa
38,4.9,3.1,1.5,0.1,Iris-setosa
39,4.4,3.0,1.3,0.2,Iris-setosa
40,5.1,3.4,1.5,0.2,Iris-setosa
41,5.0,3.5,1.3,0.3,Iris-setosa
42,4.5,2.3,1.3,0.3,Iris-setosa
43,4.4,3.2,1.3,0.2,Iris-setosa
44,5.0,3.5,1.6,0.6,Iris-setosa
45,5.1,3.8,1.9,0.4,Iris-setosa
46,4.8,3.0,1.4,0.3,Iris-setosa
47,5.1,3.8,1.6,0.2,Iris-setosa
48,4.6,3.2,1.4,0.2,Iris-setosa
49,5.3,3.7,1.5,0.2,Iris-setosa
50,5.0,3.3,1.4,0.2,Iris-setosa
51,7.0,3.2,4.7,1.4,Iris-versicolor
52,6.4,3.2,4.5,1.5,Iris-versicolor
53,6.9,3.1,4.9,1.5,Iris-versicolor
54,5.5,2.3,4.0,1.3,Iris-versicolor
55,6.5,2.8,4.6,1.5,Iris-versicolor
56,5.7,2.8,4.5,1.3,Iris-versicolor
57,6.3,3.3,4.7,1.6,Iris-versicolor
58,4.9,2.4,3.3,1.0,Iris-versicolor
59,6.6,2.9,4.6,1.3,Iris-versicolor
60,5.2,2.7,3.9,1.4,Iris-versicolor
61,5.0,2.0,3.5,1.0,Iris-versicolor
62,5.9,3.0,4.2,1.5,Iris-versicolor
63,6.0,2.2,4.0,1.0,Iris-versicolor
64,6.1,2.9,4.7,1.4,Iris-versicolor
65,5.6,2.9,3.6,1.3,Iris-versicolor
66,6.7,3.1,4.4,1.4,Iris-versicolor
67,5.6,3.0,4.5,1.5,Iris-versicolor
68,5.8,2.7,4.1,1.0,Iris-versicolor
69,6.2,2.2,4.5,1.5,Iris-versicolor
70,5.6,2.5,3.9,1.1,Iris-versicolor
71,5.9,3.2,4.8,1.8,Iris-versicolor
72,6.1,2.8,4.0,1.3,Iris-versicolor
73,6.3,2.5,4.9,1.5,Iris-versicolor
74,6.1,2.8,4.7,1.2,Iris-versicolor
75,6.4,2.9,4.3,1.3,Iris-versicolor
76,6.6,3.0,4.4,1.4,Iris-versicolor
77,6.8,2.8,4.8,1.4,Iris-versicolor
78,6.7,3.0,5.0,1.7,Iris-versicolor
79,6.0,2.9,4.5,1.5,Iris-versicolor
80,5.7,2.6,3.5,1.0,Iris-versicolor
81,5.5,2.4,3.8,1.1,Iris-versicolor
82,5.5,2.4,3.7,1.0,Iris-versicolor
83,5.8,2.7,3.9,1.2,Iris-versicolor
84,6.0,2.7,5.1,1.6,Iris-versicolor
85,5.4,3.0,4.5,1.5,Iris-versicolor
86,6.0,3.4,4.5,1.6,Iris-versicolor
87,6.7,3.1,4.7,1.5,Iris-versicolor
88,6.3,2.3,4.4,1.3,Iris-versicolor
89,5.6,3.0,4.1,1.3,Iris-versicolor
90,5.5,2.5,4.0,1.3,Iris-versicolor
91,5.5,2.6,4.4,1.2,Iris-versicolor
92,6.1,3.0,4.6,1.4,Iris-versicolor
93,5.8,2.6,4.0,1.2,Iris-versicolor
94,5.0,2.3,3.3,1.0,Iris-versicolor
95,5.6,2.7,4.2,1.3,Iris-versicolor
96,5.7,3.0,4.2,1.2,Iris-versicolor
97,5.7,2.9,4.2,1.3,Iris-versicolor
98,6.2,2.9,4.3,1.3,Iris-versicolor
99,5.1,2.5,3.0,1.1,Iris-versicolor
100,5.7,2.8,4.1,1.3,Iris-versicolor
101,6.3,3.3,6.0,2.5,Iris-virginica
102,5.8,2.7,5.1,1.9,Iris-virginica
103,7.1,3.0,5.9,2.1,Iris-virginica
104,6.3,2.9,5.6,1.8,Iris-virginica
105,6.5,3.0,5.8,2.2,Iris-virginica
106,7.6,3.0,6.6,2.1,Iris-virginica
107,4.9,2.5,4.5,1.7,Iris-virginica
108,7.3,2.9,6.3,1.8,Iris-virginica
109,6.7,2.5,5.8,1.8,Iris-virginica
110,7.2,3.6,6.1,2.5,Iris-virginica
111,6.5,3.2,5.1,2.0,Iris-virginica
112,6.4,2.7,5.3,1.9,Iris-virginica
113,6.8,3.0,5.5,2.1,Iris-virginica
114,5.7,2.5,5.0,2.0,Iris-virginica
115,5.8,2.8,5.1,2.4,Iris-virginica
116,6.4,3.2,5.3,2.3,Iris-virginica
117,6.5,3.0,5.5,1.8,Iris-virginica
118,7.7,3.8,6.7,2.2,Iris-virginica
119,7.7,2.6,6.9,2.3,Iris-virginica
120,6.0,2.2,5.0,1.5,Iris-virginica
121,6.9,3.2,5.7,2.3,Iris-virginica
122,5.6,2.8,4.9,2.0,Iris-virginica
123,7.7,2.8,6.7,2.0,Iris-virginica
124,6.3,2.7,4.9,1.8,Iris-virginica
125,6.7,3.3,5.7,2.1,Iris-virginica
126,7.2,3.2,6.0,1.8,Iris-virginica
127,6.2,2.8,4.8,1.8,Iris-virginica
128,6.1,3.0,4.9,1.8,Iris-virginica
129,6.4,2.8,5.6,2.1,Iris-virginica
130,7.2,3.0,5.8,1.6,Iris-virginica
131,7.4,2.8,6.1,1.9,Iris-virginica
132,7.9,3.8,6.4,2.0,Iris-virginica
133,6.4,2.8,5.6,2.2,Iris-virginica
134,6.3,2.8,5.1,1.5,Iris-virginica
135,6.1,2.6,5.6,1.4,Iris-virginica
136,7.7,3.0,6.1,2.3,Iris-virginica
137,6.3,3.4,5.6,2.4,Iris-virginica
138,6.4,3.1,5.5,1.8,Iris-virginica
139,6.0,3.0,4.8,1.8,Iris-virginica
140,6.9,3.1,5.4,2.1,Iris-virginica
141,6.7,3.1,5.6,2.4,Iris-virginica
142,6.9,3.1,5.1,2.3,Iris-virginica
143,5.8,2.7,5.1,1.9,Iris-virginica
144,6.8,3.2,5.9,2.3,Iris-virginica
145,6.7,3.3,5.7,2.5,Iris-virginica
146,6.7,3.0,5.2,2.3,Iris-virginica
147,6.3,2.5,5.0,1.9,Iris-virginica
148,6.5,3.0,5.2,2.0,Iris-virginica
149,6.2,3.4,5.4,2.3,Iris-virginica
150,5.9,3.0,5.1,1.8,Iris-virginica
`;function Pg(){return{sepalLength:[],sepalWidth:[],petalLength:[],petalWidth:[]}}function Fg(){let e=Ng.trim().split(`
`);if(typeof e[0]!=`string`)throw Error(`Failed to parse iris data`);let t={setosa:Pg(),versicolor:Pg(),virginica:Pg()},n=e[0].split(`,`),r=n.indexOf(`Species`);if(r===-1)throw Error(`Failed to parse iris data: missing Species column`);for(let i of e.slice(1)){let e=i.split(`,`),a;switch(e[r]){case`Iris-setosa`:a=t.setosa;break;case`Iris-versicolor`:a=t.versicolor;break;case`Iris-virginica`:a=t.virginica;break}if(!a)throw Error(`Failed to parse iris data: unknown species ${e[r]}`);n.forEach((t,n)=>{let r=e[n];if(r!==void 0)switch(t){case`SepalLengthCm`:a.sepalLength.push(parseFloat(r));break;case`SepalWidthCm`:a.sepalWidth.push(parseFloat(r));break;case`PetalLengthCm`:a.petalLength.push(parseFloat(r));break;case`PetalWidthCm`:a.petalWidth.push(parseFloat(r));break}})}return t}function Ig(){let e=Fg();return{title:`Iris Dataset`,legend:`right`,plot:{series:[{type:`scatter`,name:`Setosa`,x:e.setosa.sepalLength,y:e.setosa.sepalWidth},{type:`scatter`,name:`Versicolor`,x:e.versicolor.sepalLength,y:e.versicolor.sepalWidth},{type:`scatter`,name:`Virginica`,x:e.virginica.sepalLength,y:e.virginica.sepalWidth}],xAxis:{title:`Sepal Length (cm)`,ticks:`auto`,grid:`auto`},yAxis:{title:`Sepal Width (cm)`,ticks:`auto`,grid:`auto`}}}}var Lg=`import type { Figure } from "plotive";
import { prepareIrisData } from "@/data/iris";

export default function (): Figure {
    const data = prepareIrisData();
    return {
        title: "Iris Dataset",
        legend: "right",
        plot: {
            series: [
                {
                    type: "scatter",
                    name: "Setosa",
                    x: data.setosa.sepalLength,
                    y: data.setosa.sepalWidth,
                },
                {
                    type: "scatter",
                    name: "Versicolor",
                    x: data.versicolor.sepalLength,
                    y: data.versicolor.sepalWidth,
                },
                {
                    type: "scatter",
                    name: "Virginica",
                    x: data.virginica.sepalLength,
                    y: data.virginica.sepalWidth,
                },
            ],
            xAxis: {
                title: "Sepal Length (cm)",
                ticks: "auto",
                grid: "auto",
            },
            yAxis: {
                title: "Sepal Width (cm)",
                ticks: "auto",
                grid: "auto",
            },
        },
    };
}
`,Rg=`use std::path;

use plotive::data::Source;
use plotive::{data, des};

mod common;

fn iris_csv_path() -> path::PathBuf {
    let iris_csv = path::Path::new(file!());
    let parent = iris_csv.parent().unwrap();
    parent.join("Iris.csv")
}

/// Returns a boolean mask where the column matches the given category
/// Returns None if the column is not string-like
fn category_mask<C>(column: &C, category: &str) -> Option<Vec<bool>>
where
    C: data::Column + ?Sized,
{
    let mask = column
        .str()?
        .str_iter()
        .map(|v| v == Some(category))
        .collect();
    Some(mask)
}

/// Filters a numeric column by a boolean mask
/// Returns None if the column is not numeric and panics if the lengths do not match
fn filter_numeric_by_mask<C>(num_col: &C, mask: &[bool]) -> Option<data::VecColumn>
where
    C: data::Column + ?Sized,
{
    assert_eq!(num_col.len(), mask.len());

    let vec: Vec<f64> = num_col
        .f64()?
        .f64_iter()
        .zip(mask.iter())
        .filter_map(|(v, &m)| if m { Some(v) } else { None })
        .map(|v| v.unwrap_or(f64::NAN))
        .collect();
    Some(vec.into())
}

fn main() {
    let iris_csv = iris_csv_path();
    let csv_data = std::fs::read_to_string(&iris_csv).unwrap();

    let table = data::csv::parse_str(&csv_data, Default::default()).unwrap();

    let species = table.column("Species").unwrap();
    let sepal_length = table.column("SepalLengthCm").unwrap();
    let sepal_width = table.column("SepalWidthCm").unwrap();

    let setosa_mask = category_mask(species, "Iris-setosa").unwrap();
    let versicolor_mask = category_mask(species, "Iris-versicolor").unwrap();
    let virginica_mask = category_mask(species, "Iris-virginica").unwrap();

    let setosa_sepal_length = filter_numeric_by_mask(sepal_length, &setosa_mask).unwrap();
    let setosa_sepal_width = filter_numeric_by_mask(sepal_width, &setosa_mask).unwrap();

    let versicolor_sepal_length = filter_numeric_by_mask(sepal_length, &versicolor_mask).unwrap();
    let versicolor_sepal_width = filter_numeric_by_mask(sepal_width, &versicolor_mask).unwrap();

    let virginica_sepal_length = filter_numeric_by_mask(sepal_length, &virginica_mask).unwrap();
    let virginica_sepal_width = filter_numeric_by_mask(sepal_width, &virginica_mask).unwrap();

    let mut source = data::NamedColumns::new();

    source.add_column(
        "setosa_sepal_length",
        &setosa_sepal_length as &dyn data::Column,
    );
    source.add_column(
        "setosa_sepal_width",
        &setosa_sepal_width as &dyn data::Column,
    );

    source.add_column(
        "versicolor_sepal_length",
        &versicolor_sepal_length as &dyn data::Column,
    );
    source.add_column(
        "versicolor_sepal_width",
        &versicolor_sepal_width as &dyn data::Column,
    );

    source.add_column(
        "virginica_sepal_length",
        &virginica_sepal_length as &dyn data::Column,
    );
    source.add_column(
        "virginica_sepal_width",
        &virginica_sepal_width as &dyn data::Column,
    );

    let title = "Iris dataset";

    let x_axis = des::Axis::new()
        .with_title("Sepal Length [cm]".into())
        .with_ticks(Default::default())
        .with_grid(Default::default());
    let y_axis = des::Axis::new()
        .with_title("Sepal Width [cm]".into())
        .with_ticks(Default::default())
        .with_grid(Default::default());

    let setosa = des::Series::Scatter(
        des::series::Scatter::new(
            des::data_src_ref("setosa_sepal_length"),
            des::data_src_ref("setosa_sepal_width"),
        )
        .with_name("Setosa"),
    );
    let virginica = des::Series::Scatter(
        des::series::Scatter::new(
            des::data_src_ref("virginica_sepal_length"),
            des::data_src_ref("virginica_sepal_width"),
        )
        .with_name("Virginica"),
    );
    let versicolor = des::Series::Scatter(
        des::series::Scatter::new(
            des::data_src_ref("versicolor_sepal_length"),
            des::data_src_ref("versicolor_sepal_width"),
        )
        .with_name("Versicolor"),
    );

    let plot = des::Plot::new(vec![setosa, versicolor, virginica])
        .with_x_axis(x_axis)
        .with_y_axis(y_axis)
        .with_legend(des::plot::LegendPos::InBottomRight.into());

    let fig = des::Figure::new(plot.into()).with_title(title.into());

    common::process_figure(&fig, &source, None, "iris");
}
`,zg=`from os import path
import pandas as pd
import plotive as pv

csv_file = path.join(path.dirname(path.abspath(__file__)), "Iris.csv")
df = pd.read_csv(csv_file, index_col="Id")

data = {
    "setosa_sep_len": df.loc[df["Species"] == "Iris-setosa", "SepalLengthCm"].values,
    "setosa_sep_wid": df.loc[df["Species"] == "Iris-setosa", "SepalWidthCm"].values,
    "versicolor_sep_len": df.loc[
        df["Species"] == "Iris-versicolor", "SepalLengthCm"
    ].values,
    "versicolor_sep_wid": df.loc[
        df["Species"] == "Iris-versicolor", "SepalWidthCm"
    ].values,
    "virginica_sep_len": df.loc[
        df["Species"] == "Iris-virginica", "SepalLengthCm"
    ].values,
    "virginica_sep_wid": df.loc[
        df["Species"] == "Iris-virginica", "SepalWidthCm"
    ].values,
}

fig = pv.Figure(
    title="Iris dataset",
    plot=pv.Plot(
        series=[
            pv.series.Scatter(
                x="setosa_sep_len",
                y="setosa_sep_wid",
                name="Setosa",
            ),
            pv.series.Scatter(
                x="versicolor_sep_len",
                y="versicolor_sep_wid",
                name="Versicolor",
            ),
            pv.series.Scatter(
                x="virginica_sep_len",
                y="virginica_sep_wid",
                name="Virginica",
            ),
        ],
        x_axis=pv.Axis(title="Sepal Length [cm]", ticks="auto", grid="auto"),
        y_axis=pv.Axis(title="Sepal Width [cm]", ticks="auto", grid="auto"),
    ),
    legend="right",
)

import _common

_common.process_figure(fig, data, "iris")
`;function Bg(){let e=Array.from({length:500},(e,t)=>t/499*2*Math.PI),t=Array.from({length:500},(e,t)=>t/499*2*Math.PI+.5*Math.PI),n=e.map(e=>Math.sin(e*e)),r=e.map(e=>-Math.sin(e*e));return{size:{width:800,height:900},plots:[{series:{type:`line`,x:e,y:n},xAxis:{scale:{type:`shared`,ref:`x2`},ticks:`auto`,grid:`auto`}},{series:{type:`line`,x:t,y:r},xAxis:{id:`x2`,ticks:`pimultiple`,grid:`auto`}}]}}var Vg=`import type { Figure } from "plotive";

export default function (): Figure {
    const x1 = Array.from({ length: 500 }, (_, i) => (i / 499) * 2 * Math.PI);
    const x2 = Array.from(
        { length: 500 },
        (_, i) => (i / 499) * 2 * Math.PI + 0.5 * Math.PI,
    );
    const y1 = x1.map((x) => Math.sin(x * x));
    const y2 = x1.map((x) => -Math.sin(x * x));

    return {
        size: {
            width: 800,
            height: 900,
        },
        plots: [
            {
                series: {
                    type: "line",
                    x: x1,
                    y: y1,
                },
                xAxis: {
                    scale: {
                        type: "shared",
                        ref: "x2",
                    },
                    ticks: "auto",
                    grid: "auto",
                },
            },
            {
                series: {
                    type: "line",
                    x: x2,
                    y: y2,
                },
                xAxis: {
                    id: "x2",
                    ticks: "pimultiple",
                    grid: "auto",
                },
            },
        ],
    };
}
`,Hg=`use plotive::{data, des, utils};

mod common;

use std::f64::consts::PI;

fn main() {
    let x1 = utils::linspace(0.0, 2.0 * PI, 400);
    let y1: Vec<f64> = x1.iter().map(|x| (x * x).sin()).collect();
    let x2 = utils::linspace(0.5 * PI, 2.5 * PI, 400);
    let y2: Vec<f64> = x1.iter().map(|x| -(x * x).sin()).collect();

    let mut data_source = data::NamedColumns::new();
    data_source.add_column("x1", &x1 as &dyn data::Column);
    data_source.add_column("y1", &y1 as &dyn data::Column);
    data_source.add_column("x2", &x2 as &dyn data::Column);
    data_source.add_column("y2", &y2 as &dyn data::Column);

    let fig = des::Figure::new(
        des::Subplots::new(2, 1)
            .with_plot(
                (0, 0),
                des::Plot::new(vec![
                    des::series::Line::new(
                        des::series::data_src_ref("x1"),
                        des::series::data_src_ref("y1"),
                    )
                    .into(),
                ])
                .with_x_axis(
                    des::Axis::new()
                        .with_scale(des::axis::ref_id("x2").into())
                        .with_ticks(Default::default())
                        .with_grid(Default::default()),
                ),
            )
            .with_plot(
                (1, 0),
                des::Plot::new(vec![
                    des::series::Line::new(
                        des::series::data_src_ref("x2"),
                        des::series::data_src_ref("y2"),
                    )
                    .into(),
                ])
                .with_x_axis(
                    des::Axis::new()
                        .with_id("x2")
                        .with_ticks(des::axis::ticks::PiMultipleLocator::default().into())
                        .with_grid(Default::default()),
                ),
            )
            .with_space(10.0)
            .into(),
    )
    .with_size((800.0, 900.0).into());

    common::process_figure(&fig, &data_source, None, "subplots");
}
`,Ug=`import numpy as np
import plotive as pv

x1 = np.linspace(0.0, 2.0 * np.pi, 400)
y1 = np.sin(x1 * x1)
x2 = np.linspace(0.5 * np.pi, 2.5 * np.pi, 400)
y2 = -np.sin(x2 * x2)

data = {
    "x1": x1,
    "y1": y1,
    "x2": x2,
    "y2": y2,
}

fig = pv.Figure(
    space=10.0,
    size=(800, 900),
    plots=[
        pv.Plot(
            series=[
                pv.series.Line(
                    x="x1",
                    y="y1",
                )
            ],
            x_axis=pv.Axis(
                grid="auto",
                scale="x2",
            ),
        ),
        pv.Plot(
            series=[
                pv.series.Line(
                    x="x2",
                    y="y2",
                )
            ],
            x_axis=pv.Axis(
                id="x2",
                ticks="pimultiple",
                grid="auto",
            ),
        ),
    ],
)

import _common

_common.process_figure(fig, data, "subplots")
`,Wg=c(o(((e,t)=>{(function(e,t,n){function r(e){var t=this,n=o();t.next=function(){var e=2091639*t.s0+t.c*23283064365386963e-26;return t.s0=t.s1,t.s1=t.s2,t.s2=e-(t.c=e|0)},t.c=1,t.s0=n(` `),t.s1=n(` `),t.s2=n(` `),t.s0-=n(e),t.s0<0&&(t.s0+=1),t.s1-=n(e),t.s1<0&&(t.s1+=1),t.s2-=n(e),t.s2<0&&(t.s2+=1),n=null}function i(e,t){return t.c=e.c,t.s0=e.s0,t.s1=e.s1,t.s2=e.s2,t}function a(e,t){var n=new r(e),a=t&&t.state,o=n.next;return o.int32=function(){return n.next()*4294967296|0},o.double=function(){return o()+(o()*2097152|0)*11102230246251565e-32},o.quick=o,a&&(typeof a==`object`&&i(a,n),o.state=function(){return i(n,{})}),o}function o(){var e=4022871197;return function(t){t=String(t);for(var n=0;n<t.length;n++){e+=t.charCodeAt(n);var r=.02519603282416938*e;e=r>>>0,r-=e,r*=e,e=r>>>0,r-=e,e+=r*4294967296}return(e>>>0)*23283064365386963e-26}}t&&t.exports?t.exports=a:n&&n.amd?n(function(){return a}):this.alea=a})(e,typeof t==`object`&&t,typeof define==`function`&&define)}))(),1);function Gg(){let e=(0,Wg.default)(`plotive colormap example`),t=Array.from({length:50},()=>e()*10),n=Array.from({length:50},()=>e()*10),r=Array.from({length:50},()=>e()*19.5+.5),i=Array.from({length:50},(e,t)=>t*10/49+10),a={scale:[-.3,10.3],ticks:`auto`,grid:`auto`};return{plot:{series:{type:`scatter`,x:t,y:n,sizes:r,colors:i},xAxis:a,yAxis:a,colorbar:`auto`}}}var Kg=`import type { Figure, Axis } from "plotive";
import seedrandom from "seedrandom/lib/alea.js";

export default function (): Figure {
    const NUM = 50;
    const rng = seedrandom("plotive colormap example");

    const x = Array.from({ length: NUM }, () => rng() * 10);
    const y = Array.from({ length: NUM }, () => rng() * 10);
    const sizes = Array.from({ length: NUM }, () => rng() * 19.5 + 0.5);
    const colors = Array.from(
        { length: NUM },
        (_, i) => (i * 10) / (NUM - 1) + 10,
    );

    const axis: Axis = {
        scale: [-0.3, 10.3],
        ticks: "auto",
        grid: "auto",
    };

    return {
        plot: {
            series: {
                type: "scatter",
                x,
                y,
                sizes,
                colors,
                // uses the default "viridis" colormap,
                // which has perceptual interpolation
                // colormap scales autoamatically to the range of
                // the colors array, but can be customized
            },
            xAxis: axis,
            yAxis: axis,
            colorbar: "auto",
        },
    };
}
`,qg=`use plotive::{data, des};
use rand_distr::{Distribution, Uniform};

mod common;

fn main() {
    let axis = des::Axis::new()
        .with_scale((-0.3, 10.3).into())
        .with_ticks(Default::default())
        .with_grid(Default::default());

    let fig = des::series::Scatter::new("x".into(), "y".into())
        .with_sizes("sizes".into())
        // Will use the default "viridis" colormap
        .with_colors("colors".into(), Default::default())
        .into_plot()
        .with_x_axis(axis.clone())
        .with_y_axis(axis)
        .with_colorbar(Default::default())
        .into_figure();

    let mut rng = common::predictable_rng(1234.into());
    let xy_dist = Uniform::new(0.0, 10.0).unwrap();
    let sz_dist = Uniform::new(0.5, 20.0).unwrap();

    const N: usize = 50;
    let x = (0..N)
        .map(|_| xy_dist.sample(&mut rng))
        .collect::<Vec<f64>>();
    let y = (0..N)
        .map(|_| xy_dist.sample(&mut rng))
        .collect::<Vec<f64>>();
    let sizes = (0..N)
        .map(|_| sz_dist.sample(&mut rng))
        .collect::<Vec<f64>>();
    let colors = (0..N)
        .map(|i| 10.0 + 10.0 * (i as f64) / ((N - 1) as f64))
        .collect::<Vec<f64>>();

    let data_source = data::NamedColumns::new()
        .with_column("x", &x)
        .with_column("y", &y)
        .with_column("sizes", &sizes)
        .with_column("colors", &colors);

    common::process_figure(&fig, &data_source, None, "colormap");
}
`,Jg=`import numpy as np
import plotive as pv
import _common

np.random.seed(1234)

NUM = 50

x = np.random.uniform(0, 10, NUM)
y = np.random.uniform(0, 10, NUM)
sizes = np.random.uniform(0.5, 20, NUM)
colors = np.linspace(10, 20, NUM)

axis = pv.Axis(scale=(-0.3, 10.3), ticks="auto", grid="auto")

fig = pv.Figure(
    plot=pv.Plot(
        series=pv.series.Scatter(
            x=x,
            y=y,
            sizes=sizes,
            colors=colors,
            # uses the default "viridis" colormap
        ),
        x_axis=axis,
        y_axis=axis,
        colorbar="auto",
    ),
)

_common.process_figure(fig, {}, "colormap")
`;function Yg(e,t,n){let r=Math.log10(e),i=(Math.log10(t)-r)/(n-1);return Array.from({length:n},(e,t)=>10**(r+t*i))}function Xg(e,t=2){if(e===0)return`0`;let n=[`p`,`n`,`µ`,`m`,``,`k`,`M`,`G`,`T`],r=Math.floor(Math.log10(Math.abs(e))/3),i=n[r+4],a=i===void 0?`e${r*3}`:i;return`${(e/1e3**r).toFixed(t).replace(/\.?0+$/,``)} ${a}`}function Zg(e,t,n,r){let i=2*Math.PI*r,a=1-i*i*t*n,o=i*e*n,s=1/Math.sqrt(a*a+o*o),c=-Math.atan2(o,a);return{magnitude:20*Math.log10(s),phase:c}}function Qg(e,t){return 1/(2*Math.PI*Math.sqrt(e*t))}var $g=dc(`bode-rlc`,()=>{let e=en(1),t=en(10),n=en(100);return{R1:e,R2:t,R3:n,R:ho(()=>[e.value,t.value,n.value]),L:en(1e-4),C:en(1e-6)}});function e_(){let{R:e,L:t,C:n}=$g(),r=Yg(100,1e6,500),i=Qg(t,n),a=[],o=[];return e.forEach(e=>{let i=[],s=[];for(let a of r){let r=Zg(e,t,n,a);i.push(r.magnitude),s.push(r.phase)}a.push({name:`R = ${Xg(e)}Ω`,type:`line`,x:r,y:i}),o.push({type:`line`,x:r,y:s})}),{title:[`Bode plot of RLC circuit`,`[size=18;italic]L = ${Xg(t)}H, C = ${Xg(n)}F[/size;italic]`],legend:`right`,plots:[{series:a,xAxis:{scale:{type:`shared`,ref:`freq`},ticks:`auto`,minorTicks:`auto`,grid:`auto`},yAxis:{title:`Magnitude (dB)`,ticks:`auto`,grid:`auto`},annotations:[{type:`line`,vertical:i,pattern:`dashed`},{type:`label`,xy:[i,[-10,`plot`]],text:`${(i/1e3).toFixed(2)} kHz`,anchor:`bottom-left`,angle:90},{type:`line`,twoPoints:[[i,0],[i*10,-40]],pattern:`dashed`},{type:`label`,xy:[i*10,-40],text:`-40 dB/decade`,anchor:`bottom-left`}]},{series:o,xAxis:{scale:`log`,id:`freq`,ticks:`auto`,grid:`auto`,minorTicks:`auto`},yAxis:{title:`Phase (rad)`,ticks:`pimultiple`,grid:`auto`}}]}}var t_=`import type { Figure, Series } from "plotive";
import { logSpace, humanize } from "@/utils";
import { rlcFreqResponse, lcCutOffFreq } from "@/data/rlc";
import { useBodeRlcStore } from "@/stores/bode-rlc";

export default function (): Figure {
    const { R, L, C } = useBodeRlcStore();

    const freq = logSpace(100, 1e6, 500);

    const cutoff = lcCutOffFreq(L, C);

    const magSeries: Series[] = [];
    const phaseSeries: Series[] = [];

    R.forEach((r) => {
        const mag = [];
        const phase = [];
        for (let f of freq) {
            const response = rlcFreqResponse(r, L, C, f);
            mag.push(response.magnitude);
            phase.push(response.phase);
        }
        magSeries.push({
            name: \`R = \${humanize(r)}Ω\`,
            type: "line",
            x: freq,
            y: mag,
        });
        phaseSeries.push({ type: "line", x: freq, y: phase });
    });

    return {
        // Text in array is parsed as rich text, with one line per element
        title: [
            \`Bode plot of RLC circuit\`,
            \`[size=18;italic]L = \${humanize(L)}H, C = \${humanize(C)}F[/size;italic]\`,
        ],

        legend: "right",
        plots: [
            {
                series: magSeries,
                xAxis: {
                    scale: {
                        type: "shared",
                        ref: "freq",
                    },
                    ticks: "auto",
                    minorTicks: "auto",
                    grid: "auto",
                },
                yAxis: {
                    title: "Magnitude (dB)",
                    ticks: "auto",
                    grid: "auto",
                },
                annotations: [
                    {
                        type: "line",
                        vertical: cutoff,
                        pattern: "dashed",
                    },
                    {
                        type: "label",
                        xy: [cutoff, [-10, "plot"]], // 10 point from the bottom
                        text: \`\${(cutoff / 1000).toFixed(2)} kHz\`,
                        anchor: "bottom-left",
                        angle: 90,
                    },
                    {
                        type: "line",
                        twoPoints: [
                            [cutoff, 0],
                            [cutoff * 10, -40],
                        ],
                        pattern: "dashed",
                    },
                    {
                        type: "label",
                        xy: [cutoff * 10, -40],
                        text: \`-40 dB/decade\`,
                        anchor: "bottom-left",
                    },
                ],
            },
            {
                series: phaseSeries,
                xAxis: {
                    scale: "log",
                    id: "freq",
                    ticks: "auto",
                    grid: "auto",
                    minorTicks: "auto",
                },
                yAxis: {
                    title: "Phase (rad)",
                    ticks: "pimultiple",
                    grid: "auto",
                },
            },
        ],
    };
}
`,n_=`use std::f64::consts::PI;

use plotive::{data, des, style, utils};

mod common;

/// Computes a single point of the transfer fonction of a series RLC circuit, with output across capacitor
/// The frequency f is in Hz, r is the resistance, l is the inductance and c is the capacitance.
/// The returned values are the magnitude in dB and phase in rad at this frequency
fn rlc_freq_response(f: f64, r: f64, l: f64, c: f64) -> (f64, f64) {
    let pulse = 2.0 * PI * f;

    // H(jw) = 1 / (1 - w^2LC + jwRC)

    let num = 1.0;
    let real = 1.0 - pulse * pulse * l * c;
    let imag = pulse * r * c;

    let mag = num / (real.powi(2) + imag.powi(2)).sqrt();
    let ph = -imag.atan2(real);
    (20.0 * mag.log10(), ph)
}

/// Computes the transfer function of a series RLC circuit, with output across the capacitor.
/// The input vector is the frequencies in Hz
/// The returned vectors are the magnitude in dB and the phase in radians
fn rlc_full_response(frequencies: &[f64], r: f64, l: f64, c: f64) -> (Vec<f64>, Vec<f64>) {
    let mut mags = Vec::with_capacity(frequencies.len());
    let mut phases = Vec::with_capacity(frequencies.len());

    for &f in frequencies {
        let (mag, phase) = rlc_freq_response(f, r, l, c);

        mags.push(mag);
        phases.push(phase);
    }

    (mags, phases)
}

fn lc_cutoff_freq(l: f64, c: f64) -> f64 {
    1.0 / (2.0 * PI * (l * c).sqrt())
}

fn main() {
    const L: f64 = 1e-4; // 100 µH
    const C: f64 = 1e-6; // 1 uF

    let series = [
        (1.0, "mag1", "phase1", "R = 1 Ω"),
        (10.0, "mag2", "phase2", "R = 10 Ω"),
        (100.0, "mag3", "phase3", "R = 100 Ω"),
    ];

    // &[&str] converts to Text::Rich with one line per element
    let title = &[
        "Bode diagram of RLC circuit",
        "[size=18;italic;font=serif]L = 0.1 mH / C = 1 µF[/size;italic;font]",
    ];

    // magnitude X axis scale is taken from the phase X axis
    // the reference uses the title given to the phase X axis
    let mag_freq_axis = des::Axis::new()
        .with_scale(des::axis::ref_id("Frequency [Hz]").into())
        .with_ticks(Default::default())
        .with_minor_ticks(Default::default());
    let mag_axis = des::Axis::new()
        .with_title("Magnitude [dB]".into())
        .with_ticks(Default::default())
        .with_grid(Default::default());

    let phase_freq_axis = des::Axis::new()
        .with_title("Frequency [Hz]".into())
        .with_scale(des::axis::LogScale::default().into())
        .with_ticks(Default::default())
        .with_minor_ticks(Default::default());
    let phase_axis = des::Axis::new()
        .with_title("Phase [rad]".into())
        .with_ticks(
            des::axis::Ticks::new()
                .with_locator(des::axis::ticks::PiMultipleLocator::default().into()),
        )
        .with_grid(Default::default());

    let mut mag_series: Vec<des::Series> = Vec::with_capacity(3);
    let mut phase_series: Vec<des::Series> = Vec::with_capacity(3);

    let mut source = data::NamedOwnedColumns::new();

    let freq = utils::logspace(100.0, 1000000.0, 500);

    for (r, mag_col, phase_col, name) in series {
        let (mag, phase) = rlc_full_response(&freq, r, L, C);

        source.add_column(mag_col, Box::new(mag));
        source.add_column(phase_col, Box::new(phase));

        // name only on the magnitude to avoid double legend
        mag_series.push(
            des::series::Line::new(des::data_src_ref("freq"), des::data_src_ref(mag_col))
                .with_name(name)
                .into(),
        );
        phase_series.push(
            des::series::Line::new(des::data_src_ref("freq"), des::data_src_ref(phase_col)).into(),
        );
    }

    source.add_column("freq", Box::new(freq));

    // cut-off frequency
    let cutoff = lc_cutoff_freq(L, C);
    // magnitude two decades after cut-off (to increase precision)
    let mag_2_decades = rlc_freq_response(cutoff * 100.0, 1.0, L, C).0;

    let cutoff_line =
        des::annot::Line::vertical(cutoff).with_pattern(style::LinePattern::Dashed.into());
    let slope_line = des::annot::Line::two_points(cutoff, 0.0, 100.0 * cutoff, mag_2_decades)
        .with_pattern(style::LinePattern::Dashed.into());
    let cut_off_label =
        des::annot::Label::new(format!("{:.2} kHz", cutoff / 1000.0).into(), cutoff, -60.0)
            .with_anchor(des::annot::Anchor::BottomLeft)
            .with_angle(90.0);
    let slope_label = des::annot::Label::new(
        format!("{:.0} dB/decade", mag_2_decades / 2.0).into(),
        cutoff * 10.0,
        mag_2_decades / 2.0,
    )
    .with_anchor(des::annot::Anchor::BottomLeft);

    let mag_plot = des::Plot::new(mag_series)
        .with_x_axis(mag_freq_axis)
        .with_y_axis(mag_axis)
        .with_annotation(cutoff_line.into())
        .with_annotation(slope_line.into())
        .with_annotation(cut_off_label.into())
        .with_annotation(slope_label.into());

    let phase_plot = des::Plot::new(phase_series)
        .with_x_axis(phase_freq_axis)
        .with_y_axis(phase_axis);

    let fig = des::Figure::new(
        des::Subplots::new(2, 1)
            .with_plot((0, 0), mag_plot)
            .with_plot((1, 0), phase_plot)
            .into(),
    )
    .with_title(title.into())
    .with_legend(des::figure::LegendPos::Right.into());

    common::process_figure(&fig, &source, None, "bode_rlc");
}
`,r_=`import numpy as np
import plotive as pv

L = 1e-4  # 100 µH
C = 1e-6  # 1 uF
TITLE = [
    "Bode diagram of RLC circuit",
    "[size=18;italic;font=serif]L = 0.1 mH / C = 1 µF[/size;italic;font]",
]


def rlc_freq_response(freq, R, L, C):
    """Returns the transfer function of a series RLC circuit."""
    pulse = 2 * np.pi * freq
    num = 1
    real = 1 - (pulse**2) * L * C
    imag = pulse * R * C

    mag = num / np.sqrt(real**2 + imag**2)
    ph = -np.arctan2(imag, real)

    return 20 * np.log10(mag), ph


if __name__ == "__main__":
    freq = np.logspace(2, 6, 500)  # 100 Hz to 1 MHz
    mags = ["mag1", "mag2", "mag3"]
    phs = ["ph1", "ph2", "ph3"]
    R_values = [1, 10, 100]  # Ohms

    data_src = {"freq": freq}
    mag_series = []
    ph_series = []

    for R, mag_col, ph_col in zip(R_values, mags, phs):
        mag, ph = rlc_freq_response(freq, R, L, C)
        data_src[mag_col] = mag
        data_src[ph_col] = ph
        mag_series.append(
            pv.series.Line(
                x="freq",
                y=mag_col,
                name=f"R = {R} Ω",
            )
        )
        ph_series.append(
            pv.series.Line(
                x="freq",
                y=ph_col,
            )
        )

    # compute cutoff frequency of the filter
    cutoff_freq = 1 / (2 * np.pi * np.sqrt(L * C))
    # compute slope two decades after cutoff frequency for better accuracy
    slope = rlc_freq_response(cutoff_freq * 100, R_values[0], L, C)[0] / 2

    fig = pv.Figure(
        title=TITLE,
        plots=[
            pv.Plot(
                series=mag_series,
                x_axis=pv.Axis(
                    scale="Frequency [Hz]", ticks="auto", minor_ticks="auto"
                ),  # references the x-axis scale of the second plot
                y_axis=pv.Axis(title="Magnitude [dB]", ticks="auto", grid="auto"),
                annotations=[
                    pv.annot.Line(
                        vertical=cutoff_freq,
                        stroke=pv.style.Stroke(color="foreground", pattern=[5, 5]),
                    ),
                    pv.annot.Label(
                        xy=(cutoff_freq, -60),
                        text=f"{cutoff_freq/1000:.2f} kHz",
                        anchor="bottom-left",
                        angle=90,
                    ),
                    pv.annot.Line(
                        two_points=((cutoff_freq, 0), (cutoff_freq * 10, slope)),
                        stroke=pv.style.Stroke(color="foreground", pattern=[5, 5]),
                    ),
                    pv.annot.Label(
                        xy=(cutoff_freq * 10, slope),
                        text=f"{slope:.1f} dB/decade",
                        anchor="bottom-left",
                    ),
                ],
            ),
            pv.Plot(
                series=ph_series,
                x_axis=pv.Axis(
                    title="Frequency [Hz]",
                    scale="log",
                    ticks="auto",
                    minor_ticks="auto",
                ),
                y_axis=pv.Axis(title="Phase [rad]", ticks="pimultiple", grid="auto"),
            ),
        ],
        legend="right",
    )

    import _common

    _common.process_figure(fig, data_src, "bode-rlc")
`,i_={class:`min-h-screen`},a_={class:`app-header sticky top-0 z-50 border-b border-surface-200 shadow-sm backdrop-blur`},o_={class:`relative mx-auto flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8`},s_={class:`flex flex-wrap items-center justify-end gap-2 sm:gap-3`},c_={class:`mx-auto flex w-full flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8`},l_={class:`grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-4 px-2 py-2 sm:px-3`},u_={class:`min-w-22 text-right text-sm tabular-nums opacity-80`},d_={class:`min-w-22 text-right text-sm tabular-nums opacity-80`},f_={class:`min-w-22 text-right text-sm tabular-nums opacity-80`},p_={class:`min-w-22 text-right text-sm tabular-nums opacity-80`},m_={class:`min-w-22 text-right text-sm tabular-nums opacity-80`},h_=Uf(Or({__name:`App`,setup(e){let t=pc(),n=ho({get:()=>t.darkMode?`dark`:`light`,set:e=>t.setDarkMode(e===`dark`)}),r=[[`light`,`light (default)`],[`okabe-ito`,`okabe-ito (colorblind)`],[`tol-bright`,`tol-bright (colorblind)`]],i=e=>r.find(([t,n])=>t===e)?.[1]||e,a=e=>r.find(([t,n])=>n===e)?.[0]||e,o=Object.keys(xc).map(i),s=ho({get:()=>i(t.theme),set:e=>t.theme=a(e)}),c=$g();function l(e,t,n){return Math.min(n,Math.max(t,e))}function u(e,t,n){let r=Math.log10(t),i=Math.log10(n);return ho({get:()=>Math.log10(l(c[e],t,n)),set:t=>{c[e]=10**l(t,r,i)}})}let d=u(`R1`,.1,100),f=u(`R2`,.1,100),p=u(`R3`,.1,100),m=u(`C`,1e-7,1e-5),h=u(`L`,1e-5,.001);function g(e,t=2){return e.toLocaleString(`fr-FR`,{maximumFractionDigits:t,minimumFractionDigits:0})}function _(e){return e.toExponential(2)}return(e,r)=>(U(),W(`div`,i_,[G(`header`,a_,[r[9]||=G(`div`,{class:`app-header__overlay`,"aria-hidden":`true`},null,-1),G(`div`,o_,[r[8]||=G(`h1`,{class:`text-xl font-semibold tracking-tight`},` Plotive examples `,-1),G(`div`,s_,[K(B(sh),{modelValue:s.value,"onUpdate:modelValue":r[0]||=e=>s.value=e,options:B(o)},null,8,[`modelValue`,`options`]),K(B(dp),{modelValue:B(t).renderer,"onUpdate:modelValue":r[1]||=e=>B(t).renderer=e,options:[`PNG`,`Canvas`,`SVG`]},null,8,[`modelValue`]),K(B(dp),{modelValue:n.value,"onUpdate:modelValue":r[2]||=e=>n.value=e,options:[`light`,`dark`]},null,8,[`modelValue`])])])]),G(`main`,c_,[K(Wf,{name:`Simple Line Plot`,"figure-fn":B(Fh),"ts-code":B(Ih),"rs-code":B(Lh),"py-code":B(Rh)},null,8,[`figure-fn`,`ts-code`,`rs-code`,`py-code`]),K(Wf,{name:`Scatter Plot`,"figure-fn":B(yg),"ts-code":B(bg),"rs-code":B(xg),"py-code":B(Sg)},null,8,[`figure-fn`,`ts-code`,`rs-code`,`py-code`]),K(Wf,{name:`Multiple Axes`,"figure-fn":B(Cg),"ts-code":B(wg),"rs-code":B(Tg),"py-code":B(Eg)},null,8,[`figure-fn`,`ts-code`,`rs-code`,`py-code`]),K(Wf,{name:`Time Series`,"figure-fn":B(kg),"ts-code":B(Ag),"rs-code":B(jg),"py-code":B(Mg)},null,8,[`figure-fn`,`ts-code`,`rs-code`,`py-code`]),K(Wf,{name:`Iris DataSet`,"figure-fn":B(Ig),"ts-code":B(Lg),"rs-code":B(Rg),"py-code":B(zg)},null,8,[`figure-fn`,`ts-code`,`rs-code`,`py-code`]),K(Wf,{name:`Subplots with shared axis`,"figure-fn":B(Bg),"ts-code":B(Vg),"rs-code":B(Hg),"py-code":B(Ug)},null,8,[`figure-fn`,`ts-code`,`rs-code`,`py-code`]),K(Wf,{name:`Colormap and Colorbar`,"figure-fn":B(Gg),"ts-code":B(Kg),"rs-code":B(qg),"py-code":B(Jg)},null,8,[`figure-fn`,`ts-code`,`rs-code`,`py-code`]),K(Wf,{name:`Reactive Annotated Bode Plot`,"figure-fn":B(e_),"ts-code":B(t_),"rs-code":B(n_),"py-code":B(r_)},{default:Bn(()=>[G(`div`,l_,[r[10]||=G(`label`,{class:`text-sm font-medium`},`R1`,-1),K(B(Oh),{modelValue:B(d),"onUpdate:modelValue":r[3]||=e=>z(d)?d.value=e:null,min:-1,max:2,step:.01,class:`w-full`},null,8,[`modelValue`]),G(`span`,u_,Ee(g(B(c).R1,1))+` Ω`,1),r[11]||=G(`label`,{class:`text-sm font-medium`},`R2`,-1),K(B(Oh),{modelValue:B(f),"onUpdate:modelValue":r[4]||=e=>z(f)?f.value=e:null,min:-1,max:2,step:.01,class:`w-full`},null,8,[`modelValue`]),G(`span`,d_,Ee(g(B(c).R2,1))+` Ω`,1),r[12]||=G(`label`,{class:`text-sm font-medium`},`R3`,-1),K(B(Oh),{modelValue:B(p),"onUpdate:modelValue":r[5]||=e=>z(p)?p.value=e:null,min:-1,max:2,step:.01,class:`w-full`},null,8,[`modelValue`]),G(`span`,f_,Ee(g(B(c).R3,1))+` Ω`,1),r[13]||=G(`label`,{class:`text-sm font-medium`},`C`,-1),K(B(Oh),{modelValue:B(m),"onUpdate:modelValue":r[6]||=e=>z(m)?m.value=e:null,min:-7,max:-5,step:.01,class:`w-full`},null,8,[`modelValue`]),G(`span`,p_,Ee(_(B(c).C))+` F`,1),r[14]||=G(`label`,{class:`text-sm font-medium`},`L`,-1),K(B(Oh),{modelValue:B(h),"onUpdate:modelValue":r[7]||=e=>z(h)?h.value=e:null,min:-5,max:-3,step:.01,class:`w-full`},null,8,[`modelValue`]),G(`span`,m_,Ee(_(B(c).L))+` H`,1)])]),_:1},8,[`figure-fn`,`ts-code`,`rs-code`,`py-code`])])]))}}),[[`__scopeId`,`data-v-309637e8`]]);function g_(e){"@babel/helpers - typeof";return g_=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},g_(e)}function __(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function v_(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?__(Object(n),!0).forEach(function(t){y_(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):__(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function y_(e,t,n){return(t=b_(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function b_(e){var t=x_(e,`string`);return g_(t)==`symbol`?t:t+``}function x_(e,t){if(g_(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(g_(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var S_={ripple:!1,inputStyle:null,inputVariant:null,locale:{startsWith:`Starts with`,contains:`Contains`,notContains:`Not contains`,endsWith:`Ends with`,equals:`Equals`,notEquals:`Not equals`,noFilter:`No Filter`,lt:`Less than`,lte:`Less than or equal to`,gt:`Greater than`,gte:`Greater than or equal to`,dateIs:`Date is`,dateIsNot:`Date is not`,dateBefore:`Date is before`,dateAfter:`Date is after`,clear:`Clear`,apply:`Apply`,matchAll:`Match All`,matchAny:`Match Any`,addRule:`Add Rule`,removeRule:`Remove Rule`,accept:`Yes`,reject:`No`,choose:`Choose`,upload:`Upload`,cancel:`Cancel`,completed:`Completed`,pending:`Pending`,fileSizeTypes:[`B`,`KB`,`MB`,`GB`,`TB`,`PB`,`EB`,`ZB`,`YB`],dayNames:[`Sunday`,`Monday`,`Tuesday`,`Wednesday`,`Thursday`,`Friday`,`Saturday`],dayNamesShort:[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`],dayNamesMin:[`Su`,`Mo`,`Tu`,`We`,`Th`,`Fr`,`Sa`],monthNames:[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`],monthNamesShort:[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],chooseYear:`Choose Year`,chooseMonth:`Choose Month`,chooseDate:`Choose Date`,prevDecade:`Previous Decade`,nextDecade:`Next Decade`,prevYear:`Previous Year`,nextYear:`Next Year`,prevMonth:`Previous Month`,nextMonth:`Next Month`,prevHour:`Previous Hour`,nextHour:`Next Hour`,prevMinute:`Previous Minute`,nextMinute:`Next Minute`,prevSecond:`Previous Second`,nextSecond:`Next Second`,am:`am`,pm:`pm`,today:`Today`,weekHeader:`Wk`,firstDayOfWeek:0,showMonthAfterYear:!1,dateFormat:`mm/dd/yy`,weak:`Weak`,medium:`Medium`,strong:`Strong`,passwordPrompt:`Enter a password`,emptyFilterMessage:`No results found`,searchMessage:`{0} results are available`,selectionMessage:`{0} items selected`,emptySelectionMessage:`No selected item`,emptySearchMessage:`No results found`,fileChosenMessage:`{0} files`,noFileChosenMessage:`No file chosen`,emptyMessage:`No available options`,aria:{trueLabel:`True`,falseLabel:`False`,nullLabel:`Not Selected`,star:`1 star`,stars:`{star} stars`,selectAll:`All items selected`,unselectAll:`All items unselected`,close:`Close`,previous:`Previous`,next:`Next`,navigation:`Navigation`,scrollTop:`Scroll Top`,moveTop:`Move Top`,moveUp:`Move Up`,moveDown:`Move Down`,moveBottom:`Move Bottom`,moveToTarget:`Move to Target`,moveToSource:`Move to Source`,moveAllToTarget:`Move All to Target`,moveAllToSource:`Move All to Source`,pageLabel:`Page {page}`,firstPageLabel:`First Page`,lastPageLabel:`Last Page`,nextPageLabel:`Next Page`,prevPageLabel:`Previous Page`,rowsPerPageLabel:`Rows per page`,jumpToPageDropdownLabel:`Jump to Page Dropdown`,jumpToPageInputLabel:`Jump to Page Input`,selectRow:`Row Selected`,unselectRow:`Row Unselected`,expandRow:`Row Expanded`,collapseRow:`Row Collapsed`,showFilterMenu:`Show Filter Menu`,hideFilterMenu:`Hide Filter Menu`,filterOperator:`Filter Operator`,filterConstraint:`Filter Constraint`,editRow:`Row Edit`,saveEdit:`Save Edit`,cancelEdit:`Cancel Edit`,listView:`List View`,gridView:`Grid View`,slide:`Slide`,slideNumber:`{slideNumber}`,zoomImage:`Zoom Image`,zoomIn:`Zoom In`,zoomOut:`Zoom Out`,rotateRight:`Rotate Right`,rotateLeft:`Rotate Left`,listLabel:`Option List`}},filterMatchModeOptions:{text:[mp.STARTS_WITH,mp.CONTAINS,mp.NOT_CONTAINS,mp.ENDS_WITH,mp.EQUALS,mp.NOT_EQUALS],numeric:[mp.EQUALS,mp.NOT_EQUALS,mp.LESS_THAN,mp.LESS_THAN_OR_EQUAL_TO,mp.GREATER_THAN,mp.GREATER_THAN_OR_EQUAL_TO],date:[mp.DATE_IS,mp.DATE_IS_NOT,mp.DATE_BEFORE,mp.DATE_AFTER]},zIndex:{modal:1100,overlay:1e3,menu:1e3,tooltip:1100},theme:void 0,unstyled:!1,pt:void 0,ptOptions:{mergeSections:!0,mergeProps:!1},csp:{nonce:void 0}},C_=Symbol();function w_(e,t){var n={config:Ut(t)};return e.config.globalProperties.$primevue=n,e.provide(C_,n),E_(),D_(e,n),n}var T_=[];function E_(){gu.clear(),T_.forEach(function(e){return e?.()}),T_=[]}function D_(e,t){var n=en(!1),r=function(){if(t.config?.theme!==`none`&&!Y.isStyleNameLoaded(`common`)){var e,n=X.getCommonTheme?.call(X)||{},r=n.primitive,i=n.semantic,a=n.global,o=n.style,s={nonce:(e=t.config)==null||(e=e.csp)==null?void 0:e.nonce};X.load(r?.css,v_({name:`primitive-variables`},s)),X.load(i?.css,v_({name:`semantic-variables`},s)),X.load(a?.css,v_({name:`global-variables`},s)),X.loadStyle(v_({name:`global-style`},s),o),Y.setLoadedStyleName(`common`)}};gu.on(`theme:change`,function(t){n.value||=(e.config.globalProperties.$primevue.config.theme=t,!0)});var i=Yn(t.config,function(e,t){Qd.emit(`config:change`,{newValue:e,oldValue:t})},{immediate:!0,deep:!0}),a=Yn(function(){return t.config.ripple},function(e,t){Qd.emit(`config:ripple:change`,{newValue:e,oldValue:t})},{immediate:!0,deep:!0}),o=Yn(function(){return t.config.theme},function(e,i){n.value||Y.setTheme(e),t.config.unstyled||r(),n.value=!1,Qd.emit(`config:theme:change`,{newValue:e,oldValue:i})},{immediate:!0,deep:!1}),s=Yn(function(){return t.config.unstyled},function(e,n){!e&&t.config.theme&&r(),Qd.emit(`config:unstyled:change`,{newValue:e,oldValue:n})},{immediate:!0,deep:!0});T_.push(i),T_.push(a),T_.push(o),T_.push(s)}var O_={install:function(e,t){w_(e,dl(S_,t))}},k_={root:{transitionDuration:`{transition.duration}`},panel:{borderWidth:`0 0 1px 0`,borderColor:`{content.border.color}`},header:{color:`{text.muted.color}`,hoverColor:`{text.color}`,activeColor:`{text.color}`,activeHoverColor:`{text.color}`,padding:`1.125rem`,fontWeight:`600`,borderRadius:`0`,borderWidth:`0`,borderColor:`{content.border.color}`,background:`{content.background}`,hoverBackground:`{content.background}`,activeBackground:`{content.background}`,activeHoverBackground:`{content.background}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`-1px`,shadow:`{focus.ring.shadow}`},toggleIcon:{color:`{text.muted.color}`,hoverColor:`{text.color}`,activeColor:`{text.color}`,activeHoverColor:`{text.color}`},first:{topBorderRadius:`{content.border.radius}`,borderWidth:`0`},last:{bottomBorderRadius:`{content.border.radius}`,activeBottomBorderRadius:`0`}},content:{borderWidth:`0`,borderColor:`{content.border.color}`,background:`{content.background}`,color:`{text.color}`,padding:`0 1.125rem 1.125rem 1.125rem`}},A_={root:{background:`{form.field.background}`,disabledBackground:`{form.field.disabled.background}`,filledBackground:`{form.field.filled.background}`,filledHoverBackground:`{form.field.filled.hover.background}`,filledFocusBackground:`{form.field.filled.focus.background}`,borderColor:`{form.field.border.color}`,hoverBorderColor:`{form.field.hover.border.color}`,focusBorderColor:`{form.field.focus.border.color}`,invalidBorderColor:`{form.field.invalid.border.color}`,color:`{form.field.color}`,disabledColor:`{form.field.disabled.color}`,placeholderColor:`{form.field.placeholder.color}`,invalidPlaceholderColor:`{form.field.invalid.placeholder.color}`,shadow:`{form.field.shadow}`,paddingX:`{form.field.padding.x}`,paddingY:`{form.field.padding.y}`,borderRadius:`{form.field.border.radius}`,focusRing:{width:`{form.field.focus.ring.width}`,style:`{form.field.focus.ring.style}`,color:`{form.field.focus.ring.color}`,offset:`{form.field.focus.ring.offset}`,shadow:`{form.field.focus.ring.shadow}`},transitionDuration:`{form.field.transition.duration}`},overlay:{background:`{overlay.select.background}`,borderColor:`{overlay.select.border.color}`,borderRadius:`{overlay.select.border.radius}`,color:`{overlay.select.color}`,shadow:`{overlay.select.shadow}`},list:{padding:`{list.padding}`,gap:`{list.gap}`},option:{focusBackground:`{list.option.focus.background}`,selectedBackground:`{list.option.selected.background}`,selectedFocusBackground:`{list.option.selected.focus.background}`,color:`{list.option.color}`,focusColor:`{list.option.focus.color}`,selectedColor:`{list.option.selected.color}`,selectedFocusColor:`{list.option.selected.focus.color}`,padding:`{list.option.padding}`,borderRadius:`{list.option.border.radius}`},optionGroup:{background:`{list.option.group.background}`,color:`{list.option.group.color}`,fontWeight:`{list.option.group.font.weight}`,padding:`{list.option.group.padding}`},dropdown:{width:`2.5rem`,sm:{width:`2rem`},lg:{width:`3rem`},borderColor:`{form.field.border.color}`,hoverBorderColor:`{form.field.border.color}`,activeBorderColor:`{form.field.border.color}`,borderRadius:`{form.field.border.radius}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},chip:{borderRadius:`{border.radius.sm}`},emptyMessage:{padding:`{list.option.padding}`},colorScheme:{light:{chip:{focusBackground:`{surface.200}`,focusColor:`{surface.800}`},dropdown:{background:`{surface.100}`,hoverBackground:`{surface.200}`,activeBackground:`{surface.300}`,color:`{surface.600}`,hoverColor:`{surface.700}`,activeColor:`{surface.800}`}},dark:{chip:{focusBackground:`{surface.700}`,focusColor:`{surface.0}`},dropdown:{background:`{surface.800}`,hoverBackground:`{surface.700}`,activeBackground:`{surface.600}`,color:`{surface.300}`,hoverColor:`{surface.200}`,activeColor:`{surface.100}`}}}},j_={root:{width:`2rem`,height:`2rem`,fontSize:`1rem`,background:`{content.border.color}`,color:`{content.color}`,borderRadius:`{content.border.radius}`},icon:{size:`1rem`},group:{borderColor:`{content.background}`,offset:`-0.75rem`},lg:{width:`3rem`,height:`3rem`,fontSize:`1.5rem`,icon:{size:`1.5rem`},group:{offset:`-1rem`}},xl:{width:`4rem`,height:`4rem`,fontSize:`2rem`,icon:{size:`2rem`},group:{offset:`-1.5rem`}}},M_={root:{borderRadius:`{border.radius.md}`,padding:`0 0.5rem`,fontSize:`0.75rem`,fontWeight:`700`,minWidth:`1.5rem`,height:`1.5rem`},dot:{size:`0.5rem`},sm:{fontSize:`0.625rem`,minWidth:`1.25rem`,height:`1.25rem`},lg:{fontSize:`0.875rem`,minWidth:`1.75rem`,height:`1.75rem`},xl:{fontSize:`1rem`,minWidth:`2rem`,height:`2rem`},colorScheme:{light:{primary:{background:`{primary.color}`,color:`{primary.contrast.color}`},secondary:{background:`{surface.100}`,color:`{surface.600}`},success:{background:`{green.500}`,color:`{surface.0}`},info:{background:`{sky.500}`,color:`{surface.0}`},warn:{background:`{orange.500}`,color:`{surface.0}`},danger:{background:`{red.500}`,color:`{surface.0}`},contrast:{background:`{surface.950}`,color:`{surface.0}`}},dark:{primary:{background:`{primary.color}`,color:`{primary.contrast.color}`},secondary:{background:`{surface.800}`,color:`{surface.300}`},success:{background:`{green.400}`,color:`{green.950}`},info:{background:`{sky.400}`,color:`{sky.950}`},warn:{background:`{orange.400}`,color:`{orange.950}`},danger:{background:`{red.400}`,color:`{red.950}`},contrast:{background:`{surface.0}`,color:`{surface.950}`}}}},N_={primitive:{borderRadius:{none:`0`,xs:`2px`,sm:`4px`,md:`6px`,lg:`8px`,xl:`12px`},emerald:{50:`#ecfdf5`,100:`#d1fae5`,200:`#a7f3d0`,300:`#6ee7b7`,400:`#34d399`,500:`#10b981`,600:`#059669`,700:`#047857`,800:`#065f46`,900:`#064e3b`,950:`#022c22`},green:{50:`#f0fdf4`,100:`#dcfce7`,200:`#bbf7d0`,300:`#86efac`,400:`#4ade80`,500:`#22c55e`,600:`#16a34a`,700:`#15803d`,800:`#166534`,900:`#14532d`,950:`#052e16`},lime:{50:`#f7fee7`,100:`#ecfccb`,200:`#d9f99d`,300:`#bef264`,400:`#a3e635`,500:`#84cc16`,600:`#65a30d`,700:`#4d7c0f`,800:`#3f6212`,900:`#365314`,950:`#1a2e05`},red:{50:`#fef2f2`,100:`#fee2e2`,200:`#fecaca`,300:`#fca5a5`,400:`#f87171`,500:`#ef4444`,600:`#dc2626`,700:`#b91c1c`,800:`#991b1b`,900:`#7f1d1d`,950:`#450a0a`},orange:{50:`#fff7ed`,100:`#ffedd5`,200:`#fed7aa`,300:`#fdba74`,400:`#fb923c`,500:`#f97316`,600:`#ea580c`,700:`#c2410c`,800:`#9a3412`,900:`#7c2d12`,950:`#431407`},amber:{50:`#fffbeb`,100:`#fef3c7`,200:`#fde68a`,300:`#fcd34d`,400:`#fbbf24`,500:`#f59e0b`,600:`#d97706`,700:`#b45309`,800:`#92400e`,900:`#78350f`,950:`#451a03`},yellow:{50:`#fefce8`,100:`#fef9c3`,200:`#fef08a`,300:`#fde047`,400:`#facc15`,500:`#eab308`,600:`#ca8a04`,700:`#a16207`,800:`#854d0e`,900:`#713f12`,950:`#422006`},teal:{50:`#f0fdfa`,100:`#ccfbf1`,200:`#99f6e4`,300:`#5eead4`,400:`#2dd4bf`,500:`#14b8a6`,600:`#0d9488`,700:`#0f766e`,800:`#115e59`,900:`#134e4a`,950:`#042f2e`},cyan:{50:`#ecfeff`,100:`#cffafe`,200:`#a5f3fc`,300:`#67e8f9`,400:`#22d3ee`,500:`#06b6d4`,600:`#0891b2`,700:`#0e7490`,800:`#155e75`,900:`#164e63`,950:`#083344`},sky:{50:`#f0f9ff`,100:`#e0f2fe`,200:`#bae6fd`,300:`#7dd3fc`,400:`#38bdf8`,500:`#0ea5e9`,600:`#0284c7`,700:`#0369a1`,800:`#075985`,900:`#0c4a6e`,950:`#082f49`},blue:{50:`#eff6ff`,100:`#dbeafe`,200:`#bfdbfe`,300:`#93c5fd`,400:`#60a5fa`,500:`#3b82f6`,600:`#2563eb`,700:`#1d4ed8`,800:`#1e40af`,900:`#1e3a8a`,950:`#172554`},indigo:{50:`#eef2ff`,100:`#e0e7ff`,200:`#c7d2fe`,300:`#a5b4fc`,400:`#818cf8`,500:`#6366f1`,600:`#4f46e5`,700:`#4338ca`,800:`#3730a3`,900:`#312e81`,950:`#1e1b4b`},violet:{50:`#f5f3ff`,100:`#ede9fe`,200:`#ddd6fe`,300:`#c4b5fd`,400:`#a78bfa`,500:`#8b5cf6`,600:`#7c3aed`,700:`#6d28d9`,800:`#5b21b6`,900:`#4c1d95`,950:`#2e1065`},purple:{50:`#faf5ff`,100:`#f3e8ff`,200:`#e9d5ff`,300:`#d8b4fe`,400:`#c084fc`,500:`#a855f7`,600:`#9333ea`,700:`#7e22ce`,800:`#6b21a8`,900:`#581c87`,950:`#3b0764`},fuchsia:{50:`#fdf4ff`,100:`#fae8ff`,200:`#f5d0fe`,300:`#f0abfc`,400:`#e879f9`,500:`#d946ef`,600:`#c026d3`,700:`#a21caf`,800:`#86198f`,900:`#701a75`,950:`#4a044e`},pink:{50:`#fdf2f8`,100:`#fce7f3`,200:`#fbcfe8`,300:`#f9a8d4`,400:`#f472b6`,500:`#ec4899`,600:`#db2777`,700:`#be185d`,800:`#9d174d`,900:`#831843`,950:`#500724`},rose:{50:`#fff1f2`,100:`#ffe4e6`,200:`#fecdd3`,300:`#fda4af`,400:`#fb7185`,500:`#f43f5e`,600:`#e11d48`,700:`#be123c`,800:`#9f1239`,900:`#881337`,950:`#4c0519`},slate:{50:`#f8fafc`,100:`#f1f5f9`,200:`#e2e8f0`,300:`#cbd5e1`,400:`#94a3b8`,500:`#64748b`,600:`#475569`,700:`#334155`,800:`#1e293b`,900:`#0f172a`,950:`#020617`},gray:{50:`#f9fafb`,100:`#f3f4f6`,200:`#e5e7eb`,300:`#d1d5db`,400:`#9ca3af`,500:`#6b7280`,600:`#4b5563`,700:`#374151`,800:`#1f2937`,900:`#111827`,950:`#030712`},zinc:{50:`#fafafa`,100:`#f4f4f5`,200:`#e4e4e7`,300:`#d4d4d8`,400:`#a1a1aa`,500:`#71717a`,600:`#52525b`,700:`#3f3f46`,800:`#27272a`,900:`#18181b`,950:`#09090b`},neutral:{50:`#fafafa`,100:`#f5f5f5`,200:`#e5e5e5`,300:`#d4d4d4`,400:`#a3a3a3`,500:`#737373`,600:`#525252`,700:`#404040`,800:`#262626`,900:`#171717`,950:`#0a0a0a`},stone:{50:`#fafaf9`,100:`#f5f5f4`,200:`#e7e5e4`,300:`#d6d3d1`,400:`#a8a29e`,500:`#78716c`,600:`#57534e`,700:`#44403c`,800:`#292524`,900:`#1c1917`,950:`#0c0a09`}},semantic:{transitionDuration:`0.2s`,focusRing:{width:`1px`,style:`solid`,color:`{primary.color}`,offset:`2px`,shadow:`none`},disabledOpacity:`0.6`,iconSize:`1rem`,anchorGutter:`2px`,primary:{50:`{emerald.50}`,100:`{emerald.100}`,200:`{emerald.200}`,300:`{emerald.300}`,400:`{emerald.400}`,500:`{emerald.500}`,600:`{emerald.600}`,700:`{emerald.700}`,800:`{emerald.800}`,900:`{emerald.900}`,950:`{emerald.950}`},formField:{paddingX:`0.75rem`,paddingY:`0.5rem`,sm:{fontSize:`0.875rem`,paddingX:`0.625rem`,paddingY:`0.375rem`},lg:{fontSize:`1.125rem`,paddingX:`0.875rem`,paddingY:`0.625rem`},borderRadius:`{border.radius.md}`,focusRing:{width:`0`,style:`none`,color:`transparent`,offset:`0`,shadow:`none`},transitionDuration:`{transition.duration}`},list:{padding:`0.25rem 0.25rem`,gap:`2px`,header:{padding:`0.5rem 1rem 0.25rem 1rem`},option:{padding:`0.5rem 0.75rem`,borderRadius:`{border.radius.sm}`},optionGroup:{padding:`0.5rem 0.75rem`,fontWeight:`600`}},content:{borderRadius:`{border.radius.md}`},mask:{transitionDuration:`0.3s`},navigation:{list:{padding:`0.25rem 0.25rem`,gap:`2px`},item:{padding:`0.5rem 0.75rem`,borderRadius:`{border.radius.sm}`,gap:`0.5rem`},submenuLabel:{padding:`0.5rem 0.75rem`,fontWeight:`600`},submenuIcon:{size:`0.875rem`}},overlay:{select:{borderRadius:`{border.radius.md}`,shadow:`0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)`},popover:{borderRadius:`{border.radius.md}`,padding:`0.75rem`,shadow:`0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)`},modal:{borderRadius:`{border.radius.xl}`,padding:`1.25rem`,shadow:`0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)`},navigation:{shadow:`0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)`}},colorScheme:{light:{surface:{0:`#ffffff`,50:`{slate.50}`,100:`{slate.100}`,200:`{slate.200}`,300:`{slate.300}`,400:`{slate.400}`,500:`{slate.500}`,600:`{slate.600}`,700:`{slate.700}`,800:`{slate.800}`,900:`{slate.900}`,950:`{slate.950}`},primary:{color:`{primary.500}`,contrastColor:`#ffffff`,hoverColor:`{primary.600}`,activeColor:`{primary.700}`},highlight:{background:`{primary.50}`,focusBackground:`{primary.100}`,color:`{primary.700}`,focusColor:`{primary.800}`},mask:{background:`rgba(0,0,0,0.4)`,color:`{surface.200}`},formField:{background:`{surface.0}`,disabledBackground:`{surface.200}`,filledBackground:`{surface.50}`,filledHoverBackground:`{surface.50}`,filledFocusBackground:`{surface.50}`,borderColor:`{surface.300}`,hoverBorderColor:`{surface.400}`,focusBorderColor:`{primary.color}`,invalidBorderColor:`{red.400}`,color:`{surface.700}`,disabledColor:`{surface.500}`,placeholderColor:`{surface.500}`,invalidPlaceholderColor:`{red.600}`,floatLabelColor:`{surface.500}`,floatLabelFocusColor:`{primary.600}`,floatLabelActiveColor:`{surface.500}`,floatLabelInvalidColor:`{form.field.invalid.placeholder.color}`,iconColor:`{surface.400}`,shadow:`0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)`},text:{color:`{surface.700}`,hoverColor:`{surface.800}`,mutedColor:`{surface.500}`,hoverMutedColor:`{surface.600}`},content:{background:`{surface.0}`,hoverBackground:`{surface.100}`,borderColor:`{surface.200}`,color:`{text.color}`,hoverColor:`{text.hover.color}`},overlay:{select:{background:`{surface.0}`,borderColor:`{surface.200}`,color:`{text.color}`},popover:{background:`{surface.0}`,borderColor:`{surface.200}`,color:`{text.color}`},modal:{background:`{surface.0}`,borderColor:`{surface.200}`,color:`{text.color}`}},list:{option:{focusBackground:`{surface.100}`,selectedBackground:`{highlight.background}`,selectedFocusBackground:`{highlight.focus.background}`,color:`{text.color}`,focusColor:`{text.hover.color}`,selectedColor:`{highlight.color}`,selectedFocusColor:`{highlight.focus.color}`,icon:{color:`{surface.400}`,focusColor:`{surface.500}`}},optionGroup:{background:`transparent`,color:`{text.muted.color}`}},navigation:{item:{focusBackground:`{surface.100}`,activeBackground:`{surface.100}`,color:`{text.color}`,focusColor:`{text.hover.color}`,activeColor:`{text.hover.color}`,icon:{color:`{surface.400}`,focusColor:`{surface.500}`,activeColor:`{surface.500}`}},submenuLabel:{background:`transparent`,color:`{text.muted.color}`},submenuIcon:{color:`{surface.400}`,focusColor:`{surface.500}`,activeColor:`{surface.500}`}}},dark:{surface:{0:`#ffffff`,50:`{zinc.50}`,100:`{zinc.100}`,200:`{zinc.200}`,300:`{zinc.300}`,400:`{zinc.400}`,500:`{zinc.500}`,600:`{zinc.600}`,700:`{zinc.700}`,800:`{zinc.800}`,900:`{zinc.900}`,950:`{zinc.950}`},primary:{color:`{primary.400}`,contrastColor:`{surface.900}`,hoverColor:`{primary.300}`,activeColor:`{primary.200}`},highlight:{background:`color-mix(in srgb, {primary.400}, transparent 84%)`,focusBackground:`color-mix(in srgb, {primary.400}, transparent 76%)`,color:`rgba(255,255,255,.87)`,focusColor:`rgba(255,255,255,.87)`},mask:{background:`rgba(0,0,0,0.6)`,color:`{surface.200}`},formField:{background:`{surface.950}`,disabledBackground:`{surface.700}`,filledBackground:`{surface.800}`,filledHoverBackground:`{surface.800}`,filledFocusBackground:`{surface.800}`,borderColor:`{surface.600}`,hoverBorderColor:`{surface.500}`,focusBorderColor:`{primary.color}`,invalidBorderColor:`{red.300}`,color:`{surface.0}`,disabledColor:`{surface.400}`,placeholderColor:`{surface.400}`,invalidPlaceholderColor:`{red.400}`,floatLabelColor:`{surface.400}`,floatLabelFocusColor:`{primary.color}`,floatLabelActiveColor:`{surface.400}`,floatLabelInvalidColor:`{form.field.invalid.placeholder.color}`,iconColor:`{surface.400}`,shadow:`0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)`},text:{color:`{surface.0}`,hoverColor:`{surface.0}`,mutedColor:`{surface.400}`,hoverMutedColor:`{surface.300}`},content:{background:`{surface.900}`,hoverBackground:`{surface.800}`,borderColor:`{surface.700}`,color:`{text.color}`,hoverColor:`{text.hover.color}`},overlay:{select:{background:`{surface.900}`,borderColor:`{surface.700}`,color:`{text.color}`},popover:{background:`{surface.900}`,borderColor:`{surface.700}`,color:`{text.color}`},modal:{background:`{surface.900}`,borderColor:`{surface.700}`,color:`{text.color}`}},list:{option:{focusBackground:`{surface.800}`,selectedBackground:`{highlight.background}`,selectedFocusBackground:`{highlight.focus.background}`,color:`{text.color}`,focusColor:`{text.hover.color}`,selectedColor:`{highlight.color}`,selectedFocusColor:`{highlight.focus.color}`,icon:{color:`{surface.500}`,focusColor:`{surface.400}`}},optionGroup:{background:`transparent`,color:`{text.muted.color}`}},navigation:{item:{focusBackground:`{surface.800}`,activeBackground:`{surface.800}`,color:`{text.color}`,focusColor:`{text.hover.color}`,activeColor:`{text.hover.color}`,icon:{color:`{surface.500}`,focusColor:`{surface.400}`,activeColor:`{surface.400}`}},submenuLabel:{background:`transparent`,color:`{text.muted.color}`},submenuIcon:{color:`{surface.500}`,focusColor:`{surface.400}`,activeColor:`{surface.400}`}}}}}},P_={root:{borderRadius:`{content.border.radius}`}},F_={root:{padding:`1rem`,background:`{content.background}`,gap:`0.5rem`,transitionDuration:`{transition.duration}`},item:{color:`{text.muted.color}`,hoverColor:`{text.color}`,borderRadius:`{content.border.radius}`,gap:`{navigation.item.gap}`,icon:{color:`{navigation.item.icon.color}`,hoverColor:`{navigation.item.icon.focus.color}`},focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},separator:{color:`{navigation.item.icon.color}`}},I_={root:{borderRadius:`{form.field.border.radius}`,roundedBorderRadius:`2rem`,gap:`0.5rem`,paddingX:`{form.field.padding.x}`,paddingY:`{form.field.padding.y}`,iconOnlyWidth:`2.5rem`,sm:{fontSize:`{form.field.sm.font.size}`,paddingX:`{form.field.sm.padding.x}`,paddingY:`{form.field.sm.padding.y}`,iconOnlyWidth:`2rem`},lg:{fontSize:`{form.field.lg.font.size}`,paddingX:`{form.field.lg.padding.x}`,paddingY:`{form.field.lg.padding.y}`,iconOnlyWidth:`3rem`},label:{fontWeight:`500`},raisedShadow:`0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,offset:`{focus.ring.offset}`},badgeSize:`1rem`,transitionDuration:`{form.field.transition.duration}`},colorScheme:{light:{root:{primary:{background:`{primary.color}`,hoverBackground:`{primary.hover.color}`,activeBackground:`{primary.active.color}`,borderColor:`{primary.color}`,hoverBorderColor:`{primary.hover.color}`,activeBorderColor:`{primary.active.color}`,color:`{primary.contrast.color}`,hoverColor:`{primary.contrast.color}`,activeColor:`{primary.contrast.color}`,focusRing:{color:`{primary.color}`,shadow:`none`}},secondary:{background:`{surface.100}`,hoverBackground:`{surface.200}`,activeBackground:`{surface.300}`,borderColor:`{surface.100}`,hoverBorderColor:`{surface.200}`,activeBorderColor:`{surface.300}`,color:`{surface.600}`,hoverColor:`{surface.700}`,activeColor:`{surface.800}`,focusRing:{color:`{surface.600}`,shadow:`none`}},info:{background:`{sky.500}`,hoverBackground:`{sky.600}`,activeBackground:`{sky.700}`,borderColor:`{sky.500}`,hoverBorderColor:`{sky.600}`,activeBorderColor:`{sky.700}`,color:`#ffffff`,hoverColor:`#ffffff`,activeColor:`#ffffff`,focusRing:{color:`{sky.500}`,shadow:`none`}},success:{background:`{green.500}`,hoverBackground:`{green.600}`,activeBackground:`{green.700}`,borderColor:`{green.500}`,hoverBorderColor:`{green.600}`,activeBorderColor:`{green.700}`,color:`#ffffff`,hoverColor:`#ffffff`,activeColor:`#ffffff`,focusRing:{color:`{green.500}`,shadow:`none`}},warn:{background:`{orange.500}`,hoverBackground:`{orange.600}`,activeBackground:`{orange.700}`,borderColor:`{orange.500}`,hoverBorderColor:`{orange.600}`,activeBorderColor:`{orange.700}`,color:`#ffffff`,hoverColor:`#ffffff`,activeColor:`#ffffff`,focusRing:{color:`{orange.500}`,shadow:`none`}},help:{background:`{purple.500}`,hoverBackground:`{purple.600}`,activeBackground:`{purple.700}`,borderColor:`{purple.500}`,hoverBorderColor:`{purple.600}`,activeBorderColor:`{purple.700}`,color:`#ffffff`,hoverColor:`#ffffff`,activeColor:`#ffffff`,focusRing:{color:`{purple.500}`,shadow:`none`}},danger:{background:`{red.500}`,hoverBackground:`{red.600}`,activeBackground:`{red.700}`,borderColor:`{red.500}`,hoverBorderColor:`{red.600}`,activeBorderColor:`{red.700}`,color:`#ffffff`,hoverColor:`#ffffff`,activeColor:`#ffffff`,focusRing:{color:`{red.500}`,shadow:`none`}},contrast:{background:`{surface.950}`,hoverBackground:`{surface.900}`,activeBackground:`{surface.800}`,borderColor:`{surface.950}`,hoverBorderColor:`{surface.900}`,activeBorderColor:`{surface.800}`,color:`{surface.0}`,hoverColor:`{surface.0}`,activeColor:`{surface.0}`,focusRing:{color:`{surface.950}`,shadow:`none`}}},outlined:{primary:{hoverBackground:`{primary.50}`,activeBackground:`{primary.100}`,borderColor:`{primary.200}`,color:`{primary.color}`},secondary:{hoverBackground:`{surface.50}`,activeBackground:`{surface.100}`,borderColor:`{surface.200}`,color:`{surface.500}`},success:{hoverBackground:`{green.50}`,activeBackground:`{green.100}`,borderColor:`{green.200}`,color:`{green.500}`},info:{hoverBackground:`{sky.50}`,activeBackground:`{sky.100}`,borderColor:`{sky.200}`,color:`{sky.500}`},warn:{hoverBackground:`{orange.50}`,activeBackground:`{orange.100}`,borderColor:`{orange.200}`,color:`{orange.500}`},help:{hoverBackground:`{purple.50}`,activeBackground:`{purple.100}`,borderColor:`{purple.200}`,color:`{purple.500}`},danger:{hoverBackground:`{red.50}`,activeBackground:`{red.100}`,borderColor:`{red.200}`,color:`{red.500}`},contrast:{hoverBackground:`{surface.50}`,activeBackground:`{surface.100}`,borderColor:`{surface.700}`,color:`{surface.950}`},plain:{hoverBackground:`{surface.50}`,activeBackground:`{surface.100}`,borderColor:`{surface.200}`,color:`{surface.700}`}},text:{primary:{hoverBackground:`{primary.50}`,activeBackground:`{primary.100}`,color:`{primary.color}`},secondary:{hoverBackground:`{surface.50}`,activeBackground:`{surface.100}`,color:`{surface.500}`},success:{hoverBackground:`{green.50}`,activeBackground:`{green.100}`,color:`{green.500}`},info:{hoverBackground:`{sky.50}`,activeBackground:`{sky.100}`,color:`{sky.500}`},warn:{hoverBackground:`{orange.50}`,activeBackground:`{orange.100}`,color:`{orange.500}`},help:{hoverBackground:`{purple.50}`,activeBackground:`{purple.100}`,color:`{purple.500}`},danger:{hoverBackground:`{red.50}`,activeBackground:`{red.100}`,color:`{red.500}`},contrast:{hoverBackground:`{surface.50}`,activeBackground:`{surface.100}`,color:`{surface.950}`},plain:{hoverBackground:`{surface.50}`,activeBackground:`{surface.100}`,color:`{surface.700}`}},link:{color:`{primary.color}`,hoverColor:`{primary.color}`,activeColor:`{primary.color}`}},dark:{root:{primary:{background:`{primary.color}`,hoverBackground:`{primary.hover.color}`,activeBackground:`{primary.active.color}`,borderColor:`{primary.color}`,hoverBorderColor:`{primary.hover.color}`,activeBorderColor:`{primary.active.color}`,color:`{primary.contrast.color}`,hoverColor:`{primary.contrast.color}`,activeColor:`{primary.contrast.color}`,focusRing:{color:`{primary.color}`,shadow:`none`}},secondary:{background:`{surface.800}`,hoverBackground:`{surface.700}`,activeBackground:`{surface.600}`,borderColor:`{surface.800}`,hoverBorderColor:`{surface.700}`,activeBorderColor:`{surface.600}`,color:`{surface.300}`,hoverColor:`{surface.200}`,activeColor:`{surface.100}`,focusRing:{color:`{surface.300}`,shadow:`none`}},info:{background:`{sky.400}`,hoverBackground:`{sky.300}`,activeBackground:`{sky.200}`,borderColor:`{sky.400}`,hoverBorderColor:`{sky.300}`,activeBorderColor:`{sky.200}`,color:`{sky.950}`,hoverColor:`{sky.950}`,activeColor:`{sky.950}`,focusRing:{color:`{sky.400}`,shadow:`none`}},success:{background:`{green.400}`,hoverBackground:`{green.300}`,activeBackground:`{green.200}`,borderColor:`{green.400}`,hoverBorderColor:`{green.300}`,activeBorderColor:`{green.200}`,color:`{green.950}`,hoverColor:`{green.950}`,activeColor:`{green.950}`,focusRing:{color:`{green.400}`,shadow:`none`}},warn:{background:`{orange.400}`,hoverBackground:`{orange.300}`,activeBackground:`{orange.200}`,borderColor:`{orange.400}`,hoverBorderColor:`{orange.300}`,activeBorderColor:`{orange.200}`,color:`{orange.950}`,hoverColor:`{orange.950}`,activeColor:`{orange.950}`,focusRing:{color:`{orange.400}`,shadow:`none`}},help:{background:`{purple.400}`,hoverBackground:`{purple.300}`,activeBackground:`{purple.200}`,borderColor:`{purple.400}`,hoverBorderColor:`{purple.300}`,activeBorderColor:`{purple.200}`,color:`{purple.950}`,hoverColor:`{purple.950}`,activeColor:`{purple.950}`,focusRing:{color:`{purple.400}`,shadow:`none`}},danger:{background:`{red.400}`,hoverBackground:`{red.300}`,activeBackground:`{red.200}`,borderColor:`{red.400}`,hoverBorderColor:`{red.300}`,activeBorderColor:`{red.200}`,color:`{red.950}`,hoverColor:`{red.950}`,activeColor:`{red.950}`,focusRing:{color:`{red.400}`,shadow:`none`}},contrast:{background:`{surface.0}`,hoverBackground:`{surface.100}`,activeBackground:`{surface.200}`,borderColor:`{surface.0}`,hoverBorderColor:`{surface.100}`,activeBorderColor:`{surface.200}`,color:`{surface.950}`,hoverColor:`{surface.950}`,activeColor:`{surface.950}`,focusRing:{color:`{surface.0}`,shadow:`none`}}},outlined:{primary:{hoverBackground:`color-mix(in srgb, {primary.color}, transparent 96%)`,activeBackground:`color-mix(in srgb, {primary.color}, transparent 84%)`,borderColor:`{primary.700}`,color:`{primary.color}`},secondary:{hoverBackground:`rgba(255,255,255,0.04)`,activeBackground:`rgba(255,255,255,0.16)`,borderColor:`{surface.700}`,color:`{surface.400}`},success:{hoverBackground:`color-mix(in srgb, {green.400}, transparent 96%)`,activeBackground:`color-mix(in srgb, {green.400}, transparent 84%)`,borderColor:`{green.700}`,color:`{green.400}`},info:{hoverBackground:`color-mix(in srgb, {sky.400}, transparent 96%)`,activeBackground:`color-mix(in srgb, {sky.400}, transparent 84%)`,borderColor:`{sky.700}`,color:`{sky.400}`},warn:{hoverBackground:`color-mix(in srgb, {orange.400}, transparent 96%)`,activeBackground:`color-mix(in srgb, {orange.400}, transparent 84%)`,borderColor:`{orange.700}`,color:`{orange.400}`},help:{hoverBackground:`color-mix(in srgb, {purple.400}, transparent 96%)`,activeBackground:`color-mix(in srgb, {purple.400}, transparent 84%)`,borderColor:`{purple.700}`,color:`{purple.400}`},danger:{hoverBackground:`color-mix(in srgb, {red.400}, transparent 96%)`,activeBackground:`color-mix(in srgb, {red.400}, transparent 84%)`,borderColor:`{red.700}`,color:`{red.400}`},contrast:{hoverBackground:`{surface.800}`,activeBackground:`{surface.700}`,borderColor:`{surface.500}`,color:`{surface.0}`},plain:{hoverBackground:`{surface.800}`,activeBackground:`{surface.700}`,borderColor:`{surface.600}`,color:`{surface.0}`}},text:{primary:{hoverBackground:`color-mix(in srgb, {primary.color}, transparent 96%)`,activeBackground:`color-mix(in srgb, {primary.color}, transparent 84%)`,color:`{primary.color}`},secondary:{hoverBackground:`{surface.800}`,activeBackground:`{surface.700}`,color:`{surface.400}`},success:{hoverBackground:`color-mix(in srgb, {green.400}, transparent 96%)`,activeBackground:`color-mix(in srgb, {green.400}, transparent 84%)`,color:`{green.400}`},info:{hoverBackground:`color-mix(in srgb, {sky.400}, transparent 96%)`,activeBackground:`color-mix(in srgb, {sky.400}, transparent 84%)`,color:`{sky.400}`},warn:{hoverBackground:`color-mix(in srgb, {orange.400}, transparent 96%)`,activeBackground:`color-mix(in srgb, {orange.400}, transparent 84%)`,color:`{orange.400}`},help:{hoverBackground:`color-mix(in srgb, {purple.400}, transparent 96%)`,activeBackground:`color-mix(in srgb, {purple.400}, transparent 84%)`,color:`{purple.400}`},danger:{hoverBackground:`color-mix(in srgb, {red.400}, transparent 96%)`,activeBackground:`color-mix(in srgb, {red.400}, transparent 84%)`,color:`{red.400}`},contrast:{hoverBackground:`{surface.800}`,activeBackground:`{surface.700}`,color:`{surface.0}`},plain:{hoverBackground:`{surface.800}`,activeBackground:`{surface.700}`,color:`{surface.0}`}},link:{color:`{primary.color}`,hoverColor:`{primary.color}`,activeColor:`{primary.color}`}}}},L_={root:{background:`{content.background}`,borderRadius:`{border.radius.xl}`,color:`{content.color}`,shadow:`0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)`},body:{padding:`1.25rem`,gap:`0.5rem`},caption:{gap:`0.5rem`},title:{fontSize:`1.25rem`,fontWeight:`500`},subtitle:{color:`{text.muted.color}`}},R_={root:{transitionDuration:`{transition.duration}`},content:{gap:`0.25rem`},indicatorList:{padding:`1rem`,gap:`0.5rem`},indicator:{width:`2rem`,height:`0.5rem`,borderRadius:`{content.border.radius}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},colorScheme:{light:{indicator:{background:`{surface.200}`,hoverBackground:`{surface.300}`,activeBackground:`{primary.color}`}},dark:{indicator:{background:`{surface.700}`,hoverBackground:`{surface.600}`,activeBackground:`{primary.color}`}}}},z_={root:{background:`{form.field.background}`,disabledBackground:`{form.field.disabled.background}`,filledBackground:`{form.field.filled.background}`,filledHoverBackground:`{form.field.filled.hover.background}`,filledFocusBackground:`{form.field.filled.focus.background}`,borderColor:`{form.field.border.color}`,hoverBorderColor:`{form.field.hover.border.color}`,focusBorderColor:`{form.field.focus.border.color}`,invalidBorderColor:`{form.field.invalid.border.color}`,color:`{form.field.color}`,disabledColor:`{form.field.disabled.color}`,placeholderColor:`{form.field.placeholder.color}`,invalidPlaceholderColor:`{form.field.invalid.placeholder.color}`,shadow:`{form.field.shadow}`,paddingX:`{form.field.padding.x}`,paddingY:`{form.field.padding.y}`,borderRadius:`{form.field.border.radius}`,focusRing:{width:`{form.field.focus.ring.width}`,style:`{form.field.focus.ring.style}`,color:`{form.field.focus.ring.color}`,offset:`{form.field.focus.ring.offset}`,shadow:`{form.field.focus.ring.shadow}`},transitionDuration:`{form.field.transition.duration}`,sm:{fontSize:`{form.field.sm.font.size}`,paddingX:`{form.field.sm.padding.x}`,paddingY:`{form.field.sm.padding.y}`},lg:{fontSize:`{form.field.lg.font.size}`,paddingX:`{form.field.lg.padding.x}`,paddingY:`{form.field.lg.padding.y}`}},dropdown:{width:`2.5rem`,color:`{form.field.icon.color}`},overlay:{background:`{overlay.select.background}`,borderColor:`{overlay.select.border.color}`,borderRadius:`{overlay.select.border.radius}`,color:`{overlay.select.color}`,shadow:`{overlay.select.shadow}`},list:{padding:`{list.padding}`,gap:`{list.gap}`,mobileIndent:`1rem`},option:{focusBackground:`{list.option.focus.background}`,selectedBackground:`{list.option.selected.background}`,selectedFocusBackground:`{list.option.selected.focus.background}`,color:`{list.option.color}`,focusColor:`{list.option.focus.color}`,selectedColor:`{list.option.selected.color}`,selectedFocusColor:`{list.option.selected.focus.color}`,padding:`{list.option.padding}`,borderRadius:`{list.option.border.radius}`,icon:{color:`{list.option.icon.color}`,focusColor:`{list.option.icon.focus.color}`,size:`0.875rem`}},clearIcon:{color:`{form.field.icon.color}`}},B_={root:{borderRadius:`{border.radius.sm}`,width:`1.25rem`,height:`1.25rem`,background:`{form.field.background}`,checkedBackground:`{primary.color}`,checkedHoverBackground:`{primary.hover.color}`,disabledBackground:`{form.field.disabled.background}`,filledBackground:`{form.field.filled.background}`,borderColor:`{form.field.border.color}`,hoverBorderColor:`{form.field.hover.border.color}`,focusBorderColor:`{form.field.border.color}`,checkedBorderColor:`{primary.color}`,checkedHoverBorderColor:`{primary.hover.color}`,checkedFocusBorderColor:`{primary.color}`,checkedDisabledBorderColor:`{form.field.border.color}`,invalidBorderColor:`{form.field.invalid.border.color}`,shadow:`{form.field.shadow}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`},transitionDuration:`{form.field.transition.duration}`,sm:{width:`1rem`,height:`1rem`},lg:{width:`1.5rem`,height:`1.5rem`}},icon:{size:`0.875rem`,color:`{form.field.color}`,checkedColor:`{primary.contrast.color}`,checkedHoverColor:`{primary.contrast.color}`,disabledColor:`{form.field.disabled.color}`,sm:{size:`0.75rem`},lg:{size:`1rem`}}},V_={root:{borderRadius:`16px`,paddingX:`0.75rem`,paddingY:`0.5rem`,gap:`0.5rem`,transitionDuration:`{transition.duration}`},image:{width:`2rem`,height:`2rem`},icon:{size:`1rem`},removeIcon:{size:`1rem`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{form.field.focus.ring.shadow}`}},colorScheme:{light:{root:{background:`{surface.100}`,color:`{surface.800}`},icon:{color:`{surface.800}`},removeIcon:{color:`{surface.800}`}},dark:{root:{background:`{surface.800}`,color:`{surface.0}`},icon:{color:`{surface.0}`},removeIcon:{color:`{surface.0}`}}}},H_={root:{transitionDuration:`{transition.duration}`},preview:{width:`1.5rem`,height:`1.5rem`,borderRadius:`{form.field.border.radius}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},panel:{shadow:`{overlay.popover.shadow}`,borderRadius:`{overlay.popover.borderRadius}`},colorScheme:{light:{panel:{background:`{surface.800}`,borderColor:`{surface.900}`},handle:{color:`{surface.0}`}},dark:{panel:{background:`{surface.900}`,borderColor:`{surface.700}`},handle:{color:`{surface.0}`}}}},U_={icon:{size:`2rem`,color:`{overlay.modal.color}`},content:{gap:`1rem`}},W_={root:{background:`{overlay.popover.background}`,borderColor:`{overlay.popover.border.color}`,color:`{overlay.popover.color}`,borderRadius:`{overlay.popover.border.radius}`,shadow:`{overlay.popover.shadow}`,gutter:`10px`,arrowOffset:`1.25rem`},content:{padding:`{overlay.popover.padding}`,gap:`1rem`},icon:{size:`1.5rem`,color:`{overlay.popover.color}`},footer:{gap:`0.5rem`,padding:`0 {overlay.popover.padding} {overlay.popover.padding} {overlay.popover.padding}`}},G_={root:{background:`{content.background}`,borderColor:`{content.border.color}`,color:`{content.color}`,borderRadius:`{content.border.radius}`,shadow:`{overlay.navigation.shadow}`,transitionDuration:`{transition.duration}`},list:{padding:`{navigation.list.padding}`,gap:`{navigation.list.gap}`},item:{focusBackground:`{navigation.item.focus.background}`,activeBackground:`{navigation.item.active.background}`,color:`{navigation.item.color}`,focusColor:`{navigation.item.focus.color}`,activeColor:`{navigation.item.active.color}`,padding:`{navigation.item.padding}`,borderRadius:`{navigation.item.border.radius}`,gap:`{navigation.item.gap}`,icon:{color:`{navigation.item.icon.color}`,focusColor:`{navigation.item.icon.focus.color}`,activeColor:`{navigation.item.icon.active.color}`}},submenu:{mobileIndent:`1rem`},submenuIcon:{size:`{navigation.submenu.icon.size}`,color:`{navigation.submenu.icon.color}`,focusColor:`{navigation.submenu.icon.focus.color}`,activeColor:`{navigation.submenu.icon.active.color}`},separator:{borderColor:`{content.border.color}`}},K_=`
    li.p-autocomplete-option,
    div.p-cascadeselect-option-content,
    li.p-listbox-option,
    li.p-multiselect-option,
    li.p-select-option,
    li.p-listbox-option,
    div.p-tree-node-content,
    li.p-datatable-filter-constraint,
    .p-datatable .p-datatable-tbody > tr,
    .p-treetable .p-treetable-tbody > tr,
    div.p-menu-item-content,
    div.p-tieredmenu-item-content,
    div.p-contextmenu-item-content,
    div.p-menubar-item-content,
    div.p-megamenu-item-content,
    div.p-panelmenu-header-content,
    div.p-panelmenu-item-content,
    th.p-datatable-header-cell,
    th.p-treetable-header-cell,
    thead.p-datatable-thead > tr > th,
    .p-treetable thead.p-treetable-thead>tr>th {
        transition: none;
    }
`,q_={root:{transitionDuration:`{transition.duration}`},header:{background:`{content.background}`,borderColor:`{datatable.border.color}`,color:`{content.color}`,borderWidth:`0 0 1px 0`,padding:`0.75rem 1rem`,sm:{padding:`0.375rem 0.5rem`},lg:{padding:`1rem 1.25rem`}},headerCell:{background:`{content.background}`,hoverBackground:`{content.hover.background}`,selectedBackground:`{highlight.background}`,borderColor:`{datatable.border.color}`,color:`{content.color}`,hoverColor:`{content.hover.color}`,selectedColor:`{highlight.color}`,gap:`0.5rem`,padding:`0.75rem 1rem`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`-1px`,shadow:`{focus.ring.shadow}`},sm:{padding:`0.375rem 0.5rem`},lg:{padding:`1rem 1.25rem`}},columnTitle:{fontWeight:`600`},row:{background:`{content.background}`,hoverBackground:`{content.hover.background}`,selectedBackground:`{highlight.background}`,color:`{content.color}`,hoverColor:`{content.hover.color}`,selectedColor:`{highlight.color}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`-1px`,shadow:`{focus.ring.shadow}`}},bodyCell:{borderColor:`{datatable.border.color}`,padding:`0.75rem 1rem`,sm:{padding:`0.375rem 0.5rem`},lg:{padding:`1rem 1.25rem`}},footerCell:{background:`{content.background}`,borderColor:`{datatable.border.color}`,color:`{content.color}`,padding:`0.75rem 1rem`,sm:{padding:`0.375rem 0.5rem`},lg:{padding:`1rem 1.25rem`}},columnFooter:{fontWeight:`600`},footer:{background:`{content.background}`,borderColor:`{datatable.border.color}`,color:`{content.color}`,borderWidth:`0 0 1px 0`,padding:`0.75rem 1rem`,sm:{padding:`0.375rem 0.5rem`},lg:{padding:`1rem 1.25rem`}},dropPoint:{color:`{primary.color}`},columnResizer:{width:`0.5rem`},resizeIndicator:{width:`1px`,color:`{primary.color}`},sortIcon:{color:`{text.muted.color}`,hoverColor:`{text.hover.muted.color}`,size:`0.875rem`},loadingIcon:{size:`2rem`},rowToggleButton:{hoverBackground:`{content.hover.background}`,selectedHoverBackground:`{content.background}`,color:`{text.muted.color}`,hoverColor:`{text.color}`,selectedHoverColor:`{primary.color}`,size:`1.75rem`,borderRadius:`50%`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},filter:{inlineGap:`0.5rem`,overlaySelect:{background:`{overlay.select.background}`,borderColor:`{overlay.select.border.color}`,borderRadius:`{overlay.select.border.radius}`,color:`{overlay.select.color}`,shadow:`{overlay.select.shadow}`},overlayPopover:{background:`{overlay.popover.background}`,borderColor:`{overlay.popover.border.color}`,borderRadius:`{overlay.popover.border.radius}`,color:`{overlay.popover.color}`,shadow:`{overlay.popover.shadow}`,padding:`{overlay.popover.padding}`,gap:`0.5rem`},rule:{borderColor:`{content.border.color}`},constraintList:{padding:`{list.padding}`,gap:`{list.gap}`},constraint:{focusBackground:`{list.option.focus.background}`,selectedBackground:`{list.option.selected.background}`,selectedFocusBackground:`{list.option.selected.focus.background}`,color:`{list.option.color}`,focusColor:`{list.option.focus.color}`,selectedColor:`{list.option.selected.color}`,selectedFocusColor:`{list.option.selected.focus.color}`,separator:{borderColor:`{content.border.color}`},padding:`{list.option.padding}`,borderRadius:`{list.option.border.radius}`}},paginatorTop:{borderColor:`{datatable.border.color}`,borderWidth:`0 0 1px 0`},paginatorBottom:{borderColor:`{datatable.border.color}`,borderWidth:`0 0 1px 0`},colorScheme:{light:{root:{borderColor:`{content.border.color}`},row:{stripedBackground:`{surface.50}`},bodyCell:{selectedBorderColor:`{primary.100}`}},dark:{root:{borderColor:`{surface.800}`},row:{stripedBackground:`{surface.950}`},bodyCell:{selectedBorderColor:`{primary.900}`}}},css:`
    .p-datatable-mask.p-overlay-mask {
        --px-mask-background: light-dark(rgba(255,255,255,0.5),rgba(0,0,0,0.3));
    }
`},J_={root:{borderColor:`transparent`,borderWidth:`0`,borderRadius:`0`,padding:`0`},header:{background:`{content.background}`,color:`{content.color}`,borderColor:`{content.border.color}`,borderWidth:`0 0 1px 0`,padding:`0.75rem 1rem`,borderRadius:`0`},content:{background:`{content.background}`,color:`{content.color}`,borderColor:`transparent`,borderWidth:`0`,padding:`0`,borderRadius:`0`},footer:{background:`{content.background}`,color:`{content.color}`,borderColor:`{content.border.color}`,borderWidth:`1px 0 0 0`,padding:`0.75rem 1rem`,borderRadius:`0`},paginatorTop:{borderColor:`{content.border.color}`,borderWidth:`0 0 1px 0`},paginatorBottom:{borderColor:`{content.border.color}`,borderWidth:`1px 0 0 0`}},Y_={root:{transitionDuration:`{transition.duration}`},panel:{background:`{content.background}`,borderColor:`{content.border.color}`,color:`{content.color}`,borderRadius:`{content.border.radius}`,shadow:`{overlay.popover.shadow}`,padding:`{overlay.popover.padding}`},header:{background:`{content.background}`,borderColor:`{content.border.color}`,color:`{content.color}`,padding:`0 0 0.5rem 0`},title:{gap:`0.5rem`,fontWeight:`500`},dropdown:{width:`2.5rem`,sm:{width:`2rem`},lg:{width:`3rem`},borderColor:`{form.field.border.color}`,hoverBorderColor:`{form.field.border.color}`,activeBorderColor:`{form.field.border.color}`,borderRadius:`{form.field.border.radius}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},inputIcon:{color:`{form.field.icon.color}`},selectMonth:{hoverBackground:`{content.hover.background}`,color:`{content.color}`,hoverColor:`{content.hover.color}`,padding:`0.25rem 0.5rem`,borderRadius:`{content.border.radius}`},selectYear:{hoverBackground:`{content.hover.background}`,color:`{content.color}`,hoverColor:`{content.hover.color}`,padding:`0.25rem 0.5rem`,borderRadius:`{content.border.radius}`},group:{borderColor:`{content.border.color}`,gap:`{overlay.popover.padding}`},dayView:{margin:`0.5rem 0 0 0`},weekDay:{padding:`0.25rem`,fontWeight:`500`,color:`{content.color}`},date:{hoverBackground:`{content.hover.background}`,selectedBackground:`{primary.color}`,rangeSelectedBackground:`{highlight.background}`,color:`{content.color}`,hoverColor:`{content.hover.color}`,selectedColor:`{primary.contrast.color}`,rangeSelectedColor:`{highlight.color}`,width:`2rem`,height:`2rem`,borderRadius:`50%`,padding:`0.25rem`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},monthView:{margin:`0.5rem 0 0 0`},month:{padding:`0.375rem`,borderRadius:`{content.border.radius}`},yearView:{margin:`0.5rem 0 0 0`},year:{padding:`0.375rem`,borderRadius:`{content.border.radius}`},buttonbar:{padding:`0.5rem 0 0 0`,borderColor:`{content.border.color}`},timePicker:{padding:`0.5rem 0 0 0`,borderColor:`{content.border.color}`,gap:`0.5rem`,buttonGap:`0.25rem`},colorScheme:{light:{dropdown:{background:`{surface.100}`,hoverBackground:`{surface.200}`,activeBackground:`{surface.300}`,color:`{surface.600}`,hoverColor:`{surface.700}`,activeColor:`{surface.800}`},today:{background:`{surface.200}`,color:`{surface.900}`}},dark:{dropdown:{background:`{surface.800}`,hoverBackground:`{surface.700}`,activeBackground:`{surface.600}`,color:`{surface.300}`,hoverColor:`{surface.200}`,activeColor:`{surface.100}`},today:{background:`{surface.700}`,color:`{surface.0}`}}}},X_={root:{background:`{overlay.modal.background}`,borderColor:`{overlay.modal.border.color}`,color:`{overlay.modal.color}`,borderRadius:`{overlay.modal.border.radius}`,shadow:`{overlay.modal.shadow}`},header:{padding:`{overlay.modal.padding}`,gap:`0.5rem`},title:{fontSize:`1.25rem`,fontWeight:`600`},content:{padding:`0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}`},footer:{padding:`0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}`,gap:`0.5rem`}},Z_={root:{borderColor:`{content.border.color}`},content:{background:`{content.background}`,color:`{text.color}`},horizontal:{margin:`1rem 0`,padding:`0 1rem`,content:{padding:`0 0.5rem`}},vertical:{margin:`0 1rem`,padding:`0.5rem 0`,content:{padding:`0.5rem 0`}}},Q_={root:{background:`rgba(255, 255, 255, 0.1)`,borderColor:`rgba(255, 255, 255, 0.2)`,padding:`0.5rem`,borderRadius:`{border.radius.xl}`},item:{borderRadius:`{content.border.radius}`,padding:`0.5rem`,size:`3rem`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}}},$_={root:{background:`{overlay.modal.background}`,borderColor:`{overlay.modal.border.color}`,color:`{overlay.modal.color}`,shadow:`{overlay.modal.shadow}`},header:{padding:`{overlay.modal.padding}`},title:{fontSize:`1.5rem`,fontWeight:`600`},content:{padding:`0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}`},footer:{padding:`{overlay.modal.padding}`}},ev={toolbar:{background:`{content.background}`,borderColor:`{content.border.color}`,borderRadius:`{content.border.radius}`},toolbarItem:{color:`{text.muted.color}`,hoverColor:`{text.color}`,activeColor:`{primary.color}`},overlay:{background:`{overlay.select.background}`,borderColor:`{overlay.select.border.color}`,borderRadius:`{overlay.select.border.radius}`,color:`{overlay.select.color}`,shadow:`{overlay.select.shadow}`,padding:`{list.padding}`},overlayOption:{focusBackground:`{list.option.focus.background}`,color:`{list.option.color}`,focusColor:`{list.option.focus.color}`,padding:`{list.option.padding}`,borderRadius:`{list.option.border.radius}`},content:{background:`{content.background}`,borderColor:`{content.border.color}`,color:`{content.color}`,borderRadius:`{content.border.radius}`}},tv={root:{background:`{content.background}`,borderColor:`{content.border.color}`,borderRadius:`{content.border.radius}`,color:`{content.color}`,padding:`0 1.125rem 1.125rem 1.125rem`,transitionDuration:`{transition.duration}`},legend:{background:`{content.background}`,hoverBackground:`{content.hover.background}`,color:`{content.color}`,hoverColor:`{content.hover.color}`,borderRadius:`{content.border.radius}`,borderWidth:`1px`,borderColor:`transparent`,padding:`0.5rem 0.75rem`,gap:`0.5rem`,fontWeight:`600`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},toggleIcon:{color:`{text.muted.color}`,hoverColor:`{text.hover.muted.color}`},content:{padding:`0`}},nv={root:{background:`{content.background}`,borderColor:`{content.border.color}`,color:`{content.color}`,borderRadius:`{content.border.radius}`,transitionDuration:`{transition.duration}`},header:{background:`transparent`,color:`{text.color}`,padding:`1.125rem`,borderColor:`unset`,borderWidth:`0`,borderRadius:`0`,gap:`0.5rem`},content:{highlightBorderColor:`{primary.color}`,padding:`0 1.125rem 1.125rem 1.125rem`,gap:`1rem`},file:{padding:`1rem`,gap:`1rem`,borderColor:`{content.border.color}`,info:{gap:`0.5rem`}},fileList:{gap:`0.5rem`},progressbar:{height:`0.25rem`},basic:{gap:`0.5rem`}},rv={root:{color:`{form.field.float.label.color}`,focusColor:`{form.field.float.label.focus.color}`,activeColor:`{form.field.float.label.active.color}`,invalidColor:`{form.field.float.label.invalid.color}`,transitionDuration:`0.2s`,positionX:`{form.field.padding.x}`,positionY:`{form.field.padding.y}`,fontWeight:`500`,active:{fontSize:`0.75rem`,fontWeight:`400`}},over:{active:{top:`-1.25rem`}},in:{input:{paddingTop:`1.5rem`,paddingBottom:`{form.field.padding.y}`},active:{top:`{form.field.padding.y}`}},on:{borderRadius:`{border.radius.xs}`,active:{background:`{form.field.background}`,padding:`0 0.125rem`}}},iv={root:{borderWidth:`1px`,borderColor:`{content.border.color}`,borderRadius:`{content.border.radius}`,transitionDuration:`{transition.duration}`},navButton:{background:`rgba(255, 255, 255, 0.1)`,hoverBackground:`rgba(255, 255, 255, 0.2)`,color:`{surface.100}`,hoverColor:`{surface.0}`,size:`3rem`,gutter:`0.5rem`,prev:{borderRadius:`50%`},next:{borderRadius:`50%`},focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},navIcon:{size:`1.5rem`},thumbnailsContent:{background:`{content.background}`,padding:`1rem 0.25rem`},thumbnailNavButton:{size:`2rem`,borderRadius:`{content.border.radius}`,gutter:`0.5rem`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},thumbnailNavButtonIcon:{size:`1rem`},caption:{background:`rgba(0, 0, 0, 0.5)`,color:`{surface.100}`,padding:`1rem`},indicatorList:{gap:`0.5rem`,padding:`1rem`},indicatorButton:{width:`1rem`,height:`1rem`,activeBackground:`{primary.color}`,borderRadius:`50%`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},insetIndicatorList:{background:`rgba(0, 0, 0, 0.5)`},insetIndicatorButton:{background:`rgba(255, 255, 255, 0.4)`,hoverBackground:`rgba(255, 255, 255, 0.6)`,activeBackground:`rgba(255, 255, 255, 0.9)`},closeButton:{size:`3rem`,gutter:`0.5rem`,background:`rgba(255, 255, 255, 0.1)`,hoverBackground:`rgba(255, 255, 255, 0.2)`,color:`{surface.50}`,hoverColor:`{surface.0}`,borderRadius:`50%`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},closeButtonIcon:{size:`1.5rem`},colorScheme:{light:{thumbnailNavButton:{hoverBackground:`{surface.100}`,color:`{surface.600}`,hoverColor:`{surface.700}`},indicatorButton:{background:`{surface.200}`,hoverBackground:`{surface.300}`}},dark:{thumbnailNavButton:{hoverBackground:`{surface.700}`,color:`{surface.400}`,hoverColor:`{surface.0}`},indicatorButton:{background:`{surface.700}`,hoverBackground:`{surface.600}`}}}},av={icon:{color:`{form.field.icon.color}`}},ov={root:{color:`{form.field.float.label.color}`,focusColor:`{form.field.float.label.focus.color}`,invalidColor:`{form.field.float.label.invalid.color}`,transitionDuration:`0.2s`,positionX:`{form.field.padding.x}`,top:`{form.field.padding.y}`,fontSize:`0.75rem`,fontWeight:`400`},input:{paddingTop:`1.5rem`,paddingBottom:`{form.field.padding.y}`}},sv={root:{transitionDuration:`{transition.duration}`},preview:{icon:{size:`1.5rem`},mask:{background:`{mask.background}`,color:`{mask.color}`}},toolbar:{position:{left:`auto`,right:`1rem`,top:`1rem`,bottom:`auto`},blur:`8px`,background:`rgba(255,255,255,0.1)`,borderColor:`rgba(255,255,255,0.2)`,borderWidth:`1px`,borderRadius:`30px`,padding:`.5rem`,gap:`0.5rem`},action:{hoverBackground:`rgba(255,255,255,0.1)`,color:`{surface.50}`,hoverColor:`{surface.0}`,size:`3rem`,iconSize:`1.5rem`,borderRadius:`50%`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}}},cv={handle:{size:`15px`,hoverSize:`30px`,background:`rgba(255,255,255,0.3)`,hoverBackground:`rgba(255,255,255,0.3)`,borderColor:`unset`,hoverBorderColor:`unset`,borderWidth:`0`,borderRadius:`50%`,transitionDuration:`{transition.duration}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`rgba(255,255,255,0.3)`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}}},lv={root:{padding:`{form.field.padding.y} {form.field.padding.x}`,borderRadius:`{content.border.radius}`,gap:`0.5rem`},text:{fontWeight:`500`},icon:{size:`1rem`},colorScheme:{light:{info:{background:`color-mix(in srgb, {blue.50}, transparent 5%)`,borderColor:`{blue.200}`,color:`{blue.600}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)`},success:{background:`color-mix(in srgb, {green.50}, transparent 5%)`,borderColor:`{green.200}`,color:`{green.600}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)`},warn:{background:`color-mix(in srgb,{yellow.50}, transparent 5%)`,borderColor:`{yellow.200}`,color:`{yellow.600}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)`},error:{background:`color-mix(in srgb, {red.50}, transparent 5%)`,borderColor:`{red.200}`,color:`{red.600}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)`},secondary:{background:`{surface.100}`,borderColor:`{surface.200}`,color:`{surface.600}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)`},contrast:{background:`{surface.900}`,borderColor:`{surface.950}`,color:`{surface.50}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)`}},dark:{info:{background:`color-mix(in srgb, {blue.500}, transparent 84%)`,borderColor:`color-mix(in srgb, {blue.700}, transparent 64%)`,color:`{blue.500}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)`},success:{background:`color-mix(in srgb, {green.500}, transparent 84%)`,borderColor:`color-mix(in srgb, {green.700}, transparent 64%)`,color:`{green.500}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)`},warn:{background:`color-mix(in srgb, {yellow.500}, transparent 84%)`,borderColor:`color-mix(in srgb, {yellow.700}, transparent 64%)`,color:`{yellow.500}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)`},error:{background:`color-mix(in srgb, {red.500}, transparent 84%)`,borderColor:`color-mix(in srgb, {red.700}, transparent 64%)`,color:`{red.500}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)`},secondary:{background:`{surface.800}`,borderColor:`{surface.700}`,color:`{surface.300}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)`},contrast:{background:`{surface.0}`,borderColor:`{surface.100}`,color:`{surface.950}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)`}}}},uv={root:{padding:`{form.field.padding.y} {form.field.padding.x}`,borderRadius:`{content.border.radius}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`},transitionDuration:`{transition.duration}`},display:{hoverBackground:`{content.hover.background}`,hoverColor:`{content.hover.color}`}},dv={root:{background:`{form.field.background}`,disabledBackground:`{form.field.disabled.background}`,filledBackground:`{form.field.filled.background}`,filledFocusBackground:`{form.field.filled.focus.background}`,borderColor:`{form.field.border.color}`,hoverBorderColor:`{form.field.hover.border.color}`,focusBorderColor:`{form.field.focus.border.color}`,invalidBorderColor:`{form.field.invalid.border.color}`,color:`{form.field.color}`,disabledColor:`{form.field.disabled.color}`,placeholderColor:`{form.field.placeholder.color}`,shadow:`{form.field.shadow}`,paddingX:`{form.field.padding.x}`,paddingY:`{form.field.padding.y}`,borderRadius:`{form.field.border.radius}`,focusRing:{width:`{form.field.focus.ring.width}`,style:`{form.field.focus.ring.style}`,color:`{form.field.focus.ring.color}`,offset:`{form.field.focus.ring.offset}`,shadow:`{form.field.focus.ring.shadow}`},transitionDuration:`{form.field.transition.duration}`},chip:{borderRadius:`{border.radius.sm}`},colorScheme:{light:{chip:{focusBackground:`{surface.200}`,color:`{surface.800}`}},dark:{chip:{focusBackground:`{surface.700}`,color:`{surface.0}`}}}},fv={addon:{background:`{form.field.background}`,borderColor:`{form.field.border.color}`,color:`{form.field.icon.color}`,borderRadius:`{form.field.border.radius}`,padding:`0.5rem`,minWidth:`2.5rem`}},pv={root:{transitionDuration:`{transition.duration}`},button:{width:`2.5rem`,borderRadius:`{form.field.border.radius}`,verticalPadding:`{form.field.padding.y}`},colorScheme:{light:{button:{background:`transparent`,hoverBackground:`{surface.100}`,activeBackground:`{surface.200}`,borderColor:`{form.field.border.color}`,hoverBorderColor:`{form.field.border.color}`,activeBorderColor:`{form.field.border.color}`,color:`{surface.400}`,hoverColor:`{surface.500}`,activeColor:`{surface.600}`}},dark:{button:{background:`transparent`,hoverBackground:`{surface.800}`,activeBackground:`{surface.700}`,borderColor:`{form.field.border.color}`,hoverBorderColor:`{form.field.border.color}`,activeBorderColor:`{form.field.border.color}`,color:`{surface.400}`,hoverColor:`{surface.300}`,activeColor:`{surface.200}`}}}},mv={root:{gap:`0.5rem`},input:{width:`2.5rem`,sm:{width:`2rem`},lg:{width:`3rem`}}},hv={root:{background:`{form.field.background}`,disabledBackground:`{form.field.disabled.background}`,filledBackground:`{form.field.filled.background}`,filledHoverBackground:`{form.field.filled.hover.background}`,filledFocusBackground:`{form.field.filled.focus.background}`,borderColor:`{form.field.border.color}`,hoverBorderColor:`{form.field.hover.border.color}`,focusBorderColor:`{form.field.focus.border.color}`,invalidBorderColor:`{form.field.invalid.border.color}`,color:`{form.field.color}`,disabledColor:`{form.field.disabled.color}`,placeholderColor:`{form.field.placeholder.color}`,invalidPlaceholderColor:`{form.field.invalid.placeholder.color}`,shadow:`{form.field.shadow}`,paddingX:`{form.field.padding.x}`,paddingY:`{form.field.padding.y}`,borderRadius:`{form.field.border.radius}`,focusRing:{width:`{form.field.focus.ring.width}`,style:`{form.field.focus.ring.style}`,color:`{form.field.focus.ring.color}`,offset:`{form.field.focus.ring.offset}`,shadow:`{form.field.focus.ring.shadow}`},transitionDuration:`{form.field.transition.duration}`,sm:{fontSize:`{form.field.sm.font.size}`,paddingX:`{form.field.sm.padding.x}`,paddingY:`{form.field.sm.padding.y}`},lg:{fontSize:`{form.field.lg.font.size}`,paddingX:`{form.field.lg.padding.x}`,paddingY:`{form.field.lg.padding.y}`}}},gv={root:{transitionDuration:`{transition.duration}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},value:{background:`{primary.color}`},range:{background:`{content.border.color}`},text:{color:`{text.muted.color}`}},_v={root:{background:`{form.field.background}`,disabledBackground:`{form.field.disabled.background}`,borderColor:`{form.field.border.color}`,invalidBorderColor:`{form.field.invalid.border.color}`,color:`{form.field.color}`,disabledColor:`{form.field.disabled.color}`,shadow:`{form.field.shadow}`,borderRadius:`{form.field.border.radius}`,transitionDuration:`{form.field.transition.duration}`},list:{padding:`{list.padding}`,gap:`{list.gap}`,header:{padding:`{list.header.padding}`}},option:{focusBackground:`{list.option.focus.background}`,selectedBackground:`{list.option.selected.background}`,selectedFocusBackground:`{list.option.selected.focus.background}`,color:`{list.option.color}`,focusColor:`{list.option.focus.color}`,selectedColor:`{list.option.selected.color}`,selectedFocusColor:`{list.option.selected.focus.color}`,padding:`{list.option.padding}`,borderRadius:`{list.option.border.radius}`},optionGroup:{background:`{list.option.group.background}`,color:`{list.option.group.color}`,fontWeight:`{list.option.group.font.weight}`,padding:`{list.option.group.padding}`},checkmark:{color:`{list.option.color}`,gutterStart:`-0.375rem`,gutterEnd:`0.375rem`},emptyMessage:{padding:`{list.option.padding}`},colorScheme:{light:{option:{stripedBackground:`{surface.50}`}},dark:{option:{stripedBackground:`{surface.900}`}}}},vv={root:{background:`{content.background}`,borderColor:`{content.border.color}`,borderRadius:`{content.border.radius}`,color:`{content.color}`,gap:`0.5rem`,verticalOrientation:{padding:`{navigation.list.padding}`,gap:`{navigation.list.gap}`},horizontalOrientation:{padding:`0.5rem 0.75rem`,gap:`0.5rem`},transitionDuration:`{transition.duration}`},baseItem:{borderRadius:`{content.border.radius}`,padding:`{navigation.item.padding}`},item:{focusBackground:`{navigation.item.focus.background}`,activeBackground:`{navigation.item.active.background}`,color:`{navigation.item.color}`,focusColor:`{navigation.item.focus.color}`,activeColor:`{navigation.item.active.color}`,padding:`{navigation.item.padding}`,borderRadius:`{navigation.item.border.radius}`,gap:`{navigation.item.gap}`,icon:{color:`{navigation.item.icon.color}`,focusColor:`{navigation.item.icon.focus.color}`,activeColor:`{navigation.item.icon.active.color}`}},overlay:{padding:`0`,background:`{content.background}`,borderColor:`{content.border.color}`,borderRadius:`{content.border.radius}`,color:`{content.color}`,shadow:`{overlay.navigation.shadow}`,gap:`0.5rem`},submenu:{padding:`{navigation.list.padding}`,gap:`{navigation.list.gap}`},submenuLabel:{padding:`{navigation.submenu.label.padding}`,fontWeight:`{navigation.submenu.label.font.weight}`,background:`{navigation.submenu.label.background}`,color:`{navigation.submenu.label.color}`},submenuIcon:{size:`{navigation.submenu.icon.size}`,color:`{navigation.submenu.icon.color}`,focusColor:`{navigation.submenu.icon.focus.color}`,activeColor:`{navigation.submenu.icon.active.color}`},separator:{borderColor:`{content.border.color}`},mobileButton:{borderRadius:`50%`,size:`1.75rem`,color:`{text.muted.color}`,hoverColor:`{text.hover.muted.color}`,hoverBackground:`{content.hover.background}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}}},yv={root:{background:`{content.background}`,borderColor:`{content.border.color}`,color:`{content.color}`,borderRadius:`{content.border.radius}`,shadow:`{overlay.navigation.shadow}`,transitionDuration:`{transition.duration}`},list:{padding:`{navigation.list.padding}`,gap:`{navigation.list.gap}`},item:{focusBackground:`{navigation.item.focus.background}`,color:`{navigation.item.color}`,focusColor:`{navigation.item.focus.color}`,padding:`{navigation.item.padding}`,borderRadius:`{navigation.item.border.radius}`,gap:`{navigation.item.gap}`,icon:{color:`{navigation.item.icon.color}`,focusColor:`{navigation.item.icon.focus.color}`}},submenuLabel:{padding:`{navigation.submenu.label.padding}`,fontWeight:`{navigation.submenu.label.font.weight}`,background:`{navigation.submenu.label.background}`,color:`{navigation.submenu.label.color}`},separator:{borderColor:`{content.border.color}`}},bv={root:{background:`{content.background}`,borderColor:`{content.border.color}`,borderRadius:`{content.border.radius}`,color:`{content.color}`,gap:`0.5rem`,padding:`0.5rem 0.75rem`,transitionDuration:`{transition.duration}`},baseItem:{borderRadius:`{content.border.radius}`,padding:`{navigation.item.padding}`},item:{focusBackground:`{navigation.item.focus.background}`,activeBackground:`{navigation.item.active.background}`,color:`{navigation.item.color}`,focusColor:`{navigation.item.focus.color}`,activeColor:`{navigation.item.active.color}`,padding:`{navigation.item.padding}`,borderRadius:`{navigation.item.border.radius}`,gap:`{navigation.item.gap}`,icon:{color:`{navigation.item.icon.color}`,focusColor:`{navigation.item.icon.focus.color}`,activeColor:`{navigation.item.icon.active.color}`}},submenu:{padding:`{navigation.list.padding}`,gap:`{navigation.list.gap}`,background:`{content.background}`,borderColor:`{content.border.color}`,borderRadius:`{content.border.radius}`,shadow:`{overlay.navigation.shadow}`,mobileIndent:`1rem`,icon:{size:`{navigation.submenu.icon.size}`,color:`{navigation.submenu.icon.color}`,focusColor:`{navigation.submenu.icon.focus.color}`,activeColor:`{navigation.submenu.icon.active.color}`}},separator:{borderColor:`{content.border.color}`},mobileButton:{borderRadius:`50%`,size:`1.75rem`,color:`{text.muted.color}`,hoverColor:`{text.hover.muted.color}`,hoverBackground:`{content.hover.background}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}}},xv={root:{borderRadius:`{content.border.radius}`,borderWidth:`1px`,transitionDuration:`{transition.duration}`},content:{padding:`0.5rem 0.75rem`,gap:`0.5rem`,sm:{padding:`0.375rem 0.625rem`},lg:{padding:`0.625rem 0.875rem`}},text:{fontSize:`1rem`,fontWeight:`500`,sm:{fontSize:`0.875rem`},lg:{fontSize:`1.125rem`}},icon:{size:`1.125rem`,sm:{size:`1rem`},lg:{size:`1.25rem`}},closeButton:{width:`1.75rem`,height:`1.75rem`,borderRadius:`50%`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,offset:`{focus.ring.offset}`}},closeIcon:{size:`1rem`,sm:{size:`0.875rem`},lg:{size:`1.125rem`}},outlined:{root:{borderWidth:`1px`}},simple:{content:{padding:`0`}},colorScheme:{light:{info:{background:`color-mix(in srgb, {blue.50}, transparent 5%)`,borderColor:`{blue.200}`,color:`{blue.600}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)`,closeButton:{hoverBackground:`{blue.100}`,focusRing:{color:`{blue.600}`,shadow:`none`}},outlined:{color:`{blue.600}`,borderColor:`{blue.600}`},simple:{color:`{blue.600}`}},success:{background:`color-mix(in srgb, {green.50}, transparent 5%)`,borderColor:`{green.200}`,color:`{green.600}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)`,closeButton:{hoverBackground:`{green.100}`,focusRing:{color:`{green.600}`,shadow:`none`}},outlined:{color:`{green.600}`,borderColor:`{green.600}`},simple:{color:`{green.600}`}},warn:{background:`color-mix(in srgb,{yellow.50}, transparent 5%)`,borderColor:`{yellow.200}`,color:`{yellow.600}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)`,closeButton:{hoverBackground:`{yellow.100}`,focusRing:{color:`{yellow.600}`,shadow:`none`}},outlined:{color:`{yellow.600}`,borderColor:`{yellow.600}`},simple:{color:`{yellow.600}`}},error:{background:`color-mix(in srgb, {red.50}, transparent 5%)`,borderColor:`{red.200}`,color:`{red.600}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)`,closeButton:{hoverBackground:`{red.100}`,focusRing:{color:`{red.600}`,shadow:`none`}},outlined:{color:`{red.600}`,borderColor:`{red.600}`},simple:{color:`{red.600}`}},secondary:{background:`{surface.100}`,borderColor:`{surface.200}`,color:`{surface.600}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)`,closeButton:{hoverBackground:`{surface.200}`,focusRing:{color:`{surface.600}`,shadow:`none`}},outlined:{color:`{surface.500}`,borderColor:`{surface.500}`},simple:{color:`{surface.500}`}},contrast:{background:`{surface.900}`,borderColor:`{surface.950}`,color:`{surface.50}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)`,closeButton:{hoverBackground:`{surface.800}`,focusRing:{color:`{surface.50}`,shadow:`none`}},outlined:{color:`{surface.950}`,borderColor:`{surface.950}`},simple:{color:`{surface.950}`}}},dark:{info:{background:`color-mix(in srgb, {blue.500}, transparent 84%)`,borderColor:`color-mix(in srgb, {blue.700}, transparent 64%)`,color:`{blue.500}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)`,closeButton:{hoverBackground:`rgba(255, 255, 255, 0.05)`,focusRing:{color:`{blue.500}`,shadow:`none`}},outlined:{color:`{blue.500}`,borderColor:`{blue.500}`},simple:{color:`{blue.500}`}},success:{background:`color-mix(in srgb, {green.500}, transparent 84%)`,borderColor:`color-mix(in srgb, {green.700}, transparent 64%)`,color:`{green.500}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)`,closeButton:{hoverBackground:`rgba(255, 255, 255, 0.05)`,focusRing:{color:`{green.500}`,shadow:`none`}},outlined:{color:`{green.500}`,borderColor:`{green.500}`},simple:{color:`{green.500}`}},warn:{background:`color-mix(in srgb, {yellow.500}, transparent 84%)`,borderColor:`color-mix(in srgb, {yellow.700}, transparent 64%)`,color:`{yellow.500}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)`,closeButton:{hoverBackground:`rgba(255, 255, 255, 0.05)`,focusRing:{color:`{yellow.500}`,shadow:`none`}},outlined:{color:`{yellow.500}`,borderColor:`{yellow.500}`},simple:{color:`{yellow.500}`}},error:{background:`color-mix(in srgb, {red.500}, transparent 84%)`,borderColor:`color-mix(in srgb, {red.700}, transparent 64%)`,color:`{red.500}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)`,closeButton:{hoverBackground:`rgba(255, 255, 255, 0.05)`,focusRing:{color:`{red.500}`,shadow:`none`}},outlined:{color:`{red.500}`,borderColor:`{red.500}`},simple:{color:`{red.500}`}},secondary:{background:`{surface.800}`,borderColor:`{surface.700}`,color:`{surface.300}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)`,closeButton:{hoverBackground:`{surface.700}`,focusRing:{color:`{surface.300}`,shadow:`none`}},outlined:{color:`{surface.400}`,borderColor:`{surface.400}`},simple:{color:`{surface.400}`}},contrast:{background:`{surface.0}`,borderColor:`{surface.100}`,color:`{surface.950}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)`,closeButton:{hoverBackground:`{surface.100}`,focusRing:{color:`{surface.950}`,shadow:`none`}},outlined:{color:`{surface.0}`,borderColor:`{surface.0}`},simple:{color:`{surface.0}`}}}}},Sv={root:{borderRadius:`{content.border.radius}`,gap:`1rem`},meters:{background:`{content.border.color}`,size:`0.5rem`},label:{gap:`0.5rem`},labelMarker:{size:`0.5rem`},labelIcon:{size:`1rem`},labelList:{verticalGap:`0.5rem`,horizontalGap:`1rem`}},Cv={root:{background:`{form.field.background}`,disabledBackground:`{form.field.disabled.background}`,filledBackground:`{form.field.filled.background}`,filledHoverBackground:`{form.field.filled.hover.background}`,filledFocusBackground:`{form.field.filled.focus.background}`,borderColor:`{form.field.border.color}`,hoverBorderColor:`{form.field.hover.border.color}`,focusBorderColor:`{form.field.focus.border.color}`,invalidBorderColor:`{form.field.invalid.border.color}`,color:`{form.field.color}`,disabledColor:`{form.field.disabled.color}`,placeholderColor:`{form.field.placeholder.color}`,invalidPlaceholderColor:`{form.field.invalid.placeholder.color}`,shadow:`{form.field.shadow}`,paddingX:`{form.field.padding.x}`,paddingY:`{form.field.padding.y}`,borderRadius:`{form.field.border.radius}`,focusRing:{width:`{form.field.focus.ring.width}`,style:`{form.field.focus.ring.style}`,color:`{form.field.focus.ring.color}`,offset:`{form.field.focus.ring.offset}`,shadow:`{form.field.focus.ring.shadow}`},transitionDuration:`{form.field.transition.duration}`,sm:{fontSize:`{form.field.sm.font.size}`,paddingX:`{form.field.sm.padding.x}`,paddingY:`{form.field.sm.padding.y}`},lg:{fontSize:`{form.field.lg.font.size}`,paddingX:`{form.field.lg.padding.x}`,paddingY:`{form.field.lg.padding.y}`}},dropdown:{width:`2.5rem`,color:`{form.field.icon.color}`},overlay:{background:`{overlay.select.background}`,borderColor:`{overlay.select.border.color}`,borderRadius:`{overlay.select.border.radius}`,color:`{overlay.select.color}`,shadow:`{overlay.select.shadow}`},list:{padding:`{list.padding}`,gap:`{list.gap}`,header:{padding:`{list.header.padding}`}},option:{focusBackground:`{list.option.focus.background}`,selectedBackground:`{list.option.selected.background}`,selectedFocusBackground:`{list.option.selected.focus.background}`,color:`{list.option.color}`,focusColor:`{list.option.focus.color}`,selectedColor:`{list.option.selected.color}`,selectedFocusColor:`{list.option.selected.focus.color}`,padding:`{list.option.padding}`,borderRadius:`{list.option.border.radius}`,gap:`0.5rem`},optionGroup:{background:`{list.option.group.background}`,color:`{list.option.group.color}`,fontWeight:`{list.option.group.font.weight}`,padding:`{list.option.group.padding}`},chip:{borderRadius:`{border.radius.sm}`},clearIcon:{color:`{form.field.icon.color}`},emptyMessage:{padding:`{list.option.padding}`}},wv={root:{gap:`1.125rem`},controls:{gap:`0.5rem`}},Tv={root:{gutter:`0.75rem`,transitionDuration:`{transition.duration}`},node:{background:`{content.background}`,hoverBackground:`{content.hover.background}`,selectedBackground:`{highlight.background}`,borderColor:`{content.border.color}`,color:`{content.color}`,selectedColor:`{highlight.color}`,hoverColor:`{content.hover.color}`,padding:`0.75rem 1rem`,toggleablePadding:`0.75rem 1rem 1.25rem 1rem`,borderRadius:`{content.border.radius}`},nodeToggleButton:{background:`{content.background}`,hoverBackground:`{content.hover.background}`,borderColor:`{content.border.color}`,color:`{text.muted.color}`,hoverColor:`{text.color}`,size:`1.5rem`,borderRadius:`50%`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},connector:{color:`{content.border.color}`,borderRadius:`{content.border.radius}`,height:`24px`}},Ev={root:{outline:{width:`2px`,color:`{content.background}`}}},Dv={root:{padding:`0.5rem 1rem`,gap:`0.25rem`,borderRadius:`{content.border.radius}`,background:`{content.background}`,color:`{content.color}`,transitionDuration:`{transition.duration}`},navButton:{background:`transparent`,hoverBackground:`{content.hover.background}`,selectedBackground:`{highlight.background}`,color:`{text.muted.color}`,hoverColor:`{text.hover.muted.color}`,selectedColor:`{highlight.color}`,width:`2.5rem`,height:`2.5rem`,borderRadius:`50%`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},currentPageReport:{color:`{text.muted.color}`},jumpToPageInput:{maxWidth:`2.5rem`}},Ov={root:{background:`{content.background}`,borderColor:`{content.border.color}`,color:`{content.color}`,borderRadius:`{content.border.radius}`},header:{background:`transparent`,color:`{text.color}`,padding:`1.125rem`,borderColor:`{content.border.color}`,borderWidth:`0`,borderRadius:`0`},toggleableHeader:{padding:`0.375rem 1.125rem`},title:{fontWeight:`600`},content:{padding:`0 1.125rem 1.125rem 1.125rem`},footer:{padding:`0 1.125rem 1.125rem 1.125rem`}},kv={root:{gap:`0.5rem`,transitionDuration:`{transition.duration}`},panel:{background:`{content.background}`,borderColor:`{content.border.color}`,borderWidth:`1px`,color:`{content.color}`,padding:`0.25rem 0.25rem`,borderRadius:`{content.border.radius}`,first:{borderWidth:`1px`,topBorderRadius:`{content.border.radius}`},last:{borderWidth:`1px`,bottomBorderRadius:`{content.border.radius}`}},item:{focusBackground:`{navigation.item.focus.background}`,color:`{navigation.item.color}`,focusColor:`{navigation.item.focus.color}`,gap:`0.5rem`,padding:`{navigation.item.padding}`,borderRadius:`{content.border.radius}`,icon:{color:`{navigation.item.icon.color}`,focusColor:`{navigation.item.icon.focus.color}`}},submenu:{indent:`1rem`},submenuIcon:{color:`{navigation.submenu.icon.color}`,focusColor:`{navigation.submenu.icon.focus.color}`}},Av={meter:{background:`{content.border.color}`,borderRadius:`{content.border.radius}`,height:`.75rem`},icon:{color:`{form.field.icon.color}`},overlay:{background:`{overlay.popover.background}`,borderColor:`{overlay.popover.border.color}`,borderRadius:`{overlay.popover.border.radius}`,color:`{overlay.popover.color}`,padding:`{overlay.popover.padding}`,shadow:`{overlay.popover.shadow}`},content:{gap:`0.5rem`},colorScheme:{light:{strength:{weakBackground:`{red.500}`,mediumBackground:`{amber.500}`,strongBackground:`{green.500}`}},dark:{strength:{weakBackground:`{red.400}`,mediumBackground:`{amber.400}`,strongBackground:`{green.400}`}}}},jv={root:{gap:`1.125rem`},controls:{gap:`0.5rem`}},Mv={root:{background:`{overlay.popover.background}`,borderColor:`{overlay.popover.border.color}`,color:`{overlay.popover.color}`,borderRadius:`{overlay.popover.border.radius}`,shadow:`{overlay.popover.shadow}`,gutter:`10px`,arrowOffset:`1.25rem`},content:{padding:`{overlay.popover.padding}`}},Nv={root:{background:`{content.border.color}`,borderRadius:`{content.border.radius}`,height:`1.25rem`},value:{background:`{primary.color}`},label:{color:`{primary.contrast.color}`,fontSize:`0.75rem`,fontWeight:`600`}},Pv={colorScheme:{light:{root:{colorOne:`{red.500}`,colorTwo:`{blue.500}`,colorThree:`{green.500}`,colorFour:`{yellow.500}`}},dark:{root:{colorOne:`{red.400}`,colorTwo:`{blue.400}`,colorThree:`{green.400}`,colorFour:`{yellow.400}`}}}},Fv={root:{width:`1.25rem`,height:`1.25rem`,background:`{form.field.background}`,checkedBackground:`{primary.color}`,checkedHoverBackground:`{primary.hover.color}`,disabledBackground:`{form.field.disabled.background}`,filledBackground:`{form.field.filled.background}`,borderColor:`{form.field.border.color}`,hoverBorderColor:`{form.field.hover.border.color}`,focusBorderColor:`{form.field.border.color}`,checkedBorderColor:`{primary.color}`,checkedHoverBorderColor:`{primary.hover.color}`,checkedFocusBorderColor:`{primary.color}`,checkedDisabledBorderColor:`{form.field.border.color}`,invalidBorderColor:`{form.field.invalid.border.color}`,shadow:`{form.field.shadow}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`},transitionDuration:`{form.field.transition.duration}`,sm:{width:`1rem`,height:`1rem`},lg:{width:`1.5rem`,height:`1.5rem`}},icon:{size:`0.75rem`,checkedColor:`{primary.contrast.color}`,checkedHoverColor:`{primary.contrast.color}`,disabledColor:`{form.field.disabled.color}`,sm:{size:`0.5rem`},lg:{size:`1rem`}}},Iv={root:{gap:`0.25rem`,transitionDuration:`{transition.duration}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},icon:{size:`1rem`,color:`{text.muted.color}`,hoverColor:`{primary.color}`,activeColor:`{primary.color}`}},Lv={colorScheme:{light:{root:{background:`rgba(0,0,0,0.1)`}},dark:{root:{background:`rgba(255,255,255,0.3)`}}}},Rv={root:{transitionDuration:`{transition.duration}`},bar:{size:`9px`,borderRadius:`{border.radius.sm}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},colorScheme:{light:{bar:{background:`{surface.100}`}},dark:{bar:{background:`{surface.800}`}}}},zv={root:{background:`{form.field.background}`,disabledBackground:`{form.field.disabled.background}`,filledBackground:`{form.field.filled.background}`,filledHoverBackground:`{form.field.filled.hover.background}`,filledFocusBackground:`{form.field.filled.focus.background}`,borderColor:`{form.field.border.color}`,hoverBorderColor:`{form.field.hover.border.color}`,focusBorderColor:`{form.field.focus.border.color}`,invalidBorderColor:`{form.field.invalid.border.color}`,color:`{form.field.color}`,disabledColor:`{form.field.disabled.color}`,placeholderColor:`{form.field.placeholder.color}`,invalidPlaceholderColor:`{form.field.invalid.placeholder.color}`,shadow:`{form.field.shadow}`,paddingX:`{form.field.padding.x}`,paddingY:`{form.field.padding.y}`,borderRadius:`{form.field.border.radius}`,focusRing:{width:`{form.field.focus.ring.width}`,style:`{form.field.focus.ring.style}`,color:`{form.field.focus.ring.color}`,offset:`{form.field.focus.ring.offset}`,shadow:`{form.field.focus.ring.shadow}`},transitionDuration:`{form.field.transition.duration}`,sm:{fontSize:`{form.field.sm.font.size}`,paddingX:`{form.field.sm.padding.x}`,paddingY:`{form.field.sm.padding.y}`},lg:{fontSize:`{form.field.lg.font.size}`,paddingX:`{form.field.lg.padding.x}`,paddingY:`{form.field.lg.padding.y}`}},dropdown:{width:`2.5rem`,color:`{form.field.icon.color}`},overlay:{background:`{overlay.select.background}`,borderColor:`{overlay.select.border.color}`,borderRadius:`{overlay.select.border.radius}`,color:`{overlay.select.color}`,shadow:`{overlay.select.shadow}`},list:{padding:`{list.padding}`,gap:`{list.gap}`,header:{padding:`{list.header.padding}`}},option:{focusBackground:`{list.option.focus.background}`,selectedBackground:`{list.option.selected.background}`,selectedFocusBackground:`{list.option.selected.focus.background}`,color:`{list.option.color}`,focusColor:`{list.option.focus.color}`,selectedColor:`{list.option.selected.color}`,selectedFocusColor:`{list.option.selected.focus.color}`,padding:`{list.option.padding}`,borderRadius:`{list.option.border.radius}`},optionGroup:{background:`{list.option.group.background}`,color:`{list.option.group.color}`,fontWeight:`{list.option.group.font.weight}`,padding:`{list.option.group.padding}`},clearIcon:{color:`{form.field.icon.color}`},checkmark:{color:`{list.option.color}`,gutterStart:`-0.375rem`,gutterEnd:`0.375rem`},emptyMessage:{padding:`{list.option.padding}`}},Bv={root:{borderRadius:`{form.field.border.radius}`},colorScheme:{light:{root:{invalidBorderColor:`{form.field.invalid.border.color}`}},dark:{root:{invalidBorderColor:`{form.field.invalid.border.color}`}}}},Vv={root:{borderRadius:`{content.border.radius}`},colorScheme:{light:{root:{background:`{surface.200}`,animationBackground:`rgba(255,255,255,0.4)`}},dark:{root:{background:`rgba(255, 255, 255, 0.06)`,animationBackground:`rgba(255, 255, 255, 0.04)`}}}},Hv={root:{transitionDuration:`{transition.duration}`},track:{background:`{content.border.color}`,borderRadius:`{content.border.radius}`,size:`3px`},range:{background:`{primary.color}`},handle:{width:`20px`,height:`20px`,borderRadius:`50%`,background:`{content.border.color}`,hoverBackground:`{content.border.color}`,content:{borderRadius:`50%`,hoverBackground:`{content.background}`,width:`16px`,height:`16px`,shadow:`0px 0.5px 0px 0px rgba(0, 0, 0, 0.08), 0px 1px 1px 0px rgba(0, 0, 0, 0.14)`},focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},colorScheme:{light:{handle:{content:{background:`{surface.0}`}}},dark:{handle:{content:{background:`{surface.950}`}}}}},Uv={root:{gap:`0.5rem`,transitionDuration:`{transition.duration}`}},Wv={root:{borderRadius:`{form.field.border.radius}`,roundedBorderRadius:`2rem`,raisedShadow:`0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)`}},Gv={root:{background:`{content.background}`,borderColor:`{content.border.color}`,color:`{content.color}`,transitionDuration:`{transition.duration}`},gutter:{background:`{content.border.color}`},handle:{size:`24px`,background:`transparent`,borderRadius:`{content.border.radius}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}}},Kv={root:{transitionDuration:`{transition.duration}`},separator:{background:`{content.border.color}`,activeBackground:`{primary.color}`,margin:`0 0 0 1.625rem`,size:`2px`},step:{padding:`0.5rem`,gap:`1rem`},stepHeader:{padding:`0`,borderRadius:`{content.border.radius}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`},gap:`0.5rem`},stepTitle:{color:`{text.muted.color}`,activeColor:`{primary.color}`,fontWeight:`500`},stepNumber:{background:`{content.background}`,activeBackground:`{content.background}`,borderColor:`{content.border.color}`,activeBorderColor:`{content.border.color}`,color:`{text.muted.color}`,activeColor:`{primary.color}`,size:`2rem`,fontSize:`1.143rem`,fontWeight:`500`,borderRadius:`50%`,shadow:`0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)`},steppanels:{padding:`0.875rem 0.5rem 1.125rem 0.5rem`},steppanel:{background:`{content.background}`,color:`{content.color}`,padding:`0`,indent:`1rem`}},qv={root:{transitionDuration:`{transition.duration}`},separator:{background:`{content.border.color}`},itemLink:{borderRadius:`{content.border.radius}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`},gap:`0.5rem`},itemLabel:{color:`{text.muted.color}`,activeColor:`{primary.color}`,fontWeight:`500`},itemNumber:{background:`{content.background}`,activeBackground:`{content.background}`,borderColor:`{content.border.color}`,activeBorderColor:`{content.border.color}`,color:`{text.muted.color}`,activeColor:`{primary.color}`,size:`2rem`,fontSize:`1.143rem`,fontWeight:`500`,borderRadius:`50%`,shadow:`0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)`}},Jv={root:{transitionDuration:`{transition.duration}`},tablist:{borderWidth:`0 0 1px 0`,background:`{content.background}`,borderColor:`{content.border.color}`},item:{background:`transparent`,hoverBackground:`transparent`,activeBackground:`transparent`,borderWidth:`0 0 1px 0`,borderColor:`{content.border.color}`,hoverBorderColor:`{content.border.color}`,activeBorderColor:`{primary.color}`,color:`{text.muted.color}`,hoverColor:`{text.color}`,activeColor:`{primary.color}`,padding:`1rem 1.125rem`,fontWeight:`600`,margin:`0 0 -1px 0`,gap:`0.5rem`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},itemIcon:{color:`{text.muted.color}`,hoverColor:`{text.color}`,activeColor:`{primary.color}`},activeBar:{height:`1px`,bottom:`-1px`,background:`{primary.color}`}},Yv={root:{transitionDuration:`{transition.duration}`},tablist:{borderWidth:`0 0 1px 0`,background:`{content.background}`,borderColor:`{content.border.color}`},tab:{background:`transparent`,hoverBackground:`transparent`,activeBackground:`transparent`,borderWidth:`0 0 1px 0`,borderColor:`{content.border.color}`,hoverBorderColor:`{content.border.color}`,activeBorderColor:`{primary.color}`,color:`{text.muted.color}`,hoverColor:`{text.color}`,activeColor:`{primary.color}`,padding:`1rem 1.125rem`,fontWeight:`600`,margin:`0 0 -1px 0`,gap:`0.5rem`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`-1px`,shadow:`{focus.ring.shadow}`}},tabpanel:{background:`{content.background}`,color:`{content.color}`,padding:`0.875rem 1.125rem 1.125rem 1.125rem`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`inset {focus.ring.shadow}`}},navButton:{background:`{content.background}`,color:`{text.muted.color}`,hoverColor:`{text.color}`,width:`2.5rem`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`-1px`,shadow:`{focus.ring.shadow}`}},activeBar:{height:`1px`,bottom:`-1px`,background:`{primary.color}`},colorScheme:{light:{navButton:{shadow:`0px 0px 10px 50px rgba(255, 255, 255, 0.6)`}},dark:{navButton:{shadow:`0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)`}}}},Xv={root:{transitionDuration:`{transition.duration}`},tabList:{background:`{content.background}`,borderColor:`{content.border.color}`},tab:{borderColor:`{content.border.color}`,activeBorderColor:`{primary.color}`,color:`{text.muted.color}`,hoverColor:`{text.color}`,activeColor:`{primary.color}`},tabPanel:{background:`{content.background}`,color:`{content.color}`},navButton:{background:`{content.background}`,color:`{text.muted.color}`,hoverColor:`{text.color}`},colorScheme:{light:{navButton:{shadow:`0px 0px 10px 50px rgba(255, 255, 255, 0.6)`}},dark:{navButton:{shadow:`0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)`}}}},Zv={root:{fontSize:`0.875rem`,fontWeight:`700`,padding:`0.25rem 0.5rem`,gap:`0.25rem`,borderRadius:`{content.border.radius}`,roundedBorderRadius:`{border.radius.xl}`},icon:{size:`0.75rem`},colorScheme:{light:{primary:{background:`{primary.100}`,color:`{primary.700}`},secondary:{background:`{surface.100}`,color:`{surface.600}`},success:{background:`{green.100}`,color:`{green.700}`},info:{background:`{sky.100}`,color:`{sky.700}`},warn:{background:`{orange.100}`,color:`{orange.700}`},danger:{background:`{red.100}`,color:`{red.700}`},contrast:{background:`{surface.950}`,color:`{surface.0}`}},dark:{primary:{background:`color-mix(in srgb, {primary.500}, transparent 84%)`,color:`{primary.300}`},secondary:{background:`{surface.800}`,color:`{surface.300}`},success:{background:`color-mix(in srgb, {green.500}, transparent 84%)`,color:`{green.300}`},info:{background:`color-mix(in srgb, {sky.500}, transparent 84%)`,color:`{sky.300}`},warn:{background:`color-mix(in srgb, {orange.500}, transparent 84%)`,color:`{orange.300}`},danger:{background:`color-mix(in srgb, {red.500}, transparent 84%)`,color:`{red.300}`},contrast:{background:`{surface.0}`,color:`{surface.950}`}}}},Qv={root:{background:`{form.field.background}`,borderColor:`{form.field.border.color}`,color:`{form.field.color}`,height:`18rem`,padding:`{form.field.padding.y} {form.field.padding.x}`,borderRadius:`{form.field.border.radius}`},prompt:{gap:`0.25rem`},commandResponse:{margin:`2px 0`}},$v={root:{background:`{form.field.background}`,disabledBackground:`{form.field.disabled.background}`,filledBackground:`{form.field.filled.background}`,filledHoverBackground:`{form.field.filled.hover.background}`,filledFocusBackground:`{form.field.filled.focus.background}`,borderColor:`{form.field.border.color}`,hoverBorderColor:`{form.field.hover.border.color}`,focusBorderColor:`{form.field.focus.border.color}`,invalidBorderColor:`{form.field.invalid.border.color}`,color:`{form.field.color}`,disabledColor:`{form.field.disabled.color}`,placeholderColor:`{form.field.placeholder.color}`,invalidPlaceholderColor:`{form.field.invalid.placeholder.color}`,shadow:`{form.field.shadow}`,paddingX:`{form.field.padding.x}`,paddingY:`{form.field.padding.y}`,borderRadius:`{form.field.border.radius}`,focusRing:{width:`{form.field.focus.ring.width}`,style:`{form.field.focus.ring.style}`,color:`{form.field.focus.ring.color}`,offset:`{form.field.focus.ring.offset}`,shadow:`{form.field.focus.ring.shadow}`},transitionDuration:`{form.field.transition.duration}`,sm:{fontSize:`{form.field.sm.font.size}`,paddingX:`{form.field.sm.padding.x}`,paddingY:`{form.field.sm.padding.y}`},lg:{fontSize:`{form.field.lg.font.size}`,paddingX:`{form.field.lg.padding.x}`,paddingY:`{form.field.lg.padding.y}`}}},ey={root:{background:`{content.background}`,borderColor:`{content.border.color}`,color:`{content.color}`,borderRadius:`{content.border.radius}`,shadow:`{overlay.navigation.shadow}`,transitionDuration:`{transition.duration}`},list:{padding:`{navigation.list.padding}`,gap:`{navigation.list.gap}`},item:{focusBackground:`{navigation.item.focus.background}`,activeBackground:`{navigation.item.active.background}`,color:`{navigation.item.color}`,focusColor:`{navigation.item.focus.color}`,activeColor:`{navigation.item.active.color}`,padding:`{navigation.item.padding}`,borderRadius:`{navigation.item.border.radius}`,gap:`{navigation.item.gap}`,icon:{color:`{navigation.item.icon.color}`,focusColor:`{navigation.item.icon.focus.color}`,activeColor:`{navigation.item.icon.active.color}`}},submenu:{mobileIndent:`1rem`},submenuIcon:{size:`{navigation.submenu.icon.size}`,color:`{navigation.submenu.icon.color}`,focusColor:`{navigation.submenu.icon.focus.color}`,activeColor:`{navigation.submenu.icon.active.color}`},separator:{borderColor:`{content.border.color}`}},ty={event:{minHeight:`5rem`},horizontal:{eventContent:{padding:`1rem 0`}},vertical:{eventContent:{padding:`0 1rem`}},eventMarker:{size:`1.125rem`,borderRadius:`50%`,borderWidth:`2px`,background:`{content.background}`,borderColor:`{content.border.color}`,content:{borderRadius:`50%`,size:`0.375rem`,background:`{primary.color}`,insetShadow:`0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)`}},eventConnector:{color:`{content.border.color}`,size:`2px`}},ny={root:{width:`25rem`,borderRadius:`{content.border.radius}`,borderWidth:`1px`,transitionDuration:`{transition.duration}`},icon:{size:`1.125rem`},content:{padding:`{overlay.popover.padding}`,gap:`0.5rem`},text:{gap:`0.5rem`},summary:{fontWeight:`500`,fontSize:`1rem`},detail:{fontWeight:`500`,fontSize:`0.875rem`},closeButton:{width:`1.75rem`,height:`1.75rem`,borderRadius:`50%`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,offset:`{focus.ring.offset}`}},closeIcon:{size:`1rem`},colorScheme:{light:{root:{blur:`1.5px`},info:{background:`color-mix(in srgb, {blue.50}, transparent 5%)`,borderColor:`{blue.200}`,color:`{blue.600}`,detailColor:`{surface.700}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)`,closeButton:{hoverBackground:`{blue.100}`,focusRing:{color:`{blue.600}`,shadow:`none`}}},success:{background:`color-mix(in srgb, {green.50}, transparent 5%)`,borderColor:`{green.200}`,color:`{green.600}`,detailColor:`{surface.700}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)`,closeButton:{hoverBackground:`{green.100}`,focusRing:{color:`{green.600}`,shadow:`none`}}},warn:{background:`color-mix(in srgb,{yellow.50}, transparent 5%)`,borderColor:`{yellow.200}`,color:`{yellow.600}`,detailColor:`{surface.700}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)`,closeButton:{hoverBackground:`{yellow.100}`,focusRing:{color:`{yellow.600}`,shadow:`none`}}},error:{background:`color-mix(in srgb, {red.50}, transparent 5%)`,borderColor:`{red.200}`,color:`{red.600}`,detailColor:`{surface.700}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)`,closeButton:{hoverBackground:`{red.100}`,focusRing:{color:`{red.600}`,shadow:`none`}}},secondary:{background:`{surface.100}`,borderColor:`{surface.200}`,color:`{surface.600}`,detailColor:`{surface.700}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)`,closeButton:{hoverBackground:`{surface.200}`,focusRing:{color:`{surface.600}`,shadow:`none`}}},contrast:{background:`{surface.900}`,borderColor:`{surface.950}`,color:`{surface.50}`,detailColor:`{surface.0}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)`,closeButton:{hoverBackground:`{surface.800}`,focusRing:{color:`{surface.50}`,shadow:`none`}}}},dark:{root:{blur:`10px`},info:{background:`color-mix(in srgb, {blue.500}, transparent 84%)`,borderColor:`color-mix(in srgb, {blue.700}, transparent 64%)`,color:`{blue.500}`,detailColor:`{surface.0}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)`,closeButton:{hoverBackground:`rgba(255, 255, 255, 0.05)`,focusRing:{color:`{blue.500}`,shadow:`none`}}},success:{background:`color-mix(in srgb, {green.500}, transparent 84%)`,borderColor:`color-mix(in srgb, {green.700}, transparent 64%)`,color:`{green.500}`,detailColor:`{surface.0}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)`,closeButton:{hoverBackground:`rgba(255, 255, 255, 0.05)`,focusRing:{color:`{green.500}`,shadow:`none`}}},warn:{background:`color-mix(in srgb, {yellow.500}, transparent 84%)`,borderColor:`color-mix(in srgb, {yellow.700}, transparent 64%)`,color:`{yellow.500}`,detailColor:`{surface.0}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)`,closeButton:{hoverBackground:`rgba(255, 255, 255, 0.05)`,focusRing:{color:`{yellow.500}`,shadow:`none`}}},error:{background:`color-mix(in srgb, {red.500}, transparent 84%)`,borderColor:`color-mix(in srgb, {red.700}, transparent 64%)`,color:`{red.500}`,detailColor:`{surface.0}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)`,closeButton:{hoverBackground:`rgba(255, 255, 255, 0.05)`,focusRing:{color:`{red.500}`,shadow:`none`}}},secondary:{background:`{surface.800}`,borderColor:`{surface.700}`,color:`{surface.300}`,detailColor:`{surface.0}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)`,closeButton:{hoverBackground:`{surface.700}`,focusRing:{color:`{surface.300}`,shadow:`none`}}},contrast:{background:`{surface.0}`,borderColor:`{surface.100}`,color:`{surface.950}`,detailColor:`{surface.950}`,shadow:`0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)`,closeButton:{hoverBackground:`{surface.100}`,focusRing:{color:`{surface.950}`,shadow:`none`}}}}}},ry={root:{padding:`0.25rem`,borderRadius:`{content.border.radius}`,gap:`0.5rem`,fontWeight:`500`,disabledBackground:`{form.field.disabled.background}`,disabledBorderColor:`{form.field.disabled.background}`,disabledColor:`{form.field.disabled.color}`,invalidBorderColor:`{form.field.invalid.border.color}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`},transitionDuration:`{form.field.transition.duration}`,sm:{fontSize:`{form.field.sm.font.size}`,padding:`0.25rem`},lg:{fontSize:`{form.field.lg.font.size}`,padding:`0.25rem`}},icon:{disabledColor:`{form.field.disabled.color}`},content:{padding:`0.25rem 0.75rem`,borderRadius:`{content.border.radius}`,checkedShadow:`0px 1px 2px 0px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.04)`,sm:{padding:`0.25rem 0.75rem`},lg:{padding:`0.25rem 0.75rem`}},colorScheme:{light:{root:{background:`{surface.100}`,checkedBackground:`{surface.100}`,hoverBackground:`{surface.100}`,borderColor:`{surface.100}`,color:`{surface.500}`,hoverColor:`{surface.700}`,checkedColor:`{surface.900}`,checkedBorderColor:`{surface.100}`},content:{checkedBackground:`{surface.0}`},icon:{color:`{surface.500}`,hoverColor:`{surface.700}`,checkedColor:`{surface.900}`}},dark:{root:{background:`{surface.950}`,checkedBackground:`{surface.950}`,hoverBackground:`{surface.950}`,borderColor:`{surface.950}`,color:`{surface.400}`,hoverColor:`{surface.300}`,checkedColor:`{surface.0}`,checkedBorderColor:`{surface.950}`},content:{checkedBackground:`{surface.800}`},icon:{color:`{surface.400}`,hoverColor:`{surface.300}`,checkedColor:`{surface.0}`}}}},iy={root:{width:`2.5rem`,height:`1.5rem`,borderRadius:`30px`,gap:`0.25rem`,shadow:`{form.field.shadow}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`},borderWidth:`1px`,borderColor:`transparent`,hoverBorderColor:`transparent`,checkedBorderColor:`transparent`,checkedHoverBorderColor:`transparent`,invalidBorderColor:`{form.field.invalid.border.color}`,transitionDuration:`{form.field.transition.duration}`,slideDuration:`0.2s`},handle:{borderRadius:`50%`,size:`1rem`},colorScheme:{light:{root:{background:`{surface.300}`,disabledBackground:`{form.field.disabled.background}`,hoverBackground:`{surface.400}`,checkedBackground:`{primary.color}`,checkedHoverBackground:`{primary.hover.color}`},handle:{background:`{surface.0}`,disabledBackground:`{form.field.disabled.color}`,hoverBackground:`{surface.0}`,checkedBackground:`{surface.0}`,checkedHoverBackground:`{surface.0}`,color:`{text.muted.color}`,hoverColor:`{text.color}`,checkedColor:`{primary.color}`,checkedHoverColor:`{primary.hover.color}`}},dark:{root:{background:`{surface.700}`,disabledBackground:`{surface.600}`,hoverBackground:`{surface.600}`,checkedBackground:`{primary.color}`,checkedHoverBackground:`{primary.hover.color}`},handle:{background:`{surface.400}`,disabledBackground:`{surface.900}`,hoverBackground:`{surface.300}`,checkedBackground:`{surface.900}`,checkedHoverBackground:`{surface.900}`,color:`{surface.900}`,hoverColor:`{surface.800}`,checkedColor:`{primary.color}`,checkedHoverColor:`{primary.hover.color}`}}}},ay={root:{background:`{content.background}`,borderColor:`{content.border.color}`,borderRadius:`{content.border.radius}`,color:`{content.color}`,gap:`0.5rem`,padding:`0.75rem`}},oy={root:{maxWidth:`12.5rem`,gutter:`0.25rem`,shadow:`{overlay.popover.shadow}`,padding:`0.5rem 0.75rem`,borderRadius:`{overlay.popover.border.radius}`},colorScheme:{light:{root:{background:`{surface.700}`,color:`{surface.0}`}},dark:{root:{background:`{surface.700}`,color:`{surface.0}`}}}},sy={root:{background:`{content.background}`,color:`{content.color}`,padding:`1rem`,gap:`2px`,indent:`1rem`,transitionDuration:`{transition.duration}`},node:{padding:`0.25rem 0.5rem`,borderRadius:`{content.border.radius}`,hoverBackground:`{content.hover.background}`,selectedBackground:`{highlight.background}`,color:`{text.color}`,hoverColor:`{text.hover.color}`,selectedColor:`{highlight.color}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`-1px`,shadow:`{focus.ring.shadow}`},gap:`0.25rem`},nodeIcon:{color:`{text.muted.color}`,hoverColor:`{text.hover.muted.color}`,selectedColor:`{highlight.color}`},nodeToggleButton:{borderRadius:`50%`,size:`1.75rem`,hoverBackground:`{content.hover.background}`,selectedHoverBackground:`{content.background}`,color:`{text.muted.color}`,hoverColor:`{text.hover.muted.color}`,selectedHoverColor:`{primary.color}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},loadingIcon:{size:`2rem`},filter:{margin:`0 0 0.5rem 0`},css:`
    .p-tree-mask.p-overlay-mask {
        --px-mask-background: light-dark(rgba(255,255,255,0.5),rgba(0,0,0,0.3));
    }
`},cy={root:{background:`{form.field.background}`,disabledBackground:`{form.field.disabled.background}`,filledBackground:`{form.field.filled.background}`,filledHoverBackground:`{form.field.filled.hover.background}`,filledFocusBackground:`{form.field.filled.focus.background}`,borderColor:`{form.field.border.color}`,hoverBorderColor:`{form.field.hover.border.color}`,focusBorderColor:`{form.field.focus.border.color}`,invalidBorderColor:`{form.field.invalid.border.color}`,color:`{form.field.color}`,disabledColor:`{form.field.disabled.color}`,placeholderColor:`{form.field.placeholder.color}`,invalidPlaceholderColor:`{form.field.invalid.placeholder.color}`,shadow:`{form.field.shadow}`,paddingX:`{form.field.padding.x}`,paddingY:`{form.field.padding.y}`,borderRadius:`{form.field.border.radius}`,focusRing:{width:`{form.field.focus.ring.width}`,style:`{form.field.focus.ring.style}`,color:`{form.field.focus.ring.color}`,offset:`{form.field.focus.ring.offset}`,shadow:`{form.field.focus.ring.shadow}`},transitionDuration:`{form.field.transition.duration}`,sm:{fontSize:`{form.field.sm.font.size}`,paddingX:`{form.field.sm.padding.x}`,paddingY:`{form.field.sm.padding.y}`},lg:{fontSize:`{form.field.lg.font.size}`,paddingX:`{form.field.lg.padding.x}`,paddingY:`{form.field.lg.padding.y}`}},dropdown:{width:`2.5rem`,color:`{form.field.icon.color}`},overlay:{background:`{overlay.select.background}`,borderColor:`{overlay.select.border.color}`,borderRadius:`{overlay.select.border.radius}`,color:`{overlay.select.color}`,shadow:`{overlay.select.shadow}`},tree:{padding:`{list.padding}`},emptyMessage:{padding:`{list.option.padding}`},chip:{borderRadius:`{border.radius.sm}`},clearIcon:{color:`{form.field.icon.color}`}},ly={root:{transitionDuration:`{transition.duration}`},header:{background:`{content.background}`,borderColor:`{treetable.border.color}`,color:`{content.color}`,borderWidth:`0 0 1px 0`,padding:`0.75rem 1rem`},headerCell:{background:`{content.background}`,hoverBackground:`{content.hover.background}`,selectedBackground:`{highlight.background}`,borderColor:`{treetable.border.color}`,color:`{content.color}`,hoverColor:`{content.hover.color}`,selectedColor:`{highlight.color}`,gap:`0.5rem`,padding:`0.75rem 1rem`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`-1px`,shadow:`{focus.ring.shadow}`}},columnTitle:{fontWeight:`600`},row:{background:`{content.background}`,hoverBackground:`{content.hover.background}`,selectedBackground:`{highlight.background}`,color:`{content.color}`,hoverColor:`{content.hover.color}`,selectedColor:`{highlight.color}`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`-1px`,shadow:`{focus.ring.shadow}`}},bodyCell:{borderColor:`{treetable.border.color}`,padding:`0.75rem 1rem`,gap:`0.5rem`},footerCell:{background:`{content.background}`,borderColor:`{treetable.border.color}`,color:`{content.color}`,padding:`0.75rem 1rem`},columnFooter:{fontWeight:`600`},footer:{background:`{content.background}`,borderColor:`{treetable.border.color}`,color:`{content.color}`,borderWidth:`0 0 1px 0`,padding:`0.75rem 1rem`},columnResizer:{width:`0.5rem`},resizeIndicator:{width:`1px`,color:`{primary.color}`},sortIcon:{color:`{text.muted.color}`,hoverColor:`{text.hover.muted.color}`,size:`0.875rem`},loadingIcon:{size:`2rem`},nodeToggleButton:{hoverBackground:`{content.hover.background}`,selectedHoverBackground:`{content.background}`,color:`{text.muted.color}`,hoverColor:`{text.color}`,selectedHoverColor:`{primary.color}`,size:`1.75rem`,borderRadius:`50%`,focusRing:{width:`{focus.ring.width}`,style:`{focus.ring.style}`,color:`{focus.ring.color}`,offset:`{focus.ring.offset}`,shadow:`{focus.ring.shadow}`}},paginatorTop:{borderColor:`{content.border.color}`,borderWidth:`0 0 1px 0`},paginatorBottom:{borderColor:`{content.border.color}`,borderWidth:`0 0 1px 0`},colorScheme:{light:{root:{borderColor:`{content.border.color}`},bodyCell:{selectedBorderColor:`{primary.100}`}},dark:{root:{borderColor:`{surface.800}`},bodyCell:{selectedBorderColor:`{primary.900}`}}},css:`
    .p-treetable-mask.p-overlay-mask {
        --px-mask-background: light-dark(rgba(255,255,255,0.5),rgba(0,0,0,0.3));
    }
`},uy={loader:{mask:{background:`{content.background}`,color:`{text.muted.color}`},icon:{size:`2rem`}}},dy=Object.defineProperty,fy=Object.defineProperties,py=Object.getOwnPropertyDescriptors,my=Object.getOwnPropertySymbols,hy=Object.prototype.hasOwnProperty,gy=Object.prototype.propertyIsEnumerable,_y=(e,t,n)=>t in e?dy(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,vy,yy=(vy=((e,t)=>{for(var n in t||={})hy.call(t,n)&&_y(e,n,t[n]);if(my)for(var n of my(t))gy.call(t,n)&&_y(e,n,t[n]);return e})({},N_),fy(vy,py({components:{accordion:k_,autocomplete:A_,avatar:j_,badge:M_,blockui:P_,breadcrumb:F_,button:I_,card:L_,carousel:R_,cascadeselect:z_,checkbox:B_,chip:V_,colorpicker:H_,confirmdialog:U_,confirmpopup:W_,contextmenu:G_,datatable:q_,dataview:J_,datepicker:Y_,dialog:X_,divider:Z_,dock:Q_,drawer:$_,editor:ev,fieldset:tv,fileupload:nv,floatlabel:rv,galleria:iv,iconfield:av,iftalabel:ov,image:sv,imagecompare:cv,inlinemessage:lv,inplace:uv,inputchips:dv,inputgroup:fv,inputnumber:pv,inputotp:mv,inputtext:hv,knob:gv,listbox:_v,megamenu:vv,menu:yv,menubar:bv,message:xv,metergroup:Sv,multiselect:Cv,orderlist:wv,organizationchart:Tv,overlaybadge:Ev,paginator:Dv,panel:Ov,panelmenu:kv,password:Av,picklist:jv,popover:Mv,progressbar:Nv,progressspinner:Pv,radiobutton:Fv,rating:Iv,ripple:Lv,scrollpanel:Rv,select:zv,selectbutton:Bv,skeleton:Vv,slider:Hv,speeddial:Uv,splitbutton:Wv,splitter:Gv,stepper:Kv,steps:qv,tabmenu:Jv,tabs:Yv,tabview:Xv,tag:Zv,terminal:Qv,textarea:$v,tieredmenu:ey,timeline:ty,toast:ny,togglebutton:ry,toggleswitch:iy,toolbar:ay,tooltip:oy,tree:sy,treeselect:cy,treetable:ly,virtualscroller:uy},css:K_}))),by=(...e)=>hu(...e),xy=As(h_);xy.use(Zs());var Sy=by(yy,{semantic:{colorScheme:{light:{content:{background:`{surface.100}`}},dark:{content:{background:`{surface.800}`}}}}});xy.use(O_,{theme:{preset:Sy,options:{darkModeSelector:`.app-dark-mode`}}}),xy.mount(`#app`);