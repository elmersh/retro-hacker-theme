'use strict';
/**
 * JavaScript — JSDoc, clases, regex, generadores
 * @param {number[]} values
 * @returns {number}
 */
const sum = (values) => values.reduce((acc, n) => acc + n, 0);

class Terminal extends EventTarget {
  static #instances = 0;
  constructor({ prompt = '$', color = '#39ff14' } = {}) {
    super();
    this.prompt = prompt;
    this.color = color;
    Terminal.#instances++;
  }

  *history() {
    let i = 0;
    while (true) yield `cmd-${i++}`;
  }

  get banner() {
    return `>>> ${this.prompt} READY [${Terminal.#instances}] <<<`;
  }
}

const term = new Terminal({ prompt: 'root@devxi:~#' });
const emailRe = /^[\w.+-]+@[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]+$/i;

document.querySelectorAll('.btn').forEach((el, idx) => {
  el.addEventListener('click', async (e) => {
    e.preventDefault();
    const { data } = await import('./module.js');
    console.info(idx, data, emailRe.test('info@devxi.com'), 0xff, 1e3, 10n);
  });
});

export { sum, term };
