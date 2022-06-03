var y=Object.defineProperty;var _=(r,t)=>{for(var e in t)y(r,e,{get:t[e],enumerable:!0})};var u=class{static _getAttributes(t){return[...t.attributes].map(e=>e.name)}static _getNodeType(t){return t.nodeType===3?"text":t.nodeType===8?"comment":t.nodeType===11?"fragment":t.tagName.toLowerCase()}static _getNodeContent(t){return t.childNodes&&t.childNodes.length>0?null:t.textContent}static update(t,e){if(this._getNodeType(t)==="text"||this._getNodeType(e)==="text")return;let n=[...new Set([...u._getAttributes(t),...u._getAttributes(e)])],i=(s,o)=>{s.startsWith("on")?e[s.toLowerCase()]=o:e.setAttributeNS(null,s,o)},c=s=>{s.startsWith("on")?e[s.toLowerCase()]=()=>{}:e.removeAttribute(s)};for(let s of n){let o=t.getAttribute(s),h=e.getAttribute(s);!h||h!==o?i(s,o):o||c(s)}}static diff(t,e){let n=[...e.childNodes],i=[...t.childNodes],c=n.length-i.length;if(c>0)for(;c>0;c--)n[n.length-c].remove();i.forEach((s,o)=>{if(!n[o]){e.appendChild(s.cloneNode(!0));return}if(this._getNodeType(s)!==this._getNodeType(n[o])){n[o].replaceWith(s.cloneNode(!0));return}this._getNodeType(s)!=="comment"&&u.update(s,n[o]);let h=this._getNodeContent(s);if(h&&h!==this._getNodeContent(n[o])&&(n[o].textContent=h),n[o].childNodes.length>0&&s.childNodes.length<1){n[o].innerHTML="";return}if(n[o].childNodes.length<1&&s.childNodes.length>0){let m=document.createDocumentFragment();this.diff(s,m),n[o].appendChild(m);return}s.childNodes.length>0&&this.diff(s,n[o])})}};var a=class{subscriptions=[];initialState={};state={};reducer=null;constructor(t={},e=()=>{}){this.initialState=t,this.state=this.createStore(this.initialState),this.reducer=e}dispatch(t){let e=this.reducer(this.state,t);Object.assign(this.state,e)}getState(){return this.state}addSubscription(t){this.subscriptions.push(t)}getEventListeners(t){return this.eventListeners.filter(e=>e.name===t).map(e=>e.cb)}createStore(t){let e={set:(i,c,s)=>(i[c]=n(s),this.subscriptions.forEach(o=>o()),!0)},n=(i={})=>{if(["[object Object]","[object Array]"].includes(i.toString())){if(Array.isArray(i))for(let s=0;s<i.length;s++)i[s]=n(i[s]);else for(let[s,o]of Object.entries(i))i[s]=n(o);return new Proxy(i,e)}return i};return n(t)}};var g={};_(g,{$:()=>b,$$:()=>C,isFunction:()=>l,jsh:()=>d});var p=r=>{if(r.startsWith("_"))return r.substring(1);let t="";for(let e of r){let n=e.toLowerCase();t+=n===e?e:`-${n}`}return t.toLowerCase()},N=(r,t={},e=[])=>{let n=r==="fragment",i=["svg","path"].includes(r),c=n?document.createDocumentFragment():i?document.createElementNS(t.xmlns||"http://www.w3.org/2000/svg",r):document.createElement(r);if(!n)for(let[o,h]of Object.entries(t))o==="style"&&h.toString()==="[object Object]"?Object.assign(c.style,h):o==="__innerHTML"?c.innerHTML=h:o.startsWith("on")?c[o.toLowerCase()]=h:c.setAttribute(p(o),h);let s=e.flat(1/0).filter(o=>o);for(let o of s)typeof o=="string"?c.appendChild(document.createTextNode(o)):c.appendChild(o);return c},d=new Proxy({},{get:(r,t)=>(e,...n)=>N(p(t),e,n)}),b=(r,t)=>r&&t?r.querySelector(t):document.body.querySelector(r),C=(r,t)=>[...r&&t?r.querySelectorAll(t):document.body.querySelectorAll(r)],l=r=>r&&typeof r=="function";var f=class extends HTMLElement{props={};store={};style="";_debounce=null;_mounted=!1;constructor(){super(),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(d.div()))}static define(t,e){customElements.define(t,e)}render(){}mount(){}unmount(){}_createStore(){this.store=this.store instanceof a?this.store:new a(this.store),this.store.addSubscription(()=>{this._updateDOM()})}connectedCallback(){this._debounce&&cancelAnimationFrame(this._debounce),this._debounce=requestAnimationFrame(()=>{this._mounted||(this._internalMount(),l(this.mount)&&this.mount())})}disconnectedCallback(){l(this.unmount)&&this.unmount()}_internalMount(){this._createProps(),this._createStore(),this._updateDOM(!0),this._trackMutations(),this._mounted=!0}_trackMutations(){new MutationObserver(()=>{this._createProps(),this._updateDOM()}).observe(this,{attributes:!0,childList:!0,subtree:!0})}_createProps(){let t={};for(let e of this.getAttributeNames())t[e]=this.getAttribute(e);t.children=[...this.childNodes],this.props=t}_updateDOM(t){let e=this.render();if(this._updateStyles(),t){e&&this.shadowRoot.firstChild.appendChild(e);return}if(e){let n=u._getNodeType(e)==="fragment";u.diff(n?d.div({},[...e.childNodes]):d.div({},e),this.shadowRoot.firstChild)}else this.shadowRoot.firstChild.innerHTML=""}_updateStyles(){let t=l(this.style)?this.style():this.style;!this._styleElement&&t&&(this._styleElement=document.createElement("style"),this.shadowRoot.appendChild(this._styleElement)),t&&t!==this._styleElement.textContent&&(this._styleElement.textContent=t)}};export{a as ZeroStore,g as ZeroUtils,f as default};
