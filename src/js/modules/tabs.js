export const tabs = ({
	headerSelector,
	tabSelector,
	contentSelector,
	activeClass,
	display = 'block',
}) => {
	const header = document.querySelector(headerSelector);
	const tabs = document.querySelectorAll(tabSelector);
	const contents = document.querySelectorAll(contentSelector);

	const checkPressedButton = e => {
		const target = e.target;
		if (
			e.key === 'Enter' ||
			target?.classList.contains(tabSelector.replace(/\./, '')) ||
			target?.parentNode.classList.contains(tabSelector.replace(/\./, ''))
		) {
			tabs.forEach((tab, i) => {
				if (target === tab || target.parentNode === tab) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	};

	const hideTabContent = () => {
		contents.forEach(content => {
			content.style.display = 'none';
		});

		tabs.forEach(tab => {
			tab.classList.remove(activeClass);
		});
	};

	const showTabContent = (i = 0) => {
		contents[i].style.display = display;
		tabs[i].classList.add(activeClass);
	};

	hideTabContent();
	showTabContent();

	header.addEventListener('keypress', checkPressedButton);
	header.addEventListener('click', checkPressedButton);
};
