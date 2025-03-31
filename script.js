document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('meuFormulario');
    const resultadoDiv = document.getElementById('resultado');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
    
        document.querySelectorAll('.error').forEach(el => {
            el.classList.add('hidden');
        });

        let isValid = true;

        const nome = document.getElementById('nome').value.trim();
        if (nome === '') {
            document.getElementById('nome-error').classList.remove('hidden');
            isValid = false;
        }

        const dataNascimento = document.getElementById('dataNascimento').value;
        if (dataNascimento === '') {
            document.getElementById('dataNascimento-error').classList.remove('hidden');
            isValid = false;
        }

        const estadoCivil = document.getElementById('estadoCivil').value;
        if (estadoCivil === '') {
            document.getElementById('estadoCivil-error').classList.remove('hidden');
            isValid = false;
        }


        const generoSelecionado = document.querySelector('input[name="genero"]:checked');
        if (!generoSelecionado) {
            document.getElementById('genero-error').classList.remove('hidden');
            isValid = false;
        }

        const interessesSelecionados = document.querySelectorAll('input[name="interesses"]:checked');
        if (interessesSelecionados.length === 0) {
            document.getElementById('interesses-error').classList.remove('hidden');
            isValid = false;
        }

        const mensagem = document.getElementById('mensagem').value.trim();
        if (mensagem === '') {
            document.getElementById('mensagem-error').classList.remove('hidden');
            isValid = false;
        }

        const email = document.getElementById('email').value.trim();
        if (email === '') {
            document.getElementById('email-error').textContent = 'Por favor, insira seu e-mail.';
            document.getElementById('email-error').classList.remove('hidden');
            isValid = false;
        } else if (!validarEmail(email)) {
            document.getElementById('email-error').textContent = 'Por favor, insira um e-mail válido.';
            document.getElementById('email-error').classList.remove('hidden');
            isValid = false;
        }

        if (isValid) {
            const formData = {
                nome: nome,
                dataNascimento: dataNascimento,
                estadoCivil: estadoCivil,
                genero: generoSelecionado ? generoSelecionado.value : '',
                interesses: Array.from(interessesSelecionados).map(el => el.value),
                mensagem: mensagem,
                email: email
            };

            exibirResultados(formData);
        }
    });

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }


    function exibirResultados(data) {
        let html = '<h2>Dados do Formulário:</h2>';
        html += `<p><strong>Nome:</strong> ${data.nome}</p>`;
        html += `<p><strong>Data de Nascimento:</strong> ${formatarData(data.dataNascimento)}</p>`;
        html += `<p><strong>Estado Civil:</strong> ${formatarEstadoCivil(data.estadoCivil)}</p>`;
        html += `<p><strong>Gênero:</strong> ${data.genero.charAt(0).toUpperCase() + data.genero.slice(1)}</p>`;
        html += `<p><strong>Interesses:</strong> ${data.interesses.join(', ')}</p>`;
        html += `<p><strong>Mensagem:</strong> ${data.mensagem}</p>`;
        html += `<p><strong>E-mail:</strong> ${data.email}</p>`;
        
        resultadoDiv.innerHTML = html;
        resultadoDiv.classList.remove('hidden');
    }

    function formatarData(data) {
        if (!data) return '';
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    function formatarEstadoCivil(estadoCivil) {
        const opcoes = {
            'solteiro': 'Solteiro(a)',
            'casado': 'Casado(a)',
            'divorciado': 'Divorciado(a)',
            'viuvo': 'Viúvo(a)'
        };
        return opcoes[estadoCivil] || estadoCivil;
    }
});