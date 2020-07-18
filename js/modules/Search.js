class Search {
    constructor() {
        this.openButtons = document.querySelectorAll(".js-search-trigger");
        this.closeButton = document.querySelector(".search-overlay__close");
        this.searchOverlay = document.querySelector(".search-overlay");
        this.searchField = document.querySelector("#search-term");
        this.event();
        this.isOverlayOpen = false;
        this.typingTimer;
    }

    event() {
        this.openButtons.forEach(el => el.addEventListener("click", e => this.openOverlay(e)));
        this.closeButton.addEventListener("click", () => this.closeOverlay());
        document.addEventListener("keydown", e => this.keyPressDispatcher(e));
        this.searchField.addEventListener("keydown", () => this.typingLogic());
    }

    typingLogic() {
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(() => {console.log("test")}, 2000);
    }

    keyPressDispatcher(e) {
        switch (e.keyCode) {
            case 83:
                if (!this.isOverlayOpen) {
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