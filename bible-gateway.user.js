// ==UserScript==
// @name         Bible Gateway - Automatic Parallel Bible
// @namespace    miller.run
// @version      0.1.0
// @description  Automatically switch to AKJV, BRG, NASB, NIV, and ESV Parallel Bible.
// @author       Grant Miller
// @match        https://www.biblegateway.com/passage/?search=*&version=*
// @grant        none
// ==/UserScript==

(async function () {
  'use strict';
  
  const search = new URL(location).searchParams;
  const versions = 'AKJV;BRG;NASB;NIV;ESV';
  
  if (search.get('version') !== versions) {
    search.set('version', versions);
    location.search = decodeURIComponent(search.toString());
  } else {
    const style = document.createElement('style');
    
    style.type = 'text/css';
    
    const custom_css = `
      .passage-box .passage-col {
        padding: 40px 33px;
      }
      
      .passage-col {
        margin: 0 -1px;
      }
    `;
    
    style.appendChild(document.createTextNode(custom_css));
    
    const bible_gateway_css_injection_status = new Promise((resolve, reject) => {
      style.onload = resolve;
      style.onerror = reject;
    });
    
    document.head.appendChild(style);
    
    await bible_gateway_css_injection_status;
  }
})();