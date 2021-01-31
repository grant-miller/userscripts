// ==UserScript==
// @name         Bible Gateway - Automatic Parallel Bible
// @namespace    miller.run
// @version      0.1.0
// @description  Automatically switch to AKJV, BRG, NASB, NIV, and ESV Parallel Bible; optimize passage column width; normalize URLs for sharing; increase BRG "Father Speech" visibility; click verse number to search; label omitted verses.
// @author       Grant Miller
// @match        https://www.biblegateway.com/passage/?search=*&version=*
// @grant        none
// ==/UserScript==

(async function () {
  'use strict';
  
  const search = new URLSearchParams(location.search);
  const versions = 'AKJV;BRG;NASB;NIV;ESV';
  
  if (search.get('version') !== versions || location.search !== decodeURIComponent(location.search)) {
    /**
     * Force Parallel Bible and Prettify URLs for Sharing
     */
    
    search.set('version', versions);
    location.search = decodeURIComponent(search.toString());
  } else {
    const $passage_columns = document.querySelectorAll('.passage-col');
    const $verse_numbers = document.querySelectorAll('.chapternum, .versenum');
    
    const $prev_chapter = document.querySelector('.prev-chapter');
    const $next_chapter = document.querySelector('.next-chapter');
    
    /**
     * Customize Styles
     */
    
    const style = document.createElement('style');
    
    style.type = 'text/css';
    
    const custom_css = `
      /* Optimize Passage Column Width */
      
      .passage-box .passage-col {
        padding: 40px 33px;
      }
      
      .passage-col {
        margin: 0 -1px;
      }
      
      /* BRG Version - Father Speech - Increase Visibility */
      
      .text-html span.father-speech {
        color: #0008ff;
      }
      
      /* Custom Class - Verse Omitted */
      
      .verse-omitted {
        background: #ff0;
        border: 1px dashed #888;
        color: #000;
        display: inline-block;
        font-size: 12px;
        font-weight: bold;
        margin: 5px 15px;
        text-align: center;
        width: 100px;
      }
    `;
    
    style.appendChild(document.createTextNode(custom_css));
    
    const bible_gateway_css_injection_status = new Promise((resolve, reject) => {
      style.onload = resolve;
      style.onerror = reject;
    });
    
    document.head.appendChild(style);
    
    await bible_gateway_css_injection_status;
    
    /**
     * Prettify "Previous Chapter" and "Next Chapter" Link URLs for Sharing
     */
    
    $prev_chapter.href = decodeURIComponent($prev_chapter.href).replace(/\s+/g, '+');
    $next_chapter.href = decodeURIComponent($next_chapter.href).replace(/\s+/g, '+');
    
    /**
     * Add Startpage.com Search Link to Verse Number / Label Missing Verses
     */
    
    for (let i = 0; i < $passage_columns.length; i++) {
      const $passage_column = $passage_columns[i];
      const $verse_numbers = $passage_column.querySelectorAll('.chapternum, .versenum')
      
      let expected_verse_number = 1;
      
      for (let j = 0; j < $verse_numbers.length; j++) {
        const $verse_number = $verse_numbers[j];
        const $verse = $verse_number.closest('.text');
        
        if ($verse) {
          const verse_number_text = $verse_number.textContent.trim();
          const verse_search_query = [...$verse.classList].pop().replace(/\-(\d+)$/g, ':$1').replace(/-/g, '+');
          const verse_number = +verse_number_text.replace(/\D/g, '');
          
          $verse_number.innerHTML = `<a href="https://www.startpage.com/do/search?q=${verse_search_query}" target="_blank">${verse_number_text}</a>&nbsp;`;
          
          if ($verse_number.matches('.chapternum')) {
            expected_verse_number++;
            continue;
          }
          
          if (verse_number === expected_verse_number) {
            expected_verse_number++;
          } else {
            expected_verse_number = verse_number + 1;
            
            $verse_number.insertAdjacentHTML('beforebegin', '<span class="verse-omitted">Verse Omitted</span>');
          }
        }
      }
    }
  }
})();
