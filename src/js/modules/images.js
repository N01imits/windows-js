export const images = () => {
	const workSection = document.querySelector('.works');
	const imgPopup = document.createElement('div');
	const bigImage = document.createElement('img');

	imgPopup.classList.add('popup');
	workSection.appendChild(imgPopup);

	imgPopup.style.justifyContent = 'center';
	imgPopup.style.alignItems = 'center';
	imgPopup.style.display = 'none';

	workSection.addEventListener('click', e => {
		e.preventDefault();
		const target = e.target;

		if (target && target.classList.contains('preview')) {
			document.body.style.overflow = 'hidden';
			imgPopup.style.display = 'flex';
			const path = target.parentNode.getAttribute('href');
			bigImage.style.width = '50rem';
			bigImage.style.height = '50rem';

			bigImage.setAttribute('src', path);
		}

		if (target && target.matches('div.popup')) {
			imgPopup.style.display = 'none';
		}

		document.addEventListener('keydown', e => {
			if (e.key === 'Escape') {
				imgPopup.style.display = 'none';
			}
		});
	});

	imgPopup.appendChild(bigImage);
};
