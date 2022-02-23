export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  };

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }

  renderer() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  };
}
