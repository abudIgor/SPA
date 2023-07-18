const helpers =  {
  checkCPFRules: function (cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    var soma = 0;
    var resto;

    for (var i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    soma = 0;

    for (var j = 1; j <= 10; j++) {
      soma += parseInt(cpf.substring(j - 1, j)) * (12 - j);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }
    return true;
  },
  checkRegexPhone: function (phoneNumber) {
    var regexNumeros = /^[0-9]+$/;
    var regexTamanho = /^.{11}$/;
    return (regexNumeros.test(phoneNumber) && regexTamanho.test(phoneNumber))
  },
  checkRegexName: function (name) {
    var regexName = /\s/;
    return regexName.test(name)
  },
  goToWpp: function () {
    window.open("https://wa.me/5532991488518", "_blank");
  },
  cleanCep: function (cep) {
    return cep.replace(/\s/g, "");
  }
}



export default helpers
