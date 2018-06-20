(function(window){var svgSprite='<svg><symbol id="icon-sidebar-basic" viewBox="0 0 1024 1024"><path d="M896 128H128c-47.36 0-85.333333 37.973333-85.333333 85.333333v512a85.333333 85.333333 0 0 0 85.333333 85.333334h213.333333v85.333333h341.333334v-85.333333h213.333333c46.933333 0 84.906667-38.4 84.906667-85.333334L981.333333 213.333333a85.333333 85.333333 0 0 0-85.333333-85.333333z m0 597.333333H128V213.333333h768v512z m-213.333333-298.666666v85.333333h-128v128h-85.333334v-128H341.333333v-85.333333h128V298.666667h85.333334v128h128z"  ></path></symbol><symbol id="icon-sidebar-dashboard" viewBox="0 0 1024 1024"><path d="M469.333333 85.333333v853.333334c-216.32-21.333333-384-204.373333-384-426.666667s167.68-405.333333 384-426.666667z m86.613334 0v383.573334H938.666667c-20.053333-202.24-180.906667-363.52-382.72-383.573334z m0 469.76V938.666667c202.24-20.053333 362.666667-181.333333 382.72-383.573334h-382.72z"  ></path></symbol><symbol id="icon-sidebar-card" viewBox="0 0 1024 1024"><path d="M128 554.666667h341.333333V128H128v426.666667z m0 341.333333h341.333333v-256H128v256z m426.666667 0h341.333333V469.333333h-341.333333v426.666667z m0-768v256h341.333333V128h-341.333333z"  ></path></symbol><symbol id="icon-sidebar-dialog" viewBox="0 0 1024 1024"><path d="M810.666667 170.666667H213.333333a85.333333 85.333333 0 0 0-85.333333 85.333333v512a85.333333 85.333333 0 0 0 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V256a85.333333 85.333333 0 0 0-85.333333-85.333333z m0 597.333333H213.333333V341.333333h597.333334v426.666667z"  ></path></symbol><symbol id="icon-sidebar-error" viewBox="0 0 1024 1024"><path d="M512 85.333333C276.48 85.333333 85.333333 276.48 85.333333 512s191.146667 426.666667 426.666667 426.666667 426.666667-191.146667 426.666667-426.666667S747.52 85.333333 512 85.333333zM170.666667 512c0-188.586667 152.746667-341.333333 341.333333-341.333333 78.933333 0 151.466667 26.88 209.066667 72.106666L242.773333 721.066667A337.152 337.152 0 0 1 170.666667 512z m341.333333 341.333333c-78.933333 0-151.466667-26.88-209.066667-72.106666L781.226667 302.933333A337.152 337.152 0 0 1 853.333333 512c0 188.586667-152.746667 341.333333-341.333333 341.333333z"  ></path></symbol><symbol id="icon-sidebar-form" viewBox="0 0 1024 1024"><path d="M597.333333 85.333333H256c-46.933333 0-84.906667 38.4-84.906667 85.333334L170.666667 853.333333c0 46.933333 37.973333 85.333333 84.906666 85.333334H768c46.933333 0 85.333333-38.4 85.333333-85.333334V341.333333l-256-256z m85.333334 682.666667H341.333333v-85.333333h341.333334v85.333333z m0-170.666667H341.333333v-85.333333h341.333334v85.333333z m-128-213.333333V149.333333L789.333333 384H554.666667z"  ></path></symbol><symbol id="icon-sidebar-nav" viewBox="0 0 1024 1024"><path d="M128 554.666667h85.333333v-85.333334H128v85.333334z m0 170.666666h85.333333v-85.333333H128v85.333333z m0-341.333333h85.333333V298.666667H128v85.333333z m170.666667 170.666667h597.333333v-85.333334H298.666667v85.333334z m0 170.666666h597.333333v-85.333333H298.666667v85.333333zM298.666667 298.666667v85.333333h597.333333V298.666667H298.666667z"  ></path></symbol><symbol id="icon-sidebar-table" viewBox="0 0 1024 1024"><path d="M298.666667 213.333333h85.333333V128H298.666667v85.333333z m0 341.333334h85.333333v-85.333334H298.666667v85.333334z m0 341.333333h85.333333v-85.333333H298.666667v85.333333z m170.666666-170.666667h85.333334v-85.333333h-85.333334v85.333333z m0 170.666667h85.333334v-85.333333h-85.333334v85.333333z m-341.333333 0h85.333333v-85.333333H128v85.333333z m0-170.666667h85.333333v-85.333333H128v85.333333z m0-170.666666h85.333333v-85.333334H128v85.333334z m0-170.666667h85.333333V298.666667H128v85.333333z m0-170.666667h85.333333V128H128v85.333333z m341.333333 341.333334h85.333334v-85.333334h-85.333334v85.333334z m341.333334 170.666666h85.333333v-85.333333h-85.333333v85.333333z m0-170.666666h85.333333v-85.333334h-85.333333v85.333334z m0 341.333333h85.333333v-85.333333h-85.333333v85.333333z m0-512h85.333333V298.666667h-85.333333v85.333333z m-341.333334 0h85.333334V298.666667h-85.333334v85.333333z m341.333334-256v85.333333h85.333333V128h-85.333333z m-341.333334 85.333333h85.333334V128h-85.333334v85.333333z m170.666667 682.666667h85.333333v-85.333333h-85.333333v85.333333z m0-341.333333h85.333333v-85.333334h-85.333333v85.333334z m0-341.333334h85.333333V128h-85.333333v85.333333z"  ></path></symbol><symbol id="icon-sidebar-notice" viewBox="0 0 1024 1024"><path d="M853.333333 85.333333H170.666667c-46.933333 0-84.906667 38.4-84.906667 85.333334L85.333333 938.666667l170.666667-170.666667h597.333333c46.933333 0 85.333333-38.4 85.333334-85.333333V170.666667c0-46.933333-38.4-85.333333-85.333334-85.333334z m-298.666666 384h-85.333334V213.333333h85.333334v256z m0 170.666667h-85.333334v-85.333333h85.333334v85.333333z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)