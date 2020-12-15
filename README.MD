# Displate
A `discord.js` + `mysql` discord bot template

# Setup
To run this bot, you first need to set your machine up for it.
This guide was made for ubuntu systems only. Its quite volatile and may not work, as it was mostly intended for personal use.

This Node package includes a few scripts for running and transpiling the client, such as:
```
npm run watch       # Runs tsc in watch mode
npm run test        # Runs nodemon for quick loading and reloading when changes are applied
npm run rebuild     # Rebuilds the entire build structure. Do this in case you move files around 
npm run final       # Simply runs the transpiled client
```

However, you first need to setup the project.
If you haven't already, install `nodejs` and `npm`.
```
sudo apt-get install nodejs npm
npm install
```

Then, if you still need to setup a MySQL server, then do the following:
```
sudo apt-get install mysql-server
mysql_secure_installation
sudo mysql
# CREATE USER 'USER'@'HOST_IP' IDENTIFIED BY 'PASSWORD';
# GRANT ALL PRIVELEGES ON *.* TO 'USER'@'HOST_IP';      
# EXIT;                                                 
bash  nano /etc/mysql/mysql.conf.d/mysqld.cnf
# change 'bind-address' ip to *
# ctrl+s & ctrl+x
sudo systemctl restart mysql
sudo ufw allow from HOST_IP to any port 3306
```

The `schema.sql` should include enough information to guide you to setup your database