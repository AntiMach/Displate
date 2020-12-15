# Displate
A `discord.js` + `mysql` discord bot template

# Setup
To run this bot, you first need to set your machine up for it.
This guide was made for ubuntu systems only. Its quite volatile and may not work, as it was mostly intended for personal use.

You need to install NodeJS and NPM, and install all the project's dependencies
```
sudo apt-get install nodejs npm
npm install
```

Then, if you still need to setup a MySQL server, then do this
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