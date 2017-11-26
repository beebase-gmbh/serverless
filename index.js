'use strict';

const _awsRegion = 'eu-west-1';
const _tableName = process.env.TABLE_NAME;
const aws = require('aws-sdk');
const dynamodb = new aws.DynamoDB();

const rand = n => {
    var result = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (var i = 0; i < n; i++)
        result += possible.charAt(Math.floor(Math.random() * possible.length));

    return result;
}

const createResponse = (statusCode, body) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body)
    }
}

const sendSuccess = (data, operation, callback) => {
    console.log(`[${operation}] OK`);
    callback(null, createResponse(200, data))
}

const sendError = (err, operation, callback) => {
    console.log(`[${operation}] ERROR: `, err);
    callback(null, createResponse(500, err));
}

const insertItem = (message, x, y, callback) => {
    let params = {
        Item: {
            "id": {
                "S": `${new Date().toISOString()}-${rand(4)}`
            },
            "message": {
                "S": message
            },
            "x": {
                "N": x
            },
            "y": {
                "N": y
            }
        },
        ReturnConsumedCapacity: "NONE",
        TableName: _tableName
    };
    return dynamodb.putItem(params).promise();
}

const setItem = (json) => {
    let data = JSON.parse(json);
    let m = data.message.trim().substring(0, 100);
    let x = parseInt(data.xPos).toString();
    let y = parseInt(data.yPos).toString();

    return insertItem(m, x, y);
}

const readItems = () => {
    var params = {
        TableName: _tableName,
        Limit: 100
    };
    return dynamodb.scan(params).promise();
}

const getItems = () => {
    return readItems()
        .then(data => {
            if (data.Items.length === 0) {
                return null;
            }

            let output = data.Items.map(x => {
                var rObj = {};
                rObj['id'] = x.id.S;
                rObj['message'] = x.message.S;
                rObj['xPos'] = x.x.N;
                rObj['yPos'] = x.y.N;
                return rObj;
            }).sort(function (a, b) {
                let _a = a.id.toUpperCase();
                let _b = b.id.toUpperCase();
                if (_a < _b) {
                    return -1;
                }
                if (_a > _b) {
                    return 1;
                }
                return 0;
            });
            return output;
        });
}


exports.handler = (event, context, callback) => {
    //console.log(`event: ${JSON.stringify(event)}`);
    switch (event.httpMethod) {
        case "GET":
            getItems()
                .then(data => { sendSuccess(data, 'read', callback); })
                .catch(err => { sendError(err, 'read', callback); })
            break;

        case "POST":
            setItem(event.body)
                .then(data => { sendSuccess('OK', 'write', callback); })
                .catch(err => { sendError(err, 'write', callback); })
            break;

        default:
            callback(null, { statusCode: 501 })
    }
}