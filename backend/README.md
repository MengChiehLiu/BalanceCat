# Database Schema
![](https://hackmd.io/_uploads/BJ15hIQp3.png)



# Accounting Subjects
```
+------+--------------+----------+-----------+
| id   | name         | is_debit | parent_id |
+------+--------------+----------+-----------+
| 1000 | 資產         |        1 |      NULL |
| 1100 | 流動資產     |        1 |      1000 |
| 1101 | 現金         |        1 |      1100 |
| 1102 | 股票         |        1 |      1100 |
| 1103 | 應收帳款     |        1 |      1100 |
| 1104 | 其他         |        1 |      1100 |
| 1200 | 非流動資產   |        1 |      1000 |
| 1201 | 車子         |        1 |      1200 |
| 1202 | 房子         |        1 |      1200 |
| 1203 | 3C           |        1 |      1200 |
| 1204 | 家電         |        1 |      1200 |
| 1205 | 預付款       |        1 |      1200 |
| 1206 | 其他         |        1 |      1200 |
| 2000 | 負債         |        0 |      NULL |
| 2100 | 流動負債     |        0 |      2000 |
| 2101 | 信用卡費     |        0 |      2100 |
| 2102 | 應付帳款     |        0 |      2100 |
| 2103 | 其他         |        0 |      2100 |
| 2200 | 非流動負債   |        0 |      2000 |
| 2201 | 分期付款     |        0 |      2200 |
| 2202 | 車貸         |        0 |      2200 |
| 2203 | 房貸         |        0 |      2200 |
| 2204 | 其他         |        0 |      2200 |
| 3000 | 權益         |        0 |      NULL |
| 3100 | 保留盈餘     |        0 |      3000 |
| 3200 | 當期損益     |        0 |      3000 |
| 4000 | 收入         |        0 |      NULL |
| 4100 | 經常性收入   |        0 |      4000 |
| 4101 | 薪資收入     |        0 |      4100 |
| 4102 | 利息收入     |        0 |      4100 |
| 4103 | 其他         |        0 |      4100 |
| 4200 | 非經常性收入 |        0 |      4000 |
| 4201 | 兼職收入     |        0 |      4200 |
| 4202 | 中獎收入     |        0 |      4200 |
| 4203 | 其他         |        0 |      4200 |
| 5000 | 支出         |        1 |      NULL |
| 5100 | 經常性支出   |        1 |      5000 |
| 5101 | 伙食支出     |        1 |      5100 |
| 5102 | 治裝支出     |        1 |      5100 |
| 5103 | 住房支出     |        1 |      5100 |
| 5104 | 交通支出     |        1 |      5100 |
| 5105 | 教育支出     |        1 |      5100 |
| 5106 | 娛樂支出     |        1 |      5100 |
| 5107 | 孝親費       |        1 |      5100 |
| 5108 | 折舊費用     |        1 |      5100 |
| 5109 | 其他         |        1 |      5100 |
| 5200 | 非經常性支出 |        1 |      5000 |
| 5201 | 伙食支出     |        1 |      5200 |
| 5202 | 治裝支出     |        1 |      5200 |
| 5203 | 住房支出     |        1 |      5200 |
| 5204 | 交通支出     |        1 |      5200 |
| 5205 | 教育支出     |        1 |      5200 |
| 5206 | 娛樂支出     |        1 |      5200 |
| 5207 | 孝親費       |        1 |      5200 |
| 5208 | 其他         |        1 |      5200 |
+------+--------------+----------+-----------+
```

# API Documents

## Data
### Init DB
* End Point: `api/1.0/data/db/init`
* Method: `POST`
* Request Example:

`http://[HOST_NAME]/api/[API_VERSION]/data/db/init`
* Success Response: 200

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| message    | String   | Success :) |
* Server Error Response: 500

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| message    | String   | Fail :( |



## Entries
### Get Entry 
* End Point: `api/1.0/entries/:entry_id`
* Method: `GET`
* Request Headers:

| Field    | Type     | Description |
| -------- | -------- | -------- |
| Authorization     | String     | Access token preceding Bearer . For example: `Bearer x48aDD534da8ADSD1XC4SD5S...`     |
* Request Example:

`http://[HOST_NAME]/api/[API_VERSION]/entries/1`
* Success Response: 200
* Success Example:
```json
"data": {
  "entry": {
      "id": 1,
      "timestamp": "2023-07-13 19:21:37",
      "datails": [
          {
              "subject": {
                  "id": 2030,
                  "name": "房租費用",
                  "is_debit": true
              },
              "amount": 10000,
              "description": "7月房租"
          },
          {
              "subject": {
                  "id": 1010,
                  "name": "現金",
                  "is_debit": true
              },
              "amount": -10000,
              "description": "7月房租"
          }
      ]  
  }
}
```
* Client Error (No token) Response: 401

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|
		
* Client Error (Wrong token, Invalid user) Response: 403

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|

* Client Error (Invalid entry id) Responses: 400

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|

* Server Error Response: 500

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|


### Post Entry 
* End Point: `api/1.0/entries`
* Method: `POST`
* Request Headers:

| Field    | Type     | Description |
| -------- | -------- | -------- |
| Authorization     | String     | Access token preceding Bearer . For example: `Bearer x48aDD534da8ADSD1XC4SD5S...`     |
* Request Body:

example of depreciated long term assets:
```json
{
    "details":[
        {
            "subject_id": 1080,
            "amount": 10000,
            "register": {
                "id": null,
                "expired_in": 10
            },
            "description": "健身房會員"
        },
        {
            "subject_id": 1010,
            "amount": -10000,
            "register": null,
            "description": "健身房會員"
        }
    ]
    "timestamp": "2023/7/19 18:30:00",
    "parent_id": null
}
```
example of receive AR:
```json
{
    "details":[
        {
            "subject_id": 1010,
            "amount": 700,
            "register": null,
            "description": "王小明還錢"
        },
        {
            "subject_id": 1030,
            "amount": -700,
            "register": {
                "id": 1,
                "book_value": 700
            },
            "description": "王小明還錢"
        }
    ]
    "timestamp": "2023/7/19 18:30:00",
    "parent_id": 1
}
```
* Request Example:

`http://[HOST_NAME]/api/[API_VERSION]/entries`
* Success Response: 200
* Success Example:
```json
{
    "data": {
        "entry": {
            "id": 1
        }
    }
}
```
* Client Error (No token) Response: 401

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|
		
* Client Error (Wrong token) Response: 403

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|

* Client Error (inbalanced, invalid register) Responses: 400

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|

* Server Error Response: 500

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|


### Delete entry 
* End Point: `api/1.0/entries/:entry_id`
* Method: `DELETE`
* Queries

| Field    | Type     | Description |
| -------- | -------- | --------    |
| start  | string  | starting date of search  |
| end  | string   | ending date of search   |

* Request Headers:

| Field    | Type     | Description |
| -------- | -------- | -------- |
| Authorization     | String     | Access token preceding Bearer . For example: Bearer x48aDD534da8ADSD1XC4SD5S...     |

* Request Example:

`http://[HOST_NAME]/api/[API_VERSION]/entries/1

* Success Response: 200
* Success Example:
```json
"data": {
  "entry": {
      "id": 1
  }
}
```
* Client Error (No token) Response: 401

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|
		
* Client Error (Wrong token, invalid user) Response: 403

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|

* Client Error (Invalid entry id) Responses: 400

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|

* Server Error Response: 500

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|

### Entry History 
* End Point: `api/1.0/entries/history`
* Method: `GET`
* Queries

| Field      | Type    | Description |
| --------   | --------| --------    |
| subject_id | Int     | Optional    |
| start      | String  | Required    |
| end        | String  | Required    |


* Request Headers:

| Field    | Type     | Description |
| -------- | -------- | -------- |
| Authorization     | String     | Access token preceding Bearer . For example: Bearer x48aDD534da8ADSD1XC4SD5S...     |

* Request Example:

`http://[HOST_NAME]/api/[API_VERSION]/entries/history?subject_id=1010&start=2023-07-01&end=2023-08-01`clea

* Success Response: 200
* Success Example:
```json
"data": {
  "entries": [
      {
          "id": 1,
          "timestamp": "2023/7/13 19:21:37",
          "datails": [
          {
              "subject": {
                  "id": 2030,
                  "name": "房租費用",
                  "is_debit": true
              },
              "register_id": null,
              "amount": 10000,
              "description": "7月房租"
          }...
      },
      {
          "id": 2,
          "timestamp": "2023/7/14 09:08:10",
          "datails": "..." 
      }
  ]  
}
```
* Client Error (No token) Response: 401

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|
		
* Client Error (Wrong token) Response: 403

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|

* Client Error (Invalid queries) Responses: 400

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|

* Server Error Response: 500

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|


## Registers
### Get Registers 
* End Point: `api/1.0/registers`
* Method: `GET`
* Request Headers:

| Field    | Type     | Description |
| -------- | -------- | -------- |
| Authorization     | String     | Access token preceding Bearer . For example: `Bearer x48aDD534da8ADSD1XC4SD5S...`     |

* Queries

| Field    | Type     | Description |
| -------- | -------- | -------- |
| type     | String   | Required: `assets`, `liabilities`, `ar`, `ap`|
* Request Example:

`http://[HOST_NAME]/api/[API_VERSION]/registers?type=ar`
* Success Response: 200
* Success Example:
```json
"data": {
  "registers": [
      {
          "id": 1,
          "timestamp": '2023/07/01 13:51:19'
          "initial_value": 12000,
          "book_value": 12000,
          "expired_in": null,
          "is_expired": false,
          "entry_id": 1,
          "subject": {
              "id": 1103,
              "name": "應收帳款",
              "is_debit": true
          }
      },
      {
          "id": 2,
          "timestamp": '2023/07/09 17:21:33'
          "initial_value": 36000,
          "book_value": 24000,
          "expired_in": null,
          "is_expired": false,
          "entry_id": 17,
          "subject": {
              "id": 1103,
              "name": "應收帳款",
              "is_debit": true
          }
      }
  ]
}
```
* Client Error (No token) Response: 401

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|
		
* Client Error (Wrong token) Response: 403

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|

* Client Error Responses: 400

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|

* Server Error Response: 500

| Field    | Type     | Description   |
| -------- | -------- | --------      |
| error    | String   | Error message.|


## Users

### User SignUp 
* End Point:`/users/signup`
* Method:`POST`
* Request Headers:

| Field         | Type   | Description                  |
|---------------|--------|------------------------------|
| Content-Type  | String | Only accept application/json |

* Request Body:

| Field    | Type   | Description |
|----------|--------|-------------|
| name     | String | Required    |
| email    | String | Required    |
| password | String | Required    |

* Request Body Example:
```json
{
  "name":"test",
  "email":"test@test.com",
  "password":"test"
}
```

* Success Response: 200

| Field        | Type        | Description              |
|--------------|-------------|--------------------------|
| access_token | String      | Access token from server |
| user         | User Object | User information         |

* Success Response Example:
```json
{
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6InRlc3QzIiwiZW1haWwiOiJ0ZXN0M0B0ZXN0LmNvbSIsImlhdCI6MTY5MjI1NzY2MX0.VGpyCekZTOJT3X2aO73xsFlhLotFVKWpqEajpubo1wc",
        "user": {
            "id": 4,
            "name": "test3",
            "email": "test3@test.com"
        }
    }
}
```

* Email Already Exists: 403

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |
* Client Error Response: 400

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |
* Server Error Response: 500

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |

### User SignIn 
* End Point:`/users/signin`
* Method:`POST`
* Request Headers:

| Field         | Type   | Description                  |
|---------------|--------|------------------------------|
| Content-Type  | String | Only accept application/json |

* Request Body:

| Field    | Type   | Description |
|----------|--------|-------------|
| email    | String | Required    |
| password | String | Required    |

* Request Body Example:
```json
{
  "email":"test@test.com",
  "password":"test"
}
```

* Success Response: 200

| Field        | Type        | Description              |
|--------------|-------------|--------------------------|
| access_token | String      | Access token from server |
| user         | User Object | User information         |

* Success Response Example:
```json
{
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InRlc3QxIiwiZW1haWwiOiJ0ZXN0MUB0ZXN0LmNvbSIsImlhdCI6MTY5MjI1NzczOX0.A6ERSxls__ejq9VMq7ZvUmFHeDfTC38I4KeJcfRozIk",
        "user": {
            "id": 2,
            "name": "test1",
            "email": "test1@test.com"
        }
    }
}
```

* Sign In Failed (Wrong Password, User Not Found): 403

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |

* Client Error Response: 400

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |

* Server Error Response: 500

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |

### User Picture 
* End Point:`/users/picture`
* Method:`PUT`
* Request Headers:

| Field         | Type   | Description                  |
|---------------|--------|------------------------------|
| Content-Type  | String | Only accept `multipart/form-data`. |
| Authorization     | String     | Access token preceding `Bearer` . For example: `Bearer x48aDD534da8ADSD1XC4SD5S`    |

* Request Body:

| Field    | Type | Description |
|----------|------|-------------|
| picture  | File | Image File. |

* Success Response: 200
* Success Response Example:
```json
{
    "data": {
        "picture": "https://host/api/1.0/images/123456.jpg"
    }
}
```

### User Memo 
* End Point:`/users/memo`
* Method:`PUT`
* Request Headers:

| Field         | Type   | Description                  |
|---------------|--------|------------------------------|
| Content-Type  | String | Only accept `application/json`. |
| Authorization     | String     | Access token preceding `Bearer` . For example: `Bearer x48aDD534da8ADSD1XC4SD5S`    |

* Request Body:

| Field    | Type   | Description |
|----------|--------|-------------|
|  title   | String | Memo title  |
|  content | String | Memo content|

* Success Response: 200
* Success Response Example:
```json
{
    "data": {
        "user": {
            "id": 1
        }
    }
}
```

### User Info 
* End Point:`/users`
* Method:`GET`
* Request Headers:

| Field         | Type   | Description                  |
|---------------|--------|------------------------------|
| Authorization     | String     | Access token preceding `Bearer` . For example: `Bearer x48aDD534da8ADSD1XC4SD5S`    |

* Success Response: 200
* Success Response Example:
```json
{
    "data": {
        "user": {
            "id": 1,
            "name": "Jack",
            "picture": "https://host/api/1.0/images/123456.jpg",
            "memo_title": "理財規劃",
            "memo_content": "每天一張刮刮樂。"
        }
    }
}
```

## F/S
### Get BS 
* End Point: `api/1.0/fs/bs`
* Method: `get`
* Description: Get balance sheet.
* Request Headers:

| Field    | Type     | Description |
| -------- | -------- | -------- |
| Authorization     | String     | Access token preceding `Bearer` . For example: `Bearer x48aDD534da8ADSD1XC4SD5S`    |

* Query Parameters:

| Field    | Type     | Description |
| -------- | -------- | -------- |
| timestamp     | String     | Optional. Specifies the month for the data retrieval. Only balances up to the end of the month will be returned.  |


* Request Example:
`http://[HOST_NAME]/api/[API_VERSION]/fs/bs`
`http://[HOST_NAME]/api/[API_VERSION]/fs/bs?month=2023-07-31`

* Success Response: 200
```json
{
    "data": {
        "subjects": [
            {
                "id": 1000,
                "name": "資產",
                "is_debit": 1,
                "amount": 6000,
                "subjects": [
                    {
                        "id": 1100,
                        "name": "流動資產",
                        "is_debit": 1,
                        "amount": -4000,
                        "subjects": [
                            {
                                "id": 1101,
                                "name": "現金",
                                "is_debit": 1,
                                "amount": -4000,
                                "subjects": null
                            }...
                        ]
                    }...
                ]
            }...
        ]
    }
}

```

* Wrong Date: 403

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |
* Client Error Response: 400

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |
* Server Error Response: 500

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |


### Get IS 
* End Point: `api/1.0/fs/is`
* Method: `get`
* Description: Get income statement.
* Request Headers:

| Field    | Type     | Description |
| -------- | -------- | -------- |
| Authorization     | String     | Access token preceding `Bearer` . For example: `Bearer x48aDD534da8ADSD1XC4SD5S`    |

* Query Parameters:

| Field    | Type     | Description |
| -------- | -------- | -------- |
| timestamp (Optional)     | Date     | Specifies the end date for the data retrieval. Only data up to this date will be returned.  |

* Request Example:
`http://[HOST_NAME]/api/[API_VERSION]/fs/is`
`http://[HOST_NAME]/api/[API_VERSION]/fs/is?timestamp=2023-07-31`

* Success Response: 200
```json
{
    "data": {
        "subjects": [
            {
                "id": 4000,
                "name": "收入",
                "is_debit": 0,
                "amount": 0,
                "subjects": [
                    {
                        "id": 4100,
                        "name": "經常性收入",
                        "is_debit": 0,
                        "amount": 0,
                        "subjects": [
                            {
                                "id": 4101,
                                "name": "薪資收入",
                                "is_debit": 0,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 4102,
                                "name": "利息收入",
                                "is_debit": 0,
                                "amount": 0,
                                "subjects": null
                            },
                            ...
                        ]
                    }
                ]
            }
        ]
    }
}
```

* Wrong Date: 403

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |
* Client Error Response: 400

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |
* Server Error Response: 500

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |

## Goals
### Set Goals  
* End Point:`/goals/`
* Method:`POST`
* Request Headers:

| Field    | Type     | Description |
| -------- | -------- | -------- |
| Authorization     | String     | Access token preceding `Bearer` . For example: `Bearer x48aDD534da8ADSD1XC4SD5S`    |

* Request Example:
`http://[HOST_NAME]/api/[API_VERSION]/goals/`

`
* Request Body:

| Field    | Type   | Description |
|----------|--------|-------------|
| subject_id| Number| Required    |
| amount    | Number| Required    |

* Request Body Example:
```json
{
  "subject_id":1101,
  "amount":10000000

}
```

* Success Response: 200

| Field        | Type        | Description              |
|--------------|-------------|--------------------------|
| goal        | Object | Object of goal         |

* Success Response Example:
```json
{
  "data": {
      "goal": {
          "id": 1
      }
  }
}
```

* Forbidden (Subject does not exist): 403

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |
* Client Error Response: 400

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |
* Server Error Response: 500

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |

### Update Goals  
* End Point:`/goals/:id`
* Method:`PUT`
* Request Headers:

| Field    | Type     | Description |
| -------- | -------- | -------- |
| Authorization     | String     | Access token preceding `Bearer` . For example: `Bearer x48aDD534da8ADSD1XC4SD5S`    |

* Parameters:

| Field    | Type     | Description |
| -------- | -------- | -------- |
| id  | String    | Goal's id  |

* Request Example:
`http://[HOST_NAME]/api/[API_VERSION]/goals/:id`

* Request Body:

| Field    | Type   | Description |
|----------|--------|-------------|
| amount    | Number| Required    |

* Request Body Example:
```json
{
  "subject_id":1101,
  "amount":20000000

}
```

* Success Response: 200

| Field        | Type        | Description              |
|--------------|-------------|--------------------------|
| goal        | Object | Object of goal         |

* Success Response Example:
```json
{
  "data": {
      "goal": {
          "id": 1
      }
  }
}
```

* Forbidden (Goal does not exist): 403

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |
* Client Error Response: 400

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |
* Server Error Response: 500

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |

### Delete Goals  
* End Point:`/goals/:id`
* Method:`DELETE`
* Request Headers:

| Field    | Type     | Description |
| -------- | -------- | -------- |
| Authorization     | String     | Access token preceding `Bearer` . For example: `Bearer x48aDD534da8ADSD1XC4SD5S`    |

* Request Example:
`http://[HOST_NAME]/api/[API_VERSION]/goals/:id`

* Parameters:

| Field    | Type     | Description |
| -------- | -------- | -------- |
| id  | String    | Goal's id  |


* Success Response: 200

| Field        | Type        | Description              |
|--------------|-------------|--------------------------|
| goal        | Object | Object of goal         |

* Success Response Example:
```json
{
  "data": {
      "goal": {
          "id": 1
      }
  }
}
```

* Forbidden (Goal does not exist): 403

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |
* Client Error Response: 400

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |
* Server Error Response: 500

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |

### Get Goals  
* End Point:`/goals/`
* Method:`GET`
* Request Headers:

| Field    | Type     | Description |
| -------- | -------- | -------- |
| Authorization     | String     | Access token preceding `Bearer` . For example: `Bearer x48aDD534da8ADSD1XC4SD5S`    |

* Request Example:
`http://[HOST_NAME]/api/[API_VERSION]/goals/`
`http://[HOST_NAME]/api/[API_VERSION]/goals/?startyear=2022&endyear=2023
`
* Success Response: 200

| Field        | Type        | Description              |
|--------------|-------------|--------------------------|
| goals       | Array | Array of User's goal         |

* Success Response Example:
```json
{
    "data": {
        "goals": [
            {
                "id": 1,
                "subject_id": 1101,
                "name": "現金",
                "amount": 10000000,
                "current_amount": -349186,
                "history_amount": [
                    {
                        "label": "2023",
                        "data": [
                            0,
                            0,
                            -42984,
                            -146314,
                            -218878,
                            -279224,
                            -316793,
                            -349186,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    {
                        "label": "2022",
                        "data": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    }
                ]
            }
        ]
    }
}

```
* Client Error (Wrong token) Response: 403

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |
* Client Error Response: 400

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |
* Server Error Response: 500

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |







## Stats
### Get A&L 
* End Point:`/stats/overall`
* Method:`GET`
* Request Headers:

| Field    | Type     | Description |
| -------- | -------- | -------- |
| Authorization     | String     | Access token preceding `Bearer` . For example: `Bearer x48aDD534da8ADSD1XC4SD5S`    |

* Request Example:
`http://[HOST_NAME]/api/[API_VERSION]/stats/overall`

* Success Response: 200



* Success Response Example:
```json
{
  "data": {
      "stats": [
          {
              "name": "資產" 
              "amount": 1000
              "percentage_change": 25.3
          },
          {
              "name": "負債" 
              "amount": -1000
              "percentage_change": 15.2
          }
      ]
      "charts": [
          {
              "name": "流動資產" 
              "amount": 1000
          },
          {
              "name": "流動負債"
              "amount": -500
          }...
      ],
      
  }
}

```
* Client Error (Wrong token) Response: 403

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |
* Client Error Response: 400

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |
* Server Error Response: 500

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |


### Get Expenses 
* End Point:`/stats/expenses`
* Method:`GET`
* Request Headers:

| Field    | Type     | Description |
| -------- | -------- | -------- |
| Authorization     | String     | Access token preceding `Bearer` . For example: `Bearer x48aDD534da8ADSD1XC4SD5S`    |

* Request Example:
`http://[HOST_NAME]/api/[API_VERSION]/stats/expenses`

* Success Response: 200
* Success Response Example:
```json
{
  "data": {
      "stats": [
          {
              "name": "經常性支出" 
              "amount": 1000
              "percentage_change": -10.4
          },
          {
              "name": "非經常性支出" 
              "amount": 1000
              "percentage_change": 7.9
          }
      ]
      "charts": [
          {
              "name": "伙食支出" 
              "amount": 1000
          },
          {
              "name": "交通支出"
              "amount": 2000
          }...
      ]
  }
}

```
* Client Error (Wrong token) Response: 403

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |
* Client Error Response: 400

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |
* Server Error Response: 500

| Field | Type   | Description    |
|-------|--------|----------------|
| error | String | Error message. |