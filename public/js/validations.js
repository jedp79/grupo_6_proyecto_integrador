window.addEventListener('load', ()=> {
    const tablaErrores = document.querySelector('.tablaErrores');

    const formulario = document.querySelector('.form');
    const name = document.querySelector('input[name="name"]');
    const email = document.querySelector('input[name="email"]');
    const password = document.querySelector('input[name="password"]');
    const repassword = document.querySelector('input[name="repassword"]');

    const price = document.querySelector('input[name="price"]');
    const img = document.querySelector('input[name="img"]');
    const description = document.querySelector('input[name="description"]');

    formulario.addEventListener('submit', (e)=> {
        let errores = [];
        tablaErrores.innerHTML = '';

        let imgExtension = img?.value.split('.').pop().toLowerCase();

        if(name?.value == '') {
            errores.push('Debes compeltar el nombre');
        } else if(name?.value.length < 2) {
            errores.push('Nombre debe tener mas de 2 caracteres');
        }

        if(email?.value == '') {
            errores.push('Debe completar el email');
        }

        if(password?.value == '') {
            errores.push('Debe completar la contraseña');
        } else if(password?.value.length < 8) {
            errores.push('Contraseña debe tener mas de 8 caracteres')
        }
        
        if(repassword?.value == '') {
            errores.push('Debe completar la contraseña');
        }

        if(price?.value == '') {
            errores.push('Debes completar el precio');
        }

        if(img?.value == '') {
            errores.push('Debes subir una imagen');
        } else if(img && imgExtension != 'jpg' && imgExtension != 'jpeg' &&  imgExtension != 'png' && imgExtension != 'gif') {
            errores.push('Debes subir un formato de imagen JPG, JPEG, PNG o GIF');
        }

        if(description?.value == '') {
            errores.push('Debes completar la descripción');
        }


        if(errores.length > 0) {
            e.preventDefault();

            for(let error of errores) {
                tablaErrores.innerHTML += `<li class='invalid'>${error}</li>`
            }

            errores = [];
        }
    });

});