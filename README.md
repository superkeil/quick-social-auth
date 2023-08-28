# Quick Social Authentication

## Installation

`npm i quick-social-auth`


## Overview

This is a nestjs module if you need to authenticate your user with social providers.

This module does not do much. It just retrieve user informations and transform it to a user object so that you can retrieve your users datas.

For example, I just need to know the user email in order to populate my own database.

So the setup is rather simple.

**Frontend side**

You probably need to setup the buttons your clients needs to click on in order to be redirected to the provider authentication process.

And for this, you need to get your clientId/appId from your provider.

Please see the [./example/client/index.html](./example/client/index.html) file for this.

**Backend side**

You will need to register the module with your clientSecret/appSecret from your provider and also need a common redirect_uri between all of your providers.

Please see the [./example/server/src/app.module.ts](./example/server/src/app.module.ts) file for this.

As I try to abstract a maximum, you will probably need to create and pass a custom httpService.

If you use @nestjs/axios You can copy/paste the [./example/server/src/http.service.ts](./example/server/src/http.service.ts) file.

If you want to use the same system for other authentication type or even your own, you can provide your custom provider adapter.

For example, I created a "local database" adapter that you can find in the [./example/server/src/adapters/db.adapter.ts](./example/server/src/adapters/db.adapter.ts) file.

And it is register in this file: [./example/server/src/app.module.ts](./example/server/src/app.module.ts)




## Example

### Server Launch

First, edit example/server/.env

Put in this file the correct values

#### First build the library


#### Then launch the server

Go to example/server and launch

```
npm ci
npm link ../../
npm run start:dev
```

### Client Launch

#### Social authentication

Go to example/client folder and launch
`npx http-server`

Then go to (http://localhost:8080/)[http://localhost:8080/]

Please note that for Facebook, in order to get email, you need the ask the permission.

That is why there is a special button for it.

#### Local database authentication

For login with database users, in the example, there are two pre-defined users :

- login: a1@gmail.com / password: p1
- login: a2@gmail.com / password: p2

