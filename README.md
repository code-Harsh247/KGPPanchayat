# MY PANCHAYAT

A smart AI powered gram panchayat management system.

## Running the application

To Run the container:
```bash
docker compose up -d
```
To Enable Hot Reloading (Watches for file changes & syncs them inside the container)
```bash
docker compose watch -d
```

Or you can simply use
```bash
npm run dev
```

## Credentials

Make a .env.local file. 
```bash
PG_HOST=10.5.18.72
PG_PORT=5432
PG_USER=
PG_PASSWORD=
PG_DATABASE=
JWT_SECRET=Pookie
```

For the database credentials, drop me a DM :)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)