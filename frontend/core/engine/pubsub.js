
let subscribers = {}, unsubscribers = [];
export default new class PubSub {

    publish(subject, ...args) {
        args = args || [];
        if (!subscribers[subject]) return;

        for (let sub of subscribers[subject]) {
            typeof sub === 'function' && sub(args);
        };
        unsubscribeAll();
    };

    subscribe(subject, callback, justOne = false) {

        subscribers[subject] = subscribers[subject] || [];
        subscribers[subject].push(callback);
        let subscription = [subject, callback];
        justOne && unsubscribers.push(subscription);
        return subscription;
    };

    unsubscribe(subscription) { unsubscribers.push(subscription); };

    clearSubject(subject) {
        if (!subscribers[subject]) return;

        for (let i in subscribers[subject]) {
            subscribers[subject].splice(i, 1);
        };
    };

    clearAll() { subscribers = {}; };
};

function unsubscribeAll() {

    for(let subscription of unsubscribers){
        let subject = subscription[0];
        let callback = subscription[1];

        if (!subscribers[subject]) return;

        subscribers[subject].forEach((v, i) => {
            if (v == callback) { subscribers[subject].splice(i, 1) };
        })
    };

    unsubscribers = [];
};

