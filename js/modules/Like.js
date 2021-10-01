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
        var url = universityData.root_url + '/wp-json/university/v1/manageLike';
        var data = {
            professorId: currentLikeBox.getAttribute("data-professor")
        }

        fetch(url, {
            headers: {
                'X-WP-Nonce': universityData.nonce,
                'Content-Type': 'application/json'
            },
            method: 'POST', 
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then((results) => {
            console.log("Like created successfully. ");
            console.log(results);
            currentLikeBox.setAttribute("data-exists", "yes");
        })
        .catch(err => console.error(err));
    }

    deleteLike(currentLikeBox) {

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
            currentLikeBox.setAttribute("data-exists", "no");
        })
        .catch(err => console.error(err));
    }
}

export default Like;