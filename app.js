const board=document.querySelector('.board');
const links={M:['Moi','moi'],W:['Work','work'],O:['Outfits','outfits'],P:['Photography','photography']};
const colors=['#7952ab','#37724e','#bd4d85','#638544','#7952ab','#37724e'];
for(const [i,l] of [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].entries()){
 const el=document.createElement(links[l]?'a':l==='H'?'button':'div');
 el.className='tile'+(links[l]||l==='H'?' active':'')+(l==='M'?' m':'');el.dataset.l=l;
 el.style.setProperty('--r',[-8,5,-3,9,-6,3][i%6]+'deg');el.style.color=colors[i%6];
 if(!links[l]&&i%4===1)el.style.setProperty('--paper',['#d8e99d','#cbb4e2','#f5b9d4'][i%3]);
 el.innerHTML='<span class="glyph" aria-hidden="true">'+l+'</span>'+(links[l]?'<small>'+links[l][0]+'</small>':l==='H'?'<small>Hello ✳</small>':'')+(l==='M'?'<span class="name" lang="zh">刘美萱</span>':'');
 if(links[l]){el.href='#'+links[l][1];el.setAttribute('aria-label','Explore '+links[l][0]);}
 else if(l==='H'){el.setAttribute('aria-label','Say hello in four languages');el.onclick=()=>document.querySelector('dialog').showModal();}else el.setAttribute('aria-hidden','true');
 board.append(el);
}
// The letters are the interaction: no image overlays or floating previews.
const hoverLetters=window.matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
for(const letter of ['O','P','M','W']){
 const tile=board.querySelector('[data-l="'+letter+'"]');
 if(letter==='M'){
  tile.querySelector('small').innerHTML='<span class="name-reel" aria-hidden="true"><span>moi</span><span>Mavis</span><span>Meixuan</span><span>me</span><span>moi</span></span>';
 }
 if(letter==='P'){
  const frame=document.createElement('span');frame.className='viewfinder';frame.setAttribute('aria-hidden','true');
  frame.innerHTML='<i></i><i></i><i></i><i></i>';tile.append(frame);
 }
 if(letter==='W'){
  const glyph=tile.querySelector('.glyph');
  glyph.innerHTML='<span class="w-base">W</span>'+[0,1,2,3].map(i=>'<span class="w-piece piece-'+i+'">W</span>').join('');
 }
 const stop=()=>tile.classList.remove('is-playing');
 const play=()=>{if(!reducedMotion.matches)tile.classList.add('is-playing');};
 tile.addEventListener('pointerenter',()=>{if(hoverLetters.matches)play();});
 tile.addEventListener('pointerleave',()=>{if(!tile.matches(':focus-visible'))stop();});
 tile.addEventListener('focus',()=>{if(tile.matches(':focus-visible'))play();});
 tile.addEventListener('blur',stop);
 tile.addEventListener('click',stop);
 window.addEventListener('hashchange',stop);
 reducedMotion.addEventListener('change',stop);
 hoverLetters.addEventListener('change',stop);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')stop();});
}
const imageDimensions=src=>{const size=photoSizes[src];return size?`width="${size[0]}" height="${size[1]}"`:"";};
const pages={
 moi:'<div class="section-top"><p class="tiny">M / MOI</p><h1>Many names. Me.</h1></div><div class="about"><div class="namecard"><strong>M</strong><span lang="zh">刘美萱</span><p>Mavis · Meixuan · moi · me</p></div><div class="bio"><p>I’m Mavis, also Meixuan — 刘美萱.</p><p>I study Computer and Data Science at NYU. I like making things that people can use, putting outfits together, and photographing the people and details around me.</p><p>This is a growing collection of what I make, wear, and see.</p><p class="tag">MANDARIN · ENGLISH · LEARNING FRENCH & JAPANESE</p><div class="contact-links"><a href="https://www.linkedin.com/in/mavisliuisme/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="mailto:liumeixuan@gmail.com">Email</a></div></div></div>'
};

