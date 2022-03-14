export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  };

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }

  renderer(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  };
}
