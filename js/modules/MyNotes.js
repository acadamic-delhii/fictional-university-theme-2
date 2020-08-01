class MyNotes {
    constructor() {
        this.events();
    }

    events() {
        document.querySelector('.delete-note').addEventListener("click", this.deleteNote);
    }

    deleteNote() {
        var url = universityData.root_url + '/wp-json/wp/v2/note/80';
        
        fetch(url, {
            headers: {
                'X-WP-Nonce': universityData.nonce
            },
            method: 'DELETE'
        }).then(resp => {
            console.log("delete successsss");
            console.log(resp);
        }).catch(err => {
            console.log("delete failed");
            console.log(err)
        })
    }
}

export default MyNotes;