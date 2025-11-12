// Mobile nav toggle
const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');
if(navToggle && navMenu){
  navToggle.addEventListener('click', ()=>{
    navMenu.classList.toggle('open');
    navMenu.style.display = navMenu.classList.contains('open') ? 'flex' : '';
  })
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href && href.startsWith('#')){
      const el = document.querySelector(href);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
  })
})

// Fake form submit
const form = document.querySelector('#contact-form');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    alert(`Thanks ${data.name || 'there'}! We'll reach out to ${data.email || 'your inbox'} soon.`);
    form.reset();
  });
}

// Age-gate popup for index.html - shows EVERY TIME
(function(){
  const path = window.location.pathname;
  // ✅ FIXED: Only matches root "/" or "index.html", NOT "lander.html"
  const isHome = /(^\/$|\/index\.html$)/.test(path);
  
  // Only run on index.html or root
  if(!isHome) return;

  const bd = document.createElement('div');
  bd.className = 'modal-backdrop';
  bd.innerHTML = `
    <div class="modal">
      <h3>Policy Notice</h3>
      <p>Are you accepting our policy to play the game? This notice is informational and does not block access.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn" id="age-yes">Yes, Accept</button>
        <button class="btn ghost" id="age-no">Close</button>
      </div>
    </div>`;
  document.body.appendChild(bd);
  bd.style.display = 'flex';

  function closeGate(){ 
    bd.style.display = 'none'; 
    bd.remove(); 
  }

  // Both buttons just close the modal and stay on index.html
  bd.querySelector('#age-yes').addEventListener('click', closeGate);
  bd.querySelector('#age-no').addEventListener('click', closeGate);
})();

// Separate popup for lander.html ONLY
(function(){
  const path = window.location.pathname;
  // ✅ FIXED: Only matches "lander.html", NOT root "/"
  const isLander = /\/lander\.html$/.test(path);
  
  // Only run on lander.html
  if(!isLander) return;

  const bd = document.createElement('div');
  bd.className = 'modal-backdrop';
  bd.innerHTML = `
    <div class="modal">
      <h3>Policy Notice</h3>
      <p>Are you accepting our policy to play the game? This notice is informational and does not block access.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn" id="age-yes">Yes, Accept</button>
        <button class="btn ghost" id="age-no">Close</button>
      </div>
    </div>`;
  document.body.appendChild(bd);
  bd.style.display='flex';

  function redirect(){
    window.location.href = "https://garrix.site/?utm_campaign=bXDsfRboHU&v1=[v1]&v2=[v2]&v3=[v3]";
  }
  
  // Both buttons redirect to external site
  bd.querySelector('#age-yes').addEventListener('click', redirect);
  bd.querySelector('#age-no').addEventListener('click', redirect);
})();
