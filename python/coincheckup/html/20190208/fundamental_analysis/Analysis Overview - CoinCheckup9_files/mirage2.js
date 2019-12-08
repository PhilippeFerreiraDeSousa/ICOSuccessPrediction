var mirage=function(t){"use strict";function e(){throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs")}function r(t){return Object.prototype.toString.call(t)}function n(t){return[].slice.call(t)}function i(){return(new Date).getTime()}function o(t){return null!=t&&"object"==typeof t&&t.nodeType===Node.ELEMENT_NODE&&"object"==typeof t.style&&"object"==typeof t.ownerDocument}function s(t,e){for(var r=0;r<t.length;r++)if(e===t[r])return r;return-1}function a(){var t,e;return{promise:new G(function(r,n){t=r,e=n}),resolve:t,reject:e}}function u(){try{return!!window.addEventListener}catch(t){return!1}}function c(t,e){if(t)return $<8&&"style"===e?t.style.cssText:"getAttribute"in t?t.getAttribute(e):t.attributes[e]}function h(t,e,r){if(t){if(!($<8&&"style"===e))return"setAttribute"in t?t.setAttribute(e,r):t.attributes[e]=r;t.style.cssText=r}}function l(t,e){if(t){if(!($<8&&"style"===e))return"removeAttribute"in t?t.removeAttribute(e):delete t.attributes[e];t.style.cssText=""}}function f(t,e){return c(t,"data-"+e)}function p(t,e,r){return h(t,"data-"+e,r)}function d(t,e,r,n){return u()?t.addEventListener(e,r,n):t.attachEvent("on"+e,r)}function g(t,e,r,n){return u()?t.removeEventListener(e,r,n):t.detachEvent("on"+e,r)}function _(){var t={};try{void 0!==window.innerWidth?(t.width=window.innerWidth,t.height=window.innerHeight):void 0!==document.documentElement&&void 0!==document.documentElement.clientWidth&&0!==document.documentElement.clientWidth?(t.width=document.documentElement.clientWidth,t.height=document.documentElement.clientHeight):(t.width=document.getElementsByTagName("body")[0].clientWidth,t.height=document.getElementsByTagName("body")[0].clientHeight)}catch(e){t.width=void 0,t.height=void 0}return t}function m(t,e,r){for(var n=[],i=0;i<t.length;i++)n.push(e.call(r,t[i],i,t));return n}function y(t,e,r){for(var n=0;n<t.length;n++)e.call(r,t[n],n,t)}function v(t,e,r){for(var n=0;n<t.length;n++)if(e.call(r,t[n],n,t))return t[n]}function w(t,e,r){for(var n in t)e.call(r,t[n],n,t)}function b(t,e,r){for(var n=[],i=0;i<t.length;i++)e.call(r,t[i],i,t)&&n.push(t[i]);return n}function S(t){if(!(this instanceof S))return new S(t);if(!t||!o(t))throw new Error("A DOM element reference is required");return this.element=t,this.tokens=t.classList,this}function E(t,e){return new S(t).remove(e)}function T(t,e){return new S(t).has(e)}function O(){return Promise.resolve(navigator.connection||navigator.mozConnection||navigator.webkitConnection||A()).then(function(t){var e=window.navigator.userAgent||"";return!!/Android|iPhone|iPod|iPad/.test(e)&&("string"==typeof t.effectiveType?"2g"===t.effectiveType||"slow-2g"===t.effectiveType:!isNaN(t.bandwidth)&&t.bandwidth<It)})}function A(){return new Promise(function(t){var e="___MIRAGE_STORAGE_TEST___";try{localStorage.setItem(e,e),localStorage.getItem(e),localStorage.removeItem(e)}catch(e){return t(St)}var r;try{r=JSON.parse(window.localStorage.getItem(Et))}catch(t){}r&&t(r),t(I().then(function(t){try{window.localStorage.setItem(Et,JSON.stringify(t))}catch(t){}return t},function(t){return bt("Speedtest failed",t.message),St}))})}function I(){return new Promise(function(t,e){var r=new XMLHttpRequest,n=i();wt("Approximating network connection.."),r.open("get",At+n),r.onreadystatechange=function(){if(4===r.readyState){try{if(r.status)var o=+r.status}catch(t){}1223===o&&(o=204),200===o?t(L(n,i(),r)):e(Error("Unexpected HTTP status: "+o))}},r.send()})}function L(t,e,r){var n=window.parseInt(r.getResponseHeader(Tt),10),i=window.parseInt(r.getResponseHeader(Ot),10);return isNaN(n)||isNaN(i)?St:{effectiveType:C(2*(n-t),i/(e-n)/1e3)}}function C(t,e){return t>=2e3&&e<=50?"slow-2g":t>=1400&&e<=70?"2g":t>=270&&e<=700?"3g":"4g"}function x(t,e,r){var n,i,o,s,a=t.byteLength;if(e=~~e,r=void 0===r?a:~~r,"function"==typeof t.slice)return t.slice(e,r);if(e<0?(e+=a)<0&&(e=0):e>a&&(e=a),r<0?(r+=a)<0&&(r=0):r>a&&(r=a),r<e&&(r=e),0===(n=r-e))return new Uint8Array(n);for(i=new DataView(t,e,n),o=new Uint8Array(n),s=0;s<n;s++)o[s]=i.getUint8(s);return o.buffer}function N(t,e,r){var n,i=t[e];n=Object.getOwnPropertyDescriptor(t,e)||Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t),e)||{value:i,writable:!0,configurable:!0,enumerable:!0};try{P(n.configurable,"Property must be configurable."),P(!!r,"Property descriptor must be defined.")}catch(t){throw new Error('Invalid attempt to redefine "'+e+'".',t.message)}void 0===r.get&&void 0===r.set&&(r.writable=!0),r.enumerable=!1!==r.enumerable,r.configurable=!1!==r.configurable;try{Object.defineProperty(t,e,r)}catch(t){bt('Failed to define property "'+e+'".',t.message)}return function(){try{Object.defineProperty(t,e,n)}catch(t){bt('Failed to restore user-defined property "'+e+'".',t.message)}}}function P(t,e){if(!t)throw new Error(e)}function R(t,e){return function(){return t.apply(e,arguments)}}function D(t,e){var r,n;e=e||{type:"text/javascript"};try{n=new Blob([t],e)}catch(i){(r=new(this.BlobBuilder||this.WebKitBlobBuilder||this.MozBlobBuilder)).append(t),n=r.getBlob(e&&e.type)}return n}function j(){this.queue_=G.resolve(),this.reset_(),this.sizeQueue_=[],this.map_={}}function M(t,e){try{new Uint8Array(t,e)[0]===M.type.SIGNATURE[0]?this.initializeAsSignature_(t,e):this.initializeAsChunk_(t,e)}catch(t){throw new Error("Failed to initialize a PNG chunk. "+t.toString())}}function B(t,e){var r=new M(t,e),n=0;P(r.isSignature(),"First chunk should be PNG signature."),n+=r.byteLength;do{n+=(r=new M(t,e+n)).byteLength}while(!r.isEnd());this.offset=e,this.byteLength=n,this.view=new Uint8Array(t,e,n),this.imageSrc_=null}function k(t,e){for(var r,n=new Uint8Array(t,e,4),i=0,o=0;o<4;o++)i<<=8,i|=n[o];try{r=String.fromCharCode.apply(null,new Uint8Array(t,e+4,i)),r=JSON.parse(r)}catch(t){throw new Error("Unable to parse degraded image JSON. "+t.toString())}this.byteLength=i+4,this.data=r,this.loadStatus=this.data.status==k.state.LOAD_OK?this.data.status:this.data.status+":"+this.data.cache_status,this.data.width=this.data.width||this.data.X||0,this.data.height=this.data.height||this.data.Y||0}function U(t,e){this.json=new k(t,e),this.png=new B(t,e+this.json.byteLength),this.src=this.json.data.url,this.width=this.json.data.width||this.json.data.Y,this.height=this.json.data.height||this.json.data.X,this.byteLength=this.json.byteLength+this.png.byteLength}function z(t,e){var r=t.indexOf("}\n",e)+1,n=t.indexOf("\n\n",r);P(-1!==r,"A JSON boundary should exist."),P(-1!==n,"A DataURL boundary should exist.");var i=JSON.parse(t.slice(e,r)),o=t.slice(r+1,n);this.json={data:i,loadStatus:i.status==k.state.LOAD_OK?i.status:i.status+":"+i.cache_status},this.src=this.json.data.url,this.width=this.json.data.width||this.json.data.X,this.height=this.json.data.height||this.json.data.Y,this.stringLength=n+2-e,this.dataUrl_=o}function H(t,e){this.image_=t,this.restored_=!1,this.restoring_=!1,this.stateCallback_=null,this.restoredResult_=a(),this.wrappedPropertyCache_=[],this.boundExpireState_=R(this.expireState_,this),this.parentTree_=H.resolveParentTree(this.image_),this.parentTreeChangesPromise_=null,this.parentTreeCheckInterval_=null,this.forcePreloadOnly_=e&&e.forcePreloadOnly_,this.requireProxy_=e&&e.proxy_,this.storeStyleMutation(),this.makeMeasurable_(),this.wrap_()}function V(t){this.supportsBinaryData_=!!t&&!!t.supportsBinaryData,this.map_={},this.timer_=null,this.supportsBinaryData_=!1,this.supportsBinaryData_&&("undefined"==typeof ArrayBuffer&&(this.supportsBinaryData_=!1),"undefined"==typeof URL&&"undefined"==typeof webkitURL&&"undefined"==typeof mozURL&&(this.supportsBinaryData_=!1),"undefined"==typeof Blob&&"undefined"==typeof BlobBuilder&&"undefined"==typeof WebKitBlobBuilder&&"undefined"==typeof MozBlobBuilder&&(this.supportsBinaryData_=!1)),this.loadStrategy_=this.supportsBinaryData_?this.loadArrayBuffer_:this.loadDataUrls_}function F(){this.manifest_=new j,this.imageCache_=[],this.forcePreload_=/forcepreload/.test(window.location.search),this.forcePreloadOnly_=/forcepreloadonly/.test(window.location.search),this.forceEagerLoad_=/forceeagerload/.test(window.location.search),this.forceDataUrls_=/forcedataurls/.test(window.location.search),this.optimizationTimeout_=null,this.requireProxy_=!1,this.loadStatistics={},this.nativeMethods={},this.forcePreload_&&this.manifest_.clear(),this.forceEagerLoad_&&(Ct.eagerLoad=!0),this.supportsBinaryData_=!0,void 0===window.ArrayBuffer&&(this.supportsBinaryData_=!1),void 0===window.Blob&&void 0===window.BlobBuilder&&void 0===window.WebKitBlobBuilder&&void 0===window.MozBlobBuilder&&(this.supportsBinaryData_=!1);var t=document.createElement("canvas");if(void 0===t.getContext)this.supportsBinaryData_=!1;else try{t.getContext("2d")}catch(t){this.supportsBinaryData_=!1}this.forceDataUrls_&&(this.supportsBinaryData_=!1),this.loader_=new V({supportsBinaryData:this.supportsBinaryData_})}var q="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},G=function(t,e){return e={exports:{}},t(e,e.exports),e.exports}(function(t,r){!function(e,r){t.exports=r()}(0,function(){function t(t){var e=typeof t;return null!==t&&("object"===e||"function"===e)}function r(t){return"function"==typeof t}function n(){return void 0!==M?function(){M(o)}:i()}function i(){var t=setTimeout;return function(){return t(o,1)}}function o(){for(var t=0;t<j;t+=2)(0,G[t])(G[t+1]),G[t]=void 0,G[t+1]=void 0;j=0}function s(t,e){var r=arguments,n=this,i=new this.constructor(u);void 0===i[K]&&I(i);var o=n._state;return o?function(){var t=r[o-1];k(function(){return T(o,i,t,n._result)})}():w(n,i,t,e),i}function a(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var r=new e(u);return _(r,t),r}function u(){}function c(){return new TypeError("You cannot resolve a promise with itself")}function h(){return new TypeError("A promises callback cannot return that same promise.")}function l(t){try{return t.then}catch(t){return J.error=t,J}}function f(t,e,r,n){try{t.call(e,r,n)}catch(t){return t}}function p(t,e,r){k(function(t){var n=!1,i=f(r,e,function(r){n||(n=!0,e!==r?_(t,r):y(t,r))},function(e){n||(n=!0,v(t,e))},"Settle: "+(t._label||" unknown promise"));!n&&i&&(n=!0,v(t,i))},t)}function d(t,e){e._state===Q?y(t,e._result):e._state===X?v(t,e._result):w(e,void 0,function(e){return _(t,e)},function(e){return v(t,e)})}function g(t,e,n){e.constructor===t.constructor&&n===s&&e.constructor.resolve===a?d(t,e):n===J?(v(t,J.error),J.error=null):void 0===n?y(t,e):r(n)?p(t,e,n):y(t,e)}function _(e,r){e===r?v(e,c()):t(r)?g(e,r,l(r)):y(e,r)}function m(t){t._onerror&&t._onerror(t._result),b(t)}function y(t,e){t._state===Y&&(t._result=e,t._state=Q,0!==t._subscribers.length&&k(b,t))}function v(t,e){t._state===Y&&(t._state=X,t._result=e,k(m,t))}function w(t,e,r,n){var i=t._subscribers,o=i.length;t._onerror=null,i[o]=e,i[o+Q]=r,i[o+X]=n,0===o&&t._state&&k(b,t)}function b(t){var e=t._subscribers,r=t._state;if(0!==e.length){for(var n=void 0,i=void 0,o=t._result,s=0;s<e.length;s+=3)n=e[s],i=e[s+r],n?T(r,n,i,o):i(o);t._subscribers.length=0}}function S(){this.error=null}function E(t,e){try{return t(e)}catch(t){return Z.error=t,Z}}function T(t,e,n,i){var o=r(n),s=void 0,a=void 0,u=void 0,c=void 0;if(o){if((s=E(n,i))===Z?(c=!0,a=s.error,s.error=null):u=!0,e===s)return void v(e,h())}else s=i,u=!0;e._state!==Y||(o&&u?_(e,s):c?v(e,a):t===Q?y(e,s):t===X&&v(e,s))}function O(t,e){try{e(function(e){_(t,e)},function(e){v(t,e)})}catch(e){v(t,e)}}function A(){return $++}function I(t){t[K]=$++,t._state=void 0,t._result=void 0,t._subscribers=[]}function L(t,e){this._instanceConstructor=t,this.promise=new t(u),this.promise[K]||I(this.promise),D(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?y(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&y(this.promise,this._result))):v(this.promise,C())}function C(){return new Error("Array Methods must be provided an Array")}function x(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function N(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function P(t){this[K]=A(),this._result=this._state=void 0,this._subscribers=[],u!==t&&("function"!=typeof t&&x(),this instanceof P?O(this,t):N())}var R=void 0,D=R=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},j=0,M=void 0,B=void 0,k=function(t,e){G[j]=t,G[j+1]=e,2===(j+=2)&&(B?B(o):W())},U="undefined"!=typeof window?window:void 0,z=U||{},H=z.MutationObserver||z.WebKitMutationObserver,V="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),F="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,G=new Array(1e3),W=void 0;W=V?function(){return process.nextTick(o)}:H?function(){var t=0,e=new H(o),r=document.createTextNode("");return e.observe(r,{characterData:!0}),function(){r.data=t=++t%2}}():F?function(){var t=new MessageChannel;return t.port1.onmessage=o,function(){return t.port2.postMessage(0)}}():void 0===U&&"function"==typeof e?function(){try{var t=e("vertx");return M=t.runOnLoop||t.runOnContext,n()}catch(t){return i()}}():i();var K=Math.random().toString(36).substring(16),Y=void 0,Q=1,X=2,J=new S,Z=new S,$=0;return L.prototype._enumerate=function(t){for(var e=0;this._state===Y&&e<t.length;e++)this._eachEntry(t[e],e)},L.prototype._eachEntry=function(t,e){var r=this._instanceConstructor,n=r.resolve;if(n===a){var i=l(t);if(i===s&&t._state!==Y)this._settledAt(t._state,e,t._result);else if("function"!=typeof i)this._remaining--,this._result[e]=t;else if(r===P){var o=new r(u);g(o,t,i),this._willSettleAt(o,e)}else this._willSettleAt(new r(function(e){return e(t)}),e)}else this._willSettleAt(n(t),e)},L.prototype._settledAt=function(t,e,r){var n=this.promise;n._state===Y&&(this._remaining--,t===X?v(n,r):this._result[e]=r),0===this._remaining&&y(n,this._result)},L.prototype._willSettleAt=function(t,e){var r=this;w(t,void 0,function(t){return r._settledAt(Q,e,t)},function(t){return r._settledAt(X,e,t)})},P.all=function(t){return new L(this,t).promise},P.race=function(t){var e=this;return new e(D(t)?function(r,n){for(var i=t.length,o=0;o<i;o++)e.resolve(t[o]).then(r,n)}:function(t,e){return e(new TypeError("You must pass an array to race."))})},P.resolve=a,P.reject=function(t){var e=new this(u);return v(e,t),e},P._setScheduler=function(t){B=t},P._setAsap=function(t){k=t},P._asap=k,P.prototype={constructor:P,then:s,catch:function(t){return this.then(null,t)}},P.polyfill=function(){var t=void 0;if(void 0!==q)t=q;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var r=null;try{r=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===r&&!e.cast)return}t.Promise=P},P.Promise=P,P})}),W=(Object.freeze||Object)({getClass:r,isString:function(t){return/String/.test(r(t))},isArray:function(t){return!!t&&(t instanceof Array||"object"==typeof t&&t.hasOwnProperty("length")&&!t.propertyIsEnumerable("length"))},nodeListToArray:n,now:i,isElement:o,indexOf:s,defer:a}),K=window.navigator.userAgent,Y=Number((K.match(/Firefox\/([0-9]+\.[0-9]+)/)||[0,0])[1])||void 0,Q=Number((K.match(/Chrome\/([0-9]+\.[0-9]+)/)||[0,0])[1])||void 0,X=Number((K.match(/Version\/([0-9]+\.[0-9]+)(?:\.[0-9]+)?\sSafari\//)||[0,0])[1])||void 0,J=Number((K.match(/Opera\/.*\sVersion\/([0-9]+\.[0-9]+)|Opera\/([0-9]+\.[0-9]+)/)||[]).slice(1).join(""))||void 0,Z=Number(K.match(/(iPad|iPhone|iPod)(?:\sSimulator)?;[\s\w;]*?CPU/)&&(K.match(/U; CPU i?OS ([0-9]+_[0-9]+)/)||["","1_0"])[1].replace("_","."))||void 0,$=Number((navigator.userAgent.match(/MSIE ([\w.]+)/)||[])[1])||void 0,tt=function(){var t=a();return"readyState"in document&&"complete"===document.readyState&&t.resolve({}),d(document,"readystatechange",function(e){"readyState"in document&&"complete"===document.readyState&&t.resolve(e)},!0),d(document,"DOMContentLoaded",function(e){t.resolve(e)},!0),t.promise}(),et=function(){var t=a();return"complete"===document.readyState&&tt.then(t.resolve),d(window,"load",function(e){t.resolve(e)},!0),t.promise}(),rt=(Object.freeze||Object)({userAgent:K,firefox:Y,chrome:Q,safari:X,opera:J,ios:Z,internetExplorer:$,hasCreateElementCallApply:function(){try{return!!document.createElement.call}catch(t){return!1}},hasStandardEvents:u,getAttribute:c,setAttribute:h,removeAttribute:l,getData:f,setData:p,addEventListener:d,removeEventListener:g,preventDefault:function(t){"preventDefault"in t?t.preventDefault():t.returnValue=!1},getViewport:_,onReady:tt,onLoad:et}),nt=window.__mirage2||{},it=nt.verbose||!1,ot=nt.petok,st=nt.maxjsonsize||1e5,at=nt.maxdegradedimages||50,ut=nt.maxexternalimages||50,ct=nt.eagerLoad||!1,ht=(Object.freeze||Object)({verbose:it,petok:ot,maxjsonsize:st,maxdegradedimages:at,maxexternalimages:ut,eagerLoad:ct}),lt=(Object.freeze||Object)({map:m,forEach:y,find:v,forIn:w,filter:b}),ft=document.createElement("a"),pt=function(t){return ft.href=t,{hash:ft.hash,host:ft.host,hostname:ft.hostname,href:ft.href,pathname:ft.pathname,port:ft.port,protocol:ft.protocol,search:ft.search}},dt=function(t,e){e=null==e?window.location.href:e;var r=pt(gt(t)),n=pt(gt(e));return r.protocol===n.protocol&&r.host===n.host},gt=function(){var t=document.createElement("div"),e=window.URL||window.webkitURL,r=!0;try{r=null!=new e(window.location&&window.location.href).href}catch(t){r=!1}return r?function(t){return new e(t,document.baseURI||window.location&&window.location.href).href}:function(e){return e=e.split("&").join("&#38;").split("<").join("&#60;").split("'").join("&#39;"),t.innerHTML='<a href="'+e+'">x</a>',t.firstChild.href}}(),_t=(Object.freeze||Object)({parseURL:pt,sameOrigin:dt,resolveFullURL:gt});S.prototype.add=function(t){var e;return this.tokens?(this.tokens.add(t),this):(e=this.array(),s(e,t)<0&&e.push(t),this.element.className=e.join(" "),this)},S.prototype.remove=function(t){var e,r;return this.tokens?(this.tokens.remove(t),this):(e=this.array(),(r=s(e,t))>=0?(e.splice(r,1),this.element.className=e.join(" "),this):void 0)},S.prototype.toggle=function(t){return this.tokens?(this.tokens.toggle(t),this):(this.has(t)?this.remove(t):this.add(t),this)},S.prototype.array=function(){var t,e;return t=this.element.className.replace(/^\s+|\s+$/g,""),""===(e=t.split(/\s+/))[0]&&e.shift(),e};var mt=T;S.prototype.has=S.prototype.contains=function(t){return this.tokens?this.tokens.contains(t):!!~s(this.array(),t)};var yt=(Object.freeze||Object)({add:function(t,e){return new S(t).add(e)},remove:E,toggle:function(t,e){new S(t).toggle(e)},has:T,contains:mt,Classes:S}),vt={};vt.log=function(t,e){var r={};r.message=t,r.category=e,vt.history.push(r)};var wt=function(t,e,r){if(it){try{console.log("[ CLOUDFLARE ] "+t)}catch(t){}!1!==r&&vt.log(t,1|e)}},bt=function(t,e,r){if(it){try{console.error("[ CLOUDFLARE ] "+t)}catch(r){wt(t,4|e,!1)}!1!==r&&vt.log(t,4|e)}},St={bandwidth:1/0},Et="mirage_network_connection",Tt="X-Mirage-Server-Time",Ot="X-Mirage-Transfer-Size",At="/cdn-cgi/mirage_speedtest/",It=1.25,Lt=(Object.freeze||Object)({isHighLatency:O,getFakeConnection:A,connectionFromStats:L,calculateEffectiveConnectionType:C}),Ct={};for(var xt in ht)Ct[xt]=ht[xt];var Nt=window.URL||window.webkitURL||window.mozURL,Pt=function(){var t;return window.location.origin?window.location.origin:(t=pt(window.location.toString())).protocol+"://"+t.host+":"+t.port}();return j.DEFAULT_TTL=1728e5,j.STORAGE_KEY="mirage_cache_manifest",j.DEBOUNCE_THRESHOLD=500,j.MAX_LENGTH=100,j.prototype.record=function(t){return this.whenReady_(function(){this.add_(t),this.persist_()})},j.prototype.has=function(t){return this.whenReady_(function(){return this.has_(t)})},j.prototype.indexOf=function(t){return this.whenReady_(function(){return this.indexOf_(this.map_[t])})},j.prototype.clear=function(){return this.whenReady_(function(){try{window.localStorage.removeItem(j.STORAGE_KEY)}catch(t){}this.reset_()})},j.prototype.whenReady_=function(t){return this.queue_=this.queue_.then(R(t,this)),this.queue_},j.prototype.has_=function(t){var e=this.map_[t],r=i();return e&&e+j.DEFAULT_TTL<r?(this.remove_(t),this.persist_(),!1):!!e},j.prototype.reset_=function(){try{this.map_=JSON.parse(window.localStorage.getItem(j.STORAGE_KEY)),this.sizeMap_={},this.sizeQueue_=m(this.map_,function(t,e){var r={key:e,value:t};return this.sizeMap_[e]=r,r},this).sort(function(t,e){return t.value>e.value?-1:t.value<e.value?1:0})}catch(t){}this.map_=this.map_||{},this.offset_=0},j.prototype.indexOf_=function(t,e,r){var n,i;return 0===this.sizeQueue_.length||void 0===t?-1:(e=e||0,r=r||this.sizeQueue_.length,0==(n=r-e)?-1:(i=n/2+e,i|=i,this.sizeQueue_[i].value<t?this.indexOf_(t,e,i):this.sizeQueue_[i].value>t?this.indexOf_(t,i,r):i))},j.prototype.add_=function(t){var e,r=this.sizeMap_[t];r?(e=this.indexOf_(r.value),this.sizeQueue_.splice(e,1)):(r={key:t},this.sizeMap_[t]=r),this.map_[t]=r.value=i()+this.offset_++,this.sizeQueue_.unshift(r),this.sizeQueue_.length>j.MAX_LENGTH&&this.remove_(this.sizeQueue_[this.sizeQueue_.length-1].key)},j.prototype.remove_=function(t){var e=this.sizeMap_[t],r=this.indexOf_(e.value);delete this.map_[t],delete this.sizeMap_[t],-1!==r&&this.sizeQueue_.splice(r,1)},j.prototype.persist_=function(){return this.whenReady_(function(){try{window.localStorage.setItem(j.STORAGE_KEY,JSON.stringify(this.map_))}catch(t){}})},j.prototype.persist_=function(t,e){var r=null;return function(){var n=arguments,i=this;null!==r&&window.clearTimeout(r),r=window.setTimeout(function(){t.apply(i,n)},e)}}(j.prototype.persist_,j.DEBOUNCE_THRESHOLD),M.type={SIGNATURE:[137,80,78,71,13,10,26,10],IHDR:[73,72,68,82],IEND:[73,69,78,68]},M.FIELD_BYTE_LENGTH=12,M.prototype.initializeAsSignature_=function(t,e){this.byteLength=8,this.type_=new Uint8Array(t,e,this.byteLength)},M.prototype.initializeAsChunk_=function(t,e){for(var r=new Uint8Array(t,e,4),n=0,i=0;i<4;i++)n<<=8,n|=r[i];this.byteLength=n+M.FIELD_BYTE_LENGTH,this.type_=new Uint8Array(t,e+4,4)},M.prototype.isSignature=function(){return 8===this.byteLength},M.prototype.isHeader=function(){return this.matches(M.type.IHDR)},M.prototype.isEnd=function(){return this.matches(M.type.IEND)},M.prototype.matches=function(t){for(var e=0;e<t.length;++e)if(this.type_[e]!==t[e])return!1;return!0},B.createObjectUrl=function(){var t=G.resolve();return function(e){return t=t.then(function(){var t=e.toBlob_();e.releaseImageSrc();try{var r="createObjectURL";for(r in Nt)if("createObjectURL"===r)break;return Nt[r](t)}catch(t){return bt("Failed to create objectURL for a blob.",t.message),""}})}}(),B.prototype.toBlob_=function(){return D(x(this.view.buffer,this.view.byteOffset,this.view.byteOffset+this.view.byteLength),{type:"image/png"})},B.prototype.resolveImageSrc=function(){return B.createObjectUrl(this).then(R(function(t){return this.imageSrc_=t,t},this))},B.prototype.releaseImageSrc=function(){if(this.imageSrc_)try{Nt.revokeObjectURL(this.imageSrc_),this.imageSrc_=null}catch(t){bt("Failed to release image src.",t.message)}},k.state={LOAD_OK:"ok",CACHE_MISS:"914:MISS",CACHE_HIT:"914:HIT"},U.prototype.resolveSrc=function(){return this.png.resolveImageSrc()},U.prototype.isValid=function(){return this.json.loadStatus==k.state.LOAD_OK},z.prototype.resolveSrc=function(){return G.resolve(this.dataUrl_)},z.prototype.isValid=function(){return this.json.loadStatus==k.state.LOAD_OK},H.VIEWPORT_BUFFER=300,H.PARENT_TREE_POLL_INTERVAL=500,H.RETRY_TIME=100,H.INVISIBLE_CLASS="cf-invisible",H.HIDDEN_CLASS="cf-hidden",H.resolveParentTree=function(t){for(var e=[],r=t;r;){e.push(r);try{r=r.parentNode}catch(t){break}}return e},H.matchesParentTree=function(t,e){var r=H.resolveParentTree(t);if(r.length!==e.length)return!1;for(var n=0;n<r.length;++n)if(r[n]!==e[n])return!1;return!0},H.prototype.storeStyleMutation=function(){var t=f(this.image_,"cfstyle");"hidden"===this.image_.style.visibility&&(this.image_.style.visibility="",e=c(this.image_,"style")),"none"===this.image_.style.display&&(this.image_.style.display="",e=c(this.image_,"style"));var e=c(this.image_,"style");e&&(t?p(this.image_,"cfstyle",H.mergeInlineStyles(this.image_)):p(this.image_,"cfstyle",e))},H.mergeInlineStyles=function(t){var e=c(t,"style"),r={};y(f(t,"cfstyle").split(";").concat(e.split(";")),function(t){i=t.split(":"),r[i[0].trim()]=t});var n=[];for(var i in r)i&&n.push(r[i]);return n.join(";")},H.isValidCandidate=function(t){var e=f(t,"cfsrc"),r=c(t,"src");f(t,"cfstyle"),c(t,"style");return e&&"data:"===e.slice(0,5).toLowerCase()?(h(t,"src",e),H.restoreStyle(t),!1):((r&&e!==r||!e)&&H.restoreStyle(t),"IMG"===t.nodeName&&!!e&&(null===r||""===r||r===e))},H.restoreStyle=function(t){var e,r=f(t,"cfstyle");t.style&&(t.style.visibility="",t.style.display=""),e=c(t,"style"),r?e?h(t,"style",H.mergeInlineStyles(t)):h(t,"style",r):l(t,"style")},H.prototype.getSrc=function(){return gt(f(this.image_,"cfsrc")||"")},H.prototype.getStyle=function(){return f(this.image_,"cfstyle")||""},H.prototype.getTop=function(){for(var t=0,e=this.image_;e;)try{void 0!==e.offsetTop&&e.offsetTop&&(t+=e.offsetTop),e=e.offsetParent}catch(t){break}return t},H.prototype.getLeft=function(){return this.image_.getBoundingClientRect().left},H.prototype.setDegradedSrc=function(t){return new G(R(function(e){this.restored_?e():(this.restoring_=!0,this.unwrap_(),this.restoring_=!1,this.whenStateExpires_(e),h(this.image_,"src",t),this.image_.src=t,""===this.getStyle()?l(this.image_,"style"):h(this.image_,"style",this.getStyle()),E(this.image_,H.HIDDEN_CLASS),this.wrap_())},this))},H.prototype.restoreWithinViewport=function(){return this.forcePreloadOnly_?this.restoredResult_.promise:Ct.eagerLoad?this.restore():this.entersViewport_().then(R(function(){return this.restore()},this))},H.prototype.restore=function(){return this.forcePreloadOnly_?this.restoredResult_.promise:(this.restoring_=!0,this.unwrap_(),this.restoring_=!1,this.restored_=!0,h(this.image_,"src",this.getSrc()),this.image_.src=this.getSrc(),""===this.getStyle()?l(this.image_,"style"):h(this.image_,"style",this.getStyle()),E(this.image_,H.HIDDEN_CLASS),this.whenStateExpires_(R(function(){this.restoredResult_.resolve()},this)),this.restoredResult_.promise)},H.prototype.whenRestored=function(t){return this.restoredResult_.promise.then(t)},H.prototype.isWithinViewport=function(){var t,e=_(),r=this.image_.getBoundingClientRect();return t=r.bottom<0?r.bottom:r.top>e.height?r.top-e.height:0,Math.abs(t)<F.DISTANCE_FROM_VIEWPORT},H.prototype.whenStateExpires_=function(t){this.expireState_(),this.stateCallback_=t,d(this.image_,"load",this.boundExpireState_),d(this.image_,"error",this.boundExpireState_)},H.prototype.expireState_=function(){var t;g(this.image_,"load",this.boundExpireState_),g(this.image_,"error",this.boundExpireState_),this.stateCallback_&&(t=this.stateCallback_,this.stateCallback_=null,t())},H.prototype.entersViewport_=function(){return new G(R(function(t){if(this.isWithinViewport())return t();var e=R(function(){this.isWithinViewport()&&(null!==this.parentTreeCheckInterval_&&(window.clearInterval(this.parentTreeCheckInterval_),this.parentTreeCheckInterval_=null),this.mutationObserver.disconnect(),this.retryTimer_&&delete this.retryTimer_,g(window,"resize",e),g(window,"scroll",e),t())},this);this.retryTimer_=setTimeout(R(function(){e()},this),H.RETRY_TIME),this.parentTreeChanges_().then(e),this.elementAttributeChange_().then(e),d(window,"resize",e),d(window,"scroll",e)},this))},H.prototype.elementAttributeChange_=function(){return new G(R(function(t){var e=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver||function(){this.observe=function(){},this.disconnect=function(){}};this.mutationObserver=new e(function(e){t()}),this.image_.origImage_&&this.mutationObserver.observe(this.image_.origImage_,{attributes:!0,attributeOldValue:!0})},this))},H.prototype.parentTreeChanges_=function(){if(this.parentTreeChangesPromise_)return this.parentTreeChangesPromise_;var t=a();return this.parentTreeCheckInterval_=window.setInterval(R(function(){H.matchesParentTree(this.image_,this.parentTree_)||(this.parentTree_=H.resolveParentTree(this.image_),window.clearInterval(this.parentTreeCheckInterval_),this.parentTreeCheckInterval_=null,this.parentTreeChangesPromise_=null,t.resolve())},this),H.PARENT_TREE_POLL_INTERVAL),this.parentTreeChangesPromise_=t.promise,t.promise},H.prototype.makeMeasurable_=function(){this.restored_||(T(this.image_,H.INVISIBLE_CLASS)?E(this.image_,H.INVISIBLE_CLASS):h(this.image_,"style","visibility:hidden"))},H.prototype.wrap_=function(){this.requireProxy_?(this.proxy_||(this.proxy_=this.makeProxy()),this.image_=this.proxy_):this.wrapImage_()},H.prototype.wrapImage_=function(){try{var t=this,e=this.image_.getAttribute,r=this.image_.setAttribute,n=N(this.image_,"src",{get:function(){return t.getSrc()},set:function(e){t.restoring_||p(t.image_,"cfsrc",e)}}),i=N(this.image_,"getAttribute",{value:function(r){return"src"===r?t.getSrc():"style"===r?t.getStyle():e.apply(t.image_,arguments)}}),o=N(this.image_,"setAttribute",{value:function(e,n){"src"===e?p(t.image_,"cfsrc",n):"style"===e?p(t.image_,"cfstyle",n):r.apply(t.image_,arguments)}});this.wrappedPropertyCache_.push(n,i,o)}catch(t){this.proxy_||(this.proxy_=this.makeProxy()),this.image_=this.proxy_}},H.prototype.makeProxy=function(){var t={};t.origImage_=this.image_;var e=this;return w(this.image_,function(r,n){"function"==typeof r?t[n]=function(){return this.origImage_[n].apply(this.origImage_,arguments)}:"SRC"===n.toUpperCase()?Object.defineProperty(t,n,{get:function(){return e.getSrc()},set:function(t){p(this.origImage_,"cfsrc",t)}}):Object.defineProperty(t,n,{get:function(){return this.origImage_[n]},set:function(t){this.origImage_[n]=t}})},null),N(t,"getAttribute",{value:function(t){return"SRC"===t.toUpperCase()?e.getSrc():"STYLE"===t.toUpperCase()?e.getStyle():this.origImage_.getAttribute(t)}}),N(t,"setAttribute",{value:function(t,e){"src"===t?p(this.origImage_,"cfsrc",e):"style"===t?p(this.origImage_,"cfstyle",e):setAttribute.apply(this.origImage_,arguments)}}),t},H.prototype.unwrap_=function(){this.wrappedPropertyCache_.length?y(this.wrappedPropertyCache_,function(t){t()}):this.image_=this.proxy_.origImage_},V.LOAD_TICK_INTERVAL=200,V.BINARY_LOCATION_FRAGMENT="/cdn-cgi/pe/mirage_bag?format=binary",V.DATAURL_LOCATION_FRAGMENT="/cdn-cgi/pe/mirage_bag?format=base64",V.prototype.load=function(t){var e=this.map_[t]=this.map_[t]||a();return null===this.timer_&&(this.timer_=setTimeout(R(function(){var t=this.map_,e=Object.keys(t);this.map_={},this.timer_=null,this.loadStrategy_(e,R(function(e,r,n,i){t[e].resolve({src:e,width:n,height:i,degradedSrc:r})},this),R(function(e,r){t[e].reject({loadStatus:r,message:e+" was not preloaded"})})).then(function(e){for(var r in t)r in e||t[r].reject(new Error(r+" was not preloaded."))},function(e){for(var r in t)t[r].reject(new Error("Fatal XHR failure."+(e?" "+e.message:"")))})},this),V.LOAD_TICK_INTERVAL)),e.promise},V.prototype.loadDataUrls_=function(t,e,r){var n=new XMLHttpRequest,i=!1,o=Pt;o+=t.reduce(function(t,e,r){var n="&r[]="+encodeURIComponent(e);return void 0!==rt&&$<=8&&(i=t.length+n.length>2032),t+(r<Ct.maxdegradedimages&&!i?n:"")},V.DATAURL_LOCATION_FRAGMENT);var s={},u=a(),c=0;return n.open("get",o),Ct.petok&&n.setRequestHeader("PE-Token",Ct.petok),n.onreadystatechange=function(){try{if(n.status>299)return u.reject()}catch(t){}if(n.readyState>2&&void 0!==n.responseText){for(var t=n.responseText;t&&c<t.length;)try{!function(){var n=new z(t,c);c+=n.stringLength,s[n.src]=n,n.isValid()?n.resolveSrc().then(function(t){e(n.src,t,n.width,n.height)}):r(n.src,n.json.loadStatus)}()}catch(t){break}4===n.readyState&&u.resolve(s)}},n.send(),u.promise},V.prototype.loadArrayBuffer_=function(t,e,r){var n=new XMLHttpRequest,i=Pt+t.reduce(function(t,e,r){return t+(r<Ct.maxdegradedimages?"&r[]="+encodeURIComponent(e):"")},V.BINARY_LOCATION_FRAGMENT),o={},s=a(),u=0;return n.open("get",i,!0),Ct.petok&&n.setRequestHeader("PE-Token",Ct.petok),n.responseType="arraybuffer",n.onreadystatechange=function(){try{if(n.status>299)return s.reject()}catch(t){}if(n.readyState>2){for(var t=n.response;t&&u<t.byteLength;)try{!function(){var n=new U(t,u);u+=n.byteLength,o[n.src]=n,n.isValid()?n.resolveSrc().then(function(t){e(n.src,t,n.width,n.height)}):r(n.src,n.json.loadStatus)}()}catch(t){break}4===n.readyState&&s.resolve(o)}},n.send(),s.promise},F.OPTIMIZATION_TIMEOUT=3e4,F.DISTANCE_FROM_VIEWPORT=100,F.RESTORE_NON_DEGRADED_IMAGE_TIMEOUT=50,F.prototype.sanitiseDOM=function(){return m(n(document.getElementsByTagName("img")),function(t){f(t,"cfsrc")&&t.nextSibling&&"NOSCRIPT"==t.nextSibling.tagName&&t.parentElement.removeChild(t.nextSibling)})},F.prototype.releaseNativeMethods=function(){w(this.nativeMethods,function(t,e){document[e]=t})},F.prototype.proxyElementList=function(t){var e=this.nativeMethods[t];return R(function(t){return m(e.call(document,t),function(t){return this.proxyMirageImage(t)},this)},this)},F.prototype.proxyElement=function(t){var e=this.nativeMethods[t];return R(function(t){return this.proxyMirageImage(e.call(document,t))},this)},F.prototype.proxyMirageImage=function(t){if(t&&t.nodeName&&"IMG"===t.nodeName.toUpperCase()){var e=v(this.imageCache_,function(e){return e.image_.origImage_===t});return e?e.image_:t}return t},F.prototype.captureNativeMethods=function(){y(["getElementsByTagName","getElementById","getElementsByClassName","querySelectorAll","querySelector"],function(t){this.nativeMethods[t]=document[t]},this),document.getElementsByClassName=this.proxyElementList("getElementsByClassName"),document.querySelectorAll=this.proxyElementList("querySelectorAll"),document.getElementById=this.proxyElement("getElementById"),document.querySelector=this.proxyElement("querySelector"),document.getElementsByTagName=R(function(t){var e=this.nativeMethods.getElementsByTagName;return"IMG"===t.toUpperCase()?m(e.call(document,"img"),function(t){return this.proxyMirageImage(t)},this):e.apply(document,arguments)},this)},F.prototype.capture=function(){return m(n(document.getElementsByTagName("img")),function(t){var e;return H.isValidCandidate(t)&&((e=new H(t,{forcePreloadOnly_:this.forcePreloadOnly_,proxy_:this.requireProxy_})).whenRestored(R(function(){this.manifest_.record(e.getSrc())},this)),this.imageCache_.push(e)),e},this)},F.prototype.logPreload=function(t){t in this.loadStatistics?this.loadStatistics[t]++:this.loadStatistics[t]=1},F.prototype.preload=function(){return this.reducePreloadableImages_().then(R(function(t){if(t.length){var e=m(t,function(t){var e=this.loader_.load(t.getSrc()).then(R(function(e){return this.logPreload(k.state.LOAD_OK),(this.supportsBinaryData_?this.postProcess_(e.degradedSrc,e.width,e.height):G.resolve(e.degradedSrc)).then(function(e){return t.setDegradedSrc(e).then(function(){return et.then(function(){return t.restoreWithinViewport()})})})},this),R(function(e){return bt("Attempt to preload image failed.",e.message),this.logPreload(e.loadStatus),et.then(function(){return t.restore()})},this));return t.isWithinViewport()?e:G.resolve()},this);return this.optimizationTimeout_=window.setTimeout(function(){y(t,function(t){t.restore()})},F.OPTIMIZATION_TIMEOUT),G.all(e).then(R(function(){this.optimizationTimeout_&&window.clearTimeout(this.optimizationTimeout_)},this))}},this))},F.prototype.backfill=function(){var t=[];return y(this.imageCache_,function(e){var r=e.restore();e.isWithinViewport()&&t.push(r)},this),G.all(t)},F.prototype.reset=function(){this.imageCache_=[],this.manifest_.clear()},F.prototype.setConfig=function(t){Ct.maxjsonsize=t.maxjsonsize||1e5,Ct.maxdegradedimages=t.maxdegradedimages||50,Ct.maxexternalimages=t.maxexternalimages||50,Ct.eagerLoad=t.eagerLoad||!1,Ct.petok=t.petok},F.prototype.accessorTest=function(t){var e=t.src,r=Object.getOwnPropertyDescriptor(t,"src")||Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t),"src")||{value:e,writable:!0,configurable:!0,enumerable:!0};return!(!r||r.configurable)},F.prototype.isHighLatency_=O,F.prototype.activate=function(){return tt.then(R(function(){this.sanitiseDOM(),this.requireProxy_=!1;var t=n(document.getElementsByTagName("img"));return t.length&&t.length>=1&&(this.requireProxy_=this.accessorTest(t[0])),this.capture(),this.requireProxy_&&this.captureNativeMethods(),this.isHighLatency_().then(R(function(t){return t||this.forcePreload_?this.preload():this.backfill()},this))},this))},F.prototype.postProcess_=function(t,e,r){return new G(function(n){var i=document.createElement("canvas"),o=document.createElement("img"),s=i.getContext("2d");i.width=e,i.height=r,o.addEventListener("load",R(function(){s.drawImage(o,0,0,e,r),n(i.toDataURL())},this)),o.addEventListener("error",R(function(t){bt("Error loading image."),n("")},this)),o.src=t})},F.prototype.limitPreloadableImages_=function(t){var e=[],r=[];return y(b(t,function(t){return!!t}),function(t,n){var i=dt(t);n<Ct.maxdegradedimages?(i||e.push(n),r.push(t)):i&&e.length>Ct.maxexternalimages&&(r.splice(e.pop(),1),r.push(t))}),G.resolve(r)},F.prototype.reducePreloadableImages_=function(){var t=[];return y(this.getUniqueSrcs_(),function(e,r){t.push(G.resolve().then(R(function(){return this.manifest_.has(e).then(function(t){if(!t)return e})},this),function(){}))},this),G.all(t).then(R(function(t){return this.limitPreloadableImages_(t).then(R(function(t){var e,r={};y(t,function(t){r[t]=!0},{});var n=[];return e=b(this.imageCache_,function(t){var e=r[t.getSrc()];return e||this.push(t),e},n),n.length>0&&window.setTimeout(function(){y(n,function(t){t.restore()})},F.RESTORE_NON_DEGRADED_IMAGE_TIMEOUT),e},this))},this))},F.prototype.getUniqueSrcs_=function(){var t={},e=[],r=[],n=window.innerWidth,i=window.innerHeight;return y(this.imageCache_,function(o){var s=o.getTop(),a=o.getLeft(),u=o.getSrc();s<i&&a<n&&!t[u]?e.push(u):r.push(u),t[o.getSrc()]=!0}),e.concat(r)},"undefined"==typeof __DEV__&&G.resolve().then(function(){var t=new F;t.activate().then(function(){t.requireProxy_&&t.releaseNativeMethods()})}),t.MirageLoader=V,t.MirageManager=F,t.PNGChunk=M,t.PNGImage=B,t.MirageDegradedImage=U,t.MirageDegradedImageFallback=z,t.MirageImage=H,t.MirageImageJSON=k,t.CacheManifest=j,t.arrayBufferSlice=x,t.fakeConnection=Lt,t.dom=rt,t.classes=yt,t.iterators=lt,t.path=_t,t.utility=W,t}({});

/*
     FILE ARCHIVED ON 05:23:20 Feb 08, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:41:12 Dec 07, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  exclusion.robots.policy: 0.211
  esindex: 0.015
  RedisCDXSource: 0.714
  load_resource: 141.016
  CDXLines.iter: 15.01 (3)
  PetaboxLoader3.datanode: 74.017 (4)
  exclusion.robots: 0.226
  LoadShardBlock: 71.541 (3)
  PetaboxLoader3.resolve: 107.584
  captures_list: 104.721
*/