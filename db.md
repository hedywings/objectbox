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
})
```

*************************************************
<a name="API_removeById"></a>  
### .removeById(id, callback)  

Remove a data with given id from database.

**Arguments**  

1.

**Returns**  

- (*None*)

**Example**  

```js

```

*************************************************
<a name="API_findById"></a>  
### .findById()  



**Arguments**  


**Returns**  

- (*None*)

**Example**  

```js

```

*************************************************
<a name="API_modify"></a>  
### .modify()  



**Arguments**  


**Returns**  

- (*None*)

**Example**  

```js

```

*************************************************
<a name="API_replace"></a>  
### .replace()  



**Arguments**  


**Returns**  

- (*None*)

**Example**  

```js

```

*************************************************
<a name="API_findAll"></a>  
### .findAll()  



**Arguments**  


**Returns**  

- (*None*)

**Example**  

```js

```

*************************************************
<a name="API_find"></a>  
### .find()  



**Arguments**  


**Returns**  

- (*None*)

**Example**  

```js

```