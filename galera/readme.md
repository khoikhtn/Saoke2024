## Lab MariaDB Cluster

### Requirement

- root privilege (via sudo)

### NOTE

```txt

The script 'setup' automatically detect all container names in docker compose file

If you want to add more cluster node:
=> Copy config cluster 2 in docker compose file
=> Paste at the end of file
=> Modify some parameters

Port:
|--3000: [admin:admin] grafana
|--3100: loki
|--9090: prometheus
|--9093: alertmanager
|--9090: node exporter
|--6032: [admin:admin] proxysql admin
|--6033: [admin:admin] proxysql server (listen incoming)
|--6080: [stats:stats] proxysql web (https)
|-- 443: [admin:admin] pmm server (https)

NOTE:
+) Node 1 is default node => don't modify it
+) After setting up with the script, if it still not running, maybe check your firewall config
+) Before shutdown machine, stop containers (./setup d)
+) After first start up, if there is any conflict or error, restart the setup (./setup r)
+) If there is a conflict with port, you can edit port in compose.yml file, or you can stop the application that is using that port

```

You can check which ports are listening by command

```bash

ss -tlunp

# or
ss -tlunp | grep -E '3000|3100|9090|9093|9090|6032|6033|6080|443'

```

### Setup

```bash

# Install package
sudo apt install -y mariadb-client docker.io

# Clone repository
git clone https://gitlab.com/zetasuna/galera.git

# Get help for script setup
./setup

# Setup for first time
./setup u

# Loading config for mariadb cluster
./setup l

# Check status containers
./setup s

# Stop containers
./setup d

# Restart containers
# ./setup r

# Connect to Proxysql Admin
mariadb -u pmm -ppmm -h localhost -P 6032

# Connect to Database Cluster
mariadb -u root -p1 -h localhost -P 6033

```
