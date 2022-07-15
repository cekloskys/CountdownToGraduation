import { openDatabase } from 'react-native-sqlite-storage';

const tableName = 'courses';

const courseDB = openDatabase({ name: 'CourseList.db' });

const list = [];

module.exports = {
    createTable: async function () {
        courseDB.transaction(txn => {
            txn.executeSql(
                `CREATE TABLE ${tableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    code VARCHAR(10),
                    name VARCHAR(64),
                    credits INTEGER,
                    status VARCHAR(15),
                    designator VARCHAR(20),
                    relatedcode VARCHAR(10),
                    grade VARCHAR(2),
                    creditTypeCode VARCHAR(2),
                    cnt INTEGER
                );`,
                [],
                (sqlTxn, res) => {
                    console.log("table created successfully");
                },
                error => {
                    console.log("error on creating table " + error.message);
                },
            );
        });
    },

    /**
     * Query database for all course in table and return them as a list
     * @returns List of all the courses in courseDB
     */
    getAllCourses: async function () {
        courseDB.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM ${tableName}`,
                [],
                (sqlTxn, res) => {
                    console.log("Courses retrieved successfully");
                    let len = res.rows.length;
                    // console.warn(len)
                    if (len > 0) {
                        let results = [];
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push({ id: item.id, code: item.code, name: item.name, credits: item.credits, status: item.status, designator: item.designator, relatedcode: item.relatedcode, grade: item.grade, creditTypeCode: item.creditTypeCode, cnt: item.cnt });
                            console.log(results[i])
                        }
                        // console.warn('[DATA]', results[0])
                        let list = results;
                    }
                },
                error => {
                    console.log("error on getting courses " + error.message);
                },
            );
        });
        return list
    },

    getCoursesByDesignator: async function (desig) {
        try {
            const courses = [];
            const results = await courseDB.executeSql(`SELECT * FROM ${tableName} WHERE designator IN ('${desig}')`);
            results.forEach(result => {
                for (let index = 0; index < result.rows.length; index++) {
                    courses.push(result.rows.item(index))
                }
            });

            /* for (let i = 0; i < courses.rows.length; index++) {
                console.log('[DBUG]', courses[i])
            } */

            return courses;
        } catch (error) {
            console.error(error);
            throw Error('Failed to get courses !!!');
        }
    },

    addCourse: async function (code, name, credits, status, designator, relatedcode, grade, creditTypeCode, cnt) {
        // console.log('[DATA]', 'addCourse: ' + code + name);
        courseDB.transaction(txn => {
            txn.executeSql(
                `INSERT INTO ${tableName} (code, name, credits, status, designator, relatedcode, grade, creditTypeCode, cnt) VALUES ("${code}", "${name}", ${credits}, "${status}", "${designator}", "${relatedcode}","${grade}","${creditTypeCode}", "${cnt}")`, [],
                (sqlTxn, res) => {
                    console.log(`${code} added successfully`);
                },
                error => {
                    console.log("error on adding course " + error.message);
                },
            );
        });
    }
}
