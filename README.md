# objectbox
A dictionary to maintain objects with persistence. 

[![NPM](https://nodei.co/npm/objectbox.png?downloads=true)](https://nodei.co/npm/objectbox/)  

[![Travis branch](https://travis-ci.org/hedywings/objectbox.svg?branch=master)](https://travis-ci.org/hedywings/objectbox)
[![npm](https://img.shields.io/npm/v/objectbox.svg?maxAge=2592000)](https://www.npmjs.com/package/objectbox)
[![npm](https://img.shields.io/npm/l/objectbox.svg?maxAge=2592000)](https://www.npmjs.com/package/objectbox)

<br />

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

**objectbox** is a dictionary to maintain objects with persistence. **objectbox** will give you an unique numeric id when your object is added to the dictionary successfully. You can then use this id to find out the object from the box. **objectbox** uses [NeDB](https://www.npmjs.com/package/nedb) datastore to permanently keep your objects, database is just there by default. If you don't like NeDB, **objectbox** allows you to use your own persistence facility as the datastore for the objects.  

<br />

<a name="Installation"></a>
## 2 Installation

> $ npm install objectbox --save

<br />

<a name="Usage"></a>
## 3 Basic Usage

**objectbox** exports its functionalities as a constructor (Objectbox Class). To create a box, just new an instance from the Objectbox class with input arguments of `database` and `maxNum`. The parameter `database` is the file path to tell NeDB where should your data persist. If you like to use your own database, just let `database` be your datastore object. The parameter `maxNum` is optional, you can use it to set the capacity of your box.  

Instance of the Objectbox class will be denoted as **_box_** in this document, and each object stored in box will be denoted as **_obj_** in this document.  

Here is an quick example of how to create a box.  

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
* [box.getCount()](#API_getCount)
* [box.getMaxNum()](#API_getMaxNum)
* [box.find()](#API_find)
* [box.findFromDb()](#API_findFromDb)
* [box.filter()](#API_filter)
* [box.exportAllIds()](#API_exportAllIds)
* [box.exportAllObjs()](#API_exportAllObjs)
* [box.set()](#API_set)
* [box.add()](#API_add)
* [box.remove()](#API_remove)
* [box.removeElement()](#API_removeElement)
* [box.modify()](#API_modify)
* [box.replace()](#API_replace)
* [box.sync()](#API_sync)
* [box.maintain()](#API_maintain)

<br />

*************************************************
<a name="API_Objectbox"></a>  
### new Objectbox([database][, maxNum])  

Create a new instance from Objectbox class.  

**Arguments**  

1. `database` (*Object* | *String*): **objectbox** uses [NeDB](https://www.npmjs.com/package/nedb) datastore as its default persistence, set `database` with a file path to tell **objectbox** where you'd like to keep your data. If this parameter is not given, a dafault path `__dirname + '/database/objectbox.db'` will be used. If you like to use your own database, this document [How to use your own database with objectbox](https://github.com/hedywings/objectbox/blob/master/db.md) will give you some hints.  
2. `maxNum` (*Number*): Capacity of the box, which is the maximum number of objs that this box can store. If not given, a default value 65536 will be used.  

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

Checks if this box is empty.  

**Arguments**  

- (*None*)

**Returns**  

- (*Boolean*): Returns `true` if box is empty, otherwise `false`.

**Example**  

```js
if (box.isEmpty())
    console.log('There is nothing in the box now.')
else
    console.log('There are some objects in the box.')
```

*************************************************
<a name="API_has"></a>  
### .has(id)  

Checks if there is an obj with the given id in this box .  

**Arguments**  

1. `id` (*Number*): id.  

**Returns**  

- (*Boolean*): Returns `true` if there is an obj positioned with the given id, otherwise `false`.  

**Example**  

```js
if (box.has(3)) {
    console.log('There is an obj positioned with id 3 in the box');
}
```

*************************************************
<a name="API_get"></a>  
### .get(id)  

Get an obj from this box with the given id.  

**Arguments**  

1. `id` (*Number*): id.  

**Returns**  

- (*Object*): Returns the obj if found, otherwise `undefined`.  

**Example**  

```js
var obj = box.get(5);
```

*************************************************
<a name="API_getCount"></a>  
### .getCount()  

Get the current number of objs stored in this box.  

**Arguments** 

- (*None*) 

**Returns**  

- (*Number*): Current number of objs in the box.  

**Example**  

```js
var count = box.getCount(); // 32
```

*************************************************
<a name="API_getMaxNum"></a>  
### .getMaxNum()  

Get the maximum number of objs that this box can hold.  

**Arguments**  

- (*None*)

**Returns**  

- (*Number*): Maximum number of objs this box can hold.  

**Example**  

```js
var maxNum = box.getMaxNum();   // 1000
```

*************************************************
<a name="API_find"></a> 
### .find(predicate)  

Iterates over objs in this box, and returns the first obj `predicate` returns truthy for.  

**Arguments**  

1. `predicate` (*Function*): The function invoked per iteration.  

**Returns**  

- (*Object*): Returns the matched obj, otherwise `undefined` if not found.  

**Example**  

```js
// assume that the following two objs has been stored in the box:
// user1 = { user: 'barney', age: 36, active: true }
// user2 = { user: 'fred', age: 40, active: false }

box.find(function(obj) {        // returns user1
    return obj.age < 40;
});
```

*************************************************
<a name="API_findFromDb"></a>  
### .findFromDb(query, callback)  

Looks for stored objs that matched the `query` from persistence.  

**Arguments**  

1. `query` (*Object*): Query object. Please go to [Finding documents](https://www.npmjs.com/package/nedb#finding-documents) for more details if you are using the default [NeDB](https://www.npmjs.com/package/nedb) datastore.  
2. `callback` (*Function*): `function (err, docs) {}`. Get called when finding completes.  

**Returns**  

- (*None*)

**Example** 

```js
// assume that the following two objs has been stored in the box:
// obj1 = { a: '1', b: 2, same: 'hi' }
// obj2 = { x: 0, y: 1, same: 'hi' }

box.findFromDb({ a: '1' }, function (err, docs) {
    // docs will be an array of [ obj1 ]
    console.log(docs);
});

box.findFromDb({ x: 0 }, function (err, docs) {
    // docs will be an array of [ obj2 ]
    console.log(docs);
});

box.findFromDb({ same: 'hi' }, function (err, docs) {
    // docs will be an array of [ obj1, obj2 ]
    console.log(docs);
});
``` 

*************************************************
<a name="API_filter"></a>  
### .filter(path[, value])  

Iterates over objs in box, and returns an array of objs that `predicate` returns truthy for.  

**Arguments** 

1. `path` (*String* | *Function*): It can be a direct path of an obj property or a `predicate` function.  
2. `value` (*Depend*): The value to equality check in filtering. This value should be given if `path` is a string of the direct path to obj propertty.  

**Returns**  

- (*Array*): Returns the filtered array.  

**Example**  

```js
// assume that the following two objs has been stored in the box:
// user1 = { user: 'barney', age: 36, active: true }
// user2 = { user: 'fred', age: 40, active: true }

box.filter(function(obj) {  // returns [ user1 ]
    return obj.age < 40;
});

box.filter('active', true); // returns [ user1, user2 ]
```

*************************************************
<a name="API_exportAllIds"></a>  
### .exportAllIds()  

Export all id of objs stored in this box.  

**Arguments**  

- (*None*) 

**Returns**  

- (*Array*): Array of ids.  

**Example**  

```js
// assume that there are only the following two objs stored in the box:
// obj1 = { a: '1' }, assume that its id is 0
// obj2 = { b: 2 }, assume that its id is 1

box.exportAllObjs();    // [ 0, 1 ]
```

*************************************************
<a name="API_exportAllObjs"></a>  
### .exportAllObjs()  

Export all objs stored in the box.  

**Arguments** 

- (*None*) 

**Returns**  

- (*Array*): Array of objects.

**Example**  

```js
// assume that there are only the following two objs stored in the box:
// obj1 = { a: '1' }, assume that its id is 0
// obj2 = { b: 2 }, assume that its id is 1

box.exportAllObjs();    // [ { a: '1' }, { b: 2 } ]
```

*************************************************
<a name="API_set"></a>  
### .set(id, obj, callback)  

Store an obj into this box with a specified id. If `obj` has a synchronous `dump()` method, the box will invoke it to get the returned data which will be stored in database. This leaves you an opportunity to decide what kind of data you'd like to store in database. If `obj` does not has a `dump()` method, it will be stringified by NeDB and be stored in database.  

**Arguments**  

1. `id` (*Number*): The id specified for which obj you'd like to store.  
2. `obj` (*Object*): obj to be stored.  
3. `callback` (*Function*): `function (err, id) {}`. Get called after stored. Error occurs if id conflicts.  

**Returns** 

- (*None*) 

**Example**  

```js
var obj1 = {
        id: null,
        x: 0,
        y: 1,
        z: 2
    },
    obj2 = {
        id: null,
        a: 0,
        b: 1,
        c: 2,
        info: { name: 'obj2', props: [ 'a', 'b', 'c' ] }
        dump: function () {
            return this.info;
        }
    }

box.set(1, obj1, function (err, id) {
    if (err) {
        console.log(err)
    } else {
        // id equals to 1, and obj1 will be stored to database
        obj1.id = id;   // you can assign the got id to obj1 for it to track where itself is in the box  
    }
});

box.set(2, obj2, function (err, id) {
    if (err) {
        console.log(err)
    } else {
        // id equals to 2, and obj2.dump() output will be stored to database
        obj2.id = id;
    }
});
```

*************************************************
<a name="API_add"></a>  
### .add(obj, callback)  

Store an obj to the box. If `obj` has a synchronous `dump()` method, the box will invoke it to get the returned data which will be stored in database. This leaves you an opportunity to decide what kind of data you'd like to store in database. If `obj` does not has a `dump()` method, it will be stringified by NeDB and be stored in database.  

If `obj.dump()` output data or `obj` itself has an property `id`, the box will try to store the `obj` with its intrinsic id. Otherwise, the box will return a new id for this newly stored `obj`.  
   
**Arguments** 

1. `obj` (*Object*): obj to store.  
2. `callback` (*Function*): `function (err, id) {}`. Get called when stored. Error occurs if the box if full or id conflicts.  

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
    if (err)
        console.log(err)
    else
        obj.id = id;
});
```

*************************************************
<a name="API_remove"></a>  
### .remove(id, callback)  

Remove an obj with specified id from box, and its record in database will also be deleted.  

**Arguments**  

1. `id` (*Number*): id.  
2. `callback` (*Function*): `function (err, id) {}`. Get called when removal completes. Error occurs if removal fails.  

**Returns** 

- (*None*) 

**Example**  

```js
box.remove(3, function (err) {
    if (err)
        console.log(err);
    else
        console.log('Removal succeeds.');
});
```

*************************************************
<a name="API_removeElement"></a>  
### .removeElement(id)  

Remove an obj with the specified id from box, but keeps its data in database.  

**Arguments**  

1. `id` (*Number*): id.  

**Returns** 

- (*Boolean*): Returns `true` if successfully removed. Returns `false` if removal fails or there is nothing to be removed (no obj positioned at given `id` in the dictionary).  

**Example**  

```js
// assume that the following two obj has been stored in the box:
// obj1 = { a: '1' }, and its id is 60

if (box.removeElement(60))
    console.log('Removal succeeds.');

if (!box.removeElement(60))
    console.log('Remove agagin, removal fails.');
```

*************************************************
<a name="API_modify"></a>  
### .modify(id, path, snippet, callback)  

Modify a certain snippet of obj with the given direct path.  

**Arguments**  

1. `id` (*Number*): id.  
2. `path` (*String*): Path of the snippet to modify.  
3. `snippet` (*Depends*): The snippet to modify. If snippet is an object, the target will be partially updated.  
4. `callback` (*Function*): `function (err, diffSnippet) {}`. Get called when modification succeeds.  

**Returns**  

- (*None*) 

**Example**  

```js
// assume that the following two obj has been stored in the box:
// obj = {
//           x: 'hi', y: 11,
//           z: { z1: 'hello', z2: false, z3: 0 }
//       }
// , and its id is 27

box.modify(27, 'x', 'hello', function (err, diffSnippet) {
    if (err) {
        console.log(err);
    } else {
        console.log(diffSnippet);
        // diffSnippet equals to { x: 'hello' }
        // object data in database is now updated to 
        // {
        //     x: 'hello',
        //     y: 11,
        //     z: {
        //         z1: 'hello',
        //         z2: false,
        //         z3: 0
        //     }
        // }
    }

    box.modify(27, 'z.z2', true, function (err, diffSnippet) {
        if (err) {
            console.log(err);
        } else {
            console.log(diffSnippet);
            // diffSnippet equals to { z: { z2: true }}
            // object data in database is now updated to 
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

        box.modify(27, 'z.z4', 1, function (err, diffSnippet) {
            // If the path of obj does not exist, an error will occur.
            if (err) {
                console.log(err);
                // err equal to [Error: No such property z.z4 to modify.]
            }
        });
    });
});
```

*************************************************
<a name="API_replace"></a>  
### .replace(id, path, value, callback)  

Replace a new value at the given direct path of obj.  

**Arguments**  

1. `id` (*Number*): id.  
2. `path` (*String*): Path of the property value to replace.  
3. `value` (*Depends*): The value to replace.  
4. `callback` (*Function*): `function (err, numReplaced) {}`. Get called when replacement succeeds.  

**Returns**  

- (*None*) 

**Example**  

```js
// assume that the following two obj has been stored in the box:
// obj = {
//           x: 'hi', y: 11,
//           z: { z1: 'hello', z2: false, z3: 0 }
//       }
// , and its id is 27

box.replace(27, 'x', 'hello', function (err, numReplaced) {
    if (err) {
        console.log(err);
    } else {
        console.log(numReplaced);
        // numReplaced equals to 1
        // obj data in database is updated to 
        // {
        //     x: 'hello',
        //     y: 11,
        //     z: {
        //         z1: 'hello',
        //         z2: false,
        //         z3: 0
        //     }
        // }
    }

    box.replace(27, 'z.z2', true, function (err, numReplaced) {
        if (err) {
            console.log(err);
        } else {
            console.log(numReplaced);
            // numReplaced equals to 1
            // obj data in database is updated to 
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

        box.replace(27, 'z.z4', 1, function (err, numReplaced) {
            // If the path of obj does not exist, an error will occur.
            if (err) {
                console.log(err);
                // err equal to [Error: No such property z.z4 to replace.]
            }
        });

        box.replace(27, 'z', { z11: 'hi', z2: true }, function (err, numReplaced) {
            if (err) {
                console.log(err);
            } else {
                console.log(numReplaced);
                // numReplaced equals to 1
                // obj data in database is updated to 
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
    });
});
```

*************************************************
<a name="API_sync"></a>  
### .sync(id, callback)

Sync the specified obj between box and database.

**Arguments**  

1. `id` (*Number*): id.  
2. `callback` (*Function*): `function (err) {}`. Get called when synchronization succeeds.  

**Returns**  

- (*None*)

**Example**  

```js
box.sync(1, function (err) {
    if (err)
        console.log(err); 
});
```

<br />


*************************************************
<a name="API_maintain"></a>  
### .maintain(callback)  

Maintain and sync the obj data between box and database. At first, the box will check for those objs exist in database but not in box. Those objs found at this step will be deleted from database. Finally, each obj in box will dump itself to database again.  

**Arguments**  

1. `callback` (*Function*): Get called when maintenance completes.  

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

* [Hedy Wang](https://www.npmjs.com/~hedywings)  
* [Simen Li](https://www.npmjs.com/~simenkid)  
* [Peter Yi](https://www.npmjs.com/~petereb9)  

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
