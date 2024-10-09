#!/usr/bin/env bash

# https://github.com/zquestz/ws-tcp-proxy
# https://github.com/zquestz/ws-tcp-proxy/releases/download/v0.1.1/ws-tcp-proxy-windows_amd64.zip
export PATH="/c/PortableApps/ws-tcp-proxy/0.1.1:${PATH}"

chromecast_ip='192.168.0.156'
chromecast_port='8009'
proxy_port='3000'

ws-tcp-proxy "${chromecast_ip}:${chromecast_port}" --port "$proxy_port"
