const forms = () => {
	const forms = document.querySelectorAll('form');
	const inputs = document.querySelectorAll('input');
	const phoneInputs = document.querySelectorAll('input[name="user_phone"]');

	phoneInputs.forEach(phoneInput => {
		phoneInput.addEventListener('input', () => {
			phoneInput.value = phoneInput.value.replace(/\D/, '');
		});
	});

	const messages = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся.',
		failure: 'Что-то пошло не так...',
	};

	const postData = async (url, data) => {
		document.querySelector('.status').textContent = messages.loading;

		const result = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: data,
		});

		return await result.text();
	};

	const clearInputs = () => {
		inputs.forEach(input => {
			input.value = '';
		});
	};

	const formDataToJson = formData => {
		return JSON.stringify(Object.fromEntries(formData));
	};

	forms.forEach(form => {
		form.addEventListener('submit', e => {
			e.preventDefault();

			const statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			form.append(statusMessage);

			const formData = new FormData(form);
			const jsonData = formDataToJson(formData);

			postData('http://localhost:3000/api/data', jsonData)
				.then(result => {
					console.log(result);
					statusMessage.textContent = messages.success;
				})
				.catch(() => (statusMessage.textContent = messages.failure))
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
					}, 5000);
				});
		});
	});
};

export default forms;
