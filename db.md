# How to use your own database with objectbox

<a name="Overview"></a>
## Overview

**objectbox** uses [NeDB](https://www.npmjs.com/package/nedb) datastore to permanently keep your objects. If you don't like NeDB, **objectbox** allows you to use your own persistence facility as the datastore for the objects, and **objectbox** requires some methods implemented on your own datastore.  


<a name="APIs"></a>
## Required methods on your datastore  

* [db.insert()](#API_insert)
* [db.removeById()](#API_removeById)
* [db.findById()](#API_findById)
* [db.modify()](#API_modify)
* [db.replace()](#API_replace)
* [db.findAll()](#API_findAll)
* [db.find()](#API_find)

<br />


*************************************************
<a name="API_insert"></a>  
### .insert(doc, callback)  

Insert a document to the datastore. This method should make sure that if the document already exists in the datastore. If it does, use new document to update the old one.  

**Note**: Each `doc` has a property `id` which is unique in the box, you can use property `id` to determine whether data already exists.  

**Arguments**  

1. `doc` (*Object*): The document, which is an data object to be persisted.  
2. `callback` (*Function*): `function (err, newDoc) {}`. This callback should be called when `doc` is inserted to datastore.  

**Returns**  

- (*None*)

*************************************************
<a name="API_removeById"></a>  
### .removeById(id, callback)  

Remove a document from datastore by the given id.  

**Arguments**  

1. `id` (*Number*): id.  
2. `callback` (*Function*): `function (err, newDoc) {}`. Should be called when the document is removed from datastore.  

**Returns**  

- (*None*)

*************************************************
<a name="API_findById"></a>  
### .findById(id, callback)  

Find a document from datastore by the given id.  

**Arguments**  

1. `id` (*Number*): id.  
2. `callback` (*Function*): `function (err, newDoc) {}`. Should be called when finding completes.  

**Returns**  

- (*None*)

*************************************************
<a name="API_modify"></a>  
### .modify(id, path, snippet, callback)  

Modify a snippet in the document with the given path.  

**Arguments**  

1. `id` (*Number*): id.  
2. `path` (*String*): Path of the property to modify.  
3. `snippet` (*Depends*): The snippet to modify.  
4. `callback` (*Function*): `function (err, diffSnippet) {}`. Should be called when modification completes.  

**Returns**  

- (*None*)

*************************************************
<a name="API_replace"></a>  
### .replace(id, path, value, callback)  

Replace a value in the document with the given path.  

**Arguments**  

1. `id` (*Number*): id.  
2. `path` (*String*): Path of the property to replace.  
3. `value` (*Depends*): The value to replace.  
4. `callback` (*Function*): `function (err, numReplaced) {}`. Should be called when replacement completes.  

**Returns**  

- (*None*)

*************************************************
<a name="API_findAll"></a>  
### .findAll(callback)  

Get all documents stored in the datastore.  

**Arguments**  

1. `callback` (*Function*): `function (err, docs) { }.` Should be called with all documents.  

**Returns**  

- (*None*)

*************************************************
<a name="API_find"></a>  
### .find(query, callback)  

It is a NeDB [find](https://www.npmjs.com/package/nedb#finding-documents) method, which follows the MongoDB **find** behavior. You should provide this method on your datastore with the same behavior for **objectbox**. (It would be cool if you are using MongoDB as the datastore, you just don't have to implement this method.)  

**Arguments**  

1. `query` (*Object*): The query object.  
2. `callback` (*Function*): `function (err, docs) {}.` Should be called when finding docs completes.  

**Returns**  

- (*None*)
