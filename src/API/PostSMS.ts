// import axios from "axios";

export const sendSMS = async (phone: string, codigo: string) => {
	console.log("phone: ", phone, "codigo: ", codigo);

	const APIkey = "ZGJKWDhmVVNtNmJKVzRNMFpRTVdqUzVpMVBLU1M1aTI=";
	const BaseURL = "https://api.nvoip.com.br/v2/sms";

	const URL = `${BaseURL}?napikey=${APIkey}`;

	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("Authorization", "Bearer access_token" + APIkey);

	let bodyParams = {
		numberPhone: phone,
		message: `código:${codigo}`,
		flashSms: false,
	};

	let config = {
		method: "POST",
		headers: headers,
		body: JSON.stringify(bodyParams),
	};

	fetch(URL, config)
		.then((res) => {
			console.log("res: ", res);
		})
		.catch((err) => {
			console.log("err: ", err);
		});

	// var request = new XMLHttpRequest();

	// request.open("POST", "https://api.nvoip.com.br/v2/sms");

	// request.setRequestHeader("Content-Type", "application/json");
	// request.setRequestHeader(
	//   "Authorization",
	//   "Bearer access_token92eb5717-f876-11ee-ab5a-02a0b41d24f8"
	// );

	// request.onreadystatechange = function () {
	//   if (this.readyState === 4) {
	//     console.log("Status:", this.status);
	//     console.log("Headers:", this.getAllResponseHeaders());
	//     console.log("Body:", this.responseText);
	//   }
	// };

	// var body = {
	//   numberPhone: phone,
	//   message: `código:${codigo}`,
	//   flashSms: false,
	// };

	// request.send(JSON.stringify(body));
};
