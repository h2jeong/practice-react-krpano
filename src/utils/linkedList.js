/* eslint-disable no-unused-vars */
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.lenth = 0;
  }

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length += 1;

    return this;
  }

  pop() {
    if (!this.tail) return false;

    const poppedNode = this.tail;

    if (this.head !== this.tail) {
      const newTail = this.getNodeAtIndex(this.length - 2);
      newTail.next = null;
      this.tail = newTail;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.length -= 1;

    return poppedNode;
  }

  unshift(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length += 1;

    return this;
  }

  shift() {
    if (!this.head) return false;

    const shiftedNode = this.head;
    const newHead = this.head.next;

    if (!newHead) {
      this.tail = newHead;
    }

    this.head = newHead;

    this.length -= 1;

    return shiftedNode;
  }

  getNodeAtIndex(index) {
    if (index >= this.length || index < 0) return false;

    let currentNode = this.head;
    let currentIndex = 0;

    while (currentIndex !== index) {
      currentNode = currentNode.next;
      currentIndex += 1;
    }

    return currentNode;
  }

  setNodeAtIndex(val, index) {
    const foundNode = this.getNodeAtIndex(index);

    if (foundNode) {
      foundNode.value = val;
      return foundNode;
    }

    return null;
  }

  insertAtIndex(index, val) {
    if (index < 0 || index > this.length) return false;

    if (index === 0) return this.unshift(val);
    if (index === this.length) return this.push(val);

    const newNode = new Node(val);
    const after = this.getNodeAtIndex(index);
    const before = this.getNodeAtIndex(index - 1);
    newNode.next = after;
    before.next = newNode;

    this.length += 1;

    return this;
  }

  removeFrom(index) {
    if (index < 0 || index >= this.length) return false;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const before = this.getNodeAtIndex(index - 1);
    const removedNode = this.getNodeAtIndex(index);
    before.next = removedNode.next;
    removedNode.next = null;

    this.length -= 1;

    return removedNode;
  }

  printList() {
    console.log(this);
    if (this.head) {
      let current = this.head;
      while (current.next) {
        console.log(current);
        current = current.next;
      }
      console.log(current);
    } else {
      console.log('empty list');
    }
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length += 1;
    return this;
  }
  pop() {
    if (this.length === 0) return false;
    const popped = this.tail;
    const newTail = this.tail.prev;

    if (newTail) {
      newTail.next = null;
      this.tail.prev = null;
    } else {
      this.head = null;
    }
    this.tail = newTail;
    this.length -= 1;

    return popped;
  }
  shift() {
    if (!this.head) return false;
    const shiftedNode = this.head;
    const newHead = this.head.next;
    if (this.head !== this.tail) {
      newHead.prev = null;
      shiftedNode.next = null;
    } else {
      this.tail = null;
    }
    this.head = newHead;
    this.length -= 1;
    return shiftedNode;
  }
  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length += 1;
    return this;
  }
  insertAtIndex(index, val) {
    if (index > this.length) return false;
    if (index === 0) {
      this.unshift(val);
    } else if (index === this.length) {
      this.push(val);
    } else {
      const newNode = new Node(val);
      const after = this.accessAtIndex(index);
      const before = after.prev;
      after.prev = newNode;
      before.next = newNode;
      newNode.next = after;
      newNode.prev = before;
      this.length += 1;
    }
    return this;
  }
  removeAtIndex(index) {
    let removedNode;
    if (index >= this.length) return false;
    if (index === 0) {
      removedNode = this.shift();
    } else if (index === this.length - 1) {
      removedNode = this.pop();
    } else {
      removedNode = this.getNodeAtIndex(index);
      const after = removedNode.next;
      const before = removedNode.prev;
      removedNode.next = null;
      removedNode.prev = null;
      before.next = after;
      after.prev = before;
      this.length -= 1;
    }
    return removedNode;
  }
  getNodeAtIndex(index) {
    if (index >= this.length || index < 0) return false;
    let currentIndex = 0;
    let currentNode = this.head;
    while (currentIndex !== index) {
      currentNode = currentNode.next;
      currentIndex += 1;
    }
    return currentNode;
  }
  setNodeAtIndex(index, val) {
    const foundNode = this.getNodeAtIndex(index);
    if (foundNode) {
      foundNode.value = val;
      return foundNode;
    }
    return null;
  }
  printList() {
    console.log(this);
    if (this.head) {
      let current = this.head;
      while (current.next) {
        console.log(current);
        current = current.next;
      }
      console.log(current);
    } else {
      console.log('empty list');
    }
  }
}
