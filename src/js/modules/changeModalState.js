import { checkNumInputs } from './checkNumInputs';

const changeModalState = state => {
	const windowForms = document.querySelectorAll('.balcon_icons_img');
	const windowWidths = document.querySelectorAll('#width');
	const windowHeights = document.querySelectorAll('#height');
	const windowTypes = document.querySelectorAll('#view_type');
	const windowProfiles = document.querySelectorAll('.checkbox');

	checkNumInputs('#height');
	checkNumInputs('#width');

	const bindActionToElements = (event, elements, property) => {
		elements.forEach((element, i) => {
			element.addEventListener(event, () => {
				switch (element.nodeName) {
					case 'SPAN':
						state[property] = i;
						break;
					case 'INPUT':
						if (element.getAttribute('type') === 'checkbox') {
							i === 0
								? (state[property] = 'Холодное')
								: (state[property] = 'Теплое');
							elements.forEach((checkbox, j) => {
								checkbox.checked = false;
								if (i === j) {
									checkbox.checked = true;
								}
							});
						} else {
							state[property] = element.value;
						}
						break;
					case 'SELECT':
						state[property] = element.value;
						break;
				}
			});
		});
	};

	bindActionToElements('click', windowForms, 'form');
	bindActionToElements('input', windowHeights, 'height');
	bindActionToElements('input', windowWidths, 'width');
	bindActionToElements('change', windowTypes, 'type');
	bindActionToElements('change', windowProfiles, 'profile');
};

export { changeModalState };
