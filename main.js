import {data} from './test-data.js';
const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)


const firebaseConfig = {
    apiKey: "AIzaSyDspbMGMpvMvX8On_xVp6w-fB6qmmvh-0Q",
    authDomain: "web-app-cde6e.firebaseapp.com",
    databaseURL: "https://web-app-cde6e-default-rtdb.firebaseio.com",
    projectId: "web-app-cde6e",
    storageBucket: "web-app-cde6e.appspot.com",
    messagingSenderId: "647936709001",
    appId: "1:647936709001:web:936abe6d74d8c8dfd21158",
    measurementId: "G-KED4WSNY18"
  };


/* =========================
  UI elements
  ========================== */
  
  const backBtns = $$('.back-btn')
  const popUpCloseBtn = $('#popUpCloseBtn')
  const popupSheet = $('#popupSheet')
  const popupOverlay = $('#popupOverlay')
  const openPopUpBtn = $('#openPopUp')
  const createTipBtn = $('#createTipBtn')
  
/* =========================
   ROUTES MAP
========================= */

const routes = {
  "/": "home",
  "/tips": "tips",
  "/about": "about",
  "/create": "create"
};
//location.hash='#/create'

/* =========================
   PAGE RENDERER
========================= */

function renderPage(page) {

  // Hide all pages
  document.querySelectorAll(".page").forEach((el) => {
    el.classList.add("hidden");
  });

  // Find requested page
  const current = document.getElementById(page);

  // If page exists → show
  if (current) {
    current.classList.remove("hidden");
  } 
  // Else → show 404
  else {
    document
      .getElementById("notfound")
      .classList.remove("hidden");
  }
}


/* =========================
   ROUTER ENGINE
========================= */

function router() {

  const hash = location.hash || "#/";
  const path = hash.replace("#", "");

  const page = routes[path] || "notfound";

  renderPage(page);
}


/* =========================
   LIFECYCLE BOOT
========================= */

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
const getList = (d)=>{
  const p = d[1].post
  return`
  
            
            <div class="flex">
              <div class="img">
                <img src="https://cdn.prod.website-files.com/5d45253d28d7ff0ca3c976d1/5dc010764f3e3577f6089c91_iPhone-Battery-Replacement-by-Fixxo-BG.jpg" alt="thumbnail" />
              </div>
              <div class="detail">
                <h3>${p.title}</h3>
                <p>${p.desc || null}</p>
              </div>
            </div>
            
            <div class="function-box">
              <div class="space"><p>Hard</p> </div>
              <div class="box">
                <span class="thumb-up active">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
</svg>
<p>124</p>
                </span>
                <span class="thumb-down">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
</svg>
                
                <p>8</p></span>
                <span class="comment">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
</svg>
                
                <p>34</p></span>
              </div>
              <span class="more">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
</svg>
              </span>
            </div>
          
`
}

const createUi=(d)=>{
  const tipsList = document.getElementById('tips-list')
  const listItem = document.createElement('div')
  listItem.classList.add('list-item')
  
  listItem.innerHTML=getList(d)
  tipsList.appendChild(listItem)
  
  listItem.onclick=()=>location.hash='#/tips'
}


const dataArray = Object.entries(data)

dataArray.forEach(d=>createUi(d))



/* =========
BACK BTN NAV FUNCTION 
=========== */
backBtns.forEach(b=>b.onclick=()=>history.back())



/* ==========
  PopUp close actions
   ==========*/
   
   const closePopUp=()=>{
     popupSheet.classList.add('popup-sheet-close');
     setTimeout(()=>popupOverlay.style.opacity='0', 100)
     setTimeout(()=>popupOverlay.style.display='none', 300)
   }
   closePopUp()
   
   popUpCloseBtn.onclick=()=>closePopUp()
   
/* ==========
  PopUp open actions
   ==========*/
   
   const openPopup=()=>{
     popupOverlay.style.opacity='1'
     setTimeout(()=>popupSheet.classList.remove('popup-sheet-close'), 10)
     popupOverlay.style.display='flex'
   }
   openPopUpBtn.onclick=()=>openPopup();
   
   
   
   
   
   
   /* ========== 
   Dom Click function 
      ========== */
   createTipBtn.onclick=()=>{
     closePopUp()
     location.hash='#/create'
   }
   
   
   
   
   
   window.onload=()=>{
     document.body.style.opacity='1'
     document.body.style.filter='blur(0)'
   }