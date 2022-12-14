const getBtn = document.getElementById("open-acc");
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
    result.forEach(element => {
      console.log(element.symbol)
      document.getElementById(`${element.nameid}-symbol`).innerHTML =
        `${element.symbol}`;
      document.getElementById(`${element.nameid}-name`).innerHTML =
        element.nameid.toUpperCase();
      document.getElementById(`${element.nameid}-price`).innerHTML =
        `$ ${Number(element.price_usd).toLocaleString('en-US')}`;
      if (Number(element.percent_change_24h) < 0) {
        document
          .getElementById(`${element.nameid}-tra`)
          .classList.remove("text-emerald-300");
        document
          .getElementById(`${element.nameid}-tra`)
          .classList.add("text-red-500");
      }
      document.getElementById(`${element.nameid}-tra`).innerHTML =
        `${element.percent_change_24h}%`;
    });
  });
};
window.onload = () => {
  getData();
};
getBtn.addEventListener("click", getData);

function setValues(result) {
  r;
}
