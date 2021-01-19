-- Create the user [mysql] and give privileges

create user if not exists mysql@'%' identified by 'password';
grant all privileges on *.* to mysql@'%';
flush privileges;

quit