import{a as E,S,i as s}from"./assets/vendor-tnUJPedx.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const H="48146281-74a8df349cdfa7f862384d5f8",I="https://pixabay.com/api/";async function h(t,r=1,i=15){try{return(await E.get(I,{params:{key:H,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:i}})).data}catch(n){throw console.error("Error fetching images:",n),n}}function g(t){return t.map(({webformatURL:r,largeImageURL:i,tags:n,likes:e,views:o,comments:a,downloads:v})=>`
      <a href="${i}" class="gallery__item">
        <div class="image-card">
          <img src="${r}" alt="${n}" loading="lazy" />
          <div class="info">
            <p><b>Likes:</b> ${e}</p>
            <p><b>Views:</b> ${o}</p>
            <p><b>Comments:</b> ${a}</p>
            <p><b>Downloads:</b> ${v}</p>
          </div>
        </div>
      </a>
    `).join("")}const M=document.querySelector("#search-form"),c=document.querySelector(".gallery"),y=document.querySelector("#loader"),u=document.querySelector("#load-more-btn");let m="",l=1,d=0,p=new S(".gallery a");function b(){y.style.display="block"}function w(){y.style.display="none"}function q(){c.innerHTML=""}function $(){u.style.display="block"}function f(){u.style.display="none"}async function B(t){m=t,l=1,d=0,q(),f(),b();try{const r=await h(t,l);d=r.totalHits,r.hits.length===0?s.error({title:"Error",message:"No images found!"}):(c.innerHTML=g(r.hits),p.refresh(),r.totalHits>15&&$())}catch{s.error({title:"Error",message:"Failed to fetch images."})}finally{w()}}async function L(){l+=1,b();try{const t=await h(m,l);t.hits.length===0?(s.info({title:"Info",message:"You've reached the end of the results."}),f()):(c.insertAdjacentHTML("beforeend",g(t.hits)),p.refresh(),l*15>=d&&(f(),s.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})),O())}catch{s.error({title:"Error",message:"Failed to load more images."})}finally{w()}}M.addEventListener("submit",t=>{t.preventDefault();const r=t.target.elements.searchQuery.value.trim();r?B(r):s.warning({title:"Warning",message:"Search query cannot be empty!"})});u.addEventListener("click",L);window.addEventListener("scroll",()=>{window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-100&&m&&L()});function O(){const t=c.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
