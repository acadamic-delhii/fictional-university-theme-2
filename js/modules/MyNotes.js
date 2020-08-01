class MyNotes {
    constructor() {
        this.events();
    }

    events() {
        document.querySelector('.delete-note').addEventListener("click", this.deleteNote);
    }

    deleteNote() {
        alert("test");
    }
}

export default MyNotes;