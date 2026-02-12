import {data} from './test-data.js';
import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onValue, set } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
// Init
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/* =========================
  UI elements
  ========================== */
  const $ = s => document.querySelector(s)
  const $$ = s => document.querySelectorAll(s)

  
  const backBtns = $$('.back-btn')
  const popUpCloseBtn = $('#popUpCloseBtn')
  const popupSheet = $('#popupSheet')
  const popupOverlay = $('#popupOverlay')
  const openPopUpBtn = $('#openPopUp')
  const createTipBtn = $('#createTipBtn')
  const submitBtn = $('#submitBtn')
  const postBtn = $('#postBtn')
  
  const dificult = $$('#dificult span')
  const riskLevel = $$('#riskLevel span')
  
  
  
  const noImage = 'https://www.legrand.es/modules/custom/legrand_ecat/assets/img/no-image.png'
  
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
  if(page==='create')$('#title').focus()
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







function parseTextarea(text) {
  return text
    .replace(/\r/g, "")           // normalize
    .split(/•|\n{2,}/)            // split bullets / gaps
    .map(p => p.trim())
    .filter(Boolean);
}






/* =========================
   LIFECYCLE BOOT
========================= */

window.addEventListener("hashchange", router);
window.addEventListener("load", router);


/* =========================
 UI DEMO
   =========================*/
