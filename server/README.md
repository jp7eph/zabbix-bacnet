# server

## Usage

```console
usage: server.py [-h] [--loggers] [--debug [DEBUG ...]] [--color] [--route-aware] [--name NAME] [--instance INSTANCE]
                 [--network NETWORK] [--address ADDRESS] [--vendoridentifier VENDORIDENTIFIER] [--foreign FOREIGN]
                 [--ttl TTL] [--bbmd [BBMD ...]]

options:
  -h, --help            show this help message and exit
  --loggers             list the debugging logger names
  --debug [DEBUG ...]   add a log handler to each debugging logger
  --color               turn on color debugging
  --route-aware         turn on route aware
  --name NAME           device name
  --instance INSTANCE   device object instance number, a.k.a., device identifier
  --network NETWORK     local network number
  --address ADDRESS     local network address
  --vendoridentifier VENDORIDENTIFIER
                        vendor identifier
  --foreign FOREIGN     BBMD address to register as a foreign device
  --ttl TTL             foreign device subscription time-to-live
  --bbmd [BBMD ...]     BDT addresses as a BBMD
```
