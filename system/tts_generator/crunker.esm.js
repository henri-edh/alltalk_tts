var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function r(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return a(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,(o=a.key,i=void 0,i=function(e,t){if("object"!==n(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var a=r.call(e,t||"default");if("object"!==n(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(o,"string"),"symbol"===n(i)?i:String(i)),a)}var o,i}e.d(t,{Z:()=>u});var u=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.sampleRate;o(this,e),this._context=this._createContext(n),n||(n=this._context.sampleRate),this._sampleRate=n}var t,n,a;return t=e,n=[{key:"_createContext",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:44100;return window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext,new AudioContext({sampleRate:e})}},{key:"context",get:function(){return this._context}},{key:"fetchAudio",value:async function(){for(var e=this,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return await Promise.all(n.map((async function(t){var n;return n=t instanceof File||t instanceof Blob?await t.arrayBuffer():await fetch(t).then((function(e){return e.headers.has("Content-Type")&&!e.headers.get("Content-Type").includes("audio/")&&console.warn("Crunker: Attempted to fetch an audio file, but its MIME type is `".concat(e.headers.get("Content-Type").split(";")[0],"`. We'll try and continue anyway. (file: \"").concat(t,'")')),e.arrayBuffer()})),await e._context.decodeAudioData(n)})))}},{key:"mergeAudio",value:function(e){var t=this._context.createBuffer(this._maxNumberOfChannels(e),this._sampleRate*this._maxDuration(e),this._sampleRate);return e.forEach((function(e){for(var n=0;n<e.numberOfChannels;n++){for(var r=t.getChannelData(n),a=e.getChannelData(n),o=e.getChannelData(n).length-1;o>=0;o--)r[o]+=a[o];t.getChannelData(n).set(r)}})),t}},{key:"concatAudio",value:function(e){var t=this._context.createBuffer(this._maxNumberOfChannels(e),this._totalLength(e),this._sampleRate),n=0;return e.forEach((function(e){for(var r=0;r<e.numberOfChannels;r++)t.getChannelData(r).set(e.getChannelData(r),n);n+=e.length})),t}},{key:"padAudio",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;if(0===n)return e;if(t<0)throw new Error('Crunker: Parameter "padStart" in padAudio must be positive');if(n<0)throw new Error('Crunker: Parameter "seconds" in padAudio must be positive');for(var r=this._context.createBuffer(e.numberOfChannels,Math.ceil(e.length+n*e.sampleRate),e.sampleRate),a=0;a<e.numberOfChannels;a++){var o=e.getChannelData(a);r.getChannelData(a).set(o.subarray(0,Math.ceil(t*e.sampleRate)+1),0),r.getChannelData(a).set(o.subarray(Math.ceil(t*e.sampleRate)+2,r.length+1),Math.ceil((t+n)*e.sampleRate))}return r}},{key:"sliceAudio",value:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0;if(t>=n)throw new Error('Crunker: "start" time should be less than "end" time in sliceAudio method');for(var o=Math.round((n-t)*this._sampleRate),i=Math.round(t*this._sampleRate),u=this._context.createBuffer(e.numberOfChannels,o,this._sampleRate),l=0;l<e.numberOfChannels;l++)for(var s=e.getChannelData(l),c=u.getChannelData(l),f=0;f<o;f++)c[f]=s[i+f],f<r*this._sampleRate&&(c[f]*=f/(r*this._sampleRate)),f>o-a*this._sampleRate&&(c[f]*=(o-f)/(a*this._sampleRate));return u}},{key:"play",value:function(e){var t=this._context.createBufferSource();return t.buffer=e,t.connect(this._context.destination),t.start(),t}},{key:"export",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"audio/wav",n=this._interleave(e),r=this._writeHeaders(n,e.numberOfChannels,e.sampleRate),a=new Blob([r],{type:t});return{blob:a,url:this._renderURL(a),element:this._renderAudioElement(a)}}},{key:"download",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"crunker",n=document.createElement("a");return n.style.display="none",n.href=this._renderURL(e),n.download="".concat(t,".").concat(e.type.split("/")[1]),n.click(),n}},{key:"notSupported",value:function(e){return this._isSupported()?void 0:e()}},{key:"close",value:function(){return this._context.close(),this}},{key:"_maxDuration",value:function(e){return Math.max.apply(Math,r(e.map((function(e){return e.duration}))))}},{key:"_maxNumberOfChannels",value:function(e){return Math.max.apply(Math,r(e.map((function(e){return e.numberOfChannels}))))}},{key:"_totalLength",value:function(e){return e.map((function(e){return e.length})).reduce((function(e,t){return e+t}),0)}},{key:"_isSupported",value:function(){return"AudioContext"in window||"webkitAudioContext"in window||"mozAudioContext"in window}},{key:"_writeHeaders",value:function(e,t,n){var r=2*t,a=2*e.length,o=36+a,i=new ArrayBuffer(8+o),u=new DataView(i);return this._writeString(u,0,"RIFF"),u.setUint32(4,o,!0),this._writeString(u,8,"WAVE"),this._writeString(u,12,"fmt "),u.setUint32(16,16,!0),u.setUint16(20,1,!0),u.setUint16(22,t,!0),u.setUint32(24,n,!0),u.setUint32(28,n*r,!0),u.setUint16(32,r,!0),u.setUint16(34,16,!0),this._writeString(u,36,"data"),u.setUint32(40,a,!0),this._floatTo16BitPCM(u,e,44)}},{key:"_floatTo16BitPCM",value:function(e,t,n){for(var r=0;r<t.length;r++,n+=2){var a=Math.max(-1,Math.min(1,t[r]));e.setInt16(n,a<0?32768*a:32767*a,!0)}return e}},{key:"_writeString",value:function(e,t,n){for(var r=0;r<n.length;r++)e.setUint8(t+r,n.charCodeAt(r))}},{key:"_interleave",value:function(e){if(1===e.numberOfChannels)return e.getChannelData(0);for(var t=[],n=0;n<e.numberOfChannels;n++)t.push(e.getChannelData(n));for(var r=t.reduce((function(e,t){return e+t.length}),0),a=new Float32Array(r),o=0,i=0;o<r;)t.forEach((function(e){a[o++]=e[i]})),i++;return a}},{key:"_renderAudioElement",value:function(e){var t=document.createElement("audio");return t.controls=!0,t.src=this._renderURL(e),t}},{key:"_renderURL",value:function(e){return(window.URL||window.webkitURL).createObjectURL(e)}}],n&&i(t.prototype,n),a&&i(t,a),Object.defineProperty(t,"prototype",{writable:!1}),e}(),l=t.Z;export{l as default};
//# sourceMappingURL=crunker.esm.js.map