import axios from 'axios';

const DND_BASE_URL = 'https://www.dnd5eapi.co/api/';
const DND_URL_1 = 'classes/barbarian';
const DND_URL_2 = 'damage-types/necrotic';
const DND_URL_3 = 'magic-items/adamantine-armor';

const barbarianData = axios.get(`${DND_BASE_URL}${DND_URL_1}`).then(resp => console.log(resp?.data));
const necroticData = axios.get(`${DND_BASE_URL}${DND_URL_2}`).then(resp => console.log(resp?.data));
const armorData = axios.get(`${DND_BASE_URL}${DND_URL_3}`).then(resp => console.log(resp?.data));

const dndData = [barbarianData, necroticData, armorData];

function PromiseQueue(tasks = [], concurrentCount = 1) {
  this.total = tasks.length;
  this.todo = tasks;
  this.running = [];
  this.complete = [];
  this.count = concurrentCount;
}

PromiseQueue.prototype.runNext = function() {
  return ((this.running.length < this.count) && this.todo.length)
}

PromiseQueue.prototype.run = function() {
  while (this.runNext()) {
    const promise = this.todo.shift();
    promise.then(() => {
      this.complete.push(this.running.shift());
      this.run();
    });
    this.running.push(promise);
  }
}

const getDndData = () => {
  const promiseQueue = new PromiseQueue(dndData, 3);
  promiseQueue.run();
}

export { getDndData };

