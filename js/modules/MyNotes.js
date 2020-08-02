class MyNotes {
    constructor() {
        this.events();
    }

    events() {
        document.querySelectorAll('.edit-note').forEach(el => el.addEventListener("click", this.editNote));
        document.querySelectorAll('.delete-note').forEach(el => el.addEventListener("click", this.deleteNote));
    }

    editNote(e) {
        var thisNote = e.target.parentNode;
        //console.log(e.target)
        //console.log(thisNote)
        //console.log(thisNote.querySelector('.note-title-field'))
        thisNote.querySelector('.note-title-field').removeAttribute("readonly");
        thisNote.querySelector('.note-body-field').removeAttribute("readonly");
        thisNote.querySelector('.note-title-field').classList.add('note-active-field');
        thisNote.querySelector('.note-body-field').classList.add('note-active-field');
        thisNote.querySelector('.update-note').classList.add('update-note--visible');
    }

    deleteNote(e) {
        var thisNote = e.target.parentNode;
        var url = universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.getAttribute('data-id');

        fetch(url, {
            headers: {
                'X-WP-Nonce': universityData.nonce
            },
            method: 'DELETE'
        }).then(resp => {
            thisNote.classList.add('fade-out');
            console.log("delete successsss");
            console.log(resp);
        }).catch(err => {
            console.log("delete failed");
            console.log(err)
        });
    }
}

export default MyNotes;