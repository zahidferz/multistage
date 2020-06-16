
# Migrations
## Reference Migrations

We use the following pattern for migrations

>V0.0001_SQLOPERATIONTABLENAME.sql

>V0.0002_SQLOPERATIONTABLENAME.sql

>...

>Vn.xxxx_SQLOPERATIONTABLENAME.sql

If needed add some explanation inside SQL file.

### Operations

* Insert
* Delete
* Update
* Create
* Alter

**If possible all versioned migration must have its own counterpart as a rollback sql query**
Althought these migrations won't run automatically, these can greatly help to help rollback schemas or modify some data to 
an earlier version e.g:

>../db/versioned/V0.0001_SQLOPERATIONTABLENAME.sql

if possible create a counterpart file

>../db/rollback/U0.0001_SQLOPERATIONTABLENAME.sql

## **IMPORTANT RULE!!!!!**

>***ONE SCRIPT, ONE OPERATION TYPE, ONE OBJECT PER FILE.***

This will help enforce small migration scripts which significantly reduce the number and complexity of merge conflicts.

## Using Migrations

Please refer to [Flyway Migrations Readme]([https://flywaydb.org/documentation/migrations](https://flywaydb.org/documentation/migrations)) for more detailed information

### Migrations Folder

Use **db/migrations** to add new migrations files according migration type
 - db/migrations/versioned 
 - db/migrations/rollback (undo)
 - db/migrations/repeatable

### Naming
In order to be picked up by Flyway, SQL migrations must comply with the following naming pattern:
#### Versioned Migrations

|Prefix |Version|Separator|Version Description|Extension|
|---|---|---|---|---|
|V|0152|__|InserCarTable|.sql|

*V0152__InsertCarTable.sql*

#### Undo Migrations
not supported in current open source version of Flyway (but for a good development health these are required too)

|Prefix |Version|Separator|Version Description|Extension|
|---|---|---|---|---|
|U|0152|__|DeleteCarTable|.sql|

*U0152__DeleteCarTable.sql*

#### Repeatable Migrations

|Prefix |Version|Separator|Version Description|Extension|
|---|---|---|---|---|
|R|0152|__|InsertIfExistsCarTableValues|.sql|

*R0152__InsertIfExistsCarTableValues.sql*

The file name consists of the following parts:

-   **Prefix**:  `V`  for versioned ([configurable](https://flywaydb.org/documentation/commandline/migrate#sqlMigrationPrefix)),  `U`  for undo ([configurable](https://flywaydb.org/documentation/commandline/migrate#undoSqlMigrationPrefix)) and  `R`  for repeatable migrations ([configurable](https://flywaydb.org/documentation/commandline/migrate#repeatableSqlMigrationPrefix))
-   **Version**: Version with dots or underscores separate as many parts as you like (Not for repeatable migrations)
-   **Separator**:  `__`  (two underscores) ([configurable](https://flywaydb.org/documentation/commandline/migrate#sqlMigrationSeparator))
-   **Description**: Underscores or spaces separate the words
-   **Suffix**:  `.sql`  ([configurable](https://flywaydb.org/documentation/commandline/migrate#sqlMigrationSuffixes))