import Block from '../../framework/Block';

class Loader extends Block {
  constructor() {
    super({}); 
  }

  render() {
    return `
          <div class="Loader">
            <span class="Loader__bubble"></span>
          </div>
      `;
  }
}

export default Loader;
