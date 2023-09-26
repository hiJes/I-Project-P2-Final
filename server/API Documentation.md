# Movie API Documentation

## Endpoints :
List of available endpoints:

- ```POST /register```
- ```POST /login```
- ```POST /login-google```
- ```GET /products```
- ```GET /products/:id```
- ```GET /carts```
- ```POST /carts/:id```
- ```PATCH /carts/:id/status```
- ```PATCH /carts/:id/quantity```
- ```GET /favorites```
- ```POST /favorites/:id```
- ```PATCH /favorites/:id```
- ```GET /apis/province-raja-ongkir```
- ```GET /apis/city-raja-ongkir```
- ```GET /apis/cost-raja-ongkir```

## 1. POST /register

Description: 
- Add new user to database

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is required!"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Must be email format!"
}
OR
{
  "message": "Email must be unique!"
}
OR
{
  "message": "Password is required!"
}
OR
{
  "message": "Minimal 8 character for your password"
}
```

&nbsp;

## 2. POST /login

Description: 
- Compare data from request body with data in database

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "email": "string",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required!"
}
OR
{
  "message": "Password is required!"
}
```

_Response (401 -  Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. POST /login-google

Description: 
- Login with google login and then compare google email in database. If email not found in database, add new user

Request:

- headers:

```json
{
  "google_token": "string"
}
```

_Response (200 - OK) or (201 - Created)_

```json
{
  "access_token": "string",
  "email": "string",
}
```

&nbsp;

## 4. GET /products

Description:
- Get all product include data from category with status Active and get all genre from database with filter by genreId, search by name, and pagination

Request:

- query: 

```json
{
  "filter": "integer",
  "page": "integer",
  "search": "string"
}
```

_Response (200 - OK)_

```json
{
  "products": [
        {
            "id": 1,
            "name": "Green Tea Latte Face Mask",
            "brand": "Emina",
            "description": "EMINA Green Tea Latte Face Mask merupakan masker wajah dengan Kombinasi dari ekstrak susu dan teh hijau membantu memberikan sensasi kulit yang lebih halus, elastis dan segar.Teksturnya yang seperti gel akan memberikan ekstra kelembaban pada wajah saat di gunakan ke wajah. Kandungan green tea lattenya pun membuat harum dari masker ini akan merelax saat pada penggunaan masker.",
            "price": 25000,
            "photo": "https://s3-ap-southeast-1.amazonaws.com/img-sociolla/img/p/8/6/1/6/8616-large_default.jpg",
            "stock": 10,
            "CategoryId": 3,
            "Category": {
                "name": "Mask"
            }
        },
        {
            "id": 2,
            "name": "Multi Targeted All Natural Adoring Face Oil",
            "brand": "BHUMI",
            "description": "9 resep sempurna untuk wajah mempesona. Dimulai dengan Turmeric, pencera wajah yang mengagumkan. Lavender, ratu dari essential oil dengan segudang manfaat. Melembapkan dan menyegarkan kulit sehingga wajah tampak lebih muda dan bersinar. Rosehip dan Clary Sage adalah sumber alami fatty acid dan collagen untuk meregenerasi sel. Tea Tree dan Patchouli dapat membantu mencegah timbulnya jerawat dan noda hitam, sekaligus menjadi pelembap wajah yang mengagumkan. Frankincense oil efektif untuk mengencangkan dan menghilangkan noda hitam. Geranium adalah perawatan tepat untuk kulit sensitif dan kering. Lemongrass oil adalah formula tepat untuk tipe kulit wajah berminyak. Benar-benar cara yang sempu.",
            "price": 155480,
            "photo": "https://s3-ap-southeast-1.amazonaws.com/img-sociolla/img/p/3/4/3/4/6/34346-large_default.jpg",
            "stock": 9,
            "CategoryId": 1,
            "Category": {
                "name": "Moisturizer"
            }
        },
    ...,
  ],
  "categories": [
    {
      "id": 1,
      "name": "Moisturizer"
    },
    {
      "id": 2,
      "name": "Cleanser"
    },
    ...,
  ]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Category not found"
}
```

&nbsp;

## 5. GET /products/:id

Description:
- Get product by id from database include data category

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "name": "Green Tea Latte Face Mask",
    "brand": "Emina",
    "description": "EMINA Green Tea Latte Face Mask merupakan masker wajah dengan Kombinasi dari ekstrak susu dan teh hijau membantu memberikan sensasi kulit yang lebih halus, elastis dan segar.Teksturnya yang seperti gel akan memberikan ekstra kelembaban pada wajah saat di gunakan ke wajah. Kandungan green tea lattenya pun membuat harum dari masker ini akan merelax saat pada penggunaan masker.",
    "price": "Rp 25.000,00",
    "photo": "https://s3-ap-southeast-1.amazonaws.com/img-sociolla/img/p/8/6/1/6/8616-large_default.jpg",
    "stock": 10,
    "CategoryId": 3,
    "Category": {
        "name": "Mask"
    }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

&nbsp;

## 6. GET /carts

Description:
- Get all cart include data product with status Active


_Response (200 - OK)_

```json
[
  {
    "id": 2,
    "UserId": 2,
    "ProductId": 4,
    "status": "Active",
    "quantity": 1,
    "Product": {
        "name": "Jojoba 100 Oil",
        "brand": "ESSENHERB",
        "price": 102900,
        "photo": "https://images.soco.id/image-0-1601618334693",
        "stock": 9
    }
  },
  ...,
]
```

&nbsp;

## 7. POST /carts/:ProductId

Description: 
- Add product to cart and the stock in database product will decrease

Request:

- headers:

```json
{
  "access_token": "string" 
}
```

- params:

```json
{
  "ProductId": "integer (required)"
}
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "UserId": 1,
  "ProductId": 4,
  "status": "Active",
  "quantity": 1
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "You cannot add same product to your cart"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

&nbsp;

## 8. PATCH /carts/:id/status

Description:
- Soft delete cart with update status product by id from Active to Inactive

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "status": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Product has been removed"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

&nbsp;

## 9. PATCH /carts/:id/quantity

Description:
- Update quantity product by id in database Cart and Product

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  " quantity ": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Stock product has been updated"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

&nbsp;

## 10. GET /favorites

Description:
- Get all favorite product include data product with status Favorite


_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "UserId": 1,
    "ProductId": 14,
    "status": "Favorite",
    "Product": {
      "name": "Lightening Serum Ampoule",
      "brand": "Wardah",
      "price": 45000,
      "photo": "https://images.soco.id/3967950845-1599550009330.png",
      "stock": 10
    }
  },
  ...,
]
```

&nbsp;

## 11. POST /favorites/:ProductId

Description: 
- Add product to favorite

Request:

- headers:

```json
{
  "access_token": "string" 
}
```

- params:

```json
{
  "ProductId": "integer (required)"
}
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "UserId": 1,
  "ProductId": 14,
  "status": "Favorite"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "You cannot add same product to your favorite list"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

&nbsp;

## 12. PATCH /favorites/:id

Description:
- Soft delete favorite list with update status product by id from Favorite to Unfavorite

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "status": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Product has been removed from favorite list"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

&nbsp;

## 13. GET /apis/province-raja-ongkir

Description:
- Get data province from API raja ongkir with request package

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "province_id": "1",
    "province": "Bali"
  },
  {
    "province_id": "2",
    "province": "Bangka Belitung"
  },
  ....,
]
```

&nbsp;

## 14. GET /apis/city-raja-ongkir

Description:
- Get data city from API raja ongkir with request package

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
   {
      "city_id": "1",
      "province_id": "21",
      "province": "Nanggroe Aceh Darussalam (NAD)",
      "type": "Kabupaten",
      "city_name": "Aceh Barat",
      "postal_code": "23681"
    },
    {
      "city_id": "2",
      "province_id": "21",
      "province": "Nanggroe Aceh Darussalam (NAD)",
      "type": "Kabupaten",
      "city_name": "Aceh Barat Daya",
      "postal_code": "23764"
    },
  ....,
]
```

&nbsp;

## 15. POST /apis/cost-raja-ongkir

Description:
- Get data cost estimation from API raja ongkir with request package for TIKI (code: tiki), JNE (code: jne), and POS Indonesia (code: pos) services

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "weight" : "integer", 
  "courier" : "string", 
  "destination": "integer"
}
```

_Response (201 - Created)_

```json
{
  "code": "jne",
  "name": "Jalur Nugraha Ekakurir (JNE)",
  "costs": [
    {
      "service": "OKE",
      "description": "Ongkos Kirim Ekonomis",
      "cost": [
        {
          "value": 26000,
          "etd": "2-3",
          "note": ""
        }
      ]
    },
    {
      "service": "REG",
      "description": "Layanan Reguler",
      "cost": [
        {
          "value": 30000,
          "etd": "1-2",
          "note": ""
        }
      ]
    },
    {
      "service": "YES",
      "description": "Yakin Esok Sampai",
      "cost": [
        {
          "value": 50000,
          "etd": "1-1",
          "note": ""
        }
      ]
    }
  ]
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
