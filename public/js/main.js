const forms = document.querySelector('.forms');

//Validação de campos de login
forms.addEventListener('submit', (e) => {
    e.preventDefault();
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const senhaInput = el.querySelector('input[name="senha"]');
    let errors = false;

    if(senhaInput.value.length < 6 || senhaInput.value.length > 50) {
        const errorsSenha = document.querySelector('.errorsSenha');
        errorsSenha.innerHTML = 'A senha deve conter no mínimo 6 caractéres.';
        errors = true;
    }

    if(!errors) el.submit();
})