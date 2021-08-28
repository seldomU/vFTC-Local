onmessage = function (waitTime) {
    var startTime = this.performance.now();
    while (startTime + waitTime > this.performance.now()) {

    }
    postMessage('Hi');
}