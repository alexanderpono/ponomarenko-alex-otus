stop slave;
stop replica;
change replication source to source_host='project-db-source', source_user='repl', source_password='replPass', source_auto_position=1, get_source_public_key=1;
show warnings;
start replica;
show replica status;
