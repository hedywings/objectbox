# objectbox
An object storage with persistence

## Table of Contents

1. [Overview](#Overview)    
2. [Installation](#Installation)  
3. [Basic Usage](#Usage)  
2. [APIs](#APIs)  
6. [Contributors](#Contributors)  
7. [License](#License)  

<br />

<a name="Overview"></a>
## 1. Overview


<br />

<a name="Installation"></a>
## 2 Installation

> $ npm install objectbox --save

<br />

<a name="Usage"></a>
## 3 Basic Usage

**objectbox** exports its functionalities as a constructor. To use **objectbox**, just new an instance with `database` and `maxNum` from Objectbox class. The property `database` can be a database object or the path to the database, and the property `maxNum` indicates the maximum capacity of the box.

Instance of **objectbox** is denoted as `box` in this document, and each object stored in `box` is denoted as `obj` in this document. 

Here is an quick example of how to create an box instance.

```js
var Objectbox = require('objectbox'),
    boxPath = __dirname + '/database/box.db',
    box = new Objectbox(boxPath, 1000);
```

<br />

<a name="APIs"></a>
## 4 APIs

* [new Objectbox()](#API_Objectbox)
* [box.isEmpty()](#API_isEmpty)
* [box.has()](#API_has)
* [box.get()](#API_get)
* [box.getMaxNum()](#API_getMaxNum)
* [box.getCount()](#API_getCount)
* [box.find()](#API_find)
* [box.findFromDb()](#API_findFromDb)
* [box.filter()](#API_filter)
* [box.exportAllIds()](#API_exportAllIds)
* [box.exportAllObjs()](#API_exportAllObjs)
* [box.set()](#API_set)
* [box.add()](#API_add)
* [box.removeElement()](#API_removeElement)
* [box.remove()](#API_remove)
* [box.modify()](#API_modify)
* [box.replace()](#API_replace)
* [box.maintain()](#API_maintain)

<br />

*************************************************
<a name="API_Objectbox"></a>  
### new Objectbox([database][, maxNum])  

Create a new instance of Objectbox class.

**Arguments**  

1. `database` (*Object* | *String*): [NeDB](https://www.npmjs.com/package/nedb) is the default datastore, and dafault path is `__dirname + '/database/objectbox.db'` to the file where the data is persisted. You can specify a a new path to store data, or you can also provide your datastore with methods list in following table. 
2. `maxNum` (*Number*): The maximum capacity of the box. Default is 65536.

**Returns**  

- (*Object*): box

**Example**  

```js
var Objectbox = require('objectbox'),
    boxPath = __dirname + '/database/box.db',
    
var box = new Objectbox(boxPath, 1000);
```

*************************************************
<a name="API_isEmpty"></a>  
### .isEmpty()  

Check box is empty or not.

**Arguments**  

- (*None*)

**Returns**  

- (*Boolean*): Indicate the box is empty or not.

**Example**  

```js
if (box.isEmpty()) {
    console.log('There is nothing in the box now.')
} else {
    console.log('There ar some objects in the box.')
}
```

*************************************************
<a name="API_has"></a>  
### .has(id)  

Check if object with specified id is in the box.

**Arguments**  

1. `id` (*Number*): Object id.

**Returns**  

- (*Boolean*): The box has object with specified id or not.

**Example**  

```js
if (box.has(3)) {
    console.log('object with id 3 is in the box');
}
```

*************************************************
<a name="API_get"></a>  
### .get(id)  

Get object with specified id from the box

**Arguments**  

1. `id` (*Number*): Object id.

**Returns**  

- (*Object*): obj

**Example**  

```js
var obj = box.get(5);
```

*************************************************
<a name="API_getMaxNum"></a>  
### .getMaxNum()  

Get maximum capacity of the box. 

**Arguments**  

- (*None*)

**Returns**  

- (*Number*): Maximum number of box.

**Example**  

```js
var maxNum = box.getMaxNum();
```


*************************************************
<a name="API_getCount"></a>  
### .getCount()  

Get the number of objects stored in box.

**Arguments** 

- (*None*) 

**Returns**  

- (*Number*): Number of objects.

**Example**  

```js
var count = box.getCount();
```

*************************************************
<a name="API_find"></a> 
### .find(predicate)  

Iterates over objects of box, returning the first object predicate returns truthy for.

**Arguments**  

1. predicate (*Array* | *Function* | *Object* | *String*): The function invoked per iteration.

**Returns**  

- (*Object*): The matched object 

**Example**  

```js
var user1 = { 'user': 'barney',  'age': 36, 'active': true },
    user2 = { 'user': 'fred',    'age': 40, 'active': false };

box.add(user1, function(err) {
    if (err) 
        console.log(err);
    else
        box.add(user2, function(err) {
            if (err)
                console.log(err);
            else {
                // return user1
                box.find(function(obj) {
                    return obj.age < 40;
                });

                // return user1
                box.find({ 'age': 36, 'active': true });

                // return user2
                box.find(['active', false]);

                // return user1
                box.find('active');
            }
        });
});
```

*************************************************
<a name="API_findFromDb"></a>  
### .findFromDb(query, callback)  

Look for stored object data matching you query from database.

**Arguments**  

1. query (*Object*): Query object. You can see more detail in [Finding documents](https://www.npmjs.com/package/nedb#finding-documents) if you are using default [nedb](https://www.npmjs.com/package/nedb) datastore.
2. callback (*Function*): `function (err, docs) {}`. Get called when find completes.

**Returns**  

- (*None*)

**Example** 

```js
var obj1 = { 
        a: '1',
        b: 2,
        same: 'hi'
    },
    obj2 = { 
        x: 0,
        y: 1,
        same: 'hi'
    };

box.add(obj1, function(err, id1) {
    box.add(obj2, function(err, id2) {
        box.findFromDb({ a: '1' }, function (err, docs) {
            // docs equal to [ obj1 ]
            console.log(docs);
        });

        box.findFromDb({ x: 0 }, function (err, docs) {
            // docs equal to [ obj2 ]
            console.log(docs);
        });

        box.findFromDb({ same: 'hi' }, function (err, docs) {
            // docs equal to [ obj1, obj2 ]
            console.log(docs);
        });
    });
});
``` 

*************************************************
<a name="API_filter"></a>  
### .filter(path[, value])  

Iterates over object of box, returning an array of all object predicate returns truthy for.

**Arguments** 

1. path (*String* | *Function*): It can be path of object or predicate. 
2. value (*Depend*): The value to filter.

**Returns**  

- (*Array*): Return the filtered array

**Example**  

```js
var user1 = { 'user': 'barney',  'age': 36, 'active': true },
    user2 = { 'user': 'fred',    'age': 40, 'active': true };

box.add(user1, function(err) {
    if (err) 
        console.log(err);
    else
        box.add(user2, function(err) {
            if (err)
                console.log(err);
            else {
                // return [ user1 ]
                box.filter(function(obj) {
                    return obj.age < 40;
                });

                // return [ user1, user2 ]
                box.filter('active', true);
            }
        });
});
```

*************************************************
<a name="API_exportAllIds"></a>  
### .exportAllIds()  

Export all id of objects which stored in box.

**Arguments**  

- (*None*) 

**Returns**  

- (*Array*): Array of ids.

**Example**  

```js
var obj1 = { a: '1' },
    obj2 = { b: 2 },
    ids;

box.add(obj1, function(err, id1) {
    box.add(obj2, function(err, id2) {
        ids = box.exportAllObjs();

        console.log(ids);
        // equal to [id1, id2]
    });
});
```

*************************************************
<a name="API_exportAllObjs"></a>  
### .exportAllObjs()  

Export all objects stored in box

**Arguments** 

- (*None*) 

**Returns**  

- (*Array*): Array of objects.

**Example**  

```js
var obj1 = { a: '1' },
    obj2 = { b: 2 },
    objs;

box.add(obj1, function(err, id1) {
    box.add(obj2, function(err, id2) {
        objs = box.exportAllObjs();

        console.log(objs);
        // equal to [obj1, obj2]
    });
});
```

*************************************************
<a name="API_set"></a>  
### .set(id, obj, callback)  

Store an object into the box with specified index id and permanently saved to the database. You can add a dump() method in your object to export the data you want to store in database, or object will be stored to database.

**Arguments**  

1. `id` (*Number*): Specify index id of obj which you want to store.
2. `obj` (*Object*): object need to be stored.
3. `callback` (*Function*): `function (err, id) {}`. Get called when finish save.

**Returns** 

- (*None*) 

**Example**  

```js
var obj1 = {
        x: 0,
        y: 1,
        z: 2
    },
    obj2 = {
        a: 0,
        b: 1,
        c: 2,
        info: [0, 1, 2]
        dump: function () {
            return this.info;
        }
    }

obj.set(1, obj1, function (err, id) {
    if (err) {
        console.log(err)
    } else {
        // id equal to 1
        // obj1 is stored into the database
        obj1.id = id;
    }
});

obj.set(2, obj2, function (err, id) {
    if (err) {
        console.log(err)
    } else {
        // id equal to 2
        // obj2.info is stored into the database
        obj1.id = id;
    }
});
```

*************************************************
<a name="API_add"></a>  
### .add(obj, callback)  

Store an object into the box and permanently saved to the database. If successful storage, box will assign an index ID to the stored object. You can add a dump() method in your object to export the data you want to store in database, or object will be stored to database.

**Arguments** 

1. `obj` (*Object*): object need to be stored.
2. `callback` (*Function*): `function (err, id) {}`. Get called when finish save.

**Returns**  

- (*None*) 

**Example**  

```js
var obj = {
        x: 0,
        y: 1,
        z: 2
    };

obj.add(obj, function (err, id) {
    if (err) {
        console.log(err)
    } else {
        obj.id = id;
    }
});
```

*************************************************
<a name="API_removeElement"></a>  
### .removeElement(id)  

Remove an object with specified id from box.

**Arguments**  

1. id (*Number*): Object id.

**Returns** 

- (*Boolean*): Remove success or not.

**Example**  

```js
var obj1 = { a: '1' };

box.add(obj1, function(err, id) {
    var removed;

    removed = box.removeElement(id);
    if (removed) {
        console.log('Remove success.');
    }
});
```

*************************************************
<a name="API_remove"></a>  
### .remove(id, callback)  

Remove an object with specified id from box and clear data record from the database.

**Arguments**  

1. id (*Number*): Object id.
2. callback (*Function*): `function (err, id) {}`. Get called when remove complete.

**Returns** 

- (*None*) 

**Example**  

```js
box.remove(3, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Remove success.');
    }
});
```

*************************************************
<a name="API_modify"></a>  
### .modify(id, path, snippet, callback)  

Modify object snippet from database with given path.

**Arguments**  

1. id (*Number*): Object id.
2. path (*String*): The path of the property to modify.
3. snippet (*Depends*): The snippet to modify.
4. callback (*Function*): `function (err, diffSnippet) {}`. Get called when midify success.

**Returns**  

- (*None*) 

**Example**  

```js
var obj = {
        x: 'hi',
        y: 11,
        z: {
            z1: 'hello',
            z2: false,
            z3: 0
        }
    };

box.add(obj, function (err, id) {
    if (err)
        console.log(err);
    else {
        box.modify(id, 'x', 'hello', function (err, diffSnippet) {
            if (err) {
                console.log(err);
            } else {
                console.log(diffSnippet);
                // diffSnippet equal to { x: 'hello' }
                // object data in database is equal to 
                // {
                //     x: 'hello',
                //     y: 11,
                //     z: {
                //         z1: 'hello',
                //         z2: true,
                //         z3: 0
                //     }
                // }
            }
        });

        box.modify(id, 'z.z2', true, function (err, diffSnippet) {
            if (err) {
                console.log(err);
            } else {
                console.log(diffSnippet);
                // diffSnippet equal to { z: { z2: true }}
                // object data in database is equal to 
                // {
                //     x: 'hi',
                //     y: 11,
                //     z: {
                //         z1: 'hello',
                //         z2: true,
                //         z3: 0
                //     }
                // }
            }
        });

        box.modify(id, 'z.z4', 1, function (err, diffSnippet) {
            // If the path of object does not exist, an error will occur.
            if (err) {
                console.log(err);
                // err equal to [Error: No such property z.z4 to modify.]
            }
        });

        box.modify(id, 'z', { z11: 'hi', z2: true }, function (err, diffSnippet) {
            // Value of property 'z' does not have 'z11' property, so an error will occur.
            if (err) {
                console.log(err);
                // err equal to [Error: No such property z.z11 to modify.]
            }
        });
    }
});
```

*************************************************
<a name="API_replace"></a>  
### .replace(id, path, value, callback)  

Replace Object value from database with given path.

**Arguments**  

1. id (*Number*): Object id.
2. path (*String*): The path of the property to replace.
3. value (*Depends*): The value to replace.
4. callback (*Function*): `function (err, numReplaced) {}`. Get called when midify success.

**Returns**  

- (*None*) 

**Example**  

```js
var obj = {
        x: 'hi',
        y: 11,
        z: {
            z1: 'hello',
            z2: false,
            z3: 0
        }
    };

box.add(obj, function (err, id) {
    if (err)
        console.log(err);
    else {
        box.replace(id, 'x', 'hello', function (err, numReplaced) {
            if (err) {
                console.log(err);
            } else {
                console.log(numReplaced);
                // numReplaced equal to 1
                // object data in database is equal to 
                // {
                //     x: 'hello',
                //     y: 11,
                //     z: {
                //         z1: 'hello',
                //         z2: true,
                //         z3: 0
                //     }
                // }
            }
        });

        box.replace(id, 'z.z2', true, function (err, numReplaced) {
            if (err) {
                console.log(err);
            } else {
                console.log(numReplaced);
                // numReplaced equal to 1
                // object data in database is equal to 
                // {
                //     x: 'hi',
                //     y: 11,
                //     z: {
                //         z1: 'hello',
                //         z2: true,
                //         z3: 0
                //     }
                // }
            }
        });

        box.replace(id, 'z.z4', 1, function (err, numReplaced) {
            // If the path of object does not exist, an error will occur.
            if (err) {
                console.log(err);
                // err equal to [Error: No such property z.z4 to modify.]
            }
        });

        // 
        box.replace(id, 'z', { z11: 'hi', z2: true }, function (err, numReplaced) {
            if (err) {
                console.log(err);
            } else {
                console.log(numReplaced);
                // numReplaced equal to 1
                // object data in database is equal to 
                // {
                //     x: 'hi',
                //     y: 11,
                //     z: {
                //         z11: 'hi',
                //         z2: true
                //     }
                // }
            }
        });
    }
});
```

*************************************************
<a name="API_maintain"></a>  
### .maintain(callback)  

Maintain object data between box and database. If object is not exist in box, it will be delete from database, and each object data in box will update to the database.

**Arguments**  

1. callback (*Function*): Get called when maintain is completed.

**Returns**  

- (*None*)

**Example**  

```js
box.maintain(function (err) {
    if (err)
        console.log(err); 
});
```


<br />

<a name="Contributors"></a>
## 5 Contributors


<br />

<a name="License"></a>
## 6 License

The MIT License (MIT)

Copyright (c) 2016
Hedy Wang <hedywings@gmail.com>, Simen Li <simenkid@gmail.com>, and Peter Yi <peter.eb9@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
