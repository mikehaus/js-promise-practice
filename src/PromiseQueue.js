import axios from 'axios';

const DND_BASE_URL = 'https://www.dnd5eapi.co/api/';
const DND_URL_1 = 'classes/barbarian';
const DND_URL_2 = 'damage-types/necrotic';
const DND_URL_3 = 'magic-items/adamantine-armor';

const barbarianData = axios.get(`${DND_BASE_URL}${DND_URL_1}`).then(resp => resp?.data);
const necroticData = axios.get(`${DND_BASE_URL}${DND_URL_2}`).then(resp => resp?.data);
const armorData = axios.get(`${DND_BASE_URL}${DND_URL_3}`).then(resp => resp?.data);

const dndData = [barbarianData, necroticData, armorData];

const getDndData = () => Promise.all(dndData).then(values => console.log(values));

export { getDndData };

