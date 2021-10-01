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
        currentLikeBox.setAttribute("data-exists", "yes");

        var url = universityData.root_url + '/wp-json/university/v1/manageLike';

        fetch(url, {
            headers: {
                'X-WP-Nonce': universityData.nonce,
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        .then(res => res.json())
        .then((results) => {
            console.log(results);
        })
        .catch(err => console.error(err));
    }

    deleteLike(currentLikeBox) {
        currentLikeBox.setAttribute("data-exists", "no");

        var url = universityData.root_url + '/wp-json/university/v1/manageLike';

        fetch(url, {
            headers: {
                'X-WP-Nonce': universityData.nonce,
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        })
        .then(res => res.json())
        .then((results) => {
            console.log(results);
        })
        .catch(err => console.error(err));
    }
}

export default Like;