(function (exports) {
  const compose =
    (...fns) =>
    (data) =>
      fns.reduce((v, f) => f(v), data);

  const inherit = (...protos) => Object.assign({}, ...protos);

  // node 생성, head 정하기, 현재 node 정하기, list 길이 바꾸기, 다음 node 정하기, 이전 node 찾기
  const base = {
    node(data, ...rest) {
      const prev = rest[0] === 'double' ? { prev: null } : {};

      return Object.assign({}, { data, next: null }, prev);
    },
    setHead(options) {
      let { data } = options;
      Object.assign(options, { head: data });
      return options;
    },
    setCurrent(options) {
      let { data } = options;
      Object.assign(options, { current: data });
      return options;
    },
    setLength(options) {
      let { length, data } = options;
      length += data ? 1 : -1;
      Object.assign(options, { length });
      return options;
    },
    setNext(options) {
      let { data } = options;
      Object.assign(options.current, { next: data });
      return options;
    },
    findPrev(options) {
      let { head, data } = options;
      let c = head;
      while (!(c.next === null)) {
        if (c.next.data === data) {
          return c;
        } else {
          c = c.next;
        }
      }
      return false;
    }
  };

  const single = {
    geState() {
      return this;
    },
    setState(options) {
      Object.assign(this, options);
    },
    add(data) {
      const options = Object.assign(this.getState(), { data: this.node(data) });
      const fns = !this.head && !this.current ? [this.setHead] : [this.setNext];
      compose(...fns, this.setCurrent, this.setLength, this.setState)(options);
    },
    remove(data) {
      const options = Object.assign(this.getState(), { data });
      const prev = this.findPrev(options);
      let values, fns;
      if (prev && !(prev.next === null)) {
        values = { current: prev, data: prev.next.next };
        fns = [this.setNext, this.setState];
      } else {
        values = { data: options.head.next };
        fns = [this.setHead, this.setState];
      }
      compose(...fns)(Object.assign(options, values));
      this.setLength(Object.assign(options, { data: false }));
    },
    reverse() {
      let prev = null;
      let node = this.head;

      while (node) {
        let save = node.next;
        node.next = prev;
        prev = node;
        node = save;
      }
      Object.assign(this.getState(), { head: prev });
    },
    display() {
      let c = this.head;
      let show = '';
      while (c === null) {
        show += `${c.data} ${c.next !== null ? ' ->' : ''}`;
        c = c.next;
      }
      return show;
    },
    getCurrent() {
      return Object.assign({}, this.current);
    },
    getList() {
      return Object.assign({}, this.head);
    },
    size() {
      return this.length;
    }
  };
  const double = {
    add(data) {
      const options = Object.assign(this.getState(), { data: this.node(data, 'double') });
      const fns = !this.head && !this.current ? [this.setHead] : [this.setNext, this.setPrev];
      compose(...fns, this.setCurrent, this.setLength, this.setState)(options);
    },
    remove(data) {
      const options = Object.assign(this.getState(), { data });
      let prev = this.findPrev(options);
      let values, fns;
      if (prev && !(prev.next === null)) {
        values = { current: prev, data: prev.next.next };
        fns = [this.setPrev, this.setNext, this.setState];
      } else {
        values = {
          data: {
            data: options.head.next.data,
            next: options.head.next.next,
            prev: null
          }
        };
        fns = [this.setHead, this.setState];
      }
      compose(...fns)(Object.assign(options, values));
      this.setLength(Object.assign(options, { data: false }));
    }
  };
  const circular = {
    display() {
      let c = this.head;
      let show = `${c.data} ${c.next !== this.head ? ' -> ' : ''}`;
      while (!(c.next === this.head)) {
        show += `${c.next.data} ${c.next !== this.head ? ' -> ' : ''}`;
        c = c.next;
      }
      return show;
    },
    contains(data) {
      let c = this.head;
      while (!(c.next === this.head)) {
        if (c.data === data) return true;
        c = c.next;
      }
      return false;
    }
  };
  const singleLL = () => {
    const variables = { head: null, current: null, length: 0 };
    const proto = inherit(base, single);
    return Object.assign(Object.create(proto), variables);
  };
  const doubleLL = () => {
    const setPrev = (options) => {
      let { current, data } = options;
      if (data !== null) {
        Object.assign(options.data, { prev: current });
      }
      return options;
    };
    const variables = { head: null, current: null, length: 0 };
    const b = Object.assign(base, { setPrev });
    const proto = inherit(b, single, double);
    return Object.assign(Object.create(proto), variables);
  };
  const circularLL = () => {
    const setHead = (options) => {
      let { data } = options;
      Object.assign(options, { head: data });
      Object.assign(options.head, { next: options.head });
      return options;
    };
    const setNext = (options) => {
      let { data } = options;
      if (data.next === null) {
        Object.assign(data, { next: options.head });
      }
      Object.assign(options.current, { next: data });
      return options;
    };
    const setPrev = (options) => {
      let { data } = options;
      if (data === null) {
        Object.assign(data, { data: options.head });
      } else {
        Object.assign(data, { prev: options.current });
      }
      return options;
    };

    const variables = { head: null, current: null, length: 0 };
    const b = Object.assign(base, { setHead, setNext, setPrev });
    const proto = inherit(b, single, double, circular);

    return Object.assign(Object.create(proto), variables);
  };

  Object.assign(exports, { singleLL, doubleLL, circularLL });
})(typeof module.exports !== undefined ? module.exports : window);
