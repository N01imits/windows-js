export const modals = () => {
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

		const openModal = () => {
			modal.style.display = 'block';
			document.body.style.overflow = 'hidden';
		};

		const closeAllPopupWindows = () => {
			windows.forEach(window => {
				window.style.display = 'none';
			});
		};

		const closeModal = () => {
			modal.style.display = 'none';
			document.body.style.overflow = '';
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
			document.querySelector(selector).style.display = 'block';
			document.body.style.overflow = 'hidden';
		}, time);
	};

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

	showModalByTime('.popup', 60000);
};
