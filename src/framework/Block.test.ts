import { expect } from 'chai';
import Block, { Props } from './Block.ts';

describe('Block', () => {
  let component: Block;
  let template: HTMLDivElement;
  let props: Props;

  class Component extends Block {

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(p: Props) {
      super(p);
    }


    render() {
      return `
    <div>
      {{prop}}
      {{{ List }}}
      {{{ Children }}}
    </div>
    `;
    }


  }

  beforeEach(() => {
    props = {
      prop: 'test',
      list: Array(3).fill(1).map((_, i) => new Component({ prop: `test ${i}` })),
      children: new Component({ prop: 'test' }),
    };

    component = new Component(props);
    template = component.getContent() as HTMLDivElement;
  });

  it('Создается DOM элемент', () => {
    return expect(template instanceof HTMLDivElement).to.be.true;
  });

  it('Присваиваются пропсы при иницализации', () => {
    expect(component.props.prop).to.equal(props.prop);
  });

  it('Присваиваются листы при иницализации', () => {
    expect(component.lists.list).to.deep.equal(props.list);
  });

  it('Присваиваются дети при иницализации', () => {
    return expect(component.children.children instanceof Block).to.be.true;
  });

  it('Изменяем пропсы', () => {
    component.setProps({ prop: 'test2' });
    expect(component.props.prop).to.equal('test2');
  });

  it('Изменяем листы', () => {
    const newList = Array(3).fill(1).map((_, i) => new Component({ prop: `newList ${i}` }));
    component.setProps({ list: newList });
    expect(component.lists.list).to.deep.equal(newList);
  });

  it('Изменяем детей', () => {
    const newChildren = new Component({ prop: 'newChildren' });
    component.setProps({ children: newChildren });
    expect(component.children.children.props.prop).to.equal('newChildren');
  });

  it('Срабатывает CDM при монтрировании компонента', () => {
    let count = 0;
    component.componentDidMount = () => {
      count++;
    };
    component.dispatchComponentDidMount();
    expect(count).to.equal(1);
  });

  it('Срабатвает CDU при обновлении пропсов', () => {
    let itWorks = false;
    component.componentDidUpdate = (oldProps: Props, newProps: Props) => {
      if (oldProps.innerProp !== newProps.innerProp) {
        itWorks = true;
      }
      return true;
    };
    component.setProps({ innerProp: 'innerProp' });

    return expect(itWorks).to.be.true;
  });
});

