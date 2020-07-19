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
        fetch(universityData.root_url + '/wp-json/wp/v2/posts?search=' + this.searchField.value)
            .then(res => res.json())
            .then((posts) => {
                this.resultsDiv.innerHTML = `
                <h2 class="search-overlay__section-title">General Information</h2>
                ${posts.length ? '<ul class="link-list min-list">' : '<p>No general information that matches the search.</p>'}
                    ${posts.map(item => `<li><a href="${item.link}">${item.title.rendered}</a></li>`).join('')}
                ${posts.length ? '</ul>' : ''}
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
  	        	<div id="search-overlay__results">
  	        		test
  	        	</div>
  	        </div>
        </div>
        `);
    }
}

export default Search;