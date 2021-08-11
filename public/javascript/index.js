// const input = document.querySelector('input');
// const btn = document.querySelector('.addTask > button');

// btn.addEventListener('click', addToDo);

axios.get('/list', {
    headers: {
        Authorization: ('Bearer ', localStorage.getItem("token"))
    },
})
    .then(function (response) {
        var list = document.getElementById('list')
        list = '<tr><th>description</th><th>Status</th></tr>'
        for (i = 0; i < response.data.length; i++) {
            id = response.data[i]._id
            list += '<tr>'
            list += '<td>' + response.data[i].description + '</td>'
            list += '<td>' + response.data[i].completed + '</td>'
            list += '<td>' + '<button onclick=deleteToDo("' + id + '") action="none" type="submit" value="Delete">Delete Task</button>'
            list += '<td>' + '<button onclick=updateToDo("' + id + '") action="none" type="submit" value="Update">Update</button>'
            list += '</tr>'
        }
        document.getElementById('list').innerHTML = list
        let form = document.getElementById('updateTask');
    })
    .catch(function (error) {
        if (error.response)
            console.log(localStorage.token)
        console.log(error.response.data);
    });

function addToDo() {
    const description = document.getElementById('description').value;
    const completed = false;
    console.log(localStorage.getItem("token"))
    console.log(`Bearer , ${localStorage.getItem("token")}`)
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
            console.log({ message: "Task Created" })
        })
        .catch(function (error) {
            console.log(error);
        })
}

function updateToDo(id) {
    console.log(id)
    const description = document.getElementById("description").value
    const completed = false
    console.log(description)
    console.log(completed)
    axios.patch("/read/"+ id + "", {
        description: description,
        completed: completed
    },{
    headers: {
      Authorization : ('Bearer ', localStorage.getItem("token"))
    }})
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
    axios.delete("/read/"+ id + "/delete", {
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
        Authorization : ('Bearer ', localStorage.getItem("token"))
      }
    }).then((response) => {
      console.log("Logged Out")
      localStorage.removeItem("token");
      location.replace('/')
    }).catch ((error) => {
      console.log(error)
      console.log(localStorage.getItem("token"))
    })
  }