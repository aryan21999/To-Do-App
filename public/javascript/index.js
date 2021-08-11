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
        list = '<tr><th>Tasks</th></tr>'
        for (i = 0; i < response.data.length; i++) {
            id = response.data[i]._id
            list += '<tr>'
            list += '<td>' + response.data[i].description + '</td>'
            list += '<td>' + '<button class="fa fa-edit" onclick=updateToDo("' + id + '") action="none" type="submit" value="Update"></button>'
            list += '<td>' + '<button class="far fa-trash-alt" onclick=deleteToDo("' + id + '") action="none" type="submit" value="Delete"></button>'
            list += '</tr>'
        }
        $('#dialog').hide();
        $('#target').click(function updateToDo() {
          $('#dialog').show();
          $('#dialog').dialog();
        });
        document.getElementById('list').innerHTML = list
        let form = document.getElementById('updateToDo');
    })
    .catch(function (error) {
        if (error.response)
            console.log(localStorage.token)
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
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
            location.reload()
        })
        .catch(function (error) {
            console.log(error);
        })
}

function updateToDo(id) {
    const description = document.getElementById("description").value
    const completed = false
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