const getList = (p)=>{
  //console.log(d)
  
  return`
            <div class="flex">
              <div class="img">
                <img src="${noImage}" alt="thumbnail" />
              </div>
              <div class="detail">
                <h3>${p.title}</h3>
                <p>${p.description || null}</p>
              </div>
            </div>
            
            <div class="function-box">
              <div class="space"><p class='${p.deficulty}'>${p.deficulty}</p> </div>
              <div class="box hidden">
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

const getTip=d=>
{
  const pera = parseTextarea(d.description);
  // 🔥 Convert comments object → array
  const commentsArr = d.comments
    ? Object.values(d.comments)
    : [];
    
    // 🔥 Render only first 3 comments preview
  const commentsHtml = commentsArr
    .slice(0, 4)
    .map(c => `<p>• ${c.text}</p>`)
    .join("");
return`
       <h2>${d.title}</h2>
       <div class="user-section">
         <div class="user-box">
           <img src="${noImage}" alt="dp" />
           <p>no-auth</p>
         </div>
         
         <p class="date"> • 2 days Ago</p>
         
       </div>
       
       <div class="img-flex">
         <img src="${noImage}" alt="img-1" />
         
         <div class="box">
           <div class="nav">
             <p class="${d.deficulty}">${d.deficulty}</p> • <p class='${d.risk}'>${d.risk}</p>
           </div>
           
          <!-- 🔥 COMMENTS PREVIEW -->
           <div class="comments">
             ${commentsHtml || "<p>• No comments</p>"}
           </div>
           
         </div>
       </div>
       
       
       <div class="content">
         <p class="title">${d.subtitle}</p>

         
         ${
           pera.map(p =>
            `<div class="guid">• ${p}</div>`
          ).join("")
         }
         
         <img class="guid-img" src="${d.imageUrl || noImage}" alt="img-1" />
       </div>
       
       <div class="user-action-box hidden">
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

const createUi=(d, id)=>{
  const tipsList = document.getElementById('tips-list')
  const listItem = document.createElement('div')
  listItem.classList.add('list-item')
  
  listItem.innerHTML=getList(d)
  tipsList.appendChild(listItem)
  
  listItem.onclick=()=>{
    //localStorage.setItem('TIP_ID', id)
    renderData(d, id)
    location.hash='#/tips'
  }
}


//const dataArray = Object.entries(data)

//dataArray.forEach(d=>createUi(d))



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
   popupOverlay.onclick=(e)=>{
     e.stopPropagation()
     closePopUp()
   }
   
   
   
   
   
   window.onload=()=>{
     document.body.style.opacity='1'
     document.body.style.filter='blur(0)'
     setTimeout(()=>document.body.style.filter='unset',100)
   }
   
   
   
   
   dificult.forEach(el => {
  el.onclick = () => {
    dificult.forEach(el => el.classList.remove('active'))
    el.classList.add('active')
  }
});
riskLevel.forEach(el => {
  el.onclick = () => {
    riskLevel.forEach(el => el.classList.remove('active'))
    el.classList.add('active')
  }
});
   
   
   
    
  let deficulty=''
  let risk
function validateInput() {
  postBtn.disabled = true;
  submitBtn.disabled = true;
  
  const agreeBtn = $('#agree')
  const agree = agreeBtn.checked
  if(!agree) return
  
  dificult.forEach(el => {
  if (el.classList.contains('active')) {
    deficulty = el.dataset.value
  }
});
riskLevel.forEach(el => {
  if (el.classList.contains('active')) {
    risk = el.dataset.value
  }
});
  const inputs = {

    title: document.getElementById("title").value,
    description: $('#description').value,
    device: document.getElementById("device").value,
    category: document.getElementById("category").value,
    estimateTime: `${$('#time').value} ${$('#time-format').value}`,
    subtitle: $('#subtitle').value,
    imageUrl: $('#imgurl').value,
    createdAt: Date.now(),
    tools: $('#tools').value,

  };
  addNewTip(inputs)
  console.log(inputs)
}

function clearInputs(){
  document.getElementById("title").value = "";
  $('#description').value = "";
  document.getElementById("device").value = "";
  document.getElementById("category").value = "";
  $('#time').value = "";
  $('#time-format').value = "";
  $('#subtitle').value = "";
  $('#imgurl').value = "";
  $('#tools').value = "";
}



submitBtn.onclick=()=>validateInput();
postBtn.onclick=()=>submitBtn.click();


function addNewTip(data) {

  const tipsRef = ref(db, "tips");

  push(tipsRef, {
    title: data.title,
    description: data.description,
    device: data.device,
    category: data.category,
    estimateTime: data.estimateTime,
    createdAt: data.createdAt,
    tools: data.tools,
    subtitle: data.subtitle,
    imageUrl: data.imageUrl,
    risk,
    deficulty
  })
  .then(() => {
    console.log("New tip added ✅");
    clearInputs()
    postBtn.disabled = false;
    submitBtn.disabled = false;
    history.back()
  })
  .catch(err => {
    console.error("Error:", err);
    postBtn.disabled = false;
    submitBtn.disabled = false;
    alert('Error while posting, please try again later')
  });

}






/*==========
Get Data from DB 
  ========== */

const tipsRef = ref(db, "tips");

const tipsContainer = document.getElementById('tips-list')

onValue(tipsRef, (snapshot) => {
  tipsContainer.innerHTML = "";   // reset

  if (!snapshot.exists()) {
    tipsContainer.innerHTML = "<p>No tips found</p>";
    return;
  }

  snapshot.forEach((child) => {
    const tip = child.val();
    const id = child.key
createUi(tip, id)
    

 //   tipsContainer.appendChild(card);
  });
});





/* =========
    renderData
   ========= */
   
   const renderData=(d, id)=>{
     const container = $('#tipContainer')
     container.dataset.tipId=id
     container.innerHTML=getTip(d)

   }
   
   
   
   
   /* #####################
        ADD COMMENT
      ##################### */
      
      const addCommentBtn = $('#addCommentBtn')
      addCommentBtn.onclick=()=>addComment()
      
    function addComment() {
      const container = $('#tipContainer')
      const tipId = container.dataset.tipId
  const input = $('#comment')
  const value = input.value.trim();

  if (!value) return;

  const commentsRef = ref(db, `tips/${tipId}/comments`);
  const newCommentRef = push(commentsRef);

  set(newCommentRef, {
    text: value,
    createdAt: Date.now()
  });

  input.value = "";
}




if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js")
    .then(() => console.log("SW registered"));
}