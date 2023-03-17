function login() {
    event.preventDefault();

    const user = { username: document.getElementById("user").value ,
                password: document.getElementById("password").value };
    const url = `http://168.194.207.98:8081/tp/login.php?user=${user.username}&pass=${user.password}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.respuesta == "ERROR") alert(data.mje);
            else {alert(data.mje); location.href = 'http://127.0.0.1:5500/lista.html';}
        })
        .catch(error => alert(error));
};
