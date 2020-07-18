class Search {
    constructor() {
        this.openButtons = document.querySelectorAll(".js-search-trigger");
        this.closeButton = document.querySelector(".search-overlay__close");
        this.searchOverlay = document.querySelector(".search-overlay");
        this.event();
    }

    event() {
        this.openButtons.forEach(el => el.addEventListener("click", e => this.openOverlay(e)));
        this.closeButton.addEventListener("click", () => this.closeOverlay());
    }

    openOverlay(e) {
        this.searchOverlay.classList.add("search-overlay--active");
    }

    closeOverlay() {
        this.searchOverlay.classList.remove("search-overlay--active");
    }
}

export default Search;