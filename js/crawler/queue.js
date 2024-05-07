class SetQueue {
    constructor() {
        this.items = [];
    }

    // 入队操作
    enqueue(element) {
        if (this.items.includes(element)) {
            return;
        }
        this.items.push(element);
    }

    // 出队操作
    dequeue() {
        if (this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }

    // 检查队列是否为空
    isEmpty() {
        return this.items.length === 0;
    }

    // 查看队列前端元素
    front() {
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }

    // 查看队列大小
    size() {
        return this.items.length;
    }

    // 打印队列元素
    printQueue() {
        let str = "";
        for (let i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }
}

module.exports = SetQueue;
