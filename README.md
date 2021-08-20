# Article App NODEJS API

Untuk memulai program jangan lupa untuk menginstall node_modules dengan melakukan
```npm install``` pada terminal yang mengarah pada root folder

## End point API Authentikasi
### 1.sign up 
url: http://localhost:3000/sign-up \
method: ```POST``` \
paramater yang dimasukan: 
- email ```string``` (required)
- username ```string``` (required)
- password ```string``` (required)
- name ```string``` (required)
- address ```string``` (opsional)
- gender ```number``` -> ```0``` perempuan dan ```1``` laki-laki (opsional)
- user-image  ```file``` (opsional)

### 2. login (login menggunakan pembaca)
url: http://localhost:3000/login \
method: ```POST``` \
paramater yang dimasukan: 
- email ```string``` (required)
- password ```string``` (required)

### 3. login writer (login menggunakan writer)
url: http://localhost:3000/writer-login \
method: ```POST``` \
paramater yang dimasukan: 
- email ```string```  (required)
- password ```string``` (required)

### 4. edit user 
url: http://localhost:3000/user/edit \
method: ```POST``` \
paramater yang dimasukan: 
- username ```string``` (required)
- password ```string``` (required)
- name ```string``` (required)
- address ```string``` (required)
- gender ```number``` -> ```0``` perempuan dan ```1``` laki-laki (required)
- imageUrl ```string``` (required)
- user-image  ```file``` (opsional) -> jika upload foto baru

## End point API Artikel
### 1.get article 
url: http://localhost:3000/ \
method: ```GET``` \
header Authorization: Bearer ```(token yang kamu dapat pada login)```

### 2.get detail article 
url: http://localhost:3000/:articleId \
method: ```GET``` \
header Authorization: Bearer ```(token yang kamu dapat pada login)```

### 3.menambah article (login menggunakan writer)
url: http://localhost:3000/add-article \
method: ```POST``` \
header Authorization: Bearer ```(token dari writer yang kamu dapat pada login)```
paramater yang dimasukan: 
- title ```string```  (required)
- content ```string``` (required)
- image  ```file``` (opsional)

### 4.edit article (login menggunakan writer)
url: http://localhost:3000/edit-article/:articleId \
method: ```PUT``` \
header Authorization: Bearer ```(token dari writer yang kamu dapat pada login)```
paramater yang dimasukan: 
- title ```string```  (required)
- content ```string``` (required)
- imageUrl ```string``` (required)
- image  ```file``` (opsional) -> jika melakukan edit gambar

### 5.hapus article (login menggunakan writer)
url: http://localhost:3000/delete-article/:articleId \
method: ```DELETE``` \
header Authorization: Bearer ```(token dari writer yang kamu dapat pada login)```

### 6.comment article (login menggunakan pembaca)
url: http://localhost:3000/:articleId/comment \
method: ```POST``` \
header Authorization: Bearer ```(token dari pembaca yang kamu dapat pada login)```
paramater yang dimasukan: 
- comment ```string```  (required)
