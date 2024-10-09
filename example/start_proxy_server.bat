@echo off

rem :: https://github.com/zquestz/ws-tcp-proxy
rem :: https://github.com/zquestz/ws-tcp-proxy/releases/download/v0.1.1/ws-tcp-proxy-windows_amd64.zip
set PATH=C:\PortableApps\ws-tcp-proxy\0.1.1;%PATH%

set chromecast_ip=192.168.0.156
set chromecast_port=8009
set proxy_port=3000

ws-tcp-proxy "%chromecast_ip%:%chromecast_port%" --port "%proxy_port%"
