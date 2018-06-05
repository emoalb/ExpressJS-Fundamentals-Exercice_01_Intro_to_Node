const storage = require('./storage');

storage.put("edno", 56);
storage.put("second", 'pet');
storage.put("third", 3);

console.log(storage.get('edno'));

storage.update('edno', 'val');
let anotherValue = storage.get('edno');
console.log(anotherValue);

storage.delete('edno');
storage.clear();
storage.put("second", "Some value");
storage.put("third", 3);

storage.save().then(() => {
    storage.clear();

    storage.load().then(() => {
        let val = storage.get('second');
        console.log(val);
    }).catch(err => console.log(err));
}).catch(err => console.log(err));