const experience=[
 {company:'RBC Capital Markets',role:'Shared Platform Services Summer Analyst',time:'Jun–Aug 2026 · Jersey City, NJ',title:'Turning capacity data into action.',intro:'After finding that 83% of application custodians rarely accessed capacity reports, I co-developed AUSTIN to bring insights directly to the people responsible for acting on them.',metric:'1,174',label:'persistent idle-server candidates identified',points:['Designed SQLModel-based selection logic using CPU, memory and operational criteria across rolling utilization windows, excluding disaster recovery and other non-actionable assets.','Identified approximately $16M in annualized optimization opportunities — an estimate of potential opportunity, not realized savings.','Built three MCP tools for idle, underutilized and overutilized servers, with structured results and Grafana drill-down links.','Exposed reusable backend services and connected the selection logic to the team’s notification framework for application-specific reports in production.'],tools:'Python · SQLModel · MCP · Grafana · Capacity analytics'},
 {company:'Deloitte',role:'Technology & Transformation — SAP Data Migration Analyst Intern',time:'Jun–Aug 2025 · Shanghai, China',title:'Making complex migrations more reliable.',intro:'I automated master-data preparation, validation and project tracking for an SAP migration, turning repetitive spreadsheet work into repeatable workflows.',metric:'6 hours → 2 minutes',label:'task dependency updates with a VBA macro',points:['Expanded 20,711 Material-Plant records into 208,539 valid combinations using plant-specific storage rules in Power Query.','Automated Unique ID Predecessors across 1,693 project tasks; achieved 100% accuracy for this workflow.','Standardized company codes and flagged 3,045 mismatches across more than 15,000 SKU–Sales Org mappings.','Consolidated data from 15+ sources and resolved 1,200+ duplicate records.','Built business-day-aware timeline adjustments in Python-in-Excel and a Plan Status tracking system that reduced status reporting time by 65%.'],tools:'Power Query · VBA · Python-in-Excel · Data validation · SAP migration'},
 {company:'HP Tech Ventures',role:'Corporate Venture Capital & Business Analytics Remote Intern',time:'Jan–Mar 2025 · Remote, New York',title:'Connecting market research with investment questions.',intro:'I researched AI-powered media platforms, examining competitors, emerging technologies and monetization models to support preliminary startup screening.',metric:'5',label:'high-potential startups profiled',points:['Sourced AI-driven content creation and streaming companies and checked fit against investment criteria, including funding stage.','Assessed business models, market potential and scalability for preliminary investment consideration.','Cleaned and visualized company data in Excel and used correlation analysis to explore growth indicators.'],tools:'Market research · Competitive analysis · Excel · Startup screening'},
 {company:'Live Media Group',role:'Head of Product Operations',time:'Sep 2023–Sep 2025 · New York, NY',title:'Building systems that help teams grow.',intro:'I provided operational guidance to eight LIVE teams across the US and UK, coordinating cross-functional work with Business Development and HR.',metric:'35+',label:'campaigns supported by a task scheduling system',points:['Aligned intern training, marketing and communications across teams.','Built a task scheduling system and advised on community strategy and content development, supporting network growth of 3,400+ users in eight months.'],tools:'Product operations · Campaign planning · Cross-functional coordination'}
];

