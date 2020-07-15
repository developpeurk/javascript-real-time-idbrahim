const list = document.querySelector('ul');
const form = document.querySelector('form');
const supprimer = document.querySelector('#delete');

list.addEventListener('click', e => {
  if(e.target.tagName === "BUTTON"){
    
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection("courses").doc(id).delete()
    .then(() => console.log('deleted'))
    .catch(error =>console.log(error))
  }
})
form.addEventListener('submit', e =>{
    e.preventDefault();
    const now = new Date();
    const course = {
        title: form.course.value,
        created_at : firebase.firestore.Timestamp.fromDate(now)
    }
    db.collection("courses").add(course)

  .then(res => console.log(res, "courses added"))
  .catch(error => console.log(error));

})



addCourse = (course,id) => {
    const html = `
      <li class="list-group-item" data-id=${id}>
        <h3>${course.title}</h3>
        <small>${course.created_at.toDate()}</small>
        <button class="btn btn-danger float-right" id="delete">Delete</button>
      </li>
    `
    list.innerHTML+= html;
}

const deleteCourse = (id) => {
  const courses = document.querySelectorAll('li');
  courses.forEach(course => {
    console.log('select attribute', course);
    if(course.getAttribute('data-id') === id){
      course.remove();
    }
  })

}

 db.collection("courses").onSnapshot(snap => {
   console.log(snap.docChanges());
   snap.docChanges().forEach(course => {
    if(course.type == "added"){

      addCourse(course.doc.data(), course.doc.id)
    }else{
      deleteCourse(course.doc.id);

    }
 })
})


