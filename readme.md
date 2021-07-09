# Chili starter

## Start dev environment
```
yarn install
yarn run dev
```

## Modify schema
- Modify schema in user/schema.ts
```
yarn run gen:routes
```

## Generate http client in gui/api.ts
```
yarn run gen:client
```

## Add a new controller and schema
- create a new folder and add a file schema.ts and a file FooController.ts
- run gen:routes to automatically generate routes for the new controller
