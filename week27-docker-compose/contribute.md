## Manual installation
 - Install nodejs locally ()
 - Clone the repo
 - Install dependencies (npm install)
 - Start the DB locally
    - docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
    - Go to neon.tech and get yourself a new DB
 - Change the .env file and update your DB credentials
 - npx prisma migrate
 - npx prisma generate
 - npm run build
 - npm run start

 ## Docker installation
 - Install docker
 - Create a network - `docker network create my_net_pgsql`
 - Start postgres
    -  `docker run -d --network my_net_pgsql -e POSTGRES_USER=rohit -e POSTGRES_PASSWORD=random123pw -d -p 5432:5432 --name my_postgres` postgres
 - Build the image - `docker build --network=host -t week27-project .`
 - Start the image - `docker run -e DATABASE_URL=postgresql://rohit:random123pw@my_postgres:5432/postgres --network my_net_pgsql -p 3000:3000 week27-project`

 ## Docker Compose installation steps
 - Install docker, docker-compose
 - Run `docker-compose up`
