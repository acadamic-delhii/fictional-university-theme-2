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
        this.resultsDiv.innerHTML = "Imagine real search results here...";
        this.isSpinnerVisible = false;
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