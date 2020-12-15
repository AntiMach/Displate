# Displate
A `discord.js` + `mysql` discord bot template

# Setup
This guide was made for ubuntu systems only. Its quite volatile and may not work, as it was mostly intended for personal use.

If you haven't already, install `nodejs` and `npm`.
```
sudo apt-get install nodejs npm
```

And install this repo as an npm module
```
npm install https://github.com/AntiMach/Displate
```

If you still need to setup a MySQL server, then do the following:
```
sudo apt-get install mysql-server
mysql_secure_installation
sudo mysql
# CREATE USER 'USER'@'%' IDENTIFIED WITH mysql_native_password BY 'PASSWORD';
# GRANT ALL PRIVILEGES ON *.* TO 'USER'@'%' WITH GRANT OPTION;
# FLUSH PRIVILEGES;
# EXIT;                                                 
bash  nano /etc/mysql/mysql.conf.d/mysqld.cnf
# change 'bind-address' ip to *
# ctrl+s & ctrl+x
sudo systemctl restart mysql
sudo ufw allow from HOST_IP to any port 3306
```

The template files include a simple demonstration on how you could do things.
Technically, all you need is the index.js, but I'd recommend also taking a look at the schema you have to implement,
and the way you could setup your environment variables without dotenv
The `schema.sql` should include enough information to guide you to setup your database