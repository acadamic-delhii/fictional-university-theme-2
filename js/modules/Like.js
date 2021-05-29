class Like {
    constructor() {
        this.likeBox = document.querySelector(".like-box");

        if (this.likeBox) {
            this.events();
        }
    }

    events() {
        this.likeBox.addEventListener("click", e => this.likeBoxDispatcher(e))
    }

    likeBoxDispatcher(e) {
        let currentLikeBox = e.target;

        while (!currentLikeBox.classList.contains("like-box")) {
            currentLikeBox = currentLikeBox.parentElement;
        }

        if (currentLikeBox.getAttribute("data-exists") == "yes") {
            //console.log("to deleteLike");
            this.deleteLike(currentLikeBox);
        } else {
            //console.log("to createLike");
            this.createLike(currentLikeBox);
        }
    }

    createLike(currentLikeBox) {
        currentLikeBox.setAttribute("data-exists", "yes")
    }

    deleteLike(currentLikeBox) {
        currentLikeBox.setAttribute("data-exists", "no")
    }
}

export default Like;