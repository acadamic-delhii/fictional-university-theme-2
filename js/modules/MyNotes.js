class MyNotes {
    constructor() {
        if (document.querySelector("#my-notes")) {
            this.myNotes = document.querySelector("#my-notes");
            this.events();
        }
    }

    events() {
        //document.querySelectorAll('.edit-note').forEach(el => el.addEventListener("click", e => this.editNote(e)));
        //document.querySelectorAll('.delete-note').forEach(el => el.addEventListener("click", e => this.deleteNote(e)));
        //document.querySelectorAll('.update-note').forEach(el => el.addEventListener("click", e => this.updateNote(e)));
        this.myNotes.addEventListener("click", e => this.handleClickEvents(e));
        document.querySelectorAll('.submit-note').forEach(el => el.addEventListener("click", e => this.createNote(e)));
    }

    handleClickEvents(e) {
        //console.log(e.target.classList)
        if (e.target.classList.contains("edit-note") || e.target.classList.contains("fa-pencil") || e.target.classList.contains("fa-times")) {
            this.editNote(e);
        } else if (e.target.classList.contains("delete-note") || e.target.classList.contains("fa-trash-o")) {
            this.deleteNote(e);
        } else if (e.target.classList.contains("update-note") || e.target.classList.contains("fa-arrow-right")) {
            this.updateNote(e);
        }
    }

    findNearestParentLI(e) {
        var thisNote = e.target;

        while (thisNote.tagName != "LI") {
            thisNote = thisNote.parentNode;
        }

        return thisNote;
    }

    editNote(e) {
        var thisNote = this.findNearestParentLI(e);

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
        var thisNote = this.findNearestParentLI(e);

        var url = universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.getAttribute('data-id');

        fetch(url, {
            headers: {
                'X-WP-Nonce': universityData.nonce
            },
            method: 'DELETE'
        }).then(resp => resp.json()).then(resp => {
            //thisNote.classList.add('fade-out');
            thisNote.style.height = `${thisNote.offsetHeight}px`;
            setTimeout(function () {
                thisNote.classList.add("fade-out");
            }, 20);
            setTimeout(function () {
                thisNote.remove();
            }, 401);
            console.log("delete success");
            console.log(resp);

            if (resp.userNoteCount < 5) {
                document.querySelector(".note-limit-message").classList.remove("active");
            }
        }).catch(err => {
            console.log("delete failed");
            console.log(err)
        });
    }

    updateNote(e) {
        var thisNote = this.findNearestParentLI(e);

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
        }).then(resp => resp.json()).then(results => {
            //console.log("breakpoint 1");
            //console.log(results);
            //console.log(results.id);
            //console.log("breakpoint 2");

            if (results.error == "You have reached your note limit.") {
                console.log("You have reached your note limit.");
                document.querySelector(".note-limit-message").classList.add("active");
            } else {
                document.querySelector('.new-note-title').value = "";
                document.querySelector('.new-note-body').value = "";
                document.querySelector('#my-notes').insertAdjacentHTML("afterbegin", `
                    <li data-id="${results.id}" class="fade-in-calc">
                        <input readonly class="note-title-field" value="${results.title.raw}">
                        <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
                        <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>
                        <textarea readonly class="note-body-field">${results.content.raw}</textarea>
                        <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>
                    </li>
                    `);
                var newNote = document.querySelector("#my-notes li");
                var newNoteHeight;
                setTimeout(function () {
                    newNoteHeight = `${newNote.offsetHeight}px`;
                    newNote.style.height = "0";
                }, 20);
                setTimeout(function () {
                    newNote.classList.remove("fade-in-calc");
                    newNote.style.height = newNoteHeight;
                }, 50);
                setTimeout(function () {
                    newNote.style.removeProperty("height");
                }, 400);
                console.log("post success");
                console.log(results);
            }
        }).catch(err => {
            console.log("post failed");
            console.log(err)
        });
    }
}

export default MyNotes;