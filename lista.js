const urlSearch = 'http://168.194.207.98:8081/tp/lista.php?action=BUSCAR';

function llamada() {
    fetch(urlSearch)
        .then(response => response.json())
        .then(data => cargarUsuarios(data))
        .catch(error => console.log(error));

    limpiarInput();
    document.getElementById("container__search__button").addEventListener("click", buscarUsuario, false);
}

function limpiarInput(){
    document.getElementById("container__search__input").value = "";
}

function cargarUsuarios(data) {
    let registros = '';

    
    for(let i = 0; i < data.length; i++){
        registros += crearTabla(data[i]);
    }
    
    

    document.getElementById('users').innerHTML = registros;
}

function crearTabla(usuario) {
    let contenidoTabla = '';

    usuario.bloqueado == "Y" ? contenidoTabla += `<tr class="bloqueado">` : contenidoTabla += `<tr class="desbloqueado">`;

    contenidoTabla += `<td>${usuario.id}</td>
                    <td>${usuario.usuario}</td>
                    <td>${usuario.bloqueado}</td>
                    <td>${usuario.apellido}</td>
                    <td>${usuario.nombre}</td>
                    <td><button onclick="accionBloqueoDesbloqueo(${usuario.id}, 'Y')"><img src="lock-padlock.png"></button></td>
                    <td><button onclick="accionBloqueoDesbloqueo(${usuario.id}, 'N')"><img src="open-lock.png"></button></td>
                </tr>`;
    
    return contenidoTabla;
}

function buscarUsuario() {
    fetch(urlSearch)
        .then(response => response.json())
        .then(data => mostrarBuscados(data))
        .catch(error => console.log(error));
    
}

function mostrarBuscados(data) {
    let tabla = '';
    let input = document.getElementById("container__search__input").value;
    let num = 0;

    for(let i = 0; i < data.length; i++){
        if(data[i].usuario.includes(input)) {
            tabla += crearTabla(data[i]);
            num++;
        }
    }
    
    document.getElementById('users').innerHTML = tabla;

    if(num==0){
        alert("Sin coincidencias");
    }
}

function accionBloqueoDesbloqueo(id, accion){
    let url = `http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser=${id}&estado=${accion}`;

    fetch(url)
        .then(response => response.json())
        .then(data => buscarUsuario())
        .catch(error => console.log(error));
}



window.addEventListener("load", llamada, false);