const fs = require('fs');
const dataFilePath  = 'storage.json';
let storage = {};
module.exports = {
    put:(key, value)=>{
        if(typeof(key)!=='string'){
            throw new Error("Key must be a string")
        }
        if(storage.hasOwnProperty(key)){
            throw new Error('Key already exists');
        }
        storage[key]=value;

    },
    get:(key)=>{
        if(typeof(key)!=='string'){
            throw new Error("Key must be a string");
        }
        if(!storage.hasOwnProperty(key)){
            throw new Error("Key not found");
        }
        return storage[key];
    },
    getAll: ()=>
    {
        if (JSON.stringify(storage)==='{}'){
            return 'There are no items in the storage';
        }
        return storage;

    },

    update:(key, newValue) =>{
        if(typeof(key)!=='string'){
            throw new Error("Key must be a string")
        }
        if(!storage.hasOwnProperty(key)){
            throw new Error("Key not found");
        }
        storage[key]=newValue;
    },

    delete:(key)=>{
        if(typeof(key)!=='string'){
            throw new Error("Key must be a string")
        }
        if(!storage.hasOwnProperty(key)){
            throw new Error("Key not found");
        }
        delete storage[key];
    },

    clear: ()=>{
        storage={};
            },

    saveSync: ()=>{
        fs.writeFileSync(dataFilePath,JSON.stringify(storage));
      //  console.log("SaveSync successful");
    },

    loadSync: ()=>{
        let JSONData = fs.readFileSync(dataFilePath);
        storage=JSON.parse(JSONData);
     //   console.log("LoadSync successful");
    },
    load: ()=>{
    return new Promise((resolve, reject)=>{
        fs.readFile(dataFilePath,(err,JSONData)=> {
        if (err) {
            reject(err);
            return;
        }
        storage = JSON.parse(JSONData);
        resolve();
    })
    });
    },
    save: ()=>{
return new Promise((resolve, reject) =>{
    let dataAsString = JSON.stringify(storage);
    fs.writeFile(dataFilePath,dataAsString,err=>{
        if(err){
            reject(err);
        }
        resolve();
    })
    });
    }
};
