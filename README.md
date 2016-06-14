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

1. `database` (*Object* | *String*): You can provide a database 
2. `maxNum` (*Number*): 

**Returns**  

- (*Object*): box

**Example**  

```js

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
var obj5 = box.get(5);
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

1. predicate (*Array* | *Function* | *Object* | *String*)

**Returns**  

- (*Object*): obj

**Example**  


*************************************************
<a name="API_findFromDb"></a>  
### .findFromDb(query, callback)  


**Arguments**  

**Returns**  

**Example**  


*************************************************
<a name="API_filter"></a>  
### .filter(path, value)  


**Arguments**  

**Returns**  

**Example**  


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
    ids;

box.add(obj1, function(err, id1) {
    box.add(obj2, function(err, id2) {
        ids = box.exportAllObjs();

        console.log(ids);
        // equal to [{ a: '1' }, { b: 2 }]
    });
});
```


*************************************************
<a name="API_set"></a>  
### .set(id, obj, callback)  

Store an object into the box with specified index id and permanently saved to the database.

**Arguments**  

1. `id` (*Number*): Specify index id of obj which you want to store.
2. `obj` (*Object*): object need to be stored.
3. `callback` (*Function*): `function (err, id) {}`. Get called when finish save.

**Returns** 

- (*None*) 

**Example**  

```js
var obj = {
        x: 0,
        y: 1,
        z: 2
    };

obj.set(1, obj, function (err, id) {
    if (err) {
        console.log(err)
    } else {
        // id equal to 1
        obj.id = id;
    }
});
```

*************************************************
<a name="API_add"></a>  
### .add(obj, callback)  

Store an object into the box and permanently saved to the database. If successful storage, box will assign an index ID to the stored object.

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

Remove an object with specified id from box and clear data record in the database.

**Arguments**  

1. id (*Number*): Object id.
2. callback (*Function*): `function (err, id) {}`. Get called when finish save.

**Returns**  

**Example**  


*************************************************
<a name="API_modify"></a>  
### .modify(id, path, snippet, callback)  


**Arguments**  

**Returns**  

**Example**  


*************************************************
<a name="API_replace"></a>  
### .replace(id, path, value, callback)  


**Arguments**  

**Returns**  

**Example**  


*************************************************
<a name="API_maintain"></a>  
### .maintain(callback)  


**Arguments**  

**Returns**  

**Example**  



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
