Database

<a name="APIs"></a>
## APIs

* [Db()](#API_Db)
* [db.insert()](#API_insert)
* [db.removeById()](#API_removeById)
* [db.findById()](#API_findById)
* [db.modify()](#API_modify)
* [db.replace()](#API_replace)
* [db.findAll()](#API_findAll)
* [db.find()](#API_find)

<br />

*************************************************
<a name="API_Db"></a>  
### new Db(fileName)  

Create a new instance of Db class.

**Arguments**  

1. `fileName` (*String*): Path to the file where the data is persisted.

**Returns**  

- (*Object*): db

**Example**  

```js
var db = new Db(__dirname + '/database/data.db');
```

*************************************************
<a name="API_insert"></a>  
### .insert(doc, callback)  

Insert a data to the database. You have to determine if the data already exist in the database, and if so, use new data to update the data stored in database.

**Note**: Each `doc` will be with the id property, and it is unique, so you can use the id property to determine whether data already exists.

**Arguments**  

1. `doc` (*Object*): Data to be persisted.
2. `callback` (*Function*): `function (err, newDoc) {}`. Get called when doc is insert to database.

**Returns**  

- (*None*)

**Example**  

```js
var userIndo = {
        id: 0,
        name: 'barney',
        age: 30
    };

db.insert(userIndo, function (err, newDoc) {
    if (err) {
        console.log(err);
    } else {
        console.log(newDoc);
    }
});
```

*************************************************
<a name="API_removeById"></a>  
### .removeById(id, callback)  

Remove a data with given id from database.

**Arguments**  

1. `id` (*Number*): Object id. Each object stored in database has id property. 
2. `callback` (*Function*): `function (err, newDoc) {}`. Get called when remove data from database.

**Returns**  

- (*None*)

**Example**  

```js
db.removeById(0, function (err, numRemoved) {
    if (err) {
        console.log(err);
    } else {
        console.log(numRemoved);
    }
});
```

*************************************************
<a name="API_findById"></a>  
### .findById(id, callback)  

Find a data with given id from database.

**Arguments**  

1. `id` (*Number*): Object id.
2. `callback` (*Function*): `function (err, newDoc) {}`. Get called when find data from database.

**Returns**  

- (*None*)

**Example**  

```js
db.findById(0, function (err, doc) {
    if (err) {
        console.log(err);
    } else {
        console.log(doc);
    }
});
```

*************************************************
<a name="API_modify"></a>  
### .modify(id, path, snippet, callback)  

Modify object snippet from database with given path.

**Arguments**  

1. `id` (*Number*): Object id.
2. `path` (*String*): The path of the property to modify.
3. `snippet` (*Depends*): The snippet to modify.
4. `callback` (*Function*): `function (err, diffSnippet) {}`. Get called when midify success.

**Returns**  

- (*None*)

**Example**  

```js
var obj = {
		id: 5,
        x: 'hi',
        y: 11,
        z: {
            z1: 'hello',
            z2: false,
            z3: 0
        }
    };

db.insert(obj, function (err) {
    if (err)
        console.log(err);
    else {
        db.modify(obj.id, 'x', 'hello', function (err, diffSnippet) {
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

        db.modify(obj.id, 'z.z2', true, function (err, diffSnippet) {
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

        db.modify(obj.id, 'z.z4', 1, function (err, diffSnippet) {
            // If the path of object does not exist, an error will occur.
            if (err) {
                console.log(err);
                // err equal to [Error: No such property z.z4 to modify.]
            }
        });

        db.modify(obj.id, 'z', { z11: 'hi', z2: true }, function (err, diffSnippet) {
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
### .replace()  

Replace Object value from database with given path.

**Arguments**  

1. `id` (*Number*): Object id.
2. `path` (*String*): The path of the property to replace.
3. `value` (*Depends*): The value to replace.
4. `callback` (*Function*): `function (err, numReplaced) {}`. Get called when midify success.

**Returns**  

- (*None*)

**Example**  

```js
var obj = {
		id: 6,
        x: 'hi',
        y: 11,
        z: {
            z1: 'hello',
            z2: false,
            z3: 0
        }
    };

db.insert(obj, function (err) {
    if (err)
        console.log(err);
    else {
        db.replace(obj.id, 'x', 'hello', function (err, numReplaced) {
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

        db.replace(obj.id, 'z.z2', true, function (err, numReplaced) {
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

        db.replace(obj.id, 'z.z4', 1, function (err, numReplaced) {
            // If the path of object does not exist, an error will occur.
            if (err) {
                console.log(err);
                // err equal to [Error: No such property z.z4 to modify.]
            }
        });

        // 
        db.replace(obj.id, 'z', { z11: 'hi', z2: true }, function (err, numReplaced) {
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
<a name="API_findAll"></a>  
### .findAll(callback)  

Get all the data objects stored in database.

**Arguments**  

1. `callback` (*Function*): `function (err, docs) { }.` Get called with all data.

**Returns**  

- (*None*)

**Example**  

```js
db.find(function (err, docs) {
	if (err) {
		console.log(err);
	} else {
		console.log(docs)
	}
});
```

*************************************************
<a name="API_find"></a>  
### .find(query, callback)  

It is a wrapped function of [find()](https://www.npmjs.com/package/nedb#finding-documents) method of [NeDB](https://www.npmjs.com/package/nedb).

**Arguments**  

1. `query` (*Object*): The query object.
2. `callback` (*Function*): `function (err, docs) {}.` Get called when find query docs.

**Returns**  

- (*None*)

**Example**  

```js
db.find({ system: 'solar' }, function (err, docs) {
	if (err) {
		console.log(err);
	} else {
		console.log(docs);
	}
});
```