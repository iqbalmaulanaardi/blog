Hosting di : http://blog.iqbalmaulana.online/


**POST user**
----
* **URL**

  /users

* **Method:**
  
  `POST`
  
*  **URL Params**

   None

   **Required:**
 
   None

* **Data Params**

    `email:string`

    `password:string`

    `articles:[object]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ _id : 12, email: 'an email', password: 'a password', articles:[{_id: 11},{_id:10}] }`
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

**POST user signin**
----
* **URL**

  /users/signin

* **Method:**
  
  `POST`
  
*  **URL Params**

   None

   **Required:**
 
   None

* **Data Params**

    `email:string`

    `password:string`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZTRlZjQ1YzJkZTg5MGU1NDA2MGIwZCIsIm5hbWUiOiJ1c2VyMSIsImVtYWlsIjoidXNlcjFAbWFpbC5jb20iLCJpYXQiOjE1NDE3MzY2MzB9.13kvqQyYpJsBprW9JsBxYDiwcD8HMnlWjX-y5TPlXSw' }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Incorrect Email or Password" }`    


**POST article**
----
* **URL**

  /articles

* **Method:**
  
  `POST`
  
*  **URL Params**

   None

   **Required:**
 
   `token:string`
   
* **Data Params**

    `title:string`

    `content:string`

    `comments:[object]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ _id : 12, title: 'a title', content: 'contents', comment:[{_id: 11},{_id:10}], user_id: '5be91ce3d19a8b144aa1d0cb' }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

**GET articles**
----
    Display article of a user
* **URL**

  /articles

* **Method:**

  `GET`
  
*  **URL Params**

   None

   **Required:**
 
   `token:string`

* **Data Params**

    None

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `[{ _id : 12, title: 'a title', content: 'contents', comment:[{_id: 11},{_id:10}], user_id: '5be91ce3d19a8b144aa1d0cb' }, ...]`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

**PUT article**
----
* **URL**

  /articles/:article_id

* **Method:**
  
  `PUT`
  
*  **URL Params**

   `article_id:string`

   **Required:**
 
   `token:string`

* **Data Params**

    `title:string`

    `content:string`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ _id : 12, title: 'an updated title', content: 'updated contents', comment:[{_id: 11},{_id:10}], user_id: '5be91ce3d19a8b144aa1d0cb' }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

**DELETE article**
----
* **URL**

  /articles/:article_id

* **Method:**
  
  `DELETE`
  
*  **URL Params**

   `article_id:string`

   **Required:**
 
   `token:string`

* **Data Params**

    None


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ _id : 12, title: 'an updated title', content: 'updated contents', comment:[{_id: 11},{_id:10}], user_id: '5be91ce3d19a8b144aa1d0cb' }, ...]`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`    

**GET all articles**
----
    Display article from all users
* **URL**

  /all_articles

* **Method:**

  `GET`
  
*  **URL Params**

   None

   **Required:**
 
   None

* **Data Params**

    None

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `[{ _id : 12, title: 'a title', content: 'contents', comment:[{_id: 11},{_id:10}, user_id: '5be91ce3d19a8b144aa1d0cb'], user_id: '5be91ce3d19a8b144aa1d0cb' }, ...]`
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />

**GET detail article**
----
    Display detail of an article
* **URL**

  /detail_articles

* **Method:**

  `GET`
  
*  **URL Params**

   None

   **Required:**
 
   None

* **Data Params**

    None

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ _id : 12, title: 'a title', content: 'contents', comment:[{_id: 11},{_id:10}], user_id: '5be91ce3d19a8b144aa1d0cb' }`
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />

**POST comment**
----
* **URL**

  /comments

* **Method:**
  
  `POST`
  
*  **URL Params**

   None

   **Required:**
 
   `token:string`

* **Data Params**

    `content:string`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ _id : 1,  content: 'this is comment's content', user_id: '5be91ce3d19a8b144aa1d0cb' }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

**GET comment**
----
    Display comment of an article
* **URL**

  /comments/:article_id

* **Method:**

  `GET`
  
*  **URL Params**

   `article_id: string`

   **Required:**
 
   None

* **Data Params**

    None

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `[{ _id : 1,  content: 'this is comment's content', user_id: '5be91ce3d19a8b144aa1d0cb' }, ...]`
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />

**DELETE comment**
----
* **URL**

  /comments/:comment_id

* **Method:**
  
  `DELETE`
  
*  **URL Params**

   `comment_id:string`

   **Required:**
 
   `token:string`

* **Data Params**

    None


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ _id : 1,  content: 'this is comment's content', user_id: '5be91ce3d19a8b144aa1d0cb' }, ...]`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }` 
    

