# read

## Usage

```console
usage: read.py [-h] [--loggers] [--debug [DEBUG ...]] [--color] [--route-aware] [--name NAME] [--instance INSTANCE]
               [--network NETWORK] [--address ADDRESS] [--vendoridentifier VENDORIDENTIFIER] [--foreign FOREIGN] [--ttl TTL]
               [--bbmd [BBMD ...]]
               device_address object_identifier property_identifier

positional arguments:
  device_address        address of the server (B-device)
  object_identifier     object identifier, like 'analog-input,1'
  property_identifier   property identifier with optional array index, like 'present-value'

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

# write

## Usage

```console
usage: write.py [-h] [--loggers] [--debug [DEBUG ...]] [--color] [--route-aware] [--name NAME] [--instance INSTANCE]
                [--network NETWORK] [--address ADDRESS] [--vendoridentifier VENDORIDENTIFIER] [--foreign FOREIGN] [--ttl TTL]
                [--bbmd [BBMD ...]]
                device_address object_identifier property_identifier value [priority]

positional arguments:
  device_address        address of the server (B-device)
  object_identifier     object identifier
  property_identifier   property identifier with optional array index
  value                 value to write
  priority              optional priority

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
