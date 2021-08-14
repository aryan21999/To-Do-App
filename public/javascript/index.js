axios.get('/list', {
  headers: {
    Authorization: ('Bearer ', localStorage.getItem("token"))
  },
})
  .then(function (response) {
    var list_pending = document.getElementById('pending')
    var list_completed = document.getElementById('completed')
    list_pending = `<h3 id="pending">Pending</h3>`
    list_completed = `<h3 id="completed">Completed</h3>`

    for (i = 0; i < response.data.length; i++) {
      if (response.data[i].completed == false) {
        var todo = response.data[i].description
        id = response.data[i]._id
        list_pending += `<li id="${id}">${response.data[i].description}`
        list_pending += `<form>
                  <button type="checkbox" ><i class="fa fa-check"></i></button>
                  <button onclick=modal(${i},"${id}","${todo}") type="button" id="${i}" class="fa fa-edit"/>
                  <button onclick=deleteToDo("${id}") action="none" type="submit" value="Delete"><i class="far fa-trash-alt"></i></button>
            </form></li>`
      }
    }
    for (i = 0; i < response.data.length; i++) {
      if (response.data[i].completed == true) {
        var todo = response.data[i].description
        id = response.data[i]._id
        list_completed += `<li id="${id}">${response.data[i].description}`
        list_completed += `<form>
                  <button><i class="fa fa-check"></i></button>
                  <button onclick=modal(${i},"${id}","${todo}") type="button" id="${i}" class="fa fa-edit"/>
                  <button onclick=deleteToDo("${id}") action="none" type="submit" value="Delete"><i class="far fa-trash-alt"></i></button>
            </form></li>`
      }
    }
    document.getElementById('pending').innerHTML = list_pending
    document.getElementById('completed').innerHTML = list_completed
    let form = document.getElementById('updateToDo');
  })
  .catch(function (error) {
    if (error.response)
      console.log(localStorage.token)
    console.log(error.response.data);
  });

function modal(i, id, todo) {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById(i);
    document.getElementById('modals').value = todo
    document.getElementById('modal_button').setAttribute('onclick',`updateToDo("${id}")`)

  
    var span = document.getElementsByClassName("close")[0];
  

    btn.onclick = function () {
      modal.style.display = "block";
    }
  
    span.onclick = function () {
      modal.style.display = "none";
    }
  
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }


function addToDo() {
  const description = document.getElementById('description').value;
  const completed = false;
  axios.post('/add', {
    description: description,
    completed: false
  }, {
    headers: {
      Authorization: (`Bearer ${localStorage.getItem("token")}`)
    }
  })
    .then(function (response) {
      console.log(response)
      console.log(response.data)
      location.reload()
    })
    .catch(function (error) {
      console.log(error);
    })
}

function updateToDo(id) {
  console.log(id)
  const description = document.getElementById("modals").value
  const completed = false
  axios.patch("/read/" + id , {
    description: description,
    completed: completed
  }, {
    headers: {
      Authorization: ('Bearer ', localStorage.getItem("token"))
    }
  })
    .then(function (response) {
      console.log(response);
      console.log(response.data)
      location.reload()
    })
    .catch(function (error) {
      console.log(error);
    });
}

function deleteToDo(id) {
  axios.delete("/read/" + id + "/delete", {
    headers: {
      Authorization: (`Bearer ${localStorage.getItem("token")}`)
    },
  })
    .then(function (response) {
      console.log(response);
      console.log(response.data)
      location.reload()
    })
    .catch(function (error) {
      console.log(error);
    });
}

function logOut() {
  console.log(localStorage.getItem("token"))
  axios.post('/register/logout', {
  },
    {
      headers: {
        Authorization: ('Bearer ', localStorage.getItem("token"))
      }
    }).then((response) => {
      console.log("Logged Out")
      localStorage.removeItem("token");
      location.replace('/')
    }).catch((error) => {
      console.log(error)
      console.log(localStorage.getItem("token"))
    })
}