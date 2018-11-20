# BuyQL

App to add and buy products using React and GraphQL

## Install client

```
cd client
yarn install
yarn start
```

## Install server

```
cd server
yarn install
node app.js
```

# Credentials

```
* Admin account *
email: admin@admin.admin
password: admin
```

```
* User account *
email: user@user.user
password: user
```

### Features

```
- register (can create admin or user)
- login
- list all the products
- add a product (only if admin)
- buy a product (only if connected)
- get user data with product added for admin and products bought for user
- edit user data
```

#### Future features

- Reenforce back end security with user session/middleware using graphQL.
- Implement real buying system (currently a fake system)
- Add ping method when user refreshes the page instead localstorage

#### Time spent for this achievement

- about 12 hours (took longer than expected because I had to learn graphQL)
