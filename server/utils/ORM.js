const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    multipleStatements: true
});

class SqlClient{
    constructor(){
        this._query = '';
        this.values = [];
        this.blocks = [];
        this.client = null;
    };

    // connections
    async connect(){
        this.client =  await pool.getConnection();
    };

    clear(){
        this._query = '';
        this.values = [];
    }

    close(){
        this.client.release();
    };


    // transactions
    async transaction(){
        await this.client.beginTransaction();
    }

    async commit(){
        await this.client.commit();
    }

    async rollback(){
        await this.client.rollback();
    }

    // query block
    push(){
        this.blocks.push([this._query, this.values])
        this._query = '';
        this.values = [];
        return this
    }

    shift(){
        const [_query, values] = this.blocks.shift();
        this._query += _query;
        this.values.push(...values)
        return this
    }; 

    // operations
    select(table, columns=['*']){
        this._query += `SELECT ${columns.join(', ')} FROM ${table} `
        return this
    };

    join(table, conditions, method='LEFT'){
        this._query += `${method} JOIN ${table} ON ${conditions} `
        return this
    };

    as(new_name){
        this._query = `WITH ${new_name} AS (${this._query}) `
        return this
    };

    _as(new_name){
        this._query = `, ${new_name} AS (${this._query}) `
        return this
    };

    delete(table){
        this._query += `DELETE from ${table} `
        return this
    };

    insert(table, dict){
        const keys = Object.keys(dict);
        const questions = Array(keys.length).fill('?').join(', ');
        this._query += `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${questions}) `;
        this.values.push(...Object.values(dict));
        return this
    };

    update(table, dict){
        const keys = Object.keys(dict).join(', ');
        this._query += `UPDATE ${table} SET ${keys} `;
        this.values.push(...Object.values(dict));
        return this
    }

    where(and_dict={}, or_dict={}){
        const and_keys = Object.keys(and_dict).join(' AND ');
        const or_keys = Object.keys(or_dict).join(' OR ');
        if (and_keys && or_keys) {
            this._query += `WHERE ${and_keys} AND (${or_keys}) `;
        }else{
            this._query += `WHERE ${and_keys}${or_keys} `;
        }
        this.values.push(...Object.values(and_dict).filter(e => e !== null));
        this.values.push(...Object.values(or_dict).filter(e => e !== null));
        return this
    };

    limit(n){
        this._query += `LIMIT ${n} `;
        return this
    };

    order(column){
        this._query += `ORDER BY ${column} `;
        return this;
    }


    async query(){
        return await this.client.query(this._query, this.values)
    };
};

module.exports = SqlClient;

