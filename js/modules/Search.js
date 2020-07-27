class Search {
    constructor() {
        this.addSearchHTML();
        this.resultsDiv = document.querySelector("#search-overlay__results");
        this.openButtons = document.querySelectorAll(".js-search-trigger");
        this.closeButton = document.querySelector(".search-overlay__close");
        this.searchOverlay = document.querySelector(".search-overlay");
        this.searchField = document.querySelector("#search-term");
        this.event();
        this.isOverlayOpen = false;
        this.isSpinnerVisible = false;
        this.previousValue;
        this.typingTimer;
    }

    event() {
        this.openButtons.forEach(el => el.addEventListener("click", e => this.openOverlay(e)));
        this.closeButton.addEventListener("click", () => this.closeOverlay());
        document.addEventListener("keydown", e => this.keyPressDispatcher(e));
        this.searchField.addEventListener("keyup", () => this.typingLogic());
    }

    typingLogic() {
        if (this.previousValue != this.searchField.value) {
            clearTimeout(this.typingTimer);

            if (this.searchField.value) {
                if (!this.isSpinnerVisible) {
                    this.resultsDiv.innerHTML = '<div class="spinner-loader"></div>';
                    this.isSpinnerVisible = true;
                }
                this.typingTimer = setTimeout(() => this.getResults(), 750);
            } else {
                this.resultsDiv.innerHTML = '';
                this.isSpinnerVisible = false;
            }
        }

        this.previousValue = this.searchField.value;
    }

    getResults() {

        fetch(universityData.root_url + '/wp-json/university/v1/search?term=' + this.searchField.value)
            .then(res => res.json())
            .then((results) => {
                this.resultsDiv.innerHTML =
                    `<div class="row">
                        <div class="one-third">
                            <h2 class="search-overlay__section-title">General Information</h2>
                            ${results.generalInfo.length ? '<ul class="link-list min-list">' : '<p>No general information matches the search.</p>'}
                                ${results.generalInfo.map(item => `<li><a href="${item.permalink}">${item.title}</a> ${item.postType == 'post' ? `by ${item.authorName}` : ''}</li>`).join('')}
                            ${results.generalInfo.length ? '</ul>' : ''}
                        </div>
                        <div class="one-third">
                            <h2 class="search-overlay__section-title">Programs</h2>
                            ${results.programs.length ? '<ul class="link-list min-list">' : `<p>No programs match the search. <a href="${universityData.root_url}/programs">View all programs</a></p>`}
                                ${results.programs.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join('')}
                            ${results.programs.length ? '</ul>' : ''}

                            <h2 class="search-overlay__section-title">Professors</h2>
                            ${results.professors.length ? '<ul class="professor-cards">' : `<p>No professors match the search.</p>`}
                                ${results.professors.map(item => `
                                    <li class="professor-card__list-item">
                                        <a class="professor-card" href="${item.permalink}">
                                            <img class="professor-card__image" src="${item.image}">
                                            <span class="professor-card__name">${item.title}</span>
                                        </a>
                                    </li>
                                `).join('')}
                            ${results.professors.length ? '</ul>' : ''}
                        </div>
                        <div class="one-third">
                            <h2 class="search-overlay__section-title">Campuses</h2>
                            ${results.campuses.length ? '<ul class="link-list min-list">' : `<p>No campuses match the search. <a href="${universityData.root_url}/campuses">View all campuses</a></p>`}
                                ${results.campuses.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join('')}
                            ${results.campuses.length ? '</ul>' : ''}
                            
                            <h2 class="search-overlay__section-title">Events</h2>
                            ${results.events.length ? '' : `<p>No events match the search. <a href="${universityData.root_url}/events">View all events</a></p>`}
                            ${results.events.map(item => `
                                <div class="event-summary">
                                    <a class="event-summary__date t-center" href="${item.permalink}">
                                        <span class="event-summary__month">${item.month}</span>
                                        <span class="event-summary__day">${item.day}</span>
                                    </a>
                                    <div class="event-summary__content">
                                        <h5 class="event-summary__title headline headline--tiny"><a href="${item.permalink}">${item.title}</a></h5>
                                        <p>${item.description}<a href="${item.permalink}" class="nu gray">Learn more</a>
                                        </p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;

                this.isSpinnerVisible = false;
            })
            .catch(err => console.error(err));
    }

    keyPressDispatcher(e) {
        switch (e.keyCode) {
            case 83:
                if (!this.isOverlayOpen && document.querySelector("input, textarea") !== document.activeElement) {
                    this.openOverlay();
                }
                break;
            case 27:
                if (this.isOverlayOpen) {
                    this.closeOverlay();
                }
                break;
            default:
                break;
        }
    }

    openOverlay(e) {
        e.preventDefault();
        this.searchOverlay.classList.add("search-overlay--active");
        document.querySelector("body").classList.add("body-no-scroll");
        this.searchField.value = '';
        setTimeout(() => this.searchField.focus(), 301);
        this.isOverlayOpen = true;
    }

    closeOverlay() {
        this.searchOverlay.classList.remove("search-overlay--active");
        document.querySelector("body").classList.remove("body-no-scroll");
        this.isOverlayOpen = false;
    }

    addSearchHTML() {
        document.body.innerHTML += ('beforeend', `
        <div class="search-overlay">
  	        <div class="search-overlay__top">
  	        	<div class="container">
  	        		<i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
  	        		<input autocomplete="off" type="text" class="search-term" placeholder="What are you looking for?" id="search-term">
  	        		<i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
  	        	</div>
  	        </div>
  	        <div class="container">
  	        	<div id="search-overlay__results"></div>
  	        </div>
        </div>
        `);
    }
}

export default Search;