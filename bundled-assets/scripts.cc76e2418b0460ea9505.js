!function(e){function t(t){for(var n,o,i=t[0],l=t[1],c=t[2],u=0,h=[];u<i.length;u++)o=i[u],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&h.push(a[o][0]),a[o]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);for(d&&d(t);h.length;)h.shift()();return r.push.apply(r,c||[]),s()}function s(){for(var e,t=0;t<r.length;t++){for(var s=r[t],n=!0,i=1;i<s.length;i++){var l=s[i];0!==a[l]&&(n=!1)}n&&(r.splice(t--,1),e=o(o.s=s[0]))}return e}var n={},a={0:0},r=[];function o(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=n,o.d=function(e,t,s){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(s,n,function(t){return e[t]}.bind(null,n));return s},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/wp-content/themes/fictional-university-theme/bundled-assets/";var i=window.webpackJsonp=window.webpackJsonp||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var d=l;r.push([2,1]),s()}([,function(e,t,s){},function(e,t,s){"use strict";s.r(t);s(1);var n=class{constructor(){this.menu=document.querySelector(".site-header__menu"),this.openButton=document.querySelector(".site-header__menu-trigger"),this.events()}events(){this.openButton.addEventListener("click",()=>this.openMenu())}openMenu(){this.openButton.classList.toggle("fa-bars"),this.openButton.classList.toggle("fa-window-close"),this.menu.classList.toggle("site-header__menu--active")}},a=s(0);var r=class{constructor(){if(document.querySelector(".hero-slider")){const e=document.querySelectorAll(".hero-slider__slide").length;let t="";for(let s=0;s<e;s++)t+=`<button class="slider__bullet glide__bullet" data-glide-dir="=${s}"></button>`;document.querySelector(".glide__bullets").insertAdjacentHTML("beforeend",t),new a.a(".hero-slider",{type:"carousel",perView:1,autoplay:3e3}).mount()}}};var o=class{constructor(){document.querySelectorAll(".acf-map").forEach(e=>{this.new_map(e)})}new_map(e){var t=e.querySelectorAll(".marker"),s={zoom:16,center:new google.maps.LatLng(0,0),mapTypeId:google.maps.MapTypeId.ROADMAP},n=new google.maps.Map(e,s);n.markers=[];var a=this;t.forEach((function(e){a.add_marker(e,n)})),this.center_map(n)}add_marker(e,t){var s=new google.maps.LatLng(e.getAttribute("data-lat"),e.getAttribute("data-lng")),n=new google.maps.Marker({position:s,map:t});if(t.markers.push(n),e.innerHTML){var a=new google.maps.InfoWindow({content:e.innerHTML});google.maps.event.addListener(n,"click",(function(){a.open(t,n)}))}}center_map(e){var t=new google.maps.LatLngBounds;e.markers.forEach((function(e){var s=new google.maps.LatLng(e.position.lat(),e.position.lng());t.extend(s)})),1==e.markers.length?(e.setCenter(t.getCenter()),e.setZoom(16)):e.fitBounds(t)}};var i=class{constructor(){this.addSearchHTML(),this.resultsDiv=document.querySelector("#search-overlay__results"),this.openButtons=document.querySelectorAll(".js-search-trigger"),this.closeButton=document.querySelector(".search-overlay__close"),this.searchOverlay=document.querySelector(".search-overlay"),this.searchField=document.querySelector("#search-term"),this.event(),this.isOverlayOpen=!1,this.isSpinnerVisible=!1,this.previousValue,this.typingTimer}event(){this.openButtons.forEach(e=>e.addEventListener("click",e=>this.openOverlay(e))),this.closeButton.addEventListener("click",()=>this.closeOverlay()),document.addEventListener("keydown",e=>this.keyPressDispatcher(e)),this.searchField.addEventListener("keyup",()=>this.typingLogic())}typingLogic(){this.previousValue!=this.searchField.value&&(clearTimeout(this.typingTimer),this.searchField.value?(this.isSpinnerVisible||(this.resultsDiv.innerHTML='<div class="spinner-loader"></div>',this.isSpinnerVisible=!0),this.typingTimer=setTimeout(()=>this.getResults(),750)):(this.resultsDiv.innerHTML="",this.isSpinnerVisible=!1)),this.previousValue=this.searchField.value}getResults(){fetch(universityData.root_url+"/wp-json/university/v1/search?term="+this.searchField.value).then(e=>e.json()).then(e=>{this.resultsDiv.innerHTML=`<div class="row">\n                        <div class="one-third">\n                            <h2 class="search-overlay__section-title">General Information</h2>\n                            ${e.generalInfo.length?'<ul class="link-list min-list">':"<p>No general information matches the search.</p>"}\n                                ${e.generalInfo.map(e=>`<li><a href="${e.permalink}">${e.title}</a> ${"post"==e.postType?"by "+e.authorName:""}</li>`).join("")}\n                            ${e.generalInfo.length?"</ul>":""}\n                        </div>\n                        <div class="one-third">\n                            <h2 class="search-overlay__section-title">Programs</h2>\n                            ${e.programs.length?'<ul class="link-list min-list">':`<p>No programs match the search. <a href="${universityData.root_url}/programs">View all programs</a></p>`}\n                                ${e.programs.map(e=>`<li><a href="${e.permalink}">${e.title}</a></li>`).join("")}\n                            ${e.programs.length?"</ul>":""}\n\n                            <h2 class="search-overlay__section-title">Professors</h2>\n                            ${e.professors.length?'<ul class="professor-cards">':"<p>No professors match the search.</p>"}\n                                ${e.professors.map(e=>`\n                                    <li class="professor-card__list-item">\n                                        <a class="professor-card" href="${e.permalink}">\n                                            <img class="professor-card__image" src="${e.image}">\n                                            <span class="professor-card__name">${e.title}</span>\n                                        </a>\n                                    </li>\n                                `).join("")}\n                            ${e.professors.length?"</ul>":""}\n                        </div>\n                        <div class="one-third">\n                            <h2 class="search-overlay__section-title">Campuses</h2>\n                            ${e.campuses.length?'<ul class="link-list min-list">':`<p>No campuses match the search. <a href="${universityData.root_url}/campuses">View all campuses</a></p>`}\n                                ${e.campuses.map(e=>`<li><a href="${e.permalink}">${e.title}</a></li>`).join("")}\n                            ${e.campuses.length?"</ul>":""}\n                            \n                            <h2 class="search-overlay__section-title">Events</h2>\n                            ${e.events.length?"":`<p>No events match the search. <a href="${universityData.root_url}/events">View all events</a></p>`}\n                            ${e.events.map(e=>`\n                                <div class="event-summary">\n                                    <a class="event-summary__date t-center" href="${e.permalink}">\n                                        <span class="event-summary__month">${e.month}</span>\n                                        <span class="event-summary__day">${e.day}</span>\n                                    </a>\n                                    <div class="event-summary__content">\n                                        <h5 class="event-summary__title headline headline--tiny"><a href="${e.permalink}">${e.title}</a></h5>\n                                        <p>${e.description}<a href="${e.permalink}" class="nu gray">Learn more</a>\n                                        </p>\n                                    </div>\n                                </div>\n                            `).join("")}\n                        </div>\n                    </div>\n                `,this.isSpinnerVisible=!1}).catch(e=>console.error(e))}keyPressDispatcher(e){switch(e.keyCode){case 83:this.isOverlayOpen||"INPUT"==document.activeElement.tagName||"TEXTAREA"==document.activeElement.tagName||this.openOverlay(e);break;case 27:this.isOverlayOpen&&this.closeOverlay()}}openOverlay(e){e.preventDefault(),this.searchOverlay.classList.add("search-overlay--active"),document.querySelector("body").classList.add("body-no-scroll"),this.searchField.value="",setTimeout(()=>this.searchField.focus(),301),this.isOverlayOpen=!0}closeOverlay(){this.searchOverlay.classList.remove("search-overlay--active"),document.querySelector("body").classList.remove("body-no-scroll"),this.isOverlayOpen=!1}addSearchHTML(){document.body.innerHTML+='\n        <div class="search-overlay">\n  \t        <div class="search-overlay__top">\n  \t        \t<div class="container">\n  \t        \t\t<i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>\n  \t        \t\t<input autocomplete="off" type="text" class="search-term" placeholder="What are you looking for?" id="search-term">\n  \t        \t\t<i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>\n  \t        \t</div>\n  \t        </div>\n  \t        <div class="container">\n  \t        \t<div id="search-overlay__results"></div>\n  \t        </div>\n        </div>\n        '}};var l=class{constructor(){this.myNotes=document.querySelector("#my-notes"),this.events()}events(){this.myNotes.addEventListener("click",e=>this.handleClickEvents(e)),document.querySelectorAll(".submit-note").forEach(e=>e.addEventListener("click",e=>this.createNote(e)))}handleClickEvents(e){e.target.classList.contains("edit-note")||e.target.classList.contains("fa-pencil")||e.target.classList.contains("fa-times")?this.editNote(e):e.target.classList.contains("delete-note")||e.target.classList.contains("fa-trash-o")?this.deleteNote(e):(e.target.classList.contains("update-note")||e.target.classList.contains("fa-arrow-right"))&&this.updateNote(e)}findNearestParentLI(e){for(var t=e.target;"LI"!=t.tagName;)t=t.parentNode;return t}editNote(e){var t=this.findNearestParentLI(e);"editable"==t.dataset.state?this.makeNoteReadonly(t):this.makeNoteEditable(t)}makeNoteEditable(e){e.querySelector(".edit-note").innerHTML='<i class="fa fa-times" aria-hidden="true"></i> Cancel',e.querySelector(".note-title-field").removeAttribute("readonly"),e.querySelector(".note-body-field").removeAttribute("readonly"),e.querySelector(".note-title-field").classList.add("note-active-field"),e.querySelector(".note-body-field").classList.add("note-active-field"),e.querySelector(".update-note").classList.add("update-note--visible"),e.dataset.state="editable"}makeNoteReadonly(e){e.querySelector(".edit-note").innerHTML='<i class="fa fa-pencil" aria-hidden="true"></i> Edit',e.querySelector(".note-title-field").setAttribute("readonly","readonly"),e.querySelector(".note-body-field").setAttribute("readonly","readonly"),e.querySelector(".note-title-field").classList.remove("note-active-field"),e.querySelector(".note-body-field").classList.remove("note-active-field"),e.querySelector(".update-note").classList.remove("update-note--visible"),e.dataset.state="cancel"}deleteNote(e){var t=this.findNearestParentLI(e),s=universityData.root_url+"/wp-json/wp/v2/note/"+t.getAttribute("data-id");fetch(s,{headers:{"X-WP-Nonce":universityData.nonce},method:"DELETE"}).then(e=>{t.style.height=t.offsetHeight+"px",setTimeout((function(){t.classList.add("fade-out")}),20),setTimeout((function(){t.remove()}),401),console.log("delete success"),console.log(e)}).catch(e=>{console.log("delete failed"),console.log(e)})}updateNote(e){var t=this.findNearestParentLI(e),s=universityData.root_url+"/wp-json/wp/v2/note/"+t.getAttribute("data-id"),n={title:t.querySelector(".note-title-field").value,content:t.querySelector(".note-body-field").value};fetch(s,{headers:{"X-WP-Nonce":universityData.nonce,"Content-Type":"application/json"},method:"POST",body:JSON.stringify(n)}).then(e=>{this.makeNoteReadonly(t),console.log("post success"),console.log(e)}).catch(e=>{console.log("post failed"),console.log(e)})}createNote(e){var t=document.querySelector(".new-note-title").value,s=document.querySelector(".new-note-body").value,n=universityData.root_url+"/wp-json/wp/v2/note/",a={title:t,content:s,status:"publish"};fetch(n,{headers:{"X-WP-Nonce":universityData.nonce,"Content-Type":"application/json"},method:"POST",body:JSON.stringify(a)}).then(e=>e.json()).then(e=>{document.querySelector(".new-note-title").value="",document.querySelector(".new-note-body").value="",document.querySelector("#my-notes").insertAdjacentHTML("afterbegin",`\n                <li data-id="${e.id}" class="fade-in-calc">\n                    <input readonly class="note-title-field" value="${e.title.raw}">\n                    <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>\n                    <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>\n                    <textarea readonly class="note-body-field">${e.content.raw}</textarea>\n                    <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>\n                </li>\n                `);var t,s=document.querySelector("#my-notes li");setTimeout((function(){t=s.offsetHeight+"px",s.style.height="0"}),20),setTimeout((function(){s.classList.remove("fade-in-calc"),s.style.height=t}),50),setTimeout((function(){s.style.removeProperty("height")}),400),console.log("post success"),console.log(e)}).catch(e=>{console.log("post failed"),console.log(e)})}};new n,new r,new o,new i,new l}]);