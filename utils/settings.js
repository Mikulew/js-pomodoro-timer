const settings = document.getElementById('settings');
const closeButton = document.getElementById('closeButton');
const saveButton = document.getElementById('save');

const toggleSettings = () => {
  if (settings.classList.contains('hide')) {
    settings.classList.remove('hide');
  } else {
    settings.classList.add('hide');
  }
};

closeButton.addEventListener('click', () => settings.classList.add('hide'));

saveButton.addEventListener('click', () => console.log('save – to do'));

export default toggleSettings;
