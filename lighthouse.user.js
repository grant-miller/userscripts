// ==UserScript==
// @name         Run Lighthouse
// @namespace    miller.run
// @version      0.1.0
// @description  Run Lighthouse in any browser!
// @author       Grant Miller
// @match        *://*/*
// @grant        none
// @noframes
// ==/UserScript==

'use strict';

(async () => {
  const lighthouse_button = document.createElement('div');
  const lighthouse_icon = '<svg viewBox="0 0 750 750" xmlns="http://www.w3.org/2000/svg"><path d="M92.43 571.02c52.32 0 52.32-33.94 104.64-33.94s52.3 33.94 104.63 33.94c52.32 0 52.32-33.94 104.63-33.94 52.3 0 52.32 33.94 104.64 33.94s52.32-33.94 104.64-33.94c49.5 0 52.18 30.34 96.57 33.64a326.73 326.73 0 0 0 8.1-72.4c0-179.86-145.83-325.68-325.7-325.68-179.87 0-325.7 145.82-325.7 325.7a326.75 326.75 0 0 0 7.9 71.5 98.88 98.88 0 0 0 15.66 1.18z" fill="#304ffe"/><path d="M362.98 213.56h84.84v78.5h-84.84z" fill="#ffd54f"/><path d="M362.98 213.56h29.95v78.5h-29.95z" fill="#fff176"/><ellipse cx="392.3" cy="233.21" fill="#fff176" rx="19.84" ry="24.89"/><path d="M360.9 204.7a43.84 43.84 0 1 1 87.67 0" fill="#f4511e"/><path d="M405.1 160.87a43.5 43.5 0 0 1 43.47 43.83H405.1v-43.83z" fill="#e64a19"/><rect fill="#f4511e" height="11.31" rx="5.66" ry="5.66" width="104.64" x="352.42" y="203.29"/><path d="M350.8 534.02l12.23-242.5h84.84l10.93 230.5z" fill="#c5cae9"/><path d="M449.04 310.25l3.26 64.17" fill="#ff7043"/><path d="M359.85 351.82l-3.42 67.3 95.87-44.7-3.26-64.17z" fill="#ff7043"/><path d="M455.52 437.66l3.27 64.18" fill="#ff7043"/><path d="M353.05 485.42l-3.42 67.3 109.16-50.88-3.28-64.18z" fill="#ff7043"/><path d="M350 255.9h109.48v35.82h-109.5z" fill="#e64a19"/><path d="M350 255.9h71.77v35.82H350z" fill="#f4511e"/><path d="M403.98 255.9c0 13-12.1 23.5-27 23.5s-27-10.52-27-23.5" fill="#ffe082" opacity=".5"/><path d="M542.66 245.8a19.6 19.6 0 0 1 8.32 1.85 34.5 34.5 0 0 1 66.7-9h.12a23.25 23.25 0 0 1 0 46.5h-75.14a19.67 19.67 0 1 1 0-39.34z" fill="#2979ff"/><path d="M319.66 433.3a16.6 16.6 0 0 1 7 1.55 29.23 29.23 0 0 1 56.53-7.63h.1a19.7 19.7 0 1 1 0 39.4h-63.64a16.67 16.67 0 1 1 0-33.33z" fill="#448aff"/><g transform="translate(-111.07 296.27)"><circle cx="593.87" cy="-88.78" fill="#fdd835" r="3.53"/><circle cx="624.87" cy="109.62" fill="#fff9c4" r="6.13"/><circle cx="253.47" cy="53.59" fill="#fff9c4" r="6.13"/><circle cx="353.42" cy="160.21" fill="#fff9c4" r="6.13"/><circle cx="598.48" cy="11.64" fill="#fff9c4" r="6.13"/><circle cx="727.63" cy="169.54" fill="#fff9c4" r="6.13"/><circle cx="240.27" cy="192.4" fill="#fdd835" r="3.53"/><circle cx="272.83" cy="121.09" fill="#fdd835" r="3.53"/><circle cx="294.74" cy="102.71" fill="#fdd835" r="3.53"/><circle cx="387.35" cy="20" fill="#fdd835" r="3.53"/><circle cx="679.87" cy="30.22" fill="#fdd835" r="3.53"/><circle cx="818.6" cy="177.65" fill="#fdd835" r="3.53"/><circle cx="328.68" cy="9.39" fill="#fdd835" r="3.53"/><circle cx="640.9" cy="179.2" fill="#fdd835" r="3.53"/><circle cx="747.87" cy="90.75" fill="#fdd835" r="3.53"/></g><path d="M364.42 212.37L29.8 164.57a3.65 3.65 0 0 0-1-.13c-8.67 0-16 31.9-16 71.15 0 39.25 7.33 71.06 16 71.06a3.66 3.66 0 0 0 .93-.13l334.64-47.88v-46.28z" fill="#ffe082" opacity=".5"/><path d="M451.07 291.52h-42.9v219.5l51.63 23-8.73-242.5z" fill="#304ffe" opacity=".5"/><path d="M302.7 571.75c52.32 0 52.32-33.94 104.63-33.94 52.3 0 52.32 33.95 104.63 33.95 44.42 0 51.13-24.46 84.16-31.84C551 515.26 483.6 499.6 408.28 499.6c-75.63 0-143.28 15.8-188.4 40.64 31.92 7.73 39 31.53 82.82 31.53z" fill="#00c853"/><path d="M302.8 571.28c52.32 0 52.32-33.94 104.63-33.94h1.1l-.58-37.32c-74.9 0-142 15.5-187.08 39.9 31.16 8 38.55 31.36 81.93 31.36z" fill="#64dd17"/></svg>';
  const loading_icon = '<svg preserveAspectRatio="xMidYMid" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" fill="none" r="0" stroke="#f3b72e" stroke-width="2"><animate attributeName="r" begin="-0.5s" calcMode="spline" dur="1" keySplines="0 0.2 0.8 1" keyTimes="0;1" repeatCount="indefinite" values="0;40"/><animate attributeName="opacity" begin="-0.5s" calcMode="spline" dur="1" keySplines="0.2 0 0.8 1" keyTimes="0;1" repeatCount="indefinite" values="1;0"/></circle><circle cx="50" cy="50" fill="none" r="0" stroke="#3869c5" stroke-width="2"><animate attributeName="r" begin="0s" calcMode="spline" dur="1" keySplines="0 0.2 0.8 1" keyTimes="0;1" repeatCount="indefinite" values="0;40"/><animate attributeName="opacity" begin="0s" calcMode="spline" dur="1" keySplines="0.2 0 0.8 1" keyTimes="0;1" repeatCount="indefinite" values="1;0"/></circle></svg>';
  const outgoing_icon = '<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><path d="M38.288 10.297l1.414 1.415-14.99 14.99-1.414-1.414z"/><path d="M40 20h-2v-8h-8v-2h10z"/><path d="M35 38H15c-1.7 0-3-1.3-3-3V15c0-1.7 1.3-3 3-3h11v2H15c-.6 0-1 .4-1 1v20c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V24h2v11c0 1.7-1.3 3-3 3z"/></svg>';
  
  lighthouse_button.title = 'Generate Lighthouse Report';
  lighthouse_button.innerHTML = lighthouse_icon;
  
  lighthouse_button.style.position = 'fixed';
  lighthouse_button.style.bottom = 0;
  lighthouse_button.style.right = 0;
  lighthouse_button.style.width = '50px';
  lighthouse_button.style.height = '50px';
  lighthouse_button.style.background = '#fafafa';
  lighthouse_button.style.border = '1px solid #aaa';
  lighthouse_button.style.borderRadius = '2px';
  lighthouse_button.style.cursor = 'pointer';
  lighthouse_button.style.zIndex = 2147483647;
  
  lighthouse_button.addEventListener('click', event => {
    const button = event.currentTarget;
    if (button.id !== 'lighthouse-complete') {
      const endpoint = `https://builder-dot-lighthouse-ci.appspot.com/stream?url=${location.href}`;
      const source = new EventSource(endpoint);
      button.title = 'Generating Lighthouse Report';
      button.innerHTML = loading_icon;
      source.addEventListener('message', e => {
        if (e.data.startsWith('done')) {
          const url = e.data.split(' ')[1];
          source.close();
          button.id = 'lighthouse-complete';
          button.title = 'Open Lighthouse Report';
          button.innerHTML = `<a href="${url}" target="_blank">${outgoing_icon}</a>`;
          return;
        }
      });
    }
  });
  
  document.body.appendChild(lighthouse_button);
})();