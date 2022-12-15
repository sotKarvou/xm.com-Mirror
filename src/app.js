const wantedCryptos = ["BTC", "ETH", "XRP", "LTC", "BCH"];
const sendHttpRequest = () => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.coinlore.net/api/tickers/");

    xhr.responseType = "json";
    xhr.onload = () => {
      resolve(xhr.response);
    };

    xhr.send();
  });

  return promise;
};

const getData = () => {
  sendHttpRequest().then((responseData) => {
    let data = responseData.data;
    const result = data.filter((item) => wantedCryptos.includes(item.symbol));
    result.forEach((element) => {
      console.log(element.symbol);
      document.getElementById(
        `${element.nameid}-symbol`
      ).innerHTML = `${element.symbol}`;
      document.getElementById(`${element.nameid}-name`).innerHTML =
        element.nameid.toUpperCase();
      document.getElementById(
        `${element.nameid}-price`
      ).innerHTML = `$ ${Number(element.price_usd).toLocaleString("en-US")}`;
      if (Number(element.percent_change_24h) < 0) {
        document
          .getElementById(`${element.nameid}-tra`)
          .classList.remove("text-emerald-300");
        document
          .getElementById(`${element.nameid}-tra`)
          .classList.add("text-red-500");
      }
      document.getElementById(
        `${element.nameid}-tra`
      ).innerHTML = `${element.percent_change_24h}%`;
    });
  });
};

window.onload = () => {
  getData();
  document.getElementById("mail").value = "";
  document.getElementById("password").value = "";
};

function validateEmail() {
  const email = document.getElementById("mail").value;
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(validRegex)) {
    document.getElementById("mail").classList.remove("border-red-500");
    document.getElementById("mail").classList.add("border-green-500");
  }else{
    document.getElementById("mail-validator").classList.add("flex")
    document.getElementById("mail-validator").classList.remove("hidden")
  }
  
}

const pw = document.getElementById("password");

function initializeValidation(x) {
  const lenght = document.getElementById("length");
  const numbers = document.getElementById("numbers");
  const lower = document.getElementById("lowercase");
  const upper = document.getElementById("uppercase");
  const special = document.getElementById("special");

  const validators = [lenght, numbers, lower, upper, special];
  validators.forEach((element) => {
    element.classList.remove("text-white");
    element.classList.add("text-red-500");
  });
}

function validatePassword(x) {
  const lenght = document.getElementById("length");
  const numbers = document.getElementById("numbers");
  const lower = document.getElementById("lowercase");
  const upper = document.getElementById("uppercase");
  const special = document.getElementById("special");

  const value = pw.value;
  if (value.length >= 8) {
    lenght.classList.remove("text-red-500");
    lenght.classList.add("text-green-500");
  } else {
    lenght.classList.add("text-red-500");
    lenght.classList.remove("text-green-500");
  }

  let lowerCaseLetters = /[a-z]/g;
  if (value.match(lowerCaseLetters)) {
    lower.classList.remove("text-red-500");
    lower.classList.add("text-green-500");
  } else {
    lower.classList.add("text-red-500");
    lower.classList.remove("text-green-500");
  }

  var upperCaseLetters = /[A-Z]/g;
  if (value.match(upperCaseLetters)) {
    upper.classList.remove("text-red-500");
    upper.classList.add("text-green-500");
  } else {
    upper.classList.add("text-red-500");
    upper.classList.remove("text-green-500");
  }
  var nms = /[0-9]/g;
  if (value.match(nms)) {
    numbers.classList.remove("text-red-500");
    numbers.classList.add("text-green-500");
  } else {
    numbers.classList.add("text-red-500");
    numbers.classList.remove("text-green-500");
  }

  let char = /[\^!@#\$%\^\&*\)\(\[\]\/\\?+=,._-]+$/g;
  if (value.match(char)) {
    special.classList.remove("text-red-500");
    special.classList.add("text-green-500");
  } else {
    special.classList.add("text-red-500");
    special.classList.remove("text-green-500");
  }

  if (
    value.length >= 8 &&
    value.match(lowerCaseLetters) &&
    value.match(upperCaseLetters) &&
    value.match(nms) &&
    char.test(value)
  ) {
    pw.classList.add("text-green-500");
    pw.classList.remove("text-red-500");

    document.getElementById("submit").classList.add("bg-green-500");
    document.getElementById("submit").classList.add("bg-slate-400");
    document.getElementById("submit").classList.add("cursor-pointer");
    document.getElementById("submit").classList.add("cursor-not-allowed");
    document.getElementById("submit").disabled = false;
  }
}

function Submit(event) {
  event.preventDefault();
  document.getElementById("congrats").classList.remove("hidden");
  document.getElementById("congrats").classList.add("flex");
}