pages.work=`<div class="section-top letter-heading"><span class="section-letter" aria-hidden="true">W</span><p class="tiny">W / WORK</p><h1>From insight to action.</h1><p class="lead">I use data to understand problems, automate the repetitive parts, and help people make better decisions.</p><p class="work-intro">Computer &amp; Data Science at NYU · Studio Art minor</p><div class="contact-links"><a href="https://www.linkedin.com/in/mavisliuisme/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="mailto:liumeixuan@gmail.com">Let’s talk</a></div></div><nav class="work-index section-index" aria-label="Work sections"><button data-section="experience-title"><span class="index-no">01</span>Experience</button><button data-section="research-title"><span class="index-no">02</span>Research</button><button data-section="projects-title"><span class="index-no">03</span>Projects</button><button data-section="leadership-title"><span class="index-no">04</span>Community</button></nav><h2 class="work-section-title" id="experience-title" tabindex="-1">Professional experience</h2><div class="experience-list">${experience.map((item,i)=>`<article class="experience-card"><div class="experience-meta"><span class="entry-number">EXPERIENCE / ${String(i+1).padStart(2,'0')}</span><h2>${item.company}</h2><p>${item.role}</p><p>${item.time}</p></div><div class="experience-story"><h3>${item.title}</h3><p>${item.intro}</p><div class="work-metric"><strong>${item.metric}</strong><span>${item.label}</span></div><details><summary>Explore my contribution<span aria-hidden="true">+</span></summary><ul>${item.points.map(point=>`<li>${point}</li>`).join('')}</ul></details><p class="work-tools">${item.tools}</p></div></article>`).join('')}</div><section class="work-extra research-section" aria-labelledby="research-title"><h2 id="research-title" tabindex="-1">Research</h2>
<article class="portfolio-entry"><div><h3>Sanborn Maps Research Project</h3><p class="entry-meta">New York University · New York, NY<br>Undergraduate Research Assistant · Oct 2026–Present</p><div class="research-note"><span class="tiny">THE WORKFLOW</span><p>Discover → Retrieve<br>Validate → Document</p></div></div><div><p>Building a reproducible workflow for collecting historical maps.</p><ul><li>Developed a Python / Google Colab workflow to search Library of Congress records, discover Sanborn map atlases, and retrieve selected full-resolution pages through IIIF APIs.</li><li>Implemented state, city, and date filters; validated downloaded image dimensions against source metadata; and exported retrieval records to CSV for downstream analysis.</li></ul><p class="entry-tools">Python · Google Colab · IIIF APIs · Data collection &amp; validation</p></div></article>
<article class="portfolio-entry"><div><h3>AI4CE Lab</h3><p class="entry-meta">New York University · New York, NY<br>Undergraduate Research Assistant · Sep 2026–Present</p><div class="research-note"><span class="tiny">BASELINE REPRODUCTION</span><strong>38.19<span>%</span></strong><p>Test accuracy · 38.57% published</p></div></div><div><p>Reproducing and evaluating computer vision research, from material classification to 3D assembly.</p><ul><li>Reproduced the LUWA ResNet-50 material-classification baseline: 38.19% test accuracy, compared with the published 38.57%.</li><li>Ran pretrained GARF inference on 3D point clouds using PyTorch and NYU HPC, and visualized the predicted assemblies.</li></ul><p class="entry-tools">PyTorch · ResNet-50 · GARF · NYU HPC</p></div></article></section>
<section class="work-extra" aria-labelledby="projects-title"><h2 id="projects-title" tabindex="-1">Selected projects</h2>
<article class="portfolio-entry"><div><h3>Spotify Music Genre Classification</h3><p class="entry-meta">NYU · Fundamentals of Machine Learning<br>Course capstone · May 2025</p><div class="research-note"><span class="tiny">MODEL EVALUATION</span><strong>0.9318</strong><p>Macro-averaged AUC<br>50,000+ tracks</p></div></div><div><p>Predicting musical genres from the audio features of 50,000+ Spotify tracks.</p><ul><li>Cleaned and preprocessed the data by imputing missing values, encoding categorical features, and standardizing continuous variables.</li><li>Explored the feature space with PCA, t-SNE, and MDS; compared SVMs, gradient boosting, and PyTorch neural networks.</li><li>The best regularized neural network achieved a macro-averaged AUC of 0.9318. Examined results with genre-wise ROC curves, cluster visualizations, and silhouette scores.</li></ul><p class="entry-tools">Python · PyTorch · scikit-learn · Model evaluation · Visualization</p></div></article>
<article class="portfolio-entry"><div><h3>Habita</h3><p class="entry-meta">NYU · Agile Software Development &amp; DevOps<br>Product Owner &amp; Developer · Sep–Dec 2025</p><div class="research-note"><span class="tiny">PRODUCT &amp; ENGINEERING</span><strong>5<span> people</span></strong><p>One Scrum team · A shared home</p></div></div><div><p>A roommate management platform, built with a five-person Scrum team.</p><ul><li>Led product planning through user stories, acceptance criteria, and sprint priorities.</li><li>Built React interfaces for the dashboard, registration / login, and mood tracking; integrated Express APIs, JWT authentication, and MongoDB-backed mood entries.</li><li>Containerized the frontend and backend with Docker Compose and wrote Mocha / Chai tests for notifications.</li></ul><p class="entry-tools">React · Express · MongoDB · Docker · Agile / Scrum</p></div></article></section>
<section class="work-extra leadership-section" aria-labelledby="leadership-title"><h2 id="leadership-title" tabindex="-1">Leadership &amp; community service</h2><article class="portfolio-entry"><div><h3>NYU Leadership Launch</h3><p class="entry-meta">Peer Mentor · Spring 2025</p></div><div><p>Supporting first-year students as they explore their leadership identities and find their place at NYU.</p><ul><li>Mentored six first-year fellows through weekly check-ins, journal reflections, and small-group discussions, offering advice and connecting students with university resources.</li><li>Led small-group circles during weekly Leadership Launch sessions.</li><li>The role also included planning, coordinating, and leading a community service project with Leadership Launch.</li></ul><p class="entry-tools">Peer mentorship · Group facilitation · Community service · Project coordination</p></div></article></section><section class="work-extra"><h2>My toolkit.</h2><p>Python · SQL · VBA · Pandas · NumPy · Matplotlib · scikit-learn · Tableau · Power BI · Excel / Power Query</p><p>Statistical modeling · Data modeling · Data cleaning &amp; standardization · Agile / Scrum</p></section>`;
pages.outfits = `<div class="section-top"><p class="tiny">O / OUTFITS</p><h1>Getting dressed.</h1><p class="lead">Colours, layers, little details. A diary of what I wear.</p><p class="caption">12 looks · 14 photographs · Open a look for a closer view.</p></div><div class="wardrobe">${outfitLooks.map((look,i)=>`<button class="look-card" data-look="${i}"><img src="${look.images[0]}" ${imageDimensions(look.images[0])} alt="${look.title} — outfit photograph" loading="lazy"><span class="look-number">LOOK ${String(i+1).padStart(2,'0')}</span><h2>${look.title}</h2><span class="caption">${look.images.length>1?look.images.length+' photographs':'Explore look'}</span></button>`).join('')}</div>`;
const orchardCaptions=[
 'Silhouettes together in the light', 'A stop at the farm counter',
 'Raspberries catching the sun', 'The farm and hills beyond the raspberry patch',
 'A hand-painted raspberry sign', 'Walking between the rows toward the trees',
 'Tomatoes, peppers, berries, and sweet potatoes in our boxes', 'Fallen apples in the grass',
 'Apples hanging against the blue sky', 'Reaching into the branches with a fruit picker',
 'An apple in my hand', 'The path winding down through the orchard',
 'Branches full of apples', 'A closer look at the fruit',
 'Reaching for the apples at the top', 'An apple caught in the picking basket',
 'Two apple cores left in the grass', 'A family together among the rows',
 'A goat resting in the sun', 'A cat walking through the pumpkins'
];
const chapterLabels=['Arrival','The fields','The orchard','Last frames'];
const orchardChapters=[
 {title:'Come along.',text:'A little company, a stop at the counter, and a day ahead of us.',start:0,end:2},
 {title:'A detour through the fields.',text:'Raspberries, handwritten signs, and the view beyond the rows. There is plenty to notice on the way to the apples.',start:2,end:7},
 {title:'Into the apple trees.',text:'Look down, look up. Reach into the branches. An apple in hand, then a little farther down the path.',start:7,end:16},
 {title:'The last few frames.',text:'Apple cores, people, a resting goat, and a cat among the pumpkins. The small moments that round out the day.',start:16,end:20}
];
pages.photography = `<div class="section-top letter-heading photo-opening"><span class="section-letter" aria-hidden="true">P</span><p class="tiny">P / PHOTOGRAPHY · PHOTO DIARY 01</p><h1>An Orchard<br><em>Afternoon.</em></h1><p class="lead">Come apple picking with me.</p><p class="photo-preface">Twenty photographs, in the order of the day. From arriving together to the little things we notice along the way.</p><p class="diary-meta"><span>AUTUMN 2026</span><span>20 FRAMES</span><span>ONE AFTERNOON</span></p></div><nav class="journey-index section-index" aria-label="Photo diary chapters">${orchardChapters.map((chapter,i)=>`<button data-section="chapter-${i}-title"><span class="index-no">0${i+1}</span>${chapterLabels[i]}</button>`).join('')}</nav><div class="orchard-journey">${orchardChapters.map((chapter,n)=>`<section class="journey-chapter" aria-labelledby="chapter-${n}-title"><div class="chapter-heading"><div><p class="tiny chapter-kicker">CHAPTER 0${n+1} <span>FRAMES ${String(chapter.start+1).padStart(2,'0')}–${String(chapter.end).padStart(2,'0')}</span></p><h2 id="chapter-${n}-title" tabindex="-1">${chapter.title}</h2></div><p>${chapter.text}</p></div><div class="journey-images">${orchardImages.slice(chapter.start,chapter.end).map((src,offset)=>{const i=chapter.start+offset;return `<button class="journey-photo ${[6,9,10,11].includes(i)?'full-spread'+(i===9?' portrait-spread':''):''}" data-photo="${i}" aria-label="Open photograph ${i+1} of 20: ${orchardCaptions[i]}"><img src="${src}" ${imageDimensions(src)} alt="${orchardCaptions[i]}" loading="${i<2?'eager':'lazy'}" decoding="async"><span class="photo-caption"><span class="frame-number">${String(i+1).padStart(2,'0')}</span><span>${orchardCaptions[i]}</span><span class="photo-expand" aria-hidden="true">+</span></span></button>`}).join('')}</div></section>`).join('')}</div><div class="journey-end"><span class="tiny">20 / 20 · END OF THE AFTERNOON</span><p>A day outside, kept in photographs.</p><button class="text-button" data-section="chapter-0-title">Back to the first frame ↑</button></div>`;
const viewer=document.createElement('dialog');viewer.className='image-viewer';viewer.setAttribute('aria-label','Image viewer');viewer.innerHTML='<div class="viewer-top"><span id="viewer-title"></span><button class="viewer-close" aria-label="Close image viewer">×</button></div><img class="viewer-image" alt=""><p class="viewer-caption"></p><div class="viewer-filmstrip" aria-label="Photographs in this collection"></div><div class="viewer-controls"><button class="viewer-prev" aria-label="Previous image">Previous</button><span class="viewer-count" aria-live="polite"></span><button class="viewer-next" aria-label="Next image">Next</button></div>';document.body.append(viewer);
let currentImages=[],currentIndex=0,currentTitle='',viewerTrigger=null;
const routeScroll=new Map();let activeRoute='';
function updateViewer(){
 const img=viewer.querySelector('.viewer-image');img.src=currentImages[currentIndex];
 const caption=currentImages===orchardImages?orchardCaptions[currentIndex]:currentTitle;
 img.alt=caption;viewer.querySelector('.viewer-caption').textContent=caption;
 viewer.querySelector('#viewer-title').textContent=currentTitle;
 viewer.querySelector('.viewer-count').textContent=(currentIndex+1)+' / '+currentImages.length;
 viewer.querySelector('.viewer-prev').disabled=currentImages.length<2;
 viewer.querySelector('.viewer-next').disabled=currentImages.length<2;
 const strip=viewer.querySelector('.viewer-filmstrip');
 strip.querySelectorAll('button').forEach((button,i)=>{
  button.tabIndex=i===currentIndex?0:-1;
  if(i===currentIndex){button.setAttribute('aria-current','true');}else button.removeAttribute('aria-current');
 });
 const selected=strip.children[currentIndex];
 if(selected)strip.scrollLeft=selected.offsetLeft-strip.offsetLeft-(strip.clientWidth-selected.offsetWidth)/2;
}
function openViewer(images,index,title){
 viewerTrigger=document.activeElement;currentImages=images;currentIndex=index;currentTitle=title;
 const strip=viewer.querySelector('.viewer-filmstrip');strip.hidden=images.length<2;
 strip.innerHTML=images.map((src,i)=>`<button data-frame="${i}" aria-label="View photograph ${i+1}${images===orchardImages?': '+orchardCaptions[i]:''}"><img src="${src}" alt="" loading="lazy"><span>${String(i+1).padStart(2,'0')}</span></button>`).join('');
 updateViewer();viewer.showModal();document.body.style.overflow='hidden';updateViewer();
}
function stepImage(n){
 const fromStrip=viewer.querySelector('.viewer-filmstrip').contains(document.activeElement);
 currentIndex=(currentIndex+n+currentImages.length)%currentImages.length;updateViewer();
 if(fromStrip)viewer.querySelector(`[data-frame="${currentIndex}"]`).focus({preventScroll:true});
}
viewer.querySelector('.viewer-filmstrip').addEventListener('click',e=>{const frame=e.target.closest('[data-frame]');if(frame){currentIndex=Number(frame.dataset.frame);updateViewer();}});
viewer.querySelector('.viewer-close').onclick=()=>viewer.close();viewer.querySelector('.viewer-prev').onclick=()=>stepImage(-1);viewer.querySelector('.viewer-next').onclick=()=>stepImage(1);viewer.addEventListener('close',()=>{document.body.style.overflow='';viewerTrigger?.focus({preventScroll:true});});viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close()}});viewer.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();stepImage(-1)}if(e.key==='ArrowRight'){e.preventDefault();stepImage(1)}});
let touchStart;
viewer.querySelector('.viewer-image').addEventListener('touchstart',e=>{const t=e.changedTouches[0];touchStart={x:t.clientX,y:t.clientY}},{passive:true});
viewer.querySelector('.viewer-image').addEventListener('touchend',e=>{if(!touchStart)return;const t=e.changedTouches[0],dx=t.clientX-touchStart.x,dy=t.clientY-touchStart.y;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)stepImage(dx<0?1:-1);touchStart=null},{passive:true});
document.querySelector('#content').addEventListener('click',e=>{const section=e.target.closest('[data-section]');if(section){const target=document.getElementById(section.dataset.section);if(!target)return;target.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'start'});target.focus({preventScroll:true});return;}const photo=e.target.closest('[data-photo]'),look=e.target.closest('[data-look]');if(photo)openViewer(orchardImages,Number(photo.dataset.photo),'An Orchard Afternoon');if(look){const item=outfitLooks[Number(look.dataset.look)];openViewer(item.images,0,item.title)}});
function route(){routeScroll.set(activeRoute,window.scrollY);if(viewer.open)viewer.close();const key=location.hash.slice(1),valid=Object.hasOwn(pages,key);activeRoute=key;document.querySelectorAll('header nav a').forEach(a=>{if(a.hash===location.hash)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});document.querySelector('#home').hidden=valid;document.querySelector('#page').hidden=!valid;if(valid)document.querySelector('#content').innerHTML=pages[key];document.title=(valid?links[Object.keys(links).find(l=>links[l][1]===key)][0]+' — ':'')+'M, moi. — 刘美萱';window.scrollTo(0,routeScroll.get(key)||0);updateSectionIndex();if(valid){const title=document.querySelector('#content h1');title.tabIndex=-1;title.focus({preventScroll:true});}}
// Keep the page's section bookmark in sync with reading position.
function updateSectionIndex(){
 const buttons=[...document.querySelectorAll('.section-index [data-section]')];
 if(!buttons.length)return;
 let active=buttons[0];
 for(const button of buttons){const heading=document.getElementById(button.dataset.section);if(heading&&heading.getBoundingClientRect().top<=window.innerHeight*.35)active=button;}
 for(const button of buttons){if(button===active)button.setAttribute('aria-current','location');else button.removeAttribute('aria-current');}
}
let scrollFrame=0;
window.addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(()=>{updateSectionIndex();scrollFrame=0;});},{passive:true});
document.querySelector('.skip-link').addEventListener('click',e=>{e.preventDefault();document.querySelector('main').focus();});
if('scrollRestoration' in history)history.scrollRestoration='manual';
window.addEventListener('hashchange',route);route();const dialog=document.querySelector('dialog');document.querySelector('.close').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
