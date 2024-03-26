export const modals = () => {
	let isModalOpen = false;
	function bindModal({
		triggerSelector,
		modalSelector,
		closeSelector,
		closeClickOverlay = true,
	}) {
		const triggers = document.querySelectorAll(triggerSelector);
		const modal = document.querySelector(modalSelector);
		const close = document.querySelector(closeSelector);
		const windows = document.querySelectorAll('[data-modal]');
		const scroll = calcScroll();

		const openModal = () => {
			modal.style.display = 'block';
			document.body.style.overflow = 'hidden';
			document.body.style.marginRight = `${scroll}px`;
			isModalOpen = true;
		};

		const closeAllPopupWindows = () => {
			windows.forEach(window => {
				window.style.display = 'none';
				document.body.style.marginRight = `0px`;
				isModalOpen = false;
			});
		};

		const closeModal = () => {
			modal.style.display = 'none';
			document.body.style.overflow = '';
			document.body.style.marginRight = `0px`;
			isModalOpen = false;
		};

		triggers.forEach(trigger => {
			trigger.addEventListener('click', e => {
				if (e.target) {
					e.preventDefault();
				}
				closeAllPopupWindows();
				openModal();
			});
		});

		close.addEventListener('click', closeModal);
		close.addEventListener('click', closeAllPopupWindows);

		modal.addEventListener('click', e => {
			if (e.target === modal && closeClickOverlay) {
				closeAllPopupWindows();
				closeModal();
			}
		});

		document.addEventListener('keydown', e => {
			if (e.key === 'Escape') {
				closeModal();
			}
		});
	}

	const showModalByTime = (selector, time) => {
		setTimeout(() => {
			if (!isModalOpen) {
				document.querySelector(selector).style.display = 'block';
				document.body.style.overflow = 'hidden';
				isModalOpen = true;
			}
		}, time);
	};

	function calcScroll() {
		const div = document.createElement('div');

		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);
		const scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();

		return scrollWidth;
	}

	bindModal({
		triggerSelector: '.popup_engineer_btn',
		modalSelector: '.popup_engineer',
		closeSelector: '.popup_engineer .popup_close',
	});

	bindModal({
		triggerSelector: '.phone_link',
		modalSelector: '.popup',
		closeSelector: '.popup_close',
	});

	bindModal({
		triggerSelector: '.popup_calc_btn',
		modalSelector: '.popup_calc',
		closeSelector: '.popup_calc_close',
	});

	bindModal({
		triggerSelector: '.popup_calc_button',
		modalSelector: '.popup_calc_profile',
		closeSelector: '.popup_calc_profile_close',
		closeClickOverlay: false,
	});

	bindModal({
		triggerSelector: '.popup_calc_profile_button',
		modalSelector: '.popup_calc_end',
		closeSelector: '.popup_calc_end_close',
		closeClickOverlay: false,
	});

	showModalByTime('.popup[data-modal]', 5000);
};
