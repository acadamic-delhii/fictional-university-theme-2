class Search {
    constructor() {
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
                this.typingTimer = setTimeout(() => this.getResults(), 2000);
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
                if (!this.isOverlayOpen && !querySelector("input, textarea").hasFocus()) {
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
        this.isOverlayOpen = true;
    }

    closeOverlay() {
        this.searchOverlay.classList.remove("search-overlay--active");
        document.querySelector("body").classList.remove("body-no-scroll");
        this.isOverlayOpen = false;
    }
}

export default Search;