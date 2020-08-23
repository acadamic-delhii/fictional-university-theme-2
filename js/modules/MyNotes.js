class MyNotes {
    constructor() {
        this.events();
    }

    events() {
        document.querySelectorAll('.edit-note').forEach(el => el.addEventListener("click", e => this.editNote(e)));
        document.querySelectorAll('.delete-note').forEach(el => el.addEventListener("click", e => this.deleteNote(e)));
        document.querySelectorAll('.update-note').forEach(el => el.addEventListener("click", e => this.updateNote(e)));
        document.querySelectorAll('.submit-note').forEach(el => el.addEventListener("click", e => this.createNote(e)));
    }

    editNote(e) {
        var thisNote = e.target.parentNode;
        if (thisNote.dataset.state == "editable") {
            this.makeNoteReadonly(thisNote);
        } else {
            this.makeNoteEditable(thisNote);
        }
    }

    makeNoteEditable(thisNote) {
        thisNote.querySelector('.edit-note').innerHTML = '<i class="fa fa-times" aria-hidden="true"></i> Cancel';
        thisNote.querySelector('.note-title-field').removeAttribute("readonly");
        thisNote.querySelector('.note-body-field').removeAttribute("readonly");
        thisNote.querySelector('.note-title-field').classList.add('note-active-field');
        thisNote.querySelector('.note-body-field').classList.add('note-active-field');
        thisNote.querySelector('.update-note').classList.add('update-note--visible');
        thisNote.dataset.state = "editable";
    }

    makeNoteReadonly(thisNote) {
        thisNote.querySelector('.edit-note').innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i> Edit';
        thisNote.querySelector('.note-title-field').setAttribute("readonly", "readonly");
        thisNote.querySelector('.note-body-field').setAttribute("readonly", "readonly");
        thisNote.querySelector('.note-title-field').classList.remove('note-active-field');
        thisNote.querySelector('.note-body-field').classList.remove('note-active-field');
        thisNote.querySelector('.update-note').classList.remove('update-note--visible');
        thisNote.dataset.state = "cancel";
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
            console.log("delete success");
            console.log(resp);
        }).catch(err => {
            console.log("delete failed");
            console.log(err)
        });
    }

    updateNote(e) {
        var thisNote = e.target.parentNode;
        var url = universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.getAttribute('data-id');
        var ourUpdatedPost = {
            title: thisNote.querySelector('.note-title-field').value,
            content: thisNote.querySelector('.note-body-field').value
        }

        fetch(url, {
            headers: {
                'X-WP-Nonce': universityData.nonce, 
                'Content-Type': 'application/json'
            },
            method: 'POST', 
            body: JSON.stringify(ourUpdatedPost)
        }).then(resp => {
            this.makeNoteReadonly(thisNote);
            console.log("post success");
            console.log(resp);
        }).catch(err => {
            console.log("post failed");
            console.log(err)
        });
    }

    createNote(e) {
        var newNoteTilte = document.querySelector('.new-note-title').value;
        var newNoteContent = document.querySelector('.new-note-body').value;
        var url = universityData.root_url + '/wp-json/wp/v2/note/';
        var ourNewPost = {
            title: newNoteTilte,
            content: newNoteContent,
            status: 'publish'
        }
        
        fetch(url, {
            headers: {
                'X-WP-Nonce': universityData.nonce, 
                'Content-Type': 'application/json'
            },
            method: 'POST', 
            body: JSON.stringify(ourNewPost)
        }).then(resp => {
            document.querySelector('.new-note-title').value = "";
            document.querySelector('.new-note-body').value = "";
            document.querySelector('#my-notes').insertAdjacentHTML("afterbegin", `
            <li>test li el</li>
            `);
            console.log("post success");
            console.log(resp);
        }).catch(err => {
            console.log("post failed");
            console.log(err)
        });
    }
}

export default MyNotes;